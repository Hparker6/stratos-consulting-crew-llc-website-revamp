function IconTruck() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="1.5" y="5" width="10" height="8" rx="1" stroke="#2f8fff" strokeWidth="1.5" />
      <path d="M11.5 8h3.5l2.5 3v2h-6V8z" stroke="#2f8fff" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="5.5" cy="14.5" r="1.8" stroke="#2f8fff" strokeWidth="1.5" />
      <circle cx="14.5" cy="14.5" r="1.8" stroke="#2f8fff" strokeWidth="1.5" />
    </svg>
  )
}
function IconGear() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3" stroke="#27e0a0" strokeWidth="1.5" />
      <path
        d="M10 2v2.5M10 15.5V18M18 10h-2.5M4.5 10H2M15.7 4.3l-1.8 1.8M6.1 13.9l-1.8 1.8M15.7 15.7l-1.8-1.8M6.1 6.1L4.3 4.3"
        stroke="#27e0a0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
function IconWrench() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M13.5 2.5a4 4 0 00-3.8 5.2L3 14.4a1.8 1.8 0 102.5 2.5l6.8-6.7a4 4 0 005.1-4.9l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6a4 4 0 00-.9.2z"
        stroke="#2f8fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function IconStack() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2.5L18 7l-8 4.5L2 7l8-4.5z" stroke="#27e0a0" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 11l8 4.5 8-4.5M2 15l8 4.5 8-4.5" stroke="#27e0a0" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
    </svg>
  )
}

const audiences = [
  {
    icon: <IconTruck />,
    tileClass: 'icon-tile-blue',
    title: 'Distributors',
    body: 'Multi-line distributors balancing thousands of SKUs, fill-rate promises, and thin margins, where inventory decisions are the business.',
  },
  {
    icon: <IconGear />,
    tileClass: 'icon-tile-green',
    title: 'Manufacturers',
    body: 'Small and mid-size manufacturers who need visibility from raw materials through finished goods, plus forecasts that drive production instead of guesswork.',
  },
  {
    icon: <IconWrench />,
    tileClass: 'icon-tile-blue',
    title: 'Industrial Suppliers',
    body: 'MRO, fastener, electrical, and safety suppliers serving contractors and plants, with high SKU counts, unpredictable demand, and service levels that win or lose accounts.',
  },
  {
    icon: <IconStack />,
    tileClass: 'icon-tile-green',
    title: 'Wholesalers',
    body: 'Wholesalers moving volume on tight spreads, where a point of margin, a turn of inventory, or a day of DSO is real money.',
  },
]

interface Props {
  /** 'section' renders with its own heading band; 'embedded' renders just the cards. */
  variant?: 'section' | 'embedded'
}

export default function WhoWeHelp({ variant = 'section' }: Props) {
  const cards = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
      {audiences.map((a, i) => (
        <article
          key={a.title}
          className="card card-lift p-6 hover:border-white/[0.14]"
          data-reveal
          data-reveal-delay={i * 70}
        >
          <div className={`${a.tileClass} mb-4`} aria-hidden="true">
            {a.icon}
          </div>
          <h3 className="t-h5 text-text-base mb-2">{a.title}</h3>
          <p className="text-muted font-medium text-body-sm">{a.body}</p>
        </article>
      ))}
    </div>
  )

  if (variant === 'embedded') return cards

  return (
    <section
      id="who-we-help"
      className="section bg-elevated border-t-hairline"
    >
      <div className="container-page text-center">
        <p className="eyebrow text-primary mb-3">Who we help</p>
        <h2 className="t-h2">
          Built for the businesses that move product.
        </h2>
        <p className="mt-4 text-muted font-medium text-body-lg max-w-xl mx-auto leading-relaxed">
          We work with $5–50M product businesses that run on ERPs, spreadsheets, and hard-won operational
          instinct, and are ready to add real numbers to that instinct.
        </p>
        <div className="mt-8">{cards}</div>
      </div>
    </section>
  )
}
