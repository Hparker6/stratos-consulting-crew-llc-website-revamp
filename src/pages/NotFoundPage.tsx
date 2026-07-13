import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

export default function NotFoundPage() {
  // noindex: a 404 must never rank. `follow` is kept so the links out of this
  // page (home, solutions) are still crawled.
  usePageMeta('Page not found', 'The page you were looking for does not exist.', { noindex: true })

  return (
    <section className="section-lg bg-bg text-center">
      <div className="max-w-xl mx-auto px-5">
        <p className="font-mono text-[13px] font-bold text-primary tracking-[0.14em] uppercase mb-4">404</p>
        <h1 className="t-h1 text-text-base">
          This page doesn't exist.
        </h1>
        <p className="mt-4 text-muted font-medium text-body-lg">
          The link may be old, or the page may have moved. The good stuff is all still here.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to Home →
          </Link>
          <Link to="/solutions" className="btn-secondary">
            See Our Solutions
          </Link>
        </div>
      </div>
    </section>
  )
}
