const pains = [
  {
    num: '01',
    title: 'No visibility into margins',
    body: "You can't see which product lines and customers actually make you money.",
  },
  {
    num: '02',
    title: 'Cash stuck in inventory',
    body: 'Excess and slow-moving stock ties up working capital you never get back.',
  },
  {
    num: '03',
    title: 'Spreadsheets everywhere',
    body: 'Reports rebuilt by hand every week — and different numbers in every file.',
  },
  {
    num: '04',
    title: 'No forecasting',
    body: 'Buying on gut feel means stockouts on your movers and overstock on the rest.',
  },
  {
    num: '05',
    title: 'Decisions on instinct',
    body: 'Big calls made without data — and no way to check if they actually worked.',
  },
]

export default function PainPoints() {
  return (
    <section id="pain" className="py-20 lg:py-28 bg-bg">
      <div className="max-w-6xl mx-auto px-5">
        <p className="eyebrow text-primary mb-4">Sound familiar?</p>
        <h2 className="font-heading font-bold text-[32px] md:text-[42px] leading-tight tracking-[-0.02em] max-w-[600px]">
          You're running a real business on gut feel and spreadsheets.
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {pains.map((p) => (
            <article key={p.num} className="card p-7 hover:border-white/[0.14] transition-colors">
              <p className="font-mono text-[11px] font-bold text-primary mb-3 tracking-[0.1em]">{p.num}</p>
              <h3 className="font-heading font-bold text-[16px] text-text-base mb-2">{p.title}</h3>
              <p className="text-muted text-[14px] leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
