# Site checks

Scripts used to verify each change against production or a preview. They are not part of the site build.

- Python scripts need only Python 3 (standard library).
- Browser scripts (`.cjs`) use Playwright with the installed Chrome: `cd scripts/checks && npm install` once.
- A preview is behind Vercel protection: pass the bypass key in the environment as `VERCEL_BYPASS` (never commit it). The Python scripts that support a preview take it as their last argument.

| Script | Checks |
|---|---|
| `smoke.py [base]` | main pages answer, redirects, MAILING_LIVE parts on (054; `MAILING=off` for a build without them) |
| `forbidden-strings.py <base>` | strings that must not reach the browser (pages and JS chunks) |
| `backup-legal.py <base>` | backup wording (30 days, paid plans) in the legal pages, features, articles, llms.txt |
| `lang-redirects.py <base>` | first visit by the browser's language (050, 051) |
| `hreflang-sitemap.py <base>` | sitemap URLs, canonical, hreflang and x-default (051) |
| `lang-switch.cjs <base> [shots] [pages]` | the header language switch, no horizontal scroll (051) |
| `lang-switch-menu.cjs <preview> <shots>` | the switch with 3+ languages: menu, sheet, keyboard (051) |
| `lang-switch-clicks.cjs <base>` | switching language, no redirect loop (050) |
| `who-icons.cjs <base> <lang> <width> [shots]` | "for every business" icons pop on free spots only (048) |
| `mail-section.cjs <base> <shots>` | the home email section, card and questions with MAILING_LIVE (048) |
| `faq-topic.cjs <base> [shots]` | the FAQ page's email topic: last in the menu, its anchor, four questions (054) |
| `mail-steps.cjs <base>` | the step numbers in the email mockup (053) |
| `fonts.cjs <base> <shots> <tag>` | screenshots and every font request; nothing from Google (052) |
