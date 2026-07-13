import { useEffect, useRef } from 'react'
import { trackSectionView } from '../lib/events'

/**
 * Fires a single `section_view` event when the referenced element becomes ~40%
 * visible, and never again for that element.
 *
 * The section is identified by one `section` string rather than a free-form
 * params bag. It previously emitted two different event NAMES (services_view,
 * dashboard_view) with ad-hoc parameters, which meant every newly-tracked
 * section invented another GA4 event and the reports couldn't be compared
 * against each other. One event with a dimension is the shape GA4 wants.
 */
export default function useSectionView<T extends HTMLElement>(section: string) {
  const ref = useRef<T | null>(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || fired.current || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !fired.current) {
          fired.current = true
          trackSectionView(section)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [section])

  return ref
}
