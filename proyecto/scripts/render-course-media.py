"""Reproducible editorial diagrams + narrated MP4s. Requires Pillow, ffmpeg and ffprobe.

Uses only authored storyboards and local synthetic speech. No credentials or student data.
Intermediate frames/audio remain in ignored work/course-media. Final assets are versioned.
"""
import argparse
import hashlib
import json
import math
import shutil
import subprocess
import wave
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'work' / 'course-media'
PUBLIC = ROOT / 'public' / 'course-media'
BG, PANEL, EDGE, TEXT, MUTED = '#09111e', '#101f30', '#2c4359', '#eaf0f8', '#adbed0'
GREEN, GOLD, RED, BLUE = '#63dec1', '#f5c47a', '#f19cae', '#8daaff'
FONT = Path('C:/Windows/Fonts/segoeui.ttf')
BOLD = Path('C:/Windows/Fonts/segoeuib.ttf')


def font(size, bold=False):
    return ImageFont.truetype(str(BOLD if bold else FONT), size)


def wrap(draw, text, face, width):
    lines = []
    for paragraph in text.split('\n'):
        line = ''
        for word in paragraph.split():
            candidate = f'{line} {word}'.strip()
            if draw.textlength(candidate, font=face) > width and line:
                lines.append(line)
                line = word
            else:
                line = candidate
        lines.append(line)
    return lines


def block(draw, xy, text, width, height, size=26, color=TEXT, bold=False):
    """Fit text defensively; fail instead of clipping silently."""
    for point in range(size, 14, -1):
        face = font(point, bold)
        lines = wrap(draw, text, face, width)
        line_height = math.ceil(point * 1.34)
        if line_height * len(lines) <= height and all(draw.textlength(line, font=face) <= width for line in lines):
            for i, line in enumerate(lines):
                draw.text((xy[0], xy[1] + i * line_height), line, font=face, fill=color)
            return
    raise ValueError(f'Text does not fit: {text}')


def number(value):
    return f'{value:g}'.replace('.', ',')


def visible(diagram, stage, length):
    if stage == 99:
        return length
    reveal = diagram.get('reveal', [length])
    return reveal[min(max(stage - 1, 0), len(reveal) - 1)]


def plot_path(draw, diagram, stage):
    count = visible(diagram, stage, len(diagram['points']))
    points = diagram['points'][:count]
    refs = [ref for ref in diagram.get('references', []) if len(ref) < 3 or stage >= ref[2]]
    values = points + [ref[0] for ref in refs]
    lo, hi = min(values), max(values)
    pad = max((hi - lo) * .24, 1)
    lo, hi = lo - pad, hi + pad
    x0, x1, y0, y1 = 115, 765, 295, 510
    x = lambda i: (x0 + x1) / 2 if len(points) == 1 else x0 + i * (x1 - x0) / (len(points) - 1)
    y = lambda value: y1 - (value - lo) / (hi - lo) * (y1 - y0)
    draw.text((77, 270), 'Precio', font=font(16), fill=MUTED)
    for i in range(3):
        value = lo + (hi - lo) * i / 2
        draw.line((x0, y(value), x1, y(value)), fill=EDGE, width=1)
        label = number(round(value, 1))
        draw.text((108 - draw.textlength(label, font=font(15)), y(value) - 9), label, font=font(15), fill=MUTED)
    for i, ref in enumerate(refs):
        color = [GOLD, BLUE, RED][i % 3]
        for left in range(x0, x1, 16):
            draw.line((left, y(ref[0]), min(left + 8, x1), y(ref[0])), fill=color, width=2)
        block(draw, (85, 548 + i * 19), f'— {ref[1]}', 690, 22, size=15, color=color)
    for i in range(1, len(points)):
        draw.line((x(i - 1), y(points[i - 1]), x(i), y(points[i])), fill=GREEN, width=4)
    for i, value in enumerate(points):
        draw.ellipse((x(i) - 5, y(value) - 5, x(i) + 5, y(value) + 5), fill=GREEN)
        label = number(value)
        face = font(20, True)
        label_x, label_y = x(i) - draw.textlength(label, font=face) / 2, y(value) - 30
        box = draw.textbbox((label_x, label_y), label, font=face)
        draw.rounded_rectangle((box[0] - 3, box[1] - 2, box[2] + 3, box[3] + 2), radius=3, fill=PANEL)
        draw.text((label_x, label_y), label, font=face, fill=TEXT)
        draw.text((x(i) - 13, 522), f'P{i + 1}', font=font(15), fill=MUTED)
    if not refs:
        draw.text((85, 553), 'P1, P2… indican orden de observación, no duración.', font=font(16), fill=MUTED)


