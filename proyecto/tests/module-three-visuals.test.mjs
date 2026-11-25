import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { moduleThreeSections, moduleThreeImageNotes, moduleThreeExercises } from '../app/learning/module-three-content.ts';

const read = path => readFileSync(new URL(path, import.meta.url));
const originals = JSON.parse(read('../public/course-reconstruction/module-03/originals/manifest.json'));
const editorial = JSON.parse(read('../public/course-reconstruction/module-03/editorial/manifest.json'));
const originalHashes = [
  'ff2c9f032089018b98deeeb5120d15f295092a6366b2659ebfebc6cec25fc919',
  '01e947ac354a77cc558d13b82e2466a97dd0666f9c37eee45db5338330aa0027',
  '517aea7d4bccbaebfaf1f5deb36f85329ece52ff4ba0256962e37081adc59c9f',
  'aafa3e2d62ed3d3a060c346701c0c136bc33529261dbc33e1b1b2153dde669e0',
  '8438a3c82be839b17af4fec23fd9f261d28ee88e194be2a9c054413d6c2c7edb',
  '00e0d452d3b9c7899d9554a6c9083e005f43a217c872dc89d80e105b3a75189b',
  '83cb6941b99f389e676bea3f1a03016739933e75bbdbdcca79d5953fe0cd4aec',
  '98340531d95003fcf88d612211eb424ed86602052f6c3ed9b325c6845793b02a',
  '83d75ee4c95d9e5b295772f1977916efe253dae9fbdfbfb4e47ef9fc59554d20',
  'fbf0dbe5e1c4bf9677021c0ab37f2b92d21edac0c0535ef5ed57ae94da78977c',
  'f4843b9a6cc1f79d282fd2a38e3c1e3b922e0dafba79ea52de1030f3687209a8',
  '331e5d4e1614020910538ca9f291f3e5c9c00a92be876d24e4e365749c6ab254',
];

