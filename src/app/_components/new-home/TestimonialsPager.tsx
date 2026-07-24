"use client"

import Image from "next/image"
import { useState } from "react"

import { NEW_HOME_TESTIMONIALS, TESTIMONIALS_HEADING } from "./newHome.constants"
import styles from "./TestimonialsPager.module.css"

/**
 * Testimonials, one large card at a time, paged by arrows or dots.
 * Dedicated to /new-home — the shared home/Testimonials grid is untouched.
 */
export function TestimonialsPager() {
  const items = NEW_HOME_TESTIMONIALS
  const [index, setIndex] = useState(0)

  const go = (next: number) => setIndex((next + items.length) % items.length)

  // The track lays out RTL, so later cards sit to the left; moving the track
  // right by one card width brings the next one into the stage.
  const offset = `${index * 100}%`

  return (
    <section
      aria-labelledby="new-home-testimonials-heading"
      className={styles.section}
      dir="rtl"
    >
      <div className={styles.wrap}>
        <h2 id="new-home-testimonials-heading" className={styles.heading}>
          {TESTIMONIALS_HEADING}
        </h2>

        <div className={styles.stage}>
          <div
            className={styles.track}
            style={{ transform: `translateX(${offset})` }}
          >
            {items.map((item, i) => (
              <figure
                key={item.imageSrc}
                className={styles.card}
                aria-hidden={i === index ? undefined : true}
              >
                <div className={styles.mark} aria-hidden="true">
                  &rdquo;
                </div>
                <blockquote className={styles.quote}>{item.quote}</blockquote>
                <div className={styles.avatar}>
                  <Image
                    src={encodeURI(item.imageSrc)}
                    alt={item.imageAlt}
                    fill
                    sizes="66px"
                  />
                </div>
                <figcaption>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.company}>{item.company}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(index - 1)}
            aria-label="ההמלצה הקודמת"
          >
            <span aria-hidden="true">❮</span>
          </button>

          <div className={styles.dots}>
            {items.map((item, i) => (
              <button
                key={item.imageSrc}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotOn : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`המלצה ${i + 1} מתוך ${items.length}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(index + 1)}
            aria-label="ההמלצה הבאה"
          >
            <span aria-hidden="true">❯</span>
          </button>
        </div>
      </div>
    </section>
  )
}
