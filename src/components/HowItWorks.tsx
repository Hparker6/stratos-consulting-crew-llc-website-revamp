import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'

const steps = [
  {
    num: '1',
    title: 'Discovery Call',
    line: 'You talk, we listen for the leak — where the money and the hours are going.',
    meta: 'FREE · 30 MIN',
    leave: 'A straight read on your biggest operational bottleneck — no pitch, no obligation.',
  },
  {
    num: '2',
    title: 'Assessment',
    line: 'We rank your data by what it pays, and quote the work before it starts.',
    meta: 'FIXED FEE · 1–2 WKS',
    leave: 'A ranked, fixed-price roadmap — yours to keep, whether we build it or not.',
  },
  {
    num: '3',
    title: 'Partnership',
    line: 'We build it, deploy it, and keep it earning — month to month.',
    meta: 'MONTH-TO-MONTH',
    leave: 'Live dashboards, automations, and a monthly working session on the numbers.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-sm bg-elevated border-b-hairline">
      <div className="container-page text-center">
        <SectionHeader
          index="04"
          eyebrow="How it works"
          accent="blue"
          align="center"
          title={
            <>
              Three steps.{' '}
              <em className="emph">
                No jargon.
              </em>
            </>
          }
        />

        <div className="relative mt-12">
          {/* The engagement rail — a live wire carrying a packet between the three
              stations. A process spine, not a chart. */}
          <div className="hidden md:block absolute left-[16.6%] right-[16.6%] top-[9px] h-[2px] rounded wire-flow" aria-hidden="true" />
          <div className="hidden md:block absolute left-[16.6%] right-[16.6%] top-[5px]" aria-hidden="true">
            <span className="journey-packet absolute block w-[9px] h-[9px] rounded-full -ml-[4px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-left">
            {steps.map((s, i) => (
              <div key={s.num} className="flex flex-col items-center md:items-start" data-reveal data-reveal-delay={i * 90}>
                <span
                  className="relative z-10 w-[20px] h-[20px] rounded-full mb-7 flex-shrink-0"
                  style={{
                    background: 'linear-gradient(180deg, #ffca5c, #2f8fff)',
                    border: '3px solid #0c1a30',
                    boxShadow: '0 0 0 1px rgba(47,143,255,0.5), 0 0 16px rgba(47,143,255,0.45)',
                  }}
                  aria-hidden="true"
                />
                <div className="card w-full p-7 text-left flex flex-col h-full">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-[44px] leading-none text-secondary" style={{ fontWeight: 380 }}>
                      0{s.num}
                    </span>
                    <span className="chip-accent">{s.meta}</span>
                  </div>
                  <h3 className="font-display text-[22px] text-text-base tracking-[-0.01em] mt-6 mb-2" style={{ fontWeight: 460 }}>
                    {s.title}
                  </h3>
                  <p className="text-muted font-medium text-body">{s.line}</p>
                  <div className="mt-6 pt-5 border-t border-[var(--line-soft)]">
                    <p className="t-label text-faint mb-2">You leave with</p>
                    <div className="flex items-start gap-2.5">
                      <span className="text-secondary mt-[2px] flex-shrink-0" aria-hidden="true">
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>
                      </span>
                      <p className="text-text-base font-medium text-body-sm leading-snug">{s.leave}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link to="/process" className="inline-flex mt-10 link-underline">
          Watch the full engagement, phase by phase →
        </Link>
      </div>
    </section>
  )
}
