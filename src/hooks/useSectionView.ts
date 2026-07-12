import { useEffect, useRef } from 'react'
import { track } from '../lib/analytics'

/**
 * Fires an analytics event once when the referenced element becomes ~40%
 * visible — used for "services viewed" and per-dashboard view events.
 */
export default function useSectionView<T extends HTMLElement>(
  event: string,
  params: Record<string, unknown> = {},
) {
  const ref = useRef<T | null>(null)
  const fired = useRef(false)
  const paramsRef = useRef(params)
  paramsRef.current = params

  useEffect(() => {
    const el = ref.current
    if (!el || fired.current || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !fired.current) {
          fired.current = true
          track(event, { ...paramsRef.current, page_path: window.location.pathname })
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [event])

  return ref
}
