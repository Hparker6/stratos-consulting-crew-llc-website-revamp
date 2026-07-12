/**
 * Six sample dashboards for the gallery. Every number, customer, and vendor
 * here is fictional — invented to look like a realistic $5–50M supplier.
 * The DashFrame badge labels each one "Sample · Fictional Data".
 */
import { CHART, DashFrame, Panel, KpiTile, LegendKey, BarRowH, MiniLine, MiniCols } from './kit'

/* ---------------------------------------------------------------- 1. Executive KPIs */
export function ExecutiveKpisMock() {
  return (
    <DashFrame filename="executive-kpis.pbix">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <KpiTile label="Revenue MTD" value="$2.41M" delta="▲6.2%" />
        <KpiTile label="Gross margin" value="24.8%" delta="▲0.9pt" />
        <KpiTile label="Inventory turns" value="6.4" delta="▲0.3" />
        <KpiTile label="Fill rate" value="97.2%" delta="▲1.4pt" />
      </div>

      <Panel
        title="Revenue vs plan, trailing 12 weeks"
        right={<LegendKey items={[{ label: 'actual', color: CHART.blue }, { label: 'plan', color: CHART.violet, dashed: true }]} />}
      >
        <MiniLine
          series={[
            { label: 'actual', color: CHART.blue, points: [452, 478, 461, 502, 489, 515, 534, 521, 548, 561, 543, 588] },
            { label: 'plan', color: CHART.violet, dashed: true, points: [460, 468, 476, 484, 492, 500, 508, 516, 524, 532, 540, 548] },
          ]}
        />
      </Panel>

      <Panel title="Gross margin by product line">
        <div className="space-y-[6px]">
          <BarRowH label="Fasteners" value="31.2%" pct={100} color={CHART.blue} />
          <BarRowH label="Electrical" value="27.6%" pct={88} color={CHART.blue} />
          <BarRowH label="Safety/PPE" value="24.1%" pct={77} color={CHART.blue} />
          <BarRowH label="Abrasives" value="21.8%" pct={70} color={CHART.blue} />
          <BarRowH label="Pipe & valve" value="17.3%" pct={55} color={CHART.blue} />
        </div>
      </Panel>
    </DashFrame>
  )
}

/* ------------------------------------------------------- 2. Customer Profitability */
export function CustomerProfitabilityMock() {
  return (
    <DashFrame filename="customer-profitability.pbix">
      <div className="grid grid-cols-3 gap-2">
        <KpiTile label="Gross profit YTD" value="$1.86M" delta="▲5.4%" />
        <KpiTile label="Top-10 GP share" value="62%" />
        <KpiTile label="Below break-even" value="14 accts" delta="▼3" good />
      </div>

      <Panel title="Top customers by gross profit (cost-to-serve adjusted)">
        <div className="space-y-[6px]">
          <BarRowH label="Caldwell Mech." value="$214K" pct={100} color={CHART.blue} />
          <BarRowH label="Summit Fab" value="$186K" pct={87} color={CHART.blue} />
          <BarRowH label="Bluebonnet Elec." value="$149K" pct={70} color={CHART.blue} />
          <BarRowH label="Rio Verde Bldrs" value="$121K" pct={57} color={CHART.blue} />
          <BarRowH label="Lakeline HVAC" value="$98K" pct={46} color={CHART.blue} />
        </div>
      </Panel>

      <Panel
        title="Accounts needing a pricing conversation"
        right={<LegendKey items={[{ label: 'negative margin', color: CHART.status.serious }, { label: 'thin margin', color: CHART.status.warn }]} />}
      >
        <div className="space-y-[6px]">
          <BarRowH label="Pantera Coatings" value="-$18K" pct={52} color={CHART.status.serious} title="Pantera Coatings: -$18K after freight & returns" />
          <BarRowH label="Ridgetop Const." value="-$9K" pct={28} color={CHART.status.serious} title="Ridgetop Construction: -$9K after cost-to-serve" />
          <BarRowH label="Mesa Industrial" value="+$4K" pct={13} color={CHART.status.warn} title="Mesa Industrial: barely above break-even" />
        </div>
      </Panel>
    </DashFrame>
  )
}

