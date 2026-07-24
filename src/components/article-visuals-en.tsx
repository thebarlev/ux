"use client"

/**
 * EN-only article visuals for English blog posts.
 * LTR, marketing content, no Hebrew. Use in EN MDX articles only.
 */

import React, { useState } from "react"
import { H3 } from "@/components/ui/Heading"

// ── Types ──────────────────────────────────────

type TagVariant = "good" | "warn" | "bad"

interface BarItem {
  label: string
  value: number
  display: string
  color: string
}

interface FunnelStage {
  label: string
  pct: number
  note?: string
  color: string
}

interface MetricRow {
  name: string
  shortName: string
  description: string
  good: string
  bad: string
}

interface ActionRow {
  action: string
  difficulty: TagVariant
  difficultyLabel: string
  impact: TagVariant
  impactLabel: string
}

const TAG_CLASSES: Record<TagVariant, string> = {
  good: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warn: "bg-amber-50 text-amber-700 border border-amber-200",
  bad: "bg-red-50 text-red-600 border border-red-200",
}

function Tag({ variant, children }: { variant: TagVariant; children: React.ReactNode }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[18px] font-semibold ${TAG_CLASSES[variant]}`}>
      {children}
    </span>
  )
}

const textAlign = "left" as const

// ── 1. SpeedBarChart ──────────────────────────

const BAR_DATA: BarItem[] = [
  { label: "1–2 sec", value: 100, display: "100% conv.", color: "#2a7a4b" },
  { label: "3 sec", value: 84, display: "~84%", color: "#4a9a6a" },
  { label: "4 sec", value: 70, display: "~70%", color: "#c07a00" },
  { label: "5 sec", value: 57, display: "~57%", color: "#d4401a" },
  { label: "6 sec", value: 50, display: "~50%", color: "#8b1a00" },
]

export function SpeedBarChart() {
  return (
    <figure className="my-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm not-prose" dir="ltr">
      <figcaption className="mb-5 text-[18px] font-semibold uppercase tracking-widest text-neutral-400" style={{ textAlign }}>
        Load time impact on conversion rate - vs. fast site
      </figcaption>
      <div className="space-y-3">
        {BAR_DATA.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-24 flex-shrink-0 text-[18px] text-neutral-500" style={{ textAlign }}>{item.label}</span>
            <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-neutral-100">
              <div
                className="flex h-full items-center justify-start rounded-md px-3 text-[18px] font-bold text-white transition-all duration-700"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              >
                {item.display}
              </div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}

// ── 2. ConversionFunnel ───────────────────────

const FUNNEL_DATA: FunnelStage[] = [
  { label: "Landed on site", pct: 100, color: "#2a7a4b" },
  { label: "Saw initial content", pct: 80, color: "#4a9a6a", note: "20% left during load" },
  { label: "Scrolled content", pct: 60, color: "#e6a817", note: "Less scroll = less exposure to forms" },
  { label: "Reached form / CTA", pct: 40, color: "#c07a00" },
  { label: "Filled form", pct: 25, color: "#d4401a", note: "Only a quarter of visitors got here" },
]

export function ConversionFunnel() {
  return (
    <figure className="my-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm not-prose" dir="ltr">
      <figcaption className="mb-5 text-[18px] font-semibold uppercase tracking-widest text-neutral-400" style={{ textAlign }}>
        What happens to a visit as load time increases
      </figcaption>
      <div className="space-y-2.5">
        {FUNNEL_DATA.map((stage) => (
          <div key={stage.label} className="flex items-center gap-3">
            <div
              className="flex h-10 flex-shrink-0 items-center rounded-md px-4 text-[18px] font-semibold text-white"
              style={{ width: `${stage.pct}%`, backgroundColor: stage.color, minWidth: "8rem" }}
            >
              {stage.label}
            </div>
            {stage.note && <span className="text-[18px] text-neutral-400">{stage.note}</span>}
          </div>
        ))}
      </div>
    </figure>
  )
}

// ── 3. MetricsTable ───────────────────────────

const METRICS: MetricRow[] = [
  { name: "TTFB", shortName: "Server response", description: "How fast the server starts sending content", good: "Under 0.8s", bad: "Over 1.8s" },
  { name: "LCP", shortName: "Main content load", description: "When the largest element appears", good: "Under 2.5s", bad: "Over 4s" },
  { name: "Time to Interactive", shortName: "Time to interactive", description: "When the page is actually usable", good: "Under 3.8s", bad: "Over 7.3s" },
]

export function MetricsTable() {
  return (
    <div className="my-8 overflow-x-auto not-prose" dir="ltr">
      <table className="w-full border-collapse rounded-xl overflow-hidden border border-neutral-200 bg-white text-[18px] shadow-sm">
        <thead>
          <tr className="bg-neutral-900 text-white">
            <th className="p-3 font-semibold" style={{ textAlign }}>Metric</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>What it measures</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>Good</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>Problematic</th>
          </tr>
        </thead>
        <tbody>
          {METRICS.map((row, i) => (
            <tr key={row.name} className={i % 2 === 1 ? "bg-neutral-50" : "bg-white"}>
              <td className="p-3 font-semibold" style={{ textAlign }}>
                {row.name}
                <span className="block text-[18px] font-normal text-neutral-400">{row.shortName}</span>
              </td>
              <td className="p-3 text-neutral-600" style={{ textAlign }}>{row.description}</td>
              <td className="p-3" style={{ textAlign }}><Tag variant="good">{row.good}</Tag></td>
              <td className="p-3" style={{ textAlign }}><Tag variant="bad">{row.bad}</Tag></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── 4. ActionsTable ───────────────────────────

const ACTIONS: ActionRow[] = [
  { action: "Compress images to WebP", difficulty: "good", difficultyLabel: "Low", impact: "good", impactLabel: "High" },
  { action: "Remove non-critical scripts", difficulty: "good", difficultyLabel: "Low–medium", impact: "good", impactLabel: "High" },
  { action: "Enable CDN", difficulty: "warn", difficultyLabel: "Medium", impact: "good", impactLabel: "High" },
  { action: "Lazy-load form and CTA", difficulty: "warn", difficultyLabel: "Medium", impact: "good", impactLabel: "High for lead pages" },
  { action: "Move to faster infrastructure", difficulty: "bad", difficultyLabel: "High", impact: "good", impactLabel: "Very high" },
]

export function ActionsTable() {
  return (
    <div className="my-8 overflow-x-auto not-prose" dir="ltr">
      <table className="w-full border-collapse rounded-xl overflow-hidden border border-neutral-200 bg-white text-[18px] shadow-sm">
        <thead>
          <tr className="bg-neutral-900 text-white">
            <th className="p-3 font-semibold" style={{ textAlign }}>Action</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>Difficulty</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>Impact on speed</th>
          </tr>
        </thead>
        <tbody>
          {ACTIONS.map((row, i) => (
            <tr key={row.action} className={i % 2 === 1 ? "bg-neutral-50" : "bg-white"}>
              <td className="p-3 text-neutral-700" style={{ textAlign }}>{row.action}</td>
              <td className="p-3" style={{ textAlign }}><Tag variant={row.difficulty}>{row.difficultyLabel}</Tag></td>
              <td className="p-3" style={{ textAlign }}><Tag variant={row.impact}>{row.impactLabel}</Tag></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── 5. Callout ────────────────────────────────

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-8 rounded-xl border-r-4 border-orange-500 bg-orange-50 px-5 py-4 text-[18px] text-orange-900 not-prose" dir="ltr">
      {children}
    </aside>
  )
}

// ── 6. PlatformComparisonTable ────────────────

const PLATFORM_ROWS = [
  { need: "Self-managed content", platform: "WordPress", reason: "Mature CMS, easy editing without dev" },
  { need: "Performance and full control", platform: "Next.js / modern stack", reason: "Fast load, flexible integrations" },
  { need: "Simplicity and quick setup", platform: "Wix / closed platform", reason: "All-in-one, no infra to manage" },
  { need: "Small, very fast site", platform: "Static site", reason: "Minimal resources, max speed" },
]

export function PlatformComparisonTable() {
  return (
    <div className="my-8 overflow-x-auto not-prose" dir="ltr">
      <table className="w-full border-collapse rounded-xl overflow-hidden border border-neutral-200 bg-white text-[18px] shadow-sm">
        <thead>
          <tr className="bg-neutral-900 text-white">
            <th className="p-3 font-semibold" style={{ textAlign }}>If you care most about</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>You&apos;ll likely prefer</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>Why</th>
          </tr>
        </thead>
        <tbody>
          {PLATFORM_ROWS.map((row, i) => (
            <tr key={row.need} className={i % 2 === 1 ? "bg-neutral-50" : "bg-white"}>
              <td className="p-3 font-semibold text-neutral-800" style={{ textAlign }}>{row.need}</td>
              <td className="p-3" style={{ textAlign }}>
                <span className="inline-block rounded-full bg-neutral-100 px-3 py-0.5 text-[18px] font-semibold text-neutral-700">{row.platform}</span>
              </td>
              <td className="p-3 text-neutral-500 text-[18px]" style={{ textAlign }}>{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── 7. PlatformSelector ───────────────────────

const PLATFORM_MISTAKES = [
  { num: "01", title: "Choosing by trend, not by need", desc: "Popular tech doesn't necessarily fit your project." },
  { num: "02", title: "Building SaaS on a blog-friendly stack", desc: "Needs are completely different - plan infra for business logic." },
  { num: "03", title: "Building a small corporate site on overly complex stack", desc: "Unnecessary complexity slows dev and increases maintenance cost." },
  { num: "04", title: "Not thinking about long-term maintenance", desc: "Choosing a platform is also choosing who maintains it and how." },
]

export function PlatformSelector() {
  return (
    <div className="my-8 not-prose grid gap-3 sm:grid-cols-2" dir="ltr">
      {PLATFORM_MISTAKES.map((m) => (
        <div key={m.num} className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <span className="flex-shrink-0 text-2xl font-black text-neutral-200 leading-none">{m.num}</span>
          <div>
            <p className="font-semibold text-neutral-800 text-[18px] mb-1">{m.title}</p>
            <p className="text-[18px] text-neutral-500 leading-relaxed">{m.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── 8. AiReadabilityPillars ───────────────────

const PILLARS = [
  { icon: "💬", title: "Clear answer to a clear question", desc: 'Headlines phrased like real queries: "What is…", "How to…", "How much…"', color: "border-blue-200 bg-blue-50", titleColor: "text-blue-800" },
  { icon: "🗂️", title: "Clean, structured layout", desc: "Short paragraphs, clear H2/H3 headings, lists and FAQ. Messy content makes it hard to extract answers.", color: "border-violet-200 bg-violet-50", titleColor: "text-violet-800" },
  { icon: "🏅", title: "Credibility and expertise", desc: "Who wrote it? What's their experience? Does the site focus on one area? AI looks for a source - not an anonymous writer.", color: "border-emerald-200 bg-emerald-50", titleColor: "text-emerald-800" },
]

export function AiReadabilityPillars() {
  return (
    <div className="my-8 not-prose grid gap-4 sm:grid-cols-3" dir="ltr">
      {PILLARS.map((p) => (
        <div key={p.title} className={`rounded-xl border p-5 ${p.color}`}>
          <div className="text-2xl mb-3">{p.icon}</div>
          <H3 className={`mb-2 font-bold ${p.titleColor}`}>{p.title}</H3>
          <p className="text-[18px] text-neutral-600 leading-relaxed">{p.desc}</p>
        </div>
      ))}
    </div>
  )
}

// ── 9. ContentStructureTable ──────────────────

const CONTENT_ROWS = [
  { type: "Pillar page", structure: "H1 + direct answer + H2 × 5–10 + FAQ", words: "1,500–3,000", goal: "Deep topic coverage" },
  { type: "Support article", structure: "H1 + focused answer + H2 × 3–5", words: "600–1,200", goal: "Deep dive on specific point" },
  { type: "FAQ page", structure: "Question + answer × 8–15", words: "800–1,500", goal: "Capture direct queries" },
  { type: "Landing page", structure: "H1 + CTA + 3–5 focused blocks", words: "300–600", goal: "Conversion, not info" },
]

export function ContentStructureTable() {
  return (
    <div className="my-8 overflow-x-auto not-prose" dir="ltr">
      <table className="w-full border-collapse rounded-xl overflow-hidden border border-neutral-200 bg-white text-[18px] shadow-sm">
        <thead>
          <tr className="bg-neutral-900 text-white">
            <th className="p-3 font-semibold" style={{ textAlign }}>Content type</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>Recommended structure</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>Word range</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>Goal</th>
          </tr>
        </thead>
        <tbody>
          {CONTENT_ROWS.map((row, i) => (
            <tr key={row.type} className={i % 2 === 1 ? "bg-neutral-50" : "bg-white"}>
              <td className="p-3 font-semibold text-neutral-800" style={{ textAlign }}>{row.type}</td>
              <td className="p-3 text-neutral-500 text-[18px] leading-relaxed" style={{ textAlign }}>{row.structure}</td>
              <td className="p-3" style={{ textAlign }}>
                <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-[18px] font-semibold text-neutral-600">{row.words}</span>
              </td>
              <td className="p-3 text-neutral-600 text-[18px]" style={{ textAlign }}>{row.goal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── 10. ChecklistTimeline ─────────────────────

const TIMELINE = [
  { weeks: "Week 1–2", title: "Define core topics", tasks: ["Choose 3–5 services you want to be known for", "List 10–20 real questions customers ask around each"], color: "border-blue-200 bg-blue-50", dot: "bg-blue-400" },
  { weeks: "Week 3–6", title: "Build pillar pages", tasks: ["Clear headline + direct answer paragraph at top of each page", "Sections in Q&A structure", "Organized FAQ at end of each page"], color: "border-violet-200 bg-violet-50", dot: "bg-violet-400" },
  { weeks: "Week 7–10", title: "Publish support articles", tasks: ["Articles that go deep on specific points", "Clear internal links to pillar page", "Consistent publishing - at least one article per week"], color: "border-emerald-200 bg-emerald-50", dot: "bg-emerald-400" },
  { weeks: "Week 11–12", title: "Review and strengthen", tasks: ["Search questions in your field on Perplexity / ChatGPT / Gemini", "Check who gets cited - and what's missing from your content", "Update and deepen pages that aren't strong enough"], color: "border-orange-200 bg-orange-50", dot: "bg-orange-400" },
]

export function ChecklistTimeline() {
  return (
    <div className="my-8 not-prose space-y-4" dir="ltr">
      {TIMELINE.map((phase) => (
        <div key={phase.weeks} className={`rounded-xl border p-5 ${phase.color}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${phase.dot}`} />
            <span className="text-[18px] font-semibold text-neutral-400 uppercase tracking-widest">{phase.weeks}</span>
            <span className="font-bold text-neutral-800 text-[18px]">{phase.title}</span>
          </div>
          <ul className="space-y-1.5 pl-5">
            {phase.tasks.map((task) => (
              <li key={task} className="text-[18px] text-neutral-600 leading-relaxed flex gap-2">
                <span className="mt-1 flex-shrink-0 text-neutral-300">◦</span>
                {task}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* ─── Invoicing components (EN only) ───────────────────────── */

const c = { text: "#18181b", muted: "#71717a", border: "#e4e4e7", bg: "#fafafa", white: "#ffffff", blue: "#2563eb", blueSoft: "#eff6ff", red: "#dc2626", redSoft: "#fef2f2", green: "#16a34a", greenSoft: "#f0fdf4", amber: "#d97706", amberSoft: "#fffbeb" } as const
const radius = "8px"
const font = "'Segoe UI',Arial,sans-serif"

const Box = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ fontFamily: font, direction: "ltr", margin: "28px 0 36px", ...style }}>{children}</div>
)

const INVOICING_MISTAKES = [
  { icon: "⚖️", title: "Incomplete regulation", points: ["Allocation numbers not sent automatically to tax authority", "Digital signature not personal or not compliant", "Cumbersome reporting processes"], note: "This isn't a nice feature - it's a legal requirement." },
  { icon: "🐌", title: "System that slows you down", points: ["Long production time per document at high volume", "No API or integrations with existing tools", "Limits on document count in free plan"], note: "Every small delay adds up to hours by month end." },
  { icon: "💸", title: "Price that looks cheap - until you start using", points: ["High processing fees not shown on pricing page", "Paid add-ons for features that seem basic", "Per-document cost that jumps fast past plan limit"], note: "Check the full picture, not just the initial price." },
  { icon: "🙉", title: "Support that doesn't really help", points: ["Chatbot instead of a real person", "Long response times exactly when you need urgent help", "No onboarding support for initial setup"], note: "When something breaks at a critical moment - you need fast human response." },
  { icon: "🔓", title: "Weak data security", points: ["No long-term automatic backup", "No transparency on data retention policy", "No compliance with security standards for financial data"], note: "You're handling customer financial data - it's critical." },
]

export function CommonMistakesAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <Box>
      <div style={{ border: `1px solid ${c.border}`, borderRadius: radius, overflow: "hidden" }}>
        {INVOICING_MISTAKES.map((m, i) => {
          const isOpen = open === i
          return (
            <div key={i} style={{ borderBottom: i < INVOICING_MISTAKES.length - 1 ? `1px solid ${c.border}` : "none" }}>
              <button onClick={() => setOpen(isOpen ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", background: isOpen ? c.bg : c.white, border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}>
                <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: c.red, color: "#fff", fontSize: "18px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontSize: "18px" }}>{m.icon}</span>
                <span style={{ flex: 1, fontSize: "18px", fontWeight: "600", color: c.text, textAlign: "left" }}>{m.title}</span>
                <span style={{ fontSize: "18px", color: c.muted, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>›</span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 18px 16px 58px", background: c.bg }}>
                  {m.points.map((p, j) => (
                    <div key={j} style={{ display: "flex", gap: "8px", padding: "8px 0", borderBottom: j < m.points.length - 1 ? `1px dashed ${c.border}` : "none", fontSize: "18px", color: "#52525b", lineHeight: "1.6" }}>
                      <span style={{ color: c.red, fontWeight: "700", flexShrink: 0 }}>×</span>
                      {p}
                    </div>
                  ))}
                  <div style={{ marginTop: "12px", padding: "10px 12px", background: c.amberSoft, borderRadius: "6px", fontSize: "18px", color: "#92400e", fontStyle: "italic" }}>{m.note}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Box>
  )
}

const CHECKLIST = [
  "Does the system fully support Israeli invoices and automatic allocation numbers?", "Is the digital signature personal and archived as required?", "Is there a real free trial without entering a credit card?",
  "Are there integrations or API if you'll need them later?", "What payment methods are available and what's the actual fee?", "Is the interface full in your language and mobile-friendly?",
  "What does support look like: phone? chat? response time?", "What reports exist and are they enough for your needs?", "What happens when you grow - does the price jump significantly?", "What do real users say in external reviews?",
]

export function BeforeSigningChecklist() {
  const [checked, setChecked] = useState<number[]>([])
  const toggle = (i: number) => setChecked((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))
  const done = checked.length
  const pct = Math.round((done / CHECKLIST.length) * 100)
  return (
    <Box>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div style={{ flex: 1, height: "6px", background: c.border, borderRadius: "99px", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: "99px", width: `${pct}%`, background: pct === 100 ? c.green : c.blue, transition: "width 0.3s ease" }} />
        </div>
        <span style={{ fontSize: "18px", color: c.muted, whiteSpace: "nowrap" }}>{done} / {CHECKLIST.length}</span>
      </div>
      <div style={{ border: `1px solid ${c.border}`, borderRadius: radius, overflow: "hidden" }}>
        {CHECKLIST.map((item, i) => {
          const isDone = checked.includes(i)
          return (
            <div key={i} onClick={() => toggle(i)} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 16px", cursor: "pointer", background: isDone ? c.greenSoft : c.white, borderBottom: i < CHECKLIST.length - 1 ? `1px solid ${c.border}` : "none", transition: "background 0.15s" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0, marginTop: "2px", border: `2px solid ${isDone ? c.green : c.border}`, background: isDone ? c.green : c.white, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                {isDone && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <span style={{ fontSize: "18px", lineHeight: "1.6", color: isDone ? "#6b7280" : c.text, textDecoration: isDone ? "line-through" : "none" }}>
                <span style={{ color: c.muted, fontSize: "18px", marginLeft: "6px" }}>{i + 1}.</span>
                {item}
              </span>
            </div>
          )
        })}
      </div>
    </Box>
  )
}

const BIZ_TYPES = [
  { emoji: "👤", type: "Freelancer / exempt", p1: { label: "Low monthly price", bg: "#dbeafe", color: "#1e40af" }, p2: { label: "Simple interface", bg: "#e0e7ff", color: "#3730a3" }, p3: { label: "Basic payment", bg: "#dcfce7", color: "#15803d" } },
  { emoji: "📦", type: "High-volume business", p1: { label: "Production speed", bg: "#dcfce7", color: "#15803d" }, p2: { label: "Automation", bg: "#fef9c3", color: "#854d0e" }, p3: { label: "Advanced reports", bg: "#e0e7ff", color: "#3730a3" } },
  { emoji: "🔌", type: "SaaS / business with integrations", p1: { label: "Full API", bg: "#fce7f3", color: "#9d174d" }, p2: { label: "Webhooks", bg: "#ede9fe", color: "#5b21b6" }, p3: { label: "CRM / ERP connection", bg: "#dbeafe", color: "#1e40af" } },
  { emoji: "🚀", type: "Growing business", p1: { label: "Price scale", bg: "#fef9c3", color: "#854d0e" }, p2: { label: "User management", bg: "#dcfce7", color: "#15803d" }, p3: { label: "Advanced permissions", bg: "#fff1f2", color: "#9f1239" } },
]

const PriorityTag = ({ label, bg, color }: { label: string; bg: string; color: string }) => (
  <span style={{ background: bg, color, fontSize: "18px", fontWeight: "600", padding: "3px 9px", borderRadius: "20px", whiteSpace: "nowrap" }}>{label}</span>
)

export function BusinessTypeTable() {
  return (
    <Box>
      <div style={{ border: `1px solid ${c.border}`, borderRadius: radius, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "18px" }}>
          <thead>
            <tr style={{ background: "#18181b", color: "#fff" }}>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: "600", fontSize: "18px", letterSpacing: "0.04em" }}>Business type</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: "600", fontSize: "18px", letterSpacing: "0.04em" }}>Priority 1</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: "600", fontSize: "18px", letterSpacing: "0.04em" }}>Priority 2</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: "600", fontSize: "18px", letterSpacing: "0.04em" }}>Priority 3</th>
            </tr>
          </thead>
          <tbody>
            {BIZ_TYPES.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? c.white : c.bg, borderBottom: `1px solid ${c.border}` }}>
                <td style={{ padding: "12px 16px", fontWeight: "600", color: c.text, textAlign: "left" }}><span style={{ marginLeft: "6px" }}>{row.emoji}</span>{row.type}</td>
                <td style={{ padding: "12px 16px" }}><PriorityTag {...row.p1} /></td>
                <td style={{ padding: "12px 16px" }}><PriorityTag {...row.p2} /></td>
                <td style={{ padding: "12px 16px" }}><PriorityTag {...row.p3} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  )
}

const SUPPORT_QS = [
  { icon: "👋", q: "Is there human support in your language?" }, { icon: "⏱️", q: "How long to get a response?" },
  { icon: "📚", q: "Is there structured onboarding?" }, { icon: "🔓", q: "Can you leave easily without contract lock-in?" },
]

export function SupportChecks() {
  return (
    <Box>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
        {SUPPORT_QS.map((item, i) => (
          <div key={i} style={{ background: c.white, border: `1px solid ${c.border}`, borderRadius: radius, padding: "20px 16px", textAlign: "center" }}>
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>{item.icon}</div>
            <p style={{ margin: 0, fontSize: "18px", color: c.text, lineHeight: "1.55" }}>{item.q}</p>
          </div>
        ))}
      </div>
    </Box>
  )
}

const STEPS = [
  "Open 2–3 trial accounts in parallel", "Issue at least 50–100 real documents in each system", "Check payment, reports and export to accountant",
  "Contact support with a real question and see how they respond", "Calculate total cost by annual document count - not monthly",
]

export function HowToChooseSteps() {
  const [done, setDone] = useState<number[]>([])
  const toggle = (i: number) => setDone((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))
  return (
    <Box>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {STEPS.map((step, i) => {
          const isDone = done.includes(i)
          return (
            <div key={i} onClick={() => toggle(i)} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", cursor: "pointer", background: isDone ? c.greenSoft : c.white, border: `1px solid ${isDone ? "#bbf7d0" : c.border}`, borderRadius: radius, transition: "all 0.15s" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0, background: isDone ? c.green : "#18181b", color: "#fff", fontSize: "18px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}>{isDone ? "✓" : `0${i + 1}`}</div>
              <span style={{ fontSize: "18px", lineHeight: "1.55", color: isDone ? "#6b7280" : c.text, textDecoration: isDone ? "line-through" : "none" }}>{step}</span>
            </div>
          )
        })}
      </div>
    </Box>
  )
}

const SUMMARY = [
  { icon: "✅", label: "Regulatory compliance", desc: "Local invoices, allocation numbers, compliant digital signature" },
  { icon: "⚡", label: "Performance and speed", desc: "Fast production at high volume, responsive interface" },
  { icon: "🔒", label: "Data security", desc: "Automatic backup, data transparency, security standards" },
  { icon: "💰", label: "Cost transparency", desc: "No surprises, clear fees, open pricing" },
  { icon: "📈", label: "Growth fit", desc: "Smooth scale, user management, plan flexibility" },
]

export function FinalSummaryGrid() {
  return (
    <Box>
      <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: radius, padding: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "12px" }}>
          {SUMMARY.map((item, i) => (
            <div key={i} style={{ background: c.white, border: `1px solid ${c.border}`, borderRadius: radius, padding: "16px 14px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "700", color: c.text, marginBottom: "4px" }}>{item.label}</div>
                <div style={{ fontSize: "18px", color: c.muted, lineHeight: "1.5" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: "20px 0 0", padding: "16px 0 0", borderTop: `1px solid ${c.border}`, fontSize: "18px", color: "#3d3a35", lineHeight: "1.7" }}>
          Don&apos;t choose by ad or price alone. Choose by real fit for your business needs today - and in a year.
        </p>
      </div>
    </Box>
  )
}

/* ─── Negative receipt components (EN only) ───────────────── */

const WHEN_YES = [
  { icon: "🧾", title: "Receipt issued by mistake", desc: "Issued a receipt before real payment was made." },
  { icon: "↩️", title: "Refund to customer", desc: "Cancel transaction, partial or full refund." },
  { icon: "📊", title: "Fix books record", desc: "So reports are accurate and balanced." },
]

export function WhenToUseCards() {
  return (
    <Box>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px", marginBottom: "14px" }}>
        {WHEN_YES.map((item, i) => (
          <div key={i} style={{ background: c.white, border: `1px solid ${c.border}`, borderTop: `3px solid ${c.green}`, borderRadius: radius, padding: "16px 14px" }}>
            <div style={{ fontSize: "22px", marginBottom: "8px" }}>{item.icon}</div>
            <div style={{ fontSize: "18px", fontWeight: "700", color: c.text, marginBottom: "4px" }}>{item.title}</div>
            <div style={{ fontSize: "18px", color: c.muted, lineHeight: "1.55" }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: c.amberSoft, border: "1px solid #fde68a", borderRadius: radius, padding: "14px 16px" }}>
        <span style={{ fontSize: "18px", flexShrink: 0 }}>⚠️</span>
        <p style={{ margin: 0, fontSize: "18px", color: "#92400e", lineHeight: "1.65" }}>
          <strong>Do not</strong> use a negative receipt to cancel an invoice. In that case issue a <strong>credit note</strong>. Negative receipts apply to receipts only.
        </p>
      </div>
    </Box>
  )
}

const FLOW_STEPS = [
  { n: "01", text: "Open the original document" },
  { n: "02", text: 'Select "Cancel" or "Issue negative receipt"' },
  { n: "03", text: "System copies customer and transaction details, flips amount to negative" },
  { n: "04", text: "Both documents saved in books - original and negative" },
]

export function HowItWorksFlow() {
  return (
    <Box>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
        {FLOW_STEPS.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0, background: c.text, color: "#fff", fontSize: "18px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>{step.n}</div>
            <div style={{ flex: 1, padding: "11px 14px", background: c.white, border: `1px solid ${c.border}`, borderRadius: radius, fontSize: "18px", color: c.text }}>{step.text}</div>
          </div>
        ))}
      </div>
      <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: radius, padding: "16px 20px" }}>
        <div style={{ fontSize: "18px", fontWeight: "700", color: c.muted, letterSpacing: "0.06em", marginBottom: "12px" }}>Example</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: c.white, border: `1px solid ${c.border}`, borderRight: `3px solid ${c.green}`, borderRadius: radius, padding: "10px 14px" }}>
            <span style={{ fontSize: "18px", fontWeight: "600", color: c.text }}>Receipt #001</span>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ background: c.greenSoft, color: c.green, fontSize: "18px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px" }}>Credit</span>
              <span style={{ fontSize: "18px", fontWeight: "700", color: c.green }}>+500 ₪</span>
            </div>
          </div>
          <div style={{ textAlign: "center", color: c.muted, fontSize: "18px", lineHeight: 1 }}>↓</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: c.white, border: `1px solid ${c.border}`, borderRight: `3px solid ${c.red}`, borderRadius: radius, padding: "10px 14px" }}>
            <span style={{ fontSize: "18px", fontWeight: "600", color: c.text }}>Negative receipt #002</span>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ background: c.redSoft, color: c.red, fontSize: "18px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px" }}>Cancel</span>
              <span style={{ fontSize: "18px", fontWeight: "700", color: c.red }}>−500 ₪</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: c.blueSoft, border: "1px solid #bfdbfe", borderRadius: radius, padding: "10px 14px", marginTop: "4px" }}>
            <span style={{ fontSize: "18px", color: c.blue, fontWeight: "600" }}>Result: Books balanced</span>
            <span style={{ fontSize: "18px", fontWeight: "700", color: c.blue }}>0 ₪</span>
          </div>
        </div>
      </div>
    </Box>
  )
}

const REQS = [
  { req: "Automatic negative receipt creation", why: "For payment refund - without manual intervention", status: { label: "Critical", bg: c.redSoft, color: c.red } },
  { req: "Clear link between documents", why: "To know which negative receipt belongs to which original", status: { label: "Critical", bg: c.redSoft, color: c.red } },
  { req: "Clear status per document", why: "Active / Cancelled / Credited - visible in interface", status: { label: "Important", bg: c.amberSoft, color: c.amber } },
  { req: "Inclusion in reports", why: "Both documents appear in reports consistently", status: { label: "Important", bg: c.amberSoft, color: c.amber } },
]

const RequirementTag = ({ label, bg, color }: { label: string; bg: string; color: string }) => (
  <span style={{ background: bg, color, fontSize: "18px", fontWeight: "600", padding: "3px 9px", borderRadius: "20px", whiteSpace: "nowrap" }}>{label}</span>
)

export function SaasRequirementsTable() {
  return (
    <Box>
      <div style={{ border: `1px solid ${c.border}`, borderRadius: radius, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "18px" }}>
          <thead>
            <tr style={{ background: "#18181b", color: "#fff" }}>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: "600", fontSize: "18px", letterSpacing: "0.04em" }}>Requirement</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: "600", fontSize: "18px", letterSpacing: "0.04em" }}>Why it matters</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: "600", fontSize: "18px", letterSpacing: "0.04em" }}>Priority</th>
            </tr>
          </thead>
          <tbody>
            {REQS.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? c.white : c.bg, borderBottom: `1px solid ${c.border}` }}>
                <td style={{ padding: "12px 16px", fontWeight: "600", color: c.text }}>{row.req}</td>
                <td style={{ padding: "12px 16px", color: "#52525b" }}>{row.why}</td>
                <td style={{ padding: "12px 16px" }}><RequirementTag {...row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  )
}
