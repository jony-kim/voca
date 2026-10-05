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
  "name": "업체공정감사 합격률",
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
  "note": "목표 2.0/실적 1.0은 % 표기이나 실제로는 건수로 보임(원문 달성률 50%). 2025-11 외 월 공란",
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
  "name": "부품 결품률",
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
  "name": "생산계획 달성률",
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
  "name": "매출 목표 달성률",
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
  "name": "고객불량 건수 목표달성률",
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
  "name": "사업계획 대비 실적 달성률",
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
  "name": "공정불량률",
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
  "name": "교육계획 달성률",
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
  "name": "입고 불량률",
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
      "q": "수입검사, 공정 검사, 출하 검사, 시장 품질 등 목표 대비 실적이 관리되며 보고되고 있는가?",
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
      "q": "수입 검사 규정 (최신본 개정 여부) 및 절차를 보유하고 있는가",
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
      "q": "핵심 (중요) 품목이 지정되어 있으며 품목 (유형)별로 수입검사 기준(표준)을 별도 보유하고 있는가",
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
      "q": "수입검사 기준에 따른 검사가 실시되었는가 검사 수량 및 판정결과가 검사기준을 만족하는가 (검사 완료품 Sample 3개 이상 Check)",
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
      "q": "수입검사 결과에 대한 실적(현황) 관리하고 있는가 ( 실적 : Raw Data , 불량 내용 포함)",
      "criteria": "",
      "evidence": "입고실적 , 불량률 집계",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "9.1.3"
     },
     {
      "no": 10,
      "ref": "2.6",
      "sub": "작업표준 관리 지침",
      "q": "최신 Ver의 SOP (조립표준서, 조립도면, Check Sheet)를 보유하고 있는가. (이력대장 포함된 최신 SOP 관리)",
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
      "q": "단계 검사 Check Sheet (or 협력사 자체 C/S)에 따라 검사가 실시되고 있는가 (실 작업자 Check 여부, 작업 동시 Check 여부 확인)",
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
      "q": "SOP (조립표준서, 조립도면, Check Sheet) 는 현장에 작업자가 쉽게 열람할 수 있도록 해당 공정에 비치되어 있는가",
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
      "evidence": "출하 검사 성적서",
      "weight": 1.5,
      "weightText": "150%",
      "clause": "8.6"
     },
     {
      "no": 15,
      "ref": "2.11",
      "sub": "검사 및 시험 절차",
      "q": "출하 검사 결과에 대한 실적 (현황) 관리하고 있는가 (실적 : Raw data , 불량 내용 포함)",
      "criteria": "",
      "evidence": "출하 검사 성적서",
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
      "q": "수입, 공정, 출하, 시장 불량에 대한 부적합 처리 절차가 있는가",
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
      "q": "내부 (외주포함) 부적합의 개선 대책에 대한 유효성 (사후관리) 평가는 실시하고 있는가",
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
      "q": "변경점 처리 기준을 보유하고 있는가? * 변경점 운영 범위 : 고객, 자체 (설계, 생산), 협력사",
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
      "q": "변경점 관리를 실시하고 있는가?",
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
      "q": "제품 (자재) 창고 보관 구역 표시는 되어 있는가 ( 부품 현장 투입 Process 시 _ 현장 내 선반 또는 지정된 장소에 보관되어 있는가 )",
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
      "q": "창고 5S 상태 확인 및 정기적 점검은 실시하고 있는가 (부품 현장 투입시 Process 시 _ 현장 내 자재 보관시 5S 점검은 실시하고 있는가)",
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
      "q": "기준에 위배된 혼적 , 역적은 없는가 * 적재 단수 (안전, 변형), 혼적(분실, 재고관리 문제), 역적(파손 소지) (부품 현장 투입 Process 시 _ 현장 내 자재 보관을 준수하고 있는가)",
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
      "q": "클린룸 (준 클린룸 포함) 관리 기준 보유 및 기준대로 관리되고 있는가 * 정리 (보관 외 물품이 없을 것) / 정돈 (미관상 양호) / 청소 (청소 상태, 주기) / 청결 (바닥 외 보관 box, 선반, 자재 오염 여부 확인) / 습관화 (Check Sheet 운용)",
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
      "q": "현장 Particle Spec 관리는 준수되고 있는가",
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
      "q": "클린복, 신발, 모자, 장갑 관리는 양호한가",
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
      "q": "Air Utility Spec 합격 관리 및 관리 대장이 운영되고 있는가 (관리대장 : 소모품 교체, 필터 교체 주기 등)",
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
      "q": "검사에 필요한 계측기 /Jig는 확보되어 있는가 (피 측정물의 재질, 형상, 정도, Size 및 도면 내 요구사항 검증)",
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
      "q": "계측기 관리 기준을 보유하고 있는가 * 사외, 사내 교정, 비교정, 유휴, 운휴 계측기 관리 방법 및 식별에 대한 내용 내포 필 (9001 요건 내 내용 내포 안되어 있을 경우 미보유 , 단 100% 사외 교정 실시하고 있으며 비교정, 유휴 없을 경우 ISO9001 요건 인정)",
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
      "q": "계측기 List에 의한 현황 관리가 최신 Ver으로 관리되고 있는가 (품명, 기기번호, 구입일, 교정주기, 최근 교정 이력, 차기 교정예정일)",
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
      "q": "교정을 실시하고 있으며 성적서가 관리되고 있는가 (최근 1년, 전산관리 허용)",
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
      "q": "Jig 및 공용 Tool은 전용 보관 장소에 식별되어 보관되어 있는가",
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
      "q": "주기적으로 점검을 실시하는가 (Check Sheet)",
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
      "criteria": "1) 연간 직무 교육훈련 커리큘럼 및 계획서 보유 (품질 Master 과정에 대한 체계적 운영) 2) 직무별 교육 과정의 적합성 3) 계획 대비 실행률 80% 이상 (최근2년) 4) 직무교육 이력관리 5) 품질 전문 인력 확보 (품질관련 국가 자격 보유 비율)",
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
      "evidence": "자격 인증 절차서, 평가서, 인증서, 업무분장표, 인증현황 및 식별 관리",
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
      "criteria": "1) 계획에 따라 사후/갱신 심사가 정기적으로 진행됨 2) 심사 부적합/권고사항 시정 조치 관리 3) 사내 규정에 정의된 담당자 보유",
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
      "criteria": "1) 연간 계획을 수립하고 전 부서 대상 절차대로 시행 2) 지적 또는 권고에 대한 시정조치",
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
      "criteria": "1) 검사 기준(관리계획 수립, 대상별 검사 방법, 검사수, 전환규칙 소재 별 Aging 외) 2) 검사 기준서 최신 Ver 유지 (개정 1년 이내, 개정 이력 확인 ) 3) 중요 품목 선정 및 검사 표준서 보유 4) 발주 품목에 대한 품질 특성 측정 가능한 계측기 보유 5) 검사 성적서 작성/ 보관(외주업체 제출 성적서 포함) 6) 검사 결과 이력관리(전산시스템을 통한 관리, 수기관리)",
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
      "criteria": "1) 구역 분리 운영 (검사대기,완료,진행,합격,불합격 등 흔적) 2) 검사실 항온/항습 관리 ( 실온 20도 +-2도,습도 65% 이하) 3) 검사 기준에 준한 대상 별 검사 실시 (검사방법,검사수,전환규칙 반영) 4) 검사 진행, 검사원의 검사 기준 인지(검사실 확인, 인터뷰) 5) 중요 품목 검사 표준 준수 (검사실 확인) 6) 중요 품목에 대한 관리도 ,SPC 운영 /분석 7) 직납품의 전수 검사 실시 * 기준 모호, 품질특성 미고려한 계측기를 활용한 상태 진행시 신뢰성 없음 판정",
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
      "criteria": "1) 검사 기준 or 체크시트의 변경 이력 관리 및 최신본 유지 2) 출하 승인 조건 (승인을 위한 산출물, 전결규정) 3) 사양 검토 및 이상 여부 Check(옵션 사양,납입처,특이사항) 4) 표준 Check sheet의 변경 사항 반영 및 Check (설계변경, 5M1E 변경 ) 5) 사양 외 고객 요구 사항이 반영된 출하 검사 Check Sheet 운영 * 외관 , 8계통, 청정 등 기능성, 동작, 특성 검사 외 6) 출하검사 산출물에 대한 실행 수준 (누락,기준 불일치, 판정오류,재검사등) 7) 이전 문제 재발방지를 위한 Re-check 8) 검사 결과 이력관리 (전산시스템을 통한 관리, 수기관리) 9) 출하검사 부적격에 대한 식별, 부적합품 격리, 조치, 재검사, 기록",
      "evidence": "출하 검사 업무 절차서, Check Sheet, 검사 이력 관리, 부적합 분석 자료, 부적합 관리 절차",
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
      "criteria": "1) 관련 부서 참여한 분석 활동 2) QC 7가지 도구, 8D, 5Why 등 체계화된 분석 기법 도입/운영 3) 대책 회의체 운영 (분석/대책 타당성 검토 ) 4) 대책 유효성 검증 활동(사후관리,지속이행) 5) 부적합 재발 및 유사 부적합 모니터링 6) 표준 문서 반영 (SOP,Check Sheet 외) 7) 부적합 이력 관리 및 모니터링",
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
      "criteria": "1) 횡 확산 개선 활동, 작업 환경 효율적 운영 사례(환경이슈 방지) 불량 사례 전파, 교육 2) 자동화, Jig , 방법 등 FoolProof 적용 (효과 검증), 기타 부적합 예방 활동 추진 실적 (효과 검증)",
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
      "criteria": "1) 계측기 분류 기준 (검교정, 비대상, 유휴, 수리/폐기 등 자체 & Kolas 기준 반영) 2) 유휴 계측기 처리 절차(유휴 전환 결정, 처리,식별,보관/사용 전환 절차) 3) 검교정 주기 설정(자체 &Kolas 기준 적용) 4) 검교정 이력 관리 , 성적서 관리 5) 계측기 사용 추적 관리(대여, 출장, 교정 반출 등 현황 실시간확인) 6) 계측기 일상 점검 기준(점검 대상 정의) 및 이력 7) 측정 시스템 검증",
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
      "criteria": "1) 검교정 누락 계측기 확인, 검교정 계측기 필증 부착 및 유효기간 (도금 포함) 2) 비교정 대상 계측기 미식별 3) 유휴/불량 계측기 미식별, 현장 방치, 미시건",
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
      "evidence": "협력사 선정, 협력사 관리 절차, 협력사 List, 선정 이력, Qual 절차 및 이력",
      "weight": 0.5,
      "weightText": "50%",
      "clause": "8.4.1"
     },
     {
      "no": 23,
      "ref": "4.2",
      "sub": "구매 업무 프로세스",
      "q": "외주 협력사 Proof 관리 (인력 도급 제외)",
      "criteria": "1) 거래 협력사 Pool list 최신 ver보유 2) 발주 품목 별 거래 협력사 List 보유, 발주 부품 별 추적관리가능 3) SSQ 인증사 활용",
      "evidence": "협력사 선정, 협력사 관리 절차, 협력사 List, 선정 이력, Qual 절차 및 이력",
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
      "criteria": "1) 외부 환경에 대한 보호 관리 * 햇빛 노출, 먼지 유입등 2) 온습 관리 (온도, 기준제시, 습도 65% 이하) * 기준 제시 : 자재 Maker 별 요구 수준에 준한 관리 필요 3) 사용품/반품/폐기/불용품 등 구역 식별 4) 사용품 주소체계, 적재/식별/보관 기준 관리 5) 선입선출 관리 6) 현장 5s 수준 및 check 기록",
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
      "criteria": "1) 부적합 실적 등급 기준에 의거 점수 산출 * 품질 Penalty 이력 있는 경우 등급 별 감점 * Proactive notice 활동 가점 (도면 불합리 제안, 손들기 활동 등)반영",
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
      "criteria": "1) 부적합 실적 등급 기준에 의거 점수 산출 * 품질 Penalty 이력 있는 경우 등급 별 감점 * Proactive notice 활동 가점 (도면 불합리 제안, 손들기 활동 등)반영 (원문: 위와 동일)",
      "evidence": "각 모듈 셋업 부적합 대당 건수",
      "weight": null,
      "weightText": "",
      "clause": "9.1.3"
     },
     {
      "no": 36,
      "ref": "6.6",
      "sub": "개선 프로세스",
      "q": "집계 기간 내 고객 클레임 등급 Lv 별 감점 기준 적용한 반영 점수",
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
 "note": "고객사(세메스)가 협력사(MST)를 평가하는 시트(시트에 회사명 머리말은 없고 본문의 \"세메스 검사 요청서\"·\"세메스 배포 기준\"으로 판단). 사본 2개 동일. 원문 오류: 20~45번 \"평가 항목\"(중분류) 칸이 모두 \"변경점 절차에 의한 실행\"으로 복사됨 → 22~45번 sub는 공란 처리. 명백한 오탈자만 정정(revisionLog 참조), 그 외 원문 유지. 내부 체크시트(CK-ISO) 1.1~8.8 ↔ SSQ 1~4, 6~43 대응(SSQ 5·44·45는 내부 시트에 없음). 등급 구간/합격 점수 원문 없음. clause는 ISO 9001:2015 추정 매핑.",
 "scoring": "항목별 배점(1~4점) 안에서 평가 기준의 단계 점수를 선택. 만점 100점(43개 채점 항목, 계산값; 시트에 합계 셀 없음). 감점형(28번 위반 1건당 0.5 감점), 가산형(27번 5S 항목당 0.2, 35번 1+0.5×4), 비율 적용(19번 일정 미도래 50%, 35번 전용 검사실 없으면 50%) 규칙 혼재. 연쇄: 18·19번은 10·16번(검사 실적 미관리) 시 0점, 38·39번은 1ea 교정 누락 시 0점. 과락: 44(보안)·45(사업자등록증) 중 하나라도 해당하면 총점과 무관하게 과락. 등급(A/B/C) 기준 원문 없음.",
 "sections": [
  {
   "name": "1. 품질운영",
   "items": [
    {
     "no": 1,
     "ref": "1-1",
     "sub": "품질 실적 관리",
     "q": "수입검사, 공정 검사, 출하 검사, 시장 품질 등 목표 대비 실적이 관리되며 보고되고 있는가? (주(월)간 품질회의 보고서)",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "검사 지표 관리 중이며 경영자 (책임자) 주관 품질회의 진행시"
      },
      {
       "score": 1,
       "text": "검사 지표만 관리, 경영(책임)자 주관 품질회의 미진행 or 누락"
      },
      {
       "score": 0,
       "text": "주(월)간 보고서 작성 안됨, 검사 Raw Data 없을 시"
      },
      {
       "score": 0,
       "text": "* 회의록, 결재 문서 없을 시 품질 회의 미진행으로 처리"
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
       "text": "조직도 및 업무적으로 분리되어 있으면"
      },
      {
       "score": 0.5,
       "text": "조직도 및 업무적으로 분리 안 되어 있으면"
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
     "q": "품질 부서 인원은 전 품목에 대한 전수 검사 업무 수행에 충분한가 (현 보유인력으로 전수검사가 가능해야 함. 단, 정확한 근거와 기준을 갖고 Sample 검사를 할 경우 인정, 기준 미흡상태에서 인원 부족에 따른 Sample 검사를 할 경우 검사 인원 부족 및 전수 검사 미실시 판단)",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "수입, 공정, 출하검사 단계별 업무 분장되어 견제의 기능이 있다."
      },
      {
       "score": 1,
       "text": "수입, 공정, 출하검사 단계 중 2단계 업무 분장 중복되어 견제 기능이 부족하다"
      },
      {
       "score": 0,
       "text": "수입, 공정, 출하검사 단계 중 모든 업무 분장 중복되어 견제 기능이 불가하다"
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
      "* 기준은 자격요건, 교육시간, 평가방법, 합격수준, 불합격에 대한 사후 관리, 갱신에 대한 내용이 언급되어 있어야 하며 평가는 이론/실기가 병행되어야 한다."
     ]
    },
    {
     "no": 5,
     "ref": "1-5",
     "sub": "조직 및 인적 자원 관리",
     "q": "작업 인력 자격인증 기준이 있으며, 주기적 운영되고 있는가 (외주 인력 포함)",
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
      "* 기준은 자격요건, 교육시간, 평가방법, 합격수준, 불합격에 대한 사후 관리, 갱신에 대한 내용이 언급되어 있어야 하며 평가는 이론/실기가 병행되어야 한다."
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
     "q": "수입 검사 규정 (최신본 개정 여부) 및 절차를 보유하고 있는가 * 규정/절차 : Sampling 방법 /판정개수/수입검사 전후 및 합격불합격 식별/수입검사 Area의 환경관리, 수입검사 대상, 비대상 구분 및 기준서대로 진행되는가",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "수입검사 규정 (개정/년) 및 절차 보유"
      },
      {
       "score": 1.5,
       "text": "수입검사 규정 및 절차 보유하고 있으나 명확하지 않음"
      },
      {
       "score": 0,
       "text": "규정,기준 미보유"
      }
     ],
     "evidence": "수입검사 표준서",
     "knockout": false,
     "clause": "8.4.2",
     "notes": [
      "* 규정/절차 : 샘플링 방법/판정기준/수입검사 전후 및 합격,불합격 식별/수입검사 Area의 환경 관리, 수입검사 대상 비대상 구분 및 기준서대로 진행되는가"
     ]
    },
    {
     "no": 7,
     "ref": "2-2",
     "sub": "수입검사",
     "q": "핵심 (중요) 품목이 지정되어 있으며 품목 (유형)별로 수입검사 기준(표준)을 별도 보유하고 있는가",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "핵심 품목 지정되어 있으며 검사 기준서 100% 보유"
      },
      {
       "score": 2,
       "text": "핵심 품목 지정되어 있으며 검사 기준서 누락 있음"
      },
      {
       "score": 1,
       "text": "핵심 품목 list 만 보유"
      },
      {
       "score": 0,
       "text": "핵심 품목 list 미보유"
      }
     ],
     "evidence": "수입검사 표준서",
     "knockout": false,
     "clause": "8.4.2",
     "notes": [
      "* 핵심 품목에 대한 검사 기준서는 공통된 검사 방식이 아닌 특별관리 차원에서의 관리가 필요하다. 기준이라 함은 검사 방법, 계측기/Jig 사용 방법, 기록 관리 등 구체화되어 있어야 한다."
     ]
    },
    {
     "no": 8,
     "ref": "2-3",
     "sub": "수입검사",
     "q": "수입검사 기준에 따른 검사가 실시되었는가 검사 수량 및 판정결과가 검사기준을 만족하는가 (검사 완료품 Sample 3개 이상 Check)",
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
     "q": "수입검사 결과에 대한 실적(현황) 관리하고 있는가 ( 실적 : Raw Data , 불량 내용 포함)",
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
     "q": "최신 Ver의 SOP (조립표준서, 조립도면, Check Sheet)를 보유하고 있는가. (이력대장 포함된 최신 SOP 관리)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "이력 대장 및 SOP가 Match 되어 관리되고 있다"
      },
      {
       "score": 1.5,
       "text": "이력 대장 없이 SOP 만 보유하고 있다"
      },
      {
       "score": 0,
       "text": "1년 이상 개정이 누락되어 있다"
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
     "q": "단계 검사 Check Sheet (or 협력사 자체 C/S)에 따라 검사가 실시되고 있는가 (실 작업자 Check 여부, 작업 동시 Check 여부 확인)",
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
     "q": "SOP (조립표준서, 조립도면, Check Sheet) 는 현장에 작업자가 쉽게 열람할 수 있도록 해당 공정에 비치되어 있는가",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "최신본 관리 유, 현장 공정별 (or 장비별) 비치하고 있음"
      },
      {
       "score": 1,
       "text": "최신본 관리 유, 현장 공정별 (or 장비별) 일부 비치하고 있음"
      },
      {
       "score": 0,
       "text": "현장 공정별 (장비 앞) 미비치"
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
     "q": "출하 검사 결과에 대한 실적 (현황) 관리하고 있는가 (실적 : Raw data , 불량 내용 포함)",
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
     "q": "수입, 공정, 출하, 시장 불량에 대한 부적합 처리 절차가 있는가 (부적합 기준/부적합 발행 및 통보/원인분석/시정조치/처리/승인/사후관리/부적합의 식별/격리보관/평가/보고/수리 및 재검사)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "검사 단계 별 절차를 보유하고 있으며 관리 항목이 명확하게 기술되어 있음"
      },
      {
       "score": 1.5,
       "text": "검사 단계 별 절차를 1건 이하 보유하고 있지 않거나 관리항목이 불명확함"
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
      "* 검사 실적(현황) 미관리시 0점 -> 불량 현황 파악 안됨",
      "* 이력관리 대장 내 통보 일자 , 대책접수일자, 대책발표, 유효성 평가 일자에 대한 내용 포함 필수",
      "* 통보서 발행 대책서 접수 유효성 확인란이 포함"
     ]
    },
    {
     "no": 19,
     "ref": "3-3",
     "sub": "개선활동 및 유효성 평가",
     "q": "내부 (외주포함) 부적합의 개선 대책에 대한 유효성 (사후관리) 평가는 실시하고 있는가",
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
      "* 검사 실적 (현황) 미관리 시 0점 -> 불량 현황 파악 안됨",
      "* 계획 대비 일정이 도래하지 않았을 경우 50% 적용"
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
     "q": "변경점 처리 기준을 보유하고 있는가? * 변경점 운영 범위 : 고객, 자체 (설계, 생산), 협력사",
     "points": 2,
     "criteria": [
      {
       "score": 2,
       "text": "변경점 관리 절차와 관리 기준이 수립되어 있음"
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
       "text": "변경점 관리 절차 및 관리 기준 없음"
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
     "q": "변경점 관리를 실시하고 있는가?",
     "points": 4,
     "criteria": [
      {
       "score": 4,
       "text": "변경점 Risk 검토를 실시하며, 승인 후 현장에 적용되고 있음"
      },
      {
       "score": 2,
       "text": "변경점 Risk 검토를 실시하나, 승인되지 않은채 적용되고 있음"
      },
      {
       "score": 0,
       "text": "변경점 Risk 검토되지 않거나 변경점 관리 사항 없음"
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
       "text": "미보유"
      }
     ],
     "evidence": "기준서",
     "knockout": false,
     "clause": "8.4.1",
     "basis": "평가 기준 보유여부 확인 (평가 대상, 주기, 거래유지 등 내용 내포되어야 함)"
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
       "text": "기준대로 시행되고 있음"
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
     "q": "제품 (자재) 창고 보관 구역 표시는 되어 있는가 ( 부품 현장 투입 Process 시 _ 현장 내 선반 또는 지정된 장소에 보관되어 있는가 )",
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
       "text": "창고 미보유 (보관구역 미표시)"
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
     "q": "창고 5S 상태 확인 및 정기적 점검은 실시하고 있는가 (부품 현장 투입시 Process 시 _ 현장 내 자재 보관시 5S 점검은 실시하고 있는가)",
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
     "q": "기준에 위배된 혼적 , 역적은 없는가 * 적재 단수 (안전, 변형), 혼적(분실, 재고관리 문제), 역적(파손 소지) (부품 현장 투입 Process 시 _ 현장 내 자재 보관을 준수하고 있는가)",
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
       "text": "식별되고 있음"
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
       "text": "별도 구역이 있으며 구분되어 관리됨"
      },
      {
       "score": 1,
       "text": "별도 구역이 없는 상태에서 식별되어 관리됨"
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
     "q": "클린룸 (준 클린룸 포함) 관리 기준 보유 및 기준대로 관리되고 있는가 * 정리 (보관 외 물품이 없을 것) / 정돈 (미관상 양호) / 청소 (청소 상태, 주기) / 청결 (바닥 외 보관 box, 선반, 자재 오염 여부 확인) / 습관화 (Check Sheet 운용)",
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
       "text": "지적 3건 이상 및 기준 없음 (Check Sheet 미운영시)"
      }
     ],
     "evidence": "기준서, Check Sheet",
     "knockout": false,
     "clause": "7.1.4",
     "basis": "클린룸 관리 기준 및 관리 현황 확인",
     "notes": [
      "* 관리 Class , 환경관리 기준, 일일 Check Sheet 운영 상태 확인 및 5S 관리 상태",
      "* 클린룸 미적용 업태의 경우 5S 관리기준으로 대체"
     ]
    },
    {
     "no": 32,
     "ref": "7-2",
     "sub": "",
     "q": "현장 Particle Spec 관리는 준수되고 있는가",
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
     "basis": "* 내부 기준에 준함",
     "notes": [
      "* 클린룸 미적용 업태의 경우 5s 중 청결 상태로 대체"
     ]
    },
    {
     "no": 33,
     "ref": "7-3",
     "sub": "",
     "q": "클린복, 신발, 모자, 장갑 관리는 양호한가",
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
      "* 클린룸 미적용 업태의 경우 복장 상태 점검 (실내/실외화, 장갑 등)"
     ]
    },
    {
     "no": 34,
     "ref": "7-4",
     "sub": "",
     "q": "Air Utility Spec 합격 관리 및 관리 대장이 운영되고 있는가 (관리대장 : 소모품 교체, 필터 교체 주기 등)",
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
     "q": "검사에 필요한 계측기 /Jig는 확보되어 있는가 (피 측정물의 재질, 형상, 정도, Size 및 도면 내 요구사항 검증)",
     "points": 3,
     "criteria": [
      {
       "score": 3,
       "text": "치수, 외관 100% 보증"
      },
      {
       "score": 1.5,
       "text": "치수, 외관 포함 일부 미보증"
      },
      {
       "score": 0,
       "text": "50% 이상 미보증"
      }
     ],
     "evidence": "계측기 / Jig list, 현장 확인",
     "knockout": false,
     "clause": "7.1.5.1",
     "notes": [
      "* 계측기 소손으로 수리 대기의 경우 1.5점 처리",
      "* 검사 jig : 소재, 후처리 Master Jig 등. 3차원, 경도, 표면 저항, 정전기, 조도 등 특수 측정 : 협력사 성적서 확인 시 인정. 기타 계측기 선정 원칙에 준함. 측정기의 정도는 피 측정물 허용 공차의 1/10 보다 높은 측정기를 선택 필. 줄자, 스틸자 사용의 경우 피 측정물 size 600mm(일반공차) 이상 제품 시 허용"
     ]
    },
    {
     "no": 37,
     "ref": "8-2",
     "sub": "",
     "q": "계측기 관리 기준을 보유하고 있는가 * 사외, 사내 교정, 비교정, 유휴, 운휴 계측기 관리 방법 및 식별에 대한 내용 내포 필 (9001 요건 내 내용 내포 안되어 있을 경우 미보유 , 단 100% 사외 교정 실시하고 있으며 비교정, 유휴 없을 경우 ISO9001 요건 인정)",
     "points": 1,
     "criteria": [
      {
       "score": 1,
       "text": "보유하고 있음"
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
     "q": "계측기 List에 의한 현황 관리가 최신 Ver으로 관리되고 있는가 (품명, 기기번호, 구입일, 교정주기, 최근 교정 이력, 차기 교정예정일)",
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
      "* 사내 모든 계측기 (비교정품 포함)에 대한 List 가 기록되어 있어야 함",
      "* 4항목 (기기번호, 교정 주기, 최근교정일자, 차기교정일)"
     ]
    },
    {
     "no": 39,
     "ref": "8-4",
     "sub": "",
     "q": "교정을 실시하고 있으며 성적서가 관리되고 있는가 (최근 1년, 전산관리 허용)",
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
      "* List & 성적서와 일치할 것 (sample 5 개 이상 실물 확인), 자체 검교정 인정 (교정 성적서, 필증 필 - 기준 내 내용 없을 경우 인정 불가)"
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
       "text": "식별되고 있음"
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
      "* 공용 Tool 보관함에 List 가 부착되어 있고, List와 보관함 내 물품이 일치할 것"
     ]
    },
    {
     "no": 42,
     "ref": "8-7",
     "sub": "",
     "q": "Jig 및 공용 Tool은 전용 보관 장소에 식별되어 보관되어 있는가",
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
     "q": "주기적으로 점검을 실시하는가 (Check Sheet)",
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
     "q": "도면이 현장에 방치되어 있거나 성적서로 활용되고 있는가",
     "points": null,
     "criteria": "도면 방치 확인 시 과락 / 도면 성적서 활용 확인 시 과락",
     "evidence": "현장 확인",
     "knockout": true,
     "clause": "8.5.3",
     "notes": [
      "* 현장 방치 : 현재 생산중인 제품과 관련 없는 도면이 현장에 있으면 안됨 (작업 현장, 검사실, 자재창고 등)",
      "* 도면 성적서 : 검사 결과를 도면에 기록해서는 안됨 - 납품 대기 제품에 동봉 포장되어 있거나 활용되면 안됨",
      "* 당사 거래 이력이 없는 신규사는 현장에서 가이드해 줄 것"
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
      "* 본사 및 모든 사업자 소재지가 사업자등록증에 등재될 것 (본점, 소재지, 종된 사업장 중)",
      "* 해당 회사명과 사업자등록명과 동일할 것"
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
  "note": "KS Q ISO 9001/9000 원문은 라이선스 문구가 있는 유료 표준 — 앱 내 전문 재배포 금지. 교육 시간·대상 원문 없음.",
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
   "desc": "COP (Customer oriented Process) 고객 지향 프로세스: 고객을 만나기 전 ~ 고객을 만난 후까지 고객을 위해 존재하는 프로세스 - COP 프로세스, 절차서, 지침서, 양식 구축 및 정렬성 확보"
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

/* 교정 이력: 오타·타사 명칭/번호·표준명 정정 (seed-docs / seed-forms / seed-audit) */
window.SEED.revisionLog = [
 {
  "file": "seed-docs.js",
  "where": "MD-0901 retention",
  "before": "기록관리 절차서(HKB-02)에 따라 해당 팀 보관 (기간 미기재)",
  "after": "문서화된 정보 관리 절차서(MD-0702)에 따라 해당 팀 보관 (기간 미기재)",
  "kind": "타사번호"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-0809 retention",
  "before": "기록관리 절차서(HKB-02)에 따라 해당팀 유지관리",
  "after": "문서화된 정보 관리 절차서(MD-0702)에 따라 해당팀 유지관리",
  "kind": "타사번호"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0902 '심사팀 구성'",
  "before": "정 (대상팀 구성원 제외, 1명 이상, 자격은 교육훈련 절차서 HKB-03). 기록: 감사원이력관리대장",
  "after": "정 (대상팀 구성원 제외, 1명 이상, 자격은 인적자원관리 절차서 MD-0703). 기록: 감사원이력관리대장",
  "kind": "타사번호"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0813 '설변 부품/제품 식별'",
  "before": "합격판정 후 설변부품관리표(QPF-403-03-0), 설변제품(영업)관리표(QPF-403-04-0, 분홍색)",
  "after": "합격판정 후 설변부품관리표, 설변제품(영업)관리표(분홍색)로 식별",
  "kind": "타사번호"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0813 notes",
  "before": "항) 공란, 부표 R/S 정렬 불완전. 양식번호 QPF-403-xx는 구 체계 잔재. 부속 시트 \"제품설계 ",
  "after": "항) 공란, 부표 R/S 정렬 불완전. 구 체계 양식번호는 삭제하고 양식명만 유지. 부속 시트",
  "kind": "타사번호"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0808 notes",
  "before": "본문 시트3 문서번호 칸에 \"HKP-0812\"로 오기. 개정이력 2행 ",
  "after": "본문 시트3 문서번호 칸의 타 체계 번호 오기를 MD-0808로 정정. 개정이력 2행 ",
  "kind": "타사번호"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0809 notes",
  "before": "본문 시트3 문서번호 칸 \"HKP-0803\" 오기. 평가표에 \"HK고객사\" 등 타사 잔재 표현. 평가표 배점",
  "after": "본문 시트3 문서번호 칸의 타 체계 번호 오기를 MD-0809로 정정. 평가표의 타사 고객사 표현은 \"고객사",
  "kind": "타사번호"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0804 notes",
  "before": "양식번호 \"HKP-0805-01/02\" 등 타 체계 잔재. ",
  "after": "타 체계 양식번호는 삭제하고 양식명만 유지. ",
  "kind": "타사번호"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0805 notes",
  "before": "양식번호 \"HKP-0812-01~05\" 타 체계 잔재.",
  "after": "타 체계 양식번호(01~05)는 삭제하고 양식명만 유지.",
  "kind": "타사번호"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0903 notes",
  "before": "-0902 (내부심사 절차서와 중복), 본문 시트 문서번호 칸 \"HKP-0901\" 표기. 소프트웨어에서 MD",
  "after": "-0902 (내부심사 절차서와 중복), 본문 시트 문서번호 칸의 타 체계 번호는 MD-0903으로 정정. 소",
  "kind": "타사번호"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0703 notes",
  "before": "자격인정 요청서 번호 \"HKB-03-2\" 타 체계 잔재. 검토 메모 ",
  "after": "자격인정 요청서의 타 체계 번호는 삭제하고 양식명만 유지. 검토 메모 ",
  "kind": "타사번호"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-0809 notes",
  "before": "지. 개정이력 0.0~2.0 행 표기. 기록관리 절차서 번호 \"HKB-02\" 타 체계 잔재.",
  "after": "지. 개정이력 0.0~2.0 행 표기. 기록관리 절차서 번호를 MD-0702로 정정.",
  "kind": "타사번호"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0901 notes",
  "before": "에 ISO/TS 16949 구매 PROCESS 템플릿 잔존. 양식번호 미부여.",
  "after": "에 타 규격(자동차) 구매 PROCESS 템플릿 잔존(원본 정리 필요). 양식번호 미부여.",
  "kind": "표준명"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0703 notes",
  "before": " 잔존. 숨김 시트에 ISO/TS 16949 구매 PROCESS 템플릿 잔존. 단조(3톤~3500톤) 등 타",
  "after": " 잔존. 숨김 시트에 타 규격(자동차) 구매 PROCESS 템플릿 잔존(원본 정리 필요). 단조(3톤~350",
  "kind": "표준명"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0803 notes",
  "before": "일부 양식(4M변경신고서 협력사용, 입고 통보서)에 타사명 \"(주)흥국\" 잔존. ",
  "after": "일부 양식(4M변경신고서 협력사용, 입고 통보서)의 타사명은 주식회사 엠에스티로 정정. ",
  "kind": "타사명칭"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0802 '외관부품'",
  "before": "완성 굴삭기 상태에서 보이는 부분",
  "after": "고객 장비에 장착된 상태에서 보이는 부분",
  "kind": "타사명칭"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0802 notes",
  "before": "로 표기. 외관부품 정의가 굴삭기 기준(타 업종 템플릿 잔재로 보임).",
  "after": "로 표기. 외관부품 정의를 타 업종 기준에서 고객 장비 기준으로 정정.",
  "kind": "타사명칭"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0802 '양산승인 취소'",
  "before": "라인 투입 후 중대문제 대책 미실시, 고객 실차 내구 중대결함, 필드 심각 품질문제, 고객 업체 변경",
  "after": "라인 투입 후 중대문제 대책 미실시, 고객 장비 내구 중대결함, 필드 심각 품질문제, 고객 업체 변경",
  "kind": "타사명칭"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-0801 '고객 최종승인'",
  "before": "자체승인 완료, 고객 자체평가 합격, 조립적합성·완성차 품질 합격, 서류 이상 없음",
  "after": "자체승인 완료, 고객 자체평가 합격, 조립적합성·고객 장비 품질 합격, 서류 이상 없음",
  "kind": "타사명칭"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-1001 '위원 (분과장·분과원)'",
  "before": "및 문제점 보고, 분과회의 주 1회, 분과장(공통·건기·단조) 분기 1회 체크시트 평가",
  "after": "및 문제점 보고, 분과회의 주 1회, 분과장 분기 1회 체크시트 평가",
  "kind": "타사명칭"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-0804 '보관·점검'",
  "before": "고현황 점검, 소모성 교체주기별 재고조사, 건기공정 치공구 정기 파손 확인",
  "after": "고현황 점검, 소모성 교체주기별 재고조사, 치공구 정기 파손 확인",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0801-001",
  "before": "적용차종",
  "after": "적용기종",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0807-002",
  "before": ": 순 · 고객명 · 품번 · 품명 · 차종 · 작성일 · 제출일 · 승인진행현황(",
  "after": ": 순 · 고객명 · 품번 · 품명 · 기종 · 작성일 · 제출일 · 승인진행현황(",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0801-004",
  "before": "차종",
  "after": "기종",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0801-006",
  "before": "차종",
  "after": "기종",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0803-002",
  "before": "차종",
  "after": "기종",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0804-001",
  "before": ": 일련번호 · 관리번호 · 고객명 · 차종 · 품번 · 품명 · 제작일 · 규격 ",
  "after": ": 일련번호 · 관리번호 · 고객명 · 기종 · 품번 · 품명 · 제작일 · 규격 ",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0806-001",
  "before": "차종",
  "after": "기종",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0903-002",
  "before": "2) 우리 회사 시트 품질은 좋은 편이다",
  "after": "2) 우리 회사 제품 품질은 좋은 편이다",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0806-002",
  "before": "대책본부 — 대표이사 이영민",
  "after": "대책본부 — 대표이사 김맹권",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0806-002",
  "before": "피해자 지원팀 — 생산팀장(최경 차장)",
  "after": "피해자 지원팀 — 제조팀장",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0806-002",
  "before": "피해 복구팀 — 개발팀장(백홍규 과장)",
  "after": "피해 복구팀 — 개발팀장",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0806-002",
  "before": "사고 조사팀 — 관리팀장(허보학 대리)",
  "after": "사고 조사팀 — 관리팀장",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0806-002",
  "before": "대외 홍보팀 — 품질보증팀장(진영일 과장)",
  "after": "대외 홍보팀 — 품질팀장",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0806-002",
  "before": "it('용인시청', '031-324-2114'), it(",
  "after": "it('천안시청 (서북구)', '대표번호 확인 후 기입'), it(",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0806-002",
  "before": "), it('용인경찰서', '031-339-9112'), it(",
  "after": "), it('천안서북경찰서', '112 (긴급), 대표번호 확인 후 기입'), it(",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0806-002",
  "before": "), it('용인소방서', '031-322-2119'), it(",
  "after": "), it('천안서북소방서', '119 (긴급), 대표번호 확인 후 기입'), it(",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0806-002",
  "before": "), it('아주대병원', '031-219-5114')",
  "after": "), it('인근 응급의료기관', '기관명·연락처 확인 후 기입')",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-006",
  "before": "다기능 평가(금형 셋팅·단조 작업·트리밍 작업)",
  "after": "다기능 평가(설비 세팅·가공 작업·마무리 작업)",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-006",
  "before": "), c('forge', '단조기술'), c(",
  "after": "), c('forge', '가공기술'), c(",
  "kind": "타사명칭"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-005",
  "before": "it('업무능력 6) 단조기술 일반 (5)', ",
  "after": "it('업무능력 6) 가공기술 일반 (5)', ",
  "kind": "타사명칭"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0901 '중/장기 사업계획'",
  "before": "3년 이상, 비젼·장기 전략목표 달성 과제 포함",
  "after": "3년 이상, 비전·장기 전략목표 달성 과제 포함",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MP-0801 '공정설계 및 개발'",
  "before": "QC 공정도 관리 지침서에 따라 수행. 자원: PC·프린트, 원·부자재, 검사장비, 생산장비",
  "after": "QC 공정도 관리 지침서에 따라 수행. 자원: PC·프린터, 원·부자재, 검사장비, 생산장비",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0802 '초도품 검사'",
  "before": "필요시 출장검사. 설변·공정변경·2차 Vender 변경품은 변경항목만 재승인 가능. 부적",
  "after": "필요시 출장검사. 설변·공정변경·2차 Vendor 변경품은 변경항목만 재승인 가능. 부적",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0802 '협력업체 4M·2차 '",
  "before": "협력업체 4M·2차 Vender 변경",
  "after": "협력업체 4M·2차 Vendor 변경",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0802 '협력업체 4M·2차 Vender 변경'",
  "before": "중요공정(열처리·주단조·원재료) 2차 Vender 변경 시 사전 신고·승인. 4M변경통보",
  "after": "중요공정(열처리·주단조·원재료) 2차 Vendor 변경 시 사전 신고·승인. 4M변경통보",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0702",
  "before": "{ t: '화일링', d: ",
  "after": "{ t: '파일링', d: ",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-1001 '3정'",
  "before": "물건), 정위치(정해진 장소), 정량(정해진 량)",
  "after": "물건), 정위치(정해진 장소), 정량(정해진 양)",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-1002 '부적합품 관리'",
  "before": "식별: 적색 용기·부적합 테그·격리. 처리: 반송(구매), 재작업(품",
  "after": "식별: 적색 용기·부적합 태그·격리. 처리: 반송(구매), 재작업(품",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0702 retention",
  "before": "/5년/3년/1년 (각 프로세스·목록표 명시 년한 우선, 없으면 부서장 결정, 기산일 = 발생",
  "after": "/5년/3년/1년 (각 프로세스·목록표 명시 연한 우선, 없으면 부서장 결정, 기산일 = 발생",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0602-001",
  "before": "점) · WEAKNESSES(약점) · OPPERTUNITIES(기회) · THREATS(위협) 4분면",
  "after": "점) · WEAKNESSES(약점) · OPPORTUNITIES(기회) · THREATS(위협) 4분면",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0701-003",
  "before": "중량 · 소요바닥넓이 · 설치장소 · 모타마력",
  "after": "중량 · 소요바닥넓이 · 설치장소 · 모터마력",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0804-004",
  "before": "0.5 Mpa",
  "after": "0.5 MPa",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0804-004",
  "before": "[급유] 공압유니트 LEVEL (시업시)",
  "after": "[급유] 공압유닛 LEVEL (시업시)",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-1001-003",
  "before": "철판 스크렙 방치",
  "after": "철판 스크랩 방치",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0803-002",
  "before": "인은 라인별) 2) 변경 없어도 비고란 \"변경 없슴\" 기입 송부 3) 매월 3일한 송부",
  "after": "인은 라인별) 2) 변경 없어도 비고란 \"변경 없음\" 기입 송부 3) 매월 3일한 송부",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0803-002",
  "before": " 기입 송부 3) 매월 3일한 송부",
  "after": " 기입 송부 3) 매월 3일까지 송부",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0808-002",
  "before": "3 합격/불합격 TAG는 정 위치에 부착 또는 식별 되는가?",
  "after": "3 합격/불합격 TAG는 정위치에 부착 또는 식별 되는가?",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0808-002",
  "before": "격/불합격 TAG는 정위치에 부착 또는 식별 되는가?",
  "after": "격/불합격 TAG는 정위치에 부착 또는 식별되는가?",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0808-002",
  "before": "4 자재 및 제품은 고객별, ITEM별 식별 되도록 구분하여 적재 있는가?",
  "after": "4 자재 및 제품은 고객별, ITEM별 식별되도록 구분하여 적재되어 있는가?",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0808-002",
  "before": "6 보관자재 중 BOX OPEN 및 파손,손상,안전,넘어질 우려는 없는가?",
  "after": "6 보관자재 중 BOX OPEN 및 파손, 손상, 안전, 넘어질 우려는 없는가?",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0808-002",
  "before": "7 제품/자재의 포장 상태는 양호 가?",
  "after": "7 제품/자재의 포장 상태는 양호한가?",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0806-003",
  "before": "담당부서에서 기록. ○ 사고자 서명란은 입원등으로 불가피할시는 차후에 서명",
  "after": "담당부서에서 기록. ○ 사고자 서명란은 입원 등으로 불가피할 시는 차후에 서명",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-0806-003",
  "before": "당해 작업 종사 년도",
  "after": "당해 작업 종사 연수",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-006",
  "before": "숙련도 파악을 위한 기초자료로 활용하고 level up을 하기위함. 숙련도 기준: A등급(90점↑) 감독",
  "after": "숙련도 파악을 위한 기초자료로 활용하고 level up을 하기 위함. 숙련도 기준: A등급(90점↑) 감독",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #1",
  "before": "수입검사 ,공정 검사, 출하 검사, 시장 품질 등 목표 대비",
  "after": "수입검사, 공정 검사, 출하 검사, 시장 품질 등 목표 대비",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #1",
  "before": "수입검사 ,공정 검사, 출하 검사, 시장 품질 등 목표 대비",
  "after": "수입검사, 공정 검사, 출하 검사, 시장 품질 등 목표 대비",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #16",
  "before": "수입, 공장, 출하, 시장 불량에 대한 부적합 처리 절차가 있는가",
  "after": "수입, 공정, 출하, 시장 불량에 대한 부적합 처리 절차가 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #17",
  "before": "수입, 공장, 출하, 시장 불량에 대한 부적합 처리 절차가 있는가 (부",
  "after": "수입, 공정, 출하, 시장 불량에 대한 부적합 처리 절차가 있는가 (부",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #14",
  "before": "출하 검사 설적서",
  "after": "출하 검사 성적서",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #15",
  "before": "출하 검사 설적서",
  "after": "출하 검사 성적서",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #30",
  "before": "클린룸 (준 크린룸 포함) 관리 기준 보유 및 기준대로 관",
  "after": "클린룸 (준 클린룸 포함) 관리 기준 보유 및 기준대로 관",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #31",
  "before": "클린룸 (준 크린룸 포함) 관리 기준 보유 및 기준대로 관",
  "after": "클린룸 (준 클린룸 포함) 관리 기준 보유 및 기준대로 관",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #3",
  "before": "자격 인증 절차서, 평가서., 인증서, 업무분장표, 인증현황 및 식별",
  "after": "자격 인증 절차서, 평가서, 인증서, 업무분장표, 인증현황 및 식별",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #14",
  "before": "출하 검사 업무 절차서, Check Sheet., 검사 이력 관리, 부적합 분석 자료, ",
  "after": "출하 검사 업무 절차서, Check Sheet, 검사 이력 관리, 부적합 분석 자료, ",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #10",
  "before": "수, 전환규칙 소재 별 Aging 외) 2). 검사 기준서 최신.Ver 유지 (개정 1년 이내, 개정 이력 ",
  "after": "수, 전환규칙 소재 별 Aging 외) 2) 검사 기준서 최신 Ver 유지 (개정 1년 이내, 개정 이력 확",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #14",
  "before": "et의 변경 사항 반영 및 Check (설게변경, 5M1E 변경 ) 5) 사양 외 고객",
  "after": "et의 변경 사항 반영 및 Check (설계변경, 5M1E 변경 ) 5) 사양 외 고객",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #16",
  "before": "1) 관련 부서 참여한 분석 활동 2) Qc7가지 도구, 8D,5why 등 체계화된 분석 기법 도입/운영 3",
  "after": "1) 관련 부서 참여한 분석 활동 2) QC 7가지 도구, 8D, 5Why 등 체계화된 분석 기법 도입/운영",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #17",
  "before": "교육 2) 자동화, Jig , 방법 등 FollProof 적용 (효과 검증), 기타 부적합 예방",
  "after": "교육 2) 자동화, Jig , 방법 등 FoolProof 적용 (효과 검증), 기타 부적합 예방",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #18",
  "before": "준 반영) 2) 유휴 계측기 처리 절차(유휴전혼 결정, 처리,식별,보관/사용 전환 절차) 3",
  "after": "준 반영) 2) 유휴 계측기 처리 절차(유휴 전환 결정, 처리,식별,보관/사용 전환 절차) 3",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #18",
  "before": "기준 적용) 4) 검교정 이력 관리 , 성적서 고나리 5) 계측기 사용 추적 관리(대여, 출",
  "after": "기준 적용) 4) 검교정 이력 관리 , 성적서 관리 5) 계측기 사용 추적 관리(대여, 출",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #19",
  "before": "검교정 계측기 필증 부착 및 유효기간 (도금포함)) 2) 비교정 대상 계측기 미 식별 3)",
  "after": "검교정 계측기 필증 부착 및 유효기간 (도금 포함) 2) 비교정 대상 계측기 미 식별 3)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #19",
  "before": "식별 3) 유휴/불량 계측기 미 식별, 현장 바치, 미 시건",
  "after": "식별 3) 유휴/불량 계측기 미 식별, 현장 방치, 미 시건",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #22",
  "before": "절차, 협력사 List, 선정 이력, Qaul 절차 및 이력",
  "after": "절차, 협력사 List, 선정 이력, Qual 절차 및 이력",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #23",
  "before": "절차, 협력사 List, 선정 이력, Qaul 절차 및 이력",
  "after": "절차, 협력사 List, 선정 이력, Qual 절차 및 이력",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #23",
  "before": "1) 거래 협락사 Pool list 최신 ver보유 2)",
  "after": "1) 거래 협력사 Pool list 최신 ver보유 2)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #31",
  "before": "1) 외부 호나경에 대한 보호 관리 * 햇빛 노출, 먼지",
  "after": "1) 외부 환경에 대한 보호 관리 * 햇빛 노출, 먼지",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #34",
  "before": "* 품질 Penalty 이력 있는 경우 등급 별 감정 * Proactive notice 활동",
  "after": "* 품질 Penalty 이력 있는 경우 등급 별 감점 * Proactive notice 활동",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #35",
  "before": "* 품질 Penalty 이력 있는 경우 등급 별 감정 * Proactive notice 활동",
  "after": "* 품질 Penalty 이력 있는 경우 등급 별 감점 * Proactive notice 활동",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #34",
  "before": "ice 활동 가점 (도면 불합리 제안, 슨들기 활동 등)반영",
  "after": "ice 활동 가점 (도면 불합리 제안, 손들기 활동 등)반영",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #35",
  "before": "ice 활동 가점 (도면 불합리 제안, 슨들기 활동 등)반영 (원문: 위와 동일)",
  "after": "ice 활동 가점 (도면 불합리 제안, 손들기 활동 등)반영 (원문: 위와 동일)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #36",
  "before": "집계 기간 내 고객 믈레임 등급 Lv 별 감점 기준 적용한 반영 ",
  "after": "집계 기간 내 고객 클레임 등급 Lv 별 감점 기준 적용한 반영 ",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #3",
  "before": "함. 단, 정확한 근거와 기준을 갖고 Smaple 검사를 할 경우 인정, 기준 미흡상태에",
  "after": "함. 단, 정확한 근거와 기준을 갖고 Sample 검사를 할 경우 인정, 기준 미흡상태에",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #3",
  "before": "수입, 공정, 출하검사 단계별 업무. 분장. 되어. 견제의 기능이 있다.",
  "after": "수입, 공정, 출하검사 단계별 업무 분장되어 견제의 기능이 있다.",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #2",
  "before": "조직도 및 업무저그올(원문) 분리 안 되어 있으면",
  "after": "조직도 및 업무적으로 분리 안 되어 있으면",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #6",
  "before": "수입검사 규정 및 절차 보유하고 잇으나 명확하지 않음",
  "after": "수입검사 규정 및 절차 보유하고 있으나 명확하지 않음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #16",
  "before": "전산 , Excel Daliy 등록 관리",
  "after": "전산 , Excel Daily 등록 관리",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #18",
  "before": "통보 일자 , 대책접수일자, 대책발표, 유효성 평가 일장에 대한 내용 포함 필수",
  "after": "통보 일자 , 대책접수일자, 대책발표, 유효성 평가 일자에 대한 내용 포함 필수",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #19",
  "before": "* 계획 비 일정이 도래하지 않았을 경우 50% 적용",
  "after": "* 계획 대비 일정이 도래하지 않았을 경우 50% 적용",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #20",
  "before": "변경점 고나리(원문) 절차와 관리 기준이 수립되어 있음",
  "after": "변경점 관리 절차와 관리 기준이 수립되어 있음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #20",
  "before": "변경점 과닐(원문) 절차 및 관리 기준 없음",
  "after": "변경점 관리 절차 및 관리 기준 없음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #22",
  "before": "미보휴(원문)",
  "after": "미보유",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #30",
  "before": "별도 구역이 있으며 구부노디어(원문) 관리됨",
  "after": "별도 구역이 있으며 구분되어 관리됨",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #32",
  "before": "* 내부 기준에 ㅈ준함(원문)",
  "after": "* 내부 기준에 준함",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #36",
  "before": "저항, 정전기, 조도 등 특수 측정 : 협려사(원문) 성적서 확인 시 인정. 기타 계측기 선정 원칙",
  "after": "저항, 정전기, 조도 등 특수 측정 : 협력사 성적서 확인 시 인정. 기타 계측기 선정 원칙",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #31",
  "before": "기준서, Chehck Sheet",
  "after": "기준서, Check Sheet",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "courses C01",
  "before": "S Q ISO 9001/9000 원문은 라이센스 문구가 있는 유료 표준 — 앱 내 전문",
  "after": "S Q ISO 9001/9000 원문은 라이선스 문구가 있는 유료 표준 — 앱 내 전문",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "project",
  "before": "Process) 고객 지향 프로세스: 고객을 만나기전 ~ 고객을 만난 후까지 고객을 위해 존",
  "after": "Process) 고객 지향 프로세스: 고객을 만나기 전 ~ 고객을 만난 후까지 고객을 위해 존",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ",
  "before": "→ 22~45번 sub는 공란 처리. 오탈자 원문 그대로. 내부 체크시트(CK-ISO) 1.1~8",
  "after": "→ 22~45번 sub는 공란 처리. 명백한 오탈자만 정정(revisionLog 참조), 그 외 원문 유지.",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #19",
  "before": "변경점 처리 기준을 보유 하고 있는가 ? * 변경점 운영 범위 : 고객, 자체 ",
  "after": "변경점 처리 기준을 보유 하고 있는가? * 변경점 운영 범위 : 고객, 자체 ",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #20",
  "before": "변경점 관리를 실시 하고 있는가 ?",
  "after": "변경점 관리를 실시 하고 있는가?",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #20",
  "before": "변경점 처리 기준을 보유 하고 있는가 ? * 변경점 운영 범위 : 고객, 자체 ",
  "after": "변경점 처리 기준을 보유 하고 있는가? * 변경점 운영 범위 : 고객, 자체 ",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #21",
  "before": "변경점 관리를 실시 하고 있는가 ?",
  "after": "변경점 관리를 실시 하고 있는가?",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MP-0401 '측정'",
  "before": "사업계획 대비 실적 달성율, 내부시스템 심사 실시율, 제조공정 심",
  "after": "사업계획 대비 실적 달성률, 내부시스템 심사 실시율, 제조공정 심",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MP-0801",
  "before": "업체공정감사 합격율 — (업체공정감사 합격수/실시건수)×1",
  "after": "업체공정감사 합격률 — (업체공정감사 합격수/실시건수)×1",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0802 kpis",
  "before": "업체공정감사 합격율 — (업체공정감사 합격수/실시건수)×1",
  "after": "업체공정감사 합격률 — (업체공정감사 합격수/실시건수)×1",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MP-0802",
  "before": "부품 결품율 — {조업정지시간(결품요인)÷가동시간}",
  "after": "부품 결품률 — {조업정지시간(결품요인)÷가동시간}",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0808",
  "before": "부품 결품율 — {조업정지시간(결품요인)÷가동시간}",
  "after": "부품 결품률 — {조업정지시간(결품요인)÷가동시간}",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MP-0803",
  "before": "생산계획 달성율 — (생산수량/생산계획수량)×100 /",
  "after": "생산계획 달성률 — (생산수량/생산계획수량)×100 /",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MP-0804",
  "before": "매출 목표 달성율 — (당월실적/당월계획)×100 / 영",
  "after": "매출 목표 달성률 — (당월실적/당월계획)×100 / 영",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MP-0901 kpis",
  "before": "고객불량 건수 목표달성율 — (목표 건수/발생 건수)×100 /",
  "after": "고객불량 건수 목표달성률 — (목표 건수/발생 건수)×100 /",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0903 '목표지수'",
  "before": "외부: 품질(사내불량율, LINE/FIELD CLAIM), 가",
  "after": "외부: 품질(사내불량률, LINE/FIELD CLAIM), 가",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0903 '목표지수'",
  "before": "경영(LINE 중단율, 매출), 납기(납품율) / 내부: 업무만족도, 의사소통, 복",
  "after": "경영(LINE 중단율, 매출), 납기(납품률) / 내부: 업무만족도, 의사소통, 복",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0903 kpis",
  "before": "고객불량 건수 목표달성율 — (목표 건수/발생 건수)×100 /",
  "after": "고객불량 건수 목표달성률 — (목표 건수/발생 건수)×100 /",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0701 '장비 점검 기준 설정'",
  "before": "항목별로 산출하여 중점 설비 선정 (가동율 극대화, 고장율 최소화). 점검주기: ",
  "after": "항목별로 산출하여 중점 설비 선정 (가동률 극대화, 고장율 최소화). 점검주기: ",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0701 '장비 점검 기준 설정'",
  "before": "여 중점 설비 선정 (가동율 극대화, 고장율 최소화). 점검주기: 주장비·직접 일상",
  "after": "여 중점 설비 선정 (가동율 극대화, 고장률 최소화). 점검주기: 주장비·직접 일상",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MP-0703 kpis",
  "before": "교육계획 달성율 — (실적/계획)×100 / 관리팀, ",
  "after": "교육계획 달성률 — (실적/계획)×100 / 관리팀, ",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0703 kpis",
  "before": "교육계획 달성율 — (실적/계획)×100 / 관리팀, ",
  "after": "교육계획 달성률 — (실적/계획)×100 / 관리팀, ",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MP-0805",
  "before": "입고 불량율 — (불량수/입고수)×1,000,000",
  "after": "입고 불량률 — (불량수/입고수)×1,000,000",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0811 kpis",
  "before": "입고 불량율 — (불량수/입고수)×1,000,000",
  "after": "입고 불량률 — (불량수/입고수)×1,000,000",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-0702 '계수치 평가'",
  "before": "A→B 4회 OK/NG. 효율, 생산자위험율, 소비자위험율 산출, 4회 모두 일치 ",
  "after": "A→B 4회 OK/NG. 효율, 생산자위험률, 소비자위험율 산출, 4회 모두 일치 ",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-0702 '계수치 평가'",
  "before": "K/NG. 효율, 생산자위험율, 소비자위험율 산출, 4회 모두 일치 시 적합. 불합",
  "after": "K/NG. 효율, 생산자위험율, 소비자위험률 산출, 4회 모두 일치 시 적합. 불합",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "kpis K02",
  "before": "업체공정감사 합격율",
  "after": "업체공정감사 합격률",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "kpis K02",
  "before": "표기이나 실제로는 건수로 보임(원문 달성율 50%). 2025-11 외 월 공란",
  "after": "표기이나 실제로는 건수로 보임(원문 달성률 50%). 2025-11 외 월 공란",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "kpis K04",
  "before": "부품 결품율",
  "after": "부품 결품률",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "kpis K06",
  "before": "생산계획 달성율",
  "after": "생산계획 달성률",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "kpis K09",
  "before": "매출 목표 달성율",
  "after": "매출 목표 달성률",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "kpis K11",
  "before": "고객불량 건수 목표달성율",
  "after": "고객불량 건수 목표달성률",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "kpis K12",
  "before": "사업계획 대비 실적 달성율",
  "after": "사업계획 대비 실적 달성률",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "kpis K17",
  "before": "공정불량율",
  "after": "공정불량률",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "kpis K19",
  "before": "교육계획 달성율",
  "after": "교육계획 달성률",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "kpis K20",
  "before": "입고 불량율",
  "after": "입고 불량률",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #9",
  "before": "입고실적 , 불량율 집계",
  "after": "입고실적 , 불량률 집계",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #2",
  "before": "교육 과정의 적합성 3) 계획 대비 실행율 80% 이상 (최근2년) 4) 직무교육",
  "after": "교육 과정의 적합성 3) 계획 대비 실행률 80% 이상 (최근2년) 4) 직무교육",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0902 '연간 감사계획 수립'",
  "before": "년간감사계획, 감사프로그램 수립",
  "after": "연간감사계획, 감사프로그램 수립",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0702 '파일링'",
  "before": "편철, 바인더, 표지에 분류기호·문서명·년도·부서명, 중요 문서 ",
  "after": "편철, 바인더, 표지에 분류기호·문서명·연도·부서명, 중요 문서 ",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0703 '대표이사'",
  "before": "년간 교육계획서 검토/승인, 교육훈련 품의서",
  "after": "연간 교육계획서 검토/승인, 교육훈련 품의서",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0703 '관리팀장'",
  "before": "년간교육계획서 작성 및 검토, 임직원 개인별",
  "after": "연간교육계획서 작성 및 검토, 임직원 개인별",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0703 '교육 필요성 파악'",
  "before": "교육 필요성 파악 → 관리팀장 통보 → 년간 교육계획서 작성 → 대표이사 승인 → ",
  "after": "교육 필요성 파악 → 관리팀장 통보 → 연간 교육계획서 작성 → 대표이사 승인 → ",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-002",
  "before": "년도",
  "after": "연도",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0701-001",
  "before": "년도",
  "after": "연도",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #2",
  "before": "1) 년간 직무 교육훈련 커리큘럼 및 계획서 보유",
  "after": "1) 연간 직무 교육훈련 커리큘럼 및 계획서 보유",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #7",
  "before": "1) 년간 계획을 수립 하고 전 부서 대상 절차대",
  "after": "1) 연간 계획을 수립 하고 전 부서 대상 절차대",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0701 'SPARE PART 관리'",
  "before": "보전담당자 인계, 입출고·재고 파악, 년 1회 현물 실사, 부족분은 구매부서 검토 후",
  "after": "보전담당자 인계, 입출고·재고 파악, 연 1회 현물 실사, 부족분은 구매부서 검토 후",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-0702 '평가계획'",
  "before": "경, 특별특성 신규 선정, 변경 없으면 년 2회",
  "after": "경, 특별특성 신규 선정, 변경 없으면 연 2회",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MP-0401 '출력 산출'",
  "before": "당해년도 사업계획서, 경영검토회의록, 조직도 및",
  "after": "당해연도 사업계획서, 경영검토회의록, 조직도 및",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0702 retention",
  "before": "우선, 없으면 부서장 결정, 기산일 = 발생년도 + 보존년한). PL법 관련 기록 15",
  "after": "우선, 없으면 부서장 결정, 기산일 = 발생연도 + 보존년한). PL법 관련 기록 15",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-0701 '기본원칙'",
  "before": "IND, 폐기, 발행 억제. 보존년한은 발행년도 익년 1월 1일부터 가산",
  "after": "IND, 폐기, 발행 억제. 보존년한은 발행연도 익년 1월 1일부터 가산",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-0701 '보관문서 정리'",
  "before": "CT별 분류, 홀더당 100~150매, 당해년도분, 좌철, A4 기준",
  "after": "CT별 분류, 홀더당 100~150매, 당해연도분, 좌철, A4 기준",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-004",
  "before": "1. 학력 (학교명, 졸업년도, 전공분야(부서명))",
  "after": "1. 학력 (학교명, 졸업연도, 전공분야(부서명))",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-1002-002",
  "before": "NO 부여(예 211019R: 21 재작업년도/10 월/19 일/R 리워크) → 재작",
  "after": "NO 부여(예 211019R: 21 재작업연도/10 월/19 일/R 리워크) → 재작",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0701-003",
  "before": "· 설비명 · 형식 · 제작회사명 · 제작년도 · 제조번호 · 구입가격 · 중량 · ",
  "after": "· 설비명 · 형식 · 제작회사명 · 제작연도 · 제조번호 · 구입가격 · 중량 · ",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0812-002",
  "before": "·관련부품·제조자·제조번호 / 수리기록(수리년월일·수리내용·수리자·금액·비고) / 교정검",
  "after": "·관련부품·제조자·제조번호 / 수리기록(수리연월일·수리내용·수리자·금액·비고) / 교정검",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0812-002",
  "before": "용·수리자·금액·비고) / 교정검사결과(교정년월일·교정결과·확인·비고) (MD-0812 ",
  "after": "용·수리자·금액·비고) / 교정검사결과(교정연월일·교정결과·확인·비고) (MD-0812 ",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0701-003",
  "before": "원본 필드: No. · 설비번호 · 구입년월일 · 설비명 · 형식 · 제작회사명 · ",
  "after": "원본 필드: No. · 설비번호 · 구입연월일 · 설비명 · 형식 · 제작회사명 · ",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0804-005",
  "before": ", '년월'), h(",
  "after": ", '연월'), h(",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0803-002",
  "before": ", '년월'), h(",
  "after": ", '연월'), h(",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0813 retention",
  "before": "기록관리 절차에 따름 (부표 보존년한 칸 공란)",
  "after": "기록관리 절차에 따름 (부표 보존연한 칸 공란)",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0806 retention",
  "before": "원문 기재 없음 (부표 양식번호·보존년한 칸 미기재)",
  "after": "원문 기재 없음 (부표 양식번호·보존연한 칸 미기재)",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0702 retention",
  "before": "부서장 결정, 기산일 = 발생연도 + 보존년한). PL법 관련 기록 15년 이상",
  "after": "부서장 결정, 기산일 = 발생연도 + 보존연한). PL법 관련 기록 15년 이상",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-0701 '기본원칙'",
  "before": "OPEN MIND, 폐기, 발행 억제. 보존년한은 발행연도 익년 1월 1일부터 가산",
  "after": "OPEN MIND, 폐기, 발행 억제. 보존연한은 발행연도 익년 1월 1일부터 가산",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-0701 '보존문서 정리'",
  "before": " 보존년한별 분류, 부서 보관 또는 문서고 이관(",
  "after": " 보존연한별 분류, 부서 보관 또는 문서고 이관(",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MI-0701 '폐기'",
  "before": "안, 구본, COPY·중복, 계약만기, 보존년한 경과 등 → 부서 자체 폐기 또는 품의",
  "after": "안, 구본, COPY·중복, 계약만기, 보존연한 경과 등 → 부서 자체 폐기 또는 품의",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-005",
  "before": "근속년수 (10) — 입사일자·입사부서·근속년수",
  "after": "근속연수 (10) — 입사일자·입사부서·근속년수",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-005",
  "before": "근속년수 (10) — 입사일자·입사부서·근속년수",
  "after": "근속년수 (10) — 입사일자·입사부서·근속연수",
  "kind": "오타"
 },
 {
  "file": "seed-docs.js",
  "where": "MD-0810 '제품보관'",
  "before": "품목별 구분, 선입선출, BOX 덮개, 파레트 적재, 부적합품 식별·격리. 보관품점검",
  "after": "품목별 구분, 선입선출, BOX 덮개, 팔레트 적재, 부적합품 식별·격리. 보관품점검",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0806-001",
  "before": "박스 수량 / 파렛트",
  "after": "박스 수량 / 팔레트",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MI-1001-004",
  "before": "용기·파렛트 파손",
  "after": "용기·팔레트 파손",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #36",
  "before": "요건 내 내용 내포 안되어 있을 경우 미 보유 , 단 100% 사외 교정 실시 하고 ",
  "after": "요건 내 내용 내포 안되어 있을 경우 미보유 , 단 100% 사외 교정 실시 하고 ",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #11",
  "before": "수 검사 실시 * 기준 모호, 품질특성 미 고려한 계측기를 활용한 상태 진행시 신뢰성 ",
  "after": "수 검사 실시 * 기준 모호, 품질특성 미고려한 계측기를 활용한 상태 진행시 신뢰성 ",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #19",
  "before": "(도금 포함) 2) 비교정 대상 계측기 미 식별 3) 유휴/불량 계측기 미 식별, 현장",
  "after": "(도금 포함) 2) 비교정 대상 계측기 미식별 3) 유휴/불량 계측기 미 식별, 현장",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #19",
  "before": "계측기 미 식별 3) 유휴/불량 계측기 미 식별, 현장 방치, 미 시건",
  "after": "계측기 미 식별 3) 유휴/불량 계측기 미식별, 현장 방치, 미 시건",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #19",
  "before": "휴/불량 계측기 미 식별, 현장 방치, 미 시건",
  "after": "휴/불량 계측기 미 식별, 현장 방치, 미시건",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #1",
  "before": "만 관리, 경영(책임)자 주관 품질회의 미 진행 or 누락",
  "after": "만 관리, 경영(책임)자 주관 품질회의 미진행 or 누락",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #1",
  "before": "회의록, 결재 문서 없을 시 품질 회의 미 진행으로 처리",
  "after": "회의록, 결재 문서 없을 시 품질 회의 미진행으로 처리",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #6",
  "before": "규정,기준 미 보유",
  "after": "규정,기준 미보유",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #7",
  "before": "핵심 품목 list 미 보유",
  "after": "핵심 품목 list 미보유",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #13",
  "before": "현장 공정별 (장비 앞) 미 비치",
  "after": "현장 공정별 (장비 앞) 미비치",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #18",
  "before": "* 검사 실적(현황) 미 관리시 0점 -> 불량 현황 파악 안됨",
  "after": "* 검사 실적(현황) 미관리시 0점 -> 불량 현황 파악 안됨",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #19",
  "before": "* 검사 실적 (현황) 미 관리 시 0점 -> 불량 현황 파악 안됨",
  "after": "* 검사 실적 (현황) 미관리 시 0점 -> 불량 현황 파악 안됨",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #25",
  "before": "창고 미보유 (보관구역 미 표시)",
  "after": "창고 미보유 (보관구역 미표시)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #31",
  "before": "및 기준 없음 (Check Sheet 미 운영시)",
  "after": "및 기준 없음 (Check Sheet 미운영시)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #31",
  "before": "* 클린룸 미 적용 업태의 경우 5S 관리기준으로 대체",
  "after": "* 클린룸 미적용 업태의 경우 5S 관리기준으로 대체",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #32",
  "before": "* 클린룸 미 적용 업태의 경우 5s 중 청결 상태로 대체",
  "after": "* 클린룸 미적용 업태의 경우 5s 중 청결 상태로 대체",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #33",
  "before": "* 클린룸 미 적용 업태의 경우 복장 상태 점검 (실내/실",
  "after": "* 클린룸 미적용 업태의 경우 복장 상태 점검 (실내/실",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #36",
  "before": "치수, 외관 포함 일부 미 보증",
  "after": "치수, 외관 포함 일부 미보증",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #36",
  "before": "50% 이상 미 보증",
  "after": "50% 이상 미보증",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #37",
  "before": "요건 내 내용 내포 안되어 있을 경우 미 보유 , 단 100% 사외 교정 실시 하고 ",
  "after": "요건 내 내용 내포 안되어 있을 경우 미보유 , 단 100% 사외 교정 실시 하고 ",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-001",
  "before": "품질목표 달성에 공헌 할 수 있겠는가?",
  "after": "품질목표 달성에 공헌할 수 있겠는가?",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-001",
  "before": "교육 대상자가 전원 참석 하였는가?",
  "after": "교육 대상자가 전원 참석하였는가?",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0903-002",
  "before": ") 나는 우리 회사를 외부에 자랑스럽게 이야기 한다",
  "after": ") 나는 우리 회사를 외부에 자랑스럽게 이야기한다",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-006",
  "before": "기준: A등급(90점↑) 감독을 받아서 수행 할 수 있는 수준 / B등급(80점↑) 다른",
  "after": "기준: A등급(90점↑) 감독을 받아서 수행할 수 있는 수준 / B등급(80점↑) 다른",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-006",
  "before": "수준 / B등급(80점↑) 다른 인원을 교육 할 수 있는 수준 / C등급(70점↑) 지도",
  "after": "수준 / B등급(80점↑) 다른 인원을 교육할 수 있는 수준 / C등급(70점↑) 지도",
  "kind": "오타"
 },
 {
  "file": "seed-forms.js",
  "where": "MD-0703-006",
  "before": "/ C등급(70점↑) 지도 없이 혼자서 수행 할 수 있는 수준 / D등급(69점↓) 지도",
  "after": "/ C등급(70점↑) 지도 없이 혼자서 수행할 수 있는 수준 / D등급(69점↓) 지도",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #1",
  "before": "검사, 시장 품질 등 목표 대비 실적이 관리 되며 보고 되고 있는가?",
  "after": "검사, 시장 품질 등 목표 대비 실적이 관리되며 보고 되고 있는가?",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #1",
  "before": "품질 등 목표 대비 실적이 관리 되며 보고 되고 있는가?",
  "after": "품질 등 목표 대비 실적이 관리 되며 보고되고 있는가?",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #5",
  "before": "규정 (최신본 개정 여부) 및 절차를 보유 하고 있는가",
  "after": "규정 (최신본 개정 여부) 및 절차를 보유하고 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #6",
  "before": "유형)별로 수입검사 기준(표준)을 별도 보유 하고 있는가",
  "after": "유형)별로 수입검사 기준(표준)을 별도 보유하고 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #7",
  "before": "수입검사 기준에 따른 검사가 실시 되었는가 검사 수량 및 판정결과가 검사기준을",
  "after": "수입검사 기준에 따른 검사가 실시되었는가 검사 수량 및 판정결과가 검사기준을",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #9",
  "before": "수입검사 결과에 대한 실적(현황) 관리 하고 있는가 ( 실적 : Raw Data ,",
  "after": "수입검사 결과에 대한 실적(현황) 관리하고 있는가 ( 실적 : Raw Data ,",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #10",
  "before": ", 조립도면, Check Sheet)를 보유 하고 있는가. (이력대장 포함 된 최신 SO",
  "after": ", 조립도면, Check Sheet)를 보유하고 있는가. (이력대장 포함 된 최신 SO",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #10",
  "before": "et)를 보유 하고 있는가. (이력대장 포함 된 최신 SOP 관리)",
  "after": "et)를 보유 하고 있는가. (이력대장 포함된 최신 SOP 관리)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #11",
  "before": "r 협력사 자체 C/S)에 따라 검사가 실시 되고 있는가 (실 작업자 Check 여부, ",
  "after": "r 협력사 자체 C/S)에 따라 검사가 실시되고 있는가 (실 작업자 Check 여부, ",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #12",
  "before": "가 쉽게 열람할 수 있도록 해당 공정에 비치 되어 있는가",
  "after": "가 쉽게 열람할 수 있도록 해당 공정에 비치되어 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #15",
  "before": "출하 검사 결과에 대한 실적 (현황) 관리 하고 있는가 (실적 : Raw data , ",
  "after": "출하 검사 결과에 대한 실적 (현황) 관리하고 있는가 (실적 : Raw data , ",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #18",
  "before": "대책에 대한 유효성 (사후관리) 평가는 실시 하고 있는가",
  "after": "대책에 대한 유효성 (사후관리) 평가는 실시하고 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #19",
  "before": "변경점 처리 기준을 보유 하고 있는가? * 변경점 운영 범위 : 고객",
  "after": "변경점 처리 기준을 보유하고 있는가? * 변경점 운영 범위 : 고객",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #20",
  "before": "변경점 관리를 실시 하고 있는가?",
  "after": "변경점 관리를 실시하고 있는가?",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #24",
  "before": "_ 현장 내 선반 또는 지정된 장소에 보관 되어 있는가 )",
  "after": "_ 현장 내 선반 또는 지정된 장소에 보관되어 있는가 )",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #26",
  "before": "창고 5S 상태 확인 및 정기적 점검은 실시 하고 있는가 (부품 현장 투입시 Proces",
  "after": "창고 5S 상태 확인 및 정기적 점검은 실시하고 있는가 (부품 현장 투입시 Proces",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #27",
  "before": "ocess 시 _ 현장 내 자재 보관을 준수 하고 있는가)",
  "after": "ocess 시 _ 현장 내 자재 보관을 준수하고 있는가)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #31",
  "before": "현장 Particle Spec 관리는 준수 되고 있는가",
  "after": "현장 Particle Spec 관리는 준수되고 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #32",
  "before": "클린복, 신발, 모자, 장갑 관리는 양호 한가",
  "after": "클린복, 신발, 모자, 장갑 관리는 양호한가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #33",
  "before": "y Spec 합격 관리 및 관리 대장이 운영 되고 있는가 (관리대장 : 소모품 교체, 필",
  "after": "y Spec 합격 관리 및 관리 대장이 운영되고 있는가 (관리대장 : 소모품 교체, 필",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #35",
  "before": "검사에 필요한 계측기 /Jig는 확보 되어 있는가 (피 측정물의 재질, 형상, 정",
  "after": "검사에 필요한 계측기 /Jig는 확보되어 있는가 (피 측정물의 재질, 형상, 정",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #36",
  "before": "계측기 관리 기준을 보유 하고 있는가 * 사외, 사내 교정, 비교정,",
  "after": "계측기 관리 기준을 보유하고 있는가 * 사외, 사내 교정, 비교정,",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #36",
  "before": "경우 미보유 , 단 100% 사외 교정 실시 하고 있으며 비교정, 유휴 없을 경우 ISO",
  "after": "경우 미보유 , 단 100% 사외 교정 실시하고 있으며 비교정, 유휴 없을 경우 ISO",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #37",
  "before": "t에 의한 현황 관리가 최신 Ver으로 관리 되고 있는가 (품명, 기기번호, 구입일, 교",
  "after": "t에 의한 현황 관리가 최신 Ver으로 관리되고 있는가 (품명, 기기번호, 구입일, 교",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #38",
  "before": "교정을 실시 하고 있으며 성적서가 관리되고 있는가 (최근",
  "after": "교정을 실시하고 있으며 성적서가 관리되고 있는가 (최근",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #41",
  "before": "Tool은 전용 보관 장소에 식별되어 보관 되어 있는가",
  "after": "Tool은 전용 보관 장소에 식별되어 보관되어 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-ISO #42",
  "before": "주기적으로 점검을 실시 하는가 (Check Sheet)",
  "after": "주기적으로 점검을 실시하는가 (Check Sheet)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #6",
  "before": "획에 따라 사후/갱신 심사가 정기적으로 진행 됨 2) 심사 부적합/권고사항 시정 조치 ",
  "after": "획에 따라 사후/갱신 심사가 정기적으로 진행됨 2) 심사 부적합/권고사항 시정 조치 ",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "checklists CK-NSSQ #7",
  "before": "1) 연간 계획을 수립 하고 전 부서 대상 절차대로 시행 2) 지적",
  "after": "1) 연간 계획을 수립하고 전 부서 대상 절차대로 시행 2) 지적",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #1",
  "before": "검사, 시장 품질 등 목표 대비 실적이 관리 되며 보고 되고 있는가? (주(월)간 품질회",
  "after": "검사, 시장 품질 등 목표 대비 실적이 관리되며 보고 되고 있는가? (주(월)간 품질회",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #1",
  "before": "품질 등 목표 대비 실적이 관리 되며 보고 되고 있는가? (주(월)간 품질회의 보고서)",
  "after": "품질 등 목표 대비 실적이 관리 되며 보고되고 있는가? (주(월)간 품질회의 보고서)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #2",
  "before": "조직도 및 업무적으로 분리 되어 있으면",
  "after": "조직도 및 업무적으로 분리되어 있으면",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #3",
  "before": ", 출하검사 단계 중 2단계 업무 분장 중복 되어 견제 기능이 부족 하다",
  "after": ", 출하검사 단계 중 2단계 업무 분장 중복되어 견제 기능이 부족 하다",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #3",
  "before": "단계 업무 분장 중복 되어 견제 기능이 부족 하다",
  "after": "단계 업무 분장 중복 되어 견제 기능이 부족하다",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #3",
  "before": "정, 출하검사 단계 중 모든 업무 분장 중복 되어 견제 기능이 불가 하다",
  "after": "정, 출하검사 단계 중 모든 업무 분장 중복되어 견제 기능이 불가 하다",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #3",
  "before": "모든 업무 분장 중복 되어 견제 기능이 불가 하다",
  "after": "모든 업무 분장 중복 되어 견제 기능이 불가하다",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #4",
  "before": "급되어 있어야 하며 평가는 이론/실기가 병행 되어야 한다.",
  "after": "급되어 있어야 하며 평가는 이론/실기가 병행되어야 한다.",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #5",
  "before": "인력 자격인증 기준이 있으며, 주기적 운영 되고 있는가 (외주 인력 포함)",
  "after": "인력 자격인증 기준이 있으며, 주기적 운영되고 있는가 (외주 인력 포함)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #5",
  "before": "급되어 있어야 하며 평가는 이론/실기가 병행 되어야 한다.",
  "after": "급되어 있어야 하며 평가는 이론/실기가 병행되어야 한다.",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #6",
  "before": "규정 (최신본 개정 여부) 및 절차를 보유 하고 있는가 * 규정/절차 : Samplin",
  "after": "규정 (최신본 개정 여부) 및 절차를 보유하고 있는가 * 규정/절차 : Samplin",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #6",
  "before": "입검사 대상 비대상 구분 및 기준서대로 진행 되는가",
  "after": "입검사 대상 비대상 구분 및 기준서대로 진행되는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #7",
  "before": "유형)별로 수입검사 기준(표준)을 별도 보유 하고 있는가",
  "after": "유형)별로 수입검사 기준(표준)을 별도 보유하고 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #7",
  "before": "핵심 품목 지정 되어 있으며 검사 기준서 100% 보유",
  "after": "핵심 품목 지정되어 있으며 검사 기준서 100% 보유",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #7",
  "before": "핵심 품목 지정 되어 있으며 검사 기준서 누락 있음",
  "after": "핵심 품목 지정되어 있으며 검사 기준서 누락 있음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #7",
  "before": "측기/Jig 사용 방법, 기록 관리 등 구체화 되어 있어야 한다.",
  "after": "측기/Jig 사용 방법, 기록 관리 등 구체화되어 있어야 한다.",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #8",
  "before": "수입검사 기준에 따른 검사가 실시 되었는가 검사 수량 및 판정결과가 검사기준을",
  "after": "수입검사 기준에 따른 검사가 실시되었는가 검사 수량 및 판정결과가 검사기준을",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #10",
  "before": "수입검사 결과에 대한 실적(현황) 관리 하고 있는가 ( 실적 : Raw Data ,",
  "after": "수입검사 결과에 대한 실적(현황) 관리하고 있는가 ( 실적 : Raw Data ,",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #11",
  "before": ", 조립도면, Check Sheet)를 보유 하고 있는가. (이력대장 포함 된 최신 SO",
  "after": ", 조립도면, Check Sheet)를 보유하고 있는가. (이력대장 포함 된 최신 SO",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #11",
  "before": "et)를 보유 하고 있는가. (이력대장 포함 된 최신 SOP 관리)",
  "after": "et)를 보유 하고 있는가. (이력대장 포함된 최신 SOP 관리)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #11",
  "before": "이력 대장 및 SOP가 Match 되어 관리 되고 있다",
  "after": "이력 대장 및 SOP가 Match 되어 관리되고 있다",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #11",
  "before": "이력 대장 없이 SOP 만 보유 하고 있다",
  "after": "이력 대장 없이 SOP 만 보유하고 있다",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #11",
  "before": "1년 이상 개정이 누락 되어 있다",
  "after": "1년 이상 개정이 누락되어 있다",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #12",
  "before": "r 협력사 자체 C/S)에 따라 검사가 실시 되고 있는가 (실 작업자 Check 여부, ",
  "after": "r 협력사 자체 C/S)에 따라 검사가 실시되고 있는가 (실 작업자 Check 여부, ",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #13",
  "before": "가 쉽게 열람할 수 있도록 해당 공정에 비치 되어 있는가",
  "after": "가 쉽게 열람할 수 있도록 해당 공정에 비치되어 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #13",
  "before": "관리 유, 현장 공정별 (or 장비별) 비치 하고 있음",
  "after": "관리 유, 현장 공정별 (or 장비별) 비치하고 있음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #13",
  "before": "유, 현장 공정별 (or 장비별) 일부 비치 하고 있음",
  "after": "유, 현장 공정별 (or 장비별) 일부 비치하고 있음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #16",
  "before": "출하 검사 결과에 대한 실적 (현황) 관리 하고 있는가 (실적 : Raw data , ",
  "after": "출하 검사 결과에 대한 실적 (현황) 관리하고 있는가 (실적 : Raw data , ",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #17",
  "before": "검사 단계 별 절차를 보유 하고 있으며 관리 항목이 명확하게 기술 되어",
  "after": "검사 단계 별 절차를 보유하고 있으며 관리 항목이 명확하게 기술 되어",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #17",
  "before": "보유 하고 있으며 관리 항목이 명확하게 기술 되어 있음",
  "after": "보유 하고 있으며 관리 항목이 명확하게 기술되어 있음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #17",
  "before": "검사 단계 별 절차를 1건 이하 보유 하고 있지 않거나 관리항목이 불명확함",
  "after": "검사 단계 별 절차를 1건 이하 보유하고 있지 않거나 관리항목이 불명확함",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #19",
  "before": "대책에 대한 유효성 (사후관리) 평가는 실시 하고 있는가",
  "after": "대책에 대한 유효성 (사후관리) 평가는 실시하고 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #20",
  "before": "변경점 처리 기준을 보유 하고 있는가? * 변경점 운영 범위 : 고객",
  "after": "변경점 처리 기준을 보유하고 있는가? * 변경점 운영 범위 : 고객",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #21",
  "before": "변경점 관리를 실시 하고 있는가?",
  "after": "변경점 관리를 실시하고 있는가?",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #21",
  "before": "sk 검토를 실시하며, 승인 후 현장에 적용 되고 있음",
  "after": "sk 검토를 실시하며, 승인 후 현장에 적용되고 있음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #21",
  "before": "변경점 Risk 검토를 실시하나, 승인 되지 않은채 적용 되고 있음",
  "after": "변경점 Risk 검토를 실시하나, 승인되지 않은채 적용 되고 있음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #21",
  "before": "k 검토를 실시하나, 승인 되지 않은채 적용 되고 있음",
  "after": "k 검토를 실시하나, 승인 되지 않은채 적용되고 있음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #21",
  "before": "변경점 Risk 검토 되지 않거나 변경점 관리 사항 없음",
  "after": "변경점 Risk 검토되지 않거나 변경점 관리 사항 없음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #22",
  "before": "(평가 대상, 주기, 거래유지 등 내용 내포 되어야 함)",
  "after": "(평가 대상, 주기, 거래유지 등 내용 내포되어야 함)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #23",
  "before": "기준대로 시행 되고 있음",
  "after": "기준대로 시행되고 있음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #25",
  "before": "_ 현장 내 선반 또는 지정된 장소에 보관 되어 있는가 )",
  "after": "_ 현장 내 선반 또는 지정된 장소에 보관되어 있는가 )",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #27",
  "before": "창고 5S 상태 확인 및 정기적 점검은 실시 하고 있는가 (부품 현장 투입시 Proces",
  "after": "창고 5S 상태 확인 및 정기적 점검은 실시하고 있는가 (부품 현장 투입시 Proces",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #28",
  "before": "ocess 시 _ 현장 내 자재 보관을 준수 하고 있는가)",
  "after": "ocess 시 _ 현장 내 자재 보관을 준수하고 있는가)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #29",
  "before": "식별 되고 있음",
  "after": "식별되고 있음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #30",
  "before": "별도 구역이 없는 상태에서 식별되어 관리 됨",
  "after": "별도 구역이 없는 상태에서 식별되어 관리됨",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #32",
  "before": "현장 Particle Spec 관리는 준수 되고 있는가",
  "after": "현장 Particle Spec 관리는 준수되고 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #33",
  "before": "클린복, 신발, 모자, 장갑 관리는 양호 한가",
  "after": "클린복, 신발, 모자, 장갑 관리는 양호한가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #34",
  "before": "y Spec 합격 관리 및 관리 대장이 운영 되고 있는가 (관리대장 : 소모품 교체, 필",
  "after": "y Spec 합격 관리 및 관리 대장이 운영되고 있는가 (관리대장 : 소모품 교체, 필",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #36",
  "before": "검사에 필요한 계측기 /Jig는 확보 되어 있는가 (피 측정물의 재질, 형상, 정",
  "after": "검사에 필요한 계측기 /Jig는 확보되어 있는가 (피 측정물의 재질, 형상, 정",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #37",
  "before": "계측기 관리 기준을 보유 하고 있는가 * 사외, 사내 교정, 비교정,",
  "after": "계측기 관리 기준을 보유하고 있는가 * 사외, 사내 교정, 비교정,",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #37",
  "before": "경우 미보유 , 단 100% 사외 교정 실시 하고 있으며 비교정, 유휴 없을 경우 ISO",
  "after": "경우 미보유 , 단 100% 사외 교정 실시하고 있으며 비교정, 유휴 없을 경우 ISO",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #37",
  "before": "보유 하고 있음",
  "after": "보유하고 있음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #38",
  "before": "t에 의한 현황 관리가 최신 Ver으로 관리 되고 있는가 (품명, 기기번호, 구입일, 교",
  "after": "t에 의한 현황 관리가 최신 Ver으로 관리되고 있는가 (품명, 기기번호, 구입일, 교",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #38",
  "before": "(비교정품 포함)에 대한 List 가 기록 되어 있어야 함",
  "after": "(비교정품 포함)에 대한 List 가 기록되어 있어야 함",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #39",
  "before": "교정을 실시 하고 있으며 성적서가 관리되고 있는가 (최근",
  "after": "교정을 실시하고 있으며 성적서가 관리되고 있는가 (최근",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #39",
  "before": "* List & 성적서와 일치 할 것 (sample 5 개 이상 실물 확인",
  "after": "* List & 성적서와 일치할 것 (sample 5 개 이상 실물 확인",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #40",
  "before": "식별 되고 있음",
  "after": "식별되고 있음",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #41",
  "before": "어 있고, List와 보관함 내 물품이 일치 할 것",
  "after": "어 있고, List와 보관함 내 물품이 일치할 것",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #42",
  "before": "Tool은 전용 보관 장소에 식별되어 보관 되어 있는가",
  "after": "Tool은 전용 보관 장소에 식별되어 보관되어 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #43",
  "before": "주기적으로 점검을 실시 하는가 (Check Sheet)",
  "after": "주기적으로 점검을 실시하는가 (Check Sheet)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #44",
  "before": "도면이 현장에 방치 되어 있거나 성적서로 활용 되고 있는가",
  "after": "도면이 현장에 방치되어 있거나 성적서로 활용 되고 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #44",
  "before": "면이 현장에 방치 되어 있거나 성적서로 활용 되고 있는가",
  "after": "면이 현장에 방치 되어 있거나 성적서로 활용되고 있는가",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #44",
  "before": "해서는 안됨 - 납품 대기 제품에 동봉 포장 되어 있거나 활용되면 안됨",
  "after": "해서는 안됨 - 납품 대기 제품에 동봉 포장되어 있거나 활용되면 안됨",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #44",
  "before": "사 거래 이력이 없는 신규사는 현장에서 가이드 해 줄 것",
  "after": "사 거래 이력이 없는 신규사는 현장에서 가이드해 줄 것",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #45",
  "before": "및 모든 사업자 소재지가 사업자등록증에 등재 될 것 (본점, 소재지, 종된 사업장 중)",
  "after": "및 모든 사업자 소재지가 사업자등록증에 등재될 것 (본점, 소재지, 종된 사업장 중)",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "custEval SEMES-SSQ #45",
  "before": "* 해당 회사명과 사업자등록명과 동일 할 것",
  "after": "* 해당 회사명과 사업자등록명과 동일할 것",
  "kind": "오타"
 },
 {
  "file": "seed-audit.js",
  "where": "project",
  "before": "전 ~ 고객을 만난 후까지 고객을 위해 존재 하는 프로세스 - COP 프로세스, 절차서,",
  "after": "전 ~ 고객을 만난 후까지 고객을 위해 존재하는 프로세스 - COP 프로세스, 절차서,",
  "kind": "오타"
 },
  {file:'seed-forms.js', where:'업종 정합', before:"h('car', '기종'), h('partNo', '품번'), h('coil', '코일 NO'), h('lo", after:"h('model', '고객 장비/모델'), h('partNo', '품번'), h('lot', '원자재 LOT", kind:'타사내용'},
  {file:'seed-forms.js', where:'업종 정합', before:'(대상: Press품)', after:'(대상: 가공품)', kind:'타사내용'},
  {file:'seed-forms.js', where:'업종 정합', before:"'3정5S 체크시트(프레스 라인)'", after:"'3정5S 체크시트(가공 라인)'", kind:'타사내용'},
  {file:'seed-forms.js', where:'업종 정합', before:"chk5s('3구역 프레스 라인'", after:"chk5s('3구역 가공 라인'", kind:'타사내용'},
  {file:'seed-forms.js', where:'업종 정합', before:"'프레스 설비 기름·먼지·누유'", after:"'가공 설비(CNC) 절삭유·칩·누유'", kind:'타사내용'}
];
