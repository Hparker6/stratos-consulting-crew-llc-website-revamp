export default function HeroDashboardMock() {
  const bars = [42, 55, 38, 62, 48, 53, 72]

  return (
    <div
      className="animate-float rounded-card-lg overflow-hidden w-full max-w-[640px]"
      style={{
        background: '#0d1526',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 60px rgba(47,143,255,0.08)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-5 py-[14px]"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)' }}
      >
        <span className="w-[13px] h-[13px] rounded-full bg-red-400 opacity-80 flex-shrink-0" />
        <span className="w-[13px] h-[13px] rounded-full bg-yellow-400 opacity-80 flex-shrink-0" />
        <span className="w-[13px] h-[13px] rounded-full bg-green-400 opacity-80 flex-shrink-0" />
        <span className="font-mono text-[14px] text-muted ml-3 tracking-wide">distributor-kpis.pbix</span>
      </div>

      <div className="p-5 space-y-4">
        {/* 2×2 KPI grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'INVENTORY TURNS', value: '6.4',   delta: '▲0.8',  positive: true },
            { label: 'FILL RATE',        value: '97.2%', delta: '▲1.4%', positive: true },
            { label: 'GROSS MARGIN',     value: '24.8%', delta: '▲2.1%', positive: true },
            { label: 'EXCESS STOCK',     value: '$182K', delta: '▼$41K', positive: false },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-[10px] p-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted mb-2 font-medium">
                {kpi.label}
              </p>
              <div className="flex items-end gap-2">
                <span className="font-heading font-bold text-[28px] leading-none text-text-base">
                  {kpi.value}
                </span>
                <span
                  className="font-mono text-[13px] font-bold mb-[3px]"
                  style={{ color: kpi.positive ? '#27e0a0' : '#f87171' }}
                >
                  {kpi.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div
          className="rounded-[10px] p-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted mb-4 font-medium">
            Margin by product line
          </p>
          <div className="flex items-end gap-2 h-[70px]">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[4px]"
                style={{
                  height: `${(h / 80) * 100}%`,
                  background:
                    i === bars.length - 1
                      ? 'linear-gradient(180deg, #27e0a0, #2f8fff)'
                      : 'rgba(47,143,255,0.45)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
