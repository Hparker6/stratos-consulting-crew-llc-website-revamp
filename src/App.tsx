import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CookieConsent from './components/CookieConsent'
import SiteSchema from './components/SiteSchema'
import { resetPageTracking } from './lib/autoTrack'
import { trackPageView } from './lib/events'
import useRevealObserver from './hooks/useRevealObserver'
import usePauseOffscreenAnimations from './hooks/usePauseOffscreenAnimations'
// Route components are code-split (see src/routes.tsx). The entry route is
// resolved before hydration, so this costs nothing on first paint.
import {
  AboutPage,
  ContactPage,
  Home,
  NotFoundPage,
  PricingPage,
  PrivacyPage,
  ProcessPage,
  ServicesPage,
  SolutionsPage,
  TermsPage,
} from './routes'

/** Old /problems/:slug URLs land on the matching Solutions section. */
function ProblemRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/solutions${slug ? `#${slug}` : ''}`} replace />
}

/** SPA page_view events for GA4 (Enhanced Measurement can't see route changes). */
function PageViewTracker() {
  const { pathname } = useLocation()
  useRevealObserver()
  usePauseOffscreenAnimations()
  useEffect(() => {
    resetPageTracking(pathname)
    // Let usePageMeta set the title first, then report.
    const id = window.setTimeout(() => trackPageView(pathname, document.title), 0)
    return () => window.clearTimeout(id)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="bg-bg text-text-base font-body min-h-screen">
      {/*
        Skip navigation (WCAG 2.4.1 Bypass Blocks). Off-screen until focused, so
        it is invisible to mouse users but is the first stop for anyone tabbing —
        who would otherwise cross the logo, five nav links, and the CTA on every
        single page before reaching content.
      */}
      <a href="#main" className="skip-link btn-primary">
        Skip to content
      </a>
      <ScrollToTop />
      <SiteSchema />
      <PageViewTracker />
      <Nav />
      {/* tabIndex={-1} makes the landmark a valid target for the skip link, so
          focus actually lands here rather than the browser only scrolling. */}
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          {/* Redirects from the earlier structure */}
          <Route path="/dashboards" element={<Navigate to="/solutions" replace />} />
          <Route path="/problems" element={<Navigate to="/solutions" replace />} />
          <Route path="/problems/:slug" element={<ProblemRedirect />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