test('module 3 preserves twelve source images and verifies five new PNG diagrams', () => {
  assert.equal(originals.module, 3);
  assert.equal(editorial.module, 3);
  assert.equal(originals.assets.length, 12);
  assert.equal(editorial.assets.length, 5);
  assert.deepEqual(originals.assets.map(a => a.sha256), originalHashes);
  for (const asset of [...originals.assets, ...editorial.assets]) {
    const data = read(`../public${asset.src}`);
    assert.equal(data.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(data.readUInt32BE(16), asset.width);
    assert.equal(data.readUInt32BE(20), asset.height);
    assert.equal(data.length, asset.bytes);
    assert.equal(createHash('sha256').update(data).digest('hex'), asset.sha256);
  }
});

test('module 3 maps every image exactly once with an accessible review note', () => {
  const ids = moduleThreeSections.flatMap(s => s.originals);
  assert.equal(ids.length, 12);
  assert.equal(new Set(ids).size, 12);
  assert.deepEqual([...ids].sort(), originals.assets.map(a => a.id).sort());
  assert.deepEqual([...ids].sort(), Object.keys(moduleThreeImageNotes).sort());
  assert.deepEqual(moduleThreeSections.map(s => s.diagram).filter(Boolean).sort(), editorial.assets.map(a => a.id).sort());
  for (const id of ids) {
    assert.ok(moduleThreeImageNotes[id].alt.length > 40);
    assert.ok(moduleThreeImageNotes[id].note.length > 100);
  }
  assert.equal(moduleThreeSections.length, 7);
  assert.equal(new Set(moduleThreeSections.map(s => s.id)).size, 7);
});

test('module 3 calculates the declared anchors and uses consistent synthetic OHLC', () => {
  const chart = editorial.assets.find(a => a.id === 'fibonacci-verificado');
  const [first, second] = chart.calculations;
  assert.deepEqual([first.low, first.high, first.point], [108, 125, 115]);
  assert.deepEqual([second.low, second.high, second.point], [71, 100, 68]);
  for (const example of chart.calculations) {
    assert.ok(example.high > example.low);
    for (const level of example.levels) {
      const expected = example.high - level.ratio * (example.high - example.low);
      assert.ok(Math.abs(expected - level.price) < 1e-6);
    }
    assert.ok(Math.abs(example.pointRatio - (example.high - example.point) / (example.high - example.low)) < 1e-10);
    assert.ok(example.levels.some(l => l.ratio === .764));
  }
  assert.equal(first.levels.find(l => l.ratio === .382).price, 118.506);
  assert.equal(second.levels.find(l => l.ratio === .5).price, 85.5);
  assert.ok(second.pointRatio > 1);
  const series = editorial.assets.find(a => a.id === 'tres-retrocesos').ohlc;
  assert.equal(series.length, 3);
  assert.deepEqual(series.map(rows => rows.filter(r => r.close < r.open).length), [1, 2, 4]);
  for (const rows of series) for (const [i, row] of rows.entries()) {
    assert.ok(row.low <= Math.min(row.open, row.close));
    assert.ok(row.high >= Math.max(row.open, row.close));
    if (i > 0) assert.equal(row.open, rows[i - 1].close);
  }
});

test('module 3 explains discrepancies, source limits and exercises without claiming future certainty', () => {
  assert.match(moduleThreeImageNotes['retroceso-profundo-micro-tendencia'].note, /V, no una W/);
  assert.match(moduleThreeImageNotes['practica-2-analisis'].note, /118,506/);
  assert.match(moduleThreeImageNotes['practica-3-analisis'].note, /por debajo del soporte, no en el 50/);
  assert.match(moduleThreeImageNotes['analisis-15m-anterior'].note, /No se aportan perfil de volumen/);
  assert.match(moduleThreeImageNotes['patrones-velas-compradores'].note, /seis grupos sin nombre/);
  assert.match(moduleThreeImageNotes['engano-alcista'].note, /aún no se conoce ese desenlace/);
  assert.equal(moduleThreeExercises.length, 5);
  for (const exercise of moduleThreeExercises) {
    assert.ok(exercise.prompt.length > 150);
    assert.ok(exercise.answer.length > 150);
  }
});

test('module 3 is reachable from home and module 2 without changing progress storage', () => {
  const page = read('../app/curso/modulo-3/page.tsx').toString();
  assert.doesNotMatch(page, /localStorage|\/api\/learning|check_passed|setInterval|useEffect/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /width=\{asset.width\} height=\{asset.height\}/);
  assert.match(page, /no registra calificaciones/);
  assert.match(page, /Los dos adjuntos de texto recibidos son idénticos/);
  assert.match(page, /La transcripción termina cortada/);
  assert.match(page, /<details><summary>Ver imagen aportada/);
  for (const path of ['../app/learning/workspace.tsx', '../app/curso/modulo-2/page.tsx']) {
    assert.match(read(path).toString(), /href="\/curso\/modulo-3"/);
  }
});

test('built module 3 renders seventeen images, five exercises and its own metadata', async () => {
  const { default: worker } = await import('../dist/server/index.js');
  const response = await worker.fetch(new Request('http://localhost/curso/modulo-3', { headers: { accept: 'text/html' } }), { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } }, { waitUntil() {} });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Módulo 3/);
  assert.doesNotMatch(html, /<meta[^>]+(?:property="og:image"|name="twitter:image")/);
  assert.equal((html.match(/<img\b/g) ?? []).length, 17);
  assert.equal((html.match(/<details\b/g) ?? []).length, 17);
  for (const asset of [...originals.assets, ...editorial.assets]) assert.ok(html.includes(asset.src), asset.id);
  for (const section of moduleThreeSections) assert.ok(html.includes(`id="${section.id}"`));
  assert.match(html, /ni modifica el progreso/);
  // React separates adjacent text nodes with comments in server-rendered HTML.
  assert.match(html.replace(/<!--[\s\S]*?-->/g, ''), /Ver respuesta razonada del ejercicio 5/);
  assert.doesNotMatch(html, /correctReason|expectedDecision|stopRange/);
});
