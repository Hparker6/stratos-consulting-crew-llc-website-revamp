import type { ReactNode } from 'react'

interface Props {
  /** Two-digit chapter index, e.g. "01". Rendered in gold mono. */
  index: string
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  /** Left is the editorial default; center is used sparingly for rhythm. */
  align?: 'left' | 'center'
  /** Eyebrow tint — the section's data colour. */
  accent?: 'gold' | 'blue'
  /** Heading scale override (defaults to the section .t-h2). */
  titleClass?: string
  /** Colour context — 'light' flips the hairline + eyebrow for the About band. */
  tone?: 'dark' | 'light'
  className?: string
}

/**
 * The chapter marker that opens every section: a gold index and eyebrow riding
 * a hairline rule, then a left-aligned display heading on a tight measure. This
 * is the single device that turns a stack of centered card grids into composed,
 * editorial "movements" — see 8c in index.css.
 */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  lede,
  align = 'left',
  accent = 'gold',
  titleClass = 't-h2',
  tone = 'dark',
  className = '',
}: Props) {
  const centered = align === 'center'
  const eyebrowColor =
    tone === 'light' ? 'text-light-link' : accent === 'gold' ? 'text-secondary' : 'text-primary'
  const headingColor = tone === 'light' ? 'text-light-ink' : 'text-text-base'
  const ledeColor = tone === 'light' ? 'text-light-body' : 'text-muted'

  return (
    <header className={`${centered ? 'text-center' : ''} ${className}`}>
      <div
        className="chapter"
        style={
          tone === 'light' ? { borderTopColor: 'var(--line-light)' } : undefined
        }
      >
        <span className={`chapter-index ${tone === 'light' ? '!text-light-link' : ''}`}>{index}</span>
        <span className={`eyebrow ${eyebrowColor}`}>{eyebrow}</span>
      </div>
      <h2 className={`${titleClass} ${headingColor} mt-6 ${centered ? 'mx-auto max-w-[22ch]' : 'max-w-[20ch]'}`}>
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-5 font-medium text-body-lg leading-relaxed ${ledeColor} ${
            centered ? 'mx-auto max-w-2xl' : 'max-w-[56ch]'
          }`}
        >
          {lede}
        </p>
      )}
    </header>
  )
}
