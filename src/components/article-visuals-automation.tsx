"use client"

import React, { useState } from "react"

const c = {
  text: "#18181b",
  muted: "#71717a",
  border: "#e4e4e7",
  bg: "#fafafa",
  white: "#ffffff",
  blue: "#2563eb",
  blueSoft: "#eff6ff",
  green: "#16a34a",
  greenSoft: "#f0fdf4",
  amber: "#d97706",
  amberSoft: "#fffbeb",
  purple: "#7c3aed",
  purpleSoft: "#f5f3ff",
} as const

const radius = "8px"
const font = "'Segoe UI','Arial Hebrew',Arial,sans-serif"

const Box = ({
  children,
  dir = "rtl",
  style = {},
}: {
  children: React.ReactNode
  dir?: "ltr" | "rtl"
  style?: React.CSSProperties
}) => (
  <div style={{ fontFamily: font, direction: dir, margin: "28px 0 36px", ...style }}>
    {children}
  </div>
)

/* ══════════════════════════════════════════════
   1) FirstStepsTimeline
   ══════════════════════════════════════════════ */
const FIRST_STEPS_HE = [
  {
    n: "01",
    title: "פותחים חשבון בכלי חינמי",
    body: "הכי נוח להתחלה: Make.com (לשעבר Integromat). אם אתה רוצה משהו עוד יותר פשוט – Zapier.",
    tag: "5 דקות",
    tagColor: c.greenSoft,
    tagText: c.green,
  },
  {
    n: "02",
    title: "רואים סרטון קצר של 10 דקות",
    body: 'חפש ביוטיוב: "אוטומציה ראשונה בMake" או "n8n למתחילים". המטרה לא ללמוד הכול – רק להבין איך נראה תהליך בסיסי.',
    tag: "10 דקות",
    tagColor: c.blueSoft,
    tagText: c.blue,
  },
  {
    n: "03",
    title: "בוחרים משימה אחת שחוזרת אצלך",
    body: "קח 3 משימות שאתה עושה שוב ושוב. כתוב על דף: טריגר (מה מפעיל) ← פעולות (מה קורה אחרי).",
    tag: "10 דקות",
    tagColor: c.amberSoft,
    tagText: c.amber,
  },
  {
    n: "04",
    title: "בונים אוטומציה ראשונה",
    body: "בMake: בחר Webhook כטריגר ← חבר לטופס ← הוסף Google Sheets → Add Row. תריץ בדיקה ותראה שזה נכנס בזמן אמת.",
    tag: "30 דקות",
    tagColor: c.purpleSoft,
    tagText: c.purple,
  },
  {
    n: "05",
    title: "מתקדמים דרך ניסוי וטעייה",
    body: "זה חלק מהעניין. תתחיל קטן: 2–3 צעדים בלבד. רוב הכלים נותנים Templates מוכנים ועוזרים להבין איפה נשברת השרשרת.",
    tag: "חוזר",
    tagColor: c.greenSoft,
    tagText: c.green,
  },
] as const

const FIRST_STEPS_EN = [
  {
    n: "01",
    title: "Open a free account",
    body: "Easiest to start: Make.com (formerly Integromat). For something even simpler - Zapier.",
    tag: "5 min",
    tagColor: c.greenSoft,
    tagText: c.green,
  },
  {
    n: "02",
    title: "Watch a 10-minute video",
    body: 'Search YouTube: "first automation in Make" or "n8n for beginners". Goal: understand what a basic flow looks like, not learn everything.',
    tag: "10 min",
    tagColor: c.blueSoft,
    tagText: c.blue,
  },
  {
    n: "03",
    title: "Pick one recurring task",
    body: "Take 3 tasks you do over and over. Write on paper: trigger (what starts it) → actions (what happens next).",
    tag: "10 min",
    tagColor: c.amberSoft,
    tagText: c.amber,
  },
  {
    n: "04",
    title: "Build your first automation",
    body: "In Make: choose Webhook as trigger → connect to form → add Google Sheets → Add Row. Run a test and see it update in real time.",
    tag: "30 min",
    tagColor: c.purpleSoft,
    tagText: c.purple,
  },
  {
    n: "05",
    title: "Iterate and improve",
    body: "That's part of it. Start small: 2–3 steps only. Most tools offer ready templates and help you find where the chain breaks.",
    tag: "Ongoing",
    tagColor: c.greenSoft,
    tagText: c.green,
  },
] as const

