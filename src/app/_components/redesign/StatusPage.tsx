import Link from "next/link"
import { RedesignShell } from "./RedesignShell"
import styles from "./redesign.module.css"

type StatusAction = { label: string; href: string; download?: boolean }

/**
 * Post-action pages (form thanks, payment return) in the redesign's language:
 * the same shell and dark inner hero as /included and /why-us, then a short
 * band with the actions and optional numbered next steps.
 */
export function StatusPage({
  eyebrow,
  title,
  lede,
  primary,
  secondary,
  steps,
  stepsTitle,
  note,
}: {
  eyebrow: string
  title: string[]
  lede: string
  primary: StatusAction
  secondary?: StatusAction
  steps?: readonly string[]
  stepsTitle?: string
  note?: React.ReactNode
}) {
  return (
    <RedesignShell>
      <main id="main">
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
          </div>
        </section>
        <section className={styles.band}>
          <div className={`${styles.wrap} ${styles.closer}`}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {primary.download ? (
                <a className={`${styles.btn} ${styles.btnPrimary}`} href={primary.href} download>
                  {primary.label}
                </a>
              ) : (
                <Link className={`${styles.btn} ${styles.btnPrimary}`} href={primary.href}>
                  {primary.label}
                </Link>
              )}
              {secondary ? (
                <Link className={styles.btnGhost} href={secondary.href}>
                  {secondary.label}
                </Link>
              ) : null}
            </div>
            {note ? <p className={styles.fine}>{note}</p> : null}
            {steps?.length ? (
              <div className={styles.steps} style={{ maxWidth: 640, margin: "48px auto 0", textAlign: "start" }}>
                {stepsTitle ? <h2 className={styles.sec} style={{ fontSize: "clamp(22px, 2.6vw, 28px)", marginBottom: 8 }}>{stepsTitle}</h2> : null}
                {steps.map((step, i) => (
                  <div key={step} className={styles.step}>
                    <span className={styles.stepN} aria-hidden="true">
                      {i + 1}
                    </span>
                    <p style={{ margin: 0 }}>{step}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </RedesignShell>
  )
}
