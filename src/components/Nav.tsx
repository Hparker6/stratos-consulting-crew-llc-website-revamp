import { useState } from 'react'

function Logo({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '28%',
          background: 'linear-gradient(135deg, #2f8fff, #27e0a0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 18px rgba(47,143,255,0.45)',
          flexShrink: 0,
        }}
      >
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2C10 2 16 5.5 16 10.5C16 13.5 14 15.8 11.5 17L10 20L8.5 17C6 15.8 4 13.5 4 10.5C4 5.5 10 2 10 2Z"
            fill="#04102a"
          />
          <circle cx="10" cy="10" r="2.5" fill="url(#lg)" />
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2f8fff" />
              <stop offset="100%" stopColor="#27e0a0" />
            </linearGradient>
          </defs>
          <path d="M7.5 16.5L5 19M12.5 16.5L15 19" stroke="#04102a" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <div className="font-heading font-bold text-[15px] text-text-base leading-none tracking-tight">Stratos</div>
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted leading-none mt-[3px]">
          Consulting Crew
        </div>
      </div>
    </div>
  )
}

export { Logo }

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(10,15,28,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <a href="#" aria-label="Stratos Consulting Crew home">
          <Logo />
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm text-muted hover:text-text-base transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="hidden md:inline-flex btn-primary text-sm">
          Book a Free Call
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <span
            className="block w-5 h-[2px] bg-text-base transition-transform origin-center"
            style={open ? { transform: 'translateY(7px) rotate(45deg)' } : {}}
          />
          <span
            className="block w-5 h-[2px] bg-text-base transition-opacity"
            style={open ? { opacity: 0 } : {}}
          />
          <span
            className="block w-5 h-[2px] bg-text-base transition-transform origin-center"
            style={open ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="md:hidden border-t hairline px-5 py-4 flex flex-col gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(10,15,28,0.97)' }}
          aria-label="Mobile navigation"
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm text-muted hover:text-text-base transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-sm w-fit mt-1" onClick={() => setOpen(false)}>
            Book a Free Call
          </a>
        </nav>
      )}
    </header>
  )
}
