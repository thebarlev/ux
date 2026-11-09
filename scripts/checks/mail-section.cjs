// node mail-section.cjs <base> <shots-dir>   (VERCEL_BYPASS for a preview) — 048: the #mail section (MAILING_LIVE on), the fifth card and the two questions; screenshots
const { chromium } = require('playwright');
const [P, OUT] = process.argv.slice(2); const K = process.env.VERCEL_BYPASS;
(async () => {
  const b = await chromium.launch({channel:'chrome'}); let fails = 0;
  for (const lang of ['he', 'en']) for (const w of [1440, 390]) {
    const ctx = await b.newContext({ viewport: { width: w, height: w > 1000 ? 900 : 844 }, deviceScaleFactor: w > 1000 ? 1 : 2, locale: lang === 'he' ? 'he-IL' : 'en-US',
      extraHTTPHeaders: K ? { 'x-vercel-protection-bypass': K } : {} });
    await ctx.addCookies([{ name: 'lang_pref', value: lang, url: P }, { name: 'ux_consent', value: '1%7C2026-11-09T00%3A00%3A00.000Z%7Ca0%7Cm0', url: P }]);
    const pg = await ctx.newPage();
    await pg.goto(P + (lang === 'en' ? '/en' : '/'), { waitUntil: 'networkidle' });
    await pg.evaluate(() => document.querySelectorAll('[class*="ck-"],[class^="uxl"],#ck,.ck').forEach(e => { if (getComputedStyle(e).position === 'fixed') e.style.display = 'none' }));
    await pg.addStyleTag({ content: '#hdr{visibility:hidden!important}' });
    const mail = pg.locator('#mail'); await mail.scrollIntoViewIfNeeded(); await pg.waitForTimeout(4500);
    const r = await pg.evaluate(() => { const m = document.querySelector('#mail'), a = m.querySelector('.ml-app');
      const app = a.getBoundingClientRect(); const ok = a.querySelector('.ml-ok');
      const prev = m.previousElementSibling?.id, next = m.nextElementSibling?.id;
      return { inCls: m.classList.contains('in'), appH: Math.round(app.height), okOp: getComputedStyle(ok).opacity, okInside: ok.getBoundingClientRect().bottom <= app.bottom + 1,
        hscroll: document.documentElement.scrollWidth > innerWidth, prev, next } });
    const bad = !r.inCls || r.okOp !== '1' || !r.okInside || r.hscroll || r.prev !== 'how' || r.next !== 'bq' || r.appH !== (w > 1000 ? 470 : 500);
    if (bad) fails++; console.log(lang, w, JSON.stringify(r), bad ? 'FAIL' : 'ok');
    await mail.screenshot({ path: `${OUT}/mail-${lang}-${w}.png` });
    // the fifth carousel card
    const ben = pg.locator('#ben'); await ben.scrollIntoViewIfNeeded();
    const cards = pg.locator('#ben .ben'); await cards.nth(4).click(); await pg.waitForTimeout(1200);
    await ben.screenshot({ path: `${OUT}/card5-${lang}-${w}.png` });
    // the two questions open, in the home FAQ
    const faq = pg.locator('#faq');
    const qs = pg.locator('#faq details'); for (const k of [0]) { }
    await pg.evaluate(() => { const d = [...document.querySelectorAll('#faq details')]; d.forEach(x => x.open = false); const i = d.findIndex(x => /דומיין|domain/.test(x.querySelector('summary').textContent)); d[i - 2].open = true; d[i - 1].open = true });
    await faq.scrollIntoViewIfNeeded(); await pg.waitForTimeout(400);
    await faq.screenshot({ path: `${OUT}/faq-home-${lang}-${w}.png` });
    // the FAQ page's email topic: faq-topic.cjs (054)
    await ctx.close();
  }
  await b.close(); console.log('FAILS', fails);
})();
