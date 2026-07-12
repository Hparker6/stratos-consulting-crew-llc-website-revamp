import { ReactNode } from 'react'
import {
  ExecutiveKpisMock,
  CustomerProfitabilityMock,
  InventoryOptimizationMock,
  DemandForecastingMock,
  PurchasingAnalyticsMock,
  SalesReportingMock,
} from './mocks'

export interface DashboardEntry {
  id: string
  title: string
  audience: string
  description: string
  questions: string[]
  problemSlug: string
  mock: ReactNode
}

export const dashboards: DashboardEntry[] = [
  {
    id: 'executive-kpis',
    title: 'Executive KPI Command Center',
    audience: 'Owners, presidents & GMs',
    description:
      'The Monday-morning view: revenue against plan, margin, turns, and fill rate on one screen — refreshed automatically from the ERP, drillable to branch, product line, or SKU.',
    questions: [
      'How did we perform last week, without waiting for month-end?',
      'Which product lines are ahead of plan — and which are slipping?',
      'Is margin moving because of price, cost, or mix?',
    ],
    problemSlug: 'executive-visibility',
    mock: <ExecutiveKpisMock />,
  },
  {
    id: 'customer-profitability',
    title: 'Customer Profitability & Cost-to-Serve',
    audience: 'Owners & sales leadership',
    description:
      'Ranks every account by true gross profit after freight, returns, discounts, and terms — and flags the large-revenue accounts that are quietly break-even or worse.',
    questions: [
      'Which customers actually make us money after cost-to-serve?',
      'Which accounts need a pricing or service-level conversation?',
      'How concentrated is our profit — and are we protecting the accounts that carry us?',
    ],
    problemSlug: 'customer-profitability',
    mock: <CustomerProfitabilityMock />,
  },
  {
    id: 'inventory-optimization',
    title: 'Inventory Health & Optimization',
    audience: 'Operations & purchasing',
    description:
      'Splits inventory value into healthy, excess, and dead by category and age — with a ranked cleanup list and stockout-risk flags on the items that drive fill rate.',
    questions: [
      'How much cash is sitting in excess and dead stock, and where?',
      'Which SKUs are at stockout risk in the next 30–60 days?',
      'Which slow movers should we return, promote, or stop reordering?',
    ],
    problemSlug: 'inventory-optimization',
    mock: <InventoryOptimizationMock />,
  },
  {
    id: 'demand-forecasting',
    title: 'Demand Forecast & Accuracy Tracker',
    audience: 'Purchasing & planning',
    description:
      'Statistical forecasts built on your own sales history, with seasonality made visible and forecast accuracy reported openly every cycle — so the numbers earn trust.',
    questions: [
      'What will we realistically sell next month and next quarter?',
      'When should the seasonal buys land, and how big should they be?',
      'How accurate was the last forecast, and where was it off?',
    ],
    problemSlug: 'demand-forecasting',
    mock: <DemandForecastingMock />,
  },
  {
    id: 'purchasing-analytics',
    title: 'Purchasing & Vendor Scorecard',
    audience: 'Purchasing & operations',
    description:
      'Vendor reliability computed from your own PO history — on-time rates, lead-time drift, and spend concentration — so vendor reviews run on evidence, not anecdote.',
    questions: [
      'Which vendors deliver on time, and which are quietly getting worse?',
      'Where is spend concentrated, and what is our exposure?',
      'Which late PO lines threaten customer orders right now?',
    ],
    problemSlug: 'purchasing-analytics',
    mock: <PurchasingAnalyticsMock />,
  },
  {
    id: 'sales-reporting',
    title: 'Sales Performance & Mix',
    audience: 'Owners & sales managers',
    description:
      'One automated sales view for every altitude — trend vs. last year, new vs. repeat mix, and account momentum — so Monday meetings start from agreement, not reconciliation.',
    questions: [
      'How is each rep, territory, and product line trending?',
      'Is growth coming from new customers or deeper share of existing ones?',
      'Which accounts bought last quarter but have gone quiet?',
    ],
    problemSlug: 'sales-reporting',
    mock: <SalesReportingMock />,
  },
]

export function getDashboard(id: string): DashboardEntry | undefined {
  return dashboards.find((d) => d.id === id)
}
