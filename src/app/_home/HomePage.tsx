import { articleCards, guideCards, type Card } from "./blog-data"
import { crumbHtml, crumbLd, fill, markCurrent, type Crumb } from "./chrome"
import { heebo } from "./font"
import { HomeBehaviors } from "./HomeBehaviors"
import { A11Y_COPY } from "./home.config"
import { HOME_FAQ_EN, HOME_HTML_EN } from "./markup.en"
import { HOME_FAQ_HE, HOME_HTML_HE } from "./markup.he"
import { PRICING_FAQ_EN, PRICING_HTML_EN } from "./pricing-markup.en"
import { PRICING_FAQ_HE, PRICING_HTML_HE } from "./pricing-markup.he"
import { CONTACT_HTML_EN } from "./contact-markup.en"
import { CONTACT_HTML_HE } from "./contact-markup.he"
import { FAQ_FAQ_EN, FAQ_HTML_EN } from "./faq-markup.en"
import { FAQ_FAQ_HE, FAQ_HTML_HE } from "./faq-markup.he"
import { TEXT_HTML_EN } from "./text-markup.en"
import { TEXT_HTML_HE } from "./text-markup.he"
import { BLOG_HTML_EN, BLOG_PARTS_EN } from "./blog-markup.en"
import { BLOG_HTML_HE, BLOG_PARTS_HE } from "./blog-markup.he"
import { GUIDES_HTML_EN, GUIDES_PARTS_EN } from "./guides-markup.en"
import { GUIDES_HTML_HE, GUIDES_PARTS_HE } from "./guides-markup.he"

const SOURCE = {
  home: {
    he: { html: HOME_HTML_HE, faq: HOME_FAQ_HE },
    en: { html: HOME_HTML_EN, faq: HOME_FAQ_EN },
  },
  pricing: {
    he: { html: PRICING_HTML_HE, faq: PRICING_FAQ_HE },
    en: { html: PRICING_HTML_EN, faq: PRICING_FAQ_EN },
  },
  contact: {
    he: { html: CONTACT_HTML_HE, faq: [] },
    en: { html: CONTACT_HTML_EN, faq: [] },
  },
  faq: {
    he: { html: FAQ_HTML_HE, faq: FAQ_FAQ_HE },
    en: { html: FAQ_HTML_EN, faq: FAQ_FAQ_EN },
  },
  text: {
    he: { html: TEXT_HTML_HE, faq: [] },
    en: { html: TEXT_HTML_EN, faq: [] },
  },
  blog: {
    he: { html: BLOG_HTML_HE, faq: [] },
    en: { html: BLOG_HTML_EN, faq: [] },
  },
  guides: {
    he: { html: GUIDES_HTML_HE, faq: [] },
    en: { html: GUIDES_HTML_EN, faq: [] },
  },
} as const

const PARTS = {
  blog: { he: BLOG_PARTS_HE, en: BLOG_PARTS_EN },
  guides: { he: GUIDES_PARTS_HE, en: GUIDES_PARTS_EN },
} as const

const ROOT = { home: "uxh", pricing: "uxp", contact: "uxc", faq: "uxf", text: "uxt", blog: "uxb", guides: "uxg" } as const

// Each inner page: its address in both languages and its breadcrumb label.
const PAGES = {
  pricing: { he: "/pricing", en: "/en/pricing", label: { he: "מחירים", en: "Pricing" } },
  contact: { he: "/contact", en: "/en/contact", label: { he: "צור קשר", en: "Contact" } },
  faq: { he: "/faq", en: "/en/faq", label: { he: "שאלות נפוצות", en: "FAQ" } },
  blog: { he: "/blog", en: "/en/blog", label: { he: "מאמרים", en: "Blog" } },
  guides: { he: "/growth-guides", en: "/en/growth-guides", label: { he: "מדריכי צמיחה", en: "Growth guides" } },
} as const

