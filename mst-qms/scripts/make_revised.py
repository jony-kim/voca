"""MST QMS 원본 수정본(정정본) 생성기
입력 : scripts/export-seed.js 가 만든 seed.json (소프트웨어 기준 데이터 = 오타·타사명칭·번호 정정 반영본)
출력 : docs/revised/
  00_수정내역_및_정합성.xlsx
  01_문서체계표_표준목록_정정본.xlsx
  02_절차서_지침서/<번호>_<문서명>.docx
  03_양식/<번호>_<양식명>.xlsx
  04_KPI_성과지표(가목표).xlsx
  05_내부심사_체크시트.xlsx
  06_세메스SSQ_ISO_연동표.xlsx
사용: python3 scripts/make_revised.py <seed.json> <출력 폴더>
"""
import json, os, re, sys
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor, Cm

SEED, OUT = sys.argv[1], sys.argv[2]
ALL = os.environ.get('ALL') == '1'   # 1이면 전체 재작성본, 기본은 원본이 없는 신규 문서·양식만 생성
S = json.load(open(SEED, encoding='utf-8'))
CO = '주식회사 엠에스티'
FONT = '맑은 고딕'
os.makedirs(OUT, exist_ok=True)

def safe(name):
    return re.sub(r'[\\/:*?"<>|]', '_', name).strip()

def clean_ret(r):
    if not r or re.search(r'공란|미기재|원문|없음', r):
        return '문서화된 정보 관리 절차(MD-0702)에 따름'
    return r

DOCS = {d['code']: d for d in S['documents']}
FORMS = {f['code']: f for f in S['forms']}
PROCS = {p['code']: p for p in S['processes']}

# ───────── 엑셀 공통 ─────────
thin = Side(style='thin', color='888888')
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
HEAD = PatternFill('solid', fgColor='DCE6F2')
TITLE = Font(name=FONT, size=15, bold=True)
BOLD = Font(name=FONT, size=10, bold=True)
NORM = Font(name=FONT, size=10)
WRAP = Alignment(wrap_text=True, vertical='center')
CENTER = Alignment(horizontal='center', vertical='center', wrap_text=True)

def sheet_table(ws, headers, rows, start=1, widths=None):
    for j, h in enumerate(headers, 1):
        c = ws.cell(row=start, column=j, value=h); c.font = BOLD; c.fill = HEAD; c.border = BOX; c.alignment = CENTER
    for i, r in enumerate(rows, start + 1):
        for j, v in enumerate(r, 1):
            c = ws.cell(row=i, column=j, value=v); c.font = NORM; c.border = BOX; c.alignment = WRAP
    if widths:
        for j, w in enumerate(widths, 1):
            ws.column_dimensions[get_column_letter(j)].width = w
    ws.freeze_panes = ws.cell(row=start + 1, column=1)

# ───────── 00 수정내역 ─────────
def form_label(code):
    f = FORMS.get(code)
    return f'{code} {f["title"]}' if f else code

def sec00():
    global wb, ws, ws2, ws3, rows, docs
    wb = Workbook(); ws = wb.active; ws.title = '원본 대비 수정 내역'
    log = S.get('revisionLog', [])
    sheet_table(ws, ['No', '구분', '파일(데이터)', '위치', '수정 전', '수정 후'],
                [[i + 1, r.get('kind', ''), r.get('file', ''), r.get('where', ''), r.get('before', ''), r.get('after', '')] for i, r in enumerate(log)],
                widths=[6, 10, 16, 34, 50, 50])
    ws2 = wb.create_sheet('정합성 이슈 조치')
    sheet_table(ws2, ['No', '원본 이슈', '권고 조치', '정정 결과'],
                [[i['no'], i['text'], i['fix'], i.get('resolved', '정정본 반영')] for i in S.get('docIssues', [])], widths=[6, 60, 45, 55])
    wb.save(os.path.join(OUT, '00_수정내역_및_정합성.xlsx'))


