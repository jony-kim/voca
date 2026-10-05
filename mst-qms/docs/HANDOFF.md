# MST QMS — 인수인계서 (다음 세션용)

작성일 2026-10-05 · 저장소 `jony-kim/voca` · 브랜치 `claude/confident-clarke-eqnktw` · 폴더 `mst-qms/`

---

## 1. 무엇을 만들었나
주식회사 엠에스티(MST)의 ISO 9001:2015 품질경영시스템을 **오프라인 소프트웨어**로 만들었습니다. 인증 범위는 반도체 장비 부품(Chuck) 생산입니다.

- **실행 방식 2가지**
  - **브라우저형:** `app/index.html`을 더블클릭하면 열립니다. 데이터는 localStorage에 저장합니다.
  - **데스크톱 앱(Electron):** Windows .exe와 macOS .dmg로 만들 수 있습니다. 데이터는 JSON 파일에 저장하고 공유폴더를 지정할 수 있으며, 매일 자동 백업합니다.
- **기준 데이터:** Google Drive `MST` 폴더 원본에서 추출했습니다. `app/data/seed-*.js`에 있고, 원문 정리본은 `docs/source/*.md`입니다.
- **핵심 요구:** ISO 9001 ↔ 세메스 SSQ 고객평가 시트 **연동**입니다. 메뉴 「ISO ↔ 고객평가 연동」에서 봅니다.

### 사용자 요청 이력과 반영 상태
| 요청 | 상태 |
|---|---|
| MST 내용을 소프트웨어로, Windows·Mac에서 동작 | ✅ 브라우저형 + Electron. 설치파일 빌드는 GitHub Actions(수동 실행)로 하며 **아직 실행하지 않음** |
| 네이버클라우드 내용과 비교해 더 잘 | ⚠ 네이버클라우드에는 접속할 수 없었습니다. 대신 타사 폴더(혜성고무 QMS 포털 V1)를 분석해 기준으로 삼았고, 분석 내용은 `docs/source/06_…md`에 있습니다. |
| SQ 대신 고객사 평가 시트(내부평가 시트 참고) | ✅ 세메스 SSQ Audit Check Sheet 45항목 자체점검을 넣었습니다. |
| ISO와 고객 평가 시트 연동이 핵심 | ✅ `link.js`와 `data/seed-link.js` (아래 4장) |
| 미래지향 로그인 | ✅ `login.js`: 입자 애니메이션, 개인 PIN, 권한 3단계 |
| 문서 오타 수정 | ✅ 259건. 「문서 체계 → 원본 대비 수정」 화면에서 볼 수 있습니다. |
| 시스템에서 관련 내용 검색 | ✅ 통합 검색(Ctrl+K)이 문서 본문, 양식 항목, 심사 질문, SSQ, KPI, 수정 내역까지 찾습니다. |
| 관련 양식 실제 반영 | ✅ 원본 양식 67종을 전자기록으로 옮겼고, SSQ 공백 보완 양식 14종을 추가했습니다(13종 + MI-0809-001). |
| 타사 명칭·내용 수정 | ✅ 흥국, HK, 혜성, 프레스·코일, HKB/HKP/QPF 번호 등 40여 건을 고쳤습니다. |
| KPI 목표는 임의로 넣고 업체가 수정 | ✅ 가목표 20개를 넣었습니다. KPI 화면의 노란 칸을 고치면 확정되고 이력이 남습니다. |
| 원본 번호를 맞춰서 넣기 | ✅ 정합성 이슈 1–9번을 정정했습니다(아래 5장). |

---

## 2. 실행·테스트
```bash
cd mst-qms
npm install                 # electron, electron-builder
npm start                   # 데스크톱 앱 실행
npm run check               # 기준 데이터·스크립트 문법·참조 무결성 점검 (CI에서도 실행)
node scripts/e2e.js         # Playwright 회귀 테스트 (화면 44개 + 업무 흐름)
                            # 앱 폴더를 임시 위치에 복사해서 실행하는 것이 좋습니다 (브라우저 저장소가 남음)
```
- 클라우드 컨테이너에서는 `NODE_PATH=/opt/node22/lib/node_modules node scripts/e2e.js <app 복사본> <스크린샷 폴더>`로 실행합니다.
- Electron 확인은 `xvfb-run`과 Playwright `_electron.launch({ executablePath: 'node_modules/electron/dist/electron', args: ['.', '--no-sandbox'] })`로 합니다.
- e2e 테스트는 로그인(사용자 2번째, PIN 1234)부터 시작합니다. 테스트 범위: 부적합 등록, 내부심사 → 지적 → 시정조치 연결, 내부심사 → SSQ 반영, 경영검토 자동 작성, SSQ 채점, 기록 작성, KPI 목표 수정, 정합성 오류 0, 새로고침 후 데이터 유지.
- 설치파일: GitHub → Actions → **"MST QMS 설치파일 빌드"** → Run workflow. 워크플로 파일은 `/.github/workflows/mst-qms-build.yml`이고, 결과는 Artifacts에 .exe와 .dmg로 올라옵니다.

