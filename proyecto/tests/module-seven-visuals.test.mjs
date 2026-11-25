import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { moduleSevenSections, moduleSevenExercises } from '../app/learning/module-seven-content.ts';
import { moduleSevenOriginalAssignments, moduleSevenOriginalNotes } from '../app/learning/module-seven-images.ts';

const read = path => readFileSync(new URL(path, import.meta.url));
const sources = JSON.parse(read('../docs/reconstruccion/007-fuentes-manifest.json'));
const editorial = JSON.parse(read('../public/course-reconstruction/module-07/editorial/manifest.json'));
const originals = JSON.parse(read('../public/course-reconstruction/module-07/originals/manifest.json'));
const diagram = id => editorial.assets.find(a => a.id === id);
const receivedHashes = [
  'e63c4cd463e7462b232ea19a6d48cefab733f3c252b169568f129ab76b940a1d',
  '82ea2e1528688f9701110e3f66d3be2ed1e576c698c81cc49c4aac87d15cf834',
  'bce2dcc71a8fd23119be3ec039fe0252f15a18bc400796b7f36d9bb2927fb715',
];
const receivedImageHashes = [
  'e54bacbe187be3cf883c5fa276016c9bc17ef9a63ba7e3fa3b318fee0c5417d4',
  '1927810a4c7fb2673486983ee52f3ac29269604cae9a8d687d6de2a3fb6c46d6',
  '14d72c51963849680b0d0d5c730e984ad7e6b8adde6555ba525871139cd82cc2',
  '39bf82a1a1fde8b4800917d939d1f6bdf656b77c0fc7b9fad56b280cc7893ef7',
  '87681716fe7ea32ff72a0f61e09d9521753908f44223c1b342c77d883581e777',
  'df7b7e112d6c3e4f8a60b4299f215b70f04939b47858a65c8cf39689e29d4b88',
  '6e47d7f1e3fbed79d593a5c7de6b7a53143c1ba3332b2fc2cb97a2d2331f082f',
  '536d3e1410bfd7cc12d5751fe3b8861692680c605f42174f98128a14f78f8ed0',
  '9fbde6e0ff44dad0ef26761ca277d8826aa00820009be4a5638bcf1417a3babe',
  '99fb7f40ec3f405a1cc8ef6f240a198fa823499a3494af7b983b86223ee1f13c',
  '5078f474af29c99c2721e3c6fe0d5a14b434d7ee39f19910e49b1bcba2aafd58',
  '4278014c512f38d76a513c2eca591d00547ed9abf660f97a49fed3f4f1a33bd8',
  'c3c21c1a4a7bdab298e19a53daaacc4f9cba75b04cf12a630e68400969d05698',
  '276a3ae7cc1a9641b5b977a3e5d4f0e13249094c5771a86a2f76fc48a5fac064',
  'e05eec7f2d24bb50f95106a80223552d35d1c0406321513e6c352e30152f7294',
  '88ca1d0cb4b69cc5c9e23f41c6ec71094f6f39ae1e32287cd460822e5e187a2c',
  '058d6fdfaa2f4e0dfbfd1e7c50a5d0851ab01efff814ce812bb896329df4f18b',
  '4010622da4d4a6f0b33e05a9724538f76a3e3a2a118ba3b59ec71f8ca27b3c46',
  '90185d9985177fffd4e0f0bd70d7c0d5abaa16eee272c4d730a13887e7ec7138',
  '5df1996c5e9ce8619051e4ca26301bf52738b1cd844b214399bb97382a0d1eb3',
];

test('module 7 archives three distinct sources and resolves all transcript references', () => {
  assert.deepEqual(sources.sources.map(s => s.sha256), receivedHashes);
  assert.deepEqual(sources.sources.filter(s => s.role === 'principal').map(s => s.prefix), ['V']);
  for (const s of sources.sources) {
    const bytes = read(`../docs/reconstruccion/${s.file}`);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), s.sha256);
    assert.equal(bytes.length, s.bytes);
    assert.equal(bytes.toString('utf8').split(/\r?\n/).filter(l => l.trim()).length, s.nonemptyLines);
  }
  for (const section of moduleSevenSections) {
    assert.ok(section.refs.some(r => r.prefix === 'V'), section.title);
    for (const ref of section.refs) {
      const src = sources.sources.find(s => s.prefix === ref.prefix);
      assert.ok(src && ref.from >= 1 && ref.to >= ref.from && ref.to <= src.nonemptyLines);
    }
  }
});

