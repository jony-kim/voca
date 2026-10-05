/* MST QMS — 품질 도구: SPC(X̄-R 관리도·공정능력), MSA(Gage R&R 평균-범위법) */
(function () {
  'use strict';
  var Q = window.Q;

  /* 관리도 계수 (n = 2..10) */
  var K = {
    2: { A2: 1.880, D3: 0, D4: 3.267, d2: 1.128 },
    3: { A2: 1.023, D3: 0, D4: 2.574, d2: 1.693 },
    4: { A2: 0.729, D3: 0, D4: 2.282, d2: 2.059 },
    5: { A2: 0.577, D3: 0, D4: 2.114, d2: 2.326 },
    6: { A2: 0.483, D3: 0, D4: 2.004, d2: 2.534 },
    7: { A2: 0.419, D3: 0.076, D4: 1.924, d2: 2.704 },
    8: { A2: 0.373, D3: 0.136, D4: 1.864, d2: 2.847 },
    9: { A2: 0.337, D3: 0.184, D4: 1.816, d2: 2.970 },
    10: { A2: 0.308, D3: 0.223, D4: 1.777, d2: 3.078 }
  };
  Q.SPC_K = K;

  function mean(a) { return a.reduce(function (s, v) { return s + v; }, 0) / a.length; }
  function sd(a) { var m = mean(a); return Math.sqrt(a.reduce(function (s, v) { return s + (v - m) * (v - m); }, 0) / (a.length - 1)); }

  /* 텍스트(엑셀 붙여넣기) → 부분군 배열 */
  Q.parseGrid = function (txt) {
    return String(txt || '').split(/\r?\n/).map(function (line) {
      return line.split(/[\t,; ]+/).map(Q.num).filter(function (v) { return v !== null; });
    }).filter(function (r) { return r.length; });
  };

  /* X̄-R 계산 + 이상 판정(Western Electric 규칙 일부) */
  Q.xbarR = function (groups, usl, lsl) {
    var n = groups[0].length;
    groups = groups.filter(function (g) { return g.length === n; });
    if (n < 2 || n > 10) return { err: '부분군 크기(n)는 2~10 이어야 합니다 (현재 ' + n + ')' };
    if (groups.length < 2) return { err: '부분군이 2개 이상 필요합니다' };
    var k = K[n];
    var xb = groups.map(mean);
    var r = groups.map(function (g) { return Math.max.apply(null, g) - Math.min.apply(null, g); });
    var X = mean(xb), Rb = mean(r);
    var res = {
      n: n, m: groups.length, xbar: xb, range: r, X: X, R: Rb,
      uclX: X + k.A2 * Rb, lclX: X - k.A2 * Rb, uclR: k.D4 * Rb, lclR: k.D3 * Rb,
      sigmaW: Rb / k.d2
    };
    var all = [].concat.apply([], groups);
    res.sigmaO = sd(all);
    res.min = Math.min.apply(null, all); res.max = Math.max.apply(null, all); res.N = all.length;
    if (usl !== null || lsl !== null) {
      var cpu = usl !== null ? (usl - X) / (3 * res.sigmaW) : null;
      var cpl = lsl !== null ? (X - lsl) / (3 * res.sigmaW) : null;
      var ppu = usl !== null ? (usl - X) / (3 * res.sigmaO) : null;
      var ppl = lsl !== null ? (X - lsl) / (3 * res.sigmaO) : null;
      res.cp = usl !== null && lsl !== null ? (usl - lsl) / (6 * res.sigmaW) : null;
      res.cpk = Math.min.apply(null, [cpu, cpl].filter(function (v) { return v !== null; }));
      res.pp = usl !== null && lsl !== null ? (usl - lsl) / (6 * res.sigmaO) : null;
      res.ppk = Math.min.apply(null, [ppu, ppl].filter(function (v) { return v !== null; }));
      res.outSpec = all.filter(function (v) { return (usl !== null && v > usl) || (lsl !== null && v < lsl); }).length;
    }
    /* 이상패턴 */
    var sig = res.sigmaW / Math.sqrt(n), alarms = [];
    xb.forEach(function (v, i) { if (v > res.uclX || v < res.lclX) alarms.push({ i: i, rule: '규칙1: 관리한계 이탈' }); });
    r.forEach(function (v, i) { if (v > res.uclR || v < res.lclR) alarms.push({ i: i, rule: 'R 관리도 한계 이탈' }); });
    for (var i = 8; i < xb.length; i++) {
      var seg = xb.slice(i - 8, i + 1);
      if (seg.every(function (v) { return v > X; }) || seg.every(function (v) { return v < X; })) alarms.push({ i: i, rule: '규칙2: 중심선 한쪽 연속 9점' });
    }
    for (i = 5; i < xb.length; i++) {
      var s6 = xb.slice(i - 5, i + 1), up = true, dn = true;
      for (var j = 1; j < 6; j++) { if (!(s6[j] > s6[j - 1])) up = false; if (!(s6[j] < s6[j - 1])) dn = false; }
      if (up || dn) alarms.push({ i: i, rule: '규칙3: 연속 6점 상승/하강' });
    }
    for (i = 2; i < xb.length; i++) {
      var s3 = xb.slice(i - 2, i + 1);
      var hi = s3.filter(function (v) { return v > X + 2 * sig; }).length, lo = s3.filter(function (v) { return v < X - 2 * sig; }).length;
      if (hi >= 2 || lo >= 2) alarms.push({ i: i, rule: '규칙5: 연속 3점 중 2점이 2σ 밖' });
    }
    res.alarms = alarms;
    return res;
  };

  Q.cpkJudge = function (c) {
    if (c === null || c === undefined || !isFinite(c)) return ['-', ''];
    if (c >= 1.67) return ['매우 우수 (≥1.67)', 'good'];
    if (c >= 1.33) return ['충분 (≥1.33)', 'good'];
    if (c >= 1.0) return ['보통 — 개선 필요 (1.00~1.33)', 'warn'];
    return ['부족 — 즉시 조치 (<1.00)', 'crit'];
  };

  /* Gage R&R — 평균·범위법 (AIAG MSA 4판) */
  var K1 = { 2: 0.8862, 3: 0.5908 };
  var K2 = { 2: 0.7071, 3: 0.5231 };
  var K3 = { 2: 0.7071, 3: 0.5231, 4: 0.4467, 5: 0.4030, 6: 0.3742, 7: 0.3534, 8: 0.3375, 9: 0.3249, 10: 0.3146 };
  var D4r = { 2: 3.267, 3: 2.574 };
  /* data[op][part][trial] */
  Q.grr = function (data, tol) {
    var ops = data.length, parts = data[0].length, tr = data[0][0].length;
    if (!K1[tr]) return { err: '반복 횟수는 2 또는 3 이어야 합니다' };
    if (!K2[ops]) return { err: '측정자 수는 2 또는 3 이어야 합니다' };
    if (!K3[parts]) return { err: '부품 수는 2~10 이어야 합니다' };
    var rbarOp = [], xbarOp = [], partMeans = [];
    for (var o = 0; o < ops; o++) {
      var rs = [], xs = [];
      for (var p = 0; p < parts; p++) {
        var t = data[o][p];
        if (t.some(function (v) { return v === null; })) return { err: '빈 측정값이 있습니다 (측정자 ' + (o + 1) + ', 부품 ' + (p + 1) + ')' };
        rs.push(Math.max.apply(null, t) - Math.min.apply(null, t));
        xs = xs.concat(t);
      }
      rbarOp.push(mean(rs)); xbarOp.push(mean(xs));
    }
    for (p = 0; p < parts; p++) {
      var all = [];
      for (o = 0; o < ops; o++) all = all.concat(data[o][p]);
      partMeans.push(mean(all));
    }
    var Rbb = mean(rbarOp);
    var Xdiff = Math.max.apply(null, xbarOp) - Math.min.apply(null, xbarOp);
    var Rp = Math.max.apply(null, partMeans) - Math.min.apply(null, partMeans);
    var EV = Rbb * K1[tr];
    var avSq = Math.pow(Xdiff * K2[ops], 2) - EV * EV / (parts * tr);
    var AV = avSq > 0 ? Math.sqrt(avSq) : 0;
    var GRR = Math.sqrt(EV * EV + AV * AV);
    var PV = Rp * K3[parts];
    var TV = Math.sqrt(GRR * GRR + PV * PV);
    var res = {
      ops: ops, parts: parts, trials: tr, Rbb: Rbb, Xdiff: Xdiff, Rp: Rp,
      EV: EV, AV: AV, GRR: GRR, PV: PV, TV: TV,
      pEV: 100 * EV / TV, pAV: 100 * AV / TV, pGRR: 100 * GRR / TV, pPV: 100 * PV / TV,
      ndc: Math.floor(1.41 * PV / GRR), UCLR: Rbb * D4r[tr]
    };
    if (tol) { res.tGRR = 100 * 6 * GRR / tol; res.tEV = 100 * 6 * EV / tol; res.tAV = 100 * 6 * AV / tol; }
    return res;
  };
  Q.grrJudge = function (p) {
    if (p < 10) return ['적합 (<10%)', 'good'];
    if (p <= 30) return ['조건부 (10~30%) — 용도·비용 고려 승인', 'warn'];
    return ['부적합 (>30%) — 측정시스템 개선', 'crit'];
  };

  /* ───────── 화면 ───────── */
  Q.route('spc', '통계적 공정관리 (SPC)', function () {
    var S = Q.S.settings;
    var saved = Q.S.registers.spcSets || [];
    var sample = S.spcText || '10.02 10.05 9.98 10.01 10.03\n10.00 9.97 10.04 10.02 9.99\n10.06 10.03 10.01 9.98 10.02\n9.99 10.01 10.00 10.04 10.03\n10.02 9.98 10.03 10.00 10.01\n10.04 10.02 9.99 10.01 10.05\n10.01 10.00 10.02 9.97 10.00\n10.03 10.05 10.01 10.02 10.04\n9.98 10.00 10.03 10.01 9.99\n10.02 10.01 9.99 10.04 10.02';
    return '<div class="card no-print"><h2>데이터 입력 <span class="sp"></span><span class="small muted">한 줄 = 부분군 1개 · 엑셀에서 복사해 붙여넣기 가능</span></h2>' +
      '<div class="form"><div class="fld"><label>품목 / 특성</label><input id="spcName" value="' + Q.esc(S.spcName || '') + '" placeholder="예) 브라켓 A — 외경"></div>' +
      '<div class="fld"><div class="row"><div class="fld" style="flex:1"><label>USL (규격 상한)</label><input id="spcUsl" type="number" step="any" value="' + Q.esc(S.spcUsl === undefined ? '10.10' : S.spcUsl) + '"></div>' +
      '<div class="fld" style="flex:1"><label>LSL (규격 하한)</label><input id="spcLsl" type="number" step="any" value="' + Q.esc(S.spcLsl === undefined ? '9.90' : S.spcLsl) + '"></div></div></div>' +
      '<div class="fld full"><label>측정 데이터</label><textarea id="spcData" rows="8" class="mono">' + Q.esc(sample) + '</textarea></div></div>' +
      '<div class="row" style="margin-top:12px"><button class="btn pri" data-act="spcRun">분석</button><button class="btn" data-act="spcSave">분석 세트 저장</button>' +
      (saved.length ? '<select data-chg="spcLoad"><option value="">저장된 세트 불러오기…</option>' + saved.map(function (s, i) { return '<option value="' + i + '">' + Q.esc(s.date + ' ' + s.name) + '</option>'; }).join('') + '</select>' : '') +
      '</div></div><div id="spcOut"></div>';
  });
  Q.routes.spc.after = function () { Q.actions.spcRun(); };

  Q.on('spcRun', function () {
    var name = Q.$('#spcName').value, usl = Q.num(Q.$('#spcUsl').value), lsl = Q.num(Q.$('#spcLsl').value), txt = Q.$('#spcData').value;
    Q.S.settings.spcName = name; Q.S.settings.spcUsl = Q.$('#spcUsl').value; Q.S.settings.spcLsl = Q.$('#spcLsl').value; Q.S.settings.spcText = txt; Q.save();
    var g = Q.parseGrid(txt), out = Q.$('#spcOut');
    if (!g.length) { out.innerHTML = '<div class="empty">데이터를 입력하세요</div>'; return; }
    var r = Q.xbarR(g, usl, lsl);
    if (r.err) { out.innerHTML = '<div class="card"><b style="color:var(--crit)">' + Q.esc(r.err) + '</b></div>'; return; }
    var lbl = r.xbar.map(function (_, i) { return String(i + 1); });
    var bad = {}; r.alarms.forEach(function (a) { bad[a.i] = 1; });
    var cj = Q.cpkJudge(r.cpk);
    out.innerHTML =
      '<div class="tiles">' +
      '<div class="tile"><div class="k">부분군 / 크기</div><div class="v">' + r.m + ' × ' + r.n + '</div><div class="s">총 ' + r.N + '개</div></div>' +
      '<div class="tile"><div class="k">X̿ (총평균)</div><div class="v">' + Q.fmt(r.X, 4) + '</div><div class="s">R̄ ' + Q.fmt(r.R, 4) + '</div></div>' +
      '<div class="tile"><div class="k">Cp / Pp</div><div class="v">' + Q.fmt(r.cp, 2) + '</div><div class="s">Pp ' + Q.fmt(r.pp, 2) + '</div></div>' +
      '<div class="tile ' + cj[1] + '"><div class="k">Cpk / Ppk</div><div class="v">' + Q.fmt(r.cpk, 2) + '</div><div class="s">Ppk ' + Q.fmt(r.ppk, 2) + ' · ' + cj[0] + '</div></div>' +
      '<div class="tile ' + (r.alarms.length ? 'crit' : 'good') + '"><div class="k">이상 신호</div><div class="v">' + r.alarms.length + '</div><div class="s">규격 이탈 ' + (r.outSpec || 0) + '개</div></div></div>' +
      '<div class="card"><h2>X̄ 관리도</h2>' + Q.lineChart([{ data: r.xbar, color: 'var(--accent)', flag: function (v, i) { return bad[i]; } }], {
        labels: lbl, lines: [{ v: r.uclX, label: 'UCL', color: 'var(--crit)' }, { v: r.X, label: 'CL', color: 'var(--good)', dash: '0' }, { v: r.lclX, label: 'LCL', color: 'var(--crit)' }]
      }) + '</div>' +
      '<div class="card"><h2>R 관리도</h2>' + Q.lineChart([{ data: r.range, color: 'var(--mp)', flag: function (v) { return v > r.uclR; } }], {
        labels: lbl, h: 170, lines: [{ v: r.uclR, label: 'UCL', color: 'var(--crit)' }, { v: r.R, label: 'R̄', color: 'var(--good)', dash: '0' }, { v: r.lclR || null, label: 'LCL', color: 'var(--crit)' }]
      }) + '</div>' +
      '<div class="grid g2"><div class="card"><h2>관리한계</h2><dl class="kv">' +
      '<dt>UCLx̄ / LCLx̄</dt><dd class="num">' + Q.fmt(r.uclX, 4) + ' / ' + Q.fmt(r.lclX, 4) + '</dd>' +
      '<dt>UCLr / LCLr</dt><dd class="num">' + Q.fmt(r.uclR, 4) + ' / ' + Q.fmt(r.lclR, 4) + '</dd>' +
      '<dt>σ(군내) = R̄/d₂</dt><dd class="num">' + Q.fmt(r.sigmaW, 5) + '</dd>' +
      '<dt>σ(전체)</dt><dd class="num">' + Q.fmt(r.sigmaO, 5) + '</dd>' +
      '<dt>최소 / 최대</dt><dd class="num">' + Q.fmt(r.min, 4) + ' / ' + Q.fmt(r.max, 4) + '</dd></dl>' +
      '<p class="small muted" style="margin-top:10px">Cp=(USL−LSL)/6σ군내 · Cpk=min(USL−X̿, X̿−LSL)/3σ군내 · Pp/Ppk는 전체 표준편차 사용. 판정: Cpk≥1.33 충분, 1.00~1.33 개선, &lt;1.00 즉시 조치.</p></div>' +
      '<div class="card"><h2>이상 판정 <span class="sp"></span>' + (r.alarms.length ? '<button class="btn sm" data-act="spcToNcr">부적합 보고 생성</button>' : '') + '</h2>' +
      (r.alarms.length ? Q.table([{ label: '부분군', k: function (a) { return a.i + 1; } }, { label: '규칙', k: 'rule' }], r.alarms) : '<div class="empty">관리 상태 — 이상 신호 없음</div>') + '</div></div>';
    Q._spcLast = { name: name, r: r };
  });
  Q.on('spcSave', function () {
    var s = Q.S.registers.spcSets = Q.S.registers.spcSets || [];
    s.unshift({ date: Q.today(), name: Q.$('#spcName').value || '이름없음', usl: Q.$('#spcUsl').value, lsl: Q.$('#spcLsl').value, text: Q.$('#spcData').value });
    Q.save(); Q.toast('저장했습니다'); Q.rerender();
  });
  Q.on('spcLoad', function (el) {
    var s = (Q.S.registers.spcSets || [])[+el.value]; if (!s) return;
    Q.$('#spcName').value = s.name; Q.$('#spcUsl').value = s.usl; Q.$('#spcLsl').value = s.lsl; Q.$('#spcData').value = s.text; Q.actions.spcRun();
  });
  Q.on('spcToNcr', function () {
    var L = Q._spcLast; if (!L) return;
    Q.newNcr({ source: 'SPC 이상', title: (L.name || '공정') + ' 관리도 이상 신호 ' + L.r.alarms.length + '건', desc: L.r.alarms.map(function (a) { return '부분군 ' + (a.i + 1) + ': ' + a.rule; }).join('\n') + '\nCpk=' + Q.fmt(L.r.cpk, 2) });
  });

  /* MSA 화면 */
  Q.route('msa', '측정시스템 분석 (Gage R&R)', function () {
    var st = Q.S.settings.msa || { ops: 3, parts: 10, trials: 3, tol: '', name: '', data: null };
    var html = '<div class="card no-print"><h2>조건 <span class="sp"></span><span class="small muted">AIAG MSA 평균·범위법</span></h2><div class="row">' +
      '<div class="fld"><label>계측기 / 특성</label><input id="msaName" value="' + Q.esc(st.name) + '" placeholder="예) 버니어캘리퍼스 VC-03 / 외경"></div>' +
      '<div class="fld"><label>측정자</label><select id="msaOps">' + [2, 3].map(function (v) { return '<option' + (v === st.ops ? ' selected' : '') + '>' + v + '</option>'; }).join('') + '</select></div>' +
      '<div class="fld"><label>부품</label><select id="msaParts">' + [5, 6, 7, 8, 9, 10].map(function (v) { return '<option' + (v === st.parts ? ' selected' : '') + '>' + v + '</option>'; }).join('') + '</select></div>' +
      '<div class="fld"><label>반복</label><select id="msaTr">' + [2, 3].map(function (v) { return '<option' + (v === st.trials ? ' selected' : '') + '>' + v + '</option>'; }).join('') + '</select></div>' +
      '<div class="fld"><label>공차 (USL−LSL, 선택)</label><input id="msaTol" type="number" step="any" value="' + Q.esc(st.tol) + '"></div>' +
      '<div class="fld"><label>&nbsp;</label><button class="btn" data-act="msaGrid">표 다시 만들기</button></div></div></div>' +
      '<div class="card"><h2>측정값 <span class="sp"></span><button class="btn sm no-print" data-act="msaSample">예제 채우기</button><button class="btn pri sm no-print" data-act="msaRun">분석</button></h2><div id="msaGridBox">' + msaGrid(st) + '</div></div><div id="msaOut"></div>';
    return html;
  });
  Q.routes.msa.after = function () { if ((Q.S.settings.msa || {}).data) Q.actions.msaRun(); };
  function msaGrid(st) {
    var h = '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>측정자</th><th>반복</th>';
    for (var p = 0; p < st.parts; p++) h += '<th>부품 ' + (p + 1) + '</th>';
    h += '</tr></thead><tbody>';
    for (var o = 0; o < st.ops; o++) for (var t = 0; t < st.trials; t++) {
      h += '<tr>' + (t === 0 ? '<td rowspan="' + st.trials + '"><b>' + 'ABC'[o] + '</b></td>' : '') + '<td>' + (t + 1) + '</td>';
      for (p = 0; p < st.parts; p++) {
        var v = st.data && st.data[o] && st.data[o][p] ? st.data[o][p][t] : '';
        h += '<td><input class="mono" data-o="' + o + '" data-p="' + p + '" data-t="' + t + '" value="' + Q.esc(v === null ? '' : v) + '"></td>';
      }
      h += '</tr>';
    }
    return h + '</tbody></table></div>';
  }
  function msaRead() {
    var st = { name: Q.$('#msaName').value, ops: +Q.$('#msaOps').value, parts: +Q.$('#msaParts').value, trials: +Q.$('#msaTr').value, tol: Q.$('#msaTol').value };
    st.data = [];
    for (var o = 0; o < st.ops; o++) { st.data.push([]); for (var p = 0; p < st.parts; p++) { st.data[o].push([]); for (var t = 0; t < st.trials; t++) { var el = Q.$('[data-o="' + o + '"][data-p="' + p + '"][data-t="' + t + '"]'); st.data[o][p].push(el ? Q.num(el.value) : null); } } }
    return st;
  }
  Q.on('msaGrid', function () { var st = msaRead(); Q.S.settings.msa = st; Q.save(); Q.$('#msaGridBox').innerHTML = msaGrid(st); });
  Q.on('msaSample', function () {
    var st = msaRead(); var base = [2.48, 2.52, 2.55, 2.44, 2.50, 2.58, 2.46, 2.53, 2.49, 2.56];
    st.data = [];
    for (var o = 0; o < st.ops; o++) { st.data.push([]); for (var p = 0; p < st.parts; p++) { st.data[o].push([]); for (var t = 0; t < st.trials; t++) st.data[o][p].push(+(base[p % 10] + (o - 1) * 0.004 + ((p * 7 + t * 3 + o * 5) % 5 - 2) * 0.003).toFixed(3)); } }
    if (!st.tol) st.tol = '0.4';
    Q.S.settings.msa = st; Q.save(); Q.rerender();
  });
  Q.on('msaRun', function () {
    var st = msaRead(); Q.S.settings.msa = st; Q.save();
    var r = Q.grr(st.data, Q.num(st.tol)), out = Q.$('#msaOut');
    if (r.err) { out.innerHTML = '<div class="card"><b style="color:var(--crit)">' + Q.esc(r.err) + '</b></div>'; return; }
    var j = Q.grrJudge(r.pGRR), jn = r.ndc >= 5 ? ['ndc ≥ 5 적합', 'good'] : ['ndc < 5 — 분해능 부족', 'crit'];
    out.innerHTML = '<div class="tiles">' +
      '<div class="tile ' + j[1] + '"><div class="k">%GRR (총변동 대비)</div><div class="v">' + Q.fmt(r.pGRR, 1) + '%</div><div class="s">' + j[0] + '</div></div>' +
      (r.tGRR !== undefined ? '<div class="tile ' + Q.grrJudge(r.tGRR)[1] + '"><div class="k">%GRR (공차 대비)</div><div class="v">' + Q.fmt(r.tGRR, 1) + '%</div><div class="s">6σ 기준</div></div>' : '') +
      '<div class="tile ' + jn[1] + '"><div class="k">구별 범주 수 (ndc)</div><div class="v">' + r.ndc + '</div><div class="s">' + jn[0] + '</div></div>' +
      '<div class="tile"><div class="k">%EV 반복성</div><div class="v">' + Q.fmt(r.pEV, 1) + '%</div><div class="s">장비 변동</div></div>' +
      '<div class="tile"><div class="k">%AV 재현성</div><div class="v">' + Q.fmt(r.pAV, 1) + '%</div><div class="s">측정자 변동</div></div></div>' +
      '<div class="grid g2"><div class="card"><h2>변동 성분</h2>' + Q.barChart([
        { label: 'EV 반복성', v: r.pEV, txt: Q.fmt(r.pEV, 1) + '%', color: 'var(--accent)' },
        { label: 'AV 재현성', v: r.pAV, txt: Q.fmt(r.pAV, 1) + '%', color: 'var(--mp)' },
        { label: 'GRR', v: r.pGRR, txt: Q.fmt(r.pGRR, 1) + '%', color: 'var(--' + j[1] + ')' },
        { label: 'PV 부품변동', v: r.pPV, txt: Q.fmt(r.pPV, 1) + '%', color: 'var(--sp)' }], { max: 100, left: 110 }) + '</div>' +
      '<div class="card"><h2>계산값</h2><dl class="kv">' +
      '<dt>R̿</dt><dd class="num">' + Q.fmt(r.Rbb, 5) + '</dd><dt>X̄diff</dt><dd class="num">' + Q.fmt(r.Xdiff, 5) + '</dd><dt>Rp</dt><dd class="num">' + Q.fmt(r.Rp, 5) + '</dd>' +
      '<dt>EV / AV</dt><dd class="num">' + Q.fmt(r.EV, 5) + ' / ' + Q.fmt(r.AV, 5) + '</dd><dt>GRR / PV / TV</dt><dd class="num">' + Q.fmt(r.GRR, 5) + ' / ' + Q.fmt(r.PV, 5) + ' / ' + Q.fmt(r.TV, 5) + '</dd>' +
      '<dt>UCL(R)</dt><dd class="num">' + Q.fmt(r.UCLR, 5) + '</dd></dl><p class="small muted" style="margin-top:10px">판정 기준: %GRR &lt;10% 적합 · 10~30% 조건부 · &gt;30% 부적합, ndc ≥ 5.</p>' +
      '<div class="row no-print"><button class="btn sm" data-act="msaSaveRec">계측기 대장에 결과 기록</button></div></div></div>';
    Q._msaLast = { st: st, r: r };
  });
  Q.on('msaSaveRec', function () {
    var L = Q._msaLast; if (!L) return;
    var list = Q.S.registers.msaResults = Q.S.registers.msaResults || [];
    list.unshift({ id: Q.uid('msa'), date: Q.today(), name: L.st.name, pGRR: +L.r.pGRR.toFixed(2), ndc: L.r.ndc, judge: Q.grrJudge(L.r.pGRR)[0], by: Q.me() });
    Q.save(); Q.toast('MSA 결과를 기록했습니다 (계측기 관리 → MSA 이력)');
  });
})();
