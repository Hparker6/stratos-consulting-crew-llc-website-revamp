import { useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import HeroDashboard, { type DashView } from './HeroDashboard'

const tabs: { id: DashView; label: string; caption: string; icon: JSX.Element }[] = [
  {
    id: 'overview',
    label: 'Executive Overview',
    caption: 'Every number that runs the business on one screen — revenue, margin, turns, fill rate — refreshed overnight, drillable to a single SKU.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'forecast',
    label: 'Forecasting',
    caption: 'Statistical demand forecasts, tracked openly for accuracy, that tell purchasing exactly what to buy and when the seasonal window closes.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 8-9" /><path d="M17 6h4v4" />
      </svg>
    ),
  },
  {
    id: 'inventory',
    label: 'Inventory',
    caption: 'The cash trapped in slow-moving stock, the dead inventory to clear, and the reorder points that keep the fast movers on the shelf.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M12 3v18M4 7.5l8 4.5 8-4.5" />
      </svg>
    ),
  },
]

export default function DashboardPreview() {
  const [active, setActive] = useState<DashView>('overview')
  const current = tabs.find((t) => t.id === active) ?? tabs[0]

  // ARIA tabs keyboard support: arrows/Home/End move between tabs and activate.
  function onTabKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const ids = tabs.map((t) => t.id)
    const cur = ids.indexOf(active)
    let next = cur
    if (e.key === 'ArrowRight') next = (cur + 1) % ids.length
    else if (e.key === 'ArrowLeft') next = (cur - 1 + ids.length) % ids.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = ids.length - 1
    else return
    e.preventDefault()
    setActive(ids[next])
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
  }

  return (
    <section id="dashboard" className="section bg-bg border-t-hairline">
      <div className="container-page">
        <header className="max-w-2xl" data-reveal>
          <div className="chapter">
            <span className="chapter-index">◇</span>
            <span className="eyebrow text-primary">What you get</span>
          </div>
          <h2 className="t-h2 mt-6 max-w-[18ch]">
            The same screens we'd{' '}
            <em className="emph">build for you.</em>
          </h2>
          <p className="mt-5 text-muted font-medium text-body-lg leading-relaxed max-w-[54ch]">
            Not a template. Every view is built on your ERP, accounting, and inventory data — one place
            your team already trusts, refreshed while you sleep.
          </p>
        </header>

        {/* Tab bar — switch product views, Ashby-style. */}
        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Dashboard views" onKeyDown={onTabKeyDown}>
          {tabs.map((t) => {
            const on = t.id === active
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={on}
                aria-controls="dashboard-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(t.id)}
                className={`tab-pill inline-flex items-center gap-2 rounded-full px-4 py-2 font-heading font-semibold text-[14px] ${on ? 'is-active' : ''}`}
              >
                <span className={on ? 'text-btn-dark' : 'text-primary'}>{t.icon}</span>
                {t.label}
              </button>
            )
          })}
        </div>

        <div
          id="dashboard-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="mt-8 grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-10 lg:gap-14 items-center"
        >
          {/* Product view — re-keyed so entrance motion replays on tab change. */}
          <div className="relative flex justify-center lg:justify-start" data-reveal>
            <div className="relative w-full max-w-[680px]">
              <div className="dash-underglow" aria-hidden="true" />
              <div key={active} className="relative z-10 dash-swap">
                <HeroDashboard view={active} />
              </div>
            </div>
          </div>

          {/* Caption for the active view. */}
          <div className="lg:pl-6 lg:border-l border-[var(--line)]">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-secondary mb-3">{current.label}</p>
            <p className="text-text-base font-medium text-body-lg leading-relaxed">{current.caption}</p>
            <Link
              to="/solutions"
              className="inline-flex mt-6 link-underline"
              data-track="dashboard_interaction"
              data-track-label="home_preview_to_solutions"
            >
              See six sample dashboards →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
