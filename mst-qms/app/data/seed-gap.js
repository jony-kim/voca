/* 세메스 SSQ 대비 MST 체계 공백 보완 — 신규 제정 권고 문서·양식 (컨설팅 제안)
   원본 Drive에는 없는 문서입니다. 상태 '제정 예정'으로 등록되며, 내용 검토·승인 후 '유효'로 바꿔 사용합니다. */
window.SEED = window.SEED || {};
(function (S) {
  var NEW = '제정 예정';
  function doc(code, title, level, process, owner, clauses, x) {
    var d = { code: code, title: title, level: level, process: process, owner: owner, clauses: clauses, rev: '0', date: '', status: NEW, steps: [], resp: [], proposed: true,
      notes: '세메스 SSQ 대응을 위한 신규 제정 권고 문서 (원본 없음) — 검토·승인 후 "개정 승인"으로 유효화' };
    for (var k in x) d[k] = x[k];
    S.documents.push(d);
  }
  function form(code, title, docCode, x) { var f = { code: code, title: title, doc: docCode, proposed: true, approval: ['작성', '검토', '승인'] }; for (var k in x) f[k] = x[k]; (S.extraForms = S.extraForms || []).push(f); }
  function link(no, add) {
    var l = (S.ssqLink || {})[no]; if (!l) return;
    ['docs', 'forms', 'xforms', 'evid', 'clauses'].forEach(function (k) { if (add[k]) l[k] = (l[k] || []).concat(add[k].filter(function (v) { return (l[k] || []).indexOf(v) < 0; })); });
    l.gapFix = add.fix; delete l.gap;
  }

  /* ── 클린룸·검사실 환경 (SSQ 31·32·33·35) ── */
  doc('MI-0703', '클린룸·검사실 환경 관리 지침서', '지침서', 'MP-0803', '품질팀', ['7.1.4'], {
    purpose: '반도체 장비 부품(Chuck)의 오염을 방지하기 위하여 클린룸(준클린룸 포함)과 수입·출하 검사실의 청정도, 온·습도, 복장, 5S 관리 기준을 정한다.',
    scope: '클린룸(준클린룸), 수입검사실, 출하검사·포장실',
    resp: [{ who: '품질팀', what: '환경 기준 제정, Particle·온습도 측정, 이상 시 조치 지시' }, { who: '제조팀', what: '일상 점검표 작성, 청소·복장 준수' }, { who: '관리팀', what: '클린복 세탁·교체 지원' }],
    steps: [
      { t: '구역 지정·표시', d: '클린룸/준클린룸/검사실 구역을 Lay-out에 표시하고 출입 기준을 게시한다.', who: '품질팀' },
      { t: 'Particle 측정', d: '정해진 측정 지점에서 [권장] 월 1회 Particle을 측정하고 Spec 초과 시 원인 조사·재측정한다.', who: '품질팀', forms: ['MI-0703-002'] },
      { t: '온·습도 관리', d: '검사실 실온 20±2℃, 습도 65% 이하(세메스 SSQ 35 기준)를 매일 2회 기록한다.', who: '품질팀', forms: ['MI-0703-004'] },
      { t: '클린룸 5S 점검', d: '정리·정돈·청소·청결·습관화 항목을 매일 점검한다.', who: '제조팀', forms: ['MI-0703-001'] },
      { t: '복장 관리', d: '클린복·신발·모자·장갑의 착용, 세탁 주기, 교체 기준을 점검한다.', who: '제조팀', forms: ['MI-0703-003'] },
      { t: '이상 조치', d: '기준 이탈 시 부적합·시정조치(MD-1002)로 등록한다.', who: '품질팀' }
    ]
  });
  form('MI-0703-001', '클린룸 5S 점검표', 'MI-0703', { cycle: '매일', header: [{ k: 'area', label: '구역' }, { k: 'checker', label: '점검자' }], tableTitle: '점검 항목',
    cols: [{ k: 'item', label: '점검 항목' }, { k: 'std', label: '기준' }, { k: 'r', label: '결과', options: ['O', 'X', '△'] }, { k: 'act', label: '조치' }],
    items: [{ text: '정리', std: '보관 외 물품이 없을 것' }, { text: '정돈', std: '지정 위치 보관, 미관상 양호' }, { text: '청소', std: '바닥·작업대 청소 상태 및 주기 준수' }, { text: '청결', std: '보관 Box·선반·자재 오염 없음' }, { text: '습관화', std: 'Check Sheet 운용, 출입 기준 준수' }, { text: '출입문·Air Shower', std: '작동 정상, 문 닫힘 유지' }] });
  form('MI-0703-002', 'Particle 측정 관리대장', 'MI-0703', { cycle: '매월', header: [{ k: 'meter', label: '측정기(관리번호)' }], tableTitle: '측정 결과',
    cols: [{ k: 'point', label: '측정 지점' }, { k: 'size', label: '입자 크기(㎛)' }, { k: 'spec', label: 'Spec' }, { k: 'val', label: '측정값', type: 'number' }, { k: 'r', label: '판정', options: ['합격', '불합격'] }, { k: 'remark', label: '비고' }] });
  form('MI-0703-003', '클린복·보호구 관리 점검표', 'MI-0703', { cycle: '매주', tableTitle: '점검 항목',
    cols: [{ k: 'item', label: '항목' }, { k: 'std', label: '기준' }, { k: 'r', label: '결과', options: ['O', 'X'] }, { k: 'remark', label: '비고' }],
    items: [{ text: '클린복', std: '착용 상태, 오염·손상 없음, 세탁 주기 준수' }, { text: '클린화(신발)', std: '전용 신발 착용, 외부 반출 금지' }, { text: '모자·마스크', std: '머리카락 노출 없음' }, { text: '장갑', std: '파손·오염 시 즉시 교체' }, { text: '세탁·교체 기록', std: '세탁 일자 기록 유지' }] });
  form('MI-0703-004', '검사실 온·습도 관리표', 'MI-0703', { cycle: '매일', header: [{ k: 'room', label: '검사실', type: 'select', options: ['수입검사실', '출하검사실', '측정실'] }], tableTitle: '측정 (기준 20±2℃ / 65% 이하)',
    cols: [{ k: 'time', label: '시간' }, { k: 'temp', label: '온도(℃)', type: 'number' }, { k: 'hum', label: '습도(%)', type: 'number' }, { k: 'r', label: '판정', options: ['적합', '이탈'] }, { k: 'by', label: '확인자' }],
    items: [{ text: '09:00' }, { text: '15:00' }] });
  link('31', { docs: ['MI-0703'], xforms: ['MI-0703-001'], fix: '신규 MI-0703 클린룸·검사실 환경 관리 지침서 + MI-0703-001 점검표 (제정 예정)' });
  link('32', { docs: ['MI-0703'], xforms: ['MI-0703-002'], fix: 'MI-0703 내 Particle 기준 + MI-0703-002 측정 관리대장 (제정 예정)' });
  link('33', { docs: ['MI-0703'], xforms: ['MI-0703-003'], fix: 'MI-0703 내 복장 기준 + MI-0703-003 점검표 (제정 예정)' });
  link('35', { docs: ['MI-0703'], xforms: ['MI-0703-004'], fix: 'MI-0703-004 검사실 온·습도 관리표 (제정 예정)' });

  /* ── Air Utility (SSQ 34) ── */
  form('MD-0701-004', 'Air Utility·필터 교체 관리대장', 'MD-0701', { proposed: true, cycle: '매월', tableTitle: '관리 항목',
    cols: [{ k: 'item', label: '설비/유틸리티' }, { k: 'spec', label: 'Spec (압력·이슬점·차압 등)' }, { k: 'val', label: '측정값' }, { k: 'filter', label: '필터/소모품' }, { k: 'cycle', label: '교체 주기' }, { k: 'last', label: '최근 교체일', type: 'date' }, { k: 'r', label: '판정', options: ['합격', '불합격'] }],
    items: [{ text: '컴프레서 압축공기' }, { text: '에어 드라이어' }, { text: '라인 필터' }, { text: '클린룸 FFU/HEPA 필터' }] });
  link('34', { xforms: ['MD-0701-004'], fix: 'MD-0701-004 Air Utility·필터 교체 관리대장 추가 (제정 예정)' });

  /* ── Jig/Tool 점검 (SSQ 43) ── */
  form('MI-0804-002', 'Jig·Tool 정기 점검 Check Sheet', 'MI-0804', { cycle: '매월', header: [{ k: 'jig', label: 'Jig/Tool 번호' }], tableTitle: '점검 항목',
    cols: [{ k: 'item', label: '점검 항목' }, { k: 'std', label: '기준' }, { k: 'r', label: '결과', options: ['OK', 'NG'] }, { k: 'act', label: '조치' }],
    items: [{ text: '외관', std: '파손·마모·녹 없음' }, { text: '치수/정도', std: '기준 치수 이내' }, { text: '식별 표시', std: '번호·유효기간 라벨 부착' }, { text: '보관 상태', std: '지정 위치 보관' }] });
  link('43', { xforms: ['MI-0804-002'], fix: 'MI-0804-002 Jig·Tool 정기 점검 Check Sheet (제정 예정)' });

  /* ── 협력사 성적서·사후관리 (SSQ 9·24) ── */
  form('MI-0807-004', '협력사 성적서 관리대장', 'MI-0807', { cycle: '수시', tableTitle: '접수 이력',
    cols: [{ k: 'date', label: '입고일', type: 'date' }, { k: 'supplier', label: '협력사' }, { k: 'part', label: '품번/품명' }, { k: 'lot', label: 'LOT' }, { k: 'cert', label: '성적서 접수', options: ['접수', '미접수'] }, { k: 'r', label: '검토 결과', options: ['적합', '부적합'] }] });
  form('MD-0809-001', '협력사 개선 대책서', 'MD-0809', { cycle: '수시', header: [{ k: 'supplier', label: '협력사' }, { k: 'evalDate', label: '평가일' }], tableTitle: '지적사항 및 대책',
    cols: [{ k: 'issue', label: '지적사항' }, { k: 'cause', label: '원인' }, { k: 'action', label: '개선 대책' }, { k: 'due', label: '완료 예정일', type: 'date' }, { k: 'owner', label: '담당' }] });
  form('MD-0809-002', '협력사 개선 이행 점검 결과서', 'MD-0809', { cycle: '수시', header: [{ k: 'supplier', label: '협력사' }], tableTitle: '이행 점검',
    cols: [{ k: 'issue', label: '지적사항' }, { k: 'action', label: '개선 대책' }, { k: 'check', label: '점검 결과' }, { k: 'r', label: '판정', options: ['완료', '미완료'] }, { k: 'date', label: '점검일', type: 'date' }] });
  link('9', { xforms: ['MI-0807-004'], fix: 'MI-0807-004 협력사 성적서 관리대장 (제정 예정)' });
  link('24', { xforms: ['MD-0809-001', 'MD-0809-002'], fix: 'MD-0809-001 개선 대책서, -002 이행 점검 결과서 (제정 예정)' });

  /* ── 정보보안·고객 도면 (SSQ 44 과락) ── */
  doc('MI-0810', '정보보안 및 고객 도면 관리 지침서', '지침서', 'MP-0801', '개발팀', ['8.5.3', '7.5.3'], {
    purpose: '고객으로부터 받은 도면·사양 등 고객 재산(정보)과 회사 기술정보의 유출·오용을 방지한다.',
    scope: '고객 도면, 사양서, 검사 기준, 전자 파일 및 출력물',
    resp: [{ who: '개발팀', what: '고객 도면 접수·등록·배포·회수, 구본 폐기' }, { who: '각 부서장', what: '현장 도면 사용·보관 상태 관리' }, { who: '관리팀', what: '보안 점검·교육' }],
    steps: [
      { t: '도면 접수·등록', d: '고객 도면은 접수 즉시 도면 배포·회수 대장에 등록하고 관리 번호를 부여한다.', who: '개발팀', forms: ['MI-0810-001'] },
      { t: '배포·회수', d: '필요 부서에만 관리본을 배포하고, 개정 시 구본을 회수·폐기한다. 도면을 성적서 대용으로 사용하지 않는다.', who: '개발팀', forms: ['MI-0810-001'] },
      { t: '현장 관리', d: '작업 종료 후 도면을 지정 보관함에 보관하며 현장에 방치하지 않는다.', who: '제조팀' },
      { t: '보안 점검', d: '[권장] 월 1회 현장 도면 방치·외부 반출 여부를 점검한다.', who: '관리팀', forms: ['MI-0810-002'] }
    ]
  });
  form('MI-0810-001', '고객 도면 배포·회수 대장', 'MI-0810', { cycle: '수시', tableTitle: '배포 이력',
    cols: [{ k: 'no', label: '도면번호' }, { k: 'rev', label: 'Rev' }, { k: 'customer', label: '고객' }, { k: 'dept', label: '배포 부서' }, { k: 'out', label: '배포일', type: 'date' }, { k: 'back', label: '회수일', type: 'date' }, { k: 'disp', label: '구본 처리', options: ['회수', '폐기', '보관(구본 표시)'] }] });
  form('MI-0810-002', '정보보안·도면 관리 점검표', 'MI-0810', { cycle: '매월', tableTitle: '점검 항목',
    cols: [{ k: 'item', label: '점검 항목' }, { k: 'r', label: '결과', options: ['양호', '미흡'] }, { k: 'act', label: '조치' }],
    items: [{ text: '현장에 도면이 방치되어 있지 않은가' }, { text: '도면이 성적서로 활용되고 있지 않은가' }, { text: '구본 도면이 회수·폐기되었는가' }, { text: '고객 도면 파일의 외부 반출·저장 매체 통제가 되는가' }, { text: '출입자(방문객) 통제 기록이 있는가' }] });
  link('44', { docs: ['MI-0810'], xforms: ['MI-0810-001', 'MI-0810-002'], fix: '신규 MI-0810 정보보안 및 고객 도면 관리 지침서 + 대장·점검표 (제정 예정)' });

  /* ── 사업자등록증·외부문서 (SSQ 45 과락) ── */
  form('MI-0701-003', '외부 출처 문서 관리대장', 'MI-0701', { cycle: '년', tableTitle: '외부문서',
    cols: [{ k: 'name', label: '문서명' }, { k: 'issuer', label: '발행처' }, { k: 'no', label: '번호/버전' }, { k: 'date', label: '발행·갱신일', type: 'date' }, { k: 'check', label: '내용 확인 (예: 사업장 주소 일치)' }, { k: 'loc', label: '보관 위치' }],
    items: [{ text: '사업자등록증' }, { text: 'ISO 9001 인증서' }, { text: '고객 품질 요구사항(세메스 SSQ 등)' }, { text: '관련 법규·KS 표준' }] });
  link('45', { xforms: ['MI-0701-003'], fix: 'MI-0701-003 외부 출처 문서 관리대장에 사업자등록증 등록·주소 대조 (제정 예정)' });
})(window.SEED);
