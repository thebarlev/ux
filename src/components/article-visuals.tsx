"use client"

import React, { useState } from "react"
import { H3 } from "@/components/ui/Heading"

// ─────────────────────────────────────────────
// article-visuals.tsx
// קומפוננטות ויזואליות למאמרים בבלוג (MDX)
// שימוש: import מתוך ה-MDX של המאמר
// ─────────────────────────────────────────────

// ── טיפוסים פנימיים ──────────────────────────

type TagVariant = "good" | "warn" | "bad";

interface BarItem {
  label: string;
  value: number; // 0–100 (אחוז ויזואלי)
  display: string;
  color: string;
}

interface FunnelStage {
  label: string;
  pct: number; // 0–100
  note?: string;
  color: string;
}

interface MetricRow {
  name: string;
  shortName: string;
  description: string;
  good: string;
  bad: string;
}

interface ActionRow {
  action: string;
  difficulty: TagVariant;
  difficultyLabel: string;
  impact: TagVariant;
  impactLabel: string;
}

// ── עזרים ────────────────────────────────────

const TAG_CLASSES: Record<TagVariant, string> = {
  good: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warn: "bg-amber-50 text-amber-700 border border-amber-200",
  bad: "bg-red-50 text-red-600 border border-red-200",
};

function Tag({ variant, children }: { variant: TagVariant; children: React.ReactNode }) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[18px] font-semibold ${TAG_CLASSES[variant]}`}
    >
      {children}
    </span>
  );
}

// ── 1. SpeedBarChart ──────────────────────────

const BAR_DATA_HE: BarItem[] = [
  { label: "1–2 שניות", value: 100, display: "100% המרות", color: "#2a7a4b" },
  { label: "3 שניות",   value: 84,  display: "~84%",        color: "#4a9a6a" },
  { label: "4 שניות",   value: 70,  display: "~70%",        color: "#c07a00" },
  { label: "5 שניות",   value: 57,  display: "~57%",        color: "#d4401a" },
  { label: "6 שניות",   value: 50,  display: "~50%",        color: "#8b1a00" },
];
const BAR_DATA_EN: BarItem[] = [
  { label: "1–2 sec", value: 100, display: "100% conv.", color: "#2a7a4b" },
  { label: "3 sec",   value: 84,  display: "~84%",       color: "#4a9a6a" },
  { label: "4 sec",   value: 70,  display: "~70%",       color: "#c07a00" },
  { label: "5 sec",   value: 57,  display: "~57%",       color: "#d4401a" },
  { label: "6 sec",   value: 50,  display: "~50%",      color: "#8b1a00" },
];

export function SpeedBarChart({ locale = "he" }: { locale?: "he" | "en" }) {
  const data = locale === "en" ? BAR_DATA_EN : BAR_DATA_HE
  const caption = locale === "en"
    ? "Load time impact on conversion rate - vs. fast site"
    : "השפעת זמן טעינה על שיעור ההמרה - ביחס לאתר מהיר"
  const textAlign = locale === "en" ? "left" : "right"
  return (
    <figure className="my-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm not-prose">
      <figcaption className="mb-5 text-[18px] font-semibold uppercase tracking-widest text-neutral-400" style={{ textAlign }}>
        {caption}
      </figcaption>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-24 flex-shrink-0 text-[18px] text-neutral-500" style={{ textAlign }}>
              {item.label}
            </span>
            <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-neutral-100">
              <div
                className={`flex h-full items-center rounded-md px-3 text-[18px] font-bold text-white transition-all duration-700 ${locale === "en" ? "justify-start" : "justify-end"}`}
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              >
                {item.display}
              </div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

// ── 2. ConversionFunnel ───────────────────────

const FUNNEL_DATA_HE: FunnelStage[] = [
  { label: "נכנסו לאתר",            pct: 100, color: "#2a7a4b" },
  { label: "ראו תוכן ראשוני",       pct: 80,  color: "#4a9a6a", note: "20% עזבו בטעינה" },
  { label: "גללו לתוכן",            pct: 60,  color: "#e6a817", note: "פחות גלילה = פחות חשיפה לטפסים" },
  { label: "הגיעו לטופס / CTA",     pct: 40,  color: "#c07a00" },
  { label: "מילאו טופס",            pct: 25,  color: "#d4401a", note: "רק רבע מהמבקרים הגיעו לכאן" },
];
const FUNNEL_DATA_EN: FunnelStage[] = [
  { label: "Landed on site",        pct: 100, color: "#2a7a4b" },
  { label: "Saw initial content",   pct: 80,  color: "#4a9a6a", note: "20% left during load" },
  { label: "Scrolled content",      pct: 60,  color: "#e6a817", note: "Less scroll = less exposure to forms" },
  { label: "Reached form / CTA",    pct: 40,  color: "#c07a00" },
  { label: "Filled form",           pct: 25,  color: "#d4401a", note: "Only a quarter of visitors got here" },
];

export function ConversionFunnel({ locale = "he" }: { locale?: "he" | "en" }) {
  const data = locale === "en" ? FUNNEL_DATA_EN : FUNNEL_DATA_HE
  const caption = locale === "en"
    ? "What happens to a visit as load time increases"
    : "מה קורה לביקור ככל שהטעינה מתארכת"
  const textAlign = locale === "en" ? "left" : "right"
  return (
    <figure className="my-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm not-prose">
      <figcaption className="mb-5 text-[18px] font-semibold uppercase tracking-widest text-neutral-400" style={{ textAlign }}>
        {caption}
      </figcaption>

      <div className="space-y-2.5">
        {data.map((stage) => (
          <div key={stage.label} className="flex items-center gap-3">
            <div
              className="flex h-10 flex-shrink-0 items-center rounded-md px-4 text-[18px] font-semibold text-white"
              style={{ width: `${stage.pct}%`, backgroundColor: stage.color, minWidth: "8rem" }}
            >
              {stage.label}
            </div>
            {stage.note && (
              <span className="text-[18px] text-neutral-400">{stage.note}</span>
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}

// ── 3. MetricsTable ───────────────────────────

const METRICS_HE: MetricRow[] = [
  { name: "TTFB", shortName: "תגובת השרת", description: "כמה מהר השרת מתחיל לשלוח תוכן", good: "מתחת ל־0.8 שנ'", bad: "מעל 1.8 שנ'" },
  { name: "LCP", shortName: "טעינת התוכן המרכזי", description: "מתי מופיע האלמנט הגדול בדף", good: "מתחת ל־2.5 שנ'", bad: "מעל 4 שנ'" },
  { name: "Time to Interactive", shortName: "זמן אינטראקציה", description: "מתי אפשר באמת ללחוץ ולהשתמש בדף", good: "מתחת ל־3.8 שנ'", bad: "מעל 7.3 שנ'" },
];
const METRICS_EN: MetricRow[] = [
  { name: "TTFB", shortName: "Server response", description: "How fast the server starts sending content", good: "Under 0.8s", bad: "Over 1.8s" },
  { name: "LCP", shortName: "Main content load", description: "When the largest element appears", good: "Under 2.5s", bad: "Over 4s" },
  { name: "Time to Interactive", shortName: "Time to interactive", description: "When the page is actually usable", good: "Under 3.8s", bad: "Over 7.3s" },
];
const METRICS_HEADERS = { he: ["מדד", "מה הוא מודד", "טוב", "בעייתי"], en: ["Metric", "What it measures", "Good", "Problematic"] } as const

export function MetricsTable({ locale = "he" }: { locale?: "he" | "en" }) {
  const metrics = locale === "en" ? METRICS_EN : METRICS_HE
  const headers = METRICS_HEADERS[locale]
  const textAlign = locale === "en" ? "left" : "right"
  return (
    <div className="my-8 overflow-x-auto not-prose">
      <table className="w-full border-collapse rounded-xl overflow-hidden border border-neutral-200 bg-white text-[18px] shadow-sm">
        <thead>
          <tr className="bg-neutral-900 text-white">
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[0]}</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[1]}</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[2]}</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[3]}</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((row, i) => (
            <tr key={row.name} className={i % 2 === 1 ? "bg-neutral-50" : "bg-white"}>
              <td className="p-3 font-semibold" style={{ textAlign }}>
                {row.name}
                <span className="block text-[18px] font-normal text-neutral-400">{row.shortName}</span>
              </td>
              <td className="p-3 text-neutral-600" style={{ textAlign }}>{row.description}</td>
              <td className="p-3" style={{ textAlign }}>
                <Tag variant="good">{row.good}</Tag>
              </td>
              <td className="p-3" style={{ textAlign }}>
                <Tag variant="bad">{row.bad}</Tag>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── 4. ActionsTable ───────────────────────────

const ACTIONS_HE: ActionRow[] = [
  {
    action: "כיווץ תמונות לפורמט WebP",
    difficulty: "good", difficultyLabel: "נמוך",
    impact: "good",     impactLabel: "גבוהה",
  },
  {
    action: "הסרת סקריפטים שאינם קריטיים",
    difficulty: "good", difficultyLabel: "נמוך–בינוני",
    impact: "good",     impactLabel: "גבוהה",
  },
  {
    action: "הפעלת CDN",
    difficulty: "warn", difficultyLabel: "בינוני",
    impact: "good",     impactLabel: "גבוהה",
  },
  {
    action: "טעינה ראשונה של הטופס וה-CTA",
    difficulty: "warn", difficultyLabel: "בינוני",
    impact: "good",     impactLabel: "גבוהה לדפי לידים",
  },
  { action: "מעבר לתשתית מהירה יותר", difficulty: "bad", difficultyLabel: "גבוה", impact: "good", impactLabel: "גבוהה מאוד" },
];
const ACTIONS_EN: ActionRow[] = [
  { action: "Compress images to WebP", difficulty: "good", difficultyLabel: "Low", impact: "good", impactLabel: "High" },
  { action: "Remove non-critical scripts", difficulty: "good", difficultyLabel: "Low–medium", impact: "good", impactLabel: "High" },
  { action: "Enable CDN", difficulty: "warn", difficultyLabel: "Medium", impact: "good", impactLabel: "High" },
  { action: "Lazy-load form and CTA", difficulty: "warn", difficultyLabel: "Medium", impact: "good", impactLabel: "High for lead pages" },
  { action: "Move to faster infrastructure", difficulty: "bad", difficultyLabel: "High", impact: "good", impactLabel: "Very high" },
];
const ACTIONS_HEADERS = { he: ["פעולה", "קושי", "השפעה על מהירות"], en: ["Action", "Difficulty", "Impact on speed"] } as const

export function ActionsTable({ locale = "he" }: { locale?: "he" | "en" }) {
  const actions = locale === "en" ? ACTIONS_EN : ACTIONS_HE
  const headers = ACTIONS_HEADERS[locale]
  const textAlign = locale === "en" ? "left" : "right"
  return (
    <div className="my-8 overflow-x-auto not-prose">
      <table className="w-full border-collapse rounded-xl overflow-hidden border border-neutral-200 bg-white text-[18px] shadow-sm">
        <thead>
          <tr className="bg-neutral-900 text-white">
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[0]}</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[1]}</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[2]}</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((row, i) => (
            <tr key={row.action} className={i % 2 === 1 ? "bg-neutral-50" : "bg-white"}>
              <td className="p-3 text-neutral-700" style={{ textAlign }}>{row.action}</td>
              <td className="p-3" style={{ textAlign }}>
                <Tag variant={row.difficulty}>{row.difficultyLabel}</Tag>
              </td>
              <td className="p-3" style={{ textAlign }}>
                <Tag variant={row.impact}>{row.impactLabel}</Tag>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── 5. Callout ────────────────────────────────

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-8 rounded-xl border-r-4 border-orange-500 bg-orange-50 px-5 py-4 text-[18px] text-orange-900 not-prose">
      {children}
    </aside>
  );
}

// ── 6. PlatformComparisonTable ────────────────

interface PlatformRow {
  need: string;
  platform: string;
  reason: string;
}

const PLATFORM_ROWS_HE: PlatformRow[] = [
  { need: "ניהול תוכן עצמאי",       platform: "וורדפרס",                  reason: "CMS בשל, עריכה נוחה בלי מפתח" },
  { need: "ביצועים ושליטה מלאה",    platform: "Next.js / תשתית מודרנית",  reason: "טעינה מהירה, אינטגרציות גמישות" },
  { need: "פשטות ומהירות הקמה",     platform: "Wix / פלטפורמה סגורה",    reason: "הכול כלול, בלי תשתית לניהול" },
  { need: "אתר קטן ומהיר במיוחד",   platform: "אתר סטטי",                 reason: "מינימום משאבים, מקסימום מהירות" },
];
const PLATFORM_ROWS_EN: PlatformRow[] = [
  { need: "Self-managed content",    platform: "WordPress",                 reason: "Mature CMS, easy editing without dev" },
  { need: "Performance and full control", platform: "Next.js / modern stack", reason: "Fast load, flexible integrations" },
  { need: "Simplicity and quick setup", platform: "Wix / closed platform", reason: "All-in-one, no infra to manage" },
  { need: "Small, very fast site",   platform: "Static site",               reason: "Minimal resources, max speed" },
];
const PLATFORM_HEADERS = { he: ["אם חשוב לך בעיקר", "כנראה שתעדיף", "למה"], en: ["If you care most about", "You'll likely prefer", "Why"] } as const

export function PlatformComparisonTable({ locale = "he" }: { locale?: "he" | "en" }) {
  const rows = locale === "en" ? PLATFORM_ROWS_EN : PLATFORM_ROWS_HE
  const headers = PLATFORM_HEADERS[locale]
  const textAlign = locale === "en" ? "left" : "right"
  return (
    <div className="my-8 overflow-x-auto not-prose">
      <table className="w-full border-collapse rounded-xl overflow-hidden border border-neutral-200 bg-white text-[18px] shadow-sm">
        <thead>
          <tr className="bg-neutral-900 text-white">
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[0]}</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[1]}</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[2]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.need} className={i % 2 === 1 ? "bg-neutral-50" : "bg-white"}>
              <td className="p-3 font-semibold text-neutral-800" style={{ textAlign }}>{row.need}</td>
              <td className="p-3" style={{ textAlign }}>
                <span className="inline-block rounded-full bg-neutral-100 px-3 py-0.5 text-[18px] font-semibold text-neutral-700">
                  {row.platform}
                </span>
              </td>
              <td className="p-3 text-neutral-500 text-[18px]" style={{ textAlign }}>{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── 7. PlatformSelector ───────────────────────

const PLATFORM_MISTAKES_HE = [
  { num: "01", title: "לבחור לפי טרנד, לא לפי צורך",            desc: "טכנולוגיה פופולרית לא בהכרח מתאימה לפרויקט שלך." },
  { num: "02", title: "לבנות SaaS על תשתית שמתאימה לבלוג",      desc: "הצרכים שונים לחלוטין - תכנן את התשתית לפי הלוגיקה העסקית." },
  { num: "03", title: "לבנות אתר תדמית קטן על תשתית מורכבת מדי", desc: "מורכבות מיותרת מאטה פיתוח ומגדילה עלויות תחזוקה." },
  { num: "04", title: "לא לחשוב על תחזוקה לטווח ארוך",           desc: "בחירת פלטפורמה היא גם בחירה של מי יתחזק אותה ואיך." },
];
const PLATFORM_MISTAKES_EN = [
  { num: "01", title: "Choosing by trend, not by need",            desc: "Popular tech doesn't necessarily fit your project." },
  { num: "02", title: "Building SaaS on a blog-friendly stack",    desc: "Needs are completely different - plan infra for business logic." },
  { num: "03", title: "Building a small corporate site on overly complex stack", desc: "Unnecessary complexity slows dev and increases maintenance cost." },
  { num: "04", title: "Not thinking about long-term maintenance", desc: "Choosing a platform is also choosing who maintains it and how." },
];

export function PlatformSelector({ locale = "he" }: { locale?: "he" | "en" }) {
  const mistakes = locale === "en" ? PLATFORM_MISTAKES_EN : PLATFORM_MISTAKES_HE
  return (
    <div className="my-8 not-prose grid gap-3 sm:grid-cols-2">
      {mistakes.map((m) => (
        <div
          key={m.num}
          className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
        >
          <span className="flex-shrink-0 text-2xl font-black text-neutral-200 leading-none">
            {m.num}
          </span>
          <div>
            <p className="font-semibold text-neutral-800 text-[18px] mb-1">{m.title}</p>
            <p className="text-[18px] text-neutral-500 leading-relaxed">{m.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── 8. AiReadabilityPillars ───────────────────

const PILLARS_HE = [
  { icon: "💬", title: "תשובה ברורה לשאלה ברורה", desc: 'כותרות שמנוסחות כמו שאילתות אמיתיות: "מה זה…", "איך עושים…", "כמה עולה…"', color: "border-blue-200 bg-blue-50", titleColor: "text-blue-800" },
  { icon: "🗂️", title: "מבנה נקי ומסודר", desc: "פסקאות קצרות, כותרות H2/H3 ברורות, רשימות וסעיפי FAQ. תוכן מבולגן מקשה על חילוץ תשובה.", color: "border-violet-200 bg-violet-50", titleColor: "text-violet-800" },
  { icon: "🏅", title: "אמינות וזיהוי מומחיות", desc: "מי כתב? מה הניסיון שלו? האם האתר מתמקד בתחום אחד? AI מחפשת מקור - לא כותב אנונימי.", color: "border-emerald-200 bg-emerald-50", titleColor: "text-emerald-800" },
];
const PILLARS_EN = [
  { icon: "💬", title: "Clear answer to a clear question", desc: 'Headlines phrased like real queries: "What is…", "How to…", "How much…"', color: "border-blue-200 bg-blue-50", titleColor: "text-blue-800" },
  { icon: "🗂️", title: "Clean, structured layout", desc: "Short paragraphs, clear H2/H3 headings, lists and FAQ. Messy content makes it hard to extract answers.", color: "border-violet-200 bg-violet-50", titleColor: "text-violet-800" },
  { icon: "🏅", title: "Credibility and expertise", desc: "Who wrote it? What's their experience? Does the site focus on one area? AI looks for a source - not an anonymous writer.", color: "border-emerald-200 bg-emerald-50", titleColor: "text-emerald-800" },
];

export function AiReadabilityPillars({ locale = "he" }: { locale?: "he" | "en" }) {
  const pillars = locale === "en" ? PILLARS_EN : PILLARS_HE
  return (
    <div className="my-8 not-prose grid gap-4 sm:grid-cols-3">
      {pillars.map((p) => (
        <div key={p.title} className={`rounded-xl border p-5 ${p.color}`}>
          <div className="text-2xl mb-3">{p.icon}</div>
          <H3 className={`mb-2 font-bold ${p.titleColor}`}>{p.title}</H3>
          <p className="text-[18px] text-neutral-600 leading-relaxed">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

// ── 9. ContentStructureTable ──────────────────

interface ContentRow {
  type: string;
  structure: string;
  words: string;
  goal: string;
}

const CONTENT_ROWS_HE: ContentRow[] = [
  { type: "עמוד עוגן",      structure: "H1 + תשובה ישירה + H2 × 5–10 + FAQ", words: "1,500–3,000", goal: "כיסוי נושא לעומק" },
  { type: "מאמר תמיכה",    structure: "H1 + תשובה ממוקדת + H2 × 3–5",        words: "600–1,200",  goal: "העמקה בנקודה ספציפית" },
  { type: "עמוד FAQ",      structure: "שאלה + תשובה × 8–15",                  words: "800–1,500",  goal: "לכידת שאילתות ישירות" },
  { type: "דף נחיתה",      structure: "H1 + CTA + 3–5 בלוקים ממוקדים",        words: "300–600",    goal: "המרה, לא מידע" },
];
const CONTENT_ROWS_EN: ContentRow[] = [
  { type: "Pillar page",   structure: "H1 + direct answer + H2 × 5–10 + FAQ", words: "1,500–3,000", goal: "Deep topic coverage" },
  { type: "Support article", structure: "H1 + focused answer + H2 × 3–5",     words: "600–1,200",  goal: "Deep dive on specific point" },
  { type: "FAQ page",     structure: "Question + answer × 8–15",              words: "800–1,500",  goal: "Capture direct queries" },
  { type: "Landing page", structure: "H1 + CTA + 3–5 focused blocks",         words: "300–600",    goal: "Conversion, not info" },
];
const CONTENT_HEADERS = { he: ["סוג תוכן", "מבנה מומלץ", "טווח מילים", "מטרה"], en: ["Content type", "Recommended structure", "Word range", "Goal"] } as const

export function ContentStructureTable({ locale = "he" }: { locale?: "he" | "en" }) {
  const rows = locale === "en" ? CONTENT_ROWS_EN : CONTENT_ROWS_HE
  const headers = CONTENT_HEADERS[locale]
  const textAlign = locale === "en" ? "left" : "right"
  return (
    <div className="my-8 overflow-x-auto not-prose">
      <table className="w-full border-collapse rounded-xl overflow-hidden border border-neutral-200 bg-white text-[18px] shadow-sm">
        <thead>
          <tr className="bg-neutral-900 text-white">
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[0]}</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[1]}</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[2]}</th>
            <th className="p-3 font-semibold" style={{ textAlign }}>{headers[3]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.type} className={i % 2 === 1 ? "bg-neutral-50" : "bg-white"}>
              <td className="p-3 font-semibold text-neutral-800" style={{ textAlign }}>{row.type}</td>
              <td className="p-3 text-neutral-500 text-[18px] leading-relaxed" style={{ textAlign }}>{row.structure}</td>
              <td className="p-3" style={{ textAlign }}>
                <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-[18px] font-semibold text-neutral-600">
                  {row.words}
                </span>
              </td>
              <td className="p-3 text-neutral-600 text-[18px]" style={{ textAlign }}>{row.goal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── 10. ChecklistTimeline ─────────────────────

interface TimelinePhase {
  weeks: string;
  title: string;
  tasks: string[];
  color: string;
  dot: string;
}

const TIMELINE_HE: TimelinePhase[] = [
  { weeks: "שבוע 1–2", title: "הגדרת נושאי ליבה", tasks: ["בחירת 3–5 שירותים שאתה רוצה להיות מזוהה איתם", "רישום 10–20 שאלות אמיתיות שלקוחות שואלים סביב כל אחד"], color: "border-blue-200 bg-blue-50", dot: "bg-blue-400" },
  { weeks: "שבוע 3–6", title: "בניית עמודי עוגן", tasks: ["כותרת ברורה + פסקת תשובה ישירה בתחילת כל עמוד", "סעיפים במבנה שאלה–תשובה", "FAQ מסודר בסוף כל עמוד"], color: "border-violet-200 bg-violet-50", dot: "bg-violet-400" },
  { weeks: "שבוע 7–10", title: "פרסום מאמרי תמיכה", tasks: ["מאמרים שמעמיקים בנקודות ספציפיות", "קישורים פנימיים ברורים לעמוד העוגן", "פרסום עקבי - לפחות מאמר אחד בשבוע"], color: "border-emerald-200 bg-emerald-50", dot: "bg-emerald-400" },
  { weeks: "שבוע 11–12", title: "בדיקה וחיזוק", tasks: ["חיפוש שאלות בתחום שלך ב-Perplexity / ChatGPT / Gemini", "בדיקה מי מצוטט - ומה חסר בתוכן שלך", "עדכון והעמקת עמודים שלא מספיק חזקים"], color: "border-orange-200 bg-orange-50", dot: "bg-orange-400" },
];
const TIMELINE_EN: TimelinePhase[] = [
  { weeks: "Week 1–2", title: "Define core topics", tasks: ["Choose 3–5 services you want to be known for", "List 10–20 real questions customers ask around each"], color: "border-blue-200 bg-blue-50", dot: "bg-blue-400" },
  { weeks: "Week 3–6", title: "Build pillar pages", tasks: ["Clear headline + direct answer paragraph at top of each page", "Sections in Q&A structure", "Organized FAQ at end of each page"], color: "border-violet-200 bg-violet-50", dot: "bg-violet-400" },
  { weeks: "Week 7–10", title: "Publish support articles", tasks: ["Articles that go deep on specific points", "Clear internal links to pillar page", "Consistent publishing - at least one article per week"], color: "border-emerald-200 bg-emerald-50", dot: "bg-emerald-400" },
  { weeks: "Week 11–12", title: "Review and strengthen", tasks: ["Search questions in your field on Perplexity / ChatGPT / Gemini", "Check who gets cited - and what's missing from your content", "Update and deepen pages that aren't strong enough"], color: "border-orange-200 bg-orange-50", dot: "bg-orange-400" },
];

export function ChecklistTimeline({ locale = "he" }: { locale?: "he" | "en" }) {
  const timeline = locale === "en" ? TIMELINE_EN : TIMELINE_HE
  const listPadding = locale === "en" ? "pl-5" : "pr-5"
  return (
    <div className="my-8 not-prose space-y-4">
      {timeline.map((phase) => (
        <div key={phase.weeks} className={`rounded-xl border p-5 ${phase.color}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${phase.dot}`} />
            <span className="text-[18px] font-semibold text-neutral-400 uppercase tracking-widest">
              {phase.weeks}
            </span>
            <span className="font-bold text-neutral-800 text-[18px]">{phase.title}</span>
          </div>
          <ul className={`space-y-1.5 ${listPadding}`}>
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
  );
}

/* ─── DESIGN TOKENS ─────────────────────────── */
const c = {
  text:    "#18181b",
  muted:   "#71717a",
  border:  "#e4e4e7",
  bg:      "#fafafa",
  white:   "#ffffff",
  blue:    "#2563eb",
  blueSoft:"#eff6ff",
  red:     "#dc2626",
  redSoft: "#fef2f2",
  green:   "#16a34a",
  greenSoft:"#f0fdf4",
  amber:   "#d97706",
  amberSoft:"#fffbeb",
};

const radius = "8px";
const font = "'Segoe UI','Arial Hebrew',Arial,sans-serif";

/* ─── SHARED ─────────────────────────────────── */
const Box = ({
  children,
  style = {},
  dir = "rtl",
}: {
  children: React.ReactNode
  style?: React.CSSProperties
  dir?: "rtl" | "ltr"
}) => (
  <div style={{ fontFamily: font, direction: dir, margin: "28px 0 36px", ...style }}>
    {children}
  </div>
);

/* ══════════════════════════════════════════════
   1. CommonMistakesAccordion
   ══════════════════════════════════════════════ */
const INVOICING_MISTAKES_HE = [
  { icon: "⚖️", title: "רגולציה שלא סגורה עד הסוף", points: ["מספרי הקצאה שלא נשלחים אוטומטית לרשות המסים", "חתימה דיגיטלית שאינה אישית או אינה תואמת דרישות", "תהליכי דיווח מסורבלים מול רשות המסים"], note: "זו לא פונקציה נחמדה – זו חובה חוקית." },
  { icon: "🐌", title: "מערכת שמאטה אותך", points: ["זמן הפקה ארוך לכל מסמך בנפח גבוה", "אין API או אינטגרציות לכלים קיימים", "מגבלות על מספר מסמכים בתוכנית החינמית"], note: "כל עיכוב קטן מצטבר לשעות עבודה בסוף החודש." },
  { icon: "💸", title: "מחיר שנראה זול – עד שמתחילים להשתמש", points: ["עמלות סליקה גבוהות שאינן מוצגות בעמוד התמחור", "תוספות בתשלום על פיצ'רים שנראים בסיסיים", "עלות למסמך נוסף שקופצת מהר ממגבלת החבילה"], note: "בדוק את התמונה הכוללת, לא רק את המחיר הראשוני." },
  { icon: "🙉", title: "תמיכה שלא באמת עוזרת", points: ["צ'אטבוט אוטומטי במקום אדם אמיתי", "זמני תגובה ארוכים בדיוק כשצריך עזרה דחופה", "אין ליווי בהגדרה ראשונית של החשבון"], note: "כשיש תקלה ברגע קריטי – אתה צריך מענה אנושי מהיר." },
  { icon: "🔓", title: "אבטחת מידע חלשה", points: ["אין גיבוי אוטומטי לטווח ארוך", "אין שקיפות לגבי מדיניות שמירת נתונים", "אין עמידה בתקני אבטחה רלוונטיים לנתונים פיננסיים"], note: "אתה עובד עם נתונים פיננסיים של לקוחות – זה קריטי." },
];
const INVOICING_MISTAKES_EN = [
  { icon: "⚖️", title: "Incomplete regulation", points: ["Allocation numbers not sent automatically to tax authority", "Digital signature not personal or not compliant", "Cumbersome reporting processes"], note: "This isn't a nice feature - it's a legal requirement." },
  { icon: "🐌", title: "System that slows you down", points: ["Long production time per document at high volume", "No API or integrations with existing tools", "Limits on document count in free plan"], note: "Every small delay adds up to hours by month end." },
  { icon: "💸", title: "Price that looks cheap - until you start using", points: ["High processing fees not shown on pricing page", "Paid add-ons for features that seem basic", "Per-document cost that jumps fast past plan limit"], note: "Check the full picture, not just the initial price." },
  { icon: "🙉", title: "Support that doesn't really help", points: ["Chatbot instead of a real person", "Long response times exactly when you need urgent help", "No onboarding support for initial setup"], note: "When something breaks at a critical moment - you need fast human response." },
  { icon: "🔓", title: "Weak data security", points: ["No long-term automatic backup", "No transparency on data retention policy", "No compliance with security standards for financial data"], note: "You're handling customer financial data - it's critical." },
];

export function CommonMistakesAccordion({ locale = "he" }: { locale?: "he" | "en" }) {
  const [open, setOpen] = useState<number | null>(null)
  const mistakes = locale === "en" ? INVOICING_MISTAKES_EN : INVOICING_MISTAKES_HE
  const textAlign = locale === "en" ? "left" : "right"
  return (
    <Box dir={locale === "en" ? "ltr" : "rtl"}>
      <div style={{ border: `1px solid ${c.border}`, borderRadius: radius, overflow: "hidden" }}>
        {mistakes.map((m, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderBottom: i < mistakes.length - 1 ? `1px solid ${c.border}` : "none" }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  gap: "12px", padding: "14px 18px",
                  background: isOpen ? c.bg : c.white,
                  border: "none", cursor: "pointer", textAlign,
                  transition: "background 0.15s",
                }}
              >
                <span style={{
                  width: "26px", height: "26px", borderRadius: "50%",
                  background: c.red, color: "#fff",
                  fontSize: "12px", fontWeight: "700",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>{i + 1}</span>
                <span style={{ fontSize: "18px" }}>{m.icon}</span>
                <span style={{ flex: 1, fontSize: "14px", fontWeight: "600", color: c.text, textAlign }}>
                  {m.title}
                </span>
                <span style={{
                  fontSize: "16px", color: c.muted,
                  transform: isOpen ? "rotate(90deg)" : "none",
                  transition: "transform 0.2s", display: "inline-block",
                }}>›</span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 18px 16px 18px", ...(locale === "en" ? { paddingLeft: "58px" } : { paddingRight: "58px" }), background: c.bg }}>
                  {m.points.map((p, j) => (
                    <div key={j} style={{
                      display: "flex", gap: "8px",
                      padding: "8px 0",
                      borderBottom: j < m.points.length - 1 ? `1px dashed ${c.border}` : "none",
                      fontSize: "13.5px", color: "#52525b", lineHeight: "1.6",
                    }}>
                      <span style={{ color: c.red, fontWeight: "700", flexShrink: 0 }}>×</span>
                      {p}
                    </div>
                  ))}
                  <div style={{
                    marginTop: "12px", padding: "10px 12px",
                    background: c.amberSoft, borderRadius: "6px",
                    fontSize: "13px", color: "#92400e", fontStyle: "italic",
                  }}>
                    {m.note}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Box>
  );
}

/* ══════════════════════════════════════════════
   2. BeforeSigningChecklist
   ══════════════════════════════════════════════ */
const CHECKLIST_HE = [
  "האם המערכת תומכת במלואה בחשבוניות ישראל ומספרי הקצאה אוטומטיים?", "האם החתימה הדיגיטלית אישית ומגובה בארכיון כנדרש?", "האם יש ניסיון חינם אמיתי בלי להזין כרטיס אשראי?",
  "האם קיימות אינטגרציות או API אם תצטרך בעתיד?", "אילו אמצעי סליקה זמינים ומה העמלה בפועל?", "האם הממשק מלא בעברית וידידותי למובייל?",
  "איך נראית התמיכה: טלפון? צ'אט? מה זמן התגובה?", "אילו דוחות קיימים והאם הם מספיקים לצרכים שלך?", "מה קורה כשאתה גדל – האם המחיר קופץ משמעותית?", "מה אומרים משתמשים אמיתיים בביקורות חיצוניות?",
];
const CHECKLIST_EN = [
  "Does the system fully support Israeli invoices and automatic allocation numbers?", "Is the digital signature personal and archived as required?", "Is there a real free trial without entering a credit card?",
  "Are there integrations or API if you'll need them later?", "What payment methods are available and what's the actual fee?", "Is the interface full in your language and mobile-friendly?",
  "What does support look like: phone? chat? response time?", "What reports exist and are they enough for your needs?", "What happens when you grow - does the price jump significantly?", "What do real users say in external reviews?",
];

export function BeforeSigningChecklist({ locale = "he" }: { locale?: "he" | "en" }) {
  const [checked, setChecked] = useState<number[]>([]);
  const checklist = locale === "en" ? CHECKLIST_EN : CHECKLIST_HE
  const toggle = (i: number) =>
    setChecked((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  const done = checked.length;
  const pct = Math.round((done / checklist.length) * 100);

  return (
    <Box dir={locale === "en" ? "ltr" : "rtl"}>
      {/* Progress bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div style={{ flex: 1, height: "6px", background: c.border, borderRadius: "99px", overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: "99px",
            width: `${pct}%`,
            background: pct === 100 ? c.green : c.blue,
            transition: "width 0.3s ease",
          }} />
        </div>
        <span style={{ fontSize: "13px", color: c.muted, whiteSpace: "nowrap" }}>
          {done} / {checklist.length}
        </span>
      </div>

      <div style={{ border: `1px solid ${c.border}`, borderRadius: radius, overflow: "hidden" }}>
        {checklist.map((item, i) => {
          const isDone = checked.includes(i);
          return (
            <div
              key={i}
              onClick={() => toggle(i)}
              style={{
                display: "flex", alignItems: "flex-start", gap: "12px",
                padding: "12px 16px", cursor: "pointer",
                background: isDone ? c.greenSoft : c.white,
                borderBottom: i < checklist.length - 1 ? `1px solid ${c.border}` : "none",
                transition: "background 0.15s",
              }}
            >
              <div style={{
                width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0, marginTop: "2px",
                border: `2px solid ${isDone ? c.green : c.border}`,
                background: isDone ? c.green : c.white,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s",
              }}>
                {isDone && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l2.5 2.5 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={{
                fontSize: "13.5px", lineHeight: "1.6",
                color: isDone ? "#6b7280" : c.text,
                textDecoration: isDone ? "line-through" : "none",
              }}>
                <span style={{ color: c.muted, fontSize: "11px", marginInlineStart: "6px" }}>{i + 1}.</span>
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </Box>
  );
}

/* ══════════════════════════════════════════════
   3. BusinessTypeTable
   ══════════════════════════════════════════════ */
const BIZ_TYPES_HE = [
  { emoji: "👤", type: "פרילנסר / עוסק פטור", p1: { label: "מחיר חודשי נמוך", bg: "#dbeafe", color: "#1e40af" }, p2: { label: "פשטות ממשק", bg: "#e0e7ff", color: "#3730a3" }, p3: { label: "סליקה בסיסית", bg: "#dcfce7", color: "#15803d" } },
  { emoji: "📦", type: "עוסק מורשה בנפח גבוה", p1: { label: "מהירות הפקה", bg: "#dcfce7", color: "#15803d" }, p2: { label: "אוטומציה", bg: "#fef9c3", color: "#854d0e" }, p3: { label: "דוחות מתקדמים", bg: "#e0e7ff", color: "#3730a3" } },
  { emoji: "🔌", type: "SaaS / עסק עם אינטגרציות", p1: { label: "API מלא", bg: "#fce7f3", color: "#9d174d" }, p2: { label: "Webhooks", bg: "#ede9fe", color: "#5b21b6" }, p3: { label: "חיבור CRM / ERP", bg: "#dbeafe", color: "#1e40af" } },
  { emoji: "🚀", type: "עסק בצמיחה", p1: { label: "סקייל במחיר", bg: "#fef9c3", color: "#854d0e" }, p2: { label: "ניהול משתמשים", bg: "#dcfce7", color: "#15803d" }, p3: { label: "הרשאות מתקדמות", bg: "#fff1f2", color: "#9f1239" } },
];
const BIZ_TYPES_EN = [
  { emoji: "👤", type: "Freelancer / exempt", p1: { label: "Low monthly price", bg: "#dbeafe", color: "#1e40af" }, p2: { label: "Simple interface", bg: "#e0e7ff", color: "#3730a3" }, p3: { label: "Basic payment", bg: "#dcfce7", color: "#15803d" } },
  { emoji: "📦", type: "High-volume business", p1: { label: "Production speed", bg: "#dcfce7", color: "#15803d" }, p2: { label: "Automation", bg: "#fef9c3", color: "#854d0e" }, p3: { label: "Advanced reports", bg: "#e0e7ff", color: "#3730a3" } },
  { emoji: "🔌", type: "SaaS / business with integrations", p1: { label: "Full API", bg: "#fce7f3", color: "#9d174d" }, p2: { label: "Webhooks", bg: "#ede9fe", color: "#5b21b6" }, p3: { label: "CRM / ERP connection", bg: "#dbeafe", color: "#1e40af" } },
  { emoji: "🚀", type: "Growing business", p1: { label: "Price scale", bg: "#fef9c3", color: "#854d0e" }, p2: { label: "User management", bg: "#dcfce7", color: "#15803d" }, p3: { label: "Advanced permissions", bg: "#fff1f2", color: "#9f1239" } },
];
const BIZ_HEADERS = { he: ["סוג עסק", "עדיפות 1", "עדיפות 2", "עדיפות 3"], en: ["Business type", "Priority 1", "Priority 2", "Priority 3"] } as const

const PriorityTag = ({ label, bg, color }: { label: string; bg: string; color: string }) => (
  <span style={{ background: bg, color, fontSize: "12px", fontWeight: "600", padding: "3px 9px", borderRadius: "20px", whiteSpace: "nowrap" }}>
    {label}
  </span>
);

export function BusinessTypeTable({ locale = "he" }: { locale?: "he" | "en" }) {
  const rows = locale === "en" ? BIZ_TYPES_EN : BIZ_TYPES_HE
  const headers = BIZ_HEADERS[locale]
  const textAlign = locale === "en" ? "left" : "right"
  return (
    <Box dir={locale === "en" ? "ltr" : "rtl"}>
      <div style={{ border: `1px solid ${c.border}`, borderRadius: radius, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ background: "#18181b", color: "#fff" }}>
              <th style={{ padding: "11px 16px", textAlign, fontWeight: "600", fontSize: "12px", letterSpacing: "0.04em" }}>{headers[0]}</th>
              <th style={{ padding: "11px 16px", textAlign, fontWeight: "600", fontSize: "12px", letterSpacing: "0.04em" }}>{headers[1]}</th>
              <th style={{ padding: "11px 16px", textAlign, fontWeight: "600", fontSize: "12px", letterSpacing: "0.04em" }}>{headers[2]}</th>
              <th style={{ padding: "11px 16px", textAlign, fontWeight: "600", fontSize: "12px", letterSpacing: "0.04em" }}>{headers[3]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? c.white : c.bg, borderBottom: `1px solid ${c.border}` }}>
                <td style={{ padding: "12px 16px", fontWeight: "600", color: c.text, textAlign }}>
                  <span style={{ marginInlineStart: "6px" }}>{row.emoji}</span>{row.type}
                </td>
                <td style={{ padding: "12px 16px" }}><PriorityTag {...row.p1} /></td>
                <td style={{ padding: "12px 16px" }}><PriorityTag {...row.p2} /></td>
                <td style={{ padding: "12px 16px" }}><PriorityTag {...row.p3} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
}

/* ══════════════════════════════════════════════
   4. SupportChecks
   ══════════════════════════════════════════════ */
const SUPPORT_QS_HE = [
  { icon: "👋", q: "האם יש תמיכה אנושית בעברית?" }, { icon: "⏱️", q: "כמה זמן לוקח לקבל תשובה?" },
  { icon: "📚", q: "האם יש הדרכה מסודרת להתחלה?" }, { icon: "🔓", q: "האם ניתן לצאת בקלות ללא נעילה חוזית?" },
];
const SUPPORT_QS_EN = [
  { icon: "👋", q: "Is there human support in your language?" }, { icon: "⏱️", q: "How long to get a response?" },
  { icon: "📚", q: "Is there structured onboarding?" }, { icon: "🔓", q: "Can you leave easily without contract lock-in?" },
];

export function SupportChecks({ locale = "he" }: { locale?: "he" | "en" }) {
  const qs = locale === "en" ? SUPPORT_QS_EN : SUPPORT_QS_HE
  return (
    <Box dir={locale === "en" ? "ltr" : "rtl"}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
        {qs.map((item, i) => (
          <div key={i} style={{
            background: c.white, border: `1px solid ${c.border}`,
            borderRadius: radius, padding: "20px 16px", textAlign: "center",
          }}>
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>{item.icon}</div>
            <p style={{ margin: 0, fontSize: "13.5px", color: c.text, lineHeight: "1.55" }}>{item.q}</p>
          </div>
        ))}
      </div>
    </Box>
  );
}

/* ══════════════════════════════════════════════
   5. HowToChooseSteps
   ══════════════════════════════════════════════ */
const STEPS_HE = [
  "פתח 2–3 חשבונות ניסיון במקביל", "הפק לפחות 50–100 מסמכים אמיתיים בכל מערכת", "בדוק סליקה, דוחות וייצוא לרואה חשבון",
  "פנה לתמיכה עם שאלה אמיתית וראה כיצד מגיבים", "חשב עלות כוללת לפי כמות מסמכים שנתית – לא חודשית",
];
const STEPS_EN = [
  "Open 2–3 trial accounts in parallel", "Issue at least 50–100 real documents in each system", "Check payment, reports and export to accountant",
  "Contact support with a real question and see how they respond", "Calculate total cost by annual document count - not monthly",
];

export function HowToChooseSteps({ locale = "he" }: { locale?: "he" | "en" }) {
  const [done, setDone] = useState<number[]>([]);
  const steps = locale === "en" ? STEPS_EN : STEPS_HE
  const toggle = (i: number) =>
    setDone((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <Box dir={locale === "en" ? "ltr" : "rtl"}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {steps.map((step, i) => {
          const isDone = done.includes(i);
          return (
            <div
              key={i}
              onClick={() => toggle(i)}
              style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "14px 16px", cursor: "pointer",
                background: isDone ? c.greenSoft : c.white,
                border: `1px solid ${isDone ? "#bbf7d0" : c.border}`,
                borderRadius: radius, transition: "all 0.15s",
              }}
            >
              <div style={{
                width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
                background: isDone ? c.green : "#18181b",
                color: "#fff", fontSize: "13px", fontWeight: "700",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}>
                {isDone ? "✓" : `0${i + 1}`}
              </div>
              <span style={{
                fontSize: "14px", lineHeight: "1.55",
                color: isDone ? "#6b7280" : c.text,
                textDecoration: isDone ? "line-through" : "none",
              }}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </Box>
  );
}

/* ══════════════════════════════════════════════
   6. FinalSummaryGrid
   ══════════════════════════════════════════════ */
const SUMMARY_HE = [
  { icon: "✅", label: "תאימות רגולציה",    desc: "חשבוניות ישראל, מספרי הקצאה, חתימה דיגיטלית תקנית" },
  { icon: "⚡", label: "ביצועים ומהירות",   desc: "הפקה מהירה גם בנפח גבוה, ממשק תגובתי" },
  { icon: "🔒", label: "אבטחת מידע",        desc: "גיבוי אוטומטי, שקיפות נתונים, תקני אבטחה" },
  { icon: "💰", label: "שקיפות עלויות",     desc: "ללא הפתעות, עמלות ברורות, תמחור גלוי" },
  { icon: "📈", label: "התאמה לצמיחה",      desc: "סקייל חלק, ניהול משתמשים, גמישות תוכנית" },
];
const SUMMARY_EN = [
  { icon: "✅", label: "Regulatory compliance", desc: "Local invoices, allocation numbers, compliant digital signature" },
  { icon: "⚡", label: "Performance and speed",  desc: "Fast production at high volume, responsive interface" },
  { icon: "🔒", label: "Data security",         desc: "Automatic backup, data transparency, security standards" },
  { icon: "💰", label: "Cost transparency",    desc: "No surprises, clear fees, open pricing" },
  { icon: "📈", label: "Growth fit",           desc: "Smooth scale, user management, plan flexibility" },
];
const SUMMARY_FOOTER = { he: "אל תבחר לפי פרסומת או מחיר בלבד. בחר לפי התאמה אמיתית לצרכים של העסק שלך היום – ובעוד שנה.", en: "Don't choose by ad or price alone. Choose by real fit for your business needs today - and in a year." }

export function FinalSummaryGrid({ locale = "he" }: { locale?: "he" | "en" }) {
  const summary = locale === "en" ? SUMMARY_EN : SUMMARY_HE
  return (
    <Box dir={locale === "en" ? "ltr" : "rtl"}>
      <div style={{
        background: c.bg, border: `1px solid ${c.border}`,
        borderRadius: radius, padding: "24px",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "12px" }}>
          {summary.map((item, i) => (
            <div key={i} style={{
              background: c.white, border: `1px solid ${c.border}`,
              borderRadius: radius, padding: "16px 14px",
              display: "flex", alignItems: "flex-start", gap: "12px",
            }}>
              <span style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: c.text, marginBottom: "4px" }}>{item.label}</div>
                <div style={{ fontSize: "12.5px", color: c.muted, lineHeight: "1.5" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{
          margin: "20px 0 0", padding: "16px 0 0",
          borderTop: `1px solid ${c.border}`,
          fontSize: "13.5px", color: "#3d3a35", lineHeight: "1.7",
        }}>
          {SUMMARY_FOOTER[locale]}
        </p>
      </div>
    </Box>
  );
}

/* ══════════════════════════════════════════════
   1. WhenToUseCards
   ══════════════════════════════════════════════ */
const WHEN_YES_HE = [
  { icon: "🧾", title: "קבלה הופקה בטעות", desc: "הוצאת קבלה לפני שבוצע תשלום אמיתי." },
  { icon: "↩️", title: "החזר כסף ללקוח", desc: "ביטול עסקה, החזר חלקי או מלא." },
  { icon: "📊", title: "תיקון רישום בספרים", desc: "כדי שהדוחות יהיו מדויקים ומאוזנים." },
];
const WHEN_YES_EN = [
  { icon: "🧾", title: "Receipt issued by mistake", desc: "Issued a receipt before real payment was made." },
  { icon: "↩️", title: "Refund to customer", desc: "Cancel transaction, partial or full refund." },
  { icon: "📊", title: "Fix books record", desc: "So reports are accurate and balanced." },
];
const WHEN_NO_WARNING = { he: "לא משתמשים בקבלה שלילית לביטול חשבונית מס. במקרה כזה מפיקים מסמך זיכוי. קבלה שלילית רלוונטית לקבלות בלבד.", en: "Do not use a negative receipt to cancel an invoice. In that case issue a credit note. Negative receipts apply to receipts only." }

export function WhenToUseCards({ locale = "he" }: { locale?: "he" | "en" }) {
  const whenYes = locale === "en" ? WHEN_YES_EN : WHEN_YES_HE
  return (
    <Box dir={locale === "en" ? "ltr" : "rtl"}>
        {/* Yes */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px", marginBottom: "14px" }}>
          {whenYes.map((item, i) => (
            <div key={i} style={{
              background: c.white, border: `1px solid ${c.border}`,
              borderTop: `3px solid ${c.green}`,
              borderRadius: radius, padding: "16px 14px",
            }}>
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>{item.icon}</div>
              <div style={{ fontSize: "13.5px", fontWeight: "700", color: c.text, marginBottom: "4px" }}>{item.title}</div>
              <div style={{ fontSize: "13px", color: c.muted, lineHeight: "1.55" }}>{item.desc}</div>
            </div>
          ))}
        </div>
  
        {/* Warning */}
        <div style={{
          display: "flex", gap: "12px", alignItems: "flex-start",
          background: c.amberSoft, border: `1px solid #fde68a`,
          borderRadius: radius, padding: "14px 16px",
        }}>
          <span style={{ fontSize: "18px", flexShrink: 0 }}>⚠️</span>
          <p style={{ margin: 0, fontSize: "13.5px", color: "#92400e", lineHeight: "1.65" }}>
            {locale === "en" ? <><strong>Do not</strong> use a negative receipt to cancel an invoice. In that case issue a <strong>credit note</strong>. Negative receipts apply to receipts only.</> : <><strong>לא</strong> משתמשים בקבלה שלילית לביטול חשבונית מס. במקרה כזה מפיקים <strong>מסמך זיכוי</strong>. קבלה שלילית רלוונטית לקבלות בלבד.</>}
          </p>
        </div>
      </Box>
    );
  }
  