---

## 3. 구조
```
mst-qms/
├─ app/                    화면 (외부 라이브러리·CDN 없음, file://에서 동작)
│  ├─ index.html           스크립트 로드 순서가 중요 (data → core → pages → registers → modules → tools → link → login → app)
│  ├─ styles.css           라이트·다크 토큰, 인쇄, 로그인 스타일
│  ├─ core.js              Q 네임스페이스: 유틸, 저장소(load/save/migration), 라우터, 이벤트 위임, 모달, 폼, 표, SVG 차트
│  ├─ pages.js             대시보드, 검색, 방침·조직, 프로세스맵, 문서체계(개정·정합성·수정내역), 조항맵, KPI, 부적합
│  ├─ registers.js         관리대장 엔진(REG_LIST 13종), 양식 전자기록 엔진, 사진 첨부, finalizeSeed()
│  ├─ modules.js           내부심사, 세메스 SSQ 자체점검, 경영검토, 교육훈련, 가이드, 설정
│  ├─ tools.js             SPC(X̄-R, Cpk, 이상규칙), MSA(Gage R&R 평균·범위법)
│  ├─ link.js              ISO ↔ SSQ ↔ 문서 ↔ 기록 ↔ 내부심사 연동
│  ├─ login.js             로그인, PIN, 권한 가드(capture 단계에서 data-act 차단)
│  ├─ app.js               부팅, 문서번호 자동 부여, 정합성 자동 검사, KPI 자동 집계
│  └─ data/
│     ├─ seed-core.js      회사·방침·목표·조직·프로세스·문서 48·양식 목록·정합성 이슈·ISO 조항 39·목표 KPI 4  (S.version=2)
│     ├─ seed-audit.js     KPI 21, 내부심사 체크시트(CK-ISO 42, CK-NSSQ 36), 세메스 SSQ 45(custEval), 교육과정 4(퀴즈), 완료보고, revisionLog
│     ├─ seed-docs.js      절차서·지침서 47종 상세(목적·범위·용어·책임·절차 단계·양식 연결)
│     ├─ seed-forms.js     양식 구조 59종 + extraForms 8
│     ├─ seed-link.js      SSQ 45항목별 {clauses, docs, forms, xforms, evid, ck, point, gap}
│     ├─ seed-gap.js       SSQ 공백 보완: 신규 제정 권고 문서 2종(MI-0703, MI-0810)과 양식 13종, 연동표 갱신
│     └─ seed-targets.js   KPI 가목표 20개, MI-0809-001 샘플링 기준표, 번호정정 revisionLog
├─ electron/main.js, preload.js   데이터 파일 IPC(원자적 저장), 공유폴더 지정, 일일 백업 30개
├─ scripts/check.js, e2e.js
├─ docs/HANDOFF.md (이 문서), docs/source/*.md (원본 추출 정리본 6종), docs/screens/*.png
├─ README.md               사용자용 설명서 (메뉴, 타사 포털 비교, 한계)
└─ MST_QMS_실행_Windows.bat / MST_QMS_실행_Mac.command
```

### 데이터 흐름
1. **시드 → 상태:** `window.SEED`(읽기 전용 원본) → `Q.finalizeSeed()`가 formList+extraForms에 formDetails를 합쳐 `SEED.forms`를 만들고, docDetails를 documents에 병합하고, objectiveKpis+kpis를 합칩니다.
2. **불러오기:** `Q.load()`가 저장된 상태를 읽고 `applySeed()`를 실행합니다.
   - docs·kpis·checklists·courses는 **상태로 복사한 뒤부터 사용자가 수정**할 수 있습니다.
   - 시드에 새 항목이 생기면 그 항목만 상태에 추가합니다.
