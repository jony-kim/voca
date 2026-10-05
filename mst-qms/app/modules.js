/* MST QMS — 내부심사 · 고객사 평가 대응 · 경영검토 · 교육훈련 · 가이드 · 설정 */
(function () {
  'use strict';
  var Q = window.Q, E = Q.esc;

  /* ───────── 내부심사 (MD-0902) ───────── */
  var RISK = { L: 10, M: 5, H: 0 };   /* 문항점수 = 가중치 × RISK(L 양호 10 · M 보완 5 · H 미흡 0) */
  var GRADES = ['중부적합', '경부적합', '관찰사항'];
  function ckById(id) { return (Q.S.checklists || []).filter(function (c) { return c.id === id; })[0]; }
  function auditScore(a) {
    var ck = ckById(a.checklist); if (!ck) return null;
    var got = 0, max = 0, cnt = { L: 0, M: 0, H: 0, NA: 0, '': 0 };
    ck.sections.forEach(function (s) { s.items.forEach(function (it) {
      var r = (a.results || {})[it.no] || {}, j = r.j || '';
      cnt[j] = (cnt[j] || 0) + 1;
      if (j === 'NA' || !j) return;
      var w = Q.num(it.weight) || 1; max += w * 10; got += w * RISK[j];
    }); });
    return { got: got, max: max, pct: max ? Math.round(100 * got / max) : 0, cnt: cnt };
  }
  Q.route('audit', function (a) { return a[0] ? '내부심사 · 상세' : '내부심사'; }, function (args) {
    if (args[0]) return auditDetail((Q.S.audits || []).filter(function (x) { return x.id === args[0]; })[0], args[1] || 'check');
    var all = Q.S.audits || [];
    var findings = [].concat.apply([], all.map(function (a) { return (a.findings || []).map(function (f) { return { a: a, f: f }; }); }));
    var h = '<div class="tiles"><div class="tile"><div class="k">심사 회차</div><div class="v">' + all.length + '</div><div class="s">완료 ' + all.filter(function (a) { return a.status === '완료'; }).length + '</div></div>' +
      GRADES.map(function (g) { return '<div class="tile ' + (g === '중부적합' ? 'crit' : g === '경부적합' ? 'warn' : '') + '"><div class="k">' + g + '</div><div class="v">' + findings.filter(function (x) { return x.f.grade === g; }).length + '</div><div class="s">미결 ' + findings.filter(function (x) { return x.f.grade === g && x.f.status !== '종결'; }).length + '</div></div>'; }).join('') + '</div>';
    h += '<div class="card"><h2>내부심사 계획·실시 (MD-0902-001) <span class="sp"></span><button class="btn pri sm" data-act="auditNew">심사 계획 등록</button></h2>' +
      Q.table([{ label: '심사일', k: 'date' }, { label: '심사명', html: function (a) { return '<b>' + E(a.title) + '</b>'; } }, { label: '피심사 부서', k: function (a) { return (a.depts || []).join(', '); } }, { label: '심사원', k: 'auditors' },
        { label: '체크시트', k: function (a) { return (ckById(a.checklist) || {}).title || ''; } }, { label: '점수', html: function (a) { var s = auditScore(a); return s && s.max ? '<b class="num">' + s.pct + '%</b>' : '-'; } },
        { label: '지적', n: 1, k: function (a) { return (a.findings || []).length; } }, { label: '상태', html: function (a) { return Q.statusChip(a.status); } }], all,
      { rowAttr: function (a) { return ' class="click" data-go="audit/' + a.id + '"'; }, empty: '등록된 심사가 없습니다 — 연 1회 이상 전 프로세스 심사 (9.2)' }) + '</div>';
    h += '<div class="card"><h2>시정조치요구서 관리대장 (MD-0902-005)</h2>' + Q.table([
      { label: '번호', k: function (x) { return x.f.no; } }, { label: '심사', k: function (x) { return x.a.title; } }, { label: '등급', html: function (x) { return Q.chip(x.f.grade, x.f.grade === '중부적합' ? 'crit' : x.f.grade === '경부적합' ? 'warn' : ''); } },
      { label: '조항', k: function (x) { return x.f.clause; } }, { label: '부적합 진술', k: function (x) { return x.f.text; } }, { label: '부서', k: function (x) { return x.f.dept; } },
      { label: '기한', html: function (x) { return Q.dueChip(x.f.due, x.f.status === '종결'); } }, { label: '상태', html: function (x) { return Q.statusChip(x.f.status); } }
    ], findings, { rowAttr: function (x) { return ' class="click" data-go="audit/' + x.a.id + '/find"'; }, empty: '지적사항 없음' }) + '</div>';
    return h;
  });
  var AUDIT_F = [{ k: 'title', label: '심사명', req: true, def: new Date().getFullYear() + '년 정기 내부심사' }, { k: 'date', label: '심사일', type: 'date', def: Q.today(), req: true },
    { k: 'checklist', label: '체크시트', type: 'select', options: [] }, { k: 'auditors', label: '심사원 (팀장 먼저, 쉼표 구분)', req: true },
    { k: 'deptsTxt', label: '피심사 부서 (쉼표 구분)', def: '관리팀, 품질팀, 개발팀, 구매팀, 제조팀, 영업팀' }, { k: 'scope', label: '심사 범위·기준', type: 'textarea', rows: 2, def: 'ISO 9001:2015 전 조항 / QM-01 및 하위 절차서' },
    { k: 'focus', label: '중점 사항 (이전 지적·고객불만·변경점)', type: 'textarea', rows: 2 }];
  function auditFields() { AUDIT_F[2].options = (Q.S.checklists || []).filter(function (c) { return c.type !== 'customer'; }).map(function (c) { return c.id; }); return AUDIT_F; }
  Q.on('auditNew', function () {
    var f = auditFields();
    Q.modal('내부심사 계획 (MD-0902-001)', Q.formHtml(f, { checklist: (Q.S.checklists[0] || {}).id }) + '<p class="small muted">체크시트: ' + (Q.S.checklists || []).map(function (c) { return E(c.id + ' = ' + c.title); }).join(' / ') + '</p>', [{ label: '취소' }, { label: '등록', cls: 'pri', fn: function (m) {
      var o = Q.readForm(m, f); if (!o) return false;
      o.depts = o.deptsTxt.split(/[,，]/).map(function (s) { return s.trim(); }).filter(Boolean); delete o.deptsTxt;
      o.id = Q.uid('aud'); o.status = '계획'; o.results = {}; o.findings = []; o.by = Q.me();
      Q.S.audits.unshift(o); Q.save(); Q.go('audit/' + o.id);
    } }]);
  });
  function independenceWarn(a) {
    var auds = (a.auditors || '').split(/[,，]/).map(function (s) { return s.trim(); });
    var bad = [];
    auds.forEach(function (n) { var u = Q.S.users.filter(function (x) { return x.name === n; })[0]; if (u && (a.depts || []).indexOf(u.dept) >= 0) bad.push(n + '(' + u.dept + ')'); });
    return bad.length ? '<p class="small" style="color:var(--warn)">⚠ 독립성: ' + E(bad.join(', ')) + ' — 자기 부서 문항은 다른 심사원이 심사하세요 (9.2.2 c)</p>' : '';
  }
  function auditDetail(a, tab) {
    if (!a) return '<div class="empty">심사 없음</div>';
    var ck = ckById(a.checklist), sc = auditScore(a);
    var h = '<div class="row no-print" style="margin-bottom:12px"><a href="#/audit">← 내부심사</a><span class="sp"></span>' +
      (a.status !== '완료' ? '<button class="btn" data-act="auditStatus" data-id="' + a.id + '">' + (a.status === '계획' ? '심사 시작' : '심사 완료 처리') + '</button>' : '') +
      '<button class="btn danger" data-act="auditDel" data-id="' + a.id + '">삭제</button></div>';
    h += '<div class="card"><h2>' + E(a.title) + '<span class="sp"></span>' + Q.statusChip(a.status) + '</h2><dl class="kv"><dt>심사일</dt><dd>' + E(a.date) + '</dd><dt>심사원</dt><dd>' + E(a.auditors) + '</dd><dt>피심사 부서</dt><dd>' + E((a.depts || []).join(', ')) + '</dd><dt>범위·기준</dt><dd class="pre">' + E(a.scope || '') + '</dd>' + (a.focus ? '<dt>중점 사항</dt><dd class="pre">' + E(a.focus) + '</dd>' : '') + '</dl>' + independenceWarn(a) + '</div>';
    h += Q.tabs('aud', [['check', '체크시트 판정 (MD-0902-002)', 'audit/' + a.id + '/check'], ['find', '지적사항·시정조치 (MD-0902-003)', 'audit/' + a.id + '/find'], ['report', '심사 결과 보고서 (MD-0902-004)', 'audit/' + a.id + '/report']], tab);
    if (tab === 'check') {
      if (!ck) return h + '<div class="empty">체크시트를 찾을 수 없습니다</div>';
      h += '<div class="tiles"><div class="tile"><div class="k">점수</div><div class="v" id="audScore">' + sc.got + ' / ' + sc.max + '</div><div class="s">' + sc.pct + '% (판정 문항 기준)</div></div>' +
        ['L', 'M', 'H', 'NA'].map(function (k) { return '<div class="tile"><div class="k">' + ({ L: '양호 L', M: '보완 M', H: '미흡 H', NA: '해당없음' })[k] + '</div><div class="v">' + (sc.cnt[k] || 0) + '</div></div>'; }).join('') +
        '<div class="tile"><div class="k">미판정</div><div class="v">' + (sc.cnt[''] || 0) + '</div></div></div>';
      if (window.SEED.ssqLink && Object.keys(window.SEED.ssqLink).some(function (k) { return ((window.SEED.ssqLink[k].ck || {})[a.checklist] || []).length; }))
        h += '<div class="card" style="border-left:3px solid var(--mp)"><div class="row"><div style="flex:1"><b>세메스 SSQ 연동</b><div class="small muted">이 체크시트 문항은 SSQ 항목과 1:1로 연결되어 있습니다(보라색 SSQ 표시). 판정을 SSQ 자체점검으로 넘기면 L=만점, M=절반, H=0점으로 채점됩니다.</div></div><button class="btn" data-act="audToSsq" data-id="' + a.id + '">SSQ 자체점검에 반영</button></div></div>';
      h += '<p class="small muted">판정: L 양호(가중치×10) · M 보완(×5) · H 미흡(×0) · NA 해당없음. M/H 판정 문항은 "지적 등록"으로 시정조치요구서를 만드세요. 메모는 5W1H(언제·어디서·무엇을·누구·증거)로 기록.</p>';
      ck.sections.forEach(function (s) {
        h += '<div class="card"><h2>' + E(s.name) + '</h2>' + s.items.map(function (it) {
          var r = (a.results || {})[it.no] || {};
          return '<div style="border-bottom:1px solid var(--line);padding:10px 0"><div class="row" style="align-items:flex-start"><b class="mono" style="min-width:32px">' + E(it.no) + '</b><div style="flex:1"><div>' + E(it.q) + '</div>' +
            (it.criteria ? '<div class="small muted pre">' + E(it.criteria) + '</div>' : '') +
            '<div class="small muted">' + (it.sub ? E(it.sub) + ' · ' : '') + (it.clause ? 'ISO <a href="#/clauses/' + E(it.clause) + '">' + E(it.clause) + '</a> · ' : '') + '가중치 ' + E(it.weight || 1) + (it.evidence ? ' · 증빙: ' + E(it.evidence) : '') +
            (Q.ssqForCk ? Q.ssqForCk(a.checklist, it.no).map(function (n) { return ' <a class="chip mp" href="#/link/' + E(n) + '">SSQ ' + E(n) + '</a>'; }).join('') : '') + '</div></div>' +
            '<div class="row" style="gap:3px">' + ['L', 'M', 'H', 'NA'].map(function (j) { return '<button class="btn sm' + (r.j === j ? ' pri' : '') + '" data-act="audJ" data-id="' + a.id + '" data-no="' + E(it.no) + '" data-j="' + j + '">' + j + '</button>'; }).join('') +
            ((r.j === 'M' || r.j === 'H') ? '<button class="btn sm" data-act="findNew" data-id="' + a.id + '" data-no="' + E(it.no) + '">지적 등록</button>' : '') + '</div></div>' +
            '<input style="width:100%;margin-top:6px;padding:5px 8px;border:1px solid var(--line);border-radius:5px" placeholder="점검 결과 메모 (5W1H)" data-chg="audNote" data-id="' + a.id + '" data-no="' + E(it.no) + '" value="' + E(r.note || '') + '"></div>';
        }).join('') + '</div>';
      });
    } else if (tab === 'find') {
      h += '<div class="card"><h2>지적사항 <span class="sp"></span><button class="btn sm pri" data-act="findNew" data-id="' + a.id + '">지적 등록</button></h2>' +
        '<p class="small muted">부적합 진술 = ① 요구사항(조항·문서번호) + ② 객관적 증거(언제·어디서·무엇을·누구) + ③ 부적합 내용. 사람이 아닌 시스템을 지적합니다.</p>' +
        Q.table([{ label: '번호', k: 'no' }, { label: '등급', html: function (f) { return Q.chip(f.grade, f.grade === '중부적합' ? 'crit' : f.grade === '경부적합' ? 'warn' : ''); } }, { label: '조항', k: 'clause' },
          { label: '부적합 진술', html: function (f) { return '<b>' + E(f.text) + '</b><div class="small muted">요구사항: ' + E(f.req || '') + '<br>증거: ' + E(f.evidence || '') + '</div>'; } },
          { label: '부서', k: 'dept' }, { label: '기한', html: function (f) { return Q.dueChip(f.due, f.status === '종결'); } },
          { label: '시정조치', html: function (f) { return f.ncrId ? '<a href="#/ncr/' + E(f.ncrId) + '">' + E(f.ncrNo || '보기') + '</a>' : '<button class="btn sm" data-act="findToNcr" data-id="' + a.id + '" data-fid="' + f.id + '">시정조치 발행</button>'; } },
          { label: '상태', html: function (f) { return Q.statusChip(f.status); } }], a.findings || [], { rowAttr: function (f) { return ' class="click" data-act="findEdit" data-id="' + a.id + '" data-fid="' + f.id + '"'; } }) + '</div>';
    } else {
      h += auditReport(a, ck, sc);
    }
    return h;
  }
  function auditReport(a, ck, sc) {
    var fs = a.findings || [];
    var bySec = ck ? ck.sections.map(function (s) {
      var got = 0, max = 0; s.items.forEach(function (it) { var j = ((a.results || {})[it.no] || {}).j; if (!j || j === 'NA') return; var w = Q.num(it.weight) || 1; max += w * 10; got += w * RISK[j]; });
      return { label: s.name, v: max ? Math.round(100 * got / max) : 0, txt: max ? Math.round(100 * got / max) + '%' : '-', color: 'var(--accent)' };
    }) : [];
    return '<div class="card"><div class="row"><div style="flex:1"><div class="small muted">' + E(Q.S.company.name) + '</div><h2 style="font-size:20px">내부 심사 결과 보고서</h2><div class="small mono muted">MD-0902-004</div></div>' + Q.approvalBox(['작성', '검토', '승인']) + '</div><hr>' +
      '<dl class="kv"><dt>심사명</dt><dd>' + E(a.title) + '</dd><dt>심사일</dt><dd>' + E(a.date) + '</dd><dt>심사원</dt><dd>' + E(a.auditors) + '</dd><dt>피심사 부서</dt><dd>' + E((a.depts || []).join(', ')) + '</dd><dt>범위·기준</dt><dd>' + E(a.scope || '') + '</dd>' +
      '<dt>종합 점수</dt><dd><b>' + (sc ? sc.got + ' / ' + sc.max + ' (' + sc.pct + '%)' : '-') + '</b></dd><dt>지적 현황</dt><dd>' + GRADES.map(function (g) { return g + ' ' + fs.filter(function (f) { return f.grade === g; }).length + '건'; }).join(' · ') + '</dd></dl>' +
      (bySec.length ? '<h3>분류별 점수</h3>' + Q.barChart(bySec, { max: 100, left: 160 }) : '') +
      '<h3>지적사항</h3>' + Q.table([{ label: '번호', k: 'no' }, { label: '등급', k: 'grade' }, { label: '조항', k: 'clause' }, { label: '부적합 진술', k: 'text' }, { label: '부서', k: 'dept' }, { label: '기한', k: 'due' }, { label: '상태', k: 'status' }], fs, { empty: '지적사항 없음' }) +
      '<h3>심사 총평</h3><textarea style="width:100%;min-height:90px;padding:8px;border:1px solid var(--line-2);border-radius:6px" data-chg="audSummary" data-id="' + a.id + '" placeholder="강점, 개선 기회, 시스템 효과성 결론">' + E(a.summary || '') + '</textarea>' +
      '<div class="row end no-print" style="margin-top:8px"><button class="btn" onclick="window.print()">인쇄 / PDF</button></div></div>';
  }
  function audById(id) { return Q.S.audits.filter(function (x) { return x.id === id; })[0]; }
  Q.on('audJ', function (el) {
    var a = audById(el.getAttribute('data-id')), no = el.getAttribute('data-no'), j = el.getAttribute('data-j');
    a.results = a.results || {}; a.results[no] = a.results[no] || {};
    a.results[no].j = a.results[no].j === j ? '' : j;
    if (a.status === '계획') a.status = '진행';
    Q.save(); Q.rerender();
  });
  Q.on('audNote', function (el) { var a = audById(el.getAttribute('data-id')), no = el.getAttribute('data-no'); a.results[no] = a.results[no] || {}; a.results[no].note = el.value; Q.save(); });
  Q.on('audSummary', function (el) { audById(el.getAttribute('data-id')).summary = el.value; Q.save(); });
  Q.on('auditStatus', function (el) { var a = audById(el.getAttribute('data-id')); a.status = a.status === '계획' ? '진행' : '완료'; if (a.status === '완료') a.completed = Q.today(); Q.save(); Q.rerender(); });
  Q.on('auditDel', function (el) { Q.confirm('심사와 지적사항을 삭제할까요?', function () { Q.S.audits = Q.S.audits.filter(function (x) { return x.id !== el.getAttribute('data-id'); }); Q.save(); Q.go('audit'); }); });
  var FIND_F = [{ k: 'grade', label: '등급', type: 'select', options: GRADES, req: true }, { k: 'clause', label: 'ISO 조항 / 문서번호' }, { k: 'dept', label: '피심사 부서', type: 'dept', req: true },
    { k: 'req', label: '① 요구사항', type: 'textarea', rows: 2 }, { k: 'evidence', label: '② 객관적 증거', type: 'textarea', rows: 2 }, { k: 'text', label: '③ 부적합 진술', type: 'textarea', rows: 2, req: true },
    { k: 'due', label: '시정 기한', type: 'date' }, { k: 'status', label: '상태', type: 'select', options: ['접수', '조치중', '종결'], def: '접수' }];
  Q.on('findNew', function (el) {
    var a = audById(el.getAttribute('data-id')), no = el.getAttribute('data-no'), pre = { due: Q.addDays(Q.today(), 30), grade: '경부적합', dept: (a.depts || [])[0] || ((Q.S.users || []).filter(function (u) { return u.name === Q.me(); })[0] || {}).dept || '품질팀' };
    if (no) {
      var it = null; (ckById(a.checklist) || { sections: [] }).sections.forEach(function (s) { s.items.forEach(function (x) { if (String(x.no) === String(no)) it = x; }); });
      var r = (a.results || {})[no] || {};
      if (it) { pre.clause = it.clause; pre.req = it.q; pre.evidence = r.note || ''; pre.grade = r.j === 'H' ? '경부적합' : '관찰사항'; pre.item = no; }
    }
    Q.modal('지적 등록 (시정조치요구서 MD-0902-003)', Q.formHtml(FIND_F, pre), [{ label: '취소' }, { label: '등록', cls: 'pri', fn: function (m) {
      var o = Q.readForm(m, FIND_F); if (!o) return false;
      var y = (a.date || Q.today()).slice(2, 4), all = [].concat.apply([], Q.S.audits.map(function (x) { return x.findings || []; }));
      o.id = Q.uid('f'); o.no = 'CAR' + y + '-' + String(all.length + 1).padStart(3, '0'); o.item = pre.item;
      a.findings = a.findings || []; a.findings.push(o); Q.save(); Q.go('audit/' + a.id + '/find');
    } }]);
  });
  Q.on('findEdit', function (el, e) {
    if (e.target.closest('button,a')) return;
    var a = audById(el.getAttribute('data-id')), f = a.findings.filter(function (x) { return x.id === el.getAttribute('data-fid'); })[0];
    Q.modal('지적사항 ' + f.no, Q.formHtml(FIND_F, f), [{ label: '삭제', cls: 'danger', fn: function () { a.findings = a.findings.filter(function (x) { return x !== f; }); Q.save(); Q.rerender(); } }, { label: '취소' },
      { label: '저장', cls: 'pri', fn: function (m) { var o = Q.readForm(m, FIND_F); if (!o) return false; Object.keys(o).forEach(function (k) { f[k] = o[k]; }); Q.save(); Q.rerender(); } }]);
  });
  Q.on('findToNcr', function (el) {
    var a = audById(el.getAttribute('data-id')), f = a.findings.filter(function (x) { return x.id === el.getAttribute('data-fid'); })[0];
    Q._pendingFinding = { a: a.id, f: f.id };
    Q.newNcr({ source: '내부심사', title: '[' + f.no + '] ' + (f.text || '').slice(0, 60), dept: f.dept, due: f.due, desc: '요구사항: ' + (f.req || '') + '\n증거: ' + (f.evidence || '') + '\n부적합: ' + (f.text || ''), link: 'audit/' + a.id + '/find', severity: f.grade === '중부적합' ? 'A (고객 영향)' : 'B (사내 유출 차단)' });
  });
  /* NCR 생성/종결 시 연결 동기화 */
  var origNew = Q.newNcr;
  Q.newNcr = function (pre) {
    origNew(pre);
    var before = (Q.S.ncrs || []).length, pf = Q._pendingFinding, pc = Q._pendingCustIssue;
    Q._pendingFinding = null; Q._pendingCustIssue = null;
    var mod = Q.$('#modal'); if (!mod) return;
    var obs = setInterval(function () {
      if (Q.$('#modal') && Q.$('#modal') === mod) return;
      clearInterval(obs);
      if ((Q.S.ncrs || []).length > before) {
        var n = Q.S.ncrs[0];
        if (pf) { var a = audById(pf.a), f = a && a.findings.filter(function (x) { return x.id === pf.f; })[0]; if (f) { f.ncrId = n.id; f.ncrNo = n.no; f.status = '조치중'; } }
        if (pc) { pc.ncrNo = n.no; }
        Q.save();
      }
    }, 200);
  };
  Q.syncFindingFromNcr = function (n) {
    (Q.S.audits || []).forEach(function (a) { (a.findings || []).forEach(function (f) { if (f.ncrId === n.id) f.status = '종결'; }); });
  };

  /* ───────── 고객사 평가 대응 (세메스 SSQ Audit Check Sheet) ───────── */
  Q.route('custeval', function (a) { return a[0] ? '고객사 평가 · 자체점검' : '고객사 평가 대응'; }, function (args) {
    var ce = window.SEED.custEval;
    if (!ce) return '<div class="empty">고객사 평가 시트 데이터가 없습니다</div>';
    var list = Q.S.registers.custEvals = Q.S.registers.custEvals || [];
    if (args[0]) return custEvalDetail(ce, list.filter(function (x) { return x.id === args[0]; })[0]);
    var maxPts = ceMax(ce);
    var h = '<div class="card"><h2>' + E(ce.customer) + ' — ' + E(ce.title) + '<span class="sp"></span><button class="btn pri sm" data-act="ceNew">자체점검 시작</button></h2>' +
      '<p class="small muted">' + E(ce.note || '') + '</p><p class="small">' + E(ce.scoring || '') + '</p>' +
      '<div class="row">' + ce.sections.map(function (s) { return Q.chip(s.name + ' ' + s.items.reduce(function (t, i) { return t + (Q.num(i.points) || 0); }, 0) + '점', 'acc'); }).join(' ') + '</div>' +
      (ce.source ? '<p class="small"><a href="' + E(ce.source) + '" target="_blank" rel="noopener">원본 체크시트 열기</a></p>' : '') + '</div>';
    if (list.length) {
      var lbl = list.slice().reverse().map(function (x) { return x.date; });
      h += '<div class="card"><h2>점수 추이</h2>' + Q.lineChart([{ data: list.slice().reverse().map(function (x) { return ceScore(ce, x).got; }), color: 'var(--accent)' }], { labels: lbl, h: 180, zero: true, lines: [{ v: maxPts, label: '만점', color: 'var(--good)' }] }) + '</div>';
    }
    h += '<div class="card"><h2>자체점검 이력</h2>' + Q.table([{ label: '점검일', k: 'date' }, { label: '점검자', k: 'by' }, { label: '점수', html: function (x) { var s = ceScore(ce, x); return '<b class="num">' + Q.fmt(s.got) + '</b> / ' + Q.fmt(s.max) + ' (' + s.pct + '%)'; } },
      { label: '미흡 항목', n: 1, k: function (x) { return ceScore(ce, x).gaps; } }, { label: '과락', html: function (x) { return ceScore(ce, x).ko ? Q.chip('과락', 'crit') : Q.chip('해당 없음', 'good'); } }], list,
      { rowAttr: function (x) { return ' class="click" data-go="custeval/' + x.id + '"'; }, empty: '자체점검 기록 없음 — 고객 심사 전 최소 1회, 이후 분기 1회 권장' }) + '</div>';
    return h;
  });
  function ceMax(ce) { return ce.sections.reduce(function (t, s) { return t + s.items.reduce(function (u, i) { return u + (Q.num(i.points) || 0); }, 0); }, 0); }
  function ceScore(ce, x) {
    var got = 0, max = 0, gaps = 0, ko = false;
    ce.sections.forEach(function (s) { s.items.forEach(function (i) {
      var r = (x.r || {})[i.no] || {}, p = Q.num(i.points) || 0;
      if (i.knockout) { if (r.s === 'ko') ko = true; if (!r.s) gaps++; return; }
      if (r.na) return; max += p;
      var v = Q.num(r.s); if (v !== null) got += v;
      if (v === null || v < p) gaps++;
    }); });
    return { got: got, max: max, pct: max ? Math.round(100 * got / max) : 0, gaps: gaps, ko: ko };
  }
  function scoreOptions(i) {
    if (i.knockout) return [{ v: 'ok', t: '적합 (이상 없음)' }, { v: 'ko', t: '과락 — 총점과 무관하게 불합격' }];
    if (Array.isArray(i.criteria)) return i.criteria.map(function (c) { return { v: c.score, t: c.score + '점 — ' + c.text }; });
    var p = Q.num(i.points) || 0, o = []; for (var k = p; k >= 0; k -= (p > 4 ? 1 : 0.5)) o.push({ v: k, t: k + '점' }); return o;
  }
  Q.on('ceNew', function () {
    var list = Q.S.registers.custEvals; var prev = list[0];
    var x = { id: Q.uid('ce'), date: Q.today(), by: Q.me(), r: prev ? Q.clone(prev.r) : {} };
    list.unshift(x); Q.save(); Q.go('custeval/' + x.id); if (prev) Q.toast('직전 점검 결과를 불러왔습니다 — 변경된 항목만 수정하세요');
  });
  function custEvalDetail(ce, x) {
    if (!x) return '<div class="empty">기록 없음</div>';
    var s = ceScore(ce, x);
    var h = '<div class="row no-print" style="margin-bottom:12px"><a href="#/custeval">← 고객사 평가</a><span class="sp"></span><button class="btn" onclick="window.print()">인쇄</button><button class="btn danger" data-act="ceDel" data-id="' + x.id + '">삭제</button></div>';
    h += '<div class="tiles"><div class="tile ' + (s.pct >= 90 ? 'good' : s.pct >= 70 ? 'warn' : 'crit') + '"><div class="k">자체 점수</div><div class="v">' + Q.fmt(s.got) + ' / ' + Q.fmt(s.max) + '</div><div class="s">' + s.pct + '%</div></div>' +
      '<div class="tile ' + (s.gaps ? 'warn' : 'good') + '"><div class="k">만점 미달·미평가 항목</div><div class="v">' + s.gaps + '</div></div><div class="tile ' + (s.ko ? 'crit' : 'good') + '"><div class="k">과락 항목</div><div class="v">' + (s.ko ? '위험' : '통과') + '</div></div>' +
      '<div class="tile"><div class="k">점검일</div><div class="v" style="font-size:18px">' + E(x.date) + '</div><div class="s">' + E(x.by) + '</div></div></div>';
    h += '<div class="card"><h2>분류별 득점률</h2>' + Q.barChart(ce.sections.map(function (sec) {
      var g = 0, m = 0; sec.items.forEach(function (i) { var r = (x.r || {})[i.no] || {}; if (r.na) return; m += Q.num(i.points) || 0; g += Q.num(r.s) || 0; });
      var p = m ? Math.round(100 * g / m) : 0; return { label: sec.name, v: p, txt: Q.fmt(g) + '/' + Q.fmt(m), color: p >= 90 ? 'var(--good)' : p >= 70 ? 'var(--warn)' : 'var(--crit)' };
    }), { max: 100, left: 170 }) + '</div>';
    ce.sections.forEach(function (sec) {
      h += '<div class="card"><h2>' + E(sec.name) + '</h2>' + sec.items.map(function (i) {
        var r = (x.r || {})[i.no] || {}, v = i.knockout ? (r.s === 'ko' ? -1 : null) : Q.num(r.s), full = i.knockout ? 0 : Q.num(i.points) || 0;
        return '<div style="border-bottom:1px solid var(--line);padding:10px 0"><div class="row" style="align-items:flex-start"><b class="mono" style="min-width:30px">' + E(i.no) + '</b><div style="flex:1"><b>' + E(i.q) + '</b>' + (i.knockout ? ' ' + Q.chip('과락', 'crit') : '') +
          '<div class="small muted">' + (i.sub ? E(i.sub) + ' · ' : '') + '배점 ' + E(i.points) + (i.clause ? ' · ISO ' + E(i.clause) : '') + '</div>' +
          (Array.isArray(i.criteria) ? '<ul class="small muted" style="margin:4px 0;padding-left:18px">' + i.criteria.map(function (c) { return '<li>' + E(c.score) + '점: ' + E(c.text) + '</li>'; }).join('') + '</ul>' : (i.criteria ? '<div class="small muted pre">' + E(i.criteria) + '</div>' : '')) +
          (i.evidence ? '<div class="small">증빙: ' + E(i.evidence) + '</div>' : '') + linkLine(i.no) + '</div>' +
          '<div style="min-width:180px"><select data-chg="ceSet" data-id="' + x.id + '" data-no="' + E(i.no) + '" style="width:100%;padding:5px;border:1px solid var(--line-2);border-radius:5px;' + (v !== null && v < full ? 'color:var(--crit)' : '') + '"><option value="">미평가</option><option value="NA"' + (r.na ? ' selected' : '') + '>해당없음</option>' +
          scoreOptions(i).map(function (o) { return '<option value="' + o.v + '"' + (!r.na && r.s !== null && r.s !== undefined && String(r.s) === String(o.v) ? ' selected' : '') + '>' + E(o.t.length > 40 ? o.t.slice(0, 40) + '…' : o.t) + '</option>'; }).join('') + '</select></div></div>' +
          '<div class="row" style="margin-top:6px"><input style="flex:1;padding:5px 8px;border:1px solid var(--line);border-radius:5px" placeholder="현황·증빙 위치·보완 계획" data-chg="ceNote" data-id="' + x.id + '" data-no="' + E(i.no) + '" value="' + E(r.note || '') + '">' +
          (v !== null && v < full && !r.na ? '<button class="btn sm" data-act="ceGap" data-id="' + x.id + '" data-no="' + E(i.no) + '">보완 과제 등록</button>' : '') + '</div></div>';
      }).join('') + '</div>';
    });
    return h;
  }
  function linkLine(no) {
    if (!Q.ssqStatus || !window.SEED.ssqLink) return '';
    var st = Q.ssqStatus(no), lk = st.lk;
    return '<div class="small" style="margin-top:4px">' + (lk.clauses || []).map(function (c) { return '<a class="chip acc" href="#/clauses/' + E(c) + '">ISO ' + E(c) + '</a>'; }).join(' ') + ' ' +
      st.docs.map(function (d) { return '<a href="#/docs/' + E(d.code) + '">' + E(d.code) + '</a>'; }).join(' ') + ' ' +
      Q.chip(st.n ? '기록 ' + st.n + '건' : '기록 없음', st.rec === 'ok' ? 'good' : st.rec === 'part' ? 'warn' : 'crit') +
      (st.aud ? ' ' + Q.chip('내부심사 ' + st.aud.j, st.aud.j === 'L' ? 'good' : st.aud.j === 'H' ? 'crit' : 'warn') : '') +
      ' <a href="#/link/' + E(no) + '">연동 상세 →</a>' + (lk.gap ? '<div style="color:var(--crit)">⚠ ' + E(lk.gap) + '</div>' : '') + (lk.gapFix ? '<div style="color:var(--warn)">＋ ' + E(lk.gapFix) + '</div>' : '') + '</div>';
  }
  function ceById(id) { return Q.S.registers.custEvals.filter(function (x) { return x.id === id; })[0]; }
  Q.on('ceSet', function (el) {
    var x = ceById(el.getAttribute('data-id')), no = el.getAttribute('data-no'); x.r = x.r || {}; x.r[no] = x.r[no] || {};
    if (el.value === 'NA') { x.r[no].na = true; x.r[no].s = null; } else { x.r[no].na = false; x.r[no].s = el.value === '' ? null : (el.value === 'ok' || el.value === 'ko' ? el.value : Number(el.value)); }
    Q.save(); Q.rerender();
  });
  Q.on('ceNote', function (el) { var x = ceById(el.getAttribute('data-id')), no = el.getAttribute('data-no'); x.r[no] = x.r[no] || {}; x.r[no].note = el.value; Q.save(); });
  Q.on('ceDel', function (el) { Q.confirm('이 자체점검 기록을 삭제할까요?', function () { Q.S.registers.custEvals = Q.S.registers.custEvals.filter(function (x) { return x.id !== el.getAttribute('data-id'); }); Q.save(); Q.go('custeval'); }); });
  Q.on('ceGap', function (el) {
    var ce = window.SEED.custEval, no = el.getAttribute('data-no'), it = null;
    ce.sections.forEach(function (s) { s.items.forEach(function (i) { if (String(i.no) === String(no)) it = i; }); });
    var x = ceById(el.getAttribute('data-id')), r = x.r[no] || {};
    var list = Q.S.records['MD-1001-001'] = Q.S.records['MD-1001-001'] || [];
    list.unshift({ id: Q.uid('r'), date: Q.today(), title: '[' + ce.customer + ' SSQ ' + no + '] ' + it.q, h: {}, rows: [{ item: it.q, content: '현재 ' + (r.s === null || r.s === undefined ? '미평가' : r.s + '점') + ' / 배점 ' + it.points + (r.note ? ' — ' + r.note : ''), result: '보완 필요', remark: it.evidence || '' }], by: Q.me(), status: '작성' });
    Q.save(); Q.toast('개선 활동 보고서(MD-1001-001)에 보완 과제를 등록했습니다');
  });

  /* ───────── 경영검토 (MD-0901) ───────── */
  Q.route('review', function (a) { return a[0] ? '경영검토 보고서' : '경영검토'; }, function (args) {
    if (args[0]) return reviewDetail(Q.S.reviews.filter(function (r) { return r.id === args[0]; })[0]);
    var acts = [].concat.apply([], Q.S.reviews.map(function (r) { return (r.actions || []).map(function (x) { return { r: r, x: x }; }); }));
    return '<div class="card"><h2>경영검토 이력 (9.3) <span class="sp"></span><button class="btn pri sm" data-act="reviewNew">경영검토 보고서 자동 작성</button></h2>' +
      '<p class="small muted">버튼을 누르면 9.3.2 입력사항(이전 조치, 이슈 변화, KPI, 고객만족, 부적합, 심사, 협력사, 측정, 리스크 조치, 개선기회)을 시스템 데이터에서 자동으로 모읍니다. 대표이사 지시사항(출력)을 입력하면 경영검토 시정조치(MD-0901-003)로 추적됩니다.</p>' +
      Q.table([{ label: '일자', k: 'date' }, { label: '제목', k: 'title' }, { label: '주관', k: 'chair' }, { label: '지시사항', n: 1, k: function (r) { return (r.actions || []).length; } }, { label: '미결', n: 1, k: function (r) { return (r.actions || []).filter(function (x) { return x.status !== '완료'; }).length; } }],
        Q.S.reviews, { rowAttr: function (r) { return ' class="click" data-go="review/' + r.id + '"'; }, empty: '경영검토 기록 없음 — 연 1회 이상 실시' }) + '</div>' +
      '<div class="card"><h2>경영검토 시정조치 (MD-0901-003) — 지시사항 추적</h2>' + Q.table([{ label: '검토일', k: function (a) { return a.r.date; } }, { label: '지시사항', k: function (a) { return a.x.text; } }, { label: '담당', k: function (a) { return a.x.owner; } },
        { label: '기한', html: function (a) { return Q.dueChip(a.x.due, a.x.status === '완료'); } }, { label: '상태', html: function (a) { return Q.statusChip(a.x.status); } }], acts, { rowAttr: function (a) { return ' class="click" data-go="review/' + a.r.id + '"'; } }) + '</div>';
  });
  function collectInputs(since) {
    var S = Q.S, inRange = function (d) { return d && d >= since; };
    var prev = S.reviews[0];
    var kp = (S.kpis || []).map(function (k) {
      var a = S.kpiActuals[k.id] || {}, ms = Object.keys(a).filter(function (m) { return m >= since.slice(0, 7) && a[m] !== '' && a[m] !== null; });
      var ok = ms.filter(function (m) { return Q.kpiOk(k, a[m]); }).length;
      return { name: k.name, target: (k.dir === 'down' ? '≤' : '≥') + k.target + (k.unit || ''), n: ms.length, ok: ok, rate: ms.length ? Math.round(100 * ok / ms.length) + '%' : '-' };
    });
    var ncr = S.ncrs.filter(function (n) { return inRange(n.date); });
    var ci = (S.registers.custIssues || []).filter(function (r) { return inRange(r.date); });
    var aud = S.audits.filter(function (a) { return inRange(a.date); });
    var sup = S.registers.suppliers || [];
    var inst = S.registers.instruments || [];
    var risks = S.registers.risks || [];
    var ce = (S.registers.custEvals || [])[0];
    return {
      a: prev ? (prev.actions || []).map(function (x) { return x.text + ' — ' + x.status; }).join('\n') || '지시사항 없음' : '최초 경영검토',
      b: (S.registers.issues || []).filter(function (r) { return inRange(r.created || r.reviewed); }).map(function (r) { return '[' + r.kind + '] ' + r.issue; }).join('\n') || '기간 중 신규 등록 이슈 없음',
      c1: '고객 품질 문제 ' + ci.length + '건 (클레임 ' + ci.filter(function (r) { return (r.kind || '').indexOf('클레임') === 0; }).length + '건)' + (ce && window.SEED.custEval ? ' / ' + window.SEED.custEval.customer + ' SSQ 자체점검 ' + ce.date + ' ' + ceScore(window.SEED.custEval, ce).pct + '%' : ''),
      c2: kp.map(function (k) { return k.name + ': 목표 ' + k.target + ', 입력 ' + k.n + '개월 중 달성 ' + k.ok + ' (' + k.rate + ')'; }).join('\n'),
      c4: '부적합 ' + ncr.length + '건 (종결 ' + ncr.filter(function (n) { return n.status === '종결'; }).length + ', 미결 ' + ncr.filter(function (n) { return n.status !== '종결'; }).length + ') / 리워크 ' + (S.registers.rework || []).filter(function (r) { return inRange(r.date); }).length + '건',
      c5: '계측기 ' + inst.length + '대 중 교정 기한 초과 ' + inst.filter(function (r) { return r.next && Q.daysUntil(r.next) < 0; }).length + '대 / MSA ' + (S.registers.msaResults || []).length + '건 / SPC 분석 ' + (S.registers.spcSets || []).length + '건',
      c6: aud.map(function (a) { var fs = a.findings || []; return a.title + ': 지적 ' + fs.length + '건 (미결 ' + fs.filter(function (f) { return f.status !== '종결'; }).length + ')'; }).join('\n') || '기간 중 내부심사 없음',
      c7: '등록 협력사 ' + sup.length + '개 — ' + ['A', 'B', 'C', 'D'].map(function (g) { return g + ' ' + sup.filter(function (s) { return s.grade === g; }).length; }).join(', '),
      d: '',
      e: risks.length ? risks.map(function (r) { return r.risk + ' (' + (r.grade || '-') + ') — ' + (r.status || '') + (r.effect ? ' / 효과: ' + r.effect : ''); }).join('\n') : '리스크 대장 미작성',
      f: (S.registers.suggestions || []).filter(function (r) { return inRange(r.date); }).length + '건 제안 / 개선활동 ' + (S.records['MD-1001-001'] || []).filter(function (r) { return inRange(r.date); }).length + '건'
    };
  }
  var IN_LABELS = [['a', 'a) 이전 경영검토 조치 상태'], ['b', 'b) 내·외부 이슈 변화'], ['c1', 'c1) 고객만족 및 이해관계자 피드백'], ['c2', 'c2) 품질목표 달성 정도'], ['c3', 'c3) 프로세스 성과 및 제품 적합성'],
    ['c4', 'c4) 부적합 및 시정조치'], ['c5', 'c5) 모니터링 및 측정 결과'], ['c6', 'c6) 심사 결과'], ['c7', 'c7) 외부공급자 성과'], ['d', 'd) 자원의 충족성'], ['e', 'e) 리스크와 기회 조치의 효과성'], ['f', 'f) 개선 기회']];
  Q.on('reviewNew', function () {
    var since = Q.S.reviews[0] ? Q.S.reviews[0].date : Q.addDays(Q.today(), -365);
    var inp = collectInputs(since); inp.c3 = inp.c2 ? '프로세스 KPI 참조 (c2)' : '';
    var r = { id: Q.uid('rev'), date: Q.today(), title: new Date().getFullYear() + '년 경영검토', chair: Q.S.company.ceo, attendees: '', since: since, inputs: inp, outputs: { improve: '', change: '', resource: '' }, actions: [], by: Q.me() };
    Q.S.reviews.unshift(r); Q.save(); Q.go('review/' + r.id); Q.toast(since + ' 이후 데이터로 입력사항을 채웠습니다');
  });
  function reviewDetail(r) {
    if (!r) return '<div class="empty">없음</div>';
    var h = '<div class="row no-print" style="margin-bottom:12px"><a href="#/review">← 경영검토</a><span class="sp"></span><button class="btn" data-act="reviewRefresh" data-id="' + r.id + '">입력사항 다시 집계</button><button class="btn" onclick="window.print()">인쇄 / PDF</button><button class="btn danger" data-act="reviewDel" data-id="' + r.id + '">삭제</button></div>';
    h += '<div class="card"><div class="row"><div style="flex:1"><div class="small muted">' + E(Q.S.company.name) + '</div><h2 style="font-size:20px">경영검토 보고서</h2><div class="small mono muted">MD-0901-002 · 대상 기간 ' + E(r.since) + ' ~ ' + E(r.date) + '</div></div>' + Q.approvalBox(['작성', '검토', '승인']) + '</div><hr>' +
      '<div class="form"><div class="fld"><label>제목</label><input data-chg="revF" data-id="' + r.id + '" data-k="title" value="' + E(r.title) + '"></div><div class="fld"><label>일자</label><input type="date" data-chg="revF" data-id="' + r.id + '" data-k="date" value="' + E(r.date) + '"></div>' +
      '<div class="fld"><label>주관</label><input data-chg="revF" data-id="' + r.id + '" data-k="chair" value="' + E(r.chair) + '"></div><div class="fld"><label>참석자</label><input data-chg="revF" data-id="' + r.id + '" data-k="attendees" value="' + E(r.attendees) + '"></div></div>' +
      '<h3>9.3.2 경영검토 입력</h3>' + IN_LABELS.map(function (l) { return '<div class="fld" style="margin-bottom:8px"><label>' + E(l[1]) + '</label><textarea rows="' + Math.min(6, Math.max(2, String(r.inputs[l[0]] || '').split('\n').length)) + '" data-chg="revIn" data-id="' + r.id + '" data-k="' + l[0] + '">' + E(r.inputs[l[0]] || '') + '</textarea></div>'; }).join('') +
      '<h3>9.3.3 경영검토 출력 (대표이사 결정)</h3>' + [['improve', '개선 기회'], ['change', 'QMS 변경 필요성'], ['resource', '자원의 필요성']].map(function (l) { return '<div class="fld" style="margin-bottom:8px"><label>' + l[1] + '</label><textarea rows="2" data-chg="revOut" data-id="' + r.id + '" data-k="' + l[0] + '">' + E(r.outputs[l[0]] || '') + '</textarea></div>'; }).join('') +
      '<h3>지시사항 (MD-0901-003) <button class="btn sm no-print" data-act="revAct" data-id="' + r.id + '">추가</button></h3>' +
      Q.table([{ label: '지시사항', k: 'text' }, { label: '담당', k: 'owner' }, { label: '기한', html: function (x) { return Q.dueChip(x.due, x.status === '완료'); } }, { label: '상태', html: function (x) { return Q.statusChip(x.status); } }, { label: '결과', k: 'result' }],
        r.actions || [], { rowAttr: function (x, i) { return ' class="click" data-act="revAct" data-id="' + r.id + '" data-i="' + i + '"'; } }) + '</div>';
    return h;
  }
  function revById(id) { return Q.S.reviews.filter(function (r) { return r.id === id; })[0]; }
  Q.on('revF', function (el) { revById(el.getAttribute('data-id'))[el.getAttribute('data-k')] = el.value; Q.save(); });
  Q.on('revIn', function (el) { revById(el.getAttribute('data-id')).inputs[el.getAttribute('data-k')] = el.value; Q.save(); });
  Q.on('revOut', function (el) { revById(el.getAttribute('data-id')).outputs[el.getAttribute('data-k')] = el.value; Q.save(); });
  Q.on('reviewRefresh', function (el) { var r = revById(el.getAttribute('data-id')); Q.confirm('입력사항을 현재 데이터로 다시 채웁니다 (직접 수정한 내용은 덮어씀)', function () { var keep = { c3: r.inputs.c3, d: r.inputs.d }; r.inputs = collectInputs(r.since); r.inputs.c3 = keep.c3; r.inputs.d = keep.d; Q.save(); Q.rerender(); }); });
  Q.on('reviewDel', function (el) { Q.confirm('삭제할까요?', function () { Q.S.reviews = Q.S.reviews.filter(function (r) { return r.id !== el.getAttribute('data-id'); }); Q.save(); Q.go('review'); }); });
  Q.on('revAct', function (el) {
    var r = revById(el.getAttribute('data-id')), i = el.getAttribute('data-i'), x = i !== null ? r.actions[+i] : null;
    var f = [{ k: 'text', label: '지시사항', full: true, req: true }, { k: 'owner', label: '담당', type: 'dept' }, { k: 'due', label: '기한', type: 'date' }, { k: 'status', label: '상태', type: 'select', options: ['계획', '진행', '완료'], def: '계획' }, { k: 'result', label: '조치 결과', type: 'textarea', rows: 2 }];
    var btns = [{ label: '취소' }, { label: '저장', cls: 'pri', fn: function (m) { var o = Q.readForm(m, f); if (!o) return false; if (x) Object.keys(o).forEach(function (k) { x[k] = o[k]; }); else r.actions.push(o); Q.save(); Q.rerender(); } }];
    if (x) btns.unshift({ label: '삭제', cls: 'danger', fn: function () { r.actions.splice(+i, 1); Q.save(); Q.rerender(); } });
    Q.modal('경영검토 지시사항', Q.formHtml(f, x || {}), btns);
  });

  /* ───────── 교육훈련 (MD-0703) ───────── */
  Q.route('training', function (a) { return a[0] === 'quiz' ? '교육 평가' : '교육훈련'; }, function (args) {
    if (args[0] === 'quiz') return quizPage(args[1]);
    var tab = args[0] || 'plan', y = String(new Date().getFullYear());
    var h = Q.tabs('tr', [['plan', '교육 계획·실적', 'training/plan'], ['matrix', '역량 매트릭스', 'training/matrix'], ['courses', '교육 과정·평가', 'training/courses'], ['quals', '자격 인증', 'training/quals']], tab);
    if (tab === 'plan') {
      var T = Q.S.trainings;
      var hrs = T.filter(function (t) { return t.status === '완료' && (t.date || '').slice(0, 4) === y; }).reduce(function (s, t) { return s + (Q.num(t.hours) || 0) * ((t.attendees || '').split(/[,，]/).filter(function (x) { return x.trim(); }).length || 1); }, 0);
      h += '<div class="tiles"><div class="tile"><div class="k">' + y + ' 계획</div><div class="v">' + T.filter(function (t) { return (t.date || '').slice(0, 4) === y; }).length + '</div></div><div class="tile good"><div class="k">완료</div><div class="v">' + T.filter(function (t) { return t.status === '완료' && (t.date || '').slice(0, 4) === y; }).length + '</div></div>' +
        '<div class="tile"><div class="k">누적 교육시간 (인·시)</div><div class="v">' + Q.fmt(hrs, 1) + '</div></div><div class="tile"><div class="k">평가 응시</div><div class="v">' + Q.S.quizResults.length + '</div></div></div>';
      h += '<div class="card"><h2>교육훈련 계획서 (MD-0703-002) · 결과 보고서 (MD-0703-001) <span class="sp"></span><button class="btn sm" data-act="trCsv">CSV</button><button class="btn pri sm" data-act="trEdit">교육 등록</button></h2>' +
        Q.table([{ label: '일자', k: 'date' }, { label: '교육명', html: function (t) { return '<b>' + E(t.title) + '</b>'; } }, { label: '구분', k: 'kind' }, { label: '대상', k: 'target' }, { label: '강사', k: 'instructor' }, { label: '시간', n: 1, k: 'hours' },
          { label: '참석', n: 1, k: function (t) { return (t.attendees || '').split(/[,，]/).filter(function (x) { return x.trim(); }).length || ''; } }, { label: '효과성', k: 'effect' }, { label: '상태', html: function (t) { return Q.statusChip(t.status === '계획' && Q.daysUntil(t.date) < 0 ? '지연' : t.status); } }],
        T, { rowAttr: function (t) { return ' class="click" data-act="trEdit" data-id="' + t.id + '"'; }, empty: '등록된 교육 없음' }) + '</div>';
    } else if (tab === 'matrix') {
      var Qs = Q.S.registers.quals || [], skills = Object.keys(Qs.reduce(function (m, q) { m[q.skill] = 1; return m; }, {})).sort();
      h += '<div class="card"><h2>역량 매트릭스 (7.2) <span class="sp"></span><a class="small" href="#/training/quals">자격 등록 →</a></h2>' + (skills.length ?
        '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>성명</th><th>부서</th>' + skills.map(function (s) { return '<th>' + E(s) + '</th>'; }).join('') + '</tr></thead><tbody>' + Q.S.users.map(function (u) {
          return '<tr><td>' + E(u.name) + '</td><td>' + E(u.dept) + '</td>' + skills.map(function (s) { var q = Qs.filter(function (x) { return x.name === u.name && x.skill === s; })[0]; if (!q) return '<td></td>'; var lv = (q.level || '').charAt(0); var exp = q.valid && Q.daysUntil(q.valid) < 0; return '<td style="text-align:center">' + Q.chip(lv ? '●'.repeat(+lv) : '○', exp ? 'crit' : (+lv >= 3 ? 'good' : 'acc')) + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div><p class="small muted">● 수: 1 교육중 · 2 지도하 수행 · 3 단독 수행 · 4 지도 가능 / 붉은색 = 유효기한 만료</p>' : '<div class="empty">자격 인증 대장에 등록하면 매트릭스가 만들어집니다</div>') + '</div>';
    } else if (tab === 'courses') {
      h += '<div class="grid g2">' + (Q.S.courses || []).map(function (c) {
        var res = Q.S.quizResults.filter(function (r) { return r.course === c.id; });
        return '<div class="card"><h2>' + E(c.title) + '</h2><p class="small muted">' + E([c.target, c.hours].filter(Boolean).join(' · ')) + '</p>' +
          (c.objectives && c.objectives.length ? '<b class="small">학습 목표</b><ul class="small">' + c.objectives.map(function (o) { return '<li>' + E(o) + '</li>'; }).join('') + '</ul>' : '') +
          (c.outline && c.outline.length ? '<details><summary class="small">교육 내용 (' + c.outline.length + ')</summary><ol class="small">' + c.outline.map(function (o) { return '<li>' + E(o) + '</li>'; }).join('') + '</ol></details>' : '') +
          '<div class="row" style="margin-top:10px">' + (c.quiz && c.quiz.length ? '<button class="btn pri sm" data-go="training/quiz/' + E(c.id) + '">평가 응시 (' + c.quiz.length + '문항)</button>' : '') + (c.source ? '<a class="btn sm" href="' + E(c.source) + '" target="_blank" rel="noopener">교재 원본</a>' : '') +
          '<span class="small muted">응시 ' + res.length + '명' + (res.length ? ' · 평균 ' + Math.round(res.reduce(function (s, r) { return s + r.pct; }, 0) / res.length) + '점' : '') + '</span></div></div>';
      }).join('') + '</div>' + '<div class="card"><h2>평가 결과</h2>' + Q.table([{ label: '일자', k: 'date' }, { label: '과정', k: function (r) { return ((Q.S.courses || []).filter(function (c) { return c.id === r.course; })[0] || {}).title || r.course; } }, { label: '응시자', k: 'who' }, { label: '점수', n: 1, k: 'pct' }, { label: '판정', html: function (r) { return Q.statusChip(r.pct >= 70 ? '합격' : '불합격'); } }], Q.S.quizResults, { empty: '응시 기록 없음' }) + '</div>';
    } else {
      h += Q.regView('quals');
    }
    return h;
  });
  var TR_F = [{ k: 'title', label: '교육명', req: true }, { k: 'kind', label: '구분', type: 'select', options: ['사내', '사외', 'OJT', '법정', '신입'] }, { k: 'date', label: '일자', type: 'date', def: Q.today(), req: true }, { k: 'hours', label: '시간', type: 'number' },
    { k: 'target', label: '대상' }, { k: 'instructor', label: '강사' }, { k: 'attendees', label: '참석자 (쉼표 구분)', full: true }, { k: 'content', label: '교육 내용', type: 'textarea', rows: 2 },
    { k: 'effect', label: '효과성 평가 방법·결과 (7.2 c)', type: 'select', options: ['', '시험 합격', '실습 평가 합격', '현업 적용 확인', '재교육 필요'] }, { k: 'status', label: '상태', type: 'select', options: ['계획', '완료', '취소'], def: '계획' }];
  Q.on('trEdit', function (el) {
    var id = el.getAttribute('data-id'), t = id ? Q.S.trainings.filter(function (x) { return x.id === id; })[0] : null, photos = t && t.photos ? t.photos.slice() : [];
    var btns = [{ label: '취소' }, { label: '저장', cls: 'pri', fn: function (m) { var o = Q.readForm(m, TR_F); if (!o) return false; var x = t || { id: Q.uid('tr'), by: Q.me() }; Object.keys(o).forEach(function (k) { x[k] = o[k]; }); x.photos = photos; if (!t) Q.S.trainings.unshift(x); Q.S.trainings.sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); }); Q.save(); Q.rerender(); } }];
    if (t) btns.unshift({ label: '삭제', cls: 'danger', fn: function () { Q.S.trainings = Q.S.trainings.filter(function (x) { return x !== t; }); Q.save(); Q.rerender(); } });
    var m = Q.modal('교육훈련', Q.formHtml(TR_F, t || {}) + Q.photoBox(photos), btns); Q.bindPhotoBox(m, photos);
  });
  Q.on('trCsv', function () { Q.csv('교육훈련_실적_' + Q.today() + '.csv', ['일자', '교육명', '구분', '대상', '강사', '시간', '참석자', '내용', '효과성', '상태'], Q.S.trainings.map(function (t) { return [t.date, t.title, t.kind, t.target, t.instructor, t.hours, t.attendees, t.content, t.effect, t.status]; })); });
  function quizPage(cid) {
    var c = (Q.S.courses || []).filter(function (x) { return x.id === cid; })[0];
    if (!c || !c.quiz) return '<div class="empty">평가 없음</div>';
    return '<div class="row no-print" style="margin-bottom:12px"><a href="#/training/courses">← 교육 과정</a></div><div class="card quiz"><h2>' + E(c.title) + ' — 이해도 평가</h2><div class="fld" style="max-width:260px;margin-bottom:14px"><label>응시자</label>' + Q.input({ k: 'who', type: 'user' }, Q.me()) + '</div>' +
      c.quiz.map(function (q, i) { return '<div class="q" data-q="' + i + '"><b>' + (i + 1) + '. ' + E(q.q) + '</b>' + q.options.map(function (o, j) { return '<label><input type="radio" name="q' + i + '" value="' + j + '"> ' + E(o) + '</label>'; }).join('') + '<div class="small muted why" hidden>' + E(q.why || '') + '</div></div>'; }).join('') +
      '<button class="btn pri" data-act="quizSubmit" data-c="' + E(c.id) + '">제출·채점</button> <span id="quizRes"></span></div>';
  }
  Q.on('quizSubmit', function (el) {
    var c = Q.S.courses.filter(function (x) { return x.id === el.getAttribute('data-c'); })[0], ok = 0;
    c.quiz.forEach(function (q, i) {
      var box = Q.$('[data-q="' + i + '"]'), sel = box.querySelector('input:checked');
      Q.$$('label', box).forEach(function (l, j) { l.classList.toggle('ok', j === q.answer); l.classList.toggle('ng', sel && +sel.value === j && j !== q.answer); });
      box.querySelector('.why').hidden = false;
      if (sel && +sel.value === q.answer) ok++;
    });
    var pct = Math.round(100 * ok / c.quiz.length), who = Q.$('[name="who"]').value || Q.me();
    Q.S.quizResults.unshift({ date: Q.today(), course: c.id, who: who, pct: pct }); Q.save();
    Q.$('#quizRes').innerHTML = '<b>' + ok + '/' + c.quiz.length + ' (' + pct + '점)</b> ' + Q.statusChip(pct >= 70 ? '합격' : '불합격') + ' — 기록 저장됨';
    el.disabled = true;
  });

  /* ───────── 심사·실무 가이드 ───────── */
  Q.route('guide', '심사·실무 가이드', function (args) {
    var tab = args[0] || 'audit', P = window.SEED.project;
    var h = Q.tabs('gd', [['audit', 'ISO 19011 심사 스킬', 'guide/audit'], ['rules', '문서 번호·운영 규칙', 'guide/rules'], ['tools', 'SPC·MSA 판정 기준', 'guide/tools'], ['project', '컨설팅 완료 보고', 'guide/project']], tab);
    if (tab === 'audit') {
      h += '<div class="grid g2"><div class="card"><h2>심사 원칙 7가지</h2><ol><li><b>성실성</b> — 전문가로서의 기반</li><li><b>공정한 보고</b> — 진실하고 정확한 보고</li><li><b>전문가적 주의</b> — 근면과 판단</li><li><b>기밀유지</b> — 정보 보안</li><li><b>독립성</b> — 자기 업무 심사 금지</li><li><b>증거기반 접근법</b> — 검증 가능한 증거, 샘플링</li><li><b>리스크기반 접근법</b> — 계획·수행·보고에 리스크 고려</li></ol></div>' +
        '<div class="card"><h2>부적합 등급</h2>' + Q.table([{ label: '등급', k: 0 }, { label: '정의', k: 1 }, { label: '예', k: 2 }], [['중부적합', '요구사항 전체 누락·미실행, 시스템 붕괴, 부적합품 출하 등 고객 영향 큼, 동일 조항 경부적합 반복', '내부심사 미실시, 교정 미실시 계측기로 출하 판정'], ['경부적합', '시스템은 있으나 단발적·부분적 이탈', '일부 기록 승인 서명 누락'], ['관찰사항', '현재 부적합은 아니나 방치 시 부적합 가능성', '문서 개정 지연 우려']].map(function (r) { return { 0: r[0], 1: r[1], 2: r[2] }; })) + '</div></div>' +
        '<div class="card"><h2>심사 진행 11단계 (MST 심사원 가이드)</h2><ol class="flow">' + [['심사원 육성', '분석적·개방적·경청 자세, 지식·학력·경험·훈련'], ['심사원 선정·팀 구성', '독립성, 2인 이상'], ['심사 계획', '심사계획서·체크리스트, 과거 부적합·고객불만 반영'], ['문서 검토', '절차·지침·기록 사전 검토'], ['시작회의', '범위·방법·일정 확인'], ['현장 순회', '5S·설비/계측기 상태·보관·안전 관찰'], ['현장 심사', '질문 → 확인 → 경청, 거북이 다이어그램으로 프로세스 접근'], ['심사팀 자체 회의', '부적합 근거 확인·진술 작성'], ['종료 회의', '결과 발표·시정조치 계획 합의'], ['보고서 작성', '객관적 증거 기반·추적 가능·피심사 서명'], ['사후조치', '임시조치 → 근본대책 → 수평전개 → 완료 확인 → 유효성 확인']].map(function (s) { return '<li><b>' + E(s[0]) + '</b><div class="small muted">' + E(s[1]) + '</div></li>'; }).join('') + '</ol></div>' +
        '<div class="card"><h2>부적합 진술 작성법</h2><p><b>요구사항</b> + <b>객관적 증거</b> + <b>부적합 내용</b></p><p class="small muted">예) ISO 9001 7.1.5.2 및 MD-0812는 측정장비의 정기 교정을 요구함 / 2026-09-10 가공1라인 마이크로미터 MM-012의 교정 유효기간이 2026-05-31로 만료됨 / 교정 만료 계측기가 출하검사에 사용되고 있음</p><p class="small">사실 기반·검증 가능 · 사람이 아닌 시스템 지적 · 추측 배제 · 조항/문서번호 추적 · 피심사자 확인 서명</p></div>';
    } else if (tab === 'rules') {
      h += '<div class="card"><h2>문서 번호 체계</h2>' + Q.table([{ label: '구분', k: 0 }, { label: '형식', k: 1 }, { label: '예', k: 2 }], [['품질매뉴얼', 'QM-nn', 'QM-01'], ['프로세스', 'MP-CCnn (CC = ISO 장 번호)', 'MP-0802 구매 업무'], ['절차서', 'MD-CCnn', 'MD-0808 구매'], ['지침서', 'MI-CCnn', 'MI-0807 부품 승인'], ['양식', '상위문서번호-nnn', 'MD-0808-001 구매 발주서']].map(function (r) { return { 0: r[0], 1: r[1], 2: r[2] }; })) + '<p class="small muted">문서 체계 → 문서 등록에서 "번호 자동"을 누르면 수준과 ISO 조항에 맞춰 다음 번호를 제안합니다.</p></div>' +
        '<div class="grid g2">' + [['문서 개정', '개정 요청(사유·전후) → 개정중 → 검토 → 승인(Rev 자동 증가) → 개정 이력 자동 기록 → 구본 회수·현장 게시본 교체'], ['기록 작성', '양식·기록 메뉴에서 작성 → 결재(작성/검토/승인) → 사진 증빙 첨부 → 인쇄/PDF 보관'], ['월간 점검', '매월 첫 주 KPI 입력 → 미달 시 부적합·개선활동 등록 → 분기 회의 → 연 1회 경영검토'], ['내부심사', '연 1회 이상 → 지적 → 시정조치요구서 → 부적합·시정조치 연계 → 종결 시 지적 자동 종결']].map(function (c) { return '<div class="card"><h2>' + c[0] + '</h2><p class="small">' + c[1] + '</p></div>'; }).join('') + '</div>';
    } else if (tab === 'tools') {
      h += '<div class="grid g2"><div class="card"><h2>공정능력 판정</h2>' + Q.table([{ label: 'Cpk', k: 0 }, { label: '판정', k: 1 }, { label: '조치', k: 2 }], [['≥ 1.67', '매우 우수', '관리 간소화 검토'], ['1.33 ~ 1.67', '충분', '현 상태 유지'], ['1.00 ~ 1.33', '보통', '공정 개선, 검사 강화'], ['< 1.00', '부족', '전수검사·즉시 조치']].map(function (r) { return { 0: r[0], 1: r[1], 2: r[2] }; })) + '</div>' +
        '<div class="card"><h2>MSA 합격 기준</h2>' + Q.table([{ label: '지표', k: 0 }, { label: '기준', k: 1 }], [['%GRR < 10%', '적합'], ['10% ≤ %GRR ≤ 30%', '조건부 (용도·비용 고려 승인)'], ['%GRR > 30%', '부적합 — 측정시스템 개선'], ['ndc', '≥ 5'], ['Cg/Cgk (Type 1)', '≥ 1.33']].map(function (r) { return { 0: r[0], 1: r[1] }; })) + '</div></div>' +
        '<div class="card"><h2>관리도 이상 판정 규칙</h2><ol class="small"><li>점이 관리한계(UCL/LCL) 밖</li><li>중심선 한쪽에 연속 9점</li><li>연속 6점 상승 또는 하강</li><li>연속 14점이 교대로 증감</li><li>연속 3점 중 2점이 2σ 밖 (같은 쪽)</li><li>연속 5점 중 4점이 1σ 밖 (같은 쪽)</li><li>연속 15점이 1σ 안</li><li>연속 8점이 1σ 밖 (양쪽)</li></ol><p class="small muted">SPC 화면은 규칙 1·2·3·5를 자동 판정합니다.</p></div>';
    } else {
      if (!P) return h + '<div class="empty">완료 보고 데이터 없음</div>';
      h += '<div class="card"><h2>' + E(P.title) + '</h2><p>' + E(P.period || '') + '</p>' + (P.source ? '<a href="' + E(P.source) + '" target="_blank" rel="noopener">원본 보고서</a>' : '') + '</div>' +
        '<div class="card"><h2>단계별 활동</h2><ol class="flow">' + (P.phases || []).map(function (p) { return '<li><b>' + E(p.name) + '</b> <span class="small muted">' + E(p.period || '') + '</span><div class="small">' + E((p.activities || []).join(' · ')) + '</div>' + (p.outputs && p.outputs.length ? '<div class="who">산출물: ' + E(p.outputs.join(', ')) + '</div>' : '') + '</li>'; }).join('') + '</ol></div>' +
        ((P.results || []).length ? '<div class="card"><h2>결과</h2><ul>' + P.results.map(function (r) { return '<li>' + E(r) + '</li>'; }).join('') + '</ul></div>' : '') +
        ((P.nextSteps || []).length ? '<div class="card"><h2>향후 과제</h2><ul>' + P.nextSteps.map(function (r) { return '<li>' + E(typeof r === 'string' ? r : JSON.stringify(r)) + '</li>'; }).join('') + '</ul></div>' : '');
    }
    return h;
  });

  /* ───────── 설정·백업 ───────── */
  Q.route('settings', '설정·백업', function () {
    var S = Q.S, size = Math.round(JSON.stringify(S).length / 1024);
    var h = '<div class="grid g2"><div class="card"><h2>현재 사용자</h2><p>' + E(S.settings.user || '-') + ' · ' + E(Q.perm ? Q.perm() : '') + '</p><p class="small muted">기록 작성자·결재 이력에 이 이름이 남습니다. 다른 사람으로 바꾸려면 로그아웃 후 다시 로그인하세요.</p><button class="btn" data-act="logout">로그아웃</button></div>' +
      '<div class="card"><h2>화면</h2><div class="row"><button class="btn" data-act="theme" data-t="light">밝게</button><button class="btn" data-act="theme" data-t="dark">어둡게</button><button class="btn" data-act="theme" data-t="auto">시스템 따라감</button></div></div></div>';
    h += '<div class="card"><h2>데이터 저장 위치 · 백업</h2><dl class="kv"><dt>저장 방식</dt><dd>' + (Q.native ? '데스크톱 앱 — 데이터 파일 <code>' + E(Q.native.dataPath()) + '</code>' : '브라우저 저장소 (이 PC·이 브라우저 전용)') + '</dd>' +
      '<dt>데이터 크기</dt><dd>' + size + ' KB' + (!Q.native && size > 4000 ? ' <span style="color:var(--warn)">— 브라우저 저장 한도(약 5MB)에 가까움. 사진이 많으면 데스크톱 앱 사용 권장</span>' : '') + '</dd>' +
      '<dt>마지막 저장</dt><dd>' + E((S.savedAt || '').replace('T', ' ').slice(0, 19)) + '</dd><dt>마지막 백업</dt><dd>' + E(S.settings.lastBackup || '없음') + '</dd></dl>' +
      '<div class="row" style="margin-top:12px"><button class="btn pri" data-act="backup">백업 파일 저장 (.json)</button><button class="btn" data-act="restore">백업에서 복원</button>' +
      (Q.native ? '<button class="btn" data-act="chooseData">공유 폴더 데이터 파일 지정</button><button class="btn" data-act="openDataDir">데이터 폴더 열기</button>' : '') + '</div>' +
      '<p class="small muted" style="margin-top:10px">여러 PC에서 같이 쓰려면: 데스크톱 앱에서 데이터 파일을 회사 NAS·공유폴더(또는 네이버 MYBOX/OneDrive 동기화 폴더)에 지정하세요. 동시에 두 사람이 같은 화면을 수정하면 나중 저장이 우선합니다. 데스크톱 앱은 하루 한 번 자동 백업(최근 30개)을 만듭니다.</p></div>';
    h += '<div class="card"><h2>사용자 (구성원)</h2>' + Q.table([{ label: '성명', k: 'name' }, { label: '부서', k: 'dept' }, { label: '직책', k: 'role' }], S.users, { rowAttr: function (u, i) { return ' class="click" data-act="userEdit" data-i="' + i + '"'; } }) + '<div class="row end" style="margin-top:8px"><button class="btn sm pri" data-act="userEdit">사용자 추가</button></div></div>';
    h += '<div class="card"><h2>초기화</h2><p class="small muted">모든 입력 데이터를 지우고 드라이브 원본 기준 데이터로 되돌립니다. 먼저 백업하세요.</p><button class="btn danger" data-act="resetAll">전체 초기화</button></div>';
    h += '<div class="card"><h2>정보</h2><p class="small">MST QMS v1.0 · 기준 데이터 v' + window.SEED.version + ' · 원본: <a href="' + E(window.SEED.drive.folder) + '" target="_blank" rel="noopener">Google Drive MST 폴더</a></p></div>';
    return h;
  });
  Q.on('setUser', function () { Q.S.settings.user = Q.$('[name="curUser"]').value; Q.save(); Q.toast('사용자: ' + (Q.S.settings.user || '-')); Q.updateUserBadge(); });
  Q.on('theme', function (el) { Q.S.settings.theme = el.getAttribute('data-t'); Q.applyTheme(); Q.save(); });
  Q.on('backup', function () { Q.exportBackup(); Q.toast('백업 파일을 저장했습니다'); });
  Q.on('restore', function () { Q.pickFile('.json,application/json', function (f) { Q.confirm('현재 데이터를 백업 파일 내용으로 바꿉니다. 계속할까요?', function () { Q.importBackup(f, function (ok) { if (ok) { Q.toast('복원했습니다'); Q.render(); } }); }); }); });
  Q.on('resetAll', function () { Q.confirm('정말 초기화할까요? 되돌릴 수 없습니다.', function () { Q.resetAll(); Q.render(); Q.toast('초기화했습니다'); }); });
  Q.on('chooseData', function () { Q.native.chooseDataFile().then(function (p) { if (p) { Q.toast('데이터 파일: ' + p); setTimeout(function () { location.reload(); }, 600); } }); });
  Q.on('openDataDir', function () { Q.native.openDataDir(); });
  Q.on('userEdit', function (el) {
    var i = el.getAttribute('data-i'), u = i !== null ? Q.S.users[+i] : null;
    var f = [{ k: 'name', label: '성명', req: true }, { k: 'dept', label: '부서', type: 'dept' }, { k: 'role', label: '직책' }];
    var btns = [{ label: '취소' }, { label: '저장', cls: 'pri', fn: function (m) { var o = Q.readForm(m, f); if (!o) return false; if (u) Object.keys(o).forEach(function (k) { u[k] = o[k]; }); else Q.S.users.push(o); Q.save(); Q.rerender(); } }];
    if (u) btns.unshift({ label: '삭제', cls: 'danger', fn: function () { Q.S.users.splice(+i, 1); Q.save(); Q.rerender(); } });
    Q.modal('사용자', Q.formHtml(f, u || {}), btns);
  });
})();
