/**
 * Site-wide contact, booking, and social configuration.
 *
 * Every value is sourced from a build-time Vite env var (see .env.example) so
 * it can be changed per deploy in Vercel without touching code. Each one has a
 * safe degradation rather than a placeholder:
 *
 *  - No booking URL  → "Book a Free Call" CTAs route to the on-site /contact form.
 *  - No LinkedIn URL → the LinkedIn link is not rendered at all.
 *
 * A dead link is worse than a missing one, so nothing here ever ships a stub.
 */

/** Trims an env var and treats blank strings as unset. */
function clean(value: string | undefined): string {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : ''
}

/** Only http(s) URLs are ever emitted into an href, so a misconfigured env var
 *  can't turn a CTA into a javascript: or data: URL. */
function externalUrl(value: string | undefined): string {
  const url = clean(value)
  return /^https:\/\/|^http:\/\//i.test(url) ? url : ''
}

export const CONTACT_EMAIL =
  clean(import.meta.env.VITE_CONTACT_EMAIL) || 'hparker6@stratosconsultingcrew.com'

/** Direct email link. An explicit "email us instead" affordance — never a CTA. */
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`

/** External scheduler (Cal.com or equivalent). Empty string when not configured. */
export const BOOKING_URL = externalUrl(import.meta.env.VITE_BOOKING_URL)

/** Company/founder LinkedIn. Empty string when not configured. */
export const LINKEDIN_URL = externalUrl(import.meta.env.VITE_LINKEDIN_URL)

export const HAS_BOOKING = BOOKING_URL !== ''
export const HAS_LINKEDIN = LINKEDIN_URL !== ''

/** The on-site conversion page: a real route, not an anchor. */
export const CONTACT_PATH = '/contact'
