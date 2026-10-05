/* MST QMS — 관리대장 엔진 · 양식(전자기록) 엔진 · 사진 첨부 */
(function () {
  'use strict';
  var Q = window.Q, E = Q.esc;

  /* ───────── 관리대장 정의 ─────────
     key: 저장 키, form: 원본 양식번호, fields: 입력 항목, cols: 목록 열(필드 key),
     due: 기한 필드(대시보드 알림), calc: 저장 시 계산 */
  var GRADE = function (s) { return s >= 90 ? 'A' : s >= 80 ? 'B' : s >= 70 ? 'C' : 'D'; };
  Q.REG_LIST = [
    { key: 'issues', title: '내외부 이슈 파악표', form: 'MD-0401-002', clause: '4.1', titleKey: 'issue',
      fields: [{ k: 'kind', label: '구분', type: 'select', options: ['외부', '내부'], req: true }, { k: 'area', label: '분야', type: 'select', options: ['법규', '기술', '경쟁', '시장', '경제', '사회·문화', '가치', '문화', '지식', '성과', '기타'] },
        { k: 'issue', label: '이슈', full: true, req: true }, { k: 'impact', label: 'QMS 영향', type: 'textarea', rows: 2 }, { k: 'response', label: '대응 방향 (리스크 대장 연계)', type: 'textarea', rows: 2 },
        { k: 'owner', label: '담당', type: 'dept' }, { k: 'reviewed', label: '검토일', type: 'date' }],
      cols: ['kind', 'area', 'issue', 'impact', 'owner', 'reviewed'] },
    { key: 'swot', title: 'SWOT 분석표', form: 'MI-0602-001', clause: '4.1', titleKey: 'text',
      fields: [{ k: 'q', label: '구분', type: 'select', options: ['S 강점', 'W 약점', 'O 기회', 'T 위협'], req: true }, { k: 'text', label: '내용', full: true, req: true }, { k: 'strategy', label: '전략 (SO/ST/WO/WT)', type: 'textarea', rows: 2 }, { k: 'year', label: '기준 연도' }],
      cols: ['q', 'text', 'strategy', 'year'] },
    { key: 'risks', title: '리스크·기회 분석표', form: 'MI-0601-001', clause: '6.1', titleKey: 'risk', due: 'due', dueLabel: '리스크 조치 기한', doneIf: function (r) { return r.status === '완료'; },
      fields: [{ k: 'proc', label: '프로세스', type: 'select', options: [] }, { k: 'type', label: '구분', type: 'select', options: ['리스크', '기회'], req: true }, { k: 'risk', label: '리스크/기회 내용', full: true, req: true },
        { k: 'cause', label: '원인 (이슈·이해관계자)', type: 'textarea', rows: 2 }, { k: 'L', label: '발생가능성 (1~5)', type: 'select', options: ['1', '2', '3', '4', '5'] }, { k: 'S', label: '영향도 (1~5)', type: 'select', options: ['1', '2', '3', '4', '5'] },
        { k: 'treat', label: '대응 옵션', type: 'select', options: ['회피', '감소', '수용', '공유(이전)', '기회 추구'] }, { k: 'plan', label: '조치 계획', type: 'textarea', rows: 2 },
        { k: 'owner', label: '담당', type: 'dept' }, { k: 'due', label: '기한', type: 'date' }, { k: 'effect', label: '효과성 평가', type: 'textarea', rows: 2 }, { k: 'status', label: '상태', type: 'select', options: ['계획', '진행', '완료'], def: '계획' }],
      cols: ['proc', 'type', 'risk', 'score', 'grade', 'treat', 'owner', 'due', 'status'],
      calc: function (r) { r.score = (+r.L || 0) * (+r.S || 0); r.grade = r.score >= 15 ? '상' : r.score >= 8 ? '중' : r.score ? '하' : ''; },
      colLabels: { score: '점수(L×S)', grade: '등급' }, note: '평가 기준(MI-0601-002) [권장]: 점수 = 발생가능성 × 영향도. 15 이상 상(즉시 조치), 8~14 중(계획 조치), 7 이하 하(모니터링).' },
    { key: 'equipment', title: '설비 등록 관리대장', form: 'MD-0804-002', clause: '7.1.3', titleKey: 'name', due: 'next', dueLabel: '설비 예방점검',
      fields: [{ k: 'no', label: '설비번호', req: true }, { k: 'name', label: '설비명', req: true }, { k: 'model', label: '모델/규격' }, { k: 'maker', label: '제작사' }, { k: 'intro', label: '도입일', type: 'date' },
        { k: 'loc', label: '설치 위치' }, { k: 'owner', label: '담당자', type: 'user' }, { k: 'cycle', label: '예방점검 주기(개월)', type: 'number', def: 3 }, { k: 'last', label: '최근 점검일', type: 'date' }, { k: 'next', label: '차기 점검일', type: 'date', hint: '비우면 최근 점검일 + 주기로 자동 계산' },
        { k: 'state', label: '상태', type: 'select', options: ['가동', '대기', '수리중', '폐기'], def: '가동' }, { k: 'history', label: '수리·개조 이력 (MD-0701-003)', type: 'textarea' }],
      cols: ['no', 'name', 'model', 'loc', 'owner', 'last', 'next', 'state'], calc: nextFrom('last', 'cycle', 'next') },
    { key: 'instruments', title: '계측장비 관리대장', form: 'MD-0812-001', clause: '7.1.5', titleKey: 'name', due: 'next', dueLabel: '계측기 교정',
      fields: [{ k: 'no', label: '관리번호', req: true }, { k: 'name', label: '계측기명', req: true }, { k: 'spec', label: '측정범위/규격' }, { k: 'res', label: '분해능' }, { k: 'maker', label: '제조사' }, { k: 'serial', label: '제조번호' },
        { k: 'dept', label: '사용 부서', type: 'dept' }, { k: 'kind', label: '교정 구분', type: 'select', options: ['외부 교정', '사내 검증'] }, { k: 'cycle', label: '교정 주기(개월)', type: 'number', def: 12 },
        { k: 'last', label: '최근 교정일', type: 'date' }, { k: 'next', label: '차기 교정일', type: 'date', hint: '비우면 자동 계산' }, { k: 'agency', label: '교정 기관' }, { k: 'result', label: '판정', type: 'select', options: ['합격', '불합격', '사용중지'] },
        { k: 'msa', label: 'MSA 결과 (%GRR)' }, { k: 'history', label: '이력 (MD-0812-002)', type: 'textarea' }],
      cols: ['no', 'name', 'spec', 'dept', 'cycle', 'last', 'next', 'result', 'msa'], calc: nextFrom('last', 'cycle', 'next'),
      note: '교정 불합격 시 해당 계측기로 측정한 이전 결과의 유효성을 평가하고 부적합 보고를 등록하세요 (7.1.5.2).' },
    { key: 'tools', title: '치공구 관리 대장', form: 'MI-0804-001', clause: '7.1.3', titleKey: 'name', due: 'next', dueLabel: '치공구 점검',
      fields: [{ k: 'no', label: '치공구 번호', req: true }, { k: 'name', label: '명칭', req: true }, { k: 'part', label: '적용 품번' }, { k: 'qty', label: '수량', type: 'number' }, { k: 'loc', label: '보관 위치' },
        { k: 'cycle', label: '점검 주기(개월)', type: 'number', def: 6 }, { k: 'last', label: '최근 점검일', type: 'date' }, { k: 'next', label: '차기 점검일', type: 'date' }, { k: 'state', label: '상태', type: 'select', options: ['사용', '수리', '폐기'] }],
      cols: ['no', 'name', 'part', 'qty', 'loc', 'last', 'next', 'state'], calc: nextFrom('last', 'cycle', 'next') },
    { key: 'suppliers', title: '공급자 등록대장 및 평가서', form: 'MI-0807-001', clause: '8.4', titleKey: 'name', due: 'nextEval', dueLabel: '공급자 재평가',
      fields: [{ k: 'name', label: '업체명', req: true }, { k: 'item', label: '공급 품목' }, { k: 'kind', label: '구분', type: 'select', options: ['원자재', '외주가공', '표면처리', '부자재', '계측·교정', '기타'] }, { k: 'reg', label: '등록일', type: 'date' },
        { k: 'cert', label: '보유 인증 (ISO 등)' }, { k: 'q', label: '품질 (40점)', type: 'number' }, { k: 'd', label: '납기 (30점)', type: 'number' }, { k: 'p', label: '가격 (15점)', type: 'number' }, { k: 'c', label: '협력도 (15점)', type: 'number' },
        { k: 'evalDate', label: '평가일', type: 'date' }, { k: 'nextEval', label: '차기 평가일', type: 'date' }, { k: 'remark', label: '후속 조치', type: 'textarea', rows: 2 }],
      cols: ['name', 'item', 'kind', 'total', 'grade', 'evalDate', 'nextEval'], colLabels: { total: '총점', grade: '등급' },
      calc: function (r) { var t = ['q', 'd', 'p', 'c'].reduce(function (s, k) { return s + (Q.num(r[k]) || 0); }, 0); r.total = t || ''; r.grade = t ? GRADE(t) : ''; if (r.evalDate && !r.nextEval) r.nextEval = Q.addDays(r.evalDate, 182); },
      note: '등급 기준 [권장]: A ≥90, B ≥80, C ≥70, D <70. 품질목표 = 전 협력사 B등급 이상. C 이하는 개선 요구, D는 거래 재검토.' },
    { key: 'partApprovals', title: '제품(부품) 승인 관리 대장', form: 'MI-0807-002', clause: '8.4', titleKey: 'part',
      fields: [{ k: 'part', label: '품번/품명', req: true }, { k: 'supplier', label: '공급자' }, { k: 'req', label: '승인 요청일', type: 'date' }, { k: 'docs', label: '제출 자료 (성적서·도면 등)' }, { k: 'appr', label: '승인일', type: 'date' }, { k: 'result', label: '판정', type: 'select', options: ['승인', '조건부', '불승인'] }, { k: 'by', label: '승인자', type: 'user' }],
      cols: ['part', 'supplier', 'req', 'appr', 'result', 'by'] },
    { key: 'change4m', title: '4M 변경 관리대장', form: 'MD-0803-001', clause: '8.5.6', titleKey: 'item', due: 'due', dueLabel: '4M 변경', doneIf: function (r) { return r.status === '완료'; },
      fields: [{ k: 'date', label: '신청일', type: 'date', def: Q.today(), req: true }, { k: 'm', label: '4M 구분', type: 'select', options: ['Man 작업자', 'Machine 설비', 'Material 자재', 'Method 방법', 'Measurement 측정', 'Environment 환경'], req: true },
        { k: 'item', label: '품번/공정', req: true }, { k: 'content', label: '변경 내용 (전 → 후)', type: 'textarea', req: true }, { k: 'reason', label: '변경 사유', type: 'textarea', rows: 2 },
        { k: 'cust', label: '고객 통보·승인 (MD-0803-002)', type: 'select', options: ['통보 대상 아님', '통보 완료', '승인 대기', '승인 완료'] }, { k: 'first', label: '초품 확인 결과', type: 'select', options: ['', '합격', '불합격'] },
        { k: 'watch', label: '초기유동 관리 (수량/기간)' }, { k: 'docs', label: '개정 문서 (작업표준·QC공정도·FMEA)' }, { k: 'owner', label: '담당', type: 'dept' }, { k: 'due', label: '완료 기한', type: 'date' },
        { k: 'status', label: '진행 단계', type: 'select', options: ['신청', '검토', '고객승인', '초품확인', '초기유동', '완료'], def: '신청' }],
      cols: ['date', 'm', 'item', 'content', 'cust', 'first', 'status', 'due'] },
    { key: 'custIssues', title: '고객 품질 문제 관리 대장', form: 'MD-0903-001', clause: '9.1.2', titleKey: 'title', ncr: true,
      fields: [{ k: 'date', label: '접수일', type: 'date', def: Q.today(), req: true }, { k: 'customer', label: '고객사', req: true }, { k: 'kind', label: '구분', type: 'select', options: ['클레임(불량)', '납기', '문의·요구', '칭찬', '고객재산 이상', '기타'] },
        { k: 'title', label: '내용', full: true, req: true }, { k: 'part', label: '품번' }, { k: 'qty', label: '수량', type: 'number' }, { k: 'reply', label: '회신 내용', type: 'textarea', rows: 2 }, { k: 'replyDate', label: '회신일', type: 'date' }, { k: 'ncrNo', label: '연계 부적합번호' }],
      cols: ['date', 'customer', 'kind', 'title', 'part', 'qty', 'replyDate', 'ncrNo'] },
    { key: 'rework', title: '리워크 관리 대장', form: 'MD-1002-001', clause: '8.7', titleKey: 'part',
      fields: [{ k: 'date', label: '일자', type: 'date', def: Q.today(), req: true }, { k: 'part', label: '품번/품명', req: true }, { k: 'lot', label: 'LOT' }, { k: 'qty', label: '수량', type: 'number' }, { k: 'defect', label: '불량 유형' },
        { k: 'method', label: '재작업 방법 (MD-1002-002 기준)' }, { k: 'worker', label: '작업자', type: 'user' }, { k: 'reinsp', label: '재검사 결과', type: 'select', options: ['합격', '불합격(폐기)'] }],
      cols: ['date', 'part', 'lot', 'qty', 'defect', 'method', 'worker', 'reinsp'] },
    { key: 'suggestions', title: '제안 관리 대장', form: 'MI-1002-001', clause: '10.3', titleKey: 'title',
      fields: [{ k: 'date', label: '제안일', type: 'date', def: Q.today() }, { k: 'who', label: '제안자', type: 'user' }, { k: 'dept', label: '부서', type: 'dept' }, { k: 'title', label: '제안 제목', full: true, req: true },
        { k: 'now', label: '현상', type: 'textarea', rows: 2 }, { k: 'idea', label: '개선안', type: 'textarea', rows: 2 }, { k: 'effect', label: '기대 효과' }, { k: 'eval', label: '심사 결과', type: 'select', options: ['접수', '채택', '보류', '불채택', '실시 완료'] }, { k: 'reward', label: '포상' }],
      cols: ['date', 'who', 'dept', 'title', 'eval', 'reward'] },
    { key: 'quals', title: '자격증 인증 관리 대장', form: 'MD-0703-003', clause: '7.2', titleKey: 'name', due: 'valid', dueLabel: '자격 유효기한',
      fields: [{ k: 'name', label: '성명', type: 'user', req: true }, { k: 'dept', label: '부서', type: 'dept' }, { k: 'skill', label: '자격/공정 (예: 내부심사원, 검사원, CNC 가공)', req: true }, { k: 'level', label: '수준', type: 'select', options: ['1 교육중', '2 지도하 수행', '3 단독 수행', '4 지도 가능'] },
        { k: 'date', label: '인증일', type: 'date' }, { k: 'score', label: '평가 점수 (MD-0703-004)', type: 'number' }, { k: 'valid', label: '유효기한', type: 'date' }, { k: 'by', label: '평가자', type: 'user' }],
      cols: ['name', 'dept', 'skill', 'level', 'date', 'score', 'valid'] }
  ];
  function nextFrom(lastK, cycK, nextK) {
    return function (r) { if (r[lastK] && Q.num(r[cycK]) && !r._nextManual) { var d = new Date(r[lastK] + 'T00:00:00'); d.setMonth(d.getMonth() + Q.num(r[cycK])); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); r[nextK] = d.toISOString().slice(0, 10); } };
  }
  Q.REG = Q.byKey(Q.REG_LIST, 'key');
  Q.REG.risks.fields[0].options = function () { return (window.SEED.processes || []).map(function (p) { return p.code + ' ' + p.name; }); };

  function fieldsOf(rd) {
    return rd.fields.map(function (f) { if (typeof f.options === 'function') { var c = Q.clone(f); c.options = f.options(); return c; } return f; });
  }
  function colLabel(rd, k) {
    if (rd.colLabels && rd.colLabels[k]) return rd.colLabels[k];
    var f = rd.fields.filter(function (x) { return x.k === k; })[0]; return f ? f.label.replace(/\s*\(.*\)$/, '') : k;
  }

  /* 관리대장 화면 (다른 화면에 끼워 넣기 가능) */
  Q.regView = function (key, embed) {
    var rd = Q.REG[key], rows = Q.S.registers[key] || [];
    var q = (Q.S.settings.regQ || {})[key] || '';
    var list = rows.filter(function (r) { return Q.match(r, q); });
    var h = '<div class="card"><h2>' + E(rd.title) + ' <span class="chip">' + E(rd.form) + '</span> <span class="chip acc">ISO ' + E(rd.clause) + '</span><span class="sp"></span>' +
      '<input data-inp="regQ" data-key="' + key + '" placeholder="검색" value="' + E(q) + '" style="padding:5px 9px;border:1px solid var(--line-2);border-radius:6px;width:140px">' +
      '<button class="btn sm" data-act="regCsv" data-key="' + key + '">CSV</button><button class="btn sm" data-act="regImport" data-key="' + key + '">CSV 가져오기</button><button class="btn sm pri" data-act="regAdd" data-key="' + key + '">추가</button></h2>' +
      (rd.note ? '<p class="small muted">' + E(rd.note) + '</p>' : '') +
      Q.table(rd.cols.map(function (k) {
        return { label: colLabel(rd, k), html: function (r) {
          var v = r[k];
          if (rd.due === k) return Q.dueChip(v, rd.doneIf && rd.doneIf(r));
          if (k === 'grade' || k === 'status' || k === 'result' || k === 'state' || k === 'eval' || k === 'reinsp') return v ? Q.statusChip(v) : '';
          return E(v === undefined ? '' : v);
        } };
      }).concat([{ label: '', html: function (r) { return (r.photos && r.photos.length ? '📷' + r.photos.length + ' ' : '') + (rd.ncr && !r.ncrNo ? '<button class="btn sm" data-act="regToNcr" data-key="' + key + '" data-id="' + r.id + '">부적합 등록</button>' : ''); } }]),
      list, { rowAttr: function (r) { return ' class="click" data-act="regEdit" data-key="' + key + '" data-id="' + r.id + '"'; }, max: embed ? 420 : 0 }) + '</div>';
    return h;
  };
  Q.on('regQ', function (el) {
    var k = el.getAttribute('data-key'); Q.S.settings.regQ = Q.S.settings.regQ || {}; Q.S.settings.regQ[k] = el.value;
    clearTimeout(Q._rq); Q._rq = setTimeout(function () { Q.rerender(); var i = Q.$('[data-inp="regQ"][data-key="' + k + '"]'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 300);
  });
  Q.on('regAdd', function (el) { regEditor(el.getAttribute('data-key'), null); });
  Q.on('regEdit', function (el, e) { if (e.target.closest('button')) return; regEditor(el.getAttribute('data-key'), el.getAttribute('data-id')); });
  function regEditor(key, id) {
    var rd = Q.REG[key], rows = Q.S.registers[key] = Q.S.registers[key] || [];
    var r = id ? rows.filter(function (x) { return x.id === id; })[0] : null, f = fieldsOf(rd);
    var photos = r && r.photos ? r.photos.slice() : [];
    var body = Q.formHtml(f, r || {}) + Q.photoBox(photos);
    var btns = [{ label: '취소' }, { label: '저장', cls: 'pri', fn: function (m) {
      var o = Q.readForm(m, f); if (!o) return false;
      var t = r || { id: Q.uid(key), created: Q.today(), by: Q.me() };
      if (rd.due && o[rd.due] && r && r[rd.due] !== o[rd.due] && rd.calc) t._nextManual = false;
      Object.keys(o).forEach(function (k) { t[k] = o[k]; });
      t.photos = photos; t.updated = Q.today();
      if (rd.calc) rd.calc(t);
      if (!r) rows.unshift(t);
      Q.save(); Q.rerender();
    } }];
    if (r) btns.unshift({ label: '삭제', cls: 'danger', fn: function () { Q.confirm('삭제할까요?', function () { Q.S.registers[key] = rows.filter(function (x) { return x !== r; }); Q.save(); Q.rerender(); }); return false; } });
    var m = Q.modal(rd.title + (r ? ' — 수정' : ' — 추가'), body, btns);
    Q.bindPhotoBox(m, photos);
  }
  Q.on('regCsv', function (el) {
    var rd = Q.REG[el.getAttribute('data-key')], rows = Q.S.registers[rd.key] || [];
    var keys = rd.fields.map(function (f) { return f.k; }).concat(rd.cols.filter(function (c) { return !rd.fields.some(function (f) { return f.k === c; }); }));
    Q.csv(rd.form + '_' + rd.title + '_' + Q.today() + '.csv', keys.map(function (k) { return colLabel(rd, k); }), rows.map(function (r) { return keys.map(function (k) { return r[k]; }); }));
  });
  /* CSV 가져오기: 첫 줄 = 열 이름(라벨 또는 키) — 기존 엑셀 대장을 그대로 옮길 때 사용 */
  Q.on('regImport', function (el) {
    var rd = Q.REG[el.getAttribute('data-key')];
    Q.pickFile('.csv,text/csv', function (file) {
      var rd2 = new FileReader();
      rd2.onload = function () {
        var rows = Q.parseCsv(String(rd2.result).replace(/^﻿/, ''));
        if (rows.length < 2) { Q.toast('데이터가 없습니다'); return; }
        var head = rows[0].map(function (h) { h = h.trim(); var f = rd.fields.filter(function (x) { return x.k === h || x.label === h || colLabel(rd, x.k) === h; })[0]; return f ? f.k : null; });
        var n = 0, list = Q.S.registers[rd.key] = Q.S.registers[rd.key] || [];
        rows.slice(1).forEach(function (r) {
          if (!r.some(function (v) { return v.trim(); })) return;
          var o = { id: Q.uid(rd.key), created: Q.today(), by: Q.me() };
          head.forEach(function (k, i) { if (k) o[k] = (r[i] || '').trim(); });
          if (rd.calc) rd.calc(o); list.push(o); n++;
        });
        Q.save(); Q.rerender(); Q.toast(n + '건 가져왔습니다 (인식한 열: ' + head.filter(Boolean).length + '개)');
      };
      rd2.readAsText(file, 'utf-8');
    });
  });
  Q.parseCsv = function (txt) {
    var rows = [], row = [], cur = '', q = false;
    for (var i = 0; i < txt.length; i++) {
      var c = txt[i];
      if (q) { if (c === '"') { if (txt[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
      else if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && txt[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; }
      else cur += c;
    }
    if (cur || row.length) { row.push(cur); rows.push(row); }
    return rows;
  };
  Q.pickFile = function (accept, cb) {
    var i = document.createElement('input'); i.type = 'file'; i.accept = accept;
    i.onchange = function () { if (i.files[0]) cb(i.files[0]); }; i.click();
  };
  Q.on('regToNcr', function (el) {
    var key = el.getAttribute('data-key'), r = (Q.S.registers[key] || []).filter(function (x) { return x.id === el.getAttribute('data-id'); })[0];
    Q._pendingCustIssue = r;
    Q.newNcr({ source: '고객불만', title: r.title, customer: r.customer, item: r.part, lot: r.qty ? r.qty + 'EA' : '', date: r.date, desc: r.title, link: 'reg/custIssues' });
  });

  /* 관리대장 메뉴 */
  Q.route('reg', function (a) { return a[0] && Q.REG[a[0]] ? Q.REG[a[0]].title : '관리대장'; }, function (args) {
    var groups = [['기획·리스크', ['issues', 'swot', 'risks']], ['설비·계측', ['equipment', 'instruments', 'tools']], ['구매·협력사', ['suppliers', 'partApprovals']], ['고객·부적합', ['custIssues', 'rework']], ['개선·역량', ['suggestions', 'quals']]];
    var cur = args[0] && Q.REG[args[0]] ? args[0] : null;
    var h = '<div class="tiles">' + groups.map(function (g) {
      return g[1].map(function (k) {
        var rd = Q.REG[k], n = (Q.S.registers[k] || []).length, due = 0;
        if (rd.due) (Q.S.registers[k] || []).forEach(function (r) { var d = Q.daysUntil(r[rd.due]); if (r[rd.due] && d !== null && d <= 14 && !(rd.doneIf && rd.doneIf(r))) due++; });
        return '<div class="tile ' + (cur === k ? 'good' : '') + (due ? ' warn' : '') + '" data-go="reg/' + k + '" style="' + (cur === k ? 'border-color:var(--accent)' : '') + '"><div class="k">' + E(g[0]) + '</div><div class="s"><b>' + E(rd.title) + '</b></div><div class="v">' + n + '</div>' + (due ? '<div class="s" style="color:var(--warn)">기한 임박·초과 ' + due + '</div>' : '') + '</div>';
      }).join('');
    }).join('') + '</div>';
    if (cur) h += Q.regView(cur);
    else h += '<div class="empty">관리할 대장을 선택하세요. 기존 엑셀 대장은 CSV로 저장 후 "CSV 가져오기"로 옮길 수 있습니다.</div>';
    return h;
  });
  Q.route('change4m', '4M 변경관리', function () {
    var rows = Q.S.registers.change4m || [], steps = ['신청', '검토', '고객승인', '초품확인', '초기유동', '완료'];
    return '<div class="tiles">' + steps.map(function (s) { return '<div class="tile"><div class="k">' + s + '</div><div class="v">' + rows.filter(function (r) { return r.status === s; }).length + '</div></div>'; }).join('') + '</div>' +
      '<div class="card"><h2>변경점 관리 흐름 (MD-0803 / 8.5.6)</h2><p class="small muted">신청 → 영향 검토(품질·FMEA·작업표준) → 고객 통보/승인(MD-0803-002) → 초품 확인 → 초기유동 관리 → 완료(표준류 반영). 고객 승인이 필요한 변경은 승인 전 양산 적용 금지.</p></div>' +
      Q.regView('change4m');
  });

  /* ───────── 사진 첨부 (증빙) ───────── */
  Q.photoBox = function (photos) {
    return '<div class="fld" style="margin-top:12px"><label>사진·증빙 첨부</label><div class="row" data-photos>' + photos.map(function (p, i) { return thumb(p, i); }).join('') +
      '<label class="btn sm" style="cursor:pointer">＋ 사진<input type="file" accept="image/*" multiple hidden data-photo-in></label></div><div class="small muted">자동으로 1280px로 줄여 저장합니다.</div></div>';
  };
  function thumb(p, i) { return '<span style="position:relative;display:inline-block"><img src="' + p.data + '" style="height:64px;border-radius:4px;border:1px solid var(--line)" title="' + E(p.name) + '"><button class="btn sm ghost" data-photo-del="' + i + '" style="position:absolute;top:-6px;right:-6px;padding:0 5px;background:var(--surface)">✕</button></span>'; }
  Q.bindPhotoBox = function (root, photos) {
    var box = root.querySelector('[data-photos]'); if (!box) return;
    function redraw() { Q.$$('span', box).forEach(function (s) { s.remove(); }); box.insertAdjacentHTML('afterbegin', photos.map(thumb).join('')); }
    root.addEventListener('click', function (e) { var b = e.target.closest('[data-photo-del]'); if (b) { e.preventDefault(); photos.splice(+b.getAttribute('data-photo-del'), 1); redraw(); } else { var im = e.target.closest('[data-photos] img'); if (im) window.open().document.write('<img src="' + im.src + '" style="max-width:100%">'); } });
    root.querySelector('[data-photo-in]').addEventListener('change', function (e) {
      Array.prototype.forEach.call(e.target.files, function (file) {
        Q.shrinkImage(file, function (data) { photos.push({ name: file.name, data: data, date: Q.today() }); redraw(); });
      });
    });
  };
  Q.shrinkImage = function (file, cb) {
    var fr = new FileReader();
    fr.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 1280, w = img.width, h = img.height, s = Math.min(1, max / Math.max(w, h));
        var c = document.createElement('canvas'); c.width = Math.round(w * s); c.height = Math.round(h * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); cb(c.toDataURL('image/jpeg', 0.72));
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  };

  /* ───────── 양식 · 전자기록 엔진 ─────────
     form 정의(seed-forms.js의 formDetails로 보강):
       register: 관리대장 키 → 대장 화면으로 운영
       special: 'kpi' | 'audit' | 'review' | 'training' | 'spc' | 'msa' | 'ncr' | 'org' | 'custeval' → 전용 화면
       header: [{k,label,type}] 머리 항목, cols: [{k,label,type,options}] 기록 표 열, items: [고정 행 항목], approval: ['작성','검토','승인']
       cycle: 작성 주기 (매일/매주/매월/분기/반기/년/수시) */
  Q.finalizeSeed = function () {
    var S = window.SEED, det = S.formDetails || {};
    var SPECIAL = {
      'MD-0902-001': 'audit', 'MD-0902-002': 'audit', 'MD-0902-003': 'audit', 'MD-0902-004': 'audit', 'MD-0902-005': 'audit',
      'MD-0901-002': 'review', 'MD-0901-003': 'review', 'MD-0901-004': 'kpi', 'MD-0801-001': 'org',
      'MD-0703-001': 'training', 'MD-0703-002': 'training', 'MI-0702-001': 'msa', 'MI-0808-001': 'spc', 'MI-0808-002': 'spc', 'MI-0701-002': 'docs'
    };
    var REGMAP = {};
    Q.REG_LIST.forEach(function (rd) { REGMAP[rd.form] = rd.key; });
    REGMAP['MD-0701-003'] = 'equipment'; REGMAP['MD-0804-001'] = 'equipment'; REGMAP['MD-0812-002'] = 'instruments'; REGMAP['MD-1002-003'] = 'custIssues';
    var CYCLE = { 'MD-0804-004': '매일', 'MD-0804-006': '매일', 'MI-0801-004': '수시', 'MD-0804-005': '매월', 'MI-1001-001': '매월', 'MD-0901-001': '수시', 'MD-0808-002': '매월', 'MD-0701-001': '년', 'MD-0903-002': '년', 'MD-0903-003': '년', 'MI-0601-001': '년', 'MD-0401-001': '년', 'MD-1001-001': '분기' };
    S.forms = (S.formList || []).concat((S.extraForms || []).map(function (x) { x.extra = true; return x; })).map(function (f) {
      var o = Q.clone(f), d = det[f.code] || {};
      Object.keys(d).forEach(function (k) { o[k] = d[k]; });
      if (!o.special && SPECIAL[f.code]) o.special = SPECIAL[f.code];
      if (!o.register && REGMAP[f.code]) o.register = REGMAP[f.code];
      if (!o.cycle && CYCLE[f.code]) o.cycle = CYCLE[f.code];
      return o;
    });
    /* 절차서 상세(seed-docs.js) 병합 */
    var dd = S.docDetails || {};
    (S.documents || []).forEach(function (doc) {
      var x = dd[doc.code]; if (!x) return;
      Object.keys(x).forEach(function (k) { if (x[k] !== undefined && x[k] !== '' && !(Array.isArray(x[k]) && !x[k].length)) doc[k] = x[k]; });
    });
    S.kpis = (S.objectiveKpis || []).concat(S.kpis || []);
    S.registerSeed = S.registerSeed || {};
  };

  var SPECIAL_ROUTE = { audit: 'audit', review: 'review', kpi: 'kpi', org: 'company/org', training: 'training', msa: 'msa', spc: 'spc', docs: 'docs', custeval: 'custeval' };
  Q.route('forms', function (a) { var f = a[0] && Q.form(a[0]); return f ? f.code + ' ' + f.title : '양식·기록'; }, function (args) {
    if (args[0]) return formPage(Q.form(args[0]), args[1]);
    var st = Q.S.settings.formFilter || {};
    var list = (window.SEED.forms || []).filter(function (f) { var d = Q.doc(f.doc) || {}; return (!st.proc || d.process === st.proc) && Q.match({ c: f.code, t: f.title }, st.q); });
    var h = '<div class="card"><h2>업무 운영 캘린더 — 주기별 기록 이행 현황 <span class="sp"></span><span class="small muted">마지막 작성일 기준 자동 판정</span></h2>' + cycleBoard() + '</div>';
    h += '<div class="card"><div class="filters"><input data-inp="formQ" placeholder="양식번호·양식명" value="' + E(st.q || '') + '"><select data-chg="formProc"><option value="">전체 프로세스</option>' +
      (window.SEED.processes || []).map(function (p) { return '<option value="' + p.code + '"' + (st.proc === p.code ? ' selected' : '') + '>' + E(p.code + ' ' + p.name) + '</option>'; }).join('') + '</select></div>' +
      Q.table([
        { label: '양식번호', html: function (f) { return '<a href="#/forms/' + E(f.code) + '"><b class="mono">' + E(f.code) + '</b></a>'; } },
        { label: '양식명', k: 'title' },
        { label: '상위 문서', html: function (f) { var d = Q.doc(f.doc); return d ? '<a href="#/docs/' + E(d.code) + '">' + E(d.code) + '</a> ' + E(d.title) : E(f.doc); } },
        { label: '운영 방식', html: function (f) { return f.register ? Q.chip('관리대장', 'sp') : f.special ? Q.chip('전용 화면', 'mp') : Q.chip('전자기록', 'acc'); } },
        { label: '주기', k: function (f) { return f.cycle || ''; } },
        { label: '기록', n: 1, k: function (f) { return (Q.S.records[f.code] || []).length + (f.register ? (Q.S.registers[f.register] || []).length : 0); } },
        { label: '최근 작성', k: function (f) { return lastDate(f) || ''; } }
      ], list, { rowAttr: function (f) { return ' class="click" data-go="forms/' + E(f.code) + '"'; } }) + '</div>';
    return h;
  });
  Q.on('formQ', function (el) { Q.S.settings.formFilter = Q.S.settings.formFilter || {}; Q.S.settings.formFilter.q = el.value; clearTimeout(Q._fq); Q._fq = setTimeout(function () { Q.rerender(); var i = Q.$('[data-inp="formQ"]'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }, 300); });
  Q.on('formProc', function (el) { Q.S.settings.formFilter = Q.S.settings.formFilter || {}; Q.S.settings.formFilter.proc = el.value; Q.rerender(); });

  function lastDate(f) {
    var ds = (Q.S.records[f.code] || []).map(function (r) { return r.date; });
    if (f.register) ds = ds.concat((Q.S.registers[f.register] || []).map(function (r) { return r.date || r.updated || r.created; }));
    ds = ds.filter(Boolean).sort(); return ds[ds.length - 1];
  }
  var CYC_DAYS = { '매일': 1, '매주': 7, '매월': 31, '분기': 92, '반기': 183, '년': 366 };
  function cycleBoard() {
    var forms = (window.SEED.forms || []).filter(function (f) { return CYC_DAYS[f.cycle]; });
    if (!forms.length) return '<div class="empty small">주기가 지정된 양식 없음</div>';
    return Q.table([
      { label: '주기', html: function (f) { return Q.chip(f.cycle, 'acc'); } },
      { label: '양식', html: function (f) { return '<a href="#/forms/' + E(f.code) + '">' + E(f.code + ' ' + f.title) + '</a>'; } },
      { label: '작성 부서', k: function (f) { return (Q.doc(f.doc) || {}).owner || ''; } },
      { label: '최근 작성', k: function (f) { return lastDate(f) || '없음'; } },
      { label: '상태', html: function (f) {
        var l = lastDate(f); if (!l) return Q.chip('미작성', 'crit');
        var late = -Q.daysUntil(l) - CYC_DAYS[f.cycle];
        return late > 0 ? Q.chip(late + '일 지연', late > CYC_DAYS[f.cycle] ? 'crit' : 'warn') : Q.chip('정상', 'good');
      } }
    ], forms.sort(function (a, b) { return CYC_DAYS[a.cycle] - CYC_DAYS[b.cycle]; }), { max: 360 });
  }

  function formPage(f, recId) {
    if (!f) return '<div class="empty">양식을 찾을 수 없습니다</div>';
    var d = Q.doc(f.doc);
    var h = '<div class="row no-print" style="margin-bottom:12px"><a href="#/forms">← 양식 목록</a>' + (d ? ' · <a href="#/docs/' + E(d.code) + '">' + E(d.code + ' ' + d.title) + '</a>' : '') + '</div>';
    if (f.special && SPECIAL_ROUTE[f.special]) return h + '<div class="card"><h2>' + E(f.code + ' ' + f.title) + '</h2><p>이 양식은 전용 화면에서 작성·관리합니다.</p><button class="btn pri" data-go="' + SPECIAL_ROUTE[f.special] + '">전용 화면으로 이동 →</button>' + formSpecHtml(f) + '</div>';
    if (f.register) return h + (f.note ? '<p class="small muted">' + E(f.note) + '</p>' : '') + Q.regView(f.register) + (formSpecHtml(f) ? '<div class="card"><h2>원본 양식 구조</h2>' + formSpecHtml(f) + '</div>' : '');
    if (recId) return h + recordView(f, recId);
    var recs = Q.S.records[f.code] || [];
    h += '<div class="card"><h2>' + E(f.code + ' ' + f.title) + '<span class="sp"></span>' + (f.cycle ? Q.chip('주기 ' + f.cycle, 'acc') : '') + '<button class="btn pri sm" data-act="recNew" data-f="' + E(f.code) + '">새 기록 작성</button></h2>' +
      (f.purpose ? '<p class="small muted">' + E(f.purpose) + '</p>' : '') +
      Q.table([{ label: '작성일', k: 'date' }, { label: '제목', k: 'title' }, { label: '작성자', k: 'by' }, { label: '결재', html: function (r) { return Q.statusChip(r.status || '작성'); } }, { label: '첨부', k: function (r) { return r.photos && r.photos.length ? '📷' + r.photos.length : ''; } }],
        recs, { rowAttr: function (r) { return ' class="click" data-go="forms/' + E(f.code) + '/' + r.id + '"'; }, empty: '작성된 기록이 없습니다' }) + '</div>';
    if (formSpecHtml(f)) h += '<div class="card"><h2>양식 구조</h2>' + formSpecHtml(f) + '</div>';
    return h;
  }
  function formSpecHtml(f) {
    var p = [];
    if (f.header && f.header.length) p.push('<b>머리 항목</b>: ' + E(f.header.map(function (x) { return x.label; }).join(' · ')));
    if (f.cols && f.cols.length) p.push('<b>기록 표</b>: ' + E(f.cols.map(function (x) { return x.label; }).join(' · ')));
    if (f.items && f.items.length) p.push('<b>고정 항목</b>: ' + f.items.length + '개');
    if (f.approval) p.push('<b>결재</b>: ' + E(f.approval.join(' / ')));
    if (f.retention) p.push('<b>보존</b>: ' + E(f.retention));
    if (f.url) p.push('<a href="' + E(f.url) + '" target="_blank" rel="noopener">원본 양식 열기</a>');
    return p.length ? '<p class="small">' + p.join('<br>') + '</p>' + blankForm(f) : '';
  }
  /* 빈 양식 미리보기 — 원본 양식 구조(머리 항목·표·고정 항목·결재)를 종이 양식처럼 */
  function blankForm(f) {
    if (!(f.cols && f.cols.length) && !(f.header && f.header.length)) return '';
    var cols = colsOf(f), items = f.items || [];
    var rows = items.length ? items.map(function (it) { var o = {}; o[cols[0].k] = typeof it === 'string' ? it : it.text; if (it.std && cols[1]) o[cols[1].k] = it.std; return o; }) : [{}, {}, {}, {}];
    return '<details' + (items.length ? ' open' : '') + ' style="margin-top:12px"><summary class="small"><b>양식 미리보기</b> (고정 항목 ' + items.length + '개)</summary><div style="border:1px solid var(--line-2);border-radius:6px;padding:14px;margin-top:8px;background:var(--surface)">' +
      '<div class="row" style="align-items:flex-start"><div style="flex:1"><div class="small muted">' + E(Q.S.company.name) + '</div><b style="font-size:17px">' + E(f.title) + '</b><div class="small mono muted">' + E(f.code) + '</div></div>' + Q.approvalBox(f.approval || ['작성', '검토', '승인']) + '</div>' +
      '<table class="tbl" style="margin:10px 0"><tbody><tr>' + [{ label: '작성일' }].concat(f.header || []).map(function (h) { return '<th style="width:1%">' + E(h.label) + '</th><td>' + (h.options ? '<span class="small muted">' + E(h.options.join(' / ')) + '</span>' : '') + '</td>'; }).join('</tr><tr>') + '</tr></tbody></table>' +
      Q.table(cols.map(function (c) { return { label: c.label, html: function (r) { return r[c.k] !== undefined ? E(r[c.k]) : (c.options ? '<span class="small muted">' + E(c.options.join(' / ')) + '</span>' : ''); } }; }), rows) + '</div></details>';
  }
  function hdrFields(f) {
    var base = [{ k: 'date', label: '작성일', type: 'date', def: Q.today(), req: true }, { k: 'title', label: '제목/대상', req: true }];
    return base.concat((f.header || []).filter(function (x) { return x.k !== 'date' && x.k !== 'title'; }));
  }
  function colsOf(f) { return f.cols && f.cols.length ? f.cols : [{ k: 'item', label: '항목' }, { k: 'content', label: '내용' }, { k: 'result', label: '결과' }, { k: 'remark', label: '비고' }]; }
  Q.on('recNew', function (el) { recEditor(Q.form(el.getAttribute('data-f')), null); });
  Q.on('recEdit', function (el) { var f = Q.form(el.getAttribute('data-f')); recEditor(f, (Q.S.records[f.code] || []).filter(function (r) { return r.id === el.getAttribute('data-id'); })[0]); });
  function recEditor(f, r) {
    var hf = hdrFields(f), cols = colsOf(f), items = f.items || [];
    var data = r ? Q.clone(r) : { rows: items.length ? items.map(function (it) { var o = {}; o[cols[0].k] = typeof it === 'string' ? it : it.text; if (it.std && cols[1]) o[cols[1].k] = it.std; return o; }) : [{}, {}, {}] };
    var hv = {}; hf.forEach(function (x) { hv[x.k] = r ? (x.k === 'date' || x.k === 'title' ? r[x.k] : (r.h || {})[x.k]) : undefined; });
    var photos = r && r.photos ? r.photos.slice() : [];
    var body = Q.formHtml(hf, hv) + '<h3>' + E(f.tableTitle || '기록') + '</h3><div class="tbl-wrap"><table class="tbl" id="recTbl"><thead><tr>' + cols.map(function (c) { return '<th>' + E(c.label) + '</th>'; }).join('') + '<th></th></tr></thead><tbody>' +
      data.rows.map(function (row) { return rowHtml(cols, row); }).join('') + '</tbody></table></div><div class="row" style="margin-top:6px"><button class="btn sm" id="recAddRow">＋ 행 추가</button></div>' +
      '<div class="fld" style="margin-top:12px"><label>특이사항</label><textarea name="_note" rows="2">' + E(r ? r.note : '') + '</textarea></div>' + Q.photoBox(photos);
    var m = Q.modal(f.code + ' ' + f.title + (r ? ' — 수정' : ' — 작성'), body, [{ label: '취소' }, { label: '저장', cls: 'pri', fn: function (mm) {
      var o = Q.readForm(mm, hf); if (!o) return false;
      var rows = Q.$$('#recTbl tbody tr', mm).map(function (tr) { var x = {}; cols.forEach(function (c, i) { x[c.k] = tr.querySelectorAll('[data-c]')[i].value; }); return x; }).filter(function (x) { return Object.keys(x).some(function (k) { return x[k]; }); });
      var t = r || { id: Q.uid('r'), by: Q.me(), status: '작성', created: Q.today() };
      t.date = o.date; t.title = o.title; t.h = {}; hf.forEach(function (x) { if (x.k !== 'date' && x.k !== 'title') t.h[x.k] = o[x.k]; });
      t.rows = rows; t.note = mm.querySelector('[name="_note"]').value; t.photos = photos;
      var list = Q.S.records[f.code] = Q.S.records[f.code] || [];
      if (!r) list.unshift(t);
      Q.save(); Q.go('forms/' + encodeURIComponent(f.code) + '/' + t.id);
    } }], { wide: true });
    m.querySelector('#recAddRow').addEventListener('click', function (e) { e.preventDefault(); m.querySelector('#recTbl tbody').insertAdjacentHTML('beforeend', rowHtml(cols, {})); });
    m.querySelector('#recTbl').addEventListener('click', function (e) { var b = e.target.closest('[data-delrow]'); if (b) { e.preventDefault(); b.closest('tr').remove(); } });
    Q.bindPhotoBox(m, photos);
  }
  function rowHtml(cols, row) {
    return '<tr>' + cols.map(function (c) {
      var v = row[c.k] === undefined ? '' : row[c.k];
      if (c.options) return '<td><select data-c>' + ['<option></option>'].concat(c.options.map(function (o) { return '<option' + (o === v ? ' selected' : '') + '>' + E(o) + '</option>'; })).join('') + '</select></td>';
      return '<td><input data-c' + (c.type === 'number' ? ' type="number" step="any"' : c.type === 'date' ? ' type="date"' : '') + ' value="' + E(v) + '"></td>';
    }).join('') + '<td><button class="btn sm ghost" data-delrow>✕</button></td></tr>';
  }
  function recordView(f, id) {
    var r = (Q.S.records[f.code] || []).filter(function (x) { return x.id === id; })[0];
    if (!r) return '<div class="empty">기록 없음</div>';
    var cols = colsOf(f), hf = hdrFields(f), appr = f.approval || ['작성', '검토', '승인'];
    var h = '<div class="row no-print" style="margin-bottom:12px"><a href="#/forms/' + E(f.code) + '">← ' + E(f.code) + ' 기록 목록</a><span class="sp"></span>' +
      '<button class="btn" data-act="recEdit" data-f="' + E(f.code) + '" data-id="' + r.id + '">수정</button>' +
      '<button class="btn" data-act="recSign" data-f="' + E(f.code) + '" data-id="' + r.id + '">결재</button>' +
      '<button class="btn" data-act="recCopy" data-f="' + E(f.code) + '" data-id="' + r.id + '">복사해서 새로 작성</button>' +
      '<button class="btn" onclick="window.print()">인쇄 / PDF</button><button class="btn danger" data-act="recDel" data-f="' + E(f.code) + '" data-id="' + r.id + '">삭제</button></div>';
    h += '<div class="card"><div class="row" style="align-items:flex-start"><div style="flex:1"><div class="small muted">' + E(Q.S.company.name) + '</div><h2 style="font-size:20px;margin:4px 0">' + E(f.title) + '</h2>' +
      '<div class="small muted mono">' + E(f.code) + ' · Rev.' + E((Q.doc(f.doc) || {}).rev || '1') + (f.retention ? ' · 보존 ' + E(f.retention) : '') + '</div></div>' + Q.approvalBox(appr, r.sign) + '</div><hr>' +
      '<dl class="kv">' + hf.map(function (x) { var v = x.k === 'date' || x.k === 'title' ? r[x.k] : (r.h || {})[x.k]; return '<dt>' + E(x.label) + '</dt><dd>' + E(v || '-') + '</dd>'; }).join('') + '</dl>' +
      '<h3>' + E(f.tableTitle || '기록') + '</h3>' + Q.table(cols.map(function (c) { return { label: c.label, k: c.k }; }), r.rows || []) +
      (r.note ? '<h3>특이사항</h3><p class="pre">' + E(r.note) + '</p>' : '') +
      (r.photos && r.photos.length ? '<h3>첨부 사진</h3><div class="row">' + r.photos.map(function (p) { return '<img src="' + p.data + '" style="max-height:220px;border:1px solid var(--line);border-radius:4px">'; }).join('') + '</div>' : '') +
      '<p class="small muted" style="margin-top:12px">작성 ' + E(r.by) + ' · ' + E(r.created || r.date) + (r.signLog ? ' · 결재 이력: ' + E(r.signLog.join(' / ')) : '') + '</p></div>';
    return h;
  }
  Q.on('recSign', function (el) {
    var f = Q.form(el.getAttribute('data-f')), r = (Q.S.records[f.code] || []).filter(function (x) { return x.id === el.getAttribute('data-id'); })[0];
    var appr = f.approval || ['작성', '검토', '승인']; r.sign = r.sign || {};
    var fields = appr.map(function (a) { return { k: a, label: a + ' (성명)', type: 'user' }; });
    Q.modal('결재 — ' + f.code, Q.formHtml(fields, r.sign) + '<p class="small muted">현재 사용자: ' + E(Q.me()) + ' · 결재 시각이 이력에 남습니다.</p>', [{ label: '취소' }, { label: '결재 저장', cls: 'pri', fn: function (m) {
      var o = Q.readForm(m, fields); r.signLog = r.signLog || [];
      appr.forEach(function (a) { if (o[a] && r.sign[a] !== o[a]) r.signLog.push(a + ' ' + o[a] + ' ' + new Date().toLocaleString('ko-KR')); });
      r.sign = o; r.status = o[appr[appr.length - 1]] ? '승인' : o[appr[1]] ? '검토' : '작성';
      Q.save(); Q.rerender();
    } }]);
  });
  Q.on('recCopy', function (el) {
    var f = Q.form(el.getAttribute('data-f')), r = (Q.S.records[f.code] || []).filter(function (x) { return x.id === el.getAttribute('data-id'); })[0];
    var c = Q.clone(r); c.id = Q.uid('r'); c.date = Q.today(); c.sign = {}; c.signLog = []; c.status = '작성'; c.photos = []; c.by = Q.me(); c.created = Q.today();
    Q.S.records[f.code].unshift(c); Q.save(); Q.go('forms/' + encodeURIComponent(f.code) + '/' + c.id); Q.toast('복사했습니다 — 값을 수정하세요');
  });
  Q.on('recDel', function (el) {
    var fc = el.getAttribute('data-f'), id = el.getAttribute('data-id');
    Q.confirm('이 기록을 삭제할까요?', function () { Q.S.records[fc] = (Q.S.records[fc] || []).filter(function (r) { return r.id !== id; }); Q.save(); Q.go('forms/' + encodeURIComponent(fc)); });
  });
})();
