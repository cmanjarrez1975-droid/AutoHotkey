import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { moduleSixSections, moduleSixImageNotes, moduleSixExercises } from '../app/learning/module-six-content.ts';

const read = path => readFileSync(new URL(path, import.meta.url));
const originals = JSON.parse(read('../public/course-reconstruction/module-06/originals/manifest.json'));
const editorial = JSON.parse(read('../public/course-reconstruction/module-06/editorial/manifest.json'));
const diagram = id => editorial.assets.find(a => a.id === id);
// Receipt hashes independent of the image generator and manifests.
const originalHashes = [
  '786f6347b7964f32b4d1ff94bfd5bbc541febddebdaa5f356325fdd668e98a0e',
  '80118491bb2184bd64e8e4479526f8ae7d80075df60d80e1ecef8eb5059694e2',
  '50eeacdf425ce071e39e684c4fc895d9be86aea0a589514f856be8e9e026a21a',
  'cb80aa3c6198cc2981d4ff76e90f347fec37840e8cc033317b169a8e18540ca1',
  '01181514c7b08b99e3b833965087e1cc32b10abbcfd189d5b3265c73fb6a2c1b',
  'f555ee66136fa7081247c804b20d40185709f334c9f9bf30e2ec7a4c29488604',
  '9365bf7e30394d6650f293dd016dda391b5a3dfea877b689fea215b7d87a948d',
  '13f3b10f71b2e35b1067583c51ad3403652f6e56770b210f37afea753cb86522',
  '314af5d45b862d6daa3c4fda9535bd3778f7e80b6140aaf08b29b73c723d3713',
];

