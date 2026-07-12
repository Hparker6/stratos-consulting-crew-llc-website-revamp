import { useState } from 'react'

const faqs = [
  {
    q: 'Do you work with small companies?',
    a: "Yes — that's the entire point. We focus on distributors and manufacturers with 1–50 employees who don't have an analyst on staff.",
  },
  {
    q: 'How fast should I expect results?',
    a: 'Every project is scoped so the first tangible win — usually freed-up cash from inventory or hours saved on weekly reporting — lands within the first 30–60 days. If we don’t believe your data can support that, we’ll tell you on the discovery call.',
  },
  {
    q: 'You’re a new firm — why should I trust you?',
    a: 'Because we won’t ask you to. There are no fake logos or testimonials here; instead, every engagement is structured so trust is never required up front: a free call, then a small fixed-fee assessment whose report you keep, then fixed-scope projects you can stop after any phase. You own everything we build at every step.',
  },
  {
    q: 'What tools do you use?',
    a: "Power BI, SQL, Python, and Excel. We meet your data where it lives, from QuickBooks to your ERP — no rip-and-replace required.",
  },
  {
    q: 'Can you work with our existing systems?',
    a: "Almost always. We connect to your current ERP, accounting, and inventory systems instead of forcing you onto something new.",
  },
  {
    q: 'How much does the first conversation cost?',
    a: "Nothing. The discovery call is free, takes 30 minutes, and there's no obligation. We'll tell you honestly whether we can help.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section
      id="faq"
      className="py-16 lg:py-20"
      style={{
        background: '#101a2e',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-3xl mx-auto px-5 text-center">
        <p className="eyebrow text-primary mb-3">FAQ</p>
        <h2 className="font-heading font-bold text-[36px] md:text-[48px] tracking-[-0.02em]">
          Questions distributors ask us.
        </h2>

        <div className="mt-8 space-y-3 text-left">
          {faqs.map((item, i) => (
            <div
              key={i}
              data-reveal
              data-reveal-delay={i * 50}
              className="rounded-[14px] overflow-hidden transition-colors"
              style={{
                border: open === i ? '1px solid rgba(47,143,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(10,15,28,0.5)',
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span className="font-heading font-semibold text-[17px] text-text-base pr-4">{item.q}</span>
                <span
                  className="flex-shrink-0 text-primary font-bold text-[20px] leading-none"
                  style={{
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s var(--ease)',
                  }}
                >
                  +
                </span>
              </button>
              <div className={`expandable ${open === i ? 'open' : ''}`}>
                <div>
                  <p className="px-6 pb-5 text-muted font-medium text-[16px] leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
