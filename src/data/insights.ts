/**
 * Insights — long-form articles. This file is the single source for the
 * Insights index and article pages. Articles first published on LinkedIn are
 * republished here by adding an entry (set `linkedInUrl` when applicable),
 * which makes this site the canonical, search-indexable home for each piece.
 */

export interface ArticleSection {
  heading?: string
  paragraphs: string[]
  bullets?: string[]
}

export interface Article {
  slug: string
  title: string
  date: string // ISO yyyy-mm-dd
  readMinutes: number
  tag: string
  excerpt: string
  linkedInUrl?: string
  sections: ArticleSection[]
}

export const articles: Article[] = [
  {
    slug: 'five-numbers-every-distributor-should-review-weekly',
    title: 'The five numbers every distributor should review every Monday',
    date: '2026-06-15',
    readMinutes: 6,
    tag: 'Executive Visibility',
    excerpt:
      'Most distribution leaders drown in reports but still can’t answer "how are we doing this week?" Five numbers, reviewed weekly, cover a surprising share of what actually goes wrong.',
    sections: [
      {
        paragraphs: [
          'Distribution businesses generate enormous amounts of data and remarkably little visibility. The ERP prints hundreds of reports; almost none of them get read. Meanwhile the questions that actually keep owners up at night — are we making money, is the warehouse healthy, are we about to disappoint a customer — go unanswered until month-end.',
          'The fix isn’t more reports. It’s fewer numbers, watched more often. Here are the five we’d put on any distributor’s Monday screen.',
        ],
      },
      {
        heading: '1. Gross margin percent, this week vs. trailing average',
        paragraphs: [
          'Revenue is a vanity check; margin is the health check. Weekly gross margin against your own trailing average catches pricing mistakes, cost increases that haven’t been passed through, and mix shifts — weeks before they show up in the P&L.',
          'The key is comparing against yourself. Industry benchmarks are interesting; your own trend is actionable.',
        ],
      },
      {
        heading: '2. Fill rate on A-items',
        paragraphs: [
          'Overall fill rate hides the number that matters. Customers forgive a stockout on an odd item; they leave over repeated misses on the items they order every week. Track fill rate on your top-velocity SKUs separately — it is the single best early indicator of customer defection risk.',
        ],
      },
      {
        heading: '3. Inventory turns, by category',
        paragraphs: [
          'One blended turns number tells you almost nothing, because your fastest and slowest categories average into a comfortable-looking middle. Broken out by category, turns show you exactly where cash is accumulating on shelves — and where you might actually be under-stocked.',
        ],
      },
      {
        heading: '4. Open order backlog and aging',
        paragraphs: [
          'Backlog is future revenue and current risk in one number. Watch the total, but watch the aging harder: orders stuck more than a few days past promise are tomorrow’s difficult phone calls. A simple aging view turns them into today’s easy ones.',
        ],
      },
      {
        heading: '5. Cash conversion: DSO plus days of inventory',
        paragraphs: [
          'Distributors live and die on working capital. Days sales outstanding plus days of inventory on hand tells you how long a dollar stays trapped in the business. When that number creeps up, growth starts consuming cash instead of generating it — and it creeps quietly.',
        ],
      },
      {
        heading: 'Make it automatic or it won’t happen',
        paragraphs: [
          'None of these numbers are exotic. The reason most leadership teams don’t watch them weekly is purely mechanical: assembling them by hand takes someone half a day, so it happens monthly, then quarterly, then never.',
          'The bar to clear is simple: if the Monday numbers require any human effort to produce, the process will decay. Automate the pipeline, agree on the definitions once, and spend the meeting on decisions instead of assembly.',
        ],
      },
    ],
  },
  {
    slug: 'excess-inventory-is-a-data-problem',
    title: 'Excess inventory isn’t a warehouse problem — it’s a data problem',
    date: '2026-06-01',
    readMinutes: 7,
    tag: 'Inventory',
    excerpt:
      'Dead stock doesn’t arrive in trucks marked "mistake." It accumulates through hundreds of small, reasonable decisions made without current data. Which means the fix is also data.',
    sections: [
      {
        paragraphs: [
          'Walk any distributor’s warehouse and you’ll find it: the aisle of items nobody has picked in a year. Ask how it got there and you’ll hear reasonable stories — a customer who switched vendors, a minimum buy that outlived the demand, a "great deal" on a pallet, reorder points nobody has touched since they were set.',
          'Every one of those decisions was locally sensible. The excess is what happens when locally sensible decisions accumulate without a feedback loop. That’s why excess inventory is fundamentally a data problem: the information that would have prevented each buy existed, but it wasn’t in front of the person clicking "order."',
        ],
      },
      {
        heading: 'The three feedback loops that prevent excess',
        paragraphs: ['Distributors who keep inventory honest tend to run three loops:'],
        bullets: [
          'Velocity classification that updates itself. ABC rankings recomputed from live sales history — not the ranking from two years ago — so demoted items stop getting reordered automatically.',
          'Reorder points tied to measured demand and lead time. When either changes, the stocking rule changes with it, instead of drifting until someone notices.',
          'A monthly excess review with dollars attached. A ranked list of what to return, promote, transfer, or write off — small, boring, and relentless beats heroic annual cleanups.',
        ],
      },
      {
        heading: 'Why the spreadsheet version decays',
        paragraphs: [
          'Most operations have attempted some version of this in Excel, and most versions are abandoned within a quarter. The pattern is always the same: the analysis depends on someone manually pulling exports, that person gets busy, the file goes stale, and stale analysis is worse than none because people stop trusting it.',
          'Durability comes from automation, not diligence. When classification, reorder math, and the excess list refresh themselves from the ERP, the review meeting survives busy seasons — because nobody has to do homework for it.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'Start with the ranked excess list. It’s the analysis with the most immediate, tangible payoff: it names dollars sitting on shelves and what to do about each line. It also builds the organizational trust you’ll want when you move on to changing reorder points — the numbers will have earned their credibility.',
        ],
      },
    ],
  },
  {
    slug: 'forecasting-simple-models-beat-gut-feel',
    title: 'Forecasting for suppliers: why simple models beat gut feel (and black boxes)',
    date: '2026-05-18',
    readMinutes: 6,
    tag: 'Forecasting',
    excerpt:
      'The forecasting sweet spot for a $5–50M supplier isn’t AI magic — it’s simple, explainable models with honest accuracy tracking. Here’s what that looks like in practice.',
    sections: [
      {
        paragraphs: [
          'Forecasting has a marketing problem. Vendors pitch it as artificial intelligence; skeptical operators dismiss it as fortune telling. Both miss what a forecast actually is: a disciplined summary of your own sales history, extended forward, with its error measured.',
          'For a mid-size supplier, that discipline alone — no exotic algorithms required — is usually a large improvement over the status quo, because the status quo is human memory.',
        ],
      },
      {
        heading: 'What gut feel gets wrong, predictably',
        paragraphs: [
          'Human buyers are not bad at forecasting because they lack intelligence; they’re bad at it because memory has systematic biases. Recent weeks weigh more than they should. Dramatic events (the big stockout, the huge order) dominate quiet patterns. Slow trends — a product line eroding 2% a month — are nearly invisible year over year.',
          'Simple statistical models have none of these biases. They notice seasonality every single year, weight history consistently, and detect gradual rollovers early. That is the entire trick.',
        ],
      },
      {
        heading: 'Why explainable beats sophisticated',
        paragraphs: [
          'A forecast only changes purchasing behavior if the buyer trusts it, and trust requires the ability to interrogate it. "The model expects a Q3 lift because the last three Q3s averaged 18% above trend" is an answer a buyer can accept or challenge. A black box score is not.',
          'This is why we’d rather deploy a well-tuned seasonal model the team understands than a marginally more accurate one nobody can question. The 2% accuracy gain isn’t worth the trust loss.',
        ],
      },
      {
        heading: 'The non-negotiable: track accuracy openly',
        paragraphs: [
          'Every forecast should ship with its own report card — forecast vs. actual, by product line, every cycle. Two things happen when accuracy is public: the models improve, because misses get investigated; and adoption improves, because skeptics watch the forecast earn its keep.',
          'A forecast without accuracy tracking is an opinion with better formatting.',
        ],
      },
    ],
  },
  {
    slug: 'you-dont-need-a-data-team',
    title: 'You don’t need a data team to run on data',
    date: '2026-05-04',
    readMinutes: 5,
    tag: 'Analytics Strategy',
    excerpt:
      'Enterprise distributors have analysts on staff. You don’t need that to get the same visibility — you need the right scope, the systems you already own, and honest definitions.',
    sections: [
      {
        paragraphs: [
          'There’s a persistent belief among mid-size suppliers that "running on data" is an enterprise sport — that it requires a data warehouse, a BI team, and a seven-figure line item. That belief usually comes from watching enterprise projects, which are big because enterprises are big, not because the underlying work is.',
          'For a $5–50M distributor, the actual footprint of useful analytics is small: a handful of pipelines out of systems you already own, a few dashboards designed around real decisions, and stocking or forecasting math applied to your own history.',
        ],
      },
      {
        heading: 'Your ERP already collects the data',
        paragraphs: [
          'Every order, receipt, invoice, and adjustment is already being recorded. Mid-market ERPs — whether that’s Prophet 21, NetSuite, Business Central, SAP Business One, or even QuickBooks with an inventory add-on — are rich sources. The gap is almost never data collection; it’s that the data has no path from the transaction tables to a decision-maker’s screen.',
          'Building that path is well-understood work. It does not require replacing anything you run today.',
        ],
      },
      {
        heading: 'Scope around decisions, not dashboards',
        paragraphs: [
          'The failure mode of small-company analytics isn’t technical — it’s building views nobody uses. The antidote is scoping every piece of work around a recurring decision: what to reorder, which accounts to call, where margin is leaking. If a dashboard doesn’t change a specific decision made by a specific person on a specific cadence, it shouldn’t get built.',
        ],
      },
      {
        heading: 'What "small but real" looks like',
        paragraphs: ['A right-sized analytics footprint for a mid-size supplier usually amounts to:'],
        bullets: [
          'One executive KPI view, refreshed automatically, reviewed weekly.',
          'One inventory health view driving a monthly excess-and-stockout review.',
          'One sales view that ends the argument about whose numbers are right.',
          'Forecast-informed purchasing on the product lines where it pays.',
        ],
      },
      {
        paragraphs: [
          'That’s not a transformation program. It’s a few months of focused work and a modest ongoing effort to keep it sharp — a fraction of one analyst’s salary, for most of what an analyst would give you.',
        ],
      },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
