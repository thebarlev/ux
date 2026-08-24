import styles from "./redesign.module.css"

export function PCloseCta({
  title,
  lede,
  cta,
}: {
  title: string
  lede: string
  cta: { label: string; href: string }
}) {
  return (
    <section className={styles.pclose}>
      <div className={styles.wrap}>
        <h2>{title}</h2>
        <p>{lede}</p>
        <a className={`${styles.btn} ${styles.btnPrimary}`} href={cta.href}>
          {cta.label}
        </a>
      </div>
    </section>
  )
}
