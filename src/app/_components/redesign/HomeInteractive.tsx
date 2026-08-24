"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import styles from "./redesign.module.css"
import { sanitizePrompt, buildPlatformUrl } from "./promptUtils"
import { PROMPT_EXAMPLES, DEMO_STEPS, PROMPT_MAX_LENGTH } from "@/app/_content/redesign/home"

const SPARKLE = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2z" />
  </svg>
)
const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

function usePlaceholderCarousel(active: boolean) {
  const [placeholder, setPlaceholder] = useState("במה אתם עוסקים?")
  useEffect(() => {
    if (!active) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    let cancelled = false
    let exampleIndex = 0
    let timer: ReturnType<typeof setTimeout>

    const typeExample = () => {
      const word = PROMPT_EXAMPLES[exampleIndex % PROMPT_EXAMPLES.length]
      let c = 0
      const typeTick = () => {
        if (cancelled) return
        c += 1
        if (c <= word.length) {
          setPlaceholder(`למשל: ${word.slice(0, c)}|`)
          timer = setTimeout(typeTick, 55)
        } else {
          timer = setTimeout(holdThenErase, 1600)
        }
      }
      const holdThenErase = () => {
        if (cancelled) return
        setPlaceholder(`למשל: ${word}`)
        let ec = word.length
        const eraseTick = () => {
          if (cancelled) return
          ec -= 1
          if (ec <= 0) {
            exampleIndex += 1
            setPlaceholder("במה אתם עוסקים?")
            timer = setTimeout(typeExample, 700)
            return
          }
          setPlaceholder(`למשל: ${word.slice(0, ec)}|`)
          timer = setTimeout(eraseTick, 26)
        }
        timer = setTimeout(eraseTick, 26)
      }
      typeTick()
    }

    timer = setTimeout(typeExample, 2200)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [active])
  return placeholder
}

function useDemoPanel() {
  const [typedQuestion, setTypedQuestion] = useState("")
  const [done, setDone] = useState(false)
  const [doneText, setDoneText] = useState("")
  const [panelClass, setPanelClass] = useState("")

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      const last = DEMO_STEPS[DEMO_STEPS.length - 1]
      setTypedQuestion(last.question)
      setDone(true)
      setDoneText(last.done)
      setPanelClass(`${styles.hmVBig} ${styles.hmVBg} ${styles.hmVBtn}`)
      return
    }
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const later = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
      timers.push(t)
      return t
    }

    let k = 0
    const run = () => {
      const step = DEMO_STEPS[k % DEMO_STEPS.length]
      const first = k % DEMO_STEPS.length === 0
      setDone(false)
      if (first) {
        setPanelClass("")
        setTypedQuestion("")
        later(typeStep, 700)
        return
      }
      typeStep()

      function typeStep() {
        setTypedQuestion("")
        let c = 0
        const typeChar = () => {
          if (c <= step.question.length) {
            setTypedQuestion(step.question.slice(0, c))
            c += 1
            later(typeChar, 48)
            return
          }
          later(() => {
            setPanelClass((prev) => `${prev} ${styles[step.cls]}`.trim())
            setDoneText(step.done)
            setDone(true)
          }, 520)
          later(() => {
            k += 1
            run()
          }, 4000)
        }
        typeChar()
      }
    }
    later(run, 800)
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [])

  return { typedQuestion, done, panelClass, doneText }
}

