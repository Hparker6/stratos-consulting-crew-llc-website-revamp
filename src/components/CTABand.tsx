import { Link } from 'react-router-dom'

interface Props {
  title?: string
  body?: string
}

/** Reusable end-of-page call-to-action band pointing at the discovery call. */
export default function CTABand({
  title = 'Ready to see what your data is hiding?',
  body = 'A free 30-minute discovery call. No pitch, no obligation — just an honest conversation about whether analytics can move the needle for your business.',
}: Props) {
  return (
    <section className="py-16 lg:py-20 bg-bg">
      <div className="max-w-6xl mx-auto px-5">
        <div
          className="rounded-[24px] p-8 lg:p-12 text-center"
          data-reveal
          style={{
            background: 'linear-gradient(135deg, rgba(47,143,255,0.09) 0%, rgba(39,224,160,0.06) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 100px rgba(47,143,255,0.08)',
          }}
        >
          <h2 className="font-heading font-bold text-[30px] md:text-[40px] tracking-[-0.02em] leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-muted font-medium text-[17px] leading-relaxed max-w-xl mx-auto">{body}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/#contact" className="btn-primary" data-track="cta_click" data-track-label="cta_band_book_call">
              Book a Free Discovery Call →
            </Link>
            <Link to="/process" className="btn-secondary" data-track="cta_click" data-track-label="cta_band_process">
              See How We Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
