"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./redesign.module.css"
import type { FeatureViz as FeatureVizData } from "@/app/_content/redesign/products"

function TypingLine({ text }: { text: string }) {
  const [shown, setShown] = useState("")
  const iRef = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setShown(text)
      return
    }
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      iRef.current += 1
      if (iRef.current <= text.length) {
        setShown(text.slice(0, iRef.current))
        timer = setTimeout(tick, 55)
      } else {
        timer = setTimeout(() => {
          iRef.current = 0
          setShown("")
          tick()
        }, 3200)
      }
    }
    timer = setTimeout(tick, 55)
    return () => clearTimeout(timer)
  }, [text])

  return <div className={styles.vzLn}>{shown}</div>
}

export function FeatureViz({ viz }: { viz: FeatureVizData }) {
  if (viz.kind === "composer") {
    return (
      <div className={styles.featViz}>
        <div className={styles.vz}>
          <div className={styles.vzComposer}>
            <TypingLine text={viz.typingText} />
            <div className={styles.vzFt}>
              <span className={styles.vzSnd}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </span>
            </div>
          </div>
          <div className={styles.vzArrow}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
          <SiteMock />
        </div>
      </div>
    )
  }

  if (viz.kind === "before-after") {
    return (
      <div className={styles.featViz}>
        <div className={styles.vz}>
          <div className={styles.vzBa}>
            <div className={styles.vzBaOld}>
              <SiteMock />
              <span className={styles.vzBaTag}>האתר הישן</span>
            </div>
            <span className={styles.vzBaArr}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </span>
            <div>
              <SiteMock />
              <span className={`${styles.vzBaTag} ${styles.vzBaNewTag}`}>האתר החדש · אותה כתובת</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (viz.kind === "landing") {
    return (
      <div className={styles.featViz}>
        <div className={styles.vzLand}>
          <div className={styles.vzLandH} />
          <div className={styles.vzLandP} />
          <div className={styles.vzLandP} style={{ width: "64%", marginInline: "18%" }} />
          <div className={styles.vzLandCta} />
        </div>
      </div>
    )
  }

  if (viz.kind === "chat") {
    return (
      <div className={styles.featViz}>
        <div className={`${styles.vz} ${styles.vzChat}`}>
          {viz.messages.map((m, i) => (
            <span key={i} className={`${styles.b} ${m.from === "me" ? styles.vzChatMe : styles.vzChatAi}`}>
              {m.bold ? <b>{m.bold}</b> : null} {m.text}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.featViz}>
      <div className={`${styles.vz} ${styles.vzSerp}`}>
        <div className={styles.vzSerpU}>{viz.url}</div>
        <div className={styles.vzSerpT}>{viz.title}</div>
        <div className={styles.vzSerpD}>{viz.description}</div>
        <div className={styles.vzSerpBadges}>
          {viz.badges.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SiteMock() {
  return (
    <div className={styles.vzSite}>
      <div className={styles.vzSiteNv}>
        <i /><em /><em /><b />
      </div>
      <div className={styles.vzSiteHr} />
      <div className={styles.vzSiteRw}>
        <i /><i /><i />
      </div>
    </div>
  )
}
