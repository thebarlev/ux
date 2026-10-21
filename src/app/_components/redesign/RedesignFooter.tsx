import Link from "next/link"
import Image from "next/image"
import styles from "./redesign.module.css"
import { BoldText } from "./BoldText"
import { FooterLangSwitch } from "./FooterLangSwitch"
import { getDictionary, type Locale } from "@/content/i18n/dictionary"

type FooterItem = { label: string; href: string }

const RETIRED_HE = new Set(["/products", "/how-it-works", "/included"])

export function RedesignFooter({ locale = "he", langSwitchHref }: { locale?: Locale; langSwitchHref?: string }) {
  const t = getDictionary(locale).footer
  const navT = getDictionary(locale).nav
  const prefix = locale === "en" ? "/en" : ""
  const homeHref = locale === "en" ? "/en" : "/"

  // Retired (tbl-023): /about in both languages; /products, /how-it-works and
  // /included in Hebrew. Their links go too.
  const live = (i: FooterItem) => locale === "en" || !RETIRED_HE.has(i.href)
  const f1: FooterItem[] = [
    { label: t.product.products, href: `${prefix}/products` },
    { label: t.product.howItWorks, href: `${prefix}/how-it-works` },
    { label: t.product.included, href: `${prefix}/included` },
    { label: t.product.pricing, href: `${prefix}/pricing` },
    { label: t.product.platform, href: "https://ai.uxellent.com" },
  ].filter(live)
  const f2: FooterItem[] = [
    { label: t.company.contact, href: `${prefix}/contact` },
    { label: t.company.growthGuides, href: `${prefix}/growth-guides` },
    { label: t.company.blog, href: `${prefix}/blog` },
    { label: t.company.seoAi, href: `${prefix}/growth-guides` },
  ]
  // Legal pages aren't translated yet — both locales link to the same Hebrew pages (matches en/*.html).
  const f3: FooterItem[] = [
    { label: t.legal.terms, href: "/terms" },
    { label: t.legal.privacy, href: "/privacy" },
    { label: t.legal.accessibility, href: "/accessibility" },
    { label: t.legal.accountDeletion, href: "/account-deletion" },
  ]

  return (
    <footer className={styles.ftr} dir={locale === "en" ? "ltr" : "rtl"}>
      <div className={styles.wrap}>
        <div className={styles.ftrTop}>
          <div>
            <Link className={styles.brand} href={homeHref} aria-label="Uxellent">
              <Image src="/footer-logo.svg" alt="Uxellent" width={150} height={47} />
            </Link>
            <p className={styles.blurb}>{t.blurb}</p>
            <a className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`} href="https://ai.uxellent.com">
              {t.startBuilding}
            </a>
          </div>
          <FooterColumn title={t.colProduct} items={f1} />
          <FooterColumn title={t.colCompany} items={f2} />
          <FooterColumn title={t.colLegal} items={f3} />
        </div>
        <p className={styles.a11yStrip}>
          <b>{t.a11yLabel}:</b> <BoldText text={t.a11yStrip} />
        </p>
        <div className={styles.ftrBot}>
          <span>© {new Date().getFullYear()} Uxellent. {t.copyright}</span>
          <span className={styles.ftrBotR}>
            <Link href="/terms">{t.quickTerms}</Link>
            <Link href="/privacy">{t.quickPrivacy}</Link>
            <Link href="/accessibility">{t.quickAccessibility}</Link>
            <FooterLangSwitch locale={locale} label={navT.langSwitch} hrefOverride={langSwitchHref} />
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }: { title: string; items: FooterItem[] }) {
  return (
    <div className={styles.fcol}>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
