"use client"

import { useEffect, useState } from "react"
import styles from "./redesign.module.css"
import { TALK_SCRIPT } from "@/app/_content/redesign/home"

type Bubble = { from: "me" | "ai"; text: string; key: number }

export function HomeTalk() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setBubbles(TALK_SCRIPT.slice(0, 4).map((m, i) => ({ ...m, key: i })))
      return
    }
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const later = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
      timers.push(t)
    }

    let i = 0
    let key = 0
    const step = () => {
      if (i >= TALK_SCRIPT.length) {
        later(() => {
          i = 0
          setBubbles([])
          step()
        }, 4200)
        return
      }
      const m = TALK_SCRIPT[i]
      if (m.from === "ai") {
        setTyping(true)
        later(() => {
          setTyping(false)
          add(m)
          i += 1
          later(step, 1500)
        }, 900)
      } else {
        add(m)
        i += 1
        later(step, 1300)
      }
    }
    const add = (m: { from: "me" | "ai"; text: string }) => {
      key += 1
      setBubbles((prev) => {
        const next = [...prev, { ...m, key }]
        return next.length > 4 ? next.slice(next.length - 4) : next
      })
    }
    later(step, 500)
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className={styles.talk}>
      <div className={styles.talkHead}>
        <span className={styles.talkAv}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2z" />
          </svg>
        </span>
        <b>Uxellent</b>
        <span className={styles.talkSt}>
          <i />
          מקוון
        </span>
      </div>
      <div>
        {bubbles.map((b) => (
          <div key={b.key} className={`${styles.bub} ${styles.bubOn} ${b.from === "me" ? styles.bubMe : styles.bubAi}`}>
            {b.from === "ai" ? <span className={styles.bubWho}>Uxellent</span> : null}
            {b.text}
          </div>
        ))}
        {typing ? (
          <div className={`${styles.bub} ${styles.bubOn} ${styles.bubAi}`} aria-hidden="true">
            <span className={styles.bubWho}>Uxellent</span>…
          </div>
        ) : null}
      </div>
    </div>
  )
}
