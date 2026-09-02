/** The star/sparkle from the Uxellent logo (same path as /logo.svg's mark),
 *  standalone for use as a small divider — e.g. pricing's .pn-sep between the
 *  three "included, in plain terms" notes. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-42 -50 84 90" aria-hidden="true">
      <path
        fill="#1990D8"
        d="M0,-11.757L-10.276,-24.022L-10.205,-8.737L-30.459,-16.016L-16.512,-0.833L-38.298,3.666L-16.512,8.939L-26.622,21.68L-10.205,16.843L-11.062,35.053L0,19.863L9.572,29.686L10.205,16.843L37.761,30.187L16.512,8.939L31.589,3.999L16.512,-0.833L28.959,-15.106L10.205,-8.737L18.413,-46.81L0,-11.757Z"
      />
    </svg>
  )
}
