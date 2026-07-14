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
            You just spent years and real money getting onto your ERP. The last thing you want to hear is
            that the fix starts with leaving it. It doesn't. Your systems already collect what we need:
            orders, receipts, invoices, adjustments. We connect to them and leave them alone.
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
