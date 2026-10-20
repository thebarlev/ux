import { Fragment } from "react"

import type { Lang } from "../chrome"
import { VisualBlock, type Visual } from "./visuals"

type Part = string | readonly { type: "text" | "link"; text: string; href?: string }[]
export type GuideLike = {
  heroIntro: string
  sections: readonly {
    id: string
    title: string
    paragraphs: readonly Part[]
    bullets?: readonly string[]
    links?: readonly { label: string; href: string; description: string }[]
    visual?: Visual
  }[]
  faq: readonly { id: string; question: string; answer: string }[]
}

const FAQ_TITLE = { he: "שאלות נפוצות", en: "Frequently asked questions" } as const

function Paragraph({ p }: { p: Part }) {
  if (typeof p === "string") return <p>{p}</p>
  return (
    <p>
      {p.map((x, i) => (x.type === "link" && x.href ? <a key={i} href={x.href}>{x.text}</a> : <Fragment key={i}>{x.text}</Fragment>))}
    </p>
  )
}

/** A growth guide's sections, visuals and FAQ in the article template (tbl-024b). */
export function GuideBody({ guide, lang }: { guide: GuideLike; lang: Lang }) {
  return (
    <>
      {guide.sections.map((s) => (
        <section key={s.id} id={s.id}>
          <h2>{s.title}</h2>
          {s.paragraphs.map((p, i) => (
            <Paragraph key={i} p={p} />
          ))}
          {s.bullets?.length ? (
            <ul>
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          {s.links?.length ? (
            <ul>
              {s.links.map((l) => (
                <li key={l.href + l.label}>
                  <a href={l.href}>{l.label}</a>: {l.description}
                </li>
              ))}
            </ul>
          ) : null}
          {s.visual ? <VisualBlock v={s.visual} /> : null}
        </section>
      ))}
      {guide.faq.length > 0 ? (
        <section id="faq">
          <h2>{FAQ_TITLE[lang]}</h2>
          {guide.faq.map((f) => (
            <Fragment key={f.id}>
              <h3>{f.question}</h3>
              <p>{f.answer}</p>
            </Fragment>
          ))}
        </section>
      ) : null}
    </>
  )
}

/** The guide's contents list: its sections and the FAQ. */
export function guideToc(guide: GuideLike, lang: Lang) {
  return [...guide.sections.map((s) => ({ id: s.id, text: s.title })), ...(guide.faq.length ? [{ id: "faq", text: FAQ_TITLE[lang] }] : [])]
}

/** Reading time from the guide's own words (200 a minute, like the articles). */
export function guideMinutes(guide: GuideLike) {
  const txt = (p: Part) => (typeof p === "string" ? p : p.map((x) => x.text).join(""))
  const words = [guide.heroIntro, ...guide.sections.flatMap((s) => [s.title, ...s.paragraphs.map(txt), ...(s.bullets ?? [])]), ...guide.faq.flatMap((f) => [f.question, f.answer])]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
