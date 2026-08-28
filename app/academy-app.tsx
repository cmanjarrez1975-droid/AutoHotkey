"use client";

import { useEffect, useMemo, useState } from "react";
import {
  classCatalog,
  featuredLessons,
  mediaItems,
  modules,
  sourceCatalog,
  sourceRecords,
} from "./course-data";
import {
  complementaryReferences,
  moduleCurriculum,
} from "./course-narrative";
import {
  type CourseVisual,
  moduleMedia,
} from "./course-visuals";
import { moduleVisuals } from "./official-course-visuals";
import {
  AnalyticsPage,
  JournalPage,
  LabPage,
  LabSnapshot,
  MentorPage,
  QuizPage,
} from "./interactive-features";
import LessonExperience from "./lesson-experience";

type Section =
  | "inicio"
  | "curso"
  | "laboratorio"
  | "mentor"
  | "diario"
  | "analitica"
  | "trivia"
  | "cuestionario"
  | "fuentes";

const navItems: Array<{
  id: Section;
  label: string;
  glyph: string;
}> = [
  { id: "inicio", label: "Inicio", glyph: "⌂" },
  { id: "curso", label: "Mi curso", glyph: "▤" },
  { id: "laboratorio", label: "Laboratorio", glyph: "⌁" },
  { id: "mentor", label: "Análisis con IA", glyph: "✦" },
  { id: "diario", label: "Diario de práctica", glyph: "▣" },
  { id: "analitica", label: "Analítica", glyph: "▥" },
  { id: "trivia", label: "Trivia", glyph: "◆" },
  { id: "cuestionario", label: "Cuestionario", glyph: "✓" },
  { id: "fuentes", label: "Material y fuentes", glyph: "◫" },
];

type LessonProgressRecord = {
  lessonId: string;
  module: number;
  completed: boolean;
  studySeconds: number;
};

const lessonCountsByModule = Object.fromEntries(
  modules.map((module) => {
    const modulePlan = moduleCurriculum.find((item) => item.module === module.id);
    const classCount = classCatalog.filter((item) => item.module === module.id).length;
    const mediaCount = (moduleMedia[module.id] ?? []).length;
    return [module.id, 4 + (modulePlan?.sections.length ?? 0) + classCount + mediaCount];
  }),
) as Record<number, number>;

const totalAcademyLessons = Object.values(lessonCountsByModule).reduce(
  (total, count) => total + count,
  0,
);

function completionPercent(lessons: LessonProgressRecord[]) {
  const completed = new Set(
    lessons.filter((lesson) => lesson.completed).map((lesson) => lesson.lessonId),
  ).size;
  return Math.round((completed / Math.max(1, totalAcademyLessons)) * 100);
}

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function ProgressRing({
  value,
  size = 84,
}: {
  value: number;
  size?: number;
}) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 88 88" role="img" aria-label={`${value}% completado`}>
        <circle className="ring-track" cx="44" cy="44" r={radius} />
        <circle
          className="ring-value"
          cx="44"
          cy="44"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <strong>{value}%</strong>
    </div>
  );
}

