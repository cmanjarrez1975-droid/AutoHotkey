import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { moduleThreeSections, moduleThreeImageNotes, moduleThreeExercises } from '../../learning/module-three-content';
import originals from '../../../public/course-reconstruction/module-03/originals/manifest.json';
import editorial from '../../../public/course-reconstruction/module-03/editorial/manifest.json';
import '../modulo-2/module-two.css';

export const metadata: Metadata = {
  title: 'Módulo 3 · Principales retrocesos en Tendencias Alcistas | WeAreTrades',
  description: 'Tipos de retroceso, ubicación, velas y Fibonacci con imágenes comentadas y ejercicios.',
  openGraph: { title: 'Módulo 3 · Principales retrocesos en Tendencias Alcistas', description: 'Material de estudio en reconstrucción.', images: [] },
  twitter: { title: 'Módulo 3 · Principales retrocesos en Tendencias Alcistas', description: 'Material de estudio en reconstrucción.', images: [] },
};

type Asset = { id: string; src: string; width: number; height: number };
const manual = '/course-originals/01-APRENDE_NUEVAS_ESTRATEGIAS_TRADING-1-.pdf';

function assetById(assets: Asset[], id: string): Asset {
  const asset = assets.find(item => item.id === id);
  if (!asset) throw new Error(`Falta recurso visual del módulo 3: ${id}`);
  return asset;
}

function OriginalFigure({ id }: { id: string }) {
  const asset = assetById(originals.assets, id);
  const info = moduleThreeImageNotes[id];
  if (!info) throw new Error(`Falta nota de revisión visual: ${id}`);
  return <article className="m2-original" id={`original-${id}`}>
    <div className="m2-original-heading"><h3>{info.title}</h3><span>{info.status === 'revision' ? 'Leer con aclaración' : 'Referencia comentada'}</span></div>
    <p className="m2-review-note"><strong>Nota de lectura: </strong>{info.note}</p>
    <details><summary>Ver imagen aportada: {info.title}</summary>
      <figure><a href={asset.src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar imagen original: ${info.title} (nueva pestaña)`}>
        <Image src={asset.src} alt={info.alt} width={asset.width} height={asset.height} unoptimized loading="lazy" />
      </a><figcaption>Archivo aportado, conservado sin modificar. <a href={asset.src} download>Descargar original</a> · <a href={asset.src} target="_blank" rel="noopener noreferrer">Ampliar en otra pestaña</a></figcaption></figure>
    </details>
  </article>;
}

export default function ModuleThreePage() {
  return <main className="m2-page" id="contenido">
    <Link href="/" prefetch={false}>← Volver a la academia</Link>
    <header className="m2-hero"><span className="m2-eyebrow">NUEVO CURSO · MÓDULO 03</span>
      <h1>Principales retrocesos en Tendencias Alcistas</h1>
      <p>Del impulso a su corrección: observa la profundidad, ubica la pausa y explica qué falta por confirmar.</p>
      <div className="m2-stats"><span><strong>{originals.assets.length}</strong> imágenes aportadas</span><span><strong>{editorial.assets.length}</strong> láminas nuevas</span><span><strong>{moduleThreeExercises.length}</strong> ejercicios guiados</span></div>
      <p className="m2-notice">Integración visual del módulo en reconstrucción. Puedes estudiar las imágenes y sus explicaciones; este espacio no registra calificaciones ni modifica el progreso de la ruta actual. No sustituye las partes originales aún pendientes.</p>
    </header>
    <nav className="m2-index" aria-label="Contenido del módulo 3">
      {moduleThreeSections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
      <a href="#practica">8. Practica y contrasta</a><a href="#fuentes">Fuentes y estado del módulo</a>
    </nav>
    <div className="m2-reading-note"><strong>Cómo estudiar estas imágenes</strong><p>Lee la explicación, compara el esquema y responde la pregunta. Las imágenes aportadas están agrupadas junto al tema correspondiente; abre cada una después de leer su nota. Los nombres «m2» y los rótulos internos «Módulo 2» pertenecen a la numeración anterior: aquí corresponden al <strong>módulo 3</strong>.</p><p>Las láminas nuevas son diagramas editoriales basados en la transcripción, el manual y la revisión matemática de las imágenes. No representan precios reales, volumen medido ni resultados garantizados.</p></div>
    {moduleThreeSections.map(section => {
      const diagram = section.diagram ? assetById(editorial.assets, section.diagram) : null;
      const description = editorial.assets.find(item => item.id === section.diagram)?.description;
      return <section key={section.id} id={section.id} className="m2-section">
        <span className="m2-eyebrow">OBSERVAR Y EXPLICAR</span><h2>{section.title}</h2>
        {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        {diagram && <figure className="m2-diagram"><a href={diagram.src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar lámina: ${section.title} (nueva pestaña)`}>
          <Image src={diagram.src} alt={description ?? section.title} width={diagram.width} height={diagram.height} unoptimized loading="lazy" />
        </a><figcaption><strong>Complemento editorial.</strong> {description} <a href={diagram.src} download>Descargar lámina</a> · <a href={diagram.src} target="_blank" rel="noopener noreferrer">Ampliar</a></figcaption></figure>}
        <aside className="m2-question"><strong>Comprueba tu lectura</strong><p>{section.question}</p></aside>
        {section.originals.length > 0 && <div className="m2-originals"><h3>Imágenes aportadas para este tema</h3>{section.originals.map(id => <OriginalFigure key={id} id={id} />)}</div>}
        <p className="m2-source">{section.pages.length ? 'Referencia del manual: ' : 'Complemento editorial basado en las imágenes aportadas de este bloque.'} {section.pages.map((page,index) => <span key={page}>{index > 0 ? ' · ' : ''}<a href={`${manual}#page=${page}`} target="_blank" rel="noopener noreferrer">p. {page}</a></span>)}</p>
      </section>;
    })}
    <section id="practica" className="m2-section"><span className="m2-eyebrow">PRÁCTICA DE COMPRENSIÓN</span><h2>8. Practica y contrasta</h2><p>Ejercicios editoriales con datos ficticios. Escribe tu razonamiento en tus apuntes antes de desplegar la respuesta. No se guardan respuestas ni se concede avance automático.</p>
      {moduleThreeExercises.map((exercise,index) => <article key={exercise.title} className="m2-exercise"><h3>{index+1}. {exercise.title}</h3><p>{exercise.prompt}</p><details><summary>Ver respuesta razonada del ejercicio {index+1}</summary><p>{exercise.answer}</p></details></article>)}
    </section>
    <footer id="fuentes" className="m2-section"><h2>Fuentes y estado del módulo</h2><p>Fuente principal: la transcripción aportada para el módulo 3 y el <a href={manual} target="_blank" rel="noopener noreferrer">manual original del curso</a>, páginas 37–46. Los dos adjuntos de texto recibidos son idénticos: se trabaja con una sola fuente, sin inventar otra parte. Las imágenes originales se conservan completas y sus discrepancias se explican junto a cada archivo.</p><p>La transcripción termina cortada. Esta integración visual sigue siendo parcial: no sustituye las explicaciones pendientes, no incorpora videos nuevos ni migra el resto del curso. Los ejercicios son de comprensión y no constituyen un sistema operativo ni asesoramiento de inversión.</p><p><Link href="/curso/modulo-2" prefetch={false}>← Repasar el módulo 2: Tipos de Tendencias Alcistas</Link></p><Link href="/" prefetch={false}>← Volver a la ruta actual de aprendizaje</Link></footer>
  </main>;
}
