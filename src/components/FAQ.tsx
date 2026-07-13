import { useState } from 'react'
import { faqs } from '../data/faqs'

export default function FAQ() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section id="faq" className="section bg-surface border-t-hairline border-b-hairline">
      <div className="container-prose text-center">
        <p className="eyebrow text-primary mb-3">FAQ</p>
        <h2 className="t-h2">
          Questions distributors ask us.
        </h2>

        <div className="mt-8 space-y-3 text-left">
          {faqs.map((item, i) => (
            <div
              key={i}
              data-reveal
              data-reveal-delay={i * 50}
              className={`rounded-lg overflow-hidden border transition-colors bg-[rgba(10,15,28,0.5)] ${
                open === i ? 'border-primary/30' : 'hairline'
              }`}
            >
              {/* The trigger is wrapped in a heading so the accordion appears in
                  a screen reader's heading outline — the standard way to let
                  users jump between questions instead of tabbing through all of
                  them. The h3 is style-free, so nothing changes visually. */}
              <h3>
                <button
                  type="button"
                  id={`faq-trigger-${i}`}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span className="t-h5 text-text-base pr-4">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 text-primary font-bold text-[20px] leading-none"
                    style={{
                      transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s var(--ease)',
                    }}
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                className={`expandable ${open === i ? 'open' : ''}`}
              >
                <div>
                  <p className="px-6 pb-5 text-muted font-medium text-body">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
