import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import SolutionsPage from './pages/SolutionsPage'
import ProcessPage from './pages/ProcessPage'
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

/** Old /problems/:slug URLs land on the matching Solutions section. */
function ProblemRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/solutions${slug ? `#${slug}` : ''}`} replace />
}

export default function App() {
  return (
    <div className="bg-bg text-text-base font-body min-h-screen">
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Redirects from the earlier structure */}
          <Route path="/dashboards" element={<Navigate to="/solutions" replace />} />
          <Route path="/problems" element={<Navigate to="/solutions" replace />} />
          <Route path="/problems/:slug" element={<ProblemRedirect />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
