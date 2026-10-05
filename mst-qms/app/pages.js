/* MST QMS — 화면 */
(function () {
  'use strict';
  var Q = window.Q, E = Q.esc;

  /* ───────── 메뉴 ───────── */
  Q.NAV = [
    ['홈'],
    ['dashboard', '대시보드'],
    ['search', '통합 검색'],
    ['체계'],
    ['company', '방침·목표·조직'],
    ['pmap', '프로세스 맵'],
    ['docs', '문서 체계'],
    ['clauses', 'ISO 9001 조항 맵'],
    ['운영 기록'],
    ['forms', '양식·기록'],
    ['reg', '관리대장'],
    ['ncr', '부적합·시정조치', 'ncr'],
    ['change4m', '4M 변경관리', '4m'],
    ['성과 평가'],
    ['kpi', 'KPI 성과지표', 'kpi'],
    ['audit', '내부심사', 'audit'],
    ['custeval', '고객사 평가 대응'],
    ['review', '경영검토'],
    ['역량·도구'],
    ['training', '교육훈련', 'train'],
    ['spc', 'SPC 관리도'],
    ['msa', 'MSA (Gage R&R)'],
    ['guide', '심사·실무 가이드'],
    ['시스템'],
    ['settings', '설정·백업']
  ];

  Q.buildNav = function () {
    Q.$('#nav').innerHTML = Q.NAV.map(function (n) {
      if (n.length === 1) return '<div class="grp">' + E(n[0]) + '</div>';
      return '<a href="#/' + n[0] + '" data-r="' + n[0] + '">' + E(n[1]) + (n[2] ? '<span class="cnt" data-badge="' + n[2] + '" hidden></span>' : '') + '</a>';
    }).join('');
  };

  /* 알림 계산 (대시보드·배지 공용) */
  Q.alerts = function () {
    var a = { ncr: [], audit: [], train: [], kpi: [], calib: [], docs: [], m4: [], reg: [] };
    (Q.S.ncrs || []).forEach(function (n) {
      if (n.status !== '종결' && n.due && Q.daysUntil(n.due) < 0) a.ncr.push(n);
    });
    (Q.S.audits || []).forEach(function (au) {
      (au.findings || []).forEach(function (f) { if (f.status !== '종결' && f.due && Q.daysUntil(f.due) < 0) a.audit.push({ f: f, a: au }); });
    });
    (Q.S.trainings || []).forEach(function (t) { if (t.status === '계획' && t.date && Q.daysUntil(t.date) < 0) a.train.push(t); });
    var m = Q.prevMonth();
    (Q.S.kpis || []).forEach(function (k) {
      var v = (Q.S.kpiActuals[k.id] || {})[m];
      if (v === undefined || v === null || v === '') return;
      if (!Q.kpiOk(k, v)) a.kpi.push(k);
    });
    (Q.REG_LIST || []).forEach(function (rd) {
      if (!rd.due) return;
      (Q.S.registers[rd.key] || []).forEach(function (r) {
        var d = Q.daysUntil(r[rd.due]);
        if (r[rd.due] && d !== null && d <= 14 && !(rd.doneIf && rd.doneIf(r))) a.reg.push({ reg: rd, row: r, d: d });
      });
    });
    (Q.S.registers.change4m || []).forEach(function (c) { if (c.status !== '완료' && c.due && Q.daysUntil(c.due) < 0) a.m4.push(c); });
    (Q.S.docs || []).forEach(function (d) { if (d.status === '개정중') a.docs.push(d); });
    return a;
  };
  Q.refreshBadges = function () {
    var a = Q.alerts();
    var map = { ncr: a.ncr.length, audit: a.audit.length, train: a.train.length, kpi: a.kpi.length, '4m': a.m4.length };
    Q.$$('[data-badge]').forEach(function (el) { var n = map[el.getAttribute('data-badge')]; el.hidden = !n; el.textContent = n || ''; });
  };
  Q.prevMonth = function () { var d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - 1); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); };
  Q.kpiTarget = function (k) { return Q.num(k.target) === null ? '<span class="chip warn">목표 미설정</span>' : (k.dir === 'down' ? '≤' : '≥') + E(k.target) + E(k.unit || ''); };
  Q.kpiOk = function (k, v) {
    v = Q.num(v); if (v === null) return true;
    var t = Q.num(k.target); if (t === null) return true;
    return k.dir === 'down' ? v <= t : v >= t;
  };

  /* ───────── 대시보드 ───────── */
  Q.route('dashboard', '대시보드', function () {
    var S = Q.S, a = Q.alerts();
    var openNcr = (S.ncrs || []).filter(function (n) { return n.status !== '종결'; });
    var findings = [].concat.apply([], (S.audits || []).map(function (x) { return (x.findings || []).map(function (f) { return { f: f, a: x, status: f.status }; }); }));
    var openF = findings.filter(function (f) { return f.status !== '종결'; });
    var m = Q.prevMonth();
    var kIn = (S.kpis || []).filter(function (k) { var v = (S.kpiActuals[k.id] || {})[m]; return v !== undefined && v !== null && v !== ''; });
    var kOk = kIn.filter(function (k) { return Q.kpiOk(k, S.kpiActuals[k.id][m]); });
    var cov = Q.coverage();
    var thisYear = String(new Date().getFullYear());
    var trainDone = (S.trainings || []).filter(function (t) { return t.status === '완료' && (t.date || '').slice(0, 4) === thisYear; });
    var recCount = Object.keys(S.records || {}).reduce(function (s, k) { return s + S.records[k].length; }, 0);

    var h = '<div class="tiles">' +
      tile('미결 부적합·시정조치', openNcr.length, (a.ncr.length ? a.ncr.length + '건 기한 초과' : '기한 초과 없음'), a.ncr.length ? 'crit' : (openNcr.length ? 'warn' : 'good'), 'ncr') +
      tile('내부심사 미결 지적', openF.length, a.audit.length ? a.audit.length + '건 기한 초과' : '총 ' + findings.length + '건 중', a.audit.length ? 'crit' : '', 'audit') +
      tile(m + ' KPI 달성', kIn.length ? kOk.length + '/' + kIn.length : '-', kIn.length ? '미달 ' + (kIn.length - kOk.length) + '건' : '실적 미입력', kIn.length && kOk.length < kIn.length ? 'warn' : (kIn.length ? 'good' : ''), 'kpi') +
      tile('ISO 조항 증거 충족', cov.pct + '%', cov.ok + '/' + cov.total + ' 조항', cov.pct >= 90 ? 'good' : (cov.pct >= 60 ? 'warn' : 'crit'), 'clauses') +
      tile(thisYear + ' 교육 실시', trainDone.length, '계획 ' + (S.trainings || []).filter(function (t) { return t.status === '계획'; }).length + '건', '', 'training') +
      tile('작성된 기록', recCount + Object.keys(S.registers).reduce(function (s, k) { return s + (Array.isArray(S.registers[k]) ? S.registers[k].length : 0); }, 0), '양식 기록 + 관리대장', '', 'forms') +
      '</div>';

    /* 할 일 */
    var todo = [];
    a.ncr.forEach(function (n) { todo.push(['crit', '부적합 기한초과', n.no + ' ' + n.title, 'ncr/' + n.id, n.due]); });
    a.audit.forEach(function (x) { todo.push(['crit', '심사 지적 기한초과', (x.f.no || '') + ' ' + (x.f.text || '').slice(0, 40), 'audit/' + x.a.id + '/find', x.f.due]); });
    a.reg.forEach(function (x) { todo.push([x.d < 0 ? 'crit' : 'warn', x.reg.dueLabel || x.reg.title, (x.row[x.reg.titleKey] || '') + ' — ' + x.reg.title, 'reg/' + x.reg.key, x.row[x.reg.due]]); });
    a.m4.forEach(function (c) { todo.push(['crit', '4M 변경 미완료', c.item + ' ' + (c.content || ''), 'change4m', c.due]); });
    a.kpi.forEach(function (k) { todo.push(['warn', 'KPI 미달', k.name + ' (' + m + ')', 'kpi', '']); });
    a.train.forEach(function (t) { todo.push(['warn', '교육 미실시', t.title, 'training', t.date]); });
    a.docs.forEach(function (d) { todo.push(['warn', '문서 개정중', d.code + ' ' + d.title, 'docs/' + d.code, '']); });
    if (!S.settings.lastBackup || Q.daysUntil(S.settings.lastBackup) < -7) todo.push(['warn', '백업', '마지막 백업 ' + (S.settings.lastBackup || '없음') + ' — 주 1회 백업 권장', 'settings', '']);
    var nextReview = (S.reviews || [])[0];
    if (!nextReview || Q.daysUntil(nextReview.date) < -365) todo.push(['warn', '경영검토', '최근 1년 내 경영검토 기록 없음 (9.3)', 'review', '']);
    var lastAudit = (S.audits || []).filter(function (x) { return x.status === '완료'; })[0];
    if (!lastAudit) todo.push(['warn', '내부심사', '완료된 내부심사 기록 없음 (9.2)', 'audit', '']);

    h += '<div class="grid g2"><div class="card"><h2>지금 처리할 일 <span class="chip">' + todo.length + '</span></h2>' +
      (todo.length ? Q.table([
        { label: '구분', html: function (t) { return Q.chip(t[1], t[0]); } },
        { label: '내용', html: function (t) { return '<a href="#/' + E(t[3]) + '">' + E(t[2]) + '</a>'; } },
        { label: '기한', html: function (t) { return t[4] ? Q.dueChip(t[4]) : ''; } }
      ], todo, { max: 420 }) : '<div class="empty">처리할 일이 없습니다 👍</div>') + '</div>';

    /* 품질목표 */
    h += '<div class="card"><h2>품질목표 현황 <span class="sp"></span><a class="small" href="#/kpi">KPI 입력 →</a></h2>' +
      Q.table([
        { label: '목표', k: 'name' },
        { label: '목표값', html: function (k) { return k.targetText ? E(k.targetText) : Q.kpiTarget(k); } },
        { label: '최근 실적', html: function (k) { var l = Q.kpiLast(k); return l ? '<span class="num">' + E(Q.fmt(l.v)) + '</span> <span class="small muted">' + E(l.m) + '</span>' : '<span class="muted">-</span>'; } },
        { label: '판정', html: function (k) { var l = Q.kpiLast(k); return l ? Q.statusChip(Q.kpiOk(k, l.v) ? '달성' : '미달') : ''; } }
      ], (S.kpis || []).filter(function (k) { return k.objective; })) + '</div></div>';

    /* 프로세스별 기록 활동 */
    var procs = window.SEED.processes || [];
    h += '<div class="grid g2"><div class="card"><h2>프로세스별 기록 건수</h2>' + Q.barChart(procs.map(function (p) {
      return { label: p.name, v: Q.procRecordCount(p.code), color: 'var(--' + p.type.toLowerCase() + ')' };
    }), { left: 140 }) + '</div>';
    h += '<div class="card"><h2>PDCA 조항 증거 충족률</h2>' + Q.barChart(cov.byChapter.map(function (c) {
      return { label: c.ch + '장 ' + c.title, v: c.pct, txt: c.pct + '% (' + c.ok + '/' + c.total + ')', color: c.pct >= 90 ? 'var(--good)' : c.pct >= 60 ? 'var(--warn)' : 'var(--crit)' };
    }), { max: 100, left: 120 }) + '<p class="small muted">조항별로 연결된 기록(양식·대장·심사·교육 등)이 1건 이상 있으면 충족으로 봅니다. 상세는 ISO 9001 조항 맵에서 확인.</p></div></div>';
    return h;

    function tile(k, v, s, cls, go) { return '<div class="tile ' + (cls || '') + '" data-go="' + go + '"><div class="k">' + E(k) + '</div><div class="v">' + E(v) + '</div><div class="s">' + E(s) + '</div></div>'; }
  });

  Q.kpiLast = function (k) {
    var a = Q.S.kpiActuals[k.id] || {};
    var ms = Object.keys(a).filter(function (m) { return a[m] !== '' && a[m] !== null && a[m] !== undefined; }).sort();
    if (!ms.length) return null;
    var m = ms[ms.length - 1]; return { m: m, v: a[m] };
  };

  /* 프로세스별 기록 수: 해당 프로세스 문서에 딸린 양식/대장 기록 */
  Q.procRecordCount = function (pcode) {
    var n = 0;
    (window.SEED.forms || []).forEach(function (f) {
      var d = Q.doc(f.doc); if (!d || d.process !== pcode) return;
      n += (Q.S.records[f.code] || []).length;
      if (f.register) n += (Q.S.registers[f.register] || []).length;
    });
    if (pcode === 'MP-0805') n += (Q.S.ncrs || []).length;
    if (pcode === 'MP-0401') n += (Q.S.audits || []).length + (Q.S.reviews || []).length;
    if (pcode === 'MP-0703') n += (Q.S.trainings || []).length;
    return n;
  };

  /* ───────── 조항 증거 충족도 ───────── */
  Q.clauseEvidence = function (no) {
    var S = Q.S, ev = [];
    var cl = Q.clause(no) || {};
    (cl.evidence || []).forEach(function (src) {
      var cnt = 0, label = src;
      if (src.indexOf('form:') === 0) { var fc = src.slice(5), f = Q.form(fc); cnt = (S.records[fc] || []).length + (f && f.register ? (S.registers[f.register] || []).length : 0); label = fc + ' ' + (f ? f.title : ''); }
      else if (src.indexOf('reg:') === 0) { var rk = src.slice(4), rd = Q.REG[rk]; cnt = (S.registers[rk] || []).length; label = rd ? rd.title : rk; }
      else if (src === 'kpi') { cnt = Object.keys(S.kpiActuals).reduce(function (s, k) { return s + Object.keys(S.kpiActuals[k]).length; }, 0); label = 'KPI 실적'; }
      else if (src === 'ncr') { cnt = (S.ncrs || []).length; label = '부적합·시정조치'; }
      else if (src === 'audit') { cnt = (S.audits || []).filter(function (a) { return a.status === '완료'; }).length; label = '내부심사(완료)'; }
      else if (src === 'review') { cnt = (S.reviews || []).length; label = '경영검토'; }
      else if (src === 'training') { cnt = (S.trainings || []).filter(function (t) { return t.status === '완료'; }).length; label = '교육 실시 기록'; }
      else if (src === 'company') { cnt = S.company && S.company.policy ? 1 : 0; label = '방침·목표·범위'; }
      else if (src === 'docs') { cnt = (S.docs || []).length; label = '문서 등록대장'; }
      else if (src === 'msa') { cnt = (S.registers.msaResults || []).length; label = 'MSA 결과'; }
      else if (src === 'spc') { cnt = (S.registers.spcSets || []).length; label = 'SPC 분석'; }
      else if (src === 'custeval') { cnt = (S.registers.custEvals || []).length; label = '고객사 평가 자체점검'; }
      ev.push({ src: src, label: label, n: cnt });
    });
    return ev;
  };
  Q.coverage = function () {
    var cls = window.SEED.clauses || [], ok = 0, chapters = {};
    cls.forEach(function (c) {
      var ev = Q.clauseEvidence(c.no), good = ev.some(function (e) { return e.n > 0; });
      if (good) ok++;
      var ch = c.no.split('.')[0];
      chapters[ch] = chapters[ch] || { ch: ch, title: ({ 4: '조직상황', 5: '리더십', 6: '기획', 7: '지원', 8: '운용', 9: '성과평가', 10: '개선' })[ch], ok: 0, total: 0 };
      chapters[ch].total++; if (good) chapters[ch].ok++;
    });
    var by = Object.keys(chapters).sort(function (a, b) { return a - b; }).map(function (k) { var c = chapters[k]; c.pct = Math.round(100 * c.ok / c.total); return c; });
    return { ok: ok, total: cls.length, pct: cls.length ? Math.round(100 * ok / cls.length) : 0, byChapter: by };
  };

  /* ───────── 통합 검색 ───────── */
  Q.route('search', '통합 검색', function (args) {
    var q = args[0] || '';
    var h = '<div class="card"><div class="row"><input id="sq" style="flex:1;padding:9px 12px;border:1px solid var(--line-2);border-radius:6px" placeholder="문서번호, 양식명, 부적합 내용, 설비명…" value="' + E(q) + '"><button class="btn pri" data-act="doSearch">검색</button></div></div>';
    if (!q) return h + '<div class="empty">문서·양식·기록·대장 전체를 검색합니다</div>';
    var res = [];
    (Q.S.docs || []).forEach(function (d) { if (Q.match(d, q)) res.push(['문서', d.code + ' ' + d.title, 'docs/' + d.code]); });
    (window.SEED.forms || []).forEach(function (f) { if (Q.match({ c: f.code, t: f.title }, q)) res.push(['양식', f.code + ' ' + f.title, 'forms/' + f.code]); });
    Object.keys(Q.S.records).forEach(function (fc) { (Q.S.records[fc] || []).forEach(function (r) { if (Q.match(r, q)) res.push(['기록', fc + ' · ' + (r.title || r.date || ''), 'forms/' + fc + '/' + r.id]); }); });
    (Q.S.ncrs || []).forEach(function (n) { if (Q.match(n, q)) res.push(['부적합', n.no + ' ' + n.title, 'ncr/' + n.id]); });
    (Q.REG_LIST || []).forEach(function (rd) { (Q.S.registers[rd.key] || []).forEach(function (r) { if (Q.match(r, q)) res.push([rd.title, r[rd.titleKey] || '', 'reg/' + rd.key]); }); });
    (Q.S.audits || []).forEach(function (a) { if (Q.match(a, q)) res.push(['내부심사', a.title, 'audit/' + a.id]); });
    (Q.S.trainings || []).forEach(function (t) { if (Q.match(t, q)) res.push(['교육', t.title, 'training']); });
    (window.SEED.clauses || []).forEach(function (c) { if (Q.match(c, q)) res.push(['ISO 조항', c.no + ' ' + c.title, 'clauses/' + c.no]); });
    return h + '<div class="card"><h2>검색 결과 <span class="chip">' + res.length + '</span></h2>' +
      Q.table([{ label: '구분', html: function (r) { return Q.chip(r[0], 'acc'); } }, { label: '항목', html: function (r) { return '<a href="#/' + E(r[2]) + '">' + E(r[1]) + '</a>'; } }], res, { empty: '"' + q + '" 검색 결과 없음' }) + '</div>';
  });
  Q.routes.search.after = function () { var el = Q.$('#sq'); if (el) { el.focus(); el.addEventListener('keydown', function (e) { if (e.key === 'Enter') Q.actions.doSearch(); }); } };
  Q.on('doSearch', function () { Q.go('search/' + encodeURIComponent(Q.$('#sq').value.trim())); });

  /* ───────── 방침·목표·조직 ───────── */
  Q.route('company', '방침·목표·조직', function (args) {
    var c = Q.S.company, tab = args[0] || 'policy';
    var h = Q.tabs('co', [['policy', '품질방침·목표', 'company/policy'], ['profile', '회사·적용범위', 'company/profile'], ['org', '조직·업무분장', 'company/org'], ['stake', '이해관계자', 'company/stake'], ['issues', '내외부 이슈·SWOT', 'company/issues']], tab);
    if (tab === 'policy') {
      h += '<div class="card"><h2>품질방침 <span class="sp"></span><span class="small muted">' + E(c.policy.date || '') + ' · ' + E(c.ceo) + '</span><button class="btn sm no-print" data-act="editPolicy">수정</button></h2>' +
        '<p>' + E(c.policy.intro) + '</p><ol>' + c.policy.items.map(function (i) { return '<li><b>' + E(i.t) + '</b> — ' + E(i.d) + '</li>'; }).join('') + '</ol>' +
        '<p class="muted">' + E(c.policy.closing || '') + '</p></div>';
      h += '<div class="card"><h2>품질목표 (6.2) <span class="sp"></span><a class="small" href="#/kpi">실적 관리 →</a></h2>' +
        Q.table([{ label: '연계 방침', k: 'policy' }, { label: '품질목표', k: 'name' }, { label: '목표값', k: 'target' },
          { label: '실적 지표', html: function (o) { var k = Q.S.kpis.filter(function (x) { return x.id === o.kpi; })[0]; if (!k) return '-'; var l = Q.kpiLast(k); return E(k.name) + (l ? ' · <span class="num">' + E(Q.fmt(l.v)) + '</span> ' + Q.statusChip(Q.kpiOk(k, l.v) ? '달성' : '미달') : ''); } }], c.objectives) +
        '<h3>달성 기획 (6.2.2) — 무엇을·자원·책임자·완료시기·평가방법</h3>' + Q.table([
          { label: '목표', k: 'name' }, { label: '실행 계획', k: 'plan' }, { label: '자원', k: 'resource' }, { label: '책임', k: 'owner' }, { label: '완료', k: 'when' }, { label: '평가', k: 'eval' }
        ], c.objectives) + '<div class="row end" style="margin-top:8px"><button class="btn sm no-print" data-act="editObjectives">달성 기획 편집</button></div></div>';
    } else if (tab === 'profile') {
      h += '<div class="card"><h2>회사 개요 <span class="sp"></span><button class="btn sm no-print" data-act="editProfile">수정</button></h2><dl class="kv">' +
        ['name:회사명', 'ceo:대표이사', 'founded:설립일', 'address:소재지', 'products:주요 제품', 'customers:주요 고객', 'scope:인증 적용범위', 'standard:적용 표준', 'exclusions:적용 제외', 'qmr:품질 책임자'].map(function (p) {
          var kv = p.split(':'); return '<dt>' + E(kv[1]) + '</dt><dd>' + E(c[kv[0]] || '-') + '</dd>';
        }).join('') + '</dl></div>';
      h += '<div class="card"><h2>품질매뉴얼 (QM-01) 개정 정보</h2>' + Q.table([{ label: 'Rev', k: 'rev' }, { label: '일자', k: 'date' }, { label: '내용', k: 'text' }, { label: '작성', k: 'by' }, { label: '승인', k: 'appr' }], c.manualRevs || []) + '</div>';
    } else if (tab === 'org') {
      h += '<div class="card"><h2>부서별 담당 프로세스 (5.3)</h2>' + Q.table([
        { label: '부서', k: 'name' },
        { label: '담당 프로세스', html: function (d) { return (d.procs || []).map(function (p) { var pr = Q.proc(p); return '<a href="#/pmap/' + p + '">' + E(p + ' ' + (pr ? pr.name : '')) + '</a>'; }).join('<br>'); } },
        { label: '구성원', html: function (d) { return E(Q.S.users.filter(function (u) { return u.dept === d.name; }).map(function (u) { return u.name + (u.role ? '(' + u.role + ')' : ''); }).join(', ') || '-'); } }
      ], c.depts) + '<p class="small muted" style="margin-top:8px">구성원은 설정 → 사용자에서 등록합니다. 업무분장표 양식: MD-0801-002.</p></div>';
      h += '<div class="card"><h2>5.3.1 지정 책임자</h2>' + Q.table([{ label: '역할', k: 'role' }, { label: '담당자', k: 'who' }], c.appointees || [], { empty: '지정 정보 없음' }) + '<div class="row end"><button class="btn sm no-print" data-act="editAppointees">편집</button></div></div>';
    } else if (tab === 'stake') {
      h += '<div class="card"><h2>이해관계자 니즈와 기대 (4.2)</h2>' + Q.table([{ label: '이해관계자', k: 'who' }, { label: '세부', k: 'detail' }, { label: '요구사항', k: 'req' }, { label: '중요도', html: function (s) { return '<b class="num">' + E(s.weight) + '</b>/5'; } }],
        (c.stakeholders || []).slice().sort(function (a, b) { return b.weight - a.weight; })) + '</div>';
    } else if (tab === 'issues') {
      h += Q.regView('issues', true) + Q.regView('swot', true);
    }
    return h;
  }, {});

  Q.on('editPolicy', function () {
    var c = Q.S.company, f = [{ k: 'intro', label: '전문', type: 'textarea' }].concat(c.policy.items.map(function (i, n) { return { k: 'i' + n, label: (n + 1) + '. ' + i.t, type: 'textarea', rows: 2 }; }), [{ k: 'closing', label: '맺음말', type: 'textarea', rows: 2 }, { k: 'date', label: '제정일' }]);
    var d = { intro: c.policy.intro, closing: c.policy.closing, date: c.policy.date }; c.policy.items.forEach(function (i, n) { d['i' + n] = i.d; });
    Q.modal('품질방침 수정', Q.formHtml(f, d), [{ label: '취소' }, { label: '저장', cls: 'pri', fn: function (m) { var o = Q.readForm(m, f); c.policy.intro = o.intro; c.policy.closing = o.closing; c.policy.date = o.date; c.policy.items.forEach(function (i, n) { i.d = o['i' + n]; }); Q.save(); Q.rerender(); } }]);
  });
  Q.on('editObjectives', function () {
    var c = Q.S.company;
    var body = c.objectives.map(function (o, i) {
      return '<h3>' + E(o.name) + '</h3>' + Q.formHtml([{ k: 'plan' + i, label: '실행 계획', full: true }, { k: 'resource' + i, label: '자원' }, { k: 'owner' + i, label: '책임', type: 'dept' }, { k: 'when' + i, label: '완료시기' }, { k: 'eval' + i, label: '평가방법' }],
        { ['plan' + i]: o.plan, ['resource' + i]: o.resource, ['owner' + i]: o.owner, ['when' + i]: o.when, ['eval' + i]: o.eval });
    }).join('');
    Q.modal('품질목표 달성 기획', body, [{ label: '취소' }, { label: '저장', cls: 'pri', fn: function (m) {
      c.objectives.forEach(function (o, i) { ['plan', 'resource', 'owner', 'when', 'eval'].forEach(function (k) { o[k] = m.querySelector('[name="' + k + i + '"]').value; }); });
      Q.save(); Q.rerender();
    } }]);
  });
  Q.on('editProfile', function () {
    var c = Q.S.company;
    var f = [{ k: 'name', label: '회사명' }, { k: 'ceo', label: '대표이사' }, { k: 'founded', label: '설립일' }, { k: 'qmr', label: '품질 책임자' }, { k: 'address', label: '소재지', full: true }, { k: 'products', label: '주요 제품', full: true }, { k: 'customers', label: '주요 고객', full: true }, { k: 'scope', label: '인증 적용범위', full: true }, { k: 'standard', label: '적용 표준' }, { k: 'exclusions', label: '적용 제외' }];
    Q.modal('회사 개요 수정', Q.formHtml(f, c), [{ label: '취소' }, { label: '저장', cls: 'pri', fn: function (m) { var o = Q.readForm(m, f); Object.keys(o).forEach(function (k) { c[k] = o[k]; }); Q.save(); Q.rerender(); } }]);
  });
  Q.on('editAppointees', function () {
    var c = Q.S.company; c.appointees = c.appointees || [];
    var txt = c.appointees.map(function (a) { return a.role + ' | ' + a.who; }).join('\n');
    Q.modal('지정 책임자 (역할 | 담당자, 한 줄에 하나)', '<div class="fld"><textarea id="apt" rows="12">' + E(txt) + '</textarea></div>', [{ label: '취소' }, { label: '저장', cls: 'pri', fn: function (m) {
      c.appointees = m.querySelector('#apt').value.split('\n').map(function (l) { var p = l.split('|'); return p[0].trim() ? { role: p[0].trim(), who: (p[1] || '').trim() } : null; }).filter(Boolean); Q.save(); Q.rerender();
    } }]);
  });

  /* ───────── 프로세스 맵 ───────── */
  Q.route('pmap', function (a) { return a[0] ? '프로세스 · ' + ((Q.proc(a[0]) || {}).name || a[0]) : '프로세스 맵'; }, function (args) {
    var P = window.SEED.processes || [];
    if (args[0]) return procDetail(Q.proc(args[0]));
    function lane(t, label) {
      return '<div class="lane ' + t.toLowerCase() + '"><h4>' + label + '</h4><div class="boxes">' + P.filter(function (p) { return p.type === t; }).map(function (p) {
        return '<div class="pbox" data-go="pmap/' + p.code + '"><b>' + E(p.code) + ' · ' + E(p.owner) + '</b>' + E(p.name) + '</div>';
      }).join('') + '</div></div>';
    }
    var m = window.SEED.pmap || {};
    var h = '<div class="card"><h2>ISO 9001 프로세스 맵 (Rev.1)</h2><div class="pmap"><div class="end">입력<br><span class="small muted">' + E((m.inputs || []).join(' · ')) + '</span></div><div>' +
      lane('MP', 'MP 경영 프로세스 — ' + E(m.mp || '')) + lane('COP', 'COP 고객지향 프로세스 — ' + E(m.cop || '')) + lane('SP', 'SP 지원 프로세스 — ' + E(m.sp || '')) +
      '</div><div class="end">출력<br><span class="small muted">' + E((m.outputs || []).join(' · ')) + '</span></div></div></div>';
    var cops = P.filter(function (p) { return p.type === 'COP'; }), others = P.filter(function (p) { return p.type !== 'COP'; });
    h += '<div class="card"><h2>프로세스 상호관계표 (◎ 연계)</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>MP/SP \\ COP</th>' + cops.map(function (c) { return '<th>' + E(c.name) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      others.map(function (o) { return '<tr><td>' + Q.typeChip(o.type) + ' ' + E(o.name) + '</td>' + cops.map(function (c) { return '<td style="text-align:center">' + ((o.links || []).indexOf(c.code) >= 0 ? '◎' : '') + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div></div>';
    return h;
  });
  function procDetail(p) {
    if (!p) return '<div class="empty">프로세스를 찾을 수 없습니다</div>';
    var docs = (Q.S.docs || []).filter(function (d) { return d.process === p.code && d.code !== p.code; });
    var self = Q.doc(p.code) || {};
    var forms = (window.SEED.forms || []).filter(function (f) { var d = Q.doc(f.doc); return d && d.process === p.code; });
    var kpis = (Q.S.kpis || []).filter(function (k) { return k.proc === p.code; });
    var h = '<div class="row no-print" style="margin-bottom:12px"><a href="#/pmap">← 프로세스 맵</a></div>';
    h += '<div class="card"><h2>' + Q.typeChip(p.type) + ' ' + E(p.code) + ' ' + E(p.name) + '<span class="sp"></span><span class="chip">오너 ' + E(p.owner) + '</span></h2>' +
      '<p class="muted">' + E(self.purpose || p.desc || '') + '</p>' +
      '<h3>거북이 다이어그램 (4.4)</h3><div class="grid g3">' +
      turtle('입력', p.inputs) + turtle('누가 (인원·역량)', p.who) + turtle('무엇으로 (설비·자원)', p.with) +
      turtle('출력', p.outputs) + turtle('어떻게 (절차·지침)', docs.map(function (d) { return d.code + ' ' + d.title; })) +
      turtle('성과지표 (KPI)', kpis.map(function (k) { return k.name + ' — 목표 ' + (k.targetText || k.target) + (k.unit || ''); }).concat(p.kpiText || [])) +
      '</div>' + (p.risks ? '<h3>주요 리스크</h3><ul>' + p.risks.map(function (r) { return '<li>' + E(r) + '</li>'; }).join('') + '</ul>' : '') + '</div>';
    h += '<div class="grid g2"><div class="card"><h2>절차서·지침서</h2>' + Q.table([{ label: '번호', html: function (d) { return '<a href="#/docs/' + E(d.code) + '">' + E(d.code) + '</a>'; } }, { label: '문서명', k: 'title' }, { label: '수준', k: 'level' }, { label: 'Rev', k: 'rev' }], docs) + '</div>' +
      '<div class="card"><h2>양식·기록</h2>' + Q.table([{ label: '번호', html: function (f) { return '<a href="#/forms/' + E(f.code) + '">' + E(f.code) + '</a>'; } }, { label: '양식명', k: 'title' }, { label: '기록', n: 1, k: function (f) { return (Q.S.records[f.code] || []).length + (f.register ? (Q.S.registers[f.register] || []).length : 0); } }], forms) + '</div></div>';
    return h;
  }
  function turtle(t, items) { items = Q.arr(items); return '<div class="card" style="margin:0;box-shadow:none;background:var(--surface-2)"><h3 style="margin-top:0">' + E(t) + '</h3>' + (items.length ? '<ul style="margin:0;padding-left:18px">' + items.map(function (i) { return '<li>' + E(i) + '</li>'; }).join('') + '</ul>' : '<span class="muted small">미정의 — 프로세스 오너가 정의 필요</span>') + '</div>'; }

  /* ───────── 문서 체계 ───────── */
  Q.route('docs', function (a) { return a[0] ? (a[0] === '_issues' ? '문서 정합성 점검' : '문서 · ' + a[0]) : '문서 체계'; }, function (args) {
    if (args[0] === '_issues') return docIssues();
    if (args[0]) return docDetail(Q.doc(args[0]));
    var st = Q.S.settings.docFilter || {};
    var list = (Q.S.docs || []).filter(function (d) {
      return (!st.level || d.level === st.level) && (!st.type || (Q.proc(d.process) || {}).type === st.type) && Q.match({ c: d.code, t: d.title, o: d.owner }, st.q);
    });
    var lv = ['매뉴얼', '프로세스', '절차서', '지침서'];
    var h = '<div class="tiles">' + lv.map(function (l) { return '<div class="tile"><div class="k">' + l + '</div><div class="v">' + (Q.S.docs || []).filter(function (d) { return d.level === l; }).length + '</div></div>'; }).join('') +
      '<div class="tile"><div class="k">양식</div><div class="v">' + (window.SEED.forms || []).length + '</div></div>' +
      '<div class="tile ' + ((window.SEED.docIssues || []).length ? 'warn' : '') + '" data-go="docs/_issues"><div class="k">정합성 이슈</div><div class="v">' + (window.SEED.docIssues || []).filter(function (i) { return !(Q.S.settings.issueDone || {})[i.no]; }).length + '</div><div class="s">번호 중복·불일치 → 클릭</div></div></div>';
    h += '<div class="card"><div class="filters"><input data-inp="docQ" placeholder="번호·문서명·부서" value="' + E(st.q || '') + '">' +
      '<select data-chg="docLv"><option value="">전체 수준</option>' + lv.map(function (l) { return '<option' + (st.level === l ? ' selected' : '') + '>' + l + '</option>'; }).join('') + '</select>' +
      '<select data-chg="docTy"><option value="">전체 분류</option>' + ['MP', 'COP', 'SP'].map(function (l) { return '<option' + (st.type === l ? ' selected' : '') + '>' + l + '</option>'; }).join('') + '</select>' +
      '<span class="sp"></span><button class="btn" data-act="docCsv">문서등록대장 CSV</button><button class="btn pri" data-act="docNew">문서 등록</button></div>' +
      Q.table([
        { label: '번호', html: function (d) { return '<a href="#/docs/' + E(d.code) + '"><b class="mono">' + E(d.code) + '</b></a>'; } },
        { label: '문서명', k: 'title' }, { label: '수준', k: 'level' },
        { label: '분류', html: function (d) { var p = Q.proc(d.process); return p ? Q.typeChip(p.type) : ''; } },
        { label: '프로세스', k: function (d) { var p = Q.proc(d.process); return p ? p.name : ''; } },
        { label: '오너', k: 'owner' }, { label: 'ISO', k: function (d) { return (d.clauses || []).join(', '); } },
        { label: 'Rev', k: 'rev', n: 1 }, { label: '시행일', k: 'date' },
        { label: '상태', html: function (d) { return Q.statusChip(d.status || '유효'); } }
      ], list, { rowAttr: function (d) { return ' class="click" data-go="docs/' + E(d.code) + '"'; } }) + '</div>';
    return h;
  });
  Q.on('docQ', function (el) { Q.S.settings.docFilter = Q.S.settings.docFilter || {}; Q.S.settings.docFilter.q = el.value; clearTimeout(Q._dq); Q._dq = setTimeout(function () { Q.rerender(); var i = Q.$('[data-inp="docQ"]'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 250); });
  Q.on('docLv', function (el) { Q.S.settings.docFilter = Q.S.settings.docFilter || {}; Q.S.settings.docFilter.level = el.value; Q.rerender(); });
  Q.on('docTy', function (el) { Q.S.settings.docFilter = Q.S.settings.docFilter || {}; Q.S.settings.docFilter.type = el.value; Q.rerender(); });
  Q.on('docCsv', function () {
    Q.csv('문서등록대장_MI-0701-002_' + Q.today() + '.csv', ['문서번호', '문서명', '수준', '프로세스', '오너', 'ISO 조항', '개정번호', '시행일', '상태'],
      (Q.S.docs || []).map(function (d) { return [d.code, d.title, d.level, d.process, d.owner, (d.clauses || []).join(' '), d.rev, d.date, d.status || '유효']; }));
  });
  var DOC_F = [{ k: 'code', label: '문서번호', req: true }, { k: 'title', label: '문서명', req: true }, { k: 'level', label: '수준', type: 'select', options: ['매뉴얼', '프로세스', '절차서', '지침서', '외부문서'], req: true },
    { k: 'process', label: '프로세스', type: 'select', options: [] }, { k: 'owner', label: '오너 부서', type: 'dept' }, { k: 'clausesTxt', label: 'ISO 조항 (쉼표 구분)' },
    { k: 'rev', label: '개정번호' }, { k: 'date', label: '시행일', type: 'date' }, { k: 'url', label: '원본 파일 링크 (Drive 등)', full: true },
    { k: 'purpose', label: '목적', type: 'textarea', rows: 2 }, { k: 'scope', label: '적용범위', type: 'textarea', rows: 2 }];
  function docFields() { DOC_F[3].options = (window.SEED.processes || []).map(function (p) { return p.code; }); return DOC_F; }
  Q.on('docNew', function () {
    var f = docFields();
    Q.modal('문서 등록', Q.formHtml(f, { rev: '0', date: Q.today() }), [{ label: '취소' }, { label: '등록', cls: 'pri', fn: function (m) {
      var o = Q.readForm(m, f); if (!o) return false;
      if (Q.doc(o.code)) { Q.toast('이미 있는 문서번호입니다'); return false; }
      o.clauses = (o.clausesTxt || '').split(/[,\s]+/).filter(Boolean); delete o.clausesTxt; o.steps = []; o.resp = []; o.status = '유효';
      Q.S.docs.push(o); Q.histAdd(o.code, '제정', o.rev, '신규 등록'); Q.save(); Q.go('docs/' + encodeURIComponent(o.code));
    } }]);
  });
  Q.histAdd = function (code, kind, rev, text) {
    var h = Q.S.docHistory[code] = Q.S.docHistory[code] || [];
    h.unshift({ date: Q.today(), kind: kind, rev: rev, text: text, by: Q.me() });
  };

  function docDetail(d) {
    if (!d) return '<div class="empty">문서를 찾을 수 없습니다</div>';
    var p = Q.proc(d.process);
    var forms = (window.SEED.forms || []).filter(function (f) { return f.doc === d.code; });
    var hist = (Q.S.docHistory[d.code] || []).concat(d.revs || []);
    var h = '<div class="row no-print" style="margin-bottom:12px"><a href="#/docs">← 문서 체계</a><span class="sp"></span>' +
      (d.url ? '<a class="btn" href="' + E(d.url) + '" target="_blank" rel="noopener">원본 열기</a>' : '') +
      '<button class="btn" data-act="docEdit" data-code="' + E(d.code) + '">정보 수정</button>' +
      (d.status === '개정중' ? '<button class="btn pri" data-act="docApprove" data-code="' + E(d.code) + '">개정 승인</button>' : '<button class="btn" data-act="docRevise" data-code="' + E(d.code) + '">개정 요청</button>') +
      '<button class="btn" onclick="window.print()">인쇄</button></div>';
    h += '<div class="card"><h2><span class="mono">' + E(d.code) + '</span> ' + E(d.title) + '<span class="sp"></span>' + Q.chip(d.level, 'acc') + ' ' + Q.statusChip(d.status || '유효') + '</h2><dl class="kv">' +
      '<dt>프로세스</dt><dd>' + (p ? Q.typeChip(p.type) + ' <a href="#/pmap/' + E(p.code) + '">' + E(p.code + ' ' + p.name) + '</a>' : '-') + '</dd>' +
      '<dt>오너</dt><dd>' + E(d.owner || '-') + '</dd><dt>ISO 9001</dt><dd>' + (d.clauses || []).map(function (c) { return '<a href="#/clauses/' + E(c) + '">' + E(c) + '</a>'; }).join(', ') + '</dd>' +
      '<dt>개정 / 시행</dt><dd>Rev.' + E(d.rev) + ' · ' + E(d.date || '-') + '</dd>' +
      (d.retention ? '<dt>기록 보존</dt><dd>' + E(d.retention) + '</dd>' : '') + '</dl>' +
      (d.notes ? '<p class="small" style="margin-top:10px;color:var(--warn)">⚠ ' + E(d.notes) + '</p>' : '') + '</div>';
    if (d.purpose || d.scope) h += '<div class="card"><h2>1. 목적 · 2. 적용범위</h2><p class="pre">' + E(d.purpose || '') + '</p><p class="pre muted">' + E(d.scope || '') + '</p></div>';
    if (d.terms && d.terms.length) h += '<div class="card"><h2>용어</h2>' + Q.table([{ label: '용어', k: 't' }, { label: '정의', k: 'd' }], d.terms) + '</div>';
    if (d.resp && d.resp.length) h += '<div class="card"><h2>책임과 권한</h2>' + Q.table([{ label: '부서/직책', k: 'who' }, { label: '책임', k: 'what' }], d.resp) + '</div>';
    if (d.steps && d.steps.length) h += '<div class="card"><h2>업무 절차 흐름</h2><ol class="flow">' + d.steps.map(function (s) {
      return '<li><b>' + E(s.t) + '</b>' + (s.d ? '<div class="pre small">' + E(s.d) + '</div>' : '') + '<div class="who">' + (s.who ? '담당: ' + E(s.who) : '') +
        (s.forms && s.forms.length ? ' · 기록: ' + s.forms.map(function (fc) { return '<a href="#/forms/' + E(fc) + '">' + E(fc) + '</a>'; }).join(', ') : '') + '</div></li>';
    }).join('') + '</ol></div>';
    h += '<div class="card"><h2>관련 양식</h2>' + Q.table([{ label: '번호', html: function (f) { return '<a href="#/forms/' + E(f.code) + '">' + E(f.code) + '</a>'; } }, { label: '양식명', k: 'title' }, { label: '작성 기록', n: 1, k: function (f) { return (Q.S.records[f.code] || []).length + (f.register ? (Q.S.registers[f.register] || []).length : 0); } }], forms, { empty: '연결된 양식 없음' }) + '</div>';
    h += '<div class="card"><h2>개정 이력 (7.5.3)</h2>' + Q.table([{ label: '일자', k: 'date' }, { label: '구분', html: function (r) { return Q.statusChip(r.kind); } }, { label: 'Rev', k: 'rev' }, { label: '내용', k: 'text' }, { label: '처리자', k: 'by' }], hist, { empty: '이력 없음' }) + '</div>';
    return h;
  }
  Q.on('docEdit', function (el) {
    var d = Q.doc(el.getAttribute('data-code')), f = docFields();
    var data = Q.clone(d); data.clausesTxt = (d.clauses || []).join(', ');
    Q.modal('문서 정보 수정', Q.formHtml(f, data), [{ label: '취소' }, { label: '저장', cls: 'pri', fn: function (m) {
      var o = Q.readForm(m, f); if (!o) return false;
      if (o.code !== d.code && Q.doc(o.code)) { Q.toast('이미 있는 문서번호입니다'); return false; }
      o.clauses = (o.clausesTxt || '').split(/[,\s]+/).filter(Boolean); delete o.clausesTxt;
      var old = d.code; Object.keys(o).forEach(function (k) { d[k] = o[k]; });
      if (old !== d.code) { Q.S.docHistory[d.code] = Q.S.docHistory[old] || []; delete Q.S.docHistory[old]; Q.histAdd(d.code, '번호변경', d.rev, old + ' → ' + d.code); }
      Q.save(); Q.go('docs/' + encodeURIComponent(d.code));
    } }]);
  });
  Q.on('docRevise', function (el) {
    var d = Q.doc(el.getAttribute('data-code'));
    var f = [{ k: 'reason', label: '개정 사유', type: 'textarea', req: true }, { k: 'before', label: '개정 전', type: 'textarea', rows: 2 }, { k: 'after', label: '개정 후', type: 'textarea', rows: 2 }];
    Q.modal('개정 요청 — ' + d.code + ' (MI-0701-001 개정 전후 변경 현황)', Q.formHtml(f), [{ label: '취소' }, { label: '요청', cls: 'pri', fn: function (m) {
      var o = Q.readForm(m, f); if (!o) return false;
      d.status = '개정중'; d.pending = o; Q.histAdd(d.code, '개정중', d.rev, o.reason);
      (Q.S.records['MI-0701-001'] = Q.S.records['MI-0701-001'] || []).unshift({ id: Q.uid('r'), date: Q.today(), title: d.code + ' ' + d.title, h: { 문서번호: d.code, 문서명: d.title, 개정사유: o.reason }, rows: [{ 항목: d.title, 개정전: o.before, 개정후: o.after, 사유: o.reason }], by: Q.me(), status: '검토' });
      Q.save(); Q.rerender();
    } }]);
  });
  Q.on('docApprove', function (el) {
    var d = Q.doc(el.getAttribute('data-code'));
    var next = String((parseInt(d.rev, 10) || 0) + 1);
    var f = [{ k: 'rev', label: '새 개정번호', def: next, req: true }, { k: 'date', label: '시행일', type: 'date', def: Q.today(), req: true }, { k: 'appr', label: '승인자', type: 'user' }];
    Q.modal('개정 승인 — ' + d.code, Q.formHtml(f) + '<p class="small muted">' + E((d.pending || {}).reason || '') + '</p>', [{ label: '취소' }, { label: '승인', cls: 'pri', fn: function (m) {
      var o = Q.readForm(m, f); if (!o) return false;
      d.rev = o.rev; d.date = o.date; d.status = '유효'; Q.histAdd(d.code, '승인', o.rev, ((d.pending || {}).reason || '') + (o.appr ? ' / 승인 ' + o.appr : '')); delete d.pending;
      Q.save(); Q.rerender();
    } }]);
  });
  function docIssues() {
    var done = Q.S.settings.issueDone || {};
    return '<div class="row no-print" style="margin-bottom:12px"><a href="#/docs">← 문서 체계</a></div><div class="card"><h2>원본 문서 간 정합성 이슈 <span class="sp"></span><span class="small muted">문서체계표 · 표준목록 · 매뉴얼 대조 결과</span></h2>' +
      '<p class="small muted">심사 전에 정리할 항목입니다. 조치를 마치면 체크하세요.</p>' +
      Q.table([{ label: '완료', html: function (i) { return '<input type="checkbox" data-chg="issueDone" data-no="' + i.no + '"' + (done[i.no] ? ' checked' : '') + '>'; } }, { label: '#', k: 'no' }, { label: '이슈', k: 'text' }, { label: '권고 조치', k: 'fix' }], window.SEED.docIssues || []) + '</div>';
  }
  Q.on('issueDone', function (el) { Q.S.settings.issueDone = Q.S.settings.issueDone || {}; Q.S.settings.issueDone[el.getAttribute('data-no')] = el.checked; Q.save(); });

  /* ───────── ISO 9001 조항 맵 ───────── */
  Q.route('clauses', function (a) { return a[0] ? 'ISO 9001 · ' + a[0] : 'ISO 9001 조항 맵'; }, function (args) {
    var cls = window.SEED.clauses || [];
    if (args[0]) {
      var c = Q.clause(args[0]);
      if (!c) return '<div class="empty">조항 없음</div>';
      var docs = (Q.S.docs || []).filter(function (d) { return (d.clauses || []).some(function (x) { return x === c.no || c.no.indexOf(x + '.') === 0 || x.indexOf(c.no + '.') === 0; }); });
      var ev = Q.clauseEvidence(c.no);
      var cks = [];
      (Q.S.checklists || []).forEach(function (cl) { (cl.sections || []).forEach(function (s) { (s.items || []).forEach(function (it) { if (it.clause && (it.clause === c.no || it.clause.indexOf(c.no) === 0)) cks.push(it); }); }); });
      return '<div class="row no-print" style="margin-bottom:12px"><a href="#/clauses">← 조항 맵</a></div><div class="card"><h2>' + E(c.no) + ' ' + E(c.title) + (c.doc ? ' ' + Q.chip(c.doc, 'warn') : '') + '</h2><p>' + E(c.summary) + '</p>' +
        (c.manual ? '<h3>MST 품질매뉴얼 규정</h3><p class="muted">' + E(c.manual) + '</p>' : '') + '</div>' +
        '<div class="grid g2"><div class="card"><h2>관련 문서</h2>' + Q.table([{ label: '번호', html: function (d) { return '<a href="#/docs/' + E(d.code) + '">' + E(d.code) + '</a>'; } }, { label: '문서명', k: 'title' }], docs, { empty: '연결 문서 없음' }) + '</div>' +
        '<div class="card"><h2>증거 (기록)</h2>' + Q.table([{ label: '출처', k: 'label' }, { label: '건수', n: 1, html: function (e) { return e.n ? '<b>' + e.n + '</b>' : '<span style="color:var(--crit)">0</span>'; } }], ev, { empty: '증거 출처 미정의' }) + '</div></div>' +
        (cks.length ? '<div class="card"><h2>내부심사 체크 질문</h2><ol>' + cks.map(function (i) { return '<li>' + E(i.q) + '</li>'; }).join('') + '</ol></div>' : '');
    }
    var cov = Q.coverage();
    return '<div class="tiles">' + cov.byChapter.map(function (c) { return '<div class="tile ' + (c.pct >= 90 ? 'good' : c.pct >= 60 ? 'warn' : 'crit') + '"><div class="k">' + c.ch + '. ' + c.title + '</div><div class="v">' + c.pct + '%</div><div class="s">' + c.ok + '/' + c.total + ' 조항 증거 있음</div></div>'; }).join('') + '</div>' +
      '<div class="card"><h2>조항별 문서·증거 매트릭스</h2>' + Q.table([
        { label: '조항', html: function (c) { return '<a href="#/clauses/' + E(c.no) + '"><b class="mono">' + E(c.no) + '</b></a>'; } },
        { label: '제목', k: 'title' },
        { label: '문서화 요구', html: function (c) { return c.doc ? Q.chip(c.doc, c.doc.indexOf('유지') >= 0 ? 'mp' : 'acc') : ''; } },
        { label: '관련 문서', k: function (c) { return (c.docs || []).join(', '); } },
        { label: '증거', html: function (c) { var ev = Q.clauseEvidence(c.no), n = ev.reduce(function (s, e) { return s + e.n; }, 0); return ev.length ? (n ? Q.chip(n + '건', 'good') : Q.chip('없음', 'crit')) : Q.chip('-', ''); } }
      ], cls, { rowAttr: function (c) { return ' class="click" data-go="clauses/' + E(c.no) + '"'; } }) + '</div>';
  });

  /* ───────── KPI ───────── */
  Q.route('kpi', 'KPI 성과지표', function (args) {
    var S = Q.S, y = +(args[0] || S.settings.kpiYear || new Date().getFullYear());
    var months = []; for (var i = 1; i <= 12; i++) months.push(y + '-' + String(i).padStart(2, '0'));
    var h = '<div class="card no-print"><div class="row"><button class="btn sm" data-go="kpi/' + (y - 1) + '">◀ ' + (y - 1) + '</button><b style="font-size:16px">' + y + '년</b><button class="btn sm" data-go="kpi/' + (y + 1) + '">' + (y + 1) + ' ▶</button><span class="sp"></span>' +
      '<button class="btn" data-act="kpiCsv" data-y="' + y + '">MD-0901-004 실적현황 CSV</button><button class="btn pri" data-act="kpiNew">지표 추가</button></div></div>';
    h += '<div class="card"><h2>성과지표 목표대비 실적현황 (MD-0901-004) <span class="sp"></span><span class="small muted">셀에 직접 입력 · 자동 저장</span></h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>프로세스</th><th>지표</th><th>목표</th>' +
      months.map(function (m) { return '<th>' + (+m.slice(5)) + '월</th>'; }).join('') + '<th>누계/평균</th><th>달성률</th><th></th></tr></thead><tbody>' +
      (S.kpis || []).map(function (k) {
        var a = S.kpiActuals[k.id] || {}, vals = months.map(function (m) { return Q.num(a[m]); }).filter(function (v) { return v !== null; });
        var agg = vals.length ? (k.agg === 'sum' ? vals.reduce(function (s, v) { return s + v; }, 0) : vals.reduce(function (s, v) { return s + v; }, 0) / vals.length) : null;
        var okN = months.filter(function (m) { return Q.num(a[m]) !== null && Q.kpiOk(k, a[m]); }).length;
        return '<tr><td>' + E((Q.proc(k.proc) || {}).name || k.proc || '') + '</td><td><b>' + E(k.name) + '</b><div class="small muted">' + E(k.formula || '') + '</div></td><td class="n">' + Q.kpiTarget(k) + '</td>' +
          months.map(function (m) { var v = a[m]; var bad = Q.num(v) !== null && !Q.kpiOk(k, v); return '<td style="padding:3px"><input class="mono" style="width:58px;' + (bad ? 'color:var(--crit);font-weight:700' : '') + '" data-chg="kpiSet" data-k="' + E(k.id) + '" data-m="' + m + '" value="' + E(v === undefined || v === null ? '' : v) + '"></td>'; }).join('') +
          '<td class="n">' + Q.fmt(agg) + '</td><td class="n">' + (vals.length ? Math.round(100 * okN / vals.length) + '%' : '-') + '</td><td><button class="btn sm ghost" data-act="kpiEdit" data-k="' + E(k.id) + '">⋯</button></td></tr>';
      }).join('') + '</tbody></table></div><p class="small muted" style="margin-top:8px">달성률 = 목표 달성 월 수 ÷ 입력 월 수. 붉은 값은 목표 미달 — 미달 시 부적합·시정조치(MD-1002) 또는 개선활동(MD-1001)으로 연결하세요.</p></div>';
    h += '<div class="grid g2">' + (S.kpis || []).map(function (k) {
      var a = S.kpiActuals[k.id] || {};
      return '<div class="card"><h2>' + E(k.name) + '<span class="sp"></span><span class="small muted">목표 ' + Q.kpiTarget(k) + '</span></h2>' +
        Q.lineChart([{ data: months.map(function (m) { return Q.num(a[m]); }), color: 'var(--accent)', flag: function (v) { return !Q.kpiOk(k, v); } }],
          { labels: months.map(function (m) { return (+m.slice(5)) + '월'; }), h: 180, zero: true, lines: [{ v: Q.num(k.target), label: '목표', color: 'var(--good)' }] }) + '</div>';
    }).join('') + '</div>';
    return h;
  });
  Q.on('kpiSet', function (el) {
    var k = el.getAttribute('data-k'), m = el.getAttribute('data-m');
    Q.S.kpiActuals[k] = Q.S.kpiActuals[k] || {};
    var v = el.value.trim(); if (v === '') delete Q.S.kpiActuals[k][m]; else Q.S.kpiActuals[k][m] = Q.num(v) === null ? v : Q.num(v);
    Q.save();
    var kk = Q.S.kpis.filter(function (x) { return x.id === k; })[0];
    el.style.color = v !== '' && !Q.kpiOk(kk, v) ? 'var(--crit)' : ''; el.style.fontWeight = v !== '' && !Q.kpiOk(kk, v) ? '700' : '';
  });
  var KPI_F = [{ k: 'name', label: '지표명', req: true }, { k: 'proc', label: '프로세스', type: 'select', options: [] }, { k: 'formula', label: '산출식', full: true }, { k: 'unit', label: '단위' },
    { k: 'target', label: '목표값', type: 'number', req: true }, { k: 'dir', label: '방향', type: 'select', options: ['up', 'down'], hint: 'up: 클수록 좋음 / down: 작을수록 좋음' }, { k: 'agg', label: '누계 방식', type: 'select', options: ['avg', 'sum'] },
    { k: 'cycle', label: '측정주기', type: 'select', options: ['월', '분기', '반기', '년'] }, { k: 'owner', label: '담당 부서', type: 'dept' }];
  function kpiFields() { KPI_F[1].options = (window.SEED.processes || []).map(function (p) { return p.code; }); return KPI_F; }
  Q.on('kpiNew', function () {
    var f = kpiFields();
    Q.modal('KPI 추가', Q.formHtml(f, { dir: 'up', agg: 'avg', cycle: '월' }), [{ label: '취소' }, { label: '추가', cls: 'pri', fn: function (m) { var o = Q.readForm(m, f); if (!o) return false; o.id = Q.uid('kpi'); Q.S.kpis.push(o); Q.save(); Q.rerender(); } }]);
  });
  Q.on('kpiEdit', function (el) {
    var k = Q.S.kpis.filter(function (x) { return x.id === el.getAttribute('data-k'); })[0], f = kpiFields();
    Q.modal('KPI 수정', Q.formHtml(f, k), [{ label: '삭제', cls: 'danger', fn: function () { Q.confirm('이 지표와 실적을 삭제할까요?', function () { Q.S.kpis = Q.S.kpis.filter(function (x) { return x !== k; }); delete Q.S.kpiActuals[k.id]; Q.save(); Q.rerender(); }); return false; } },
      { label: '취소' }, { label: '저장', cls: 'pri', fn: function (m) { var o = Q.readForm(m, f); if (!o) return false; Object.keys(o).forEach(function (x) { k[x] = o[x]; }); Q.save(); Q.rerender(); } }]);
  });
  Q.on('kpiCsv', function (el) {
    var y = el.getAttribute('data-y'), ms = []; for (var i = 1; i <= 12; i++) ms.push(y + '-' + String(i).padStart(2, '0'));
    Q.csv('성과지표_실적현황_' + y + '.csv', ['프로세스', '지표', '산출식', '목표', '단위'].concat(ms.map(function (m) { return (+m.slice(5)) + '월'; })),
      Q.S.kpis.map(function (k) { var a = Q.S.kpiActuals[k.id] || {}; return [k.proc, k.name, k.formula, k.target, k.unit].concat(ms.map(function (m) { return a[m] === undefined ? '' : a[m]; })); }));
  });

  /* ───────── 부적합·시정조치 (MD-1002) ───────── */
  var NCR_SRC = ['수입검사', '공정검사', '출하검사', '고객불만', '내부심사', 'KPI 미달', 'SPC 이상', '협력사', '기타'];
  var NCR_STEPS = ['접수', '봉쇄', '원인분석', '대책', '효과확인', '종결'];
  Q.newNcr = function (pre) {
    var f = [{ k: 'source', label: '발생 구분', type: 'select', options: NCR_SRC, req: true, def: '공정검사' }, { k: 'date', label: '발생일', type: 'date', def: Q.today(), req: true },
      { k: 'title', label: '부적합 제목', req: true, full: true }, { k: 'item', label: '품번/품명' }, { k: 'lot', label: 'LOT / 수량' }, { k: 'customer', label: '고객사' }, { k: 'dept', label: '책임 부서', type: 'dept' },
      { k: 'desc', label: '현상 (5W1H)', type: 'textarea' }, { k: 'severity', label: '중요도', type: 'select', options: ['A (고객 영향)', 'B (사내 유출 차단)', 'C (경미)'] }, { k: 'due', label: '조치 기한', type: 'date', def: Q.addDays(Q.today(), 14) }];
    Q.modal('부적합 보고 등록', Q.formHtml(f, pre || {}), [{ label: '취소' }, { label: '등록', cls: 'pri', fn: function (m) {
      var o = Q.readForm(m, f); if (!o) return false;
      var y = o.date.slice(2, 4), seq = (Q.S.ncrs || []).filter(function (n) { return (n.no || '').indexOf('NC' + y) === 0; }).length + 1;
      o.id = Q.uid('ncr'); o.no = 'NC' + y + '-' + String(seq).padStart(3, '0'); o.status = '접수'; o.by = Q.me(); o.log = [{ date: Q.today(), step: '접수', by: Q.me() }];
      if (pre && pre.link) o.link = pre.link;
      Q.S.ncrs.unshift(o); Q.save(); Q.go('ncr/' + o.id);
    } }]);
  };
  Q.route('ncr', function (a) { return a[0] ? '부적합 · 시정조치 상세' : '부적합·시정조치'; }, function (args) {
    if (args[0]) return ncrDetail((Q.S.ncrs || []).filter(function (n) { return n.id === args[0]; })[0]);
    var st = Q.S.settings.ncrFilter || {};
    var list = (Q.S.ncrs || []).filter(function (n) { return (!st.status || (st.status === '미결' ? n.status !== '종결' : n.status === st.status)) && (!st.source || n.source === st.source) && Q.match(n, st.q); });
    var all = Q.S.ncrs || [];
    var bySrc = NCR_SRC.map(function (s) { return { label: s, v: all.filter(function (n) { return n.source === s; }).length }; }).filter(function (x) { return x.v; });
    var closed = all.filter(function (n) { return n.status === '종결' && n.closedAt; });
    var lead = closed.length ? Math.round(closed.reduce(function (s, n) { return s - Q.daysUntil(n.date) + Q.daysUntil(n.closedAt); }, 0) / closed.length) : null;
    var h = '<div class="tiles">' + NCR_STEPS.map(function (s) { return '<div class="tile"><div class="k">' + s + '</div><div class="v">' + all.filter(function (n) { return n.status === s; }).length + '</div></div>'; }).join('') +
      '<div class="tile"><div class="k">평균 처리기간</div><div class="v">' + (lead === null ? '-' : lead + '일') + '</div><div class="s">종결 ' + closed.length + '건 기준</div></div></div>';
    h += '<div class="card"><div class="filters"><input data-inp="ncrQ" placeholder="검색" value="' + E(st.q || '') + '"><select data-chg="ncrSt"><option value="">전체 상태</option>' + ['미결'].concat(NCR_STEPS).map(function (s) { return '<option' + (st.status === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select>' +
      '<select data-chg="ncrSrc"><option value="">전체 구분</option>' + NCR_SRC.map(function (s) { return '<option' + (st.source === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select><span class="sp"></span>' +
      '<button class="btn" data-act="ncrCsv">대장 CSV</button><button class="btn pri" data-act="ncrNew">부적합 등록</button></div>' +
      Q.table([{ label: '번호', html: function (n) { return '<b class="mono">' + E(n.no) + '</b>'; } }, { label: '발생일', k: 'date' }, { label: '구분', html: function (n) { return Q.chip(n.source, n.source === '고객불만' ? 'crit' : ''); } },
        { label: '제목', k: 'title' }, { label: '고객', k: 'customer' }, { label: '책임', k: 'dept' }, { label: '단계', html: function (n) { return Q.statusChip(n.status === '종결' ? '종결' : n.status) + '<div style="margin-top:4px;width:90px">' + Q.bar(100 * NCR_STEPS.indexOf(n.status) / 5, n.status === '종결' ? 'good' : '') + '</div>'; } },
        { label: '기한', html: function (n) { return Q.dueChip(n.due, n.status === '종결'); } }], list, { rowAttr: function (n) { return ' class="click" data-go="ncr/' + n.id + '"'; } }) + '</div>';
    if (bySrc.length) h += '<div class="card"><h2>발생 구분별 건수</h2>' + Q.barChart(bySrc, { left: 100 }) + '</div>';
    return h;
  });
  Q.on('ncrNew', function () { Q.newNcr(); });
  Q.on('ncrQ', function (el) { Q.S.settings.ncrFilter = Q.S.settings.ncrFilter || {}; Q.S.settings.ncrFilter.q = el.value; clearTimeout(Q._nq); Q._nq = setTimeout(function () { Q.rerender(); var i = Q.$('[data-inp="ncrQ"]'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 300); });
  Q.on('ncrSt', function (el) { Q.S.settings.ncrFilter = Q.S.settings.ncrFilter || {}; Q.S.settings.ncrFilter.status = el.value; Q.rerender(); });
  Q.on('ncrSrc', function (el) { Q.S.settings.ncrFilter = Q.S.settings.ncrFilter || {}; Q.S.settings.ncrFilter.source = el.value; Q.rerender(); });
  Q.on('ncrCsv', function () {
    Q.csv('부적합_시정조치_대장_' + Q.today() + '.csv', ['번호', '발생일', '구분', '제목', '품번', 'LOT', '고객', '책임부서', '현상', '봉쇄', '근본원인', '대책', '수평전개', '효과확인', '상태', '기한', '종결일'],
      Q.S.ncrs.map(function (n) { return [n.no, n.date, n.source, n.title, n.item, n.lot, n.customer, n.dept, n.desc, n.contain, n.rootCause, n.action, n.horizontal, n.verify, n.status, n.due, n.closedAt]; }));
  });
  var NCR_PH = {
    '봉쇄': [{ k: 'contain', label: '봉쇄·긴급 조치 (격리/선별/재작업/특채/고객통지)', type: 'textarea' }, { k: 'disposition', label: '부적합품 처리 (8.7)', type: 'select', options: ['재작업', '수리', '특채', '폐기', '반품', '선별', '해당없음'] }, { k: 'qtyNg', label: '부적합 수량', type: 'number' }],
    '원인분석': [{ k: 'why1', label: 'Why 1' }, { k: 'why2', label: 'Why 2' }, { k: 'why3', label: 'Why 3' }, { k: 'why4', label: 'Why 4' }, { k: 'why5', label: 'Why 5' }, { k: 'm4', label: '4M 구분', type: 'select', options: ['Man', 'Machine', 'Material', 'Method', 'Measurement', 'Environment'] }, { k: 'rootCause', label: '근본 원인 (발생 / 유출)', type: 'textarea' }],
    '대책': [{ k: 'action', label: '재발방지 대책', type: 'textarea' }, { k: 'horizontal', label: '수평전개 (유사 공정·제품·QMS 문서·FMEA·작업표준)', type: 'textarea' }, { k: 'docChange', label: '표준류 반영 문서번호' }, { k: 'actionDue', label: '대책 완료 예정', type: 'date' }],
    '효과확인': [{ k: 'verify', label: '효과성 검증 결과 (기간·데이터)', type: 'textarea' }, { k: 'effective', label: '판정', type: 'select', options: ['유효', '재조치 필요'] }, { k: 'riskUpdate', label: '리스크 갱신 / QMS 변경 (10.2.1 e,f)', type: 'textarea', rows: 2 }]
  };
  function ncrDetail(n) {
    if (!n) return '<div class="empty">항목 없음</div>';
    var idx = NCR_STEPS.indexOf(n.status);
    var h = '<div class="row no-print" style="margin-bottom:12px"><a href="#/ncr">← 목록</a><span class="sp"></span><button class="btn" onclick="window.print()">인쇄 (시정조치 보고서)</button><button class="btn danger" data-act="ncrDel" data-id="' + n.id + '">삭제</button></div>';
    h += '<div class="card"><h2><span class="mono">' + E(n.no) + '</span> ' + E(n.title) + '<span class="sp"></span>' + Q.statusChip(n.status) + '</h2>' +
      '<div class="row" style="gap:4px;margin-bottom:14px">' + NCR_STEPS.map(function (s, i) { return '<span class="chip ' + (i < idx ? 'good' : i === idx ? 'acc' : '') + '">' + (i + 1) + '. ' + s + '</span>'; }).join('<span class="muted">›</span>') + '</div>' +
      '<div class="grid g2"><dl class="kv"><dt>발생 구분</dt><dd>' + E(n.source) + '</dd><dt>발생일</dt><dd>' + E(n.date) + '</dd><dt>품번/LOT</dt><dd>' + E((n.item || '-') + ' / ' + (n.lot || '-')) + '</dd><dt>고객</dt><dd>' + E(n.customer || '-') + '</dd></dl>' +
      '<dl class="kv"><dt>책임 부서</dt><dd>' + E(n.dept || '-') + '</dd><dt>중요도</dt><dd>' + E(n.severity || '-') + '</dd><dt>기한</dt><dd>' + Q.dueChip(n.due, n.status === '종결') + '</dd><dt>등록</dt><dd>' + E(n.by || '') + '</dd></dl></div>' +
      '<h3>현상</h3><p class="pre">' + E(n.desc || '-') + '</p>' + (n.link ? '<p class="small">연결: <a href="#/' + E(n.link) + '">' + E(n.link) + '</a></p>' : '') + '</div>';
    Object.keys(NCR_PH).forEach(function (ph) {
      var pi = NCR_STEPS.indexOf(ph), f = NCR_PH[ph], has = f.some(function (x) { return n[x.k]; });
      h += '<div class="card"><h2>' + (pi + 1) + '. ' + ph + '<span class="sp"></span>' + (pi <= idx + 1 && n.status !== '종결' ? '<button class="btn sm no-print" data-act="ncrPhase" data-id="' + n.id + '" data-ph="' + ph + '">' + (has ? '수정' : '작성') + '</button>' : '') + '</h2>' +
        (has ? '<dl class="kv">' + f.filter(function (x) { return n[x.k]; }).map(function (x) { return '<dt>' + E(x.label) + '</dt><dd class="pre">' + E(n[x.k]) + '</dd>'; }).join('') + '</dl>' : '<span class="muted small">' + (pi <= idx + 1 ? '미작성' : '이전 단계 완료 후 작성') + '</span>') + '</div>';
    });
    h += '<div class="card"><h2>6. 종결</h2>' + (n.status === '종결' ? '<p>' + E(n.closedAt) + ' 종결 · ' + E(n.closedBy || '') + '</p>' :
      (n.status === '효과확인' && n.effective === '유효' ? '<button class="btn pri no-print" data-act="ncrClose" data-id="' + n.id + '">종결 승인</button>' : '<span class="muted small">효과확인 판정이 "유효"이면 종결할 수 있습니다</span>')) +
      '<h3>처리 이력</h3>' + Q.table([{ label: '일자', k: 'date' }, { label: '단계', k: 'step' }, { label: '처리자', k: 'by' }], n.log || []) + '</div>';
    return h;
  }
  Q.on('ncrPhase', function (el) {
    var n = Q.S.ncrs.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0], ph = el.getAttribute('data-ph'), f = NCR_PH[ph];
    Q.modal(n.no + ' — ' + ph, Q.formHtml(f, n), [{ label: '취소' }, { label: '저장', cls: 'pri', fn: function (m) {
      var o = Q.readForm(m, f); Object.keys(o).forEach(function (k) { n[k] = o[k]; });
      if (NCR_STEPS.indexOf(ph) > NCR_STEPS.indexOf(n.status)) { n.status = ph; n.log.push({ date: Q.today(), step: ph, by: Q.me() }); }
      if (ph === '효과확인' && o.effective === '재조치 필요') { n.status = '원인분석'; n.log.push({ date: Q.today(), step: '재조치 (원인분석 복귀)', by: Q.me() }); }
      Q.save(); Q.rerender();
    } }]);
  });
  Q.on('ncrClose', function (el) {
    var n = Q.S.ncrs.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0];
    n.status = '종결'; n.closedAt = Q.today(); n.closedBy = Q.me(); n.log.push({ date: Q.today(), step: '종결', by: Q.me() });
    Q.syncFindingFromNcr && Q.syncFindingFromNcr(n);
    Q.save(); Q.rerender();
  });
  Q.on('ncrDel', function (el) { Q.confirm('이 부적합 기록을 삭제할까요? (복구 불가 — 백업 권장)', function () { Q.S.ncrs = Q.S.ncrs.filter(function (x) { return x.id !== el.getAttribute('data-id'); }); Q.save(); Q.go('ncr'); }); });
})();