def plot_candles(draw, diagram, stage):
    count = visible(diagram, stage, len(diagram['candles']))
    candles = diagram['candles'][:count]
    low, high = min(c[2] for c in candles) - 1, max(c[1] for c in candles) + 1
    y = lambda value: 510 - (value - low) / (high - low) * 200
    for i, (o, h, l, c) in enumerate(candles):
        cx = 200 + i * 225
        color = GREEN if c > o else RED if c < o else TEXT
        draw.line((cx, y(h), cx, y(l)), fill=color, width=4)
        draw.rectangle((cx - 26, y(max(o, c)), cx + 26, max(y(max(o, c)) + 2, y(min(o, c)))), fill=color)
        block(draw, (cx - 95, 535), diagram['labels'][i], 195, 32, size=20, bold=True)
        block(draw, (cx - 95, 568), f'O {o} · H {h} · L {l} · {"C" if i == 2 else "Últ."} {c}', 210, 30, size=15, color=MUTED)
        draw.text((cx + 36, y(c) - 10), f'{c}', font=font(19, True), fill=TEXT)
    block(draw, (82, 270), 'Rojo: último < apertura. Verde: último > apertura.', 700, 34, size=18, color=MUTED)


def plot_cards(draw, diagram, stage):
    cards = diagram['cards']
    for i, (heading, text) in enumerate(cards):
        y = 286 + i * 96
        active = stage == 99 or stage == 0 or i == min(stage - 1, len(cards) - 1)
        draw.rounded_rectangle((82, y, 783, y + 80), radius=12, fill='#163137' if active else '#142337', outline=GREEN if active else EDGE, width=2)
        block(draw, (100, y + 9), heading, 657, 26, size=17, color=GREEN if active else MUTED)
        block(draw, (100, y + 34), text, 657, 42, size=27, bold=True)


def plot_levels(draw, diagram, stage):
    levels = sorted(diagram['levels'], reverse=True)
    low, high = levels[-1][0], levels[0][0]
    span = max(high - low, 1)
    y = lambda value: 500 - (value - low) / span * 210
    draw.text((82, 266), 'Niveles de precio (no una trayectoria)', font=font(17), fill=MUTED)
    for i, (value, label) in enumerate(levels):
        color = [GOLD, GREEN, BLUE, RED, MUTED][i % 5]
        row_y = 304 + i * (195 / max(len(levels) - 1, 1))
        draw.line((160, y(value), 292, y(value)), fill=color, width=3)
        draw.line((292, y(value), 365, row_y + 10), fill=color, width=1)
        block(draw, (380, row_y - 3), label, 395, 40, size=19, color=color, bold=True)
        draw.text((83, y(value) - 9), number(value), font=font(15), fill=MUTED)
    cards = diagram.get('cards', [])
    for i, (heading, text) in enumerate(cards):
        width = 700 / len(cards)
        left = 83 + i * width
        block(draw, (left, 545), heading, width - 14, 24, size=16, color=MUTED)
        block(draw, (left, 570), text, width - 14, 32, size=18, bold=True)


def plot_bars(draw, diagram, stage):
    zero = 464
    draw.line((90, zero, 780, zero), fill=MUTED, width=2)
    for i, value in enumerate(diagram['values']):
        left = 120 + 130 * i
        end = zero - value * 53
        color = GREEN if value > 0 else RED
        draw.rounded_rectangle((left, min(end, zero), left + 62, max(end, zero)), radius=4, fill=color)
        draw.text((left, min(end, zero) - 28), f'{value:+g}R', font=font(23, True), fill=color)
        draw.text((left + 12, 527), f'Op. {i + 1}', font=font(16), fill=MUTED)
    for i, (heading, text) in enumerate(diagram['cards']):
        block(draw, (95 + i * 230, 563), f'{heading}: {text}', 230, 36, size=20, bold=True)


PLOTTERS = {'path': plot_path, 'candles': plot_candles, 'cards': plot_cards, 'levels': plot_levels, 'bars': plot_bars}


