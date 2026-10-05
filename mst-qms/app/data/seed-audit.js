/* 출처: MST 2 / 4. KPI 성과 지표, 5. 내부심사 체크시트, 6. 교육 자료, 7. 완료 보고 (Google Drive) */
/* 원문 기반 데이터. clause(ISO 9001:2015 조항)는 추정 매핑, quiz는 교재 내용 기반 생성(src:"생성"). */
window.SEED = window.SEED || {};
window.SEED.kpis = [
 {
  "id": "K01",
  "proc": "MP-0801",
  "process": "개발 관리",
  "cat": "COP",
  "name": "개발일정준수율(%)",
  "formula": "(개발일정 준수 Project의 수/개발 Project수) X 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "년",
  "owner": "개발팀",
  "doc": "MP-0801",
  "method": "보고서 (보고방법). 1.1 시트 주기: 1년",
  "note": "목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K02",
  "proc": "MP-0801",
  "process": "개발 관리",
  "cat": "COP",
  "name": "업체공정감사 합격율",
  "formula": "업체공정감사합격수/실시건수 ×100",
  "unit": "%",
  "target": 2.0,
  "targetText": "2.0 (2025-11 목표, 원문 단위 %)",
  "dir": "up",
  "agg": "avg",
  "cycle": "년",
  "owner": "개발팀",
  "doc": "MP-0801",
  "method": "보고서 (보고방법). 1.1 시트 주기: 1년",
  "note": "목표 2.0/실적 1.0은 % 표기이나 실제로는 건수로 보임(원문 달성율 50%). 2025-11 외 월 공란",
  "actuals": {
   "2025-11": 1.0
  },
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K03",
  "proc": "MP-0802",
  "process": "구매",
  "cat": "COP",
  "name": "부품재료비율",
  "formula": "( 구매비용 ÷ 매출액 ) x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "down",
  "agg": "avg",
  "cycle": "월",
  "owner": "구매팀",
  "doc": "MP-0802",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K04",
  "proc": "MP-0802",
  "process": "구매",
  "cat": "COP",
  "name": "부품 결품율",
  "formula": "{ 조업정지시간(결품요인) ÷ 가동시간 } x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "down",
  "agg": "avg",
  "cycle": "월",
  "owner": "구매팀",
  "doc": "MP-0802",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K05",
  "proc": "MP-0802",
  "process": "구매",
  "cat": "COP",
  "name": "업체 정기평가 실시율",
  "formula": "( 평가실시건수 ÷ 실시계획 ) × 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "년",
  "owner": "구매팀",
  "doc": "MP-0802",
  "method": "보고서 (보고방법). 1.1 시트 주기: 1년",
  "note": "목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K06",
  "proc": "MP-0803",
  "process": "생산관리",
  "cat": "COP",
  "name": "생산계획 달성율",
  "formula": "( 생산수량 / 생산계획수량 ) x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "월",
  "owner": "제조팀",
  "doc": "MP-0803",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K07",
  "proc": "MP-0803",
  "process": "생산관리",
  "cat": "COP",
  "name": "완성품 재고회전율",
  "formula": "( 월 매출액 / 월말재고금액 )",
  "unit": "회",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "월",
  "owner": "제조팀",
  "doc": "MP-0803",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "원문 단위 표기는 %이나 산출식상 비율(회전수); 목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K08",
  "proc": "MP-0803",
  "process": "생산관리",
  "cat": "COP",
  "name": "완성품 장기재고율",
  "formula": "{ 장기재고금액(3개월이상재고) / 월말재고금액 } x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "down",
  "agg": "avg",
  "cycle": "월",
  "owner": "제조팀",
  "doc": "MP-0803",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K09",
  "proc": "MP-0804",
  "process": "제품 보존 및 인도 관리",
  "cat": "COP",
  "name": "매출 목표 달성율",
  "formula": "( 당월실적 / 당월계획) x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "월",
  "owner": "영업팀",
  "doc": "MP-0804",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K10",
  "proc": "MP-0804",
  "process": "제품 보존 및 인도 관리",
  "cat": "COP",
  "name": "운송비용(비율)",
  "formula": "( 물류비 / 매출액 ) x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "down",
  "agg": "avg",
  "cycle": "월",
  "owner": "영업팀",
  "doc": "MP-0804",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K11",
  "proc": "MP-0901",
  "process": "고객 만족",
  "cat": "COP",
  "name": "고객불량 건수 목표달성율",
  "formula": "(목표 건수 / 발생 건수) x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "월",
  "owner": "품질팀",
  "doc": "MP-0901",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K12",
  "proc": "MP-0401",
  "process": "경영 관리",
  "cat": "MP",
  "name": "사업계획 대비 실적 달성율",
  "formula": "( 사업실적 / 사업계획 ) x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "반기",
  "owner": "관리팀",
  "doc": "MP-0401",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "측정주기 불일치: KPI 성과 지표 시트 \"매월\" vs 핵심KPI LIST 모니터링_R1 \"반기\" (후자 채택, 기준 확정 필요); 목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K13",
  "proc": "MP-0401",
  "process": "경영 관리",
  "cat": "MP",
  "name": "내부시스템 심사 실시율",
  "formula": "(실적/계획) x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "년",
  "owner": "관리팀",
  "doc": "MP-0401",
  "method": "보고서 (보고방법). 1.1 시트 주기: 1회/반기",
  "note": "측정주기 불일치: KPI 성과 지표 시트 \"1회/반기\" vs 핵심KPI LIST 모니터링_R1 \"년\" (후자 채택, 기준 확정 필요); 목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K14",
  "proc": "MP-0401",
  "process": "경영 관리",
  "cat": "MP",
  "name": "제조공정 심사 실시율",
  "formula": "(실적/계획) x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "분기",
  "owner": "관리팀",
  "doc": "MP-0401",
  "method": "보고서 (보고방법). 1.1 시트 주기: 1년",
  "note": "측정주기 불일치: KPI 성과 지표 시트 \"1년\" vs 핵심KPI LIST 모니터링_R1 \"분기\" (후자 채택, 기준 확정 필요); 목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K15",
  "proc": "MP-0401",
  "process": "경영 관리",
  "cat": "MP",
  "name": "제품 심사 실시율",
  "formula": "(실적/계획) x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "년",
  "owner": "관리팀",
  "doc": "MP-0401",
  "method": "보고서 (보고방법). 1.1 시트 주기: 1회/분기",
  "note": "측정주기 불일치: KPI 성과 지표 시트 \"1회/분기\" vs 핵심KPI LIST 모니터링_R1 \"년\" (후자 채택, 기준 확정 필요); 목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K16",
  "proc": "MP-1001",
  "process": "개선",
  "cat": "MP",
  "name": "시정조치 완료율",
  "formula": "(완료건수/발행건수) x100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "분기",
  "owner": "품질팀",
  "doc": "MP-1001",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "측정주기 불일치: KPI 성과 지표 시트 \"매월\" vs 핵심KPI LIST 모니터링_R1 \"분기\" (후자 채택, 기준 확정 필요); 목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K17",
  "proc": "MP-0701",
  "process": "설비보전관리",
  "cat": "SP",
  "name": "공정불량율",
  "formula": "(공정불량수/생산수량) x1,000,000",
  "unit": "ppm",
  "target": null,
  "targetText": "",
  "dir": "down",
  "agg": "avg",
  "cycle": "년",
  "owner": "제조팀",
  "doc": "MP-0701",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "원문 단위 표기는 %이나 산출식(×1,000,000)상 PPM; 측정주기 불일치: KPI 성과 지표 시트 \"매월\" vs 핵심KPI LIST 모니터링_R1 \"년\" (후자 채택, 기준 확정 필요); 목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K18",
  "proc": "MP-0702",
  "process": "문서화된 정보관리",
  "cat": "SP",
  "name": "시스템 문서 개정 실시율",
  "formula": "(실적/계획) x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "년",
  "owner": "관리팀",
  "doc": "MP-0702",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "측정주기 불일치: KPI 성과 지표 시트 \"매월\" vs 핵심KPI LIST 모니터링_R1 \"년\" (후자 채택, 기준 확정 필요); 목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K19",
  "proc": "MP-0703",
  "process": "교육 훈련",
  "cat": "SP",
  "name": "교육계획 달성율",
  "formula": "(실적/계획) x 100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "반기",
  "owner": "관리팀",
  "doc": "MP-0703",
  "method": "보고서 (보고방법). 1.1 시트 주기: 1회/반기",
  "note": "목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K20",
  "proc": "MP-0805",
  "process": "검사 업무",
  "cat": "SP",
  "name": "입고 불량율",
  "formula": "(불량수/입고수) x1,000,000",
  "unit": "ppm",
  "target": null,
  "targetText": "",
  "dir": "down",
  "agg": "avg",
  "cycle": "년",
  "owner": "품질팀",
  "doc": "MP-0805",
  "method": "보고서 (보고방법). 1.1 시트 주기: 매월",
  "note": "원문 단위 표기는 %이나 산출식(×1,000,000)상 PPM; 측정주기 불일치: KPI 성과 지표 시트 \"매월\" vs 핵심KPI LIST 모니터링_R1 \"년\" (후자 채택, 기준 확정 필요); 목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 },
 {
  "id": "K21",
  "proc": "MP-0805",
  "process": "검사 업무",
  "cat": "SP",
  "name": "교정 실시율",
  "formula": "(교정실시계측기/대상계측기) ×100",
  "unit": "%",
  "target": null,
  "targetText": "",
  "dir": "up",
  "agg": "avg",
  "cycle": "반기",
  "owner": "품질팀",
  "doc": "MP-0805",
  "method": "보고서 (보고방법). 1.1 시트 주기: 1회/반기",
  "note": "목표값 원문 미입력(\"-\") — 설정 필요",
  "actuals": {},
  "source": "https://docs.google.com/spreadsheets/d/1CCTebmBS4d6acNElVr-1riqp9WS4Ep9EEQL0Y8FgwmI/edit"
 }
];
window.SEED.checklists = [
 {
  "id": "CK-ISO",
  "type": "internal",
  "title": "품질경영평가시트 (내부심사 체크시트, 42항목)",
  "source": "https://docs.google.com/spreadsheets/d/1y7uzZIWe8UJTXpQxYC7vJTfQfk2NCQq7rhp-_jk_a88/edit",
  "note": "구 SSQ 기준. 동일 내용이 _rev2_251104, _rev2_251104_newSSQ 파일의 \"품질경영평가시트\" 시트에도 있음. sub=QMS(관련 절차). 원문 상단 집계 L-RISK 29건(원문값). 총점(소계 합) 335.00은 계산값. 책임팀/점검결과 원문 공란. criteria 원문 없음(SSQ 평가기준은 custEval 참조).",
  "scale": {
   "type": "risk",
   "levels": [
    {
     "code": "H",
     "text": "관련 프로세스가 절차서/지침서에 따라 수행되지 않으며, 동일누락 또는 오류가 많음"
    },
    {
     "code": "M",
     "text": "관련 프로세스가 절차서/지침서에 따라 수행되고 있으나, 일부 항목의 누락 또는 오류가 있음."
    },
    {
     "code": "L",
     "text": "관련 프로세스가 절차서/지침서에 준하여 누락 또는 오류 없이 수행됨."
    }
   ],
   "L": 10,
   "H": null,
   "M": null,
   "rule": "점수 = 가중치 × RISK점수. 원문에서 확인된 값은 L=10 (가중치 50%→5.00, 100%→10.00, 150%→15.00). H·M 환산식은 원문에 없음. 가중치 공란은 0.00",
   "columns": "책임팀 / 점검 결과 (5W1H 상세 작성) — 원문 공란"
  },
  "sections": [
   {
    "name": "1. 품질경영",
    "subtotal": 20,
    "items": [
     {
      "no": 1,
      "ref": "1.1",
      "sub": "검사 및 시험 절차",
      "q": "수입검사 ,공정 검사, 출하 검사, 시장 품질 등 목표 대비 실적이 관리 되며 보고 되고 있는가?",
      "criteria": "",
      "evidence": "주(월)간 품질회의 보고서 , (수입,공정,출하)검사 실적 및 집계표",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "9.1.3"
     },
     {
      "no": 2,
      "ref": "1.2",
      "sub": "조직 및 업무분장 절차",
      "q": "품질 관리 부서의 독립성 및 업무 분장은 되어 있는가",
      "criteria": "",
      "evidence": "업무분장표",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "5.3"
     },
     {
      "no": 3,
      "ref": "1.3",
      "sub": "검사 및 시험 절차",
      "q": "품질 부서 인원은 전 품목에 대한 전수 검사 업무 수행에 충분한가",
      "criteria": "",
      "evidence": "업무분장표 , 직무 분석 조사표",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.1.2"
     },
     {
      "no": 4,
      "ref": "1.4",
      "sub": "인적 자원 관리 절차",
      "q": "검사 인력 자격인증 기준이 있으며, 주기적 운영되고 있는가",
      "criteria": "",
      "evidence": "검사원 인증 기준서 인증서, 평가 이력",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.2"
     }
    ]
   },
   {
    "name": "2. 검사관리",
    "subtotal": 115,
    "items": [
     {
      "no": 5,
      "ref": "2.1",
      "sub": "부품 승인 절차",
      "q": "수입 검사 규정 (최신본 개정 여부) 및 절차를 보유 하고 있는가",
      "criteria": "",
      "evidence": "입고 검사 절차서",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.4.2"
     },
     {
      "no": 6,
      "ref": "2.2",
      "sub": "CTQ 절차",
      "q": "핵심 (중요) 품목이 지정되어 있으며 품목 (유형)별로 수입검사 기준(표준)을 별도 보유 하고 있는가",
      "criteria": "",
      "evidence": "CTQ 항목 , QC 공정도, 작업표준서",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.4.2"
     },
     {
      "no": 7,
      "ref": "2.3",
      "sub": "검사 및 시험 절차",
      "q": "수입검사 기준에 따른 검사가 실시 되었는가 검사 수량 및 판정결과가 검사기준을 만족하는가 (검사 완료품 Sample 3개 이상 Check)",
      "criteria": "",
      "evidence": "수입검사 성적서, 기준서, 협정서",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.6"
     },
     {
      "no": 8,
      "ref": "2.4",
      "sub": "검사 및 시험 절차",
      "q": "수입검사 품목에 해당하는 2차 협력사 성적서 관리는 하고 있는가",
      "criteria": "",
      "evidence": "수입검사 성적서, 기준서, 협정서",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.4.2"
     },
     {
      "no": 9,
      "ref": "2.5",
      "sub": "검사 및 시험 절차",
      "q": "수입검사 결과에 대한 실적(현황) 관리 하고 있는가 ( 실적 : Raw Data , 불량 내용 포함)",
      "criteria": "",
      "evidence": "입고실적 , 불량율 집계",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "9.1.3"
     },
     {
      "no": 10,
      "ref": "2.6",
      "sub": "작업표준 관리 지침",
      "q": "최신 Ver의 SOP (조립표준서, 조립도면, Check Sheet)를 보유 하고 있는가. (이력대장 포함 된 최신 SOP 관리)",
      "criteria": "",
      "evidence": "작업표준서, 점검시트",
      "weight": 1.5,
      "weightText": "150%",
      "clause": "7.5.3"
     },
     {
      "no": 11,
      "ref": "2.7",
      "sub": "검사 및 시험 절차",
      "q": "단계 검사 Check Sheet (or 협력사 자체 C/S)에 따라 검사가 실시 되고 있는가 (실 작업자 Check 여부, 작업 동시 Check 여부 확인)",
      "criteria": "",
      "evidence": "단계 검사 체크시트",
      "weight": 1.5,
      "weightText": "150%",
      "clause": "8.5.1"
     },
     {
      "no": 12,
      "ref": "2.8",
      "sub": "작업표준 관리 지침",
      "q": "SOP (조립표준서, 조립도면, Check Sheet) 는 현장에 작업자가 쉽게 열람할 수 있도록 해당 공정에 비치 되어 있는가",
      "criteria": "",
      "evidence": "작업표준서, 점검시트",
      "weight": 1.5,
      "weightText": "150%",
      "clause": "7.5.3"
     },
     {
      "no": 13,
      "ref": "2.9",
      "sub": "검사 및 시험 절차",
      "q": "자체 출하 검사 절차 (Process)가 수립되어 있는가 (출하 조건 별 관리 행위에 대한 내용 필수 내포되어야 함)",
      "criteria": "",
      "evidence": "출하 검사 절차서",
      "weight": 1.5,
      "weightText": "150%",
      "clause": "8.6"
     },
     {
      "no": 14,
      "ref": "2.10",
      "sub": "검사 및 시험 절차",
      "q": "출하 검사 기준 (절차)에 맞는 출하 조건 결재 행위가 실시되고 있는가",
      "criteria": "",
      "evidence": "출하 검사 설적서",
      "weight": 1.5,
      "weightText": "150%",
      "clause": "8.6"
     },
     {
      "no": 15,
      "ref": "2.11",
      "sub": "검사 및 시험 절차",
      "q": "출하 검사 결과에 대한 실적 (현황) 관리 하고 있는가 (실적 : Raw data , 불량 내용 포함)",
      "criteria": "",
      "evidence": "출하 검사 설적서",
      "weight": 1.5,
      "weightText": "150%",
      "clause": "9.1.3"
     }
    ]
   },
   {
    "name": "3. 부적합관리",
    "subtotal": 20,
    "items": [
     {
      "no": 16,
      "ref": "3.1",
      "sub": "부적합 및 시정조치 절차",
      "q": "수입, 공장, 출하, 시장 불량에 대한 부적합 처리 절차가 있는가",
      "criteria": "",
      "evidence": "부적합절차서",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "8.7"
     },
     {
      "no": 17,
      "ref": "3.2",
      "sub": "부적합 및 시정조치 절차",
      "q": "내부 (외주포함) 부적합 대책 요청 및 대책 입수가 되고 있는가 (원인 분석, 재발방지 대책)",
      "criteria": "",
      "evidence": "부적합 개선 대책서 , 부적합 관리 대장",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "10.2"
     },
     {
      "no": 18,
      "ref": "3.3",
      "sub": "부적합 및 시정조치 절차",
      "q": "내부 (외주포함) 부적합의 개선 대책에 대한 유효성 (사후관리) 평가는 실시 하고 있는가",
      "criteria": "",
      "evidence": "부적합 유효성 관리대장",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "10.2"
     }
    ]
   },
   {
    "name": "4. 변경점",
    "subtotal": 15,
    "items": [
     {
      "no": 19,
      "ref": "4.1",
      "sub": "4M 변경 관리 절차",
      "q": "변경점 처리 기준을 보유 하고 있는가 ? * 변경점 운영 범위 : 고객, 자체 (설계, 생산), 협력사",
      "criteria": "",
      "evidence": "변경점 절차서, 변경점 관리대장",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.5.6"
     },
     {
      "no": 20,
      "ref": "4.2",
      "sub": "4M 변경 관리 절차",
      "q": "변경점 관리를 실시 하고 있는가 ?",
      "criteria": "",
      "evidence": "변경점 관리대장",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "8.5.6"
     }
    ]
   },
   {
    "name": "5. 협력사관리",
    "subtotal": 15,
    "items": [
     {
      "no": 21,
      "ref": "5.1",
      "sub": "외부공급자 절차",
      "q": "협력사 평가 기준을 보유하고 있는가",
      "criteria": "",
      "evidence": "협력사 평가기준 , 협력사 평가시트",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.4.1"
     },
     {
      "no": 22,
      "ref": "5.2",
      "sub": "외부공급자 절차",
      "q": "협력사 평가 기준대로 시행하고 있는가",
      "criteria": "",
      "evidence": "협력사 평가 계획 대 실적",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.4.1"
     },
     {
      "no": 23,
      "ref": "5.3",
      "sub": "외부공급자 절차",
      "q": "평가 결과에 대한 사후관리가 실시되고 있는가 (지적사항 개선 대책서 입수 및 이행 점검 결과)",
      "criteria": "",
      "evidence": "협력사 지적사항 및 개선 대책",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.4.2"
     }
    ]
   },
   {
    "name": "6. 자재 관리",
    "subtotal": 45,
    "items": [
     {
      "no": 24,
      "ref": "6.1",
      "sub": "자재 관리 절차",
      "q": "제품 (자재) 창고 보관 구역 표시는 되어 있는가 ( 부품 현장 투입 Process 시 _ 현장 내 선반 또는 지정된 장소에 보관 되어 있는가 )",
      "criteria": "",
      "evidence": "현장 구획 관리, 정위치, 눈으로 보는 관리",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.5.4"
     },
     {
      "no": 25,
      "ref": "6.2",
      "sub": "자재 관리 절차",
      "q": "자재 창고 환경 관리 기준 보유 및 주기적인 관리가 되고 있는가 (온도, 습도, 직사광선, 먼지 유입 등 )(부품 현장 투입 Process 시_자재 보관시 환경기준은 준수되고 있는가)",
      "criteria": "",
      "evidence": "온습도, 청결관리 기준",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.5.4"
     },
     {
      "no": 26,
      "ref": "6.3",
      "sub": "자재 관리 절차",
      "q": "창고 5S 상태 확인 및 정기적 점검은 실시 하고 있는가 (부품 현장 투입시 Process 시 _ 현장 내 자재 보관시 5S 점검은 실시하고 있는가)",
      "criteria": "",
      "evidence": "3정5S 계획 대 실적",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.1.4"
     },
     {
      "no": 27,
      "ref": "6.4",
      "sub": "자재 관리 절차",
      "q": "기준에 위배된 혼적 , 역적은 없는가 * 적재 단수 (안전, 변형), 혼적(분실, 재고관리 문제), 역적(파손 소지) (부품 현장 투입 Process 시 _ 현장 내 자재 보관을 준수 하고 있는가)",
      "criteria": "",
      "evidence": "자재 관리 절차서",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "8.5.4"
     },
     {
      "no": 28,
      "ref": "6.5",
      "sub": "식별 및 추적성 절차",
      "q": "자재에 대한 식별 (선반, 박스별, 자재 라벨 등) 양품으로 구분은 되는가 (부품 현장 투입 Process 시 _ 자재 식별은 되고 있는가)",
      "criteria": "",
      "evidence": "로트추적관리",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "8.5.2"
     },
     {
      "no": 29,
      "ref": "6.6",
      "sub": "자재 관리 절차",
      "q": "불량자재는 일반 자재창고 보관시 양품과 구분되는가 (부품 현장 투입 Process 시 _ 현장 내 양품과 구분되는가)",
      "criteria": "",
      "evidence": "불량품 격리",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "8.7.1"
     }
    ]
   },
   {
    "name": "7. 인프라",
    "subtotal": 35,
    "items": [
     {
      "no": 30,
      "ref": "7.1",
      "sub": "-",
      "q": "클린룸 (준 크린룸 포함) 관리 기준 보유 및 기준대로 관리되고 있는가 * 정리 (보관 외 물품이 없을 것) / 정돈 (미관상 양호) / 청소 (청소 상태, 주기) / 청결 (바닥 외 보관 box, 선반, 자재 오염 여부 확인) / 습관화 (Check Sheet 운용)",
      "criteria": "",
      "evidence": "클린룸관리 기준서",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.1.4"
     },
     {
      "no": 31,
      "ref": "7.2",
      "sub": "-",
      "q": "현장 Particle Spec 관리는 준수 되고 있는가",
      "criteria": "",
      "evidence": "클린룸관리 기준서",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.1.4"
     },
     {
      "no": 32,
      "ref": "7.3",
      "sub": "-",
      "q": "클린복, 신발, 모자, 장갑 관리는 양호 한가",
      "criteria": "",
      "evidence": "클린룸관리 기준서",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.1.4"
     },
     {
      "no": 33,
      "ref": "7.4",
      "sub": "-",
      "q": "Air Utility Spec 합격 관리 및 관리 대장이 운영 되고 있는가 (관리대장 : 소모품 교체, 필터 교체 주기 등)",
      "criteria": "",
      "evidence": "소모품관리대장, 설비점검이력대장",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "7.1.3"
     },
     {
      "no": 34,
      "ref": "7.5",
      "sub": "-",
      "q": "수입검사실은 별도 공간으로 마련되어 있는가 검사실 5S (청정) 상태는 양호한가 전담 수입검사자는 배치되어 있는가 항온, 항습 관리 (실온 20도 +- 2도 , 습도 65% 이하)가 되고 있는가 검사품목 (대기, 합격, 불합격)의 구분은 되고 있는가",
      "criteria": "",
      "evidence": "온습도관리, 검사전후 식별",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "7.1.4"
     }
    ]
   },
   {
    "name": "8. 계측기",
    "subtotal": 70,
    "items": [
     {
      "no": 35,
      "ref": "8.1",
      "sub": "검사,계측기 및 시험장비 절차",
      "q": "검사에 필요한 계측기 /Jig는 확보 되어 있는가 (피 측정물의 재질, 형상, 정도, Size 및 도면 내 요구사항 검증)",
      "criteria": "",
      "evidence": "검교정 성적서, 검교정관리대장",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.1.5.1"
     },
     {
      "no": 36,
      "ref": "8.2",
      "sub": "검사,계측기 및 시험장비 절차",
      "q": "계측기 관리 기준을 보유 하고 있는가 * 사외, 사내 교정, 비교정, 유휴, 운휴 계측기 관리 방법 및 식별에 대한 내용 내포 필 (9001 요건 내 내용 내포 안되어 있을 경우 미 보유 , 단 100% 사외 교정 실시 하고 있으며 비교정, 유휴 없을 경우 ISO9001 요건 인정)",
      "criteria": "",
      "evidence": "검교정 성적서, 검교정관리대장",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.1.5.2"
     },
     {
      "no": 37,
      "ref": "8.3",
      "sub": "검사,계측기 및 시험장비 절차",
      "q": "계측기 List에 의한 현황 관리가 최신 Ver으로 관리 되고 있는가 (품명, 기기번호, 구입일, 교정주기, 최근 교정 이력, 차기 교정예정일)",
      "criteria": "",
      "evidence": "검교정 성적서, 검교정관리대장",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.1.5.2"
     },
     {
      "no": 38,
      "ref": "8.4",
      "sub": "검사,계측기 및 시험장비 절차",
      "q": "교정을 실시 하고 있으며 성적서가 관리되고 있는가 (최근 1년, 전산관리 허용)",
      "criteria": "",
      "evidence": "검교정 성적서, 검교정관리대장",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "7.1.5.2"
     },
     {
      "no": 39,
      "ref": "8.5",
      "sub": "검사,계측기 및 시험장비 절차",
      "q": "교정, 유휴, 비교정, 불량 계측기의 Line 식별 여부 (검교정 필증, 식별스티커 부착)",
      "criteria": "",
      "evidence": "검교정 성적서, 검교정관리대장",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "7.1.5.2"
     },
     {
      "no": 40,
      "ref": "8.6",
      "sub": "치공구 관리 지침",
      "q": "Jig 및 공용 Tool List가 있는가",
      "criteria": "",
      "evidence": "치공구 관리 대장",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "7.1.5.1"
     },
     {
      "no": 41,
      "ref": "8.7",
      "sub": "치공구 관리 지침",
      "q": "Jig 및 공용 Tool은 전용 보관 장소에 식별되어 보관 되어 있는가",
      "criteria": "",
      "evidence": "치공구 관리 대장",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "7.1.5.2"
     },
     {
      "no": 42,
      "ref": "8.8",
      "sub": "검사,계측기 및 시험장비 절차",
      "q": "주기적으로 점검을 실시 하는가 (Check Sheet)",
      "criteria": "",
      "evidence": "치공구 자체 검교정",
      "weight": 1.5,
      "weightText": "150%",
      "clause": "7.1.5.1"
     }
    ]
   }
  ]
 },
 {
  "id": "CK-NSSQ",
  "type": "internal",
  "title": "품질경영평가시트 (2) — newSSQ 기준 내부심사 체크시트 (36항목)",
  "source": "https://docs.google.com/spreadsheets/d/182uc8DWHH-LrnmqNxCSsXxKlNlxRwB0EWWUm49kAQRs/edit",
  "note": "기준본: 내부심사 체크시트_rev2_251104_newSSQ 시트2. 원문 번호 중복(1.3×2, 3.1×4, 4.2×2, 6.5×2) 및 무번호 1건 → ref에 원문 번호, no는 순번. 가중치 공란 항목은 weight:null(원문 점수 0.00). 원문 상단 집계 L-RISK 36건. sub=QMS 프로세스.",
  "scale": {
   "type": "risk",
   "levels": [
    {
     "code": "H",
     "text": "관련 프로세스가 절차서/지침서에 따라 수행되지 않으며, 동일누락 또는 오류가 많음"
    },
    {
     "code": "M",
     "text": "관련 프로세스가 절차서/지침서에 따라 수행되고 있으나, 일부 항목의 누락 또는 오류가 있음."
    },
    {
     "code": "L",
     "text": "관련 프로세스가 절차서/지침서에 준하여 누락 또는 오류 없이 수행됨."
    }
   ],
   "L": 10,
   "H": null,
   "M": null,
   "rule": "점수 = 가중치 × RISK점수. 원문에서 확인된 값은 L=10 (가중치 50%→5.00, 100%→10.00, 150%→15.00). H·M 환산식은 원문에 없음. 가중치 공란은 0.00",
   "columns": "책임팀 / 점검 결과 (5W1H 상세 작성) — 원문 공란"
  },
  "sections": [
   {
    "name": "품질운영",
    "qms": "경영 관리 프로세스 (QMS)",
    "subtotal": 15,
    "items": [
     {
      "no": 1,
      "ref": "1.1",
      "sub": "경영 관리 프로세스",
      "q": "품질 조직의 독립성 및 업무 분장",
      "criteria": "1) 조직의 독립성 및 역할 구분 2) 조직의 책임 및 권한 명문화",
      "evidence": "조직도, 업무 분장도",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "5.3"
     },
     {
      "no": 2,
      "ref": "1.2",
      "sub": "경영 관리 프로세스",
      "q": "품질 인력에 대한 품질 관련 교육훈련 프로그램 운영",
      "criteria": "1) 년간 직무 교육훈련 커리큘럼 및 계획서 보유 (품질 Master 과정에 대한 체계적 운영) 2) 직무별 교육 과정의 적합성 3) 계획 대비 실행율 80% 이상 (최근2년) 4) 직무교육 이력관리 5) 품질 전문 인력 확보 (품질관련 국가 자격 보유 비율)",
      "evidence": "교육계획서, 교육보고서, 교육이력대장, 자격증 현황",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.2"
     },
     {
      "no": 3,
      "ref": "1.3",
      "sub": "경영 관리 프로세스",
      "q": "품질 검사자에 대한 자격 인증 실시",
      "criteria": "1) 자격 인증 필요 대상 선정 및 인증 기준/절차 보유 2) 인증 절차 및 방법 (이론 및 실시) 의 적절성 3) 인증 평가 근거 (이력 확인) 4) 자격 인증 기간 유효성 및 갱신 / Lv Up 확인 5) 인증 인력별 업무 배치 6) 인증 인력 식별 관리 (현황판, 복장 등)",
      "evidence": "자격 인증 절차서, 평가서., 인증서, 업무분장표, 인증현황 및 식별 관리",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.2"
     },
     {
      "no": 4,
      "ref": "1.3",
      "sub": "경영 관리 프로세스",
      "q": "내부 심사원에 대한 자격 인증 실시",
      "criteria": "1) 내부 심사원 운영 기준 2) 내부 심사원 교육/평가/자격 인증 3) 자격 인증 유효성 관리 4) Cross Check 를 통한 내부 심사 객관성 확보",
      "evidence": "자격 인증 절차서, 평가서, 인증서, 업무 분장표, 내부 심사원 List",
      "weight": null,
      "weightText": "",
      "clause": "9.2.2"
     },
     {
      "no": 5,
      "ref": "1.4",
      "sub": "경영 관리 프로세스",
      "q": "품질 절차서(규정/규칙)의 유지 / 관리",
      "criteria": "1) 표준 문서 관리 절차 보유 2) 제/개정에 대한 검토/승인 관리 3) 제/개정 실적 및 이력 관리 List 보유 4) 전산 시스템을 활용한 보관 및 소실 시 Back up 대책 5) 개정 기간 도래 시 사전 알림 (개정 누락 방지, 전산 시스템 자동)",
      "evidence": "품질매뉴얼, 절차서 (규정/규칙), 전결 (진본)",
      "weight": null,
      "weightText": "",
      "clause": "7.5.3"
     },
     {
      "no": 6,
      "ref": "1.5",
      "sub": "경영 관리 프로세스",
      "q": "품질경영시스템 인증 (ISO9001) 및 사후 / 갱신 유지 관리",
      "criteria": "1) 계획에 따라 사후/갱신 심사가 정기적으로 진행 됨 2) 심사 부적합/권고사항 시정 조치 관리 3) 사내 규정에 정의된 담당자 보유",
      "evidence": "인증서, 시정조치보고서",
      "weight": null,
      "weightText": "",
      "clause": "10.2"
     },
     {
      "no": 7,
      "ref": "1.6",
      "sub": "경영 관리 프로세스",
      "q": "품질 내부 심사의 정기 실시 (ISO9001 규정)",
      "criteria": "1) 년간 계획을 수립 하고 전 부서 대상 절차대로 시행 2) 지적 또는 권고에 대한 시정조치",
      "evidence": "내부감사 계획서, 결과 보고서, 시정 조치 보고서",
      "weight": null,
      "weightText": "",
      "clause": "9.2"
     },
     {
      "no": 8,
      "ref": "1.7",
      "sub": "경영 관리 프로세스",
      "q": "품질목표 (KPI) 수립 및 지속적 개선활동 실시",
      "criteria": "1) 전사 품질 목표 수립 (내부,고객) / 개선 계획서 (전략, Action item) 2) 각 과제별 목표 지수가 고객사 관리 지수와 일치 3) 실현 가능한 수준의 전략, Action Item 수립 및 승인 4) 품질목표 달성 위한 정기 점검, 개선 활동 이력 있음 5) 목표/전략 미진 항목에 대해 복기 및 개선 추진 활동 6) 경영진 정기 보고 체계",
      "evidence": "전략, 보고서, 회의록",
      "weight": null,
      "weightText": "",
      "clause": "6.2"
     },
     {
      "no": 9,
      "ref": "1.8",
      "sub": "경영 관리 프로세스",
      "q": "조직 내의 의사 소통 (정기회의 구성 및 운영 체계)",
      "criteria": "1) 경영진 주관 정기 품질 회의 실시 2) 고객/내부/협력사 단계의 품질 현황, 분석, 조치, 대책 관리 3) 품질회의 결과 및 경영진 F/B 사항에 대한 후속 활동 진행 4) 경영진 정기 보고 체계",
      "evidence": "품질회의 운영안, 보고서, 회의록",
      "weight": null,
      "weightText": "",
      "clause": "7.4"
     }
    ]
   },
   {
    "name": "검사체계",
    "qms": "검사 업무 프로세스 (QMS)",
    "subtotal": 40,
    "items": [
     {
      "no": 10,
      "ref": "2.1",
      "sub": "검사 업무 프로세스",
      "q": "자재/부품 수입검사 운영 체계",
      "criteria": "1) 검사 기준(관리계획 수립, 대상별 검사 방법, 검사수, 전환규칙 소재 별 Aging 외) 2). 검사 기준서 최신.Ver 유지 (개정 1년 이내, 개정 이력 확인 ) 3) 중요 품목 선정 및 검사 표준서 보유 4) 발주 품목에 대한 품질 특성 측정 가능한 계측기 보유 5) 검사 성적서 작성/ 보관(외주업체 제출 성적서 포함) 6) 검사 결과 이력관리(전산시스템을 통한 관리, 수기관리)",
      "evidence": "수입검사 업무 절차서, 검사기준서, 검사 성적서, 관리계획서, 계측기리스트, 검사 이력관리, 부적합 관리 절차서",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.4.2"
     },
     {
      "no": 11,
      "ref": "2.2",
      "sub": "검사 업무 프로세스",
      "q": "수입검사 기준에 준한 처리",
      "criteria": "1) 구역 분리 운영 (검사대기,완료,진행,합격,불합격 등 흔적) 2) 검사실 항온/항습 관리 ( 실온 20도 +-2도,습도 65% 이하) 3) 검사 기준에 준한 대상 별 검사 실시 (검사방법,검사수,전환규칙 반영) 4) 검사 진행, 검사원의 검사 기준 인지(검사실 확인, 인터뷰) 5) 중요 품목 검사 표준 준수 (검사실 확인) 6) 중요 품목에 대한 관리도 ,SPC 운영 /분석 7) 직납품의 전수 검사 실시 * 기준 모호, 품질특성 미 고려한 계측기를 활용한 상태 진행시 신뢰성 없음 판정",
      "evidence": "수입검사 업무 절차서, 검사기준서, 검사 성적서, 관리계획서, 계측기리스트, 검사 이력관리, 부적합 관리 절차서",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.6"
     },
     {
      "no": 12,
      "ref": "2.3",
      "sub": "검사 업무 프로세스",
      "q": "수입검사 불합격품에 대한 처리",
      "criteria": "1) 격리 식별, 처리 등 부적합품 관리 준수 (현장 확인 병행) 2) 부적합품 수정/조치 후 재 검사 및 이력관리 절차 준수",
      "evidence": "수입검사 업무 절차서, 검사기준서, 검사 성적서, 관리계획서, 계측기리스트, 검사 이력관리, 부적합 관리 절차서",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.7"
     },
     {
      "no": 13,
      "ref": "2.4",
      "sub": "검사 업무 프로세스",
      "q": "품질 부서의 공정 감사 운영",
      "criteria": "1) 공정표 기준 단계별 검사 주체, 역할 정의 (외주,제조,품질 전환규칙) 2) 품질 검사 구간에 대한 검사 표준 Check Sheet 최신 Ver 유지 3) 공정 검사 Check 항목에 대한 적합성(정량, 정성) 4) 공정 검사 부적격에 대한 식별, 격리, 조치, 재검사, 기록 5) 검사 결과 이력관리(전산시스템을 통한 관리, 수기 관리) 6) 공정표 기준 제작 중 발생된 부적합에 대한 공정 별 지수 관리",
      "evidence": "공정검사 업무 절차서, Check Sheet, 검사 이력관리, 공정표, 부적합 분석 자료, 부적합 관리 절차",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.5.1"
     },
     {
      "no": 14,
      "ref": "2.5",
      "sub": "검사 업무 프로세스",
      "q": "완성품 보증을 위한 출하 승인 체계",
      "criteria": "1) 검사 기준 or 체크시트의 변경 이력 관리 및 최신본 유지 2) 출하 승인 조건 (승인을 위한 산출물, 전결규정) 3) 사양 검토 및 이상 여부 Check(옵션 사양,납입처,특이사항) 4) 표준 Check sheet의 변경 사항 반영 및 Check (설게변경, 5M1E 변경 ) 5) 사양 외 고객 요구 사항이 반영된 출하 검사 Check Sheet 운영 * 외관 , 8계통, 청정 등 기능성, 동작, 특성 검사 외 6) 출하검사 산출물에 대한 실행 수준 (누락,기준 불일치, 판정오류,재검사등) 7) 이전 문제 재발방지를 위한 Re-check 8) 검사 결과 이력관리 (전산시스템을 통한 관리, 수기관리) 9) 출하검사 부적격에 대한 식별, 부적합품 격리, 조치, 재검사, 기록",
      "evidence": "출하 검사 업무 절차서, Check Sheet., 검사 이력 관리, 부적합 분석 자료, 부적합 관리 절차",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.6"
     }
    ],
    "note": "원문 소계 40.00 — 항목 점수 합(L 기준) 25.00과 불일치(소계 수식 범위 오류 추정, 재계산 필요)"
   },
   {
    "name": "지속적개선",
    "qms": "개선 프로세스 (QMS)",
    "subtotal": 110,
    "items": [
     {
      "no": 15,
      "ref": "3.1",
      "sub": "개선 프로세스",
      "q": "부적합 시정 조치 처리 절차/기준 적합성",
      "criteria": "1) 협력사 / 사내/ 고객 단계 구분 운영 2) 시정 조치 운영 조건 명확 3) 시정 조치 요구서 작성/결재/통보/공유 4) 고객 부적합/이슈 실시간 보고 체계 운영",
      "evidence": "부적합 관리 절차, 시정조치 절차",
      "weight": 1.5,
      "weightText": "150%",
      "clause": "10.2.1"
     },
     {
      "no": 16,
      "ref": "3.1",
      "sub": "개선 프로세스",
      "q": "부적합 대책 수립 및 개선 활동",
      "criteria": "1) 관련 부서 참여한 분석 활동 2) Qc7가지 도구, 8D,5why 등 체계화된 분석 기법 도입/운영 3) 대책 회의체 운영 (분석/대책 타당성 검토 ) 4) 대책 유효성 검증 활동(사후관리,지속이행) 5) 부적합 재발 및 유사 부적합 모니터링 6) 표준 문서 반영 (SOP,Check Sheet 외) 7) 부적합 이력 관리 및 모니터링",
      "evidence": "부적합 관리 대장, NCR, CAR, 회의록, 검토 보고서",
      "weight": 1.5,
      "weightText": "150%",
      "clause": "10.2.1"
     },
     {
      "no": 17,
      "ref": "3.1",
      "sub": "개선 프로세스",
      "q": "부적합 예방 활동",
      "criteria": "1) 횡 확산 개선 활동, 작업 환경 효율적 운영 사례(환경이슈 방지) 불량 사례 전파, 교육 2) 자동화, Jig , 방법 등 FollProof 적용 (효과 검증), 기타 부적합 예방 활동 추진 실적 (효과 검증)",
      "evidence": "개선 보고서, 예방 활동 실적",
      "weight": 1.5,
      "weightText": "150%",
      "clause": "10.3"
     }
    ],
    "note": "원문 소계 110.00 — 항목 점수 합(L 기준) 45.00과 불일치(소계 수식 범위 오류 추정, 재계산 필요)"
   },
   {
    "name": "계측기 현황관리",
    "qms": "검사 업무 프로세스 (QMS)",
    "subtotal": 20,
    "items": [
     {
      "no": 18,
      "ref": "3.1",
      "sub": "검사 업무 프로세스",
      "q": "계측기 관리 기준 적합성",
      "criteria": "1) 계측기 분류 기준 (검교정, 비대상, 유휴, 수리/폐기 등 자체 & Kolas 기준 반영) 2) 유휴 계측기 처리 절차(유휴전혼 결정, 처리,식별,보관/사용 전환 절차) 3) 검교정 주기 설정(자체 &Kolas 기준 적용) 4) 검교정 이력 관리 , 성적서 고나리 5) 계측기 사용 추적 관리(대여, 출장, 교정 반출 등 현황 실시간확인) 6) 계측기 일상 점검 기준(점검 대상 정의) 및 이력 7) 측정 시스템 검증",
      "evidence": "계측기 관리 절차, 계측기 List, 교정이력, 점검 기준서, Check Sheet",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "7.1.5.2"
     },
     {
      "no": 19,
      "ref": "3.2",
      "sub": "검사 업무 프로세스",
      "q": "계측기의 현장 보관 및 관리 상태",
      "criteria": "1) 검교정 누락 계측기 확인, 검교정 계측기 필증 부착 및 유효기간 (도금포함)) 2) 비교정 대상 계측기 미 식별 3) 유휴/불량 계측기 미 식별, 현장 바치, 미 시건",
      "evidence": "현장 확인",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.1.5.2"
     },
     {
      "no": 20,
      "ref": "",
      "sub": "검사 업무 프로세스",
      "q": "Jig/시편 관리 기준 적합성",
      "criteria": "1) Jig/시편 운영 기준 (검정/교정, 식별, 보관 등) 2) 품목별 관리 기준 (용도, 검정주기, Check Point , 검정/교정방법) 3) 검정/교정 이력 관리 , 성적서 관리 4) Jig/ 시편 사용 추적 관리(대여,출장,교정 반출 등 현황 실시간확인) 5) Jig/시편 일상 점검 기준 (점검 대상 정의 )및 이력",
      "evidence": "Jig 관리 절차, Jig 리스트, 검증 이력, 점검 기준서, Check Sheet",
      "weight": null,
      "weightText": "",
      "clause": "7.1.5.1",
      "note": "원문 번호 없음"
     },
     {
      "no": 21,
      "ref": "3.3",
      "sub": "검사 업무 프로세스",
      "q": "Jig/시편의 현장 보관 및 관리 상태",
      "criteria": "1) Jig/시편 식별표 부착 2) 식별표 내 검정 일자, 유효기간 기재 (성적서 대조 확인 ) 3) 외부 환경으로부터 변형, 파손 등 보호 조치",
      "evidence": "현장 확인",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.1.5.2"
     }
    ]
   },
   {
    "name": "협력사 관리",
    "qms": "구매 업무 프로세스 (QMS)",
    "subtotal": 5,
    "items": [
     {
      "no": 22,
      "ref": "4.1",
      "sub": "구매 업무 프로세스",
      "q": "외주 협력사 (인력 도금 포함) 선정 Process 운영",
      "criteria": "1) 신규/이원화 협력사 선정 기준의 명확성 (적용대상, 발굴 목적별 세부운영, 처리 절차, 부서별 역할 및 책임/권한 , 승인 기준, 전결 규정 등 명문화) 2) 협력사 선정 Process 운영 / 준수 3) 제작/부품 승인 절차 운영 4) 협력사 선정 결과 이력 관리",
      "evidence": "협력사 선정, 협력사 관리 절차, 협력사 List, 선정 이력, Qaul 절차 및 이력",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.4.1"
     },
     {
      "no": 23,
      "ref": "4.2",
      "sub": "구매 업무 프로세스",
      "q": "외주 협력사 Proof 관리 (인력 도급 제외)",
      "criteria": "1) 거래 협락사 Pool list 최신 ver보유 2) 발주 품목 별 거래 협력사 List 보유, 발주 부품 별 추적관리가능 3) SSQ 인증사 활용",
      "evidence": "협력사 선정, 협력사 관리 절차, 협력사 List, 선정 이력, Qaul 절차 및 이력",
      "weight": null,
      "weightText": "",
      "clause": "8.4.1"
     },
     {
      "no": 24,
      "ref": "4.2",
      "sub": "구매 업무 프로세스",
      "q": "외주 협력사 품질 관리 (인력 도급 제외)",
      "criteria": "1) 협력사별 품질 지수 Trend 관리 2) 협력사 등급 관리 기준 3) Worst 협력사 대응 (지원/육성/회의체 운영/상시진단 및 개선활동 / Penalty /Fade out 등) 4) 협력사 교육/지원 활동",
      "evidence": "협력사 선정, 협력사 관리 절차, 협력사 List, 평가 결과, 교육 프로그램",
      "weight": null,
      "weightText": "",
      "clause": "8.4.2"
     },
     {
      "no": 25,
      "ref": "4.3",
      "sub": "구매 업무 프로세스",
      "q": "외주 협력사 정기 평가 Process 운영",
      "criteria": "1) 정기 평가 대상 선정 기준의 명확성 2) 정기 평가 Process 운영/준수 3) 결과 Feed Back 및 시정 조치 요구 4) 정기 평가 결과에 대한 후속 관리 운영 (ex 등급별 처우 등)",
      "evidence": "협력사 선정, 협력사 관리 절차, 협력사 List, 정기 평가 계획, 평가 이력, 결과 보고서, Car",
      "weight": null,
      "weightText": "",
      "clause": "8.4.1"
     }
    ]
   },
   {
    "name": "변경점",
    "qms": "구매 업무 프로세스 (QMS)",
    "subtotal": 10,
    "items": [
     {
      "no": 26,
      "ref": "5.1",
      "sub": "구매 업무 프로세스",
      "q": "변경점 관리 Process 보유",
      "criteria": "1) 관리 표준 절차 보유 (10점) 2) 변경 유형 및 변경 등급 정의(내/외부, 고객사 포함) (40점) 3) 각 부서 역할 및 점검 항목의 명문화 (10점) 4) 변경 유형/등급 별 평가 , 검토 , 승인 조건, 공유, 산출물 정의 (40점) 5) 고객 통보 (신고), 고객 승인 절차의 적절성 6) 변경점 식별, 추적 관리 *test 조건, 단계별 적용 계획 포함",
      "evidence": "변경점 관리 절차",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.5.6"
     },
     {
      "no": 27,
      "ref": "5.2",
      "sub": "구매 업무 프로세스",
      "q": "고객으로 부터 접수된 변경점에 대한 내부 관리 절차",
      "criteria": "1) 대응 절차/담당 부서(접수 -> 이관/처리 ->공유/관리) 2) 고객 변경 / 대응 결과 기록 관리 3) 현장 식별 (알림) 및 적용 * 변경내역, 날짜, 사유, 적용설비",
      "evidence": "변경 관리 절차, 실행 이력, 검토 보고서, 승인서",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.2.4"
     },
     {
      "no": 28,
      "ref": "5.3",
      "sub": "구매 업무 프로세스",
      "q": "내부 변경에 대해 규칙에 준한 실행과 관리",
      "criteria": "1) 발의 /검토/승인 단계 별 절차 준수(단계별 산출물 포함 ) * 변경 검토 내용 , 단계별 검토 및 승인, 회의록, 평가결과, 공유등 2) 변경점 실행(현장 식별/알림, 표준문서/양식 반영 및 기록) 3) 추적 관리 (적용 설비 제변, 시점, 변경 내용 & 점검결과 포함) 4) 불량 발생시 처리 절차 * 원복 or 개선품 횡전개 조건",
      "evidence": "변경 관리 절차, 실행 이력, 검토 보고서, 승인서",
      "weight": null,
      "weightText": "",
      "clause": "8.5.6"
     },
     {
      "no": 29,
      "ref": "5.4",
      "sub": "구매 업무 프로세스",
      "q": "협력사 변경에 대해 규칙에 준한 실행과 관리",
      "criteria": "1) 접수/검토/승인 단계별 절차 준수 (단계별 산출물 포함) * 변경 검토 내용 , 단계별 검토 및 승인, 회의록 ,평가결과,공유등 2) 변경점 검증 (부서별 역할에 준한 서류 & 현장 검증, 평가, 승인) 3) 추적 관리 (적용 부품 제변, 시점, 변경내용 & 점검결과 포함 ) 4) 불량 발생시 처리 절차 * 원복 or 개선품 횡전개 조건",
      "evidence": "변경 관리 절차, 실행 이력, 검토 보고서, 승인서",
      "weight": null,
      "weightText": "",
      "clause": "8.4.3"
     },
     {
      "no": 30,
      "ref": "5.5",
      "sub": "구매 업무 프로세스",
      "q": "변경 사항에 대한 최종 고객 승인 실시",
      "criteria": "1) 관리 규칙에 준한 처리 2) 고객 접수 (통보) /검토/승인 등 처리 단계 모니터링 실시 3) 고객 승인 후 현장 적용 시점,PJT 등 추적 관리 모니터링 * 고객 승인 전 적용 적발시 NG",
      "evidence": "변경 관리 절차, 실행 이력, 검토 보고서, 승인서",
      "weight": null,
      "weightText": "",
      "clause": "8.5.6"
     }
    ]
   },
   {
    "name": "현장관리",
    "qms": "생산 관리 프로세스 (QMS)",
    "subtotal": 25,
    "items": [
     {
      "no": 31,
      "ref": "6.1",
      "sub": "생산 관리 프로세스",
      "q": "자재 창고/보관에 대한 관리 기준",
      "criteria": "1) 외부 호나경에 대한 보호 관리 * 햇빛 노출, 먼지 유입등 2) 온습 관리 (온도, 기준제시, 습도 65% 이하) * 기준 제시 : 자재 Maker 별 요구 수준에 준한 관리 필요 3) 사용품/반품/폐기/불용품 등 구역 식별 4) 사용품 주소체계, 적재/식별/보관 기준 관리 5) 선입선출 관리 6) 현장 5s 수준 및 check 기록",
      "evidence": "현장 확인",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.5.4"
     },
     {
      "no": 32,
      "ref": "6.2",
      "sub": "생산 관리 프로세스",
      "q": "수입 검사실 운영 기준",
      "criteria": "1) 별도 공간 보유 2) 현장 5s 3정 수준 및 check 기록 * 정리/정돈, 청소/청결, 먼지, 녹 등",
      "evidence": "현장 확인",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.1.4"
     },
     {
      "no": 33,
      "ref": "6.3",
      "sub": "생산 관리 프로세스",
      "q": "생산 Line 청정 관리",
      "criteria": "1) 스막룸, 생산 Line 청정 상태 확인 (운영기준, Check 기록, 유지관리)",
      "evidence": "현장 확인",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "7.1.4"
     }
    ],
    "note": "원문 소계 25.00 — 항목 점수 합(L 기준) 15.00과 불일치(소계 수식 범위 오류 추정, 재계산 필요)"
   },
   {
    "name": "부적합실적",
    "qms": "개선 프로세스 (QMS)",
    "subtotal": 60,
    "items": [
     {
      "no": 34,
      "ref": "6.5",
      "sub": "개선 프로세스",
      "q": "집계 기간 내 출하 전 부적합 실적 반영 점수",
      "criteria": "1) 부적합 실적 등급 기준에 의거 점수 산출 * 품질 Penalty 이력 있는 경우 등급 별 감정 * Proactive notice 활동 가점 (도면 불합리 제안, 슨들기 활동 등)반영",
      "evidence": "각 모듈 출하전 부적합 대당 건수",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "9.1.3"
     },
     {
      "no": 35,
      "ref": "6.5",
      "sub": "개선 프로세스",
      "q": "집계 기간 내 셋업 부적합 실적 반영 점수",
      "criteria": "1) 부적합 실적 등급 기준에 의거 점수 산출 * 품질 Penalty 이력 있는 경우 등급 별 감정 * Proactive notice 활동 가점 (도면 불합리 제안, 슨들기 활동 등)반영 (원문: 위와 동일)",
      "evidence": "각 모듈 셋업 부적합 대당 건수",
      "weight": null,
      "weightText": "",
      "clause": "9.1.3"
     },
     {
      "no": 36,
      "ref": "6.6",
      "sub": "개선 프로세스",
      "q": "집계 기간 내 고객 믈레임 등급 Lv 별 감점 기준 적용한 반영 점수",
      "criteria": "- Lv1(-5점), 2(-3), 3(-2) , 4이하 (-1)",
      "evidence": "고객클레임 등록 건수",
      "weight": 1.0,
      "weightText": "100%",
      "clause": "9.1.2"
     }
    ],
    "note": "원문 소계 60.00 — 항목 점수 합(L 기준) 20.00과 불일치(소계 수식 범위 오류 추정, 재계산 필요)"
   }
  ]
 }
];
window.SEED.custEval = {
 "id": "SEMES-SSQ",
 "customer": "세메스(SEMES)",
 "title": "SSQ Audit Check Sheet",
 "source": "https://docs.google.com/spreadsheets/d/1ZCXMgKwvZfoAtFzOhjS4mxqAahOhk0yfHHNfDu40zhI/edit",
 "note": "고객사(세메스)가 협력사(MST)를 평가하는 시트(시트에 회사명 머리말은 없고 본문의 \"세메스 검사 요청서\"·\"세메스 배포 기준\"으로 판단). 사본 2개 동일. 원문 오류: 20~45번 \"평가 항목\"(중분류) 칸이 모두 \"변경점 절차에 의한 실행\"으로 복사됨 → 22~45번 sub는 공란 처리. 오탈자 원문 그대로. 내부 체크시트(CK-ISO) 1.1~8.8 ↔ SSQ 1~4, 6~43 대응(SSQ 5·44·45는 내부 시트에 없음). 등급 구간/합격 점수 원문 없음. clause는 ISO 9001:2015 추정 매핑.",
 "scoring": "항목별 배점(1~4점) 안에서 평가 기준의 단계 점수를 선택. 만점 100점(43개 채점 항목, 계산값; 시트에 합계 셀 없음). 감점형(28번 위반 1건당 0.5 감점), 가산형(27번 5S 항목당 0.2, 35번 1+0.5×4), 비율 적용(19번 일정 미도래 50%, 35번 전용 검사실 없으면 50%) 규칙 혼재. 연쇄: 18·19번은 10·16번(검사 실적 미관리) 시 0점, 38·39번은 1ea 교정 누락 시 0점. 과락: 44(보안)·45(사업자등록증) 중 하나라도 해당하면 총점과 무관하게 과락. 등급(A/B/C) 기준 원문 없음.",
 "sections": [
  {
   "name": "1. 품질운영",
   "items": [
    {
     "no": 1,
     "ref": "1-1",
     "sub": "품질 실적 관리",
     "q": "수입검사 ,공정 검사, 출하 검사, 시장 품질 등 목표 대비 실적이 관리 되며 보고 되고 있는가? (주(월)간 품질회의 보고서)",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "검사 지표 관리 중이며 경영자 (책임자) 주관 품질회의 진행시"
      },
      {
       "score": 1,
       "text": "검사 지표만 관리, 경영(책임)자 주관 품질회의 미 진행 or 누락"
      },
      {
       "score": 0,
       "text": "주(월)간 보고서 작성 안됨, 검사 Raw Data 없을 시"
      },
      {
       "score": 0,
       "text": "* 회의록, 결재 문서 없을 시 품질 회의 미 진행으로 처리"
      }
     ],
     "evidence": "주(월)간 품질회의 보고서, 검사 실적 및 집계표",
     "knockout": false,
     "clause": "9.1.3",
     "basis": "월별 검사 지표 확인"
    },
    {
     "no": 2,
     "ref": "1-2",
     "sub": "조직 및 인적 자원 관리",
     "q": "품질 관리 부서의 독립성 및 업무 분장은 되어 있는가",
     "points": 1,
     "criteria": [
      {
       "score": 1,
       "text": "조직도 및 업무적으로 분리 되어 있으면"
      },
      {
       "score": 0.5,
       "text": "조직도 및 업무저그올(원문) 분리 안 되어 있으면"
      },
      {
       "score": 0,
       "text": "품질 관리 부서 없음"
      }
     ],
     "evidence": "조직도",
     "knockout": false,
     "clause": "5.3",
     "basis": "조직도 확인 (독립성 (대표이사 직속 또는 사업주장 직속: 제조/설계 하위 부서 아닐 것)",
     "notes": [
      "* 품질 외 중복 업무 분리되어 있을 것 (생산 현황에 따라 가변 업무 없을 것)"
     ]
    },
    {
     "no": 3,
     "ref": "1-3",
     "sub": "조직 및 인적 자원 관리",
     "q": "품질 부서 인원은 전 품목에 대한 전수 검사 업무 수행에 충분한가 (현 보유인력으로 전수검사가 가능해야 함. 단, 정확한 근거와 기준을 갖고 Smaple 검사를 할 경우 인정, 기준 미흡상태에서 인원 부족에 따른 Sample 검사를 할 경우 검사 인원 부족 및 전수 검사 미실시 판단)",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "수입, 공정, 출하검사 단계별 업무. 분장. 되어. 견제의 기능이 있다."
      },
      {
       "score": 1,
       "text": "수입, 공정, 출하검사 단계 중 2단계 업무 분장 중복 되어 견제 기능이 부족 하다"
      },
      {
       "score": 0,
       "text": "수입, 공정, 출하검사 단계 중 모든 업무 분장 중복 되어 견제 기능이 불가 하다"
      }
     ],
     "evidence": "조직도, 업무분장표",
     "knockout": false,
     "clause": "7.1.2",
     "notes": [
      "* 공정 검사는 업체, 품질 Process 에 따라 제조에서 진행 해도 무관함."
     ]
    },
    {
     "no": 4,
     "ref": "1-4",
     "sub": "조직 및 인적 자원 관리",
     "q": "검사 인력 자격인증 기준이 있으며, 주기적 운영되고 있는가 (외주 인력 포함)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "기준이 명확하며, 평가 이력 관리, 100% 인증"
      },
      {
       "score": 2,
       "text": "기준이 미흡하거나 이력 관리 누락"
      },
      {
       "score": 1,
       "text": "기준 없이 인증만 실시"
      },
      {
       "score": 0,
       "text": "자격 인증 사항 없음"
      }
     ],
     "evidence": "검사원 인증 기준서, 인증서, 평가 이력",
     "knockout": false,
     "clause": "7.2",
     "notes": [
      "* 기준은 자격요건, 교육시간, 평가방법, 합격수준, 불합격에 대한 사후 관리, 갱신에 대한 내용이 언급되어 있어야 하며 평가는 이론/실기가 병행 되어야 한다."
     ]
    },
    {
     "no": 5,
     "ref": "1-5",
     "sub": "조직 및 인적 자원 관리",
     "q": "작업 인력 자격인증 기준이 있으며, 주기적 운영 되고 있는가 (외주 인력 포함)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "기준이 명확하며, 평가 이력 관리, 100% 인증"
      },
      {
       "score": 2,
       "text": "기준이 미흡하거나 이력 관리 누락"
      },
      {
       "score": 1,
       "text": "기준 없이 인증만 실시"
      },
      {
       "score": 0,
       "text": "자격 인증 사항 없음"
      }
     ],
     "evidence": "작업자 인증 기준서, 인증서, 평가 이력",
     "knockout": false,
     "clause": "7.2",
     "basis": "(원문: 4번과 동일)",
     "notes": [
      "* 기준은 자격요건, 교육시간, 평가방법, 합격수준, 불합격에 대한 사후 관리, 갱신에 대한 내용이 언급되어 있어야 하며 평가는 이론/실기가 병행 되어야 한다."
     ]
    }
   ],
   "subtotal": 11
  },
  {
   "name": "2. 검사관리",
   "items": [
    {
     "no": 6,
     "ref": "2-1",
     "sub": "수입검사",
     "q": "수입 검사 규정 (최신본 개정 여부) 및 절차를 보유 하고 있는가 * 규정/절차 : Sampling 방법 /판정개수/수입검사 전후 및 합격불합격 식별/수입검사 Area의 환경관리, 수입검사 대상, 비대상 구분 및 기준서대로 진행되는가",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "수입검사 규정 (개정/년) 및 절차 보유"
      },
      {
       "score": 1.5,
       "text": "수입검사 규정 및 절차 보유하고 잇으나 명확하지 않음"
      },
      {
       "score": 0,
       "text": "규정,기준 미 보유"
      }
     ],
     "evidence": "수입검사 표준서",
     "knockout": false,
     "clause": "8.4.2",
     "notes": [
      "* 규정/절차 : 샘플링 방법/판정기준/수입검사 전후 및 합격,불합격 식별/수입검사 Area의 환경 관리, 수입검사 대상 비대상 구분 및 기준서대로 진행 되는가"
     ]
    },
    {
     "no": 7,
     "ref": "2-2",
     "sub": "수입검사",
     "q": "핵심 (중요) 품목이 지정되어 있으며 품목 (유형)별로 수입검사 기준(표준)을 별도 보유 하고 있는가",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "핵심 품목 지정 되어 있으며 검사 기준서 100% 보유"
      },
      {
       "score": 2,
       "text": "핵심 품목 지정 되어 있으며 검사 기준서 누락 있음"
      },
      {
       "score": 1,
       "text": "핵심 품목 list 만 보유"
      },
      {
       "score": 0,
       "text": "핵심 품목 list 미 보유"
      }
     ],
     "evidence": "수입검사 표준서",
     "knockout": false,
     "clause": "8.4.2",
     "notes": [
      "* 핵심 품목에 대한 검사 기준서는 공통된 검사 방식이 아닌 특별관리 차원에서의 관리가 필요하다. 기준이라 함은 검사 방법, 계측기/Jig 사용 방법, 기록 관리 등 구체화 되어 있어야 한다."
     ]
    },
    {
     "no": 8,
     "ref": "2-3",
     "sub": "수입검사",
     "q": "수입검사 기준에 따른 검사가 실시 되었는가 검사 수량 및 판정결과가 검사기준을 만족하는가 (검사 완료품 Sample 3개 이상 Check)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "만족"
      },
      {
       "score": 1.5,
       "text": "Sample 1ea 미흡시"
      },
      {
       "score": 0,
       "text": "1개 초과 불만족"
      }
     ],
     "evidence": "수입검사 이력, 성적서, 기준서",
     "knockout": false,
     "clause": "8.6",
     "basis": "검사 완료된 자체 검사 성적서 확인",
     "notes": [
      "* 항목/기준/결과 확인 (검사성적서 발행), 2/3차 협력사 성적서 불인정"
     ]
    },
    {
     "no": 9,
     "ref": "2-4",
     "sub": "수입검사",
     "q": "수입검사 품목에 해당하는 2차 협력사 성적서 관리는 하고 있는가",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "수입검사 대상 품목 외 (부품,사입품 등) 품목에 해당하는 성적서 보유"
      },
      {
       "score": 1,
       "text": "수입검사 대상 품목만 보유시"
      },
      {
       "score": 0,
       "text": "관리 무"
      }
     ],
     "evidence": "검사 성적서 이력대장",
     "knockout": false,
     "clause": "8.4.2"
    },
    {
     "no": 10,
     "ref": "2-5",
     "sub": "수입검사",
     "q": "수입검사 결과에 대한 실적(현황) 관리 하고 있는가 ( 실적 : Raw Data , 불량 내용 포함)",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "전산 , Excel Daily 등록 관리"
      },
      {
       "score": 1,
       "text": "부적합 List , 검사 성적서만 보유시"
      },
      {
       "score": 0,
       "text": "관리 무"
      }
     ],
     "evidence": "검사 결과 집계표",
     "knockout": false,
     "clause": "9.1.3"
    },
    {
     "no": 11,
     "ref": "2-6",
     "sub": "조립 검사",
     "q": "최신 Ver의 SOP (조립표준서, 조립도면, Check Sheet)를 보유 하고 있는가. (이력대장 포함 된 최신 SOP 관리)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "이력 대장 및 SOP가 Match 되어 관리 되고 있다"
      },
      {
       "score": 1.5,
       "text": "이력 대장 없이 SOP 만 보유 하고 있다"
      },
      {
       "score": 0,
       "text": "1년 이상 개정이 누락 되어 있다"
      }
     ],
     "evidence": "최신 SOP, 이력 대장",
     "knockout": false,
     "clause": "7.5.3"
    },
    {
     "no": 12,
     "ref": "2-7",
     "sub": "조립 검사",
     "q": "단계 검사 Check Sheet (or 협력사 자체 C/S)에 따라 검사가 실시 되고 있는가 (실 작업자 Check 여부, 작업 동시 Check 여부 확인)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "운영 상태 준수"
      },
      {
       "score": 2,
       "text": "운영 상태 미흡 (실 작업자 기록은 맞으나, 1건 기록 누락시)"
      },
      {
       "score": 1,
       "text": "운영 상태 미흡 (실 작업자 기록은 맞으나, 2건 이상 기록 누락시)"
      },
      {
       "score": 0,
       "text": "운영 상태 미흡 (허위기록)"
      }
     ],
     "evidence": "현장 확인",
     "knockout": false,
     "clause": "8.5.1",
     "basis": "* 현장 Sample 설비 2~3대 확인시",
     "notes": [
      "* 운영 미흡, 실 작업자 외 작업자 이름 표기 작업 완료 후 Check 행위"
     ]
    },
    {
     "no": 13,
     "ref": "2-8",
     "sub": "조립 검사",
     "q": "SOP (조립표준서, 조립도면, Check Sheet) 는 현장에 작업자가 쉽게 열람할 수 있도록 해당 공정에 비치 되어 있는가",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "최신본 관리 유, 현장 공정별 (or 장비별) 비치 하고 있음"
      },
      {
       "score": 1,
       "text": "최신본 관리 유, 현장 공정별 (or 장비별) 일부 비치 하고 있음"
      },
      {
       "score": 0,
       "text": "현장 공정별 (장비 앞) 미 비치"
      }
     ],
     "evidence": "현장 확인",
     "knockout": false,
     "clause": "7.5.3",
     "notes": [
      "* 최신본 관리여부 확인 (line 으로 배포일, 배포근거 확인)",
      "* SOP ver 이력 대장 없을 경우 최신본 없는 것으로 간주"
     ]
    },
    {
     "no": 14,
     "ref": "2-9",
     "sub": "출하 검사",
     "q": "자체 출하 검사 절차 (Process)가 수립되어 있는가 (출하 조건 별 관리 행위에 대한 내용 필수 내포되어야 함)",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "출하 검사 Process 수립"
      },
      {
       "score": 1,
       "text": "출하 검사 Process 수립 : (시점, 항목, 합/불) 1가지 항목 누락시"
      },
      {
       "score": 0,
       "text": "출하 검사 Process 미수립"
      }
     ],
     "evidence": "출하 검사 성적서",
     "knockout": false,
     "clause": "8.6",
     "notes": [
      "* 출하 조건 별 관리 행위에 대한 내용 내포 필수"
     ]
    },
    {
     "no": 15,
     "ref": "2-10",
     "sub": "출하 검사",
     "q": "출하 검사 기준 (절차)에 맞는 출하 조건 결재 행위가 실시되고 있는가",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "출하 검사 완료 후 결재"
      },
      {
       "score": 1.5,
       "text": "출하 검사 완료 후 결재 누락 발생시"
      },
      {
       "score": 0,
       "text": "출하검사 완료 후 미결재"
      }
     ],
     "evidence": "단계 검사 Check sheet",
     "knockout": false,
     "clause": "8.6",
     "basis": "출하 검사에 대한 자체 결재 실행 및 단계 검사 Check Sheet 운영 상태 확인",
     "notes": [
      "* 출하 검사 성적서 결재 메일, 세메스 검사 요청서 등"
     ]
    },
    {
     "no": 16,
     "ref": "2-11",
     "sub": "출하 검사",
     "q": "출하 검사 결과에 대한 실적 (현황) 관리 하고 있는가 (실적 : Raw data , 불량 내용 포함)",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "전산 , Excel Daliy 등록 관리"
      },
      {
       "score": 1,
       "text": "부적합 List , 검사 성적서만 보유시"
      },
      {
       "score": 0,
       "text": "미관리"
      }
     ],
     "evidence": "검사결과 집계표",
     "knockout": false,
     "clause": "9.1.3",
     "notes": [
      "* 집계표에는 필수 내포항목 : 품명, PJT Code, 검사항목 수, 불량수, 합/불 판정 등. 불량 내용의 경우 불량 부품 List 에 별도 관리하고 있을 경우 인정"
     ]
    }
   ],
   "subtotal": 28
  },
  {
   "name": "3. 부적합 관리",
   "items": [
    {
     "no": 17,
     "ref": "3-1",
     "sub": "부적합 절차",
     "q": "수입, 공장, 출하, 시장 불량에 대한 부적합 처리 절차가 있는가 (부적합 기준/부적합 발행 및 통보/원인분석/시정조치/처리/승인/사후관리/부적합의 식별/격리보관/평가/보고/수리 및 재검사)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "검사 단계 별 절차를 보유 하고 있으며 관리 항목이 명확하게 기술 되어 있음"
      },
      {
       "score": 1.5,
       "text": "검사 단계 별 절차를 1건 이하 보유 하고 있지 않거나 관리항목이 불명확함"
      },
      {
       "score": 0,
       "text": "절차 및 기준을 보유하고 있지 않음"
      }
     ],
     "evidence": "부적합 처리 절차서",
     "knockout": false,
     "clause": "8.7"
    },
    {
     "no": 18,
     "ref": "3-2",
     "sub": "시정조치 관리",
     "q": "내부 (외주포함) 부적합 대책 요청 및 대책 입수가 되고 있는가 (원인 분석, 재발방지 대책)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "100% 발행 및 입수"
      },
      {
       "score": 1.5,
       "text": "대책 누락 있음"
      },
      {
       "score": 0,
       "text": "시정 요구, 대책수립 없음"
      }
     ],
     "evidence": "부적합 대책서, 검사 실적",
     "knockout": false,
     "clause": "10.2.1",
     "notes": [
      "* 검사 실적(현황) 미 관리시 0점 -> 불량 현황 파악 안됨",
      "* 이력관리 대장 내 통보 일자 , 대책접수일자, 대책발표, 유효성 평가 일장에 대한 내용 포함 필수",
      "* 통보서 발행 대책서 접수 유효성 확인란이 포함"
     ]
    },
    {
     "no": 19,
     "ref": "3-3",
     "sub": "개선활동 및 유효성 평가",
     "q": "내부 (외주포함) 부적합의 개선 대책에 대한 유효성 (사후관리) 평가는 실시 하고 있는가",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "대책 수립 유효성 평가 100% 실시"
      },
      {
       "score": 1.5,
       "text": "유효성 평가 누락 있음"
      },
      {
       "score": 0,
       "text": "유효성 평가 이력 없음"
      }
     ],
     "evidence": "완료보고 (품의)",
     "knockout": false,
     "clause": "10.2.1",
     "notes": [
      "* 검사 실적 (현황) 미 관리 시 0점 -> 불량 현황 파악 안됨",
      "* 계획 비 일정이 도래하지 않았을 경우 50% 적용"
     ]
    }
   ],
   "subtotal": 9
  },
  {
   "name": "4. 변경점관리",
   "items": [
    {
     "no": 20,
     "ref": "4-1",
     "sub": "변경점 절차에 의한 실행",
     "q": "변경점 처리 기준을 보유 하고 있는가 ? * 변경점 운영 범위 : 고객, 자체 (설계, 생산), 협력사",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "변경점 고나리(원문) 절차와 관리 기준이 수립되어 있음"
      },
      {
       "score": 1.5,
       "text": "변경점 관리 절차는 수립되어 있으나 관리 기준이 부족함"
      },
      {
       "score": 1,
       "text": "변경점 관리 절차는 수립되어 있으나 관리 기준이 수립되지 않음"
      },
      {
       "score": 0,
       "text": "변경점 과닐(원문) 절차 및 관리 기준 없음"
      }
     ],
     "evidence": "변경점 누적관리 대장",
     "knockout": false,
     "clause": "8.5.6"
    },
    {
     "no": 21,
     "ref": "4-2",
     "sub": "변경점 절차에 의한 실행",
     "q": "변경점 관리를 실시 하고 있는가 ?",
     "points": 4,
     "criteria": [
      {
       "score": 4,
       "text": "변경점 Risk 검토를 실시하며, 승인 후 현장에 적용 되고 있음"
      },
      {
       "score": 2,
       "text": "변경점 Risk 검토를 실시하나, 승인 되지 않은채 적용 되고 있음"
      },
      {
       "score": 0,
       "text": "변경점 Risk 검토 되지 않거나 변경점 관리 사항 없음"
      }
     ],
     "evidence": "Check Sheet, 이력 대장",
     "knockout": false,
     "clause": "8.5.6"
    }
   ],
   "subtotal": 6
  },
  {
   "name": "5. 협력사 관리",
   "items": [
    {
     "no": 22,
     "ref": "5-1",
     "sub": "",
     "q": "협력사 평가 기준을 보유하고 있는가",
     "points": 1,
     "criteria": [
      {
       "score": 1,
       "text": "보유"
      },
      {
       "score": 0.5,
       "text": "보유하고 있으나 미흡(부족)"
      },
      {
       "score": 0,
       "text": "미보휴(원문)"
      }
     ],
     "evidence": "기준서",
     "knockout": false,
     "clause": "8.4.1",
     "basis": "평가 기준 보유여부 확인 (평가 대상, 주기, 거래유지 등 내용 내포 되어야 함)"
    },
    {
     "no": 23,
     "ref": "5-2",
     "sub": "",
     "q": "협력사 평가 기준대로 시행하고 있는가",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "기준대로 시행 되고 있음"
      },
      {
       "score": 1.5,
       "text": "미흡시(형식적 운영, 결재누락등)"
      },
      {
       "score": 0,
       "text": "협력사 평가 없음"
      }
     ],
     "evidence": "기준서, 평가 결과 보고서",
     "knockout": false,
     "clause": "8.4.1",
     "basis": "평가 시행 여부 확인 (품질 부분)"
    },
    {
     "no": 24,
     "ref": "5-3",
     "sub": "",
     "q": "평가 결과에 대한 사후관리가 실시되고 있는가 (지적사항 개선 대책서 입수 및 이행 점검 결과)",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "개선 대책서 입수 및 이행 상태 확인"
      },
      {
       "score": 1,
       "text": "개선 대책서만 입수"
      },
      {
       "score": 0,
       "text": "개선 대책서 미관리"
      }
     ],
     "evidence": "개선 대책서, 이행상태 점검 결과서",
     "knockout": false,
     "clause": "8.4.2",
     "notes": [
      "* 기준에 준한 이행 상태 확인 여부 점검 (재평가, 개선완료 문서 접수 등)"
     ]
    }
   ],
   "subtotal": 6
  },
  {
   "name": "6. 자재 관리",
   "items": [
    {
     "no": 25,
     "ref": "6-1",
     "sub": "",
     "q": "제품 (자재) 창고 보관 구역 표시는 되어 있는가 ( 부품 현장 투입 Process 시 _ 현장 내 선반 또는 지정된 장소에 보관 되어 있는가 )",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "창고 보유 (Lay-out 표시)"
      },
      {
       "score": 1,
       "text": "창고를 보유하고 있지는 않지만 창고 기능 수행 가능 구역 보유"
      },
      {
       "score": 0,
       "text": "창고 미보유 (보관구역 미 표시)"
      }
     ],
     "evidence": "팻말",
     "knockout": false,
     "clause": "8.5.4"
    },
    {
     "no": 26,
     "ref": "6-2",
     "sub": "",
     "q": "자재 창고 환경 관리 기준 보유 및 주기적인 관리가 되고 있는가 (온도, 습도, 직사광선, 먼지 유입 등 )(부품 현장 투입 Process 시_자재 보관시 환경기준은 준수되고 있는가)",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "기준대로 관리되고 있음"
      },
      {
       "score": 1,
       "text": "기준만 보유 or 관리 (온/습도/직사광선/먼지유입 중 일부만 관리됨) 만 실시"
      },
      {
       "score": 0,
       "text": "관리 안됨"
      }
     ],
     "evidence": "창고 관리 기준서, Check Sheet",
     "knockout": false,
     "clause": "8.5.4"
    },
    {
     "no": 27,
     "ref": "6-3",
     "sub": "",
     "q": "창고 5S 상태 확인 및 정기적 점검은 실시 하고 있는가 (부품 현장 투입시 Process 시 _ 현장 내 자재 보관시 5S 점검은 실시하고 있는가)",
     "points": 2,
     "criteria": "5S 1항목 당 0.2점 부여 * 정리 (보관 외 물품이 없을 것) / 정돈 (미관상 양호) / 청소 (청소 상태, 주기) / 청결 (바닥 외 보관 box, 선반, 자재 오염 여부 확인) / 습관화 (Check Sheet 운용)",
     "evidence": "Check Sheet",
     "knockout": false,
     "clause": "7.1.4",
     "notes": [
      "[주] 5항목 × 0.2 = 1.0으로 배점 2와 맞지 않음(원문 그대로)"
     ]
    },
    {
     "no": 28,
     "ref": "6-4",
     "sub": "",
     "q": "기준에 위배된 혼적 , 역적은 없는가 * 적재 단수 (안전, 변형), 혼적(분실, 재고관리 문제), 역적(파손 소지) (부품 현장 투입 Process 시 _ 현장 내 자재 보관을 준수 하고 있는가)",
     "points": 2,
     "criteria": "적재 단수 준수 (안전, 변형), 혼적(분실, 재고관리 문제), 역적(파손 소지) 각각 : 0.5 감점",
     "evidence": "현장 확인",
     "knockout": false,
     "clause": "8.5.4"
    },
    {
     "no": 29,
     "ref": "6-5",
     "sub": "",
     "q": "자재에 대한 식별 (선반, 박스별, 자재 라벨 등) 양품으로 구분은 되는가 (부품 현장 투입 Process 시 _ 자재 식별은 되고 있는가)",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "식별 되고 있음"
      },
      {
       "score": 1,
       "text": "일부 미흡"
      },
      {
       "score": 0,
       "text": "관리 안됨"
      }
     ],
     "evidence": "현장 확인",
     "knockout": false,
     "clause": "8.5.2",
     "notes": [
      "* 품명, 입고일, 수량 기재 (ERP No.로 관리해도 무관)"
     ]
    },
    {
     "no": 30,
     "ref": "6-6",
     "sub": "",
     "q": "불량자재는 일반 자재창고 보관시 양품과 구분되는가 (부품 현장 투입 Process 시 _ 현장 내 양품과 구분되는가)",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "별도 구역이 있으며 구부노디어(원문) 관리됨"
      },
      {
       "score": 1,
       "text": "별도 구역이 없는 상태에서 식별되어 관리 됨"
      },
      {
       "score": 0,
       "text": "구분 안될시"
      }
     ],
     "evidence": "현장 확인",
     "knockout": false,
     "clause": "8.7.1",
     "notes": [
      "* 창고에 불량 자재 관리 상태 확인"
     ]
    }
   ],
   "subtotal": 12
  },
  {
   "name": "7. Infra 관리 (환경 관리)",
   "items": [
    {
     "no": 31,
     "ref": "7-1",
     "sub": "",
     "q": "클린룸 (준 크린룸 포함) 관리 기준 보유 및 기준대로 관리되고 있는가 * 정리 (보관 외 물품이 없을 것) / 정돈 (미관상 양호) / 청소 (청소 상태, 주기) / 청결 (바닥 외 보관 box, 선반, 자재 오염 여부 확인) / 습관화 (Check Sheet 운용)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "기준대로 실시"
      },
      {
       "score": 2,
       "text": "형식적 (권고수준) 운영"
      },
      {
       "score": 1,
       "text": "지적 2건 이하"
      },
      {
       "score": 0,
       "text": "지적 3건 이상 및 기준 없음 (Check Sheet 미 운영시)"
      }
     ],
     "evidence": "기준서, Chehck Sheet",
     "knockout": false,
     "clause": "7.1.4",
     "basis": "클린룸 관리 기준 및 관리 현황 확인",
     "notes": [
      "* 관리 Class , 환경관리 기준, 일일 Check Sheet 운영 상태 확인 및 5S 관리 상태",
      "* 클린룸 미 적용 업태의 경우 5S 관리기준으로 대체"
     ]
    },
    {
     "no": 32,
     "ref": "7-2",
     "sub": "",
     "q": "현장 Particle Spec 관리는 준수 되고 있는가",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "매월 (분기별) Spec in"
      },
      {
       "score": 1.5,
       "text": "월 1회 이상 Spec out 및 기록 누락 일 경우"
      },
      {
       "score": 0,
       "text": "미관리"
      }
     ],
     "evidence": "관리대장",
     "knockout": false,
     "clause": "7.1.4",
     "basis": "* 내부 기준에 ㅈ준함(원문)",
     "notes": [
      "* 클린룸 미 적용 업태의 경우 5s 중 청결 상태로 대체"
     ]
    },
    {
     "no": 33,
     "ref": "7-3",
     "sub": "",
     "q": "클린복, 신발, 모자, 장갑 관리는 양호 한가",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "청결"
      },
      {
       "score": 1,
       "text": "일부 미흡시"
      },
      {
       "score": 0,
       "text": "미청결 (세탁상태 확인), 미흡 기준 : 찢어짐, 얼룩 발생"
      }
     ],
     "evidence": "Check Sheet",
     "knockout": false,
     "clause": "7.1.4",
     "notes": [
      "* 클린룸 미 적용 업태의 경우 복장 상태 점검 (실내/실외화, 장갑 등)"
     ]
    },
    {
     "no": 34,
     "ref": "7-4",
     "sub": "",
     "q": "Air Utility Spec 합격 관리 및 관리 대장이 운영 되고 있는가 (관리대장 : 소모품 교체, 필터 교체 주기 등)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "소모품 & 필터 교체 주기 관리되고 있음"
      },
      {
       "score": 1.5,
       "text": "관리 미흡"
      },
      {
       "score": 0,
       "text": "미관리"
      }
     ],
     "evidence": "관리대장",
     "knockout": false,
     "clause": "7.1.3",
     "notes": [
      "* 세메스 배포 기준 숙지 상태 확인 Air system 실 소모품 교체 주기 확인 (교체스티커)"
     ]
    },
    {
     "no": 35,
     "ref": "7-5",
     "sub": "",
     "q": "수입검사실은 별도 공간으로 마련되어 있는가 / 검사실 5S (청정) 상태는 양호한가 / 전담 수입검사자는 배치되어 있는가 / 항온, 항습 관리 (실온 20도 +- 2도 , 습도 65% 이하)가 되고 있는가 / 검사품목 (대기, 합격, 불합격)의 구분은 되고 있는가",
     "points": 3,
     "criteria": "별도 수입 검사실 보유 (석정반, 계측기 보유) 보유 : 1 / 미보유 : 0 | 검사실 청결도 확인 (면장갑이용, 5S 상태) 양호 : 0.5 / 불량 : 0 | (전담 검사자) 배치 : 0.5 / 미배치 : 0 | (항온·항습) 관리 : 0.5 / 미관리 : 0 | 구역 (검사대기 ,합격, 불합격) 구분 : 0.5 / 미구분 : 0",
     "evidence": "현장 확인, 온/습도 관리 Sheet",
     "knockout": false,
     "clause": "7.1.4",
     "basis": "Lay out / 장소 확인 (세부 합산)",
     "notes": [
      "* 전용 수입검사실 없으나 협력사 환경에 맞게 검사실 운영시 50% 반영"
     ]
    }
   ],
   "subtotal": 14
  },
  {
   "name": "8. 계측기/Jig 관리",
   "items": [
    {
     "no": 36,
     "ref": "8-1",
     "sub": "",
     "q": "검사에 필요한 계측기 /Jig는 확보 되어 있는가 (피 측정물의 재질, 형상, 정도, Size 및 도면 내 요구사항 검증)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "치수, 외관 100% 보증"
      },
      {
       "score": 1.5,
       "text": "치수, 외관 포함 일부 미 보증"
      },
      {
       "score": 0,
       "text": "50% 이상 미 보증"
      }
     ],
     "evidence": "계측기 / Jig list, 현장 확인",
     "knockout": false,
     "clause": "7.1.5.1",
     "notes": [
      "* 계측기 소손으로 수리 대기의 경우 1.5점 처리",
      "* 검사 jig : 소재, 후처리 Master Jig 등. 3차원, 경도, 표면 저항, 정전기, 조도 등 특수 측정 : 협려사(원문) 성적서 확인 시 인정. 기타 계측기 선정 원칙에 준함. 측정기의 정도는 피 측정물 허용 공차의 1/10 보다 높은 측정기를 선택 필. 줄자, 스틸자 사용의 경우 피 측정물 size 600mm(일반공차) 이상 제품 시 허용"
     ]
    },
    {
     "no": 37,
     "ref": "8-2",
     "sub": "",
     "q": "계측기 관리 기준을 보유 하고 있는가 * 사외, 사내 교정, 비교정, 유휴, 운휴 계측기 관리 방법 및 식별에 대한 내용 내포 필 (9001 요건 내 내용 내포 안되어 있을 경우 미 보유 , 단 100% 사외 교정 실시 하고 있으며 비교정, 유휴 없을 경우 ISO9001 요건 인정)",
     "points": 1,
     "criteria": [
      {
       "score": 1,
       "text": "보유 하고 있음"
      },
      {
       "score": 0.5,
       "text": "일부 미흡"
      },
      {
       "score": 0,
       "text": "미보유"
      }
     ],
     "evidence": "기준서",
     "knockout": false,
     "clause": "7.1.5.2",
     "notes": [
      "* 사외 교정 , 사내 교정, 비교정, 유휴, 운휴 계측기 관리 방법 및 식별에 대한 내용 내포 필 , 9001 요건 내 내용 내포 안되어 있을 경우 미보유"
     ]
    },
    {
     "no": 38,
     "ref": "8-3",
     "sub": "",
     "q": "계측기 List에 의한 현황 관리가 최신 Ver으로 관리 되고 있는가 (품명, 기기번호, 구입일, 교정주기, 최근 교정 이력, 차기 교정예정일)",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "4항목 만족 시"
      },
      {
       "score": 1.5,
       "text": "일부 누락"
      },
      {
       "score": 0,
       "text": "미관리"
      }
     ],
     "evidence": "관리 List",
     "knockout": false,
     "clause": "7.1.5.2",
     "notes": [
      "* 1ea 교정 누락시 0점 처리",
      "* 사내 모든 계측기 (비교정품 포함)에 대한 List 가 기록 되어 있어야 함",
      "* 4항목 (기기번호, 교정 주기, 최근교정일자, 차기교정일)"
     ]
    },
    {
     "no": 39,
     "ref": "8-4",
     "sub": "",
     "q": "교정을 실시 하고 있으며 성적서가 관리되고 있는가 (최근 1년, 전산관리 허용)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "100% 보유"
      },
      {
       "score": 1.5,
       "text": "일부 미보유"
      },
      {
       "score": 0,
       "text": "미보유"
      }
     ],
     "evidence": "성적서, 전산",
     "knockout": false,
     "clause": "7.1.5.2",
     "notes": [
      "* 1ea 교정 누락시 0점 처리",
      "* List & 성적서와 일치 할 것 (sample 5 개 이상 실물 확인), 자체 검교정 인정 (교정 성적서, 필증 필 - 기준 내 내용 없을 경우 인정 불가)"
     ]
    },
    {
     "no": 40,
     "ref": "8-5",
     "sub": "",
     "q": "교정, 유휴, 비교정, 불량 계측기의 Line 식별 여부 (검교정 필증, 식별스티커 부착)",
     "points": 1,
     "criteria": [
      {
       "score": 1,
       "text": "식별 되고 있음"
      },
      {
       "score": 0.5,
       "text": "일부 미흡"
      },
      {
       "score": 0,
       "text": "관리 안됨"
      }
     ],
     "evidence": "현장 확인",
     "knockout": false,
     "clause": "7.1.5.2",
     "notes": [
      "* 식별 미부착 시 0점 처리"
     ]
    },
    {
     "no": 41,
     "ref": "8-6",
     "sub": "",
     "q": "Jig 및 공용 Tool List가 있는가",
     "points": 1,
     "criteria": [
      {
       "score": 1,
       "text": "있음"
      },
      {
       "score": 0.5,
       "text": "관리되고 있으나 개선 필요"
      },
      {
       "score": 0,
       "text": "없음"
      }
     ],
     "evidence": "현장 확인",
     "knockout": false,
     "clause": "7.1.5.1",
     "notes": [
      "* 공용 Tool 보관함에 List 가 부착되어 있고, List와 보관함 내 물품이 일치 할 것"
     ]
    },
    {
     "no": 42,
     "ref": "8-7",
     "sub": "",
     "q": "Jig 및 공용 Tool은 전용 보관 장소에 식별되어 보관 되어 있는가",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "있음"
      },
      {
       "score": 0,
       "text": "없음"
      }
     ],
     "evidence": "현장 확인",
     "knockout": false,
     "clause": "7.1.5.2",
     "notes": [
      "* 현장 방치 여부 확인",
      "* 공용 Tool 보관함에 정위치 명판 부착 여부 확인"
     ]
    },
    {
     "no": 43,
     "ref": "8-8",
     "sub": "",
     "q": "주기적으로 점검을 실시 하는가 (Check Sheet)",
     "points": 1,
     "criteria": [
      {
       "score": 1,
       "text": "실시"
      },
      {
       "score": 0,
       "text": "미실시"
      }
     ],
     "evidence": "현장 확인",
     "knockout": false,
     "clause": "7.1.5.1",
     "notes": [
      "* 점검 이력 확인",
      "* 공용 Tool 관리 대장 확인 (전체 수량 확인, 보유 수량 확인, 파손 여부 확인 등)"
     ]
    }
   ],
   "subtotal": 14
  },
  {
   "name": "9. 보안 (과락 항목)",
   "items": [
    {
     "no": 44,
     "ref": "9-1",
     "sub": "",
     "q": "도면이 현장에 방치 되어 있거나 성적서로 활용 되고 있는가",
     "points": null,
     "criteria": "도면 방치 확인 시 과락 / 도면 성적서 활용 확인 시 과락",
     "evidence": "현장 확인",
     "knockout": true,
     "clause": "8.5.3",
     "notes": [
      "* 현장 방치 : 현재 생산중인 제품과 관련 없는 도면이 현장에 있으면 안됨 (작업 현장, 검사실, 자재창고 등)",
      "* 도면 성적서 : 검사 결과를 도면에 기록해서는 안됨 - 납품 대기 제품에 동봉 포장 되어 있거나 활용되면 안됨",
      "* 당사 거래 이력이 없는 신규사는 현장에서 가이드 해 줄 것"
     ]
    }
   ],
   "subtotal": null
  },
  {
   "name": "10. 사업자등록증 (과락 항목)",
   "items": [
    {
     "no": 45,
     "ref": "10-1",
     "sub": "",
     "q": "당사 관련 제품의 생산활동을 하는 소재지가 사업자등록에 일치되게 등재되어 있는가",
     "points": null,
     "criteria": "사업자등록증과 불일치시 과락",
     "evidence": "사업자 등록증",
     "knockout": true,
     "clause": "-",
     "notes": [
      "* 본사 및 모든 사업자 소재지가 사업자등록증에 등재 될 것 (본점, 소재지, 종된 사업장 중)",
      "* 해당 회사명과 사업자등록명과 동일 할 것"
     ],
     "clauseNote": "ISO 9001 직접 대응 조항 없음(고객 요구)"
    }
   ],
   "subtotal": null
  }
 ]
};
window.SEED.courses = [
 {
  "id": "C01",
  "title": "ISO 9001:2015 요구사항 이해",
  "target": "[권장] 전 직원 / 내부심사원",
  "hours": "",
  "objectives": [
   "품질경영시스템 1장~10장에 대한 요구사항 해설 및 이해"
  ],
  "outline": [
   "0 개요: 품질경영원칙 7개(고객중시·리더십·인원의 적극참여·프로세스 접근법·개선·증거기반 의사결정·관계관리/관계경영), 프로세스 접근법/PDCA/리스크기반 사고",
   "4 조직상황(4.1~4.4)",
   "5 리더십: 5.1 리더십과 의지표명, 5.1.2 고객중시, 5.2 방침, 5.3 역할·책임·권한",
   "6 기획: 6.1 리스크와 기회, 6.2 품질목표, 6.3 변경의 기획",
   "7 지원: 7.1 자원(인원, 기반구조, 프로세스 운용 환경, 모니터링·측정 자원, 측정 소급성, 조직의 지식), 7.2 역량, 7.3 인식, 7.4 의사소통, 7.5 문서화된 정보",
   "8 운용: 운용 기획, 제품·서비스 요구사항, 설계와 개발, 외부 제공 프로세스·제품·서비스 관리, 생산 및 서비스 제공, 불출, 부적합 출력 관리",
   "9 성과 평가: 9.1 모니터링·측정·분석·평가(9.1.2 고객만족, 9.1.3 분석 및 평가), 9.2 내부심사, 9.3 경영검토",
   "10 개선: 10.1 일반, 10.2 부적합 및 시정조치, 10.3 지속적 개선",
   "부속서 A 표 A.1 용어 변경: 제품→제품 및 서비스 / 문서화·품질매뉴얼·문서화된 절차·기록→문서화된 정보 / 업무 환경→프로세스 운용 환경 / 모니터링 및 측정 장비→모니터링 및 측정 자원 / 구매한 제품→외부 제공 제품 및 서비스 / 공급자→외부공급자",
   "참고: KS Q ISO 9000:2015 기본사항과 용어(품질경영원칙 2.3.1~2.3.7, 용어와 정의 3.1~3.9)"
  ],
  "source": "https://drive.google.com/file/d/14ALKIkJlcdza_b4YEdgp6xKfEWsyKB-j/view",
  "refs": [
   "https://drive.google.com/file/d/1AE4P6D6YNtVISXS-D_pANWnNX8J1guBp/view"
  ],
  "note": "KS Q ISO 9001/9000 원문은 라이센스 문구가 있는 유료 표준 — 앱 내 전문 재배포 금지. 교육 시간·대상 원문 없음.",
  "quiz": [
   {
    "q": "ISO 9001:2015 개요(0.2)에 제시된 품질경영원칙은 몇 개인가?",
    "options": [
     "5개",
     "6개",
     "7개",
     "8개"
    ],
    "answer": 2,
    "why": "고객중시, 리더십, 인원의 적극참여, 프로세스 접근법, 개선, 증거기반 의사결정, 관계관리/관계경영의 7개 원칙.",
    "src": "생성"
   },
   {
    "q": "내부심사 요구사항이 규정된 조항은?",
    "options": [
     "8.7",
     "9.2",
     "9.3",
     "10.2"
    ],
    "answer": 1,
    "why": "9장 성과 평가 중 9.2가 내부심사, 9.3은 경영검토, 10.2는 부적합 및 시정조치, 8.7은 부적합 출력 관리.",
    "src": "생성"
   },
   {
    "q": "리스크와 기회를 다루는 조치가 규정된 조항은?",
    "options": [
     "4.1",
     "6.1",
     "8.1",
     "10.3"
    ],
    "answer": 1,
    "why": "6장 기획의 6.1이 리스크와 기회를 다루는 조치.",
    "src": "생성"
   },
   {
    "q": "2015년판(표 A.1)에서 \"문서화, 품질매뉴얼, 문서화된 절차, 기록\"을 대체한 용어는?",
    "options": [
     "문서화된 정보",
     "프로세스 운용 환경",
     "외부 제공 제품 및 서비스",
     "모니터링 및 측정 자원"
    ],
    "answer": 0,
    "why": "표 A.1에 따라 문서·기록 관련 용어는 \"문서화된 정보\"로 통합됨.",
    "src": "생성"
   },
   {
    "q": "2015년판에서 \"공급자\"는 어떤 용어로 바뀌었는가?",
    "options": [
     "협력사",
     "외부공급자",
     "이해관계자",
     "외부 제공자 프로세스"
    ],
    "answer": 1,
    "why": "표 A.1: 공급자 → 외부공급자.",
    "src": "생성"
   }
  ]
 },
 {
  "id": "C02",
  "title": "내부심사원 심사 스킬 (ISO 19011)",
  "target": "내부심사원 (과정명 기준)",
  "hours": "",
  "objectives": [
   "심사 계획 수립 및 내부 심사 운영 방법 이해"
  ],
  "outline": [
   "심사 대상 구분: QMS(사내 프로세스, 절차, 지침) / 제품(도면 만족, 포장/라벨링) / 공정(관리계획서, 작업표준서, FMEA, 체크시트)",
   "심사 흐름: 심사전 활동 → 문서 검토 → 현장 심사 준비 → 현장 심사 → 심사 보고서 → 심사사후조치",
   "심사 계획: 인원, 기간, 계획서, 체크리스트",
   "심사원 선정/팀구성: 독립성 / 심사경험, 사리분별력, 피심사자친근여부 / 객관성 위한 2인이상",
   "심사원 육성: 분석적, 경청 / 지식/숙련, 학력, 업무경험, 훈련/경험, 특질",
   "시작회의: 소개, 심사범위, 심사방법, 보고 방법, 심사계획, 안내자 역할",
   "현장 순회: 부적합 관찰, 5s·설비/계측기상태·제품보관·안전, 점검표 활용, 질문 → 확인 → 경청, 프로세스 접근(무엇, 누가, 어떻게, 얼마나, 입/출력)",
   "자체 회의: 심사팀장 주관, 부적합 논의, 근거확보 확인",
   "보고서 작성: 객관적 증거, 추적가능토록, 카테고리분류, 형식: 요구사항 + (객관적 증거 + 부적합 사항), 부적합 진술·심사결과 요약 작성",
   "종료 회의: 심사 결과 및 결론 제공, 부적합/관찰사항 발표, 상호 의견 공유, 시정조치 포함 계획 동의",
   "시정조치: 임시, 근본, 수평전개, 완료 확인(표준류), 유효성",
   "부적합 구분: 중부적합 / 경부적합 / 부적합 기술 / 관찰사항 (세부 본문은 이미지)",
   "품질경영시스템 프로세스맵: COP(고객 지향), MP(경영), SP(지원) — 입력: 고객 요구사항 → 출력: QMS 결과, 고객만족, 제품 및 서비스"
  ],
  "source": "https://drive.google.com/file/d/13k48j-cwJKa30jnU6qZfbXnG2BxdIiY0/view",
  "note": "교육 시간 원문 없음.",
  "quiz": [
   {
    "q": "교재의 심사 흐름에서 \"문서 검토\" 바로 다음 단계는?",
    "options": [
     "심사 보고서",
     "현장 심사 준비",
     "심사사후조치",
     "심사전 활동"
    ],
    "answer": 1,
    "why": "심사전 활동 → 문서 검토 → 현장 심사 준비 → 현장 심사 → 심사 보고서 → 심사사후조치.",
    "src": "생성"
   },
   {
    "q": "심사팀 구성 시 객관성을 위해 권장되는 심사원 수는?",
    "options": [
     "1인",
     "2인 이상",
     "3인 이상",
     "피심사부서장 포함 2인"
    ],
    "answer": 1,
    "why": "심사원 선정/팀구성: 객관성 위한 2인 이상.",
    "src": "생성"
   },
   {
    "q": "시작회의(오프닝)에서 다루는 내용이 아닌 것은?",
    "options": [
     "심사범위",
     "심사방법",
     "보고 방법",
     "시정조치 유효성 확인"
    ],
    "answer": 3,
    "why": "시작회의: 소개, 심사범위, 심사방법, 보고 방법, 심사계획, 안내자 역할. 유효성 확인은 시정조치(사후) 단계.",
    "src": "생성"
   },
   {
    "q": "교재가 제시한 부적합 보고서 기술 형식은?",
    "options": [
     "요구사항 + (객관적 증거 + 부적합 사항)",
     "부적합 사항 + 심사원 의견",
     "원인 + 대책 + 일정",
     "관찰사항 + 권고사항"
    ],
    "answer": 0,
    "why": "보고서 형식: 요구사항 + (객관적 증거 + 부적합 사항).",
    "src": "생성"
   },
   {
    "q": "심사 대상 중 \"공정\" 심사에서 확인하는 문서로 교재에 제시되지 않은 것은?",
    "options": [
     "관리계획서",
     "작업표준서",
     "FMEA",
     "사업자등록증"
    ],
    "answer": 3,
    "why": "공정: 관리계획서, 작업표준서, FMEA, 체크시트.",
    "src": "생성"
   }
  ]
 },
 {
  "id": "C03",
  "title": "측정시스템 분석 (MSA) 이해",
  "target": "[권장] 품질·검사 담당자",
  "hours": "",
  "objectives": [
   "측정 시스템 분석을 통한 측정 방법 및 운영 사례 실습"
  ],
  "outline": [
   "측정 시스템 이해: 관찰된 공정 변동 = 실제 공정 변동 + 측정시스템 변동; 측정시스템 변동 = 반복성(Repeatability, EV, 계측기) + 재현성(Reproducibility, AV, 측정자)",
   "위치변동: 편의(Bias), 안정성(Stability), 선형성(Linearity) / 너비변동: 반복성, 재현성; 정확도(편의·선형성·안정성) vs 정밀도(반복성·재현성)",
   "총변동 σ²total = σ²p + σ²R&R",
   "Type 1 반복성(편의): 규격 중앙값 부품 1개, %EV 10% 미만, Cg·Cgk ≥ 1.33 합격, 편의 T-test",
   "Type 2 반복·재현성(Gage R&R): 10개 부품, 3명, 2~3회 반복; %기여 1% 미만, %R&R 10% 미만, %PTR 10% 미만, ndc 5 이상 합격",
   "Type 3 반복성: 자동 측정 장비, 랜덤 25개 2~3회, Type 2 기준과 동일",
   "Type 4 선형성: 운영범위 포함 부품 5개, 1명, 10회 이상, R² 95% 이상(GM), 기울기·절편 H0 채택 시 합격",
   "Type 5 안정성: 동일 부품, 시간 간격 3~5회, xbar-R 관리도 만족",
   "Type 6 계수형: Kappa 계수, 25개 부품, 3명, 2~3회 (Go/No gage, 관능검사)",
   "계측기 분해능: ISO 합부판정용 공차의 1/20 이하, 공정관리용 공정변동의 1/5 이하; AIAG 1/10 이하",
   "의사 결정의 진화: 경험 → 경험+지식 → 경험+지식+데이터 (\"데이터의 품질이 중요하다\")"
  ],
  "source": "https://drive.google.com/file/d/1QdQ28n2MMmy3eVetmP1LA0caYuCjf7mQ/view",
  "note": "교육 시간·대상 원문 없음.",
  "quiz": [
   {
    "q": "측정자(평가자)에 의한 변동을 무엇이라 하는가?",
    "options": [
     "반복성(EV)",
     "재현성(AV)",
     "편의(Bias)",
     "선형성(Linearity)"
    ],
    "answer": 1,
    "why": "계측기에 의한 변동 = 반복성(EV), 측정자에 의한 변동 = 재현성(AV).",
    "src": "생성"
   },
   {
    "q": "Type 2 Gage R&R 평가 준비 조건으로 교재에 제시된 것은?",
    "options": [
     "부품 1개, 1명, 50회",
     "10개 부품, 3명, 2~3회 반복",
     "25개 부품, 1명, 1회",
     "5개 부품, 1명, 10회 이상"
    ],
    "answer": 1,
    "why": "Type 2: 10개 부품, 3명, 2~3회 반복. (5개·10회 이상은 Type 4 선형성)",
    "src": "생성"
   },
   {
    "q": "Type 2에서 %R&R(=σR&R/σtotal×100)의 합격 기준은?",
    "options": [
     "1% 미만",
     "10% 미만",
     "30% 미만",
     "50% 미만"
    ],
    "answer": 1,
    "why": "%R&R 10% 미만 합격 (1% 미만은 %기여 기준).",
    "src": "생성"
   },
   {
    "q": "구별 범주 수(ndc)의 합격 기준은?",
    "options": [
     "2 이상",
     "3 이상",
     "5 이상",
     "10 이상"
    ],
    "answer": 2,
    "why": "Ndc = 1.41×(σp/σR&R), 5 이상 합격.",
    "src": "생성"
   },
   {
    "q": "Type 1 Study의 합격 기준은?",
    "options": [
     "Cg, Cgk ≥ 1.33",
     "Cp ≥ 2.0",
     "R² ≥ 80%",
     "Kappa ≥ 0.4"
    ],
    "answer": 0,
    "why": "교재: Type 1 Study Cg, Cgk ≥ 1.33 합격.",
    "src": "생성"
   }
  ]
 },
 {
  "id": "C04",
  "title": "통계적 공정관리 (SPC)",
  "target": "[권장] 품질·생산 담당자",
  "hours": "",
  "objectives": [
   "통계적 공정 관리 (SPC)에 대한 이해 및 사례 실습"
  ],
  "outline": [
   "01 품질경영 일반: 데이터를 바라보는 핵심 개념(위치·흩어짐·모양), SPC 핵심 개념(R: max–min, S, Xbar-R, Xbar-S)",
   "2.1 관리도 개요: 변동의 원인(우연 원인/이상 원인), 구성(CL, UCL, LCL, USL, LSL), 규격한계 vs 관리한계, 3시그마 관리한계 = 99.73%, 부분군, 계량형/계수형, 관리용/해석용",
   "계수형 관리도: 부적합품률·부적합품수 = 이항분포, 부적합수·단위당 부적합수 = 푸아송 분포",
   "관리 상태 판정: 연속 25점 모두 관리한계 내 / 연속 35점 중 34점 이상 / 연속 100점 중 98점 이상",
   "2.2 공정 능력 평가: 자연공차 6σ(±3σ), 시그마수준 Z = (USL(LSL) – μ)/σ, 6σ 장기 불량률 3.4 PPM",
   "장기공정능력(Zlt, Pp·Ppk, 데이터 100~200) vs 단기공정능력(Zst, Cp·Cpk, 30~50), Z-Shift = Zst – Zlt = 평균 1.5σ",
   "품질 변동의 원인 5M1E, 공정 능력 지수 Cp/Cpk, 공정 품질 향상 활동(데이터 분석 → 과제 도출 → 원인 분석 → 대책 수립 → 적용 및 사후 관리)",
   "실습: 조별 Xbar-R 관리도 (A2=1.023, D4=2.574), 소음측정기 앱을 이용한 공정능력 실습(부분군 5, 총 25개 데이터)"
  ],
  "source": "https://drive.google.com/file/d/1HCxn9HbG-jb4ImJm6XAu_7_Br3JBOo5j/view",
  "note": "강사: 김정환(품질관리 기술사). 교육 시간·대상 원문 없음.",
  "quiz": [
   {
    "q": "3시그마 관리한계 안에 들어갈 확률은?",
    "options": [
     "68.3%",
     "95.5%",
     "99.73%",
     "99.9937%"
    ],
    "answer": 2,
    "why": "±3σ = 99.73% (1000개 중 약 3개가 벗어남).",
    "src": "생성"
   },
   {
    "q": "부적합수(c)·단위당 부적합수(u) 관리도가 따르는 분포는?",
    "options": [
     "정규분포",
     "이항분포",
     "푸아송 분포",
     "t 분포"
    ],
    "answer": 2,
    "why": "부적합품률·부적합품수는 이항분포, 부적합수·단위당 부적합수는 푸아송 분포.",
    "src": "생성"
   },
   {
    "q": "관리 상태로 판정하는 기준으로 교재에 제시된 것은?",
    "options": [
     "연속 25점 모두 관리한계 내",
     "연속 7점 상승",
     "연속 10점 중 9점 관리한계 내",
     "연속 50점 중 45점 이상"
    ],
    "answer": 0,
    "why": "연속 25점 모두 관리한계 내 / 연속 35점 중 34점 이상 / 연속 100점 중 98점 이상.",
    "src": "생성"
   },
   {
    "q": "6σ 수준의 장기 불량률은?",
    "options": [
     "0.002 PPM",
     "3.4 PPM",
     "63.4 PPM",
     "233 PPM"
    ],
    "answer": 1,
    "why": "6σ: 단기 0.002 PPM, 장기 3.4 PPM.",
    "src": "생성"
   },
   {
    "q": "단기 공정능력(Zst)과 장기 공정능력(Zlt)의 차이(Z-Shift)는 평균 몇 σ인가?",
    "options": [
     "0.5σ",
     "1.0σ",
     "1.5σ",
     "3.0σ"
    ],
    "answer": 2,
    "why": "Z-Shift = Zst – Zlt = 평균 1.5σ (6σ: Zst=6.0, Zlt=4.5).",
    "src": "생성"
   }
  ]
 }
];
window.SEED.project = {
 "title": "ISO9001 컨설팅 완료보고서",
 "period": "3월~12월 (일정표 월 헤더 기준, 연도 표기 없음)",
 "phases": [
  {
   "name": "1차 (교육)",
   "period": "",
   "activities": [
    "품질경영시스템 요구사항 ISO9001:2015",
    "ISO19011 심사 스킬",
    "통계적 공정관리",
    "측정시스템분석 이해"
   ],
   "outputs": [
    "교육 교안 및 Test",
    "핵심문서 이해"
   ],
   "desc": "품질경영시스템 1장~10장에 대한 요구사항 해설 및 이해 - 심사 계획 수립 및 내부 심사 운영 방법 이해 - 통계적 공정 관리 (SPC)에 대한 이해 및 사례 실습 - 측정 시스템 분석을 통한 측정 방법 및 운영 사례 실습"
  },
  {
   "name": "2차 (진단)",
   "period": "",
   "activities": [
    "고객 점검 평가서 해석 및 수준 진단",
    "기업 운영 양식 수집 및 운영 진단"
   ],
   "outputs": [
    "프로세스 맵",
    "문서 체계표",
    "업무 범위 파악 및 프로세스맵"
   ],
   "desc": "고객 요구 사항에 대한 품질경영시스템 반영 - 문서와 현업과의 일치성 확보 - 프로세스 맵 및 문서 체계표 작성"
  },
  {
   "name": "3차 (COP)",
   "period": "",
   "activities": [
    "개발 관리",
    "구매 관리",
    "생산 관리",
    "인도 관리",
    "고객 만족"
   ],
   "outputs": [
    "COP 문서 구축 (프로세스, 절차, 지침, 양식)"
   ],
   "desc": "COP (Customer oriented Process) 고객 지향 프로세스: 고객을 만나기전 ~ 고객을 만난 후까지 고객을 위해 존재 하는 프로세스 - COP 프로세스, 절차서, 지침서, 양식 구축 및 정렬성 확보"
  },
  {
   "name": "4차 (MP)",
   "period": "",
   "activities": [
    "경영 관리",
    "개선 관리"
   ],
   "outputs": [
    "MP 문서 구축 (프로세스, 절차, 지침, 양식)"
   ],
   "desc": "MP (Management Process) 경영 프로세스: 내부적 운영과 시스템을 관할하는 프로세스"
  },
  {
   "name": "5차 (SP)",
   "period": "",
   "activities": [
    "설비 보전 관리",
    "문서화된 정보 관리",
    "교육 훈련",
    "검사 업무"
   ],
   "outputs": [
    "SP 문서 구축 (프로세스, 절차, 지침, 양식)"
   ],
   "desc": "SP (Supporting Process) 지원 프로세스: MP 와 COP를 지원하기 위한 프로세스"
  },
  {
   "name": "6차 (매뉴얼)",
   "period": "",
   "activities": [
    "품질경영 매뉴얼",
    "내부심사 체크시트",
    "핵심 성과지표 KPI"
   ],
   "outputs": [
    "품질경영 매뉴얼",
    "내부 심사 체크시트",
    "성과 지표"
   ],
   "desc": "품질경영시스템 매뉴얼 최종 확정 - 내부 심사를 위한 준비 - 각 프로세스의 핵심 성과 지표 구축"
  },
  {
   "name": "1단계 (심사) / 2단계 (심사)",
   "period": "",
   "activities": [
    "인증 심사"
   ],
   "outputs": [],
   "desc": ""
  }
 ],
 "audits": [
  {
   "name": "방문/심사 일자 (원문 셀 순서)",
   "dates": [
    "4",
    "11(화)",
    "18(화)",
    "25",
    "1(화)",
    "17(목)",
    "30(수)",
    "6",
    "14(수)",
    "20",
    "28(수)",
    "04",
    "11(수)",
    "03(수)"
   ],
   "note": "각 일자의 월 매핑은 이미지 표 구조라 확인 불가"
  },
  {
   "name": "1단계 (심사)",
   "dates": [],
   "note": "인증 심사"
  },
  {
   "name": "2단계 (심사)",
   "dates": [],
   "note": "인증 심사"
  }
 ],
 "results": [
  "프로세스 맵",
  "문서 체계표",
  "COP·MP·SP 프로세스/절차서/지침서/양식",
  "품질경영 매뉴얼",
  "프로세스 KPI (21개)",
  "내부심사 체크시트 (SSQ 평가 시트)",
  "정량적 개선 효과 수치: 슬라이드 텍스트에 없음"
 ],
 "nextSteps": [
  "기간: 7~12월, 1w~15w 주간 일정",
  "1차 줌회의",
  "2차 줌회의",
  "내부 심사",
  "고객 심사",
  "1단계(심사)",
  "2단계(심사)",
  "주요 산출물: SSQ 평가 시트 — \"ISO 구축 문서 준수시 100% 만족\""
 ],
 "note": "비고(원문): \"45001 안전보건포함 (10월 중순 이내 인증서 필요)\". 일정표 하단 행은 4차(SP)/5차(MP)로 상단 표와 뒤바뀌어 있음(원문). 슬라이드 다수가 이미지라 텍스트 추출분만 기재. 권고사항/잔여 이슈 텍스트 없음.",
 "source": "https://docs.google.com/presentation/d/1gnEmM2wUULDyjTIu_gxQtjaLeJ0We3WygiF6JHrIkBM/edit"
};
