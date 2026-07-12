/**
 * Analytics core — consent-gated, dataLayer-first, GTM-ready.
 *
 * Architecture:
 *  - All custom events flow through track(), which writes to window.dataLayer.
 *  - If a GTM container ID is set, GTM is the primary tag layer: GA4, Meta
 *    Pixel, LinkedIn Insight, Google Ads, A/B tools, etc. get added in the GTM
 *    UI with zero code changes here. Events arrive as dataLayer events.
 *  - Until a GTM container exists, gtag.js loads directly with the GA4 ID and
 *    track() mirrors events to gtag('event', ...), so reporting is identical.
 *  - Nothing loads before consent. Google Consent Mode v2 defaults are pushed
 *    from index.html before any tag can execute; granting consent updates
 *    them and injects the scripts. Declining keeps the site 100% tag-free.
 *  - Microsoft Clarity loads only when an ID is set AND consent is granted,
 *    and is additionally told about consent via clarity('consent').
 */

export const ANALYTICS_CONFIG = {
  /** GA4 measurement ID (dedicated property for this site). */
  GA4_ID: 'G-R4XFZ4FJXC',
  /** GTM container ID, e.g. 'GTM-XXXXXXX'. Leave '' until the container exists;
   *  once set, GTM becomes the primary tag layer and gtag.js stops loading. */
  GTM_ID: '',
  /** Microsoft Clarity project ID. Leave '' until created at clarity.microsoft.com. */
  CLARITY_ID: '',
}

const CONSENT_KEY = 'stratos-consent-v1'

type ConsentState = 'granted' | 'denied' | null

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
  interface Navigator {
    globalPrivacyControl?: boolean
  }
}

let tagsLoaded = false

function dl(): unknown[] {
  window.dataLayer = window.dataLayer || []
  return window.dataLayer
}

/** gtag shim — pushes `arguments` objects the way gtag.js expects. */
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  dl().push(arguments)
}

export function getConsent(): ConsentState {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

/** Honor Global Privacy Control: treat as an explicit, silent decline. */
export function gpcActive(): boolean {
  return navigator.globalPrivacyControl === true
}

export function grantConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, 'granted')
  } catch {
    /* private mode — session-only consent */
  }
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  window.clarity?.('consent')
  loadTags()
  track('consent_granted')
}

export function denyConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, 'denied')
  } catch {
    /* ignore */
  }
}

function injectScript(src: string) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function loadTags() {
  if (tagsLoaded) return
  tagsLoaded = true

  const { GA4_ID, GTM_ID, CLARITY_ID } = ANALYTICS_CONFIG

  if (GTM_ID) {
    // GTM path: container owns GA4 + all future tags.
    dl().push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`)
  } else if (GA4_ID) {
    // Direct gtag path until a GTM container is created.
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`)
    gtag('js', new Date())
    // SPA: page_view is sent manually on every route change (see trackPageView).
    gtag('config', GA4_ID, { send_page_view: false })
  }

  if (CLARITY_ID) {
    if (!window.clarity) {
      const stub = function (...args: unknown[]) {
        stub.q.push(args)
      } as ((...args: unknown[]) => void) & { q: unknown[][] }
      stub.q = []
      window.clarity = stub
    }
    injectScript(`https://www.clarity.ms/tag/${CLARITY_ID}`)
    window.clarity('consent')
  }
}

/** Boot: apply stored consent (or GPC) — called once from main.tsx. */
export function initAnalytics() {
  if (gpcActive() && getConsent() === null) {
    denyConsent()
    return
  }
  if (getConsent() === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' })
    loadTags()
  }
}

/**
 * Record a custom event. Events are named so they can be promoted to GA4 Key
 * Events (Conversions) directly: contact_form_submit, cta_click, etc.
 */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (getConsent() !== 'granted') return
  if (ANALYTICS_CONFIG.GTM_ID) {
    dl().push({ event, ...params })
  } else {
    gtag('event', event, params)
  }
}

export function trackPageView(path: string, title: string) {
  track('page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: title,
  })
}

/* ------------------------------------------------------------------ */
/* Automatic listeners: clicks, scroll depth                           */
/* ------------------------------------------------------------------ */

let listenersInstalled = false
const firedScrollMarks = new Set<string>()
let currentScrollPath = ''
let lastNavAt = 0

/** Reset per-page trackers on SPA navigation (each pageview gets fresh marks). */
export function resetPageTracking(path: string) {
  currentScrollPath = path
  firedScrollMarks.clear()
  lastNavAt = Date.now()
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target as Element | null
  if (!target) return

  // Explicitly annotated elements first.
  const tracked = target.closest<HTMLElement>('[data-track]')
  if (tracked?.dataset.track) {
    track(tracked.dataset.track, {
      label: tracked.dataset.trackLabel ?? undefined,
      page_path: window.location.pathname,
    })
  }

  // Link-type inference: email / phone / outbound / downloads.
  const a = target.closest<HTMLAnchorElement>('a[href]')
  if (!a) return
  const href = a.getAttribute('href') ?? ''

  if (href.startsWith('mailto:')) {
    track('email_click', { link_url: href.replace('mailto:', ''), page_path: window.location.pathname })
    return
  }
  if (href.startsWith('tel:')) {
    track('phone_click', { link_url: href.replace('tel:', ''), page_path: window.location.pathname })
    return
  }
  if (/\.(pdf|xlsx?|csv|docx?|pptx?|zip)(\?|$)/i.test(href)) {
    track('file_download', { link_url: href, page_path: window.location.pathname })
    return
  }
  if (/^https?:\/\//i.test(href) && !href.includes(window.location.hostname)) {
    track('outbound_click', {
      link_url: href,
      link_domain: new URL(href).hostname,
      page_path: window.location.pathname,
    })
  }
}

function onScroll() {
  // Ignore the settle window right after SPA navigation: the old scroll
  // position against the new page's height would fire bogus depth marks.
  if (Date.now() - lastNavAt < 400) return
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight
  if (scrollable <= 0) return
  const pct = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100
  for (const mark of [25, 50, 75, 100]) {
    const key = `${currentScrollPath}|${mark}`
    if (pct >= mark && !firedScrollMarks.has(key)) {
      firedScrollMarks.add(key)
      track('scroll_depth', { percent_scrolled: mark, page_path: currentScrollPath })
    }
  }
}

export function installGlobalListeners() {
  if (listenersInstalled) return
  listenersInstalled = true
  document.addEventListener('click', onDocumentClick, { capture: true, passive: true })
  let ticking = false
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        onScroll()
        ticking = false
      })
    },
    { passive: true },
  )
}
