import Link from "next/link"
import styles from "./redesign.module.css"
import { FeatureViz } from "./FeatureViz"
import type { Feature } from "@/app/_content/redesign/products"
import type { Locale } from "@/content/i18n/dictionary"

export function FeatureBlock({ feature, locale = "he" }: { feature: Feature; locale?: Locale }) {
  const isExternal = feature.cta?.href.startsWith("http")
  return (
    <div className={`${styles.feat} ${feature.flip ? styles.featFlip : ""}`}>
      <div className={styles.featTx}>
        <span className={styles.fno}>{feature.no}</span>
        <h2>{feature.title}</h2>
        <p>{feature.body}</p>
        <div className={styles.fchips}>
          {feature.chips.map((chip) => (
            <span key={chip}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {chip}
            </span>
          ))}
        </div>
        {feature.cta ? (
          isExternal ? (
            <a className={styles.featGo} href={feature.cta.href}>{feature.cta.label}</a>
          ) : (
            <Link className={styles.featGo} href={feature.cta.href}>{feature.cta.label}</Link>
          )
        ) : null}
      </div>
      <FeatureViz viz={feature.viz} locale={locale} />
    </div>
  )
}
