/* 기준 데이터(seed-*.js)를 앱과 같은 방식으로 병합해 JSON으로 내보냄 → make_revised.py 입력 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.join(__dirname, '..', 'app');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const ctx = { window: {} }; vm.createContext(ctx);
[...html.matchAll(/<script src="(data\/[^"]+)"/g)].forEach(m => vm.runInContext(fs.readFileSync(path.join(dir, m[1]), 'utf8'), ctx));
const S = ctx.window.SEED;
const det = S.formDetails || {};
S.forms = S.formList.concat((S.extraForms || []).map(x => Object.assign({ extra: true }, x))).map(f => Object.assign({}, f, det[f.code] || {}));
(S.documents || []).forEach(d => { const x = (S.docDetails || {})[d.code]; if (x) Object.keys(x).forEach(k => { const v = x[k]; if (v !== undefined && v !== '' && !(Array.isArray(v) && !v.length)) d[k] = v; }); });
S.kpis = (S.objectiveKpis || []).concat(S.kpis || []);
const out = process.argv[2] || path.join(__dirname, '..', 'docs', 'seed.json');
fs.writeFileSync(out, JSON.stringify(S, null, 1));
console.log('docs', S.documents.length, 'forms', S.forms.length, 'kpis', S.kpis.length, '→', out);
