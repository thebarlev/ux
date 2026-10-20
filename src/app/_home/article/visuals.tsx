import type { CSSProperties, ReactNode } from "react"

/**
 * The article template's visuals (uxb-020, tbl-024b): three icon cards, a
 * table that scrolls inside its box on mobile, a bar chart that fills when it
 * scrolls into view (HomeBehaviors adds .in; static with reduced motion) and a
 * 3-step timeline. Used from the MDX articles and from the growth guides' data.
 * Styles come from the article page's CSS (src/app/_home/article.{he,en}.css).
 * Charts may only show numbers that are already in the text.
 */

const ICONS = {
  layout: <path d="M4 6h16M4 12h10M4 18h7" />,
  shield: <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.3-4.3" />
    </>
  ),
  speed: <path d="M12 13l4-4M5.6 19a8 8 0 1 1 12.8 0" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  chat: <path d="M5 5h14v10H9l-4 4z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5M16 5.5a3.5 3.5 0 0 1 0 6.5M18 14.3c1.6.7 2.7 2.3 3 4.7" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  chart: <path d="M5 19V11M12 19V5M19 19v-6" />,
  link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
  bolt: <path d="M13 3L5 13.5h6L10 21l8-10.5h-6z" />,
} as const

export type IconName = keyof typeof ICONS

export type TrioItem = { icon: IconName; title: string; text: string }
export type Bar = { label: string; from?: number; to: number; value: string }
export type Step = { when: string; title: string; text: string }

/** A visual in data form (growth guides). */
export type Visual =
  | { kind: "trio"; items: readonly TrioItem[] }
  | { kind: "table"; caption?: string; head: readonly string[]; rows: readonly (readonly string[])[] }
  | { kind: "chart"; caption: string; bars: readonly Bar[] }
  | { kind: "timeline"; steps: readonly Step[] }

export function Trio({ items }: { items: readonly TrioItem[] }) {
  return (
    <div className="ar-trio">
      {items.map((it) => (
        <div key={it.title}>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {ICONS[it.icon]}
            </svg>
          </span>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </div>
      ))}
    </div>
  )
}

export function DataTable({ head, rows, caption }: { head: readonly string[]; rows: readonly (readonly string[])[]; caption?: string }) {
  return (
    // the box scrolls on narrow screens; it gets focus so the keyboard can scroll it too
    <div className="ar-tbl" tabIndex={0} role="region" aria-label={caption ?? head.join(", ")}>
      <table>
        {caption && <caption className="ar-cap">{caption}</caption>}
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function BarChart({ caption, bars }: { caption: string; bars: readonly Bar[] }) {
  return (
    <figure className="ar-chart">
      <figcaption>{caption}</figcaption>
      {bars.map((b) => (
        <div className="ar-bar" key={b.label}>
          <span>{b.label}</span>
          <i style={{ "--a": `${b.from ?? 0}%`, "--b": `${b.to}%` } as CSSProperties} aria-hidden="true" />
          <em>{b.value}</em>
        </div>
      ))}
    </figure>
  )
}

export function Timeline({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="ar-tl">
      {steps.map((s) => (
        <li key={s.title}>
          <b>{s.when}</b>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  )
}

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="ar-note" role="note">
      {title && <b>{title}</b>}
      <div>{children}</div>
    </div>
  )
}

export function VisualBlock({ v }: { v: Visual }) {
  switch (v.kind) {
    case "trio":
      return <Trio items={v.items} />
    case "table":
      return <DataTable head={v.head} rows={v.rows} caption={v.caption} />
    case "chart":
      return <BarChart caption={v.caption} bars={v.bars} />
    case "timeline":
      return <Timeline steps={v.steps} />
  }
}
