"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import styles from "./FounderBand.module.css"
import { NEW_HOME_LOGOS, STORY } from "./newHome.constants"

/**
 * Full-bleed dark band between the story and the testimonials: the founder's
 * closing line, then the clients he has worked with, in white.
 *
 * The content fades up once, the first time the band is scrolled into view.
 * Reduced motion skips straight to the finished state — the CSS holds it there,
 * so nothing depends on the observer having fired.
 */
export function FounderBand() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Anything without IntersectionObserver just gets the finished state.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    )
    io.observe(el)

    // Failing to animate is a rough edge; failing to appear is a broken page.
    // Whatever happens to the observer, the band shows itself shortly after.
    const safety = window.setTimeout(() => setShown(true), 1500)

    return () => {
      io.disconnect()
      window.clearTimeout(safety)
    }
  }, [])

  const reveal = (late?: boolean) =>
    [styles.reveal, late ? styles.revealLate : "", shown ? styles.revealIn : ""]
      .filter(Boolean)
      .join(" ")

  return (
    <section
      aria-labelledby="founder-band-quote"
      className={styles.band}
      dir="rtl"
    >
      <div className={styles.wrap} ref={ref}>
        <blockquote className={`${styles.quote} ${reveal()}`}>
          <span className={styles.mark} aria-hidden="true">
            &rdquo;
          </span>
          <p id="founder-band-quote">
            {STORY.quoteLead}
            <b>{STORY.quoteAccent}</b>
          </p>
        </blockquote>

        <hr className={styles.rule} />

        <div className={`${styles.logos} ${reveal(true)}`}>
          <h2 className="sr-only">לקוחות שעבדנו איתם</h2>
          {NEW_HOME_LOGOS.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={44}
              className={styles.logoWhite}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
