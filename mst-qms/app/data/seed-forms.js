/* 출처: Google Drive MST / 2. 프로세스_절차서_지침_양식 / 4. 양식 (+ 3. SP / 03 교육훈련 / 자료)
   양식 원본(B-01~B-60) → 문서체계표(S.formList) 양식번호로 매핑한 전자기록 구조.
   관리대장(Q.REG_LIST) 및 전용 화면(SPECIAL) 양식은 url·note·retention·approval 위주로만 보강. */
window.SEED = window.SEED || {};
(function () {
  var G = 'https://docs.google.com/spreadsheets/d/', P = 'https://docs.google.com/presentation/d/';
  function c(k, label, options, type) { var o = { k: k, label: label }; if (options) o.options = options; if (type) o.type = type; return o; }
  function h(k, label, type, options) { var o = { k: k, label: label }; if (type) o.type = type; if (options) o.options = options; return o; }
  function it(text, std) { return std ? { text: text, std: std } : { text: text }; }
  var OKNG = ['OK', 'NG'], PASS = ['합격', '불합격'], A3 = ['작성', '검토', '승인'];
  var S5 = ['5', '4', '3', '2', '1'], S8 = ['8', '6', '4', '2', '1'];

  /* ── 3정5S 체크시트 공통 (B-24) ── */
  function chk5s(zone, scale, items, total) {
    return {
      url: G + '1au2VPWLDXNbqaowO70rr3-AtmGSPssw0Rj29pCEQdEg', srcTitle: 'MP_개선_3정5행 실행계획서 및 체크 시트 양식', cycle: '매월',
      purpose: zone + ' 3정5S 월별 CHECK SHEET (' + total + '점 만점). ※ 매월 첫째주 금요일 점검 실시 / ※ 체크항목당 점수 3점 이하는 개선대책 수립',
      header: [h('zone', '구역'), h('mgr1', '관리 책임자(정)'), h('mgr2', '관리 책임자(부)'), h('evaluator', '평가자'), h('total', '합계', 'number'),
        h('grade', '등급', 'select', ['A 우수', 'B 양호', 'C 보통', 'D 미흡'])],
      tableTitle: 'CHECK 항목',
      cols: [c('item', 'CHECK 항목'), c('cat', '구분'), c('score', '평점', scale), c('max', '배점'), c('obs', '지적사항/관찰사항'), c('etc', '기타사항')],
      items: items, approval: A3
    };
  }
  function grp(cat, arr) { return arr.map(function (t) { return it(t, cat); }); }

  window.SEED.formDetails = {
    /* ───────── SP 지원 ───────── */
    'MI-0701-002': { // B-01 (전용 화면: 문서관리)
      url: G + '1_dcNOdoBTvyd-o5StL1nae5bKyg28Z84zlAR9p5ZgM8', srcTitle: 'SP_문서화된정보문서등록대장', retention: '영구', cycle: '수시',
      purpose: '제·개정 문서의 문서명·문서번호·개정차수(0~9차) 등록 대장',
      cols: [c('name', '문서명'), c('no', '문서번호'), c('rev', '개정차수'), c('remark', '비고')]
    },
    'MI-0701-001': { // B-02
      url: G + '1_nXo-k7PrsjITzx72seHfh6yDHC_qb1kZdoUt5RDqUQ', srcTitle: 'SP_문서화된정보_개정전후변경현황', cycle: '수시',
      purpose: '문서 개정 시 개정 전·후 변경 내용 대비 기록 (MD-0702 9.8항)',
      header: [h('regDept', '등록부서', 'dept'), h('dept', '작성부서', 'dept'), h('writer', '작성자', 'user')],
      tableTitle: '개정 전·후 변경현황',
      cols: [c('std', '표준명'), c('before', '개정 전'), c('after', '개정 후'), c('remark', '비고')],
      approval: A3
    },
    'MD-0703-002': { // B-03 (전용 화면: 교육훈련)
      url: G + '1zfChDVw7ct9dc_tmqi-VulmFf5fB-XqJfWqtEySHFbo', srcTitle: 'SP_교육훈련_교육훈련계획서', cycle: '년',
      purpose: '연간 교육훈련 계획 (MD-0703 5.1) — 범례: 계획 / 실시',
      header: [h('year', '연도'), h('dept', '부서명', 'dept'), h('writer', '작성자', 'user')],
      tableTitle: '교육 훈련 계획',
      cols: [c('course', '교육(과정)명'), c('target', '교육대상'), c('kind', '구분', ['사내', '사외']), c('plan', '교육일정(계획 월)'), c('done', '실시(월)'), c('remark', '비고')],
      approval: A3
    },
    'MD-0703-001': { // B-04 (전용 화면: 교육훈련)
      url: G + '1RCy6HtJUJBmPyFyND8Yy_Nt_I1zqNexOmgzEstYj7q4', srcTitle: 'SP_교육훈련_교육훈련결과보고서', cycle: '수시',
      purpose: '교육 훈련 결과 보고서(교육일지) 및 교육결과 효과성 평가 (MD-0703 5.3). ※평가결과 NG일 경우 특기사항란에 사유기재',
      header: [h('dept', '부서명', 'dept'), h('when', '교육일시'), h('course', '교육과정명'), h('place', '교육장소'), h('trainer', '교육실시자'),
        h('target', '대상(명)', 'number'), h('attend', '참석(명)', 'number'), h('content', '교육내용', 'textarea'), h('special', '특기사항', 'textarea'),
        h('method', '평가 방법', 'select', ['부서장평가', '시험', '훈련', '기타']), h('trainees', '피교육자 명단(성명)', 'textarea')],
      tableTitle: '교육결과 효과성 평가',
      cols: [c('q', '평가 항목'), c('r', '판정', OKNG), c('remark', '비고')],
      items: [it('교육 내용은 참석자에게 충족되는가?'), it('품질목표 달성에 공헌할 수 있겠는가?'), it('교육 대상자가 전원 참석하였는가?'),
        it('교육이 효과적으로 업무에 반영되겠는가?'), it('참가자가 교육내용을 충분히 이해하는가?'), it('교육 시간에 참가자의 태도는 양호한가?')],
      approval: A3
    },
    'MD-0703-003': { // B-05 / B-58 (관리대장)
      url: G + '1xh03s5M7PP2M6dwofGVnTrnSg_X_IauWqxZKL-VwwvM', srcTitle: 'SP_교육훈련_자격인증관리대장',
      note: '원본 컬럼: NO · 자격인증범위 · 부서명 · 사번 · 성명 · 인증일자 · 학력 · 입사일 · 확인 · 비고. 별도 양식 "자격인정관리대장"(등록번호·자격명·부서명·성명·등록일자·승인·비고): ' + G + '1w4jJVhny4CbZEzSOS5EfwKnXNLQLX-o0Aih7hkdqHig'
    },
    'MD-0703-004': { // B-06
      url: G + '12xDUqs1GI-LxZhrl2GaLy3dKiViC0DAcHxo0_YYgcNU', srcTitle: 'SP_교육훈련_자격인증평가표', cycle: '수시',
      purpose: '자격인증 평가표 — 평가 후 "인적자원관리프로세스에 따라 위의 사람을 (자격)으로 인정함" (MD-0703 5.4~5.6)',
      header: [h('qual', '자격명'), h('dept', '부서', 'dept'), h('empNo', '사번'), h('joined', '입사일', 'date'), h('name', '성명', 'user'),
        h('total', '평점계', 'number'), h('recert', '자격 재인증 일자')],
      tableTitle: '자격인증요구사항 평가',
      cols: [c('req', '자격인증요구사항'), c('std', '평가기준'), c('score', '배점'), c('remark', '비고')],
      items: [
        it('1. 학력 (학교명, 졸업연도, 전공분야(부서명))', '1.전문대학졸업(인문,자연)이상 2.실업고졸 3.인문고졸 4.중졸 — 배점 35/20/15/15/5'),
        it('2. 경력(당사 근무기간 포함) (회사명, 근무기간(개월), 근무분야)', '기준 1~5 — 배점 35/25/20/15/5'),
        it('3. 숙련도', '상(매우우수) 30 / 상중(우수) 20 / 중(보통) 15 / 중하(약간미흡) 10 / 하(미흡) 5'),
        it('4. 교육훈련 (사외: 교육과정명·이수기간·교육기간 / 사내: 과정명·시간·기간·점수)')
      ],
      approval: ['승인권자']
    },
    'MD-0812-001': { // B-07 (관리대장)
      url: G + '1zyrJAZecVWTa4ZD3_sGOvuqcBuW_uiL45XSQoHBr7J4', srcTitle: 'SP_검사업무_계측장비관리대장',
      note: '원본 컬럼: NO · 관리번호 · 계측기명 · 구입일자 · 기기번호 · 교정일자 · 교정주기 · 차기교정일 · 사용부서 · 비고'
    },
    'MD-0812-002': { // B-08 (관리대장: 계측장비)
      url: G + '11xAg-LgUeIYeoQRTuyAaAnWrB7dF7_pDg9hFOBCtoxg', srcTitle: 'SP_검사업무_계측장비이력카드',
      note: '머리: 관리번호·구입일자·명칭·구입가격·사용범위·등급·관리부서·형식및코드·관련부품·제조자·제조번호 / 수리기록(수리연월일·수리내용·수리자·금액·비고) / 교정검사결과(교정연월일·교정결과·확인·비고) (MD-0812 4항)'
    },
    'MI-0808-001': { // B-09 (전용 화면: SPC)
      url: G + '1Zcp6-mV4FtTjuEI5wXVPfXC_HOv52rsXrEcFWQRUyDw', srcTitle: 'SP_검사업무_X bar R CHART 양식',
      purpose: 'X bar R Charts — 검사일별 시료 5개(n=5: A2 0.577, D3 0, D4 2.115) 관리도 및 관리 이상 조치 내용',
      header: [h('item', '품명/특성'), h('start', '시작일', 'date'), h('end', '종료일', 'date'), h('partNo', '품번'), h('proc', '중요 공정'), h('special', '특별 항목'), h('spec', 'SPEC'), h('gauge', '측정기')],
      cols: [c('day', '검사일', null, 'date'), c('temp', '온도'), c('x1', 'X1', null, 'number'), c('x2', 'X2', null, 'number'), c('x3', 'X3', null, 'number'), c('x4', 'X4', null, 'number'), c('x5', 'X5', null, 'number'), c('xbar', 'Xbar(평균)'), c('r', 'R(범위)')]
    },
    'MD-1002-003': { // B-10 (관리대장: 고객불만)
      url: G + '1Hj2bUB9kdsw1xqvZaigdI06PUbjhB3gHqEgE-33vv9g', srcTitle: 'SP_검사업무_고객불만접수대장',
      note: '원본 컬럼: 번호 · 접수번호 · 요구사항 · 고객 · 처리완료일 · 처리자 · 비고'
    },
    'MD-1002-001': { // B-11 (관리대장)
      url: G + '1k7qsOsLjy2owbU_3SBrglbLYTQzPUeMDywrijH2eO7g', srcTitle: 'SP_검사업무_리워크 관리대장', approval: ['담당', '검토', '승인'],
      note: '원본 컬럼: No. · 일자 · 품명/품번 · 로트정보 · 수량 · 조치내용 · 처분방식(재투입/부적합) · 확인자/서명. 재작업품 내부 LOT NO 예: 211019R (년/월/일/R=리워크)'
    },
    'MD-1002-002': { // B-12
      url: P + '18LGwYJX87uKvp65cbVx2uSHS3c-1_bM5Jm96LJLkh1I', srcTitle: 'SP_검사업무_재작업 작업 표준', cycle: '수시',
      purpose: '부적합(의심제품) 중 재작업 가능 항목 및 재작업 처리기준, LOT식별기준 (대상: 가공품). 재작업 처리 FLOW별 이행 확인',
      header: [h('part', '품명/품번'), h('lot', '내부 LOT NO (예: 211019R)'), h('qty', '수량', 'number')],
      tableTitle: '재작업 처리 FLOW',
      cols: [c('task', '업무내용'), c('rec', '품질기록문서'), c('owner', '담당'), c('r', '실시확인', ['O', 'X']), c('remark', '비고')],
      items: [
        it('1. 부적합품(의심제품)·폐기품 발생 시 TAG 부착(의심 노란색 / 폐기 적색), 품질검사원 통보, 부적합품 보관장소 격리 — 담당: 발견자, 품질검사원', '의심제품 TAG, 부적합 TAG'),
        it('2. 재작업 가능여부 판정(불가 → 적색 TAG, 부적합품 관리대장 등록/폐기; 가능 → 해당공정 생산팀장 통보·인계) — 담당: 품질팀장, 품질검사원', '부적합품 관리대장'),
        it('3. 생산팀장 재작업 방법 및 조건 설정(설비·공정·인원), 실시 후 초품 품질검사원 인계 — 담당: 생산팀장'),
        it('4. 재작업품 검사기준서 준한 검사(외관/치수) — 담당: 품질검사원', 'TO성적서'),
        it('5. 양품은 녹색 TAG 부착 후 해당공정(출하장) 이동, 내부 LOT NO 부여(예 211019R: 21 재작업연도/10 월/19 일/R 리워크) → 재작업 이력관리대장 기록 — 담당: 품질팀장, 품질검사원', '재작업 이력 관리대장'),
        it('6. 출하성적서 비고란에 내부 LOT NO 기록, 리워크품 출고시기 = 해당 LOT 마지막 출고 시 — 담당: 품질검사원', '출하성적서')
      ],
      approval: A3
    },
    'MD-0701-001': { // B-13
      url: G + '1jg1sNi5Ix6HnWXkKn7HNQjT8yfVXQb0q7yFQrjjg5Ik', srcTitle: 'SP_설비관리_설비예방점검계획서', retention: '영구', cycle: '년',
      purpose: '설비별 연간(1~12월) 예방점검 계획 및 실시 관리',
      header: [h('year', '연도')],
      tableTitle: '설비 예방 점검 계획',
      cols: [c('mgmt', '관리번호'), c('equip', '설비명'), c('plan', '점검 계획월(1~12)'), c('done', '실시월'), c('remark', '비고')],
      approval: A3
    },
    'MD-0701-002': { // B-14
      url: G + '14Q5z0k7Us5pBmBrNBvU3oiJnDZwPeQlD_o-MwvJqZko', srcTitle: 'SP_설비보전_설비 점검 기준표', retention: '영구', cycle: '수시',
      purpose: '설비별 점검부위·점검항목·주기 및 이상시 조치방법 기준',
      header: [h('equip', '설비명'), h('model', '모델명'), h('spec', '규격'), h('regNo', '등록번호')],
      tableTitle: '설비 점검 기준',
      cols: [c('part', '점검부위'), c('item', '점검항목'), c('when', '점검시기'), c('cycle', '점검주기', ['매일', '매주', '매월', '분기', '반기', '년']), c('who', '점검자'), c('action', '이상시 조치방법')],
      approval: A3
    },
    'MD-0701-003': { // B-15 (관리대장: 설비)
      url: G + '1x06vbRWQ-H912VaIlbL7xpbFN-QS70fGBFIx3UPfxuU', srcTitle: 'SP_설비보전_설비이력대장', retention: '영구',
      note: '원본 필드: No. · 설비번호 · 구입연월일 · 설비명 · 형식 · 제작회사명 · 제작연도 · 제조번호 · 구입가격 · 중량 · 소요바닥넓이 · 설치장소 · 모터마력'
    },

    /* ───────── MP 경영 ───────── */
    'MD-0801-002': { // B-16
      url: G + '1uHzd2o3hmJACxv_VOrM_qzhwXhm3BHhogQqj5crh1Dg', srcTitle: 'MP_경영관리_업무분장표 양식', cycle: '수시',
      purpose: '개인/팀별 업무 분장 (대분류·중분류·업무내용·주기·관련기록)',
      header: [h('name', '성명', 'user'), h('pos', '직위')],
      tableTitle: '업무 분장',
      cols: [c('team', '팀명'), c('l1', '대분류'), c('l2', '중분류'), c('task', '업무내용'), c('detail', '세부내용'), c('cycle', '주기'), c('kind', '업무구분'), c('rec', '관련기록')]
    },
    'MD-0901-001': { // B-17
      url: G + '1XpzuVvcq4EE9bovColX3hGDEyT02jlkkEhNyHcLHZUk', srcTitle: 'MP_경영관리_회의록양식', cycle: '수시',
      purpose: '회의 결정사항·일정·주관팀 기록 및 배포',
      header: [h('meeting', '회의명'), h('when', '회의일시'), h('place', '회의장소'), h('team', '작성팀', 'dept'), h('writer', '작성자', 'user'),
        h('dist', '배포처 (팀명/성명)', 'textarea')],
      tableTitle: '회의결과',
      cols: [c('decision', '결정사항'), c('sched', '일정'), c('team', '주관팀'), c('remark', '비고')],
      approval: A3
    },
    'MD-0902-003': { // B-18 (전용 화면: 내부심사)
      url: G + '1qWG2dkIVfRMyNfh2PDAhWSzKljQduUsXXSbUwUWy7X0', srcTitle: 'MP_경영관리_시정조치요구서 양식', retention: '5년', cycle: '수시',
      purpose: '품질/환경 시정 조치 요구서 — 문제점 현황, 시정 및 재발 방지 대책(조치부서), 조치결과·유효성 확인(작성부서) (MD-1002)',
      header: [h('kind', '구분', 'select', ['품질 시정', '환경 시정']), h('stage', '발생공정', 'select', ['수입', '공정', '최종', '고객', '기타']), h('docNo', '문서번호'),
        h('part', '품명'), h('model', '기종'), h('lotQty', 'LOT수량', 'number'), h('inspQty', '검사수량', 'number'), h('due', '회답기간', 'date'),
        h('actDept', '조치부서', 'dept'), h('refDept', '참조부서', 'dept'), h('ngQty', '불량수량(율)'),
        h('ncType', '부적합구분', 'select', ['수리', '재작업', '재검사', '반품', '선별', '폐기', '특채', '기타']),
        h('problem', '문제점 현황', 'textarea'), h('cause', '발생원인', 'textarea'), h('action', '시정 및 개선대책', 'textarea'),
        h('result', '조치결과 확인', 'select', ['만족', '불만족']), h('reason', '사유'), h('verifier', '유효성 확인 확인자', 'user')],
      approval: A3
    },
    'MD-0902-005': { // B-19 (전용 화면: 내부심사)
      url: G + '1gRf5jdBcDOp9VA41QU3VtPsnBk6m3NhECCwJySeVeo0', srcTitle: 'MP_경영관리_시정조치요구서관리대장 양식', retention: '5년', cycle: '수시',
      purpose: '조치 요구서 관리대장 (MD-1002 4.2). ※ 접수부서는 NO, 문서번호, 문제점, 접수일, 접수자 기재',
      cols: [c('docNo', '문서번호'), c('actDept', '조치부서'), c('refDept', '참조부서'), c('sent', '발송일', null, 'date'), c('problem', '문제점'), c('closed', '종결일', null, 'date'), c('recv', '접수일', null, 'date'), c('recvBy', '접수자'), c('remark', '비고')]
    },
    'MI-0602-001': { // B-20(1) (관리대장: SWOT)
      url: G + '1nkhHetfRNTkf0_MzzSr1ohlLGKtVq8xr9HfdVtXU4v0', srcTitle: 'MP_경영관리_SWOT분석표 양식', approval: A3, cycle: '년',
      note: '원본 (1) SWOT 분석: STRENGTHS(강점) · WEAKNESSES(약점) · OPPORTUNITIES(기회) · THREATS(위협) 4분면, 작성일자·작성자'
    },
    'MD-0401-002': { // B-20(2) (관리대장: 내외부 이슈)
      url: G + '1nkhHetfRNTkf0_MzzSr1ohlLGKtVq8xr9HfdVtXU4v0', srcTitle: 'MP_경영관리_SWOT분석표 양식 — (2) 이해관계자 니즈 파악표', cycle: '년',
      note: '원본 컬럼: 구분 · 이해관계자 · 주요 요구 사항 · 관련문서/근거 · 관련부서 · 비고'
    },
    'MD-0401-001': { // B-20(2) 이해관계자 니즈 분석
      url: G + '1nkhHetfRNTkf0_MzzSr1ohlLGKtVq8xr9HfdVtXU4v0', srcTitle: 'MP_경영관리_SWOT분석표 양식 — (2) 이해관계자 니즈 파악표', cycle: '년',
      purpose: '이해관계자별 주요 요구 사항 및 관련문서·관련부서 파악 (조직상황 분석)',
      header: [h('writer', '작성자', 'user')],
      tableTitle: '이해관계자 니즈 파악',
      cols: [c('kind', '구분'), c('party', '이해관계자'), c('req', '주요 요구 사항'), c('basis', '관련문서/근거'), c('dept', '관련부서'), c('remark', '비고')],
      items: [it('내부', '주주 및 이사진'), it('내부', '내부직원'), it('고객사'), it('공급자'), it('관공서', '세무서, 환경부, 고용노동부'), it('가입단체')],
      approval: A3
    },
    'MI-0601-001': { // B-20(3) (관리대장: 리스크)
      url: G + '1nkhHetfRNTkf0_MzzSr1ohlLGKtVq8xr9HfdVtXU4v0', srcTitle: 'MP_경영관리_SWOT분석표 양식 — (3) 리스크 평가표', cycle: '년',
      approval: ['작성', '검토(대표이사)'],
      note: '원본 컬럼: 관리번호 · 리스크 요약 · 문제의 잠재적 원인 · 영향(Impact) · 이해관계자 · 프로세스 · 현재 조치방법 · 조치전[가능성 · 영향도 · 심각도(LOW/MEDIUM/HIGH)] · 수락 OR 권고조치사항 · 관련부서 · 완료예정일 · 모니터링 결과. 관리번호 예: 경영-01, 개발-01, 구매-01, 생산-01, 물류-01, 품질-01, EHS-01, IT-01'
    },
    'MI-0601-002': { // B-20(3) 평가 기준
      url: G + '1nkhHetfRNTkf0_MzzSr1ohlLGKtVq8xr9HfdVtXU4v0', srcTitle: 'MP_경영관리_SWOT분석표 양식 — (3) 리스크 평가표',
      purpose: '리스크 평가 기준 — 가능성 × 영향도 1~5 척도, 심각도 LOW / MEDIUM / HIGH 구분'
    },
    'MI-1002-002': { // B-21
      url: G + '1QK_-x_uokK7k3eaeZedkiGLj4FhDAC70UrwxWsE-lQM', srcTitle: 'MP_개선_제안서 양식', cycle: '수시',
      purpose: '엠에스티 제안서 — 개선 전/후 및 1차(해당팀)·2차(심의회) 심사 점수표(총점 100)',
      header: [h('no', '제안번호'), h('dept', '소속', 'dept'), h('name', '성명', 'user'), h('pos', '직위'), h('empNo', '사번'),
        h('kind', '제안구분', 'select', ['업무개선', '제도개선', '작업방법개선', '환경개선', '안전향상', '양식개선', '치공구개선', '원가절감', '설비개선', '불량감소', '에너지절감', '기타']),
        h('before', '개선 전', 'textarea'), h('after', '개선 후', 'textarea'), h('effectKind', '기대효과구분', 'select', ['유형', '무형']),
        h('result', '결과', 'select', ['채택', '미채택']), h('grade', '등급'), h('implDept', '실시자(부서)', 'dept'),
        h('reject', '미채택 사유', 'select', ['고충·불평·불만·건의', '실현 가능성 없음', '부서 계획 정책·공지사항', '허위', '관계부서 회의·협조로 결정된 사항', '법령·사규 위배', '기제출 동일·유사', '실시 후 3개월 경과', '설비 노후 동일방법 보수', '타인의 지시사항', '공학적·이론적 불성립', '기타 취지 위배', '기대효과보다 투자비용 과다']),
        h('review', '심사평', 'textarea')],
      tableTitle: '심사 점수표',
      cols: [c('item', '심사항목'), c('max', '배점'), c('s1', '1차 심사(해당팀)', null, 'number'), c('s2', '2차 심사(심의회)', null, 'number'), c('remark', '비고')],
      items: [it('착상', '20'), it('기대효과 (유형/무형)', '30'), it('실시', '20'), it('활용도 — 활용장소', '15'), it('활용도 — 활용기간', '5'), it('노력', '10')],
      approval: ['1차 심사자', '2차 심사자']
    },
    'MI-1002-001': { // B-22 (관리대장)
      url: G + '1PKL7F0isNf6txlMpUx4jXIEfZlLbdCc1N8CdAK4OcYo', srcTitle: 'MP_개선_제안 관리 대장 양식',
      note: '원본 컬럼: 제안접수번호 · 접수일자 · 이름 · 의뢰부서 · 제안제목 · 실시부서 · 사유 · 진행사항 · 1차 심사결과 · 2차 심의회결과 · 실시부서 관계 · 마일리지 · 시상금 · 지급유무 · 품의차수 · 비고'
    },
    'MD-1001-001': { // B-23
      url: G + '19Z9CHXIU84lRNzP4k7uIarSUNArMJKGzRi496Zpkz7I', srcTitle: 'MP_개선_개선 활동 보고서 양식', cycle: '분기',
      purpose: 'Six Sigma Project Template + Project Action Plan (원본은 SIPOC, CTQ, Risk Assessment, Control Plan 등 영문 템플릿 묶음)',
      header: [h('project', 'Project Name'), h('group', 'Group Name'), h('bb', 'Black Belt Name'), h('dept', 'Department Name', 'dept'), h('team', 'Team Members'),
        h('champion', 'Project Champion Name'), h('owner', 'Process Owner Name'), h('problem', 'Problem Statement', 'textarea'),
        h('objective', 'Project Objective/Desired State', 'textarea'), h('entitle', 'Entitlements'), h('other', 'Other Information', 'textarea')],
      tableTitle: 'Project Action Plan',
      cols: [c('what', 'What (Action to Take)'), c('how', 'How (Action Steps)'), c('who', 'Who (Accountable)'), c('start', 'Start', null, 'date'), c('finish', 'Finish', null, 'date'), c('deliv', 'Deliverables')],
      approval: A3
    },
    'MI-1001-001': chk5s('1구역 종합사무실', S5, [].concat(
      grp('정리', ['서류함 불필요 서류·도면·회의자료', '개인 책상위·서랍 불필요 비품·자료', '불필요품 한눈에', '기간 경과 게시물', '서류함 내 문구류·자재']),
      grp('정돈', ['장소·용도 한눈에', '품명 표시', '사용하기 쉬운 형태 보관', '정해진 장소 보관', '불필요 물품 방치']),
      grp('청소', ['바닥', '사무집기·유리창', '청소 담당제', '쓰레기·종이부스러기', '쓸고 닦는 습관화']),
      grp('청결', ['악취·후덥지근', '채광·조도', '더러운 작업복', '표준류 상태', '지키는 규정 유무']),
      grp('습관화', ['복장', '인사', '장소·시간 준수', '친절 응답', '업무 효율'])), 125),

    /* ───────── COP 고객만족 ───────── */
    'MD-0903-002': { // B-25
      url: G + '1EWQ_faryppJSO2SNGDsZ8c2upg8HwA_XzCgfPT-Pkhk', srcTitle: 'COP_고객만족_내부고객만족평가표', cycle: '년',
      purpose: 'ISO 9001 품질경영시스템과 관련하여 임직원(사내고객)의 의견을 수렴하는 내부고객만족 설문 (각 문항별 ○ 또는 ∨ 표시)',
      header: [h('pos', '직책'),
        h('q7', '7. 부품가격 인하 대응 방안', 'select', ['①원가절감 활동', '②생산성 증대 활동', '③결근율 감소운동', '④개선업무 활동 강화', '⑤분사제도 도입', '⑥신규 사업팀 활성화']),
        h('q8', '8. 기타 건의사항', 'textarea')],
      tableTitle: '만족도 문항',
      cols: [c('q', '문항'), c('cat', '구분'), c('a', '응답', ['매우 그렇지 않다(2)', '그렇지않다(4)', '보통이다(5)', '그렇다(8)', '매우 그렇다(10)']), c('remark', '비고')],
      items: [
        it('1) 우리 회사는 장기적으로 발전 가능하다', '1 회사에 대한 만족도'), it('2) 나는 우리 회사를 외부에 자랑스럽게 이야기한다', '1 회사에 대한 만족도'),
        it('1) 생산 환경은 좋은 편이다', '2 제품 생산의 만족도'), it('2) 우리 회사 제품 품질은 좋은 편이다', '2 제품 생산의 만족도'),
        it('1) 경영층 의사는 하부로 잘 전달된다', '3 사내 의사전달 만족도'), it('2) 하부 의사가 경영층에 잘 전달된다', '3 사내 의사전달 만족도'),
        it('1) 타부서 업무처리 지연으로 부서 업무가 지연되는 경우가 자주 발생한다', '4 부서별 업무 처리의 만족도'), it('2) 타 부서의 업무 지원은 원활한 편이다', '4 부서별 업무 처리의 만족도'),
        it('1) 현 인사제도는 잘 되어 있는 편이다', '5 인사제도 만족도'),
        it('1) 상사는 일을 잘 처리하는 편이다', '6 상사에 대한 만족도'), it('2) 상사의 지시는 정확한 편이다', '6 상사에 대한 만족도')
      ]
    },
    'MD-0903-003': { // B-26
      url: G + '1_nwxzTosOEPXAgBPT1QoIOHx6MAbeNPzr8crdRlhITc', srcTitle: 'COP_고객만족_외부고객만족평가표', cycle: '년',
      purpose: '외부고객 만족 평가 — 평가항목별 목표 대비 실적(달성도 = 실적/목표×100)으로 점수 부여, 평점 100점 만점',
      header: [h('customer', '고객명'), h('dept', '부서명', 'dept'), h('writer', '작성자', 'user'), h('total', '평점(/100점)', 'number'), h('opinion', '평가자 의견', 'textarea')],
      tableTitle: '평가항목',
      cols: [c('item', '평가항목'), c('dept', '주관부서'), c('target', '목표'), c('actual', '실적'), c('score', '점수', ['10점(95%)', '8점(90%)', '7점(85%)', '5점(80%)', '0점(<80%)'])],
      approval: A3
    },
    'MD-0903-001': { // B-27 (관리대장)
      url: G + '1RzTX20JQxUzeu6hUiEEBD2tf6pX7amIuQg5pAPX9f-I', srcTitle: 'COP_고객만족_고객품질문제관리대장',
      note: '원본 컬럼: NO · 접수일 · 고객명 · 고객모델명 · PJT명 · 납품수 · 불량수 · 불량구분 · 불량현상 · 발생원인 · 조치내용[선별/반품/재사용/폐기] · 귀책구분 · 고객요청사항 · 요청일 · 회신일 · CAR R(8D)'
    },

    /* ───────── COP 구매 ───────── */
    'MD-0808-001': { // B-28
      url: G + '1jKy0iyIuajAE85P4eWG8NVlWbm7ARqa1oZCijkJqOao', srcTitle: 'COP_구매_구매발주서', cycle: '수시',
      purpose: '발주서 — 납품업체 준수사항: 1. 거래명세서에 발주자를 기입, 수령자 수량확인 필수',
      header: [h('poNo', '발주번호'), h('dept', '부서명', 'dept'), h('due', '납기', 'date'), h('supNo', '납품업체관리번호'), h('supplier', '납품업체명'),
        h('amount', '발주금액(VAT별도)', 'number'), h('place', '인도장소'), h('terms', '지불조건'), h('recvDate', '입고일자', 'date'), h('special', '특기사항', 'textarea')],
      tableTitle: '발주 품목',
      cols: [c('code', '자재코드'), c('name', '품명'), c('spec', '규격'), c('unit', '단위'), c('qty', '수량', null, 'number'), c('price', '단가', null, 'number'), c('amt', '금액', null, 'number'), c('remark', '비고')],
      approval: ['담당', '검토', '승인']
    },
    'MI-0807-001': { // B-29 (관리대장: 공급자)
      url: G + '11_O3yUL37oeLrxWMAp86b2RKI4g_7-BdP_pDw7lYU98', srcTitle: 'COP_구매_공급자등록대장 및 평가서', approval: ['작성', '검토', '검토', '승인'],
      note: '원본 3종: (1) 공급자 등록대장(NO·업체명·주소·TEL NO/FAX NO·사업자등록번호·승인품목·등록일·중단일·비고) (2) 공급자 사전 평가서(제조 업체용) → MI-0807-003 (3) 협력업체 등록 신청서(회사개요·조직 및 인원구성·업무 실무자·공장현황·월간 생산능력·주요 생산설비 현황)'
    },
    'MI-0807-002': { // B-30 (관리대장)
      url: G + '1spp0honxnRb-hEJxYRpvDfPS735HFW3v_qeqeHLYdgI', srcTitle: 'COP_구매_제품승인관리대장',
      note: '원본 컬럼: 순 · 고객명 · 품번 · 품명 · 기종 · 작성일 · 제출일 · 승인진행현황(일/월)[1차/2차/3차] · 반려사유 · 승인번호 · 비고'
    },
    'MI-0808-002': { // B-32 (전용 화면: SPC)
      url: G + '1TQMu5FSHFl0Abpm4KdcdM3VI1PFOjfAKNU5AJwnDwYQ', srcTitle: 'COP_구매_공정능력평가표Ppk',
      purpose: '공정 능력 평가표(Ppk) — 측정값 최대 100개, Ppk판정기준: 2.0≤Ppk Best(O.K) / 1.67≤Ppk<2.0 Acceptable(O.K) / 1.33≤Ppk<1.67 Not Enough / 1.0≤Ppk<1.33 Poor(N.G) / Ppk<1.0 Bad(N.G)',
      header: [h('evaluator', '평가자(Evaluator)', 'user'), h('line', 'Line명'), h('proc', '공정명(Process)'), h('part', '품명 & Part-No'), h('item', '검사항목(Evaluation Item)'),
        h('gauge', '계측기명(Measuring Inst.)'), h('unit', '측정단위(Unit)'), h('spec', '규격(Specification)'), h('usl', '규격상한(Upp.Tol)', 'number'), h('lsl', '규격하한(Low.Tol)', 'number'),
        h('tolType', '공차유형(Tol.Type)', 'select', ['Both', 'Upper', 'Lower'])]
    },

    /* ───────── COP 개발관리 ───────── */
    'MI-0803-001': { // B-33
      url: G + '1V3UESG0NN5BMSC5PQcpHPbyAwfItfUCEIcobtHyJw4M', srcTitle: 'COP_개발관리_QC공정도 양식', cycle: '수시',
      purpose: 'QC 공정도 — 공정별 관리항목·품질특성 및 관리방법',
      header: [h('model', '기종'), h('rev', '개정 내용')],
      tableTitle: 'QC 공정도',
      cols: [c('proc', '공정 구분'), c('work', '주요 작업'), c('std', '표준류'), c('item', '관리항목(점검항목)'), c('char', '품질특성(규격)'), c('n', '시료수'), c('method', '측정(검사)방법'), c('rec', '관리장표'), c('who', '담당자'), c('remark', '비고')],
      approval: ['작성', '승인']
    },
    'MI-0801-001': { // B-34
      url: G + '1ZDsxIPpxp0zPhpWwGcd4hPNoaSqRbLv4uVCGlcMtvVI', srcTitle: 'COP_개발관리_FMEA 양식', retention: '영구', cycle: '수시',
      purpose: '잠재적 고장형태 및 영향분석 (공정 FMEA)',
      header: [h('fmeaNo', 'FMEA NO'), h('stage', '단계', 'select', ['시작', '양산전', '양산']), h('car', '적용기종'), h('sop', '양산적용일', 'date'), h('partNo', '품번'), h('part', '품명'),
        h('owner', '공정책임자', 'user'), h('writer', '작성자', 'user'), h('due', '완료예정일', 'date'), h('rev', '개정이력(구분·일자·주요개정내용)', 'textarea')],
      tableTitle: '공정 FMEA',
      cols: [c('proc', '공정명'), c('req', '요구사항'), c('mode', '잠재적 고장형태'), c('effect', '고장의 잠재적영향'), c('sev', '심각도', null, 'number'), c('sc', '특별특성'),
        c('cause', '고장의 잠재적원인'), c('prev', '현공정 관리예방'), c('occ', '발생도', null, 'number'), c('det_c', '현공정 관리검출'), c('det', '검출도', null, 'number'), c('rpn', 'R.P.N.', null, 'number'),
        c('rec', '권고 조치'), c('resp', '책임 및 목표 완료예정일'), c('act', '조치내용 및 완료일'), c('sev2', '심각도(조치후)', null, 'number'), c('occ2', '발생도(조치후)', null, 'number'), c('det2', '검출도(조치후)', null, 'number'), c('rpn2', 'R.P.N.(조치후)', null, 'number')],
      approval: ['작성', '검토', '검토', '승인']
    },
    'MI-0801-003': { // B-35
      url: G + '1lQ-2qytRfTlwXHcHtVSwasKEKe9Puc-83LID6m6Fg3o', srcTitle: 'COP_개발관리_검사기준서', retention: '영구', cycle: '수시',
      purpose: '검사 기준서(A) — 중요도 3단계(★매우중요/●중요/○보통), 랜덤 샘플 측정값 기록 (작성요령 [1]~[36] 원본 참조)',
      header: [h('mgmtNo', '관리번호'), h('grade', '품질등급'), h('aql', 'AQL'), h('maker', '소속(제조처명)'), h('partNo', '품번'), h('model', '모델명'), h('part', '품명'), h('mat', '재질'),
        h('lotQty', 'LOT 수량', 'number'), h('inspQty', '검사수량', 'number'), h('ng', '불량수(EA)', 'number'), h('ok', '합격수량(EA)', 'number'), h('special', '특기사항', 'textarea')],
      tableTitle: '검사항목',
      cols: [c('item', '검사항목'), c('spec', '규격'), c('imp', '중요도', ['★', '●', '○']), c('method', '확인방법'), c('n', '표본크기'), c('cycle', '주기'),
        c('x1', '시료1'), c('x2', '시료2'), c('x3', '시료3'), c('x4', '시료4'), c('x5', '시료5'), c('r', '판정', PASS)],
      approval: ['작성', '승인']
    },
    'MI-0801-004': { // B-36
      url: G + '1XQfw9vbjIHoJMRLe5zmjaNRe4in5TmdAWBsLA28Ls0Y', srcTitle: 'COP_개발관리_검사성적서 양식', retention: '영구', cycle: '수시',
      purpose: '검사 성적서(갑지) / INSPECTION REPORT — ※ 관리구분: FPSC: F, SPC: S, 정기검사: P',
      header: [h('scope', '승인항목', 'select', ['외관', '치수', '재질(MS)', '성능(ES)']), h('part', '품명'), h('supplier', '공급자명'), h('partNo', '품번'), h('eo', 'EO No'),
        h('car', '기종'), h('grade', '등급'), h('apprNo', '발행(승인)번호'), h('verdict', '판정', 'select', ['승인', '기각', '기타'])],
      tableTitle: '측정치',
      cols: [c('item', '검사항목'), c('spec', '규격'), c('ctl', '관리구분', ['F', 'S', 'P']), c('s1', '공급자 X1'), c('s2', '공급자 X2'), c('s3', '공급자 X3'), c('s4', '공급자 X4'), c('s5', '공급자 X5'), c('sj', '공급자 판정', OKNG),
        c('c1', '수요자 X1'), c('c2', '수요자 X2'), c('c3', '수요자 X3'), c('cj', '수요자 판정', OKNG), c('remark', '비고')],
      approval: ['공급자 작성', '공급자 검토', '공급자 승인', '수요자 작성', '수요자 검토', '수요자 승인']
    },
    'MI-0702-001': { // B-37 (전용 화면: MSA)
      url: G + '1LFs5qpJbP_7IS5Ur1y60ZqpfeBrGeKJ0g2Jnt7ZuyyE', srcTitle: 'COP_개발관리_게이지 알앤알 (계량형) 양식',
      purpose: '계량형 Gage R&R — 샘플 10 × 측정자 3 × 측정횟수 3. 합격수준: 반복성 EV 20%이하, 재현성 AV 20%이하, R&R 30%이하 (MI-0702 5.4)',
      header: [h('part', '파트이름'), h('partNo', '파트번호'), h('usl', '스펙상한치', 'number'), h('lsl', '스펙하한치', 'number'), h('gauge', '게이지 종류'), h('gaugeNo', '게이지번호'), h('cavity', '툴/캐비티 번호')]
    },
    'MI-0702-002': { // B-38
      url: G + '125CRfv33BWUpA4tLVGUbiljNAa4kz_xtREOnnurxEYQ', srcTitle: 'COP_개발관리_게이지 알앤알 (계수치) 양식', cycle: '년',
      purpose: '계수형 R&R 평가 (MI-0702 5.5). * 시료참값: 양품 "1", 불량 "0". 유효성 E=Correct/Total, P(Miss)=Miss/(Bad Correct+Miss), P(FA)=FA/(Good Correct+FA). 적합: E≥90%, Miss≤2%, FA≤5% / 조건부 채택: E≥80%, Miss≤5%, FA≤10% / 부적합: E<80%, Miss>5%, FA>10%',
      header: [h('partNo', '품번'), h('part', '품명'), h('char', '특성'), h('gauge', '기기명'), h('gaugeNo', '기기번호'), h('crit', '기준'), h('gaugeType', '기기형식'), h('evaluator', '평가자', 'user'),
        h('E', '유효성 E(%)', 'number'), h('miss', '오류 합격 비율 P(Miss)(%)', 'number'), h('fa', '오류 불합격 비율 P(FA)(%)', 'number'),
        h('verdict', '판정', 'select', ['적합', '조건부 채택', '부적합']), h('improve', '부적합 개선내용', 'textarea')],
      tableTitle: 'DATA SHEET',
      cols: [c('no', '시료번호'), c('ref', '시료참값', ['1', '0']), c('a1', '측정자 A 1회', ['1', '0']), c('a2', '측정자 A 2회', ['1', '0']), c('a3', '측정자 A 3회', ['1', '0']),
        c('b1', '측정자 B 1회', ['1', '0']), c('b2', '측정자 B 2회', ['1', '0']), c('b3', '측정자 B 3회', ['1', '0']),
        c('c1', '측정자 C 1회', ['1', '0']), c('c2', '측정자 C 2회', ['1', '0']), c('c3', '측정자 C 3회', ['1', '0']), c('remark', '비고')],
      items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'].map(function (n) { return it(n); }),
      approval: A3
    },
    'MI-0801-006': { // B-39
      url: G + '1diyGvUvwIpSRDuI3aaBLKoC1cL4nQMMJDvVAnB3tgs8', srcTitle: 'COP_개발관리_초도품보증서', retention: '영구', cycle: '수시',
      purpose: '초도품 보증서 — 공급자 사용란(의뢰사유·승인항목) 및 수요자 사용란(승인항목·최종판정)',
      header: [h('times', '동일제품의 의뢰횟수(제 회)', 'number'), h('company', '업체명'), h('qaMgr', '품질보증책임자'), h('person', '담당자'), h('tel', 'TEL'), h('fax', 'FAX'),
        h('car', '기종'), h('product', '제품명'), h('part', '부품명'), h('dwg', '도번'), h('eco', 'ECO NO.'), h('qty', '제출수량', 'number'),
        h('reason', '의뢰사유', 'select', ['신규개발', '공정변경', '이원화', '설계변경', '업체변경', '국산화', '금형수정/변경', '금형신작/증명', '기타']),
        h('mold', '금형(금형번호 / SET수×CAV.수)'), h('special', '특기사항', 'textarea'),
        h('recvNo', '접수번호'), h('recvDate', '접수일자', 'date'), h('final', '최종판정', 'select', ['승인', '기각', '해당무', '기타']), h('judgeDate', '판정일자', 'date'), h('judge', '판정자', 'user')],
      tableTitle: '승인항목',
      cols: [c('item', '승인항목'), c('req', '구분'), c('r', '승인기준', ['승인', '기각', '해당무', '기타']), c('att', '첨부NO'), c('remark', '비고')],
      items: [it('1 치수검사성적서', '＊필수'), it('2 재질시험성적서', '＊해당시'), it('3 성능시험성적서', '＊해당시'), it('4 공정능력조사서', '＊필수'),
        it('5 측정시스템분석조사서', '＊필수'), it('6 공정감사표', '＊필수'), it('7 기타'),
        it('[수요자] 1 SAMPLE측정'), it('[수요자] 2 가공및조립성확인'), it('[수요자] 3 내구성확인'), it('[수요자] 4 공정감사')],
      approval: A3
    },
    'MI-0801-002': { // B-40
      url: G + '1yU6HG3R0vXrE0KQfQ7HBzbk1kAf4tbNdKY8vA8zporI', srcTitle: 'COP_개발관리_개발완료보고서.XLS', cycle: '수시',
      purpose: '(     ) 완료 보고서 — 회의·조사·출장·업무 보고',
      header: [h('kind', '보고 구분', 'select', ['회의', '조사', '출장', '업무']), h('copy', '본지/사본', 'select', ['본지', '사본']), h('when', '일시(부터 ~ 까지)'), h('place', '지역 및 장소'), h('attendees', '참석자')],
      tableTitle: '보고 내용',
      cols: [c('item', '구분'), c('content', '내용')],
      items: [it('의제·안건'), it('관련자료'), it('의견')]
    },
    'MI-0805-001': { // B-41
      url: G + '1JvILyoa5QcJlctHZPQTa1xnJYfoZiPTAkXh6TSu6YUw', srcTitle: 'COP_개발관리_작업표준서', retention: '영구', cycle: '수시',
      purpose: '작업표준서 — 작업순서(그림), 관리항목 및 검사항목, 개정이력',
      header: [h('proc', '공정명'), h('docNo', '문서번호'), h('part', '품명'), h('partNo', '부번'), h('mat', '사용부품·재료'), h('machine', '사용기계'), h('uph', '시간당작업수', 'number'),
        h('steps', '작업순서', 'textarea'), h('caution', '※작업시주의사항', 'textarea'), h('ppe', '안전보호구'), h('rev', '개정이력(NO·개정일·개정근거)', 'textarea')],
      tableTitle: '※관리항목 / 검사항목',
      cols: [c('kind', '구분', ['관리항목', '검사항목']), c('item', '항목/품질특성'), c('std', '기준/규격'), c('method', '점검방법/측정기기'), c('size', '크기'), c('cycle', '주기'),
        c('who', '담당'), c('rec', '기록/관리방법'), c('abn', '이상처리'), c('ref', '관련표준')],
      approval: A3
    },
    'MI-0801-005': { // B-42
      url: G + '1OfBWK31ZHnba5FKclZ0NnRpnwywiRWEfV5A4EcXsR2c', srcTitle: 'COP_개발관리_외주협력사 리스트 양식', cycle: '수시',
      purpose: '외주 협력사 LIST — 업종·협력사·주소·적용제품',
      tableTitle: '외주 협력사 LIST',
      cols: [c('biz', '업종'), c('name', '외주 협력사'), c('addr', '협력사 주소'), c('product', '적용제품')]
    },

    /* ───────── COP 생산관리 ───────── */
    'MD-0804-006': { // B-43
      url: G + '1T3wz_wwYqqicnh_W7cDUpnfu0UH2vuQB90xnLGdSp0w', srcTitle: 'COP_생산관리_작업일보', retention: '1년', cycle: '매일',
      purpose: '일일 생산·양품·불량 수량 및 불량유형 기록',
      header: [h('dept', '부서명', 'dept'), h('writer', '작성자', 'user')],
      tableTitle: '작업 실적',
      cols: [c('customer', '고객명'), c('model', '모델/품명'), c('day', '생산일', null, 'date'), c('qty', '생산수량', null, 'number'), c('good', '양품수량', null, 'number'), c('ng', '불량수량', null, 'number'), c('ngType', '불량유형'), c('remark', '비고')],
      approval: A3
    },
    'MD-0804-005': { // B-44
      url: G + '17GmhKP83UuLFMuEcc7fQRcjsYpdPIWDjFgFyuMnW0iU', srcTitle: 'COP_생산관리_월간생산계획서', cycle: '매월',
      purpose: '월간 생산계획서 — 모델별 계획 / 생산 / 누계 (원본은 Date 1~31 일자별 열, 공휴일 표시)',
      header: [h('ym', '연월'), h('rev', 'Rev.')],
      tableTitle: '월간 생산계획',
      cols: [c('model', 'Model'), c('kind', '구분', ['계획', '생산', '누계']), c('d1', '1~7일', null, 'number'), c('d2', '8~14일', null, 'number'), c('d3', '15~21일', null, 'number'), c('d4', '22~28일', null, 'number'), c('d5', '29~31일', null, 'number'), c('total', 'TOTAL', null, 'number')]
    },
    'MD-0803-002': { // B-45
      url: G + '1oLC7WdHr7fyV59zD-XghrnHPVIhV78UZEuzRzKMEHYI', srcTitle: 'COP_생산관리_4M변경통보서', retention: '10년', cycle: '매월',
      purpose: '월 4M변경 통보서. 注: 1) 공정내 작업자·설비(장비 및 지그)·라인변경(ITEM)만 기록·통보(조립라인은 라인별) 2) 변경 없어도 비고란 "변경 없음" 기입 송부 3) 매월 3일까지 송부',
      header: [h('ym', '연월'), h('dept', '부서명', 'dept'), h('staff', '★주요 공정 인원 현황★ (구분·전월·금월·변경 인원·변경 내용)', 'textarea')],
      tableTitle: '4M 변경 내용',
      cols: [c('car', '기종'), c('part', '품명'), c('change', '4M 변경 내용'), c('day', '변경일', null, 'date'), c('reason', '변경 사유'), c('remark', '비고')],
      approval: ['발신 작성', '발신 검토', '발신 승인', '수신 작성', '수신 검토', '수신 승인']
    },
    'MD-0803-001': { // B-46 (관리대장)
      url: G + '1nbJbMFgMHrq-LUdrh9uGtB2oZYIeJjZiFWm-VEig75A', srcTitle: 'COP_생산관리_4M변경관리대장', retention: '10년',
      note: '원본 컬럼: NO · 접수일 · 업체 · 부품 ITEM · 품번 · 4M 변경내역 · 4M변경 검토사항[정성/업체/부품검토/사양반영/적용시점] · 공정감사[자체/고객] · ISIR[자체/고객] · 고객 4M신고 · 적용시점(고객 및 자체목표) · 비고'
    },
    'MD-0804-002': { // B-47 (관리대장)
      url: G + '1l8yFxnMKdgAqTFFqmNjgCYaZrmX5jB5NfhZ_MoEIUCI', srcTitle: 'COP_생산관리_설비등록관리대장 양식',
      note: '원본 컬럼: NO · 관리번호 · 설비명 · 형식 · 수량(개) · 구입일 · 제작처 · 사용부서 · 비고'
    },
    'MD-0804-001': { // B-49 / B-48 (관리대장: 설비)
      url: G + '1-pZaAKLt5H3tPXkvtUAixuafzc8oxjIzv-ucaPosiW0', srcTitle: 'COP_생산관리_설비이력카드(신)', approval: A3,
      note: '원본(신): 설비 관리목록표 / 설비 이력 카드(갑지: 설비관리번호·설비명·제조원·제조일자·구입일자·구입가격·사진·SPECIFICATION·설치장소 이동사항·폐각근거) / 을지 설비 이력(작성일·이력현황·조치결과·설비정지시간·비고). 구양식 "설비 이력 카드"(설비 이상발생 현황: 날짜·이상발생내용·조치사항): ' + G + '1Sf3FTu0J4kBXJwTAgBeX--rEz8OvtRVeqSUnlUtJlE8'
    },
    'MD-0804-004': { // B-50
      url: G + '1GIaDxlUwQXJ4N0ifhAe4qyUrFaEJeCASTLnrQTFFviQ', srcTitle: 'COP_생산관리_설비일상 점검표', cycle: '매일',
      purpose: '설비 일상 점검표 (원본은 월 단위 01~31 일자 열) — 범례: 양호 ○ / 이상있음(자체조치가능 △, A/S에서 조치 X). 고정 항목은 CNC 선반 예시 기준',
      header: [h('dept', '사용부서', 'dept'), h('equip', '설비명'), h('equipNo', '설비번호'), h('owner', '설비담당자', 'user')],
      tableTitle: '점검 항목',
      cols: [c('item', '개소(점검항목)'), c('std', '판정기준'), c('r', '결과', ['○', '△', 'X']), c('remark', '비고')],
      items: [
        it('[급유] 유압유 LEVEL (시업시)', 'Hyspin AWS 32 ①'), it('[급유] 공압유닛 LEVEL (시업시)', 'Hyspin T68 ②'),
        it('[급유] 습동유 LEVEL (시업시)', 'Hyspin T68 ③'), it('[급유] 절삭유 LEVEL (시업시)', 'Super Edge 4K ④'),
        it('[점검] 누유 확인'), it('[점검] 주축 및 각축 이동 상태'), it('[점검] 절삭유 농도', '5±1%'), it('[점검] 공압', '0.5 MPa'),
        it('[점검] 척 유압상태', '15~25Kg/㎠'), it('[점검] 유압척 그리스 주입', 'Alvania EP(LF)2'),
        it('[청소] 배전반 FAN부 청소 (종업시)'), it('[청소] CHIP제거·청소 (종업시)')
      ],
      approval: ['작성', '검토', '승인(공정책임자)']
    },
    'MI-0804-001': { // B-51 (관리대장)
      url: G + '1uOf0PuFDeOOgItZACSf9MdGqeT5HmwbnuOrlatSXR0o', srcTitle: 'COP_생산관리_치공구관리대장',
      note: '원본 컬럼: 일련번호 · 관리번호 · 고객명 · 기종 · 품번 · 품명 · 제작일 · 규격 · 중량 · 제작근거 · 제작처 · 폐기[일자/근거] · 비고'
    },
    'MD-0808-002': { // B-52
      url: G + '1zUsls0Oy4FbFLb4ISS_3q9368t8q_50ETS_dUhYG32c', srcTitle: 'COP_생산관리_보관품점검표', retention: '3년', cycle: '매월',
      purpose: '보관품 점검표 (원본은 1월~12월 열) — 점검기준: ∨ 이상없음 / △ 주위환기 요함 / × 해당자 경고 및 별도교육요함',
      header: [h('area', '구분(예: 자재창고)'), h('month', '점검월')],
      tableTitle: 'CHECK POINT',
      cols: [c('point', 'CHECK POINT'), c('r', '결과', ['∨', '△', '×']), c('remark', '비고')],
      items: [
        it('1 현품은 분류된 LOCATION에 의거 적재되고 있는가?'), it('2 REJECT된 ITEM은 별도의 장소로 격리되고 있는가?'),
        it('3 합격/불합격 TAG는 정위치에 부착 또는 식별되는가?'), it('4 자재 및 제품은 고객별, ITEM별 식별되도록 구분하여 적재되어 있는가?'),
        it('5 자재 및 제품이 다른 품목과 혼입 적재되지 않았는가?'), it('6 보관자재 중 BOX OPEN 및 파손, 손상, 안전, 넘어질 우려는 없는가?'),
        it('7 제품/자재의 포장 상태는 양호한가?'), it('8 지정된 AREA 이외에 자재 및 제품이 방치되지 않았는가?'),
        it('9 주위정리, 정돈, 청결상태 및 습기, 누수, 누전 염려는 없는가?'), it('10 중요 자재/제품보관 장소의 시건 장치는 이상 없는가?')
      ],
      approval: ['점검자', '승인자']
    },
    'MI-0806-003': { // B-53
      url: G + '1RCARgDB0nlyh_L_ONqYHQ7F2uZjZyHLPiqdMKTztBeY', srcTitle: 'COP_생산관리_사고보고서', cycle: '수시',
      purpose: '사고 보고서 — * 표시란은 안전담당부서에서 기록. ○ 사고자 서명란은 입원 등으로 불가피할 시는 차후에 서명',
      header: [h('site', '사업장'), h('dept', '부서', 'dept'), h('name', '성명'), h('birth', '생년월일', 'date'), h('accDate', '사고일자', 'date'), h('joined', '입사일자', 'date'),
        h('years', '당해 작업 종사 연수'), h('job', '작업명'), h('place', '발생장소'), h('witness', '목격자(부서·성명)'), h('rel', '관련 기록(물건)명'), h('dow', '요일'), h('weather', '날씨'),
        h('how', '발생경위(6하원칙에 의거 기록)', 'textarea'), h('seen', '목격내용', 'textarea')],
      tableTitle: '원인 및 조치',
      cols: [c('item', '항목'), c('content', '내용')],
      items: [it('안전교육 실시여부'), it('실시근거'), it('불안전한 행동의 동기'), it('발생장소의 안전상황'), it('보호구 착용 여부'), it('대책'),
        it('*예상진료기간'), it('*사고경과'), it('담당부서장 의견'), it('*관련자 조치'), it('책임소재'), it('조치사항')],
      approval: A3
    },
    'MD-0808-003': { // B-54
      url: G + '1rbPhXOoFD6ZA1PaCRJm_0-RUsTt7KyEEcM0tFZBnigM', srcTitle: 'COP_생산관리_거래명세서.xlsm', retention: '3년', cycle: '수시',
      purpose: '매입처 거래명세서 ([별지 제33호 서식]) — 매입처별 매수·공급가액·세액',
      header: [h('period', '(년 기)'), h('bizNo', '①사업자등록번호'), h('corp', '②상호(법인명)'), h('rep', '③성명(대표자)'), h('addr', '④사업장 소재지'), h('type', '⑤업태'), h('item', '⑥종목'), h('term', '⑦거래기간')],
      tableTitle: '매입처별 명세',
      cols: [c('bizNo', '사업자등록번호'), c('corp', '상호'), c('cnt', '매수', null, 'number'), c('supply', '공급가액', null, 'number'), c('tax', '세액', null, 'number'), c('remark', '비고')]
    },
    'MD-0806-001': { // B-55
      url: P + '1hoUvv2iRiGky6VgddUeIiipm1V6SQwbAazLb5gK7C8s', srcTitle: 'COP_생산관리_로트추적 매뉴얼', cycle: '수시',
      purpose: '품질문제 발생시 즉시 제조경로 추적·대책 수립, 고객불만·클레임 최소화 — 작업일보 및 공정이동전표(꼬리식별표) 기재 내용 추적',
      header: [h('model', '고객 장비/모델'), h('partNo', '품번'), h('lot', '원자재 LOT-NO'), h('heat', '소재 Heat/Cert No'), h('wo', '작업지시 No')],
      tableTitle: '공정이동전표 추적',
      cols: [c('step', '공정 (A 최초 공정 / B·C·D 후공정)'), c('serial', '식별표 제조번호'), c('day', '작업일', null, 'date'), c('qty', '작업 수량', null, 'number'), c('box', '박스 수량 / 팔레트'), c('worker', '작업자'), c('insp', '공정검사', OKNG)]
    },
    'MI-0806-001': { // B-56
      url: P + '1RidkzViv-rBrvD-lI6kocAZ1U9xwYyhS3YGK5O_9INc', srcTitle: 'COP_생산관리_비상사태 대응 매뉴얼', cycle: '년',
      purpose: '비상사태 대응 — 사고·재해 발생/우려 → 상황 확인 → 비상사태 대응(LEVEL 결정, 피난범위, 현장 대응 지시, 공적기관 정보 전달, 관련회사 연락, 사후처리, 기록, 보고·신고) → 재검토. 유형별 대응 점검·훈련 기록',
      header: [h('kind', '구분', 'select', ['훈련', '실제 발생'])],
      tableTitle: '유형별 대응',
      cols: [c('type', '유형'), c('first', '최초발견자 조치'), c('ctrl', '비상통제자 조치'), c('mgr', '생산팀장·해당부서장 조치'), c('r', '이행', ['O', 'X']), c('remark', '비고')],
      items: [it('유해화학물질 피해자 응급조치(흡입/피부/눈)'), it('화재위험물질 누출(액체/기체)'), it('화재 및 폭발'), it('지진 및 천재지변'), it('환경오염물질 유출(액상)'), it('중상 이상 물리적 사고')],
      approval: A3
    },
    'MI-0806-002': { // B-57
      url: P + '122kSpcbGTZACEI2UmX8a5a3N8IDRn7V6DlgWs6hG6k4', srcTitle: 'COP_생산관리_비상사태 조직도', retention: '5년', cycle: '년',
      purpose: '비상사태 대책본부·대책위원회 조직 및 임무, 이해관계자 비상연락망',
      tableTitle: '조직 및 비상연락망',
      cols: [c('org', '구분 / 팀장'), c('duty', '임무 / 연락처'), c('phone', '휴대폰'), c('remark', '비고')],
      items: [
        it('대책본부 — 대표이사 김맹권', '총괄지휘, 비상연락망·랜턴·보호장비 확보'),
        it('피해자 지원팀 — 제조팀장', '후송·치료, 대피, 조사·보험·장례'),
        it('피해 복구팀 — 개발팀장', '현장 확인·보존·증거, 오염물 차단·전기 에너지 통제, 상황별 대응, 후속사고 예방, 현장복구'),
        it('사고 조사팀 — 관리팀장', '현장 기록, 원인조사·재발방지, 관계기관 섭외'),
        it('대외 홍보팀 — 품질팀장', '언론, 대외발표, 지역주민 홍보'),
        it('천안시청 (서북구)', '대표번호 확인 후 기입'), it('천안서북경찰서', '112 (긴급), 대표번호 확인 후 기입'), it('천안서북소방서', '119 (긴급), 대표번호 확인 후 기입'), it('인근 응급의료기관', '기관명·연락처 확인 후 기입')
      ]
    }
  };

  window.SEED.extraForms = [
    { code: 'MD-1002-004', title: '특채 신청서', doc: 'MD-1002', // B-31
      url: G + '1rpnrkBHV93Dlx81Xjs9vAfc3koZbd36mCUl4J3oQhvo', srcTitle: 'COP_구매_특채신청서', cycle: '수시',
      purpose: '부적합품 특채(특별채용) 신청 — 팀별 검토 후 적용/기각 판정 (MD-1002 특채의뢰서)',
      header: [h('occNo', '발생번호'), h('partNo', '품번'), h('part', '품명'), h('occDate', '발생일자', 'date'), h('occQty', '발생수량', 'number'), h('stock', '재고수량', 'number'),
        h('delivery', '납품예정일', 'date'), h('sendTeam', '발송팀명', 'dept'), h('lot', 'LOT No.'), h('place', '발생장소'), h('recvTeam', '수신팀명', 'dept'),
        h('spec', 'SPEC', 'textarea'), h('actual', '현품', 'textarea'), h('cause', '발생사유', 'textarea'), h('measure', '대책', 'textarea'),
        h('cond', '특채조건', 'textarea'), h('verdict', '판정', 'select', ['적용', '기각', '기타']), h('special', '특이사항', 'textarea')],
      tableTitle: '팀별 검토',
      cols: [c('team', '팀명'), c('person', '담당자'), c('need', '필요여부', ['필요', '불필요']), c('opinion', '검토의견')],
      approval: A3 },
    { code: 'MI-0807-003', title: '공급자 사전 평가서(제조 업체용)', doc: 'MI-0807', // B-29(2)
      url: G + '11_O3yUL37oeLrxWMAp86b2RKI4g_7-BdP_pDw7lYU98', srcTitle: 'COP_구매_공급자등록대장 및 평가서 — (2) 공급자 사전 평가서', cycle: '수시',
      purpose: '신규 공급자 사전 평가 — 점수 = 세부항목 평점합계/배점합계×100, 평균평점 = 평가자별 점수합계/평가자수. 배점: 일반관리15·품질관리30·문서관리5·공정관리20·제품관리15·설비관리15',
      header: [h('supplier', '공급자명'), h('item', '주 거래 품목'), h('dept', '부서명', 'dept'), h('ev1', '평가자1', 'user'), h('ev2', '평가자2', 'user'),
        h('score', '점수', 'number'), h('avg', '평균평점', 'number'), h('result', '평가결과', 'select', ['승인', '불승인']), h('opinion', '평가의견', 'textarea')],
      tableTitle: '세부 평가 내용',
      cols: [c('item', '평가항목'), c('max', '배점'), c('s1', '평점(평가자1)', null, 'number'), c('s2', '평점(평가자2)', null, 'number'), c('remark', '비고')],
      items: [
        it('[1 일반관리] 경영방침 수립·세부계획·실적점검', '2'), it('[1 일반관리] 조직도·직능별 인원현황', '3'), it('[1 일반관리] 최근 1년 사내외 직능교육', '2'),
        it('[1 일반관리] 실무경력 3년↑ 5%↑', '2'), it('[1 일반관리] 납품부품 제조경험', '3'), it('[1 일반관리] 공장 자가', '2'), it('[1 일반관리] 당사와 2시간 이내', '1'),
        it('[2 품질관리] 최고경영자 최근 3년 사외 품질교육', '2'), it('[2 품질관리] 품질관리 관심·열정', '2'), it('[2 품질관리] 품질관리 조직 존재', '5'),
        it('[2 품질관리] 품질관리 사내외 교육', '2'), it('[2 품질관리] 품질검사원 전담', '2'), it('[2 품질관리] 주요 자재 규격 합리성', '6'),
        it('[2 품질관리] 제품규격 합리성', '3'), it('[2 품질관리] 사내 규격 관리상태', '5'), it('[2 품질관리] QA MANUAL 보유', '3'),
        it('[3 문서관리] 품질기록 유지관리', '5'),
        it('[4 공정관리] 자재 수입검사 규격대로', '3'), it('[4 공정관리] 보관시설·정리정돈', '1'), it('[4 공정관리] 재고량 규격별 기록', '1'),
        it('[4 공정관리] 공정도 현장비치·적합', '1'), it('[4 공정관리] 특별공정 파악·자격인정', '2'), it('[4 공정관리] 작업표준·작업지도서 작성·적합', '2'),
        it('[4 공정관리] 개정실적·작업자 파악', '1'), it('[4 공정관리] 공정검사 실시', '4'), it('[4 공정관리] 불량원인 분석·재발방지', '4'), it('[4 공정관리] 검사결과 기록 보존', '1'),
        it('[5 제품관리] 제품검사 실시', '3'), it('[5 제품관리] 검사기록 보관', '2'), it('[5 제품관리] 제품 보관상태', '2'),
        it('[5 제품관리] 부적합 원인분석·재발방지·시정조치', '5'), it('[5 제품관리] 내부 품질감사', '3'),
        it('[6 설비관리] 제조설비·지/치구·검사구 구비', '5'), it('[6 설비관리] 제조설비 점검기준·실적', '2'), it('[6 설비관리] 검사설비 구비', '4'),
        it('[6 설비관리] 계측기·검사/시험설비·생산설비 주기적 검교정', '4')
      ],
      approval: ['평가자', '평가자', '승인'] },
    { code: 'MD-0703-005', title: '자격인정 평가표(관리자)', doc: 'MD-0703', // B-59
      url: G + '1LJ243pPBqIPWugKz6wvEqGhQLtNU5yI6CzjwzlMrsxI', srcTitle: '(관리자)자격인정평가표', cycle: '수시',
      purpose: '특별공정 작업자 / 검사 및 시험 / 내부 심사원 자격인정 평가 (100점 만점, 자격인증 기준 70이상) — "위 사람의 (자격) 자격을 인정함." 대표이사',
      header: [h('kind', '자격 구분', 'select', ['특별공정 작업자', '검사 및 시험', '내부 심사원']), h('certNo', '인정번호'), h('dept', '소속', 'dept'), h('pos', '직책'),
        h('first', '최초인증일자', 'date'), h('name', '성명', 'user'), h('birth', '생년월일', 'date'), h('eduList', '교육이수현황(교육과정명·기간·시간)', 'textarea'),
        h('total', '평가점수', 'number'), h('verdict', '평가결과', 'select', ['적', '부']), h('valid', '자격인증 유효기간')],
      tableTitle: '자격인정 평가',
      cols: [c('req', '자격인정요건'), c('std', '평가기준'), c('score', '평점', null, 'number'), c('remark', '비고')],
      items: [
        it('학력 (15) — 학교명·소재지·전공', '전문대졸↑ 15 / 고졸 12 / 중졸 10 / 중졸미만 7'),
        it('시험/검사 경력 (15) — 회사명·근무기간·근무분야', '3년↑ 15 / 2년↑ 12 / 1년↑ 10 / 1년미만 7'),
        it('근속연수 (10) — 입사일자·입사부서·근속연수', '3년↑ 10 / 2년↑ 8 / 1년↑ 6 / 1년미만 4'),
        it('업무능력 1) PC활용 (5)', '독자수행5 / 지시수용4 / 일부수용3 / 개념파악1 / 전혀모름0'),
        it('업무능력 2) 도면보는법 (5)', '독자수행5 / 지시수용4 / 일부수용3 / 개념파악1 / 전혀모름0'),
        it('업무능력 3) 제품 및 부품의 기능파악 (5)', '독자수행5 / 지시수용4 / 일부수용3 / 개념파악1 / 전혀모름0'),
        it('업무능력 4) 금속재료 일반 (5)', '독자수행5 / 지시수용4 / 일부수용3 / 개념파악1 / 전혀모름0'),
        it('업무능력 5) 열처리기술 일반 (5)', '독자수행5 / 지시수용4 / 일부수용3 / 개념파악1 / 전혀모름0'),
        it('업무능력 6) 가공기술 일반 (5)', '독자수행5 / 지시수용4 / 일부수용3 / 개념파악1 / 전혀모름0'),
        it('업무능력 7) 정밀측정 기술 (5)', '독자수행5 / 지시수용4 / 일부수용3 / 개념파악1 / 전혀모름0'),
        it('업무능력 8) 품질관리 기법 (5)', '독자수행5 / 지시수용4 / 일부수용3 / 개념파악1 / 전혀모름0'),
        it('교육 (20)', '30h↑ 20 / 20h↑ 15 / 10h↑ 10')
      ],
      approval: ['작성', '검토1', '검토2', '승인'] },
    { code: 'MD-0703-006', title: '다기능 숙련도 평가서', doc: 'MD-0703', // B-60
      url: G + '1fIicccLo1Gg89lR897KP8mjvOq32VXlX7uS0lDegOlo', srcTitle: '(작업자)다기능 숙련도 평가', cycle: '년',
      purpose: '작업자 업무능력 및 숙련도 파악을 위한 기초자료로 활용하고 level up을 하기 위함. 숙련도 기준: A등급(90점↑) 감독을 받아서 수행할 수 있는 수준 / B등급(80점↑) 다른 인원을 교육할 수 있는 수준 / C등급(70점↑) 지도 없이 혼자서 수행할 수 있는 수준 / D등급(69점↓) 지도 및 Level-Up 필요한 수준 (원문)',
      header: [h('line', 'LINE'), h('procNo', '공정 NO.'), h('multi', '다기능 평가(설비 세팅·가공 작업·마무리 작업)', 'textarea'), h('edu', '교육 실적', 'textarea'), h('opinion', '평가자 의견', 'textarea')],
      tableTitle: '업무능력 평가',
      cols: [c('name', '성명'), c('rank', '직급'), c('equip', '설비점검'), c('self', '자주검사'), c('std', '작업표준'), c('nc', '부적합품 처리'), c('forge', '가공기술'), c('metal', '금속재료 일반'),
        c('score', '평가점수', null, 'number'), c('grade', '등급', ['A', 'B', 'C', 'D']), c('remark', '비고')],
      approval: ['팀원', '팀장'] },
    { code: 'MI-1001-002', title: '3정5S 체크시트(품질측정실)', doc: 'MI-1001' }, // B-24
    { code: 'MI-1001-003', title: '3정5S 체크시트(가공 라인)', doc: 'MI-1001' },
    { code: 'MI-1001-004', title: '3정5S 체크시트(자재/완성품/외부창고)', doc: 'MI-1001' },
    { code: 'MI-1001-005', title: '3정5S 체크시트(검사&포장실)', doc: 'MI-1001' }
  ];

  /* 3정5S 구역별 체크시트 상세 (B-24) */
  var Z = {
    'MI-1001-002': chk5s('2구역 품질측정실', S8, [].concat(
      grp('정리', ['게시물 Update', '불필요품', '서류함']),
      grp('정돈', ['장소·용도', '품명 표시', '적치대·게시판']),
      grp('청소', ['통로·바닥 먼지·물·기름·이형제 비산', '계측설비 청소', '쓰레기 분리·청소도구']),
      grp('청결', ['작업공간 청정도', '계측기 청정도', '계측기 관리상태-교정TAG·등록·손망실']),
      grp('습관화', ['복장', '장소·시간', '업무 효율'])), 120),
    'MI-1001-003': chk5s('3구역 가공 라인', S8, [].concat(
      grp('정리', ['바닥 낙하품', '작업대·설비 개인사물·배선·호스', '불필요 치구/공구/금형']),
      grp('정돈', ['장소표시·구획선·품목표시', '재공품 적재·선입선출', '공정 PALLET 적재']),
      grp('청소', ['통로·바닥', '설비 청소', '철판 스크랩 방치']),
      grp('청결', ['작업공간', '가공 설비(CNC) 절삭유·칩·누유', '압력게이지 관리']),
      grp('눈으로 보는 관리', ['안전게시물·작업표준서 게시', '기준서·지침 준수-복장·보호구', '공정이동전표/작업표준서 관리'])), 120),
    'MI-1001-004': chk5s('4구역 자재/완성품/외부창고', ['10', '8', '6', '5', '4', '3', '2', '1'], [].concat(
      grp('3정5S 생활화 (5점)', ['정위치', '정품만', '적정량', '바로 사용 가능', '불필요·방치 없음']),
      grp('청소관리 (5점)', ['먼지·오염', '적재장소 청결', '녹·먼지 오염 방지 보관', '용기·팔레트 파손', '보관용기 청결']),
      grp('제품 보관 상태 (10점)', ['보관위치·관리상태', '부품식별표 부착', '식별표-부품 일치', 'LOT 구분·선입선출', '포장용기 다단적재'])), 100),
    'MI-1001-005': chk5s('5구역 검사&포장실', S8, [].concat(
      grp('정리', ['검사대·적치대 불필요물', '검사물품 구분', '바닥 낙하품']),
      grp('정돈', ['장소표시·구획선(제품/검사구 보관)', '검사완료/대기 관리', 'PALLET 적재']),
      grp('청소', ['통로·바닥', '검사구 청소', '쓰레기·청소도구']),
      grp('청결', ['작업대 청정도', '검사라인 청정도', '검사 무관 제품 방치']),
      grp('습관화', ['복장', '장소·시간', '업무 효율'])), 120)
  };
  window.SEED.extraForms.forEach(function (f) {
    var z = Z[f.code]; if (!z) return;
    Object.keys(z).forEach(function (k) { f[k] = z[k]; });
  });
  window.SEED.formDetails['MI-1001-001'].purpose += '. 등급기준: A 우수 118~125점, B 양호 108~117점, C 보통 99~107점, D 미흡 98점 이하 (평가결과 요약: 정리·정돈·청소·청결·습관화 각 25점). 원본에 연간 점검계획 대비 실적·월간 3정5S 보고서 포함';
})();
