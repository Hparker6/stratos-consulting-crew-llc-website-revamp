import usePageMeta from '../hooks/usePageMeta'
import PageHeader from '../components/PageHeader'
import About from '../components/About'
import WhoWeHelp from '../components/WhoWeHelp'
import CTABand from '../components/CTABand'

const values = [
  {
    title: 'Plain English, always',
    body: 'If an analysis can’t be explained to the person who has to act on it, it isn’t finished. No jargon, no black boxes, no slideware.',
  },
  {
    title: 'Honesty over polish',
    body: 'We’re a young firm and we say so. No invented testimonials, no borrowed logos, no implied track record. Sample work is labeled as sample work.',
  },
  {
    title: 'You own everything',
    body: 'Dashboards, models, pipelines, documentation — built in your systems, under your accounts, yours to keep whether or not we keep working together.',
  },
  {
    title: 'Scoped small, proven fast',
    body: 'Every engagement is a fixed scope that stands alone. The work has to earn the next phase — you should never be more than one small step from the exit.',
  },
]

export default function AboutPage() {
  usePageMeta(
    'About',
    'Stratos Consulting Crew is a boutique analytics firm for distributors, manufacturers, and wholesalers — founder-led, technically deep, and honest about being new.',
  )

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            Boutique on purpose. <span className="gradient-text">Technical to the core.</span>
          </>
        }
        lede="Stratos exists because $5–50M suppliers deserve the analytics firepower the big players have — without enterprise pricing, junior account teams, or a rip-and-replace agenda."
      />

      {/* Founder bio — reuses the light-section treatment from the homepage */}
      <About />

      {/* The honest pitch */}
      <section className="py-16 lg:py-20 bg-bg">
        <div className="max-w-6xl mx-auto px-5">
          <div className="max-w-2xl">
            <p className="eyebrow text-secondary mb-3">Why trust a new firm?</p>
            <h2 className="font-heading font-bold text-[32px] md:text-[44px] tracking-[-0.02em] leading-tight">
              We'd rather earn trust than borrow it.
            </h2>
            <p className="mt-5 text-muted font-medium text-[17px] leading-relaxed">
              You'll notice this site has no client logos, no testimonials, and no case studies. That's
              deliberate: Stratos is new, and we won't manufacture social proof we haven't earned. What we
              can show you is real — the depth of the technical work, exactly how we think about your
              problems, and sample dashboards labeled honestly as samples.
            </p>
            <p className="mt-4 text-muted font-medium text-[17px] leading-relaxed">
              And we've structured every engagement so you never have to take it on faith: the first
              conversation is free, the assessment is a small fixed fee with a deliverable you keep, and
              everything after that is scoped, priced, and cancelable. Being new means every early client
              gets our absolute best work — our reputation is being built on it.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v) => (
              <article key={v.title} className="card p-6">
                <h3 className="font-heading font-semibold text-[19px] text-text-base mb-2">{v.title}</h3>
                <p className="text-muted font-medium text-[15px] leading-relaxed">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WhoWeHelp />
      <CTABand
        title="Meet us before you commit to anything."
        body="The discovery call is 30 minutes with the person who'd actually do the work. Free, no pitch, and an honest read on whether we can help."
      />
    </>
  )
}
