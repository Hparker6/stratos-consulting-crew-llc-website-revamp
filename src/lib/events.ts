/**
 * Event abstraction layer.
 *
 * Every analytics event in the product is declared here, once. Components never
 * call track() with a string literal — they call one of the typed helpers below.
 * That gives three guarantees that a scattered `track('some_name')` approach
 * cannot:
 *
 *   1. Event names cannot drift. `EVENTS` is the single registry, and the
 *      `AnalyticsEvent` union makes a typo a compile error rather than a
 *      silently-missing report in GA4 three weeks later.
 *   2. Parameter shapes are enforced per event, so `label` always means the same
 *      thing and GA4's custom dimensions stay clean.
 *   3. Every event is documented in one place (see EVENT_CATALOG), which is what
 *      you hand to whoever configures the GA4 property or the GTM container.
 *
 * Transport (consent gating, GTM vs gtag, dataLayer) lives in analytics.ts.
 * This module is purely *what* we record; that module is *how* it is sent.
 */

import { track } from './analytics'

export const EVENTS = {
  PAGE_VIEW: 'page_view',
  CTA_CLICK: 'cta_click',
  BOOKING_CLICK: 'booking_click',
  NAV_CLICK: 'nav_click',
  CONTACT_FORM_START: 'contact_form_start',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_ERROR: 'contact_form_error',
  SCROLL_DEPTH: 'scroll_depth',
  OUTBOUND_CLICK: 'outbound_click',
  EMAIL_CLICK: 'email_click',
  PHONE_CLICK: 'phone_click',
  FILE_DOWNLOAD: 'file_download',
  SECTION_VIEW: 'section_view',
  DASHBOARD_INTERACTION: 'dashboard_interaction',
  CONSENT_GRANTED: 'consent_granted',
} as const

export type AnalyticsEvent = (typeof EVENTS)[keyof typeof EVENTS]

/**
 * Human-readable catalog. Kept next to the definitions on purpose: an event
 * registry that isn't documented where it's declared stops matching reality
 * within a month. `keyEvent` marks the ones worth promoting to GA4 Key Events
 * (Conversions).
 */
export const EVENT_CATALOG: Record<
  AnalyticsEvent,
  { fires: string; params: string[]; keyEvent?: boolean }
> = {
  page_view: {
    fires: 'Every route render, including SPA navigations (GA4 Enhanced Measurement cannot see client-side route changes).',
    params: ['page_path', 'page_location', 'page_title'],
  },
  cta_click: {
    fires: 'A "Book a call" CTA that points at the on-site /contact form (i.e. no scheduler configured).',
    params: ['label', 'destination', 'page_path'],
    keyEvent: true,
  },
  booking_click: {
    fires: 'A "Book a call" CTA that opens the external scheduler (Cal.com). This is a click-through, NOT a confirmed booking — see the note in the docs.',
    params: ['label', 'destination', 'link_url', 'link_domain', 'page_path'],
    keyEvent: true,
  },
  nav_click: {
    fires: 'Any header, mobile-menu, or footer navigation link.',
    params: ['label', 'link_path', 'page_path'],
  },
  contact_form_start: {
    fires: 'First focus of any contact form field. Once per form instance.',
    params: ['form_name', 'page_path'],
  },
  contact_form_submit: {
    fires: 'Contact form submission that returned a 2xx. Never fires on failure.',
    params: ['form_name', 'page_path'],
    keyEvent: true,
  },
  contact_form_error: {
    fires: 'Contact form submission that failed (network error or non-2xx).',
    params: ['form_name', 'error_message', 'page_path'],
  },
  scroll_depth: {
    fires: 'Once per page at each of the 25/50/75/100% marks. Reset on SPA navigation.',
    params: ['percent_scrolled', 'page_path'],
  },
  outbound_click: {
    fires: 'A link to any external host that is not the scheduler (the scheduler reports booking_click instead).',
    params: ['link_url', 'link_domain', 'page_path'],
  },
  email_click: {
    fires: 'Any mailto: link.',
    params: ['link_url', 'page_path'],
    keyEvent: true,
  },
  phone_click: {
    fires: 'Any tel: link.',
    params: ['link_url', 'page_path'],
    keyEvent: true,
  },
  file_download: {
    fires: 'A link to a pdf/doc/xls/csv/ppt/zip.',
    params: ['link_url', 'file_extension', 'page_path'],
  },
  section_view: {
    fires: 'A key section scrolls ~40% into view. Once per section per page.',
    params: ['section', 'page_path'],
  },
  dashboard_interaction: {
    fires: 'A click on a sample-dashboard preview or its "see the solutions" link — a strong intent signal, since it means the visitor engaged with the actual work product.',
    params: ['label', 'link_path', 'page_path'],
  },
  consent_granted: {
    fires: 'Visitor pressed "Allow" on the consent banner.',
    params: [],
  },
}

