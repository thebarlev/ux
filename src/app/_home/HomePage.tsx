import { Heebo } from "next/font/google"

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

// Heebo, Hebrew + Latin, only the weights the design uses; next/font preloads
// them and serves them with font-display: swap.
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heebo",
})

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
} as const

const ROOT = { home: "uxh", pricing: "uxp", contact: "uxc", faq: "uxf", text: "uxt" } as const

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
export function HomePage({
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
  if (page === "text") {
    if (!legal || !paths) throw new Error("text page needs its text and paths")
    html = fillText(html, legal, paths)
  }
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
      <HomeBehaviors lang={lang} rootId={rootId} />
    </>
  )
}