export function FirstStepsTimeline({ locale = "he" }: { locale?: "he" | "en" }) {
  const steps = locale === "en" ? FIRST_STEPS_EN : FIRST_STEPS_HE
  const [done, setDone] = useState<number[]>([])
  const toggle = (i: number) =>
    setDone((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]))

  return (
    <Box dir={locale === "en" ? "ltr" : "rtl"}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {steps.map((step, i) => {
          const isDone = done.includes(i)
          return (
            <div
              key={step.n}
              onClick={() => toggle(i)}
              style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
                padding: "14px 16px",
                cursor: "pointer",
                background: isDone ? c.greenSoft : c.white,
                border: `1px solid ${isDone ? "#bbf7d0" : c.border}`,
                borderRadius: radius,
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: isDone ? c.green : c.text,
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.15s",
                }}
              >
                {isDone ? "✓" : step.n}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "4px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: isDone ? "#6b7280" : c.text,
                      textDecoration: isDone ? "line-through" : "none",
                    }}
                  >
                    {step.title}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      padding: "2px 8px",
                      borderRadius: "20px",
                      background: step.tagColor,
                      color: step.tagText,
                    }}
                  >
                    {step.tag}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: "13px", color: "#52525b", lineHeight: "1.6" }}>
                  {step.body}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Box>
  )
}

/* ══════════════════════════════════════════════
   2) ToolsComparisonTable
   ══════════════════════════════════════════════ */
type ToolRow = {
  name: string
  level: { label: string; bg: string; color: string }
  free: string
  when: string
  example: string
}

const TOOLS_HE: readonly ToolRow[] = [
  {
    name: "Make.com",
    level: { label: "מתחיל", bg: "#dcfce7", color: "#15803d" },
    free: "נדיב",
    when: "כשאתה רוצה גמישות + תהליכים רציניים",
    example: "ליד → Sheets → מייל",
  },
  {
    name: "Zapier",
    level: { label: "מתחיל מאוד", bg: "#dbeafe", color: "#1e40af" },
    free: "מוגבל יותר",
    when: "כשאתה רוצה הכי פשוט ומהיר",
    example: "Form → Email",
  },
  {
    name: "n8n",
    level: { label: "בינוני", bg: "#fef9c3", color: "#854d0e" },
    free: "חינמי (self-host)",
    when: "כשאתה רוצה שליטה מלאה ותהליכים גדולים",
    example: "Webhook → DB",
  },
] as const

const TOOLS_EN: readonly ToolRow[] = [
  {
    name: "Make.com",
    level: { label: "Beginner", bg: "#dcfce7", color: "#15803d" },
    free: "Generous",
    when: "When you want flexibility + serious workflows",
    example: "Lead → Sheets → Email",
  },
  {
    name: "Zapier",
    level: { label: "Very easy", bg: "#dbeafe", color: "#1e40af" },
    free: "More limited",
    when: "When you want the simplest and fastest",
    example: "Form → Email",
  },
  {
    name: "n8n",
    level: { label: "Intermediate", bg: "#fef9c3", color: "#854d0e" },
    free: "Free (self-host)",
    when: "When you want full control and larger workflows",
    example: "Webhook → DB",
  },
] as const

