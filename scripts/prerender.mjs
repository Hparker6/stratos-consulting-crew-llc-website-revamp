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

const ROUTES = ['/', '/services', '/solutions', '/process', '/pricing', '/about']
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
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 45000 })
    await page.waitForSelector('h1', { timeout: 15000 })
    // Strip the consent banner from the snapshot: React re-adds it for
    // visitors who haven't chosen, and returning visitors shouldn't see a flash.
    await page.evaluate(() => document.querySelector('[aria-label="Cookie consent"]')?.remove())
    let html = await page.content()
    // The fonts stylesheet was captured after its onload flipped media to
    // "all" — restore the non-render-blocking pattern in the static HTML.
    html = html.replace(
      /(<link[^>]*fonts\.googleapis[^>]*rel="stylesheet"[^>]*)media="all"/,
      '$1media="print"',
    )
    // Move the app bundle from <head> to the end of <body>: module scripts are
    // deferred either way, but head placement puts them on the simulated
    // first-paint critical path. The static markup paints without JS.
    const scriptMatch = html.match(/<script type="module"[^>]*><\/script>/)
    if (scriptMatch) {
      html = html.replace(scriptMatch[0], '').replace('</body>', `${scriptMatch[0]}</body>`)
    }
    // Stamp the route so main.tsx knows this markup is hydratable. Routes
    // served via SPA fallback (redirects, 404s) won't match and re-render.
    html = html.replace(/<html([^>]*)>/, `<html$1 data-prerendered="${route}">`)

    const outDir = route === '/' ? DIST : join(DIST, route.slice(1))
    mkdirSync(outDir, { recursive: true })
    writeFileSync(join(outDir, 'index.html'), html)
    console.log(`prerendered ${route}`)
  }

  await browser.close()
  console.log(`Prerender complete: ${ROUTES.length} routes`)
} catch (err) {
  console.warn(`Prerender skipped (${err.message}) — deploying as plain SPA.`)
} finally {
  server.close()
}
