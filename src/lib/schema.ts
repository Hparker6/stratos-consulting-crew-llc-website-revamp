/**
 * Structured data (JSON-LD).
 *
 * All schema is built here and injected by React (see components/SiteSchema.tsx
 * and hooks/usePageMeta.ts) rather than being hardcoded in index.html.
 *
 * Why that matters: index.html's <head> is copied verbatim into every
 * prerendered page. The FAQPage and WebPage blocks that used to live there were
 * therefore emitted on /pricing, /about, /terms — pages with no FAQ and a
 * description belonging to the homepage. Google requires structured data to
 * describe the page it appears on; markup that doesn't gets ignored, and at
 * worst earns a manual action. Building schema per-page fixes that at the root,
 * and because the site is prerendered the JSON-LD still lands in the static HTML
 * exactly as a crawler wants it.
 */

import { faqs } from '../data/faqs'
import { tiers } from '../data/pricing'
import { CONTACT_EMAIL, LINKEDIN_URL } from './site'

export const SITE_URL = 'https://www.stratosconsultingcrew.com'
export const SITE_NAME = 'Stratos Consulting Crew'
export const LEGAL_NAME = 'Stratos Consulting Crew LLC'
export const OG_IMAGE = `${SITE_URL}/og-image.png`

const ORG_ID = `${SITE_URL}/#organization`
const SERVICE_ID = `${SITE_URL}/#service`
const WEBSITE_ID = `${SITE_URL}/#website`

const SERVICES = [
  'Executive Dashboards',
  'Demand & Sales Forecasting',
  'Inventory Optimization',
  'Cost Reduction & Profitability',
  'Automation',
  'Fractional Analytics Support',
]

/** Organization — the company itself. Site-wide. */
export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: LEGAL_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
    },
    image: OG_IMAGE,
    email: CONTACT_EMAIL,
    description:
      'Analytics, dashboards, and forecasting for small distributors, manufacturers, and wholesalers.',
    foundingDate: '2025',
    areaServed: { '@type': 'Country', name: 'United States' },
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    // Only emitted when a real profile is configured — an empty or fabricated
    // sameAs is worse than none.
    ...(LINKEDIN_URL ? { sameAs: [LINKEDIN_URL] } : {}),
  }
}

/** ProfessionalService — the business as a service provider, with its catalog. */
export function professionalServiceSchema() {
  return {
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: LEGAL_NAME,
    url: SITE_URL,
    image: OG_IMAGE,
    email: CONTACT_EMAIL,
    parentOrganization: { '@id': ORG_ID },
    priceRange: '$$',
    description:
      'Analytics, dashboards, and forecasting for small distributors and manufacturers.',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    knowsAbout: [
      'Power BI',
      'SQL',
      'Python',
      'Inventory optimization',
      'Demand forecasting',
      'Distribution analytics',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Analytics Services',
      itemListElement: SERVICES.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  }
}

/** WebSite — site-wide identity for the search engines. */
export function webSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  }
}

/** The three site-wide nodes, as one @graph. Injected once by <SiteSchema />. */
export function siteSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(), professionalServiceSchema(), webSiteSchema()],
  }
}

/** WebPage — per page. Ties the page to the site and organization. */
export function webPageSchema(opts: { name: string; description: string; path: string }) {
  const url = `${SITE_URL}${opts.path === '/' ? '/' : opts.path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-US',
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
  }
}

/** FAQPage — homepage only, generated from the FAQ actually rendered there. */
export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/**
 * Pricing — an OfferCatalog of the four engagements, generated from the same
 * array the cards render. Prices are ranges, so each Offer carries a
 * PriceSpecification with minPrice/maxPrice rather than a single fabricated
 * number, which is both truthful and what Google expects for a range.
 */
export function pricingSchema() {
  const url = `${SITE_URL}/pricing`
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${url}#offers`,
    name: 'Analytics Engagements',
    url,
    provider: { '@id': ORG_ID },
    itemListElement: tiers.map((t, i) => ({
      '@type': 'Offer',
      position: i + 1,
      name: t.name,
      description: t.outcome,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        minPrice: t.priceLow,
        maxPrice: t.priceHigh,
        ...(t.unit === 'month'
          ? { billingIncrement: 1, unitCode: 'MON', unitText: 'month' }
          : {}),
      },
      availability: 'https://schema.org/InStock',
      itemOffered: {
        '@type': 'Service',
        name: t.name,
        description: t.outcome,
        serviceType: 'Analytics consulting',
        provider: { '@id': ORG_ID },
      },
    })),
  }
}

/** BreadcrumbList — Home → this page. */
export function breadcrumbSchema(name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
    ],
  }
}
