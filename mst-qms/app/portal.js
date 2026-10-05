/* MST QMS — 포털 화면 구조
   번호 메뉴(1 품질매뉴얼 · 2 프로세스·절차·지침·양식 · 3 프로세스맵·문서체계도 · 4 KPI · 5 내부심사),
   운영(업무 운영 캘린더 · 조직·부서별 업무), 문서 관리(신규 제정 · 정합성 검증 · ISO 요구사항 · 용어 사전 · 번호체계),
   실행 기록(기록 작성 · 관리대장 · 부적합 · 4M · 경영검토 · 교육 · SPC · MSA) */
(function () {
  'use strict';
  var Q = window.Q, E = Q.esc;
  var S = function () { return window.SEED; };

  /* ───────── 메뉴 ───────── */
  Q.NAV = [
    ['home', '홈', '⌂'],
    ['문서 체계'],
    ['manual', '품질매뉴얼', '1'],
    ['docs', '프로세스·절차·지침·양식', '2'],
    ['pmap', '프로세스맵·문서체계도', '3'],
    ['성과·심사'],
    ['kpi', 'KPI 성과지표', '4', 'kpi'],
    ['audit', '내부심사 (ISO+SSQ)', '5', 'audit'],
    ['운영'],
    ['calendar', '업무 운영 캘린더', '▦'],
    ['org', '조직·부서별 업무', '⚑'],
    ['실행 기록'],
    ['forms', '기록 작성 (전자양식)', '✎'],
    ['reg', '관리대장', '☰'],
    ['ncr', '부적합·시정조치', '!', 'ncr'],
    ['change4m', '4M 변경관리', '4M', '4m'],
    ['review', '경영검토', '◎'],
    ['training', '교육훈련', '✓', 'train'],
    ['spc', 'SPC · MSA', '∿'],
    ['문서 관리'],
    ['newdoc', '신규 제정', '+'],
    ['verify', '정합성 검증·제개정 기록', '✔'],
    ['clauses', 'ISO 9001 요구사항', '9'],
    ['glossary', '용어 사전', '가'],
    ['rules', '번호체계·문서관리 규칙', '↻'],
    ['settings', '설정·백업', '⚙']
  ];
  var GROUP = {}; (function () { var g = ''; Q.NAV.forEach(function (n) { if (n.length === 1) g = n[0]; else GROUP[n[0]] = { g: g, label: n[1], ico: n[2] }; }); })();
  GROUP.link = { g: '프로세스맵·문서체계도', label: 'SSQ↔ISO 매핑표' }; GROUP.custeval = { g: '내부심사', label: '세메스 SSQ 자체평가' };
  GROUP.msa = GROUP.spc; GROUP.dashboard = GROUP.home; GROUP.company = GROUP.manual; GROUP.guide = GROUP.rules; GROUP.search = { g: '', label: '검색' };

  Q.buildNav = function () {
    Q.$('#nav').innerHTML = Q.NAV.map(function (n) {
      if (n.length === 1) return '<div class="grp">' + E(n[0]) + '</div>';
      return '<a href="#/' + n[0] + '" data-r="' + n[0] + '"><span class="ico">' + E(n[2]) + '</span>' + E(n[1]) + (n[3] ? '<span class="cnt" data-badge="' + n[3] + '" hidden></span>' : '') + '</a>';
    }).join('');
  };
  var ALIAS = { dashboard: 'home', company: 'manual', link: 'pmap', custeval: 'audit', msa: 'spc', guide: 'rules' };
  var origRender = Q.render;
  Q.render = function () {
    var r = Q.parse(); if (r.name === '' || r.name === 'dashboard') { if (r.name === 'dashboard') { location.hash = '#/home'; return; } }
    origRender();
    var on = ALIAS[r.name] || r.name;
    Q.$$('.nav a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-r') === on); });
  };

  /* 페이지 머리: 경로 + 제목 + 부제 */
  var SUB = {
    kpi: '월 1회 집계 → 경영검토 보고', audit: 'ISO 9001 + 세메스 SSQ Audit Check Sheet · ' + new Date().getFullYear() + '년',
    calendar: '프로세스맵·문서체계표 기준 — 누가, 언제, 어떤 양식으로', newdoc: '번호 자동 부여 → 문서체계에 즉시 반영 → 정합성 자동 검증',
    verify: '', pmap: '', forms: '현장 기록을 화면에서 바로 작성 · 결재 · 출력'
  };
  Q.pageHead = function (r, rt, title) {
    if (r.name === 'home') return '';
    var g = GROUP[r.name] || {}, crumb = [];
    if (g.ico && /^\d$/.test(g.ico)) crumb.push(g.ico + '. ' + g.label); else if (g.g) crumb.push(g.g);
    if (r.args[0] && rt.crumb) { var cb = rt.crumb(r.args); if (cb) crumb.push(cb); }
    return '<div class="crumb">' + E(crumb.join(' › ')) + '</div><div class="ph"><h1>' + (rt.headHtml ? rt.headHtml(r.args) : E(title)) + '</h1>' + (SUB[r.name] && !r.args[0] ? '<span class="sub">' + E(SUB[r.name]) + '</span>' : '') + '</div>';
  };

  /* ───────── 공통 도우미 ───────── */
  function docLink(code) { var d = Q.doc(code); return '<a class="code" href="#/docs/' + E(code) + '">' + E(code) + '</a>' + (d ? ' ' + E(d.title) : ''); }
  function formLink(code) { var f = Q.form(code); return '<a class="code" href="#/forms/' + E(code) + '">' + E(code) + '</a>' + (f ? ' ' + E(f.title) : ''); }
  /* 양식/문서 → 연계 SSQ 항목 */
  Q.ssqOf = function (code) {
    var L = S().ssqLink || {}, out = [];
    Object.keys(L).forEach(function (k) { var l = L[k]; if ((l.forms || []).concat(l.xforms || [], l.docs || []).indexOf(code) >= 0) out.push(k); });
    return out.sort(function (a, b) { return a - b; });
  };
  function sqChips(code) { return Q.ssqOf(code).map(function (n) { return '<a class="sqchip" href="#/link/' + E(n) + '">SSQ ' + E(n) + '</a>'; }).join(''); }
  /* 정정본 원본 파일 (data/originals.js) */
  Q.origFile = function (code) { return (window.ORIGINALS || {})[code] || null; };
  function dlBtn(code, label) { var p = Q.origFile(code); return p ? '<a class="btn pri" href="' + E(p) + '" download>' + E(label || '다운로드') + '</a>' : ''; }
  function docsOf(proc) { return (Q.S.docs || []).filter(function (d) { return d.process === proc && d.level !== '프로세스' && d.level !== '매뉴얼'; }); }
  function formsOf(code) { return (S().forms || []).filter(function (f) { return f.doc === code; }); }
  function isNew(x) { return x && (x.proposed || x.status === '제정 예정'); }

  /* ───────── 홈 ───────── */
  Q.route('home', '홈', function () {
    var c = Q.S.company, docs = Q.S.docs || [], forms = S().forms || [];
    var ce = S().custEval, ssqTotal = ce ? ce.sections.reduce(function (t, s) { return t + s.items.reduce(function (u, i) { return u + (Q.num(i.points) || 0); }, 0); }, 0) : 0;
    var newForms = forms.filter(isNew).length;
    var h = '<div class="ph" style="flex-direction:column;align-items:flex-start;gap:4px"><h1>' + E(c.name.replace(/\s*\(MST\)/, '')) + ' 품질경영시스템</h1><span class="sub" style="font-weight:400">ISO 9001:2015 · 세메스(SEMES) SSQ Audit Check Sheet 45항목 · 문서 버전 <b>V1</b> (2026-10-05)</span></div>';
    h += '<div class="tiles" style="grid-template-columns:repeat(3,1fr)">' +
      '<div class="tile" data-go="docs"><div class="v">' + docs.length + '</div><div class="s">표준문서 (QM·MP·MD·MI)</div></div>' +
      '<div class="tile" data-go="forms"><div class="v">' + forms.length + '</div><div class="s">양식(기록물) — 신규 ' + newForms + '종</div></div>' +
      '<div class="tile" data-go="pmap/ssq"><div class="v">' + ssqTotal + '<small style="font-size:15px">점 만점</small></div><div class="s">세메스 SSQ 평가 (과락 2항목 별도 판정)</div></div></div>';
    h += '<div class="card infobar"><div><span>대표자</span><b>대표이사 ' + E(c.ceo) + '</b></div><div><span>설립</span><b>' + E(c.founded) + '</b></div><div><span>소재지</span><b>' + E(c.address) + '</b></div><div><span>인증범위</span><b>' + E(c.scope) + '</b></div><div><span>품질책임자</span><b>' + E(c.qmr) + '</b></div></div>';
    var cnt = function (lv) { return docs.filter(function (d) { return d.level === lv; }).length; };
    var quick = [
      ['1', '품질매뉴얼', 'QM-01 · ISO 9001 4~10장, 품질방침·목표, 프로세스 상호관계', 'manual'],
      ['2', '프로세스·절차·지침·양식', '프로세스 ' + cnt('프로세스') + ' · 절차서 ' + cnt('절차서') + ' · 지침서 ' + cnt('지침서') + ' · 양식 ' + forms.length + '종', 'docs'],
      ['3', '프로세스맵·문서체계도', '프로세스 맵, 문서체계표, SSQ↔ISO 매핑 45항목', 'pmap'],
      ['4', 'KPI 성과지표', '성과지표 ' + (Q.S.kpis || []).length + '개 · 월별 실적 입력 · 추이 그래프', 'kpi'],
      ['5', '내부심사 체크시트', 'ISO 9001 ' + ((Q.S.checklists || [])[0] ? Q.S.checklists[0].sections.reduce(function (t, s) { return t + s.items.length; }, 0) : 0) + '문항 + 세메스 SSQ 자체평가 45항목', 'audit'],
      ['⚑', '조직·부서별 업무', '대표이사 · 구매·개발·품질·제조 4개 팀 · 부서별 담당 프로세스·절차서·기록', 'org']
    ];
    h += '<div class="quick">' + quick.map(function (q) { return '<div class="card" data-go="' + q[3] + '"><div class="n">' + E(q[0]) + '</div><b>' + E(q[1]) + '</b><span>' + E(q[2]) + '</span></div>'; }).join('') + '</div>';
    /* 이행실적(기록) 즉시 착수 대상 = SSQ 연계 + 주기 매일/매주/매월 양식 */
    var now = forms.filter(function (f) { return Q.ssqOf(f.code).length && /매일|매주|매월|수시/.test(f.cycle || ''); }).slice(0, 14);
    h += '<div class="card"><h2>이행실적(기록) 즉시 착수 대상</h2><p class="small muted" style="margin-top:-6px">세메스 SSQ는 기준(문서)과 이행실적(기록)을 함께 확인합니다. 아래 기록은 배포 즉시 작성하여 최소 3개월 연속 기록을 확보해야 합니다.</p>' +
      Q.table([{ label: '양식번호', html: function (f) { return '<a class="code" href="#/forms/' + E(f.code) + '">' + E(f.code) + '</a>'; } }, { label: '양식명', html: function (f) { return E(f.title) + (isNew(f) ? '<span class="badge-new">신규</span>' : ''); } },
        { label: '관련 SSQ', html: function (f) { return sqChips(f.code); } }, { label: '작성 부서', k: function (f) { return (Q.doc(f.doc) || {}).owner || ''; } },
        { label: '최근 작성', k: function (f) { var l = lastRec(f); return l || '-'; } }], now) + '</div>';
    /* 처리할 일 */
    var a = Q.alerts(), todo = [];
    a.ncr.forEach(function (n) { todo.push(['부적합 기한초과', n.no + ' ' + n.title, 'ncr/' + n.id]); });
    a.audit.forEach(function (x) { todo.push(['심사 지적 기한초과', (x.f.no || '') + ' ' + (x.f.text || '').slice(0, 40), 'audit/' + x.a.id + '/find']); });
    a.reg.forEach(function (x) { todo.push([x.reg.dueLabel || x.reg.title, (x.row[x.reg.titleKey] || '') + ' — ' + x.row[x.reg.due], 'reg/' + x.reg.key]); });
    a.m4.forEach(function (c4) { todo.push(['4M 변경 미완료', c4.item, 'change4m']); });
    a.kpi.forEach(function (k) { todo.push(['KPI 미달', k.name, 'kpi']); });
    if (todo.length) h += '<div class="card"><h2>이번 달 할 일 <span class="chip">' + todo.length + '</span></h2>' + Q.table([{ label: '구분', html: function (t) { return Q.chip(t[0], 'warn'); } }, { label: '내용', html: function (t) { return '<a href="#/' + E(t[2]) + '">' + E(t[1]) + '</a>'; } }], todo, { max: 360 }) + '</div>';
    return h;
  }, { noHead: true });
  function lastRec(f) {
    var ds = (Q.S.records[f.code] || []).map(function (r) { return r.date; });
    if (f.register) ds = ds.concat((Q.S.registers[f.register] || []).map(function (r) { return r.date || r.updated || r.created; }));
    ds = ds.filter(Boolean).sort(); return ds[ds.length - 1];
  }

  /* ───────── 1. 품질매뉴얼 ───────── */
  Q.route('manual', '품질매뉴얼 (QM-01)', function () {
    var c = Q.S.company, d = Q.doc('QM-01') || {};
    var h = '<div class="grid g2"><div class="card"><dl class="kv"><dt>문서번호</dt><dd><span class="code">QM-01</span> <span class="badge-rev">Rev.' + E(d.rev || '01') + '</span></dd><dt>적용 표준</dt><dd>' + E(c.standard) + '</dd><dt>적용범위</dt><dd>' + E(c.scope) + '</dd><dt>적용제외</dt><dd>' + E(c.exclusions) + '</dd>' +
      '<dt>작성 / 승인</dt><dd>' + E((c.manualRevs[0] || {}).by || '') + ' / ' + E((c.manualRevs[0] || {}).appr || '') + '</dd></dl><div class="row" style="margin-top:14px">' + dlBtn('QM-01', '매뉴얼 원본 다운로드') + '<button class="btn" data-go="company/policy">품질방침·목표</button></div></div>' +
      '<div class="card"><h2>품질방침</h2><p class="small">' + E(c.policy.intro) + '</p><ol class="small">' + c.policy.items.map(function (i) { return '<li><b>' + E(i.t) + '</b> — ' + E(i.d) + '</li>'; }).join('') + '</ol></div></div>';
    h += '<div class="card"><h2>품질목표</h2>' + Q.table([{ label: '연계 방침', k: 'policy' }, { label: '목표', k: 'name' }, { label: '목표값', k: 'target' }, { label: '책임', k: 'owner' }, { label: '평가', k: 'eval' }], c.objectives) + '</div>';
    var ch = { 4: '조직상황', 5: '리더십', 6: '기획', 7: '지원', 8: '운용', 9: '성과평가', 10: '개선' };
    h += '<div class="card"><h2>매뉴얼 구성 (ISO 9001 4~10장)</h2>' + Object.keys(ch).map(function (n) {
      var cls = (S().clauses || []).filter(function (x) { return x.no.split('.')[0] === n; });
      return '<details' + (n === '4' ? ' open' : '') + ' style="border-top:1px solid var(--line);padding:8px 0"><summary><b>제' + n + '장 ' + ch[n] + '</b> <span class="small muted">' + cls.length + '개 조항</span></summary>' +
        Q.table([{ label: '조항', html: function (x) { return '<a class="code" href="#/clauses/' + E(x.no) + '">' + E(x.no) + '</a>'; } }, { label: '요구사항', html: function (x) { return '<b>' + E(x.title) + '</b><div class="small muted">' + E(x.manual || x.summary) + '</div>'; } },
          { label: '관련 문서', html: function (x) { return (x.docs || []).map(function (k) { return '<a class="code" href="#/docs/' + E(k) + '">' + E(k) + '</a>'; }).join(' '); } }], cls) + '</details>';
    }).join('') + '</div>';
    return h;
  });

  /* ───────── 2. 프로세스·절차·지침·양식 ───────── */
  var origDocs = Q.routes.docs.fn;
  Q.routes.docs.fn = function (args) {
    if (args[0] === '_issues' || args[0] === '_revlog') return origDocs(args);
    if (args[0]) return docPage(Q.doc(args[0]));
    var P = S().processes || [], st = Q.S.settings.portalDocType || '';
    var h = '<div class="chips" style="margin-bottom:14px">' + [['', '전체'], ['MP', 'MP 경영'], ['COP', 'COP 고객지향'], ['SP', 'SP 지원']].map(function (t) { return '<button class="' + (st === t[0] ? 'on' : '') + '" data-act="pdocType" data-t="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '<span class="sp"></span><button class="btn" data-act="docCsv">문서등록대장 CSV</button><button class="btn pri" data-go="newdoc">신규 제정</button></div>';
    P.filter(function (p) { return !st || p.type === st; }).forEach(function (p) {
      var ds = docsOf(p.code);
      h += '<div class="card"><h2>' + Q.typeChip(p.type) + ' <a class="code" href="#/docs/' + E(p.code) + '">' + E(p.code) + '</a> ' + E(p.name) + ' 프로세스<span class="sp"></span><span class="small muted">오너 ' + E(p.owner) + ' · 절차서 ' + ds.filter(function (d) { return d.level === '절차서'; }).length + ' · 지침서 ' + ds.filter(function (d) { return d.level === '지침서'; }).length + '</span></h2>' +
        Q.table([{ label: '문서번호', html: function (d) { return '<a class="code" href="#/docs/' + E(d.code) + '">' + E(d.code) + '</a>'; } }, { label: '문서명', html: function (d) { return E(d.title) + (isNew(d) ? '<span class="badge-new">신규</span>' : ''); } }, { label: '구분', k: 'level' },
          { label: '소속 양식', html: function (d) { return formsOf(d.code).map(function (f) { return '<a class="code" href="#/forms/' + E(f.code) + '">' + E(f.code) + '</a> ' + E(f.title); }).join('<br>'); } },
          { label: '연계 SSQ', html: function (d) { return sqChips(d.code); } }, { label: 'Rev', k: 'rev' }], ds, { rowAttr: function (d) { return ' class="click" data-go="docs/' + E(d.code) + '"'; } }) + '</div>';
    });
    return h;
  };
  Q.routes.docs.crumb = function (a) { var d = Q.doc(a[0]); return d ? d.level : a[0] === '_revlog' ? '원본 대비 수정 내역' : '정합성'; };
  Q.routes.docs.headHtml = function (a) {
    if (!a[0]) return '프로세스·절차·지침·양식';
    var d = Q.doc(a[0]); if (!d) return E(a[0]);
    return '<span class="code">' + E(d.code) + '</span> ' + E(d.title) + (isNew(d) ? '<span class="badge-new">신규</span>' : '') + '<span class="badge-rev">Rev.' + E(d.rev || '0') + '</span>';
  };
  Q.on('pdocType', function (el) { Q.S.settings.portalDocType = el.getAttribute('data-t'); Q.save(); Q.rerender(); });

  /* PDCA 분류 */
  function pdcaOf(step, i, n) {
    var t = (step.t || '') + ' ' + (step.d || '');
    if (/계획|수립|기준|선정|정의|지정|요청|입수|접수|검토 요청|기획|설정/.test(step.t || '')) return 'PLAN';
    if (/점검|검사|확인|평가|측정|분석|심사|모니터|검증|판정/.test(step.t || '')) return 'CHECK';
    if (/조치|개선|시정|보고|승인|폐기|이관|등록|회수|보관|유지|교육|배포|갱신|피드백/.test(step.t || '')) return 'ACTION';
    if (i === 0 && n > 2) return 'PLAN';
    return /점검|검사|확인/.test(t) ? 'CHECK' : 'DO';
  }
  function pdcaHtml(d) {
    var steps = d.steps || []; if (!steps.length) return '';
    var g = { PLAN: [], DO: [], CHECK: [], ACTION: [] };
    steps.forEach(function (s, i) { g[pdcaOf(s, i, steps.length)].push(s); });
    var cols = [];
    ['PLAN', 'DO', 'CHECK', 'ACTION'].forEach(function (k) {
      var arr = g[k]; if (!arr.length) return;
      if (arr.length > 4 && (k === 'DO' || k === 'ACTION')) { var m = Math.ceil(arr.length / 2); cols.push([k, arr.slice(0, m)]); cols.push([k, arr.slice(m)]); }
      else cols.push([k, arr]);
    });
    return '<div class="card"><h2>업무 흐름 (PDCA)<span class="sp"></span><button class="btn sm" onclick="window.print()">현장 게시용 인쇄</button></h2><div class="pdca">' + cols.map(function (c) {
      var who = {}, fs = {};
      c[1].forEach(function (s) { (s.who || '').split(/[,·/]/).forEach(function (w) { w = w.trim(); if (w) who[w] = 1; }); (s.forms || []).forEach(function (f) { fs[f] = 1; }); });
      return '<div class="col"><h4>' + c[0] + '</h4><ul>' + c[1].map(function (s) { return '<li title="' + E(s.d || '') + '">' + E(s.t) + '</li>'; }).join('') + '</ul>' +
        (Object.keys(who).length ? '<div class="who">담당: ' + E(Object.keys(who).join(', ')) + '</div>' : '') +
        (Object.keys(fs).length ? '<div class="fcodes">' + Object.keys(fs).map(function (f) { return '<a class="code" href="#/forms/' + E(f) + '">' + E(f) + '</a>'; }).join(' ') + '</div>' : '') + '</div>';
    }).join('') + '</div></div>';
  }
  function docPage(d) {
    if (!d) return '<div class="empty">문서를 찾을 수 없습니다</div>';
    var p = Q.proc(d.process), kpis = (Q.S.kpis || []).filter(function (k) { return k.doc === d.code || (d.level === '프로세스' && k.proc === d.code); });
    if (!kpis.length && d.kpis) kpis = d.kpis.map(function (t) { return { name: t, txt: true }; });
    var fs = formsOf(d.code);
    var h = '<div class="grid" style="grid-template-columns:1.25fr 1fr"><div class="card"><dl class="kv"><dt>유형</dt><dd>' + E(d.level) + '</dd><dt>ISO 조항</dt><dd>' + (d.clauses || []).map(function (c) { var cl = Q.clause(c); return '<a href="#/clauses/' + E(c) + '">' + E(c + (cl ? ' ' + cl.title : '')) + '</a>'; }).join(', ') + '</dd>' +
      '<dt>주관부서</dt><dd><a href="#/org/' + E(d.owner || '') + '">' + E(d.owner || '-') + '</a></dd>' + (p && d.code !== p.code ? '<dt>상위 프로세스</dt><dd>' + docLink(p.code) + '</dd>' : '') +
      '<dt>목적</dt><dd>' + E(d.purpose || '-') + '</dd><dt>적용범위</dt><dd>' + E(d.scope || '-') + '</dd>' + (d.retention ? '<dt>기록 보존</dt><dd>' + E(d.retention) + '</dd>' : '') + '</dl>' +
      '<div class="row" style="margin-top:14px">' + dlBtn(d.code, '원본 다운로드') + (Q.origFile(d.code) ? '' : '<span class="small muted">신규 제정 문서 — 신규 제정 권고 폴더 참조</span>') + '<button class="btn" data-act="docEdit" data-code="' + E(d.code) + '">정보 수정</button>' +
      (d.status === '개정중' || d.status === '제정 예정' ? '<button class="btn" data-act="docApprove" data-code="' + E(d.code) + '">' + (d.status === '제정 예정' ? '제정 승인' : '개정 승인') + '</button>' : '<button class="btn" data-act="docRevise" data-code="' + E(d.code) + '">개정 요청</button>') + '</div></div>' +
      '<div class="card"><h2>성과지표 (KPI)</h2>' + (kpis.length ? Q.table([{ label: '지표', html: function (k) { return k.txt ? E(k.name) : '<a href="#/kpi">' + E(k.name) + '</a>'; } }, { label: '목표', html: function (k) { return k.txt ? '' : Q.kpiTarget(k); } }, { label: '주기', k: function (k) { return k.cycle || ''; } }], kpis) : '<div class="empty small">연결된 KPI 없음</div>') +
      (sqChips(d.code) ? '<h3>연계 세메스 SSQ</h3><div>' + sqChips(d.code) + '</div>' : '') + '</div></div>';
    h += pdcaHtml(d);
    if (d.resp && d.resp.length) h += '<div class="card"><h2>책임과 권한</h2>' + Q.table([{ label: '부서/직책', k: 'who' }, { label: '책임과 권한', k: 'what' }], d.resp) + '</div>';
    if (d.steps && d.steps.length) h += '<details class="card"><summary><b>업무 절차 상세 (' + d.steps.length + '단계)</b></summary><ol class="flow" style="margin-top:12px">' + d.steps.map(function (s) {
      return '<li><b>' + E(s.t) + '</b>' + (s.d ? '<div class="pre small">' + E(s.d) + '</div>' : '') + '<div class="who">' + (s.who ? '담당: ' + E(s.who) : '') + (s.forms && s.forms.length ? ' · 기록: ' + s.forms.map(function (fc) { return '<a href="#/forms/' + E(fc) + '">' + E(fc) + '</a>'; }).join(', ') : '') + '</div></li>';
    }).join('') + '</ol></details>';
    h += '<div class="card"><h2>소속 양식(기록물) ' + fs.length + '종</h2>' + Q.table([
      { label: '양식번호', html: function (f) { return '<a class="code" href="#/forms/' + E(f.code) + '">' + E(f.code) + '</a>'; } }, { label: '양식명', k: 'title' },
      { label: '구분', html: function (f) { return isNew(f) ? '<span class="badge-new">신규</span>' : '<span class="small muted">보유</span>'; } },
      { label: '연계 SSQ', html: function (f) { return sqChips(f.code); } }, { label: '작성 주기', k: function (f) { return f.cycle || ''; } },
      { label: '', html: function (f) { return (Q.origFile(f.code) ? '<a href="' + E(Q.origFile(f.code)) + '" download>다운로드</a> · ' : '') + '<a href="#/forms/' + E(f.code) + '">작성</a>'; } }], fs, { empty: '소속 양식 없음' }) + '</div>';
    var hist = (Q.S.docHistory[d.code] || []);
    h += '<div class="card"><h2>개정 이력</h2>' + Q.table([{ label: '일자', k: 'date' }, { label: '구분', k: 'kind' }, { label: 'Rev', k: 'rev' }, { label: '내용', k: 'text' }, { label: '처리자', k: 'by' }],
      [{ date: d.date || '', kind: '제정', rev: '0', text: isNew(d) ? '신규 제정 (세메스 SSQ 대응)' : 'ISO 9001:2015 최초 작성', by: '' }].concat(hist)) + '</div>';
    return h;
  }

  /* ───────── 양식 미리보기 (기존 forms 화면 머리 교체) ───────── */
  Q.routes.forms.crumb = function (a) { var f = Q.form(a[0]); return f ? f.doc + ' › 미리보기' : ''; };
  Q.routes.forms.headHtml = function (a) { var f = a[0] && Q.form(a[0]); return f ? '<span class="code">' + E(f.code) + '</span> ' + E(f.title) + (isNew(f) ? '<span class="badge-new">신규</span>' : '') : '기록 작성 (전자양식)'; };
  var origForms = Q.routes.forms.fn;
  Q.routes.forms.fn = function (args) {
    var f = args[0] && Q.form(args[0]);
    if (!f || args[1]) return origForms(args);
    var top = '<div class="row no-print" style="margin-bottom:12px"><a class="btn" href="#/docs/' + E(f.doc) + '">← 문서 정보</a>' + dlBtn(f.code, '원본 다운로드') + '<button class="btn" onclick="window.print()">인쇄</button>' + (sqChips(f.code) ? '<span class="small muted" style="margin-left:8px">연계</span>' + sqChips(f.code) : '') + '</div>';
    return top + origForms(args).replace(/^<div class="row no-print"[\s\S]*?<\/div>/, '');
  };

  /* ───────── 3. 프로세스맵·문서체계도 ───────── */
  var origPmap = Q.routes.pmap.fn, origLink = Q.routes.link.fn;
  Q.routes.pmap.fn = function (args) {
    var tab = args[0] || 'map';
    if (Q.proc(tab)) return origPmap(args);
    var h = Q.tabs('pm', [['map', '프로세스 맵', 'pmap/map'], ['tree', '문서체계도', 'pmap/tree'], ['rel', '프로세스 상호관계', 'pmap/rel'], ['ssq', 'SSQ↔ISO 매핑표', 'pmap/ssq']], tab);
    if (tab === 'map') {
      var m = origPmap([]); return h + m.split('<div class="card"><h2>프로세스 상호관계표')[0];
    }
    if (tab === 'rel') { var r = origPmap([]); var i = r.indexOf('<div class="card"><h2>프로세스 상호관계표'); return h + r.slice(i) + respMatrix(); }
    if (tab === 'ssq') return h + origLink([]);
    /* 문서체계도 */
    h += '<div class="card"><p class="small" style="margin-top:0">문서 계층: <b>QM</b> 품질매뉴얼 → <b>MP</b> 프로세스 → <b>MD</b> 절차서 → <b>MI</b> 지침서 → <b>양식</b>(문서번호-3자리). 번호 CC = ISO 9001 조항(04~10), nn = 일련번호.</p><div class="tbl-wrap"><table class="tbl"><thead><tr><th>구분</th><th>프로세스</th><th>오너</th><th>절차서</th><th>소속 양식</th><th>지침서</th><th>소속 양식</th></tr></thead><tbody>';
    (S().processes || []).forEach(function (p) {
      var mds = docsOf(p.code).filter(function (d) { return d.level === '절차서'; }), mis = docsOf(p.code).filter(function (d) { return d.level === '지침서'; });
      var n = Math.max(mds.length, mis.length, 1);
      for (var i = 0; i < n; i++) {
        var md = mds[i], mi = mis[i];
        h += '<tr>' + (i === 0 ? '<td rowspan="' + n + '">' + Q.typeChip(p.type) + '</td><td rowspan="' + n + '"><a class="code" href="#/docs/' + E(p.code) + '">' + E(p.code) + '</a><br>' + E(p.name) + ' 프로세스</td><td rowspan="' + n + '">' + E(p.owner) + '</td>' : '') +
          '<td>' + (md ? '<a class="code" href="#/docs/' + E(md.code) + '">' + E(md.code) + '</a><br>' + E(md.title) : '') + '</td><td class="small">' + (md ? formsOf(md.code).map(function (f) { return '<a class="code" href="#/forms/' + E(f.code) + '">' + E(f.code) + '</a> ' + E(f.title); }).join('<br>') : '') + '</td>' +
          '<td>' + (mi ? '<a class="code" href="#/docs/' + E(mi.code) + '">' + E(mi.code) + '</a><br>' + E(mi.title) : '') + '</td><td class="small">' + (mi ? formsOf(mi.code).map(function (f) { return '<a class="code" href="#/forms/' + E(f.code) + '">' + E(f.code) + '</a> ' + E(f.title); }).join('<br>') : '') + '</td></tr>';
      }
    });
    return h + '</tbody></table></div></div>';
  };
  Q.routes.pmap.title = function (a) { return a[0] && Q.proc(a[0]) ? '프로세스 · ' + Q.proc(a[0]).name : '프로세스 맵 · 문서체계도 · 매핑'; };
  Q.routes.pmap.crumb = function (a) { return Q.proc(a[0]) ? a[0] : ''; };
  /* SSQ 항목 상세는 link/<no> 그대로, 머리만 포털식 */
  Q.routes.link.title = function (a) { if (!a[0]) return 'SSQ↔ISO 매핑표'; var it = null; (S().custEval || { sections: [] }).sections.forEach(function (s) { s.items.forEach(function (i) { if (String(i.no) === a[0]) it = i; }); }); return 'SSQ ' + a[0] + ' ' + (it ? it.q.slice(0, 40) : ''); };
  function respMatrix() {
    var depts = (Q.S.company.depts || []).filter(function (d) { return d.procs && d.procs.length; });
    return '<div class="card"><h2>부서별 책임 매트릭스 (주관 ● / 협조 ○)</h2>' + Q.table([{ label: '프로세스', html: function (p) { return '<a class="code" href="#/docs/' + E(p.code) + '">' + E(p.code) + '</a> ' + E(p.name) + ' 프로세스'; } }].concat(depts.map(function (d) {
      return { label: d.name, html: function (p) { if (d.procs.indexOf(p.code) >= 0) return '<div style="text-align:center;color:var(--brand)">●</div>'; var helps = docsOf(p.code).some(function (doc) { return (doc.resp || []).some(function (r) { return (r.who || '').indexOf(d.name.replace('팀', '')) >= 0; }); }); return helps ? '<div style="text-align:center;color:var(--muted)">○</div>' : ''; } };
    })), S().processes || []) + '</div>';
  }

  /* ───────── 4. KPI ───────── */
  Q.route('kpi', 'KPI 성과지표', function (args) {
    var S2 = Q.S, y = +(Q.S.settings.kpiYear || new Date().getFullYear()), dep = Q.S.settings.kpiDept || '';
    var months = []; for (var i = 1; i <= 12; i++) months.push(y + '-' + String(i).padStart(2, '0'));
    var all = S2.kpis || [], ownerOf = function (k) { return k.owner || ((Q.proc(k.proc) || {}).owner) || '기타'; };
    var depts = {}; all.forEach(function (k) { var o = ownerOf(k); depts[o] = (depts[o] || 0) + 1; });
    var list = all.filter(function (k) { return !dep || ownerOf(k) === dep; });
    var inp = list.filter(function (k) { var a = S2.kpiActuals[k.id] || {}; return months.some(function (m) { return Q.num(a[m]) !== null; }); });
    var cells = 0, ok = 0; list.forEach(function (k) { var a = S2.kpiActuals[k.id] || {}; months.forEach(function (m) { if (Q.num(a[m]) !== null) { cells++; if (Q.kpiOk(k, a[m])) ok++; } }); });
    var prov = list.filter(function (k) { return k.provisional || Q.num(k.target) === null; }).length;
    var h = '<div class="tiles" style="grid-template-columns:repeat(4,1fr)"><div class="tile"><div class="v">' + list.length + '</div><div class="s">등록 성과지표</div></div><div class="tile"><div class="v">' + inp.length + '</div><div class="s">' + y + '년 실적 입력 지표</div></div>' +
      '<div class="tile"><div class="v">' + (cells ? Math.round(100 * ok / cells) + '%' : '—') + '</div><div class="s">월별 목표 달성률 (입력분 기준)</div></div><div class="tile"><div class="v">' + prov + '</div><div class="s">목표값 업체 확정 대기 지표</div></div></div>';
    h += '<div class="row" style="margin-bottom:14px">연도 <select data-chg="kpiYear" style="padding:7px 10px;border-radius:8px;border:1px solid var(--line-2)">' + [y - 1, y, y + 1].map(function (v) { return '<option' + (v === y ? ' selected' : '') + '>' + v + '</option>'; }).join('') + '</select>' +
      '<span class="muted" style="margin-left:8px">부서</span><div class="chips"><button class="' + (!dep ? 'on' : '') + '" data-act="kpiDept" data-d="">전체</button>' + Object.keys(depts).map(function (d) { return '<button class="' + (dep === d ? 'on' : '') + '" data-act="kpiDept" data-d="' + E(d) + '">' + E(d) + '<i>' + depts[d] + '</i></button>'; }).join('') + '</div>' +
      '<span class="sp"></span><button class="btn" data-act="kpiAuto">기록에서 자동 집계</button><button class="btn" data-act="kpiCsv" data-y="' + y + '">CSV</button><button class="btn" data-act="kpiNew">지표 추가</button></div>';
    var key = list.filter(function (k) { return k.objective; }).slice(0, 4);
    if (key.length) h += '<div class="grid" style="grid-template-columns:repeat(' + Math.min(3, key.length) + ',1fr);margin-bottom:16px">' + key.map(function (k) {
      var a = S2.kpiActuals[k.id] || {};
      return '<div class="card" style="margin:0"><h2 style="margin-bottom:2px">' + E(k.name) + '</h2><div class="small"><span class="code">QM-01</span> · ' + E(k.owner || '') + ' · 목표 ' + Q.kpiTarget(k) + '</div>' +
        Q.lineChart([{ data: months.map(function (m) { return Q.num(a[m]); }), color: 'var(--brand)', flag: function (v) { return !Q.kpiOk(k, v); } }], { labels: months.map(function (m) { return (+m.slice(5)) + '월'; }), h: 200, zero: true, lines: [{ v: Q.num(k.target), label: '목표', color: 'var(--good)' }] }) + '</div>';
    }).join('') + '</div>';
    var prov2 = list.filter(function (k) { return k.provisional; }).length;
    if (prov2) h += '<div class="card" style="border-left:4px solid var(--warn)"><div class="row"><div style="flex:1"><b>초기 목표값 ' + prov2 + '개</b> <span class="small muted">— 노란 칸의 목표값을 고치면 업체 확정 목표로 바뀌고 변경 이력이 남습니다. 지금 값으로 쓰려면 "전체 확정"을 누르세요.</span></div><button class="btn" data-act="kpiConfirmAll">전체 확정</button></div></div>';
    var groups = {}; list.forEach(function (k) { var g = k.objective ? '전사 (품질매뉴얼)' : ((Q.proc(k.proc) || {}).name || '기타') + ' 프로세스'; (groups[g] = groups[g] || []).push(k); });
    Object.keys(groups).forEach(function (g) {
      h += '<div class="card"><h2>' + E(g) + ' <span class="chip">' + groups[g].length + '</span></h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th style="min-width:230px">성과지표</th><th>목표</th><th>부서</th><th>주기</th>' + months.map(function (m) { return '<th>' + (+m.slice(5)) + '월</th>'; }).join('') + '<th>달성</th></tr></thead><tbody>' +
        groups[g].map(function (k) {
          var a = S2.kpiActuals[k.id] || {}, vs = months.filter(function (m) { return Q.num(a[m]) !== null; }), okn = vs.filter(function (m) { return Q.kpiOk(k, a[m]); }).length;
          return '<tr><td><a href="#" data-act="kpiEdit" data-k="' + E(k.id) + '"><b>' + E(k.name) + '</b></a><div class="small muted"><span class="code">' + E(k.objective ? 'QM-01' : (k.doc || k.proc || '')) + '</span> · ' + E(k.formula || '') + '</div></td>' +
            '<td style="white-space:nowrap">' + (k.dir === 'down' ? '≤' : '≥') + '<input class="mono" style="width:66px;' + (k.provisional ? 'border-color:var(--warn);background:var(--warn-soft)' : '') + '" data-chg="kpiTarget" data-k="' + E(k.id) + '" value="' + E(k.target === null || k.target === undefined ? '' : k.target) + '">' + E(k.unit || '') + '</td><td>' + E(ownerOf(k)) + '</td><td>' + E(k.cycle || '') + '</td>' +
            months.map(function (m) { var v = a[m], bad = Q.num(v) !== null && !Q.kpiOk(k, v); return '<td style="padding:3px"><input class="mono" style="width:54px;' + (bad ? 'color:var(--crit);font-weight:700' : '') + '" data-chg="kpiSet" data-k="' + E(k.id) + '" data-m="' + m + '" value="' + E(v === undefined || v === null ? '' : v) + '"></td>'; }).join('') +
            '<td class="n">' + (vs.length ? Math.round(100 * okn / vs.length) + '%' : '—') + '</td></tr>';
        }).join('') + '</tbody></table></div></div>';
    });
    return h + '<button class="btn pri no-print" style="position:fixed;right:28px;bottom:24px;box-shadow:var(--shadow);padding:11px 20px" data-act="kpiSave">실적 저장</button>';
  });
  Q.on('kpiYear', function (el) { Q.S.settings.kpiYear = +el.value; Q.save(); Q.rerender(); });
  Q.on('kpiDept', function (el) { Q.S.settings.kpiDept = el.getAttribute('data-d'); Q.save(); Q.rerender(); });
  Q.on('kpiSave', function () { Q.save(true); Q.toast('실적을 저장했습니다'); });

  /* ───────── 5. 내부심사 (ISO + SSQ) ───────── */
  var origAudit = Q.routes.audit.fn, origCe = Q.routes.custeval.fn;
  function curAudit() {
    var a = (Q.S.audits || []).filter(function (x) { return x.status !== '완료'; })[0];
    if (!a) { a = { id: Q.uid('aud'), title: new Date().getFullYear() + '년 정기 내부심사', date: Q.today(), auditors: '', depts: [], checklist: (Q.S.checklists[0] || {}).id, status: '계획', results: {}, findings: [], by: Q.me(), scope: 'ISO 9001:2015 전 조항 / QM-01 및 하위 절차서' }; Q.S.audits.unshift(a); Q.save(); }
    return a;
  }
  Q.routes.audit.fn = function (args) {
    if (args[0] && args[0] !== 'iso' && args[0] !== 'ssq' && args[0] !== 'sum') return origAudit(args);
    var tab = args[0] || 'iso', a = curAudit(), ck = (Q.S.checklists || []).filter(function (c) { return c.id === a.checklist; })[0] || Q.S.checklists[0];
    var nIso = ck ? ck.sections.reduce(function (t, s) { return t + s.items.length; }, 0) : 0;
    var h = '<div class="card"><div class="row"><b>심사일</b><input type="date" data-chg="audHdr" data-k="date" value="' + E(a.date) + '" style="padding:8px;border:1px solid var(--line-2);border-radius:8px">' +
      '<b style="margin-left:8px">심사원</b><input data-chg="audHdr" data-k="auditors" placeholder="성명" value="' + E(a.auditors) + '" style="padding:8px;border:1px solid var(--line-2);border-radius:8px">' +
      '<b style="margin-left:8px">피심사부서</b><input data-chg="audHdr" data-k="depts" placeholder="전 부서" value="' + E((a.depts || []).join(', ')) + '" style="padding:8px;border:1px solid var(--line-2);border-radius:8px">' +
      '<select data-chg="audHdr" data-k="checklist" style="padding:8px;border:1px solid var(--line-2);border-radius:8px">' + (Q.S.checklists || []).map(function (c) { return '<option value="' + E(c.id) + '"' + (c.id === a.checklist ? ' selected' : '') + '>' + E(c.title) + '</option>'; }).join('') + '</select>' +
      '<span class="sp"></span><button class="btn pri" data-act="audSave" data-id="' + a.id + '">심사 결과 저장</button></div></div>';
    h += Q.tabs('aud2', [['iso', 'ISO 9001 체크시트 (' + nIso + ')', 'audit/iso'], ['ssq', '세메스 SSQ 자체평가 (45)', 'audit/ssq'], ['sum', '결과 요약·지적사항', 'audit/sum']], tab);
    if (tab === 'iso') {
      var got = 0, max = 0; ck.sections.forEach(function (s) { s.items.forEach(function (it) { var j = ((a.results || {})[it.no] || {}).j; if (!j || j === 'NA') return; var w = Q.num(it.weight) || 1; max += w * 10; got += w * ({ L: 10, M: 5, H: 0 })[j]; }); });
      var full = ck.sections.reduce(function (t, s) { return t + s.items.reduce(function (u, it) { return u + (Q.num(it.weight) || 1) * 10; }, 0); }, 0);
      h += '<p class="muted">RISK 등급 L=10 · M=5 · H=0, 문항 점수 = 가중치 × RISK. 현재 ' + Q.fmt(got, 1) + ' / ' + Q.fmt(full, 1) + '점 (' + (full ? Q.fmt(100 * got / full, 1) : 0) + '%) <span class="sp"></span><button class="btn sm" data-act="audToSsq" data-id="' + a.id + '">판정을 SSQ 자체평가에 반영</button></p>';
      ck.sections.forEach(function (s) {
        h += '<div class="card"><h2>' + E(s.name) + '</h2>' + s.items.map(function (it) {
          var r = (a.results || {})[it.no] || {}, ssq = Q.ssqForCk ? Q.ssqForCk(a.checklist, it.no) : [];
          return '<div class="ckitem"><div><div class="no">' + E(it.ref || it.no) + '</div><div class="small muted">가중치 ' + E(it.weight || 1) + '</div></div><div><div>' + E(it.q) + '</div>' +
            '<div class="meta">' + (it.clause ? '근거: ISO ' + E(it.clause) + ' · ' : '') + (it.evidence ? '증빙: ' + E(it.evidence) : '') + ' ' + ssq.map(function (n) { return '<a class="sqchip" href="#/link/' + E(n) + '">SSQ ' + E(n) + '</a>'; }).join('') + '</div>' +
            '<textarea placeholder="점검 결과 (5W1H 상세 작성)" data-chg="audNote" data-id="' + a.id + '" data-no="' + E(it.no) + '">' + E(r.note || '') + '</textarea></div>' +
            '<div class="audbtn">' + [['L', '양호(L)'], ['M', '보완(M)'], ['H', '미흡(H)'], ['NA', '해당없음']].map(function (j) { return '<button class="btn sm' + (r.j === j[0] ? ' j' + j[0] : '') + '" data-act="audJ" data-id="' + a.id + '" data-no="' + E(it.no) + '" data-j="' + j[0] + '">' + j[1] + '</button>'; }).join('') +
            (r.j === 'M' || r.j === 'H' ? '<button class="btn sm" data-act="findNew" data-id="' + a.id + '" data-no="' + E(it.no) + '">지적 등록</button>' : '') + '</div></div>';
        }).join('') + '</div>';
      });
      return h;
    }
    if (tab === 'ssq') {
      var list = Q.S.registers.custEvals = Q.S.registers.custEvals || [];
      if (!list.length) { list.unshift({ id: Q.uid('ce'), date: Q.today(), by: Q.me(), r: {} }); Q.save(); }
      return h + origCe([list[0].id]).replace(/^<div class="row no-print"[\s\S]*?<\/div>/, '');
    }
    /* 결과 요약 */
    return h + origAudit([]);
  };
  Q.routes.audit.title = function (a) { return a[0] && ['iso', 'ssq', 'sum'].indexOf(a[0]) < 0 ? '내부심사 상세' : '내부심사 체크시트'; };
  Q.on('audHdr', function (el) {
    var a = curAudit(), k = el.getAttribute('data-k');
    a[k] = k === 'depts' ? el.value.split(/[,，]/).map(function (s) { return s.trim(); }).filter(Boolean) : el.value; Q.save();
  });
  Q.on('audSave', function (el) { var a = Q.S.audits.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0]; if (a.status === '계획') a.status = '진행'; Q.save(true); Q.toast('심사 결과를 저장했습니다 (결과 요약 탭에서 완료 처리)'); });

  /* ───────── 업무 운영 캘린더 ───────── */
  var CYC = [['매일', '매일 (작업·교대 시)'], ['매주', '매주'], ['매월', '매월'], ['분기', '분기'], ['반기', '반기'], ['년', '연 1회'], ['수시', '발생 시 (수시)']];
  var CYC_DAYS = { '매일': 1, '매주': 7, '매월': 31, '분기': 92, '반기': 183, '년': 366 };
  Q.route('calendar', '업무 운영 캘린더', function () {
    var dep = Q.S.settings.calDept || '', forms = S().forms || [];
    var depts = {}; forms.forEach(function (f) { var o = (Q.doc(f.doc) || {}).owner; if (o) depts[o] = 1; });
    var h = '<div class="row" style="margin-bottom:14px"><span class="muted">부서</span><div class="chips"><button class="' + (!dep ? 'on' : '') + '" data-act="calDept" data-d="">전체</button>' + Object.keys(depts).map(function (d) { return '<button class="' + (dep === d ? 'on' : '') + '" data-act="calDept" data-d="' + E(d) + '">' + E(d) + '</button>'; }).join('') + '</div><span class="sp"></span><button class="btn" onclick="window.print()">현장 게시용 인쇄</button></div>';
    h += '<div class="card"><h2>운영 규칙 (문서관리 → 기록 → 점검 → 심사)</h2><div class="rules4">' +
      '<div class="col"><b>1. 문서 개정</b>개정 요청 → 주관부서 초안 → 품질팀 검토 → 대표이사 승인 → 문서체계표·표준목록 동시 갱신 → 구본 회수·현장 게시본 교체<div class="code" style="margin-top:6px">MD-0702 · MI-0701</div></div>' +
      '<div class="col"><b>2. 기록 작성</b>이 시스템의 「기록 작성」에서 작성하거나 최신 양식을 내려받아 사용 → 실측값과 판정 기재 → 부서장 확인(결재) → 보존기간 동안 보관<div class="code" style="margin-top:6px">MD-0702</div></div>' +
      '<div class="col"><b>3. 월간 점검</b>매월 첫 주 KPI 실적 입력 → 목표 미달 지표는 MD-1001 개선활동 등록 → 경영검토 보고<div class="code" style="margin-top:6px">MD-0901 · MD-1001</div></div>' +
      '<div class="col"><b>4. 내부심사</b>연 1회 이상 ISO 체크시트 + 세메스 SSQ 자체평가 실시 → 지적사항 시정조치 요구서 발행 → 완료 1개월 후 유효성 확인<div class="code" style="margin-top:6px">MD-0902</div></div></div></div>';
    CYC.forEach(function (c) {
      var fs = forms.filter(function (f) { return (f.cycle || '수시') === c[0] && (!dep || (Q.doc(f.doc) || {}).owner === dep); });
      if (!fs.length) return;
      h += '<div class="card"><h2>' + E(c[1]) + ' <span class="chip">' + fs.length + '종</span></h2>' + Q.table([
        { label: '양식번호', html: function (f) { return '<a class="code" href="#/forms/' + E(f.code) + '">' + E(f.code) + '</a>'; } },
        { label: '기록(양식)명', html: function (f) { var nowB = Q.ssqOf(f.code).length && CYC_DAYS[f.cycle] && CYC_DAYS[f.cycle] <= 31; return E(f.title) + (isNew(f) ? '<span class="badge-new">신규</span>' : '') + (nowB ? '<span class="badge-now">즉시 착수</span>' : ''); } },
        { label: '근거 문서', html: function (f) { return docLink(f.doc); } }, { label: '작성 부서', k: function (f) { return (Q.doc(f.doc) || {}).owner || ''; } },
        { label: '연계 SSQ', html: function (f) { return sqChips(f.code); } },
        { label: '이행 상태', html: function (f) { var l = lastRec(f); if (!CYC_DAYS[f.cycle]) return l ? '<span class="small">' + E(l) + '</span>' : ''; if (!l) return Q.chip('미작성', 'crit'); var late = -Q.daysUntil(l) - CYC_DAYS[f.cycle]; return late > 0 ? Q.chip(late + '일 지연', 'warn') : Q.chip('정상 ' + l.slice(5), 'good'); } },
        { label: '', html: function (f) { return (Q.origFile(f.code) ? '<a href="' + E(Q.origFile(f.code)) + '" download>양식 받기</a> · ' : '') + '<a href="#/forms/' + E(f.code) + '">작성</a>'; } }], fs) + '</div>';
    });
    return h;
  });
  Q.on('calDept', function (el) { Q.S.settings.calDept = el.getAttribute('data-d'); Q.save(); Q.rerender(); });

  /* ───────── 조직·부서별 업무 ───────── */
  /* 조직도_(주)MST.pdf 기준 (대표이사 → 구매팀 · 개발팀 · 품질팀 · 제조팀) */
  var ORG = [
    { name: '구매팀', duty: ['자재 매입 계획수립', '신규 업체 발굴', '자재, 부자재 원가절감', '발주 및 납품, 납기 일정 관리'] },
    { name: '개발팀', duty: ['신제품 개발', '품질 및 생산성 향상을 위한 소재 및 공정 개발', 'Trouble Shooting', '원인, 결과분석, 실험 계획 등 양산 적용'] },
    { name: '품질팀', duty: ['고객사 / SSQ Audit 대응', '품질표준작업 수행', '수입 / 공정 / 출하 품질현황 관리', 'NCR 대응 및 조치, 이력관리', '업체 품질 및 변경점 관리'] },
    { name: '제조팀', duty: ['생산품 제작 계획수립', '생산품 공정 이력 및 자재관리', '공정표준작업 수행', '현장 설비 관리', '공정(Lapping, Polishing) 진행'] }
  ];
  Q.route('org', '조직도 및 부서별 업무분장', function (args) {
    var c = Q.S.company, depts = (c.depts || []).filter(function (d) { return d.procs && d.procs.length; });
    if (args[0]) {
      var d = depts.filter(function (x) { return x.name === args[0]; })[0]; if (!d) return '<div class="empty">부서 없음</div>';
      var docs = (Q.S.docs || []).filter(function (x) { return x.owner === d.name; }), fs = (S().forms || []).filter(function (f) { return (Q.doc(f.doc) || {}).owner === d.name; }), ks = (Q.S.kpis || []).filter(function (k) { return (k.owner || '') === d.name; });
      return '<div class="row" style="margin-bottom:12px"><a class="btn" href="#/org">← 조직도</a></div><div class="card"><h2>' + E(d.name) + ' 주관 문서 ' + docs.length + '</h2>' + Q.table([{ label: '문서', html: function (x) { return docLink(x.code); } }, { label: '구분', k: 'level' }], docs) + '</div>' +
        '<div class="card"><h2>' + E(d.name) + ' 작성 기록 ' + fs.length + '</h2>' + Q.table([{ label: '양식', html: function (f) { return formLink(f.code); } }, { label: '주기', k: function (f) { return f.cycle || ''; } }, { label: '최근 작성', k: function (f) { return lastRec(f) || '-'; } }], fs) + '</div>' +
        '<div class="card"><h2>' + E(d.name) + ' KPI ' + ks.length + '</h2>' + Q.table([{ label: '지표', k: 'name' }, { label: '목표', html: function (k) { return Q.kpiTarget(k); } }, { label: '주기', k: 'cycle' }], ks) + '</div>';
    }
    var ceo = (Q.S.users || []).filter(function (u) { return u.role === '대표이사'; })[0] || { name: c.ceo };
    var staff = function (dn) { return (Q.S.users || []).filter(function (u) { return u.dept === dn; }); };
    var cnt = function (dn) { var procs = (depts.filter(function (x) { return x.name === dn; })[0] || { procs: [] }).procs; return '프로세스 ' + procs.length + ' · 문서 ' + (Q.S.docs || []).filter(function (x) { return x.owner === dn; }).length + ' · KPI ' + (Q.S.kpis || []).filter(function (k) { return k.owner === dn; }).length; };
    var direct = depts.filter(function (d) { return !ORG.some(function (o) { return o.name === d.name; }); });
    var h = '<div class="card"><div class="org"><div class="box"><small>대표이사</small><b>' + E(ceo.name) + '</b></div><div class="line"></div>' +
      (direct.length ? '<div class="box" style="border-style:dashed" data-go="org/' + E(direct[0].name) + '"><small>대표이사 직속 기능</small><b>' + E(direct.map(function (d) { return d.name.replace('팀', ''); }).join('·')) + '</b><small>' + E(direct.map(function (d) { return d.procs.join(', '); }).join(' / ')) + '</small></div><div class="line"></div>' : '') +
      '<div class="depts">' + ORG.map(function (o) {
        var ss = staff(o.name);
        return '<div class="dept" data-go="org/' + E(o.name) + '"><b>' + E(o.name) + '</b><div class="small muted">' + E(ss.length ? ss.map(function (u) { return u.name + (u.role ? ' ' + u.role : ''); }).join(', ') : '담당자 지정') + '</div><ul>' + o.duty.map(function (t) { return '<li>' + E(t) + '</li>'; }).join('') + '</ul><div class="cnts">' + cnt(o.name) + '</div></div>';
      }).join('') + '</div><p class="small muted">출처: 조직도_(주)MST · 부서를 누르면 해당 부서의 절차서·기록·KPI를 볼 수 있습니다. <a href="img/org-chart.pdf" target="_blank">원본 조직도 (PDF)</a></p></div></div>';
    return h + respMatrix();
  });
  Q.routes.org.crumb = function (a) { return a[0] || ''; };

  /* ───────── 신규 제정 ───────── */
  Q.route('newdoc', '신규 제정', function () {
    var st = Q.S.settings.newdoc || { kind: '양식', parent: 'MD-0804' };
    var parents = (Q.S.docs || []).filter(function (d) { return d.level !== '매뉴얼'; });
    var code = nextCode(st.kind, st.parent, st.clause);
    return '<div class="card"><div class="form"><div class="fld"><label>종류</label><select data-chg="ndSet" data-k="kind">' + ['프로세스', '절차서', '지침서', '양식'].map(function (k) { return '<option' + (st.kind === k ? ' selected' : '') + '>' + k + '</option>'; }).join('') + '</select></div>' +
      (st.kind === '양식' ? '<div class="fld"><label>소속 표준문서</label><select data-chg="ndSet" data-k="parent">' + parents.map(function (d) { return '<option value="' + E(d.code) + '"' + (st.parent === d.code ? ' selected' : '') + '>' + E(d.code + ' ' + d.title) + '</option>'; }).join('') + '</select></div>'
        : '<div class="fld"><label>ISO 9001 조항 (번호 CC)</label><select data-chg="ndSet" data-k="clause">' + ['4', '5', '6', '7', '8', '9', '10'].map(function (c) { return '<option value="' + c + '"' + (String(st.clause || '8') === c ? ' selected' : '') + '>' + c + '장</option>'; }).join('') + '</select></div>') +
      '<div class="fld full"><label>자동 부여 번호</label><div class="bignum">' + E(code) + '</div></div>' +
      '<div class="fld full"><label>문서명</label><input id="ndTitle" placeholder="예: 클린룸 차압 점검표"></div>' +
      '<div class="fld"><label>주관부서</label>' + Q.input({ k: 'ndDept', type: 'dept' }, '품질팀') + '</div><div class="fld"><label>관련 SSQ 항목</label><input id="ndSsq" placeholder="예: 31, 35"></div>' +
      '<div class="fld"><label>작성 주기 (양식)</label><select id="ndCycle">' + ['매일', '매주', '매월', '분기', '반기', '년', '수시'].map(function (c) { return '<option>' + c + '</option>'; }).join('') + '</select></div><div class="fld"><label>작성자</label><input id="ndBy" value="' + E(Q.me()) + '"></div>' +
      '<div class="fld full"><label>제정 사유</label><input id="ndWhy" placeholder="예: 세메스 SSQ 32 Particle 관리 기록 신설"></div></div>' +
      '<div class="row end" style="margin-top:14px"><button class="btn pri" data-act="ndCreate" data-code="' + E(code) + '">신규 제정 등록</button></div></div>' +
      '<div class="card"><h2>번호 부여 규칙</h2><div class="rulebox">QM-01          품질매뉴얼\nMP-CCnn        프로세스        CC = ISO 9001 조항(04~10), nn = 일련번호\nMD-CCnn        절차서\nMI-CCnn        지침서\nMD-CCnn-000    절차서 소속 양식 (3자리 일련번호)\nMI-CCnn-000    지침서 소속 양식\n\n※ 접두 M = 품질경영시스템(Management System) 약호\n※ 파일명 규칙: 문서번호_문서명_V1.확장자  (예: MD-0804_공정 관리 절차서_V1.xlsx)\n※ 문서 1건 개정 시 동시 갱신: ① 문서체계표·표준목록·양식 마스터 ② 해당 문서 표지 개정이력(사유 + SSQ 항목) ③ 상호참조 문서의 「관련 표준」</div></div>';
  });
  function nextCode(kind, parent, clause) {
    if (kind === '양식') {
      var used = (S().forms || []).map(function (f) { return f.code; }).concat(Object.keys(Q.S.newForms || {})).filter(function (c) { return c.indexOf(parent + '-') === 0; }).map(function (c) { return +c.slice(-3); });
      return parent + '-' + String((used.length ? Math.max.apply(null, used) : 0) + 1).padStart(3, '0');
    }
    return Q.suggestCode(kind, String(clause || 8));
  }
  Q.on('ndSet', function (el) { var st = Q.S.settings.newdoc = Q.S.settings.newdoc || { kind: '양식', parent: 'MD-0804' }; st[el.getAttribute('data-k')] = el.value; Q.save(); Q.rerender(); });
  Q.on('ndCreate', function (el) {
    var code = el.getAttribute('data-code'), st = Q.S.settings.newdoc || {}, title = Q.$('#ndTitle').value.trim();
    if (!title) { Q.toast('문서명을 입력하세요'); return; }
    var dept = Q.$('[name="ndDept"]').value, why = Q.$('#ndWhy').value, ssq = Q.$('#ndSsq').value.split(/[,\s]+/).filter(Boolean);
    if (st.kind === '양식') {
      var f = { code: code, title: title, doc: st.parent, cycle: Q.$('#ndCycle').value, proposed: true, approval: ['작성', '검토', '승인'] };
      (Q.S.userForms = Q.S.userForms || []).push(f); window.SEED.forms.push(f);
      ssq.forEach(function (n) { var l = (window.SEED.ssqLink || {})[n]; if (l) { l.xforms = (l.xforms || []).concat([code]); } });
    } else {
      var d = { code: code, title: title, level: st.kind, process: (Q.doc(st.parent) || {}).process || 'MP-0803', owner: dept, clauses: [String(st.clause || 8)], rev: '0', date: Q.today(), status: '제정 예정', steps: [], resp: [], proposed: true };
      Q.S.docs.push(d);
    }
    Q.histAdd(code, '제정', '0', why || '신규 제정'); Q.save(); Q.toast(code + ' 등록 — 문서체계에 반영했습니다'); Q.go(st.kind === '양식' ? 'forms/' + code : 'docs/' + code);
  });

  /* ───────── 정합성 검증·제개정 기록 ───────── */
  Q.route('verify', '문서 정합성 검증', function () {
    var r = Q.consistency(), err = r.filter(function (x) { return x[0] === '오류'; }), warn = r.filter(function (x) { return x[0] !== '오류'; });
    var hist = []; Object.keys(Q.S.docHistory || {}).forEach(function (c) { (Q.S.docHistory[c] || []).forEach(function (x) { hist.push({ code: c, date: x.date, kind: x.kind, rev: x.rev, text: x.text, by: x.by }); }); });
    hist.sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });
    var h = '<p class="muted" style="margin-top:-8px">문서번호 중복 · 양식번호와 소속 문서 체계 · 문서체계도 연결 · 없는 문서 참조 · 개정 상태 · SSQ 매핑·KPI 근거 문서를 자동 점검합니다. <button class="btn sm" data-act="rerun">다시 검사</button></p>' +
      '<div class="tiles" style="grid-template-columns:repeat(4,1fr)"><div class="tile"><div class="v">' + (Q.S.docs || []).length + '</div><div class="s">표준문서</div></div><div class="tile"><div class="v">' + (S().forms || []).length + '</div><div class="s">양식</div></div>' +
      '<div class="tile"><div class="v" style="color:var(--crit)">' + err.length + '</div><div class="s">오류</div></div><div class="tile"><div class="v" style="color:var(--warn)">' + warn.length + '</div><div class="s">점검 사항</div></div></div>';
    h += '<div class="card">' + (err.length ? Q.table([{ label: '구분', html: function (x) { return Q.chip(x[0], 'crit'); } }, { label: '항목', k: 1 }, { label: '대상', k: 2 }], err) : '<b style="color:var(--good)">이상 없음</b> — 모든 문서가 번호 체계·문서체계도·SSQ 매핑과 정렬되어 있습니다.') +
      (warn.length ? '<details style="margin-top:12px"><summary class="small">점검 사항 ' + warn.length + '건 보기</summary>' + Q.table([{ label: '항목', k: 1 }, { label: '대상', k: 2 }], warn) + '</details>' : '') + '</div>';
    h += '<div class="card"><h2>문서 번호 정정 (원본 문서체계표 대비)</h2>' + Q.table([{ label: '#', k: 'no' }, { label: '원본', k: 'text' }, { label: '정정', k: function (i) { return i.resolved || i.fix; } }], (S().docIssues || []).filter(function (i) { return i.resolved; })) + '</div>';
    h += '<div class="card"><h2>문서 제·개정·폐지 기록 (' + hist.length + ')</h2>' + (hist.length ? Q.table([{ label: '일자', k: 'date' }, { label: '문서', html: function (x) { return docLink(x.code); } }, { label: '구분', k: 'kind' }, { label: 'Rev', k: 'rev' }, { label: '내용', k: 'text' }, { label: '처리자', k: 'by' }], hist) : '<p class="muted">아직 시스템에서 등록한 제·개정이 없습니다.</p>') + '</div>';
    h += '<div class="card"><h2>원본 대비 정정 내역 <span class="sp"></span><a class="small" href="#/docs/_revlog">전체 보기 →</a></h2><p class="small muted">오타 · 타사 명칭 · 타사 문서번호 · 표준 명칭 정정 ' + (S().revisionLog || []).length + '건</p></div>';
    return h;
  });

  /* ───────── 용어 사전 ───────── */
  var ISO_TERMS = [
    ['품질경영시스템 (QMS)', '품질에 관하여 조직을 지휘하고 관리하는 경영시스템'], ['프로세스', '입력을 사용하여 의도된 결과를 만들어 내는, 상호 관련되거나 상호 작용하는 활동의 집합'],
    ['문서화된 정보', '조직이 관리하고 유지하도록 요구되는 정보 및 그 정보가 포함되어 있는 매체 (유지 = 문서, 보유 = 기록)'], ['리스크', '불확실성의 영향'],
    ['부적합', '요구사항의 불충족'], ['시정조치', '부적합의 원인을 제거하고 재발을 방지하기 위한 조치'], ['시정', '발견된 부적합을 제거하기 위한 행위'],
    ['특채', '규정된 요구사항에 적합하지 않은 제품 또는 서비스를 사용하거나 불출하는 것에 대한 허가'], ['역량', '의도된 결과를 달성하기 위해 지식과 스킬을 적용하는 능력'],
    ['검증', '규정된 요구사항이 충족되었음을 객관적 증거를 제시하여 확인하는 것'], ['실현성 확인 (Validation)', '특정하게 의도된 용도 또는 적용에 대한 요구사항이 충족되었음을 객관적 증거를 제시하여 확인하는 것'],
    ['추적성', '대상의 이력, 적용 또는 위치를 추적하기 위한 능력'], ['교정', '측정기가 표시하는 값과 표준값의 관계를 확인하는 일련의 작업'],
    ['외부공급자', '조직의 일부가 아닌 공급자 (협력사)'], ['고객만족', '고객의 기대가 어느 정도까지 충족되었는지에 대한 고객의 인식'],
    ['내부심사', '조직이 스스로 수행하는 제1자 심사'], ['경영검토', '최고경영자가 계획된 주기로 QMS의 적절성·충족성·효과성을 검토하는 활동'],
    ['4M 변경', 'Man·Machine·Material·Method(+Measurement) 변경점 관리'], ['SPC', '통계적 공정관리 — 관리도로 공정 변동을 감시'], ['MSA', '측정시스템 분석 — 반복성·재현성(Gage R&R) 평가'],
    ['Cpk', '공정능력지수 — 공정 평균의 치우침을 고려한 능력 지수 (1.33 이상 충분)'], ['CTQ', '고객에게 중요한 품질 특성 (Critical To Quality)'], ['SSQ', '세메스(SEMES) 협력사 품질 평가 (Audit Check Sheet)']
  ];
  Q.route('glossary', '용어 사전', function () {
    var q = Q.S.settings.glossQ || '', terms = ISO_TERMS.map(function (t) { return { t: t[0], d: t[1], src: 'ISO 9000' }; });
    (Q.S.docs || []).forEach(function (d) { (d.terms || []).forEach(function (t) { terms.push({ t: t.t, d: t.d, src: d.code }); }); });
    var seen = {}; terms = terms.filter(function (t) { var k = (t.t || '').replace(/\s/g, ''); if (seen[k]) return false; seen[k] = 1; return true; });
    var list = terms.filter(function (t) { return Q.match(t, q); }).sort(function (a, b) { return a.t.localeCompare(b.t, 'ko'); });
    return '<div class="card"><div class="row"><input data-chg="glossQ" placeholder="용어 검색" value="' + E(q) + '" style="flex:1;padding:10px 14px;border:1px solid var(--line-2);border-radius:9px"><span class="muted">' + list.length + '개</span></div></div><div class="card">' +
      Q.table([{ label: '용어', html: function (t) { return '<b>' + E(t.t) + '</b>'; } }, { label: '정의', k: 'd' }, { label: '출처', html: function (t) { return t.src === 'ISO 9000' ? '<span class="small muted">KS Q ISO 9000</span>' : '<a class="code" href="#/docs/' + E(t.src) + '">' + E(t.src) + '</a>'; } }], list) + '</div>';
  });
  Q.on('glossQ', function (el) { Q.S.settings.glossQ = el.value; Q.rerender(); });

  /* ───────── 번호체계·문서관리 규칙 ───────── */
  Q.route('rules', '번호체계·문서관리 규칙', function () {
    var g = Q.routes.guide.fn(['rules']), a = Q.routes.guide.fn(['audit']), t = Q.routes.guide.fn(['tools']);
    var strip = function (x) { return x.replace(/^<div class="tabs"[\s\S]*?<\/div>/, ''); };
    return strip(g) + '<h2 style="margin:22px 0 10px">내부심사원 실무 (ISO 19011)</h2>' + strip(a) + '<h2 style="margin:22px 0 10px">SPC·MSA 판정 기준</h2>' + strip(t);
  });

  /* SPC·MSA 한 메뉴 */
  var origSpc = Q.routes.spc.fn;
  Q.routes.spc.fn = function (args) { return Q.tabs('sm', [['spc', 'SPC 관리도 (X̄-R · Cpk)', 'spc'], ['msa', 'MSA Gage R&R', 'msa']], 'spc') + origSpc(args); };
  var origMsa = Q.routes.msa.fn;
  Q.routes.msa.fn = function (args) { return Q.tabs('sm', [['spc', 'SPC 관리도 (X̄-R · Cpk)', 'spc'], ['msa', 'MSA Gage R&R', 'msa']], 'msa') + origMsa(args); };

  /* 사용자가 등록한 신규 양식을 기준 데이터에 붙임 */
  var origFinal = Q.finalizeSeed;
  Q.finalizeSeed = function () { origFinal(); };
  var origLoad = Q.load;
  Q.load = function () { origLoad(); (Q.S.userForms || []).forEach(function (f) { if (!Q.form(f.code)) window.SEED.forms.push(f); }); };
})();
