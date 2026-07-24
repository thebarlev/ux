"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const CATEGORY_OPTIONS_HE = [
  "התעניינות ברו״ח AI (אוטומציה פיננסית)",
  "בקשה לשיחת ייעוץ עם נציג (רו״ח לעסק)",
  "התעניינות בשיווק דיגיטלי לעסק",
  "התעניינות בעיצוב ומיתוג",
  "התעניינות בפיתוח אתרים / אפליקציות / מערכות",
  "התעניינות ב״חשבונית ירוקה״ מאובטחת (הפקה וחתימה)",
  "אחר",
] as const

const CATEGORY_OPTIONS_EN = [
  "Interest in AI accountant (financial automation)",
  "Request a consultation call (accountant for business)",
  "Interest in digital marketing",
  "Interest in design and branding",
  "Interest in web / app / systems development",
  "Interest in secure digital invoice (creation and signing)",
  "Other",
] as const

function createFormSchema(locale: "he" | "en") {
  const msgs =
    locale === "en"
      ? {
          fullName: "Full name is required",
          phone: "Invalid phone number",
          email: "Invalid email address",
          subject: "Subject is required",
          category: "Category is required",
          message: "Message is too short",
        }
      : {
          fullName: "שם מלא חובה",
          phone: "מספר טלפון לא תקין",
          email: "כתובת אימייל לא תקינה",
          subject: "נושא חובה",
          category: "קטגוריה חובה",
          message: "ההודעה קצרה מדי",
        }
  return z.object({
    fullName: z.string().trim().min(2, msgs.fullName),
    phone: z.string().trim().min(9, msgs.phone),
    email: z.string().trim().email(msgs.email),
    subject: z.string().trim().min(1, msgs.subject),
    category: z.string().trim().min(1, msgs.category),
    message: z.string().trim().min(10, msgs.message),
  })
}

type FormData = z.infer<ReturnType<typeof createFormSchema>>

export function ContactForm({ locale = "he" }: { locale?: "he" | "en" }) {
  const formSchema = createFormSchema(locale)
  const isEn = locale === "en"
  const categoryOptions = isEn ? CATEGORY_OPTIONS_EN : CATEGORY_OPTIONS_HE
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    },
  })

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    setIsSuccess(false)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName,
          phone: values.phone,
          email: values.email,
          subject: values.subject,
          category: values.category,
          message: values.message,
        }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.ok) {
        const code = String(result?.error || "")
        if (code === "missing_fields") {
          throw new Error(isEn ? "Please fill in all required fields." : "אנא מלא/י את כל השדות הנדרשים.")
        }
        throw new Error(isEn ? "Sending failed. Please try again." : "שליחת הפנייה נכשלה. נסה/י שוב.")
      }

      setIsSuccess(true)
      reset()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : isEn ? "Unexpected error" : "שגיאה לא צפויה")
    } finally {
      setIsSubmitting(false)
    }
  }

  const successMsg = isEn ? "Message sent successfully" : "הפנייה נשלחה בהצלחה"
  const labels = isEn
    ? { fullName: "Full name", phone: "Phone", email: "Email", subject: "Subject", category: "Category", message: "Message" }
    : { fullName: "שם מלא", phone: "נייד", email: 'דוא"ל', subject: "נושא", category: "קטגוריה", message: "הודעה" }
  const selectPlaceholder = isEn ? "Select category" : "בחר/י קטגוריה"
  const submitLabel = isSubmitting ? (isEn ? "Sending..." : "שולח...") : isEn ? "Send" : "שליחה"

  return (
    <div dir={isEn ? "ltr" : "rtl"} className={isEn ? "text-left" : "text-right"}>
      {isSuccess && (
        <div className="mb-4 rounded bg-green-50 p-4 text-center text-[16px] font-semibold text-green-800">
          {successMsg}
        </div>
      )}

      {submitError && (
        <div className="mb-4 rounded bg-red-50 p-3 text-center text-sm text-red-600">
          {submitError}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset disabled={isSubmitting} className="space-y-4 disabled:opacity-70">
          <div>
            <label htmlFor="fullName" className="mb-1 block text-[20px] font-semibold">
              {labels.fullName}
            </label>
            <input
              id="fullName"
              type="text"
              {...register("fullName")}
              className="w-full rounded border px-3 py-3 bg-white"
              dir={isEn ? "ltr" : "rtl"}
              autoComplete="name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-1 block text-[20px] font-semibold">
                {labels.phone}
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className="w-full rounded border px-3 py-3 bg-white"
                dir="ltr"
                autoComplete="tel"
                inputMode="tel"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-[20px] font-semibold">
                {labels.email}
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full rounded border px-3 py-3 bg-white"
                dir="ltr"
                autoComplete="email"
                inputMode="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="mb-1 block text-[20px] font-semibold">
              {labels.subject}
            </label>
            <input
              id="subject"
              type="text"
              {...register("subject")}
              className=" bg-white w-full rounded border px-3 py-3"
              dir={isEn ? "ltr" : "rtl"}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="mb-1 block text-[20px] font-semibold">
              {labels.category}
            </label>
            <select
              id="category"
              {...register("category")}
              className="w-full rounded border bg-white px-3 py-3"
              dir={isEn ? "ltr" : "rtl"}
              defaultValue=""
            >
              <option value="" disabled>
                {selectPlaceholder}
              </option>
              {categoryOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-[20px] font-semibold">
              {labels.message}
            </label>
            <textarea
              id="message"
              {...register("message")}
              className=" bg-white min-h-[140px] w-full resize-y rounded border px-3 py-3"
              dir={isEn ? "ltr" : "rtl"}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitLabel}
          </button>
        </fieldset>
      </form>
    </div>
  )
}

