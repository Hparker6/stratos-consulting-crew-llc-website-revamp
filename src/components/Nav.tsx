import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import BookCallLink from './BookCallLink'
import { prefetchRoute } from '../routes'

function Logo({ size = 44 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="logo-mark" style={{ width: size, height: size }}>
        {/* Decorative: the adjacent text already names the brand, so announcing
            the mark again would just be noise for a screen reader. */}
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
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
        <div className="t-label text-muted leading-none mt-[4px]">
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
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const menuRef = useRef<HTMLElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /** Close the menu on route change — a NavLink click navigates without unmounting. */
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  /**
   * Open-menu behaviour: lock background scrolling, close on Escape, and keep
   * Tab inside the panel. Without the trap, tabbing walks invisibly into the
   * page behind the overlay and focus is lost.
   */
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Move focus into the panel so the next Tab starts from a sane place.
    const focusables = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      )
    focusables()[0]?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus() // return focus to the control that opened it
        return
      }
      if (e.key !== 'Tab') return

      // Cycle Tab / Shift+Tab between the toggle button and the panel's links.
      const items = [toggleRef.current, ...focusables()].filter(Boolean) as HTMLElement[]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <>
      {/* Spacer: holds the header's at-rest height in the document flow so the
          fixed header shrinking on scroll cannot pull page content upward.
          Previously the header was `sticky` (in-flow) and animating its height
          shifted every element on the page — a Cumulative Layout Shift on the
          first scroll of every session. */}
      <div className="site-header-spacer" aria-hidden="true" />

      <header data-site-header data-scrolled={scrolled} className="site-header">
        <div className="site-header-inner container-page flex items-center justify-between">
          {/* No aria-label here on purpose: the Logo's visible "Stratos /
              Consulting Crew" text already names the link, and an aria-label
              that doesn't contain that visible text violates WCAG 2.5.3
              (Label in Name). */}
          <Link to="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop links. Hovering or focusing a link warms its code-split
              chunk, so by the time the click lands the route is already in
              memory and navigation is instant. */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => linkClass(isActive)}
                onMouseEnter={() => prefetchRoute(l.to)}
                onFocus={() => prefetchRoute(l.to)}
                data-track="nav_click"
                data-track-label={l.label}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <BookCallLink
            label="nav_book_call"
            className="hidden lg:inline-flex btn-primary btn-sm"
          >
            Book a Free Call
          </BookCallLink>

          {/* Hamburger. `min-w/h: 44px` lifts the tap target from ~36×32 to the
              44×44 recommended size; the bars themselves are unchanged, so it
              looks identical. aria-controls ties it to the panel it opens. */}
          <button
            ref={toggleRef}
            type="button"
            className="lg:hidden flex flex-col items-center justify-center gap-[5px] -mr-2 min-w-[44px] min-h-[44px]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
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

        {/* Mobile menu. Kept mounted-on-open (as before) but now with an id for
            aria-controls, and links padded to a 44px tap height. */}
        {open && (
          <nav
            id="mobile-menu"
            ref={menuRef}
            className="lg:hidden border-t hairline px-5 py-3 flex flex-col bg-[rgba(10,15,28,0.97)]"
            aria-label="Mobile navigation"
          >
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `${linkClass(isActive)} flex items-center min-h-[44px]`}
                onClick={() => setOpen(false)}
                data-track="nav_click"
                data-track-label={`${l.label}_mobile`}
              >
                {l.label}
              </NavLink>
            ))}
            <BookCallLink
              label="nav_book_call_mobile"
              className="btn-primary w-fit mt-3 mb-2"
              onClick={() => setOpen(false)}
            >
              Book a Free Call
            </BookCallLink>
          </nav>
        )}
      </header>
    </>
  )
}
