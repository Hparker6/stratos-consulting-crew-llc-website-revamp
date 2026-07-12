import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import PageHeader from '../components/PageHeader'
import Pricing from '../components/Pricing'
import CTABand from '../components/CTABand'

const rangeFactors = [
  {
    title: 'Number of data sources',
    body: 'One clean ERP export lands at the bottom of a range. ERP plus accounting plus three spreadsheets of tribal knowledge lands higher.',
  },
  {
    title: 'Data cleanliness',
    body: 'If item codes, customers, and units are consistent, we move fast. If history needs untangling first, that work is scoped — and quoted — before we start.',
  },
  {
    title: 'Depth of rollout',
    body: 'One executive view costs less than views for the exec team, purchasing, and every sales rep. You choose the altitude; the quote follows.',
  },
]

export default function PricingPage() {
  usePageMeta(
    'Pricing — Transparent, Fixed-Scope Analytics Engagements',
    'Transparent, fixed-scope pricing for analytics engagements — discovery assessment from $299, dashboard packages from $1k, forecasting projects, and month-to-month retainers.',
    { breadcrumb: 'Pricing' },
  )

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            No mystery quotes. <span className="gradient-text">No runaway invoices.</span>
          </>
        }
        lede="You shouldn't have to book a call just to learn whether this costs $2,000 or $50,000. Here are the real ranges, what moves you within them, and the terms that keep every engagement low-risk."
      />

      {/* Reuses the homepage pricing section for a single source of truth */}
      <Pricing />

      <section
        className="py-14 lg:py-16"
        style={{ background: '#0c1a30', borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="max-w-6xl mx-auto px-5">
          <div className="max-w-2xl">
            <p className="eyebrow text-primary mb-3">Why ranges?</p>
            <h2 className="font-heading font-bold text-[28px] md:text-[38px] tracking-[-0.02em] leading-tight">
              What moves you within a range.
            </h2>
            <p className="mt-4 text-muted font-medium text-[16px] leading-relaxed">
              Every project is quoted as a fixed price before it starts — the ranges above exist because
              three things legitimately vary between businesses. You'll know your exact number after the
              discovery call, in writing.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {rangeFactors.map((f) => (
              <div key={f.title} className="card p-6">
                <h3 className="font-heading font-semibold text-[18px] text-text-base mb-2">{f.title}</h3>
                <p className="text-muted font-medium text-[14px] leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-faint font-medium text-[14px] leading-relaxed max-w-2xl">
            Curious how the phases fit together?{' '}
            <Link to="/process" className="text-primary font-bold hover:underline">
              See the full process
            </Link>{' '}
            — each step is priced separately and has to earn the next one.
          </p>
        </div>
      </section>

      <CTABand
        title="Get your exact number."
        body="A free 30-minute call is all it takes to turn a range into a fixed, written quote — or an honest 'this isn't worth your money yet.'"
      />
    </>
  )
}
