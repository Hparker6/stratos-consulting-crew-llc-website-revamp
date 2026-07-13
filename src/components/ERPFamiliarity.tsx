const platforms = [
  'Epicor Prophet 21',
  'Infor CloudSuite / SX.e',
  'NetSuite',
  'Microsoft Dynamics 365 Business Central',
  'SAP Business One',
  'Acumatica',
  'Fishbowl',
  'QuickBooks',
]

/**
 * ERP familiarity — deliberately worded: we work with the *data* these systems
 * produce. No certifications or implementation experience implied.
 */
export default function ERPFamiliarity() {
  return (
    <section className="section bg-elevated border-t-hairline">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow text-primary mb-3">Your systems</p>
          <h2 className="t-h2">
            We build on what you already run.
          </h2>
          <p className="mt-4 text-muted font-medium text-body-lg">
            Analytics work starts with the transaction data your ERP and accounting systems already
            collect: orders, receipts, invoices, adjustments. We're familiar with the data structures and
            reporting layers of the platforms common in distribution and manufacturing, and we connect to
            them rather than replace them.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {platforms.map((p) => (
            <span key={p} className="chip">
              {p}
            </span>
          ))}
        </div>

        <p className="mt-6 text-faint font-medium text-caption max-w-2xl">
          To be clear about what this means: familiarity with these platforms' data and reporting, not
          vendor certifications or ERP implementation services. If your system isn't listed, that's
          rarely a blocker. If it can export data, we can usually work with it.
        </p>
      </div>
    </section>
  )
}
