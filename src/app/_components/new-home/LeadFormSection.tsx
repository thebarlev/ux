"use client"

import { useEffect, useState } from "react"

import {
  INTEREST_OPTIONS,
  KIT_LINK,
  KIT_THANKS_URL,
  LEAD_FORM_FIELDS,
  LEAD_FORM_HEAD,
  LEAD_FORM_MESSAGES,
  LEAD_INTEREST_FALLBACK,
  LEAD_PHONE,
  LEAD_SUBJECT_PREFIX,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  WEB3FORMS_FROM_NAME,
} from "./homeSections.constants"
import styles from "./LeadFormSection.module.css"
import { Ltr } from "./Ltr"
import { PRESELECT_EVENT } from "./preselectInterest"

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const

type Result = { tone: "ok" | "err"; text: string } | null

/**
 * #contact — the lead form.
 *
 * Posts straight to Web3Forms from the browser; there is no backend (brief §3).
 * The access key is a public client-side key by design, and the honeypot field
 * carries the spam protection.
 *
 * Two behaviours are load-bearing and must not drift:
 *  - the subject prefix, which Itzik's Zoho filter matches to forward the lead
 *    to his second mailbox;
 *  - the kit option string, which makes email required and, on success, sends
 *    the visitor to the thank-you page where the PDF actually lives. The home
 *    page never links to the file directly (brief §5א).
 */
export function LeadFormSection() {
  const [interest, setInterest] = useState("")
  const [utm, setUtm] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<Result>(null)

  // Campaign parameters ride along into the notification email (brief §7.5).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const found: Record<string, string> = {}
    for (const key of UTM_KEYS) {
      const value = params.get(key)
      if (value) found[key] = value
    }
    setUtm(found)
  }, [])

  // CTAs elsewhere on the page choose the visitor's interest for them.
  useEffect(() => {
    const onPreselect = (event: Event) => {
      const value = (event as CustomEvent<string>).detail
      if (typeof value === "string") setInterest(value)
    }
    window.addEventListener(PRESELECT_EVENT, onPreselect)
    return () => window.removeEventListener(PRESELECT_EVENT, onPreselect)
  }, [])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult(null)

    const form = event.currentTarget
    const data = Object.fromEntries(
      new FormData(form).entries()
    ) as Record<string, string>

    const name = (data.name ?? "").trim()
    const phone = (data.phone ?? "").trim()
    if (!name || !phone) {
      setResult({ tone: "err", text: LEAD_FORM_MESSAGES.missingFields })
      return
    }

    const chosen = interest || LEAD_INTEREST_FALLBACK
    const wantsKit = interest === KIT_LINK.preselect
    if (wantsKit && !(data.email ?? "").trim()) {
      setResult({ tone: "err", text: LEAD_FORM_MESSAGES.missingEmailForKit })
      return
    }

    // Built here rather than in a hidden field so it always reflects the
    // values actually being sent.
    data.subject = `${LEAD_SUBJECT_PREFIX}: ${name} | ${chosen}`
    data.interest = chosen

    setSubmitting(true)
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
      const payload = (await response.json()) as { success?: boolean }
      if (!payload.success) throw new Error("submit failed")

      form.reset()
      setInterest("")

      // Conversion events fire on success only, and only if the tags loaded.
      window.gtag?.("event", "generate_lead", { form_id: "home_lead_form" })
      window.fbq?.("track", "Lead")

      if (wantsKit) {
        setResult({ tone: "ok", text: LEAD_FORM_MESSAGES.successKit })
        // Brief pause so the confirmation is readable before the page changes.
        window.setTimeout(() => {
          window.location.href = KIT_THANKS_URL
        }, 400)
      } else {
        setResult({ tone: "ok", text: LEAD_FORM_MESSAGES.success })
      }
    } catch {
      setResult({ tone: "err", text: LEAD_FORM_MESSAGES.networkError })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={styles.section}
      dir="rtl"
    >
      <div className={styles.wrap}>
        <span className={styles.kicker}>{LEAD_FORM_HEAD.kicker}</span>
        <h2 id="contact-heading" className={styles.heading}>
          {LEAD_FORM_HEAD.heading}
        </h2>
        <p className={styles.sub}>{LEAD_FORM_HEAD.sub}</p>

        <div className={styles.card}>
          <form onSubmit={onSubmit} noValidate>
            <input
              type="hidden"
              name="access_key"
              value={WEB3FORMS_ACCESS_KEY}
            />
            <input type="hidden" name="from_name" value={WEB3FORMS_FROM_NAME} />
            {UTM_KEYS.map((key) => (
              <input key={key} type="hidden" name={key} value={utm[key] ?? ""} />
            ))}

            {/* Honeypot. Hidden from sight and from the tab order; a bot that
                fills it tells Web3Forms to drop the submission. */}
            <div className={styles.honeypot} aria-hidden="true">
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="lf-name">
                {LEAD_FORM_FIELDS.name} <span className={styles.req}>*</span>
              </label>
              <input
                type="text"
                id="lf-name"
                name="name"
                required
                autoComplete="name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="lf-phone">
                {LEAD_FORM_FIELDS.phone} <span className={styles.req}>*</span>
              </label>
              <input
                type="tel"
                id="lf-phone"
                name="phone"
                required
                autoComplete="tel"
                inputMode="tel"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="lf-email">{LEAD_FORM_FIELDS.email}</label>
              <input
                type="email"
                id="lf-email"
                name="email"
                autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="lf-interest">{LEAD_FORM_FIELDS.interest}</label>
              <select
                id="lf-interest"
                name="interest"
                value={interest}
                onChange={(event) => setInterest(event.target.value)}
              >
                <option value="">
                  {LEAD_FORM_FIELDS.interestPlaceholder}
                </option>
                {INTEREST_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="lf-msg">{LEAD_FORM_FIELDS.message}</label>
              <textarea
                id="lf-msg"
                name="message"
                placeholder={LEAD_FORM_FIELDS.messagePlaceholder}
              />
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={submitting}
            >
              {submitting
                ? LEAD_FORM_FIELDS.submitting
                : LEAD_FORM_FIELDS.submit}
            </button>

            {/* Always in the DOM so screen readers announce into a region that
                already existed, rather than one that appears mid-submit. */}
            <div role="status" aria-live="polite">
              {result && (
                <div
                  className={`${styles.result} ${
                    result.tone === "ok" ? styles.ok : styles.err
                  }`}
                >
                  {result.text}
                </div>
              )}
            </div>
          </form>

          <p className={styles.note}>{LEAD_FORM_FIELDS.note}</p>
          <p className={styles.phoneAlt}>
            {LEAD_FORM_FIELDS.phoneAltLead}{" "}
            <a href={LEAD_PHONE.href}>
              <Ltr>{LEAD_PHONE.display}</Ltr>
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
