/* 정정본 원본 파일 목록 → app/data/originals.js (문서·양식 번호 → 상대 경로)
   문서는 파일명이 번호로 시작, 양식은 seed-forms.js 의 srcTitle(Drive 원본 제목)로 연결 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..'), dir = path.join(root, '원본_정정본');
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) { if (f !== '_logs') walk(p); } else if (/\.(xlsx|pptx|docx|pdf)$/i.test(f)) files.push(p); } })(dir);
const ctx = { window: {} }; vm.createContext(ctx);
const html = fs.readFileSync(path.join(root, 'app', 'index.html'), 'utf8');
[...html.matchAll(/<script src="(data\/seed-[^"]+)"/g)].forEach(m => vm.runInContext(fs.readFileSync(path.join(root, 'app', m[1]), 'utf8'), ctx));
const S = ctx.window.SEED, map = {};
const rel = p => '../' + path.relative(root, p).split(path.sep).join('/');
const base = p => path.basename(p).replace(/\.(xlsx|pptx|docx|pdf)$/i, '').normalize('NFC');
for (const p of files) { const m = base(p).match(/^((?:QM|MP|MD|MI)-\d{2,4}(?:-\d{3})?)[_\s]/); if (m && !map[m[1]]) map[m[1]] = rel(p); }
const det = S.formDetails || {};
const forms = (S.formList || []).concat(S.extraForms || []);
for (const f of forms) {
  const t = ((det[f.code] || {}).srcTitle || f.srcTitle || '').normalize('NFC');
  if (!map[f.code] && t) { const hit = files.find(p => base(p) === t); if (hit) map[f.code] = rel(hit); }
}
if (!map['QM-01']) { const m = files.find(p => base(p).startsWith('QM-01')); if (m) map['QM-01'] = rel(m); }
const missing = forms.map(f => f.code).filter(c => !map[c]).concat(S.documents.map(d => d.code).filter(c => !map[c]));
fs.writeFileSync(path.join(root, 'app', 'data', 'originals.js'), '/* 자동 생성: scripts/build-originals.js */\nwindow.ORIGINALS = ' + JSON.stringify(map, null, 1) + ';\n');
console.log('mapped', Object.keys(map).length, 'of', forms.length + S.documents.length, '| missing:', missing.join(' '));
