"use client"

import { useSearchParams } from "next/navigation"
import styles from "./redesign.module.css"
import { buildPlatformUrl } from "./promptUtils"
import { getDictionary, type Locale } from "@/content/i18n/dictionary"

export function ReceivedBanner({ locale = "he" }: { locale?: Locale }) {
  const searchParams = useSearchParams()
  const p = searchParams.get("p")
  if (p === null) return null

  return (
    <div className={`${styles.recv} ${styles.recvOn}`}>
      <div className={styles.wrap}>
        <span className={styles.recvTick}>✓</span>
        <span style={{ flex: "1 1 260px", minWidth: 0 }}>
          <b>{getDictionary(locale).home.receivedBanner.title}</b>
          <span className={styles.recvVal}>{p}</span>
          <span className={styles.recvUrl}>{buildPlatformUrl(p)}</span>
        </span>
      </div>
    </div>
  )
}
