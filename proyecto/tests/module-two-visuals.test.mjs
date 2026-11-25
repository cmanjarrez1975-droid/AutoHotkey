import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { moduleTwoSections, moduleTwoImageNotes, moduleTwoExercises } from '../app/learning/module-two-content.ts';

const read = path => readFileSync(new URL(path, import.meta.url));
const originals = JSON.parse(read('../public/course-reconstruction/module-02/originals/manifest.json'));
const editorial = JSON.parse(read('../public/course-reconstruction/module-02/editorial/manifest.json'));
const originalHashes = [
  '3644aa85bdbdb711ddb9835592e2e1002a5fbb42311f3eca9b4dc1a045e157bb',
  '603c9ee8089c25b43b9db32d79cf4830849f56444a19a761514e375a884cd111',
  '868a9d4c6a393bea4152633ab11cb768122cb4755bb4e11ab58081ee2d1b87b3',
  '7d56730a4b941ec86f0b34a4d4e332569e7b4f48a3eb68fd4f96d149ab416007',
  '60bc5caecac69626c685cc0a5c8ecccb2224289047bd64e25ba987573b629121',
  'c702512daedcca487aaa3025379f0529bd187eb05e5e3028dd8cb872d7f76e12',
  '9935ecbce68af3f0dd522fb1aa7c6a20c3ca1c84dcec4e2055a82e0f0c29f013',
  '4b032b496a05d234e6a0ba60a84d2476e4d0f993768e6f7a48885aef4347a12f',
  'e31aa5b6b45f557301927dbb4187f1a60072d10cc7f106dabf78bec6e1b8508c',
  'a96cb5ccde41ec2058819089585f9ade6e2b5b269937702ca54f77c010b95bce',
  '791eb70d0441e65593c4e4a46a9b7aa07c5e972ace8e6f5265c2b2b511c4185d',
  '01f98def3bf02c0c9f0737a5e3e01fa8bb0bf16f1d96dc53618ac1483f82f85b',
];

test('module 2 preserves all 12 received PNGs and verifies 5 new diagrams', () => {
  assert.equal(originals.assets.length, 12);
  assert.equal(editorial.assets.length, 5);
  assert.deepEqual(originals.assets.map(a=>a.sha256), originalHashes);
  for (const asset of [...originals.assets, ...editorial.assets]) {
    const data = read(`../public${asset.src}`);
    assert.equal(data.subarray(0,8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(data.readUInt32BE(16), asset.width);
    assert.equal(data.readUInt32BE(20), asset.height);
    assert.equal(data.length, asset.bytes);
    assert.equal(createHash('sha256').update(data).digest('hex'), asset.sha256);
  }
});

test('module 2 places each original exactly once with its own accessible explanation', () => {
  const ids=moduleTwoSections.flatMap(s=>s.originals);
  assert.equal(new Set(ids).size, 12);
  assert.equal(ids.length, 12);
  assert.deepEqual([...ids].sort(), originals.assets.map(a=>a.id).sort());
  assert.deepEqual([...ids].sort(), Object.keys(moduleTwoImageNotes).sort());
  for (const id of ids) {
    assert.ok(moduleTwoImageNotes[id].alt.length > 40);
    assert.ok(moduleTwoImageNotes[id].note.length > 100);
  }
  const diagrams=moduleTwoSections.map(s=>s.diagram).filter(Boolean);
  assert.deepEqual([...diagrams].sort(), editorial.assets.map(a=>a.id).sort());
});

test('module 2 retains explicit caveats for contradictory geometry and unsupported volume claims', () => {
  assert.match(moduleTwoImageNotes['patron-continuacion-4-detalle'].note,/señala un máximo local/);
  assert.match(moduleTwoImageNotes['variacion-patron-5-impulso'].note,/contradicen la cautela/);
  assert.match(moduleTwoImageNotes['ubicacion-fibonacci-2do-impulso'].note,/61,8/);
  assert.match(moduleTwoImageNotes['tendencia-alcista-3-detalle'].note,/No se aportan datos/);
  assert.match(moduleTwoImageNotes['patrones-finalizacion'].note,/supera la línea roja/);
  assert.equal(moduleTwoExercises.length,4);
  for (const exercise of moduleTwoExercises) assert.ok(exercise.answer.length>100);
});

test('visual study page is additive and does not write progress or silently replace existing lessons', () => {
  const page=read('../app/curso/modulo-2/page.tsx').toString();
  assert.doesNotMatch(page,/localStorage|\/api\/learning|check_passed|setInterval|useEffect/);
  assert.match(page,/loading="lazy"/);
  assert.match(page,/width=\{asset.width\} height=\{asset.height\}/);
  assert.match(page,/no registra calificaciones/);
  assert.match(page,/<details><summary>Ver imagen aportada/);
  assert.match(read('../app/learning/workspace.tsx').toString(),/href="\/curso\/modulo-2"/);
});

test('built module 2 route renders 17 images, notes, exercises and its own metadata', async () => {
  const { default: worker } = await import('../dist/server/index.js');
  const response = await worker.fetch(new Request('http://localhost/curso/modulo-2',{headers:{accept:'text/html'}}),{ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},{waitUntil(){}});
  assert.equal(response.status,200);
  const html=await response.text();
  assert.match(html,/<title>Módulo 2/);
  assert.doesNotMatch(html,/<meta[^>]+(?:property="og:image"|name="twitter:image")/);
  assert.equal((html.match(/<img\b/g)??[]).length,17);
  assert.equal((html.match(/<details\b/g)??[]).length,16);
  for (const asset of [...originals.assets,...editorial.assets]) assert.ok(html.includes(asset.src),asset.id);
  for (const section of moduleTwoSections) assert.ok(html.includes(`id="${section.id}"`));
  assert.match(html,/ni modifica el progreso/);
  assert.match(html,/Ver respuesta razonada del ejercicio/);
  assert.doesNotMatch(html,/correctReason|expectedDecision|stopRange/);
});
