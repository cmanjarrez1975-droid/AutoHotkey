import type { LessonLecture } from './lecture-types.ts';
import type { LessonMedia } from './media-types.ts';
export type TrackId = 'fundamentos' | 'metodo' | 'practica';
export type LearningLesson = {
  id: string; track: TrackId; unit: string; title: string; objective: string;
  prerequisites: string[]; paragraphs: string[]; lecture?: LessonLecture; media?: LessonMedia;
  example: { title: string; steps: string[] }; counterexample: string;
  exercise: string; rubric: string[]; solution: string; bridge: string;
  source: string; legacyModules: number[]; image?: { src: string; caption: string };
  checks: Array<{ prompt: string; options: string[]; correct: number; feedback: string }>;
};
export const CONTENT_VERSION = '2026.08.v2';
export const tracks = [
  { id: 'fundamentos' as const, title: 'Fundamentos', subtitle: 'Aprende a observar antes de decidir', description: 'Velas, estructura, zonas, temporalidades y riesgo básico. Empieza aquí si todavía necesitas ayuda para explicar un gráfico.', color: '#63dec1' },
  { id: 'metodo' as const, title: 'Método y estrategias', subtitle: 'Conecta contexto, zona y confirmación', description: 'Estudia las configuraciones del curso original con ejemplos, límites y reglas de descarte. Las discrepancias de las fuentes se señalan expresamente.', color: '#8daaff' },
  { id: 'practica' as const, title: 'Práctica e integración', subtitle: 'Decide, registra y revisa', description: 'Riesgo, replay con futuro oculto, backtesting y diario. El resultado económico se separa de la calidad de tu proceso.', color: '#f5c47a' },
];

export const glossary = [
  ['Oscilación', 'Tramo entre dos giros visibles. No todo giro tiene relevancia estructural.'],
  ['Estructura', 'Relación entre extremos y desplazamientos. En estos ejercicios un extremo se confirma cuando el movimiento posterior supera una referencia previa.'],
  ['Invalidación', 'Observación que contradice la hipótesis. El stop es una orden de gestión y puede incluir un margen distinto de ese nivel.'],
  ['Confirmación', 'Evento especificado antes de decidir: por ejemplo, cierre por encima de una base. Debe indicarse el marco y el nivel.'],
  ['Aceptación', 'Criterio del caso para distinguir una penetración breve de permanencia fuera de una zona; no tiene un número universal de cierres.'],
  ['Absorción', 'Interpretación del método sobre una respuesta del precio. Una mecha es observable; la identidad de los participantes no se deduce solo de ella.'],
  ['Base W/M', 'Máximo entre dos mínimos en W; mínimo entre dos máximos en M. Su recuperación o pérdida confirma el patrón en la versión conservadora.'],
  ['R y R/R', 'R es la pérdida planificada. R/R compara beneficio potencial y pérdida potencial; no es una probabilidad ni una garantía.'],
  ['ATR', 'Promedio de rangos verdaderos. El rango verdadero incluye los huecos respecto al cierre anterior; requiere periodo y serie explícitos.'],
  ['POC', 'Término pendiente de normalización en estas fuentes: algunas láminas lo equiparan a zona media. No lo uses como regla computable sin definir su cálculo.'],
  ['Zona 230', 'Etiqueta ambigua en el material. No se convierte automáticamente en 23,6% ni 230%; queda excluida de las respuestas evaluadas hasta verificar los anclajes.'],
];

export const discrepancies = [
  { term: 'Fibonacci 23 / 230', source: 'Protocolo Avanzado p. 1; Guía W p. 1; manual módulo 2.', decision: 'Pendiente de verificar configuración original. Los ejercicios usan anclajes y porcentajes escritos; no evalúan «230» como equivalencia.' },
  { term: 'Tipo 1', source: 'Protocolo Avanzado pp. 1–2; Guía de Demanda p. 2.', decision: 'Separa anatomía (cuerpo dominante) de función (empuje o posible frenada). La ubicación y el seguimiento deciden; el nombre no basta.' },
  { term: 'Mitigación e invalidación', source: 'Guía de Estudio, respuesta 5; Protocolo Avanzado p. 1.', decision: 'En esta ruta, primera visita cambia fresco a visitado. Se exige una regla de anulación escrita para cada caso. No se presenta como única regla del profesor.' },
  { term: 'EMA 20 / 30 / 75', source: 'Transcripción 02, «Medias 30-75 — Parte 1», inicio.', decision: 'La distinción alrededor de 4h contiene autocorrección oral. Se conservan ambas referencias y se indica la configuración exacta de cada ejercicio.' },
  { term: 'Donchian 5/2', source: 'Protocolo Avanzado p. 3; manual módulo 9.', decision: 'Pendiente de verificar qué representa cada parámetro de la plantilla. Se enseña primero el canal estándar con N explícito y sin mezclar ambas configuraciones.' },
  { term: 'Ventaja institucional', source: 'Blueprint y Playbook, láminas; transcripciones del profesor.', decision: 'Interpretación de las fuentes, no rendimiento comprobado. No se prometen probabilidades ni rentabilidad; se exige validación de muestras y costos.' },
];

