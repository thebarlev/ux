# /new-home hero — design review

## Round 7 (current): theme 3 "Mioshy" joins the carousel
The hero mockup carousel now has three live themes (the last dot is a dimmed
placeholder). Each theme has its own palette, layout and panel:
  1. חשבוניות ירוקות — navy invoices dashboard + phone.
  2. Auditor — violet + amber deep-scan panel with a radar sweep.
  3. Mioshy — a plum/magenta/lime truth-or-dare **spin wheel** that does one
     accelerate-and-brake spin (~2 turns, no loop), stops, then a cream question
     popup rises once and stays. No background/panel — wheel + popup sit straight
     on the dark hero. Tag "משחקים לזוגות אונליין".

The wheel is rebuilt 1:1 from Mioshy's `components/Wheel.tsx` geometry (12 wedges
#620085/#D2006F, #C7FF0F dividers/dots, #3B0638 hub, radial כנות/אתגר labels,
teardrop pointer), and the popup from `components/game/QuestionPopup.tsx`
(#FBF5F2 card, Frank Ruhl Libre italic question, #B83C4D→#3D1F3D CTA). None of
Mioshy's libraries were pulled in — only the visual core, as standalone new-home
code.

| file | what |
| --- | --- |
| r7_theme3_1440.gif / _still.png | theme 3, desktop (spin → stop → popup) |
| r7_theme3_390.gif / _still.png | theme 3, mobile |

Capture: WAAPI freeze in an exact-width same-origin iframe, real-browser
screenshots, assembled with Pillow. Earlier themes: r6_* (themes 1–2 + switch),
r5_* / r3_* / r2_* (superseded).
