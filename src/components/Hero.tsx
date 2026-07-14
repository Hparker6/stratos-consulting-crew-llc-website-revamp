import { useEffect, useRef } from 'react'
import HeroDashboardMock from './HeroDashboardMock'
import BookCallLink from './BookCallLink'
import CountUp from './CountUp'

const badges = [
  { label: 'Cost Reduction', color: '#2f8fff' },
  { label: 'Inventory Optimization', color: '#27e0a0' },
  { label: 'Remote-Friendly', color: '#2f8fff' },
]

/**
 * Floating glass metric that reinforces the outcome story without repeating
 * the dashboard's own KPIs. Numbers count up when the hero enters view.
 */
function FloatChip({
  label,
  value,
  format,
  trend,
  accent,
}: {
  label: string
  value: number
  format: (n: number) => string
  trend: string
  accent: string
}) {
  return (
    <div className="metric-chip rounded-xl px-4 py-3 w-[176px]">
      <div className="flex items-center gap-2 mb-[6px]">
        <span className="pulse-dot w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: accent, color: accent }} />
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint truncate">{label}</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="font-heading font-bold text-[26px] leading-none text-text-base tabular-nums">
          <CountUp value={value} format={format} />
        </span>
        <span className="font-mono text-[11px] font-bold mb-[3px]" style={{ color: accent }}>
          {trend}
        </span>
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  // Cursor-follow light + pointer parallax. Enhancement only: it never runs on
  // touch or under reduced-motion, and the CSS falls back to a static, composed
  // frame (so the prerendered markup and no-JS visitors lose nothing).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reduced.matches) return

    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        const y = (e.clientY - r.top) / r.height
        el.style.setProperty('--mx', `${(x * 100).toFixed(2)}%`)
        el.style.setProperty('--my', `${(y * 100).toFixed(2)}%`)
        el.style.setProperty('--px', ((x - 0.5) * 22).toFixed(2))
        el.style.setProperty('--py', ((y - 0.5) * 22).toFixed(2))
      })
    }
    const onLeave = () => {
      el.style.setProperty('--px', '0')
      el.style.setProperty('--py', '0')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section ref={ref} id="hero" className="relative overflow-hidden bg-bg" aria-label="Hero">
      {/* Layered lighting — a breathing aurora, a fixed overhead spotlight, and a
          light that follows the cursor. Stacked, they read as one lit room. */}
      <div className="pointer-events-none absolute inset-0 hero-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hero-spotlight" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hero-cursor-light" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid grid-fade" aria-hidden="true" />

      <div className="relative container-page py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 gap-12">
          {/* Text column */}
          <div className="flex-1 max-w-[540px]">
            {/* Glass kicker — sets the "live analytics" tone before the headline. */}
            <div className="rise-solid mb-6 inline-flex items-center gap-2 hero-kicker rounded-full pl-3 pr-4 py-[7px]">
              <span className="pulse-dot w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: '#3ff0c0', color: '#3ff0c0' }} />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted font-medium">
                Live distributor analytics
              </span>
            </div>

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
              <span className="gradient-text-flow">making you money.</span>
            </h1>

            <p className="mt-6 text-muted font-medium text-body-lg max-w-[490px] rise rise-2">
              Dashboards, forecasting, and inventory work for small distributors and
              manufacturers. You'll know which lines make money, what to buy next,
              and how much cash is sitting on your shelves.
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

          {/* Dashboard stage — the depth composition. The panel drifts opposite
              the cursor (parallax-back) while the glass chips lead it
              (parallax-fore), all floated on an underglow. */}
          <div className="flex-1 flex justify-center lg:justify-end rise rise-3">
            <div className="relative w-full max-w-[640px]">
              <div className="dash-underglow" aria-hidden="true" />

              <div className="relative z-10 parallax-back">
                <HeroDashboardMock />
              </div>

              {/* Floating metrics — hidden on small screens to keep the mobile
                  hero clean; they exist to add depth, not information. */}
              <div className="hidden lg:block absolute -top-6 -left-8 z-20 parallax-fore">
                <div className="float-a">
                  <FloatChip label="Hours saved / wk" value={12} format={(n) => `${Math.round(n)}h`} trend="▲" accent="#3ff0c0" />
                </div>
              </div>
              <div className="hidden lg:block absolute -bottom-6 -right-5 z-20 parallax-fore">
                <div className="float-b">
                  <FloatChip label="Forecast accuracy" value={94} format={(n) => `${Math.round(n)}%`} trend="▲ 6" accent="#2f8fff" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
