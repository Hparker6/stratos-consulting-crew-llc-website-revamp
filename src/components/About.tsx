import { Link } from 'react-router-dom'

/* Light section — background #f5f3ee (warm off-white), dark navy text. */
const DARK = '#0a1628'
const BODY = '#2d4a6b'
const BORDER = 'rgba(10,22,40,0.1)'
const LINK_BLUE = '#0d5cb0' /* ≥4.5:1 on #f5f3ee (WCAG AA) */

export default function About() {
  return (
    <section
      id="about"
      className="py-16 lg:py-20"
      style={{
        background: '#f5f3ee',
        borderBottom: BORDER,
      }}
    >
      <div className="max-w-6xl mx-auto px-5">
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
                className="w-full rounded-[18px] object-cover object-top"
                style={{
                  aspectRatio: '4/5',
                  border: '1px solid rgba(10,22,40,0.12)',
                  boxShadow: '0 20px 60px rgba(10,22,40,0.15)',
                }}
              />
            </picture>
          </div>

          {/* Bio */}
          <div className="flex-1">
            <p
              className="eyebrow mb-3"
              style={{ color: LINK_BLUE }}
            >
              Who you'll work with
            </p>
            <h2
              className="font-heading font-bold text-[32px] md:text-[44px] tracking-[-0.02em] leading-tight"
              style={{ color: DARK }}
            >
              A data scientist who speaks distributor.
            </h2>

            <p className="mt-5 font-medium text-[17px] leading-relaxed" style={{ color: BODY }}>
              I'm Houston Parker. I've spent years inside supply-chain data, building the dashboards,
              forecasts, and inventory models that help distribution companies stop guessing and start knowing.
            </p>
            <p className="mt-4 font-medium text-[17px] leading-relaxed" style={{ color: BODY }}>
              I started Stratos because small distributors deserve the same analytics firepower the big
              players have, without the enterprise price tag or the buzzwords. You work with me directly,
              not a junior who inherited your account.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {['BS, Data Science', 'Power BI · SQL · Python', 'Remote-Friendly'].map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-[10px] uppercase tracking-[0.1em] font-medium px-3 py-[6px] rounded-full"
                  style={{
                    background: 'rgba(10,22,40,0.07)',
                    border: '1px solid rgba(10,22,40,0.15)',
                    color: DARK,
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex mt-6 font-bold text-[15px] hover:underline"
              style={{ color: LINK_BLUE }}
            >
              More about how we work →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
