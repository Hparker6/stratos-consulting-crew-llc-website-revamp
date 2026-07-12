import { BOOK_CALL_MAILTO } from '../lib/site'

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-[15px] text-muted font-medium leading-snug">
      <span className="text-secondary font-bold mt-[1px] flex-shrink-0">✓</span>
      {text}
    </li>
  )
}

/*
 * Pricing is framed around the business outcome each engagement buys —
 * not the technical deliverables — with the low-risk terms made explicit.
 */
const tiers = [
  {
    name: 'Discovery Assessment',
    price: '$299–$499',
    outcome: 'Know exactly where the money is hiding.',
    features: [
      'A ranked report of your biggest opportunities',
      'Honest read on what your data can support today',
      'A 60-minute findings call, and the report is yours to keep',
      'Stop here if you want; no strings',
    ],
    featured: false,
  },
  {
    name: 'Dashboard Package',
    price: '$1k–$2.5k',
    outcome: 'One trusted view of the business, updated automatically.',
    features: [
      'The end of dueling spreadsheets',
      'Hours of manual reporting removed weekly',
      'Numbers your whole team agrees on',
      '30 days of support included',
    ],
    featured: true,
  },
  {
    name: 'Forecasting Project',
    price: '$2.5k–$5k',
    outcome: 'Buy what will sell. Stock what moves. Free the rest.',
    features: [
      'Purchasing driven by evidence, not memory',
      'Seasonal buys placed on time, sized right',
      'Cash freed from excess and slow movers',
      'Forecast accuracy reported openly',
    ],
    featured: false,
  },
  {
    name: 'Monthly Retainer',
    price: '$500–$1.5k/mo',
    outcome: 'An analytics team, without the headcount.',
    features: [
      'Everything maintained and improving',
      'Monthly strategy session on the numbers',
      'New questions answered on priority',
      'Month-to-month, cancel anytime',
    ],
    featured: false,
  },
]

const guarantees = [
  { title: 'Fixed scope, quoted first', body: 'Every engagement is priced before it starts. No open-ended billing, no surprise invoices.' },
  { title: 'You own everything', body: 'Dashboards, models, and documentation are built in your systems and stay yours, always.' },
  { title: 'Start tiny', body: 'The first call is free and the assessment is a few hundred dollars. You risk a conversation, not a budget.' },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 lg:py-20 bg-bg">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <p className="eyebrow text-secondary mb-3">Pricing</p>
        <h2 className="font-heading font-bold text-[36px] md:text-[48px] tracking-[-0.02em]">
          Start small. Scale when it pays off.
        </h2>
        <p className="mt-4 text-muted font-medium text-[17px] max-w-lg mx-auto leading-relaxed">
          Transparent, fixed-scope pricing designed so each step has to earn the next one.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {tiers.map((t, i) => (
            <article
              key={t.name}
              data-reveal
              data-reveal-delay={i * 70}
              className={`flex flex-col p-6 rounded-[18px] card-lift ${t.featured ? 'gradient-ring' : ''}`}
              style={
                t.featured
                  ? { boxShadow: '0 0 44px rgba(47,143,255,0.2)' }
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
              <p className="font-heading font-semibold text-[17px] text-text-base mb-1">{t.name}</p>
              <p className="gradient-num font-heading font-extrabold text-[28px] leading-tight tracking-tight mb-2">
                {t.price}
              </p>
              <p className="text-muted font-medium text-[15px] leading-snug mb-4">{t.outcome}</p>
              <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} className="mb-4" />
              <ul className="space-y-2 flex-1">
                {t.features.map((f) => (
                  <CheckItem key={f} text={f} />
                ))}
              </ul>
              <a
                href={BOOK_CALL_MAILTO}
                className={`mt-6 block text-center py-3 rounded-[10px] font-bold text-[14px] transition-opacity hover:opacity-90 ${
                  t.featured ? 'btn-primary justify-center' : 'btn-secondary justify-center'
                }`}
                data-track="pricing_card_click"
                data-track-label={t.name}
              >
                Book a Call →
              </a>
            </article>
          ))}
        </div>

        {/* Low-risk terms */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {guarantees.map((g) => (
            <div key={g.title} className="card p-6">
              <h3 className="font-heading font-semibold text-[17px] text-text-base mb-2">{g.title}</h3>
              <p className="text-muted font-medium text-[14px] leading-relaxed">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
