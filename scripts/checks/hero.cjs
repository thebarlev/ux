// node hero.cjs <base> <shots-dir>   (VERCEL_BYPASS for a preview) — 055: the hero copy (site, email and automations; the tag above it is the professions strip since 057: hero-strip.cjs), the meta,
// and the email card second in the carousel. At 1440, 390, 360, 320, he and en: h1 bigger than every h2, no horizontal
// scroll, the h1 breaking only between 055's groups, and the sub not ending on a single word; screenshots of the hero and the second card
const { chromium } = require('playwright');
const [P, OUT] = process.argv.slice(2); const K = process.env.VERCEL_BYPASS;
const WANT = {
  he: { h1: 'מספרים ל-AI על העסק.מקבלים אתר, דיוור ואוטומציות.', tick: 'דיוור ואוטומציות בפנים', row: 'מחבר טופס, דיוור ואוטומציות',
        title: 'UXellent · אתר, דיוור ואוטומציות ב-AI', card: 'דיוור ואוטומציות, מאותו חשבון.', label: '2 מתוך 5', lines: { d: ['מספרים ל-AI על העסק.', 'מקבלים אתר, דיוור ואוטומציות.'], m: ['מספרים ל-AI', 'על העסק.', 'מקבלים אתר, דיוור', 'ואוטומציות.'] } },
  en: { h1: 'Tell AI what you do.Get a site, email and automations.', tick: 'Email and automations built in', row: 'Connecting forms, email and automations',
        title: 'UXellent · AI website, email and automations', card: 'Email and automations, from the same account.', label: '2 of 5', lines: { d: ['Tell AI what you do.', 'Get a site,', 'email and automations.'], m: ['Tell AI what you do.', 'Get a site, email and', 'automations.'] } },
};
(async () => {
  const b = await chromium.launch({ channel: 'chrome' }); let fails = 0;
  for (const lang of ['he', 'en']) for (const w of [1440, 390, 360, 320]) {
    const ctx = await b.newContext({ viewport: { width: w, height: w > 1000 ? 900 : 800 }, deviceScaleFactor: w > 1000 ? 1 : 2, locale: lang === 'he' ? 'he-IL' : 'en-US',
      extraHTTPHeaders: K ? { 'x-vercel-protection-bypass': K } : {} });
    await ctx.addCookies([{ name: 'lang_pref', value: lang, url: P }, { name: 'ux_consent', value: '1%7C2026-11-09T00%3A00%3A00.000Z%7Ca0%7Cm0', url: P }]);
    const pg = await ctx.newPage();
    await pg.goto(P + (lang === 'en' ? '/en' : '/'), { waitUntil: 'networkidle' }); await pg.waitForTimeout(1500);
    const W = WANT[lang];
    const r = await pg.evaluate(() => {
      // the words of an element, grouped into rendered lines by their top
      const lines = (el) => { const tops = []; const wk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n; (n = wk.nextNode());) for (const m of n.textContent.matchAll(/\S+/g)) { const rg = document.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
          const rc = [...rg.getClientRects()].filter(x => x.width > 0); if (!rc.length) continue; const t = Math.round(rc[0].top);
          let L = tops.find(x => Math.abs(x.t - t) < 8); if (!L) tops.push(L = { t, w: [] }); L.w.push(m[0]) }
        return tops.sort((a, b) => a.t - b.t).map(x => x.w.join(' ')) };
      const h1 = document.querySelector('.hero h1'), sub = document.querySelector('.hero .sub');
      const fs = (e) => parseFloat(getComputedStyle(e).fontSize);
      const h2 = Math.max(...[...document.querySelectorAll('h2')].filter(e => e.offsetParent).map(fs));
      const cards = [...document.querySelectorAll('#ben .ben')];
      return { h1: h1.textContent, h1fs: fs(h1), h2fs: h2, h1lines: lines(h1), sublast: lines(sub).at(-1),
        tick: [...document.querySelectorAll('.hero .trust span')].at(-1).textContent, row: document.querySelector('.f-ai li.d5').textContent,
        title: document.title, desc: document.querySelector('meta[name=description]').content, og: document.querySelector('meta[property="og:title"]').content,
        ogd: document.querySelector('meta[property="og:description"]').content,
        card2: cards[1]?.querySelector('h3').textContent, label2: cards[1]?.getAttribute('aria-label'), labels: cards.map(c => c.getAttribute('aria-label')),
        subText: sub.textContent, hscroll: document.documentElement.scrollWidth > innerWidth };
    });
    const errs = [];
    if (r.h1 !== W.h1) errs.push('h1');
    if (!(r.h1fs > r.h2fs)) errs.push('h1<=h2');
    if (!r.sublast.includes(' ')) errs.push('sub lone word');
    // the h1 breaks only where 055 says (its nowrap groups; in English those are whole from 600px)
    if (JSON.stringify(r.h1lines) !== JSON.stringify(W.lines[w > 1060 ? 'd' : 'm'])) errs.push('h1 lines');
    if (r.tick !== W.tick || r.row !== W.row) errs.push('copy');
    if (r.title !== W.title || r.og !== W.title || r.desc !== r.subText || r.ogd !== r.subText) errs.push('meta');
    if (r.card2 !== W.card || r.label2 !== W.label || r.labels.length !== 5 || r.labels.some((l, i) => !l.startsWith(i + 1 + ' '))) errs.push('carousel');
    if (r.hscroll) errs.push('hscroll');
    if (errs.length) fails++;
    console.log(lang, w, `h1 ${r.h1fs}px > h2 ${r.h2fs}px`, JSON.stringify(r.h1lines), 'sub-last:', r.sublast, errs.length ? 'FAIL ' + errs.join(',') : 'ok');
    await pg.evaluate(() => document.querySelectorAll('[class*="ck-"],[class^="uxl"],#ck,.ck').forEach(e => { if (getComputedStyle(e).position === 'fixed') e.style.display = 'none' }));
    if (OUT) {
      await pg.screenshot({ path: `${OUT}/hero-${lang}-${w}.png` });
      if (w === 1440 || w === 390) {
        await pg.addStyleTag({ content: '#hdr{visibility:hidden!important}' });
        const ben = pg.locator('#ben'); await ben.scrollIntoViewIfNeeded(); await pg.locator('#ben .ben').nth(1).click(); await pg.waitForTimeout(1200);
        await ben.screenshot({ path: `${OUT}/card2-${lang}-${w}.png` });
      }
    }
    await ctx.close();
  }
  await b.close(); console.log('FAILS', fails);
})();
