// node faq-topic.cjs <base> [shots-dir]   (VERCEL_BYPASS for a preview) — 054: the "email and automations" topic is last
// in the FAQ page's topic menu, its link scrolls to it and marks it current, and it holds its four questions
const { chromium } = require('playwright');
const [P, OUT] = process.argv.slice(2); const K = process.env.VERCEL_BYPASS;
(async () => {
  const b = await chromium.launch({ channel: 'chrome' }); let fails = 0;
  for (const lang of ['he', 'en']) for (const w of [1440, 390]) {
    const ctx = await b.newContext({ viewport: { width: w, height: w > 1000 ? 900 : 844 }, extraHTTPHeaders: K ? { 'x-vercel-protection-bypass': K } : {} });
    const host = new URL(P).hostname;
    await ctx.addCookies([{ name: 'ux_consent', value: '1%7C2026-11-09T00%3A00%3A00.000Z%7Ca0%7Cm0', domain: host, path: '/' }, { name: 'lang_pref', value: lang, domain: host, path: '/' }]);
    const pg = await ctx.newPage();
    await pg.goto(P + (lang === 'en' ? '/en/faq' : '/faq'), { waitUntil: 'networkidle' });
    const links = await pg.$$eval('[data-uxf-nav] a', as => as.map(a => a.getAttribute('href')));
    await pg.click('[data-uxf-nav] a[href="#mailing"]'); await pg.waitForTimeout(1500);
    const r = await pg.evaluate(() => {
      const g = document.getElementById('mailing'), a = document.querySelector('[data-uxf-nav] a[href="#mailing"]'), t = g.getBoundingClientRect().top;
      return { top: Math.round(t), visible: t >= 0 && t < innerHeight * 0.6, current: a.classList.contains('on'), qs: g.querySelectorAll('details').length,
        hscroll: document.documentElement.scrollWidth > innerWidth, hash: location.hash };
    });
    const bad = links[links.length - 1] !== '#mailing' || links.length !== 5 || !r.visible || !r.current || r.qs !== 4 || r.hscroll;
    if (bad) fails++; console.log(lang, w, JSON.stringify({ links, ...r }), bad ? 'FAIL' : 'ok');
    if (OUT) {
      await pg.evaluate(() => { const d = document.querySelectorAll('#mailing details'); d.forEach(x => x.open = true) }); await pg.waitForTimeout(300);
      await pg.screenshot({ path: `${OUT}/faq-topic-${lang}-${w}.png` });
    }
    await ctx.close();
  }
  await b.close(); console.log('FAILS', fails);
})();
