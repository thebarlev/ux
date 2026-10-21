import { redesignFont } from "./font"
import styles from "./redesign.module.css"
import { SiteChrome } from "@/app/_home/SiteChrome"
import type { Locale } from "@/content/i18n/dictionary"

/** A 2026-08 redesign page (why us) inside the site's header, breadcrumbs and
 *  footer (tbl-024). `path` is the page's own address, `crumb` its name. */
export function RedesignShell({
  children,
  locale = "he",
  langSwitchHref,
  path,
  crumb,
}: {
  children: React.ReactNode
  locale?: Locale
  langSwitchHref?: string
  path?: string
  crumb?: string
}) {
  const other = langSwitchHref ?? (path ? (locale === "en" ? path.replace(/^\/en/, "") || "/" : `/en${path}`) : undefined)
  const paths = path && other ? (locale === "en" ? { he: other, en: path } : { he: path, en: other }) : undefined
  return (
    <SiteChrome lang={locale} current={path} crumbs={crumb ? [{ label: crumb }] : undefined} paths={paths}>
      <div className={`${styles.root} ${redesignFont.variable}`} dir={locale === "en" ? "ltr" : "rtl"} lang={locale}>
        {children}
      </div>
    </SiteChrome>
  )
}
