import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import useSectionView from '../hooks/useSectionView'
import SectionHeader from './SectionHeader'

/* Custom-property style objects (--mx/--my) aren't in the CSSProperties type. */
const vars = (o: Record<string, string | number>) => o as CSSProperties

/* ------------------------------------------------------------------ */
/* Icons — thin, single-weight line marks (no filled tiles).           */
/* ------------------------------------------------------------------ */
const ic = { fill: 'none', strokeWidth: 1.3, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

function IconGrid({ c }: { c: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" stroke={c} {...ic}>
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}
function IconTrend({ c }: { c: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" stroke={c} {...ic}>
      <path d="M3 17l6-6 4 4 8-9" /><path d="M17 6h4v4" />
    </svg>
  )
}
function IconBox({ c }: { c: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" stroke={c} {...ic}>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M12 3v18M4 7.5l8 4.5 8-4.5" />
    </svg>
  )
}
function IconDollar({ c }: { c: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" stroke={c} {...ic}>
      <path d="M12 3v18M16 6.5H9.5a3 3 0 000 6h5a3 3 0 010 6H7" />
    </svg>
  )
}
function IconBolt({ c }: { c: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" stroke={c} {...ic}>
      <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" />
    </svg>
  )
}
function IconOrbit({ c }: { c: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" stroke={c} {...ic}>
      <circle cx="12" cy="12" r="3.2" /><ellipse cx="12" cy="12" rx="10" ry="4.4" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(60 12 12)" />
    </svg>
  )
}

type Service = {
  icon: (p: { c: string }) => ReactNode
  accent: string
  glow: string
  num: string
  title: string
  body: string
  tag: string
  metric?: string
  featured?: boolean
  wide?: boolean
}

const BLUE = '#2f8fff'
const GOLD = '#f5b544'

const services: Service[] = [
  {
    icon: IconGrid, accent: BLUE, glow: 'rgba(47,143,255,0.16)', num: '01',
    title: 'Executive Dashboards',
    body: 'Your Monday meeting shouldn’t open with someone asking which spreadsheet is the current one. One screen, one set of numbers, everyone looking at the same thing.',
    tag: 'Visibility',
  },
  {
    icon: IconTrend, accent: GOLD, glow: 'rgba(245,181,68,0.14)', num: '02',
    title: 'Demand & Sales Forecasting',
    body: 'If every purchase order feels like an educated guess, nothing is telling you what next month looks like.',
    tag: 'Planning',
  },
  {
    icon: IconBox, accent: BLUE, glow: 'rgba(47,143,255,0.16)', num: '03',
    title: 'Inventory Optimization',
    body: 'You already know the fast movers stock out and the dead stuff never leaves. What you can’t see is what that costs you this quarter.',
    tag: 'Working capital',
  },
  {
    icon: IconDollar, accent: GOLD, glow: 'rgba(245,181,68,0.14)', num: '04',
    title: 'Cost Reduction & Profitability',
    body: 'Everyone can name the biggest customer. Almost nobody can name the most profitable one.',
    tag: 'Margin',
  },
  {
    icon: IconBolt, accent: BLUE, glow: 'rgba(47,143,255,0.16)', num: '05',
    title: 'Automation & AI',
    body: 'Somebody on your team loses every Friday to a report they rebuild by hand. It should build itself — and increasingly, it can flag what needs a human before you ask.',
    tag: 'Time back',
  },
  {
    icon: IconOrbit, accent: GOLD, glow: 'rgba(245,181,68,0.14)', num: '06',
    title: 'Ongoing Analytics Partnership',
    body: 'The dashboard answers the questions you had in March. By June you have new ones — rent the analyst instead of hiring one.',
    tag: 'Fractional', metric: '$500–$1.5k / mo · month-to-month', wide: true,
  },
]

/** Tracks the cursor for the .spotlight radial highlight. */
function setSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function Cell({ s }: { s: Service }) {
  const Icon = s.icon
  return (
    <article
      data-reveal
      onMouseMove={setSpotlight}
      style={vars({ '--glow': s.glow })}
      className="svc-cell spotlight group relative bg-surface p-7 lg:p-8 flex flex-col md:col-span-2 min-h-[280px]"
    >
      <div className="flex items-center justify-between">
        <Icon c={s.accent} />
        <span className="font-mono text-[11px] tracking-[0.16em] text-faint">{s.num}</span>
      </div>
      <h3 className="font-display text-text-base tracking-[-0.01em] mt-6 text-[23px]" style={{ fontWeight: 460 }}>
        {s.title}
      </h3>
      <p className="mt-3 text-muted font-medium text-body">{s.body}</p>
      <div className="mt-auto pt-6">
        {s.metric ? (
          <span className="font-mono text-[12px] tracking-[0.04em]" style={{ color: s.accent }}>{s.metric}</span>
        ) : (
          <span className="chip-accent">{s.tag}</span>
        )}
      </div>
    </article>
  )
}

export default function Services() {
  const viewRef = useSectionView<HTMLElement>('home_services')
  return (
    <section id="services" ref={viewRef} className="relative overflow-hidden section bg-bg border-t-hairline">
      <div className="relative container-page">
        <SectionHeader
          index="03"
          eyebrow="What we do"
          accent="gold"
          title={
            <>
              Six things owners ask us{' '}
              <em className="emph">
                for most.
              </em>
            </>
          }
          lede="Analytics, automation, and AI — built on your numbers, in the systems you already pay for. Take one, or hand us the whole thing."
        />

        {/* Gapless architectural bento — hairline seams, no boxes-in-boxes. */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-6 gap-px bg-[var(--line-soft)] border border-[var(--line-soft)] rounded-lg overflow-hidden">
          {services.map((s) => (
            <Cell key={s.num} s={s} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 items-center">
          <Link to="/solutions" className="link-underline">
            See each one solved, with a sample dashboard →
          </Link>
        </div>
      </div>
    </section>
  )
}
