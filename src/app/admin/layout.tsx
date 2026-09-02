import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Uxellent Admin",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="ltr" style={{ minHeight: "100vh", background: "#f4f1ec", fontFamily: "system-ui, sans-serif" }}>
      {children}
    </div>
  )
}
