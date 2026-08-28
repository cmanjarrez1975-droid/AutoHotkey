export * from './metadata.ts';
import type { LearningLesson } from './metadata.ts';
// Explicit authored units. IDs are stable and never derived from array order.
import { foundations } from './foundations.ts';
import { method } from './method.ts';
import { practice } from './practice.ts';
export const lessons: LearningLesson[] = [...foundations, ...method, ...practice];
export type PublicLesson = Omit<LearningLesson, 'checks'> & {
  checks: Array<Pick<LearningLesson['checks'][number], 'prompt' | 'options'>>;
};
export function publicLessons(): PublicLesson[] {
  return lessons.map(lesson => ({ ...lesson, checks: lesson.checks.map(({ prompt, options }) => ({ prompt, options })) }));
}
