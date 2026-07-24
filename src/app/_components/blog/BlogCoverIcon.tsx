type BlogCoverIconProps = {
  slug?: string
  title: string
}

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 6,
}

function IconAutomation() {
  return (
    <>
      <circle cx="86" cy="94" r="18" fill="#5389BB" fillOpacity="0.12" />
      <circle cx="152" cy="150" r="18" fill="#111827" fillOpacity="0.08" />
      <circle cx="220" cy="102" r="18" fill="#5389BB" fillOpacity="0.12" />
      <circle cx="220" cy="208" r="18" fill="#111827" fillOpacity="0.08" />
      <path {...strokeProps} d="M104 105 136 133M168 139 202 113M168 161 202 197" />
      <circle {...strokeProps} cx="86" cy="94" r="18" />
      <circle {...strokeProps} cx="152" cy="150" r="18" />
      <circle {...strokeProps} cx="220" cy="102" r="18" />
      <circle {...strokeProps} cx="220" cy="208" r="18" />
      <path {...strokeProps} d="m147 74 7 18 18 7-18 7-7 18-7-18-18-7 18-7 7-18Z" />
    </>
  )
}

function IconSpeed() {
  return (
    <>
      <path {...strokeProps} d="M72 186a78 78 0 1 1 156 0" />
      <path {...strokeProps} d="M150 107 204 154" />
      <path {...strokeProps} d="m120 82 13-17m47 17 13-17M88 125l-20-6m164 6 20-6" />
      <path {...strokeProps} d="m126 190 22-48h-18l18-34-6 30h19l-24 52Z" />
      <circle cx="150" cy="186" r="16" fill="#5389BB" fillOpacity="0.16" />
      <circle {...strokeProps} cx="150" cy="186" r="16" />
    </>
  )
}

function IconInvoice() {
  return (
    <>
      <path {...strokeProps} d="M98 58h96l28 28v126H98z" />
      <path {...strokeProps} d="M194 58v33h33" />
      <path {...strokeProps} d="M124 123h72M124 152h72M124 181h40" />
      <path {...strokeProps} d="m124 214 18 18 34-39" />
      <rect x="112" y="203" width="88" height="42" rx="16" fill="#5389BB" fillOpacity="0.1" />
    </>
  )
}

function IconNegativeReceipt() {
  return (
    <>
      <path {...strokeProps} d="M100 56h100v164l-16-10-16 10-16-10-16 10-16-10-16 10-16-10-16 10Z" />
      <path {...strokeProps} d="M124 104h52M124 132h52" />
      <path {...strokeProps} d="M116 176h68" />
      <circle cx="150" cy="176" r="44" fill="#111827" fillOpacity="0.06" />
      <path {...strokeProps} d="M122 176h56" />
    </>
  )
}

function IconSeoAi() {
  return (
    <>
      <circle cx="136" cy="132" r="46" fill="#5389BB" fillOpacity="0.1" />
      <circle {...strokeProps} cx="128" cy="124" r="44" />
      <path {...strokeProps} d="m160 156 42 42" />
      <path {...strokeProps} d="m196 74 7 17 17 7-17 7-7 17-7-17-17-7 17-7 7-17Z" />
      <path {...strokeProps} d="m92 124 24 0m12 0 30 0m-30-30v60" />
      <circle {...strokeProps} cx="202" cy="98" r="4" />
      <circle {...strokeProps} cx="92" cy="124" r="4" />
      <circle {...strokeProps} cx="158" cy="124" r="4" />
    </>
  )
}

function IconComparison() {
  return (
    <>
      <rect x="58" y="72" width="78" height="140" rx="22" fill="#5389BB" fillOpacity="0.1" />
      <rect x="164" y="72" width="78" height="140" rx="22" fill="#111827" fillOpacity="0.06" />
      <rect {...strokeProps} x="58" y="72" width="78" height="140" rx="22" />
      <rect {...strokeProps} x="164" y="72" width="78" height="140" rx="22" />
      <path {...strokeProps} d="m81 100 16 84 18-53 18 53 16-84" />
      <path {...strokeProps} d="M183 112h19l-19 24 19 24h-19m40-48h-19l19 24-19 24h19" />
      <path {...strokeProps} d="M136 150h28" />
    </>
  )
}

function renderIcon(slug?: string) {
  switch (slug) {
    case "automatio-make":
      return <IconAutomation />
    case "fast-slow-web":
      return <IconSpeed />
    case "green-invoice":
      return <IconInvoice />
    case "negative-receipt":
      return <IconNegativeReceipt />
    case "seo-ai-engine":
      return <IconSeoAi />
    case "wordpress-vs-other":
      return <IconComparison />
    default:
      return <IconSeoAi />
  }
}

export function BlogCoverIcon({ slug, title }: BlogCoverIconProps) {
  return (
    <div className="h-full w-full text-[#5389BB]" role="img" aria-label={title}>
      <svg
        viewBox="0 0 300 300"
        className="h-full w-full"
        aria-hidden="true"
      >
        <g className="text-[#5389BB]">{renderIcon(slug)}</g>
      </svg>
    </div>
  )
}
