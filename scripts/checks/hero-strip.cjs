// node hero-strip.cjs <base> [shots-dir] [baseline-base]   (VERCEL_BYPASS for a preview) — 057, 058: the professions strip in the
// hero, between the h1 and the sub (18px / 12px under the h1), the centre one in --brand-d, "AI" in the h1 at 600, the ticks on one line, and no "for every business" section on the home page. At 1440, 768, 390, 360, 320, he and en:
// no horizontal scroll, h1 bigger than every h2, the h1 where it was on baseline-base (the page with the old tag) minus the tag,
// 15 professions with an icon, an aria-label with the list, aria-hidden copies, the strip moves and pauses on hover,
// with reduced motion it stands still; the gap around the removed section like the rest of the page
const { chromium } = require('playwright');
const [P, OUT, BASE] = process.argv.slice(2); const K = process.env.VERCEL_BYPASS;
const N = 15; // 058: no studios
(async () => {
  const b = await chromium.launch({ channel: 'chrome' }); let fails = 0;
  const open = async (base, lang, w, reduced) => {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: w > 1000 ? 1 : 2, locale: lang === 'he' ? 'he-IL' : 'en-US',
      reducedMotion: reduced ? 'reduce' : 'no-preference', extraHTTPHeaders: K && base.includes('vercel.app') ? { 'x-vercel-protection-bypass': K } : {} });
    await ctx.addCookies([{ name: 'lang_pref', value: lang, url: base }, { name: 'ux_consent', value: '1%7C2026-11-09T00%3A00%3A00.000Z%7Ca0%7Cm0', url: base }]);
    const pg = await ctx.newPage();
    await pg.goto(base + (lang === 'en' ? '/en' : '/'), { waitUntil: 'networkidle' }); await pg.waitForTimeout(1200);
    return { ctx, pg };
  };
  // the baseline: a page with the old tag above the h1 (055)
  const h1Top = (pg) => pg.evaluate(() => ({ h1: document.querySelector('.hero h1').getBoundingClientRect().top + scrollY, tag: document.querySelector('.hero .eyebrow').getBoundingClientRect().height }));
  for (const lang of ['he', 'en']) for (const w of [1440, 768, 390, 360, 320]) {
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
      const R = (e) => e.getBoundingClientRect(), sub = document.querySelector('.hero .sub'), tr = document.querySelector('.hero .trust');
      const place = { afterH1: h1.nextElementSibling === mq && mq.nextElementSibling === sub, h1Gap: Math.round(R(mq).top - R(h1).bottom), subGap: Math.round(R(sub).top - R(mq).bottom),
        subMt: parseFloat(getComputedStyle(sub).marginTop), ai: getComputedStyle(h1.querySelector('.ai')).fontWeight,
        ticks: new Set([...tr.children].map((e) => Math.round(R(e).top))).size, tickFs: getComputedStyle(tr.children[0]).fontSize, tickOver: tr.scrollWidth > tr.clientWidth,
        brandD: getComputedStyle(mq).getPropertyValue('--brand-d').trim() };
      return { place, eyebrow: !!document.querySelector('.hero .eyebrow'), who: !!document.querySelector('#who, .who2, .orb'), label: mq.getAttribute('aria-label'), role: mq.getAttribute('role'),
        orig: orig.length, copies: all.length - orig.length, icons: orig.filter((e) => e.querySelector('svg')).length,
        iconColor: orig.every((e) => getComputedStyle(e.querySelector('svg')).stroke === getComputedStyle(e).color),
        h1top: h1.getBoundingClientRect().top + scrollY, h1fs: fs(h1), h2fs: h2, hscroll: document.documentElement.scrollWidth > innerWidth,
        stripH: mq.getBoundingClientRect().height, prev: prev.id || prev.className, benGap: `${parseFloat(getComputedStyle(prev).paddingBottom)}+${parseFloat(getComputedStyle(ben).paddingTop)}`, gaps };
    }, N);
    const t = () => pg.evaluate(() => document.querySelector('.hero .mq .inc').style.transform);
    const t1 = await t(); await pg.waitForTimeout(600); const t2 = await t();
    // between two items none is in the centre, and the colour eases in (.2s), so look a few times
    const rgb = (h) => `rgb(${parseInt(h.slice(1, 3), 16)}, ${parseInt(h.slice(3, 5), 16)}, ${parseInt(h.slice(5, 7), 16)})`;
    const settled = (h) => h.length && h[0][1] === rgb(r.place.brandD) && h[0][2] === h[0][1];
    let hot = [];
    for (let k = 0; k < 12 && !settled(hot); k++) { hot = await pg.evaluate(() => [...document.querySelectorAll('.hero .mq .in-c.hot')].map((e) => [e.textContent, getComputedStyle(e).color, getComputedStyle(e.querySelector('svg')).stroke])); if (!settled(hot)) await pg.waitForTimeout(250) }
    await pg.hover('.hero .mq'); await pg.waitForTimeout(200); const h1_ = await t(); await pg.waitForTimeout(600); const h2_ = await t();
    await pg.mouse.move(5, 600);
    if (r.eyebrow || r.who) errs.push('old parts');
    if (r.orig !== N || r.icons !== N || !r.iconColor || r.copies < N || r.role !== 'img' || r.label.split(', ').length !== N) errs.push('strip');
    if (t1 === t2) errs.push('not moving');
    if (!hot.length) errs.push('no hot');
    if (h1_ !== h2_) errs.push('no pause');
    if (hot.length && !settled(hot)) errs.push('hot not --brand-d');
    const P_ = r.place;
    if (!P_.afterH1 || Math.abs(P_.h1Gap - (w > 1060 ? 18 : 12)) > 1 || Math.abs(P_.subGap - P_.subMt) > 1) errs.push('placement');
    if (P_.ai !== '600') errs.push('AI weight');
    if (P_.ticks !== 1 || P_.tickOver || parseFloat(P_.tickFs) < (w > 1060 ? 13 : 14)) errs.push('ticks');
    if (!(r.h1fs > r.h2fs)) errs.push('h1<=h2');
    if (r.hscroll) errs.push('hscroll');
    // 058: the strip is under the h1, so the h1 sits where it would without the old tag (its top minus the tag's height)
    if (base !== null && Math.abs(r.h1top - (base.h1 - base.tag)) > 1) errs.push(`h1 at ${r.h1top.toFixed(1)}, want ${(base.h1 - base.tag).toFixed(1)}`);
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
    console.log(lang, w, `h1 ${r.h1top.toFixed(1)}${base !== null ? ` (tag page ${base.h1.toFixed(1)} - tag ${base.tag})` : ''}, gaps ${r.place.h1Gap}/${r.place.subGap}, ticks ${r.place.tickFs}, ${r.h1fs}px > h2 ${r.h2fs}px, strip ${r.stripH}px, hot ${JSON.stringify(hot[0])}, before #ben: ${r.prev} ${r.benGap}`, errs.length ? 'FAIL ' + errs.join(',') : 'ok');
    if (w === 1440 || w === 390) console.log('   gaps', r.gaps.join('  '));
  }
  await b.close(); console.log('FAILS', fails);
})();
