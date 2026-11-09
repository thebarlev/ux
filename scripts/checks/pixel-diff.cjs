// node pixel-diff.cjs <dir> <tagA> <tagB> — 052: compares <tagA>-*.png with <tagB>-*.png pixel by pixel (in Chrome)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [DIR, A, B] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ channel: 'chrome' }); const pg = await b.newPage();
  for (const f of fs.readdirSync(DIR).filter(f => f.startsWith(A + '-') && f.endsWith('.png')).sort()) {
    const g = B + f.slice(A.length); if (!fs.existsSync(path.join(DIR, g))) { console.log(f, 'no', g); continue }
    const [x, y] = [f, g].map(n => 'data:image/png;base64,' + fs.readFileSync(path.join(DIR, n)).toString('base64'));
    const r = await pg.evaluate(async ([x, y]) => {
      const load = s => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = s });
      const [i, j] = [await load(x), await load(y)]; if (i.width !== j.width || i.height !== j.height) return { size: [i.width, i.height, j.width, j.height] };
      const px = im => { const c = new OffscreenCanvas(im.width, im.height), t = c.getContext('2d'); t.drawImage(im, 0, 0); return t.getImageData(0, 0, im.width, im.height).data };
      const [p, q] = [px(i), px(j)]; let n = 0, box = [1e9, 1e9, -1, -1];
      for (let k = 0; k < p.length; k += 4) if (Math.abs(p[k] - q[k]) + Math.abs(p[k + 1] - q[k + 1]) + Math.abs(p[k + 2] - q[k + 2]) > 24) {
        n++; const X = (k / 4) % i.width, Y = Math.floor(k / 4 / i.width); box = [Math.min(box[0], X), Math.min(box[1], Y), Math.max(box[2], X), Math.max(box[3], Y)] }
      return { diff: n, pct: +(100 * n / (i.width * i.height)).toFixed(3), box: n ? box : null };
    }, [x, y]);
    console.log(f.slice(A.length + 1), JSON.stringify(r));
  }
  await b.close();
})();