/* ══════════════════════════════════════════════
   2. HowItWorksFlow
   ══════════════════════════════════════════════ */
const FLOW_STEPS_HE = [
  { n: "01", text: "נכנסים למסמך המקורי" },
  { n: "02", text: 'בוחרים באפשרות "ביטול" או "הפק קבלה שלילית"' },
  { n: "03", text: "המערכת מעתיקה פרטי לקוח ועסקה והופכת הסכום למינוס" },
  { n: "04", text: "נשמרים שני מסמכים בספרים – המקורי והשלילי" },
];
const FLOW_STEPS_EN = [
  { n: "01", text: "Open the original document" },
  { n: "02", text: 'Select "Cancel" or "Issue negative receipt"' },
  { n: "03", text: "System copies customer and transaction details, flips amount to negative" },
  { n: "04", text: "Both documents saved in books - original and negative" },
];
const FLOW_EXAMPLE = { he: { doc1: "קבלה #001", doc2: "קבלה שלילית #002", credit: "אשראי", cancel: "ביטול", result: "תוצאה: הספרים מאוזנים" }, en: { doc1: "Receipt #001", doc2: "Negative receipt #002", credit: "Credit", cancel: "Cancel", result: "Result: Books balanced" } }

export function HowItWorksFlow({ locale = "he" }: { locale?: "he" | "en" }) {
  const steps = locale === "en" ? FLOW_STEPS_EN : FLOW_STEPS_HE
  const ex = FLOW_EXAMPLE[locale]
  return (
    <Box dir={locale === "en" ? "ltr" : "rtl"}>
        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{
                width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
                background: c.text, color: "#fff",
                fontSize: "11px", fontWeight: "700",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {step.n}
              </div>
              <div style={{
                flex: 1, padding: "11px 14px",
                background: c.white, border: `1px solid ${c.border}`,
                borderRadius: radius, fontSize: "13.5px", color: c.text,
              }}>
                {step.text}
              </div>
            </div>
          ))}
        </div>
  
        {/* Example */}
        <div style={{
          background: c.bg, border: `1px solid ${c.border}`,
          borderRadius: radius, padding: "16px 20px",
        }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: c.muted, letterSpacing: "0.06em", marginBottom: "12px" }}>
            {locale === "en" ? "Example" : "דוגמה"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {/* Doc 1 */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: c.white, border: `1px solid ${c.border}`,
              borderRight: `3px solid ${c.green}`,
              borderRadius: radius, padding: "10px 14px",
            }}>
              <span style={{ fontSize: "13.5px", fontWeight: "600", color: c.text }}>{ex.doc1}</span>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ background: c.greenSoft, color: c.green, fontSize: "11.5px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px" }}>{ex.credit}</span>
                <span style={{ fontSize: "15px", fontWeight: "700", color: c.green }}>+500 ₪</span>
              </div>
            </div>
  
            {/* Arrow */}
            <div style={{ textAlign: "center", color: c.muted, fontSize: "18px", lineHeight: 1 }}>↓</div>
  
            {/* Doc 2 */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: c.white, border: `1px solid ${c.border}`,
              borderRight: `3px solid ${c.red}`,
              borderRadius: radius, padding: "10px 14px",
            }}>
              <span style={{ fontSize: "13.5px", fontWeight: "600", color: c.text }}>{ex.doc2}</span>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ background: c.redSoft, color: c.red, fontSize: "11.5px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px" }}>{ex.cancel}</span>
                <span style={{ fontSize: "15px", fontWeight: "700", color: c.red }}>−500 ₪</span>
              </div>
            </div>
  
            {/* Result */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: c.blueSoft, border: `1px solid #bfdbfe`,
              borderRadius: radius, padding: "10px 14px", marginTop: "4px",
            }}>
              <span style={{ fontSize: "13px", color: c.blue, fontWeight: "600" }}>{ex.result}</span>
              <span style={{ fontSize: "15px", fontWeight: "700", color: c.blue }}>0 ₪</span>
            </div>
          </div>
        </div>
      </Box>
    );
  }
  
