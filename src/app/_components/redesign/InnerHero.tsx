import styles from "./redesign.module.css"

export function InnerHero({
  eyebrow,
  title,
  lede,
  stats,
}: {
  eyebrow: string
  title: string[]
  lede: string
  stats?: { value: string; label: string }[]
}) {
  return (
    <section className={styles.phero}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1>
          {title.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {i === title.length - 1 ? <em>{line}</em> : line}
            </span>
          ))}
        </h1>
        <p className={styles.lede}>{lede}</p>
        {stats ? (
          <div className={styles.pstat}>
            {stats.map((s) => (
              <span key={s.label}>
                <b>{s.value.startsWith("₪") ? <><i>₪</i>{s.value.slice(1)}</> : s.value}</b>
                {s.label}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
