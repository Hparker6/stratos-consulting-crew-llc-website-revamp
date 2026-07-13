import { Link } from 'react-router-dom'

function PreviewMock() {
  const actualPoints = [38, 42, 35, 48, 44, 52, 56, 50, 60, 65, 58, 70]
  const forecastPoints = [40, 44, 42, 46, 50, 54, 58, 56, 62, 68, 65, 72]
  const w = 280
  const h = 70
  const pad = 6

  function toPath(pts: number[]): string {
    return pts
      .map((v, i) => {
        const x = pad + (i / (pts.length - 1)) * (w - pad * 2)
        const y = h - pad - ((v - 30) / 50) * (h - pad * 2)
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
      })
      .join(' ')
  }

  function toAreaPath(pts: number[]): string {
    const linePart = toPath(pts)
    const lastX = (pad + (w - pad * 2)).toFixed(1)
    const firstX = pad.toFixed(1)
    return `${linePart} L ${lastX} ${h} L ${firstX} ${h} Z`
  }

  const inventoryBars = [
    { h: 65, label: 'A', good: false },
    { h: 80, label: 'B', good: true },
    { h: 50, label: 'C', good: false },
    { h: 70, label: 'D', good: true },
    { h: 58, label: 'E', good: false },
  ]

  return (
    <div className="dash-glass rounded-[16px] overflow-hidden w-full" style={{ maxWidth: 420 }}>
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.2)' }}
      >
        <span className="font-heading font-semibold text-[13px] text-text-base">Distributor KPIs</span>
        <div className="flex gap-1">
          {['Week', 'MTD', 'YTD'].map((tab) => (
            <button
              key={tab}
              className="font-mono text-[9px] px-2 py-[3px] rounded-[4px] tracking-wide uppercase"
              style={
                tab === 'YTD'
                  ? { background: '#2f8fff', color: '#04102a', fontWeight: 700 }
                  : { color: '#7f8ba0', background: 'transparent' }
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'INVENTORY TURNS', value: '6.4', delta: '▲0.8' },
            { label: 'FILL RATE', value: '97.2%', delta: '▲1.4%' },
          ].map((k) => (
            <div
              key={k.label}
              className="dash-tile rounded-[10px] p-3"
            >
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint mb-1">{k.label}</p>
              <div className="flex items-end gap-2">
                <span className="font-heading font-bold text-[20px] leading-none text-text-base">{k.value}</span>
                <span className="font-mono text-[10px] font-bold mb-[1px]" style={{ color: '#27e0a0' }}>
                  {k.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-[10px] p-3"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">Demand forecast vs actual</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-mono text-[8px] text-faint">
                <span className="inline-block w-3 h-[2px] bg-primary rounded" /> actual
              </span>
              <span className="flex items-center gap-1 font-mono text-[8px] text-faint">
                <span className="inline-block w-3 h-[2px] rounded" style={{ background: '#27e0a0' }} /> forecast
              </span>
            </div>
          </div>
          <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height: 64 }}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2f8fff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2f8fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1={pad} y1={pad + f * (h - pad * 2)} x2={w - pad} y2={pad + f * (h - pad * 2)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            ))}
            <path d={toAreaPath(actualPoints)} fill="url(#areaGrad)" />
            <path d={toPath(actualPoints)} fill="none" stroke="#2f8fff" strokeWidth="1.8" strokeLinecap="round" />
            <path
              d={toPath(forecastPoints)}
              fill="none"
              stroke="#27e0a0"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div
          className="rounded-[10px] p-3"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint mb-3">
            Inventory health by category
          </p>
          <div className="flex items-end gap-2 h-12">
            {inventoryBars.map((b, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[4px]"
                style={{
                  height: `${b.h}%`,
                  background: b.good
                    ? 'linear-gradient(180deg, #3ff0c0 0%, #0fa96f 100%)'
                    : 'linear-gradient(180deg, rgba(47,143,255,0.9) 0%, rgba(47,143,255,0.28) 100%)',
                  boxShadow: b.good ? '0 0 12px rgba(47,224,160,0.35)' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="section bg-bg">
      <div className="container-page">
        <div
          className="rounded-[24px] p-8 lg:p-10 flex flex-col lg:flex-row gap-10 lg:items-center"
          style={{
            background: '#101a2e',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 80px rgba(47,143,255,0.06)',
          }}
        >
          <div className="flex-1 max-w-md" data-reveal>
            <p className="eyebrow text-primary mb-3">What you get</p>
            <h2 className="t-h3">
              A single screen that runs your whole operation.
            </h2>
            <p className="mt-4 text-muted font-medium text-body-lg">
              Inventory turns, fill rate, margin by product line, and demand forecast. All of it live,
              automated, and refreshed without anyone touching a spreadsheet.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                'Connects to your ERP, accounting & inventory',
                'Weekly reports land in your inbox automatically',
                'Drill from company-wide down to a single SKU',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-secondary mt-[2px] font-bold text-sm flex-shrink-0">✓</span>
                  <span className="text-muted font-medium text-body leading-snug">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/solutions"
              className="inline-flex mt-6 text-primary font-bold text-[15px] hover:underline"
              data-track="dashboard_interaction"
              data-track-label="home_preview_to_solutions"
            >
              See six sample dashboards, problem by problem →
            </Link>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end" data-reveal data-reveal-delay={120}>
            <div className="relative w-full max-w-[420px]">
              <div className="dash-underglow" aria-hidden="true" />
              <div className="relative z-10">
                <PreviewMock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
