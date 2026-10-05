/* 원본 바로 보기 · 터틀맵 · 엑셀/CSV 읽기 · 교육계획 자동 작성 */
(function () {
  'use strict';
  var E = Q.esc;

  /* ───────── 원본(정정본) 화면 미리보기 ───────── */
  function prevOf(code) {
    var p = /^\.\.\//.test(code) ? code : Q.origFile(code); if (!p) return null;
    var v = (window.PREVIEWS || {})[p.normalize ? p.normalize('NFC') : p];
    return v ? { file: p, p: v.p, k: v.k, s: v.s } : { file: p, p: null };
  }
  Q.previewOf = prevOf;
  /* 한 파일에 여러 양식이 시트로 들어 있으면 양식명과 가장 닮은 시트를 먼저 연다 */
  function bestSheet(v, title) {
    if (!v.s || v.s.length < 2 || !title) return '';
    var t = String(title).replace(/\s/g, ''), best = '', sc = 0;
    v.s.forEach(function (n) {
      var m = String(n).replace(/\s/g, ''), s = 0;
      if (t.indexOf(m) >= 0 || m.indexOf(t) >= 0) s = 100 + m.length;
      else for (var i = 0; i < m.length - 1; i++) if (t.indexOf(m.substr(i, 2)) >= 0) s++;
      if (s > sc) { sc = s; best = n; }
    });
    return sc >= 2 ? best : '';
  }
  Q.viewer = function (code, opt) {
    opt = opt || {};
    var v = prevOf(code);
    if (!v) return '';
    var name = decodeURIComponent(v.file.split('/').pop());
    var dl = '<a class="btn sm" href="' + E(v.file) + '"' + Q.dlAttr(v.file) + '>' + (/^https?:/.test(v.file) ? 'Drive에서 열기' : '원본 파일 받기') + '</a>';
    if (!v.p) return '<div class="card viewer"><h2>' + E(opt.title || '원본 보기') + '<span class="sp"></span>' + dl + '</h2><div class="empty small">이 원본은 Google Drive에 있습니다 — "Drive에서 열기"로 확인하세요.</div></div>';
    var sh = bestSheet(v, opt.sheetHint), src = v.p + (sh ? '?s=' + encodeURIComponent(sh) : '');
    var info = v.k === 'pptx' ? '슬라이드 ' + v.s.length + '장' : (v.s.length > 1 ? '시트 ' + v.s.length + '개 — 위쪽 탭으로 전환' : '');
    var body = '<iframe class="vframe" src="' + E(src) + '" title="' + E(name) + '" loading="lazy" style="height:' + (opt.h || (v.k === 'pptx' ? '80vh' : '78vh')) + '"></iframe>';
    var head = E(opt.title || '원본 보기') + ' <span class="small muted" style="font-weight:400">' + E(name) + (info ? ' · ' + info : '') + '</span><span class="sp"></span>' +
      '<a class="btn sm" href="' + E(src) + '" target="_blank" rel="noopener">새 창</a>' + dl;
    if (opt.collapsed) return '<details class="card viewer"><summary><b>' + head + '</b></summary>' + body + '</details>';
    return '<div class="card viewer"><h2>' + head + '</h2>' + body + '</div>';
  };

  /* ───────── 터틀맵 (원본 프로세스 '터틀분석' 시트) ───────── */
  Q.turtle = function (code) {
    var t = (window.TURTLE || {})[code]; if (!t) return '';
    function box(k, cls, icon, en) {
      return '<div class="tt ' + cls + '"><div class="th"><span class="ti">' + icon + '</span>' + E(t[k + 'Label'] || '') + '<small>' + en + '</small></div><ul>' +
        (t[k] || []).map(function (v) {
          var m = /([가-힣A-Za-z0-9 ·]+?(?:절차서|지침서|매뉴얼))/.exec(v), d = m && (Q.S.docs || []).filter(function (x) { return x.title.replace(/\s/g, '') === m[1].replace(/\s/g, ''); })[0];
          return '<li>' + (d ? '<a href="#/docs/' + E(d.code) + '">' + E(v) + '</a> <span class="code small">' + E(d.code) + '</span>' : E(v)) + '</li>';
        }).join('') + '</ul></div>';
    }
    return '<div class="card"><h2>터틀맵 (프로세스 분석) <span class="small muted" style="font-weight:400">원본 「터틀분석」 시트</span></h2><div class="turtlemap">' +
      box('what', 'a', '⚙', 'With what') + box('who', 'b', '👤', 'With whom') + box('input', 'c', '→', 'Input') +
      '<div class="tt core"><svg viewBox="0 0 100 86" preserveAspectRatio="none"><polygon points="25,1 75,1 99,43 75,85 25,85 1,43"/></svg><span><b>' + E(t.name) + '</b><small>PROCESS</small><em class="code">' + E(code) + '</em></span></div>' +
      box('output', 'd', '→', 'Output') + box('how', 'e', '☰', 'How') + box('measure', 'f', '◎', 'How measured') + '</div></div>';
  };

  /* ───────── 엑셀(xlsx)·CSV 읽기 — 외부 라이브러리 없이 ───────── */
  function inflate(bytes) {
    if (typeof DecompressionStream === 'undefined') return Promise.reject(new Error('이 브라우저는 엑셀 직접 읽기를 지원하지 않습니다 — CSV로 저장해 올려 주세요'));
    var ds = new DecompressionStream('deflate-raw');
    var w = ds.writable.getWriter(); w.write(bytes); w.close();
    return new Response(ds.readable).arrayBuffer().then(function (b) { return new Uint8Array(b); });
  }
  function unzip(buf) {
    var u = new Uint8Array(buf), dv = new DataView(buf), files = {};
    var e = u.length - 22; while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    if (e < 0) throw new Error('엑셀(xlsx) 파일이 아닙니다');
    var n = dv.getUint16(e + 10, true), off = dv.getUint32(e + 16, true), td = new TextDecoder();
    for (var i = 0; i < n; i++) {
      var meth = dv.getUint16(off + 10, true), csz = dv.getUint32(off + 20, true), nl = dv.getUint16(off + 28, true), xl = dv.getUint16(off + 30, true), cl = dv.getUint16(off + 32, true), lo = dv.getUint32(off + 42, true);
      var name = td.decode(u.subarray(off + 46, off + 46 + nl));
      var ds = lo + 30 + dv.getUint16(lo + 26, true) + dv.getUint16(lo + 28, true);
      files[name] = { m: meth, d: u.subarray(ds, ds + csz) };
      off += 46 + nl + xl + cl;
    }
    return function (name) {
      var f = files[name]; if (!f) return Promise.resolve(null);
      return (f.m === 0 ? Promise.resolve(f.d) : inflate(f.d)).then(function (b) { return new TextDecoder().decode(b); });
    };
  }
  function xml(t) { return new DOMParser().parseFromString(t, 'application/xml'); }
  function colIdx(ref) { var m = /^([A-Z]+)/.exec(ref), n = 0; for (var i = 0; i < m[1].length; i++) n = n * 26 + m[1].charCodeAt(i) - 64; return n - 1; }
  function readXlsx(buf) {
    var get = unzip(buf), ss = [];
    return get('xl/sharedStrings.xml').then(function (t) {
      if (t) [].forEach.call(xml(t).getElementsByTagName('si'), function (si) { ss.push([].map.call(si.getElementsByTagName('t'), function (x) { return x.textContent; }).join('')); });
      return Promise.all([get('xl/workbook.xml'), get('xl/_rels/workbook.xml.rels')]);
    }).then(function (r) {
      var wb = xml(r[0]), rels = xml(r[1]), sheets = [];
      var map = {}; [].forEach.call(rels.getElementsByTagName('Relationship'), function (x) { map[x.getAttribute('Id')] = x.getAttribute('Target'); });
      [].forEach.call(wb.getElementsByTagName('sheet'), function (s) {
        var id = s.getAttribute('r:id') || s.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id');
        var t = map[id] || ''; t = t.replace(/^\//, ''); if (t.indexOf('xl/') !== 0) t = 'xl/' + t;
        if (s.getAttribute('state') !== 'hidden') sheets.push({ name: s.getAttribute('name'), path: t });
      });
      return Promise.all(sheets.map(function (s) { return get(s.path).then(function (t) {
        var rows = [];
        if (t) [].forEach.call(xml(t).getElementsByTagName('row'), function (row) {
          var ri = (+row.getAttribute('r') || rows.length + 1) - 1, arr = rows[ri] = rows[ri] || [];
          [].forEach.call(row.getElementsByTagName('c'), function (c) {
            var ty = c.getAttribute('t'), v = c.getElementsByTagName('v')[0], val = '';
            if (ty === 's') val = ss[+(v && v.textContent)] || '';
            else if (ty === 'inlineStr') val = [].map.call(c.getElementsByTagName('t'), function (x) { return x.textContent; }).join('');
            else val = v ? v.textContent : '';
            arr[colIdx(c.getAttribute('r') || 'A1')] = val;
          });
        });
        for (var i = 0; i < rows.length; i++) { rows[i] = rows[i] || []; for (var j = 0; j < rows[i].length; j++) if (rows[i][j] === undefined) rows[i][j] = ''; }
        return { name: s.name, rows: rows };
      }); }));
    });
  }
  /* file → Promise<[{name, rows}]>  (CSV 는 시트 1개) */
  Q.readTable = function (file) {
    return new Promise(function (ok, no) {
      var r = new FileReader();
      if (/\.xlsx$/i.test(file.name)) { r.onload = function () { readXlsx(r.result).then(ok, no); }; r.readAsArrayBuffer(file); }
      else if (/\.xls$/i.test(file.name)) no(new Error('구형 .xls 는 엑셀에서 .xlsx 또는 CSV로 다시 저장해 주세요'));
      else { r.onload = function () { var t = String(r.result).replace(/^﻿/, ''); ok([{ name: file.name, rows: /\t/.test(t.split('\n')[0]) && !/,/.test(t.split('\n')[0]) ? t.split(/\r?\n/).map(function (l) { return l.split('\t'); }) : Q.parseCsv(t) }]); }; r.readAsText(file, 'utf-8'); }
    });
  };
  /* 엑셀 날짜 일련번호 → YYYY-MM-DD */
  Q.xlDate = function (v) {
    if (/^\d{5}(\.\d+)?$/.test(String(v)) && +v > 20000 && +v < 80000) { var d = new Date(Math.round((+v - 25569) * 864e5)); return d.toISOString().slice(0, 10); }
    var m = /^(\d{4})[.\-/년\s]+(\d{1,2})[.\-/월\s]+(\d{1,2})/.exec(String(v)); if (m) return m[1] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[3]).slice(-2);
    return v;
  };

  /* ───────── 관리대장: 엑셀/CSV 일괄 등록 (머리글 행 자동 탐색) ───────── */
  function regFields(rd) { return rd.fields || []; }
  /* 원본 엑셀 대장의 열 이름 ↔ 시스템 항목 (서로 다른 표현) */
  var ALIAS = { '교정일자': 'last', '교정일': 'last', '최근교정일자': 'last', '기기번호': 'serial', '일련번호': 'serial', 'sn': 'serial', '차기교정일자': 'next', '다음교정일': 'next', '교정기관명': 'agency', '설비번호': 'no', '관리no': 'no', '업체': 'name', '협력사명': 'name', '거래처': 'name', '품번': 'part', '품명': 'part', '제안자': 'by', '제안일': 'date', '발생일': 'date', '접수일': 'date', '접수일자': 'date', '고객사': 'customer', '성명': 'name', '이름': 'name' };
  function norm(s) { return String(s || '').replace(/[\s()\[\]·.\-_/]/g, '').replace(/\(.*\)/, '').toLowerCase(); }
  Q.on('regImport', function (el) {
    var rd = Q.REG[el.getAttribute('data-key')];
    Q.pickFile('.xlsx,.csv,.txt,text/csv', function (file) {
      Q.readTable(file).then(function (sheets) {
        var fs = regFields(rd), best = null;
        sheets.forEach(function (sh) {
          sh.rows.slice(0, 30).forEach(function (row, ri) {
            var head = row.map(function (h) { var n = norm(h); if (!n) return null; var al = ALIAS[n]; if (al && fs.some(function (x) { return x.k === al; })) return al; var f = fs.filter(function (x) { var a = norm(x.label), b = norm(x.label.replace(/\s*\(.*\)$/, '')); return x.k === h || a === n || b === n || (n.length >= 2 && (b.indexOf(n) === 0 || n.indexOf(b) === 0)); })[0]; return f ? f.k : null; });
            var hit = head.filter(Boolean).length;
            if (!best || hit > best.hit) best = { hit: hit, head: head, rows: sh.rows.slice(ri + 1), sheet: sh.name };
          });
        });
        if (!best || best.hit < 1) { Q.toast('열 이름을 찾지 못했습니다 — "가져오기 양식"의 머리글을 첫 줄에 두세요'); return; }
        var list = Q.S.registers[rd.key] = Q.S.registers[rd.key] || [], n = 0;
        best.rows.forEach(function (r) {
          if (!r.some(function (v) { return String(v).trim(); })) return;
          var o = { id: Q.uid(rd.key), created: Q.today(), by: Q.me() }, any = false;
          best.head.forEach(function (k, i) { if (!k) return; var v = String(r[i] === undefined ? '' : r[i]).trim(); var f = fs.filter(function (x) { return x.k === k; })[0]; if (f && f.type === 'date') v = Q.xlDate(v); if (v) any = true; o[k] = v; });
          if (!any) return;
          if (rd.calc) rd.calc(o); list.push(o); n++;
        });
        Q.save(); Q.rerender(); Q.toast(n + '건 가져왔습니다 · 시트 「' + best.sheet + '」 · 인식한 열 ' + best.hit + '개');
      }, function (e) { Q.toast(e.message || String(e)); });
    });
  });
  Q.on('regTpl', function (el) {
    var rd = Q.REG[el.getAttribute('data-key')];
    Q.csv(rd.form + '_' + rd.title + '_가져오기양식.csv', regFields(rd).map(function (f) { return f.label.replace(/\s*\(.*\)$/, ''); }), []);
  });

  /* ───────── SPC: 엑셀/CSV 측정값 불러오기 ───────── */
  Q.on('spcFile', function () {
    Q.pickFile('.xlsx,.csv,.txt,text/csv', function (file) {
      Q.readTable(file).then(function (sheets) {
        var best = null;
        sheets.forEach(function (sh) {
          var lines = sh.rows.map(function (r) { return r.map(function (v) { return String(v).trim(); }).filter(function (v) { return v !== '' && !isNaN(+v); }); }).filter(function (r) { return r.length >= 2; });
          if (!best || lines.length > best.lines.length) best = { lines: lines, name: sh.name };
        });
        if (!best || !best.lines.length) { Q.toast('숫자 데이터를 찾지 못했습니다'); return; }
        var w = {}; best.lines.forEach(function (r) { w[r.length] = (w[r.length] || 0) + 1; });
        var size = +Object.keys(w).sort(function (a, b) { return w[b] - w[a]; })[0];
        var data = best.lines.filter(function (r) { return r.length === size; }).map(function (r) { return r.map(function (v) { return String(Math.round(+v * 1e6) / 1e6); }).join(' '); });
        Q.$('#spcData').value = data.join('\n');
        if (!Q.$('#spcName').value) Q.$('#spcName').value = file.name.replace(/\.[^.]+$/, '');
        Q.actions.spcRun(); Q.toast('부분군 ' + data.length + '개 × ' + size + ' 불러옴 (' + best.name + ')');
      }, function (e) { Q.toast(e.message || String(e)); });
    });
  });

  /* ───────── 교육훈련 연간 계획 자동 작성 ───────── */
  var MIN_M = 1;
  function addMonths(y, m) { m = Math.min(12, Math.max(m, MIN_M)); return y + '-' + ('0' + m).slice(-2) + '-15'; }
  /* 10월 이후면 다음 해 계획, 그 전이면 올해 남은 달에 배치 */
  Q.trainingYear = function () { var d = new Date(); return d.getMonth() >= 9 ? d.getFullYear() + 1 : d.getFullYear(); };
  Q.trainingAuto = function (y) {
    y = +y || Q.trainingYear();
    var now = new Date(); MIN_M = y > now.getFullYear() ? 1 : now.getMonth() + 2;
    var S = Q.S, out = [], have = {};
    (S.trainings || []).forEach(function (t) { if ((t.date || '').slice(0, 4) === String(y)) have[t.title] = 1; });
    var all = (S.users || []).map(function (u) { return u.name; }).join(', ');
    function push(o, why) { if (have[o.title]) return; have[o.title] = 1; o.why = why; out.push(o); }
    push({ title: 'ISO 9001 품질경영시스템 인식 교육 (품질방침·목표)', kind: '사내', date: addMonths(y, 2), hours: 2, target: '전 직원', instructor: '품질팀', attendees: all }, '7.3 인식 — 연 1회 전 직원');
    push({ title: '세메스 SSQ Audit 대응 교육 (45항목·과락 기준)', kind: '사내', date: addMonths(y, 3), hours: 2, target: '부서장·품질팀', instructor: '품질팀' }, '고객 평가(세메스 SSQ) 대비');
    push({ title: '내부심사원 양성·보수 교육', kind: '사외', date: addMonths(y, 4), hours: 8, target: '내부심사원', instructor: '외부 전문기관' }, '9.2 내부심사 — 심사원 자격 유지');
    push({ title: '4M 변경관리·변경점 신고 교육', kind: '사내', date: addMonths(y, 5), hours: 1, target: '제조팀·품질팀', instructor: '품질팀' }, '8.5.6 변경 관리 / SSQ 변경점');
    push({ title: 'SPC·MSA 실무 교육 (X̄-R, Cpk, Gage R&R)', kind: '사내', date: addMonths(y, 6), hours: 3, target: '품질팀·검사원', instructor: '품질팀' }, '9.1 / 7.1.5 측정 자원');
    push({ title: '3정5S·현장 개선 교육', kind: 'OJT', date: addMonths(y, 7), hours: 1, target: '제조팀', instructor: '제조팀장' }, '10.3 지속적 개선 (MI-1001)');
    [1, 4, 7, 10].forEach(function (m) { if (m + 2 < MIN_M) return; push({ title: '산업안전보건 정기교육 ' + Math.ceil(m / 3) + '분기', kind: '법정', date: addMonths(y, m), hours: 3, target: '전 직원', instructor: '관리팀', attendees: all }, '산업안전보건법 — 분기별 정기교육'); });
    (S.courses || []).forEach(function (c, i) { push({ title: c.title, kind: '사내', date: addMonths(y, Math.min(11, 8 + (i % 4))), hours: Q.num(c.hours) || 2, target: c.target || '', instructor: '품질팀', content: (c.objectives || []).join(' / ') }, '사내 교육과정 (평가 문항 ' + ((c.quiz || []).length) + '개)'); });
    (S.registers.quals || []).forEach(function (q) {
      if (q.valid && String(q.valid).slice(0, 4) <= String(y)) push({ title: '자격 재인증 — ' + q.skill + ' (' + q.name + ')', kind: 'OJT', date: (q.valid < y + '-01-01' ? addMonths(y, 1) : q.valid), hours: 2, target: q.name, instructor: '부서장', attendees: q.name }, '자격 유효기한 ' + q.valid);
      else if (q.level && +String(q.level).charAt(0) < 3) push({ title: 'OJT — ' + q.skill + ' 숙련도 향상 (' + q.name + ')', kind: 'OJT', date: addMonths(y, 9), hours: 8, target: q.name, instructor: '부서장', attendees: q.name }, '역량 매트릭스 Lv' + String(q.level).charAt(0) + ' → 3 (단독 수행)');
    });
    var revs = []; Object.keys(S.docHistory || {}).forEach(function (c) { (S.docHistory[c] || []).forEach(function (h) { if ((h.date || '').slice(0, 4) >= String(y - 1)) revs.push(c); }); });
    revs = revs.filter(function (c, i) { return revs.indexOf(c) === i; });
    if (revs.length) push({ title: '제·개정 표준 전달 교육 (' + revs.slice(0, 6).join(', ') + (revs.length > 6 ? ' 외 ' + (revs.length - 6) : '') + ')', kind: '사내', date: addMonths(y, 3), hours: 1, target: '관련 부서', instructor: '관리팀', content: revs.join(', ') }, '7.5 문서 제·개정 ' + revs.length + '건 — 사용자 전달');
    var ncr = (S.ncrs || []).filter(function (n) { return (n.date || '').slice(0, 4) >= String(y - 1); });
    if (ncr.length) push({ title: '부적합 사례 공유·재발방지 교육 (' + ncr.length + '건)', kind: '사내', date: addMonths(y, 6), hours: 1, target: '제조팀·품질팀', instructor: '품질팀', content: ncr.slice(0, 8).map(function (n) { return n.no || n.title; }).join(', ') }, '10.2 부적합·시정조치 ' + ncr.length + '건');
    var fd = (S.audits || []).reduce(function (a, au) { return a.concat((au.findings || []).filter(function (f) { return f.type && f.type !== '관찰'; })); }, []);
    if (fd.length) push({ title: '내부심사 지적사항 개선 교육 (' + fd.length + '건)', kind: '사내', date: addMonths(y, 8), hours: 1, target: '피심사 부서', instructor: '품질팀' }, '9.2 심사 지적 ' + fd.length + '건');
    out.sort(function (a, b) { return a.date.localeCompare(b.date); });
    return out;
  };
  Q.on('trAuto', function () {
    var y = Q.trainingYear(), list = Q.trainingAuto(y);
    if (!list.length) { Q.toast(y + '년 계획에 추가할 항목이 없습니다 (이미 모두 등록됨)'); return; }
    var body = '<p class="small muted">시스템 데이터(전 직원 명단, 교육과정, 자격 유효기한·역량 수준, 문서 제·개정, 부적합, 내부심사 지적)와 법정·ISO·세메스 SSQ 요구를 바탕으로 ' + y + '년 교육훈련 계획서(MD-0703-002)를 만듭니다. 필요 없는 항목은 체크를 해제하세요. 일자·강사는 등록 후 수정할 수 있습니다.</p>' +
      '<div class="tbl-wrap" style="max-height:52vh"><table class="tbl"><thead><tr><th><input type="checkbox" checked data-chg="trAutoAll"></th><th>예정일</th><th>교육명</th><th>구분</th><th>대상</th><th>시간</th><th>근거</th></tr></thead><tbody>' +
      list.map(function (t, i) { return '<tr><td><input type="checkbox" class="trpick" value="' + i + '" checked></td><td>' + E(t.date) + '</td><td><b>' + E(t.title) + '</b></td><td>' + E(t.kind) + '</td><td>' + E(t.target) + '</td><td>' + E(t.hours) + '</td><td class="small muted">' + E(t.why) + '</td></tr>'; }).join('') + '</tbody></table></div>';
    Q.modal(y + '년 교육훈련 계획 자동 작성 (' + list.length + '건)', body, [{ label: '취소' }, { label: '선택 항목 계획에 등록', cls: 'pri', fn: function (m) {
      var n = 0;
      [].forEach.call(m.querySelectorAll('.trpick'), function (c) { if (!c.checked) return; var t = list[+c.value]; Q.S.trainings.push({ id: Q.uid('tr'), title: t.title, kind: t.kind, date: t.date, hours: t.hours, target: t.target, instructor: t.instructor, attendees: t.attendees || '', content: (t.content ? t.content + ' / ' : '') + '근거: ' + t.why, status: '계획', by: Q.me(), auto: true }); n++; });
      Q.S.trainings.sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });
      Q.save(); Q.rerender(); Q.toast(n + '건을 교육훈련 계획에 등록했습니다');
    } }], { wide: true });
  });
  Q.on('trAutoAll', function (el) { [].forEach.call(document.querySelectorAll('.trpick'), function (c) { c.checked = el.checked; }); });

  /* 교육훈련 결과 보고서 (연간 자동 집계) */
  Q.trainingReport = function (y) {
    var S = Q.S, T = (S.trainings || []).filter(function (t) { return (t.date || '').slice(0, 4) === String(y); });
    var done = T.filter(function (t) { return t.status === '완료'; }), late = T.filter(function (t) { return t.status === '계획' && Q.daysUntil(t.date) < 0; });
    var ppl = function (t) { return (t.attendees || '').split(/[,，]/).filter(function (x) { return x.trim(); }).length || 1; };
    var hrs = done.reduce(function (s, t) { return s + (Q.num(t.hours) || 0) * ppl(t); }, 0);
    var qr = (S.quizResults || []).filter(function (r) { return (r.date || '').slice(0, 4) === String(y); });
    var avg = qr.length ? Math.round(qr.reduce(function (s, r) { return s + r.pct; }, 0) / qr.length) : null;
    var eff = done.filter(function (t) { return t.effect && t.effect !== '재교육 필요'; }).length, re = done.filter(function (t) { return t.effect === '재교육 필요'; });
    var kinds = {}; done.forEach(function (t) { kinds[t.kind || '기타'] = (kinds[t.kind || '기타'] || 0) + 1; });
    var rate = T.length ? Math.round(100 * done.length / T.length) : 0;
    return '<div class="card"><h2>' + y + '년 교육훈련 결과 보고 (자동 집계) <span class="sp"></span><button class="btn sm" onclick="window.print()">인쇄</button></h2>' +
      '<div class="tiles" style="grid-template-columns:repeat(5,1fr)"><div class="tile"><div class="k">계획 대비 실시율 (KPI)</div><div class="v">' + rate + '%</div><div class="s">' + done.length + ' / ' + T.length + '건</div></div>' +
      '<div class="tile' + (late.length ? ' warn' : '') + '"><div class="k">지연</div><div class="v">' + late.length + '</div></div><div class="tile"><div class="k">교육시간 (인·시)</div><div class="v">' + Q.fmt(hrs, 1) + '</div></div>' +
      '<div class="tile"><div class="k">평가 평균</div><div class="v">' + (avg === null ? '-' : avg + '점') + '</div><div class="s">응시 ' + qr.length + '명</div></div><div class="tile' + (re.length ? ' warn' : '') + '"><div class="k">효과성 확인</div><div class="v">' + eff + '</div><div class="s">재교육 필요 ' + re.length + '</div></div></div>' +
      '<p class="small">구분별 실시: ' + (Object.keys(kinds).map(function (k) { return k + ' ' + kinds[k] + '건'; }).join(' · ') || '없음') + (late.length ? ' · <b style="color:var(--warn)">지연 교육: ' + E(late.map(function (t) { return t.title; }).join(', ')) + '</b>' : '') + (re.length ? ' · 재교육 대상: ' + E(re.map(function (t) { return t.title; }).join(', ')) : '') + '</p>' +
      '<p class="small muted">이 집계는 경영검토(9.3.2) 입력과 KPI 「교육계획 달성률」에 그대로 쓰입니다.</p></div>';
  };

  /* 원본 엑셀(KPI·내부심사 체크시트) 접이식 보기 */
  var R = '../원본_정정본/';
  function wrap(name, fn) { var o = Q.routes[name] && Q.routes[name].fn; if (o) Q.routes[name].fn = function (a) { return o(a) + (fn(a || []) || ''); }; }
  wrap('kpi', function () { return Q.viewer(R + '4_KPI_성과지표/KPI 성과 지표.xlsx', { title: 'KPI 성과지표 원본 (엑셀)', collapsed: true }) + Q.viewer(R + '4_KPI_성과지표/핵심KPI LIST 모니터링_R1.xlsx', { title: '핵심 KPI 모니터링 원본 (엑셀)', collapsed: true }); });
  wrap('audit', function (a) {
    var t = a[0] || 'iso';
    if (t === 'iso') return Q.viewer(R + '5_내부심사_체크시트/내부심사 체크시트.xlsx', { title: '내부심사 체크시트 원본 (엑셀)', collapsed: true });
    if (t === 'ssq') return Q.viewer(R + '5_내부심사_체크시트/내부심사 체크시트_rev2_251104_newSSQ.xlsx', { title: '세메스 SSQ 체크시트 원본 (엑셀)', collapsed: true });
    return '';
  });
  wrap('verify', function () { return Q.viewer(R + '9_정정내역_및_연동표/원본대비_정정내역.xlsx', { title: '원본 대비 정정 내역 (엑셀)', collapsed: true }); });
})();
