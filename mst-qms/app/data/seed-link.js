/* 세메스 SSQ ↔ ISO 9001 ↔ MST 문서·기록 ↔ 내부심사 체크시트 연동표 (작성: 문서체계·체크시트 대조, 매핑은 컨설팅 판단) */
/* CK-ISO = SSQ 45항목 중 5·44·45 제외(42항목, 질문 원문 일치). CK-NSSQ 는 의미 기준 부분 매칭.
   forms = S.formList 양식, xforms = SEED.extraForms(seed-forms.js) 양식. */
window.SEED = window.SEED || {};
window.SEED.ssqLink = {
  /* 1. 품질운영 */
  '1': { clauses:['9.1.3','9.3'], docs:['MD-0811','MD-0901'], forms:['MD-0901-001','MD-0901-004','MI-0801-004'], evid:['kpi','review'], ck:{'CK-ISO':[1],'CK-NSSQ':[8,9]}, point:'기준: 수입·공정·출하·시장 품질 목표(KPI) 설정 / 이행: 월별 검사 Raw Data 집계 + 경영자 주관 품질회의 회의록·결재본 제시' },
  '2': { clauses:['5.3'], docs:['MD-0801','QM-01'], forms:['MD-0801-001','MD-0801-002'], evid:[], ck:{'CK-ISO':[2],'CK-NSSQ':[1]}, point:'기준: 조직도상 품질부서가 대표이사 직속(제조 하위 아님) / 이행: 최신 조직도·업무분장표 승인본 제시' },
  '3': { clauses:['7.1.2'], docs:['MD-0801','MD-0811','MI-0809'], forms:['MD-0801-001','MD-0801-002'], evid:[], ck:{'CK-ISO':[3],'CK-NSSQ':[]}, point:'기준: 전수/샘플 검사 기준(MI-0809 근거) / 이행: 검사 물량 대비 검사인원 산정 근거 제시 — 근거 없는 샘플검사는 인원 부족으로 판정됨' },
  '4': { clauses:['7.2'], docs:['MD-0703'], forms:['MD-0703-003','MD-0703-004'], evid:['quals','training'], ck:{'CK-ISO':[4],'CK-NSSQ':[3]}, point:'기준: 검사원 자격인증 기준(외주 인력 포함) / 이행: 자격인증 관리대장·평가표·재인증 주기 이력 제시' },
  '5': { clauses:['7.2'], docs:['MD-0703'], forms:['MD-0703-003','MD-0703-004'], xforms:['MD-0703-006'], evid:['quals','training'], ck:{'CK-ISO':[],'CK-NSSQ':[]}, point:'기준: 작업자 자격인증 기준(외주 인력 포함) / 이행: 작업자 인증서·다기능 숙련도 평가서·주기 재평가 이력 제시 (내부 체크시트 미포함 항목 — 별도 점검 필요)' },
  /* 2. 검사관리 */
  '6': { clauses:['8.4'], docs:['MD-0811','MI-0807','MI-0809'], forms:['MI-0801-003'], evid:['partApprovals'], ck:{'CK-ISO':[5],'CK-NSSQ':[10]}, point:'기준: 수입검사 절차(샘플링·판정개수·합불 식별·검사Area 환경·대상/비대상 구분) 최신본 / 이행: 기준서대로 운영되는 현장·식별 상태' },
  '7': { clauses:['8.4'], docs:['MI-0802','MI-0801'], forms:['MI-0801-003','MI-0803-001'], evid:['partApprovals'], ck:{'CK-ISO':[6],'CK-NSSQ':[10]}, point:'기준: 핵심(CTQ) 품목 지정 목록 + 품목(유형)별 수입검사 기준서 / 이행: 지정 품목별 기준서 개별 보유 확인' },
  '8': { clauses:['8.6'], docs:['MD-0811','MI-0809'], forms:['MI-0801-003','MI-0801-004'], evid:[], ck:{'CK-ISO':[7],'CK-NSSQ':[11]}, point:'기준: 수입검사 기준서의 검사수량·판정기준 / 이행: 검사 완료품 3건 이상 성적서와 기준서 대조(수량·판정 일치)' },
  '9': { clauses:['8.4'], docs:['MD-0809','MI-0807'], forms:['MI-0807-002'], evid:['suppliers','partApprovals'], ck:{'CK-ISO':[8],'CK-NSSQ':[23]}, point:'기준: 2차 협력사 성적서 입수 의무 / 이행: 품목별 협력사 성적서 접수 이력 제시', gap:'협력사 성적서 접수 이력대장 양식 없음 — 신규 양식 필요(예: 협력사 성적서 관리대장)' },
  '10': { clauses:['9.1.3'], docs:['MD-0811'], forms:['MI-0801-004','MD-0901-004'], evid:['kpi','ncr'], ck:{'CK-ISO':[9],'CK-NSSQ':[10]}, point:'기준: 수입검사 실적 집계 방법 / 이행: Raw Data·불량 내용 포함 월별 집계표 제시' },
  '11': { clauses:['7.5'], docs:['MI-0805','MD-0702','MI-0701'], forms:['MI-0805-001','MI-0701-001','MI-0701-002'], evid:[], ck:{'CK-ISO':[10],'CK-NSSQ':[]}, point:'기준: SOP(작업표준서·도면·Check Sheet) 개정 관리 / 이행: 문서 등록대장·개정 이력과 현장본 최신 Ver 일치' },
  '12': { clauses:['8.5.1'], docs:['MD-0804','MD-0811'], forms:['MD-0804-006','MI-0803-001'], evid:[], ck:{'CK-ISO':[11],'CK-NSSQ':[12]}, point:'기준: 단계(공정) 검사 Check Sheet / 이행: 현장 설비 2~3대 표본 — 실 작업자·작업 동시 기록 여부 확인' },
  '13': { clauses:['7.5'], docs:['MI-0805'], forms:['MI-0805-001'], evid:[], ck:{'CK-ISO':[12],'CK-NSSQ':[]}, point:'기준: SOP 현장 비치 규정 / 이행: 해당 공정에 최신 SOP 게시·열람 가능 상태(현장 확인)' },
  '14': { clauses:['8.6'], docs:['MD-0811','MD-0810','MP-0805'], forms:['MI-0801-004'], evid:[], ck:{'CK-ISO':[13],'CK-NSSQ':[14]}, point:'기준: 출하검사 절차에 출하 조건별 관리 행위 명시 / 이행: 출하 검사 성적서 운영 실적' },
  '15': { clauses:['8.6'], docs:['MD-0811'], forms:['MI-0801-004','MI-0801-006'], evid:[], ck:{'CK-ISO':[14],'CK-NSSQ':[14]}, point:'기준: 출하 승인(결재) 기준 / 이행: 출하 성적서 결재·단계검사 Check Sheet 운영 상태 확인' },
  '16': { clauses:['9.1.3'], docs:['MD-0811'], forms:['MI-0801-004','MD-0901-004'], evid:['kpi','ncr'], ck:{'CK-ISO':[15],'CK-NSSQ':[14,34]}, point:'기준: 출하검사 실적 집계 방법 / 이행: Raw Data·불량 내용 포함 집계표 제시' },
  /* 3. 부적합 관리 */
  '17': { clauses:['8.7'], docs:['MD-1002'], forms:['MD-1002-001','MD-1002-003'], xforms:['MD-1002-004'], evid:['ncr'], ck:{'CK-ISO':[16],'CK-NSSQ':[15]}, point:'기준: 수입·공정·출하·시장 부적합 처리 절차(식별·격리·평가·승인·재검사) / 이행: 단계별 처리 기록 연결' },
  '18': { clauses:['10.2'], docs:['MD-1002','MD-1001'], forms:['MD-0902-003','MD-1001-001'], evid:['ncr','custIssues'], ck:{'CK-ISO':[17],'CK-NSSQ':[16]}, point:'기준: 대책 요청·입수 절차(원인분석·재발방지) / 이행: 외주 포함 부적합 대책서 입수 이력' },
  '19': { clauses:['10.2'], docs:['MD-1002','MD-1001'], forms:['MD-0902-005','MD-1001-001'], evid:['ncr','rework'], ck:{'CK-ISO':[18],'CK-NSSQ':[16,17]}, point:'기준: 대책 유효성 평가 기준 / 이행: 사후관리 완료보고(품의) 및 재발 여부 확인 기록' },
  /* 4. 변경점관리 */
  '20': { clauses:['8.5.6'], docs:['MD-0803','MD-0813'], forms:['MD-0803-001'], evid:['change4m'], ck:{'CK-ISO':[19],'CK-NSSQ':[26]}, point:'기준: 4M 변경점 처리 기준(고객·자체 설계/생산·협력사 범위) / 이행: 변경점 누적 관리대장' },
  '21': { clauses:['8.5.6'], docs:['MD-0803'], forms:['MD-0803-001','MD-0803-002'], evid:['change4m'], ck:{'CK-ISO':[20],'CK-NSSQ':[27,28,29,30]}, point:'기준: 변경 신고·검증·승인 절차 / 이행: 4M 변경 통보서·Check Sheet·고객 승인 이력' },
  /* 5. 협력사 관리 */
  '22': { clauses:['8.4'], docs:['MD-0809','MI-0807'], forms:['MI-0807-001'], xforms:['MI-0807-003'], evid:['suppliers'], ck:{'CK-ISO':[21],'CK-NSSQ':[22,25]}, point:'기준: 협력사 평가 기준(대상·주기·거래유지 조건) / 이행: 기준서 내 해당 내용 포함 여부' },
  '23': { clauses:['8.4'], docs:['MD-0809'], forms:['MI-0807-001','MI-0801-005'], evid:['suppliers'], ck:{'CK-ISO':[22],'CK-NSSQ':[25]}, point:'기준: 정기 평가 계획 / 이행: 품질 부분 포함 평가 결과 보고서' },
  '24': { clauses:['8.4'], docs:['MD-0809'], forms:['MI-0807-001'], evid:['suppliers','ncr'], ck:{'CK-ISO':[23],'CK-NSSQ':[24]}, point:'기준: 평가 지적사항 사후관리 규정 / 이행: 개선 대책서 입수 및 이행 점검 결과서', gap:'협력사 개선 대책서·이행 점검 결과서 전용 양식 없음 — 신규 양식 필요' },
  /* 6. 자재 관리 */
  '25': { clauses:['8.5.4'], docs:['MD-0807','MD-0810'], forms:[], xforms:['MI-1001-004'], evid:[], ck:{'CK-ISO':[24],'CK-NSSQ':[31]}, point:'기준: 보관 구역 표시 기준 / 이행: 창고·현장 선반 팻말·지정 장소 보관 상태(현장 확인)' },
  '26': { clauses:['8.5.4'], docs:['MD-0807','MD-0810'], forms:['MD-0808-002'], evid:[], ck:{'CK-ISO':[25],'CK-NSSQ':[31]}, point:'기준: 창고 환경(온습도·직사광선·먼지) 관리 기준 / 이행: 보관 품질 점검표 주기 기록' },
  '27': { clauses:['7.1.4'], docs:['MI-1001'], forms:['MI-1001-001'], xforms:['MI-1001-004'], evid:[], ck:{'CK-ISO':[26],'CK-NSSQ':[31]}, point:'기준: 3정5S 점검 기준 / 이행: 창고 5S 체크시트 정기 점검 기록' },
  '28': { clauses:['8.5.4'], docs:['MD-0807'], forms:[], xforms:['MI-1001-004'], evid:[], ck:{'CK-ISO':[27],'CK-NSSQ':[31]}, point:'기준: 적재 단수·혼적·역적 금지 기준 / 이행: 현장 적재 상태 확인' },
  '29': { clauses:['8.5.2'], docs:['MD-0806','MD-0807'], forms:['MD-0806-001'], evid:[], ck:{'CK-ISO':[28],'CK-NSSQ':[31]}, point:'기준: 식별(선반·박스·라벨) 및 추적성 기준 / 이행: 현장 자재 라벨·양품 식별 상태' },
  '30': { clauses:['8.7'], docs:['MD-1002','MD-0807'], forms:['MD-1002-001'], evid:['ncr'], ck:{'CK-ISO':[29],'CK-NSSQ':[12,31]}, point:'기준: 불량자재 격리·식별 기준 / 이행: 불량 구역 분리 보관 및 부적합 기록 연계' },
  /* 7. Infra 관리 (환경 관리) */
  '31': { clauses:['7.1.4'], docs:['MI-1001'], forms:['MI-1001-001'], evid:[], ck:{'CK-ISO':[30],'CK-NSSQ':[33]}, point:'기준: 클린룸(준클린룸) 관리 기준(정리·정돈·청소·청결·습관화) / 이행: 클린룸 Check Sheet 운용 기록', gap:'클린룸 관리 기준 없음(3정5S 지침만 존재) — 신규 제정 필요(예: 클린룸 관리 지침)' },
  '32': { clauses:['7.1.4'], docs:[], forms:[], evid:[], ck:{'CK-ISO':[31],'CK-NSSQ':[33]}, point:'기준: 현장 Particle Spec / 이행: 정기 측정 관리대장', gap:'MST 문서 없음 — 신규 제정 필요(예: 클린룸 관리 지침 내 Particle 기준 + 측정 관리대장)' },
  '33': { clauses:['7.1.4'], docs:[], forms:[], evid:[], ck:{'CK-ISO':[32],'CK-NSSQ':[33]}, point:'기준: 클린복·신발·모자·장갑 착용/세탁/교체 기준 / 이행: Check Sheet', gap:'MST 문서 없음 — 신규 제정 필요(예: 클린룸 복장 관리 기준 + 점검표)' },
  '34': { clauses:['7.1.3'], docs:['MD-0701'], forms:['MD-0701-001','MD-0701-003'], evid:['equipment'], ck:{'CK-ISO':[33],'CK-NSSQ':[33]}, point:'기준: Air Utility Spec·필터/소모품 교체 주기 / 이행: 관리대장(교체 이력·합격 판정)', gap:'Air Utility Spec·필터 교체 관리대장 없음 — 설비 관리 절차에 유틸리티 항목 추가 필요' },
  '35': { clauses:['7.1.4'], docs:['MI-1001','MD-0811'], forms:[], xforms:['MI-1001-005'], evid:[], ck:{'CK-ISO':[34],'CK-NSSQ':[32]}, point:'기준: 수입검사실 별도 공간·전담자·항온항습(20±2℃, 65%↓)·대기/합격/불합격 구분 / 이행: Lay-out·온습도 관리 Sheet', gap:'검사실 온/습도 관리 Sheet 양식 없음 — 신규 양식 필요' },
  /* 8. 계측기/Jig 관리 */
  '36': { clauses:['7.1.5'], docs:['MD-0812','MI-0804'], forms:['MD-0812-001','MI-0804-001'], evid:['instruments','tools'], ck:{'CK-ISO':[35],'CK-NSSQ':[18]}, point:'기준: 측정 요구(재질·형상·정도·Size) 대비 계측기/Jig 확보 / 이행: 계측기·Jig List와 도면 요구사항 대조' },
  '37': { clauses:['7.1.5'], docs:['MD-0812','MI-0702'], forms:['MD-0812-001'], evid:['instruments','msa'], ck:{'CK-ISO':[36],'CK-NSSQ':[18]}, point:'기준: 사외/사내 교정·비교정·유휴·운휴 계측기 관리 및 식별 방법 명시 여부 / 이행: 절차서 조항 확인' },
  '38': { clauses:['7.1.5'], docs:['MD-0812'], forms:['MD-0812-001'], evid:['instruments'], ck:{'CK-ISO':[37],'CK-NSSQ':[18]}, point:'기준: 계측기 List 항목(품명·기기번호·구입일·교정주기·최근/차기 교정일) / 이행: 최신 Ver 관리대장' },
  '39': { clauses:['7.1.5'], docs:['MD-0812'], forms:['MD-0812-001','MD-0812-002'], evid:['instruments'], ck:{'CK-ISO':[38],'CK-NSSQ':[18]}, point:'기준: 교정 주기 / 이행: 최근 1년 교정 성적서(전산 허용)·이력카드' },
  '40': { clauses:['7.1.5'], docs:['MD-0812'], forms:['MD-0812-002'], evid:['instruments'], ck:{'CK-ISO':[39],'CK-NSSQ':[19]}, point:'기준: 교정·유휴·비교정·불량 계측기 식별 방법 / 이행: 현장 검교정 필증·식별 스티커 부착 상태' },
  '41': { clauses:['7.1.5'], docs:['MI-0804'], forms:['MI-0804-001'], evid:['tools'], ck:{'CK-ISO':[40],'CK-NSSQ':[20]}, point:'기준: Jig·공용 Tool 등록 기준 / 이행: 치공구 관리대장(List) 최신본' },
  '42': { clauses:['7.1.5'], docs:['MI-0804'], forms:['MI-0804-001'], evid:['tools'], ck:{'CK-ISO':[41],'CK-NSSQ':[21]}, point:'기준: 전용 보관 장소·식별 기준 / 이행: 현장 보관대·식별표 상태' },
  '43': { clauses:['7.1.5'], docs:['MI-0804','MD-0812'], forms:['MI-0804-001'], evid:['tools','instruments'], ck:{'CK-ISO':[42],'CK-NSSQ':[20]}, point:'기준: Jig/Tool 주기 점검 기준 / 이행: 점검 Check Sheet 기록', gap:'Jig/Tool 정기 점검 Check Sheet 양식 없음 — 신규 양식 필요' },
  /* 9. 보안 (과락) */
  '44': { clauses:['8.5.3'], docs:[], forms:[], evid:[], ck:{'CK-ISO':[],'CK-NSSQ':[]}, point:'과락: 고객 도면 현장 방치·성적서 대용 금지 — 고객 자산(도면) 관리 기준과 현장 상태 제시', gap:'MST 문서 없음 — 신규 제정 필요(예: 정보보안 관리 지침 / 고객 도면 관리 기준)' },
  /* 10. 사업자등록증 (과락) */
  '45': { clauses:['4.3'], docs:['QM-01'], forms:[], evid:[], ck:{'CK-ISO':[],'CK-NSSQ':[]}, point:'과락: 생산 소재지와 사업자등록증 주소 일치 — QM-01 적용범위 사업장 주소와 대조', gap:'사업자등록증 관리 기록 없음 — 외부문서로 등록·주소 변경 시 갱신 관리 필요' }
};