function cardsHtml(tpl: string, cards: readonly Card[]) {
  return cards.map((c) => fill(tpl, { HREF: c.href, K: c.k, T: c.t, P: c.p ? `<p>${c.p}</p>` : "", M: c.m, N: c.n ?? "" })).join("")
}

async function fillBlog(html: string, page: "blog" | "guides", lang: "he" | "en") {
  const parts = PARTS[page][lang]
  const guides = cardsHtml(parts.guide, guideCards(lang))
  if (page === "guides") return html.replace("{{GUIDES}}", guides)
  const [first, ...rest] = await articleCards(lang)
  const featured = fill(parts.featured, { HREF: first.href, K: first.k, T: first.t, P: first.p, M: first.m })
  return html.replace("{{FEATURED}}", featured).replace("{{CARDS}}", cardsHtml(parts.card, rest)).replace("{{GUIDES}}", guides)
}

/** A text page's own content (src/app/_home/legal), for the text-page template. */
export type LegalText = {
  readonly title: string
  readonly date: string
  readonly toc: readonly (readonly [string, string])[]
  readonly html: string
}

// Title with the last word in blue, the date, the contents (from the page's own
// headings) and the text, into the template; the language switch goes to the
// same page in the other language.
function fillText(html: string, legal: LegalText, paths: { he: string; en: string }) {
  const words = legal.title.split(" ")
  const last = words.pop()
  const title = (words.length ? words.join(" ") + " " : "") + `<span class="bl">${last}.</span>`
  const toc = legal.toc.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")
  return html
    .replace("{{TITLE}}", title)
    .replace("{{DATE}}", legal.date)
    .replace("{{TOC}}", toc)
    .replace("{{BODY}}", legal.html)
    .replace("{{HE_PATH}}", paths.he)
    .replace("{{EN_PATH}}", paths.en)
}

/**
 * A page built from the approved sheets: home (uxb-009 HE, uxb-010 EN),
 * pricing (uxb-011 HE, uxb-012 EN), contact (uxb-013 HE, uxb-014 EN), FAQ
 * (uxb-015 HE, uxb-016 EN) or a text page (template uxb-017 HE, uxb-018 EN,
 * filled with `legal`). The whole page, hero demo included, is
 * server-rendered HTML, so it shows before any JS runs; HomeBehaviors then adds
 * the motion and interactions.
 */
export async function HomePage({
  lang,
  page = "home",
  legal,
  paths,
}: {
  lang: "he" | "en"
  page?: keyof typeof SOURCE
  legal?: LegalText
  paths?: { he: string; en: string }
}) {
  const { faq } = SOURCE[page][lang]
  let html: string = SOURCE[page][lang].html
  let current: string | undefined
  let crumbs: Crumb[] = []
  if (page === "text") {
    if (!legal || !paths) throw new Error("text page needs its text and paths")
    html = fillText(html, legal, paths)
    current = paths[lang]
    crumbs = [{ label: legal.title }]
  } else if (page !== "home") {
    current = PAGES[page][lang]
    crumbs = [{ label: PAGES[page].label[lang] }]
    if (page === "blog" || page === "guides") html = await fillBlog(html, page, lang)
  }
  // the growth guides sit under the blog: its header link is marked as their section
  const section = page === "guides" ? PAGES.blog[lang] : undefined
  html = markCurrent(html, current, section).replace("{{CRUMB}}", current ? crumbHtml(lang, crumbs) : "")
  const rootId = `${ROOT[page]}-${lang}`
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
  return (
    <>
      <div
        id={rootId}
        className={`${rootId} ${heebo.variable}`}
        lang={lang}
        dir={lang === "he" ? "rtl" : "ltr"}
        dangerouslySetInnerHTML={{ __html: html.replace("{{A11Y}}", A11Y_COPY[lang]) }}
      />
      {faq.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      {current && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd(lang, crumbs, current)) }} />}
      <HomeBehaviors lang={lang} rootId={rootId} />
    </>
  )
}
