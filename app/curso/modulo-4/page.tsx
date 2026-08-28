import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { moduleFourSections, moduleFourImageNotes, moduleFourExercises } from '../../learning/module-four-content';
import originals from '../../../public/course-reconstruction/module-04/originals/manifest.json';
import editorial from '../../../public/course-reconstruction/module-04/editorial/manifest.json';
import '../modulo-2/module-two.css';

export const metadata: Metadata = {
  title: 'Módulo 4 · Principales movimientos tendenciales bajistas | WeAreTrades',
  description: 'Cuatro tendencias bajistas, retrocesos, continuaciones y agotamiento con imágenes comentadas y ejercicios.',
  openGraph: { title: 'Módulo 4 · Principales movimientos tendenciales bajistas', description: 'Material de estudio en reconstrucción.', images: [] },
  twitter: { title: 'Módulo 4 · Principales movimientos tendenciales bajistas', description: 'Material de estudio en reconstrucción.', images: [] },
};

type Asset = { id: string; src: string; width: number; height: number };
const manual = '/course-originals/01-APRENDE_NUEVAS_ESTRATEGIAS_TRADING-1-.pdf';

function assetById(assets: Asset[], id: string): Asset {
  const asset = assets.find(item => item.id === id);
  if (!asset) throw new Error(`Falta recurso visual del módulo 4: ${id}`);
  return asset;
}

function OriginalFigure({ id }: { id: string }) {
  const asset = assetById(originals.assets, id);
  const info = moduleFourImageNotes[id];
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

export default function ModuleFourPage() {
  return <main className="m2-page" id="contenido">
    <Link href="/" prefetch={false}>← Volver a la academia</Link>
    <header className="m2-hero"><span className="m2-eyebrow">NUEVO CURSO · MÓDULO 04</span>
      <h1>Principales movimientos tendenciales bajistas</h1>
      <p>Del impulso descendente a la recuperación: identifica la estructura, ubica su pausa y explica qué falta por confirmar.</p>
      <div className="m2-stats"><span><strong>{originals.assets.length}</strong> imágenes aportadas</span><span><strong>{editorial.assets.length}</strong> láminas nuevas</span><span><strong>{moduleFourExercises.length}</strong> ejercicios guiados</span></div>
      <p className="m2-notice">Integración visual del módulo en reconstrucción. Puedes estudiar las imágenes y sus explicaciones; este espacio no registra calificaciones ni modifica el progreso de la ruta actual. No sustituye el video de prácticas anunciado en la fuente y aún pendiente.</p>
    </header>
    <nav className="m2-index" aria-label="Contenido del módulo 4">
      {moduleFourSections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
      <a href="#practica">9. Practica y contrasta</a><a href="#fuentes">Fuentes y estado del módulo</a>
    </nav>
    <div className="m2-reading-note"><strong>Cómo estudiar estas imágenes</strong><p>Lee la explicación, compara el esquema y responde la pregunta. Las imágenes aportadas están agrupadas junto al tema correspondiente; abre cada una después de leer su nota. Los nombres «m3» y los rótulos internos «M3» pertenecen a la numeración anterior: aquí corresponden al <strong>módulo 4</strong>. Las tendencias 1–4, retrocesos 1–3 y continuaciones 1–5 son clasificaciones diferentes.</p><p>Las láminas nuevas son diagramas editoriales basados en las dos transcripciones, el manual y la revisión matemática de las imágenes. No representan precios reales, volumen medido ni resultados garantizados.</p></div>
    {moduleFourSections.map(section => {
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
    <section id="practica" className="m2-section"><span className="m2-eyebrow">PRÁCTICA DE COMPRENSIÓN</span><h2>9. Practica y contrasta</h2><p>Necesitas papel o notas y, para los cálculos, una calculadora. Los cinco primeros ejercicios usan ejemplos ficticios; el sexto remite al manual enlazado. Escribe tu razonamiento en tus apuntes antes de desplegar la respuesta. No se guardan respuestas ni se concede avance automático.</p>
      {moduleFourExercises.map((exercise,index) => <article key={exercise.title} className="m2-exercise"><h3>{index+1}. {exercise.title}</h3><p>{exercise.prompt}</p><details><summary>Ver respuesta razonada del ejercicio {index+1}</summary><p>{exercise.answer}</p></details></article>)}
    </section>
    <footer id="fuentes" className="m2-section"><h2>Fuentes y estado del módulo</h2><p>Fuentes principales: las dos partes distintas aportadas para el módulo 4 y el <a href={manual} target="_blank" rel="noopener noreferrer">manual original del curso</a>, páginas 58–69 y 72–74. Ambas transcripciones tienen despedida; la segunda anuncia otro video de prácticas que todavía no se ha recibido. Los bloques de esta página organizan el estudio: no son clases adicionales atribuidas al profesor.</p><p>Las 13 imágenes originales se conservan sin modificar; sus discrepancias se explican antes de abrirlas. Las láminas nuevas y los ejercicios numéricos usan datos ficticios. La práctica con la página 74 es una lectura retrospectiva de la fuente, no una simulación ciega. No se incorporan videos nuevos, resultados de operaciones ni migraciones del progreso.</p><p>Al terminar, comprueba que puedes separar las numeraciones, declarar anclajes y revisar una hipótesis sin usar datos futuros. Si todavía necesitas las soluciones, repasa ese bloque. Esto no concede una calificación ni acredita preparación para operar con dinero real. El siguiente tema será Velas póker cuando se reciba su contenido.</p><p><Link href="/curso/modulo-3" prefetch={false}>← Repasar el módulo 3: Retrocesos en Tendencias Alcistas</Link></p><Link href="/" prefetch={false}>← Volver a la ruta actual de aprendizaje</Link></footer>
  </main>;
}
