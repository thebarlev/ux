# /new-home hero — design review

## Round 5 (current): theme carousel + theme 1 "חשבוניות ירוקות"
Full-bleed dark hero with a dedicated dark header (light logo; shared
SiteHeader untouched), a fixed copy column (3-line H1), white client logos
inside the dark block, and a product-mockup **carousel of 4 themes**. Only
theme 1 is live (invoices skin); dots 2–4 are dimmed placeholders. The active
dot fills a progress bar and auto-advances at a calm pace, pauses on
hover/touch, is clickable, and honours prefers-reduced-motion (static skin).
Built to the approved reference `theme1-preview.html`.

| file | what | width |
| --- | --- | --- |
| r5_desk_1440.gif | desktop hero, animated (phone loop: form → מספר הקצאה → confetti) | 1440 |
| r5_desk_1440_still.png | desktop still | 1440 |
| r5_mobile_390.gif | mobile mockup, animated | 390 |
| r5_mobile_390_still.png | mobile still | 390 |

Capture: WAAPI freeze (`getAnimations()` + `currentTime`) in an exact-width
same-origin iframe, plain real-browser screenshots, assembled with Pillow.
No parallel headless.

## Round 3 (superseded): single dark hero, live dashboard — r3_*
## Round 2 (superseded): two-variant exploration — r2_*
