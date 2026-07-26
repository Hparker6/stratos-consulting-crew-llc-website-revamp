import { Link } from 'react-router-dom'

/**
 * A full-bleed saturated color-block — the one section that isn't near-black.
 * Borrowed from the way Palantir and Ramp drop a bold color field mid-scroll to
 * break monotony and land a single idea. Sits between the dark audience grid and
 * the light About band, so the page reads dark → blue → light.
 */
export default function StatementBand() {
  return (
    <section className="statement-band relative overflow-hidden" aria-label="Our approach">
      <div className="statement-grain" aria-hidden="true" />
      {/* Faint survey rings, echoing the hero signature. */}
      <svg className="pointer-events-none absolute -right-20 -top-24 w-[560px] h-[560px] opacity-60 hidden md:block" viewBox="0 0 560 560" fill="none" aria-hidden="true">
        <g stroke="#8fc0ff" strokeOpacity="0.3" strokeWidth="1">
          <circle cx="280" cy="280" r="90" /><circle cx="280" cy="280" r="150" /><circle cx="280" cy="280" r="214" />
        </g>
        <g stroke="#ffce6b" strokeOpacity="0.35" strokeWidth="1.1">
          <circle cx="280" cy="280" r="270" />
        </g>
        <circle cx="280" cy="280" r="4" fill="#ffce6b" />
      </svg>

      <div className="relative container-page section-lg">
        <div className="max-w-[860px]">
          <p className="eyebrow text-[#ffd98a] mb-6">The Stratos idea</p>
          <p className="font-display text-[clamp(2.25rem,1.4rem+2.9vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white" style={{ fontWeight: 400 }}>
            The answers are already in your data.{' '}
            <em className="italic" style={{ color: '#ffce6b', fontWeight: 460 }}>We build what surfaces them</em>{' '}
            — and the automation that acts on them.
          </p>
          <Link
            to="/process"
            className="inline-flex mt-9 font-bold text-[15px] text-white border-b-2 pb-[3px] hover:opacity-80 transition-opacity"
            style={{ borderColor: '#ffce6b' }}
          >
            See how we work →
          </Link>
        </div>
      </div>
    </section>
  )
}
