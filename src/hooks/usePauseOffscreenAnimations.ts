import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ROUTE_CONTENT_EVENT } from '../routes'

/** Every infinite, always-running decorative animation on the site. */
const INFINITE_ANIMATIONS = '.drift-a, .drift-b, .divider-shimmer, .gradient-ring, .animate-float'

/**
 * Pauses infinite decorative animations while they are off-screen.
 *
 * These animations never stop on their own. The featured pricing card's rotating
 * conic-gradient ring is the worst of them: it is driven by an @property angle,
 * so it forces a real repaint of that card every single frame — including when
 * it is a thousand pixels below the viewport, and including when the tab is
 * simply left open in the background. The shimmer dividers and the blurred glow
 * blobs cost the same way.
 *
 * Toggling animation-play-state stops the compositor doing work nobody can see.
 * Purely a performance concern: an animation that re-enters the viewport resumes
 * exactly where it left off, so nothing looks different.
 */
export default function usePauseOffscreenAnimations() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          el.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'
        }
      },
      // Resume slightly before they scroll in, so nothing visibly "starts".
      { rootMargin: '150px' },
    )

    const seen = new WeakSet<HTMLElement>()
    const scan = () => {
      for (const el of document.querySelectorAll<HTMLElement>(INFINITE_ANIMATIONS)) {
        if (seen.has(el)) continue
        seen.add(el)
        io.observe(el)
      }
    }

    scan()
    // A code-split route's DOM arrives after the pathname changes, so re-scan.
    window.addEventListener(ROUTE_CONTENT_EVENT, scan)

    return () => {
      window.removeEventListener(ROUTE_CONTENT_EVENT, scan)
      io.disconnect()
      // Leave nothing paused behind on unmount.
      for (const el of document.querySelectorAll<HTMLElement>(INFINITE_ANIMATIONS)) {
        el.style.removeProperty('animation-play-state')
      }
    }
  }, [pathname])
}
