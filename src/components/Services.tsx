import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import useSectionView from '../hooks/useSectionView'

/* Custom-property style objects (--w, --off, …) aren't in the CSSProperties
   type; this narrows the cast to one tidy place. */
const vars = (o: Record<string, string | number>) => o as CSSProperties

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
function IconGrid() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="#2f8fff" strokeWidth="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="#2f8fff" strokeWidth="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="#2f8fff" strokeWidth="1.5" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="#2f8fff" strokeWidth="1.5" />
    </svg>
  )
}
function IconTrend() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 14l5-5 3.5 3.5L16 6" stroke="#27e0a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 6h3v3" stroke="#27e0a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconBox() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L17 6v8L10 18 3 14V6L10 2z" stroke="#2f8fff" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 2v16M3 6l7 4 7-4" stroke="#2f8fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconDollar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2v16M14 5.5H8a2.5 2.5 0 000 5h4a2.5 2.5 0 010 5H6" stroke="#27e0a0" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function IconBolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" stroke="#2f8fff" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}
function IconDonut() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="#27e0a0" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="4" stroke="#27e0a0" strokeWidth="1.5" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Shared graphic primitives                                           */
/* ------------------------------------------------------------------ */
function MiniSpark({ points, color, w = 46, h = 16 }: { points: number[]; color: string; w?: number; h?: number }) {
  const pad = 2
  const lo = Math.min(...points)
  const hi = Math.max(...points)
  const range = hi - lo || 1
  const d = points
    .map((v, i) => {
      const x = pad + (i / (points.length - 1)) * (w - pad * 2)
      const y = h - pad - ((v - lo) / range) * (h - pad * 2)
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ display: 'block' }}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 1 — Executive Dashboards (featured)                                 */
/* ------------------------------------------------------------------ */
function GraphExecDashboard() {
  const kpis = [
    { label: 'REVENUE', value: '$4.2M', spark: [30, 34, 32, 40, 44, 50, 58], color: '#2f8fff' },
    { label: 'MARGIN', value: '24.8%', spark: [20, 21, 22, 22, 23, 24, 25], color: '#0fa96f' },
    { label: 'TURNS', value: '6.4', spark: [3, 4, 4.5, 5, 5.5, 6, 6.4], color: '#2f8fff' },
  ]
  const bars = [38, 52, 44, 60, 50, 68, 58, 76, 88]
  const max = Math.max(...bars)
  return (
    <div className="feature-media rounded-lg p-4">
      <div className="grid grid-cols-3 gap-3 mb-4">
        {kpis.map((k) => (
          <div key={k.label} className="dash-tile rounded-[10px] px-3 py-2">
            <span className="font-mono text-[8px] tracking-[0.12em] text-faint">{k.label}</span>
            <div className="flex items-end justify-between gap-2 mt-1">
              <span className="font-heading font-bold text-[16px] text-text-base leading-none">{k.value}</span>
              <MiniSpark points={k.spark} color={k.color} />
            </div>
          </div>
        ))}
      </div>
      <div className="relative" style={{ height: 70 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="absolute left-0 right-0" style={{ top: `${(i / 2) * 100}%`, borderTop: '1px solid rgba(255,255,255,0.05)' }} />
        ))}
        <div className="absolute inset-0 flex items-end gap-[5px]">
          {bars.map((b, i) => {
            const best = i === bars.length - 1
            return (
              <div key={i} className="flex-1 h-full flex items-end">
                <div
                  className="w-full bar-grow"
                  style={{
                    height: `${(b / max) * 100}%`,
                    borderRadius: '4px 4px 0 0',
                    background: best
                      ? 'linear-gradient(180deg, #3ff0c0, #2f8fff)'
                      : 'linear-gradient(180deg, rgba(47,143,255,0.85), rgba(47,143,255,0.22))',
                    boxShadow: best ? '0 0 14px rgba(47,224,160,0.5)' : 'none',
                    animationDelay: `${i * 60}ms`,
                  }}
                />
              </div>
            )
          })}
        </div>
        <div className="feature-scan" />
      </div>
      <div className="mt-3 feature-reveal">
        <span className="font-mono text-[9px] text-primary">▸ drill company → region → SKU</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 2 — Demand & Sales Forecasting                                      */
/* ------------------------------------------------------------------ */
function GraphForecast() {
  const w = 248
  const h = 84
  const pad = 8
  const actual = [30, 36, 33, 42, 40, 48, 46, 54]
  const forecast = [54, 60, 58, 68, 74] // shares its first point with the last actual
  const n = actual.length + forecast.length - 1
  const lo = 25
  const hi = 80
  const X = (i: number) => pad + (i / (n - 1)) * (w - pad * 2)
  const Y = (v: number) => h - pad - ((v - lo) / (hi - lo)) * (h - pad * 2)
  const line = (pts: { i: number; v: number }[]) => pts.map((p, k) => `${k === 0 ? 'M' : 'L'} ${X(p.i).toFixed(1)} ${Y(p.v).toFixed(1)}`).join(' ')
  const split = actual.length - 1
  const actualPts = actual.map((v, i) => ({ i, v }))
  const fcPts = forecast.map((v, k) => ({ i: split + k, v }))
  const band = fcPts.map((p, k) => ({ i: p.i, up: p.v + k * 2.4 + 3, dn: p.v - k * 2.4 - 3 }))
  const bandPath = [
    ...band.map((b, i) => `${i === 0 ? 'M' : 'L'} ${X(b.i).toFixed(1)} ${Y(b.up).toFixed(1)}`),
    ...band.slice().reverse().map((b) => `L ${X(b.i).toFixed(1)} ${Y(b.dn).toFixed(1)}`),
    'Z',
  ].join(' ')
  const last = fcPts[fcPts.length - 1]
  return (
    <div className="feature-media rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[8px] tracking-[0.12em] text-faint">DEMAND · NEXT 5 MONTHS</span>
        <span className="flex items-center gap-2 font-mono text-[8px] text-faint">
          <span className="flex items-center gap-1"><i className="inline-block w-3 h-[2px] bg-primary rounded" />actual</span>
          <span className="flex items-center gap-1"><i className="inline-block w-3 h-[2px] rounded" style={{ background: '#3ff0c0' }} />forecast</span>
        </span>
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ height: 84 }} aria-hidden="true">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={pad} y1={pad + f * (h - pad * 2)} x2={w - pad} y2={pad + f * (h - pad * 2)} stroke="rgba(255,255,255,0.05)" />
        ))}
        <path className="fc-band" d={bandPath} fill="rgba(63,240,192,0.12)" />
        <path className="draw-line" d={line(actualPts)} fill="none" stroke="#2f8fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={line(fcPts)} fill="none" stroke="#3ff0c0" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="fc-ping" cx={X(last.i)} cy={Y(last.v)} r="6" fill="none" stroke="#3ff0c0" strokeWidth="1" />
        <circle cx={X(last.i)} cy={Y(last.v)} r="3.2" fill="#3ff0c0" />
      </svg>
      <div className="mt-1 feature-reveal">
        <span className="font-mono text-[9px] text-secondary">▲ +12% projected · 94% confidence</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 3 — Inventory Optimization                                          */
