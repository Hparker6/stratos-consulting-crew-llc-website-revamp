import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CONSENT_SETTINGS_EVENT,
  denyConsent,
  getConsent,
  gpcActive,
  grantConsent,
} from '../lib/analytics'

/**
 * Lightweight consent banner. Analytics (GA4/GTM) and Clarity load only after
 * "Allow". Declining stores the choice and keeps the site tag-free. Browsers
 * sending Global Privacy Control are auto-declined and never see the banner.
 *
 * Accessibility notes:
 *  - It is a `region`, not a `dialog`. It does not trap focus and does not block
 *    the page, so announcing it as a dialog would tell screen-reader users they
 *    are in a modal they cannot escape. `aria-live` is likewise wrong here: the
 *    banner is present at load rather than being an update to announce.
 *  - It is placed in the tab order right where it appears, is fully operable by
 *    keyboard, and both buttons meet the 44px target size.
 *  - It can be re-opened at any time from the footer's "Cookie settings" link,
 *    which is what makes withdrawing consent actually possible.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [reopened, setReopened] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (getConsent() === null && !gpcActive()) setVisible(true)
  }, [])

  // "Cookie settings" in the footer re-opens the banner so a prior choice can be
  // changed — including revoking a previously granted consent.
  useEffect(() => {
    function onOpen() {
      setReopened(true)
      setVisible(true)
    }
    window.addEventListener(CONSENT_SETTINGS_EVENT, onOpen)
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, onOpen)
  }, [])

  // When re-opened by explicit user action, move focus into the panel so
  // keyboard users are taken to the thing they just asked for.
  useEffect(() => {
    if (visible && reopened) panelRef.current?.focus()
  }, [visible, reopened])

  if (!visible) return null

  function choose(granted: boolean) {
    if (granted) grantConsent()
    else denyConsent()
    setVisible(false)
    setReopened(false)
  }

  const current = getConsent()

  return (
    <div
      role="region"
      aria-labelledby="cookie-consent-heading"
      className="fixed bottom-0 inset-x-0 z-[60] p-4 sm:p-5"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="consent-panel max-w-3xl mx-auto p-5 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        {/* Visually hidden name for the region — the design has no heading here,
            and inventing a visible one would change the layout. */}
        <h2 id="cookie-consent-heading" className="sr-only">
          Cookie consent
        </h2>

        <p className="flex-1 text-muted font-medium text-caption">
          We use privacy-respecting analytics cookies to understand how visitors use this site and improve
          it. No ads, no selling data. You can decline and everything still works.{' '}
          <Link to="/privacy" className="text-primary font-bold hover:underline">
            Privacy policy
          </Link>
          .
          {reopened && current && (
            <>
              {' '}
              <span className="text-faint">
                Your current choice: {current === 'granted' ? 'analytics allowed' : 'analytics declined'}.
              </span>
            </>
          )}
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => choose(false)}
            className="btn-secondary btn-sm"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="btn-primary btn-sm"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  )
}