# ───────── 01 문서체계표·표준목록 ─────────
def sec01():
    global wb, ws, ws2, ws3, rows, docs
    wb = Workbook(); ws = wb.active; ws.title = '문서체계표'
    rows = []
    for p in S['processes']:
        docs = [d for d in S['documents'] if d['process'] == p['code'] and d['level'] in ('절차서', '지침서')]
        for d in docs:
            fs = [f for f in S['forms'] if f['doc'] == d['code']] or [None]
            for f in fs:
                rows.append([p['type'], p['name'], p['code'], p['owner'], d['level'], d['title'], d['code'],
                             f['title'] if f else '', f['code'] if f else '', d.get('status', '유효')])
        for f in [f for f in S['forms'] if f['doc'] == p['code']]:
            rows.append([p['type'], p['name'], p['code'], p['owner'], '프로세스', DOCS[p['code']]['title'], p['code'], f['title'], f['code'], '유효'])
    sheet_table(ws, ['분류', '프로세스명', '프로세스 번호', '오너', '수준', '절차서/지침서명', '문서번호', '양식명', '양식번호', '상태'], rows,
                widths=[7, 18, 12, 9, 9, 30, 11, 34, 14, 10])
    ws2 = wb.create_sheet('표준목록')
    lv = {'매뉴얼': 0, '프로세스': 1, '절차서': 2, '지침서': 3}
    docs = sorted(S['documents'], key=lambda d: (d['clauses'][0] if d.get('clauses') else '99', lv.get(d['level'], 9), d['code']))
    sheet_table(ws2, ['No', 'ISO 조항', '문서번호', '수준', '문서명', '개정', '오너', '관련 프로세스', '상태', '비고'],
                [[i + 1, ', '.join(d.get('clauses', [])), d['code'], d['level'], d['title'], d.get('rev', ''), d.get('owner', ''), d.get('process', ''), d.get('status', '유효'),
                  (d.get('notes') or '') if '번호 정정' in (d.get('notes') or '') or d.get('proposed') else ''] for i, d in enumerate(docs)],
                widths=[5, 14, 11, 9, 32, 6, 9, 12, 10, 60])
    ws3 = wb.create_sheet('상호관계표')
    cops = [p for p in S['processes'] if p['type'] == 'COP']
    others = [p for p in S['processes'] if p['type'] != 'COP']
    sheet_table(ws3, ['MP/SP \\ COP'] + [c['name'] for c in cops],
                [[o['type'] + ' ' + o['name']] + ['◎' if c['code'] in o.get('links', []) else '' for c in cops] for o in others], widths=[22] + [16] * len(cops))
    wb.save(os.path.join(OUT, '01_문서체계표_표준목록_정정본.xlsx'))


