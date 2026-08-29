import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1300, height: 520 }, deviceScaleFactor: 2 });
await p.goto('file://' + process.cwd().replace(/\/g,'/') + '/icons-preview.html');
await p.waitForTimeout(400);
await p.screenshot({ path: 'icons-preview.png' });
await b.close();
console.log('ok');
