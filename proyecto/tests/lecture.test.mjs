import assert from 'node:assert/strict';
import test from 'node:test';
import { lessons, publicLessons, CONTENT_VERSION } from '../app/learning/catalog.ts';
import { candleAnatomy, candleAtStep, candlePaths, clockStepCount, structureAtStep, structureStepCount, summarizePrices } from '../app/learning/lecture-model.ts';
import { lessonReadingMinutes } from '../app/learning/lecture-types.ts';

test('el piloto amplía exactamente velas y estructura sin sustituir IDs, controles o versión curricular', () => {
  assert.equal(CONTENT_VERSION, '2026.08.v2');
  assert.equal(lessons.length, 24);
  assert.deepEqual(lessons.filter(lesson => lesson.lecture).map(lesson => lesson.id), ['f-velas', 'f-estructura']);
  for (const lesson of lessons.filter(lesson => lesson.lecture)) {
    assert.ok(lesson.lecture.sections.length >= 5);
    assert.ok(lesson.lecture.sections.filter(section => section.pause).length >= 2);
    assert.ok(lesson.example.steps.length >= 3);
    assert.equal(lesson.checks.length, 1);
  }
});

test('las citas y anclas del piloto resuelven a bibliografía explícita sin duplicados', () => {
  const allowed = new Set(['www.cmegroup.com', 'ies.ed.gov', 'www.nber.org']);
  for (const { lecture } of lessons.filter(lesson => lesson.lecture)) {
    const ids = lecture.sources.map(source => source.id);
    assert.equal(new Set(ids).size, ids.length);
    assert.equal(new Set(lecture.sections.map(section => section.id)).size, lecture.sections.length);
    for (const source of lecture.sources) {
      const url = new URL(source.url);
      assert.equal(url.protocol, 'https:');
      assert.ok(allowed.has(url.hostname));
      assert.ok(source.title && source.organization && source.contribution && source.scope);
    }
    for (const section of lecture.sections) if (section.reference) assert.ok(ids.includes(section.reference.sourceId));
  }
});

test('el contenido público incluye el piloto pero conserva privada la corrección del control', () => {
  const rows = publicLessons();
  assert.ok(rows.find(lesson => lesson.id === 'f-velas').lecture);
  for (const lesson of rows) for (const check of lesson.checks) assert.deepEqual(Object.keys(check).sort(), ['options', 'prompt']);
  assert.doesNotMatch(JSON.stringify(rows), /correctReason|expectedDecision|stopRange/);
});

test('la lectura estimada incorpora el desarrollo y no solo el resumen anterior', () => {
  for (const lesson of lessons.filter(lesson => lesson.lecture)) {
    assert.ok(lessonReadingMinutes(lesson) > lessonReadingMinutes({ ...lesson, lecture: undefined }));
    assert.ok(lessonReadingMinutes(lesson) >= 5);
  }
  for (const lesson of lessons) assert.ok(Number.isInteger(lessonReadingMinutes(lesson)) && lessonReadingMinutes(lesson) >= 2);
});

test('dos recorridos con extremos en distinto orden generan exactamente el mismo OHLC', () => {
  assert.notDeepEqual(candlePaths[0].prices, candlePaths[1].prices);
  for (const path of candlePaths) assert.deepEqual(summarizePrices(path.prices), { open: 100, high: 108, low: 97, close: 104 });
});

test('anatomía alcista y bajista conserva el rango y las longitudes de cuerpo y mechas', () => {
  const up = candleAnatomy({ open: 100, high: 108, low: 97, close: 104 });
  assert.deepEqual(up, { bodyLow: 100, bodyHigh: 104, body: 4, lowerWick: 3, upperWick: 4, range: 11, direction: 'alcista' });
  const down = candleAnatomy({ open: 50, high: 54, low: 47, close: 48 });
  assert.deepEqual(down, { bodyLow: 48, bodyHigh: 50, body: 2, lowerWick: 1, upperWick: 4, range: 7, direction: 'bajista' });
  for (const item of [up, down]) assert.equal(item.body + item.lowerWick + item.upperWick, item.range);
});

test('anatomía maneja cuerpo cero, rango cero y precios negativos sin fabricar distancias', () => {
  for (const candle of [{ open: 0, high: 0, low: 0, close: 0 }, { open: -4, high: -1, low: -7, close: -4 }]) {
    const result = candleAnatomy(candle);
    assert.equal(result.body, 0);
    assert.equal(result.direction, 'sin cambio');
    assert.equal(result.lowerWick + result.upperWick, result.range);
  }
});

test('demostraciones rechazan datos vacíos, no finitos y OHLC imposible', () => {
  for (const values of [[], [NaN], [Infinity], [100, -Infinity]]) assert.throws(() => summarizePrices(values));
  for (const candle of [{ open: 10, high: 9, low: 8, close: 9 }, { open: 10, high: 12, low: 11, close: 12 }, { open: NaN, high: 12, low: 8, close: 10 }]) assert.throws(() => candleAnatomy(candle));
});

test('el reloj solo usa precios conocidos y no presenta un cierre definitivo antes del minuto 15', () => {
  const expected = [
    { open: 100, high: 100, low: 100, close: 100 },
    { open: 100, high: 100, low: 96, close: 96 },
    { open: 100, high: 102, low: 96, close: 102 },
    { open: 100, high: 102, low: 96, close: 101 },
  ];
  for (let step = 0; step < clockStepCount; step++) {
    const current = candleAtStep(step);
    assert.deepEqual(current.candle, expected[step]);
    assert.equal(current.prices.length, step + 1);
    assert.equal(current.closed, step === 3);
  }
  assert.equal(candleAtStep(3).minute, 15);
  assert.ok(candleAtStep(3).candle.close < 102);
});

test('estructura distingue extremo provisional, candidato tras rebote y confirmación por ruptura', () => {
  assert.equal(structureAtStep(0).reference, null);
  assert.equal(structureAtStep(1).candidate, null);
  assert.equal(structureAtStep(2).status, 'Extremo provisional');
  assert.equal(structureAtStep(3).status, 'Candidato tras rebote');
  for (let step = 0; step < structureStepCount; step++) {
    const current = structureAtStep(step);
    assert.equal(current.confirmed, step >= 4);
    assert.equal(current.prices.length, step + 1);
    if (step < 5) assert.ok(!current.prices.includes(121));
    if (step < 6) assert.ok(!current.prices.includes(109));
  }
  assert.equal(structureAtStep(4).prices.at(-1), 113);
  assert.equal(structureAtStep(6).candidate, 106);
});

test('navegación de demostraciones rechaza pasos negativos, fraccionarios o fuera del final', () => {
  for (const [read, count] of [[candleAtStep, clockStepCount], [structureAtStep, structureStepCount]]) {
    for (const step of [-1, 0.5, NaN, Infinity, count]) assert.throws(() => read(step));
    assert.doesNotThrow(() => read(0));
    assert.doesNotThrow(() => read(count - 1));
  }
});
