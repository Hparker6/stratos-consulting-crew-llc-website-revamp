import { ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: ReactNode
  lede?: string
}

/** Consistent page intro band with the hero's ambient-glow treatment. */
export default function PageHeader({ eyebrow, title, lede }: Props) {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Ambient glows — .glow supplies the shape, the modifier the colour. */}
      <div className="glow glow-primary drift-a -top-40 -left-40 w-[520px] h-[520px]" />
      <div className="glow glow-secondary drift-b top-0 right-0 w-[420px] h-[420px]" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      <div className="relative container-page pt-14 pb-12 lg:pt-20 lg:pb-16">
        <p className="eyebrow text-secondary mb-3 rise">{eyebrow}</p>
        {/* Transform-only entrance: this <h1> is the LCP element on every
            subpage. See the note in Hero.tsx. */}
        <h1 className="t-h1 text-text-base max-w-[760px] rise-solid rise-1">{title}</h1>
        {lede && (
          <p className="mt-5 text-muted font-medium text-body-lg max-w-[620px] rise rise-2">{lede}</p>
        )}
      </div>
    </section>
  )
}