/* ------------------------------------------------------------------ */
function GraphInventory() {
  const reorder = 54
  const rows = [
    { l: 'Fasteners', w: 88, wh: 54, excess: true },
    { l: 'Valves', w: 46 },
    { l: 'Motors', w: 92, wh: 54, excess: true },
    { l: 'Seals', w: 38 },
  ] as { l: string; w: number; wh?: number; excess?: boolean }[]
  return (
    <div className="feature-media rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[8px] tracking-[0.12em] text-faint">STOCK vs REORDER POINT</span>
        <span className="font-mono text-[8px]" style={{ color: '#f0a83f' }}>▮ reorder</span>
      </div>
      <div className="relative space-y-[9px]">
        <div className="absolute top-[-2px] bottom-[-2px] z-10" style={{ left: `${reorder}%`, borderLeft: '1px dashed rgba(240,168,63,0.65)' }} />
        {rows.map((r) => (
          <div key={r.l} className="flex items-center gap-2">
            <span className="font-mono text-[8px] text-muted w-[48px] truncate flex-shrink-0">{r.l}</span>
            <div className="flex-1 h-[9px] rounded-full relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div
                className={`inv-bar absolute inset-y-0 left-0 rounded-full ${r.excess ? 'inv-excess' : ''}`}
                style={vars({
                  '--w': `${r.w}%`,
                  '--wh': `${r.wh ?? r.w}%`,
                  '--bar': r.excess
                    ? 'linear-gradient(90deg, rgba(217,119,6,0.45), #f0a83f)'
                    : 'linear-gradient(90deg, rgba(47,143,255,0.45), #2f8fff)',
                })}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 feature-reveal">
        <span className="font-mono text-[9px]" style={{ color: '#3ff0c0' }}>▼ $182K cash freed · 2 SKUs over-stocked</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 4 — Cost Reduction & Profitability                                  */
/* ------------------------------------------------------------------ */
function GraphMargin() {
  const r = 30
  const C = 2 * Math.PI * r
  const off = C * (1 - 0.248)
  const offH = C * (1 - 0.3)
  return (
    <div className="feature-media rounded-lg p-4 flex items-center gap-4">
      <div className="relative flex-shrink-0" style={{ width: 88, height: 88 }}>
        <svg width="88" height="88" viewBox="0 0 88 88">
          <defs>
            <linearGradient id="mgrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0fa96f" />
              <stop offset="100%" stopColor="#3ff0c0" />
            </linearGradient>
          </defs>
          <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle
            className="ring-progress"
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke="url(#mgrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={C}
            transform="rotate(-90 44 44)"
            style={vars({ '--off': off, '--offh': offH })}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading font-bold text-[19px] text-text-base leading-none">24.8%</span>
          <span className="font-mono text-[7px] tracking-[0.12em] text-faint mt-1">MARGIN</span>
        </div>
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[8px] tracking-[0.12em] text-faint mb-2">SPEND ANALYSED</div>
        {[
          { v: 'Vendor A', w: 54 },
          { v: 'Vendor B', w: 40 },
          { v: 'Vendor C', w: 28 },
        ].map((row) => (
          <div key={row.v} className="flex items-center gap-2 mb-[5px]">
            <div className="h-[6px] rounded-full" style={{ width: row.w, background: 'rgba(47,143,255,0.6)' }} />
            <span className="font-mono text-[8px] text-muted">{row.v}</span>
          </div>
        ))}
        <div className="feature-reveal mt-1">
          <span className="font-mono text-[9px]" style={{ color: '#3ff0c0' }}>▲ +2.1% margin · $61K found</span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 5 — Automation (data-flow diagram)                                  */
/* ------------------------------------------------------------------ */
function GraphAutomation() {
  const sources = [
    { y: 20, t: 'ERP' },
    { y: 48, t: 'ACCT' },
    { y: 76, t: 'INV' },
  ]
  const outputs = [
    { y: 34, t: 'BI' },
    { y: 62, t: 'INBOX' },
  ]
  return (
    <div className="feature-media rounded-lg p-4">
      <div className="font-mono text-[8px] tracking-[0.12em] text-faint mb-2">PIPELINE · RUNS NIGHTLY</div>
      <svg width="100%" viewBox="0 0 248 96" style={{ height: 96 }} aria-hidden="true">
        {sources.map((s) => (
          <path key={s.t} d={`M 44 ${s.y} C 82 ${s.y}, 96 48, 119 48`} fill="none" stroke="#2f8fff" strokeWidth="1.5" strokeDasharray="4 5" className="flow-dash" opacity="0.7" />
        ))}
        {outputs.map((o) => (
          <path key={o.t} d={`M 149 48 C 178 48, 188 ${o.y}, 210 ${o.y}`} fill="none" stroke="#3ff0c0" strokeWidth="1.5" strokeDasharray="4 5" className="flow-dash" opacity="0.8" />
        ))}
        {sources.map((s) => (
          <g key={s.t}>
            <rect x="8" y={s.y - 9} width="36" height="18" rx="5" fill="rgba(47,143,255,0.12)" stroke="rgba(47,143,255,0.35)" />
            <text x="26" y={s.y + 3} textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#a8b8cc">{s.t}</text>
          </g>
        ))}
        <circle cx="134" cy="48" r="15" fill="rgba(39,224,160,0.10)" stroke="rgba(39,224,160,0.4)" />
        <circle className="flow-dash" cx="134" cy="48" r="15" fill="none" stroke="#3ff0c0" strokeWidth="1.5" strokeDasharray="3 4" />
        <circle cx="134" cy="48" r="4" fill="#3ff0c0" />
        {outputs.map((o) => (
          <g key={o.t}>
            <rect x="210" y={o.y - 9} width="30" height="18" rx="5" fill="rgba(39,224,160,0.10)" stroke="rgba(39,224,160,0.35)" />
            <text x="225" y={o.y + 3} textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="#a8b8cc">{o.t}</text>
          </g>
        ))}
      </svg>
      <div className="feature-reveal">
        <span className="font-mono text-[9px]" style={{ color: '#3ff0c0' }}>✓ 42 reports auto-sent this week</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 6 — Ongoing Analytics Partner (full width)                          */
/* ------------------------------------------------------------------ */
function GraphPartner() {
  const months = [
    { m: 'M1', d: 'Onboard' },
    { m: 'M2', d: 'Dashboards' },
    { m: 'M3', d: 'Forecasts' },
    { m: 'M4', d: 'Review' },
    { m: 'M5', d: 'Optimise' },
    { m: 'M6', d: 'Scale' },
  ]
  return (
    <div className="feature-media rounded-lg p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[8px] tracking-[0.12em] text-faint">MONTHLY CADENCE</span>
        <span className="flex items-center gap-1 font-mono text-[8px]" style={{ color: '#3ff0c0' }}>
          <span className="pulse-dot w-[6px] h-[6px] rounded-full" style={{ background: '#3ff0c0', color: '#3ff0c0' }} />
          active
        </span>
      </div>
      <div className="relative pt-1">
        <div className="absolute left-0 right-0 top-[7px] h-[2px] rounded wire-flow" />
        <div className="absolute top-[3px] timeline-pulse" style={{ left: 0 }}>
          <div className="w-[10px] h-[10px] rounded-full" style={{ background: '#3ff0c0', boxShadow: '0 0 10px #3ff0c0' }} />
        </div>
        <div className="relative flex justify-between">
          {months.map((mo, i) => (
            <div key={mo.m} className="flex flex-col items-center gap-2">
              <div
                className="w-[14px] h-[14px] rounded-full"
                style={{
                  background: i === 2 ? '#3ff0c0' : 'rgba(255,255,255,0.10)',
                  border: '2px solid',
                  borderColor: i === 2 ? '#3ff0c0' : 'rgba(255,255,255,0.22)',
                  boxShadow: i === 2 ? '0 0 12px rgba(63,240,192,0.6)' : 'none',
                }}
              />
              <span className="font-mono text-[8px] text-faint">{mo.m}</span>
              <span className="feature-reveal font-mono text-[8px] text-muted whitespace-nowrap" style={{ transitionDelay: `${i * 45}ms` }}>
                {mo.d}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
type Service = {
  icon: ReactNode
  tileClass: string
  glow: string
  title: string
  body: string
  graphic: ReactNode
}

const services: Service[] = [
  {
    icon: <IconGrid />,
    tileClass: 'icon-tile-blue',
    glow: 'rgba(47,143,255,0.16)',
    title: 'Executive Dashboards',
    body: 'Your Monday meeting shouldn’t open with someone asking which spreadsheet is the current one. One screen, one set of numbers, everyone looking at the same thing.',
    graphic: <GraphExecDashboard />,
  },
  {
    icon: <IconTrend />,
    tileClass: 'icon-tile-green',
    glow: 'rgba(39,224,160,0.14)',
    title: 'Demand & Sales Forecasting',
    body: 'If every purchase order feels like an educated guess, nothing is telling you what next month looks like.',
    graphic: <GraphForecast />,
  },
  {
    icon: <IconBox />,
    tileClass: 'icon-tile-blue',
    glow: 'rgba(47,143,255,0.16)',
    title: 'Inventory Optimization',
    body: 'You already know the fast movers stock out and the dead stuff never leaves. What you can’t see is what that costs you this quarter.',
    graphic: <GraphInventory />,
  },
  {
    icon: <IconDollar />,
    tileClass: 'icon-tile-green',
    glow: 'rgba(39,224,160,0.14)',
    title: 'Cost Reduction & Profitability',
    body: 'Everyone can name the biggest customer. Almost nobody can name the most profitable one.',
    graphic: <GraphMargin />,
  },
  {
    icon: <IconBolt />,
    tileClass: 'icon-tile-blue',
    glow: 'rgba(47,143,255,0.16)',
    title: 'Automation',
    body: 'Somebody on your team loses every Friday to a report they rebuild by hand. It should build itself.',
    graphic: <GraphAutomation />,
  },
  {
    icon: <IconDonut />,
    tileClass: 'icon-tile-green',
    glow: 'rgba(39,224,160,0.14)',
    title: 'Ongoing Analytics Partner',
    body: 'You have more questions than an analyst’s salary would justify. So rent the analyst instead.',
    graphic: <GraphPartner />,
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
    <section id="services" ref={viewRef} className="relative overflow-hidden section bg-surface border-t-hairline">
      {/* Faint data dot-grid texture */}
      <div className="pointer-events-none absolute inset-0 dot-grid" />

      {/* Faint large watermark bar-chart in the background */}
      <div className="pointer-events-none absolute right-0 bottom-0 w-1/2 h-full overflow-hidden opacity-[0.035]">
        <svg viewBox="0 0 480 320" preserveAspectRatio="xMaxYMax meet" className="absolute right-0 bottom-0 w-full h-full" aria-hidden="true">
          {[
            { x: 20, h: 160 }, { x: 80, h: 220 }, { x: 140, h: 140 },
            { x: 200, h: 280 }, { x: 260, h: 180 }, { x: 320, h: 260 },
            { x: 380, h: 200 }, { x: 440, h: 300 },
          ].map((b) => (
            <rect key={b.x} x={b.x} y={320 - b.h} width={40} height={b.h} rx={4} fill="#2f8fff" />
          ))}
        </svg>
      </div>

      <div className="relative container-page text-center">
        <p className="eyebrow text-secondary mb-3">What we do</p>
        <h2 className="t-h2">Six things owners ask us for most.</h2>
        <p className="mt-4 text-muted font-medium text-body-lg max-w-lg mx-auto leading-relaxed">
          Take one, or hand us the whole thing. It all gets built on your numbers, in the systems you already pay for.
        </p>

        {/* Bento grid: featured card + mixed tiles + full-width band */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-6 gap-5 text-left">
          {services.map((s, i) => {
            const isFeatured = i === 0
            const isFull = i === 5
            const span = isFeatured ? 'md:col-span-4' : isFull ? 'md:col-span-6' : 'md:col-span-2'
            return (
              <article
                key={s.title}
                data-reveal
                data-reveal-delay={(i % 3) * 70}
                onMouseMove={setSpotlight}
                style={vars({ '--glow': s.glow })}
                className={`feature-card group spotlight card-lift p-6 rounded-lg border hairline bg-[rgba(10,15,28,0.55)] ${span} ${
                  isFull ? 'md:flex md:items-center md:gap-8' : ''
                }`}
              >
                <div className={isFull ? 'md:w-[290px] md:flex-shrink-0' : ''}>
                  <div className={`${s.tileClass} mb-4`} aria-hidden="true">
                    {s.icon}
                  </div>
                  <h3 className="t-h5 text-text-base mb-2">{s.title}</h3>
                  <p className="text-muted font-medium text-body">{s.body}</p>
                </div>
                <div className={`mt-5 ${isFull ? 'md:mt-0 md:flex-1 w-full' : ''}`}>{s.graphic}</div>
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
        <svg viewBox="0 0 1440 20" preserveAspectRatio="none" style={{ width: '100%', height: 20, display: 'block' }} aria-hidden="true">
          <path d="M0,0 C360,20 1080,0 1440,20 L1440,20 L0,20 Z" fill="#0c1a30" />
        </svg>
      </div>
    </section>
  )
}
