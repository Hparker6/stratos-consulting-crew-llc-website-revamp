import { useEffect, useRef, useState, FormEvent } from 'react'
import { trackContactFormError, trackContactFormStart, trackContactFormSubmit } from '../lib/events'
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_MAILTO, HAS_BOOKING } from '../lib/site'

/**
 * Submission lifecycle. The form is only ever replaced by the confirmation
 * panel on 'success', which requires an actual 2xx from Netlify. A network
 * failure or a non-2xx response lands on 'error', which keeps the visitor's
 * typed input on screen and offers a fallback — rather than claiming a message
 * was delivered when it never left the browser.
 */
type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [invalid, setInvalid] = useState<{ name: boolean; email: boolean }>({ name: false, email: false })
  const startTracked = useRef(false)
  const resultRef = useRef<HTMLDivElement | null>(null)

  // Move focus to the result panel so keyboard and screen-reader users learn the
  // outcome, instead of focus being dropped back onto <body>.
  useEffect(() => {
    if (status === 'success' || status === 'error') resultRef.current?.focus()
  }, [status])

  function handleFormStart() {
    if (startTracked.current) return
    startTracked.current = true
    trackContactFormStart()
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return

    const form = e.currentTarget
    const data = new FormData(form)

    // Sanitize before sending: cap lengths, strip control characters, trim.
    // The message field keeps its line breaks; single-line fields do not.
    const MAX: Record<string, number> = { name: 100, company: 120, email: 254, phone: 30, challenge: 2000 }
    const body = new URLSearchParams()
    for (const [key, raw] of data.entries()) {
      if (typeof raw !== 'string') continue
      let value = raw.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
      if (key !== 'challenge') value = value.replace(/[\r\n]+/g, ' ')
      value = value.trim().slice(0, MAX[key] ?? 500)
      body.set(key, value)
    }

    // Mark the offending fields so the failure is exposed programmatically
    // (aria-invalid), not only through the browser's transient validity bubble.
    const nameBad = !body.get('name')
    const emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.get('email') ?? '')
    setInvalid({ name: nameBad, email: emailBad })

    if (nameBad || emailBad) {
      form.reportValidity()
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      // fetch() only rejects on network failure — a 404 or 500 resolves
      // normally, so the status must be checked explicitly or a server-side
      // rejection would render as success.
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`)

      setStatus('success')
      // The conversion event fires here and nowhere else: a submission that
      // never landed is not a conversion.
      trackContactFormSubmit()
    } catch (err) {
      setStatus('error')
      trackContactFormError(err instanceof Error ? err.message : 'unknown')
    }
  }

  const submitting = status === 'submitting'

  return (
    <section id="contact" className="section bg-bg">
      <div className="container-page">
        <div className="panel p-8 lg:p-10 flex flex-col lg:flex-row gap-10" data-reveal>
          {/* Left */}
          <div className="flex-1 max-w-sm">
            <p className="eyebrow text-secondary mb-3">Let's talk</p>
            <h2 className="t-h3">
              Book your free discovery call.
            </h2>
            <p className="mt-4 text-muted font-medium text-body">
              30 minutes, no pitch. Tell us where it hurts and we'll tell you honestly whether we can
              help and what it would take.
            </p>
            <ul className="mt-5 space-y-3">
              {/* The scheduler link appears only when VITE_BOOKING_URL is set. */}
              {HAS_BOOKING && (
                <li className="flex items-center gap-2 text-[15px] text-muted font-medium">
                  <span className="text-primary font-bold">✦</span>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    data-track="booking_click"
                    data-track-label="contact_pick_a_time"
                    data-track-destination="scheduler"
                  >
                    Pick a time on the calendar
                  </a>
                </li>
              )}
              {[
                { label: CONTACT_EMAIL, href: CONTACT_MAILTO },
                { label: 'Serving distributors nationwide' },
                { label: 'Replies within one business day' },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-[15px] text-muted font-medium">
                  <span className="text-primary font-bold">✦</span>
                  {item.href ? (
                    <a href={item.href} className="text-primary hover:underline" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="flex-1">
            {status === 'success' ? (
              <div
                ref={resultRef}
                tabIndex={-1}
                role="status"
                className="note-success p-8 flex items-center justify-center text-center h-full min-h-[200px]"
              >
                <div>
                  <p className="text-secondary font-bold text-lg font-heading mb-2">Message sent.</p>
                  <p className="text-muted font-medium text-body">We'll get back to you within one business day.</p>
                </div>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                onFocusCapture={handleFormStart}
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="t-label text-faint block mb-2">
                      Name
                    </label>
                    <input id="name" name="name" type="text" required aria-required="true" aria-invalid={invalid.name || undefined} maxLength={100} autoComplete="name" placeholder="Jane Doe" className="input-dark" />
                  </div>
                  <div>
                    <label htmlFor="company" className="t-label text-faint block mb-2">
                      Company
                    </label>
                    <input id="company" name="company" type="text" maxLength={120} autoComplete="organization" placeholder="Acme Supply Co." className="input-dark" />
                  </div>
                  <div>
                    <label htmlFor="email" className="t-label text-faint block mb-2">
                      Email
                    </label>
                    <input id="email" name="email" type="email" required aria-required="true" aria-invalid={invalid.email || undefined} maxLength={254} autoComplete="email" placeholder="jane@acme.com" className="input-dark" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="t-label text-faint block mb-2">
                      Phone
                    </label>
                    <input id="phone" name="phone" type="tel" maxLength={30} pattern="[0-9+()\-\s.]{0,30}" autoComplete="tel" placeholder="(214) 555-0142" className="input-dark" />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="challenge" className="t-label text-faint block mb-2">
                    What's your biggest challenge?
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    rows={4}
                    maxLength={2000}
                    placeholder="Too much cash tied up in slow-moving inventory..."
                    className="input-dark resize-none"
                  />
                </div>

                {/* Failure state: the form stays exactly where it is, with
                    everything the visitor typed still in it, plus a fallback
                    route that doesn't depend on our form endpoint working. */}
                {status === 'error' && (
                  <div
                    ref={resultRef}
                    tabIndex={-1}
                    role="alert"
                    className="note-error mb-5 px-4 py-3"
                  >
                    <p className="font-bold text-caption text-danger mb-1">
                      That didn't go through.
                    </p>
                    <p className="text-muted font-medium text-caption">
                      Your message was not sent. Please try again, or email us directly at{' '}
                      <a href={CONTACT_MAILTO} className="text-primary font-bold hover:underline">
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                )}

                {/* Announces the in-flight state to screen readers, which get no
                    equivalent of watching a button label change. */}
                <p aria-live="polite" className="sr-only">
                  {submitting ? 'Sending your message…' : ''}
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className="btn-primary btn-block disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending…' : status === 'error' ? 'Try Again →' : 'Book My Free Call →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
