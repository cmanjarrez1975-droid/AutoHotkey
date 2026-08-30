import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { moduleFiveSections, moduleFiveImageNotes, moduleFiveExercises } from '../app/learning/module-five-content.ts';

const read = path => readFileSync(new URL(path, import.meta.url));
const originals = JSON.parse(read('../public/course-reconstruction/module-05/originals/manifest.json'));
const editorial = JSON.parse(read('../public/course-reconstruction/module-05/editorial/manifest.json'));
const diagram = id => editorial.assets.find(a => a.id === id);
// Receipt hashes frozen independently of the editorial generator.
const originalHashes = [
  'c577a9ae90dd9d76ecf1f40e5b8fea7b2cfa036a261c162385f9012e707e3298',
  'ef450f5a7499eaa6eb9e6c6f9e60c22db7cd1fc6ed1de2d7aa2212d635495761',
  '4983eb601efad03095ed242567f6c30c209efd2876dd9870699af1870f611d61',
  '66005b2afd0b4289ca3519ad46d82ac0428a5df33c93b8fa155f89440bf18572',
  '46b03a675849194eb0cc53c9ee4bcfa8ddab736b1bc0b5e19a3fe0c0723f2498',
  '099cbd0be91b9694a43d18ca93a48b7aa594aaaee08c78ecd435375caf20e7e3',
  '235e87097df793467e1861069c95697ba493bcf068f5b4a0444150ae39a2a6e3',
  'e36be571ca2e5421eb493ab6e45ed9ba4df180a5d4012598ca8ab7ba3eb00966',
  '3609c8763f535517a57d14e467a5b8faf604e2fd5293a6c9439f963e31867b0b',
  '91af4ccbb9f6b38afb1c9b2abaf6b256c869478c954fffb5d821d60597f5bb54',
  'cb02342e91508fcc008984c2ed705177126004f41b12f6cf8c89d48554032127',
];

