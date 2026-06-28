export default function About() {
  return (
    <section
      id="about"
      className="py-20 lg:py-28"
      style={{
        background: '#0d1526',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
          {/* Photo placeholder */}
          <div className="flex-shrink-0 lg:w-[380px]">
            <div
              className="relative rounded-[18px] overflow-hidden"
              style={{
                aspectRatio: '4/5',
                background: 'linear-gradient(160deg, #101a2e 0%, #0a0f1c 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              aria-label="Photo placeholder for Houston Parker"
            >
              {/* Diagonal stripe texture */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0, rgba(255,255,255,0.018) 1px, transparent 0, transparent 50%)',
                  backgroundSize: '18px 18px',
                }}
              />
              {/* Silhouette */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div
                  className="w-20 h-20 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                />
                <div
                  className="w-36 h-28 rounded-t-[80px]"
                  style={{ background: 'rgba(255,255,255,0.06)', marginTop: 2 }}
                />
              </div>
              {/* Label chip */}
              <div className="absolute top-4 left-4">
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint px-3 py-[5px] rounded-[6px]"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  [ Houston Parker — photo ]
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1">
            <p className="eyebrow text-primary mb-4">Who you'll work with</p>
            <h2 className="font-heading font-bold text-[30px] md:text-[40px] tracking-[-0.02em] leading-tight">
              A data scientist who speaks distributor.
            </h2>

            <p className="mt-5 text-muted text-[15px] leading-relaxed">
              I'm Houston Parker. I've spent years turning messy supply-chain data into decisions —
              building dashboards, demand forecasts, inventory models, and automation for companies that
              move real product.
            </p>
            <p className="mt-4 text-muted text-[15px] leading-relaxed">
              I started Stratos because small distributors deserve the same analytics firepower the big
              players have — without the enterprise price tag or the buzzwords. You work with me directly,
              not a junior who inherited your account.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {['BS, Data Science', 'Power BI · SQL · Python', 'DFW, Texas'].map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted px-3 py-[6px] rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
