import { Logo } from './Nav'

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
            <Logo size={52} />
            <p className="mt-4 text-muted font-medium text-[15px] leading-relaxed">
              Analytics, dashboards, and forecasting for small distributors and manufacturers across
              Dallas–Fort Worth.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint mb-4">Company</p>
              <ul className="space-y-3">
                {[
                  { label: 'Services', href: '#services' },
                  { label: 'About', href: '#about' },
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'FAQ', href: '#faq' },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-muted hover:text-text-base font-medium text-[15px] transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
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
                  <span className="text-muted font-medium text-[15px]">Dallas–Fort Worth, TX</span>
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
