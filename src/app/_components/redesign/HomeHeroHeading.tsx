"use client"

import { useEffect, useRef } from "react"
import styles from "./redesign.module.css"

/** Faithful port of home.html's fitH1(): binary-searches the largest font
 *  size that keeps the H1 within 94vw, as one line above 900px and as two
 *  stacked lines (.l1 / .em) below it. Runs on mount, on resize, and again
 *  once webfonts finish loading (metrics shift after swap). */
export function HomeHeroHeading({ line1, emphasis }: { line1: string; emphasis: string }) {
  const h1Ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const h1 = h1Ref.current
    if (!h1) return

    function widest(two: boolean) {
      if (two) {
        const parts = h1!.querySelectorAll(`.${styles.l1}, .${styles.em}`)
        let m = 0
        parts.forEach((e) => {
          m = Math.max(m, e.getBoundingClientRect().width)
        })
        return m
      }
      const pv = h1!.style.width
      h1!.style.width = "max-content"
      const x = h1!.getBoundingClientRect().width
      h1!.style.width = pv
      return x
    }

    function fit() {
      const vw = document.documentElement.clientWidth
      const two = vw < 900
      h1!.classList.toggle(styles.heroH1Wrap2, two)
      h1!.style.width = two ? "" : "94vw"
      const avail = vw * 0.94 - 4
      let lo = 22
      let hi = two ? 110 : 170
      let best = lo
      for (let i = 0; i < 24; i++) {
        const m = (lo + hi) / 2
        h1!.style.fontSize = `${m}px`
        if (widest(two) <= avail) {
          best = m
          lo = m
        } else {
          hi = m
        }
      }
      h1!.style.fontSize = `${Math.floor(best * 10) / 10}px`
    }

    fit()
    let raf: number
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(fit)
    }
    window.addEventListener("resize", onResize)
    document.fonts?.ready.then(() => {
      fit()
      setTimeout(fit, 120)
    })
    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <h1 ref={h1Ref} className={`${styles.display} ${styles.heroH1}`}>
      <span className={styles.l1}>{line1}</span> <span className={styles.em}>{emphasis}</span>
    </h1>
  )
}
