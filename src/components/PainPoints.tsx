import SectionHeader from './SectionHeader'

/* Faint abstract line-chart ghost */
function DataGhost() {
  const points = [60, 120, 80, 170, 100, 200, 140, 240, 110, 280, 160, 300]
  const path = points.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * 28} ${300 - y}`).join(' ')
  return (
    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[55%] overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 320 300"
        preserveAspectRatio="xMaxYMid meet"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-full"
        style={{ opacity: 0.06 }}
      >
        <path d={`${path} L ${11 * 28} 300 L 0 300 Z`} fill="#2f8fff" />
        <path d={path} fill="none" stroke="#2f8fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((y, i) => <circle key={i} cx={i * 28} cy={300 - y} r="4" fill="#f5b544" />)}
        {[60, 120, 180, 240].map((y) => (
          <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#2f8fff" strokeWidth="1" strokeDasharray="6 4" />
        ))}
      </svg>
    </div>
  )
}

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
    body: 'Reports rebuilt by hand every week, with different numbers in every file.',
  },
  {
    num: '04',
    title: 'No demand visibility',
    body: "You're reordering based on what you remember selling, not what the data says you'll need.",
  },
  {
    num: '05',
    title: 'Flying blind on big calls',
    body: "You spent $50K on a new product line last quarter. Can you tell me if it was worth it?",
  },
]

export default function PainPoints() {
  return (
    <section id="pain" className="relative overflow-hidden section-lg bg-bg">
      <DataGhost />
      <div className="relative container-page">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-14 lg:gap-24">
          {/* Left column — the chapter opener, held near the top as the list scrolls. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              index="01"
              eyebrow="Sound familiar?"
              accent="blue"
              title={
                <>
                  You're running a real business on{' '}
                  <em className="emph">
                    gut feel
                  </em>{' '}
                  and spreadsheets.
                </>
              }
              lede="The numbers to run it already exist — they're just scattered across systems that don't talk. So every real decision waits on a report nobody has time to rebuild."
            />
          </div>

          {/* Right column — the leaks, as an editorial ledger. Hairlines, not boxes. */}
          <ol className="border-t border-[var(--line)]">
            {pains.map((p, i) => (
              <li
                key={p.num}
                className="edge-row group grid grid-cols-[3.25rem_1fr] sm:grid-cols-[5rem_1fr] items-baseline gap-4 sm:gap-6 py-6 sm:py-7"
                data-reveal
                data-reveal-delay={i * 70}
              >
                <span className="edge-index text-[2.75rem] sm:text-[3.25rem] tracking-[-0.02em]" aria-hidden="true">
                  {p.num}
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-[1.2rem] leading-snug text-text-base tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-muted font-medium text-body">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
