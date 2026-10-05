/* MST QMS — 로그인 · 사용자 권한
   · 사용자별 PIN(숫자 1~8자리, 해시 저장) — 초기 PIN은 1, 설정·백업에서 변경합니다.
   · 권한: 관리자(전체) / 작성자(기록·대장 작성) / 열람(보기·인쇄·내보내기만)
   PIN은 사내에서 "누가 작성했는지"를 남기기 위한 장치이며, 데이터 파일 자체를 암호화하지는 않습니다. */
(function () {
  'use strict';
  var Q = window.Q, E = Q.esc, SKEY = 'mstqms.session';

  function hash(pin, name) { /* FNV-1a 64bit 근사 + 반복 — 평문 저장 방지용 */
    var s = 'mst-qms|' + name + '|' + pin, h1 = 0x811c9dc5, h2 = 0x01000193;
    for (var r = 0; r < 2000; r++) for (var i = 0; i < s.length; i++) { h1 = Math.imul(h1 ^ s.charCodeAt(i), 16777619) >>> 0; h2 = Math.imul(h2 ^ (s.charCodeAt(i) + r), 2246822507) >>> 0; }
    return ('0000000' + h1.toString(16)).slice(-8) + ('0000000' + h2.toString(16)).slice(-8);
  }
  var DEFAULT_PIN = '1';
  Q.PERMS = ['관리자', '작성자', '열람'];
  Q.perm = function () { var u = Q.curUser(); return u ? (u.perm || '작성자') : '열람'; };
  Q.curUser = function () { return (Q.S.users || []).filter(function (u) { return u.name === Q.S.settings.user; })[0]; };
  function ensurePerms() {
    (Q.S.users || []).forEach(function (u) { if (!u.perm) u.perm = (u.role === '대표이사' || u.role === '품질총괄') ? '관리자' : '작성자'; });
  }

  /* 열람 권한에서 허용되는 동작 (보기·검색·인쇄·내보내기) */
  var READ_OK = /^(changePin|menu|doSearch|docQ|docLv|docTy|docCsv|ncrQ|ncrSt|ncrSrc|ncrCsv|regQ|regCsv|formQ|formProc|kpiCsv|lnkQ|lnkSec|lnkOnly|lnkCsv|revQ|revCsv|trCsv|theme|backup|rerun|logout|spcRun|spcLoad|msaRun|msaGrid|msaSample|setUser)$/;
  var ADMIN_ONLY = /^(resetAll|chooseData|restore|userEdit|issueDone|docApprove|kpiNew|setPerm|resetPin)$/;
  function guard(e) {
    var t = e.target.closest('[data-act],[data-chg],[data-inp]'); if (!t || !Q.S) return;
    if (t.closest('#login')) return;
    var a = t.getAttribute('data-act') || t.getAttribute('data-chg') || t.getAttribute('data-inp');
    var p = Q.perm();
    if (p === '열람' && !READ_OK.test(a)) { block(e, '열람 권한으로는 수정할 수 없습니다'); return; }
    if (p !== '관리자' && ADMIN_ONLY.test(a)) block(e, '관리자 권한이 필요합니다');
  }
  function block(e, msg) { e.preventDefault(); e.stopImmediatePropagation(); if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') { setTimeout(Q.rerender, 0); } Q.toast('🔒 ' + msg); }
  document.addEventListener('click', guard, true);
  document.addEventListener('change', guard, true);
  document.addEventListener('input', guard, true);

  /* ───────── 로그인 화면 ───────── */
  Q.showLogin = function () {
    ensurePerms();
    var old = Q.$('#login'); if (old) old.remove();
    var users = Q.S.users || [];
    var el = document.createElement('div'); el.id = 'login';
    el.innerHTML =
      '<canvas id="lgFx"></canvas><div class="lg-grid"></div>' +
      '<div class="lg-wrap">' +
      '<div class="lg-hero"><div class="lg-orb"><svg viewBox="0 0 120 120"><defs><linearGradient id="lgG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5EE7FF"/><stop offset="1" stop-color="#7B61FF"/></linearGradient></defs>' +
      '<circle cx="60" cy="60" r="54" fill="none" stroke="url(#lgG)" stroke-width="1.5" stroke-dasharray="6 5" class="lg-spin"/><circle cx="60" cy="60" r="42" fill="none" stroke="url(#lgG)" stroke-width="1" opacity=".5" class="lg-spin-r"/>' +
      '<path d="M36 78V44l24 21 24-21v34" fill="none" stroke="url(#lgG)" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/></svg></div>' +
      '<div class="lg-kicker">QUALITY · INTELLIGENCE · SYSTEM</div><h1>MST QMS</h1><p>주식회사 엠에스티 품질경영시스템<br><span>ISO 9001:2015 · 세메스 SSQ 연동 · 반도체 장비 부품(Chuck)</span></p>' +
      '<div class="lg-stats"><div><b>' + (Q.S.docs || []).length + '</b><span>표준문서</span></div><div><b>' + (window.SEED.forms || []).length + '</b><span>양식</span></div><div><b>' + (window.SEED.clauses || []).length + '</b><span>ISO 조항</span></div><div><b>' + (window.SEED.custEval ? [].concat.apply([], window.SEED.custEval.sections.map(function (s) { return s.items; })).length : 0) + '</b><span>SSQ 항목</span></div></div></div>' +
      '<form class="lg-card" autocomplete="off"><div class="lg-title">SIGN IN<span class="lg-dot"></span></div>' +
      '<label>사용자</label><div class="lg-users">' + users.map(function (u, i) {
        return '<button type="button" class="lg-user' + (u.name === Q.S.settings.user ? ' on' : '') + '" data-u="' + i + '"><i>' + E(u.name.slice(0, 1)) + '</i><span><b>' + E(u.name) + '</b><small>' + E((u.role === '대표이사' ? '대표이사' : (u.dept || '')) + ' · ' + (u.perm || '작성자')) + '</small></span></button>';
      }).join('') + '</div>' +
      '<label id="lgPinLbl">PIN</label><input id="lgPin" type="password" inputmode="numeric" maxlength="8" placeholder="•">' +
      '<div class="lg-msg" id="lgMsg"></div><button class="lg-go" type="submit">접속 <span>→</span></button>' +
      '<div class="lg-foot"><span>' + (Q.native ? '데스크톱 · 파일 저장' : '브라우저 · 로컬 저장') + '</span><span>' + E(new Date().toLocaleDateString('ko-KR')) + '</span></div></form></div>';
    document.body.appendChild(el);
    var sel = Math.max(0, users.findIndex(function (u) { return u.name === Q.S.settings.user; }));
    function pick(i) {
      sel = i; Q.$$('.lg-user', el).forEach(function (b, j) { b.classList.toggle('on', j === i); });
      var u = users[i], first = !u.pin;
      Q.$('#lgPinLbl', el).textContent = first ? 'PIN (초기 PIN: 1)' : 'PIN';
      Q.$('#lgMsg', el).textContent = ''; var p = Q.$('#lgPin', el); p.value = ''; p.focus();
    }
    el.addEventListener('click', function (e) { var b = e.target.closest('.lg-user'); if (b) pick(+b.getAttribute('data-u')); });
    el.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      var u = users[sel], pin = Q.$('#lgPin', el).value.trim(), msg = Q.$('#lgMsg', el);
      if (!u) { msg.textContent = '사용자를 선택하세요'; return; }
      if (!/^\d{1,8}$/.test(pin)) { msg.textContent = 'PIN은 숫자 1~8자리입니다'; shake(); return; }
      if ((u.pin || hash(DEFAULT_PIN, u.name)) !== hash(pin, u.name)) { msg.textContent = 'PIN이 맞지 않습니다' + (u.pin ? '' : ' (초기 PIN: 1)'); shake(); return; }
      Q.S.settings.user = u.name; u.lastLogin = new Date().toISOString();
      (Q.S.loginLog = Q.S.loginLog || []).unshift({ at: u.lastLogin, user: u.name }); Q.S.loginLog = Q.S.loginLog.slice(0, 200);
      Q.save(true);
      try { sessionStorage.setItem(SKEY, u.name); } catch (er) { /* 무시 */ }
      el.classList.add('lg-out'); setTimeout(function () { el.remove(); }, 450);
      Q.updateUserBadge(); Q.render();
    });
    function shake() { var c = el.querySelector('.lg-card'); c.classList.remove('lg-shake'); void c.offsetWidth; c.classList.add('lg-shake'); }
    pick(sel);
    fx(el.querySelector('#lgFx'));
  };

  /* 배경: 연결된 입자 네트워크 */
  function fx(cv) {
    var ctx = cv.getContext('2d'), pts = [], W, H, dpr = window.devicePixelRatio || 1, raf;
    function size() { W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener('resize', size);
    for (var i = 0; i < 70; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 });
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function step() {
      if (!document.body.contains(cv)) { cancelAnimationFrame(raf); return; }
      ctx.clearRect(0, 0, W, H);
      pts.forEach(function (p) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; });
      for (var a = 0; a < pts.length; a++) for (var b = a + 1; b < pts.length; b++) {
        var dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y, d = dx * dx + dy * dy;
        if (d < 15000) { ctx.strokeStyle = 'rgba(94,231,255,' + (0.16 * (1 - d / 15000)) + ')'; ctx.beginPath(); ctx.moveTo(pts[a].x, pts[a].y); ctx.lineTo(pts[b].x, pts[b].y); ctx.stroke(); }
      }
      pts.forEach(function (p) { ctx.fillStyle = 'rgba(160,200,255,.55)'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, 6.3); ctx.fill(); });
      if (!reduce) raf = requestAnimationFrame(step);
    }
    step();
  }

  Q.on('logout', function () { try { sessionStorage.removeItem(SKEY); } catch (e) { /* 무시 */ } Q.showLogin(); });
  Q.on('changePin', function () {
    var u = Q.curUser(); if (!u) return;
    var f = [{ k: 'now', label: '현재 PIN' }, { k: 'p1', label: '새 PIN (숫자 1~8자리)' }, { k: 'p2', label: '새 PIN 확인' }];
    Q.modal('PIN 변경 — ' + u.name, Q.formHtml(f) + '<p class="small muted">초기 PIN은 1입니다.</p>', [{ label: '취소' }, { label: '변경', cls: 'pri', fn: function (m) {
      var o = Q.readForm(m, f);
      if ((u.pin || hash(DEFAULT_PIN, u.name)) !== hash(o.now, u.name)) { Q.toast('현재 PIN이 맞지 않습니다'); return false; }
      if (!/^\d{1,8}$/.test(o.p1) || o.p1 !== o.p2) { Q.toast('새 PIN을 숫자 1~8자리로 똑같이 두 번 입력하세요'); return false; }
      u.pin = hash(o.p1, u.name); Q.save(); Q.toast('PIN을 변경했습니다');
    } }]);
    Q.$$('#modal input').forEach(function (i) { i.type = 'password'; i.inputMode = 'numeric'; });
  });
  Q.on('resetPin', function (el) { var u = Q.S.users[+el.getAttribute('data-i')]; Q.confirm(u.name + '의 PIN을 초기 PIN(1)으로 되돌릴까요?', function () { delete u.pin; Q.save(); Q.toast('PIN 초기화'); }); });
  Q.on('setPerm', function (el) { var u = Q.S.users[+el.getAttribute('data-i')]; u.perm = el.value; Q.save(); Q.toast(u.name + ' → ' + u.perm); });

  /* 설정 화면: 사용자 표에 권한·PIN 초기화 열 추가 */
  var origSettings = Q.routes.settings.fn;
  Q.routes.settings.fn = function (a) {
    ensurePerms();
    var h = origSettings(a);
    var tbl = '<div class="card"><h2>사용자 권한 · PIN <span class="sp"></span><span class="small muted">현재 권한: ' + E(Q.perm()) + '</span><button class="btn sm" data-act="changePin">내 PIN 변경</button></h2>' + Q.table([
      { label: '성명', k: 'name' }, { label: '부서', k: 'dept' },
      { label: '권한', html: function (u, i) { return '<select data-chg="setPerm" data-i="' + i + '">' + Q.PERMS.map(function (p) { return '<option' + ((u.perm || '작성자') === p ? ' selected' : '') + '>' + p + '</option>'; }).join('') + '</select>'; } },
      { label: 'PIN', html: function (u) { return u.pin ? Q.chip('변경됨', 'good') : Q.chip('초기 PIN 1', 'warn'); } },
      { label: '최근 로그인', k: function (u) { return (u.lastLogin || '').replace('T', ' ').slice(0, 16); } },
      { label: '', html: function (u, i) { return u.pin ? '<button class="btn sm" data-act="resetPin" data-i="' + i + '">PIN 초기화</button>' : ''; } }
    ], Q.S.users) + '<p class="small muted" style="margin-top:8px">관리자: 전체 · 작성자: 기록·대장·심사·부적합 작성 · 열람: 보기·검색·인쇄·CSV 내보내기만. 권한 변경·PIN 초기화·데이터 초기화는 관리자만 가능합니다.</p></div>';
    return tbl + h;
  };

  Q.needLogin = function () {
    var s = null; try { s = sessionStorage.getItem(SKEY); } catch (e) { s = null; }
    return !(s && (Q.S.users || []).some(function (u) { return u.name === s; }) && s === Q.S.settings.user);
  };
})();
