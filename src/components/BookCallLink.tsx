import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { EVENTS } from '../lib/events'
import { BOOKING_URL, CONTACT_PATH, HAS_BOOKING } from '../lib/site'

interface Props {
  /** Analytics label identifying the CTA's location, e.g. "hero_book_call". */
  label: string
  className?: string
  children: ReactNode
  /** Extra click side-effect (e.g. closing the mobile menu). */
  onClick?: () => void
}

/**
 * The single entry point for every "Book a Free Call" CTA on the site.
 *
 * When VITE_BOOKING_URL is configured this opens the scheduler in a new tab;
 * otherwise the CTA falls back to the on-site /contact form. Either way the
 * click lands on something that can actually capture a lead.
 *
 * ANALYTICS: the CTA reports exactly one event, chosen by where it actually
 * goes — booking_click for the scheduler, cta_click for the contact page. It is
 * never both. The event is declared via data-track and emitted by the single
 * global click listener (lib/autoTrack.ts), which stops at the first match, so
 * the scheduler CTA cannot also be counted as a generic outbound_click.
 *
 * Styling is passed in by the caller, so every CTA keeps the exact appearance it
 * had before.
 */
export default function BookCallLink({ label, className, children, onClick }: Props) {
  if (HAS_BOOKING) {
    return (
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
        data-track={EVENTS.BOOKING_CLICK}
        data-track-label={label}
        data-track-destination="scheduler"
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      to={CONTACT_PATH}
      className={className}
      onClick={onClick}
      data-track={EVENTS.CTA_CLICK}
      data-track-label={label}
      data-track-destination="contact_page"
    >
      {children}
    </Link>
  )
}
