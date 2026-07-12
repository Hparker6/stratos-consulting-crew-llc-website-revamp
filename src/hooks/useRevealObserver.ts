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

    const reveal = (el: HTMLElement) => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          io.unobserve(el)
          requestAnimationFrame(() => reveal(el))
        }
      },
      // Positive bottom margin: elements start revealing before they
      // actually reach the viewport, so nothing sits blank mid-scroll.
      { threshold: 0, rootMargin: '0px 0px 200px 0px' },
    )

    const timers: ReturnType<typeof setTimeout>[] = []

    for (const el of els) {
      el.setAttribute('data-reveal-armed', '')
      const rect = el.getBoundingClientRect()
      const alreadyVisible = rect.top < window.innerHeight * 1.15 && rect.bottom > 0
      if (alreadyVisible) continue // never hide what the user can already see
      const delay = Number(el.dataset.revealDelay ?? 0)
      el.style.opacity = '0'
      el.style.transform = 'translateY(12px)'
      el.style.transition = `opacity 0.4s ease-out ${delay}ms, transform 0.4s ease-out ${delay}ms`
      io.observe(el)
      // Safety net: guarantee visibility even if IntersectionObserver
      // never fires (e.g. fast programmatic scroll, capture tooling).
      timers.push(setTimeout(() => reveal(el), 1800 + delay))
    }

    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [pathname])
}
