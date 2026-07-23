import Image from "next/image"

import { STORY, STORY_PARAGRAPHS } from "./newHome.constants"
import styles from "./StorySection.module.css"
import { WhatsAppField } from "./WhatsAppField"

/**
 * The founder's story, in first person: the path that led to Uxellent and the
 * gap it exists to close. Text leads, portrait sits beside it, and a slim
 * direct WhatsApp line sits under the copy.
 */
export function StorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className={styles.section}
      dir="rtl"
    >
      <div className={styles.wrap}>
        <div className={styles.top}>
          <div>
            <span className={styles.kicker}>{STORY.kicker}</span>
            <h2 id="story-heading" className={styles.heading}>
              {STORY.headingLead}
              <em>{STORY.headingAccent}</em>
              {STORY.headingTail}
            </h2>
            {STORY_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
            <WhatsAppField />
          </div>

          <div className={styles.figure}>
            <div className={styles.frame}>
              <Image
                src={STORY.portraitSrc}
                alt={STORY.portraitAlt}
                fill
                sizes="(max-width: 860px) 300px, 380px"
                className="object-cover"
              />
            </div>
            <p className={styles.caption}>
              <b>{STORY.captionName}</b>
              {STORY.captionRole}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
