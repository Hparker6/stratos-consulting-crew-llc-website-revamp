import { useState } from 'react'

const faqs = [
  {
    q: 'Do you work with small companies?',
    a: "Yes — that's the entire point. We focus on distributors and manufacturers with 1–50 employees who don't have an analyst on staff.",
  },
  {
    q: 'How fast will I see ROI?',
    a: 'Most clients see their first wins within 30–60 days — usually freed-up cash from inventory or hours saved every week on reporting.',
  },
  {
    q: 'What tools do you use?',
    a: "Power BI, SQL, Python, and Excel. We meet your data where it lives, from QuickBooks to your ERP — no rip-and-replace required.",
  },
  {
    q: 'Can you work with our existing systems?',
    a: "Almost always. We connect to your current ERP, accounting, and inventory systems instead of forcing you onto something new.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section id="faq" className="py-20 lg:py-28 bg-bg">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <p className="eyebrow text-primary mb-4">FAQ</p>
        <h2 className="font-heading font-bold text-[32px] md:text-[42px] tracking-[-0.02em]">
          Questions distributors ask us.
        </h2>

        <div className="mt-12 space-y-3 text-left">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="rounded-[14px] overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#101a2e' }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span className="font-heading font-semibold text-[15px] text-text-base pr-4">{item.q}</span>
                <span
                  className="flex-shrink-0 text-primary font-bold text-[20px] leading-none transition-transform duration-200"
                  style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-muted text-[14px] leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
