// node mail-steps.cjs <base>   (VERCEL_BYPASS for a preview) — 053: in the email mockup the step number sits at the start of the row, only the time at the end
const { chromium } = require('playwright');
const P=process.argv[2];const K=process.env.VERCEL_BYPASS;
(async()=>{const b=await chromium.launch({channel:'chrome'});let f=0;
for(const lang of ['he','en'])for(const w of [1440,390]){const c=await b.newContext({viewport:{width:w,height:900},extraHTTPHeaders:K?{'x-vercel-protection-bypass':K}:{}});
await c.addCookies([{name:'lang_pref',value:lang,url:P}]);const p=await c.newPage();await p.goto(P+(lang==='en'?'/en':'/'),{waitUntil:'networkidle'});
const r=await p.evaluate(()=>[...document.querySelectorAll('#mail .ml-s')].map(s=>{const row=s.getBoundingClientRect(),n=s.querySelector('.n').getBoundingClientRect(),b=s.querySelector('b').getBoundingClientRect(),t=s.querySelector('span:last-child').getBoundingClientRect();const rtl=getComputedStyle(s).direction==='rtl';
return rtl?[Math.round(row.right-n.right),Math.round(n.left-b.right),Math.round(t.left-row.left)]:[Math.round(n.left-row.left),Math.round(b.left-n.right),Math.round(row.right-t.right)]}));
const bad=r.some(([a,g,e])=>a>16||g>13||e>16);if(bad)f++;console.log(lang,w,JSON.stringify(r),bad?'FAIL':'ok');await c.close()}
await b.close();console.log('FAILS',f)})();
