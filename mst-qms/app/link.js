/* MST QMS — ISO 9001 ↔ 고객사 평가(세메스 SSQ) ↔ 문서·기록 ↔ 내부심사 연동
   SSQ 항목 하나에 대해
     · 기준 수립 : 연결된 MST 표준문서(절차서·지침서)가 등록·유효한가
     · 이행 실적 : 연결된 양식·대장에 실제 기록이 있는가 (건수, 최근일, 최근 3개월 중 기록 월 수)
     · 내부심사  : 같은 질문의 내부심사 체크시트 판정(L/M/H)
     · 자체점검  : 최근 SSQ 자체점검 점수
   를 한 줄로 묶어 보여 주고, 내부심사 판정을 SSQ 자체점검으로 넘길 수 있게 한다. */
(function () {
  'use strict';
  var Q = window.Q, E = Q.esc;

  function L() { return window.SEED.ssqLink || {}; }
  function CE() { return window.SEED.custEval; }
  function items() { var ce = CE(); return ce ? [].concat.apply([], ce.sections.map(function (s) { return s.items.map(function (i) { return { s: s, i: i }; }); })) : []; }
  function itemByNo(no) { return items().filter(function (x) { return String(x.i.no) === String(no); })[0]; }

  /* 증거 출처 하나 → {label, n, dates[]} */
  Q.evidOf = function (src) {
    var S = Q.S, ds = [], label = src;
    function push(list, f) { (list || []).forEach(function (r) { var d = f ? f(r) : (r.date || r.updated || r.created); if (d) ds.push(String(d).slice(0, 10)); }); }
    if (src.indexOf('form:') === 0) src = src.slice(5);
    if (/^(MD|MI|MP|QM)-/.test(src)) {
      var f = Q.form(src); label = src + ' ' + (f ? f.title : '');
      push(S.records[src]); if (f && f.register) push(S.registers[f.register]);
      if (f && f.special === 'audit') push(S.audits); if (f && f.special === 'review') push(S.reviews); if (f && f.special === 'training') push(S.trainings);
      if (f && f.special === 'kpi') Object.keys(S.kpiActuals).forEach(function (k) { Object.keys(S.kpiActuals[k]).forEach(function (m) { ds.push(m + '-01'); }); });
      if (f && f.special === 'msa') push(S.registers.msaResults); if (f && f.special === 'spc') push(S.registers.spcSets);
    } else if (Q.REG[src]) { label = Q.REG[src].title; push(S.registers[src]); }
    else if (src === 'ncr') { label = '부적합·시정조치'; push(S.ncrs); }
    else if (src === 'audit') { label = '내부심사'; push(S.audits); }
    else if (src === 'review') { label = '경영검토'; push(S.reviews); }
    else if (src === 'training') { label = '교육훈련 실적'; push((S.trainings || []).filter(function (t) { return t.status === '완료'; })); }
    else if (src === 'kpi') { label = 'KPI 실적'; Object.keys(S.kpiActuals).forEach(function (k) { Object.keys(S.kpiActuals[k]).forEach(function (m) { ds.push(m + '-01'); }); }); }
    else if (src === 'msa') { label = 'MSA 결과'; push(S.registers.msaResults); }
    else if (src === 'spc') { label = 'SPC 분석'; push(S.registers.spcSets); }
    else if (src === 'custeval') { label = '고객사 평가 자체점검'; push(S.registers.custEvals); }
    ds.sort();
    return { src: src, label: label, n: ds.length, last: ds[ds.length - 1] || '', dates: ds };
  };
  function last3Months() { var out = [], d = new Date(); d.setDate(1); for (var i = 0; i < 3; i++) { out.push(d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')); d.setMonth(d.getMonth() - 1); } return out; }

  /* SSQ 항목 연동 상태 */
  Q.ssqStatus = function (no) {
    var lk = L()[String(no)] || { clauses: [], docs: [], forms: [], evid: [], ck: {} };
    var docs = (lk.docs || []).map(function (c) { return Q.doc(c); }).filter(Boolean);
    var std = docs.length ? (docs.every(function (d) { return !d.status || d.status === '유효'; }) ? 'ok' : 'part') : 'none';
    var ev = (lk.forms || []).concat(lk.xforms || [], lk.evid || []).map(Q.evidOf);
    var n = ev.reduce(function (s, e) { return s + e.n; }, 0);
    var all = [].concat.apply([], ev.map(function (e) { return e.dates; })).sort();
    var ms = last3Months(), months = ms.filter(function (m) { return all.some(function (d) { return d.slice(0, 7) === m; }); }).length;
    var rec = !ev.length ? 'none' : n === 0 ? 'none' : months >= 3 ? 'ok' : 'part';
    /* 내부심사 최근 판정 */
    var aud = null;
    (Q.S.audits || []).some(function (a) {
      var ids = (lk.ck || {})[a.checklist] || []; if (!ids.length) return false;
      var js = ids.map(function (id) { return ((a.results || {})[id] || {}).j; }).filter(Boolean);
      if (!js.length) return false;
      aud = { a: a, j: js.indexOf('H') >= 0 ? 'H' : js.indexOf('M') >= 0 ? 'M' : js.indexOf('L') >= 0 ? 'L' : 'NA' }; return true;
    });
    var ce = (Q.S.registers.custEvals || [])[0], sc = ce ? ((ce.r || {})[no] || {}) : {};
    return { lk: lk, docs: docs, std: std, ev: ev, n: n, last: all[all.length - 1] || '', months: months, rec: rec, aud: aud, score: sc.na ? 'NA' : sc.s, ce: ce };
  };
  var STD_CHIP = { ok: ['문서 있음', 'good'], part: ['제정·개정 중', 'warn'], none: ['문서 없음', 'crit'] };
  var REC_CHIP = { ok: ['3개월 연속', 'good'], part: ['기록 부족', 'warn'], none: ['기록 없음', 'crit'] };
  var J_CHIP = { L: ['양호 L', 'good'], M: ['보완 M', 'warn'], H: ['미흡 H', 'crit'], NA: ['해당없음', ''] };

  /* ───────── 연동표 화면 ───────── */
  Q.route('link', function (a) { return a[0] ? 'SSQ ' + a[0] + ' · ISO 연동 상세' : 'ISO ↔ 고객평가 연동'; }, function (args) {
    var ce = CE(); if (!ce) return '<div class="empty">고객사 평가 시트 데이터 없음</div>';
    if (args[0]) return linkDetail(args[0]);
    var st = Q.S.settings.linkFilter || {}, rows = items().map(function (x) { x.st = Q.ssqStatus(x.i.no); return x; });
    var scoreable = rows.filter(function (x) { return !x.i.knockout; });
    var stdOk = scoreable.filter(function (x) { return x.st.std === 'ok'; }).length, recOk = scoreable.filter(function (x) { return x.st.rec === 'ok'; }).length;
    var pts = scoreable.reduce(function (s, x) { return s + (Q.num(x.i.points) || 0); }, 0);
    var stdPts = scoreable.filter(function (x) { return x.st.std === 'ok'; }).reduce(function (s, x) { return s + (Q.num(x.i.points) || 0); }, 0);
    var bothPts = scoreable.filter(function (x) { return x.st.std === 'ok' && x.st.rec !== 'none'; }).reduce(function (s, x) { return s + (Q.num(x.i.points) || 0); }, 0);
    var gaps = rows.filter(function (x) { return x.st.lk.gap || x.st.lk.gapFix; });
    var list = rows.filter(function (x) {
      if (st.sec && x.s.name !== st.sec) return false;
      if (st.only === 'std' && x.st.std === 'ok') return false;
      if (st.only === 'rec' && x.st.rec === 'ok') return false;
      if (st.only === 'gap' && !x.st.lk.gap) return false;
      return Q.match({ n: 'SSQ ' + x.i.no, q: x.i.q, c: x.st.lk.clauses, d: x.st.lk.docs, f: x.st.lk.forms, x: x.st.lk.xforms }, st.q);
    });
    var h = '<div class="card"><h2>' + E(ce.customer) + ' SSQ ↔ ISO 9001 ↔ MST 문서·기록 연동표</h2><p class="small muted">고객 평가 항목마다 근거 조항, MST 표준문서(기준 수립), 필요한 기록(이행 실적), 같은 질문의 내부심사 판정, 최근 자체점검 점수를 한 줄에 묶었습니다. 기록 건수와 최근 작성일은 이 프로그램에 실제로 입력된 데이터로 자동 계산합니다. 고객 심사에서는 문서만 있고 기록이 없으면 감점되므로, 기준 수립과 이행 실적을 따로 봅니다.</p></div>' +
      '<div class="tiles"><div class="tile ' + (stdOk === scoreable.length ? 'good' : 'warn') + '"><div class="k">기준 수립 (문서)</div><div class="v">' + stdOk + '/' + scoreable.length + '</div><div class="s">배점 ' + stdPts + '/' + pts + '점</div></div>' +
      '<div class="tile ' + (recOk === scoreable.length ? 'good' : recOk ? 'warn' : 'crit') + '"><div class="k">이행 실적 (3개월 연속 기록)</div><div class="v">' + recOk + '/' + scoreable.length + '</div><div class="s">기록이 하나라도 있는 항목 배점 ' + bothPts + '점</div></div>' +
      '<div class="tile ' + (gaps.length ? 'warn' : 'good') + '" data-go="link"><div class="k">MST 체계 공백 → 보완</div><div class="v">' + gaps.length + '</div><div class="s">신규 문서·양식 ' + gaps.filter(function (x) { return x.st.lk.gapFix; }).length + '건 제정 예정</div></div>' +
      '<div class="tile"><div class="k">최근 자체점검</div><div class="v">' + (rows[0] && rows[0].st.ce ? (function () { var c = rows[0].st.ce, g = 0; rows.forEach(function (x) { var v = Q.num(((c.r || {})[x.i.no] || {}).s); if (v !== null && !x.i.knockout) g += v; }); return Q.fmt(g); })() : '-') + '</div><div class="s">' + (rows[0] && rows[0].st.ce ? E(rows[0].st.ce.date) : '자체점검 없음') + '</div></div></div>';
    h += '<div class="card"><div class="filters"><input data-inp="lnkQ" placeholder="항목·조항·문서번호" value="' + E(st.q || '') + '"><select data-chg="lnkSec"><option value="">전체 분류</option>' + ce.sections.map(function (s) { return '<option' + (st.sec === s.name ? ' selected' : '') + '>' + E(s.name) + '</option>'; }).join('') + '</select>' +
      '<select data-chg="lnkOnly"><option value="">전체 항목</option><option value="std"' + (st.only === 'std' ? ' selected' : '') + '>문서 미흡만</option><option value="rec"' + (st.only === 'rec' ? ' selected' : '') + '>기록 미흡만</option><option value="gap"' + (st.only === 'gap' ? ' selected' : '') + '>체계 공백만</option></select>' +
      '<span class="sp"></span><button class="btn" data-act="lnkCsv">연동표 CSV</button></div>' +
      Q.table([
        { label: 'SSQ', html: function (x) { return '<b class="mono">' + E(x.i.no) + '</b>' + (x.i.knockout ? ' ' + Q.chip('과락', 'crit') : ''); } },
        { label: '평가 항목', html: function (x) { return '<div style="max-width:340px">' + E(x.i.q) + '</div><div class="small muted">' + E(x.s.name) + ' · 배점 ' + E(x.i.points) + '</div>'; } },
        { label: 'ISO 9001', html: function (x) { return (x.st.lk.clauses || []).map(function (c) { return '<a class="chip acc" href="#/clauses/' + E(c) + '">' + E(c) + '</a>'; }).join(' '); } },
        { label: '기준 수립 (문서)', html: function (x) { return Q.chip(STD_CHIP[x.st.std][0], STD_CHIP[x.st.std][1]) + '<div class="small">' + x.st.docs.map(function (d) { return '<a href="#/docs/' + E(d.code) + '">' + E(d.code) + '</a>'; }).join(' ') + '</div>'; } },
        { label: '이행 실적 (기록)', html: function (x) { return Q.chip(REC_CHIP[x.st.rec][0], REC_CHIP[x.st.rec][1]) + '<div class="small muted">' + x.st.n + '건' + (x.st.last ? ' · 최근 ' + E(x.st.last) : '') + ' · 3개월 중 ' + x.st.months + '개월</div>'; } },
        { label: '내부심사', html: function (x) { return x.st.aud ? Q.chip(J_CHIP[x.st.aud.j][0], J_CHIP[x.st.aud.j][1]) + '<div class="small muted">' + E(x.st.aud.a.date) + '</div>' : ((x.st.lk.ck || {})['CK-ISO'] || []).length ? '<span class="small muted">미심사</span>' : '<span class="small muted">문항 없음</span>'; } },
        { label: '자체점검', html: function (x) { var s = x.st.score; if (s === undefined || s === null) return '<span class="muted">-</span>'; if (s === 'NA') return Q.chip('NA'); if (s === 'ko') return Q.chip('과락', 'crit'); if (s === 'ok') return Q.chip('적합', 'good'); return '<b class="num" style="color:' + (Q.num(s) < Q.num(x.i.points) ? 'var(--crit)' : 'var(--good)') + '">' + E(s) + '</b>/' + E(x.i.points); } }
      ], list, { rowAttr: function (x) { return ' class="click" data-go="link/' + E(x.i.no) + '"'; } }) + '</div>';
    if (gaps.length) h += '<div class="card"><h2>MST 체계 공백 보완 — 신규 제정 문서·양식</h2><p class="small muted">원본 체계에 없던 세메스 SSQ 요구 항목입니다. 프로그램에 "제정 예정" 문서·양식으로 넣어 두었으니 검토 후 문서 체계에서 개정 승인하면 "문서 있음"으로 바뀝니다.</p>' + Q.table([{ label: 'SSQ', html: function (x) { return '<a href="#/link/' + E(x.i.no) + '">' + E(x.i.no) + '</a>'; } }, { label: '항목', k: function (x) { return x.i.q; } }, { label: '보완 내용', html: function (x) { return x.st.lk.gapFix ? Q.chip('제정 예정', 'warn') + ' ' + E(x.st.lk.gapFix) : Q.chip('미보완', 'crit') + ' ' + E(x.st.lk.gap); } }], gaps) + '</div>';
    return h;
  });
  Q.on('lnkQ', function (el) { Q.S.settings.linkFilter = Q.S.settings.linkFilter || {}; Q.S.settings.linkFilter.q = el.value; clearTimeout(Q._lq); Q._lq = setTimeout(function () { Q.rerender(); var i = Q.$('[data-inp="lnkQ"]'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 300); });
  Q.on('lnkSec', function (el) { Q.S.settings.linkFilter = Q.S.settings.linkFilter || {}; Q.S.settings.linkFilter.sec = el.value; Q.rerender(); });
  Q.on('lnkOnly', function (el) { Q.S.settings.linkFilter = Q.S.settings.linkFilter || {}; Q.S.settings.linkFilter.only = el.value; Q.rerender(); });
  Q.on('lnkCsv', function () {
    var ce = CE();
    Q.csv(ce.customer + '_SSQ_ISO_연동표_' + Q.today() + '.csv', ['SSQ', '분류', '평가항목', '배점', 'ISO 조항', '표준문서', '기록(양식·대장)', '기준수립', '이행실적', '기록건수', '최근기록', '내부심사', '자체점검', '공백'],
      items().map(function (x) { var s = Q.ssqStatus(x.i.no); return [x.i.no, x.s.name, x.i.q, x.i.points, (s.lk.clauses || []).join(' '), (s.lk.docs || []).join(' '), (s.lk.forms || []).concat(s.lk.xforms || [], s.lk.evid || []).join(' '), STD_CHIP[s.std][0], REC_CHIP[s.rec][0], s.n, s.last, s.aud ? s.aud.j : '', s.score === undefined || s.score === null ? '' : s.score, s.lk.gap || '']; }));
  });

  function linkDetail(no) {
    var x = itemByNo(no); if (!x) return '<div class="empty">항목 없음</div>';
    var i = x.i, st = Q.ssqStatus(no), lk = st.lk;
    var h = '<div class="row no-print" style="margin-bottom:12px"><a href="#/link">← 연동표</a><span class="sp"></span>' + (st.ce ? '<a class="btn" href="#/custeval/' + E(st.ce.id) + '">자체점검에서 채점</a>' : '') + '</div>';
    h += '<div class="card"><h2>SSQ ' + E(i.no) + ' · ' + E(x.s.name) + '<span class="sp"></span>' + Q.chip('배점 ' + i.points, 'acc') + (i.knockout ? ' ' + Q.chip('과락 항목', 'crit') : '') + '</h2><p><b>' + E(i.q) + '</b></p>' +
      (Array.isArray(i.criteria) ? '<h3>평가 기준</h3>' + Q.table([{ label: '점수', k: 'score', n: 1 }, { label: '기준', k: 'text' }], i.criteria) : (i.criteria ? '<h3>평가 기준</h3><p class="pre small">' + E(i.criteria) + '</p>' : '')) +
      (i.evidence ? '<p class="small"><b>고객이 확인하는 증빙</b>: ' + E(i.evidence) + '</p>' : '') + (lk.point ? '<p class="small"><b>점검 포인트</b>: ' + E(lk.point) + '</p>' : '') +
      (lk.gap ? '<p class="small" style="color:var(--crit)">⚠ ' + E(lk.gap) + '</p>' : '') + (lk.gapFix ? '<p class="small" style="color:var(--warn)">＋ 보완: ' + E(lk.gapFix) + '</p>' : '') + '</div>';
    h += '<div class="grid g2"><div class="card"><h2>ISO 9001 근거 조항</h2>' + Q.table([{ label: '조항', html: function (c) { return '<a href="#/clauses/' + E(c.no) + '"><b class="mono">' + E(c.no) + '</b></a>'; } }, { label: '요구사항', html: function (c) { return '<b>' + E(c.title) + '</b><div class="small muted">' + E(c.summary) + '</div>'; } }],
      (lk.clauses || []).map(Q.clause).filter(Boolean), { empty: '연결 조항 없음' }) + '</div>' +
      '<div class="card"><h2>기준 수립 — MST 표준문서 ' + Q.chip(STD_CHIP[st.std][0], STD_CHIP[st.std][1]) + '</h2>' + Q.table([{ label: '번호', html: function (d) { return '<a href="#/docs/' + E(d.code) + '">' + E(d.code) + '</a>'; } }, { label: '문서명', k: 'title' }, { label: 'Rev', k: 'rev' }, { label: '상태', html: function (d) { return Q.statusChip(d.status || '유효'); } }], st.docs, { empty: '연결된 MST 문서 없음' }) + '</div></div>';
    h += '<div class="card"><h2>이행 실적 — 기록 ' + Q.chip(REC_CHIP[st.rec][0], REC_CHIP[st.rec][1]) + '<span class="sp"></span><span class="small muted">최근 3개월 중 ' + st.months + '개월 기록</span></h2>' +
      Q.table([{ label: '기록', html: function (e) { var f = Q.form(e.src); return f ? '<a href="#/forms/' + E(f.code) + '">' + E(e.label) + '</a>' : Q.REG[e.src] ? '<a href="#/reg/' + E(e.src) + '">' + E(e.label) + '</a>' : E(e.label); } },
        { label: '건수', n: 1, html: function (e) { return e.n ? '<b>' + e.n + '</b>' : '<span style="color:var(--crit)">0</span>'; } }, { label: '최근 작성', k: 'last' },
        { label: '', html: function (e) { var f = Q.form(e.src); return f && !f.register && !f.special ? '<button class="btn sm" data-go="forms/' + E(f.code) + '">작성</button>' : ''; } }], st.ev, { empty: '연결된 기록 없음' }) + '</div>';
    /* 내부심사 이력 */
    var hist = [];
    (Q.S.audits || []).forEach(function (a) { ((lk.ck || {})[a.checklist] || []).forEach(function (id) { var r = (a.results || {})[id]; if (r && r.j) hist.push({ date: a.date, title: a.title, ck: a.checklist + ' #' + id, j: r.j, note: r.note || '' }); }); });
    var ckq = [];
    Object.keys(lk.ck || {}).forEach(function (cid) { var ck = (Q.S.checklists || []).filter(function (c) { return c.id === cid; })[0]; if (!ck) return; ck.sections.forEach(function (s) { s.items.forEach(function (it) { if ((lk.ck[cid] || []).indexOf(it.no) >= 0) ckq.push({ ck: cid, no: it.no, q: it.q }); }); }); });
    h += '<div class="grid g2"><div class="card"><h2>연동된 내부심사 문항</h2>' + Q.table([{ label: '체크시트', k: 'ck' }, { label: '#', k: 'no' }, { label: '질문', k: 'q' }], ckq, { empty: '내부심사 체크시트에 같은 문항 없음 — 다음 심사 체크시트에 추가 권장' }) + '</div>' +
      '<div class="card"><h2>내부심사 판정 이력</h2>' + Q.table([{ label: '심사일', k: 'date' }, { label: '심사', k: 'title' }, { label: '판정', html: function (r) { return Q.chip(J_CHIP[r.j][0], J_CHIP[r.j][1]); } }, { label: '메모', k: 'note' }], hist, { empty: '판정 기록 없음' }) + '</div></div>';
    var sh = (Q.S.registers.custEvals || []).map(function (c) { var r = (c.r || {})[no] || {}; return { date: c.date, by: c.by, s: r.na ? 'NA' : (r.s === undefined || r.s === null ? '-' : r.s), note: r.note || '' }; });
    h += '<div class="card"><h2>SSQ 자체점검 이력</h2>' + Q.table([{ label: '점검일', k: 'date' }, { label: '점검자', k: 'by' }, { label: '점수', k: 's' }, { label: '현황·보완 계획', k: 'note' }], sh, { empty: '자체점검 없음' }) + '</div>';
    return h;
  }

  /* ───────── 내부심사 → SSQ 자체점검 반영 ───────── */
  Q.auditToSsq = function (a) {
    var ce = CE(); if (!ce) return;
    var prev = (Q.S.registers.custEvals || [])[0];
    var x = { id: Q.uid('ce'), date: a.date || Q.today(), by: Q.me(), from: a.title, r: prev ? Q.clone(prev.r) : {} };
    var n = 0;
    items().forEach(function (it) {
      var ids = ((L()[String(it.i.no)] || {}).ck || {})[a.checklist] || []; if (!ids.length || it.i.knockout) return;
      var js = ids.map(function (id) { return ((a.results || {})[id] || {}).j; }).filter(Boolean); if (!js.length) return;
      var p = Q.num(it.i.points) || 0, j = js.indexOf('H') >= 0 ? 'H' : js.indexOf('M') >= 0 ? 'M' : js[0];
      var r = x.r[it.i.no] = x.r[it.i.no] || {};
      if (j === 'NA') { r.na = true; r.s = null; }
      else {
        var target = j === 'L' ? p : j === 'M' ? p / 2 : 0;
        /* 평가 기준 단계가 있으면 가장 가까운 단계 점수로 맞춤 */
        if (Array.isArray(it.i.criteria) && it.i.criteria.length) target = it.i.criteria.map(function (c) { return Q.num(c.score); }).filter(function (v) { return v !== null; }).reduce(function (b, v) { return Math.abs(v - target) < Math.abs(b - target) ? v : b; }, p);
        r.na = false; r.s = target;
      }
      var notes = ids.map(function (id) { return ((a.results || {})[id] || {}).note; }).filter(Boolean);
      r.note = '[내부심사 ' + (a.date || '') + ' ' + j + '] ' + notes.join(' / ');
      n++;
    });
    (Q.S.registers.custEvals = Q.S.registers.custEvals || []).unshift(x); Q.save();
    Q.go('custeval/' + x.id); Q.toast('내부심사 판정 ' + n + '개 항목을 SSQ 자체점검에 반영했습니다 (L=만점, M=절반, H=0)');
  };
  Q.on('audToSsq', function (el) { Q.auditToSsq(Q.S.audits.filter(function (a) { return a.id === el.getAttribute('data-id'); })[0]); });

  /* SSQ 항목 → 연결된 체크시트 문항 역참조 */
  Q.ssqForCk = function (ckId, itemNo) {
    var out = [], lk = L();
    Object.keys(lk).forEach(function (k) { if (((lk[k].ck || {})[ckId] || []).indexOf(itemNo) >= 0 || ((lk[k].ck || {})[ckId] || []).indexOf(String(itemNo)) >= 0) out.push(k); });
    return out;
  };
  Q.ssqForClause = function (no) {
    return items().filter(function (x) { return ((L()[String(x.i.no)] || {}).clauses || []).some(function (c) { return c === no || c.indexOf(no + '.') === 0 || no.indexOf(c + '.') === 0; }); });
  };
})();
