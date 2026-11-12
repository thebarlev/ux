// 052: page screenshots (before/after the font move) and every font request.
// node fonts.cjs <base> <outdir> <tag>   (VERCEL_BYPASS for a preview)
const { chromium } = require('playwright');
const [BASE, OUT, TAG] = process.argv.slice(2); const K = process.env.VERCEL_BYPASS;
const PAGES = [['home', '/', 'he'], ['home', '/en', 'en'], ['pricing', '/pricing', 'he'], ['pricing', '/en/pricing', 'en'], ['article', '/blog/automation', 'he'], ['checkout', '/checkout/success', 'he']];
(async () => {
  const b = await chromium.launch({ channel: 'chrome' }); const report = {};
  for (const [name, path, lang] of PAGES) for (const w of [1440, 390]) {
    const ctx = await b.newContext({ viewport: { width: w, height: w > 1000 ? 900 : 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce',
      extraHTTPHeaders: K ? { 'x-vercel-protection-bypass': K } : {} });
    const host = new URL(BASE).hostname;
    await ctx.addCookies([{ name: 'ux_consent', value: '1%7C2026-11-09T00%3A00%3A00.000Z%7Ca0%7Cm0', domain: host, path: '/' }, { name: 'lang_pref', value: lang, domain: host, path: '/' }]);
    const pg = await ctx.newPage(); const fonts = [];
    pg.on('request', r => { const u = r.url(); if (r.resourceType() === 'font' || /fonts\.(googleapis|gstatic)\.com/.test(u)) fonts.push(u.replace(/\?.*/, '')) });
    await pg.goto(BASE + path, { waitUntil: 'networkidle' });
    await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(1500);
    // every animation stopped at the same moment, so two runs compare pixel by pixel
    await pg.evaluate(() => { document.getAnimations().forEach(a => { a.pause(); a.currentTime = 0 }) });
    await pg.waitForTimeout(200);
    const used = await pg.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight}`));
    await pg.screenshot({ path: `${OUT}/${TAG}-${name}-${lang}-${w}.png` });
    report[`${name}-${lang}-${w}`] = { fonts: [...new Set(fonts)].map(u => u.replace(/^https?:\/\/[^/]+/, m => /google|gstatic/.test(m) ? m : '')), loaded: [...new Set(used)].sort() };
    await ctx.close();
  }
  await b.close(); console.log(JSON.stringify(report, null, 1));
})();
