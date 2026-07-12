import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scroll-reveal for any element carrying `data-reveal` (optional
 * `data-reveal-delay` in ms for stagger). Crawler/no-JS safe by design:
 * markup ships fully visible; this hook hides only elements still below the
 * viewport after mount, then transitions them in on intersection.
 * prefers-reduced-motion is honored both here and in CSS.
 */
export default function useRevealObserver() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

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
          requestAnimationFrame(() => {
            el.style.opacity = '1'
            el.style.transform = 'none'
          })
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
    )

    for (const el of els) {
      el.setAttribute('data-reveal-armed', '')
      const rect = el.getBoundingClientRect()
      const alreadyVisible = rect.top < window.innerHeight * 0.96 && rect.bottom > 0
      if (alreadyVisible) continue // never hide what the user can already see
      const delay = Number(el.dataset.revealDelay ?? 0)
      el.style.opacity = '0'
      el.style.transform = 'translateY(18px)'
      el.style.transition = `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
      io.observe(el)
    }

    return () => io.disconnect()
  }, [pathname])
}
