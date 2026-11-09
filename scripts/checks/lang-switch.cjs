// node lang-switch.cjs <base> [shots-dir] [pages] — 051: the language switch in the header (state A or B), no horizontal scroll, the main button on one line
const {chromium}=require('playwright');const BASE=process.argv[2];const OUT=process.argv[3];const PAGES=(process.argv[4]||'/pricing').split(',');
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';let fails=0;
(async()=>{const b=await chromium.launch({channel:'chrome'});const host=new URL(BASE).hostname;
for(const lang of ['he','en'])for(const w of [1440,390,360,320])for(const pg of PAGES){
 const c=await b.newContext({userAgent:UA,viewport:{width:w,height:800},deviceScaleFactor:2});
 await c.addCookies([{name:'ux_consent',value:'1%7C2026-11-09T00%3A00%3A00.000Z%7Ca0%7Cm0',domain:host,path:'/'},{name:'lang_pref',value:lang,domain:host,path:'/'}]);
 const p=await c.newPage();const url=BASE+(lang==='en'?'/en'+(pg==='/'?'':pg):pg);await p.goto(url,{waitUntil:'networkidle'});
 const r=await p.evaluate(()=>{const ls=document.querySelector('#hdr .ls');const bp=document.querySelector('#hdr .btn-p');const vis=(e)=>e&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>0;
  const rg=document.createRange();rg.selectNodeContents(bp);const lines=new Set([...rg.getClientRects()].map(q=>Math.round(q.top))).size;
  const lr=ls.getBoundingClientRect(),br=bp.getBoundingClientRect();const lab=[...ls.querySelectorAll('.ls-l,.ls-s')].filter(e=>getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>2).map(e=>e.textContent).join('|');
  return {sw:document.documentElement.scrollWidth,iw:innerWidth,lines,ls:vis(ls),lab,name:ls.getAttribute('aria-label'),overlap:lr.left<br.right&&br.left<lr.right&&lr.top<br.bottom&&br.top<lr.bottom,inView:lr.left>=0&&lr.right<=innerWidth,href:ls.getAttribute('href'),mode:ls.tagName}});
 const ok=r.sw<=r.iw&&r.lines===1&&r.ls&&!r.overlap&&r.inView;if(!ok)fails++;
 console.log(`${ok?'OK  ':'FAIL'} ${lang} ${w} ${pg}: ${r.mode==='A'?'A':'B'} shows "${r.lab||'(globe)'}" name="${r.name}" href=${r.href} scroll=${r.sw}/${r.iw} cta-lines=${r.lines}`);
 if(OUT&&pg===PAGES[0]){await p.locator('#hdr').screenshot({path:`${OUT}/header-${lang}-${w}.png`})}
 await c.close()}
console.log('FAILS',fails);await b.close()})()