export function HomeInteractive() {
  const [value, setValue] = useState("")
  const [dockOn, setDockOn] = useState(false)
  const composerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const placeholder = usePlaceholderCarousel(value.length === 0)
  const demo = useDemoPanel()

  useEffect(() => {
    const el = composerRef.current
    if (!el || !("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => setDockOn(!entry.isIntersecting),
      { rootMargin: "-70px 0px 0px 0px", threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = `${Math.min(ta.scrollHeight, 150)}px`
  }, [value])

  const disabled = sanitizePrompt(value) === null
  const count = value.length

  const submit = () => {
    if (disabled) return
    window.location.href = buildPlatformUrl(value)
  }

  return (
    <>
      <form
        className={styles.ask}
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <p className={styles.askLabel}>
          {SPARKLE}
          התחילו לכתוב. זה כל מה שצריך
        </p>
        <div className={styles.composer} ref={composerRef}>
          <textarea
            ref={textareaRef}
            rows={1}
            maxLength={PROMPT_MAX_LENGTH}
            aria-label="במה אתם עוסקים"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                submit()
              }
            }}
          />
          <div className={styles.composerFoot}>
            <span className={styles.cfChip}>
              {SPARKLE}
              עברית
            </span>
            <span className={`${styles.cfCount} ${count >= PROMPT_MAX_LENGTH ? styles.cfCountOver : ""}`}>
              {count}/{PROMPT_MAX_LENGTH}
            </span>
            <button className={styles.cfSend} type="submit" disabled={disabled} aria-label="בנו לי אתר">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
        <p className={styles.askMeta}>
          <span>{CHECK}בלי כרטיס אשראי</span>
        </p>
      </form>

      <div className={styles.show}>
        <div className={styles.showSay}>
          <span className={styles.ssTag}>
            {SPARKLE}
            כותבים בעברית
          </span>
          <p className={styles.ssLine}>
            {demo.typedQuestion}
            <span className={styles.car} />
          </p>
          <p className={`${styles.ssDone} ${demo.done ? styles.ssDoneOn : ""}`}>
            {CHECK}
            <span>{demo.doneText}</span>
          </p>
        </div>

        <div className={styles.showView}>
          <div className={styles.svBar}>
            <i /><i /><i />
            <span className={styles.svBarU}>yourname.uxellent.site</span>
          </div>
          <div className={`${styles.hm} ${demo.panelClass}`}>
            {demo.panelClass.includes(styles.hmVBg) ? (
              <div className={styles.hmBg}>
                <Image src="/redesign/demo-lawfirm.webp" alt="משרד עורכי דין" width={900} height={560} />
              </div>
            ) : null}
            <div className={styles.hmNav}>
              <span className={styles.hmLg}>ליבוביץ׳ ושות׳</span>
              <span className={styles.hmLk}>תחומי עיסוק</span>
              <span className={styles.hmLk}>המשרד</span>
              <span className={styles.hmLk}>פרסומים</span>
              <span className={styles.hmCta}>קביעת פגישה</span>
            </div>
            <div className={styles.hmBody}>
              <div className={styles.hmCopy}>
                <h3 className={styles.hmH}>
                  ייצוג משפטי <em>שמתחיל בהקשבה</em>
                </h3>
                <p className={styles.hmP}>דיני משפחה · הסכמי ממון · צוואות · פגישת היכרות ללא עלות</p>
                <div className={styles.hmBtns}>
                  <span className={styles.hmB2}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.5 3.68 1.4 5.22L2 22l5.06-1.56a9.8 9.8 0 004.98 1.34h.01c5.43 0 9.83-4.4 9.83-9.84C21.88 6.4 17.47 2 12.04 2zm5.7 13.9c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.12.07-1.8-.11a15 15 0 01-1.63-.6c-2.87-1.24-4.74-4.12-4.88-4.31-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.1 1-2.38.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.64.49.24.57.82 1.97.89 2.11.07.14.12.31.02.5-.09.19-.14.31-.28.48l-.42.49c-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.24.62-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.11.07.66-.17 1.34z" />
                    </svg>
                    וואטסאפ
                  </span>
                  <span className={styles.hmB1}>צרו קשר</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.dock} ${dockOn ? styles.dockOn : ""}`}>
        <form
          className={styles.dockIn}
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
        >
          <input
            maxLength={PROMPT_MAX_LENGTH}
            placeholder="במה אתם עוסקים? אבנה לכם אתר"
            aria-label="במה אתם עוסקים"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            tabIndex={dockOn ? 0 : -1}
          />
          <span className={styles.dockCnt}>
            {count}/{PROMPT_MAX_LENGTH}
          </span>
          <button className={styles.cfSend} type="submit" disabled={disabled} aria-label="בנו לי אתר" tabIndex={dockOn ? 0 : -1}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}
