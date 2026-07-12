import { ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: ReactNode
  lede?: string
}

/** Consistent page intro band with the hero's ambient-glow treatment. */
export default function PageHeader({ eyebrow, title, lede }: Props) {
  return (
    <section className="relative overflow-hidden" style={{ background: '#0a0f1c' }}>
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full drift-a"
        style={{
          background: 'radial-gradient(circle, rgba(47,143,255,0.14) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 w-[420px] h-[420px] rounded-full drift-b"
        style={{
          background: 'radial-gradient(circle, rgba(39,224,160,0.1) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      <div className="relative max-w-6xl mx-auto px-5 pt-14 pb-12 lg:pt-20 lg:pb-16">
        <p className="eyebrow text-secondary mb-3 rise">{eyebrow}</p>
        <h1 className="font-heading font-extrabold text-[36px] md:text-[50px] leading-[1.08] tracking-[-0.03em] text-text-base max-w-[760px] rise rise-1">
          {title}
        </h1>
        {lede && (
          <p className="mt-5 text-muted font-medium text-[17px] leading-relaxed max-w-[620px] rise rise-2">{lede}</p>
        )}
      </div>
    </section>
  )
}