/* ------------------------------------------------------- 3. Inventory Optimization */
function StockHealthRow({ label, healthy, excess, dead }: { label: string; healthy: number; excess: number; dead: number }) {
  const total = healthy + excess + dead
  return (
    <div className="flex items-center gap-2" title={`${label}: ${healthy}% healthy · ${excess}% excess · ${dead}% dead`}>
      <span className="font-mono text-[9px] text-muted w-[92px] truncate flex-shrink-0">{label}</span>
      <div className="flex-1 flex h-[10px]" style={{ gap: 2 }}>
        <div style={{ width: `${(healthy / total) * 100}%`, background: CHART.status.good, borderRadius: '2px' }} />
        <div style={{ width: `${(excess / total) * 100}%`, background: CHART.status.warn, borderRadius: '2px' }} />
        <div style={{ width: `${(dead / total) * 100}%`, background: CHART.status.serious, borderRadius: '2px' }} />
      </div>
    </div>
  )
}

export function InventoryOptimizationMock() {
  return (
    <DashFrame filename="inventory-health.pbix">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <KpiTile label="Excess stock" value="$182K" delta="▼$41K" />
        <KpiTile label="Dead stock" value="$46K" delta="▼$8K" />
        <KpiTile label="Stockout-risk SKUs" value="23" delta="▼6" />
        <KpiTile label="Turns (blended)" value="6.4" delta="▲0.3" />
      </div>

      <Panel
        title="Stock health by category, % of inventory value"
        right={
          <LegendKey
            items={[
              { label: 'healthy', color: CHART.status.good },
              { label: 'excess', color: CHART.status.warn },
              { label: 'dead', color: CHART.status.serious },
            ]}
          />
        }
      >
        <div className="space-y-[6px]">
          <StockHealthRow label="Fasteners" healthy={78} excess={17} dead={5} />
          <StockHealthRow label="Electrical" healthy={71} excess={21} dead={8} />
          <StockHealthRow label="Abrasives" healthy={64} excess={26} dead={10} />
          <StockHealthRow label="Safety/PPE" healthy={82} excess={14} dead={4} />
          <StockHealthRow label="Pipe & valve" healthy={57} excess={29} dead={14} />
        </div>
      </Panel>

      <Panel title="Inventory value by age of last sale">
        <MiniCols
          values={[624, 288, 146, 82]}
          labels={['0–90d', '91–180d', '181–365d', '365d+']}
          colors={[CHART.status.good, CHART.blue, CHART.status.warn, CHART.status.serious]}
          height={64}
        />
      </Panel>
    </DashFrame>
  )
}

/* ---------------------------------------------------------- 4. Demand Forecasting */
export function DemandForecastingMock() {
  return (
    <DashFrame filename="demand-forecast.pbix">
      <div className="grid grid-cols-3 gap-2">
        <KpiTile label="Forecast error (MAPE)" value="8.4%" delta="▼1.1pt" />
        <KpiTile label="Forecast bias" value="+1.2%" />
        <KpiTile label="Horizon" value="12 wk" />
      </div>

      <Panel
        title="Units sold, actual vs forecast, next quarter projected"
        right={<LegendKey items={[{ label: 'actual', color: CHART.blue }, { label: 'forecast', color: CHART.green, dashed: true }]} />}
      >
        <MiniLine
          series={[
            { label: 'actual', color: CHART.blue, points: [38, 42, 35, 48, 44, 52, 56, 50, 60, 65, 58, 70] },
            { label: 'forecast', color: CHART.green, dashed: true, points: [40, 43, 38, 46, 46, 51, 55, 52, 61, 63, 60, 72] },
          ]}
          height={92}
        />
      </Panel>

      <Panel title="Seasonality index by month (100 = average)">
        <MiniCols
          values={[84, 78, 96, 108, 118, 124, 121, 112, 104, 98, 86, 71]}
          labels={['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']}
          height={56}
        />
      </Panel>
    </DashFrame>
  )
}

