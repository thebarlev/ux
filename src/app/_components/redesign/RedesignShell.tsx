import { redesignFont } from "./font"
import { RedesignHeader } from "./RedesignHeader"
import { RedesignFooter } from "./RedesignFooter"
import styles from "./redesign.module.css"
import type { Locale } from "@/content/i18n/dictionary"

export function RedesignShell({
  children,
  locale = "he",
  langSwitchHref,
}: {
  children: React.ReactNode
  locale?: Locale
  langSwitchHref?: string
}) {
  return (
    <div className={`${styles.root} ${redesignFont.variable}`} dir={locale === "en" ? "ltr" : "rtl"} lang={locale}>
      <RedesignHeader locale={locale} langSwitchHref={langSwitchHref} />
      {children}
      <RedesignFooter locale={locale} />
    </div>
  )
}
