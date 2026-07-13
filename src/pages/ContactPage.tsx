import usePageMeta from '../hooks/usePageMeta'
import PageHeader from '../components/PageHeader'
import Contact from '../components/Contact'
import { HAS_BOOKING } from '../lib/site'

/**
 * A real conversion destination. Previously /contact was a redirect to the
 * homepage's #contact anchor, which meant high-intent visitors on /pricing had
 * no reachable form. The form component is reused verbatim, so the homepage and
 * this page stay a single source of truth.
 */
export default function ContactPage() {
  usePageMeta(
    'Contact: Book a Free Discovery Call',
    'Book a free 30-minute discovery call with Stratos Consulting Crew. Tell us where it hurts and we will tell you honestly whether analytics can help and what it would take.',
    { breadcrumb: 'Contact' },
  )

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell us where it hurts. <span className="gradient-text">We'll tell you the truth.</span>
          </>
        }
        lede={
          HAS_BOOKING
            ? 'Pick a time on the calendar, or send a note below and we will come back to you within one business day. Either way, the first conversation is free and there is no pitch.'
            : 'Send a note below and we will come back to you within one business day. The first conversation is free, takes 30 minutes, and there is no pitch.'
        }
      />
      <Contact />
    </>
  )
}
