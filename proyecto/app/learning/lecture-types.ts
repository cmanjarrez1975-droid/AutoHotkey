export type LectureFigure = 'candle-paths' | 'candle-clock' | 'structure-sequence';

export type LectureSource = {
  id: string;
  organization: string;
  title: string;
  url: string;
  contribution: string;
  scope: string;
};

export type LectureSection = {
  id: string;
  title: string;
  paragraphs: string[];
  figure?: LectureFigure;
  worked?: { question: string; steps: string[] };
  pause?: { prompt: string; hint: string; answer: string };
  reference?: { sourceId: string; note: string };
};

export type LessonLecture = {
  introduction: string;
  sections: LectureSection[];
  recap: string[];
  recall: { prompt: string; answer: string };
  sources: LectureSource[];
};

// Reading estimate includes the expanded lesson and existing learning activities.
// Bibliographic metadata and interface labels are not counted as teaching text.
export function lessonReadingMinutes(lesson: {
  paragraphs: string[];
  lecture?: LessonLecture;
  example: { title: string; steps: string[] };
  counterexample: string; exercise: string; solution: string; bridge: string;
  rubric: string[];
}) {
  const lecture = lesson.lecture;
  const prose = lecture ? [lecture.introduction, ...lecture.sections.flatMap(section => [
    section.title, ...section.paragraphs,
    section.worked?.question ?? '', ...(section.worked?.steps ?? []),
    section.pause?.prompt ?? '', section.pause?.hint ?? '', section.pause?.answer ?? '',
    section.reference?.note ?? '',
  ]), ...lecture.recap, lecture.recall.prompt, lecture.recall.answer] : lesson.paragraphs;
  const words = [...prose, lesson.example.title, ...lesson.example.steps, lesson.counterexample,
    lesson.exercise, lesson.solution, ...lesson.rubric, lesson.bridge].join(' ').trim().split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 180));
}
