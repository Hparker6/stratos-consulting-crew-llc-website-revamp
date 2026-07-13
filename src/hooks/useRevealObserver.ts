import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scroll-reveal for elements carrying `data-reveal` (optional
 * `data-reveal-delay` in ms for stagger).
 *
 * Content is NEVER hidden. Markup ships fully visible; on intersection we
 * only add a short entrance animation (fade + rise) via the Web Animations
 * API. If the observer never fires, or JS fails, or the user scrolls past
 * too fast, the element simply sits at full opacity — a blank section is
 * impossible by construction. prefers-reduced-motion is honored.
 */
export default function useRevealObserver() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return
    if (typeof HTMLElement.prototype.animate !== 'function') return

    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-armed])'),
    )
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          io.unobserve(el)
          const delay = Number(el.dataset.revealDelay ?? 0)
          el.animate(
            [
              { opacity: 0.2, transform: 'translateY(14px)' },
              { opacity: 1, transform: 'none' },
            ],
            { duration: 450, delay, easing: 'cubic-bezier(0.16,1,0.3,1)', fill: 'backwards' },
          )
        }
      },
      { threshold: 0, rootMargin: '0px 0px 80px 0px' },
    )

    for (const el of els) {
      el.setAttribute('data-reveal-armed', '')
      const rect = el.getBoundingClientRect()
      // Elements already on screen at mount don't need an entrance.
      if (rect.top < window.innerHeight && rect.bottom > 0) continue
      io.observe(el)
    }

    return () => io.disconnect()
  }, [pathname])
}
