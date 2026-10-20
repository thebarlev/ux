import { Heebo } from "next/font/google"

import { HomeBehaviors } from "./HomeBehaviors"
import { A11Y_COPY } from "./home.config"
import { HOME_FAQ_EN, HOME_HTML_EN } from "./markup.en"
import { HOME_FAQ_HE, HOME_HTML_HE } from "./markup.he"
import { PRICING_FAQ_EN, PRICING_HTML_EN } from "./pricing-markup.en"
import { PRICING_FAQ_HE, PRICING_HTML_HE } from "./pricing-markup.he"
import { CONTACT_HTML_EN } from "./contact-markup.en"
import { CONTACT_HTML_HE } from "./contact-markup.he"

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
} as const

const ROOT = { home: "uxh", pricing: "uxp", contact: "uxc" } as const

/**
 * A page built from the approved sheets: home (uxb-009 HE, uxb-010 EN),
 * pricing (uxb-011 HE, uxb-012 EN) or contact (uxb-013 HE, uxb-014 EN). The whole page, hero demo included, is
 * server-rendered HTML, so it shows before any JS runs; HomeBehaviors then adds
 * the motion and interactions.
 */
export function HomePage({ lang, page = "home" }: { lang: "he" | "en"; page?: keyof typeof SOURCE }) {
  const { html, faq } = SOURCE[page][lang]
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
