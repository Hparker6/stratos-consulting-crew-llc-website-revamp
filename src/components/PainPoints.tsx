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
        {points.map((y, i) => <circle key={i} cx={i * 28} cy={300 - y} r="4" fill="#27e0a0" />)}
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

function PainCard({ p, delay }: { p: typeof pains[0]; delay: number }) {
  return (
    <article
      className="card card-lift p-6 hover:border-white/[0.14]"
      data-reveal
      data-reveal-delay={delay}
    >
      <p className="font-mono text-[13px] font-bold text-primary mb-3 tracking-[0.1em]">{p.num}</p>
      <h3 className="font-heading font-semibold text-[19px] text-text-base mb-2">{p.title}</h3>
      <p className="text-muted font-medium text-[16px] leading-relaxed">{p.body}</p>
    </article>
  )
}

export default function PainPoints() {
  return (
    <section id="pain" className="relative overflow-hidden py-16 lg:py-20 bg-bg">
      <DataGhost />
      <div className="relative max-w-6xl mx-auto px-5">
        <p className="eyebrow text-primary mb-3">Sound familiar?</p>
        <h2 className="font-heading font-bold text-[36px] md:text-[48px] leading-tight tracking-[-0.02em] max-w-[620px]">
          You're running a real business on gut feel and spreadsheets.
        </h2>

        <div className="mt-10">
          {/* Top row: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pains.slice(0, 3).map((p, i) => <PainCard key={p.num} p={p} delay={i * 70} />)}
          </div>
          {/* Bottom row: 2 cards at ~45% each — no centering constraint */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:max-w-[90%] mx-auto">
            {pains.slice(3).map((p, i) => <PainCard key={p.num} p={p} delay={i * 70} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
