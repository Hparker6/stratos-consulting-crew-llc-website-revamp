import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Logo({ size = 44 }: { size?: number }) {
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
        <div className="font-heading font-bold text-[18px] text-text-base leading-none tracking-tight">Stratos</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted leading-none mt-[4px]">
          Consulting Crew
        </div>
      </div>
    </div>
  )
}

export { Logo }

const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Process', to: '/process' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
]

function linkClass(isActive: boolean): string {
  return `font-body font-medium text-[14px] transition-colors ${
    isActive ? 'text-text-base' : 'text-muted hover:text-text-base'
  }`
}

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
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-[72px]">
        <Link to="/" aria-label="Stratos Consulting Crew home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => linkClass(isActive)}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/#contact" className="hidden lg:inline-flex btn-primary !px-5 !py-3">
          Book a Free Call
        </Link>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[5px] p-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
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
          className="lg:hidden border-t px-5 py-5 flex flex-col gap-5"
          style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(10,15,28,0.97)' }}
          aria-label="Mobile navigation"
        >
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => linkClass(isActive)}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/#contact" className="btn-primary w-fit mt-1" onClick={() => setOpen(false)}>
            Book a Free Call
          </Link>
        </nav>
      )}
    </header>
  )
}