# ───────── 02 절차서·지침서 (docx) ─────────
def sec02():
    global wb, ws, ws2, ws3, rows, docs
    DDIR = globals().get('DDIR_X') or os.path.join(OUT, '02_절차서_지침서'); os.makedirs(DDIR, exist_ok=True)

    def set_font(doc):
        st = doc.styles['Normal']; st.font.name = FONT; st.font.size = Pt(10)
        st.element.rPr.rFonts.set(qn('w:eastAsia'), FONT)
        for s in ('Heading 1', 'Heading 2', 'Title'):
            x = doc.styles[s]; x.font.name = FONT; x.element.rPr.rFonts.set(qn('w:eastAsia'), FONT); x.font.color.rgb = RGBColor(0x1F, 0x3A, 0x5F)

    def shade(cell, color='DCE6F2'):
        tcPr = cell._tc.get_or_add_tcPr()
        from docx.oxml import OxmlElement
        shd = OxmlElement('w:shd'); shd.set(qn('w:val'), 'clear'); shd.set(qn('w:color'), 'auto'); shd.set(qn('w:fill'), color); tcPr.append(shd)

    def table(doc, headers, rows, widths=None):
        t = doc.add_table(rows=1, cols=len(headers)); t.style = 'Table Grid'; t.alignment = WD_TABLE_ALIGNMENT.CENTER
        for j, h in enumerate(headers):
            c = t.rows[0].cells[j]; c.text = h; shade(c); c.paragraphs[0].runs[0].bold = True
        for r in rows:
            cells = t.add_row().cells
            for j, v in enumerate(r):
                cells[j].text = '' if v is None else str(v)
        if widths:
            for row in t.rows:
                for j, w in enumerate(widths):
                    row.cells[j].width = Cm(w)
        return t

    def form_label(code):
        f = FORMS.get(code)
        return f'{code} {f["title"]}' if f else code

    for d in S['documents']:
        if d['code'] == 'QM-01':
            continue
        doc = Document(); set_font(doc)
        sec = doc.sections[0]; sec.left_margin = sec.right_margin = Cm(2); sec.top_margin = Cm(1.8)
        hdr = doc.add_table(rows=2, cols=4); hdr.style = 'Table Grid'
        hdr.cell(0, 0).merge(hdr.cell(1, 0)).text = CO
        hdr.cell(0, 1).merge(hdr.cell(1, 1)).text = d['title']
        hdr.cell(0, 2).text = '문서번호'; hdr.cell(0, 3).text = d['code']
        hdr.cell(1, 2).text = '개정 / 시행'; hdr.cell(1, 3).text = f"Rev.{d.get('rev', '0')} / {d.get('date') or '제정 예정'}"
        for c in (hdr.cell(0, 2), hdr.cell(1, 2)): shade(c)
        hdr.cell(0, 1).paragraphs[0].runs[0].font.size = Pt(16); hdr.cell(0, 1).paragraphs[0].runs[0].bold = True
        doc.add_paragraph()
        ap = doc.add_table(rows=2, cols=3); ap.style = 'Table Grid'; ap.alignment = WD_TABLE_ALIGNMENT.RIGHT
        for j, h in enumerate(['작성', '검토', '승인']): ap.cell(0, j).text = h; shade(ap.cell(0, j)); ap.cell(1, j).text = '\n\n'
        if d.get('status') and d['status'] != '유효':
            p = doc.add_paragraph(); r = p.add_run(f"※ 상태: {d['status']} — " + ('세메스 SSQ 대응 신규 제정 권고 문서 (검토·승인 후 시행)' if d.get('proposed') else '')); r.bold = True; r.font.color.rgb = RGBColor(0xA8, 0x6A, 0x00)
        doc.add_heading('개정 이력', level=2)
        revs = [['0', d.get('date') or '', '최초 제정 (ISO 9001:2015)', '']]
        if d.get('notes') and ('정정' in d['notes'] or '번호' in d['notes']):
            revs.append(['1', '2026-10-05', '정정본 — ' + re.sub(r'\s+', ' ', d['notes'])[:120], '컨설팅 정정 (승인 필요)'])
        table(doc, ['Rev', '일자', '내용', '비고'], revs, [1.2, 2.5, 10, 3.5])
        p = PROCS.get(d['process'])
        doc.add_heading('1. 목적', level=2); doc.add_paragraph(d.get('purpose') or '-')
        doc.add_heading('2. 적용범위', level=2); doc.add_paragraph(d.get('scope') or '-')
        doc.add_paragraph(f"관련 프로세스: {p['type']} {p['code']} {p['name']} (오너 {p['owner']}) · ISO 9001:2015 {', '.join(d.get('clauses', []))}" if p else '')
        n = 3
        if d.get('terms'):
            doc.add_heading(f'{n}. 용어의 정의', level=2); table(doc, ['용어', '정의'], [[t.get('t'), t.get('d')] for t in d['terms']], [4, 13]); n += 1
        if d.get('resp'):
            doc.add_heading(f'{n}. 책임과 권한', level=2); table(doc, ['부서/직책', '책임과 권한'], [[r.get('who'), r.get('what')] for r in d['resp']], [4, 13]); n += 1
        if d.get('steps'):
            doc.add_heading(f'{n}. 업무 절차', level=2)
            table(doc, ['No', '업무', '세부 내용', '담당', '관련 양식'],
                  [[i + 1, s.get('t'), s.get('d', ''), s.get('who', ''), '\n'.join(form_label(x) for x in s.get('forms', []))] for i, s in enumerate(d['steps'])], [1, 3.2, 8.3, 2.2, 3.3]); n += 1
        if d.get('kpis'):
            doc.add_heading(f'{n}. 성과지표 (KPI)', level=2)
            for k in d['kpis']: doc.add_paragraph(k, style='List Bullet')
            n += 1
        rel = [x for x in d.get('related', []) if x in DOCS]
        if rel:
            doc.add_heading(f'{n}. 관련 문서', level=2); table(doc, ['문서번호', '문서명'], [[x, DOCS[x]['title']] for x in rel], [3.5, 13.5]); n += 1
        fs = [f for f in S['forms'] if f['doc'] == d['code']]
        doc.add_heading(f'{n}. 관련 양식 및 기록 보존', level=2)
        if fs:
            table(doc, ['양식번호', '양식명', '작성 주기', '보존 기간'], [[f['code'], f['title'], f.get('cycle', ''), clean_ret(f.get('retention'))] for f in fs], [3.5, 7.5, 2.5, 3.5])
        doc.add_paragraph('기록 보존: ' + clean_ret(d.get('retention')))
        doc.save(os.path.join(DDIR, safe(f"{d['code']}_{d['title']}.docx")))