3. **버전 이전:** `S.version`이 오르면 `applySeed`의 `if (st.seedVersion < S.version)` 블록이 실행됩니다.
   - v2에서는 비어 있던 KPI 목표에 가목표를 넣고, 문서 notes를 갱신합니다.
   - 업체가 고친 값은 덮어쓰지 않습니다. **기준 데이터를 바꿀 때는 버전을 올리고 이 블록에 이전 규칙을 추가하세요.**
4. **저장 위치:** 상태는 `Q.S`입니다. 브라우저는 localStorage `mstqms.state.v1`, Electron은 `문서/MST_QMS/mst-qms-data.json`(설정에서 변경 가능)에 저장합니다.

### 화면 패턴
- **라우팅:** `Q.route(name, title, fn)`로 등록하고 해시 `#/name/arg`로 이동합니다.
- **이벤트:** 버튼은 `data-act`, 변경은 `data-chg`, 입력은 `data-inp`, 이동은 `data-go`를 쓰고 핸들러는 `Q.on()`으로 등록합니다.
- **화면 확장:** `Q.routes.x.fn`을 감싸서 기능을 덧붙입니다(app.js·login.js 참고).
- **권한:** 열람 권한에서 허용되는 동작은 `login.js`의 `READ_OK`, 관리자 전용 동작은 `ADMIN_ONLY` 정규식에 정의합니다. **새 동작을 추가하면 이 목록도 확인하세요.**

---

## 4. ISO ↔ 세메스 SSQ 연동 (핵심)
- **SSQ 항목별 상태(`Q.ssqStatus(no)`)**
  - std(기준 수립): 연결된 문서가 모두 '유효'이면 ok, '제정 예정'·'개정중'이 섞이면 part, 문서가 없으면 none입니다.
  - rec(이행 실적): 연결된 양식·대장·증거의 기록 건수와 날짜를 봅니다. **최근 3개월 모두** 기록이 있으면 ok입니다.
  - aud: 연결된 내부심사 문항의 최근 판정입니다.
  - score: 최근 SSQ 자체점검 점수입니다.
- **내부심사 → SSQ 매핑:** CK-ISO 42문항은 SSQ와 1:1입니다(SSQ 1–4 → CK 1–4, SSQ 6–43 → CK 5–42; 5·44·45는 대응 문항 없음). `Q.auditToSsq()` 환산 규칙은 L=배점, M=배점/2, H=0이고, 평가 기준 단계가 있으면 가장 가까운 단계 점수로 맞춥니다.
- **과락:** 44(보안·도면)와 45(사업자등록증)는 적합/과락 판정이며 점수에 들어가지 않습니다.
- **ISO 조항 화면:** `Q.ssqForClause()`로 연결된 SSQ 항목을 보여줍니다.
- **체계 공백 10건(9, 24, 31–35, 43–45):** `seed-gap.js`의 '제정 예정' 문서·양식으로 보완했습니다. MST가 검토 후 「문서 → 개정 승인」하면 '유효'로 바뀝니다.

---

## 5. 결정 사항 (컨설턴트 판단으로 확정한 것)
### 문서번호 정정 (정합성 이슈 1–9 → 정정 완료)
| 원본 | 확정 |
|---|---|
| 표준목록 MD-0803 공정·4M 중복, MD-0804 자재 | **MD-0803 4M 변경 / MD-0804 공정 관리 / MD-0807 자재 관리** (문서체계표 기준) |
| MI-0802 QC공정도 / MI-0803 CTQ (표준목록) | **MI-0802 CTP(CTQ) / MI-0803 QC 공정도** (양식 MI-0803-001과 일치) |
| MD-0601 / MD-0602 | **MI-0601 리스크관리 / MI-0602 SWOT** (지침서) |
| 고객만족 MD-0902(내부심사와 중복), 양식 MD-0901-001~003 | **MD-0903, 양식 MD-0903-001~003** |
| MI-0809 행의 MI-0808-002 | MI-0808-002 공정능력평가표는 MI-0808 소속으로 두고, **MI-0809-001 샘플링 검사 기준표를 신설** |
| MD-0804-001·-003 둘 다 설비 이력 카드 | **MD-0804-003 폐지** |
| MD-0401-001/002 (상위 MD-0901, MD-0401 없음) | **MP-0401-001 내외부 이슈 분석, MP-0401-002 내외부 이슈 파악표** |
| 매뉴얼 6.2 "사업계획 및 경영검토 절차서" | "경영검토 절차서(MD-0901)" |
| 검사업무 SP vs 8.운용 구분 | 프로세스 분류와 ISO 조항은 별개로 표시 |

