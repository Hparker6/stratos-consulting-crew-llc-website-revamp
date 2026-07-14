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
      'The numbers exist. They’re just in four different places, and by the time someone assembles them, the week they describe is already over. This is one screen your leadership can open on Monday and believe.',
    deliverables: [
      'Power BI dashboards connected directly to your ERP and accounting systems',
      'Agreed, documented KPI definitions, so there is one version of the truth',
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
      'Purchasing runs on memory: what we sold last time, what the vendor rep says, what feels about right. Memory over-weights the last few weeks, which is why the seasonal buy is always late and the growing item is always short.',
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
      'You almost certainly don’t have too much inventory. You have too much of the wrong items and not enough of the right ones, because the reorder points driving it were set years ago and nobody has touched them since.',
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
      'Your biggest account by revenue may be one of your worst by profit. Freight, returns, discounts, payment terms, and the service time that account eats never show up on the sales report, so nobody has ever done the math.',
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
      'Every week someone exports, filters, pastes, and sends. It costs a few hours, and once a quarter someone filters it wrong and the whole team spends the meeting arguing about the number instead of the business.',
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
      'The dashboard answers the questions you had in March. By June you have new ones, and hiring someone full-time to answer them is impossible to justify at your size.',
    deliverables: [
      'Dashboards and models maintained and improved continuously',
      'Monthly working session on the numbers with your leadership',
      'Priority queue for new questions and requests',
      'Month-to-month terms, so it continues only while it earns its keep',
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
  const viewRef = useSectionView<HTMLElement>('services_page')

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Analytics built around <span className="gradient-text">supplier decisions.</span>
          </>
        }
        lede="Every engagement starts with a decision your team makes over and over: what to stock, what to buy, which accounts to protect. We build for that decision. Not for the software."
      />

      <section ref={viewRef} className="section-sm bg-bg">
        <div className="container-page space-y-5">
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
                    className="chip-accent"
                  >
                    {s.tag}
                  </span>
                </div>
                <h2 className="t-h4 text-text-base">
                  {s.title}
                </h2>
                <p className="mt-3 text-muted font-medium text-body">{s.intro}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{s.tools}</p>
              </div>

              <div className="flex-1">
                <p className="t-label text-faint mb-4">
                  What you get
                </p>
                <ul className="space-y-3">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="text-secondary mt-[2px] font-bold text-sm flex-shrink-0">✓</span>
                      <span className="text-muted font-medium text-body-sm leading-snug">{d}</span>
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
