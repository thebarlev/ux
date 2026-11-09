// node lang-switch-clicks.cjs <base> — 050: the language switch after a browser-language first visit; no loop, and the IL prompt
const {chromium}=require('playwright');const BASE=process.argv[2];
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
let fails=0;const out=(ok,name,got)=>{if(!ok)fails++;console.log(`${ok?'OK  ':'FAIL'} | ${name} | ${got}`)};
const P=(u)=>new URL(u).pathname+new URL(u).search;
(async()=>{const b=await chromium.launch({channel:'chrome'});
 const ctx=async(al)=>{const c=await b.newContext({userAgent:UA,locale:al.startsWith('he')?'he-IL':'en-US',extraHTTPHeaders:{'accept-language':al},viewport:{width:1280,height:900}});
  const host=new URL(BASE).hostname;await c.addCookies([{name:'ux_consent',value:'1%7C2026-11-08T00%3A00%3A00.000Z%7Ca0%7Cm0',domain:host,path:'/'}]);return c};
 const prompt=async(p)=>{await p.waitForTimeout(1200);return await p.locator('.uxl-box').count()};
 // 1. en-US: first visit to / lands on /en; עברית in the footer → /pricing in Hebrew, and it stays Hebrew
 {const c=await ctx('en-US,en;q=0.9');const p=await c.newPage();
  await p.goto(BASE+'/');out(P(p.url())==='/en','en-US first visit /',P(p.url())+` · prompt=${await prompt(p)}`);
  if(await prompt(p))await p.keyboard.press('Escape');
  await p.goto(BASE+'/en/pricing');await p.locator('nav.lang a[hreflang="he"]').click();await p.waitForLoadState('load');
  out(P(p.url())==='/pricing'&&(await p.getAttribute('html','lang'))==='he','en-US + click עברית on /en/pricing',P(p.url())+' lang='+await p.getAttribute('html','lang'));
  await p.reload();out(P(p.url())==='/pricing','  … after reload',P(p.url()));
  await p.goto(BASE+'/');out(P(p.url())==='/','  … then / stays Hebrew',P(p.url()));
  const ck=(await c.cookies()).find(x=>x.name==='lang_pref');out(ck?.value==='he','  … lang_pref',ck?.value);await c.close()}
 // 2. he-IL: Hebrew; English in the footer → /en/..., and it stays English
 {const c=await ctx('he-IL,he;q=0.9,en-US;q=0.8');const p=await c.newPage();
  await p.goto(BASE+'/pricing');out(P(p.url())==='/pricing','he-IL first visit /pricing',P(p.url())+` · prompt=${await prompt(p)}`);
  await p.locator('nav.lang a[hreflang="en"]').click();await p.waitForLoadState('load');
  out(P(p.url())==='/en/pricing','he-IL + click English',P(p.url()));
  await p.reload();out(P(p.url())==='/en/pricing','  … after reload',P(p.url()));
  await p.goto(BASE+'/');out(P(p.url())==='/en','  … then / opens English (lang_pref=en)',P(p.url()));
  await p.locator('nav.lang a[hreflang="he"]').click();await p.waitForLoadState('load');
  out(P(p.url())==='/','  … and עברית brings Hebrew back, no loop',P(p.url()));await c.close()}
 // 3. he-IL straight to /en/...: English, no redirect
 {const c=await ctx('he-IL');const p=await c.newPage();await p.goto(BASE+'/en/faq');out(P(p.url())==='/en/faq','he-IL straight to /en/faq',P(p.url()));await c.close()}
 // 4. en-US, query kept
 {const c=await ctx('en-US');const p=await c.newPage();await p.goto(BASE+'/pricing?x=1');out(P(p.url())==='/en/pricing?x=1','en-US /pricing?x=1',P(p.url()));await c.close()}
 console.log('FAILS',fails);await b.close()})()
