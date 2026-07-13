/** SEO helpers: meta tags, canonical URLs, robots, and JSON-LD injection. */

import { OG_IMAGE, SITE_NAME, SITE_URL } from './schema'

export { OG_IMAGE, SITE_NAME, SITE_URL }

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export interface MetaOptions {
  title: string
  description: string
  path: string
  /** Absolute URL of the social preview image. Defaults to the site OG image. */
  image?: string
  /** 'website' for pages, 'article' for posts. */
  type?: 'website' | 'article'
  /** Keeps the page out of the index (404s, thin pages). */
  noindex?: boolean
}

/**
 * Applies title, description, canonical, Open Graph, Twitter Card, and robots.
 *
 * Canonical is derived from the route, so every page self-canonicalises to its
 * clean URL — which is what stops tracking query strings (?utm_source=…, ?ref=…)
 * from being indexed as separate, duplicate pages.
 */
export function applyMeta(opts: MetaOptions) {
  const { title, description, path, image = OG_IMAGE, type = 'website', noindex = false } = opts
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  const imageAlt = `${SITE_NAME} — analytics and dashboards for distributors`

  document.title = title
  upsertMeta('name', 'description', description)

  // Canonical
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = url

  // Robots. Indexable pages get an explicit positive directive (which also opts
  // into large image previews and full snippets); 404s and thin pages get
  // noindex,follow so their links are still crawled but the page never ranks.
  upsertMeta(
    'name',
    'robots',
    noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  )

  // Open Graph
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:type', type)
  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertMeta('property', 'og:locale', 'en_US')
  upsertMeta('property', 'og:image', image)
  upsertMeta('property', 'og:image:width', '1200')
  upsertMeta('property', 'og:image:height', '630')
  upsertMeta('property', 'og:image:alt', imageAlt)

  // Twitter Card
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', image)
  upsertMeta('name', 'twitter:image:alt', imageAlt)
}

/** Inject (or replace) a JSON-LD block by id. Returns a cleanup fn. */
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
