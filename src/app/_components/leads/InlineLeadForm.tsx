"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle } from "lucide-react"

import type { LeadSource } from "@/app/_components/home/Popup"
import { executeRecaptcha } from "@/lib/captcha/useRecaptcha"
import { getAttribution } from "@/lib/tracking/attribution"
import { pushDataLayer } from "@/lib/tracking/dataLayer"
import { inferPageContext, mapLeadSourceToService } from "@/lib/tracking/pageContext"
import { H2, H3 } from "@/components/ui/Heading"

function createFormSchema(locale: "he" | "en") {
  const isEn = locale === "en"
  return z.object({
    fullName: z.string().trim().min(2, isEn ? "Full name is required" : "שם מלא חובה"),
    email: z.string().email(isEn ? "Invalid email address" : "כתובת אימייל לא תקינה"),
    phone: z.string().min(9, isEn ? "Enter a valid phone number" : "מספר טלפון לא תקין"),
    message: z.string().max(1500, isEn ? "Up to 1500 characters" : "עד 1500 תווים").optional(),
  })
}

type FormValues = z.infer<ReturnType<typeof createFormSchema>>

type InlineLeadFormProps = {
  title: string
  subtitle?: string
  source?: LeadSource
  pagePathOverride?: string
  locale?: "he" | "en"
  /** Anchor id for scroll targets (unique per page if needed). */
  anchorId?: string
}

