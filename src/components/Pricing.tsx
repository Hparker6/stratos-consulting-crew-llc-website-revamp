import BookCallLink from './BookCallLink'
import { guarantees, tiers } from '../data/pricing'

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-[15px] text-muted font-medium leading-snug">
      <span className="text-secondary font-bold mt-[1px] flex-shrink-0">✓</span>
      {text}
    </li>
  )
}


export default function Pricing() {
  return (
    <section id="pricing" className="section bg-bg">
      <div className="container-page text-center">
        <p className="eyebrow text-secondary mb-3">Pricing</p>
        <h2 className="t-h2">
          Start small. Scale when it pays off.
        </h2>
        <p className="mt-4 text-muted font-medium text-body-lg max-w-lg mx-auto leading-relaxed">
          Transparent, fixed-scope pricing designed so each step has to earn the next one.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {tiers.map((t, i) => (
            <article
              key={t.name}
              data-reveal
              data-reveal-delay={i * 70}
              className={`flex flex-col p-6 card-lift ${
                t.featured ? 'gradient-ring rounded-xl shadow-glow-featured' : 'card-lg'
              }`}
            >
              {t.featured && (
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-btn-dark bg-primary px-2 py-1 rounded-xs w-fit mb-3">
                  Best Starting Point
                </span>
              )}
              <p className="t-h5 text-text-base mb-1">{t.name}</p>
              <p className="gradient-num font-heading font-extrabold text-[28px] leading-tight tracking-tight mb-2">
                {t.price}
              </p>
              <p className="text-muted font-medium text-body-sm leading-snug mb-4">{t.outcome}</p>
              <hr className="hairline mb-4" />
              <ul className="space-y-2 flex-1">
                {t.features.map((f) => (
                  <CheckItem key={f} text={f} />
                ))}
              </ul>
              <BookCallLink
                label={`pricing_${t.name.toLowerCase().replace(/\s+/g, '_')}`}
                className={`mt-6 btn-block btn-sm ${t.featured ? 'btn-primary' : 'btn-secondary'}`}
              >
                Book a Call →
              </BookCallLink>
            </article>
          ))}
        </div>

        {/* Low-risk terms */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {guarantees.map((g) => (
            <div key={g.title} className="card p-6">
              <h3 className="t-h5 text-text-base mb-2">{g.title}</h3>
              <p className="text-muted font-medium text-caption">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
