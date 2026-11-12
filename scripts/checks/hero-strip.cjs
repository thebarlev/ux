// node hero-strip.cjs <base> [shots-dir] [baseline-base]   (VERCEL_BYPASS for a preview) — 057: the professions strip in the
// hero, in place of the tag, and no "for every business" section on the home page. At 1440, 768, 390, 320, he and en:
// no horizontal scroll, h1 bigger than every h2, the h1 no lower than on baseline-base (the page with the old tag),
// 16 professions with an icon, an aria-label with the list, aria-hidden copies, the strip moves and pauses on hover,
// with reduced motion it stands still; the gap around the removed section like the rest of the page
const { chromium } = require('playwright');
const [P, OUT, BASE] = process.argv.slice(2); const K = process.env.VERCEL_BYPASS;
const N = 16;
(async () => {
  const b = await chromium.launch({ channel: 'chrome' }); let fails = 0;
  const open = async (base, lang, w, reduced) => {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: w > 1000 ? 1 : 2, locale: lang === 'he' ? 'he-IL' : 'en-US',
      reducedMotion: reduced ? 'reduce' : 'no-preference', extraHTTPHeaders: K && base === P ? { 'x-vercel-protection-bypass': K } : {} });
    await ctx.addCookies([{ name: 'lang_pref', value: lang, url: base }, { name: 'ux_consent', value: '1%7C2026-11-09T00%3A00%3A00.000Z%7Ca0%7Cm0', url: base }]);
    const pg = await ctx.newPage();
    await pg.goto(base + (lang === 'en' ? '/en' : '/'), { waitUntil: 'networkidle' }); await pg.waitForTimeout(1200);
    return { ctx, pg };
  };
  const h1Top = (pg) => pg.evaluate(() => document.querySelector('.hero h1').getBoundingClientRect().top + scrollY);
  for (const lang of ['he', 'en']) for (const w of [1440, 768, 390, 320]) {
    const errs = [];
    let base = null;
    if (BASE) { const o = await open(BASE, lang, w); base = await h1Top(o.pg); await o.ctx.close(); }
    const { ctx, pg } = await open(P, lang, w);
    const r = await pg.evaluate((N) => {
      const mq = document.querySelector('.hero .mq'), fs = (e) => parseFloat(getComputedStyle(e).fontSize);
      const all = [...mq.querySelectorAll('.in-c')], orig = all.filter((e) => !e.hasAttribute('aria-hidden'));
      const h1 = document.querySelector('.hero h1'), h2 = Math.max(...[...document.querySelectorAll('h2')].filter((e) => e.offsetParent).map(fs));
      const secs = [...document.querySelectorAll('main > section')];
      const ben = document.querySelector('#ben'), prev = ben.previousElementSibling;
      const gaps = secs.slice(1).map((s) => { const p = s.previousElementSibling; return p && p.tagName === 'SECTION' ? `${p.id || p.className}|${s.id || s.className}:${parseFloat(getComputedStyle(p).paddingBottom)}+${parseFloat(getComputedStyle(s).paddingTop)}` : null }).filter(Boolean);
      return { eyebrow: !!document.querySelector('.hero .eyebrow'), who: !!document.querySelector('#who, .who2, .orb'), label: mq.getAttribute('aria-label'), role: mq.getAttribute('role'),
        orig: orig.length, copies: all.length - orig.length, icons: orig.filter((e) => e.querySelector('svg')).length,
        iconColor: orig.every((e) => getComputedStyle(e.querySelector('svg')).stroke === getComputedStyle(e).color),
        h1top: h1.getBoundingClientRect().top + scrollY, h1fs: fs(h1), h2fs: h2, hscroll: document.documentElement.scrollWidth > innerWidth,
        stripH: mq.getBoundingClientRect().height, prev: prev.id || prev.className, benGap: `${parseFloat(getComputedStyle(prev).paddingBottom)}+${parseFloat(getComputedStyle(ben).paddingTop)}`, gaps };
    }, N);
    const t = () => pg.evaluate(() => document.querySelector('.hero .mq .inc').style.transform);
    const t1 = await t(); await pg.waitForTimeout(600); const t2 = await t();
    // between two items none is in the centre, so look a few times
    let hot = [];
    for (let k = 0; k < 10 && !hot.length; k++) { hot = await pg.evaluate(() => [...document.querySelectorAll('.hero .mq .in-c.hot')].map((e) => [e.textContent, getComputedStyle(e).color])); if (!hot.length) await pg.waitForTimeout(250) }
    await pg.hover('.hero .mq'); await pg.waitForTimeout(200); const h1_ = await t(); await pg.waitForTimeout(600); const h2_ = await t();
    await pg.mouse.move(5, 600);
    if (r.eyebrow || r.who) errs.push('old parts');
    if (r.orig !== N || r.icons !== N || !r.iconColor || r.copies < N || r.role !== 'img' || r.label.split(', ').length !== N) errs.push('strip');
    if (t1 === t2) errs.push('not moving');
    if (!hot.length) errs.push('no hot');
    if (h1_ !== h2_) errs.push('no pause');
    if (!(r.h1fs > r.h2fs)) errs.push('h1<=h2');
    if (r.hscroll) errs.push('hscroll');
    if (base !== null && r.h1top > base + 0.5) errs.push(`h1 lower by ${(r.h1top - base).toFixed(1)}`);
    if (OUT) {
      await pg.evaluate(() => document.querySelectorAll('[class*="ck-"],[class^="uxl"],#ck,.ck').forEach((e) => { if (getComputedStyle(e).position === 'fixed') e.style.display = 'none' }));
      await pg.mouse.move(5, 899); await pg.waitForTimeout(800);
      await pg.screenshot({ path: `${OUT}/hero-${lang}-${w}.png` });
      if (w === 1440 || w === 390) {
        await pg.addStyleTag({ content: '#hdr{visibility:hidden!important}' });
        await pg.evaluate(() => scrollTo(0, document.querySelector('#ben').getBoundingClientRect().top + scrollY - 450)); await pg.waitForTimeout(800);
        await pg.screenshot({ path: `${OUT}/no-who-${lang}-${w}.png` });
      }
    }
    await ctx.close();
    // reduced motion: a still strip, no copies
    const rm = await open(P, lang, w, true);
    const s = await rm.pg.evaluate(() => { const i = document.querySelector('.hero .mq .inc'); return { tr: i.style.transform, copies: i.querySelectorAll('[aria-hidden="true"].in-c').length, hs: document.documentElement.scrollWidth > innerWidth } });
    if (s.tr || s.copies || s.hs) errs.push('reduced motion');
    if (OUT && w === 390) await rm.pg.screenshot({ path: `${OUT}/reduced-motion-${lang}-${w}.png` });
    await rm.ctx.close();
    if (errs.length) fails++;
    console.log(lang, w, `h1 ${r.h1top.toFixed(1)}${base !== null ? ` (was ${base.toFixed(1)})` : ''}, ${r.h1fs}px > h2 ${r.h2fs}px, strip ${r.stripH}px, hot ${JSON.stringify(hot[0])}, before #ben: ${r.prev} ${r.benGap}`, errs.length ? 'FAIL ' + errs.join(',') : 'ok');
    if (w === 1440 || w === 390) console.log('   gaps', r.gaps.join('  '));
  }
  await b.close(); console.log('FAILS', fails);
})();