# ───────── 03 양식 (xlsx) ─────────
def sec03():
    global wb, ws, ws2, ws3, rows, docs
    FDIR = globals().get('FDIR_X') or os.path.join(OUT, '03_양식'); os.makedirs(FDIR, exist_ok=True)
    for f in S['forms']:
        wb = Workbook(); ws = wb.active; ws.title = f['code'][:31]
        cols = f.get('cols') or [{'k': 'item', 'label': '항목'}, {'k': 'content', 'label': '내용'}, {'k': 'result', 'label': '결과'}, {'k': 'remark', 'label': '비고'}]
        ncol = max(len(cols), 6)
        ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=ncol - 3)
        ws.cell(1, 1, CO).font = Font(name=FONT, size=9, color='666666')
        ws.merge_cells(start_row=2, start_column=1, end_row=3, end_column=ncol - 3)
        c = ws.cell(2, 1, f['title']); c.font = TITLE; c.alignment = Alignment(vertical='center')
        appr = f.get('approval') or ['작성', '검토', '승인']
        for j, a in enumerate(appr[:3]):
            col = ncol - 2 + j
            h = ws.cell(2, col, a); h.font = BOLD; h.fill = HEAD; h.border = BOX; h.alignment = CENTER
            ws.cell(3, col).border = BOX
        ws.row_dimensions[3].height = 34
        d = DOCS.get(f['doc'], {})
        ws.cell(4, 1, f"양식번호 {f['code']} · 상위문서 {f['doc']} {d.get('title', '')} · Rev.{d.get('rev', '0')}" + (' · [신규 제정 권고]' if f.get('proposed') else '')).font = Font(name=FONT, size=9, color='666666')
        r = 6
        for h in [{'label': '작성일'}] + (f.get('header') or []):
            a = ws.cell(r, 1, h['label']); a.font = BOLD; a.fill = HEAD; a.border = BOX; a.alignment = CENTER
            ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=ncol)
            b = ws.cell(r, 2, ' / '.join(h.get('options', [])) if h.get('options') else ''); b.border = BOX; b.font = Font(name=FONT, size=9, color='888888')
            r += 1
        r += 1
        if f.get('tableTitle'):
            ws.cell(r, 1, f['tableTitle']).font = BOLD; r += 1
        for j, cdef in enumerate(cols, 1):
            h = ws.cell(r, j, cdef['label']); h.font = BOLD; h.fill = HEAD; h.border = BOX; h.alignment = CENTER
        items = f.get('items') or []
        body = items if items else [None] * 15
        for i, it in enumerate(body, r + 1):
            for j in range(1, len(cols) + 1):
                c = ws.cell(i, j); c.border = BOX; c.font = NORM; c.alignment = WRAP
            if it:
                ws.cell(i, 1, it if isinstance(it, str) else it.get('text'))
                if isinstance(it, dict) and it.get('std') and len(cols) > 1: ws.cell(i, 2, it['std'])
            for j, cdef in enumerate(cols, 1):
                if cdef.get('options') and not ws.cell(i, j).value:
                    ws.cell(i, j).value = None
        last = r + len(body)
        opt_note = [f"{cdef['label']}: {' / '.join(cdef['options'])}" for cdef in cols if cdef.get('options')]
        foot = last + 2
        ws.cell(foot, 1, '특이사항').font = BOLD
        ws.merge_cells(start_row=foot + 1, start_column=1, end_row=foot + 3, end_column=ncol)
        ws.cell(foot + 1, 1).border = BOX
        notes = []
        if opt_note: notes.append('판정 기준 — ' + ' · '.join(opt_note))
        if f.get('cycle'): notes.append('작성 주기: ' + f['cycle'])
        notes.append('보존 기간: ' + clean_ret(f.get('retention')))
        if f.get('purpose'): notes.append('용도: ' + f['purpose'])
        for k, t in enumerate(notes):
            ws.cell(foot + 5 + k, 1, t).font = Font(name=FONT, size=9, color='666666')
        for j in range(1, ncol + 1):
            ws.column_dimensions[get_column_letter(j)].width = 30 if j == 1 else (24 if j == 2 and items else 14)
        ws.print_options.horizontalCentered = True
        ws.page_setup.orientation = 'landscape' if len(cols) > 5 else 'portrait'
        ws.page_setup.fitToWidth = 1
        wb.save(os.path.join(FDIR, safe(f"{f['code']}_{f['title']}.xlsx")))