- 아직 원본 수정이 필요한 것
  - **10번:** 매뉴얼에 남은 IATF 문구
  - **11번:** 품질방침 날짜(2013)가 설립일보다 앞섬
  - **12번:** 프로세스별 입력·출력 확정. 거북이 다이어그램 값은 [권장] 값입니다.
- **Drive 원본(구글 시트·슬라이드)에는 정정 내용이 반영되지 않았습니다.** 수정 내역 CSV를 보고 원본에 반영해야 합니다.

### 가목표 (seed-targets.js)
K01 90%, K03 ≤40%, K04 ≤0.5%, K05 100%, K06 95%, K07 4회, K08 ≤10%, K09 95%, K10 ≤2%, K11 100%, K12 90%, K13–15 100%, K16 90%, K17 ≤1,000ppm, K18 100%, K19 90%, K20 ≤500ppm, K21 100%.
K02(업체공정감사 합격률)는 원본 값 2를 그대로 두었습니다. 원본에서도 단위가 모호합니다.

### [권장] 기준 (업체 확정 필요)
- 리스크 점수 L×S: 15 이상 상, 8 이상 중
- 협력사 등급: A≥90, B≥80, C≥70 (배점 품질40·납기30·가격15·협력15)
- 내부심사 M 판정 = 가중치×5
- SSQ에서 M → 배점/2

---

## 6. 남은 일 (우선순위 순)
1. **실기 확인:** Windows PC와 맥에서 .bat/.command와 설치파일을 실행해 보기. 아직 한 번도 확인하지 않았습니다. Actions 워크플로도 아직 실행하지 않았습니다.
2. **[권장] 기준을 설정 화면에서 편집할 수 있게 하기:** 지금은 리스크·협력사 등급 기준이 `registers.js` 코드에 고정되어 있습니다.
3. **Drive 원본 반영:** 오타·타사명칭 300여 건과 번호정정 8건을 원본에 반영하기. 「문서 체계 → 원본 대비 수정 → CSV」를 이용합니다.
4. **업종 확인:** 양식 `MD-0804-004` 고정 항목은 원본의 CNC 선반 예시입니다. `MI-1001-003` 3구역은 '가공 라인'으로 바꿨습니다. MST 실제 설비에 맞는지 확인해야 합니다.
5. **원본에서 읽지 못한 내용:** 조직도, 생산제품, 주요 고객은 원본에서 이미지라 읽지 못했습니다. 회사 개요의 `customers`가 비어 있습니다.
6. **교육 퀴즈 검수:** 각 과정 5문항은 교재 내용으로 생성한 것입니다(src:'생성'). 컨설턴트 검수가 필요합니다.
7. **다중 사용자 동시 편집:** 지금은 공유 파일에 나중에 저장한 내용이 남습니다. 필요하면 서버형(네이버 클라우드 + DB)으로 바꾸는 것을 검토합니다.
8. **세메스 SSQ 등급 기준:** 원본에 합격점과 A/B/C 등급 기준이 없습니다. 세메스에 확인이 필요합니다.

---

## 7. 다음 세션 시작 프롬프트 예시
> 저장소 jony-kim/voca 브랜치 claude/confident-clarke-eqnktw 의 `mst-qms/docs/HANDOFF.md`를 먼저 읽고 이어서 작업해줘.
> 이번에는 (예: 6장 2번 — 리스크·협력사 등급 기준을 설정 화면에서 편집 가능하게) 해줘.
> 수정 후 `npm run check`와 `scripts/e2e.js`를 통과시키고 커밋·푸시해줘.

## 8. 원본 위치
- **MST 원본:** https://drive.google.com/drive/folders/1-9gOJY4c1FfkjSWp6rni8CWML5ajAiEa
  - 하위 폴더: 1. 품질매뉴얼 / 2. 프로세스_절차서_지침_양식(MP·COP·SP·양식) / 3. 프로세스 맵 및 문서체계표 / MST 2(4. KPI, 5. 내부심사 체크시트, 6. 교육 자료, 7. 완료 보고) / 원본(ISO 규격, SPC, MSA, 19011)
  - MST 2 폴더의 1–3번은 원본과 같은 사본입니다.
- **타사 참고(혜성고무):** https://drive.google.com/drive/u/0/folders/1BTELDrrH4K8pWTROVM_rQRZ8T16CakoE
  - 「8. 시스템(포털)」의 설치 zip(168MB)은 크기 제한 때문에 읽지 못했습니다. 화면 캡처와 원천 엑셀로만 분석했습니다.