test('module 6 preserves nine originals and validates six generated PNGs', () => {
  assert.equal(originals.module, 6);
  assert.equal(editorial.module, 6);
  assert.equal(originals.assets.length, 9);
  assert.equal(editorial.assets.length, 6);
  assert.deepEqual(originals.assets.map(a => a.sha256), originalHashes);
  for (const a of [...originals.assets, ...editorial.assets]) {
    const data = read(`../public${a.src}`);
    assert.equal(data.subarray(0,8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(data.readUInt32BE(16), a.width);
    assert.equal(data.readUInt32BE(20), a.height);
    assert.equal(data.length, a.bytes);
    assert.equal(createHash('sha256').update(data).digest('hex'), a.sha256);
  }
});

test('module 6 assigns every asset once and supplies specific reading notes', () => {
  const ids = moduleSixSections.flatMap(s => s.originals);
  assert.equal(new Set(ids).size, 9);
  assert.deepEqual([...ids].sort(), originals.assets.map(a => a.id).sort());
  assert.deepEqual([...ids].sort(), Object.keys(moduleSixImageNotes).sort());
  assert.deepEqual(moduleSixSections.map(s => s.diagram).filter(Boolean).sort(), editorial.assets.map(a => a.id).sort());
  assert.equal(new Set(moduleSixSections.map(s => s.id)).size, 8);
  for (const s of moduleSixSections) {
    assert.ok(s.paragraphs.length >= 3);
    assert.ok(s.question.length > 80);
    assert.ok(s.source.includes('012') || s.source.includes('013') || s.source.includes('014'));
  }
  for (const id of ids) {
    assert.ok(moduleSixImageNotes[id].alt.length > 50);
    assert.ok(moduleSixImageNotes[id].note.length > 200);
  }
});

test('module 6 uses distinct body limits and persistent event-based visits', () => {
  const rows = diagram('cuerpo-y-mechas').ohlc;
  assert.deepEqual(rows.map(r => [r.open,r.close].sort((a,b) => a-b)), [[101,104],[108,110]]);
  for (const r of rows) {
    assert.ok(r.low < Math.min(r.open,r.close));
    assert.ok(r.high > Math.max(r.open,r.close));
  }
  const { zone, ranges, states } = diagram('visita-persistente');
  let visited = false;
  const observed = ranges.map(([lo,hi]) => {
    visited ||= lo <= zone[1] && hi >= zone[0];
    return visited ? 'visitada' : 'sin-visita';
  });
  assert.deepEqual(observed, states);
  const contact = diagram('retorno-y-contacto');
  assert.deepEqual(contact.returnMinima.map(v => v >= contact.zone[0] && v <= contact.zone[1]), [false,true]);
});

test('module 6 separates local structure, time availability and monetary risk', () => {
  const local = diagram('reaccion-y-ruptura');
  assert.ok(local.series[0].at(-1) < local.localReference);
  assert.ok(local.series[1].at(-1) > local.localReference);
  assert.ok(local.series[1].at(-1) < local.priorReference);
  const time = diagram('tiempo-disponible');
  assert.ok(time.openMinute < time.decisionMinute && time.decisionMinute < time.closeMinute);
  const risk = diagram('stop-y-cantidad');
  for (const c of risk.calculations) {
    assert.equal(c.risk, Math.abs(c.entry-c.stop));
    assert.equal(c.reward, c.target-c.entry);
    assert.equal(c.ratio, c.reward/c.risk);
    assert.equal(c.quantity, Math.floor(risk.budget/(c.risk*risk.pointValue)));
    assert.equal(c.quantity*c.risk*risk.pointValue, risk.budget);
  }
  assert.equal(risk.calculations[0].quantity*risk.calculations[1].risk, 40);
});

test('module 6 explains conflicting labels without claiming historical executions', () => {
  assert.match(moduleSixImageNotes['ob-4-flujo-estructura'].note, /no hay visita/);
  assert.match(moduleSixImageNotes['ob-3-operativa-mitigacion'].note, /no se muestra el objetivo alcanzado/);
  assert.match(moduleSixImageNotes['ob-2-criterios-validacion'].note, /no los establecen/);
  assert.match(moduleSixImageNotes['m4-poker-ob-stops-seguros'].note, /sin muestra/);
  assert.match(moduleSixImageNotes['m4-poker-ob-usdjpy-real'].note, /no aportan precios, fechas ni OHLC verificables/);
});

test('module 6 has eight self-contained exercises and no progress writes', () => {
  assert.equal(moduleSixExercises.length, 8);
  for (const e of moduleSixExercises) for (const field of ['data','steps','deliverable','answer']) assert.ok(e[field].length > 30, `${e.title}: ${field}`);
  const page = read('../app/curso/modulo-6/page.tsx').toString();
  assert.doesNotMatch(page, /localStorage|\/api\/learning|check_passed|setInterval|useEffect/);
  assert.ok(page.indexOf('Nota de lectura:') < page.indexOf('<details><summary>Ver imagen aportada'));
  assert.match(page, /loading="lazy"/);
  for (const path of ['../app/learning/workspace.tsx','../app/curso/modulo-5/page.tsx']) assert.match(read(path).toString(), /href="\/curso\/modulo-6"/);
});

test('built module 6 renders fifteen images, eight answers and its own metadata', async () => {
  const { default: worker } = await import('../dist/server/index.js');
  const response = await worker.fetch(new Request('http://localhost/curso/modulo-6', { headers: { accept: 'text/html' } }), { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } }, { waitUntil() {} });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Módulo 6/);
  assert.match(html, /property="og:title" content="Módulo 6/);
  assert.match(html, /name="twitter:title" content="Módulo 6/);
  assert.doesNotMatch(html, /<meta[^>]+(?:property="og:image"|name="twitter:image")/);
  assert.equal((html.match(/<img\b/g) ?? []).length, 15);
  assert.equal((html.match(/<details\b/g) ?? []).length, 17);
  for (const a of [...originals.assets,...editorial.assets]) assert.ok(html.includes(a.src), a.id);
  for (const s of moduleSixSections) assert.ok(html.includes(`id="${s.id}"`));
  assert.match(html.replace(/<!--[\s\S]*?-->/g,''), /Ver respuesta razonada del ejercicio 8/);
  assert.match(html, /ni modifica el progreso/);
  assert.match(html, /href="\/curso\/modulo-5"/);
  assert.doesNotMatch(html, /correctReason|expectedDecision|stopRange/);
});
