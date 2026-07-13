import { Link } from 'react-router-dom'
import BookCallLink from './BookCallLink'

interface Props {
  title?: string
  body?: string
}

/** Reusable end-of-page call-to-action band pointing at the discovery call. */
export default function CTABand({
  title = 'Ready to see what your data is hiding?',
  body = 'A free 30-minute discovery call. No pitch and no obligation, just an honest conversation about whether analytics can move the needle for your business.',
}: Props) {
  return (
    <section className="section bg-bg">
      <div className="container-page">
        {/* .panel is the shared translucent-gradient surface, also used by the
            contact form — previously both re-declared the same gradient, border
            and glow inline with slightly different alpha values. */}
        <div className="panel p-8 lg:p-12 text-center" data-reveal>
          <h2 className="t-h3">{title}</h2>
          <p className="mt-4 text-muted font-medium text-body-lg max-w-xl mx-auto">{body}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <BookCallLink label="cta_band_book_call" className="btn-primary">
              Book a Free Discovery Call →
            </BookCallLink>
            <Link
              to="/process"
              className="btn-secondary"
              data-track="cta_click"
              data-track-label="cta_band_process"
              data-track-destination="process_page"
            >
              See How We Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
