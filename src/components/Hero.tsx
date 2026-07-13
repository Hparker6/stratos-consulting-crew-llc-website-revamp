import HeroDashboardMock from './HeroDashboardMock'
import BookCallLink from './BookCallLink'

const badges = [
  { label: 'Cost Reduction', color: '#2f8fff' },
  { label: 'Inventory Optimization', color: '#27e0a0' },
  { label: 'Remote-Friendly', color: '#2f8fff' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-bg" aria-label="Hero">
      {/* Directional overhead light — establishes a single light source so the
          scene reads as a lit room rather than a flat navy plane. */}
      <div className="pointer-events-none absolute inset-0 hero-spotlight" />
      {/* Ambient glows — .glow is the shape, the modifier supplies the colour. */}
      <div className="glow glow-primary drift-a -top-32 -left-32 w-[600px] h-[600px]" />
      <div className="glow glow-secondary drift-b bottom-0 right-0 w-[500px] h-[500px]" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      <div className="relative container-page py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 gap-12">
          {/* Text column */}
          <div className="flex-1 max-w-[540px]">
            {/*
              Two deliberate LCP decisions here:

              1. rise-solid (transform-only) rather than rise (fade + transform).
                 Chrome does not count an element at opacity:0 as painted, so
                 fading the headline in deferred LCP by the whole animation.

              2. One text block, not two. The lines used to be two display:block
                 spans, which LCP measures as two separate (and therefore small)
                 text blocks — small enough that the cookie banner's paragraph
                 beat them and became the LCP element. That was much worse than
                 it sounds: the banner is client-rendered, so LCP was gated on
                 JS hydration rather than on paint. A <br> keeps the exact same
                 line break while making the headline a single, large block that
                 is already present in the prerendered HTML.
            */}
            <h1 className="font-heading font-extrabold text-[40px] md:text-[54px] lg:text-[60px] leading-[1.06] tracking-[-0.03em] text-text-base rise-solid">
              Your data should be
              <br />
              <span className="gradient-text">making you money.</span>
            </h1>

            <p className="mt-6 text-muted font-medium text-body-lg max-w-[490px] rise rise-2">
              Dashboards, forecasting, and inventory analytics for small distributors.
              No enterprise price tag. No buzzwords. Just clear numbers that
              help you make better decisions.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 rise rise-3">
              <BookCallLink label="hero_book_call" className="btn-primary">
                Book a Free Discovery Call →
              </BookCallLink>
              <a
                href="#services"
                className="btn-secondary"
                data-track="cta_click"
                data-track-label="hero_see_services"
                data-track-destination="services_section"
              >
                See How We Help
              </a>
            </div>

            {/* Category badges */}
            <div className="mt-8 flex flex-wrap gap-6 rise rise-4">
              {badges.map((b) => (
                <span
                  key={b.label}
                  className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted font-medium"
                >
                  <span
                    className="inline-block w-[7px] h-[7px] rounded-sm flex-shrink-0"
                    style={{ background: b.color }}
                  />
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Dashboard mock column — floated on an underglow so it sits in lit
              space with real depth instead of pasted flat on the background. */}
          <div className="flex-1 flex justify-center lg:justify-end rise rise-3">
            <div className="relative w-full max-w-[640px]">
              <div className="dash-underglow" aria-hidden="true" />
              <div className="relative z-10">
                <HeroDashboardMock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
