import { ReactNode } from 'react'

/**
 * Chart palette — validated for the dark surface (#0d1526): lightness band,
 * chroma floor, CVD adjacent-pair separation, and 3:1 contrast all pass.
 * Brand green #27e0a0 is intentionally NOT used for marks (too light on this
 * surface); #0fa96f is its chart-safe step. Status colors are reserved for
 * state (healthy/watch/serious) and never double as series colors.
 */
export const CHART = {
  surface: '#0d1526',
  panel: 'rgba(255,255,255,0.04)',
  panelBorder: 'rgba(255,255,255,0.09)',
  grid: 'rgba(255,255,255,0.07)',
  blue: '#2f8fff',
  green: '#0fa96f',
  violet: '#8b5cf6',
  amber: '#d97706',
  status: { good: '#0fa96f', warn: '#d97706', serious: '#e0504f' },
  textMuted: '#a8b8cc',
  textFaint: '#5e6a7e',
}

/** Window chrome + prominent fictional-data label around every sample dashboard. */
export function DashFrame({ filename, children }: { filename: string; children: ReactNode }) {
  return (
    <div
      className="rounded-card-lg overflow-hidden w-full"
      style={{
        background: CHART.surface,
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.45), 0 0 50px rgba(47,143,255,0.06)',
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.25)' }}
      >
        <span className="w-[11px] h-[11px] rounded-full bg-red-400 opacity-80 flex-shrink-0" />
        <span className="w-[11px] h-[11px] rounded-full bg-yellow-400 opacity-80 flex-shrink-0" />
        <span className="w-[11px] h-[11px] rounded-full bg-green-400 opacity-80 flex-shrink-0" />
        <span className="font-mono text-[12px] text-muted ml-2 tracking-wide truncate">{filename}</span>
        <span
          className="ml-auto font-mono text-[9px] uppercase tracking-[0.12em] font-bold px-2 py-[3px] rounded-[5px] flex-shrink-0"
          style={{ background: 'rgba(217,119,6,0.16)', border: '1px solid rgba(217,119,6,0.4)', color: '#f0a83f' }}
        >
          Sample · Fictional Data
        </span>
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  )
}

export function Panel({ title, children, right }: { title: string; children: ReactNode; right?: ReactNode }) {
  return (
    <div
      className="rounded-[10px] p-3"
      style={{ background: CHART.panel, border: `1px solid ${CHART.panelBorder}` }}
    >
      <div className="flex items-center justify-between mb-2 gap-2">
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">{title}</p>
        {right}
      </div>
      {children}
    </div>
  )
}

export function KpiTile({
  label,
  value,
  delta,
  good,
}: {
  label: string
  value: string
  delta?: string
  good?: boolean
}) {
  return (
    <div
      className="rounded-[10px] p-3"
      style={{ background: CHART.panel, border: `1px solid ${CHART.panelBorder}` }}
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint mb-1 truncate">{label}</p>
      <div className="flex items-end gap-[6px] flex-wrap">
        <span className="font-heading font-bold text-[19px] leading-none text-text-base">{value}</span>
        {delta && (
          <span
            className="font-mono text-[10px] font-bold mb-[1px]"
            style={{ color: good === false ? CHART.status.serious : CHART.status.good }}
          >
            {delta}
          </span>
        )}
      </div>
    </div>
  )
}

export function LegendKey({ items }: { items: { label: string; color: string; dashed?: boolean }[] }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-1 font-mono text-[8px] text-faint">
          <span
            className="inline-block w-3 h-[2px] rounded"
            style={
              it.dashed
                ? { backgroundImage: `linear-gradient(90deg, ${it.color} 60%, transparent 60%)`, backgroundSize: '5px 2px' }
                : { background: it.color }
            }
          />
          {it.label}
        </span>
      ))}
    </div>
  )
}

