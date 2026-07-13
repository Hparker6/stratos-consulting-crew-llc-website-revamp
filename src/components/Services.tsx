import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import useSectionView from '../hooks/useSectionView'

function IconGrid() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="#2f8fff" strokeWidth="1.5"/>
      <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="#2f8fff" strokeWidth="1.5"/>
      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="#2f8fff" strokeWidth="1.5"/>
      <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="#2f8fff" strokeWidth="1.5"/>
    </svg>
  )
}
function IconTrend() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 14l5-5 3.5 3.5L16 6" stroke="#27e0a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 6h3v3" stroke="#27e0a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function IconBox() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L17 6v8L10 18 3 14V6L10 2z" stroke="#2f8fff" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 2v16M3 6l7 4 7-4" stroke="#2f8fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function IconDollar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2v16M14 5.5H8a2.5 2.5 0 000 5h4a2.5 2.5 0 010 5H6" stroke="#27e0a0" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}
function IconBolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" stroke="#2f8fff" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}
function IconDonut() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="#27e0a0" strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="4" stroke="#27e0a0" strokeWidth="1.5"/>
    </svg>
  )
}

const services = [
  {
    icon: <IconGrid />,
    tileClass: 'icon-tile-blue',
    title: 'Executive Dashboards',
    body: 'Power BI dashboards, KPI reporting, and automated weekly reports your leadership actually opens.',
  },
  {
    icon: <IconTrend />,
    tileClass: 'icon-tile-green',
    title: 'Demand & Sales Forecasting',
    body: 'Forecast what sells, when, and how much, by product line, customer, and season.',
  },
  {
    icon: <IconBox />,
    tileClass: 'icon-tile-blue',
    title: 'Inventory Optimization',
    body: 'Safety stock, reorder points, min/max, and excess & slow-mover analysis that frees up cash.',
  },
  {
    icon: <IconDollar />,
    tileClass: 'icon-tile-green',
    title: 'Cost Reduction & Profitability',
    body: 'Spend analysis, vendor benchmarking, and margin optimization that finds real money.',
  },
  {
    icon: <IconBolt />,
    tileClass: 'icon-tile-blue',
    title: 'Automation',
    body: 'Kill manual reports with data pipelines and process automation that runs itself.',
  },
  {
    icon: <IconDonut />,
    tileClass: 'icon-tile-green',
    title: 'Ongoing Analytics Partner',
    body: 'A monthly partnership that gives you an analytics team without the headcount or the overhead.',
  },
]

/** Tracks the cursor for the .spotlight radial highlight. */
function setSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Services() {
  const viewRef = useSectionView<HTMLElement>('home_services')
  return (
    <section
      id="services"
      ref={viewRef}
      className="relative overflow-hidden section bg-surface border-t-hairline"
    >
      {/* Faint data dot-grid texture */}
      <div className="pointer-events-none absolute inset-0 dot-grid" />

      {/* Faint large watermark bar-chart in the background */}
      <div className="pointer-events-none absolute right-0 bottom-0 w-1/2 h-full overflow-hidden opacity-[0.035]">
        <svg
          viewBox="0 0 480 320"
          preserveAspectRatio="xMaxYMax meet"
          className="absolute right-0 bottom-0 w-full h-full"
          aria-hidden="true"
        >
          {[
            { x: 20,  h: 160 }, { x: 80,  h: 220 }, { x: 140, h: 140 },
            { x: 200, h: 280 }, { x: 260, h: 180 }, { x: 320, h: 260 },
            { x: 380, h: 200 }, { x: 440, h: 300 },
          ].map((b) => (
            <rect key={b.x} x={b.x} y={320 - b.h} width={40} height={b.h} rx={4} fill="#2f8fff" />
          ))}
        </svg>
      </div>

      <div className="relative container-page text-center">
        <p className="eyebrow text-secondary mb-3">What we do</p>
        <h2 className="t-h2">
          Six ways we turn data into dollars.
        </h2>
        <p className="mt-4 text-muted font-medium text-body-lg max-w-lg mx-auto leading-relaxed">
          Mix and match, or hand us the whole problem. Everything's built around your numbers, your systems, your team.
        </p>

        {/* Bento grid: featured card + mixed tiles + full-width band */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-6 gap-5 text-left">
          {services.map((s, i) => {
            const span =
              i === 0 ? 'md:col-span-4' : i === 5 ? 'md:col-span-6' : 'md:col-span-2'
            return (
              <article
                key={s.title}
                data-reveal
                data-reveal-delay={(i % 3) * 70}
                onMouseMove={setSpotlight}
                className={`spotlight card-lift p-6 rounded-lg border hairline bg-[rgba(10,15,28,0.55)] ${span} ${
                  i === 5 ? 'md:flex md:items-center md:gap-6' : ''
                }`}
              >
                <div className={i === 5 ? 'md:flex md:items-center md:gap-5 md:flex-1' : ''}>
                  <div className={`${s.tileClass} mb-4 ${i === 5 ? 'md:mb-0 md:flex-shrink-0' : ''}`} aria-hidden="true">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="t-h5 text-text-base mb-2">{s.title}</h3>
                    <p className="text-muted font-medium text-body">{s.body}</p>
                  </div>
                </div>

                {/* Featured card: decorative margin-trend flourish */}
                {i === 0 && (
                  <div className="mt-5 flex items-end gap-[6px] h-[54px]" aria-hidden="true">
                    {[34, 46, 40, 58, 50, 66, 60, 74, 82].map((h, n) => (
                      <div
                        key={n}
                        className="flex-1 rounded-t-[4px]"
                        style={{
                          height: `${h}%`,
                          maxWidth: 30,
                          background:
                            n >= 7
                              ? 'linear-gradient(180deg, #27e0a0, #2f8fff)'
                              : 'rgba(47,143,255,0.35)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 relative z-10">
          <Link to="/services" className="btn-secondary">
            Explore All Services →
          </Link>
          <Link to="/solutions" className="btn-secondary">
            See the Problems We Solve
          </Link>
        </div>
      </div>

      {/* Wave divider into How It Works */}
      <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 20"
          preserveAspectRatio="none"
          style={{ width: '100%', height: 20, display: 'block' }}
          aria-hidden="true"
        >
          <path d="M0,0 C360,20 1080,0 1440,20 L1440,20 L0,20 Z" fill="#0c1a30" />
        </svg>
      </div>
    </section>
  )
}
