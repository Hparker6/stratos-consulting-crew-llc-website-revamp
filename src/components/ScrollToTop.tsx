import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to top on route change; honors #hash anchors when present. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // CSS `scroll-behavior` is already gated on prefers-reduced-motion, but a
    // scrollIntoView({ behavior: 'smooth' }) call overrides it, so the same
    // preference has to be honored explicitly here.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth'

    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
