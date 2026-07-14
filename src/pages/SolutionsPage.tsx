import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import useSectionView from '../hooks/useSectionView'
import PageHeader from '../components/PageHeader'
import CTABand from '../components/CTABand'
import { problems, Problem } from '../data/problems'
import { getDashboard } from '../components/dashboards'

/**
 * Solutions — the pain-point marketing hub. Each section pairs a common
 * supplier problem with our analytics approach and a clearly labeled sample
 * dashboard built from fictional data. Replaces separate Problems +
 * Dashboard Gallery pages.
 */
export default function SolutionsPage() {
  usePageMeta(
    'Solutions: The Supplier Problems We Solve',
    'The supplier problems we solve, from cash stuck in inventory to gut-feel purchasing and manual reporting, with the analytics approach and a sample dashboard for each.',
    { breadcrumb: 'Solutions' },
  )

  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title={
          <>
            The problems are common. <span className="gradient-text">The fix is your data.</span>
          </>
        }
        lede="Six challenges we see across distributors, manufacturers, and wholesalers. For each one: what it costs you, how we attack it analytically, and a sample of what you'd see on screen."
      />

      {/* Jump links */}
      <div className="bg-bg">
        <div className="container-page">
          <nav className="flex flex-wrap gap-2" aria-label="Jump to a solution">
            {problems.map((p, i) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="chip-outline"
                data-track="dashboard_interaction"
                data-track-label={`jump_${p.slug}`}
              >
                {`${String(i + 1).padStart(2, '0')} · ${p.eyebrow}`}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <section className="section-sm bg-bg">
        <div className="container-page space-y-16 lg:space-y-20">
          {problems.map((p, i) => (
            <SolutionSection key={p.slug} problem={p} index={i} />
          ))}
        </div>
      </section>

      {/* Bridge to services */}
      <section className="py-12 bg-bg">
        <div className="container-page">
          <div className="card-lg p-7 lg:p-9 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h2 className="t-h4 text-text-base">
                Want the service-by-service breakdown?
              </h2>
              <p className="mt-2 text-muted font-medium text-body-sm">
                Deliverables, tools, and what's included in each engagement: dashboards, forecasting,
                inventory optimization, profitability, and automation.
              </p>
            </div>
            <Link to="/services" className="btn-secondary flex-shrink-0" data-track="nav_click" data-track-label="solutions_to_services">
              View Services →
            </Link>
          </div>
        </div>
      </section>

      <CTABand
        title="Recognize your business in one of these?"
        body="That's exactly what the free discovery call is for. Bring the problem, and we'll tell you honestly whether analytics can move it and what it would take."
      />
    </>
  )
}

function SolutionSection({ problem: p, index: i }: { problem: Problem; index: number }) {
  const dashboard = p.dashboardId ? getDashboard(p.dashboardId) : undefined
  const viewRef = useSectionView<HTMLElement>(`dashboard_${p.slug}`)
  return (
    <article
      ref={viewRef}
      id={p.slug}
      className={`flex flex-col gap-8 lg:gap-12 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
      style={{ scrollMarginTop: 90 }}
    >
                {/* Text column */}
                <div className="flex-1 lg:max-w-[460px]" data-reveal>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[13px] font-bold text-primary tracking-[0.1em]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="eyebrow text-secondary text-[11px]">{p.eyebrow}</span>
                  </div>
                  <h2 className="t-h4 text-text-base">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-muted font-medium text-body">{p.challenge[0]}</p>

                  <p className="mt-6 t-label text-faint mb-3">
                    How we attack it
                  </p>
                  <div className="space-y-3">
                    {p.approach.map((a, n) => (
                      <div key={a.title} className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 w-[26px] h-[26px] rounded-full flex items-center justify-center font-heading font-bold text-[12px] text-primary mt-[1px] border-[1.5px] border-primary"
                        >
                          {n + 1}
                        </span>
                        <p className="text-muted font-medium text-body-sm leading-snug">
                          <span className="text-text-base font-semibold">{`${a.title}.`}</span>
                          {` ${a.body}`}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 t-label text-faint mb-3">
                    What changes
                  </p>
                  <ul className="space-y-2">
                    {p.outcomes.slice(0, 3).map((o) => (
                      <li key={o} className="flex items-start gap-2 text-[15px] text-muted font-medium leading-snug">
                        <span className="text-secondary font-bold mt-[1px] flex-shrink-0">✓</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dashboard column */}
                <div className="flex-1 w-full max-w-[620px]" data-reveal data-reveal-delay={140}>
                  {dashboard && (
                    <>
                      {dashboard.mock}
                      <p className="mt-3 text-faint font-medium text-[13px] leading-relaxed">
                        <span className="text-muted font-semibold">{`${dashboard.title}.`}</span>
                        {` Built for ${dashboard.audience.toLowerCase().replace(/\bgms\b/g, 'GMs').replace(/\bmro\b/g, 'MRO')}, and built to answer: ${
                          dashboard.questions[0].charAt(0).toLowerCase() + dashboard.questions[0].slice(1)
                        }`}
                      </p>
                    </>
                  )}
                </div>
    </article>
  )
}