test('module 5 preserves eleven originals and validates six editorial PNGs', () => {
  assert.equal(originals.module, 5);
  assert.equal(editorial.module, 5);
  assert.equal(originals.assets.length, 11);
  assert.equal(editorial.assets.length, 6);
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

test('module 5 places every visual once with its contextual note', () => {
  const ids = moduleFiveSections.flatMap(s => s.originals);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual([...ids].sort(), originals.assets.map(a => a.id).sort());
  assert.deepEqual([...ids].sort(), Object.keys(moduleFiveImageNotes).sort());
  assert.deepEqual(moduleFiveSections.map(s => s.diagram).filter(Boolean).sort(), editorial.assets.map(a => a.id).sort());
  assert.equal(moduleFiveSections.length, 8);
  assert.equal(new Set(moduleFiveSections.map(s => s.id)).size, 8);
  for (const id of ids) {
    assert.ok(moduleFiveImageNotes[id].alt.length > 40);
    assert.ok(moduleFiveImageNotes[id].note.length > 100);
  }
});

test('module 5 anatomy and activation data are internally consistent', () => {
  const anatomy = diagram('anatomia-medida').ohlc;
  for (const row of anatomy) {
    assert.equal(Math.abs(row.close - row.open), 3.25);
    assert.equal(row.high - row.low, 4);
    const wicks = [row.high - Math.max(row.open, row.close), Math.min(row.open, row.close) - row.low];
    assert.deepEqual(wicks.sort(), [.25, .5]);
  }
  const { candidate, nextCandles, entry, tick } = diagram('vigencia-candidata');
  assert.equal(entry, candidate.high + tick);
  assert.ok(nextCandles[0].high < entry);
  assert.ok(nextCandles[1].open < entry && nextCandles[1].high >= entry);
  for (const row of nextCandles) {
    assert.ok(row.low <= Math.min(row.open, row.close));
    assert.ok(row.high >= Math.max(row.open, row.close));
    assert.equal(row.open, candidate.close);
  }
});

test('module 5 separates measured range from risk in both directions', () => {
  for (const c of diagram('rango-y-riesgo').calculations) {
    const direction = c.direction === 'compra' ? 1 : -1;
    assert.equal(c.range, c.high - c.low);
    assert.equal(c.risk, Math.abs(c.entry - c.stop));
    assert.equal(c.risk, c.range + 2 * c.tick);
    assert.equal(c.targetRange, c.entry + direction * c.range);
    assert.equal(c.targetR, c.entry + direction * c.risk);
    assert.notEqual(c.targetRange, c.targetR);
  }
  assert.match(moduleFiveImageNotes['practica-1-alcista'].note, /0,87R/);
  assert.match(moduleFiveImageNotes['practica-1-bajista'].note, /0,875R/);
  assert.ok(Math.abs((4.7 - 3.4) / (3.4 - 1.9) - 13 / 15) < 1e-9);
  assert.ok(Math.abs((3.1 - 1.7) / (4.7 - 3.1) - .875) < 1e-9);
});

test('module 5 distinguishes pending breaks and ambiguous intrabar order', () => {
  const { series: [w, m], references: [upper, lower] } = diagram('secuencia-w-m');
  assert.ok(w.at(-2) < upper && w.at(-1) > upper);
  assert.ok(m.at(-2) > lower && m.at(-1) < lower);
  const { paths, ohlc, entry, stop } = diagram('orden-intrabar');
  for (const path of paths) {
    assert.deepEqual({ open: path[0], high: Math.max(...path), low: Math.min(...path), close: path.at(-1) }, ohlc);
  }
  const crossingIndex = (path, level, above) => path.findIndex(p => above ? p >= level : p <= level);
  assert.ok(crossingIndex(paths[0], entry, true) < crossingIndex(paths[0], stop, false));
  assert.ok(crossingIndex(paths[1], stop, false) < crossingIndex(paths[1], entry, true));
  assert.ok(paths[1].at(-1) > stop);
});

test('module 5 provides complete exercises and remains additive without progress writes', () => {
  assert.equal(moduleFiveExercises.length, 8);
  for (const exercise of moduleFiveExercises) for (const field of ['data', 'steps', 'deliverable', 'answer']) {
    assert.ok(exercise[field].length > 40, `${exercise.title}: ${field}`);
  }
  const page = read('../app/curso/modulo-5/page.tsx').toString();
  assert.doesNotMatch(page, /localStorage|\/api\/learning|check_passed|setInterval|useEffect/);
  assert.ok(page.indexOf('Nota de lectura:') < page.indexOf('<details><summary>Ver imagen aportada'));
  assert.match(page, /loading="lazy"/);
  for (const path of ['../app/learning/workspace.tsx', '../app/curso/modulo-4/page.tsx']) {
    assert.match(read(path).toString(), /href="\/curso\/modulo-5"/);
  }
});

test('built module 5 renders seventeen images, eight answers and independent metadata', async () => {
  const { default: worker } = await import('../dist/server/index.js');
  const response = await worker.fetch(new Request('http://localhost/curso/modulo-5', { headers: { accept: 'text/html' } }), { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } }, { waitUntil() {} });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Módulo 5/);
  assert.match(html, /property="og:title" content="Módulo 5/);
  assert.match(html, /name="twitter:title" content="Módulo 5/);
  assert.doesNotMatch(html, /<meta[^>]+(?:property="og:image"|name="twitter:image")/);
  assert.equal((html.match(/<img\b/g) ?? []).length, 17);
  assert.equal((html.match(/<details\b/g) ?? []).length, 19);
  for (const asset of [...originals.assets, ...editorial.assets]) assert.ok(html.includes(asset.src), asset.id);
  for (const section of moduleFiveSections) assert.ok(html.includes(`id="${section.id}"`));
  assert.match(html.replace(/<!--[\s\S]*?-->/g, ''), /Ver respuesta razonada del ejercicio 8/);
  assert.match(html, /ni modifica el progreso/);
  assert.match(html, /su transcripción sigue pendiente/);
  assert.doesNotMatch(html, /correctReason|expectedDecision|stopRange/);
});
