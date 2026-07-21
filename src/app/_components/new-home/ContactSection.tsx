"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { H2 } from "@/components/ui/Heading"
import { CONTACT_INTRO } from "./newHome.constants"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+()\-\s]{9,}$/

const schema = z.object({
  fullName: z.string().trim().min(2, "נא למלא שם מלא"),
  contact: z
    .string()
    .trim()
    .min(1, "נא למלא טלפון או אימייל")
    .refine((v) => EMAIL_RE.test(v) || PHONE_RE.test(v), {
      message: "נא למלא מספר טלפון תקין או כתובת אימייל תקינה",
    }),
  message: z.string().trim().min(1, "נא לכתוב הודעה קצרה").max(1500),
})

type FormValues = z.infer<typeof schema>

type Status = "idle" | "sending" | "sent" | "error"

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorText, setErrorText] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    setStatus("sending")
    setErrorText("")
    try {
      const res = await fetch("/api/new-home-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, pagePath: window.location.pathname }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.ok) {
        setErrorText(data?.error ?? "שליחת הפנייה נכשלה. אפשר לנסות שוב עוד רגע.")
        setStatus("error")
        return
      }
      reset()
      setStatus("sent")
    } catch {
      setErrorText("לא הצלחנו להתחבר לשרת. אפשר לנסות שוב עוד רגע.")
      setStatus("error")
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-[10px] border border-[color:var(--vow-border)] bg-white px-4 py-3 text-[18px] text-black outline-none transition-colors focus:border-[color:var(--vow-accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--vow-accent)]/35"
  const labelClass = "block text-right text-[18px] font-semibold text-black"
  const errorClass = "mt-1 text-right text-[16px] text-[#b3261e]"

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#F4F1EC] py-[var(--space-section)]"
      dir="rtl"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-4">
        <div className="mx-auto max-w-[640px] rounded-[18px] border border-[color:var(--vow-border)] bg-white px-6 py-10 shadow-sm sm:px-10">
          <H2 id="contact-heading" className="w-full text-right">
            צרו קשר
          </H2>
          <p className="mt-3 text-right text-[19px] leading-[30px] text-[color:var(--vow-muted)]">
            {CONTACT_INTRO}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5" noValidate>
            <div>
              <label htmlFor="nh-name" className={labelClass}>
                שם
              </label>
              <input
                id="nh-name"
                type="text"
                autoComplete="name"
                className={fieldClass}
                aria-invalid={!!errors.fullName}
                {...register("fullName")}
              />
              {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
            </div>

            <div>
              <label htmlFor="nh-contact" className={labelClass}>
                טלפון או מייל
              </label>
              <input
                id="nh-contact"
                type="text"
                dir="ltr"
                autoComplete="tel"
                className={`${fieldClass} text-left`}
                aria-invalid={!!errors.contact}
                {...register("contact")}
              />
              {errors.contact && <p className={errorClass}>{errors.contact.message}</p>}
            </div>

            <div>
              <label htmlFor="nh-message" className={labelClass}>
                הודעה
              </label>
              <textarea
                id="nh-message"
                rows={4}
                className={`${fieldClass} resize-y`}
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              {errors.message && <p className={errorClass}>{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "שולח..." : "שליחה"}
            </button>

            <div aria-live="polite" role="status">
              {status === "sent" && (
                <p className="text-right text-[18px] font-semibold text-[color:var(--vow-accent)]">
                  תודה, הפנייה נשלחה. נחזור אליכם בהקדם.
                </p>
              )}
              {status === "error" && (
                <p className="text-right text-[18px] text-[#b3261e]">{errorText}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
