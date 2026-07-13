/**
 * Pricing tiers — the single source for the rendered cards (Pricing.tsx) and the
 * Offer/OfferCatalog structured data (lib/schema.ts).
 *
 * `priceLow`/`priceHigh` carry the same numbers the card displays, in a form
 * schema.org can express. Keeping them beside the display string means the
 * markup can never advertise a price the page doesn't show.
 */
export interface PricingTier {
  name: string
  /** Display string, exactly as rendered on the card. */
  price: string
  priceLow: number
  priceHigh: number
  /** 'project' for one-off engagements, 'month' for the retainer. */
  unit: 'project' | 'month'
  outcome: string
  features: string[]
  featured: boolean
}

/*
 * Pricing is framed around the business outcome each engagement buys —
 * not the technical deliverables — with the low-risk terms made explicit.
 */
export const tiers: PricingTier[] = [
  {
    name: 'Discovery Assessment',
    price: '$299–$499',
    priceLow: 299,
    priceHigh: 499,
    unit: 'project',
    outcome: 'Know exactly where the money is hiding.',
    features: [
      'A ranked report of your biggest opportunities',
      'Honest read on what your data can support today',
      'A 60-minute findings call, and the report is yours to keep',
      'Stop here if you want; no strings',
    ],
    featured: false,
  },
  {
    name: 'Dashboard Package',
    price: '$1k–$2.5k',
    priceLow: 1000,
    priceHigh: 2500,
    unit: 'project',
    outcome: 'One trusted view of the business, updated automatically.',
    features: [
      'The end of dueling spreadsheets',
      'Hours of manual reporting removed weekly',
      'Numbers your whole team agrees on',
      '30 days of support included',
    ],
    featured: true,
  },
  {
    name: 'Forecasting Project',
    price: '$2.5k–$5k',
    priceLow: 2500,
    priceHigh: 5000,
    unit: 'project',
    outcome: 'Buy what will sell. Stock what moves. Free the rest.',
    features: [
      'Purchasing driven by evidence, not memory',
      'Seasonal buys placed on time, sized right',
      'Cash freed from excess and slow movers',
      'Forecast accuracy reported openly',
    ],
    featured: false,
  },
  {
    name: 'Monthly Retainer',
    price: '$500–$1.5k/mo',
    priceLow: 500,
    priceHigh: 1500,
    unit: 'month',
    outcome: 'An analytics team, without the headcount.',
    features: [
      'Everything maintained and improving',
      'Monthly strategy session on the numbers',
      'New questions answered on priority',
      'Month-to-month, cancel anytime',
    ],
    featured: false,
  },
]

export const guarantees = [
  {
    title: 'Fixed scope, quoted first',
    body: 'Every engagement is priced before it starts. No open-ended billing, no surprise invoices.',
  },
  {
    title: 'You own everything',
    body: 'Dashboards, models, and documentation are built in your systems and stay yours, always.',
  },
  {
    title: 'Start tiny',
    body: 'The first call is free and the assessment is a few hundred dollars. You risk a conversation, not a budget.',
  },
]