/* -------------------------------------------------------- 5. Purchasing Analytics */
export function PurchasingAnalyticsMock() {
  return (
    <DashFrame filename="purchasing-vendors.pbix">
      <div className="grid grid-cols-3 gap-2">
        <KpiTile label="On-time delivery" value="91.3%" delta="▲2.1pt" />
        <KpiTile label="Avg lead time" value="12.4d" delta="▼0.8d" />
        <KpiTile label="Open PO value" value="$342K" />
      </div>

      <Panel title="Spend by vendor, trailing 12 months">
        <div className="space-y-[6px]">
          <BarRowH label="Vulcan Fastener" value="$486K" pct={100} color={CHART.blue} />
          <BarRowH label="Redbird Elec." value="$371K" pct={76} color={CHART.blue} />
          <BarRowH label="Alamo Bearing" value="$264K" pct={54} color={CHART.blue} />
          <BarRowH label="Lone Star Safety" value="$208K" pct={43} color={CHART.blue} />
          <BarRowH label="Gulfline Pipe" value="$154K" pct={32} color={CHART.blue} />
        </div>
      </Panel>

      <Panel
        title="Vendor on-time delivery, trailing 90 days"
        right={
          <LegendKey
            items={[
              { label: '≥95%', color: CHART.status.good },
              { label: '85–95%', color: CHART.status.warn },
              { label: '<85%', color: CHART.status.serious },
            ]}
          />
        }
      >
        <div className="space-y-[6px]">
          <BarRowH label="Lone Star Safety" value="98%" pct={98} color={CHART.status.good} />
          <BarRowH label="Vulcan Fastener" value="96%" pct={96} color={CHART.status.good} />
          <BarRowH label="Alamo Bearing" value="91%" pct={91} color={CHART.status.warn} />
          <BarRowH label="Redbird Elec." value="88%" pct={88} color={CHART.status.warn} />
          <BarRowH label="Gulfline Pipe" value="79%" pct={79} color={CHART.status.serious} title="Gulfline Pipe: 79% on-time, lead times drifting 3 weeks" />
        </div>
      </Panel>
    </DashFrame>
  )
}

/* ------------------------------------------------------------- 6. Sales Reporting */
export function SalesReportingMock() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const repeat = [312, 298, 341, 336, 358, 371]
  const fresh = [64, 58, 79, 88, 96, 104]
  const maxTotal = Math.max(...months.map((_, i) => repeat[i] + fresh[i]))
  return (
    <DashFrame filename="sales-performance.pbix">
      <div className="grid grid-cols-3 gap-2">
        <KpiTile label="Bookings MTD" value="$612K" delta="▲4.8%" />
        <KpiTile label="Avg order value" value="$1,940" delta="▲3.1%" />
        <KpiTile label="Active accounts" value="284" delta="▲12" />
      </div>

      <Panel
        title="Monthly revenue, this year vs last"
        right={<LegendKey items={[{ label: 'this year', color: CHART.blue }, { label: 'last year', color: CHART.violet, dashed: true }]} />}
      >
        <MiniLine
          series={[
            { label: 'this year', color: CHART.blue, points: [376, 356, 420, 424, 454, 475] },
            { label: 'last year', color: CHART.violet, dashed: true, points: [351, 342, 388, 396, 402, 419] },
          ]}
        />
      </Panel>

      <Panel
        title="Revenue mix, repeat vs new customers ($K)"
        right={<LegendKey items={[{ label: 'repeat', color: CHART.blue }, { label: 'new', color: CHART.green }]} />}
      >
        <div className="flex items-end gap-[6px]" style={{ height: 72 }}>
          {months.map((m, i) => (
            <div
              key={m}
              className="flex-1 flex flex-col justify-end"
              style={{ maxWidth: 34, gap: 2 }}
              title={`${m}: $${repeat[i]}K repeat · $${fresh[i]}K new`}
            >
              <div style={{ height: `${(fresh[i] / maxTotal) * 100}%`, background: CHART.green, borderRadius: '4px 4px 2px 2px' }} />
              <div style={{ height: `${(repeat[i] / maxTotal) * 100}%`, background: CHART.blue, borderRadius: '2px' }} />
            </div>
          ))}
        </div>
        <div className="flex gap-[6px] mt-1">
          {months.map((m) => (
            <span key={m} className="flex-1 text-center font-mono text-[7px] text-faint" style={{ maxWidth: 34 }}>
              {m}
            </span>
          ))}
        </div>
      </Panel>
    </DashFrame>
  )
}
