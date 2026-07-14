import CountUp from './CountUp'

type Kpi = {
  label: string
  value: number
  format: (n: number) => string
  delta: string
  positive: boolean
  spark: number[]
  accent: string
}

const kpis: Kpi[] = [
  { label: 'INVENTORY TURNS', value: 6.4, format: (n) => n.toFixed(1), delta: '▲0.8', positive: true, accent: '#2f8fff', spark: [3.1, 3.6, 3.4, 4.2, 4.6, 5.3, 5.1, 5.8, 6.4] },
  { label: 'FILL RATE', value: 97.2, format: (n) => `${n.toFixed(1)}%`, delta: '▲1.4%', positive: true, accent: '#0fa96f', spark: [94.1, 94.6, 94.3, 95.2, 95.6, 96.1, 96.4, 96.9, 97.2] },
  { label: 'GROSS MARGIN', value: 24.8, format: (n) => `${n.toFixed(1)}%`, delta: '▲2.1%', positive: true, accent: '#2f8fff', spark: [21.2, 21.6, 22.1, 22.4, 23.0, 23.4, 23.9, 24.3, 24.8] },
  { label: 'EXCESS STOCK', value: 182, format: (n) => `$${Math.round(n)}K`, delta: '▼$41K', positive: false, accent: '#0fa96f', spark: [241, 236, 228, 223, 214, 206, 199, 190, 182] },
]

const bars = [
  { label: 'Fasteners', v: 41 },
  { label: 'Fittings', v: 55 },
  { label: 'Valves', v: 37 },
  { label: 'Motors', v: 61 },
  { label: 'Pumps', v: 47 },
  { label: 'Seals', v: 52 },
  { label: 'Bearings', v: 72 },
]

/** Tiny in-tile trendline. */
function Spark({ points, color }: { points: number[]; color: string }) {
  const w = 68
  const h = 20
  const pad = 2
  const lo = Math.min(...points)
  const hi = Math.max(...points)
  const range = hi - lo || 1
  const xy = (v: number, i: number): [number, number] => [
    pad + (i / (points.length - 1)) * (w - pad * 2),
    h - pad - ((v - lo) / range) * (h - pad * 2),
  ]
  const line = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xy(v, i).map((n) => n.toFixed(1)).join(' ')}`).join(' ')
  const [ex, ey] = xy(points[points.length - 1], points.length - 1)
  const gid = `spark-${color.replace('#', '')}`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L ${(w - pad).toFixed(1)} ${h} L ${pad} ${h} Z`} fill={`url(#${gid})`} />
      <path className="draw-line" d={line} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={ex} cy={ey} r="2.1" fill={color} />
    </svg>
  )
}

export default function HeroDashboardMock() {
  const axisMax = Math.max(...bars.map((b) => b.v)) * 1.28

  return (
    <div className="animate-float dash-glass rounded-[18px] overflow-hidden w-full max-w-[640px]">
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-5 py-[13px]"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.28)' }}
      >
        <span className="w-[12px] h-[12px] rounded-full bg-red-400 opacity-80 flex-shrink-0" />
        <span className="w-[12px] h-[12px] rounded-full bg-yellow-400 opacity-80 flex-shrink-0" />
        <span className="w-[12px] h-[12px] rounded-full bg-green-400 opacity-80 flex-shrink-0" />
        <span className="font-mono text-[13px] text-muted ml-3 tracking-wide truncate">distributor-kpis.pbix</span>
        <span
          className="ml-auto flex items-center gap-[6px] font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-2 py-[3px] rounded-full flex-shrink-0"
          style={{ background: 'rgba(15,169,111,0.14)', border: '1px solid rgba(15,169,111,0.38)', color: '#3ff0c0' }}
        >
          <span className="pulse-dot w-[6px] h-[6px] rounded-full" style={{ background: '#3ff0c0', color: '#3ff0c0' }} />
          Live
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* 2×2 KPI grid — values count up when first seen, each with a trendline */}
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="dash-tile rounded-[12px] p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.11em] text-faint mb-2 truncate">{kpi.label}</p>
              <div className="flex items-end justify-between gap-2">
                <div className="flex items-end gap-2">
                  <span className="font-heading font-bold text-[27px] leading-none text-text-base tabular-nums">
                    <CountUp value={kpi.value} format={kpi.format} />
                  </span>
                  <span
                    className="font-mono text-[12px] font-bold mb-[3px]"
                    style={{ color: kpi.positive ? '#3ff0c0' : '#f0a83f' }}
                  >
                    {kpi.delta}
                  </span>
                </div>
                <div className="mb-[1px] flex-shrink-0">
                  <Spark points={kpi.spark} color={kpi.accent} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Margin by product line — gridded gradient bars with a highlighted best line */}
        <div className="dash-tile rounded-[12px] p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.11em] text-faint">Margin by product line</p>
            <span className="font-mono text-[11px] font-bold" style={{ color: '#3ff0c0' }}>▲ 3.2% avg</span>
          </div>
          <div className="relative" style={{ height: 104 }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute left-0 right-0"
                style={{ top: `${(i / 3) * 100}%`, borderTop: '1px solid rgba(255,255,255,0.05)' }}
              />
            ))}
            <div className="absolute inset-0 flex items-end gap-[7px]">
              {bars.map((b, i) => {
                const best = i === bars.length - 1
                return (
                  <div key={b.label} className="flex-1 h-full flex items-end justify-center">
                    <div className="w-full relative" style={{ height: `${(b.v / axisMax) * 100}%`, maxWidth: 28 }}>
                      <div
                        className="bar-grow absolute inset-0"
                        style={{
                          borderRadius: '5px 5px 0 0',
                          background: best
                            ? 'linear-gradient(180deg, #3ff0c0 0%, #2f8fff 100%)'
                            : 'linear-gradient(180deg, rgba(47,143,255,0.9) 0%, rgba(47,143,255,0.22) 100%)',
                          boxShadow: best ? '0 0 18px rgba(47,224,160,0.55)' : 'none',
                          animationDelay: `${i * 70}ms`,
                        }}
                      />
                      {best && (
                        <span
                          className="absolute -top-[18px] left-1/2 -translate-x-1/2 font-mono text-[11px] font-bold whitespace-nowrap"
                          style={{ color: '#3ff0c0' }}
                        >
                          {`${b.v}%`}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex gap-[7px] mt-[6px]">
            {bars.map((b) => (
              <span key={b.label} className="flex-1 text-center font-mono text-[7px] text-faint truncate">
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
