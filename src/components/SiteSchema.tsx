import { useEffect } from 'react'
import { setJsonLd } from '../lib/seo'
import { siteSchema } from '../lib/schema'

/**
 * Injects the site-wide JSON-LD graph (Organization, ProfessionalService,
 * WebSite) once, on every page.
 *
 * It is injected from React rather than hardcoded in index.html so that it can
 * read runtime config — notably the LinkedIn profile, which becomes the
 * Organization's `sameAs` only when one is actually configured. Because the site
 * is prerendered, the resulting <script type="application/ld+json"> is baked
 * into the static HTML, so a crawler sees it without executing any JavaScript.
 */
export default function SiteSchema() {
  useEffect(() => setJsonLd('site', siteSchema()), [])
  return null
}
