/**
 * Generates public/sitemap.xml at build time (wired into `npm run build`).
 * Add a route here when a new page ships; when the Insights section is
 * re-enabled, flip INCLUDE_INSIGHTS to true to include article URLs.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const SITE = 'https://www.stratosconsultingcrew.com'
const INCLUDE_INSIGHTS = false

const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/solutions', priority: '0.9', changefreq: 'monthly' },
  { path: '/process', priority: '0.8', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
]

if (INCLUDE_INSIGHTS) {
  routes.push({ path: '/insights', priority: '0.8', changefreq: 'weekly' })
  // Article slugs mirror src/data/insights.ts
  for (const slug of [
    'five-numbers-every-distributor-should-review-weekly',
    'excess-inventory-is-a-data-problem',
    'forecasting-simple-models-beat-gut-feel',
    'you-dont-need-a-data-team',
  ]) {
    routes.push({ path: `/insights/${slug}`, priority: '0.6', changefreq: 'yearly' })
  }
}

const today = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
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
