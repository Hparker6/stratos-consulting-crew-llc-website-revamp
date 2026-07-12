import HeroDashboardMock from './HeroDashboardMock'

const badges = [
  { label: 'Cost Reduction', color: '#2f8fff' },
  { label: 'Inventory Optimization', color: '#27e0a0' },
  { label: 'DFW Based', color: '#2f8fff' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: '#0a0f1c' }}
      aria-label="Hero"
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(47,143,255,0.13) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(39,224,160,0.1) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 gap-12">
          {/* Text column */}
          <div className="flex-1 max-w-[540px]">
            {/*
              Using display:block spans so the break always falls after "be"
              regardless of viewport — no dangling word.
            */}
            <h1 className="font-heading font-extrabold text-[40px] md:text-[54px] lg:text-[60px] leading-[1.06] tracking-[-0.03em] text-text-base">
              <span className="block">Your data should be</span>
              <span className="block gradient-text">making you money.</span>
            </h1>

            <p className="mt-6 text-muted font-medium text-[17px] leading-relaxed max-w-[490px]">
              Dashboards, forecasting, and inventory analytics for small distributors across
              Dallas-Fort Worth. No enterprise price tag. No buzzwords. Just clear numbers that
              help you make better decisions.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary" data-track="cta_click" data-track-label="hero_book_call">
                Book a Free Discovery Call →
              </a>
              <a href="#services" className="btn-secondary" data-track="cta_click" data-track-label="hero_see_services">
                See How We Help
              </a>
            </div>

            {/* Category badges */}
            <div className="mt-8 flex flex-wrap gap-6">
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

          {/* Dashboard mock column */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <HeroDashboardMock />
          </div>
        </div>
      </div>
    </section>
  )
}