export function InlineLeadForm({
  title,
  subtitle,
  source = "design_development",
  pagePathOverride,
  locale = "he",
  anchorId = "lead-idea-to-product",
}: InlineLeadFormProps) {
  const isEn = locale === "en"
  const formSchema = useMemo(() => createFormSchema(locale), [locale])
  const fieldSuffix = locale

  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", email: "", phone: "", message: "" },
  })

  const generateLeadId = () => {
    try {
      if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID()
      }
    } catch {
      // ignore
    }
    return `lead_${Date.now()}_${Math.random().toString(16).slice(2)}`
  }

  const getTopicFromUrl = () => {
    try {
      const sp = new URLSearchParams(window.location.search)
      return sp.get("topic") ?? sp.get("offer") ?? undefined
    } catch {
      return undefined
    }
  }

  const labels = isEn
    ? {
        fullName: "Full name",
        phone: "Mobile",
        email: "Email",
        message: "Short message",
        messagePlaceholder: "Tell us briefly about your idea or what you want to discuss",
        sending: "Sending...",
        submit: "Submit",
        successTitle: "Thank you - we received your message",
        successBody: "We will get back to you shortly.",
        sendAnother: "Send another message",
        unexpectedError: "Something went wrong",
      }
    : {
        fullName: "שם מלא",
        phone: "נייד",
        email: "דוא\"ל",
        message: "הודעה קצרה",
        messagePlaceholder: "ספרו בקצרה על הרעיון או מה תרצו לתאם",
        sending: "שולח...",
        submit: "שליחה",
        successTitle: "הפנייה התקבלה בהצלחה",
        successBody: "ניצור איתך קשר בהקדם.",
        sendAnother: "שליחת פנייה נוספת",
        unexpectedError: "שגיאה לא צפויה",
      }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const token = await executeRecaptcha("submit_lead")
      const leadId = generateLeadId()
      const msg = data.message?.trim()

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: leadId,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          source,
          pagePath: pagePathOverride ?? window.location.pathname,
          userAgent: navigator.userAgent,
          captchaToken: token,
          ...(msg ? { message: msg } : {}),
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.ok) {
        const attribution = getAttribution()
        const ctx = inferPageContext(pagePathOverride ?? window.location.pathname)
        const ctxNoService = { ...ctx }
        delete (ctxNoService as { service?: unknown }).service

        pushDataLayer("vow_lead_submit_error", {
          lead_id: leadId,
          lead_source: source,
          topic: getTopicFromUrl(),
          form_location: "inline",
          status_code: response.status,
          error_message: String(result?.error ?? "lead_submit_failed"),
          ...ctxNoService,
          service: mapLeadSourceToService(source),
          ...attribution,
          source: attribution.utm_source,
          medium: attribution.utm_medium,
          campaign: attribution.utm_campaign,
          term: attribution.utm_term,
          content: attribution.utm_content,
          referrer: document.referrer,
        })
        throw new Error(result?.error || (isEn ? "Could not save your submission" : "שגיאה בשמירת הנתונים"))
      }

      const returnedLeadId = typeof result?.lead_id === "string" ? result.lead_id : leadId
      const attribution = getAttribution()
      const ctx = inferPageContext(pagePathOverride ?? window.location.pathname)
      const ctxNoService = { ...ctx }
      delete (ctxNoService as { service?: unknown }).service

      pushDataLayer("vow_lead_submit", {
        lead_id: returnedLeadId,
        lead_source: source,
        topic: getTopicFromUrl(),
        form_location: "inline",
        ...ctxNoService,
        service: mapLeadSourceToService(source),
        ...attribution,
        source: attribution.utm_source,
        medium: attribution.utm_medium,
        campaign: attribution.utm_campaign,
        term: attribution.utm_term,
        content: attribution.utm_content,
        gclid: attribution.gclid,
        fbclid: attribution.fbclid,
        referrer: document.referrer,
      })

      pushDataLayer("vow_lead_submit_success", {
        lead_id: returnedLeadId,
        lead_source: source,
        topic: getTopicFromUrl(),
        form_location: "inline",
        ...ctxNoService,
        service: mapLeadSourceToService(source),
        ...attribution,
        source: attribution.utm_source,
        medium: attribution.utm_medium,
        campaign: attribution.utm_campaign,
        term: attribution.utm_term,
        content: attribution.utm_content,
        referrer: document.referrer,
      })

      setIsSuccess(true)
      reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : labels.unexpectedError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      aria-label={title}
      className="bg-[#F4F1EC] py-[var(--space-section)]"
      dir={isEn ? "ltr" : "rtl"}
    >
      <div id={anchorId} className="scroll-mt-24" />
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[640px] rounded-[18px] border border-[color:var(--vow-border)] bg-white px-6 py-10 shadow-sm sm:px-10">
          {!isSuccess ? (
            <>
              <H2 className="text-center">{title}</H2>
              {subtitle ? (
                <H3 className="mt-3 text-center font-normal text-black/80">{subtitle}</H3>
              ) : null}
              <form className="mx-auto mt-8 max-w-[400px] space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                  <label htmlFor={`inline-lead-${fieldSuffix}-fullName`} className="mb-1 block text-[18px] font-semibold">
                    {labels.fullName}
                  </label>
                  <input
                    id={`inline-lead-${fieldSuffix}-fullName`}
                    type="text"
                    autoComplete="name"
                    {...register("fullName")}
                    className="w-full rounded border border-[color:var(--vow-border)] px-3 py-3 text-[18px]"
                    dir={isEn ? "ltr" : "rtl"}
                  />
                  {errors.fullName ? (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor={`inline-lead-${fieldSuffix}-phone`} className="mb-1 block text-[18px] font-semibold">
                    {labels.phone}
                  </label>
                  <input
                    id={`inline-lead-${fieldSuffix}-phone`}
                    type="tel"
                    autoComplete="tel"
                    {...register("phone")}
                    className="w-full rounded border border-[color:var(--vow-border)] px-3 py-3 text-[18px]"
                    dir="ltr"
                  />
                  {errors.phone ? <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p> : null}
                </div>
                <div>
                  <label htmlFor={`inline-lead-${fieldSuffix}-email`} className="mb-1 block text-[18px] font-semibold">
                    {labels.email}
                  </label>
                  <input
                    id={`inline-lead-${fieldSuffix}-email`}
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className="w-full rounded border border-[color:var(--vow-border)] px-3 py-3 text-[18px]"
                    dir="ltr"
                  />
                  {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email.message}</p> : null}
                </div>
                <div>
                  <label htmlFor={`inline-lead-${fieldSuffix}-message`} className="mb-1 block text-[18px] font-semibold">
                    {labels.message}
                  </label>
                  <textarea
                    id={`inline-lead-${fieldSuffix}-message`}
                    rows={4}
                    {...register("message")}
                    className="w-full resize-y rounded border border-[color:var(--vow-border)] px-3 py-3 text-[18px]"
                    dir={isEn ? "ltr" : "rtl"}
                    placeholder={labels.messagePlaceholder}
                  />
                  {errors.message ? <p className="mt-1 text-sm text-red-600">{errors.message.message}</p> : null}
                </div>
                {error ? (
                  <div className="rounded bg-red-50 p-3 text-center text-sm text-red-600">{error}</div>
                ) : null}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary mt-2 w-full py-3 text-[18px] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? labels.sending : labels.submit}
                </button>
              </form>
            </>
          ) : (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-600" aria-hidden="true" />
              </div>
              <H2>{labels.successTitle}</H2>
              <p className="text-[20px] font-semibold leading-relaxed text-[#747474]">{labels.successBody}</p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="btn-primary mx-auto mt-2 px-8 py-3 text-[18px]"
              >
                {labels.sendAnother}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
