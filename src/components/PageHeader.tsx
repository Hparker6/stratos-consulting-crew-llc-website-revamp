import { ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: ReactNode
  lede?: string
}

/**
 * Consistent page intro band — the inner-page counterpart to the home page's
 * SectionHeader. A gold eyebrow rides a hairline "chapter" rule, then a large
 * display heading on a tight measure, over the hero's ambient-glow treatment.
 * The <h1> keeps its transform-only `rise-solid` entrance because it is the LCP
 * element on every subpage (see the note in Hero.tsx).
 */
export default function PageHeader({ eyebrow, title, lede }: Props) {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Ambient glows — .glow supplies the shape, the modifier the colour. */}
      <div className="glow glow-primary drift-a -top-40 -left-40 w-[520px] h-[520px]" />
      <div className="glow glow-secondary drift-b top-0 right-0 w-[420px] h-[420px]" />

      <div className="relative container-page pt-16 pb-14 lg:pt-24 lg:pb-20">
        <div className="chapter rise">
          <span className="chapter-index" aria-hidden="true">◇</span>
          <span className="eyebrow text-secondary">{eyebrow}</span>
        </div>
        <h1 className="t-display text-text-base max-w-[17ch] mt-6 rise-solid rise-1">{title}</h1>
        {lede && (
          <p className="mt-6 text-muted font-medium text-body-lg leading-relaxed max-w-[58ch] rise rise-2">
            {lede}
          </p>
        )}
      </div>
    </section>
  )
}
