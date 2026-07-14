import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import { CHART, DashFrame, Panel } from './dashboards/kit'

/* Custom-property style objects (--d, --len, …) aren't in the CSSProperties type. */
const vars = (o: Record<string, string | number>) => o as CSSProperties

/** How long a phase holds the screen before the journey advances on its own. */
const DWELL = 5600

/* ------------------------------------------------------------------ */
/* Stage 1 — Discovery Call: a signal arrives. We listen.              */
/* ------------------------------------------------------------------ */
function StageDiscovery() {
  // A waveform that reads as speech: uneven, not a tidy sine.
  const bars = Array.from({ length: 32 }, (_, i) => {
    const a = Math.abs(Math.sin(i * 0.9)) * 0.55 + Math.abs(Math.sin(i * 0.31)) * 0.45
    return 18 + a * 78
  })
  const heard = [
    { t: 'margin slipping on big accounts', d: 300 },
    { t: 'stockouts on the fast movers', d: 700 },
    { t: 'three days to close the report', d: 1100 },
  ]
  return (
    <div className="grid md:grid-cols-[1.1fr_1fr] gap-3 h-full">
      <Panel
        className="h-full flex flex-col"
        title="Discovery call"
        right={
          <span className="flex items-center gap-[5px] font-mono text-[8px]" style={{ color: '#e0504f' }}>
            <span className="pulse-dot w-[6px] h-[6px] rounded-full" style={{ background: '#e0504f', color: '#e0504f' }} />
            live · 12:04
          </span>
        }
      >
        <div className="flex-1 flex items-center gap-[3px] min-h-[110px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="wave-bar flex-1 rounded-full"
              style={vars({
                height: `${h}%`,
                background: i % 6 === 0 ? CHART.blue : 'rgba(47,143,255,0.32)',
                '--d': `${(i % 8) * 110}ms`,
              })}
            />
          ))}
        </div>
        <p className="mt-2 font-mono text-[9px] text-faint">you talk · we listen · no pitch</p>
      </Panel>

      <Panel className="h-full flex flex-col" title="What we heard">
        <ul className="flex-1 flex flex-col justify-center gap-[14px]">
          {heard.map((h) => (
            <li key={h.t} className="stage-in flex items-center gap-2" style={vars({ '--d': `${h.d}ms` })}>
              <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: CHART.amber }} />
              <span className="font-mono text-[10px] text-muted leading-tight">{h.t}</span>
            </li>
          ))}
        </ul>
        <div
          className="stage-in mt-3 pt-3"
          style={vars({ '--d': '1600ms', borderTop: '1px solid var(--line-soft)' })}
        >
          <span className="font-mono text-[9px]" style={{ color: CHART.green }}>
            ✓ analytics can move two of these
          </span>
        </div>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stage 2 — Assessment: the data is read, then ranked by payoff.      */
