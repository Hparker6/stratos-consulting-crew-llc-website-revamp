import { useEffect, useState } from 'react'
import { denyConsent, getConsent, gpcActive, grantConsent } from '../lib/analytics'

/**
 * Lightweight consent banner. Analytics (GA4/GTM) and Clarity load only after
 * "Allow". Declining stores the choice and keeps the site tag-free. Browsers
 * sending Global Privacy Control are auto-declined and never see the banner.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getConsent() === null && !gpcActive()) setVisible(true)
  }, [])

  if (!visible) return null

  function choose(granted: boolean) {
    if (granted) grantConsent()
    else denyConsent()
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[60] p-4 sm:p-5"
    >
      <div
        className="max-w-3xl mx-auto rounded-[14px] p-5 flex flex-col sm:flex-row sm:items-center gap-4"
        style={{
          background: 'rgba(16,26,46,0.97)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 16px 50px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <p className="flex-1 text-muted font-medium text-[14px] leading-relaxed">
          We use privacy-respecting analytics cookies to understand how visitors use this site and improve
          it. No ads, no selling data. You can decline and everything still works.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={() => choose(false)}
            className="btn-secondary !px-5 !py-[10px] text-[14px]"
            aria-label="Decline analytics cookies"
          >
            Decline
          </button>
          <button
            onClick={() => choose(true)}
            className="btn-primary !px-5 !py-[10px] text-[14px]"
            aria-label="Allow analytics cookies"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  )
}
