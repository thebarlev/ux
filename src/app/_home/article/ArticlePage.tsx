import type { ReactNode } from "react"

import { ARTICLE_HTML_EN, ARTICLE_PARTS_EN } from "../article-markup.en"
import { ARTICLE_HTML_HE, ARTICLE_PARTS_HE } from "../article-markup.he"
import type { Card } from "../blog-data"
import { crumbHtml, crumbLd, esc, fill, markCurrent, type Crumb, type Lang } from "../chrome"
import { heebo } from "../font"
import { HomeBehaviors } from "../HomeBehaviors"
import { OURS, OURS_COPY } from "./ours"

const SOURCE = {
  he: { html: ARTICLE_HTML_HE, card: ARTICLE_PARTS_HE.card, ours: ARTICLE_PARTS_HE.ours, item: ARTICLE_PARTS_HE.ours_item },
  en: { html: ARTICLE_HTML_EN, card: ARTICLE_PARTS_EN.card, ours: ARTICLE_PARTS_EN.ours, item: ARTICLE_PARTS_EN.ours_item },
} as const

const COPY = {
  he: {
    toc: "במאמר הזה",
    blog: { rel: 'עוד <span class="bl">מאמרים.</span>', all: "לכל המאמרים", crumb: "מאמרים" },
    guide: { rel: 'עוד <span class="bl">מדריכים.</span>', all: "לכל המדריכים", crumb: "מדריכי צמיחה" },
  },
  en: {
    toc: "In this article",
    blog: { rel: 'More <span class="bl">articles.</span>', all: "All articles", crumb: "Blog" },
    guide: { rel: 'More <span class="bl">guides.</span>', all: "All guides", crumb: "Growth guides" },
  },
} as const

/** The title with its last part in blue: after the colon if it has one, otherwise the last word. */
function titleParts(title: string): [string, string] {
  const t = title.replace(/\s*\|\s*Uxellent\s*$/, "")
  const c = t.indexOf(":")
  if (c > 0 && c < t.length - 1) return [t.slice(0, c + 1) + " ", t.slice(c + 1).trim()]
  const k = t.lastIndexOf(" ")
  return k > 0 ? [t.slice(0, k + 1), t.slice(k + 1)] : ["", t]
}

/** "With UXellent" (v4): this article's lead and three points, or nothing if it has none. */
function oursHtml(lang: Lang, slug: string) {
  const o = OURS[slug]?.[lang]
  if (!o) return ""
  const c = OURS_COPY[lang]
  const [pre, blue] = (o.h ?? c.h).split("|")
  const src = SOURCE[lang]
  return fill(src.ours, {
    OU_KICK: c.kick,
    OU_H: `${esc(pre)}<span class="bl">${esc(blue)}</span>`,
    OU_P: esc(o.p),
    OU_BTN: c.btn,
    OU_ITEMS: o.points.map(([b, t]) => fill(src.item, { B: esc(b), S: esc(t) })).join(""),
  })
}

/**
 * The article template (uxb-020 v4, approved 20.10.2026, tbl-024b / tbl-025b) for blog
 * articles and growth guides: breadcrumbs, title, subtitle, reading time and
 * tags, a sticky contents list (chips on mobile), the text, "With UXellent", two related cards
 * with a link to all, closing, footer. Header, related cards, closing and
 * footer come from the generated markup; the article itself is React.
 */
export function ArticlePage({
  lang,
  kind,
  slug,
  title,
  sub,
  readTime,
  tags,
  topic,
  toc,
  related,
  children,
}: {
  lang: Lang
  kind: "blog" | "guide"
  slug: string
  title: string
  sub?: string
  readTime: string
  tags: readonly string[]
  topic: string
  toc: readonly { id: string; text: string }[]
  related: readonly Card[]
  children: ReactNode
}) {
  const t = COPY[lang]
  const k = t[kind]
  const base = kind === "blog" ? "/blog" : "/growth-guides"
  const index = (lang === "en" ? "/en" : "") + base
  const blog = lang === "en" ? "/en/blog" : "/blog"
  const current = `${index}/${slug}`
  const crumbs: Crumb[] = [{ label: k.crumb, href: index }, { label: topic }, { label: titleParts(title).join("") }]
  const [pre, blue] = titleParts(title)
  const rootId = `uxa-${lang}`

  const html = markCurrent(SOURCE[lang].html, current, blog)
    .replace("{{HE_PATH}}", `${base}/${slug}`)
    .replace("{{EN_PATH}}", `/en${base}/${slug}`)
    .replace("{{REL_H}}", k.rel)
    .replace("{{ALL_HREF}}", index)
    .replace("{{ALL_LABEL}}", k.all)
    .replace("{{RELATED}}", related.map((c) => fill(SOURCE[lang].card, { HREF: c.href, K: c.k, T: c.t, M: c.m })).join(""))
  const [head, rest] = html.split('<main id="main" tabindex="-1">')
  const [mid, foot] = rest.split("</main>")

  return (
    <>
      <div id={rootId} className={`${rootId} ${heebo.variable}`} lang={lang} dir={lang === "he" ? "rtl" : "ltr"}>
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: head }} />
        <main id="main" tabIndex={-1}>
          <section className="sec zone ct-top" id="article">
            <div className="bg" />
            <div className="wrap">
              <div className="ar-head">
                <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: crumbHtml(lang, crumbs) }} />
                <h1 className="pr-h">
                  {pre}
                  <span className="bl">{blue}</span>
                </h1>
                {sub ? <p className="ar-sub">{sub}</p> : null}
                <p className="ar-meta">
                  <span>{readTime}</span>
                  {tags.length > 0 ? <i aria-hidden="true" /> : null}
                  {tags.map((tag) => (
                    <span className="bl-k" key={tag}>{tag}</span>
                  ))}
                </p>
              </div>
              <div className="fq lg">
                {toc.length > 0 ? (
                  <nav className="fq-nav" aria-label={t.toc} data-uxf-nav="">
                    {toc.map((h) => (
                      <a key={h.id} href={`#${h.id}`}>{h.text}</a>
                    ))}
                  </nav>
                ) : null}
                <div className="lg-body">
                  <div className="lg-s ar-body">{children}</div>
                </div>
              </div>
            </div>
          </section>
          <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: mid.replace("{{ARTICLE}}", "").replace("{{OURS}}", oursHtml(lang, slug)) }} />
        </main>
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: foot }} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd(lang, crumbs, current)) }} />
      <HomeBehaviors lang={lang} rootId={rootId} />
    </>
  )
}
