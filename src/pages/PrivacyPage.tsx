import usePageMeta from '../hooks/usePageMeta'
import PageHeader from '../components/PageHeader'
import { CONTACT_EMAIL, CONTACT_MAILTO } from '../lib/site'

const EFFECTIVE = 'July 12, 2026'

export default function PrivacyPage() {
  usePageMeta(
    'Privacy Policy',
    'How Stratos Consulting Crew LLC collects, uses, and protects information on this website, including analytics cookies and contact form submissions.',
    { breadcrumb: 'Privacy Policy' },
  )

  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title={
          <>
            What we collect. <span className="gradient-text">And what we don't.</span>
          </>
        }
        lede="We ask you to trust us with your business data, so we will not be vague about our own. This is the whole policy, in plain English."
      />

      <section className="section bg-bg">
        <div className="container-prose">
          <p className="text-faint font-medium text-caption mb-10">Effective {EFFECTIVE}</p>

          <div className="space-y-8">
            <div>
              <h2 className="t-h4 mb-3">
                Who we are
              </h2>
              <p className="text-muted font-medium text-body">
                Stratos Consulting Crew LLC is a United States analytics consultancy. This policy covers
                this website. Data we handle inside a client engagement is governed by that engagement's
                contract, not by this page.
              </p>
            </div>

            <div>
              <h2 className="t-h4 mb-3">
                What we collect
              </h2>
              <p className="text-muted font-medium text-body mb-3">
                Only two things:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-[16px] text-muted font-medium leading-relaxed">
                  <span className="text-secondary font-bold mt-[1px] flex-shrink-0">✓</span>
                  <span>
                    <strong className="text-text-base">What you type into the contact form.</strong> Your
                    name, company, email, phone, and the challenge you describe. It is delivered to us as a
                    notification and is used solely to reply to you.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-[16px] text-muted font-medium leading-relaxed">
                  <span className="text-secondary font-bold mt-[1px] flex-shrink-0">✓</span>
                  <span>
                    <strong className="text-text-base">Anonymous usage analytics — only if you allow
                    them.</strong> Which pages were viewed, how far they were scrolled, and which buttons
                    were clicked. We use Google Analytics 4 for this.
                  </span>
                </li>
              </ul>
              <p className="text-muted font-medium text-body mt-4">
                We do not run advertising or retargeting tags, we do not build advertising profiles, and we
                do not sell or share your information with anyone for their own purposes.
              </p>
            </div>

            <div>
              <h2 className="t-h4 mb-3">
                Cookies and consent
              </h2>
              <p className="text-muted font-medium text-body">
                No analytics script loads until you press "Allow" on the consent banner. If you decline, or
                if your browser sends a Global Privacy Control signal, no analytics tag is ever loaded and
                the site stays completely tag-free. Your choice is stored in your browser's local storage
                so we don't ask again. Clearing your browser data resets it.
              </p>
            </div>

            <div>
              <h2 className="t-h4 mb-3">
                Third parties
              </h2>
              <p className="text-muted font-medium text-body">
                This site is hosted by Netlify, which processes contact form submissions and keeps standard
                server logs. Google Analytics runs only with your consent, as described above. If you book
                through our scheduling link, that booking is handled by our scheduling provider under their
                own privacy policy.
              </p>
            </div>

            <div>
              <h2 className="t-h4 mb-3">
                Retention and your rights
              </h2>
              <p className="text-muted font-medium text-body">
                Contact form submissions are kept only as long as needed to follow up on your inquiry and
                for our business records. You may ask us to access, correct, or delete anything you have
                sent us. You can change or withdraw your analytics consent at any time using the{' '}
                <strong className="text-text-base">Cookie settings</strong> link at the bottom of any page.
                Email{' '}
                <a href={CONTACT_MAILTO} className="text-primary font-bold hover:underline">
                  {CONTACT_EMAIL}
                </a>{' '}
                and we will action the request. There is no form to fill out and no hoops to jump through.
              </p>
            </div>

            <div>
              <h2 className="t-h4 mb-3">
                Changes
              </h2>
              <p className="text-muted font-medium text-body">
                If this policy changes materially, we will update the effective date above. Questions go to{' '}
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
