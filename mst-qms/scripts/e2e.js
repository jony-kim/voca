/* 브라우저 회귀 테스트 (Playwright). 사용: node scripts/e2e.js [app 폴더] [스크린샷 폴더]
   ※ 브라우저 저장소를 쓰므로 반복 실행 시 이전 데이터가 남을 수 있음 — 새 임시 복사본으로 실행 권장 */
const { chromium } = require('playwright');
const path = require('path'); const dir = process.argv[2] || path.join(__dirname, '..', 'app'), shots = process.argv[3];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERR ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });
  await p.goto('file://' + dir + '/index.html');
  await p.waitForTimeout(800);
  if (shots) await p.screenshot({ path: shots + '/login.png' });
  await p.click('.lg-user >> nth=1'); await p.fill('#lgPin', '1'); await p.click('.lg-go'); await p.waitForTimeout(600);
  console.log('logged in', await p.evaluate(() => [Q.S.settings.user, Q.perm(), !!document.querySelector('#login')]));
  const routes = ['dashboard','search/구매','company/policy','company/profile','company/org','company/stake','company/issues','pmap','pmap/MP-0802','docs','docs/MD-0808','docs/_issues','clauses','clauses/7.1.5','forms','forms/MD-0804-004','forms/MD-0808-001','reg','reg/instruments','reg/suppliers','reg/risks','ncr','change4m','kpi','audit','custeval','review','training/plan','training/matrix','training/courses','training/quiz/C01','training/quals','spc','msa','guide/audit','guide/rules','guide/tools','guide/project','settings','link','link/12','docs/_revlog','clauses/8.6','search/교정'];
  for (const r of routes) {
    await p.evaluate(r => { location.hash = '#/' + r; }, r);
    await p.waitForTimeout(150);
    const t = await p.evaluate(() => (document.querySelector('#page').innerText.match(/화면 오류[\s\S]{0,300}/) || [''])[0]);
    if (t) errs.push('ROUTE ' + r + ': ' + t);
    if (shots && ['dashboard','pmap','docs/MD-0808','custeval','spc','msa','kpi','forms','link','link/12','search/교정','forms/MD-0804-004'].includes(r)) await p.screenshot({ path: shots + '/' + r.replace(/\//g,'_') + '.png', fullPage: false });
  }
  /* 워크플로 */
  await p.evaluate(() => { location.hash = '#/ncr'; });
  await p.waitForTimeout(100);
  await p.click('[data-act="ncrNew"]');
  await p.fill('#modal [name="title"]', '척 외경 치수 불량');
  await p.click('#modal [data-mbtn="1"]');
  await p.waitForTimeout(200);
  console.log('ncr route', await p.evaluate(() => location.hash), await p.evaluate(() => Q.S.ncrs.length));
  await p.evaluate(() => { location.hash = '#/audit'; }); await p.waitForTimeout(100);
  await p.click('[data-act="auditNew"]'); await p.fill('#modal [name="auditors"]', '최용화'); await p.click('#modal [data-mbtn="1"]'); await p.waitForTimeout(200);
  await p.click('[data-act="audJ"][data-j="H"]'); await p.waitForTimeout(100);
  await p.click('[data-act="findNew"]'); await p.waitForTimeout(100);
  await p.fill('#modal [name="text"]', '교정 만료 계측기 사용'); await p.click('#modal [data-mbtn="1"]'); await p.waitForTimeout(200);
  await p.click('[data-act="findToNcr"]'); await p.waitForTimeout(100); await p.click('#modal [data-mbtn="1"]'); await p.waitForTimeout(600);
  console.log('finding linked', await p.evaluate(() => JSON.stringify(Q.S.audits[0].findings.map(f => [f.no, f.ncrNo, f.status]))));
  await p.evaluate(() => { location.hash = '#/audit/' + Q.S.audits[0].id + '/check'; }); await p.waitForTimeout(200);
  await p.click('[data-act="audToSsq"]'); await p.waitForTimeout(300);
  console.log('audit->ssq', await p.evaluate(() => [location.hash, Object.keys(Q.S.registers.custEvals[0].r).length]));
  await p.evaluate(() => { location.hash = '#/review'; }); await p.waitForTimeout(100);
  await p.click('[data-act="reviewNew"]'); await p.waitForTimeout(200);
  console.log('review c4', await p.evaluate(() => Q.S.reviews[0].inputs.c4));
  await p.evaluate(() => { location.hash = '#/custeval'; }); await p.waitForTimeout(100);
  await p.click('[data-act="ceNew"]'); await p.waitForTimeout(200);
  await p.selectOption('select[data-chg="ceSet"] >> nth=0', { index: 3 }); await p.waitForTimeout(200);
  console.log('ce', await p.evaluate(() => JSON.stringify(Q.S.registers.custEvals[0].r)));
  if (shots) await p.screenshot({ path: shots + '/custeval_detail.png' });
  await p.evaluate(() => { location.hash = '#/forms/MD-0804-004'; }); await p.waitForTimeout(100);
  const has = await p.$('[data-act="recNew"]');
  if (has) { await has.click(); await p.waitForTimeout(100); await p.fill('#modal [name="title"]', 'CNC-01'); await p.click('#modal [data-mbtn="1"]'); await p.waitForTimeout(200); console.log('record', await p.evaluate(() => location.hash)); if (shots) await p.screenshot({ path: shots + '/record.png' }); }
  await p.evaluate(() => { location.hash = '#/kpi'; }); await p.waitForTimeout(200);
  console.log('provisional', await p.evaluate(() => Q.S.kpis.filter(k => k.provisional).length));
  await p.fill('input[data-chg="kpiTarget"][data-k="K03"]', '35'); await p.press('input[data-chg="kpiTarget"][data-k="K03"]', 'Tab'); await p.waitForTimeout(200);
  console.log('K03', await p.evaluate(() => { const k = Q.S.kpis.find(k => k.id === 'K03'); return [k.target, k.provisional, (k.targetLog||[]).length]; }));
  if (shots) await p.screenshot({ path: shots + '/kpi2.png' });
  await p.evaluate(() => { location.hash = '#/docs/_issues'; }); await p.waitForTimeout(200);
  if (shots) await p.screenshot({ path: shots + '/issues.png' });
  console.log('consistency errors', await p.evaluate(() => Q.consistency().filter(x => x[0] === '오류').map(x => x.join(' '))));
  await p.evaluate(() => { location.hash = '#/dashboard'; }); await p.waitForTimeout(200);
  if (shots) await p.screenshot({ path: shots + '/dashboard2.png' });
  await p.reload(); await p.waitForTimeout(300);
  console.log('persist', await p.evaluate(() => [Q.S.ncrs.length, Q.S.audits.length, Q.S.reviews.length]));
  console.log(errs.length ? errs.join('\n') : 'NO ERRORS');
  await b.close();
})();
