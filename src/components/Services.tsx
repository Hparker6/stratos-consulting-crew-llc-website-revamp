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
    body: 'Forecast what sells, when, and how much — by product line, customer, and season.',
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
    title: 'Fractional Analytics Support',
    body: 'A monthly retainer that gives you an analytics team — without the headcount or the overhead.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-bg">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <p className="eyebrow text-secondary mb-4">What we do</p>
        <h2 className="font-heading font-bold text-[32px] md:text-[42px] tracking-[-0.02em]">
          Six ways we turn data into dollars.
        </h2>
        <p className="mt-4 text-muted max-w-lg mx-auto leading-relaxed">
          Mix and match, or hand us the whole problem. Everything's built around your numbers, your systems, your team.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {services.map((s) => (
            <article key={s.title} className="card p-7 hover:border-white/[0.14] transition-colors">
              <div className={`${s.tileClass} mb-5`} aria-hidden="true">
                {s.icon}
              </div>
              <h3 className="font-heading font-bold text-[16px] text-text-base mb-2">{s.title}</h3>
              <p className="text-muted text-[14px] leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