def render(row, scene, index, total, destination):
    image = Image.new('RGB', (1280, 720), BG)
    draw = ImageDraw.Draw(image)
    draw.text((40, 27), 'W  /  WEARETRADES ACADEMY', font=font(21, True), fill=GREEN)
    draw.text((955, 30), f'CLASE {row["id"].upper()}', font=font(17), fill=MUTED)
    block(draw, (40, 81), row['title'], 1195, 110, size=37, bold=True)
    draw.rounded_rectangle((40, 205, 823, 645), radius=17, fill=PANEL, outline=EDGE, width=2)
    draw.rounded_rectangle((848, 205, 1240, 645), radius=17, fill=PANEL, outline=EDGE, width=2)
    diagram = {**row['diagram'], **row['diagram'].get('variants', {}).get(str(scene['stage']), {})}
    block(draw, (75, 224), diagram['title'], 710, 43, size=24, bold=True)
    PLOTTERS[diagram['kind']](draw, diagram, scene['stage'])
    block(draw, (76, 611), diagram['note'], 713, 32, size=15, color=MUTED)
    block(draw, (873, 230), scene['heading'], 340, 105, size=24, color=GREEN, bold=True)
    block(draw, (873, 348), scene['text'], 340, 270, size=27)
    draw.text((40, 674), 'EJEMPLO DIDÁCTICO · No es recomendación ni evidencia de rentabilidad', font=font(16), fill=MUTED)
    draw.text((1020, 674), f'{index + 1:02d} / {total:02d}  ·  ESPAÑOL', font=font(16), fill=MUTED)
    draw.rectangle((40, 656, 1240, 660), fill=EDGE)
    draw.rectangle((40, 656, 40 + 1200 * (index + 1) / total, 660), fill=GREEN)
    image.save(destination)


def run(args):
    result = subprocess.run([str(arg) for arg in args], capture_output=True, text=True, encoding='utf-8', errors='replace')
    if result.returncode:
        raise RuntimeError(result.stderr[-5000:])
    return result.stdout