test('module 7 assigns each generated PNG once and validates its bytes and dimensions', () => {
  assert.equal(editorial.assets.length, 5);
  assert.deepEqual(moduleSevenSections.map(s => s.diagram).filter(Boolean).sort(), editorial.assets.map(a => a.id).sort());
  assert.equal(new Set(moduleSevenSections.map(s => s.id)).size, 8);
  for (const a of editorial.assets) {
    const data = read(`../public${a.src}`);
    assert.equal(data.subarray(0,8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(data.readUInt32BE(16), a.width);
    assert.equal(data.readUInt32BE(20), a.height);
    assert.equal(data.length, a.bytes);
    assert.equal(createHash('sha256').update(data).digest('hex'), a.sha256);
  }
});

test('module 7 preserves, comments and assigns every received image exactly once', () => {
  assert.equal(originals.assets.length, 20);
  assert.deepEqual(originals.assets.map(a => a.sha256), receivedImageHashes);
  const assigned = Object.values(moduleSevenOriginalAssignments).flat();
  assert.deepEqual([...assigned].sort(), originals.assets.map(a => a.id).sort());
  assert.equal(new Set(assigned).size, 20);
  assert.deepEqual(Object.keys(moduleSevenOriginalAssignments).sort(), moduleSevenSections.map(s => s.id).sort());
  assert.ok(Object.values(moduleSevenOriginalNotes).some(n => n.status === 'buyer'));
  for (const a of originals.assets) {
    const data = read(`../public${a.src}`);
    assert.equal(data.subarray(0,8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(data.readUInt32BE(16), a.width);
    assert.equal(data.readUInt32BE(20), a.height);
    assert.equal(data.length, a.bytes);
    assert.equal(createHash('sha256').update(data).digest('hex'), a.sha256);
    const note = moduleSevenOriginalNotes[a.id];
    assert.ok(note?.title.length > 15, a.id);
    assert.ok(note?.alt.length > 60, a.id);
    assert.ok(note?.note.length > 120, a.id);
  }
});

test('module 7 candle anatomy and M variants agree with the plotted data', () => {
  const rows = diagram('cuatro-formas').ohlc;
  for (const r of rows) {
    assert.ok(r.low <= r.open && r.open < r.close && r.close <= r.high);
  }
  const anatomy = r => [r.close-r.open, r.high-r.close, r.open-r.low];
  const rounded = values => values.map(v => Math.round(v*100)/100);
  assert.deepEqual(rounded(anatomy(rows[0])), [4.8,0.2,1]);
  assert.deepEqual(rounded(anatomy(rows[2])), [0.5,4.5,1]);
  assert.deepEqual(rounded(anatomy(rows[3])), [0.5,0.5,5]);
  const m = diagram('variantes-m');
  assert.deepEqual(m.sequences.map(s => Math.sign(s[3]-s[1])), [0,1,-1]);
  for (const seq of m.sequences) {
    assert.equal(seq[2], m.base);
    assert.ok(seq[3] > m.base && seq[4] < m.base);
  }
});

test('module 7 distinguishes available observations from the future M15 close', () => {
  const time = diagram('tiempo-y-base');
  assert.ok(time.referenceCloseMinute < time.events[0].minute);
  assert.ok(time.events.at(-1).minute < time.activeCloseMinute);
  assert.ok(time.events.every((e,i,a) => i === 0 || e.minute > a[i-1].minute));
  const asOf = minute => time.events.filter(e => e.minute <= minute);
  // Only events AFTER the second peak can confirm loss of the inter-peak base.
  const crossings = rows => rows.slice(3).filter(e => e.price < time.base);
  assert.deepEqual(crossings(asOf(623)), []);
  assert.deepEqual(crossings(asOf(624)).map(e => e.time), ['10:24']);
  assert.match(moduleSevenSections.find(s => s.id === 'vela-activa').answer, /información futura/);
});

test('module 7 separates local break, previous low and a volume POC from the midpoint', () => {
  const wick = diagram('mecha-y-minimo');
  assert.equal(wick.ohlc.low, wick.priorLow);
  assert.ok(wick.sequence[3] < wick.localBase && wick.sequence[3] > wick.priorLow);
  assert.ok(wick.sequence[4] < wick.priorLow);
  const volume = diagram('rango-y-poc');
  assert.equal(volume.midpoint, (volume.range[0]+volume.range[1])/2);
  const max = volume.profile.reduce((a,b) => a.volume > b.volume ? a : b);
  assert.equal(volume.poc, max.price);
  assert.notEqual(volume.poc, volume.midpoint);
});

test('module 7 provides complete practice and connects navigation without progress writes', () => {
  assert.equal(moduleSevenExercises.length, 9);
  for (const e of moduleSevenExercises) for (const field of ['data','steps','deliverable','answer']) assert.ok(e[field].length > 30, `${e.title}: ${field}`);
  const page = read('../app/curso/modulo-7/page.tsx').toString();
  assert.doesNotMatch(page, /localStorage|\/api\/learning|check_passed|useEffect|setInterval/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /conserva byte por byte/);
  assert.ok(page.indexOf('Antes de abrir la imagen') < page.indexOf('<details>'));
  for (const path of ['../app/learning/workspace.tsx','../app/curso/modulo-6/page.tsx']) assert.match(read(path).toString(), /href="\/curso\/modulo-7"/);
});

test('built module 7 renders twenty originals, five diagrams, thirty-seven checks and dedicated metadata', async () => {
  const { default: worker } = await import('../dist/server/index.js');
  const response = await worker.fetch(new Request('http://localhost/curso/modulo-7', { headers: { accept: 'text/html' } }), { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } }, { waitUntil() {} });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Módulo 7/);
  assert.match(html, /Módulo 7 · Velas Profesionales/);
  assert.doesNotMatch(html, /<title>[^<]*Velas vendedoras/);
  assert.match(html, /property="og:title" content="Módulo 7/);
  assert.match(html, /name="twitter:title" content="Módulo 7/);
  assert.doesNotMatch(html, /<meta[^>]+(?:property="og:image"|name="twitter:image")/);
  assert.equal((html.match(/<img\b/g) ?? []).length, 25);
  assert.equal((html.match(/<details\b/g) ?? []).length, 37);
  for (const a of editorial.assets) assert.ok(html.includes(a.src), a.id);
  for (const a of originals.assets) assert.ok(html.includes(a.src), a.id);
  for (const s of moduleSevenSections) assert.ok(html.includes(`id="${s.id}"`));
  for (const prefix of ['S','C','V']) assert.ok(html.includes(`id="fuente-${prefix}"`));
  assert.match(html.replace(/<!--[\s\S]*?-->/g,''), /Ver respuesta razonada del ejercicio 9/);
  assert.match(html, /Comparación compradora/);
  assert.match(html, /Antes de abrir la imagen/);
  assert.match(html, /href="\/curso\/modulo-6"/);
  assert.doesNotMatch(html, /correctReason|expectedDecision|stopRange/);
});
