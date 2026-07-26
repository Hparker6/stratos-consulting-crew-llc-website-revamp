import { useEffect, useRef } from 'react'
import BookCallLink from './BookCallLink'
import CountUp from './CountUp'
import HeroDashboard from './HeroDashboard'

/** The three outcome numbers that carry the hero's proof — earned, human, and
 *  chart-free. They count up when the hero is first seen. */
const metrics: { value: number; format: (n: number) => string; label: string; gold?: boolean }[] = [
  { value: 12400, format: (n) => Math.round(n).toLocaleString(), label: 'SKUs modelled on your own sales history' },
  { value: 182, format: (n) => `$${Math.round(n)}K`, label: 'cash freed from slow-moving inventory', gold: true },
  { value: 94, format: (n) => `${Math.round(n)}%`, label: 'forecast accuracy, tracked openly every cycle', gold: true },
]

/** Faint concentric survey rings — the "from altitude" brand signature, kept as
 *  ambient texture behind the product shot rather than the main event. */
function AltitudeRings() {
  return (
    <svg className="hero-rings" viewBox="0 0 760 760" fill="none" aria-hidden="true">
      <g stroke="#2f8fff" strokeOpacity="0.28" strokeWidth="1">
        <circle cx="380" cy="360" r="120" /><circle cx="378" cy="362" r="186" />
      </g>
      <g stroke="#f5b544" strokeOpacity="0.3" strokeWidth="1.1">
        <circle cx="376" cy="364" r="246" /><circle cx="374" cy="366" r="310" /><circle cx="370" cy="370" r="374" />
      </g>
      <circle className="ring-sweep" cx="380" cy="360" r="186" fill="none" stroke="#ffca5c" strokeOpacity="0.85" strokeWidth="1.5" strokeDasharray="3 1160" />
    </svg>
  )
}

/** Small floating forecast card — overlaps the dashboard for depth, the way
 *  Ashby / Retool layer product panels. */
function ForecastCard() {
  const pts = [22, 28, 25, 34, 33, 42, 48, 58]
  const w = 132
  const h = 40
  const lo = 18
  const hi = 62
  const d = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${(4 + (i / (pts.length - 1)) * (w - 8)).toFixed(1)} ${(h - 4 - ((v - lo) / (hi - lo)) * (h - 8)).toFixed(1)}`).join(' ')
  return (
    <div className="metric-chip rounded-xl px-4 py-3 w-[210px]">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">Forecast · next 30 days</span>
        <span className="pulse-dot w-[6px] h-[6px] rounded-full" style={{ background: '#2f8fff', color: '#2f8fff' }} />
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ height: 40, display: 'block' }} aria-hidden="true">
        <path d={`${d} L ${w - 4} ${h - 4} L 4 ${h - 4} Z`} fill="rgba(47,143,255,0.12)" />
        <path className="draw-line" d={d} fill="none" stroke="#4a9bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ ['--len' as string]: 190 }} />
        <circle cx={w - 4} cy={h - 4 - ((pts[pts.length - 1] - lo) / (hi - lo)) * (h - 8)} r="3" fill="#4a9bff" />
      </svg>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-heading font-bold text-[17px] text-text-base leading-none">+12%</span>
        <span className="font-mono text-[10px] text-secondary font-bold">94% confidence</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  // Cursor-follow light + pointer parallax. Enhancement only: never runs on
  // touch or under reduced-motion; CSS falls back to a static, composed frame.
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
        el.style.setProperty('--px', ((x - 0.5) * 18).toFixed(2))
        el.style.setProperty('--py', ((y - 0.5) * 18).toFixed(2))
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
      <div className="pointer-events-none absolute inset-0 hero-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hero-spotlight" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hero-cursor-light" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hero-horizon" aria-hidden="true" />

      <div className="relative container-page pt-16 pb-14 lg:pt-24 lg:pb-20">
        <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] gap-12 lg:gap-14 items-center">
          {/* Text column */}
          <div>
            <div className="rise-solid mb-7 inline-flex items-center gap-2 hero-kicker rounded-full pl-3 pr-4 py-[7px]">
              <span className="pulse-dot w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: '#ffca5c', color: '#ffca5c' }} />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted font-medium">
                Analytics · Automation · AI
              </span>
            </div>

            <h1 className="font-display text-[42px] md:text-[58px] lg:text-[64px] leading-[0.98] tracking-[-0.028em] text-text-base rise-solid [font-optical-sizing:auto]" style={{ fontWeight: 340 }}>
              Your data should be{' '}
              <em className="italic text-secondary" style={{ fontWeight: 420 }}>making you money.</em>
            </h1>

            <p className="mt-6 text-muted font-medium text-body-lg max-w-[44ch] rise rise-2">
              We build the dashboards, forecasting, and AI-driven automation that tell
              a distributor what it's actually making — and what to do next.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 rise rise-3">
              <BookCallLink label="hero_book_call" className="btn-primary">
                Book a Free Discovery Call →
              </BookCallLink>
              <a
                href="#dashboard"
                className="link-underline"
                data-track="cta_click"
                data-track-label="hero_see_sample_dashboard"
                data-track-destination="dashboard_section"
              >
                See a sample dashboard
              </a>
            </div>

            {/* Honest capability line in place of borrowed customer logos. */}
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-faint rise rise-4">
              Built on Power BI · SQL · Python — the stack your team already runs
            </p>
          </div>

          {/* Product column — the dashboard is the star, floated on an underglow
              over faint altitude rings, with a forecast card layered for depth. */}
          <div className="relative flex justify-center lg:justify-end rise rise-3">
            <div className="pointer-events-none absolute -top-16 -right-10 w-[600px] h-[600px] hidden lg:block" aria-hidden="true">
              <AltitudeRings />
            </div>
            <div className="relative w-full max-w-[680px]">
              <div className="dash-underglow" aria-hidden="true" />
              <div className="relative z-10 parallax-back">
                <HeroDashboard />
              </div>
              <div className="hidden lg:block absolute -bottom-12 -left-8 z-20 parallax-fore">
                <div className="float-b">
                  <ForecastCard />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Oversized outcome metrics — proof as earned numbers. */}
        <div className="relative mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--line)] rise rise-4">
          {metrics.map((m) => (
            <div key={m.label} className="py-8 sm:pr-8 sm:border-r sm:last:border-r-0 border-[var(--line-soft)]">
              <div
                className={`font-display leading-none tracking-[-0.02em] text-[48px] lg:text-[56px] tabular-nums ${m.gold ? 'text-secondary' : 'text-text-base'}`}
                style={{ fontWeight: 460 }}
              >
                <CountUp value={m.value} format={m.format} />
              </div>
              <p className="mt-3 text-muted font-medium text-body-sm max-w-[26ch]">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