/* ------------------------------------------------------------------ */
function StageAssess() {
  const sources = [
    { l: 'ERP · sales + purchasing', n: '1.2M rows', d: 200 },
    { l: 'Spreadsheets', n: '38 files', d: 550 },
    { l: 'Warehouse system', n: '9 months', d: 900 },
  ]
  const ranked = [
    { l: 'Stockouts on A-items', v: '$210K', pct: 100, top: true, d: 1300 },
    { l: 'Excess & slow movers', v: '$182K', pct: 84, d: 1450 },
    { l: 'Vendor price variance', v: '$61K', pct: 38, d: 1600 },
    { l: 'Quote-to-order leakage', v: '$34K', pct: 22, d: 1750 },
  ]
  return (
    <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-3 h-full">
      <Panel className="h-full flex flex-col" title="Reading your actual data">
        <ul className="flex-1 flex flex-col justify-center gap-[15px]">
          {sources.map((s) => (
            <li key={s.l}>
              <div className="flex items-baseline justify-between gap-2 mb-[5px]">
                <span className="font-mono text-[9px] text-muted truncate">{s.l}</span>
                <span className="font-mono text-[8px] text-faint flex-shrink-0">{s.n}</span>
              </div>
              <div className="h-[5px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="grow-x h-full rounded-full"
                  style={vars({
                    '--d': `${s.d}ms`,
                    background: `linear-gradient(90deg, rgba(47,143,255,0.35), ${CHART.blue})`,
                  })}
                />
              </div>
            </li>
          ))}
        </ul>
        <p className="stage-in mt-4 font-mono text-[9px] text-faint" style={vars({ '--d': '1200ms' })}>
          data quality scored · gaps flagged
        </p>
      </Panel>

      <Panel
        className="h-full flex flex-col"
        title="Opportunities · ranked by payoff"
        right={<span className="font-mono text-[8px] text-faint">est. annual</span>}
      >
        <div className="flex-1 flex flex-col justify-center gap-[13px]">
          {ranked.map((r) => (
            <div key={r.l}>
              <div className="flex items-baseline justify-between gap-2 mb-[4px]">
                <span className="font-mono text-[9px] text-muted truncate">{r.l}</span>
                <span
                  className="font-mono text-[10px] font-bold flex-shrink-0"
                  style={{ color: r.top ? CHART.green : CHART.textMuted }}
                >
                  {r.v}
                </span>
              </div>
              <div className="h-[9px] relative">
                <div
                  className="grow-x absolute inset-y-0 left-0"
                  style={vars({
                    '--d': `${r.d}ms`,
                    width: `${r.pct}%`,
                    borderRadius: '0 4px 4px 0',
                    background: r.top
                      ? 'linear-gradient(90deg, rgba(15,169,111,0.45), #3ff0c0)'
                      : 'linear-gradient(90deg, rgba(47,143,255,0.35), rgba(47,143,255,0.9))',
                    boxShadow: r.top ? '0 0 14px rgba(63,240,192,0.35)' : 'none',
                  })}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="stage-in mt-3 font-mono text-[9px]" style={vars({ '--d': '2000ms', color: CHART.green })}>
          ▲ biggest win first · yours to act on, with us or without us
        </p>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stage 3 — Build & Validate: the screen assembles itself.            */
/* ------------------------------------------------------------------ */
function StageBuild() {
  const kpis = [
    { l: 'MARGIN', v: '24.8%', delta: '+2.1', d: 150 },
    { l: 'TURNS', v: '6.4', delta: '+1.2', d: 280 },
    { l: 'FILL RATE', v: '96%', delta: '+4', d: 410 },
  ]
  const pts = [30, 34, 32, 41, 39, 48, 46, 56, 62]
  const w = 300
  const h = 74
  const pad = 12 // keeps the live end-dot and its ping clear of the panel edge
  const lo = 25
  const hi = 68
  const X = (i: number) => pad + (i / (pts.length - 1)) * (w - pad * 2)
  const Y = (v: number) => h - pad - ((v - lo) / (hi - lo)) * (h - pad * 2)
  const line = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ')
  const checks = [
    { t: 'metric definitions reviewed with your team', d: 1500 },
    { t: 'tied out to the numbers you already trust', d: 1900 },
  ]
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="grid grid-cols-3 gap-3">
        {kpis.map((k) => (
          <div key={k.l} className="stage-in dash-tile rounded-[10px] px-3 py-[10px]" style={vars({ '--d': `${k.d}ms` })}>
            <span className="font-mono text-[8px] tracking-[0.12em] text-faint">{k.l}</span>
            <div className="flex items-end gap-[6px] mt-1">
              <span className="font-heading font-bold text-[18px] leading-none text-text-base">{k.v}</span>
              <span className="font-mono text-[10px] font-bold mb-[1px]" style={{ color: CHART.green }}>
                {k.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Panel
        className="flex-1 flex flex-col"
        title="Built live on your numbers"
        right={<span className="font-mono text-[8px] text-faint">v0.4 · in review</span>}
      >
        <svg
          width="100%"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          className="flex-1"
          style={{ minHeight: 84, display: 'block' }}
          aria-hidden="true"
        >
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={pad} y1={pad + f * (h - pad * 2)} x2={w - pad} y2={pad + f * (h - pad * 2)} stroke={CHART.grid} />
          ))}
          <path
            className="area-in"
            d={`${line} L ${w - pad} ${h - pad} L ${pad} ${h - pad} Z`}
            fill={CHART.blue}
            opacity="0.12"
            style={vars({ '--d': '900ms' })}
          />
          <path
            className="draw-line"
            d={line}
            fill="none"
            stroke={CHART.blue}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={vars({ '--len': 360 })}
          />
          <circle className="fc-ping" cx={X(pts.length - 1)} cy={Y(pts[pts.length - 1])} r="6" fill="none" stroke="#3ff0c0" strokeWidth="1" />
          <circle cx={X(pts.length - 1)} cy={Y(pts[pts.length - 1])} r="3.4" fill="#3ff0c0" />
        </svg>
      </Panel>

      <div className="space-y-[7px]">
        {checks.map((c) => (
          <p key={c.t} className="stage-in flex items-center gap-2 font-mono text-[9px] text-muted" style={vars({ '--d': `${c.d}ms` })}>
            <span style={{ color: CHART.green }}>✓</span>
            {c.t}
          </p>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stage 4 — Implementation: the output lands in the week you run.     */
/* ------------------------------------------------------------------ */
function StageImplement() {
  const dests = [
    { y: 18, t: 'MONDAY MEETING', d: 700 },
    { y: 56, t: 'PURCHASING CYCLE', d: 1000 },
    { y: 94, t: 'INBOX · 7:00 AM', d: 1300 },
  ]
  return (
    <div className="flex flex-col gap-3 h-full">
      <Panel
        className="flex-1 flex flex-col"
        title="Where it lands"
        right={<span className="font-mono text-[8px] text-faint">runs without us</span>}
      >
        <svg width="100%" viewBox="0 0 300 112" className="flex-1" style={{ minHeight: 132, display: 'block' }} aria-hidden="true">
          {dests.map((dst) => (
            <path
              key={dst.t}
              className="flow-dash"
              d={`M 92 56 C 128 56, 140 ${dst.y}, 172 ${dst.y}`}
              fill="none"
              stroke="#3ff0c0"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              opacity="0.75"
            />
          ))}
          <rect x="14" y="36" width="78" height="40" rx="8" fill="rgba(47,143,255,0.12)" stroke="rgba(47,143,255,0.4)" />
          <rect x="24" y="48" width="24" height="16" rx="2" fill="rgba(47,143,255,0.55)" />
          <rect x="52" y="56" width="30" height="8" rx="2" fill="rgba(47,143,255,0.3)" />
          <rect x="52" y="48" width="30" height="5" rx="2" fill="rgba(47,143,255,0.3)" />
          <text x="53" y="30" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={CHART.textFaint}>
            YOUR DASHBOARD
          </text>
          {dests.map((dst) => (
            <g key={dst.t} className="tick-in" style={vars({ '--d': `${dst.d}ms` })}>
              <rect x="172" y={dst.y - 11} width="116" height="22" rx="6" fill="rgba(39,224,160,0.10)" stroke="rgba(39,224,160,0.32)" />
              <circle cx="185" cy={dst.y} r="5" fill="rgba(39,224,160,0.9)" />
              <path
                d={`M 182.6 ${dst.y} l 1.8 1.9 l 3.6 -3.9`}
                fill="none"
                stroke="#06281c"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="196" y={dst.y + 3} fontFamily="monospace" fontSize="7.5" fill={CHART.textMuted}>
                {dst.t}
              </text>
            </g>
          ))}
        </svg>
      </Panel>

      <div className="grid grid-cols-2 gap-3">
        {[
          { t: 'team trained', s: 'in plain English', d: 1600 },
          { t: 'documented', s: 'every definition, written down', d: 1800 },
        ].map((c) => (
          <div key={c.t} className="stage-in dash-tile rounded-[10px] px-3 py-[10px]" style={vars({ '--d': `${c.d}ms` })}>
            <p className="font-mono text-[9px] font-bold" style={{ color: CHART.green }}>
              ✓ {c.t}
            </p>
            <p className="font-mono text-[8px] text-faint mt-[3px]">{c.s}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stage 5 — Ongoing: it keeps running, and keeps earning.             */
/* ------------------------------------------------------------------ */
function StageOngoing() {
  const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6']
  const queue = [
    { t: 'Which customers are quietly shrinking?', d: 900 },
    { t: 'Re-tune safety stock for the new plant', d: 1150 },
    { t: 'Why did April margin dip?', d: 1400 },
  ]
  return (
    <div className="flex flex-col gap-3 h-full">
      <Panel
        title="Monthly cadence"
        right={
          <span className="flex items-center gap-[5px] font-mono text-[8px]" style={{ color: '#3ff0c0' }}>
            <span className="pulse-dot w-[6px] h-[6px] rounded-full" style={{ background: '#3ff0c0', color: '#3ff0c0' }} />
            active
          </span>
        }
      >
        <div className="relative pt-2 pb-1">
          <div className="absolute left-0 right-0 top-[13px] h-[2px] rounded wire-flow" />
          <div className="absolute top-[9px] left-0 right-0 timeline-pulse">
            <span className="block w-[10px] h-[10px] rounded-full" style={{ background: '#3ff0c0', boxShadow: '0 0 10px #3ff0c0' }} />
          </div>
          <div className="relative flex justify-between">
            {months.map((m, i) => (
              <div key={m} className="flex flex-col items-center gap-[7px]">
                <span
                  className="w-[12px] h-[12px] rounded-full"
                  style={{
                    background: i === 3 ? '#3ff0c0' : 'rgba(255,255,255,0.10)',
                    border: '2px solid',
                    borderColor: i === 3 ? '#3ff0c0' : 'rgba(255,255,255,0.22)',
                    boxShadow: i === 3 ? '0 0 12px rgba(63,240,192,0.6)' : 'none',
                  }}
                />
                <span className="font-mono text-[8px] text-faint">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <div className="flex-1 grid md:grid-cols-[1fr_0.85fr] gap-3">
        <Panel className="h-full flex flex-col" title="Question queue">
          <ul className="flex-1 flex flex-col justify-center gap-[11px]">
            {queue.map((q) => (
              <li key={q.t} className="stage-in flex items-center gap-2" style={vars({ '--d': `${q.d}ms` })}>
                <span className="font-mono text-[9px] flex-shrink-0" style={{ color: CHART.blue }}>
                  ▸
                </span>
                <span className="font-mono text-[9px] text-muted leading-tight">{q.t}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel className="h-full flex flex-col" title="Since launch">
          <div className="flex-1 flex items-end gap-[3px] min-h-[54px]">
            {[38, 44, 41, 52, 58, 55, 66, 74].map((b, i, a) => (
              <span
                key={i}
                className="bar-grow flex-1"
                style={{
                  height: `${b}%`,
                  borderRadius: '3px 3px 0 0',
                  background: i === a.length - 1 ? 'linear-gradient(180deg, #3ff0c0, #2f8fff)' : 'rgba(47,143,255,0.4)',
                  animationDelay: `${i * 70}ms`,
                }}
              />
            ))}
          </div>
          <p className="stage-in mt-2 font-mono text-[9px]" style={vars({ '--d': '900ms', color: CHART.green })}>
            ▲ compounding, month over month
          </p>
        </Panel>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Phases                                                              */
/* ------------------------------------------------------------------ */
interface Phase {
  num: string
  short: string
  title: string
  duration: string
  file: string
  caption: string
  outcome: string
  detail: string[]
  stage: ReactNode
}

const phases: Phase[] = [
  {
    num: '01',
    short: 'Discovery',
    title: 'Discovery Call',
    duration: 'Free · 30 minutes',
    file: 'discovery-call.live',
    caption: 'You describe where it hurts. We listen, then tell you honestly whether analytics can move it.',
    outcome: 'A straight answer on fit. No obligation either way.',
    detail: [
      'You describe where it hurts: margins, inventory, reporting, forecasting.',
      'We ask about your systems, your data, and how decisions get made today.',
      'We tell you honestly whether analytics can move your problem, and roughly what it would take. If we’re not the right fit, we’ll say so.',
    ],
    stage: <StageDiscovery />,
  },
  {
    num: '02',
    short: 'Assessment',
    title: 'Data & Opportunity Assessment',
    duration: 'Fixed fee · 1–2 weeks',
    file: 'opportunity-report.pdf',
    caption: 'We read your actual data and rank the opportunities, biggest win first.',
    outcome: 'A written, ranked report. Yours to act on, with us or without us.',
    detail: [
      'We take a structured look at your actual data: sales history, inventory, purchasing, margins.',
      'We test data quality and identify what your systems can support today vs. what needs cleanup.',
      'We rank the opportunities by expected impact and effort, biggest wins first.',
    ],
    stage: <StageAssess />,
  },
  {
    num: '03',
    short: 'Build',
    title: 'Build & Validate',
    duration: 'Fixed scope · 2–6 weeks',
    file: 'margin-dashboard.pbix',
    caption: 'We build the agreed scope on your live data, and validate every number with your team.',
    outcome: 'Working analytics, tied out to numbers your team already believes.',
    detail: [
      'We build the agreed scope, whether dashboards, forecasts, or stocking rules, connected live to your systems.',
      'Every metric definition is reviewed with your team so the numbers are trusted before they’re used.',
      'You see working versions early and often; course corrections happen mid-build, not after delivery.',
    ],
    stage: <StageBuild />,
  },
  {
    num: '04',
    short: 'Rollout',
    title: 'Implementation & Training',
    duration: 'Included in every build',
    file: 'monday-meeting.routine',
    caption: 'The output wires into the routines you already run, and your team is trained to run it.',
    outcome: 'Tools your team actually uses. You own everything we build.',
    detail: [
      'We wire the outputs into your routines: the Monday meeting, the purchasing cycle, the account review.',
      'Your team is trained on using and questioning the tools, in plain English.',
      'Documentation covers how everything works and how definitions are calculated.',
    ],
    stage: <StageImplement />,
  },
  {
    num: '05',
    short: 'Ongoing',
    title: 'Ongoing Optimization',
    duration: 'Optional · month-to-month',
    file: 'analytics-partner.live',
    caption: 'We keep it tuned as the business changes, and work your question queue every month.',
    outcome: 'A fractional analytics team. Cancelable any month.',
    detail: [
      'Dashboards and models are maintained, tuned, and extended as the business changes.',
      'A monthly working session digs into the numbers with your leadership team.',
      'New questions get answered from the priority queue, like having an analyst on staff.',
    ],
    stage: <StageOngoing />,
  },
]

/* ------------------------------------------------------------------ */
/* The journey                                                         */
/* ------------------------------------------------------------------ */
export default function ProcessJourney() {
  const [active, setActive] = useState(0)
  // The journey advances on its own until the visitor takes the wheel (a click
  // or an arrow key). Hovering or focusing only *holds* it, so reading a panel
  // never pulls the screen out from under you, and leaving resumes the story.
  const [auto, setAuto] = useState(true)
  const [held, setHeld] = useState(false)
  const [inView, setInView] = useState(false)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Only run the journey while it is actually being watched.
  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // The dwell has to *resume*, not restart. The progress bar under the active
  // station is a CSS animation that genuinely freezes in place when held, so a
  // timer that started over on unpause would let the bar sit at 100% for a full
  // extra dwell — promising a move that wasn't coming. We carry the remaining
  // time across pauses, and reset it only when the phase itself changes.
  const dwell = useRef({ phase: 0, remaining: DWELL })

  useEffect(() => {
    if (dwell.current.phase !== active) dwell.current = { phase: active, remaining: DWELL }
    if (!auto || held || !inView || reduced) return

    const startedAt = Date.now()
    const t = window.setTimeout(() => setActive((i) => (i + 1) % phases.length), dwell.current.remaining)
    return () => {
      window.clearTimeout(t)
      dwell.current.remaining = Math.max(0, dwell.current.remaining - (Date.now() - startedAt))
    }
  }, [auto, held, inView, reduced, active])

  const go = (i: number) => {
    setAuto(false)
    setActive(i)
    setOpen(false)
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = phases.length - 1
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? Math.min(active + 1, last)
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? Math.max(active - 1, 0)
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : -1
    if (next < 0) return
    e.preventDefault()
    go(next)
    tabsRef.current[next]?.focus()
  }

  const ph = phases[active]

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      {/* The rail: five stations on a live wire, with data running the length of it */}
      <div className="relative px-2 sm:px-6">
        <div className="absolute left-[12%] right-[12%] top-[23px] h-[2px] rounded wire-flow" aria-hidden="true" />
        <div className="absolute left-[12%] right-[12%] top-[19px]" aria-hidden="true">
          <span className="journey-packet absolute block w-[9px] h-[9px] rounded-full -ml-[4px]" />
        </div>

        <div
          role="tablist"
          aria-label="Engagement phases"
          onKeyDown={onKey}
          className="relative grid grid-cols-5 gap-1"
        >
          {phases.map((p, i) => {
            const isActive = i === active
            const isDone = i < active
            return (
              <button
                key={p.num}
                ref={(el) => {
                  tabsRef.current[i] = el
                }}
                role="tab"
                id={`phase-tab-${p.num}`}
                aria-selected={isActive}
                aria-controls="phase-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => go(i)}
                className="group flex flex-col items-center gap-2 pt-1 pb-2 rounded-md"
              >
                <span
                  className={`journey-node ${isActive ? 'is-active' : isDone ? 'is-done' : ''}`}
                  aria-hidden="true"
                >
                  {p.num}
                </span>
                <span
                  className={`font-mono text-[9px] sm:text-[10px] tracking-[0.08em] uppercase transition-colors duration-fast ${
                    isActive ? 'text-text-base' : 'text-faint group-hover:text-muted'
                  }`}
                >
                  {p.short}
                </span>
                {/* Dwell timer: the journey shows you how long it's holding this station. */}
                <span className="block h-[2px] w-[26px] rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
                  {isActive && auto && !reduced && (
                    <span
                      key={active}
                      className="journey-dwell block h-full rounded-full"
                      // Freezes wherever the advance timer freezes — on hover or
                      // focus, and when the section scrolls out of view — so the
                      // bar never promises a move that isn't coming.
                      style={vars({
                        '--dwell': `${DWELL}ms`,
                        animationPlayState: held || !inView ? 'paused' : 'running',
                      })}
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* The screen: one surface, transformed by the phase currently running through it */}
      <div
        role="tabpanel"
        id="phase-panel"
        aria-labelledby={`phase-tab-${ph.num}`}
        tabIndex={0}
        className="mt-7 focus-visible:outline-none"
      >
        <div className="grid lg:grid-cols-[1fr_1.35fr] gap-6 lg:gap-8 items-start lg:items-center">
          {/* Left: the words. Deliberately few. */}
          <div key={`copy-${active}`} className="stage-in lg:pt-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 className="font-heading font-bold text-[26px] tracking-[-0.02em] text-text-base">{ph.title}</h2>
              <span className="chip-accent">{ph.duration}</span>
            </div>
            <p className="mt-3 text-muted font-medium text-body-sm leading-relaxed">{ph.caption}</p>

            <div className="note-accent px-4 py-3 mt-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-secondary block mb-1">
                You walk away with
              </span>
              <p className="text-[14px] font-medium leading-relaxed text-muted">{ph.outcome}</p>
            </div>

            {/* The long-form detail is still here — it just isn't shouting. */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-faint hover:text-muted transition-colors duration-fast"
            >
              <span className={`inline-block transition-transform duration-fast ${open ? 'rotate-90' : ''}`}>▸</span>
              What happens in this phase
            </button>
            <div className={`expandable ${open ? 'open' : ''}`}>
              <div>
                <ul className="space-y-2 pt-3">
                  {ph.detail.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-[14px] text-muted font-medium leading-snug">
                      <span className="text-primary font-bold mt-[1px] flex-shrink-0">·</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: the product surface. Remounting on phase change replays the story. */}
          <div key={`stage-${active}`} className="stage-screen">
            <DashFrame filename={ph.file}>
              {/* One fixed-height screen for every phase, so switching phases
                  transforms the surface instead of resizing the page. The single
                  implicit grid row stretches, which is what the stages fill. */}
              <div className="grid min-h-[300px]">{ph.stage}</div>
            </DashFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
