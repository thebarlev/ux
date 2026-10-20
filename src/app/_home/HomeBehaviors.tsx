"use client"

import { useEffect } from "react"

type Lang = "he" | "en"

const COPY = {
  he: { menu: "תפריט", close: "סגירת תפריט" },
  en: { menu: "Menu", close: "Close menu" },
} as const

/** New professions that pop into "who it's for", with their icons (from the sheets). */
const NEW_ORBS: Record<Lang, readonly string[]> = {
  he: ["רופאי שיניים", "מורים פרטיים", "וטרינרים", "שמאים", "מתורגמנים", "קוסמטיקאיות", "מאמני כושר", "גני אירועים"],
  en: ["Dentists", "Tutors", "Vets", "Appraisers", "Translators", "Beauticians", "Fitness trainers", "Event venues"],
}
const ORB_ICONS = [
  '<path d="M7 4c-2 0-3 1.6-3 3.6 0 3 1.5 4.4 2 8 .3 2.4 1 4.4 2 4.4s1.4-2 1.7-4c.2-1.2.7-2 1.3-2s1.1.8 1.3 2c.3 2 .7 4 1.7 4s1.7-2 2-4.4c.5-3.6 2-5 2-8C20 5.6 19 4 17 4c-1.8 0-2.6 1-5 1S8.8 4 7 4z"/>',
  '<path d="M3 8l9-4 9 4-9 4z"/><path d="M7 10v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5"/>',
  '<circle cx="7" cy="9" r="1.8"/><circle cx="12" cy="6.5" r="1.8"/><circle cx="17" cy="9" r="1.8"/><path d="M12 12c-3 0-5 3-5 5s2 2.5 5 2.5 5-.5 5-2.5-2-5-5-5z"/>',
  '<path d="M4 20h16M6 20V9l6-4 6 4v11"/><path d="M10 13h4M10 16h4"/>',
  '<path d="M4 6h9M8.5 4v2M6 6c.8 3 3 5.5 6 6.5M11 6c-.6 2.6-2.6 5.4-6 6.5"/><path d="M13 20l4-9 4 9M14.4 17h5.2"/>',
  '<path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-4 3-6 5-9z"/>',
  '<path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10"/>',
  '<path d="M5 21V10l7-6 7 6v11"/><path d="M9 21v-6h6v6"/><path d="M12 7v0"/>',
]

/**
 * The sheets' behaviour, ported 1:1 (menu, benefits slider, "who it's for"
 * confetti orbs, "how it works" steps, "built right" rings) plus what the site
 * needs on top: keyboard support for the tabs,
 * pausing animations of sections that are off screen, and full cleanup.
 */
