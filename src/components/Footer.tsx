import { Link } from 'react-router-dom'
import { Logo } from './Nav'
import { BOOK_CALL_MAILTO } from '../lib/site'

const exploreLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Our Process', to: '/process' },
  { label: 'Pricing', to: '/pricing' },
]

const companyLinks = [{ label: 'About', to: '/about' }]

export default function Footer() {
  return (
    <footer
      style={{
        background: '#080c16',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-start">
          {/* Brand */}
          <div className="flex-1 max-w-[340px]">
            <Link to="/">
              <Logo size={52} />
            </Link>
            <p className="mt-4 text-muted font-medium text-[15px] leading-relaxed">
              Analytics, dashboards, and forecasting for distributors, manufacturers, and wholesalers.
              Serving clients nationwide.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint mb-4">Explore</p>
              <ul className="space-y-3">
                {exploreLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-muted hover:text-text-base font-medium text-[15px] transition-colors"
                      data-track="nav_click"
                      data-track-label={`footer_${l.label}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint mb-4">Company</p>
              <ul className="space-y-3">
                {companyLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-muted hover:text-text-base font-medium text-[15px] transition-colors"
                      data-track="nav_click"
                      data-track-label={`footer_${l.label}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={BOOK_CALL_MAILTO}
                    className="text-muted hover:text-text-base font-medium text-[15px] transition-colors"
                    data-track="cta_click"
                    data-track-label="footer_book_call"
                  >
                    Book a Free Call
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint mb-4">Contact</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:hparker6@stratosconsultingcrew.com"
                    className="text-muted hover:text-primary font-medium text-[15px] transition-colors"
                  >
                    hparker6@stratosconsultingcrew.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-text-base font-medium text-[15px] transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <span className="text-muted font-medium text-[15px]">United States</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="font-mono text-[10px] text-faint tracking-wide">
            © 2026 Stratos Consulting Crew LLC
          </p>
          <p className="font-mono text-[14px] text-muted tracking-wide">Built on your data.</p>
        </div>
      </div>
    </footer>
  )
}
