import styles from "./redesign.module.css"
import { CloseComposer } from "./CloseComposer"
import type { Locale } from "@/content/i18n/dictionary"

export function PCloseCta({ title, lede, locale = "he" }: { title: string; lede: string; locale?: Locale }) {
  return (
    <section className={styles.pclose}>
      <div className={styles.wrap}>
        <h2>{title}</h2>
        <p>{lede}</p>
        <CloseComposer locale={locale} />
      </div>
    </section>
  )
}
