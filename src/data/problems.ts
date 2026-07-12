/**
 * "Business Problems We Solve" content. Each entry describes a common
 * supplier challenge, our analytics approach, the questions it answers, and
 * what the work is designed to unlock. No prior engagements are claimed.
 */

export interface Problem {
  slug: string
  eyebrow: string
  title: string
  short: string
  challenge: string[]
  approach: { title: string; body: string }[]
  questions: string[]
  outcomes: string[]
  dashboardId?: string
}

export const problems: Problem[] = [
  {
    slug: 'executive-visibility',
    eyebrow: 'Executive Visibility',
    title: "You can't see the whole business on one screen",
    short:
      'Revenue lives in the ERP, margins in a spreadsheet, inventory in someone’s head. Leadership decisions wait on reports that take days to assemble.',
    challenge: [
      'In most $5–50M distribution businesses, the numbers exist. They’re just scattered. Sales history sits in the ERP, costs in accounting, open orders in email threads, and the "real" margin picture in a spreadsheet only one person knows how to update.',
      'The result is that leadership runs the company on lagging, partial information. Month-end close becomes the first honest look at performance, weeks after the decisions that shaped it were already made.',
    ],
    approach: [
      {
        title: 'Define the KPIs that actually run the business',
        body: 'We start with the five to ten numbers an owner or GM needs weekly: revenue vs. plan, gross margin, inventory turns, fill rate, open order backlog. Then we agree on exactly how each is calculated, so there is one version of the truth.',
      },
      {
        title: 'Connect directly to your systems',
        body: 'Dashboards pull from your ERP, accounting, and inventory systems on a schedule. No manual exports, no re-keyed spreadsheets, no version confusion.',
      },
      {
        title: 'Build for the Monday meeting, not the data team',
        body: 'One executive screen, drillable from company-wide down to a branch, product line, or single SKU. Automated weekly summaries land in your inbox before you ask.',
      },
    ],
    questions: [
      'How did we actually perform last week in revenue, margin, and fill rate, without waiting for month-end?',
      'Which product lines and branches are ahead of plan, and which are quietly slipping?',
      'Where is margin leaking: pricing, cost, mix, or freight?',
      'What should we be worried about this week that we can still do something about?',
    ],
    outcomes: [
      'One trusted, automatically refreshed view of the business. The end of dueling spreadsheets.',
      'Hours of manual report assembly removed from every week.',
      'Problems surfaced while they are still cheap to fix, not at month-end.',
      'A shared set of numbers that sales, purchasing, and finance all agree on.',
    ],
    dashboardId: 'executive-kpis',
  },
  {
    slug: 'customer-profitability',
    eyebrow: 'Customer Profitability',
    title: "You don't know which customers actually make you money",
    short:
      'Big revenue accounts can be quiet money-losers once freight, returns, discounts, and service time are counted. Most suppliers have never seen that math.',
    challenge: [
      'Revenue by customer is easy; every ERP prints it. Profit by customer is a different story. Once you allocate freight, returns, rebates, payment terms, small-order handling, and the disproportionate service time some accounts consume, the ranking often changes dramatically.',
      'Without that picture, sales effort flows to the loudest accounts instead of the best ones, pricing exceptions accumulate unnoticed, and the customers subsidizing the rest of the book go under-protected.',
    ],
    approach: [
      {
        title: 'Build true cost-to-serve profitability',
        body: 'We combine invoice-level sales history with freight, returns, discounts, and terms data to compute gross profit per customer, not just revenue, and we make the allocation logic explicit and auditable.',
      },
      {
        title: 'Segment the book',
        body: 'Customers are grouped by profitability and growth trajectory, so it’s obvious which accounts to protect, which to grow, and which need a pricing or service-level conversation.',
      },
      {
        title: 'Make it a living tool, not a one-time study',
        body: 'The analysis refreshes automatically, so account reviews and pricing decisions are always working from current numbers.',
      },
    ],
    questions: [
      'Which 20% of customers generate most of our gross profit, and are we protecting them?',
      'Which large-revenue accounts are actually break-even or worse after cost-to-serve?',
      'Where have discounts and pricing exceptions quietly eroded margin?',
      'Which mid-size accounts look like the next tier of great customers?',
    ],
    outcomes: [
      'A ranked, defensible view of profit by customer that sales and finance both trust.',
      'Concrete talking points for repricing or restructuring unprofitable relationships.',
      'Sales effort redirected toward the accounts with the best economics.',
      'An early warning when a good account’s economics start to slide.',
    ],
    dashboardId: 'customer-profitability',
  },
  {
    slug: 'inventory-optimization',
    eyebrow: 'Inventory Optimization',
    title: 'Cash is trapped in the wrong inventory',
    short:
      'The fast movers stock out while slow movers gather dust. Working capital sits on shelves in exactly the wrong proportions.',
    challenge: [
      'Distributors almost never have too much inventory overall. They have too much of the wrong items and too little of the right ones. Reorder points set years ago, "just in case" buys, and vendor minimums accumulate into a warehouse where a meaningful share of the value hasn’t turned in a year.',
      'Meanwhile the A-items that drive service levels run thin, forcing expedited freight and broken promises. Both failures have the same root cause: stocking decisions made without current data.',
    ],
    approach: [
      {
        title: 'Classify every SKU by velocity and value',
        body: 'ABC/XYZ analysis on your actual sales history separates the items that earn their shelf space from the ones consuming cash, measured in units, dollars, and picks.',
      },
      {
        title: 'Recalculate the stocking rules',
        body: 'Safety stock, reorder points, and min/max levels computed from real demand variability and vendor lead times, not gut feel that was last updated in 2019.',
      },
      {
        title: 'Quantify and work down the excess',
        body: 'A ranked excess and dead-stock list showing what to return, promote, transfer, or write off, with the dollars attached so the cleanup pays for itself first.',
      },
    ],
    questions: [
      'How much cash is tied up in excess and dead stock, by category, vendor, and age?',
      'Which SKUs are at risk of stockout in the next 30–60 days?',
      'What should our reorder points and safety stock actually be, item by item?',
      'Which slow movers should we return, discount, or stop reordering entirely?',
    ],
    outcomes: [
      'Working capital freed from shelves and returned to the business.',
      'Fewer stockouts on the items that drive fill rate and customer trust.',
      'Stocking rules that update with the data instead of decaying with time.',
      'A repeatable monthly process for keeping inventory honest.',
    ],
    dashboardId: 'inventory-optimization',
  },
  {
    slug: 'demand-forecasting',
    eyebrow: 'Demand Forecasting',
    title: "You're reordering based on memory, not math",
    short:
      'Purchasing runs on what people remember selling. Seasonality, trends, and one-off spikes all blur together, and the buys show it.',
    challenge: [
      'When there’s no forecast, every purchasing decision is a small act of memory: what did we sell last time, what does the vendor rep say, what feels right. Human memory over-weights recent weeks and dramatic events, so the buys oscillate between too cautious and too bold.',
      'Seasonal items get reordered late because the spike "surprised" everyone again. Growth items stay under-bought for months. Declining items keep arriving long after demand rolled over.',
    ],
    approach: [
      {
        title: 'Model demand from your own history',
        body: 'Statistical forecasts built on your sales history that capture trend, seasonality, and promotions, at the level purchasing actually buys: SKU, product line, or vendor.',
      },
      {
        title: 'Right-size the sophistication',
        body: 'Simple, explainable models that beat gut feel and that your team can interrogate. Not a black box. Forecast accuracy is measured and reported every cycle, so trust is earned with evidence.',
      },
      {
        title: 'Feed it into purchasing',
        body: 'Forecasts translate into suggested buys against current stock, open POs, and lead times. The number your buyer needs, on the screen they already use.',
      },
    ],
    questions: [
      'What will we realistically sell next month and next quarter, by product line?',
      'Which items are trending up or rolling over, before it’s obvious?',
      'When do we need to place the seasonal buys, and how big should they be?',
      'How accurate were last quarter’s forecasts, and where were they off?',
    ],
    outcomes: [
      'Purchasing driven by a forecast the whole team can see and question.',
      'Seasonal buys placed on time and sized by evidence.',
      'Less expedited freight, fewer panic buys, fewer "how did we miss this" meetings.',
      'Forecast accuracy tracked openly, so the process improves every cycle.',
    ],
    dashboardId: 'demand-forecasting',
  },
  {
    slug: 'purchasing-analytics',
    eyebrow: 'Purchasing Analytics',
    title: 'Purchasing is reactive and vendor performance is invisible',
    short:
      'Late POs surface when a customer order breaks. Nobody can say which vendors are reliable, which are slipping, or where the spend actually goes.',
    challenge: [
      'In most supplier businesses, purchasing data is rich and almost entirely unused. Every PO carries a promise date, an actual receipt date, a price, and a quantity, which means vendor reliability, lead-time drift, and price creep are all measurable. But nobody has assembled the picture.',
      'So vendor conversations happen on anecdote, price increases arrive unbenchmarked, and the first sign of a supply problem is a customer order that can’t ship.',
    ],
    approach: [
      {
        title: 'Score every vendor on the record',
        body: 'On-time delivery, fill rate, lead-time consistency, and price stability computed from your own PO history. A scorecard you can put on the table at the next vendor review.',
      },
      {
        title: 'Map the spend',
        body: 'Pareto analysis of spend by vendor and category exposes concentration risk, consolidation opportunities, and the small tail of vendors consuming disproportionate effort.',
      },
      {
        title: 'Watch the leading indicators',
        body: 'Lead-time drift and slipping on-time rates flag a struggling vendor months before it becomes a stockout, while there’s still time to qualify an alternative.',
      },
    ],
    questions: [
      'Which vendors actually deliver on time, and which are quietly getting worse?',
      'Where is our spend concentrated, and what’s our exposure if a key vendor stumbles?',
      'Which items have had price increases above the market, and by how much?',
      'What’s stuck on open POs right now, and which late lines threaten customer orders?',
    ],
    outcomes: [
      'Vendor negotiations backed by your own delivery and pricing data.',
      'Supply problems visible while they’re still avoidable.',
      'A fact base for consolidating the vendor tail and leveraging volume.',
      'Purchasing conversations that move from anecdote to evidence.',
    ],
    dashboardId: 'purchasing-analytics',
  },
  {
    slug: 'sales-reporting',
    eyebrow: 'Sales Reporting',
    title: 'Sales reporting takes days and nobody trusts the numbers',
    short:
      'Every week someone rebuilds the sales report by hand, and every version disagrees with the last one. The team argues about the data instead of acting on it.',
    challenge: [
      'Manual sales reporting has a predictable failure pattern: exports pulled on different days, filters applied slightly differently, one-off adjustments that never get documented. Soon there are three versions of "last month’s sales" and a standing agenda item about which one is right.',
      'The deeper cost isn’t the assembly time. It’s that reps, managers, and owners each see different numbers, so accountability blurs and coaching conversations turn into data disputes.',
    ],
    approach: [
      {
        title: 'One pipeline, one definition, zero manual steps',
        body: 'Sales data flows from your ERP into reporting automatically, with every metric defined once and applied consistently: bookings, shipments, returns, margin.',
      },
      {
        title: 'Views for every altitude',
        body: 'The owner sees trend and mix, managers see team and territory, and reps see their own book, all from the same numbers. The Monday conversation starts from agreement.',
      },
      {
        title: 'Surface the signal, not just the totals',
        body: 'New vs. repeat mix, slipping accounts, product-line momentum, and average order value trends. The patterns that totals hide.',
      },
    ],
    questions: [
      'How is each rep, territory, and product line actually trending?',
      'Which accounts bought last quarter but have gone quiet this quarter?',
      'Is growth coming from new customers or deeper share of existing ones?',
      'What is our average order value and margin trend by segment?',
    ],
    outcomes: [
      'The weekly sales report builds itself, identically, every time.',
      'One set of numbers everyone from owner to rep works from.',
      'At-risk accounts flagged while there’s still time to save them.',
      'Sales meetings spent on action, not reconciliation.',
    ],
    dashboardId: 'sales-reporting',
  },
]

export function getProblem(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug)
}
