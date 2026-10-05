/* MST QMS — 시작 · 테마 · 자동 채번 · 정합성 자동 검사 · KPI 자동 집계 */
(function () {
  'use strict';
  var Q = window.Q, E = Q.esc;

  Q.applyTheme = function () {
    var t = Q.S.settings.theme || 'auto';
    var dark = t === 'dark' || (t === 'auto' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  };
  Q.updateUserBadge = function () { var el = Q.$('#userBadge'); if (el) el.textContent = '👤 ' + (Q.S.settings.user || '-') + (Q.perm ? ' · ' + Q.perm() : ''); };

  /* ───────── 문서번호 자동 부여 ─────────
     수준 + ISO 조항 → 접두사(MP/MD/MI) + 장번호 2자리 + 일련번호 2자리 */
  Q.suggestCode = function (level, clause) {
    var pre = { '프로세스': 'MP', '절차서': 'MD', '지침서': 'MI', '매뉴얼': 'QM', '외부문서': 'EX' }[level] || 'MD';
    if (pre === 'QM') return 'QM-0' + ((Q.S.docs || []).filter(function (d) { return /^QM-/.test(d.code); }).length + 1);
    var ch = String(parseInt(String(clause || '8').split('.')[0], 10) || 8).padStart(2, '0');
    var used = (Q.S.docs || []).map(function (d) { return d.code; }).filter(function (c) { return c.indexOf(pre + '-' + ch) === 0; }).map(function (c) { return parseInt(c.slice(5, 7), 10) || 0; });
    var n = used.length ? Math.max.apply(null, used) + 1 : 1;
    return pre + '-' + ch + String(n).padStart(2, '0');
  };
  /* 문서 등록 모달에 "번호 자동" 버튼 추가 */
  var origDocNew = Q.actions.docNew;
  Q.on('docNew', function (el, e) {
    origDocNew(el, e);
    var m = Q.$('#modal'); if (!m) return;
    var code = m.querySelector('[name="code"]');
    var b = document.createElement('button'); b.className = 'btn sm'; b.textContent = '번호 자동'; b.style.marginTop = '4px';
    b.addEventListener('click', function (ev) {
      ev.preventDefault();
      code.value = Q.suggestCode(m.querySelector('[name="level"]').value, m.querySelector('[name="clausesTxt"]').value);
    });
    code.parentNode.appendChild(b);
  });

  /* ───────── 정합성 자동 검사 ───────── */
  Q.consistency = function () {
    var out = [], docs = Q.S.docs || [], forms = window.SEED.forms || [], codes = {};
    docs.forEach(function (d) { codes[d.code] = (codes[d.code] || 0) + 1; });
    Object.keys(codes).forEach(function (c) { if (codes[c] > 1) out.push(['오류', '문서번호 중복', c]); });
    var fc = {}; forms.forEach(function (f) { fc[f.code] = (fc[f.code] || 0) + 1; });
    Object.keys(fc).forEach(function (c) { if (fc[c] > 1) out.push(['오류', '양식번호 중복', c]); });
    forms.forEach(function (f) {
      if (!Q.doc(f.doc)) out.push(['오류', '양식의 상위 문서 없음', f.code + ' → ' + f.doc]);
      else if (f.code.indexOf(f.doc + '-') !== 0) out.push(['경고', '양식번호가 상위 문서번호와 다름', f.code + ' (상위 ' + f.doc + ')']);
    });
    docs.forEach(function (d) {
      if (d.process && !Q.proc(d.process)) out.push(['오류', '없는 프로세스 참조', d.code + ' → ' + d.process]);
      if (!d.clauses || !d.clauses.length) out.push(['경고', 'ISO 조항 미지정', d.code]);
      (d.steps || []).forEach(function (s) { (s.forms || []).forEach(function (x) { if (!Q.form(x)) out.push(['경고', '절차 단계가 없는 양식 참조', d.code + ' → ' + x]); }); });
      if (d.status === '개정중') out.push(['경고', '개정 진행 중', d.code]);
    });
    (window.SEED.processes || []).forEach(function (p) {
      if (!docs.some(function (d) { return d.process === p.code && d.level !== '프로세스'; })) out.push(['경고', '하위 절차서·지침서 없는 프로세스', p.code]);
      if (!(Q.S.kpis || []).some(function (k) { return k.proc === p.code; })) out.push(['경고', 'KPI 없는 프로세스 (4.4.1 c)', p.code + ' ' + p.name]);
    });
    (Q.S.kpis || []).forEach(function (k) { if (Q.num(k.target) === null) out.push(['경고', 'KPI 목표값 미설정', k.name]); });
    (window.SEED.clauses || []).forEach(function (c) { if (!docs.some(function (d) { return (d.clauses || []).some(function (x) { return x === c.no || x.indexOf(c.no + '.') === 0 || c.no.indexOf(x + '.') === 0; }); })) out.push(['경고', 'ISO 조항에 연결된 문서 없음', c.no + ' ' + c.title]); });
    return out;
  };
  /* 정합성 화면에 자동 검사 결과 덧붙이기 */
  var origDocs = Q.routes.docs.fn;
  Q.routes.docs.fn = function (args) {
    var h = origDocs(args);
    if (args[0] !== '_issues') return h;
    var r = Q.consistency(), err = r.filter(function (x) { return x[0] === '오류'; }).length;
    return h + '<div class="card"><h2>자동 정합성 검사 <span class="chip ' + (err ? 'crit' : 'good') + '">오류 ' + err + '</span> <span class="chip warn">경고 ' + (r.length - err) + '</span><span class="sp"></span><button class="btn sm" data-act="rerun">다시 검사</button></h2>' +
      '<p class="small muted">문서번호·양식번호 중복, 끊어진 참조, 조항·KPI 누락을 데이터에서 직접 검사합니다. 문서를 고치면 결과가 바로 바뀝니다.</p>' +
      Q.table([{ label: '구분', html: function (x) { return Q.chip(x[0], x[0] === '오류' ? 'crit' : 'warn'); } }, { label: '항목', k: 1 }, { label: '대상', k: 2 }], r, { empty: '이상 없음 — 문서 체계가 정렬되어 있습니다' }) + '</div>';
  };
  Q.on('rerun', function () { Q.rerender(); Q.toast('다시 검사했습니다'); });

  /* ───────── KPI 자동 집계 (기록 → 실적) ───────── */
  var AUTO = {
    'OBJ-1': function (m) { return (Q.S.registers.custIssues || []).filter(function (r) { return (r.date || '').slice(0, 7) === m && (r.kind || '').indexOf('클레임') === 0; }).length; },
    'OBJ-3': function (m) { return (Q.S.registers.rework || []).filter(function (r) { return (r.date || '').slice(0, 7) === m; }).length; },
    'OBJ-4': function () { var s = (Q.S.registers.suppliers || []).filter(function (x) { return x.grade; }); return s.length ? Math.round(100 * s.filter(function (x) { return x.grade === 'A' || x.grade === 'B'; }).length / s.length) : null; }
  };
  var origKpi = Q.routes.kpi.fn;
  Q.routes.kpi.fn = function (args) {
    return origKpi(args).replace('<button class="btn pri" data-act="kpiNew">', '<button class="btn" data-act="kpiAuto">기록에서 자동 집계</button><button class="btn pri" data-act="kpiNew">');
  };
  Q.on('kpiAuto', function () {
    var m = Q.prevMonth(), cur = Q.month(), n = 0;
    Object.keys(AUTO).forEach(function (id) {
      [m, cur].forEach(function (mm) {
        var v = AUTO[id](mm); if (v === null) return;
        Q.S.kpiActuals[id] = Q.S.kpiActuals[id] || {}; Q.S.kpiActuals[id][mm] = v; n++;
      });
    });
    Q.save(); Q.rerender(); Q.toast('고객 클레임·리워크·협력사 등급에서 ' + m + ', ' + cur + ' 실적을 집계했습니다');
  });

  /* ───────── 시작 ───────── */
  function boot() {
    Q.finalizeSeed();
    Q.load();
    Q.applyTheme();
    if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener && matchMedia('(prefers-color-scheme: dark)').addEventListener('change', Q.applyTheme);
    Q.buildNav();
    Q.updateUserBadge();
    window.addEventListener('hashchange', Q.render);
    Q.render();
    if (Q.needLogin()) Q.showLogin();
  }
  Q.on('menu', function () { Q.$('.side').classList.toggle('open'); });
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); Q.$('#topSearch').focus(); }
    if (e.key === 'Escape') Q.closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.target.id === 'topSearch' && e.key === 'Enter') { Q.go('search/' + encodeURIComponent(e.target.value.trim())); e.target.value = ''; e.target.blur(); }
  });
  window.addEventListener('beforeunload', function () { Q.save(true); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
