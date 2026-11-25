import type { LessonLecture } from './lecture-types';
import { LectureDemo } from './lecture-demos';
import './lecture.css';

export function LessonLectureContent({ lecture, lessonId }: { lecture: LessonLecture; lessonId: string }) {
  return <div className="a2-lecture">
    <section className="a2-lecture-intro"><span className="a2-overline">CLASE DESARROLLADA · PILOTO DIDÁCTICO</span><h2>Vamos paso a paso</h2><p>{lecture.introduction}</p><p>Lee una sección, responde la pausa y continúa. Las demostraciones y sus respuestas son ayudas sin calificación; la práctica guardada y el control conceptual están al final.</p>
      <nav aria-label="Itinerario de esta clase"><ol>{lecture.sections.map(section => <li key={section.id}><a href={`#${lessonId}-${section.id}`}>{section.title}</a></li>)}</ol></nav>
    </section>
    {lecture.sections.map((section, index) => <section className="a2-lecture-section a2-prose" id={`${lessonId}-${section.id}`} key={section.id}>
      <span className="a2-overline">PASO {index + 1} DE {lecture.sections.length}</span><h2>{section.title}</h2>
      {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      {section.reference && <p className="a2-lecture-reference">{section.reference.note} <a href={`#${lessonId}-source-${section.reference.sourceId}`}>Ver fuente y alcance ↓</a></p>}
      {section.figure && <LectureDemo kind={section.figure} />}
      {section.worked && <div className="a2-lecture-worked"><h3>Lo resolvemos juntos</h3><p>{section.worked.question}</p><ol>{section.worked.steps.map(step => <li key={step}>{step}</li>)}</ol></div>}
      {section.pause && <div className="a2-lecture-pause"><span className="a2-overline">PAUSA · INTENTA EXPLICARLO EN VOZ ALTA</span><h3>{section.pause.prompt}</h3><details><summary>Necesito una pista</summary><p>{section.pause.hint}</p></details><details><summary>Ver explicación de esta pausa</summary><p>{section.pause.answer}</p></details></div>}
    </section>)}
    <section className="a2-lecture-recap"><h2>Conecta las ideas antes de practicar</h2><ul>{lecture.recap.map(item => <li key={item}>{item}</li>)}</ul><p>Ahora continúa con el ejemplo, el contraejemplo y la práctica guardada que aparecen debajo.</p></section>
  </div>;
}

export function LectureReferences({ lecture, lessonId }: { lecture: LessonLecture; lessonId: string }) {
  return <>
    <section className="a2-lecture-recall"><h2>Una comprobación para mañana</h2><p>{lecture.recall.prompt}</p><details><summary>Qué debería contener mi explicación</summary><p>{lecture.recall.answer}</p></details><small>Sugerencia de repaso; no se ha programado un recordatorio.</small></section>
    <section className="a2-lecture-sources"><h2>Bibliografía complementaria comentada</h2><p>Tus materiales originales siguen siendo la base. Estas fuentes complementan conceptos o decisiones didácticas; ninguna acredita este curso ni demuestra la rentabilidad de sus estrategias. Consulta web: 27 de agosto de 2026.</p>
      {lecture.sources.map(source => <article key={source.id} id={`${lessonId}-source-${source.id}`}><span className="a2-overline">{source.organization}</span><h3><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<span className="a2-source-new-tab"> ↗ (abre otra pestaña)</span></a></h3><p><strong>Aporta:</strong> {source.contribution}</p><p><strong>Alcance:</strong> {source.scope}</p></article>)}
    </section>
  </>;
}