# ───────── 04 KPI ─────────
def sec04():
    global wb, ws, ws2, ws3, rows, docs
    wb = Workbook(); ws = wb.active; ws.title = '성과지표'
    months = [f'{m}월' for m in range(1, 13)]
    sheet_table(ws, ['구분', '프로세스', '지표', '산출식', '단위', '방향', '목표', '목표 상태', '주기', '담당'] + months,
                [['품질목표' if k.get('objective') else '프로세스 KPI', k.get('proc', ''), k['name'], k.get('formula', ''), k.get('unit', ''), '↓ 작을수록' if k.get('dir') == 'down' else '↑ 클수록',
                  k.get('target'), '초기 목표 (업체 확정 전)' if k.get('provisional') else '확정', k.get('cycle', ''), k.get('owner', '')] + [''] * 12 for k in S['kpis']],
                widths=[11, 10, 26, 40, 6, 10, 8, 18, 6, 9] + [7] * 12)
    for row in ws.iter_rows(min_row=2):
        if row[7].value and '가목표' in str(row[7].value):
            row[6].fill = PatternFill('solid', fgColor='FBF0DA')
    wb.save(os.path.join(OUT, 'KPI_성과지표_초기목표.xlsx'))


# ───────── 05 내부심사 체크시트 ─────────
def sec05():
    global wb, ws, ws2, ws3, rows, docs
    wb = Workbook(); first = True
    for ck in S['checklists']:
        ws = wb.active if first else wb.create_sheet(); first = False
        ws.title = ck['id'][:31]
        ws.cell(1, 1, ck['title']).font = TITLE
        rows = []
        for s in ck['sections']:
            for it in s['items']:
                rows.append([s['name'], it.get('no'), it.get('sub', ''), it.get('q', ''), it.get('criteria', ''), it.get('evidence', ''), it.get('weight', ''), it.get('clause', ''), '', ''])
        sheet_table(ws, ['분류', 'No', '중분류', '점검 항목', '평가 기준', '확인 증빙', '가중치', 'ISO 조항', '판정 (L/M/H/NA)', '점검 결과 (5W1H)'], rows, start=3,
                    widths=[14, 5, 14, 48, 36, 26, 7, 9, 12, 30])
    wb.save(os.path.join(OUT, '05_내부심사_체크시트.xlsx'))


