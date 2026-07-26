import BookCallLink from './BookCallLink'
import SectionHeader from './SectionHeader'
import { guarantees, tiers } from '../data/pricing'

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-[15px] text-muted font-medium leading-snug">
      <span className="text-secondary font-bold mt-[1px] flex-shrink-0">✓</span>
      {text}
    </li>
  )
}

/* Thin line marks for the three low-risk guarantees — the trust that lets a
   skeptical owner say yes to a price. */
const ln = { fill: 'none', strokeWidth: 1.3, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
const guaranteeIcons = [
  // Fixed scope, quoted first — a quote/receipt
  <svg key="q" width="26" height="26" viewBox="0 0 24 24" stroke="#2f8fff" {...ln}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" /><path d="M9.5 8.5h5M9.5 12.5h5" /></svg>,
  // You own everything — a key
  <svg key="k" width="26" height="26" viewBox="0 0 24 24" stroke="#f5b544" {...ln}><circle cx="8" cy="8" r="4.2" /><path d="M11 11l8 8M15.5 15.5l2.2-2.2M18.5 18.5l2.2-2.2" /></svg>,
  // Start tiny — a spark
  <svg key="s" width="26" height="26" viewBox="0 0 24 24" stroke="#2f8fff" {...ln}><path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5M18.4 5.6l-2.5 2.5M8.1 15.9l-2.5 2.5" /></svg>,
]


export default function Pricing() {
  return (
    <section id="pricing" className="section bg-bg">
      <div className="container-page text-center">
        <SectionHeader
          index="06"
          eyebrow="Pricing"
          accent="gold"
          align="center"
          title={
            <>
              Start small. Spend more{' '}
              <em className="font-display italic text-secondary" style={{ fontWeight: 500 }}>
                only if it pays.
              </em>
            </>
          }
          lede="Fixed prices, quoted before the work starts. Every step has to earn the next one."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
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

        {/* Low-risk terms — the differentiator for an honesty-first firm, made
            unmissable rather than buried. */}
        <div className="mt-16">
          <p className="eyebrow text-primary mb-7">Low-risk by design</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--line-soft)] border border-[var(--line-soft)] rounded-lg overflow-hidden text-left">
            {guarantees.map((g, i) => (
              <div key={g.title} className="bg-surface p-7">
                <div aria-hidden="true">{guaranteeIcons[i]}</div>
                <h3 className="font-display text-[20px] text-text-base tracking-[-0.01em] mt-5 mb-2" style={{ fontWeight: 460 }}>
                  {g.title}
                </h3>
                <p className="text-muted font-medium text-body-sm leading-snug">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
