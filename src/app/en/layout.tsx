import { HeaderEN } from "./_components/HeaderEN"
import { FooterEN } from "./_components/FooterEN"

export default function EnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      dir="ltr"
      className="min-h-screen flex flex-col bg-[#F4F1EC] text-left"
    >
      <HeaderEN />

      <main
        id="main"
        role="main"
        className="flex-1"
      >
        {children}
      </main>

      <FooterEN />
    </div>
  )
}