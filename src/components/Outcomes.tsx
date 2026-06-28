const outcomes = [
  {
    title: 'Clearer margins',
    body: 'You finally see which products, lines, and customers actually make money.',
  },
  {
    title: 'Less dead inventory',
    body: 'Slow movers and excess get flagged early — before they tie up your cash.',
  },
  {
    title: 'Reports that run themselves',
    body: 'Weekly numbers land automatically. No more late nights rebuilding spreadsheets.',
  },
  {
    title: 'Smarter purchasing',
    body: 'Buy on forecasts and reorder points instead of gut feel and guesswork.',
  },
]

function CheckTile() {
  return (
    <div className="check-tile">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5l3.5 3.5L13 5" stroke="#27e0a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function Outcomes() {
  return (
    <section id="outcomes" className="py-16 lg:py-20 bg-bg">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <p className="eyebrow text-secondary mb-3">The outcome</p>
        <h2 className="font-heading font-bold text-[36px] md:text-[48px] tracking-[-0.02em]">
          What our clients walk away with.
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {outcomes.map((o) => (
            <article key={o.title} className="card p-6 hover:border-white/[0.14] transition-colors">
              <CheckTile />
              <h3 className="font-heading font-semibold text-[19px] text-text-base mt-4 mb-2">{o.title}</h3>
              <p className="text-muted font-medium text-[16px] leading-relaxed">{o.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
