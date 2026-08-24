import { redesignFont } from "./font"
import { RedesignHeader } from "./RedesignHeader"
import { RedesignFooter } from "./RedesignFooter"
import styles from "./redesign.module.css"

export function RedesignShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles.root} ${redesignFont.variable}`} dir="rtl">
      <RedesignHeader />
      {children}
      <RedesignFooter />
    </div>
  )
}
