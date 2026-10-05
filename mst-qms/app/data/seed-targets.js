/* KPI 가목표 — 원본 KPI 시트에 목표값이 비어 있는 지표에 임시 목표를 넣는다.
   업계 통상 수준을 기준으로 한 컨설팅 제안값이며, KPI 화면에서 업체가 직접 고치면 '확정'으로 바뀐다. */
window.SEED = window.SEED || {};
(function (S) {
  var T = {
    K01: [90, '프로젝트 일정 준수 90% 이상'],
    K03: [40, '매출 대비 구매비 40% 이하'],
    K04: [0.5, '결품 정지시간 0.5% 이하'],
    K05: [100, '연간 정기평가 계획 100% 실시'],
    K06: [95, '생산계획 95% 이상 달성'],
    K07: [4, '월 재고회전 4회 이상'],
    K08: [10, '3개월 이상 장기재고 10% 이하'],
    K09: [95, '월 매출계획 95% 이상'],
    K10: [2, '매출 대비 물류비 2% 이하'],
    K11: [100, '고객불량 목표 건수 이내 (100%)'],
    K12: [90, '사업계획 대비 90% 이상'],
    K13: [100, '내부심사 계획 100% 실시'],
    K14: [100, '공정심사 계획 100% 실시'],
    K15: [100, '제품심사 계획 100% 실시'],
    K16: [90, '시정조치 기한 내 90% 이상 완료'],
    K17: [1000, '공정불량 1,000ppm 이하'],
    K18: [100, '개정 계획 100% 실시'],
    K19: [90, '교육계획 90% 이상 달성'],
    K20: [500, '입고불량 500ppm 이하'],
    K21: [100, '교정 대상 계측기 100% 교정']
  };
  (S.kpis || []).forEach(function (k) {
    var t = T[k.id];
    if (t && (k.target === null || k.target === undefined || k.target === '')) { k.target = t[0]; k.targetText = t[1]; k.provisional = true; }
  });

  /* MI-0809-001 샘플링 검사 기준표 — KS Q ISO 2859-1 일반검사수준 II 시료문자 (Ac/Re는 AQL 확정 후 기입) */
  S.formDetails = S.formDetails || {};
  S.formDetails['MI-0809-001'] = {
    cycle: '수시', purpose: '로트 크기별 시료 수와 합격판정 개수 기준 (KS Q ISO 2859-1, 보통검사 1회 샘플링, 일반검사수준 II)',
    header: [{ k: 'part', label: '품번/품명' }, { k: 'aql', label: 'AQL' }, { k: 'stage', label: '검사 구분', type: 'select', options: ['수입검사', '공정검사', '출하검사'] }],
    tableTitle: '로트 크기별 샘플링 기준',
    cols: [{ k: 'lot', label: '로트 크기' }, { k: 'code', label: '시료 문자' }, { k: 'n', label: '시료 수' }, { k: 'ac', label: 'Ac (합격)' }, { k: 're', label: 'Re (불합격)' }],
    items: [{ text: '2 ~ 8', std: 'A' }, { text: '9 ~ 15', std: 'B' }, { text: '16 ~ 25', std: 'C' }, { text: '26 ~ 50', std: 'D' }, { text: '51 ~ 90', std: 'E' }, { text: '91 ~ 150', std: 'F' }, { text: '151 ~ 280', std: 'G' }, { text: '281 ~ 500', std: 'H' }, { text: '501 ~ 1,200', std: 'J' }, { text: '1,201 ~ 3,200', std: 'K' }],
    approval: ['작성', '검토', '승인']
  };
  (S.revisionLog = S.revisionLog || []).push(
    { file: 'seed-core.js', where: '문서체계표 · 경영관리 양식', before: 'MD-0401-001 / MD-0401-002 (상위 MD-0901)', after: 'MP-0401-001 / MP-0401-002 (상위 MP-0401)', kind: '번호정정' },
    { file: 'seed-core.js', where: '고객만족 절차서·양식', before: 'MD-0902 / MD-0901-001~003 (중복)', after: 'MD-0903 / MD-0903-001~003', kind: '번호정정' },
    { file: 'seed-core.js', where: '표준목록 리스크·SWOT', before: 'MD-0601 / MD-0602', after: 'MI-0601 / MI-0602', kind: '번호정정' },
    { file: 'seed-core.js', where: '표준목록 CTQ·QC공정도', before: 'MI-0802 = QC공정도 / MI-0803 = CTQ', after: 'MI-0802 = CTP(CTQ) / MI-0803 = QC 공정도', kind: '번호정정' },
    { file: 'seed-core.js', where: '표준목록 생산 절차서', before: 'MD-0803 공정관리·4M 중복 / MD-0804 자재관리', after: 'MD-0803 4M 변경 / MD-0804 공정 / MD-0807 자재', kind: '번호정정' },
    { file: 'seed-core.js', where: '문서체계표 MI-0809 양식', before: 'MI-0808-002 공정능력평가표', after: 'MI-0808-002는 MI-0808 소속, MI-0809-001 샘플링 검사 기준표 신설', kind: '번호정정' },
    { file: 'seed-core.js', where: '문서체계표 MD-0804', before: 'MD-0804-001 / -003 설비 이력 카드 중복', after: 'MD-0804-003 폐지', kind: '번호정정' },
    { file: 'seed-core.js', where: '매뉴얼 6.2', before: '사업계획 및 경영검토 절차서', after: '경영검토 절차서(MD-0901)', kind: '번호정정' }
  );
})(window.SEED);
