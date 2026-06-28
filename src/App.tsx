import Nav from './components/Nav'
import Hero from './components/Hero'
import PainPoints from './components/PainPoints'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Outcomes from './components/Outcomes'
import DashboardPreview from './components/DashboardPreview'
import About from './components/About'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-bg text-text-base font-body min-h-screen">
      <Nav />
      <main>
        <Hero />
        <PainPoints />
        <Services />
        <HowItWorks />
        <Outcomes />
        <DashboardPreview />
        <About />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
