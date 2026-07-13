/**
 * Automatic listeners: link clicks and scroll depth.
 *
 * DUPLICATE-EVENT POLICY (the whole point of this file):
 *
 * There is exactly ONE document-level click listener on the site, and it emits
 * AT MOST ONE event per click. It resolves the event by walking a strict
 * priority ladder and returning at the first match:
 *
 *   1. An element explicitly annotated with data-track  → that event, and stop.
 *   2. mailto:  → email_click,      and stop.
 *   3. tel:     → phone_click,      and stop.
 *   4. document → file_download,    and stop.
 *   5. external → outbound_click.
 *
 * The `return` after rule 1 is load-bearing. Without it, the scheduler CTA
 * (an annotated element that is also an external link) would report BOTH
 * booking_click and outbound_click for a single click, inflating the conversion
 * count by 100%. Annotated elements are fully described by their own event, so
 * inference never runs on them.
 *
 * No component adds its own click listener for analytics; anything that needs
 * tracking carries data-track and is picked up here.
 */

import {
  trackEmailClick,
  trackFileDownload,
  trackOutboundClick,
  trackPhoneClick,
  trackScrollDepth,
} from './events'
import { track } from './analytics'

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

const DOCUMENT_RE = /\.(pdf|xlsx?|csv|docx?|pptx?|zip)(\?|$)/i

function onDocumentClick(e: MouseEvent) {
  const target = e.target as Element | null
  if (!target) return

  const anchor = target.closest<HTMLAnchorElement>('a[href]')

  // --- Rule 1: explicitly annotated elements win outright. ---
  const tracked = target.closest<HTMLElement>('[data-track]')
  if (tracked?.dataset.track) {
    const params: Record<string, unknown> = {
      page_path: window.location.pathname,
    }
    if (tracked.dataset.trackLabel) params.label = tracked.dataset.trackLabel
    // Any extra data-track-* attributes ride along as event params, so a
    // component can enrich its event without a bespoke listener.
    for (const [key, value] of Object.entries(tracked.dataset)) {
      if (key.startsWith('track') && key !== 'track' && key !== 'trackLabel') {
        const param = key.slice(5).replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`).replace(/^_/, '')
        params[param] = value
      }
    }
    // Enrich annotated *links* with their destination, so booking_click and
    // outbound-style events still carry link_url/link_domain.
    const href = anchor?.getAttribute('href') ?? ''
    if (/^https?:\/\//i.test(href)) {
      params.link_url = href
      try {
        params.link_domain = new URL(href).hostname
      } catch {
        /* ignore malformed */
      }
    } else if (href) {
      params.link_path = href
    }

    track(tracked.dataset.track, params)
    return // ← prevents double-counting. See the policy note above.
  }

  // --- Rules 2–5: inference, only for links with no explicit annotation. ---
  if (!anchor) return
  const href = anchor.getAttribute('href') ?? ''

  if (href.startsWith('mailto:')) {
    trackEmailClick(href.replace('mailto:', ''))
    return
  }
  if (href.startsWith('tel:')) {
    trackPhoneClick(href.replace('tel:', ''))
    return
  }
  if (DOCUMENT_RE.test(href)) {
    trackFileDownload(href)
    return
  }
  if (/^https?:\/\//i.test(href) && !href.includes(window.location.hostname)) {
    trackOutboundClick(href)
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
      trackScrollDepth(mark, currentScrollPath)
    }
  }
}

export function installGlobalListeners() {
  if (listenersInstalled) return // idempotent: never two listeners, never two events
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
