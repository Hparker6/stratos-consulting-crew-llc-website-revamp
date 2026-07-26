import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'

/**
 * The one light section on the site (warm off-white, dark navy text).
 *
 * Its colours used to be four module-level constants (DARK, BODY, BORDER,
 * LINK_BLUE) applied through eight inline style objects — a fourth parallel
 * colour system on top of the three that already existed. They are tokens now:
 * bg-light / text-light-ink / text-light-body / text-light-link, all declared
 * once in tailwind.config.js.
 */
export default function About() {
  return (
    <section id="about" className="section section-light">
      <div className="container-page">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
          {/* Headshot — 24px left padding keeps it off the edge */}
          <div className="flex-shrink-0 lg:w-[380px] lg:pl-6">
            <picture>
              <source srcSet="/houston-parker-800.webp" type="image/webp" />
              <img
                src="/houston-parker-800.jpg"
                alt="Houston Parker, founder of Stratos Consulting Crew LLC, in a professional headshot"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl object-cover object-top aspect-[4/5] border border-[var(--line-light)] shadow-light-lift"
              />
            </picture>
          </div>

          {/* Bio */}
          <div className="flex-1">
            <SectionHeader
              index="05"
              eyebrow="Who you'll work with"
              tone="light"
              title={
                <>
                  A data scientist who{' '}
                  <em className="font-display italic" style={{ fontWeight: 500 }}>
                    speaks distributor.
                  </em>
                </>
              }
            />

            <p className="mt-5 font-medium text-body-lg text-light-body">
              I'm Houston Parker. I've spent years inside supply-chain data, building the dashboards,
              forecasts, and inventory models that tell a distributor what it's actually making, and on what.
            </p>
            <p className="mt-4 font-medium text-body-lg text-light-body">
              I started Stratos because a $10M distributor asks the same questions a $10B one does, and
              nobody was answering them at a price that made sense.
            </p>
            <p className="mt-4 text-body-lg text-light-ink font-semibold">
              You work with me directly — not a junior who inherited your account, not a rotating
              offshore team. The person on the discovery call is the person who builds it.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {['BS, Data Science', 'Power BI · SQL · Python', 'Remote-Friendly'].map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-label-xs uppercase tracking-[0.1em] font-medium px-3 py-[6px] rounded-full bg-[var(--fill-light)] border border-[rgba(10,22,40,0.15)] text-light-ink"
                >
                  {chip}
                </span>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex mt-6 font-bold text-body-sm text-light-link hover:underline"
            >
              More about how we work →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
