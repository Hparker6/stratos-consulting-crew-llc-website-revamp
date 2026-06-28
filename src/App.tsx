import Nav from './components/Nav'
import Hero from './components/Hero'
import PainPoints from './components/PainPoints'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import DashboardPreview from './components/DashboardPreview'
import About from './components/About'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function GradientDivider() {
  return (
    <div
      style={{
        height: 2,
        background:
          'linear-gradient(90deg, transparent 0%, rgba(47,143,255,0.4) 30%, rgba(39,224,160,0.4) 70%, transparent 100%)',
      }}
    />
  )
}

export default function App() {
  return (
    <div className="bg-bg text-text-base font-body min-h-screen">
      <Nav />
      <main>
        <Hero />
        <GradientDivider />
        <PainPoints />
        <Services />
        <HowItWorks />
        <DashboardPreview />
        <GradientDivider />
        <About />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
