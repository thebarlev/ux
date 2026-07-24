"use client"

/**
 * EN-only automation article visuals for English blog posts.
 * LTR, marketing content, no Hebrew. Use in EN MDX articles only.
 */

import React, { useState } from "react"

const c = { text: "#18181b", muted: "#71717a", border: "#e4e4e7", bg: "#fafafa", white: "#ffffff", blue: "#2563eb", blueSoft: "#eff6ff", green: "#16a34a", greenSoft: "#f0fdf4", amber: "#d97706", amberSoft: "#fffbeb", purple: "#7c3aed", purpleSoft: "#f5f3ff" } as const
const radius = "8px"
const font = "'Segoe UI',Arial,sans-serif"

const Box = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ fontFamily: font, direction: "ltr", margin: "28px 0 36px", ...style }}>{children}</div>
)

const FIRST_STEPS = [
  { n: "01", title: "Open a free account", body: "Easiest to start: Make.com (formerly Integromat). For something even simpler - Zapier.", tag: "5 min", tagColor: c.greenSoft, tagText: c.green },
  { n: "02", title: "Watch a 10-minute video", body: 'Search YouTube: "first automation in Make" or "n8n for beginners". Goal: understand what a basic flow looks like, not learn everything.', tag: "10 min", tagColor: c.blueSoft, tagText: c.blue },
  { n: "03", title: "Pick one recurring task", body: "Take 3 tasks you do over and over. Write on paper: trigger (what starts it) → actions (what happens next).", tag: "10 min", tagColor: c.amberSoft, tagText: c.amber },
  { n: "04", title: "Build your first automation", body: "In Make: choose Webhook as trigger → connect to form → add Google Sheets → Add Row. Run a test and see it update in real time.", tag: "30 min", tagColor: c.purpleSoft, tagText: c.purple },
  { n: "05", title: "Iterate and improve", body: "That's part of it. Start small: 2–3 steps only. Most tools offer ready templates and help you find where the chain breaks.", tag: "Ongoing", tagColor: c.greenSoft, tagText: c.green },
] as const

export function FirstStepsTimeline() {
  const [done, setDone] = useState<number[]>([])
  const toggle = (i: number) => setDone((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]))
  return (
    <Box>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {FIRST_STEPS.map((step, i) => {
          const isDone = done.includes(i)
          return (
            <div key={step.n} onClick={() => toggle(i)} style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "14px 16px", cursor: "pointer", background: isDone ? c.greenSoft : c.white, border: `1px solid ${isDone ? "#bbf7d0" : c.border}`, borderRadius: radius, transition: "all 0.15s" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0, background: isDone ? c.green : c.text, color: "#fff", fontSize: "18px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}>{isDone ? "✓" : step.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "18px", fontWeight: "600", color: isDone ? "#6b7280" : c.text, textDecoration: isDone ? "line-through" : "none" }}>{step.title}</span>
                  <span style={{ fontSize: "18px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px", background: step.tagColor, color: step.tagText }}>{step.tag}</span>
                </div>
                <p style={{ margin: 0, fontSize: "18px", color: "#52525b", lineHeight: "1.6" }}>{step.body}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Box>
  )
}

const TOOLS = [
  { name: "Make.com", level: { label: "Beginner", bg: "#dcfce7", color: "#15803d" }, free: "Generous", when: "When you want flexibility + serious workflows", example: "Lead → Sheets → Email" },
  { name: "Zapier", level: { label: "Very easy", bg: "#dbeafe", color: "#1e40af" }, free: "More limited", when: "When you want the simplest and fastest", example: "Form → Email" },
  { name: "n8n", level: { label: "Intermediate", bg: "#fef9c3", color: "#854d0e" }, free: "Free (self-host)", when: "When you want full control and larger workflows", example: "Webhook → DB" },
] as const

const LevelTag = ({ label, bg, color }: { label: string; bg: string; color: string }) => (
  <span style={{ background: bg, color, fontSize: "18px", fontWeight: "600", padding: "3px 9px", borderRadius: "20px", whiteSpace: "nowrap" }}>{label}</span>
)

export function ToolsComparisonTable() {
  return (
    <Box>
      <div style={{ border: `1px solid ${c.border}`, borderRadius: radius, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "18px" }}>
          <thead>
            <tr style={{ background: "#18181b", color: "#fff" }}>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: "600", fontSize: "18px", letterSpacing: "0.04em" }}>Tool</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: "600", fontSize: "18px", letterSpacing: "0.04em" }}>Level</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: "600", fontSize: "18px", letterSpacing: "0.04em" }}>Free?</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: "600", fontSize: "18px", letterSpacing: "0.04em" }}>When to use</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: "600", fontSize: "18px", letterSpacing: "0.04em" }}>Example</th>
            </tr>
          </thead>
          <tbody>
            {TOOLS.map((t, i) => (
              <tr key={t.name} style={{ background: i % 2 === 0 ? c.white : c.bg, borderBottom: `1px solid ${c.border}` }}>
                <td style={{ padding: "12px 16px", fontWeight: "700", color: c.text }}>{t.name}</td>
                <td style={{ padding: "12px 16px" }}><LevelTag {...t.level} /></td>
                <td style={{ padding: "12px 16px", color: "#52525b" }}>{t.free}</td>
                <td style={{ padding: "12px 16px", color: "#52525b" }}>{t.when}</td>
                <td style={{ padding: "12px 16px" }}>
                  <code style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "4px", padding: "2px 7px", fontSize: "18px", color: c.purple }}>{t.example}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  )
}

const EXAMPLES = [
  { icon: "🎯", title: "Leads", flow: ["Website form", "Row in Sheets", "Welcome email", "Lead in CRM"], color: c.blueSoft, border: "#bfdbfe" },
  { icon: "💳", title: "Payments", flow: ["Webhook from gateway", "Auto invoice", "Archive", "Notification"], color: c.greenSoft, border: "#bbf7d0" },
  { icon: "📄", title: "Documents", flow: ["Create doc", "Export PDF", "Send email", "Backup"], color: c.amberSoft, border: "#fde68a" },
  { icon: "📣", title: "Marketing", flow: ["New user", "Segment assignment", "Email sequence", "Reminder"], color: c.purpleSoft, border: "#ddd6fe" },
  { icon: "🛎️", title: "Support", flow: ["Support form", "Open ticket", "Notify team", "Slack / Telegram"], color: "#fff1f2", border: "#fecdd3" },
] as const

const Arrow = () => <span style={{ color: c.muted, fontSize: "18px", flexShrink: 0, padding: "0 2px" }}>›</span>

export function PracticalExamplesGrid() {
  return (
    <Box>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
        {EXAMPLES.map((ex) => (
          <div key={ex.title} style={{ background: ex.color, border: `1px solid ${ex.border}`, borderRadius: radius, padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "20px" }}>{ex.icon}</span>
              <span style={{ fontSize: "18px", fontWeight: "700", color: c.text }}>{ex.title}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "4px" }}>
              {ex.flow.map((step, j) => (
                <span key={`${ex.title}-${j}`} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "18px", color: "#374151", background: "rgba(255,255,255,0.7)", borderRadius: "4px", padding: "2px 7px", whiteSpace: "nowrap" }}>{step}</span>
                  {j < ex.flow.length - 1 && <Arrow />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "16px", padding: "14px 16px", background: c.white, border: `1px solid ${c.border}`, borderRadius: radius, fontSize: "18px", color: "#3d3a35", lineHeight: "1.7" }}>
        What you feel quickly: less manual work, fewer errors, and more time for what actually moves the business forward.
      </div>
    </Box>
  )
}
