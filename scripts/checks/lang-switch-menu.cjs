// node lang-switch-menu.cjs <preview> <out> — 051 state B (4 languages, preview): menu on desktop, sheet on mobile, keyboard
const {chromium}=require('playwright');const [BASE,OUT]=process.argv.slice(2);const BY=process.env.VERCEL_BYPASS;
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';let fails=0;const ok=(c,m)=>{if(!c)fails++;console.log((c?'OK   ':'FAIL ')+m)};
(async()=>{const b=await chromium.launch({channel:'chrome'});const host=new URL(BASE).hostname;
for(const lang of ['he','en'])for(const w of [1440,390]){
 const c=await b.newContext({userAgent:UA,viewport:{width:w,height:w>800?900:844},deviceScaleFactor:2,extraHTTPHeaders:{'x-vercel-protection-bypass':BY,'x-vercel-set-bypass-cookie':'true'}});
 await c.addCookies([{name:'ux_consent',value:'1%7C2026-11-09T00%3A00%3A00.000Z%7Ca0%7Cm0',domain:host,path:'/'},{name:'lang_pref',value:lang,domain:host,path:'/'}]);
 const p=await c.newPage();await p.goto(BASE+(lang==='en'?'/en/pricing':'/pricing'),{waitUntil:'networkidle'});
 const btn=p.locator('#hdr button.ls');ok(await btn.count()===1,`${lang} ${w}: state B button`);
 ok((await btn.getAttribute('aria-haspopup'))==='menu'&&(await btn.getAttribute('aria-expanded'))==='false',`${lang} ${w}: aria-haspopup, aria-expanded=false`);
 await btn.click();await p.waitForTimeout(400);
 ok((await btn.getAttribute('aria-expanded'))==='true',`${lang} ${w}: opens`);
 const items=await p.$$eval('#hdr .ls-i',as=>as.map(a=>({t:a.textContent,lang:a.getAttribute('lang'),hl:a.getAttribute('hreflang'),cur:a.hasAttribute('aria-current'),href:a.getAttribute('href')})));
 ok(items.length===4&&items.every(i=>i.lang&&i.hl)&&items.filter(i=>i.cur).length===1,`${lang} ${w}: 4 items with lang+hreflang, one current: ${items.map(i=>i.t+(i.cur?'✓':'')+'→'+i.href).join(' · ')}`);
 const foc=await p.evaluate(()=>document.activeElement.getAttribute('lang'));ok(foc===lang,`${lang} ${w}: focus on the current language (${foc})`);
 const geo=await p.evaluate(()=>{const m=document.querySelector('#hdr .ls-m').getBoundingClientRect();return {top:Math.round(m.top),bottom:Math.round(m.bottom),h:innerHeight,w:Math.round(m.width)}});
 if(w>1060)ok(geo.top<120,`${lang} ${w}: menu under the button (top ${geo.top})`);else ok(geo.bottom===geo.h&&geo.w===w,`${lang} ${w}: sheet at the bottom, full width (${JSON.stringify(geo)})`);
 await p.screenshot({path:`${OUT}/stateB-${lang}-${w}.png`,clip:w>800?{x:0,y:0,width:w,height:360}:undefined});
 await p.keyboard.press('ArrowDown');const f2=await p.evaluate(()=>document.activeElement.getAttribute('lang'));ok(f2&&f2!==foc,`${lang} ${w}: ArrowDown moves (${foc}→${f2})`);
 await p.keyboard.press('Escape');await p.waitForTimeout(200);
 ok((await btn.getAttribute('aria-expanded'))==='false'&&await p.evaluate(()=>document.activeElement.matches('#hdr button.ls')),`${lang} ${w}: Esc closes, focus back on the button`);
 if(w<=1060){await btn.click();await p.waitForTimeout(300);await p.mouse.click(w/2,60);await p.waitForTimeout(200);ok((await btn.getAttribute('aria-expanded'))==='false',`${lang} ${w}: backdrop closes`)}
 await c.close()}
console.log('FAILS',fails);await b.close()})()
