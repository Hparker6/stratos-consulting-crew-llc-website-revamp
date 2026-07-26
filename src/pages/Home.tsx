import usePageMeta from '../hooks/usePageMeta'
import { faqSchema } from '../lib/schema'
import Hero from '../components/Hero'
import PainPoints from '../components/PainPoints'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import DashboardPreview from '../components/DashboardPreview'
import WhoWeHelp from '../components/WhoWeHelp'
import StatementBand from '../components/StatementBand'
import About from '../components/About'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

export default function Home() {
  usePageMeta(
    '',
    'Dashboards, forecasting, and inventory work for small distributors and manufacturers. See which product lines make money and free the cash sitting on your shelves.',
    // FAQPage belongs ONLY here — this is the one page that renders the FAQ.
    // It is generated from the same array the accordion renders (src/data/faqs.ts),
    // so the markup can never describe questions the page doesn't show.
    { jsonLd: faqSchema() },
  )

  return (
    <>
      <Hero />
      {/* Order follows the buyer's questions: resonate (pain) → confirm fit
          (who) → what we do → how it works → proof → founder → price. */}
      <PainPoints />
      <WhoWeHelp />
      <Services />
      <HowItWorks />
      <DashboardPreview />
      <StatementBand />
      <About />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  )
}
