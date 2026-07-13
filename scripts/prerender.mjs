/**
 * Post-build prerender: renders each route in a headless browser and writes
 * static HTML into dist/, so first paint doesn't wait for React and crawlers
 * see full per-page content, meta tags, and JSON-LD without executing JS.
 * React re-renders over the static markup on load (client-side takeover).
 *
 * Best-effort: if no browser can be launched (unusual CI image), it logs a
 * warning and exits 0 — the site still deploys as a normal SPA.
 */
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname } from 'node:path'

const ROUTES = [
  '/', '/services', '/solutions', '/process', '/pricing', '/about',
  '/contact', '/privacy', '/terms',
]
const PORT = 4917
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.png': 'image/png', '.txt': 'text/plain', '.xml': 'application/xml',
}

// Template held in memory so overwriting dist/index.html can't affect serving.
const template = readFileSync(join(DIST, 'index.html'))

const server = createServer((req, res) => {
  const url = req.url.split('?')[0]
  const filePath = join(DIST, url)
  if (url !== '/' && existsSync(filePath) && extname(filePath)) {
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] ?? 'application/octet-stream' })
    res.end(readFileSync(filePath))
    return
  }
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(template)
})

function findSystemBrowser() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH
  const candidates = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ]
  return candidates.find((p) => existsSync(p))
}

try {
  const { default: puppeteer } = await import('puppeteer')
  await new Promise((resolve) => server.listen(PORT, resolve))

  const executablePath = findSystemBrowser()
  const browser = await puppeteer.launch({
    executablePath, // undefined → puppeteer's own chromium (CI)
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 1080 })

  for (const route of ROUTES) {
    // Record every JS chunk the route actually executes. Route code is now
    // split (src/routes.tsx), so the entry bundle alone no longer tells the
    // browser what it needs — without this it would parse main.js, discover the
    // route import, and only *then* start fetching it: a serial waterfall.
    // Emitting modulepreload links lets both download in parallel instead.
    const chunks = new Set()
    const onResponse = (res) => {
      const url = new URL(res.url())
      if (url.pathname.startsWith('/assets/') && url.pathname.endsWith('.js')) {
        chunks.add(url.pathname)
      }
    }
    page.on('response', onResponse)

    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 45000 })
    await page.waitForSelector('h1', { timeout: 15000 })
    // Let entrance animations & count-ups settle so captured text is final.
    await new Promise((r) => setTimeout(r, 1600))
    page.off('response', onResponse)

    // Strip the consent banner from the snapshot: React re-adds it for
    // visitors who haven't chosen, and returning visitors shouldn't see a flash.
    await page.evaluate(() => {
      document.querySelector('[aria-labelledby="cookie-consent-heading"]')?.closest('div[role="region"]')?.remove()
      // Scroll-reveal leaves below-fold elements hidden via inline styles;
      // static HTML must ship fully visible (no-JS / crawler safety).
      for (const el of document.querySelectorAll('[data-reveal]')) {
        el.removeAttribute('style')
        el.removeAttribute('data-reveal-armed')
      }
      // The off-screen animation pauser writes animation-play-state inline.
      // Baking "paused" into the static HTML would freeze those animations for
      // anyone whose JS never runs.
      for (const el of document.querySelectorAll('[style*="animation-play-state"]')) {
        el.style.removeProperty('animation-play-state')
        if (!el.getAttribute('style')) el.removeAttribute('style')
      }
    })
    let html = await page.content()
    // Move the app bundle from <head> to the end of <body>: module scripts are
    // deferred either way, but head placement puts them on the simulated
    // first-paint critical path. The static markup paints without JS.
    const scriptMatch = html.match(/<script type="module"[^>]*><\/script>/)
    if (scriptMatch) {
      html = html.replace(scriptMatch[0], '').replace('</body>', `${scriptMatch[0]}</body>`)
    }

    // Deliberately NOT emitting modulepreload links for the route's chunks.
    // It was the obvious optimization and it measured *worse*: a modulepreload is
    // a high-priority fetch, and nine of them raced the render-blocking
    // stylesheet for bandwidth on a throttled connection, pushing FCP from ~1.65s
    // to ~1.81s. Because the page is prerendered, JS is not on the critical path
    // at all — the HTML paints without it — so hydrating a few ms later costs the
    // visitor nothing, while delaying the CSS costs them the whole first paint.
    // `chunks` is still collected above for build-time visibility.
    void chunks
    // Stamp the route so main.tsx knows this markup is hydratable. Routes
    // served via SPA fallback (redirects, 404s) won't match and re-render.
    html = html.replace(/<html([^>]*)>/, `<html$1 data-prerendered="${route}">`)

    const outDir = route === '/' ? DIST : join(DIST, route.slice(1))
    mkdirSync(outDir, { recursive: true })
    writeFileSync(join(outDir, 'index.html'), html)
    console.log(`prerendered ${route}`)
  }

  // ---- 404 page -------------------------------------------------------
  // Netlify's catch-all now serves /404.html with a real 404 status (see
  // netlify.toml). Previously EVERY unknown URL returned 200 with the SPA shell,
  // so typo'd and stale links were indexable soft-404s. Rendering the React
  // NotFoundPage here means the 404 is a real, styled page rather than a bare
  // Netlify default — and it carries noindex.
  await page.goto(`http://localhost:${PORT}/__not-found__`, {
    waitUntil: 'networkidle0',
    timeout: 45000,
  })
  await page.waitForSelector('h1', { timeout: 15000 })
  await new Promise((r) => setTimeout(r, 800))
  await page.evaluate(() => {
    document
      .querySelector('[aria-labelledby="cookie-consent-heading"]')
      ?.closest('div[role="region"]')
      ?.remove()
  })
  let notFound = await page.content()
  const nfScript = notFound.match(/<script type="module"[^>]*><\/script>/)
  if (nfScript) {
    notFound = notFound.replace(nfScript[0], '').replace('</body>', `${nfScript[0]}</body>`)
  }
  // Intentionally NOT stamped with data-prerendered: the 404 is served for many
  // different URLs, so its markup must never be treated as hydratable for them.
  writeFileSync(join(DIST, '404.html'), notFound)
  console.log('prerendered /404.html')

  await browser.close()
  console.log(`Prerender complete: ${ROUTES.length} routes + 404`)
} catch (err) {
  console.warn(`Prerender skipped (${err.message}) — deploying as plain SPA.`)
} finally {
  server.close()
}
