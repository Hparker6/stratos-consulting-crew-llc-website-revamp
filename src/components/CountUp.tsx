import { useEffect, useRef, useState } from 'react'

interface Props {
  /** Final numeric value. */
  value: number
  /** Renders the number (adds prefix/suffix, decimals). */
  format: (n: number) => string
  durationMs?: number
}

/**
 * Animates a number from 0 to `value` when scrolled into view.
 * Renders the final value initially (hydration- and crawler-safe);
 * skips animating entirely under prefers-reduced-motion.
 */
export default function CountUp({ value, format, durationMs = 1100 }: Props) {
  const [display, setDisplay] = useState(value)
  const ref = useRef<HTMLSpanElement | null>(null)
  const played = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || played.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || played.current) return
        played.current = true
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1)
          const eased = 1 - Math.pow(1 - t, 4) // expo-ish out
          setDisplay(value * eased)
          if (t < 1) requestAnimationFrame(tick)
          else setDisplay(value)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, durationMs])

  return <span ref={ref}>{format(display)}</span>
}