/** Horizontal bar row: label · thin bar with rounded data end · value at tip. */
export function BarRowH({
  label,
  value,
  pct,
  color,
  title,
}: {
  label: string
  value: string
  pct: number // 0–100 of the widest bar
  color: string
  title?: string
}) {
  return (
    <div className="flex items-center gap-2" title={title ?? `${label}: ${value}`}>
      <span className="font-mono text-[9px] text-muted w-[92px] truncate flex-shrink-0">{label}</span>
      <div className="flex-1 h-[10px] relative">
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: `${pct}%`, background: color, borderRadius: '0 4px 4px 0', minWidth: 3 }}
        />
      </div>
      <span className="font-mono text-[9px] text-muted w-[46px] text-right flex-shrink-0">{value}</span>
    </div>
  )
}

/** Multi-series line/area chart with hairline grid, 2px lines, ringed end-dots. */
export function MiniLine({
  series,
  height = 84,
  min,
  max,
  areaFirst = true,
}: {
  series: { points: number[]; color: string; dashed?: boolean; label: string }[]
  height?: number
  min?: number
  max?: number
  areaFirst?: boolean
}) {
  const w = 300
  const h = 80
  const pad = 6
  const all = series.flatMap((s) => s.points)
  const lo = min ?? Math.min(...all)
  const hi = max ?? Math.max(...all)
  const range = hi - lo || 1

  const xy = (v: number, i: number, n: number): [number, number] => [
    pad + (i / (n - 1)) * (w - pad * 2),
    h - pad - ((v - lo) / range) * (h - pad * 2),
  ]
  const toPath = (pts: number[]) =>
    pts.map((v, i) => {
      const [x, y] = xy(v, i, pts.length)
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    }).join(' ')

  const gridYs = [0.25, 0.5, 0.75].map((f) => pad + f * (h - pad * 2))

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height, display: 'block' }} aria-hidden="true">
      {gridYs.map((y) => (
        <line key={y} x1={pad} y1={y} x2={w - pad} y2={y} stroke={CHART.grid} strokeWidth="1" />
      ))}
      {areaFirst && series[0] && (
        <path
          d={`${toPath(series[0].points)} L ${(w - pad).toFixed(1)} ${h - pad} L ${pad} ${h - pad} Z`}
          fill={series[0].color}
          opacity="0.1"
        />
      )}
      {series.map((s) => (
        <path
          key={s.label}
          d={toPath(s.points)}
          fill="none"
          stroke={s.color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={s.dashed ? '5 4' : undefined}
        />
      ))}
      {series.map((s) => {
        const [cx, cy] = xy(s.points[s.points.length - 1], s.points.length - 1, s.points.length)
        return <circle key={s.label} cx={cx} cy={cy} r="4" fill={s.color} stroke={CHART.surface} strokeWidth="2" />
      })}
    </svg>
  )
}

/** Vertical columns: 2px surface gaps, 4px rounded caps, optional per-column color. */
export function MiniCols({
  values,
  colors,
  labels,
  height = 72,
  highlightLast = false,
}: {
  values: number[]
  colors?: string[]
  labels?: string[]
  height?: number
  highlightLast?: boolean
}) {
  const maxV = Math.max(...values)
  return (
    <div>
      <div className="flex items-end gap-[2px]" style={{ height }}>
        {values.map((v, i) => (
          <div key={i} className="flex-1 h-full flex items-end justify-center" title={labels ? `${labels[i]}: ${v}` : String(v)}>
            <div
              className="w-full"
              style={{
                height: `${(v / maxV) * 100}%`,
                background:
                  colors?.[i] ?? (highlightLast && i === values.length - 1 ? CHART.green : CHART.blue),
                borderRadius: '4px 4px 0 0',
                maxWidth: 24,
              }}
            />
          </div>
        ))}
      </div>
      {labels && (
        <div className="flex gap-[2px] mt-1">
          {labels.map((l, i) => (
            <span key={i} className="flex-1 text-center font-mono text-[7px] text-faint whitespace-nowrap overflow-visible">
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
