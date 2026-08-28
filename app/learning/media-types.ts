export type MediaChapter = { title: string; start: number; end: number; text: string };
export type LessonMedia = {
  title: string;
  video: string;
  poster: string;
  captions: string;
  transcript: string;
  duration: number;
  bytes: number;
  alt: string;
  chapters: MediaChapter[];
};

export function mediaTime(seconds: number) {
  const value = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
}

export function safeSeek(seconds: number, duration: number) {
  if (!Number.isFinite(seconds) || !Number.isFinite(duration) || duration <= 0) return 0;
  return Math.min(Math.max(seconds, 0), Math.max(0, duration - 0.05));
}
