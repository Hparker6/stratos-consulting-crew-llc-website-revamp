import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import useSectionView from '../hooks/useSectionView'
import PageHeader from '../components/PageHeader'
import WhoWeHelp from '../components/WhoWeHelp'
import ERPFamiliarity from '../components/ERPFamiliarity'
import CTABand from '../components/CTABand'

interface ServiceDetail {
  id: string
  title: string
  tag: string
  intro: string
  deliverables: string[]
  tools: string
  problemSlug: string
}

const services: ServiceDetail[] = [
  {
    id: 'dashboards',
    title: 'Executive Dashboards & KPI Reporting',
    tag: 'Visibility',
    intro:
      'One trusted, automatically refreshed view of the business — revenue, margin, turns, fill rate — designed around the decisions your leadership team actually makes each week.',
    deliverables: [
      'Power BI dashboards connected directly to your ERP and accounting systems',
      'Agreed, documented KPI definitions — one version of the truth',
      'Automated weekly summary reports delivered to your inbox',
      'Drill-down from company-wide to branch, product line, or SKU',
    ],
    tools: 'Power BI · SQL · your ERP',
    problemSlug: 'executive-visibility',
  },
  {
    id: 'forecasting',
    title: 'Demand & Sales Forecasting',
    tag: 'Planning',
    intro:
      'Statistical forecasts built on your own sales history — trend, seasonality, and momentum made visible — with accuracy measured and reported openly every cycle.',
    deliverables: [
      'Demand models at the level purchasing actually buys: SKU, line, or vendor',
      'Seasonal buy timing and sizing backed by evidence',
      'Forecast-vs-actual accuracy tracking, published every cycle',
      'Suggested buys that account for stock on hand, open POs, and lead times',
    ],
    tools: 'Python · SQL · Power BI',
    problemSlug: 'demand-forecasting',
  },
  {
    id: 'inventory',
    title: 'Inventory Optimization',
    tag: 'Working capital',
    intro:
      'Velocity classification, recalculated stocking rules, and a ranked excess list — so cash comes off the shelves and the A-items stop stocking out.',
    deliverables: [
      'ABC/XYZ classification from live sales history',
      'Reorder points, safety stock, and min/max computed from real demand variability',
      'Ranked excess & dead-stock cleanup list with dollars attached',
      'Stockout-risk flags on the items that drive fill rate',
    ],
    tools: 'Python · SQL · Power BI',
    problemSlug: 'inventory-optimization',
  },
  {
    id: 'profitability',
    title: 'Customer & Product Profitability',
    tag: 'Margin',
    intro:
      'True profit by customer and product after freight, returns, discounts, and terms — the analysis that changes where sales effort and pricing attention go.',
    deliverables: [
      'Cost-to-serve profitability model with explicit, auditable allocation logic',
      'Account segmentation: protect, grow, reprice',
      'Pricing-exception and margin-erosion tracking',
      'Living dashboards, not a one-time study',
    ],
    tools: 'SQL · Power BI · Excel',
    problemSlug: 'customer-profitability',
  },
  {
    id: 'automation',
    title: 'Reporting & Process Automation',
    tag: 'Time back',
    intro:
      'The reports your team rebuilds by hand every week, rebuilt once — as pipelines that run themselves, identically, on schedule.',
    deliverables: [
      'Automated data pipelines from ERP/accounting to reporting',
      'Scheduled report generation and distribution',
      'Replacement of fragile spreadsheet chains with documented logic',
      'Alerting on the exceptions worth a human’s attention',
    ],
    tools: 'Python · SQL · Power Automate',
    problemSlug: 'sales-reporting',
  },
  {
    id: 'partner',
    title: 'Ongoing Analytics Partnership',
    tag: 'Fractional team',
    intro:
      'A monthly engagement that works like having an analytics team on staff — maintaining what’s built, answering new questions, and finding the next improvement.',
    deliverables: [
      'Dashboards and models maintained and improved continuously',
      'Monthly working session on the numbers with your leadership',
      'Priority queue for new questions and requests',
      'Month-to-month terms — continue only while it earns its keep',
    ],
    tools: 'Everything above, on retainer',
    problemSlug: 'executive-visibility',
  },
]

export default function ServicesPage() {
  usePageMeta(
    'Analytics Services for Distributors & Manufacturers',
    'Executive dashboards, demand forecasting, inventory optimization, profitability analysis, and reporting automation for distributors, manufacturers, and wholesalers.',
    { breadcrumb: 'Services' },
  )
  const viewRef = useSectionView<HTMLElement>('services_view', { section: 'services_page' })

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Analytics built around <span className="gradient-text">supplier decisions.</span>
          </>
        }
        lede="Every engagement is scoped around a recurring decision your team makes — what to stock, what to buy, which accounts to protect — not around technology for its own sake."
      />

      <section ref={viewRef} className="py-14 lg:py-16 bg-bg">
        <div className="max-w-6xl mx-auto px-5 space-y-5">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="card-lg p-7 lg:p-9 flex flex-col lg:flex-row gap-7 lg:gap-12"
              data-reveal
            >
              <div className="lg:w-[42%] flex-shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[13px] font-bold text-primary tracking-[0.1em]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.12em] px-2 py-[3px] rounded-[5px] text-secondary"
                    style={{ background: 'rgba(39,224,160,0.1)', border: '1px solid rgba(39,224,160,0.25)' }}
                  >
                    {s.tag}
                  </span>
                </div>
                <h2 className="font-heading font-bold text-[24px] md:text-[28px] tracking-[-0.02em] leading-tight text-text-base">
                  {s.title}
                </h2>
                <p className="mt-3 text-muted font-medium text-[16px] leading-relaxed">{s.intro}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{s.tools}</p>
              </div>

              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint mb-4">
                  What you get
                </p>
                <ul className="space-y-3">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="text-secondary mt-[2px] font-bold text-sm flex-shrink-0">✓</span>
                      <span className="text-muted font-medium text-[15px] leading-snug">{d}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/solutions#${s.problemSlug}`}
                  className="inline-flex mt-5 text-primary font-bold text-[14px] hover:underline"
                >
                  See this problem solved, with a sample dashboard →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <WhoWeHelp />
      <ERPFamiliarity />
      <CTABand />
    </>
  )
}
