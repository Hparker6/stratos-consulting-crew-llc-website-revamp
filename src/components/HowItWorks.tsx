const steps = [
  {
    num: '1',
    title: 'Discovery Call',
    body: 'A free 30-minute call. Tell us where it hurts — margins, inventory, reporting. No pitch.',
  },
  {
    num: '2',
    title: 'Custom Assessment',
    body: 'We dig into your data and hand you a clear plan with the biggest wins ranked first.',
  },
  {
    num: '3',
    title: 'Ongoing Partnership',
    body: 'We build, automate, and keep improving — your fractional analytics team on call.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28"
      style={{
        background: '#0d1526',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 text-center">
        <p className="eyebrow text-primary mb-4">How it works</p>
        <h2 className="font-heading font-bold text-[32px] md:text-[42px] tracking-[-0.02em]">
          Three steps. No jargon.
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center text-center px-4">
              <div
                className="w-[62px] h-[62px] rounded-full flex items-center justify-center mb-5 font-heading font-bold text-[22px] text-primary"
                style={{ border: '2px solid #2f8fff', background: 'transparent' }}
              >
                {s.num}
              </div>
              <h3 className="font-heading font-bold text-[18px] text-text-base mb-3">{s.title}</h3>
              <p className="text-muted text-[14px] leading-relaxed max-w-[240px] mx-auto">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
