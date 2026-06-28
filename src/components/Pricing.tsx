function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-[13px] text-muted leading-snug">
      <span className="text-secondary font-bold mt-[1px] flex-shrink-0">✓</span>
      {text}
    </li>
  )
}

const tiers = [
  {
    name: 'Discovery Assessment',
    price: '$299–$499',
    desc: 'A deep look at your data and your biggest opportunities.',
    features: ['Full data & process audit', 'Ranked opportunity report', '60-min findings call', 'Zero commitment'],
    featured: false,
  },
  {
    name: 'Dashboard Package',
    price: '$1k–$2.5k',
    desc: 'Live executive dashboards your team actually uses.',
    features: ['Power BI dashboards', 'KPI & automated weekly reports', 'Up to 3 data sources', '30 days of support'],
    featured: true,
  },
  {
    name: 'Forecasting Project',
    price: '$2.5k–$5k',
    desc: 'Demand & sales forecasting built on your own history.',
    features: ['Demand & sales models', 'Reorder points & safety stock', 'Excess / slow-mover analysis', 'Forecast accuracy tracking'],
    featured: false,
  },
  {
    name: 'Monthly Retainer',
    price: '$500–$1.5k/mo',
    desc: 'Your fractional analytics team, ongoing.',
    features: ['Ongoing dashboards & reports', 'Monthly strategy sessions', 'Priority requests', 'Cancel anytime'],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-bg">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <p className="eyebrow text-secondary mb-4">Pricing</p>
        <h2 className="font-heading font-bold text-[32px] md:text-[42px] tracking-[-0.02em]">
          Start small. Scale when it pays off.
        </h2>
        <p className="mt-4 text-muted max-w-lg mx-auto leading-relaxed">
          Transparent, fixed-scope pricing. No retainers you can't escape, no surprise invoices.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {tiers.map((t) => (
            <article
              key={t.name}
              className="flex flex-col p-7 rounded-[18px] transition-shadow"
              style={
                t.featured
                  ? {
                      background: 'rgba(47,143,255,0.07)',
                      border: '1.5px solid #2f8fff',
                      boxShadow: '0 0 40px rgba(47,143,255,0.18)',
                    }
                  : {
                      background: '#101a2e',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }
              }
            >
              {t.featured && (
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.14em] text-btn-dark px-2 py-1 rounded-[5px] w-fit mb-3"
                  style={{ background: '#2f8fff' }}
                >
                  Best Starting Point
                </span>
              )}
              <p className="font-heading font-bold text-[15px] text-text-base mb-1">{t.name}</p>
              <p className="gradient-num font-heading font-extrabold text-[28px] leading-tight tracking-tight mb-2">
                {t.price}
              </p>
              <p className="text-muted text-[13px] leading-snug mb-4">{t.desc}</p>
              <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} className="mb-4" />
              <ul className="space-y-2 flex-1">
                {t.features.map((f) => (
                  <CheckItem key={f} text={f} />
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-6 block text-center py-3 rounded-[10px] font-bold text-[13px] transition-opacity hover:opacity-90 ${
                  t.featured ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                Get Started →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
