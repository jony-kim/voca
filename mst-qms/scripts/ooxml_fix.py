"""원본 양식 보존형 텍스트 정정 도구 (xlsx / pptx / docx)
서식·병합·이미지·결재란은 그대로 두고, 파일 내부 XML의 '텍스트 노드'만 바꾼다.

  python3 ooxml_fix.py decode <drive-download.json> <out-file>   # Drive download_file_content 결과(JSON {content: base64}) → 파일
  python3 ooxml_fix.py strings <file>                            # 모든 텍스트 노드 출력 (번호<TAB>텍스트)
  python3 ooxml_fix.py apply <in> <out> <rules.json> [log.json]   # rules: [{"find": "...", "replace": "..."}] (부분 문자열 치환)
  python3 ooxml_fix.py setcell <in.xlsx> <out.xlsx> <cells.json> [log.json]  # [{"sheet": "표준목록", "cell": "C28", "value": "MD-0804"}] 셀 하나만 변경(서식 유지)
  python3 ooxml_fix.py cells <in.xlsx> <sheet>                   # 시트의 셀 주소와 텍스트 출력
"""
import base64, json, os, re, sys, zipfile, html

TEXT_PARTS = re.compile(r'^(xl/sharedStrings\.xml|xl/worksheets/sheet\d+\.xml|ppt/slides/slide\d+\.xml|ppt/notesSlides/.*\.xml|word/document\.xml|word/header\d*\.xml|word/footer\d*\.xml|xl/drawings/drawing\d+\.xml)$')
NODE = re.compile(r'(<(?:t|a:t|w:t)(?:\s[^>]*)?>)(.*?)(</(?:t|a:t|w:t)>)', re.S)

def decode(src, out):
    raw = open(src, encoding='utf-8').read()
    try:
        data = json.loads(raw)
        if isinstance(data, list): data = data[0]
        if isinstance(data, dict) and 'text' in data and 'content' not in data: data = json.loads(data['text'])
        b64 = data['content']
    except Exception:
        b64 = raw
    open(out, 'wb').write(base64.b64decode(b64))
    print('saved', out)

def texts(path):
    z = zipfile.ZipFile(path)
    for name in z.namelist():
        if TEXT_PARTS.match(name):
            xml = z.read(name).decode('utf-8')
            for m in NODE.finditer(xml):
                yield name, html.unescape(m.group(2))

def strings(path):
    seen = set(); i = 0
    for name, t in texts(path):
        if t.strip() and t not in seen:
            seen.add(t); i += 1
            print(f'{i}\t{t}')