def timestamp(seconds):
    ms = round(seconds * 1000)
    return f'{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02}.{ms % 1000:03}'


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def produce(row, ffmpeg, ffprobe, stills_only=False):
    folder = WORK / row['id']
    folder.mkdir(parents=True, exist_ok=True)
    output = PUBLIC / row['id']
    output.mkdir(parents=True, exist_ok=True)
    for i, scene in enumerate(row['scenes']):
        render(row, scene, i, len(row['scenes']), folder / f'{i:02}.png')
    poster = output / 'lamina.webp'
    render(row, {'heading': 'La idea central', 'text': row['diagram']['takeaway'], 'stage': 99}, len(row['scenes']) - 1, len(row['scenes']), poster)
    if stills_only:
        return None
    chapters, vtt, segments, elapsed = [], ['WEBVTT', ''], [], 0.0
    for i, scene in enumerate(row['scenes']):
        wav = folder / f'{i:02}.wav'
        with wave.open(str(wav), 'rb') as source:
            duration = source.getnframes() / source.getframerate()
        # Whole frames preserve concat timing and chapter/subtitle boundaries.
        seconds = math.ceil((duration + .9) * 12) / 12
        segment = folder / f'{i:02}.mp4'
        run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-loop', '1', '-framerate', '12', '-i', folder / f'{i:02}.png', '-i', wav,
             '-t', f'{seconds:.6f}', '-c:v', 'libx264', '-preset', 'veryfast', '-tune', 'stillimage', '-crf', '27', '-pix_fmt', 'yuv420p',
             '-c:a', 'aac', '-b:a', '80k', '-ar', '24000', '-af', 'apad', '-movflags', '+faststart', '-threads', '2', segment])
        actual = float(json.loads(run([ffprobe, '-v', 'error', '-show_format', '-of', 'json', segment]))['format']['duration'])
        # Use encoded duration for concat boundaries (AAC can add packet padding).
        chapters.append({'title': scene['heading'], 'start': round(elapsed, 3), 'end': round(elapsed + actual, 3), 'text': scene['narration']})
        caption = '\n'.join(wrap(ImageDraw.Draw(Image.new('RGB', (1, 1))), scene['narration'], font(16), 700))
        vtt.extend([f'{timestamp(elapsed)} --> {timestamp(elapsed + actual)}', caption, ''])
        elapsed += actual
        segments.append(segment)
    concat = folder / 'segments.txt'
    # Fixed generated filenames are relative to this list; never shell interpolation.
    concat.write_text('\n'.join(f"file '{segment.name}'" for segment in segments), encoding='utf-8')
    video = output / 'explicacion.mp4'
    run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '1', '-i', concat, '-c', 'copy',
         '-movflags', '+faststart', '-metadata', f'title={row["title"]}', '-metadata', 'comment=Narración sintética en español; ejemplos didácticos originales.', video])
    # Decode the final file, checking every frame and every audio packet.
    run([ffmpeg, '-v', 'error', '-xerror', '-i', video, '-f', 'null', '-'])
    probe = json.loads(run([ffprobe, '-v', 'error', '-show_streams', '-show_format', '-of', 'json', video]))
    duration = float(probe['format']['duration'])
    if abs(duration - elapsed) > .5:
        raise RuntimeError(f'Unexpected concat drift: {row["id"]}: {duration} vs {elapsed}')
    (output / 'subtitulos.vtt').write_text('\n'.join(vtt), encoding='utf-8', newline='\n')
    transcript = f'{row["title"]}\n\nNarración sintética en español. Ejemplo didáctico, no datos de mercado.\n\n'
    transcript += '\n\n'.join(f'{timestamp(ch["start"])} · {ch["title"]}\n{ch["text"]}' for ch in chapters)
    transcript += f'\n\nBase de la clase: {row["source"]}\nAdaptación audiovisual editorial propia.\n'
    (output / 'transcripcion.txt').write_text(transcript, encoding='utf-8', newline='\n')
    base = f'/course-media/{row["id"]}'
    media = {'title': row['diagram']['title'], 'video': f'{base}/explicacion.mp4', 'poster': f'{base}/lamina.webp',
             'captions': f'{base}/subtitulos.vtt', 'transcript': f'{base}/transcripcion.txt', 'duration': round(duration, 2),
             'bytes': video.stat().st_size, 'alt': f'{row["diagram"]["title"]}. {row["diagram"]["takeaway"]} {row["diagram"]["note"]}', 'chapters': chapters}
    (folder / 'media.json').write_text(json.dumps(media, ensure_ascii=False, indent=2), encoding='utf-8')
    audit = {'id': row['id'], 'duration': duration, 'sha256': {path.name: digest(path) for path in [video, poster, output / 'subtitulos.vtt', output / 'transcripcion.txt']},
             'streams': [{key: stream.get(key) for key in ['codec_type', 'codec_name', 'width', 'height', 'sample_rate', 'pix_fmt']} for stream in probe['streams']], 'decoded': True}
    (folder / 'audit.json').write_text(json.dumps(audit, indent=2), encoding='utf-8')
    print(f'{row["id"]}: {duration:.1f}s, {video.stat().st_size / 1048576:.2f} MiB; decodificación correcta', flush=True)
    return media


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--only')
    parser.add_argument('--stills-only', action='store_true')
    parser.add_argument('--manifest-only', action='store_true')
    args = parser.parse_args()
    rows = json.loads((WORK / 'storyboards.json').read_text(encoding='utf-8-sig'))
    ffmpeg, ffprobe = shutil.which('ffmpeg'), shutil.which('ffprobe')
    if not args.stills_only and (not ffmpeg or not ffprobe):
        raise RuntimeError('ffmpeg y ffprobe deben estar en PATH; no se descargan automáticamente.')
    PUBLIC.mkdir(parents=True, exist_ok=True)
    if not args.manifest_only:
        for row in rows:
            if not args.only or args.only == row['id']:
                produce(row, ffmpeg, ffprobe, args.stills_only)
    if args.stills_only or args.only:
        return
    media, audit = {}, []
    for row in rows:
        media[row['id']] = json.loads((WORK / row['id'] / 'media.json').read_text(encoding='utf-8'))
        audit.append(json.loads((WORK / row['id'] / 'audit.json').read_text(encoding='utf-8')))
    source = "// Generated by scripts/render-course-media.py. Do not edit asset timings by hand.\nimport type { LessonMedia } from './media-types.ts';\nexport const lessonMedia: Record<string, LessonMedia> = " + json.dumps(media, ensure_ascii=False, indent=2) + ';\n'
    (ROOT / 'app' / 'learning' / 'media-manifest.ts').write_text(source, encoding='utf-8')
    (PUBLIC / 'audit.json').write_text(json.dumps({'voice': json.loads((WORK / 'voice.json').read_text(encoding='utf-8-sig')), 'assets': audit}, indent=2), encoding='utf-8')
    print(f'Manifiesto: {len(media)} clases, {sum(m["bytes"] for m in media.values()) / 1048576:.2f} MiB de video', flush=True)


if __name__ == '__main__':
    main()