/** Current path, attached to every event so reports can be split by page. */
function page(): string {
  return typeof window === 'undefined' ? '' : window.location.pathname
}

/* ------------------------------------------------------------------ */
/* Typed helpers — the only sanctioned way to record an event.          */
/* ------------------------------------------------------------------ */

export function trackPageView(path: string, title: string) {
  track(EVENTS.PAGE_VIEW, {
    page_path: path,
    page_location: window.location.href,
    page_title: title,
  })
}

/** A book-a-call CTA that routes to the on-site contact form. */
export function trackCtaClick(label: string) {
  track(EVENTS.CTA_CLICK, { label, destination: 'contact_page', page_path: page() })
}

/** A book-a-call CTA that opens the external scheduler. */
export function trackBookingClick(label: string, url: string) {
  track(EVENTS.BOOKING_CLICK, {
    label,
    destination: 'scheduler',
    link_url: url,
    link_domain: safeHost(url),
    page_path: page(),
  })
}

export function trackNavClick(label: string, linkPath: string) {
  track(EVENTS.NAV_CLICK, { label, link_path: linkPath, page_path: page() })
}

export function trackContactFormStart(formName = 'contact') {
  track(EVENTS.CONTACT_FORM_START, { form_name: formName, page_path: page() })
}

export function trackContactFormSubmit(formName = 'contact') {
  track(EVENTS.CONTACT_FORM_SUBMIT, { form_name: formName, page_path: page() })
}

export function trackContactFormError(errorMessage: string, formName = 'contact') {
  track(EVENTS.CONTACT_FORM_ERROR, {
    form_name: formName,
    error_message: errorMessage,
    page_path: page(),
  })
}

export function trackScrollDepth(percent: number, path: string) {
  track(EVENTS.SCROLL_DEPTH, { percent_scrolled: percent, page_path: path })
}

export function trackOutboundClick(url: string) {
  track(EVENTS.OUTBOUND_CLICK, { link_url: url, link_domain: safeHost(url), page_path: page() })
}

export function trackEmailClick(address: string) {
  track(EVENTS.EMAIL_CLICK, { link_url: address, page_path: page() })
}

export function trackPhoneClick(number: string) {
  track(EVENTS.PHONE_CLICK, { link_url: number, page_path: page() })
}

export function trackFileDownload(url: string) {
  track(EVENTS.FILE_DOWNLOAD, {
    link_url: url,
    file_extension: url.split('.').pop()?.split('?')[0]?.toLowerCase() ?? '',
    page_path: page(),
  })
}

export function trackSectionView(section: string) {
  track(EVENTS.SECTION_VIEW, { section, page_path: page() })
}

export function trackConsentGranted() {
  track(EVENTS.CONSENT_GRANTED)
}

function safeHost(url: string): string {
  try {
    return new URL(url, window.location.origin).hostname
  } catch {
    return ''
  }
}