def apply(src, out, rules_path, log_path=None):
    rules = json.load(open(rules_path, encoding='utf-8'))
    zin = zipfile.ZipFile(src); zout = zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED)
    log = []
    for item in zin.infolist():
        data = zin.read(item.filename)
        if TEXT_PARTS.match(item.filename):
            xml = data.decode('utf-8')
            def fix(m):
                t = html.unescape(m.group(2)); orig = t
                for r in rules:
                    if r['find'] in t: t = t.replace(r['find'], r['replace'])
                if t != orig:
                    log.append({'part': item.filename, 'before': orig, 'after': t})
                    return m.group(1) + html.escape(t, quote=False) + m.group(3)
                return m.group(0)
            xml = NODE.sub(fix, xml)
            data = xml.encode('utf-8')
        zout.writestr(item, data)
    zout.close()
    unused = [r['find'] for r in rules if not any(r['find'] in l['before'] for l in log)]
    if log_path: json.dump({'changes': log, 'unused_rules': unused}, open(log_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'changed nodes: {len(log)}  unused rules: {len(unused)}')
    for u in unused: print('  UNUSED:', u)

def _sheet_map(z):
    wb = z.read('xl/workbook.xml').decode('utf-8')
    rels = z.read('xl/_rels/workbook.xml.rels').decode('utf-8')
    rid = {m.group(1): m.group(2) for m in re.finditer(r'<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"', rels)}
    rid.update({m.group(2): m.group(1) for m in re.finditer(r'<Relationship[^>]*Target="([^"]+)"[^>]*Id="([^"]+)"', rels)})
    out = {}
    for m in re.finditer(r'<sheet\b[^>]*?name="([^"]+)"[^>]*?r:id="([^"]+)"', wb):
        t = rid[m.group(2)]; out[html.unescape(m.group(1))] = 'xl/' + t.lstrip('/').replace('xl/', '') if not t.startswith('xl/') else t
    return out

def _shared(z):
    try: xml = z.read('xl/sharedStrings.xml').decode('utf-8')
    except KeyError: return []
    return [html.unescape(''.join(re.findall(r'<t(?:\s[^>]*)?>(.*?)</t>', si, re.S))) for si in re.findall(r'<si>(.*?)</si>', xml, re.S)]

def cells(path, sheet):
    z = zipfile.ZipFile(path); sm = _sheet_map(z); ss = _shared(z)
    xml = z.read(sm[sheet]).decode('utf-8')
    for m in re.finditer(r'<c r="([A-Z]+\d+)"([^>]*?)(?:/>|>(.*?)</c>)', xml, re.S):
        ref, attrs, body = m.group(1), m.group(2), m.group(3) or ''
        v = re.search(r'<v>(.*?)</v>', body); t = re.search(r't="(\w+)"', attrs)
        if t and t.group(1) == 's' and v: print(ref, ss[int(v.group(1))], sep='\t')
        elif t and t.group(1) == 'inlineStr': print(ref, html.unescape(''.join(re.findall(r'<t[^>]*>(.*?)</t>', body))), sep='\t')
        elif v: print(ref, v.group(1), sep='\t')

def setcell(src, out, spec_path, log_path=None):
    spec = json.load(open(spec_path, encoding='utf-8'))
    zin = zipfile.ZipFile(src); sm = _sheet_map(zin); ss = _shared(zin)
    by_part = {}
    for c in spec: by_part.setdefault(sm[c['sheet']], []).append(c)
    zout = zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED); log = []
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename in by_part:
            xml = data.decode('utf-8')
            for c in by_part[item.filename]:
                pat = re.compile(r'<c r="%s"([^>]*?)(?:/>|>(.*?)</c>)' % c['cell'], re.S)
                m = pat.search(xml)
                if not m: log.append({'sheet': c['sheet'], 'cell': c['cell'], 'error': 'cell not found'}); continue
                attrs = re.sub(r'\s+t="\w+"', '', m.group(1))
                body = m.group(2) or ''; v = re.search(r'<v>(.*?)</v>', body)
                before = ss[int(v.group(1))] if v and 't="s"' in m.group(1) else html.unescape(''.join(re.findall(r'<t[^>]*>(.*?)</t>', body))) or (v.group(1) if v else '')
                new = '<c r="%s"%s t="inlineStr"><is><t xml:space="preserve">%s</t></is></c>' % (c['cell'], attrs, html.escape(c['value'], quote=False))
                xml = xml[:m.start()] + new + xml[m.end():]
                log.append({'sheet': c['sheet'], 'cell': c['cell'], 'before': before, 'after': c['value']})
            data = xml.encode('utf-8')
        zout.writestr(item, data)
    zout.close()
    if log_path:
        old = json.load(open(log_path, encoding='utf-8')) if os.path.exists(log_path) else {}
        old.setdefault('cells', []).extend(log); json.dump(old, open(log_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for l in log: print(l)

if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'decode': decode(sys.argv[2], sys.argv[3])
    elif cmd == 'strings': strings(sys.argv[2])
    elif cmd == 'cells': cells(sys.argv[2], sys.argv[3])
    elif cmd == 'setcell': setcell(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5] if len(sys.argv) > 5 else None)
    elif cmd == 'apply': apply(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5] if len(sys.argv) > 5 else None)
