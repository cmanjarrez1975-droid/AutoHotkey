import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { foundations } from '../app/learning/foundations.ts';
import { method } from '../app/learning/method.ts';
import { practice } from '../app/learning/practice.ts';
import { storyboards, speechText } from './course-media-storyboards.mjs';

const lessons = [...foundations, ...method, ...practice];
const output = fileURLToPath(new URL('../work/course-media/', import.meta.url));
mkdirSync(output, { recursive: true });
const rows = lessons.map(lesson => {
  const diagram = storyboards[lesson.id];
  if (!diagram) throw new Error(`Falta storyboard: ${lesson.id}`);
  const scenes = [
    { heading: 'Qué vamos a observar', text: lesson.objective, narration: `En esta explicación veremos: ${diagram.title}. ${lesson.objective} Trabajaremos con un ejemplo didáctico, no con precios de un mercado real.`, stage: 0 },
    ...lesson.example.steps.map((text, index) => ({ heading: `Paso ${index + 1} · ${lesson.example.title}`, text, narration: `Paso ${index + 1}. ${text}`, stage: index + 1 })),
    { heading: 'La idea que debes conservar', text: diagram.takeaway, narration: `${diagram.takeaway} Pausa el video y explica con tus palabras qué dato observas y qué conclusión todavía no puedes afirmar. Después continúa con la práctica de la clase.`, stage: 99 },
  ].map(scene => ({ ...scene, narration: speechText(scene.narration) }));
  return { id: lesson.id, title: lesson.title, source: lesson.source, diagram, scenes };
});
writeFileSync(`${output}/storyboards.json`, JSON.stringify(rows, null, 2));
console.log(JSON.stringify({ lessons: rows.length, missingImagesBefore: lessons.filter(lesson => !lesson.image).length, scenes: rows.reduce((sum, row) => sum + row.scenes.length, 0), output }));
