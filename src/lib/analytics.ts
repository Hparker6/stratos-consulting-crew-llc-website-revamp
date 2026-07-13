/**
 * Analytics transport — consent-gated, dataLayer-first, GTM-ready.
 *
 * This module answers *how* an event is sent. What we send is declared in
 * events.ts; the automatic listeners live in autoTrack.ts.
 *
 * Architecture:
 *  - Every event flows through track(), which writes to window.dataLayer.
 *  - If a GTM container ID is configured, GTM is the primary tag layer: GA4,
 *    Meta Pixel, LinkedIn Insight, Google Ads and A/B tools are then added in
 *    the GTM UI with zero code changes here, and our events arrive as dataLayer
 *    events they can trigger on.
 *  - With no GTM container, gtag.js loads directly with the GA4 ID and track()
 *    sends gtag('event', ...) instead, so reporting is identical either way.
 *    Both are never loaded at once, so no event is ever counted twice.
 *  - Nothing loads before consent. Google Consent Mode v2 defaults are pushed
 *    from index.html before any tag can execute; granting consent updates them
 *    and injects the scripts. Declining keeps the site entirely tag-free.
 *  - Microsoft Clarity loads only when an ID is set AND consent is granted.
 *
 * IDs come from build-time env vars (see .env.example) so the same code can run
 * against a staging property without a commit.
 */

function env(value: string | undefined, fallback = ''): string {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : fallback
}

export const ANALYTICS_CONFIG = {
  /** GA4 measurement ID. Used only when no GTM container is configured. */
  GA4_ID: env(import.meta.env.VITE_GA4_ID, 'G-R4XFZ4FJXC'),
  /** GTM container ID (GTM-XXXXXXX). When set, GTM becomes the tag layer and
   *  gtag.js is NOT loaded — GA4 is configured inside the container instead. */
  GTM_ID: env(import.meta.env.VITE_GTM_ID),
  /** Microsoft Clarity project ID. Optional. */
  CLARITY_ID: env(import.meta.env.VITE_CLARITY_ID),
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
  // Withdrawal must actually take effect, not just be recorded. Consent Mode is
  // told to deny analytics storage, which stops GA4 writing or reading cookies
  // from this point on, and track() refuses to emit anything further.
  gtag('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

/** Name of the event that asks the consent banner to re-open. */
export const CONSENT_SETTINGS_EVENT = 'stratos:open-consent'

/** Lets a visitor revisit their choice after the banner is gone (footer link). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT))
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
    // GTM path: the container owns GA4 and every other tag.
    dl().push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`)
  } else if (GA4_ID) {
    // Direct gtag path. Mutually exclusive with GTM above — loading both would
    // double-count every event.
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
 * Send one event. Prefer the typed helpers in events.ts over calling this
 * directly — they are the documented surface.
 *
 * Exactly one transport is used per event (dataLayer push for GTM, gtag for
 * GA4), never both, so a single call can never produce two hits.
 */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (getConsent() !== 'granted') return
  if (ANALYTICS_CONFIG.GTM_ID) {
    dl().push({ event, ...params })
  } else {
    gtag('event', event, params)
  }
}