# ───────── 06 세메스 SSQ 연동표 ─────────
def sec06():
    global wb, ws, ws2, ws3, rows, docs
    ce = S.get('custEval')
    if ce:
        wb = Workbook(); ws = wb.active; ws.title = 'SSQ_ISO_연동표'
        L = S.get('ssqLink', {})
        rows = []
        for s in ce['sections']:
            for it in s['items']:
                lk = L.get(str(it['no']), {})
                crit = it.get('criteria')
                crit = '\n'.join(f"{c.get('score')}점: {c.get('text')}" for c in crit) if isinstance(crit, list) else (crit or '')
                rows.append([it['no'], s['name'], it.get('q', ''), it.get('points', ''), '과락' if it.get('knockout') else '', crit, it.get('evidence', ''),
                             ', '.join(lk.get('clauses', [])), '\n'.join(form_label(x) if x in FORMS else f"{x} {DOCS[x]['title']}" if x in DOCS else x for x in lk.get('docs', [])),
                             '\n'.join(form_label(x) for x in lk.get('forms', []) + lk.get('xforms', [])), ', '.join(lk.get('evid', [])),
                             ', '.join(str(x) for x in (lk.get('ck', {}) or {}).get('CK-ISO', [])), lk.get('point', ''), lk.get('gapFix') or lk.get('gap', '')])
        ws.cell(1, 1, f"{ce.get('customer', '')} {ce.get('title', '')} ↔ ISO 9001 ↔ MST 문서·기록 연동표").font = TITLE
        sheet_table(ws, ['SSQ', '분류', '평가 항목', '배점', '과락', '평가 기준', '고객 확인 증빙', 'ISO 9001', 'MST 표준문서(기준 수립)', '기록 양식(이행 실적)', '관리대장·기록', '내부심사 CK-ISO', '점검 포인트', '공백 보완'],
                    rows, start=3, widths=[5, 12, 40, 6, 6, 40, 22, 10, 26, 30, 14, 9, 36, 36])
        wb.save(os.path.join(OUT, '세메스SSQ_ISO_연동표.xlsx'))



# 원본 양식이 있는 문서는 원본_정정본(ooxml_fix.py)으로 처리하므로, 기본 실행은
# 수정내역(00)·KPI 가목표(04)·SSQ 연동표(06)와 '원본이 없는 신규 문서·양식'만 만든다.
ONLY_NEW = not ALL
if ONLY_NEW:
    S['documents'] = [d for d in S['documents'] if d.get('proposed')] + [d for d in S['documents'] if not d.get('proposed')]
    _new_docs = [d for d in S['documents'] if d.get('proposed')]
    _new_forms = [f for f in S['forms'] if f.get('proposed') or f['code'] == 'MI-0809-001']
sec04(); sec06()
if ALL:
    sec01(); sec02(); sec03(); sec05()
else:
    _all_docs, _all_forms = S['documents'], S['forms']
    S['documents'] = _new_docs
    globals()['DDIR_X'] = os.path.join(OUT, '8_신규제정_권고(초안)'); globals()['FDIR_X'] = os.path.join(OUT, '8_신규제정_권고(초안)')
    _orig_forms = S['forms']; S['forms'] = _new_forms
    sec02(); sec03()
    S['documents'], S['forms'] = _all_docs, _all_forms
