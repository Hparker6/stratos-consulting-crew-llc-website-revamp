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
    <section
      className="py-16 lg:py-20"
      style={{ background: '#0c1a30', borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="max-w-2xl">
          <p className="eyebrow text-primary mb-3">Your systems</p>
          <h2 className="font-heading font-bold text-[32px] md:text-[44px] tracking-[-0.02em] leading-tight">
            We build on what you already run.
          </h2>
          <p className="mt-4 text-muted font-medium text-[17px] leading-relaxed">
            Analytics work starts with the transaction data your ERP and accounting systems already
            collect: orders, receipts, invoices, adjustments. We're familiar with the data structures and
            reporting layers of the platforms common in distribution and manufacturing, and we connect to
            them rather than replace them.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {platforms.map((p) => (
            <span
              key={p}
              className="font-mono text-[12px] tracking-[0.04em] font-medium px-4 py-[9px] rounded-full text-text-base"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {p}
            </span>
          ))}
        </div>

        <p className="mt-6 text-faint font-medium text-[14px] leading-relaxed max-w-2xl">
          To be clear about what this means: familiarity with these platforms' data and reporting, not
          vendor certifications or ERP implementation services. If your system isn't listed, that's
          rarely a blocker. If it can export data, we can usually work with it.
        </p>
      </div>
    </section>
  )
}
