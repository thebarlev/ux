import { EnLink } from "./EnLink"

type EnPageShellProps = {
  title: string
  children?: React.ReactNode
}

export function EnPageShell({ title, children }: EnPageShellProps) {
  return (
    <div className="min-h-screen bg-[#F4F1EC] p-8" dir="ltr">
      <h1 className="text-2xl font-semibold text-black">{title}</h1>
      <p className="mt-4 text-black/70">English version placeholder</p>
      {children}
      <nav className="mt-8 flex flex-wrap gap-4 text-sm">
        <EnLink href="/">Home</EnLink>
        <EnLink href="/contact">Contact</EnLink>
        <EnLink href="/pricing">Pricing</EnLink>
      </nav>
    </div>
  )
}
