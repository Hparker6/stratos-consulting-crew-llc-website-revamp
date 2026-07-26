import CountUp from './CountUp'

/**
 * A large, realistic light-canvas BI dashboard — the product proof that makes
 * Ramp / Retool / Ashby feel credible. Three switchable views (overview,
 * forecast, inventory) so the tabbed showcase can demonstrate breadth instead
 * of repeating one screen. Real KPI tiles, real charts with gridlines and axes,
 * real tables with status pills — never toy graphics.
 */

export type DashView = 'overview' | 'forecast' | 'inventory'

const BLUE = '#2f6fed'
const GOLD = '#dd9520'
const GREEN = '#16a34a'
const RED = '#dc2626'
const INK = '#0e1726'
const FAINT = '#8a94a3'

const card = { background: '#fff', border: '1px solid #e7e9ee' } as const
const pill = {
  amber: { bg: '#fef3c7', fg: '#92600a' },
  green: { bg: '#dcfce7', fg: '#15803d' },
  red: { bg: '#fee2e2', fg: '#b91c1c' },
  blue: { bg: '#dbeafe', fg: '#1d4ed8' },
}

function Spark({ points, color, w = 62 }: { points: number[]; color: string; w?: number }) {
  const h = 20
  const lo = Math.min(...points)
  const hi = Math.max(...points)
  const rng = hi - lo || 1
  const d = points
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${(2 + (i / (points.length - 1)) * (w - 4)).toFixed(1)} ${(h - 2 - ((v - lo) / rng) * (h - 4)).toFixed(1)}`)
    .join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ display: 'block', overflow: 'visible' }}>
      <path className="draw-line" d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ ['--len' as string]: 90 }} />
      <circle cx={w - 2} cy={h - 2 - ((points[points.length - 1] - lo) / rng) * (h - 4)} r="2" fill={color} />
    </svg>
  )
}

function KpiTile({ label, value, format, delta, up, spark, color }: { label: string; value: number; format: (n: number) => string; delta: string; up: boolean; spark: number[]; color: string }) {
  return (
    <div className="rounded-[10px] p-3" style={card}>
      <p className="font-mono text-[9px] uppercase tracking-[0.08em] mb-1 truncate" style={{ color: FAINT }}>{label}</p>
      <span className="font-heading font-bold text-[19px] leading-none tabular-nums" style={{ color: INK }}>
        <CountUp value={value} format={format} />
      </span>
      <div className="flex items-center justify-between mt-2">
        <span className="font-mono text-[10px] font-bold" style={{ color: up ? GREEN : RED }}>{up ? '▲' : '▼'} {delta}</span>
        <Spark points={spark} color={color} />
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* View 1 — Executive overview                                       */
/* ---------------------------------------------------------------- */
const ovKpis = [
  { label: 'Revenue · YTD', value: 4.2, format: (n: number) => `$${n.toFixed(1)}M`, delta: '+8.4%', up: true, spark: [30, 34, 32, 40, 44, 50, 58], color: BLUE },
  { label: 'Gross Margin', value: 24.8, format: (n: number) => `${n.toFixed(1)}%`, delta: '+2.1%', up: true, spark: [20, 21, 22, 22, 23, 24, 25], color: GREEN },
  { label: 'Inventory Turns', value: 6.4, format: (n: number) => n.toFixed(1), delta: '+0.8', up: true, spark: [3, 4, 4.5, 5, 5.5, 6, 6.4], color: BLUE },
  { label: 'Fill Rate', value: 97.2, format: (n: number) => `${n.toFixed(1)}%`, delta: '+1.4%', up: true, spark: [94, 94.6, 95, 95.6, 96.1, 96.8, 97.2], color: GOLD },
]
const ovBars = [
  { l: 'Fasteners', v: 41 }, { l: 'Fittings', v: 55 }, { l: 'Valves', v: 37 }, { l: 'Motors', v: 61 }, { l: 'Pumps', v: 47 }, { l: 'Seals', v: 52 }, { l: 'Bearings', v: 72 },
]
const ovRows = [
  { cat: 'Bearings', val: '$182K on hand', status: 'Overstock', tone: 'amber' as const },
  { cat: 'Motors', val: '$96K on hand', status: 'Healthy', tone: 'green' as const },
  { cat: 'Fasteners', val: '$41K on hand', status: 'Reorder', tone: 'red' as const },
  { cat: 'Valves', val: '$88K on hand', status: 'Healthy', tone: 'green' as const },
]

function OverviewBody() {
  const max = Math.max(...ovBars.map((b) => b.v)) * 1.2
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {ovKpis.map((k) => <KpiTile key={k.label} {...k} />)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        <div className="sm:col-span-3 rounded-[10px] p-4" style={card}>
          <div className="flex items-center justify-between mb-3">
            <p className="font-heading font-semibold text-[12px]" style={{ color: INK }}>Margin by product line</p>
            <span className="font-mono text-[11px] font-bold" style={{ color: GOLD }}>▲ 3.2% avg</span>
          </div>
          <div className="relative" style={{ height: 118 }}>
            {[0, 1, 2, 3].map((i) => <div key={i} className="absolute left-0 right-0" style={{ top: `${(i / 3) * 100}%`, borderTop: '1px solid #eef0f3' }} />)}
            <div className="absolute inset-0 flex items-end gap-2">
              {ovBars.map((b, i) => {
                const best = i === ovBars.length - 1
                return (
                  <div key={b.l} className="flex-1 h-full flex items-end justify-center">
                    <div className="w-full relative" style={{ height: `${(b.v / max) * 100}%`, maxWidth: 26 }}>
                      <div className="bar-grow absolute inset-0" style={{ borderRadius: '4px 4px 0 0', background: best ? GOLD : BLUE, opacity: best ? 1 : 0.9, animationDelay: `${i * 70}ms` }} />
                      {best && <span className="absolute -top-[16px] left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold" style={{ color: GOLD }}>72%</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            {ovBars.map((b) => <span key={b.l} className="flex-1 text-center font-mono text-[7.5px] truncate" style={{ color: '#9aa3b0' }}>{b.l}</span>)}
          </div>
        </div>
        <div className="sm:col-span-2 rounded-[10px] p-4" style={card}>
          <p className="font-heading font-semibold text-[12px] mb-3" style={{ color: INK }}>Inventory health</p>
          <div className="space-y-[10px]">
            {ovRows.map((r) => (
              <div key={r.cat} className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold leading-tight" style={{ color: INK }}>{r.cat}</p>
                  <p className="font-mono text-[10px] tabular-nums" style={{ color: FAINT }}>{r.val}</p>
                </div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.04em] px-2 py-[3px] rounded-full flex-shrink-0" style={{ background: pill[r.tone].bg, color: pill[r.tone].fg }}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- */
/* View 2 — Demand forecast                                          */
/* ---------------------------------------------------------------- */
function ForecastBody() {
  const w = 420
  const h = 150
  const pad = 10
  const actual = [30, 36, 33, 42, 40, 48, 46, 54]
  const forecast = [54, 60, 58, 68, 74]
  const n = actual.length + forecast.length - 1
  const lo = 24
  const hi = 82
  const X = (i: number) => pad + (i / (n - 1)) * (w - pad * 2)
  const Y = (v: number) => h - pad - ((v - lo) / (hi - lo)) * (h - pad * 2)
  const split = actual.length - 1
  const aPts = actual.map((v, i) => ({ i, v }))
  const fPts = forecast.map((v, k) => ({ i: split + k, v }))
  const line = (pts: { i: number; v: number }[]) => pts.map((p, k) => `${k === 0 ? 'M' : 'L'} ${X(p.i).toFixed(1)} ${Y(p.v).toFixed(1)}`).join(' ')
  const band = fPts.map((p, k) => ({ i: p.i, up: p.v + k * 2.6 + 3, dn: p.v - k * 2.6 - 3 }))
  const bandPath = [...band.map((b, i) => `${i === 0 ? 'M' : 'L'} ${X(b.i).toFixed(1)} ${Y(b.up).toFixed(1)}`), ...band.slice().reverse().map((b) => `L ${X(b.i).toFixed(1)} ${Y(b.dn).toFixed(1)}`), 'Z'].join(' ')
  const last = fPts[fPts.length - 1]
  const buys = [
    { sku: 'Bearings · 6204-2RS', hand: '1,240', fc: '2,900', buy: '1,900', hot: true },
    { sku: 'Motors · 5HP-3PH', hand: '86', fc: '210', buy: '140', hot: false },
    { sku: 'Valves · 2" Brass', hand: '540', fc: '470', buy: '—', hot: false },
  ]
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        <div className="sm:col-span-3 rounded-[10px] p-4" style={card}>
          <div className="flex items-center justify-between mb-2">
            <p className="font-heading font-semibold text-[12px]" style={{ color: INK }}>Demand · next 5 months</p>
            <span className="flex items-center gap-3 font-mono text-[8px]" style={{ color: FAINT }}>
              <span className="flex items-center gap-1"><i className="inline-block w-3 h-[2px] rounded" style={{ background: BLUE }} />actual</span>
              <span className="flex items-center gap-1"><i className="inline-block w-3 h-[2px] rounded" style={{ background: GOLD }} />forecast</span>
            </span>
          </div>
          <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ height: 150 }} aria-hidden="true">
            {[0.25, 0.5, 0.75, 1].map((f) => <line key={f} x1={pad} y1={pad + f * (h - pad * 2)} x2={w - pad} y2={pad + f * (h - pad * 2)} stroke="#eef0f3" />)}
            <path className="fc-band" d={bandPath} fill="rgba(221,149,32,0.14)" />
            <path className="draw-line" d={line(aPts)} fill="none" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ ['--len' as string]: 300 }} />
            <path d={line(fPts)} fill="none" stroke={GOLD} strokeWidth="2.2" strokeDasharray="5 4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={X(last.i)} cy={Y(last.v)} r="3.4" fill={GOLD} />
          </svg>
        </div>
        <div className="sm:col-span-2 flex flex-col gap-3">
          <div className="rounded-[10px] p-4 flex-1" style={card}>
            <p className="font-mono text-[9px] uppercase tracking-[0.08em]" style={{ color: FAINT }}>Projected · next 30 days</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-heading font-bold text-[26px] leading-none" style={{ color: INK }}>+12%</span>
              <span className="font-mono text-[11px] font-bold" style={{ color: GREEN }}>▲ vs LY</span>
            </div>
            <p className="mt-2 font-mono text-[10px]" style={{ color: FAINT }}>94% model confidence</p>
          </div>
          <div className="rounded-[10px] p-4 flex-1" style={card}>
            <p className="font-mono text-[9px] uppercase tracking-[0.08em]" style={{ color: FAINT }}>Seasonal peak</p>
            <div className="font-heading font-bold text-[22px] leading-none mt-1" style={{ color: INK }}>Week 34</div>
            <p className="mt-2 font-mono text-[10px]" style={{ color: GOLD }}>place buys by Week 28</p>
          </div>
        </div>
      </div>
      <div className="rounded-[10px] p-4 mt-3" style={card}>
        <p className="font-heading font-semibold text-[12px] mb-3" style={{ color: INK }}>Suggested buys</p>
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 gap-y-2 items-center">
          <span className="font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: FAINT }}>SKU</span>
          <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-right" style={{ color: FAINT }}>On hand</span>
          <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-right" style={{ color: FAINT }}>30-day fcst</span>
          <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-right" style={{ color: FAINT }}>Buy</span>
          {buys.map((b) => (
            <div key={b.sku} className="contents">
              <span className="text-[11px] font-semibold truncate" style={{ color: INK }}>{b.sku}</span>
              <span className="font-mono text-[11px] tabular-nums text-right" style={{ color: '#5b6675' }}>{b.hand}</span>
              <span className="font-mono text-[11px] tabular-nums text-right" style={{ color: '#5b6675' }}>{b.fc}</span>
              <span className="font-mono text-[11px] font-bold tabular-nums text-right" style={{ color: b.hot ? GOLD : '#5b6675' }}>{b.buy}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- */
/* View 3 — Inventory optimization                                   */
/* ---------------------------------------------------------------- */
const invKpis = [
  { label: 'Cash Freed', value: 182, format: (n: number) => `$${Math.round(n)}K`, delta: '90 days', up: true, spark: [40, 60, 90, 120, 150, 182], color: GREEN },
  { label: 'Dead Stock', value: 61, format: (n: number) => `$${Math.round(n)}K`, delta: '-18%', up: false, spark: [92, 86, 80, 74, 67, 61], color: RED },
  { label: 'Excess SKUs', value: 42, format: (n: number) => `${Math.round(n)}`, delta: '-11', up: false, spark: [70, 64, 58, 52, 47, 42], color: GOLD },
  { label: 'Turns', value: 6.4, format: (n: number) => n.toFixed(1), delta: '+2.3', up: true, spark: [4.1, 4.6, 5.1, 5.6, 6.0, 6.4], color: BLUE },
]
const invRows = [
  { l: 'Fasteners', w: 88, reorder: 54, tone: 'amber' as const, s: 'Overstock' },
  { l: 'Valves', w: 46, reorder: 54, tone: 'blue' as const, s: 'Healthy' },
  { l: 'Motors', w: 92, reorder: 54, tone: 'amber' as const, s: 'Overstock' },
  { l: 'Seals', w: 34, reorder: 54, tone: 'red' as const, s: 'Reorder' },
  { l: 'Pumps', w: 58, reorder: 54, tone: 'blue' as const, s: 'Healthy' },
]

function InventoryBody() {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {invKpis.map((k) => <KpiTile key={k.label} {...k} />)}
      </div>
      <div className="rounded-[10px] p-4" style={card}>
        <div className="flex items-center justify-between mb-4">
          <p className="font-heading font-semibold text-[12px]" style={{ color: INK }}>Stock vs reorder point</p>
          <span className="font-mono text-[9px]" style={{ color: GOLD }}>▮ reorder line</span>
        </div>
        <div className="relative space-y-[13px]">
          <div className="absolute top-[-4px] bottom-[-4px] z-10" style={{ left: '54%', borderLeft: '1px dashed rgba(221,149,32,0.7)' }} />
          {invRows.map((r) => (
            <div key={r.l} className="flex items-center gap-3">
              <span className="font-mono text-[10px] w-[58px] flex-shrink-0" style={{ color: '#5b6675' }}>{r.l}</span>
              <div className="flex-1 h-[12px] rounded-full relative overflow-hidden" style={{ background: '#eef0f3' }}>
                <div className="inv-grow absolute inset-y-0 left-0 rounded-full" style={{ width: `${r.w}%`, background: r.tone === 'amber' ? GOLD : r.tone === 'red' ? RED : BLUE }} />
              </div>
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.04em] px-2 py-[2px] rounded-full flex-shrink-0 w-[74px] text-center" style={{ background: pill[r.tone].bg, color: pill[r.tone].fg }}>{r.s}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px]" style={{ color: FAINT }}>2 lines over-stocked · <span style={{ color: GOLD, fontWeight: 700 }}>$182K</span> recoverable</p>
      </div>
    </>
  )
}

const titles: Record<DashView, string> = {
  overview: 'distributor-kpis',
  forecast: 'demand-forecast',
  inventory: 'inventory-health',
}

export default function HeroDashboard({ view = 'overview' }: { view?: DashView }) {
  return (
    <div className="dash-window w-full max-w-[680px] rounded-[14px] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-[11px]" style={{ background: '#f1f3f6', borderBottom: '1px solid #e4e7ec' }}>
        <span className="flex gap-[6px]">
          <i className="w-[10px] h-[10px] rounded-full" style={{ background: '#ff5f57' }} />
          <i className="w-[10px] h-[10px] rounded-full" style={{ background: '#febc2e' }} />
          <i className="w-[10px] h-[10px] rounded-full" style={{ background: '#28c840' }} />
        </span>
        <span className="ml-2 font-mono text-[12px] tracking-wide" style={{ color: '#6b7480' }}>{titles[view]} · Power BI</span>
        <span className="ml-auto flex items-center gap-[6px] font-mono text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-[3px] rounded-full" style={{ background: '#dcfce7', color: '#15803d' }}>
          <span className="w-[6px] h-[6px] rounded-full" style={{ background: '#16a34a' }} /> Live
        </span>
      </div>
      <div className="p-4" style={{ background: '#f6f7f9' }}>
        {view === 'overview' && <OverviewBody />}
        {view === 'forecast' && <ForecastBody />}
        {view === 'inventory' && <InventoryBody />}
      </div>
    </div>
  )
}
