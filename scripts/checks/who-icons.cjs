// node who-icons.cjs <base> <lang> <width> [shots-dir] — 048: watch "who it's for" 30s; every popped icon must sit on a free spot
const {chromium}=require('playwright');
const [BASE,LANG,W,OUT]=[process.argv[2],process.argv[3],+process.argv[4],process.argv[5]];
(async()=>{const b=await chromium.launch({channel:'chrome'});const host=new URL(BASE).hostname;
const c=await b.newContext({viewport:{width:W,height:W>800?900:844},deviceScaleFactor:1});
await c.addCookies([{name:'ux_consent',value:'1%7C2026-11-08T00%3A00%3A00.000Z%7Ca0%7Cm0',domain:host,path:'/'},{name:'lang_pref',value:LANG,domain:host,path:'/'}]);
const p=await c.newPage();await p.goto(BASE+(LANG==='en'?'/en':'/'),{waitUntil:'networkidle'});
await p.evaluate(()=>{const s=document.querySelector('.who2');s.scrollIntoView({block:'center'})});
const pops=[];let bad=[];let shots=0;const seen=new Set();
for(let t=0;t<150;t++){ // 30s, every 200ms
 const r=await p.evaluate(()=>{const box=document.querySelector('.who2');const s=box.getBoundingClientRect();
  // layout rects (no transforms): an element's box from offsets, relative to the section
  const R=(e)=>({l:e.offsetLeft,t:e.offsetTop,r:e.offsetLeft+e.offsetWidth,b:e.offsetTop+e.offsetHeight});
  const vis=(e)=>getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden';
  const orbs=[...box.querySelectorAll('.orb')].filter(vis);
  const text=[];box.querySelectorAll('.who2-c .who2-star, .who2-c h2, .who2-c p, .who2-c .no > *').forEach(el=>{const rg=document.createRange();rg.selectNodeContents(el);const rs=el.classList.contains('who2-star')?[el.getBoundingClientRect()]:[...rg.getClientRects()];for(const q of rs)if(q.width&&q.height)text.push({l:q.left-s.left,r:q.right-s.left,t:q.top-s.top,b:q.bottom-s.top})});
  const hit=(a,b)=>a.l<b.r&&b.l<a.r&&a.t<b.b&&b.t<a.b;
  const news=orbs.filter(o=>o.classList.contains('new')&&!o.classList.contains('out'));
  const out=[];for(const o of news){const a=R(o);const lab=o.querySelector('em').textContent;
   const V=(e)=>{const q=e.getBoundingClientRect();return {l:q.left-s.left,t:q.top-s.top,r:q.right-s.left,b:q.bottom-s.top}};const av=V(o);
   for(const x of orbs){if(x===o||x.classList.contains('out'))continue;if(hit(a,R(x)))out.push(lab+' x '+(x.querySelector('em')?.textContent));else if(hit(av,V(x)))out.push('seen: '+lab+' x '+(x.querySelector('em')?.textContent))}
   for(const q of text)if(hit(a,q))out.push(lab+' x text');
   if(a.l<0||a.t<0||a.r>box.clientWidth||a.b>box.clientHeight)out.push(lab+' outside')}
  return {news:news.map(o=>({lab:o.querySelector('em').textContent,...R(o)})),out}});
 for(const n of r.news){const k=n.lab+'@'+n.l+','+n.t;if(!seen.has(k)){seen.add(k);pops.push(n);
   if(OUT&&shots<3&&pops.length>=2){await p.waitForTimeout(800);await p.locator('.who2').screenshot({path:`${OUT}/who-${LANG}-${W}-${++shots}.png`})}}}
 if(r.out.length)bad.push(...r.out);
 await p.waitForTimeout(200)}
const rep=[];for(let i=1;i<pops.length;i++){const a=pops[i-1],q=pops[i];if(Math.abs(a.l-q.l)<40&&Math.abs(a.t-q.t)<40)rep.push(q.lab)}
console.log(`${LANG} ${W}: pops=${pops.length} spots=${pops.map(x=>x.l+','+x.t).join(' ')} overlaps=${[...new Set(bad)].join('; ')||0} sameSpotTwice=${rep.join(',')||0}`);
await b.close()})()
