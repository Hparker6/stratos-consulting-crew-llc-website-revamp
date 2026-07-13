import usePageMeta from '../hooks/usePageMeta'
import PageHeader from '../components/PageHeader'
import { CONTACT_EMAIL, CONTACT_MAILTO } from '../lib/site'

const EFFECTIVE = 'July 12, 2026'

export default function TermsPage() {
  usePageMeta(
    'Terms of Use',
    'Terms of use for the Stratos Consulting Crew LLC website, including the status of pricing ranges, sample dashboards, and content ownership.',
    { breadcrumb: 'Terms of Use' },
  )

  return (
    <>
      <PageHeader
        eyebrow="Terms"
        title={
          <>
            The rules of this website. <span className="gradient-text">Short version.</span>
          </>
        }
        lede="These terms cover the use of this website. The work itself is governed by the written, fixed-scope agreement we sign before an engagement starts."
      />

      <section className="section bg-bg">
        <div className="container-prose">
          <p className="text-faint font-medium text-caption mb-10">Effective {EFFECTIVE}</p>

          <div className="space-y-8">
            <div>
              <h2 className="t-h4 mb-3">
                This site is information, not an offer
              </h2>
              <p className="text-muted font-medium text-body">
                Everything here is provided for general information. Nothing on this website is a binding
                offer, a contract, or professional advice for your specific situation. An engagement exists
                only once both parties sign a written agreement.
              </p>
            </div>

            <div>
              <h2 className="t-h4 mb-3">
                Pricing ranges are estimates
              </h2>
              <p className="text-muted font-medium text-body">
                The ranges shown on the pricing page are honest starting estimates, not quotes. Your actual
                price is fixed in writing after the discovery call, before any work begins, and it will not
                change unless the scope changes and you approve it.
              </p>
            </div>

            <div>
              <h2 className="t-h4 mb-3">
                Sample dashboards use sample data
              </h2>
              <p className="text-muted font-medium text-body">
                Every dashboard, chart, and metric shown on this site is built from illustrative sample data
                and is labeled as such. Nothing shown is a real client's data, and no figure on this site is
                a promise of any particular result. Analytics outcomes depend on your data and your
                decisions.
              </p>
            </div>

            <div>
              <h2 className="t-h4 mb-3">
                Content ownership
              </h2>
              <p className="text-muted font-medium text-body">
                The text, design, code, and graphics on this website belong to Stratos Consulting Crew LLC.
                Deliverables built during a client engagement are a different matter entirely: those are
                built in your systems and are yours to keep, as stated in our agreement.
              </p>
            </div>

            <div>
              <h2 className="t-h4 mb-3">
                Availability and liability
              </h2>
              <p className="text-muted font-medium text-body">
                We aim to keep this site accurate and available, but we provide it "as is" and cannot
                guarantee it is free of errors or always reachable. To the extent permitted by law, Stratos
                Consulting Crew LLC is not liable for losses arising from use of this website. This does not
                limit any obligation we take on in a signed engagement agreement.
              </p>
            </div>

            <div>
              <h2 className="t-h4 mb-3">
                Governing law and contact
              </h2>
              <p className="text-muted font-medium text-body">
                These terms are governed by the laws of the State of Texas, United States. Questions go to{' '}
                <a href={CONTACT_MAILTO} className="text-primary font-bold hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
