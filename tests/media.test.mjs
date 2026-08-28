import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { lessons, publicLessons, CONTENT_VERSION } from '../app/learning/catalog.ts';
import { lessonMedia } from '../app/learning/media-manifest.ts';
import { mediaTime, safeSeek } from '../app/learning/media-types.ts';
import { storyboards, speechText } from '../scripts/course-media-storyboards.mjs';

const root = new URL('../public/', import.meta.url);
const readAsset = path => readFileSync(new URL(path.slice(1), root));
const audit = JSON.parse(readAsset('/course-media/audit.json'));

test('las 24 clases tienen lámina, video, subtítulos y transcripción sin cambiar IDs ni progreso', () => {
  assert.equal(CONTENT_VERSION, '2026.08.v2');
  assert.equal(lessons.length, 24);
  assert.deepEqual(Object.keys(lessonMedia).sort(), lessons.map(l => l.id).sort());
  assert.equal(lessons.filter(l => l.image).length, 6, 'conserva imágenes originales');
  for (const lesson of lessons) {
    assert.ok(lesson.media && lesson.lecture === publicLessons().find(l => l.id === lesson.id).lecture);
    for (const key of ['video', 'poster', 'captions', 'transcript']) {
      const path = lesson.media[key];
      assert.ok(path.startsWith(`/course-media/${lesson.id}/`));
      assert.ok(!path.includes('..'));
      assert.ok(statSync(new URL(path.slice(1), root)).size > 50);
    }
  }
});

test('MP4 y WebP reales: firmas, hashes y codecs coinciden con los archivos decodificados', () => {
  assert.equal(audit.assets.length, 24);
  assert.equal(audit.voice.synthetic, true);
  assert.equal(audit.voice.culture, 'es-MX');
  for (const row of audit.assets) {
    assert.equal(row.decoded, true);
    const video = row.streams.find(s => s.codec_type === 'video');
    const audio = row.streams.find(s => s.codec_type === 'audio');
    assert.equal(video.codec_name, 'h264');
    assert.equal(video.pix_fmt, 'yuv420p');
    assert.equal(video.width, 1280); assert.equal(video.height, 720);
    assert.equal(audio.codec_name, 'aac');
    for (const [name, hash] of Object.entries(row.sha256)) assert.equal(createHash('sha256').update(readAsset(`/course-media/${row.id}/${name}`)).digest('hex'), hash);
    assert.equal(readAsset(lessonMedia[row.id].video).subarray(4, 8).toString(), 'ftyp');
    assert.equal(readAsset(lessonMedia[row.id].poster).subarray(8, 12).toString(), 'WEBP');
    assert.ok(lessonMedia[row.id].duration > 30 && lessonMedia[row.id].duration < 180);
    assert.equal(lessonMedia[row.id].bytes, readAsset(lessonMedia[row.id].video).length);
  }
});

test('capítulos y subtítulos cubren cada escena con tiempos ordenados dentro del video', () => {
  function seconds(text) { const [h, m, s] = text.split(':').map(Number); return h * 3600 + m * 60 + s; }
  for (const media of Object.values(lessonMedia)) {
    assert.ok(media.chapters.length >= 5);
    const cues = [...readAsset(media.captions).toString('utf8').matchAll(/(\d\d:\d\d:\d\d\.\d{3}) --> (\d\d:\d\d:\d\d\.\d{3})/g)];
    assert.equal(cues.length, media.chapters.length);
    assert.equal(media.chapters[0].start, 0);
    for (let i = 0; i < media.chapters.length; i++) {
      const chapter = media.chapters[i];
      assert.ok(chapter.end > chapter.start);
      assert.ok(chapter.end <= media.duration + 0.1);
      if (i) assert.ok(chapter.start >= media.chapters[i - 1].end - 0.002);
      assert.ok(Math.abs(seconds(cues[i][1]) - chapter.start) < .002);
      assert.ok(Math.abs(seconds(cues[i][2]) - chapter.end) < .002);
      assert.ok(readAsset(media.transcript).toString('utf8').includes(chapter.text));
    }
  }
});

test('cada storyboard corresponde al ejemplo y no importa datos de evaluación ni alumnos', () => {
  assert.deepEqual(Object.keys(storyboards).sort(), lessons.map(l => l.id).sort());
  for (const lesson of lessons) {
    assert.equal(lesson.media.chapters.length, lesson.example.steps.length + 2);
    for (let i = 0; i < lesson.example.steps.length; i++) assert.ok(lesson.media.chapters[i + 1].text.includes(speechText(lesson.example.steps[i])));
    assert.ok(storyboards[lesson.id].note && storyboards[lesson.id].takeaway);
  }
  assert.doesNotMatch(JSON.stringify(lessonMedia), /correctReason|expectedDecision|stopRange/);
});

test('las revelaciones de estructura y replay no adelantan datos en sus diagramas', () => {
  const structure = storyboards['f-estructura'];
  assert.deepEqual(structure.points.slice(0, structure.reveal[1]), [100, 112, 106]);
  assert.deepEqual(structure.points.slice(0, structure.reveal[2]), [100, 112, 106, 113]);
  assert.equal(structure.references.find(r => r[0] === 106)[2], 2);
  const replay = storyboards['p-replay'];
  assert.deepEqual(replay.points.slice(0, replay.reveal[1]), [104]);
  assert.deepEqual(replay.points.slice(0, replay.reveal[2]), [104, 110]);
});

test('láminas de riesgo, Fibonacci y resultados conservan los números del ejemplo', () => {
  assert.equal((240 - .618 * (240 - 200)).toFixed(2), storyboards['m-fibonacci'].levels[1][0].toFixed(2));
  const results = storyboards['p-metricas'].values;
  assert.equal(results.reduce((sum, value) => sum + value, 0), 2);
  assert.equal(results.filter(value => value > 0).length, 2);
  assert.equal((110 - 106) / (106 - 99), 4 / 7);
  assert.equal(Math.floor(100 / (8 * 5 + 2)), 2);
  assert.equal(storyboards['f-velas'].candles.at(-1)[3], 101);
  assert.ok(storyboards['m-v'].note.includes('no se inventan'));
});

test('tiempos y saltos al capítulo se acotan incluso con metadata ausente o inválida', () => {
  assert.equal(mediaTime(76.9), '1:16');
  assert.equal(mediaTime(NaN), '0:00');
  assert.equal(mediaTime(-1), '0:00');
  assert.equal(safeSeek(-1, 100), 0);
  assert.equal(safeSeek(50, NaN), 0);
  assert.equal(safeSeek(50, Infinity), 0);
  assert.equal(safeSeek(500, 100), 99.95);
  assert.equal(safeSeek(20, 100), 20);
});

test('el reproductor no inicia ni descarga videos automáticamente y ofrece alternativas accesibles', () => {
  const component = readFileSync(new URL('../app/learning/lesson-media.tsx', import.meta.url), 'utf8');
  assert.match(component, /preload="none"/);
  assert.match(component, /controls playsInline/);
  assert.match(component, /kind="captions"/);
  assert.match(component, /Leer la explicación completa/);
  assert.doesNotMatch(component, /autoPlay|learningRequest|localStorage/);
});
