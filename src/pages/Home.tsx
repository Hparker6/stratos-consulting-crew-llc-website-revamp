import usePageMeta from '../hooks/usePageMeta'
import Hero from '../components/Hero'
import PainPoints from '../components/PainPoints'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import DashboardPreview from '../components/DashboardPreview'
import WhoWeHelp from '../components/WhoWeHelp'
import About from '../components/About'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

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

export default function Home() {
  usePageMeta(
    '',
    'We help small distributors and manufacturers cut costs, optimize inventory, and make smarter decisions with Power BI dashboards, forecasting, and automation. Book a free discovery call.',
  )

  return (
    <>
      <Hero />
      <GradientDivider />
      <PainPoints />
      <Services />
      <HowItWorks />
      <DashboardPreview />
      <WhoWeHelp />
      <GradientDivider />
      <About />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  )
}
