import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applyMeta, breadcrumbJsonLd, setJsonLd, SITE_NAME } from '../lib/seo'

interface PageMetaOptions {
  /** Adds BreadcrumbList schema (Home → this page). Pass the page's display name. */
  breadcrumb?: string
  /** Extra page-scoped JSON-LD (e.g. Article schema). */
  jsonLd?: object
}

/** Sets title, description, canonical, OG/Twitter tags, and optional JSON-LD. */
export default function usePageMeta(title: string, description: string, opts: PageMetaOptions = {}) {
  const { pathname } = useLocation()
  const { breadcrumb, jsonLd } = opts

  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} | Analytics & Dashboards for Distributors`
    applyMeta({ title: fullTitle, description, path: pathname })

    const cleanups: (() => void)[] = []
    if (breadcrumb) cleanups.push(setJsonLd('breadcrumb', breadcrumbJsonLd(breadcrumb, pathname)))
    if (jsonLd) cleanups.push(setJsonLd('page', jsonLd))
    return () => cleanups.forEach((fn) => fn())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, pathname, breadcrumb])
}
