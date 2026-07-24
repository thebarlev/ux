import { HeaderEN } from "@/app/en/_components/HeaderEN"
import { FooterEN } from "@/app/en/_components/FooterEN"
import { SiteFooter } from "@/app/_components/home/SiteFooter"
import { SiteHeader } from "@/app/_components/home/SiteHeader"

type BlogShellProps = {
  children: React.ReactNode
  locale?: "he" | "en"
}

export function BlogShell({ children, locale }: BlogShellProps) {
  const isEn = locale === "en"
  // When locale="en", the page is under en/layout which already provides HeaderEN + FooterEN.
  // Avoid duplicate header/footer by only rendering content.
  if (isEn) {
    return <>{children}</>
  }
  return (
    <div className="min-h-screen bg-[#F4F1EC]" dir="rtl">
      <SiteHeader />
      <main id="main" role="main">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

