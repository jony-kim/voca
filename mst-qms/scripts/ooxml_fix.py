"""원본 양식 보존형 텍스트 정정 도구 (xlsx / pptx / docx)
서식·병합·이미지·결재란은 그대로 두고, 파일 내부 XML의 '텍스트 노드'만 바꾼다.

  python3 ooxml_fix.py decode <drive-download.json> <out-file>   # Drive download_file_content 결과(JSON {content: base64}) → 파일
  python3 ooxml_fix.py strings <file>                            # 모든 텍스트 노드 출력 (번호<TAB>텍스트)
  python3 ooxml_fix.py apply <in> <out> <rules.json> [log.json]   # rules: [{"find": "...", "replace": "..."}] (부분 문자열 치환)
"""
import base64, json, re, sys, zipfile, html

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

if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'decode': decode(sys.argv[2], sys.argv[3])
    elif cmd == 'strings': strings(sys.argv[2])
    elif cmd == 'apply': apply(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5] if len(sys.argv) > 5 else None)