const LevelTag = ({ label, bg, color }: { label: string; bg: string; color: string }) => (
  <span
    style={{
      background: bg,
      color,
      fontSize: "11.5px",
      fontWeight: "600",
      padding: "3px 9px",
      borderRadius: "20px",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </span>
)

const TABLE_HEADERS_HE = ["כלי", "רמה", "חינמי?", "מתי מתאים", "דוגמה"] as const
const TABLE_HEADERS_EN = ["Tool", "Level", "Free?", "When to use", "Example"] as const

export function ToolsComparisonTable({ locale = "he" }: { locale?: "he" | "en" }) {
  const tools = locale === "en" ? TOOLS_EN : TOOLS_HE
  const headers = locale === "en" ? TABLE_HEADERS_EN : TABLE_HEADERS_HE
  return (
    <Box dir={locale === "en" ? "ltr" : "rtl"}>
      <div style={{ border: `1px solid ${c.border}`, borderRadius: radius, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ background: "#18181b", color: "#fff" }}>
              {headers.map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "11px 16px",
                    textAlign: locale === "en" ? "left" : "right",
                    fontWeight: "600",
                    fontSize: "12px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tools.map((t, i) => (
              <tr
                key={t.name}
                style={{
                  background: i % 2 === 0 ? c.white : c.bg,
                  borderBottom: `1px solid ${c.border}`,
                }}
              >
                <td style={{ padding: "12px 16px", fontWeight: "700", color: c.text }}>{t.name}</td>
                <td style={{ padding: "12px 16px" }}><LevelTag {...t.level} /></td>
                <td style={{ padding: "12px 16px", color: "#52525b" }}>{t.free}</td>
                <td style={{ padding: "12px 16px", color: "#52525b" }}>{t.when}</td>
                <td style={{ padding: "12px 16px" }}>
                  <code
                    style={{
                      background: c.bg,
                      border: `1px solid ${c.border}`,
                      borderRadius: "4px",
                      padding: "2px 7px",
                      fontSize: "12px",
                      color: c.purple,
                    }}
                  >
                    {t.example}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  )
}

/* ══════════════════════════════════════════════
   3) PracticalExamplesGrid
   ══════════════════════════════════════════════ */
const EXAMPLES_HE = [
  { icon: "🎯", title: "לידים", flow: ["טופס באתר", "שורה בSheets", "מייל ברוך הבא", "ליד במערכת"], color: c.blueSoft, border: "#bfdbfe" },
  { icon: "💳", title: "תשלומים", flow: ["Webhook מסליקה", "חשבונית אוטומטית", "שמירה לארכיון", "התראה"], color: c.greenSoft, border: "#bbf7d0" },
  { icon: "📄", title: "מסמכים", flow: ["יצירת מסמך", "יצוא PDF", "שליחה במייל", "גיבוי"], color: c.amberSoft, border: "#fde68a" },
  { icon: "📣", title: "שיווק", flow: ["משתמש חדש", "שיוך לסגמנט", "סדרת מיילים", "תזכורת"], color: c.purpleSoft, border: "#ddd6fe" },
  { icon: "🛎️", title: "תמיכה", flow: ["טופס תמיכה", "פתיחת טיקט", "הודעה לצוות", "Slack / Telegram"], color: "#fff1f2", border: "#fecdd3" },
] as const

const EXAMPLES_EN = [
  { icon: "🎯", title: "Leads", flow: ["Website form", "Row in Sheets", "Welcome email", "Lead in CRM"], color: c.blueSoft, border: "#bfdbfe" },
  { icon: "💳", title: "Payments", flow: ["Webhook from gateway", "Auto invoice", "Archive", "Notification"], color: c.greenSoft, border: "#bbf7d0" },
  { icon: "📄", title: "Documents", flow: ["Create doc", "Export PDF", "Send email", "Backup"], color: c.amberSoft, border: "#fde68a" },
  { icon: "📣", title: "Marketing", flow: ["New user", "Segment assignment", "Email sequence", "Reminder"], color: c.purpleSoft, border: "#ddd6fe" },
  { icon: "🛎️", title: "Support", flow: ["Support form", "Open ticket", "Notify team", "Slack / Telegram"], color: "#fff1f2", border: "#fecdd3" },
] as const

const RESULT_TEXT_HE = "התוצאה שאתה מרגיש מהר: פחות עבודה ידנית, פחות טעויות, ויותר זמן לדברים שבאמת מקדמים את העסק."
const RESULT_TEXT_EN = "What you feel quickly: less manual work, fewer errors, and more time for what actually moves the business forward."

const Arrow = () => <span style={{ color: c.muted, fontSize: "12px", flexShrink: 0, padding: "0 2px" }}>›</span>

export function PracticalExamplesGrid({ locale = "he" }: { locale?: "he" | "en" }) {
  const examples = locale === "en" ? EXAMPLES_EN : EXAMPLES_HE
  const resultText = locale === "en" ? RESULT_TEXT_EN : RESULT_TEXT_HE
  return (
    <Box dir={locale === "en" ? "ltr" : "rtl"}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
        {examples.map((ex) => (
          <div
            key={ex.title}
            style={{
              background: ex.color,
              border: `1px solid ${ex.border}`,
              borderRadius: radius,
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "20px" }}>{ex.icon}</span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: c.text }}>{ex.title}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "4px" }}>
              {ex.flow.map((step, j) => (
                <span key={`${ex.title}-${j}`} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#374151",
                      background: "rgba(255,255,255,0.7)",
                      borderRadius: "4px",
                      padding: "2px 7px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {step}
                  </span>
                  {j < ex.flow.length - 1 && <Arrow />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "16px",
          padding: "14px 16px",
          background: c.white,
          border: `1px solid ${c.border}`,
          borderRadius: radius,
          fontSize: "13.5px",
          color: "#3d3a35",
          lineHeight: "1.7",
        }}
      >
        {resultText}
      </div>
    </Box>
  )
}

