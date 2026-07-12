/** SEO helpers: meta tags, canonical URLs, and JSON-LD structured data. */

export const SITE_URL = 'https://www.stratosconsultingcrew.com'
export const SITE_NAME = 'Stratos Consulting Crew'
export const OG_IMAGE = `${SITE_URL}/og-image.png`

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export function applyMeta(opts: { title: string; description: string; path: string }) {
  const { title, description, path } = opts
  const url = `${SITE_URL}${path === '/' ? '' : path}`

  document.title = title

  upsertMeta('name', 'description', description)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = url

  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertMeta('property', 'og:image', OG_IMAGE)
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', OG_IMAGE)
}

/** Inject (or replace) a page-scoped JSON-LD block. Returns a cleanup fn. */
export function setJsonLd(id: string, data: object): () => void {
  const domId = `jsonld-${id}`
  document.getElementById(domId)?.remove()
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = domId
  script.text = JSON.stringify(data)
  document.head.appendChild(script)
  return () => document.getElementById(domId)?.remove()
}

/** BreadcrumbList schema for a subpage. */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
    ],
  }
}
