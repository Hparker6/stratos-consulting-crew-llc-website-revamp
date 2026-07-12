import usePageMeta from '../hooks/usePageMeta'
import PageHeader from '../components/PageHeader'
import CTABand from '../components/CTABand'

interface Phase {
  num: string
  title: string
  duration: string
  happens: string[]
  youGet: string
}

const phases: Phase[] = [
  {
    num: '01',
    title: 'Discovery Call',
    duration: 'Free · 30 minutes',
    happens: [
      'You describe where it hurts: margins, inventory, reporting, forecasting.',
      'We ask about your systems, your data, and how decisions get made today.',
      'We tell you honestly whether analytics can move your problem, and roughly what it would take. If we’re not the right fit, we’ll say so.',
    ],
    youGet: 'A straight answer and, if it makes sense, a proposed scope for an assessment. No obligation either way.',
  },
  {
    num: '02',
    title: 'Data & Opportunity Assessment',
    duration: 'Fixed fee · 1–2 weeks',
    happens: [
      'We take a structured look at your actual data: sales history, inventory, purchasing, margins.',
      'We test data quality and identify what your systems can support today vs. what needs cleanup.',
      'We rank the opportunities by expected impact and effort, biggest wins first.',
    ],
    youGet: 'A written, ranked opportunity report and a 60-minute findings call. The report is yours to act on, with us or without us.',
  },
  {
    num: '03',
    title: 'Build & Validate',
    duration: 'Fixed scope · 2–6 weeks',
    happens: [
      'We build the agreed scope, whether dashboards, forecasts, or stocking rules, connected live to your systems.',
      'Every metric definition is reviewed with your team so the numbers are trusted before they’re used.',
      'You see working versions early and often; course corrections happen mid-build, not after delivery.',
    ],
    youGet: 'Working analytics on your real data, validated against numbers your team already believes.',
  },
  {
    num: '04',
    title: 'Implementation & Training',
    duration: 'Included in every build',
    happens: [
      'We wire the outputs into your routines: the Monday meeting, the purchasing cycle, the account review.',
      'Your team is trained on using and questioning the tools, in plain English.',
      'Documentation covers how everything works and how definitions are calculated.',
    ],
    youGet: 'Tools your team actually uses, plus the documentation to stay self-sufficient. You own everything we build.',
  },
  {
    num: '05',
    title: 'Ongoing Optimization',
    duration: 'Optional · month-to-month',
    happens: [
      'Dashboards and models are maintained, tuned, and extended as the business changes.',
      'A monthly working session digs into the numbers with your leadership team.',
      'New questions get answered from the priority queue, like having an analyst on staff.',
    ],
    youGet: 'A fractional analytics team, cancelable any month. It continues only while it clearly earns its keep.',
  },
]

export default function ProcessPage() {
  usePageMeta(
    'Our Process: Fixed-Scope Analytics Consulting',
    'How a Stratos engagement works: free discovery call, fixed-fee data assessment, fixed-scope build, implementation and training, and optional month-to-month optimization.',
    { breadcrumb: 'Our Process' },
  )

  return (
    <>
      <PageHeader
        eyebrow="Our Process"
        title={
          <>
            Low risk by design, <span className="gradient-text">every step of the way.</span>
          </>
        }
        lede="Each phase is scoped and priced before it starts, ends with something you own, and earns the next one. You can stop after any step and keep everything produced so far."
      />

      <section className="py-14 lg:py-16 bg-bg">
        <div className="max-w-4xl mx-auto px-5">
          <div className="relative">
            {/* Vertical connector */}
            <div
              className="hidden md:block absolute left-[30px] top-[40px] bottom-[40px] w-[2px]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(47,143,255,0.5) 0%, rgba(39,224,160,0.35) 100%)',
              }}
              aria-hidden="true"
            />
            <div className="space-y-8">
              {phases.map((ph) => (
                <article key={ph.num} className="relative md:pl-24" data-reveal>
                  <div
                    className="hidden md:flex absolute left-0 top-1 w-[62px] h-[62px] rounded-full items-center justify-center font-heading font-bold text-[18px] text-primary"
                    style={{ border: '2px solid #2f8fff', background: '#0a0f1c', zIndex: 1 }}
                    aria-hidden="true"
                  >
                    {ph.num}
                  </div>
                  <div className="card-lg p-7">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
                      <span className="md:hidden font-mono text-[13px] font-bold text-primary tracking-[0.1em]">
                        {ph.num}
                      </span>
                      <h2 className="font-heading font-bold text-[24px] tracking-[-0.02em] text-text-base">
                        {ph.title}
                      </h2>
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-[3px] rounded-[5px] text-secondary"
                        style={{ background: 'rgba(39,224,160,0.1)', border: '1px solid rgba(39,224,160,0.25)' }}
                      >
                        {ph.duration}
                      </span>
                    </div>

                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint mb-3">
                      What happens
                    </p>
                    <ul className="space-y-2 mb-5">
                      {ph.happens.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-[15px] text-muted font-medium leading-snug">
                          <span className="text-primary font-bold mt-[1px] flex-shrink-0">·</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div
                      className="rounded-[10px] px-4 py-3"
                      style={{ background: 'rgba(39,224,160,0.06)', border: '1px solid rgba(39,224,160,0.18)' }}
                    >
                      <p className="text-[14px] font-medium leading-relaxed text-muted">
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-secondary block mb-1">
                          What you walk away with
                        </span>
                        {ph.youGet}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Principles strip */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: 'Fixed scope, fixed price', body: 'Every phase is quoted before it starts. No open-ended billing.' },
              { title: 'You own everything', body: 'Dashboards, models, code, and documentation are yours, even if we part ways.' },
              { title: 'Stop anywhere', body: 'Each phase stands alone. Continue only when the last one proved its worth.' },
            ].map((p) => (
              <div key={p.title} className="card p-6 text-center">
                <h3 className="font-heading font-semibold text-[17px] text-text-base mb-2">{p.title}</h3>
                <p className="text-muted font-medium text-[14px] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Step one is free." body="The discovery call costs nothing and decides everything else. 30 minutes, no pitch, and an honest answer about fit." />
    </>
  )
}
