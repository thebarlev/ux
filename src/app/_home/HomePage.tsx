import { Heebo } from "next/font/google"

import { HomeBehaviors } from "./HomeBehaviors"
import { A11Y_COPY } from "./home.config"
import { HOME_FAQ_EN, HOME_HTML_EN } from "./markup.en"
import { HOME_FAQ_HE, HOME_HTML_HE } from "./markup.he"

// Heebo, Hebrew + Latin, only the weights the design uses; next/font preloads
// them and serves them with font-display: swap.
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heebo",
})

const SOURCE = {
  he: { html: HOME_HTML_HE, faq: HOME_FAQ_HE },
  en: { html: HOME_HTML_EN, faq: HOME_FAQ_EN },
} as const

/**
 * The home page from the approved sheets (uxb-009 HE, uxb-010 EN). The whole
 * page, hero demo included, is server-rendered HTML, so it shows before any JS
 * runs; HomeBehaviors then adds the motion and interactions.
 */
export function HomePage({ lang }: { lang: "he" | "en" }) {
  const { html, faq } = SOURCE[lang]
  const rootId = `uxh-${lang}`
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
        className={`uxh-${lang} ${heebo.variable}`}
        lang={lang}
        dir={lang === "he" ? "rtl" : "ltr"}
        dangerouslySetInnerHTML={{ __html: html.replace("{{A11Y}}", A11Y_COPY[lang]) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <HomeBehaviors lang={lang} rootId={rootId} />
    </>
  )
}