/* ══════════════════════════════════════════════
   3. SaasRequirementsTable
   ══════════════════════════════════════════════ */
const REQS_HE = [
  { req: "יצירת קבלה שלילית אוטומטית", why: "במקרה של Refund מסליקה – בלי התערבות ידנית", status: { label: "קריטי", bg: c.redSoft, color: c.red } },
  { req: "קשר ברור בין מסמכים", why: "לדעת איזו קבלה שלילית שייכת לאיזו מקורית", status: { label: "קריטי", bg: c.redSoft, color: c.red } },
  { req: "סטטוס ברור לכל מסמך", why: "פעיל / מבוטל / זוכה – נראה בבירור בממשק", status: { label: "חשוב", bg: c.amberSoft, color: c.amber } },
  { req: "הכללה בדוחות", why: "שני המסמכים מופיעים בדוחות בצורה עקבית", status: { label: "חשוב", bg: c.amberSoft, color: c.amber } },
];
const REQS_EN = [
  { req: "Automatic negative receipt creation", why: "For payment refund - without manual intervention", status: { label: "Critical", bg: c.redSoft, color: c.red } },
  { req: "Clear link between documents", why: "To know which negative receipt belongs to which original", status: { label: "Critical", bg: c.redSoft, color: c.red } },
  { req: "Clear status per document", why: "Active / Cancelled / Credited - visible in interface", status: { label: "Important", bg: c.amberSoft, color: c.amber } },
  { req: "Inclusion in reports", why: "Both documents appear in reports consistently", status: { label: "Important", bg: c.amberSoft, color: c.amber } },
];
const REQS_HEADERS = { he: ["דרישה", "למה זה חשוב", "רמת חשיבות"], en: ["Requirement", "Why it matters", "Priority"] } as const
  
  const RequirementTag = ({ label, bg, color }: { label: string; bg: string; color: string }) => (
    <span style={{ background: bg, color, fontSize: "11.5px", fontWeight: "600", padding: "3px 9px", borderRadius: "20px", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
  
export function SaasRequirementsTable({ locale = "he" }: { locale?: "he" | "en" }) {
  const reqs = locale === "en" ? REQS_EN : REQS_HE
  const headers = REQS_HEADERS[locale]
  const textAlign = locale === "en" ? "left" : "right"
  return (
    <Box dir={locale === "en" ? "ltr" : "rtl"}>
      <div style={{ border: `1px solid ${c.border}`, borderRadius: radius, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ background: "#18181b", color: "#fff" }}>
              {headers.map((h) => (
                <th key={h} style={{ padding: "11px 16px", textAlign, fontWeight: "600", fontSize: "12px", letterSpacing: "0.04em" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reqs.map((row, i) => (
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
    );
  }