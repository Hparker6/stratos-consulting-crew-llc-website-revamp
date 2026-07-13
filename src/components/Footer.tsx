import { Link } from 'react-router-dom'
import { Logo } from './Nav'
import BookCallLink from './BookCallLink'
import { openConsentSettings } from '../lib/analytics'
import { CONTACT_EMAIL, CONTACT_MAILTO, HAS_LINKEDIN, LINKEDIN_URL } from '../lib/site'

const exploreLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Our Process', to: '/process' },
  { label: 'Pricing', to: '/pricing' },
]

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const legalLinks = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
]

export default function Footer() {
  return (
    <footer className="bg-footer border-t-hairline">
      <div className="container-page py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-start">
          {/* Brand */}
          <div className="flex-1 max-w-[340px]">
            <Link to="/">
              <Logo size={52} />
            </Link>
            <p className="mt-4 text-muted font-medium text-body-sm">
              Analytics, dashboards, and forecasting for distributors, manufacturers, and wholesalers.
              Serving clients nationwide.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div>
              <p className="t-label text-faint mb-4">Explore</p>
              <ul className="space-y-3">
                {exploreLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-muted hover:text-text-base font-medium text-[15px] transition-colors"
                      data-track="nav_click"
                      data-track-label={`footer_${l.label.toLowerCase().replace(/\s+/g, "_")}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="t-label text-faint mb-4">Company</p>
              <ul className="space-y-3">
                {companyLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-muted hover:text-text-base font-medium text-[15px] transition-colors"
                      data-track="nav_click"
                      data-track-label={`footer_${l.label.toLowerCase().replace(/\s+/g, "_")}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <BookCallLink
                    label="footer_book_call"
                    className="text-muted hover:text-text-base font-medium text-[15px] transition-colors"
                  >
                    Book a Free Call
                  </BookCallLink>
                </li>
              </ul>
            </div>

            <div>
              <p className="t-label text-faint mb-4">Contact</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={CONTACT_MAILTO}
                    className="text-muted hover:text-primary font-medium text-[15px] transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                {/* Rendered only when VITE_LINKEDIN_URL is configured — a dead
                    social link costs more trust than a missing one. */}
                {HAS_LINKEDIN && (
                  <li>
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-text-base font-medium text-[15px] transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                )}
                <li>
                  <span className="text-muted font-medium text-body-sm">United States</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--line-soft)]">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <p className="font-mono text-[10px] text-faint tracking-wide">
              © {new Date().getFullYear()} Stratos Consulting Crew LLC
            </p>
            {legalLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-mono text-[10px] text-faint hover:text-muted tracking-wide transition-colors"
              >
                {l.label}
              </Link>
            ))}
            {/* Re-opens the consent banner. Without this, a visitor who pressed
                "Allow" had no way to change their mind — a stated right in the
                privacy policy needs an actual control behind it. */}
            <button
              type="button"
              onClick={openConsentSettings}
              className="font-mono text-[10px] text-faint hover:text-muted tracking-wide transition-colors"
            >
              Cookie settings
            </button>
          </div>
          <p className="font-mono text-[14px] text-muted tracking-wide">Built on your data.</p>
        </div>
      </div>
    </footer>
  )
}
