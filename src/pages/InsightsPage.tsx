import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import PageHeader from '../components/PageHeader'
import CTABand from '../components/CTABand'
import { articles, formatDate } from '../data/insights'

export default function InsightsPage() {
  usePageMeta(
    'Insights',
    'Practical analytics thinking for distributors, manufacturers, and wholesalers — inventory, forecasting, profitability, and reporting, in plain English.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title={
          <>
            Practical analytics thinking, <span className="gradient-text">in plain English.</span>
          </>
        }
        lede="How we think about inventory, forecasting, profitability, and reporting for mid-size suppliers. New pieces publish here and on LinkedIn — this page is their permanent home."
      />

      <section className="py-14 lg:py-16 bg-bg">
        <div className="max-w-4xl mx-auto px-5 space-y-5">
          {articles.map((a) => (
            <Link
              key={a.slug}
              to={`/insights/${a.slug}`}
              className="card-lg p-7 lg:p-8 block hover:border-white/[0.16] transition-colors group"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.12em] px-2 py-[3px] rounded-[5px] text-primary"
                  style={{ background: 'rgba(47,143,255,0.1)', border: '1px solid rgba(47,143,255,0.25)' }}
                >
                  {a.tag}
                </span>
                <span className="font-mono text-[11px] text-faint tracking-wide">
                  {formatDate(a.date)} · {a.readMinutes} min read
                </span>
              </div>
              <h2 className="font-heading font-bold text-[22px] md:text-[26px] tracking-[-0.02em] leading-tight text-text-base group-hover:text-primary transition-colors">
                {a.title}
              </h2>
              <p className="mt-3 text-muted font-medium text-[15px] leading-relaxed">{a.excerpt}</p>
              <span className="inline-flex mt-4 text-primary font-bold text-[14px] group-hover:underline">
                Read the article →
              </span>
            </Link>
          ))}

          <div
            className="rounded-[14px] px-6 py-5 text-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.12)' }}
          >
            <p className="text-muted font-medium text-[14px] leading-relaxed">
              Prefer LinkedIn? The same articles publish there —{' '}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold hover:underline"
              >
                follow along
              </a>{' '}
              and new pieces will find you.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Rather talk it through than read about it?"
        body="If any of these topics hits close to home, a free discovery call is the fastest way to find out what your own data would say."
      />
    </>
  )
}
