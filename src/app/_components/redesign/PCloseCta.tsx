import styles from "./redesign.module.css"
import { CloseComposer } from "./CloseComposer"

export function PCloseCta({ title, lede }: { title: string; lede: string }) {
  return (
    <section className={styles.pclose}>
      <div className={styles.wrap}>
        <h2>{title}</h2>
        <p>{lede}</p>
        <CloseComposer />
      </div>
    </section>
  )
}
