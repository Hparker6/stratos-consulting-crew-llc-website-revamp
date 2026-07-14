/**
 * Generates public/sitemap.xml at build time (wired into `npm run build`).
 * Add a route here when a new page ships; when the Insights section is
 * re-enabled, flip INCLUDE_INSIGHTS to true to include article URLs.
 */
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const SITE = 'https://www.stratosconsultingcrew.com'
const INCLUDE_INSIGHTS = false

/*
 * lastmod is a claim about the page, not about the build. Stamping every route
 * with today's date told crawlers the privacy policy changed every time we
 * touched the homepage, which is the fastest way to teach Google to ignore the
 * field entirely. Each route instead declares the sources that can actually
 * change it, and the date comes from git.
 *
 * The marketing pages share the component and data layers, so a copy edit in
 * src/components legitimately moves all of them. The legal pages don't: they
 * are self-contained, and only move when their own file does.
 */
const SHARED = ['src/components', 'src/data', 'src/index.css']

const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly', sources: ['src/pages/Home.tsx', ...SHARED] },
  { path: '/services', priority: '0.9', changefreq: 'monthly', sources: ['src/pages/ServicesPage.tsx', ...SHARED] },
  { path: '/solutions', priority: '0.9', changefreq: 'monthly', sources: ['src/pages/SolutionsPage.tsx', ...SHARED] },
  { path: '/process', priority: '0.8', changefreq: 'monthly', sources: ['src/pages/ProcessPage.tsx', ...SHARED] },
  { path: '/pricing', priority: '0.9', changefreq: 'monthly', sources: ['src/pages/PricingPage.tsx', ...SHARED] },
  { path: '/about', priority: '0.7', changefreq: 'monthly', sources: ['src/pages/AboutPage.tsx', ...SHARED] },
  { path: '/contact', priority: '0.9', changefreq: 'monthly', sources: ['src/pages/ContactPage.tsx', ...SHARED] },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly', sources: ['src/pages/PrivacyPage.tsx'] },
  { path: '/terms', priority: '0.3', changefreq: 'yearly', sources: ['src/pages/TermsPage.tsx'] },
]

const today = new Date().toISOString().slice(0, 10)

/**
 * Author date of the last commit touching any of `paths`, as YYYY-MM-DD.
 *
 * Falls back to today when git can't answer — an unbuilt working copy, a
 * tarball deploy, or a CI checkout too shallow to hold the commit. A slightly
 * over-fresh date is a much cheaper failure than a build that dies in the
 * sitemap step.
 */
function lastModified(paths) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], {
      cwd: join(dirname(fileURLToPath(import.meta.url)), '..'),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : today
  } catch {
    return today
  }
}

if (INCLUDE_INSIGHTS) {
  const insightSources = ['src/pages/InsightsPage.tsx', 'src/data/insights.ts']
  routes.push({ path: '/insights', priority: '0.8', changefreq: 'weekly', sources: insightSources })
  // Article slugs mirror src/data/insights.ts
  for (const slug of [
    'five-numbers-every-distributor-should-review-weekly',
    'excess-inventory-is-a-data-problem',
    'forecasting-simple-models-beat-gut-feel',
    'you-dont-need-a-data-team',
  ]) {
    routes.push({
      path: `/insights/${slug}`,
      priority: '0.6',
      changefreq: 'yearly',
      sources: ['src/pages/InsightArticlePage.tsx', 'src/data/insights.ts'],
    })
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${lastModified(r.sources)}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml')
writeFileSync(out, xml)
console.log(`sitemap.xml written with ${routes.length} URLs`)