export function HomeBehaviors({ lang, rootId }: { lang: Lang; rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId)
    if (!root) return
    const rtl = lang === "he"
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const cleanups: Array<() => void> = []
    const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement | Window, ev: K, fn: (e: HTMLElementEventMap[K]) => void) => {
      el.addEventListener(ev, fn as EventListener)
      cleanups.push(() => el.removeEventListener(ev, fn as EventListener))
    }
    const observe = (el: Element, cb: IntersectionObserverCallback, threshold: number) => {
      const io = new IntersectionObserver(cb, { threshold })
      io.observe(el)
      cleanups.push(() => io.disconnect())
      return io
    }

    // -- pause CSS animations of sections that are off screen
    root.querySelectorAll<HTMLElement>("header, section, footer").forEach((s) => {
      s.classList.add("uxh-off")
      observe(s, (e) => s.classList.toggle("uxh-off", !e[0].isIntersecting), 0)
    })

    // -- hamburger menu, turns into an X
    const burger = root.querySelector<HTMLButtonElement>("#burger")
    const menu = root.querySelector<HTMLElement>("#menu")
    const hdr = root.querySelector<HTMLElement>("#hdr")
    if (burger && menu && hdr) {
      const setOpen = (o: boolean) => {
        menu.classList.toggle("open", o)
        hdr.classList.toggle("open", o)
        burger.classList.toggle("x", o)
        burger.setAttribute("aria-expanded", String(o))
        burger.setAttribute("aria-label", o ? COPY[lang].close : COPY[lang].menu)
      }
      on(burger, "click", () => setOpen(!menu.classList.contains("open")))
      menu.querySelectorAll<HTMLElement>("a").forEach((a) => on(a, "click", () => setOpen(false)))
      on(window, "keydown", (e) => { if ((e as KeyboardEvent).key === "Escape" && menu.classList.contains("open")) { setOpen(false); burger.focus() } })
    }

    // -- benefits slider ("what you get")
    const track = root.querySelector<HTMLElement>("#track")
    const ben = root.querySelector<HTMLElement>("#ben")
    if (track && ben) {
      const cards = [...track.querySelectorAll<HTMLElement>(".ben")]
      let i = 0
      let inView = false
      let timer: number | undefined
      const goTo = (n: number) => {
        i = Math.max(0, Math.min(cards.length - 1, n))
        cards.forEach((c, k) => c.classList.toggle("on", k === i))
        window.setTimeout(() => {
          const tr = track.getBoundingClientRect()
          const cr = cards[i].getBoundingClientRect()
          const cs = getComputedStyle(track)
          if (rtl) {
            const pad = parseFloat(cs.scrollPaddingRight) || 48
            track.scrollBy({ left: cr.right - (tr.right - pad), behavior: reduced ? "auto" : "smooth" })
          } else {
            const pad = parseFloat(cs.scrollPaddingLeft) || 48
            track.scrollBy({ left: cr.left - (tr.left + pad), behavior: reduced ? "auto" : "smooth" })
          }
        }, 80)
      }
      const reset = () => {
        window.clearInterval(timer)
        if (reduced) return
        timer = window.setInterval(() => {
          if (!ben.classList.contains("paused") && inView) goTo((i + 1) % cards.length)
        }, 5000)
      }
      cleanups.push(() => window.clearInterval(timer))
      const next = root.querySelector<HTMLElement>("#next")
      const prev = root.querySelector<HTMLElement>("#prev")
      if (next) on(next, "click", () => { goTo(i + 1); reset() })
      if (prev) on(prev, "click", () => { goTo(i - 1); reset() })
      cards.forEach((c, k) => {
        on(c, "click", () => { goTo(k); reset() })
        on(c, "keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goTo(k); reset() } })
      })
      observe(ben, (e) => { inView = e[0].isIntersecting; ben.classList.toggle("paused", !inView) }, 0.35)
      on(ben, "mouseenter", () => ben.classList.add("paused"))
      on(ben, "mouseleave", () => ben.classList.remove("paused"))
      on(ben, "focusin", () => ben.classList.add("paused"))
      on(ben, "focusout", () => ben.classList.remove("paused"))
      reset()
    }

    // -- "who it's for": no icon may touch another icon or the text, leave the
    //    section, or be cut (tbl-021). The sheets place the icons by percent,
    //    which only works at the widths they were drawn at, so every icon is
    //    measured here and, if it collides, moved to the nearest free spot (or
    //    left out when there is none). The new professions that pop in only
    //    land on a free spot.
    const box = root.querySelector<HTMLElement>(".who2")
    if (box) {
      type Rect = { l: number; t: number; r: number; b: number }
      const FLOAT = 14 // the float animation lifts an icon by up to 14px
      const GAP = 12 // between icons
      const TEXT_GAP = 16 // between an icon and the heading, text and star
      const hit = (a: Rect, b: Rect, g: number) => a.l < b.r + g && b.l < a.r + g && a.t < b.b + g && b.t < a.b + g
      // the box an icon (with its label) can cover, in section coordinates,
      // from layout only, so the float and pop-in transforms do not matter
      const rectOf = (o: HTMLElement, dx = 0, dy = 0): Rect => ({
        l: o.offsetLeft + dx, r: o.offsetLeft + o.offsetWidth + dx,
        t: o.offsetTop - FLOAT + dy, b: o.offsetTop + o.offsetHeight + dy,
      })
      const textRects = (): Rect[] => {
        const s = box.getBoundingClientRect()
        const out: Rect[] = []
        box.querySelectorAll<HTMLElement>(".who2-c .who2-star, .who2-c h2, .who2-c p, .who2-c .no > *").forEach((el) => {
          const rg = document.createRange()
          rg.selectNodeContents(el)
          const rs = el.classList.contains("who2-star") ? [el.getBoundingClientRect()] : [...rg.getClientRects()]
          for (const q of rs) if (q.width && q.height) out.push({ l: q.left - s.left, r: q.right - s.left, t: q.top - s.top, b: q.bottom - s.top })
        })
        return out
      }
      // nearest free offset (up to 240px away), or null
      const OFFSETS: Array<[number, number]> = [[0, 0]]
      for (let r = 8; r <= 240; r += 8) for (let k = 0; k < 16; k++) OFFSETS.push([Math.round(r * Math.cos((k * Math.PI) / 8)), Math.round(r * Math.sin((k * Math.PI) / 8))])
      const findSpot = (o: HTMLElement, taken: Rect[], text: Rect[], reach = 240) => {
        const mob = window.matchMedia("(max-width:1060px)").matches
        const edge = mob ? 6 : 24
        const W = box.clientWidth
        const H = box.clientHeight
        for (const [dx, dy] of OFFSETS) {
          if (Math.hypot(dx, dy) > reach) break
          const q = rectOf(o, dx, dy)
          if (q.l < edge || q.r > W - edge || q.t < 6 || q.b > H - 6) continue
          if (text.some((t) => hit(q, t, TEXT_GAP)) || taken.some((t) => hit(q, t, GAP))) continue
          return { dx, dy, q }
        }
        return null
      }
      const placed = new Map<HTMLElement, Rect>()
      const layout = () => {
        placed.clear()
        const text = textRects()
        const taken: Rect[] = []
        box.querySelectorAll<HTMLElement>(".orb:not(.new)").forEach((o) => {
          o.style.margin = ""
          o.style.visibility = ""
          if (getComputedStyle(o).display === "none") return
          const f = findSpot(o, taken, text)
          if (!f) { o.style.visibility = "hidden"; return }
          // the sheets place icons from the right, so a move is margin-right/top
          o.style.marginRight = `${-f.dx}px`
          o.style.marginTop = `${f.dy}px`
          taken.push(f.q)
          placed.set(o, f.q)
        })
      }
      let raf = 0
      const relayout = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { layout(); dropPopped() }) }
      let dropPopped = () => {}
      layout()
      void document.fonts?.ready.then(relayout)
      on(window, "resize", relayout)
      cleanups.push(() => cancelAnimationFrame(raf))

      // -- new professions pop in with confetti
      if (!reduced) {
        let alive = true
        cleanups.push(() => { alive = false })
        // the sheet's spots first, then a few spare ones for widths where they are taken
        const spotsDesk: Array<[number, number]> = [[60, 5], [2, 38], [30, 94], [94, 6], [44, 96], [92, 88], [48, 3], [14, 62], [84, 64], [70, 92], [24, 10]]
        let n = 0
        let visible = false
        const live: HTMLElement[] = []
        const fading = new Set<HTMLElement>()
        dropPopped = () => { live.splice(0).forEach((o) => o.remove()) }
        const burst = (x: number, y: number) => {
          for (let k = 0; k < 14; k++) {
            const c = document.createElement("i")
            c.className = "cf"
            const a = Math.random() * Math.PI * 2
            const d = 40 + Math.random() * 50
            c.style.cssText = `left:${x}px;top:${y}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;--r:${Math.random() * 360}deg;background:${["#1990d8", "#7cc5f2", "#0b1220", "#c9e6f8"][k % 4]};${k % 3 ? "" : "border-radius:50%;"}`
            box.appendChild(c)
            window.setTimeout(() => c.remove(), 1100)
          }
        }
        const add = () => {
          const mob = window.matchMedia("(max-width:1060px)").matches
          const MAX = mob ? 1 : 3
          // the oldest icon leaves first, and the new one comes in once it is gone
          if (live.length >= MAX) {
            const r = live.shift()
            if (r) {
              fading.add(r)
              r.classList.add("out")
              window.setTimeout(() => { r.remove(); fading.delete(r); pop(mob) }, 600)
              return
            }
          }
          pop(mob)
        }
        const pop = (mob: boolean) => {
          if (!alive) return
          const W = box.clientWidth
          const H = box.clientHeight
          const label = NEW_ORBS[lang][n % NEW_ORBS[lang].length]
          const icon = ORB_ICONS[n % ORB_ICONS.length]
          const o = document.createElement("span")
          o.className = "orb new"
          o.setAttribute("aria-hidden", "true")
          o.style.visibility = "hidden"
          o.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icon}</svg><em>${label}</em>`
          box.appendChild(o)
          const taken = [...placed.values(), ...[...live, ...fading].map((x) => rectOf(x))]
          const text = textRects()
          // try the sheet's spots in turn (mobile: bottom centre), each with a small nudge
          const tries: Array<[number, number]> = mob ? [[52, H - 64]] : spotsDesk.map(([x, y]) => [x, (y / 100) * H])
          let f: ReturnType<typeof findSpot> = null
          for (let k = 0; k < tries.length && !f; k++) {
            const [x, y] = tries[(n + k) % tries.length]
            o.style.cssText = `visibility:hidden;right:${(x / 100) * W}px;top:${y}px;--mr:${(x / 100) * W}px;--mt:${y}px`
            f = findSpot(o, taken, text, 72)
          }
          n++
          if (!f) { o.remove(); return } // no free spot right now: skip this pop
          const right = W - f.q.r
          const top = f.q.t + FLOAT
          o.style.cssText = `right:${right}px;top:${top}px;--mr:${right}px;--mt:${top}px`
          burst((f.q.l + f.q.r) / 2, f.q.t + FLOAT + 24)
          live.push(o)
        }
        observe(box, (e) => { visible = e[0].isIntersecting }, 0.3)
        const t = window.setInterval(() => { if (visible) add() }, 2600)
        cleanups.push(() => window.clearInterval(t))
      }
    }

    // -- "how it works": four steps that advance on their own while in view
    const hw = root.querySelector<HTMLElement>("#hw")
    if (hw) {
      const items = [...hw.querySelectorAll<HTMLButtonElement>(".hw-i")]
      const scenes = [...hw.querySelectorAll<HTMLElement>(".hw-sc")]
      const DUR = [5200, 5200, 5600, 4800]
      let i = 0
      let t: number | undefined
      let inView = false
      let hover = false
      const arm = () => {
        window.clearTimeout(t)
        if (inView && !hover && !reduced) t = window.setTimeout(() => goStep(i + 1), DUR[i])
      }
      const goStep = (n: number, focus = false) => {
        i = (n + items.length) % items.length
        items.forEach((b, k) => {
          b.classList.toggle("on", k === i)
          b.setAttribute("aria-selected", String(k === i))
          b.tabIndex = k === i ? 0 : -1
        })
        scenes.forEach((s, k) => {
          s.classList.remove("on")
          if (k === i) {
            void s.offsetWidth
            s.classList.add("on")
          }
        })
        hw.style.setProperty("--dur", `${DUR[i]}ms`)
        const bar = items[i].querySelector<HTMLElement>(".hw-bar i")
        if (bar) {
          bar.style.animation = "none"
          void bar.offsetWidth
          bar.style.animation = ""
        }
        if (focus) items[i].focus()
        arm()
      }
      cleanups.push(() => window.clearTimeout(t))
      items.forEach((b, k) => {
        on(b, "click", () => goStep(k))
        on(b, "keydown", (e) => {
          const ke = e as KeyboardEvent
          const fwd = rtl ? "ArrowLeft" : "ArrowRight"
          const back = rtl ? "ArrowRight" : "ArrowLeft"
          if (ke.key === fwd || ke.key === "ArrowDown") { e.preventDefault(); goStep(i + 1, true) }
          else if (ke.key === back || ke.key === "ArrowUp") { e.preventDefault(); goStep(i - 1, true) }
          else if (ke.key === "Home") { e.preventDefault(); goStep(0, true) }
          else if (ke.key === "End") { e.preventDefault(); goStep(items.length - 1, true) }
        })
      })
      on(hw, "mouseenter", () => { hover = true; hw.classList.add("paused"); window.clearTimeout(t) })
      on(hw, "mouseleave", () => { hover = false; hw.classList.remove("paused"); arm() })
      on(hw, "focusin", () => { hover = true; hw.classList.add("paused"); window.clearTimeout(t) })
      on(hw, "focusout", () => { hover = false; hw.classList.remove("paused"); arm() })
      observe(hw, (e) => {
        const was = inView
        inView = e[0].isIntersecting
        if (inView && !was) goStep(i)
        else if (!inView) window.clearTimeout(t)
      }, 0.35)
    }

    // -- pricing: monthly / yearly switch (default yearly). Prices come from the
    //    design's data-m / data-y; plan buttons keep billing= in step.
    const bill = [...root.querySelectorAll<HTMLButtonElement>(".bill button")]
    if (bill.length) {
      const set = (k: "m" | "y", focus = false) => {
        bill.forEach((b) => {
          const isOn = b.dataset.b === k
          b.classList.toggle("on", isOn)
          b.setAttribute("aria-checked", String(isOn))
          b.tabIndex = isOn ? 0 : -1
          if (isOn && focus) b.focus()
        })
        root.querySelectorAll<HTMLElement>(".pl-price b, .pl-yr").forEach((e) => {
          const v = e.dataset[k]
          if (v !== undefined) e.textContent = v
        })
        root.querySelectorAll<HTMLAnchorElement>(".pl-cta[data-plan]").forEach((a) => {
          if (a.dataset.plan === "free") return
          // keep the exact URL format the live pricing page uses
          a.setAttribute("href", a.getAttribute("href")!.replace(/billing=(monthly|yearly)/, `billing=${k === "m" ? "monthly" : "yearly"}`))
        })
      }
      bill.forEach((b) => {
        b.tabIndex = b.classList.contains("on") ? 0 : -1
        on(b, "click", () => set(b.dataset.b as "m" | "y"))
        on(b, "keydown", (e) => {
          if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
            e.preventDefault()
            set(b.dataset.b === "m" ? "y" : "m", true)
          }
        })
      })
    }

    // -- pricing: the blue band drifts in one row and the centre item grows
    //    (script from the design). Hebrew flows right, English flows left.
    const mq = root.querySelector<HTMLElement>(".mq")
    const strip = mq?.querySelector<HTMLElement>(".inc")
    if (mq && strip && !reduced) {
      const orig = [...strip.children] as HTMLElement[]
      const clones: HTMLElement[] = []
      for (let k = 0; k < 3; k++)
        orig.forEach((e) => {
          const c = e.cloneNode(true) as HTMLElement
          c.setAttribute("aria-hidden", "true")
          strip.appendChild(c)
          clones.push(c)
        })
      const half = strip.scrollWidth / 4
      let x = -half
      let last = performance.now()
      let raf = 0
      let paused = false
      let visible = true
      const step = (t: number) => {
        const dt = Math.min(64, t - last)
        last = t
        if (!paused) {
          if (rtl) {
            x += dt * 0.045
            if (x >= 0) x -= half
          } else {
            x -= dt * 0.045
            if (x <= -2 * half) x += half
          }
        }
        strip.style.transform = `translateX(${x}px)`
        const r = mq.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const R = r.width * 0.3
        for (const e of strip.children as HTMLCollectionOf<HTMLElement>) {
          const bb = e.getBoundingClientRect()
          const d = Math.abs(bb.left + bb.width / 2 - cx)
          const k = Math.max(0, 1 - d / R)
          e.style.transform = `scale(${(1 + 0.38 * k * k).toFixed(3)})`
          e.classList.toggle("hot", k > 0.6)
        }
        raf = visible ? requestAnimationFrame(step) : 0
      }
      raf = requestAnimationFrame(step)
      on(mq, "mouseenter", () => { paused = true })
      on(mq, "mouseleave", () => { paused = false })
      observe(mq, (e) => {
        visible = e[0].isIntersecting
        if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(step) }
      }, 0)
      cleanups.push(() => {
        cancelAnimationFrame(raf)
        clones.forEach((c) => c.remove())
        strip.style.transform = ""
        orig.forEach((e) => { e.style.transform = ""; e.classList.remove("hot") })
      })
    }

    // -- "built right": rings fill once in view
    const bq = root.querySelector<HTMLElement>("#bq")
    if (bq) {
      const io = observe(bq, (e) => {
        if (e[0].isIntersecting) {
          bq.classList.add("in")
          io.disconnect()
        }
      }, 0.3)
    }

    return () => cleanups.forEach((c) => c())
  }, [lang, rootId])

  return null
}
