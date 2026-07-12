import { useRef, useState, FormEvent } from 'react'
import { track } from '../lib/analytics'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const startTracked = useRef(false)

  function handleFormStart() {
    if (startTracked.current) return
    startTracked.current = true
    track('contact_form_start', { form_name: 'contact' })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
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

    if (!body.get('name') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.get('email') ?? '')) {
      form.reportValidity()
      return
    }

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      setSubmitted(true)
      setDisabled(true)
      setTimeout(() => setDisabled(false), 10000)
    } catch {
      setSubmitted(true)
    }
    track('contact_form_submit', { form_name: 'contact' })
  }

  return (
    <section id="contact" className="py-16 lg:py-20 bg-bg">
      <div className="max-w-6xl mx-auto px-5">
        <div
          className="rounded-[24px] p-8 lg:p-10 flex flex-col lg:flex-row gap-10"
          data-reveal
          style={{
            background: 'linear-gradient(135deg, rgba(47,143,255,0.08) 0%, rgba(39,224,160,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 100px rgba(47,143,255,0.08), 0 0 60px rgba(39,224,160,0.04)',
          }}
        >
          {/* Left */}
          <div className="flex-1 max-w-sm">
            <p className="eyebrow text-secondary mb-3">Let's talk</p>
            <h2 className="font-heading font-bold text-[30px] md:text-[40px] tracking-[-0.02em] leading-tight">
              Book your free discovery call.
            </h2>
            <p className="mt-4 text-muted font-medium text-[16px] leading-relaxed">
              30 minutes, no pitch. Tell us where it hurts and we'll tell you honestly whether we can
              help and what it would take.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                { label: 'hparker6@stratosconsultingcrew.com', href: 'mailto:hparker6@stratosconsultingcrew.com' },
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
            {submitted ? (
              <div
                className="rounded-[14px] p-8 flex items-center justify-center text-center h-full min-h-[200px]"
                style={{ background: 'rgba(39,224,160,0.07)', border: '1px solid rgba(39,224,160,0.2)' }}
              >
                <div>
                  <p className="text-secondary font-bold text-lg font-heading mb-2">Message sent.</p>
                  <p className="text-muted font-medium text-[16px]">We'll get back to you within one business day.</p>
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
                    <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint block mb-2">
                      Name
                    </label>
                    <input id="name" name="name" type="text" required maxLength={100} autoComplete="name" placeholder="Jane Doe" className="input-dark" />
                  </div>
                  <div>
                    <label htmlFor="company" className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint block mb-2">
                      Company
                    </label>
                    <input id="company" name="company" type="text" maxLength={120} autoComplete="organization" placeholder="Acme Supply Co." className="input-dark" />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint block mb-2">
                      Email
                    </label>
                    <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="jane@acme.com" className="input-dark" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint block mb-2">
                      Phone
                    </label>
                    <input id="phone" name="phone" type="tel" maxLength={30} pattern="[0-9+()\-\s.]{0,30}" autoComplete="tel" placeholder="(214) 555-0142" className="input-dark" />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="challenge" className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint block mb-2">
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

                <button
                  type="submit"
                  disabled={disabled}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book My Free Call →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
