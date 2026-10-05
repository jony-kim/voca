/* MST QMS — 공통 유틸 · 저장소 · 라우터 · UI 부품 */
(function () {
  'use strict';

  var Q = window.Q = {};

  /* ───────── 유틸 ───────── */
  Q.esc = function (s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  Q.uid = function (p) { return (p || 'id') + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); };
  Q.clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  Q.today = function () { var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
  Q.month = function () { return Q.today().slice(0, 7); };
  Q.addDays = function (iso, n) { var d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + n); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
  Q.daysUntil = function (iso) { if (!iso) return null; return Math.round((new Date(iso + 'T00:00:00') - new Date(Q.today() + 'T00:00:00')) / 864e5); };
  Q.fmt = function (n, d) { if (n === null || n === undefined || n === '' || isNaN(n)) return '-'; return Number(n).toLocaleString('ko-KR', { maximumFractionDigits: d === undefined ? 2 : d, minimumFractionDigits: 0 }); };
  Q.num = function (v) { if (v === '' || v === null || v === undefined) return null; var n = Number(String(v).replace(/,/g, '')); return isNaN(n) ? null : n; };
  Q.$ = function (sel, root) { return (root || document).querySelector(sel); };
  Q.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  Q.arr = function (v) { return Array.isArray(v) ? v : (v ? [v] : []); };
  Q.byKey = function (list, key) { var m = {}; (list || []).forEach(function (x) { m[x[key]] = x; }); return m; };
  Q.match = function (obj, q) {
    if (!q) return true;
    q = q.toLowerCase();
    return JSON.stringify(obj).toLowerCase().indexOf(q) >= 0;
  };

  Q.download = function (filename, content, mime) {
    var blob = content instanceof Blob ? content : new Blob([content], { type: mime || 'application/octet-stream' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  /* CSV (엑셀에서 한글이 깨지지 않도록 BOM 포함) */
  Q.csv = function (filename, header, rows) {
    function cell(v) { v = v === null || v === undefined ? '' : String(v); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
    var out = [header.map(cell).join(',')].concat(rows.map(function (r) { return r.map(cell).join(','); })).join('\r\n');
    Q.download(filename, '﻿' + out, 'text/csv;charset=utf-8');
  };

  /* ───────── 저장소 ─────────
     · 브라우저: localStorage
     · 데스크톱 앱(Electron): 사용자가 지정한 JSON 데이터 파일 (공유폴더/NAS/MYBOX 동기화 폴더 지정 가능) */
  var KEY = 'mstqms.state.v1';
  var saveTimer = null;
  Q.native = window.mstNative || null;

  function emptyState() {
    return {
      seedVersion: 0, savedAt: null,
      company: null, docs: null, kpis: null, checklists: null, courses: null,
      kpiActuals: {}, records: {}, registers: {},
      ncrs: [], audits: [], trainings: [], reviews: [], quizResults: [],
      docHistory: {}, users: [], settings: { theme: 'auto', user: '' }
    };
  }

  /* 시드(드라이브 원본 반영) → 상태 초기화 / 버전 업 시 신규 항목만 추가 */
  function applySeed(st) {
    var S = window.SEED;
    if (!st.company) st.company = Q.clone(S.company);
    function mergeList(field, list, key) {
      if (!st[field]) { st[field] = Q.clone(list || []); return; }
      var have = Q.byKey(st[field], key);
      (list || []).forEach(function (x) { if (!have[x[key]]) st[field].push(Q.clone(x)); });
    }
    mergeList('docs', S.documents, 'code');
    mergeList('kpis', S.kpis, 'id');
    mergeList('checklists', S.checklists, 'id');
    mergeList('courses', S.courses, 'id');
    if (st.seedVersion < S.version) {
      (S.kpis || []).forEach(function (k) {
        Object.keys(k.actuals || {}).forEach(function (m) {
          st.kpiActuals[k.id] = st.kpiActuals[k.id] || {};
          if (st.kpiActuals[k.id][m] === undefined) st.kpiActuals[k.id][m] = k.actuals[m];
        });
      });
      Object.keys(S.registerSeed || {}).forEach(function (r) {
        st.registers[r] = st.registers[r] || [];
        if (!st.registers[r].length) st.registers[r] = Q.clone(S.registerSeed[r]);
      });
      if (!st.users.length && S.users) st.users = Q.clone(S.users);
      st.seedVersion = S.version;
    }
    return st;
  }

  Q.load = function () {
    var raw = null;
    if (Q.native) raw = Q.native.readData();
    else { try { raw = localStorage.getItem(KEY); } catch (e) { raw = null; } }
    var st = emptyState();
    if (raw) { try { var p = JSON.parse(raw); Object.keys(p).forEach(function (k) { st[k] = p[k]; }); } catch (e) { console.error(e); Q.toast('저장 데이터 읽기 실패 — 백업에서 복원하세요'); } }
    Q.S = applySeed(st);
    Q.save(true);
  };

  Q.save = function (now) {
    clearTimeout(saveTimer);
    function run() {
      Q.S.savedAt = new Date().toISOString();
      var txt = JSON.stringify(Q.S);
      try {
        if (Q.native) Q.native.writeData(txt);
        else localStorage.setItem(KEY, txt);
      } catch (e) { console.error(e); Q.toast('저장 실패: 저장 공간을 확인하고 백업을 받아두세요'); }
      var el = Q.$('#savedAt'); if (el) el.textContent = '저장 ' + Q.S.savedAt.slice(11, 19);
    }
    if (now) run(); else saveTimer = setTimeout(run, 250);
  };

  Q.exportBackup = function () {
    Q.download('MST_QMS_백업_' + Q.today() + '.json', JSON.stringify(Q.S, null, 1), 'application/json');
    Q.S.settings.lastBackup = Q.today(); Q.save();
  };
  Q.importBackup = function (file, cb) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var p = JSON.parse(r.result);
        if (!p || typeof p !== 'object' || !('docs' in p)) throw new Error('형식 오류');
        var st = emptyState(); Object.keys(p).forEach(function (k) { st[k] = p[k]; });
        Q.S = applySeed(st); Q.save(true); cb && cb(true);
      } catch (e) { Q.toast('백업 파일을 읽을 수 없습니다: ' + e.message); cb && cb(false); }
    };
    r.readAsText(file, 'utf-8');
  };
  Q.resetAll = function () {
    Q.S = applySeed(emptyState()); Q.save(true);
  };

  /* 조회 도우미 */
  Q.doc = function (code) { return (Q.S.docs || []).filter(function (d) { return d.code === code; })[0]; };
  Q.form = function (code) { return (window.SEED.forms || []).filter(function (f) { return f.code === code; })[0]; };
  Q.proc = function (code) { return (window.SEED.processes || []).filter(function (p) { return p.code === code; })[0]; };
  Q.clause = function (no) { return (window.SEED.clauses || []).filter(function (c) { return c.no === no; })[0]; };
  Q.me = function () { return Q.S.settings.user || '담당자'; };

  /* ───────── 라우터 ───────── */
  Q.routes = {};
  Q.route = function (name, title, fn, opt) { Q.routes[name] = { title: title, fn: fn, opt: opt || {} }; };
  Q.go = function (path) { location.hash = '#/' + path; };
  Q.parse = function () {
    var h = location.hash.replace(/^#\/?/, '') || 'dashboard';
    var parts = h.split('/').map(decodeURIComponent);
    return { name: parts[0], args: parts.slice(1) };
  };
  Q.render = function () {
    var r = Q.parse();
    var rt = Q.routes[r.name] || Q.routes.dashboard;
    Q.$$('.nav a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-r') === r.name); });
    var page = Q.$('#page');
    var title = typeof rt.title === 'function' ? rt.title(r.args) : rt.title;
    Q.$('#title').textContent = title;
    document.title = title + ' · MST QMS';
    try { page.innerHTML = rt.fn(r.args) || ''; }
    catch (e) { console.error(e); page.innerHTML = '<div class="card"><h2>화면 오류</h2><pre class="pre small">' + Q.esc(e.stack || e) + '</pre></div>'; }
    if (rt.after) rt.after(r.args);
    (Q.afterRender || []).splice(0).forEach(function (f) { try { f(); } catch (e) { console.error(e); } });
    Q.$('.side').classList.remove('open');
    Q.$('.main').scrollTop = 0;
    Q.refreshBadges && Q.refreshBadges();
  };
  Q.afterRender = [];
  Q.after = function (fn) { Q.afterRender.push(fn); };
  Q.rerender = function () { var m = Q.$('.main'); var y = m.scrollTop; Q.render(); m.scrollTop = y; };

  /* ───────── 이벤트 위임 ───────── */
  Q.actions = {};
  Q.on = function (name, fn) { Q.actions[name] = fn; };
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-go]');
    if (!t) return;
    if (t.hasAttribute('data-go')) { e.preventDefault(); Q.go(t.getAttribute('data-go')); return; }
    var fn = Q.actions[t.getAttribute('data-act')];
    if (fn) { e.preventDefault(); fn(t, e); }
  });
  document.addEventListener('change', function (e) {
    var t = e.target.closest('[data-chg]');
    if (!t) return;
    var fn = Q.actions[t.getAttribute('data-chg')];
    if (fn) fn(t, e);
  });
  document.addEventListener('input', function (e) {
    var t = e.target.closest('[data-inp]');
    if (!t) return;
    var fn = Q.actions[t.getAttribute('data-inp')];
    if (fn) fn(t, e);
  });

  /* ───────── UI 부품 ───────── */
  Q.toast = function (msg) {
    var el = document.createElement('div'); el.className = 'toast'; el.textContent = msg;
    document.body.appendChild(el); setTimeout(function () { el.remove(); }, 2600);
  };

  Q.modal = function (title, bodyHtml, buttons, opt) {
    Q.closeModal();
    opt = opt || {};
    var bg = document.createElement('div'); bg.className = 'modal-bg'; bg.id = 'modal';
    var btns = (buttons || []).map(function (b, i) {
      return '<button class="btn ' + (b.cls || '') + '" data-mbtn="' + i + '">' + Q.esc(b.label) + '</button>';
    }).join('');
    bg.innerHTML = '<div class="modal" style="' + (opt.wide ? 'width:min(1180px,100%)' : '') + '"><header><h3>' + Q.esc(title) + '</h3>' +
      '<button class="btn sm" data-mprint>인쇄</button><button class="btn sm ghost" data-mclose>✕</button></header>' +
      '<div class="body">' + bodyHtml + '</div>' + (btns ? '<footer>' + btns + '</footer>' : '') + '</div>';
    document.body.appendChild(bg);
    bg.addEventListener('click', function (e) {
      if (e.target === bg && !opt.sticky) Q.closeModal();
      if (e.target.closest('[data-mclose]')) Q.closeModal();
      if (e.target.closest('[data-mprint]')) Q.printModal();
      var b = e.target.closest('[data-mbtn]');
      if (b) { var def = buttons[+b.getAttribute('data-mbtn')]; if (def.fn && def.fn(bg) === false) return; Q.closeModal(); }
    });
    var f = bg.querySelector('input,select,textarea'); if (f) f.focus();
    return bg;
  };
  Q.closeModal = function () { var m = Q.$('#modal'); if (m) m.remove(); };
  Q.printModal = function () { document.body.classList.add('printing-modal'); window.print(); setTimeout(function () { document.body.classList.remove('printing-modal'); }, 300); };
  Q.confirm = function (msg, fn) { Q.modal('확인', '<p>' + Q.esc(msg) + '</p>', [{ label: '취소' }, { label: '확인', cls: 'pri', fn: fn }]); };

  /* 필드 정의 → 입력 위젯
     field: {k, label, type: text|textarea|date|number|select|user|dept|doc|month, options, full, req} */
  Q.input = function (f, val) {
    var v = val === undefined || val === null ? (f.def !== undefined ? f.def : '') : val;
    var name = ' name="' + Q.esc(f.k) + '"' + (f.req ? ' required' : '');
    var opts;
    switch (f.type) {
      case 'textarea': return '<textarea' + name + ' rows="' + (f.rows || 3) + '">' + Q.esc(v) + '</textarea>';
      case 'date': return '<input type="date"' + name + ' value="' + Q.esc(v) + '">';
      case 'month': return '<input type="month"' + name + ' value="' + Q.esc(v) + '">';
      case 'number': return '<input type="number" step="any"' + name + ' value="' + Q.esc(v) + '">';
      case 'select':
      case 'dept':
      case 'user':
      case 'doc':
        if (f.type === 'dept') opts = (Q.S.company.depts || []).map(function (d) { return d.name; });
        else if (f.type === 'user') opts = (Q.S.users || []).map(function (u) { return u.name; });
        else if (f.type === 'doc') opts = (Q.S.docs || []).map(function (d) { return d.code + ' ' + d.title; });
        else opts = f.options || [];
        if (v && opts.indexOf(v) < 0) opts = [v].concat(opts);
        return '<select' + name + '><option value=""></option>' + opts.map(function (o) {
          return '<option' + (o === v ? ' selected' : '') + '>' + Q.esc(o) + '</option>';
        }).join('') + '</select>';
      default: return '<input type="text"' + name + ' value="' + Q.esc(v) + '"' + (f.list ? ' list="' + f.list + '"' : '') + '>';
    }
  };
  Q.formHtml = function (fields, data) {
    data = data || {};
    return '<div class="form">' + fields.map(function (f) {
      return '<div class="fld' + (f.full || f.type === 'textarea' ? ' full' : '') + '"><label>' + Q.esc(f.label) + (f.req ? ' *' : '') + '</label>' + Q.input(f, data[f.k]) + (f.hint ? '<div class="small muted">' + Q.esc(f.hint) + '</div>' : '') + '</div>';
    }).join('') + '</div>';
  };
  Q.readForm = function (root, fields) {
    var o = {}, miss = [];
    fields.forEach(function (f) {
      var el = root.querySelector('[name="' + f.k + '"]');
      if (!el) return;
      var v = el.value;
      if (f.type === 'number') v = Q.num(v);
      o[f.k] = v;
      if (f.req && (v === '' || v === null)) miss.push(f.label);
    });
    if (miss.length) { Q.toast('필수 항목: ' + miss.join(', ')); return null; }
    return o;
  };

  /* 표 */
  Q.table = function (cols, rows, opt) {
    opt = opt || {};
    if (!rows.length) return '<div class="empty">' + Q.esc(opt.empty || '등록된 항목이 없습니다') + '</div>';
    return '<div class="tbl-wrap"' + (opt.max ? ' style="max-height:' + opt.max + 'px"' : '') + '><table class="tbl"><thead><tr>' +
      cols.map(function (c) { return '<th' + (c.w ? ' style="width:' + c.w + '"' : '') + '>' + Q.esc(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>' + rows.map(function (r, i) {
        var attrs = opt.rowAttr ? opt.rowAttr(r, i) : '';
        return '<tr' + attrs + '>' + cols.map(function (c) {
          var v = c.html ? c.html(r, i) : Q.esc(typeof c.k === 'function' ? c.k(r, i) : r[c.k]);
          return '<td' + (c.n ? ' class="n"' : '') + '>' + v + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  };

  Q.tabs = function (id, items, cur) {
    return '<div class="tabs" data-tabs="' + id + '">' + items.map(function (t) {
      return '<button class="' + (t[0] === cur ? 'on' : '') + '" data-go="' + Q.esc(t[2]) + '">' + Q.esc(t[1]) + '</button>';
    }).join('') + '</div>';
  };

  Q.chip = function (txt, cls) { return '<span class="chip ' + (cls || '') + '">' + Q.esc(txt) + '</span>'; };
  Q.typeChip = function (t) { return Q.chip(t, (t || '').toLowerCase()); };
  Q.statusChip = function (s) {
    var map = { '완료': 'good', '종결': 'good', '승인': 'good', '적합': 'good', '달성': 'good', '유효': 'good', '합격': 'good',
      '진행': 'acc', '진행중': 'acc', '검토': 'acc', '계획': 'acc', '조치중': 'acc', '개정중': 'warn',
      '지연': 'crit', '부적합': 'crit', '미달': 'crit', '기한초과': 'crit', '불합격': 'crit', '만료': 'crit',
      '관찰': 'warn', '접수': 'warn', '임박': 'warn', '보류': 'warn' };
    return Q.chip(s || '-', map[s] || '');
  };
  Q.dueChip = function (iso, done) {
    if (!iso) return '';
    if (done) return Q.chip(iso, 'good');
    var d = Q.daysUntil(iso);
    if (d < 0) return Q.chip(iso + ' (' + (-d) + '일 초과)', 'crit');
    if (d <= 14) return Q.chip(iso + ' (D-' + d + ')', 'warn');
    return Q.chip(iso, '');
  };
  Q.bar = function (pct, cls) { pct = Math.max(0, Math.min(100, pct || 0)); return '<div class="bar ' + (cls || '') + '"><i style="width:' + pct + '%"></i></div>'; };
  Q.approvalBox = function (labels, vals) {
    vals = vals || {};
    return '<div class="approval">' + labels.map(function (l) { return '<div><b>' + Q.esc(l) + '</b><span>' + Q.esc(vals[l] || '') + '</span></div>'; }).join('') + '</div>';
  };

  /* ───────── SVG 차트 (오프라인 · 외부 라이브러리 없음) ───────── */
  Q.lineChart = function (series, opt) {
    opt = opt || {};
    var W = opt.w || 640, H = opt.h || 220, L = 44, R = 14, T = 14, B = 28;
    var labels = opt.labels || [];
    var vals = [];
    series.forEach(function (s) { s.data.forEach(function (v) { if (v !== null && v !== undefined) vals.push(v); }); });
    (opt.lines || []).forEach(function (l) { if (l.v !== null && l.v !== undefined) vals.push(l.v); });
    if (!vals.length) return '<div class="empty small">데이터 없음</div>';
    var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals);
    if (opt.zero && mn > 0) mn = 0;
    if (mn === mx) { mn -= 1; mx += 1; }
    var pad = (mx - mn) * 0.08; mn -= pad; mx += pad;
    var n = Math.max(labels.length, series[0] ? series[0].data.length : 0);
    function x(i) { return L + (n <= 1 ? (W - L - R) / 2 : i * (W - L - R) / (n - 1)); }
    function y(v) { return T + (mx - v) / (mx - mn) * (H - T - B); }
    var g = '<g class="grid">';
    for (var k = 0; k <= 4; k++) {
      var gv = mn + (mx - mn) * k / 4;
      g += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(gv) + '" y2="' + y(gv) + '"/>' +
        '<text x="' + (L - 6) + '" y="' + (y(gv) + 4) + '" text-anchor="end">' + Q.fmt(gv, Math.abs(mx - mn) < 5 ? 3 : 1) + '</text>';
    }
    g += '</g>';
    var step = Math.ceil(n / 12);
    var xl = labels.map(function (l, i) { return i % step ? '' : '<text x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + Q.esc(l) + '</text>'; }).join('');
    var lines = (opt.lines || []).map(function (l) {
      if (l.v === null || l.v === undefined) return '';
      return '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(l.v) + '" y2="' + y(l.v) + '" stroke="' + l.color + '" stroke-dasharray="' + (l.dash || '5 4') + '" stroke-width="1.3"/>' +
        '<text x="' + (W - R) + '" y="' + (y(l.v) - 4) + '" text-anchor="end" style="fill:' + l.color + '">' + Q.esc(l.label) + ' ' + Q.fmt(l.v, 3) + '</text>';
    }).join('');
    var paths = series.map(function (s) {
      var d = '', pts = '';
      s.data.forEach(function (v, i) {
        if (v === null || v === undefined) return;
        d += (d ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1);
        var bad = s.flag && s.flag(v, i);
        pts += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="' + (bad ? 4.5 : 3) + '" fill="' + (bad ? 'var(--crit)' : s.color) + '"><title>' + Q.esc((labels[i] || i + 1) + ': ' + Q.fmt(v, 3)) + '</title></circle>';
      });
      return '<path d="' + d + '" fill="none" stroke="' + s.color + '" stroke-width="2"/>' + pts;
    }).join('');
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img">' + g + lines + paths + xl + '</svg>';
  };

  Q.barChart = function (items, opt) {
    opt = opt || {};
    if (!items.length) return '<div class="empty small">데이터 없음</div>';
    var W = opt.w || 640, rowH = 26, L = opt.left || 150, R = 50, H = items.length * rowH + 10;
    var mx = Math.max.apply(null, items.map(function (i) { return i.v; }).concat([opt.max || 0, 1]));
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '">' + items.map(function (it, i) {
      var w = (W - L - R) * it.v / mx, yy = 5 + i * rowH;
      return '<text class="lbl" x="' + (L - 8) + '" y="' + (yy + 15) + '" text-anchor="end">' + Q.esc(it.label) + '</text>' +
        '<rect x="' + L + '" y="' + (yy + 3) + '" width="' + Math.max(w, 1) + '" height="16" rx="3" fill="' + (it.color || 'var(--accent)') + '"/>' +
        '<text x="' + (L + w + 6) + '" y="' + (yy + 15) + '">' + Q.esc(it.txt !== undefined ? it.txt : Q.fmt(it.v)) + '</text>';
    }).join('') + '</svg>';
  };
})();
