"use client";

import { useEffect, useMemo, useState } from "react";
import { buildAcademyLessons } from "./academy-lessons";
import type { CourseClass } from "./course-data";
import type { ModuleCurriculum } from "./module-content";
import type { CourseMedia, CourseVisual } from "./course-visuals";

const groupLabels = {
  Fundamentos: "Ruta central",
  Seminarios: "Clases del profesor",
  Aplicación: "Aplicación y casos",
  Práctica: "Dominio práctico",
};

export default function LessonExperience({
  module,
  curriculum,
  visuals,
  media,
  classes,
  initialLessonId,
  completedLessonIds,
  onLessonChange,
  onOpenLab,
  onComplete,
}: {
  module: number;
  curriculum: ModuleCurriculum;
  visuals: CourseVisual[];
  media: CourseMedia[];
  classes: CourseClass[];
  initialLessonId?: string;
  completedLessonIds: Set<string>;
  onLessonChange: (lessonId: string) => void;
  onOpenLab: () => void;
  onComplete: (lessonId: string) => void;
}) {
  const lessons = useMemo(
    () => buildAcademyLessons({ module, curriculum, visuals, media, classes }),
    [module, curriculum, visuals, media, classes],
  );
  const [activeId, setActiveId] = useState(
    lessons.some((lesson) => lesson.id === initialLessonId)
      ? initialLessonId ?? ""
      : lessons[0]?.id ?? "",
  );
  const [syllabusOpen, setSyllabusOpen] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        setSyllabusOpen(false);
        return;
      }
      const saved = window.localStorage.getItem("academy-syllabus-open");
      if (saved !== null) setSyllabusOpen(saved === "true");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleSyllabus = () => {
    setSyllabusOpen((open) => {
      const next = !open;
      if (!window.matchMedia("(max-width: 900px)").matches) {
        window.localStorage.setItem("academy-syllabus-open", String(next));
      }
      return next;
    });
  };

  const selectLesson = (lessonId: string) => {
    setActiveId(lessonId);
    onLessonChange(lessonId);
    if (window.matchMedia("(max-width: 900px)").matches) {
      setSyllabusOpen(false);
    }
  };
  const activeIndex = Math.max(
    0,
    lessons.findIndex((lesson) => lesson.id === activeId),
  );
  const lesson = lessons[activeIndex];

  if (!lesson) return null;

  const groups = Array.from(new Set(lessons.map((item) => item.group)));
  const provenanceClass = lesson.provenance
    .toLowerCase()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return (
    <section
      className={`lesson-experience ${syllabusOpen ? "syllabus-open" : "syllabus-closed"}`}
      aria-label="Ruta de lecciones del módulo"
    >
      <div className="lesson-route-toolbar">
        <div>
          <span className="eyebrow">LECCIÓN {activeIndex + 1} DE {lessons.length}</span>
          <strong>{lesson.title}</strong>
        </div>
        <button
          className="secondary syllabus-toggle"
          aria-expanded={syllabusOpen}
          aria-controls="module-syllabus"
          onClick={toggleSyllabus}
        >
          {syllabusOpen ? "Ocultar programa" : "Mostrar programa"}
        </button>
      </div>

      <button
        className="syllabus-backdrop"
        aria-label="Cerrar programa del módulo"
        onClick={toggleSyllabus}
      />
      <aside className="lesson-syllabus" id="module-syllabus">
        <button
          className="syllabus-close-mobile"
          aria-label="Cerrar programa del módulo"
          onClick={toggleSyllabus}
        >
          ×
        </button>
        <div className="syllabus-summary">
          <span>PROGRAMA REAL DEL MÓDULO</span>
          <strong>{lessons.length} lecciones desarrolladas</strong>
          <p>
            Teoría, clases originales, casos, errores y práctica en una secuencia
            navegable.
          </p>
        </div>
        {groups.map((group) => (
          <div className="syllabus-group" key={group}>
            <span>{groupLabels[group]}</span>
            {lessons
              .filter((item) => item.group === group)
              .map((item) => {
                const index = lessons.indexOf(item);
                return (
                  <button
                    key={item.id}
                    className={`${item.id === lesson.id ? "active" : ""} ${completedLessonIds.has(item.id) ? "completed" : ""}`}
                    onClick={() => selectLesson(item.id)}
                  >
                    <i>{completedLessonIds.has(item.id) ? "✓" : String(index + 1).padStart(2, "0")}</i>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.duration}</small>
                    </span>
                  </button>
                );
              })}
          </div>
        ))}
      </aside>

      <article className="deep-lesson">
        <header className="deep-lesson-header">
          <div className="lesson-badges">
            <span>MÓDULO {module}</span>
            <span>LECCIÓN {activeIndex + 1} DE {lessons.length}</span>
            <em className={provenanceClass}>{lesson.provenance}</em>
          </div>
          <h2>{lesson.title}</h2>
          <p>{lesson.summary}</p>
        </header>

        {lesson.visual && (
          <section className="visual-reading-lab">
            <figure>
              <img src={lesson.visual.src} alt={lesson.visual.title} />
              <figcaption>
                <strong>{lesson.visual.title}</strong>
                <span>{lesson.visual.caption}</span>
              </figcaption>
            </figure>
            <div>
              <span className="eyebrow">LECTURA GUIADA DE LA LÁMINA</span>
              <h3>No mires la imagen de una sola vez</h3>
              <ol>
                <li><strong>Observa:</strong> {lesson.evidence}</li>
                <li><strong>Contrasta:</strong> busca una explicación alternativa antes de aceptar el patrón.</li>
                <li><strong>Descarta:</strong> {lesson.failure}</li>
                <li><strong>Decide:</strong> {lesson.decision}</li>
              </ol>
            </div>
          </section>
        )}

        <section className="lesson-prose">
          <span className="eyebrow">EXPLICACIÓN PROFUNDA</span>
          {lesson.paragraphs.map((paragraph, index) => (
            <p key={`${lesson.id}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </section>

        <section className="decision-triad">
          <div>
            <span>EVIDENCIA QUE EXIGIR</span>
            <p>{lesson.evidence}</p>
          </div>
          <div>
            <span>ERROR QUE DESCARTAR</span>
            <p>{lesson.failure}</p>
          </div>
          <div>
            <span>DECISIÓN DISCIPLINADA</span>
            <p>{lesson.decision}</p>
          </div>
        </section>

        <section className="lesson-rulebook">
          <div>
            <span className="eyebrow">REGLAS OPERATIVAS</span>
            <h3>Lo que debes poder aplicar</h3>
          </div>
          <ol>
            {lesson.rules.map((rule, index) => (
              <li key={`${lesson.id}-rule-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{rule}</p>
              </li>
            ))}
          </ol>
        </section>

        {lesson.media && (
          <section className="integrated-media-lesson">
            <div className="media-player">
              {lesson.media.type === "video" ? (
                <video controls preload="metadata" poster={lesson.media.poster}>
                  <source src={lesson.media.src} type="video/mp4" />
                  Tu navegador no puede reproducir este video.
                </video>
              ) : (
                <div
                  className="audio-cover"
                  style={{
                    backgroundImage: `linear-gradient(rgba(5,15,27,.2), rgba(5,15,27,.9)), url(${lesson.media.poster})`,
                  }}
                >
                  <span>◉</span>
                  <audio controls preload="metadata">
                    <source src={lesson.media.src} type="audio/mp4" />
                  </audio>
                </div>
              )}
            </div>
            <div>
              <span className="eyebrow">ANTES · DURANTE · DESPUÉS</span>
              <h3>El recurso audiovisual ahora forma parte de la clase</h3>
              <ul>
                <li><strong>Antes:</strong> formula una hipótesis y una condición de descarte.</li>
                <li><strong>Durante:</strong> pausa al identificar {lesson.media.topics.join(", ")}.</li>
                <li><strong>Después:</strong> reconstruye la secuencia sin volver a mirar.</li>
              </ul>
            </div>
          </section>
        )}

        <section className="deliberate-practice">
          <div>
            <span className="eyebrow">PRÁCTICA DELIBERADA</span>
            <h3>Produce una respuesta, no solo leas</h3>
            <p>{lesson.exercise}</p>
          </div>
          <label>
            Tu razonamiento
            <textarea
              rows={5}
              placeholder="Escribe contexto, evidencia, alternativa, invalidación y decisión…"
            />
          </label>
          {lesson.opensLab && (
            <button className="primary" onClick={onOpenLab}>
              Abrir laboratorio del módulo →
            </button>
          )}
        </section>

        <section className="lesson-checks">
          <span className="eyebrow">COMPROBAR COMPRENSIÓN</span>
          {lesson.questions.map((check, index) => (
            <details key={`${lesson.id}-check-${index}`}>
              <summary>{check.question}</summary>
              <p>{check.answer}</p>
            </details>
          ))}
        </section>

        <footer className="deep-lesson-footer">
          <div>
            <span>Procedencia</span>
            <strong>{lesson.provenance}</strong>
            <p>{lesson.source}</p>
          </div>
          <div className="lesson-actions">
            <button
              className="secondary"
              disabled={activeIndex === 0}
              onClick={() => selectLesson(lessons[activeIndex - 1].id)}
            >
              ← Anterior
            </button>
            <button
              className="secondary"
              onClick={() => onComplete(lesson.id)}
            >
              {completedLessonIds.has(lesson.id) ? "✓ Estudiada" : "Marcar estudiada"}
            </button>
            <button
              className="primary"
              disabled={activeIndex === lessons.length - 1}
              onClick={() => selectLesson(lessons[activeIndex + 1].id)}
            >
              Siguiente →
            </button>
          </div>
        </footer>
      </article>
    </section>
  );
}