function Shell({
  section,
  setSection,
  lessons,
  currentModule,
  children,
}: {
  section: Section;
  setSection: (section: Section) => void;
  lessons: LessonProgressRecord[];
  currentModule: number;
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const completedLessons = new Set(
    lessons.filter((lesson) => lesson.completed).map((lesson) => lesson.lessonId),
  ).size;
  const progress = completionPercent(lessons);
  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "is-open" : ""}`}>
        <button
          className="sidebar-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
        >
          ×
        </button>
        <div className="brand">
          <BrandMark />
          <div>
            <strong>U WeAreTrades</strong>
            <span>Academy</span>
          </div>
        </div>

        <div className="course-switcher">
          <span className="course-badge">NET</span>
          <div>
            <small>Curso activo</small>
            <strong>Nuevas Estrategias</strong>
          </div>
          <span className="switch-arrow">⌄</span>
        </div>

        <nav aria-label="Navegación principal">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={section === item.id ? "active" : ""}
              onClick={() => {
                setSection(item.id);
                setMenuOpen(false);
              }}
            >
              <span className="nav-glyph">{item.glyph}</span>
              <span>{item.label}</span>
              {item.id === "laboratorio" && <em>Nuevo</em>}
              {item.id === "mentor" && <em>Pendiente</em>}
            </button>
          ))}
        </nav>

        <div className="sidebar-progress">
          <div className="tiny-label">
            <span>Progreso general</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track">
            <i style={{ width: `${progress}%` }} />
          </div>
          <small>{completedLessons} de {totalAcademyLessons} lecciones completadas</small>
        </div>

        <div className="profile-card">
          <span className="avatar">CR</span>
          <div>
            <strong>Cris</strong>
            <small>Estudiante · UTC−6</small>
          </div>
          <span className="more">•••</span>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            ☰
          </button>
          <div className="topbar-context">
            <span className="live-dot" />
            <span>Entorno de estudio</span>
            <strong>Nuevas Estrategias de Trading</strong>
            <span className="mobile-context">M{currentModule} · {navItems.find((item) => item.id === section)?.label}</span>
          </div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Buscar">
              ⌕
            </button>
            <button className="icon-button notification" aria-label="Notificaciones">
              ◔
              <i />
            </button>
            <button
              className="primary-small"
              onClick={() => setSection("laboratorio")}
            >
              Abrir laboratorio
            </button>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

function Dashboard({
  setSection,
  lessons,
}: {
  setSection: (s: Section) => void;
  lessons: LessonProgressRecord[];
}) {
  const currentModule = modules[0];
  const completedLessons = new Set(
    lessons.filter((lesson) => lesson.completed).map((lesson) => lesson.lessonId),
  ).size;
  const progress = completionPercent(lessons);
  const todayLabel = new Intl.DateTimeFormat("es-CR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "America/Costa_Rica",
  }).format(new Date());
  return (
    <div className="page dashboard-page">
      <section className="welcome-row">
        <div>
          <span className="eyebrow">{todayLabel} · UTC−6</span>
          <h1>Buenas tardes, Cris.</h1>
          <p>
            Hoy no solo vas a estudiar estructura: vas a marcarla, medirla y
            justificarla.
          </p>
        </div>
        <div className="streak-card">
          <span className="streak-icon">↗</span>
          <div>
            <small>Racha de estudio</small>
            <strong>7 días</strong>
          </div>
          <span className="streak-best">Mejor: 12</span>
        </div>
      </section>

      <section className="continue-card">
        <div className="continue-copy">
          <span className="module-kicker">MÓDULO 1 · RUTA DE {lessonCountsByModule[1]} LECCIONES</span>
          <h2>Principales movimientos en tendencias alcistas</h2>
          <p>
            Aprende a separar impulso, retroceso y estructura válida antes de
            buscar una entrada. La invalidación se define antes de evaluar el
            resultado.
          </p>
          <div className="lesson-meta">
            <span>◷ 18 min restantes</span>
            <span>▤ Manual pp. 9–34</span>
            <span>◆ Práctica incluida</span>
          </div>
          <button className="primary" onClick={() => setSection("curso")}>
            Continuar lección <span>→</span>
          </button>
        </div>
        <div className="continue-visual">
          <img
            src="/course-references/official/market-architect-02.webp"
            alt="Arquitectura top-down del material aportado para el curso"
          />
          <div className="visual-overlay">
            <span>Presentación aportada</span>
            <strong>Contexto → zona → ejecución</strong>
          </div>
        </div>
      </section>

      <section className="metrics-grid">
        <article className="metric-card">
          <div className="metric-top">
            <span className="metric-icon cyan">▤</span>
            <small>Progreso del curso</small>
          </div>
          <div className="metric-content">
            <ProgressRing value={progress} />
            <div>
              <strong>{completedLessons} / {totalAcademyLessons}</strong>
              <span>lecciones</span>
              <small>{completedLessons ? "Avance guardado" : "Comienza tu primera lección"}</small>
            </div>
          </div>
        </article>
        <article className="metric-card">
          <div className="metric-top">
            <span className="metric-icon green">✓</span>
            <small>Dominio conceptual</small>
          </div>
          <div className="metric-number">
            <strong>82%</strong>
            <span className="positive">+6%</span>
          </div>
          <div className="micro-bars">
            {[40, 52, 48, 64, 58, 72, 82].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </article>
        <article className="metric-card">
          <div className="metric-top">
            <span className="metric-icon yellow">⌁</span>
            <small>Prácticas registradas</small>
          </div>
          <div className="metric-number">
            <strong>7 / 10</strong>
            <span>checkpoint M1</span>
          </div>
          <div className="progress-track thick">
            <i style={{ width: "70%" }} />
          </div>
          <small className="card-foot">Faltan 3 escenarios para completar</small>
        </article>
        <article className="metric-card">
          <div className="metric-top">
            <span className="metric-icon purple">◎</span>
            <small>Disciplina de invalidación</small>
          </div>
          <div className="metric-number">
            <strong>86%</strong>
            <span className="positive">Sólida</span>
          </div>
          <p className="metric-note">
            Definiste el stop antes de revelar la solución en 6 de 7 prácticas.
          </p>
        </article>
      </section>

      <section className="content-grid">
        <div className="panel module-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">RUTA ACTUAL</span>
              <h3>{currentModule.title}</h3>
            </div>
            <button className="text-button" onClick={() => setSection("curso")}>
              Ver módulo →
            </button>
          </div>
          <div className="lesson-list compact">
            {featuredLessons.slice(0, 4).map((lesson, index) => (
              <button key={lesson.id} onClick={() => setSection("curso")}>
                <span
                  className={`lesson-status ${lesson.completed ? "done" : index === 2 ? "current" : ""}`}
                >
                  {lesson.completed ? "✓" : index + 1}
                </span>
                <div>
                  <strong>{lesson.title}</strong>
                  <small>
                    {lesson.kind} · {lesson.duration}
                  </small>
                </div>
                <span className="chevron">›</span>
              </button>
            ))}
          </div>
        </div>

        <div className="panel mentor-preview">
          <div className="mentor-orb">✦</div>
          <span className="eyebrow">ANÁLISIS CON IA · PENDIENTE</span>
          <h3>La rúbrica está diseñada, pero la visión no está activada.</h3>
          <p>
            Los laboratorios sí ofrecen validación objetiva. La evaluación de
            capturas con un modelo de visión queda reservada para el paso 4.
          </p>
          <div className="mentor-tags">
            <span>Rúbrica preparada</span>
            <span>Sin evaluación automática</span>
          </div>
          <button className="secondary" onClick={() => setSection("mentor")}>
            Ver alcance pendiente
          </button>
        </div>
      </section>

      <section className="today-strip">
        <div>
          <span className="eyebrow">PLAN DE HOY · 38 MIN</span>
          <h3>Una sesión corta, pero completa</h3>
        </div>
        <div className="today-step done">
          <span>✓</span>
          <div>
            <strong>Repaso</strong>
            <small>5 min</small>
          </div>
        </div>
        <div className="today-step active">
          <span>2</span>
          <div>
            <strong>Lección</strong>
            <small>18 min</small>
          </div>
        </div>
        <div className="today-step">
          <span>3</span>
          <div>
            <strong>Laboratorio</strong>
            <small>10 min</small>
          </div>
        </div>
        <div className="today-step">
          <span>4</span>
          <div>
            <strong>Trivia</strong>
            <small>5 min</small>
          </div>
        </div>
      </section>
    </div>
  );
}

function CoursePage({
  setSection,
  setLabModule,
  initialModule,
  initialLessonId,
  lessonsProgress,
  onModuleChange,
  onLessonChange,
  onLessonCompleted,
}: {
  setSection: (s: Section) => void;
  setLabModule: (module: number) => void;
  initialModule: number;
  initialLessonId?: string;
  lessonsProgress: LessonProgressRecord[];
  onModuleChange: (module: number) => void;
  onLessonChange: (lessonId: string) => void;
  onLessonCompleted: (lessonId: string, module: number) => void;
}) {
  const [activeModule, setActiveModule] = useState(initialModule);
  const [moduleMenuOpen, setModuleMenuOpen] = useState(false);
  const [moduleOpenedAt, setModuleOpenedAt] = useState(0);
  const [lessonMessage, setLessonMessage] = useState("");
  const [activeVisual, setActiveVisual] = useState<CourseVisual | null>(null);
  const selected = modules.find((module) => module.id === activeModule) ?? modules[0];
  const curriculum =
    moduleCurriculum.find((item) => item.module === activeModule) ??
    moduleCurriculum[0];
  const visuals = moduleVisuals[activeModule] ?? [];
  const media = moduleMedia[activeModule] ?? [];
  const visibleLessons = useMemo(
    () =>
      featuredLessons.filter(
        (lesson) => lesson.module === activeModule || activeModule === 1,
      ),
    [activeModule],
  );
  const mappedClasses = useMemo(
    () => classCatalog.filter((item) => item.module === activeModule),
    [activeModule],
  );
  const lessonCounts = lessonCountsByModule;
  const totalLessons = totalAcademyLessons;
  const completedLessonIds = useMemo(
    () => new Set(lessonsProgress.filter((item) => item.completed).map((item) => item.lessonId)),
    [lessonsProgress],
  );
  const moduleCompleted = lessonsProgress.filter(
    (item) => item.module === activeModule && item.completed,
  ).length;
  const moduleProgress = Math.round(
    (moduleCompleted / Math.max(1, lessonCounts[activeModule])) * 100,
  );
  const courseProgress = completionPercent(lessonsProgress);
  const recordStudy = (
    module: number,
    completed: boolean,
    eventTime: number,
    lessonId = `module-${module}-central`,
  ) => {
    const studySeconds = Math.max(
      1,
      Math.round((eventTime - moduleOpenedAt) / 1000),
    );
    setLessonMessage("Guardando avance…");
    fetch("/api/state", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        lesson: {
          lessonId,
          module,
          completed,
          studySeconds,
        },
      }),
    })
      .then((response) =>
        setLessonMessage(
          response.ok
            ? completed
              ? "Lección marcada como estudiada."
              : "Tiempo de estudio registrado."
            : "Avance disponible en esta sesión.",
        ),
      )
      .catch(() => setLessonMessage("Avance disponible en esta sesión."));
  };

  const changeModule = (module: number, eventTime: number) => {
    recordStudy(activeModule, false, eventTime);
    setActiveModule(module);
    setModuleOpenedAt(eventTime);
    setLessonMessage("");
    setActiveVisual(null);
    setModuleMenuOpen(false);
    onModuleChange(module);
  };

  return (
    <div className="page course-page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">CURSO 01 · EN PROGRESO</span>
          <h1>Nuevas Estrategias de Trading</h1>
          <p>
            Un recorrido progresivo desde los fundamentos hasta la ejecución,
            reconstruido con los PDF aportados, las clases y práctica guiada.
          </p>
        </div>
        <div className="course-score">
          <ProgressRing value={courseProgress} size={76} />
          <div>
            <strong>{courseProgress}% completado</strong>
            <span>{totalLessons} lecciones desarrolladas</span>
          </div>
        </div>
      </section>

      <div className="course-layout">
        <section className="lesson-stage">
          <div className="course-module-switcher">
            <button
              className="module-switcher-trigger"
              aria-expanded={moduleMenuOpen}
              aria-controls="course-module-menu"
              onClick={() => setModuleMenuOpen((open) => !open)}
            >
              <span
                className="module-number"
                style={{ "--module-accent": selected.accent } as React.CSSProperties}
              >
                {String(selected.id).padStart(2, "0")}
              </span>
              <span>
                <small>MÓDULO {selected.id} DE {modules.length}</small>
                <strong>{selected.title}</strong>
              </span>
              <i aria-hidden="true">{moduleMenuOpen ? "×" : "⌄"}</i>
            </button>

            {moduleMenuOpen && (
              <>
                <button
                  className="module-menu-backdrop"
                  aria-label="Cerrar selector de módulos"
                  onClick={() => setModuleMenuOpen(false)}
                />
                <div
                  className="module-menu"
                  id="course-module-menu"
                  role="dialog"
                  aria-label="Seleccionar módulo"
                >
                  <header>
                    <div>
                      <span className="eyebrow">RECORRIDO COMPLETO</span>
                      <strong>Selecciona un módulo</strong>
                    </div>
                    <button
                      aria-label="Cerrar selector de módulos"
                      onClick={() => setModuleMenuOpen(false)}
                    >
                      ×
                    </button>
                  </header>
                  <div className="module-menu-grid">
                    {modules.map((module) => (
                      <button
                        key={module.id}
                        className={activeModule === module.id ? "active" : ""}
                        onClick={(event) => changeModule(module.id, event.timeStamp)}
                      >
                        <span
                          className="module-number"
                          style={{ "--module-accent": module.accent } as React.CSSProperties}
                        >
                          {String(module.id).padStart(2, "0")}
                        </span>
                        <span>
                          <strong>{module.title}</strong>
                          <small>
                            {lessonCounts[module.id]} lecciones · {Math.round(
                              (lessonsProgress.filter((item) => item.module === module.id && item.completed).length /
                                Math.max(1, lessonCounts[module.id])) * 100,
                            )}%
                          </small>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="lesson-hero">
            <div>
              <span className="module-kicker">
                MÓDULO {selected.id} · {lessonCounts[selected.id]} LECCIONES
              </span>
              <h2>{selected.title}</h2>
              <p>{selected.subtitle}</p>
              <div className="progress-track">
                <i style={{ width: `${moduleProgress}%` }} />
              </div>
            </div>
            {visuals[0] && (
              <img
                src={visuals[0].src}
                alt={`${visuals[0].title}: ${selected.title}`}
              />
            )}
          </div>

          <LessonExperience
            key={activeModule}
            module={activeModule}
            curriculum={curriculum}
            visuals={visuals}
            media={media}
            classes={mappedClasses}
            initialLessonId={initialLessonId}
            completedLessonIds={completedLessonIds}
            onLessonChange={onLessonChange}
            onOpenLab={() => {
              setLabModule(activeModule);
              setSection("laboratorio");
            }}
            onComplete={(lessonId) => {
              onLessonCompleted(lessonId, activeModule);
              recordStudy(activeModule, true, performance.now(), lessonId);
            }}
          />

          <article className="learning-article expanded-module" hidden>
            <div className="article-label">
              MÓDULO {activeModule} · RUTA CENTRAL RECONSTRUIDA
            </div>
            <h2>{curriculum.question}</h2>
            <p className="lead">{curriculum.introduction}</p>

            <section className="learning-objectives">
              <div>
                <span className="eyebrow">AL FINAL PODRÁS</span>
                <h3>Objetivos verificables</h3>
              </div>
              <ol>
                {curriculum.objectives.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ol>
            </section>

            <section className="learning-route">
              <div>
                <span className="eyebrow">RUTA DE APRENDIZAJE</span>
                <h3>Una explicación que avanza sin saltos</h3>
                <p>
                  Los PDF recientes forman la columna vertebral. Cada nivel
                  explica lo necesario para comprender el siguiente.
                </p>
              </div>
              <ol>
                {curriculum.sections.map((section, index) => (
                  <li key={section.title}>
                    <span>
                      {["Fundamentos", "Aplicación", "Avanzado", "Dominio"][
                        index
                      ] ?? `Nivel ${index + 1}`}
                    </span>
                    <strong>{section.key}</strong>
                  </li>
                ))}
              </ol>
            </section>

            <section className="source-foundation-banner">
              <span>PDF COMO EXPLICACIÓN CENTRAL</span>
              <div>
                <strong>Manual → guías recientes → protocolo avanzado</strong>
                <p>
                  Las transcripciones amplían la voz del profesor. Las láminas
                  originales aparecen dentro del nivel que ayudan a explicar.
                </p>
              </div>
              <em>{visuals.length} referencias visuales aportadas</em>
            </section>

            <div className="deep-sections">
              {curriculum.sections.map((section, index) => (
                <section key={section.title}>
                  <div className="deep-section-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="section-level">
                      <span>
                        {["Fundamentos", "Aplicación", "Avanzado", "Dominio"][
                          index
                        ] ?? `Nivel ${index + 1}`}
                      </span>
                      <em>{section.key}</em>
                    </div>
                    <h3>{section.title}</h3>
                    {section.paragraphs.slice(0, 1).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {visuals[index] && (
                      <button
                        className="chapter-visual"
                        onClick={() => setActiveVisual(visuals[index])}
                        aria-label={`Ampliar ${visuals[index].title}`}
                      >
                        <span>
                          <img
                            src={visuals[index].src}
                            alt={visuals[index].title}
                            loading="lazy"
                          />
                        </span>
                        <span>
                          <em>{visuals[index].origin}</em>
                          <strong>{visuals[index].title}</strong>
                          <small>{visuals[index].caption}</small>
                          <b>{visuals[index].source}</b>
                        </span>
                      </button>
                    )}
                    {section.paragraphs.slice(1).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bridge && (
                      <aside className="lesson-bridge">
                        <span>CONEXIÓN</span>
                        <p>{section.bridge}</p>
                      </aside>
                    )}
                    <p className="editorial-source">
                      <strong>Fuente y tratamiento:</strong>{" "}
                      {section.source ??
                        `Síntesis editorial basada en ${curriculum.sources[0]}`}
                    </p>
                    <details className="understanding-check">
                      <summary>Comprobar comprensión</summary>
                      <div>
                        {(section.checks ?? []).map((check, checkIndex) => (
                          <div key={check.question}>
                            <p>
                              <strong>{checkIndex + 1}.</strong>{" "}
                              {check.question}
                            </p>
                            <p>
                              <strong>Respuesta orientativa:</strong>{" "}
                              {check.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                </section>
              ))}
            </div>

            <section className="study-workflow">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">MÉTODO PASO A PASO</span>
                  <h3>Secuencia de lectura</h3>
                </div>
                <span className="verified-pill">✓ Repetible</span>
              </div>
              <div className="workflow-grid">
                {curriculum.workflow.map((step, index) => (
                  <div key={step.title}>
                    <span>{index + 1}</span>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="worked-example">
              <div className="example-heading">
                <span className="eyebrow">EJEMPLO RESUELTO</span>
                <h3>{curriculum.example.title}</h3>
                <p>{curriculum.example.context}</p>
              </div>
              <ol>
                {curriculum.example.development.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <blockquote>{curriculum.example.conclusion}</blockquote>
            </section>

            <section className="errors-and-checklist">
              <div className="common-errors">
                <span className="eyebrow">ERRORES FRECUENTES</span>
                <h3>Qué corregir y por qué</h3>
                {curriculum.errors.map((error) => (
                  <div key={error.title}>
                    <strong>{error.title}</strong>
                    <p>{error.correction}</p>
                  </div>
                ))}
              </div>
              <div className="module-checklist">
                <span className="eyebrow">CHECKLIST</span>
                <h3>Antes de validar</h3>
                {curriculum.checklist.map((item) => (
                  <label key={item}>
                    <input type="checkbox" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </section>

            {media.length > 0 ? (
              media.map((item) => (
                <section className="embedded-media" key={item.src}>
                  <div className="media-player">
                    {item.type === "video" ? (
                      <video
                        controls
                        preload="metadata"
                        poster={item.poster}
                      >
                        <source src={item.src} type="video/mp4" />
                        Tu navegador no puede reproducir este video.
                      </video>
                    ) : (
                      <div
                        className="audio-cover"
                        style={{
                          backgroundImage: `linear-gradient(rgba(5,15,27,.2), rgba(5,15,27,.9)), url(${item.poster})`,
                        }}
                      >
                        <span>◉</span>
                        <audio controls preload="metadata">
                          <source src={item.src} type="audio/mp4" />
                          Tu navegador no puede reproducir este audio.
                        </audio>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="eyebrow">
                      {item.type === "video"
                        ? "VIDEO ORIGINAL CON AUDIO"
                        : "AUDIO ORIGINAL"}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.note}</p>
                    <div className="media-facts">
                      <span>Duración: {item.duration}</span>
                      <span>Audio verificado</span>
                    </div>
                    <div className="chapter-list">
                      {item.topics.map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                    </div>
                    <small className="media-source">Fuente: {item.source}</small>
                  </div>
                </section>
              ))
            ) : (
              <section className="media-unavailable">
                <span className="eyebrow">MULTIMEDIA DEL MÓDULO</span>
                <h3>Sin video específico asignado</h3>
                <p>
                  No se reutilizó un video de otro tema como si fuera contenido
                  propio de este módulo. La explicación se apoya en las páginas
                  originales del manual y queda preparada para incorporar un
                  video narrado específico cuando esté disponible.
                </p>
              </section>
            )}

            <section className="module-lab-brief">
              <div>
                <span className="eyebrow">LABORATORIO DEL MÓDULO</span>
                <h3>{curriculum.lab.title}</h3>
                <p>{curriculum.lab.mission}</p>
                <ol>
                  {curriculum.lab.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
              <aside>
                <span>Criterio de aprobación</span>
                <strong>{curriculum.lab.pass}</strong>
                <span>Checkpoint</span>
                <strong>{curriculum.lab.checkpoint}</strong>
                <button
                  className="primary"
                  onClick={() => {
                    setLabModule(activeModule);
                    setSection("laboratorio");
                  }}
                >
                  Practicar módulo {activeModule} →
                </button>
              </aside>
            </section>

            <footer className="module-sources">
              <span className="eyebrow">FUENTES DE ESTA LECCIÓN</span>
              {Array.from(
                new Set([
                  ...curriculum.sources,
                  ...visuals.map((visual) => visual.source),
                  ...media.map((item) => item.source),
                ]),
              ).map((source) => (
                <p key={source}>▤ {source}</p>
              ))}
              <button
                className="secondary"
                onClick={(event) =>
                  recordStudy(activeModule, true, event.timeStamp)
                }
              >
                Marcar lección como estudiada
              </button>
              {lessonMessage && <small>{lessonMessage}</small>}
            </footer>
          </article>

          <section className="class-catalog" hidden>
            <div className="panel-heading">
              <div>
                <span className="eyebrow">TRAZABILIDAD DE CLASES</span>
                <h3>
                  {mappedClasses.length > 0
                    ? `${mappedClasses.length} clases transcritas revisadas`
                    : "Módulo desarrollado desde el manual"}
                </h3>
              </div>
              <span className="verified-pill">
                {classCatalog.length} / 38 catalogadas
              </span>
            </div>
            {mappedClasses.length > 0 ? (
              <div className="class-catalog-grid">
                {mappedClasses.map((courseClass, index) => (
                  <article key={courseClass.id}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{courseClass.title}</strong>
                      <small>{courseClass.source}</small>
                    </div>
                    <em>✓ Vinculada</em>
                  </article>
                ))}
              </div>
            ) : (
              <p className="class-catalog-empty">
                Este módulo no dispone de una transcripción independiente entre
                los archivos actuales. Sus lecciones se construyeron con las
                páginas citadas del manual y la elaboración editorial está
                identificada en cada sección.
              </p>
            )}
          </section>

          {visibleLessons.length > 0 && (
            <div className="lesson-list" hidden>
              {visibleLessons.map((lesson, index) => (
                <button key={lesson.id}>
                  <span
                    className={`lesson-status ${lesson.completed ? "done" : index === 2 ? "current" : ""}`}
                  >
                    {lesson.completed ? "✓" : index + 1}
                  </span>
                  <div>
                    <strong>{lesson.title}</strong>
                    <p>{lesson.summary}</p>
                    <small>
                      {lesson.kind} · {lesson.duration}
                    </small>
                  </div>
                  <span className="chevron">›</span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
      {activeVisual && (
        <div
          className="reference-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeVisual.title}
          onClick={() => setActiveVisual(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setActiveVisual(null)}
            aria-label="Cerrar imagen ampliada"
          >
            ×
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={activeVisual.src} alt={activeVisual.title} />
            <figcaption>
              <div>
                <span>{activeVisual.origin}</span>
                <strong>{activeVisual.title}</strong>
                <p>{activeVisual.caption}</p>
              </div>
              <small>{activeVisual.source}</small>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

function SourcesPage() {
  return (
    <div className="page sources-page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">
            BASE DE CONOCIMIENTO · {sourceRecords.length} RECURSOS
          </span>
          <h1>Material y fuentes del curso</h1>
          <p>
            Cada explicación, pregunta y ejercicio conserva su origen. El
            material del profesor y los recursos complementarios no se mezclan
            sin indicarlo.
          </p>
        </div>
        <div className="source-summary">
          <strong>100%</strong>
          <span>catalogado</span>
        </div>
      </section>

      <section className="provenance-banner">
        <div>
          <span>16</span>
          <strong>Fuentes originales aportadas</strong>
          <p>Manual, transcripciones, guías, matriz, láminas y multimedia.</p>
        </div>
        <div>
          <span>10</span>
          <strong>Recursos editoriales derivados</strong>
          <p>Síntesis y materiales pedagógicos creados para explicar las fuentes.</p>
        </div>
        <p>
          Un recurso derivado ayuda a enseñar, pero no sustituye ni aumenta el
          número de fuentes originales.
        </p>
      </section>

      <section className="source-groups">
        {sourceCatalog.map((source) => (
          <article key={source.group}>
            <span className="source-count">{source.count}</span>
            <div>
              <h3>{source.group}</h3>
              <p>{source.items}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="source-ledger">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">CATÁLOGO INDIVIDUAL</span>
            <h2>Las {sourceRecords.length} fuentes, vinculadas por módulo</h2>
          </div>
          <span className="verified-pill">
            {sourceRecords.length} / {sourceRecords.length} identificadas
          </span>
        </div>
        <div className="source-ledger-table">
          <div className="source-ledger-row header">
            <span>Fuente</span>
            <span>Alcance</span>
            <span>Módulos</span>
            <span>Procedencia</span>
            <span>Uso editorial</span>
          </div>
          {sourceRecords.map((source) => (
            <div className="source-ledger-row" key={source.id}>
              <div>
                <small>{source.id} · {source.format}</small>
                <strong>{source.title}</strong>
              </div>
              <span>{source.scope}</span>
              <span>{source.modules.map((module) => `M${module}`).join(" · ")}</span>
              <span>
                <b className={Number(source.id.slice(1)) <= 16 ? "source-original" : "source-derived"}>
                  {Number(source.id.slice(1)) <= 16
                    ? "Original aportada"
                    : "Derivada editorial"}
                </b>
              </span>
              <span>{source.role}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="media-section">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">MEDIATECA</span>
            <h2>Recursos incorporados a las lecciones</h2>
          </div>
          <span className="verified-pill">✓ Contenido revisado</span>
        </div>
        <div className="media-grid">
          {mediaItems.map((item) => (
            <article key={item.title}>
              <div className="media-image">
                <img src={item.image} alt="" />
                <span>{item.type}</span>
                <button aria-label={`Abrir ${item.title}`}>▶</button>
              </div>
              <div className="media-copy">
                <small>
                  {item.module} · {item.duration}
                </small>
                <h3>{item.title}</h3>
                <p>{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="trace-panel">
        <div>
          <span className="eyebrow">TRAZABILIDAD</span>
          <h2>Cómo se presenta una regla en la plataforma</h2>
        </div>
        <div className="trace-flow">
          <span>Fuente principal</span>
          <i>→</i>
          <span>Explicación desarrollada</span>
          <i>→</i>
          <span>Ejercicio validado</span>
          <i>→</i>
          <span>Pregunta con justificación</span>
        </div>
      </section>

      <section className="web-references">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">AMPLIACIÓN CONTRASTADA</span>
            <h2>Referencias técnicas externas</h2>
          </div>
          <span className="verified-pill">Fuentes identificadas</span>
        </div>
        <p>
          Se usan para ampliar cálculo, riesgo y conceptos generales. No
          reemplazan las reglas específicas enseñadas por el profesor.
        </p>
        <div className="reference-grid">
          {complementaryReferences.map((reference) => (
            <a
              key={reference.url}
              href={reference.url}
              target="_blank"
              rel="noreferrer"
            >
              <strong>{reference.title}</strong>
              <span>{reference.note}</span>
              <em>Abrir fuente ↗</em>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function AcademyApp() {
  const [section, setSection] = useState<Section>("inicio");
  const [labSnapshot, setLabSnapshot] = useState<LabSnapshot | null>(null);
  const [labModule, setLabModule] = useState(1);
  const [lastModule, setLastModule] = useState(1);
  const [lastLessonId, setLastLessonId] = useState<string | undefined>();
  const [lessonsProgress, setLessonsProgress] = useState<LessonProgressRecord[]>([]);
  const [stateReady, setStateReady] = useState(false);

  useEffect(() => {
    fetch("/api/state")
      .then((response) => (response.ok ? response.json() as Promise<{ state?: Record<string, unknown>; lessons?: LessonProgressRecord[] }> : null))
      .then((payload) => {
        if (!payload) return;
        const savedSection = payload.state?.lastSection as Section | undefined;
        if (savedSection && navItems.some((item) => item.id === savedSection)) {
          setSection(savedSection);
        }
        const savedModule = Number(payload.state?.lastModule);
        if (savedModule >= 1 && savedModule <= modules.length) {
          setLastModule(savedModule);
          setLabModule(savedModule);
        }
        if (typeof payload.state?.lastLessonId === "string") {
          setLastLessonId(payload.state.lastLessonId);
        }
        if (Array.isArray(payload.lessons)) {
          setLessonsProgress(payload.lessons as LessonProgressRecord[]);
        }
      })
      .catch(() => undefined)
      .finally(() => setStateReady(true));
  }, []);

  const saveNavigation = (state: Record<string, unknown>) => {
    if (!stateReady) return;
    fetch("/api/state", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ state }),
    }).catch(() => undefined);
  };

  const changeSection = (nextSection: Section) => {
    setSection(nextSection);
    saveNavigation({ lastSection: nextSection });
  };

  const updateLastModule = (module: number) => {
    setLastModule(module);
    setLabModule(module);
    setLastLessonId(undefined);
    saveNavigation({ lastModule: module, lastLessonId: null });
  };

  const updateLastLesson = (lessonId: string) => {
    setLastLessonId(lessonId);
    saveNavigation({ lastModule, lastLessonId: lessonId, lastSection: "curso" });
  };

  const completeLesson = (lessonId: string, module: number) => {
    setLessonsProgress((current) => {
      const existing = current.find((item) => item.lessonId === lessonId);
      if (existing) {
        return current.map((item) =>
          item.lessonId === lessonId ? { ...item, completed: true } : item,
        );
      }
      return [...current, { lessonId, module, completed: true, studySeconds: 0 }];
    });
  };

  return (
    <Shell
      section={section}
      setSection={changeSection}
      lessons={lessonsProgress}
      currentModule={lastModule}
    >
      {section === "inicio" && (
        <Dashboard setSection={changeSection} lessons={lessonsProgress} />
      )}
      {section === "curso" && (
        <CoursePage
          setSection={changeSection}
          setLabModule={setLabModule}
          initialModule={lastModule}
          initialLessonId={lastLessonId}
          lessonsProgress={lessonsProgress}
          onModuleChange={updateLastModule}
          onLessonChange={updateLastLesson}
          onLessonCompleted={completeLesson}
        />
      )}
      {section === "fuentes" && <SourcesPage />}
      {section === "laboratorio" && (
        <LabPage
          onSnapshot={setLabSnapshot}
          initialModule={labModule}
          onModuleChange={setLabModule}
        />
      )}
      {section === "mentor" && <MentorPage snapshot={labSnapshot} />}
      {section === "diario" && <JournalPage snapshot={labSnapshot} />}
      {section === "analitica" && <AnalyticsPage />}
      {section === "trivia" && <QuizPage mode="trivia" />}
      {section === "cuestionario" && <QuizPage mode="assessment" />}
    </Shell>
  );
}
