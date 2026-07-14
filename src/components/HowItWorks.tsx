import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

const vars = (o: Record<string, string | number>) => o as CSSProperties

/* Step 1 — the call: your problem, spoken, captured as signal. */
function MiniListen() {
  const bars = Array.from({ length: 18 }, (_, i) => 22 + Math.abs(Math.sin(i * 0.85)) * 74)
  return (
    <div className="flex items-center gap-[3px] h-[54px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className="wave-bar flex-1 rounded-full"
          style={vars({
            height: `${h}%`,
            background: i % 5 === 0 ? '#2f8fff' : 'rgba(47,143,255,0.3)',
            '--d': `${(i % 6) * 120}ms`,
          })}
        />
      ))}
    </div>
  )
}

/* Step 2 — the assessment: the same problem, priced and ranked. */
function MiniRank() {
  const rows = [
    { v: '$210K', pct: 100, top: true, d: 120 },
    { v: '$182K', pct: 78, d: 260 },
    { v: '$61K', pct: 34, d: 400 },
  ]
  return (
    <div className="space-y-[9px] h-[54px] flex flex-col justify-center">
      {rows.map((r) => (
        <div key={r.v} className="flex items-center gap-2">
          <div className="flex-1 h-[8px] relative">
            <div
              className="grow-x absolute inset-y-0 left-0"
              style={vars({
                '--d': `${r.d}ms`,
                width: `${r.pct}%`,
                borderRadius: '0 4px 4px 0',
                background: r.top
                  ? 'linear-gradient(90deg, rgba(15,169,111,0.45), #3ff0c0)'
                  : 'linear-gradient(90deg, rgba(47,143,255,0.35), rgba(47,143,255,0.9))',
              })}
            />
          </div>
          <span
            className="font-mono text-[9px] font-bold w-[38px] text-right flex-shrink-0"
            style={{ color: r.top ? '#3ff0c0' : '#a8b8cc' }}
          >
            {r.v}
          </span>
        </div>
      ))}
    </div>
  )
}

/* Step 3 — the partnership: it runs, and keeps climbing. */
function MiniRun() {
  const w = 150
  const h = 54
  const pts = [30, 36, 33, 44, 42, 52, 58, 68]
  const X = (i: number) => 4 + (i / (pts.length - 1)) * (w - 8)
  const Y = (v: number) => h - 6 - ((v - 25) / 48) * (h - 14)
  const d = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ')
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height: 54, display: 'block' }} aria-hidden="true">
      <path d={`${d} L ${w - 4} ${h - 6} L 4 ${h - 6} Z`} fill="#27e0a0" opacity="0.1" />
      <path
        className="draw-line"
        d={d}
        fill="none"
        stroke="#3ff0c0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={vars({ '--len': 190 })}
      />
      <circle className="fc-ping" cx={X(pts.length - 1)} cy={Y(pts[pts.length - 1])} r="6" fill="none" stroke="#3ff0c0" strokeWidth="1" />
      <circle cx={X(pts.length - 1)} cy={Y(pts[pts.length - 1])} r="3.2" fill="#3ff0c0" />
    </svg>
  )
}

const steps = [
  {
    num: '1',
    title: 'Discovery Call',
    line: 'You talk. We listen for the leak.',
    meta: 'FREE · 30 MIN',
    media: <MiniListen />,
  },
  {
    num: '2',
    title: 'Assessment',
    line: 'Your data, ranked by what it pays.',
    meta: 'FIXED FEE · 1–2 WKS',
    media: <MiniRank />,
  },
  {
    num: '3',
    title: 'Partnership',
    line: 'We build it, and keep it earning.',
    meta: 'MONTH-TO-MONTH',
    media: <MiniRun />,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-sm bg-elevated border-b-hairline">
      <div className="container-page text-center">
        <p className="eyebrow text-primary mb-3">How it works</p>
        <h2 className="t-h2">Three steps. No jargon.</h2>

        <div className="relative mt-10">
          {/* The wire runs between the three station centres, and data runs down it. */}
          <div className="hidden md:block absolute left-[16.6%] right-[16.6%] top-[9px] h-[2px] rounded wire-flow" aria-hidden="true" />
          <div className="hidden md:block absolute left-[16.6%] right-[16.6%] top-[5px]" aria-hidden="true">
            <span className="journey-packet absolute block w-[9px] h-[9px] rounded-full -ml-[4px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="flex flex-col items-center" data-reveal data-reveal-delay={i * 90}>
                <span
                  className="relative z-10 w-[20px] h-[20px] rounded-full mb-5 flex-shrink-0"
                  style={{
                    background: 'linear-gradient(180deg, #3ff0c0, #2f8fff)',
                    border: '3px solid #0c1a30',
                    boxShadow: '0 0 0 1px rgba(47,143,255,0.5), 0 0 16px rgba(47,143,255,0.45)',
                  }}
                  aria-hidden="true"
                />
                <div className="feature-media rounded-lg p-4 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[8px] tracking-[0.12em] text-faint">STEP {s.num}</span>
                    <span className="font-mono text-[8px] tracking-[0.12em] text-faint">{s.meta}</span>
                  </div>
                  {s.media}
                </div>
                <h3 className="t-h5 text-text-base mt-5 mb-2">{s.title}</h3>
                <p className="text-muted font-medium text-body max-w-[240px]">{s.line}</p>
              </div>
            ))}
          </div>
        </div>

        <Link to="/process" className="inline-flex mt-10 text-primary font-bold text-[15px] hover:underline">
          Watch the full engagement, phase by phase →
        </Link>
      </div>
    </section>
  )
}
