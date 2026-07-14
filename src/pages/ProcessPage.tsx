import usePageMeta from '../hooks/usePageMeta'
import PageHeader from '../components/PageHeader'
import CTABand from '../components/CTABand'
import ProcessJourney from '../components/ProcessJourney'

export default function ProcessPage() {
  usePageMeta(
    'Our Process: Fixed-Scope Analytics Consulting',
    'How a Stratos engagement works: free discovery call, fixed-fee data assessment, fixed-scope build, implementation and training, and optional month-to-month optimization.',
    { breadcrumb: 'Our Process' },
  )

  return (
    <>
      <PageHeader
        eyebrow="Our Process"
        title={
          <>
            Low risk by design, <span className="gradient-text">every step of the way.</span>
          </>
        }
        lede="Each phase is scoped and priced before it starts, ends with something you own, and earns the next one. You can stop after any step and keep everything produced so far."
      />

      <section className="relative overflow-hidden section-sm bg-bg">
        <div className="pointer-events-none absolute inset-0 dot-grid" aria-hidden="true" />

        <div className="relative container-page">
          <ProcessJourney />

          {/* Principles strip: three promises, one line each. */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: 'Fixed scope, fixed price', body: 'Quoted before it starts. No open-ended billing.' },
              { title: 'You own everything', body: 'Dashboards, models, code, docs. Even if we part ways.' },
              { title: 'Stop anywhere', body: 'Each phase stands alone, and has to earn the next.' },
            ].map((p) => (
              <div key={p.title} className="card p-6 text-center" data-reveal>
                <h3 className="t-h5 text-text-base mb-2">{p.title}</h3>
                <p className="text-muted font-medium text-caption">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Step one is free." body="The discovery call costs nothing and decides everything else. 30 minutes, no pitch, and an honest answer about fit." />
    </>
  )
}
