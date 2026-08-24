"use client"

import { useState } from "react"
import styles from "./redesign.module.css"
import { BoldText } from "./BoldText"
import { PLANS, PLAN_CTA_LABEL, type Plan } from "@/app/_content/redesign/pricing"

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

function planHref(plan: Plan, billing: "monthly" | "yearly") {
  if (plan.slug === "free") return "https://uxellent.site?plan=free"
  return `https://uxellent.site?plan=${plan.slug}&billing=${billing}`
}

export function PricingPlans() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")

  return (
    <>
      <div className={styles.billTabs} role="tablist" aria-label="מסלול חיוב">
        <button
          type="button"
          className={`${styles.billTab} ${billing === "monthly" ? styles.billTabOn : ""}`}
          role="tab"
          aria-selected={billing === "monthly"}
          onClick={() => setBilling("monthly")}
        >
          חודשי
        </button>
        <button
          type="button"
          className={`${styles.billTab} ${billing === "yearly" ? styles.billTabOn : ""}`}
          role="tab"
          aria-selected={billing === "yearly"}
          onClick={() => setBilling("yearly")}
        >
          שנתי <em>20%-</em>
        </button>
      </div>

      <div className={`${styles.plans} ${styles.plansFour}`}>
        {PLANS.map((plan) => {
          const price = billing === "monthly" ? plan.monthly : plan.yearly
          return (
            <div key={plan.slug} className={`${styles.plan} ${plan.best ? styles.planBest : ""}`}>
              {plan.best ? <span className={styles.plTag}>הכי נבחרת</span> : null}
              <span className={styles.plN}>{plan.name}</span>
              <p className={styles.plFor}>{plan.forWhom}</p>
              <span className={styles.plP}>
                <b>
                  <span>{price ?? 0}</span>
                  <span className={styles.shk}>₪</span>
                </b>
                {price !== null ? <i>לחודש</i> : null}
              </span>
              <ul className={styles.planList}>
                {plan.features.map((f) => (
                  <li key={f}>
                    {CHECK}
                    <span><BoldText text={f} /></span>
                  </li>
                ))}
              </ul>
              <a
                className={`${styles.btn} ${plan.best ? styles.btnPrimary : styles.btnGhost}`}
                href={planHref(plan, billing)}
              >
                {PLAN_CTA_LABEL[plan.slug]}
              </a>
            </div>
          )
        })}
      </div>
    </>
  )
}
