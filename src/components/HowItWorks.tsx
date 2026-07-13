import { Link } from 'react-router-dom'

const steps = [
  {
    num: '1',
    title: 'Discovery Call',
    body: 'A free 30-minute call. Tell us where it hurts: margins, inventory, reporting. No pitch.',
  },
  {
    num: '2',
    title: 'Custom Assessment',
    body: 'We dig into your data and hand you a clear plan with the biggest wins ranked first.',
  },
  {
    num: '3',
    title: 'Ongoing Partnership',
    body: 'We build, automate, and keep improving. Think of it as your fractional analytics team, on call.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-sm bg-elevated border-b-hairline">
      <div className="container-page text-center">
        <p className="eyebrow text-primary mb-3">How it works</p>
        <h2 className="t-h2">
          Three steps. No jargon.
        </h2>

        {/* Steps with connecting line */}
        <div className="relative mt-8">
          {/* Horizontal connector: runs between the three circle centers */}
          <div
            className="hidden md:block absolute"
            style={{
              top: 31,
              left: 'calc(100% / 6 + 31px)',
              right: 'calc(100% / 6 + 31px)',
              height: 1,
              background: 'linear-gradient(90deg, rgba(47,143,255,0.5) 0%, rgba(47,143,255,0.2) 50%, rgba(47,143,255,0.5) 100%)',
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="flex flex-col items-center text-center px-4"
                data-reveal
                data-reveal-delay={i * 90}
              >
                <div className="step-marker relative z-10 w-[62px] h-[62px] mb-4 text-[22px] !bg-elevated">
                  {s.num}
                </div>
                <h3 className="t-h5 text-text-base mb-3">{s.title}</h3>
                <p className="text-muted font-medium text-body max-w-[240px] mx-auto">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <Link to="/process" className="inline-flex mt-8 text-primary font-bold text-[15px] hover:underline">
          See the full process, phase by phase →
        </Link>
      </div>
    </section>
  )
}
