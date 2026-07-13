import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applyMeta, setJsonLd, SITE_NAME } from '../lib/seo'
import { breadcrumbSchema, webPageSchema } from '../lib/schema'

interface PageMetaOptions {
  /** Adds BreadcrumbList schema (Home → this page). Pass the page's display name. */
  breadcrumb?: string
  /** Extra page-scoped JSON-LD (FAQPage, OfferCatalog, Article…). */
  jsonLd?: object | object[]
  /** Social preview image override (absolute URL). */
  image?: string
  type?: 'website' | 'article'
  /** Keeps this page out of the search index. */
  noindex?: boolean
}

/**
 * Sets title, description, canonical, OG/Twitter, robots, and JSON-LD.
 *
 * Every page automatically gets a WebPage node describing *itself*. Previously a
 * single hardcoded WebPage (carrying the homepage's name and description) lived
 * in index.html and was therefore copied into every prerendered page — so
 * /pricing told Google it was the homepage. Generating it per route fixes that.
 */
export default function usePageMeta(title: string, description: string, opts: PageMetaOptions = {}) {
  const { pathname } = useLocation()
  const { breadcrumb, jsonLd, image, type = 'website', noindex = false } = opts

  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} | Analytics & Dashboards for Distributors`

    applyMeta({ title: fullTitle, description, path: pathname, image, type, noindex })

    const cleanups: (() => void)[] = []

    // A noindex page (the 404) shouldn't describe itself in the knowledge graph.
    if (!noindex) {
      cleanups.push(
        setJsonLd('webpage', webPageSchema({ name: fullTitle, description, path: pathname })),
      )
      if (breadcrumb) cleanups.push(setJsonLd('breadcrumb', breadcrumbSchema(breadcrumb, pathname)))
      const extra = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
      extra.forEach((data, i) => cleanups.push(setJsonLd(`page-${i}`, data)))
    }

    return () => cleanups.forEach((fn) => fn())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, pathname, breadcrumb, image, type, noindex])
}
