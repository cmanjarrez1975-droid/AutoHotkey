"""Read-only extraction of supplied DOCX sources; run with the bundled Python.
Never rewrites or deletes an original. Generated library retains transcript text.
"""
from pathlib import Path
from docx import Document
import hashlib, json, re, shutil

root = Path(__file__).resolve().parents[1]
source_dir = root.parent / 'fuentes_originales'
out = root / 'public' / 'course-originals'
out.mkdir(exist_ok=True)
classes = []
files = []
for source in sorted(source_dir.iterdir()):
    if source.suffix in ['.mp4', '.m4a']:
        continue
    target = out / source.name
    if not target.exists():
        shutil.copy2(source, target)
    if hashlib.sha256(target.read_bytes()).digest() != hashlib.sha256(source.read_bytes()).digest():
        raise RuntimeError(f'Existing copy differs from original: {source.name}')
    files.append({'name': source.name, 'url': '/course-originals/' + source.name, 'sha256': hashlib.sha256(source.read_bytes()).hexdigest()})
    if source.suffix != '.docx':
        continue
    prefix = source.name[:2]
    current = None
    def flush():
        if current:
            classes.append(current)
    for paragraph in Document(source).paragraphs:
        title = paragraph.text.strip()
        if not title:
            continue
        heading = paragraph.style.name
        is_class = (prefix == '02' and heading == 'Heading 1' and title != 'Contenido') or (prefix == '03' and heading == 'Heading 2' and bool(re.match(r'0[678]\.\d', title))) or (prefix == '04' and heading == 'Heading 2' and bool(re.match(r'\d+\.\s', title)))
        if is_class:
            flush()
            identifier = 'source-' + prefix + '-' + hashlib.sha256(title.encode()).hexdigest()[:12]
            current = {'id': identifier, 'title': title, 'source': source.name, 'paragraphs': [], 'provenance': 'Transcripción original; no corregida automáticamente'}
        elif current and heading == 'Heading 1':
            flush(); current = None
        elif current and title != 'Transcripción':
            current['paragraphs'].append(title)
    flush()
if len(classes) != 38:
    raise RuntimeError(f'Expected 38 classes; found {len(classes)}. Inspect headings before publishing.')
(root / 'public' / 'course-library.json').write_text(json.dumps({'files': files, 'classes': classes}, ensure_ascii=False), encoding='utf-8')
print(f'{len(files)} original documents verified; {len(classes)} transcript sections extracted.')
