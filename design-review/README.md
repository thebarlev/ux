# /new-home hero — design review (round 3: single dark hero, live mockup)

Final deliverables. The hero is the single dark ("premium") direction with a
**living** product dashboard that breathes in a slow, elegant CSS loop
(rolling KPIs, a drawn growth chart, climbing bars, an activity feed that
advances, a pulsing "live" dot). All motion is transform/opacity and is gated
behind prefers-reduced-motion (which resolves to a calm static dashboard).

| file | what | size |
| --- | --- | --- |
| r3_desk_1440.gif | desktop hero, animated | 1440 |
| r3_desk_1440_still.png | desktop hero, still | 1440 |
| r3_mobile_390.gif | mobile mockup, animated | 390 |
| r3_mobile_390_still.png | mobile mockup, still | 390 |

Capture method: frames are frozen deterministically via the Web Animations API
(`getAnimations()` + `currentTime`) in a real Chrome viewport, then assembled
with Pillow at ~430ms/frame (near real-time pace). Chromium headless
mis-renders narrow RTL viewports and the zoom action mis-frames wide captures,
so all frames come from plain real-browser screenshots.

Earlier rounds (r2_*) documented the previous two-variant exploration and are
superseded by r3.
