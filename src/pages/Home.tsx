import usePageMeta from '../hooks/usePageMeta'
import { faqSchema } from '../lib/schema'
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
  return <div className="divider-shimmer" />
}

export default function Home() {
  usePageMeta(
    '',
    'Dashboards, forecasting, and inventory work for small distributors and manufacturers. See which product lines make money, buy what will actually sell, and free the cash sitting on your shelves. Book a free discovery call.',
    // FAQPage belongs ONLY here — this is the one page that renders the FAQ.
    // It is generated from the same array the accordion renders (src/data/faqs.ts),
    // so the markup can never describe questions the page doesn't show.
    { jsonLd: faqSchema() },
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
