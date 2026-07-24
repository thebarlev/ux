"use client"

import { useState } from "react"

import { WHATSAPP_FIELD, WHATSAPP_NUMBER } from "./newHome.constants"
import styles from "./StorySection.module.css"

/**
 * Slim direct line to WhatsApp: type a short message, press send, and the
 * conversation opens with that text already in it. Deliberately not a form
 * post — nothing is stored on our side, the message is handed to WhatsApp.
 */
export function WhatsAppField() {
  const [message, setMessage] = useState("")

  function open() {
    const text = message.trim()
    const base = `https://wa.me/${WHATSAPP_NUMBER}`
    const href = text ? `${base}?text=${encodeURIComponent(text)}` : base
    window.open(href, "_blank", "noopener,noreferrer")
  }

  return (
    <div>
      <div className={styles.waLine}>
        <input
          className={styles.waInput}
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              open()
            }
          }}
          placeholder={WHATSAPP_FIELD.placeholder}
          aria-label={WHATSAPP_FIELD.placeholder}
          aria-describedby="wa-hint"
        />
        <button
          type="button"
          className={styles.waGo}
          onClick={open}
          aria-label={WHATSAPP_FIELD.send}
        >
          <svg viewBox="0 0 32 32" fill="#fff" aria-hidden="true" focusable="false">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.773L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.771-1.854l-.486-.29-5.01 1.194 1.234-4.874-.317-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.87c-.398-.199-2.357-1.162-2.722-1.295-.365-.133-.631-.199-.897.199-.266.398-1.03 1.295-1.263 1.561-.232.266-.465.299-.863.1-.398-.2-1.681-.619-3.202-1.975-1.183-1.056-1.981-2.36-2.213-2.758-.232-.398-.025-.613.175-.811.18-.178.398-.465.597-.698.2-.232.266-.398.398-.664.133-.266.067-.498-.033-.697-.1-.2-.897-2.162-1.23-2.96-.323-.778-.651-.672-.897-.685l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.323s1.428 3.854 1.627 4.12c.2.266 2.81 4.29 6.808 6.018.951.41 1.693.655 2.272.839.955.303 1.824.26 2.511.158.766-.114 2.357-.964 2.69-1.895.332-.93.332-1.728.232-1.895-.1-.166-.365-.266-.763-.465z" />
          </svg>
        </button>
      </div>
      <p id="wa-hint" className={styles.waHint}>
        {WHATSAPP_FIELD.hint}
      </p>
    </div>
  )
}
