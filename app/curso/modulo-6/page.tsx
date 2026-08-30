import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { moduleSixSections, moduleSixImageNotes, moduleSixExercises } from '../../learning/module-six-content';
import originals from '../../../public/course-reconstruction/module-06/originals/manifest.json';
import editorial from '../../../public/course-reconstruction/module-06/editorial/manifest.json';
import '../modulo-2/module-two.css';

export const metadata: Metadata = {
  title: 'Módulo 6 · Order Block | WeAreTrades',
  description: 'Formación, delimitación, visitas, contexto y riesgo: nueve imágenes comentadas, seis diagramas y ocho ejercicios.',
  openGraph: { title: 'Módulo 6 · Order Block', description: 'Estudia las zonas dentro de su contexto. Material en reconstrucción.', images: [] },
  twitter: { title: 'Módulo 6 · Order Block', description: 'Estudia las zonas dentro de su contexto. Material en reconstrucción.', images: [] },
};

type Asset = { id: string; src: string; width: number; height: number };

function assetById(assets: Asset[], id: string): Asset {
  const asset = assets.find(item => item.id === id);
  if (!asset) throw new Error(`Falta recurso visual del módulo 6: ${id}`);
  return asset;
}

function OriginalFigure({ id }: { id: string }) {
  const asset = assetById(originals.assets, id);
  const info = moduleSixImageNotes[id];
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

export default function ModuleSixPage() {
  return <main className="m2-page" id="contenido">
    <Link href="/" prefetch={false}>← Volver a la academia</Link>
    <header className="m2-hero"><span className="m2-eyebrow">NUEVO CURSO · MÓDULO 06</span>
      <h1>Order Block</h1>
      <p>De la formación al recorrido: aprende a delimitar una zona, registrar su visita y separar contexto, entrada y destino.</p>
      <div className="m2-stats"><span><strong>{originals.assets.length}</strong> imágenes aportadas</span><span><strong>{editorial.assets.length}</strong> láminas nuevas</span><span><strong>{moduleSixExercises.length}</strong> ejercicios guiados</span></div>
      <p className="m2-notice">Integración visual del módulo en reconstrucción. Este espacio no registra calificaciones ni modifica el progreso de la ruta actual. La numeración 6 está confirmada en esta entrega. Las capturas originales del mercado y los registros de las operaciones relatadas siguen pendientes.</p>
    </header>
    <nav className="m2-index" aria-label="Contenido del módulo 6">
      {moduleSixSections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
      <a href="#practica">9. Practica y contrasta</a><a href="#fuentes">Fuentes y estado del módulo</a>
    </nav>
    <div className="m2-reading-note"><strong>Cómo estudiar este módulo</strong><p>Lee la explicación, compara el esquema y responde la pregunta. Después abre las imágenes aportadas y contrástalas con su nota. Los prefijos «m4» se conservan en los archivos aportados; aquí estudias el <strong>módulo 6: Order Block</strong>, después de Velas póker.</p><p>Los diagramas nuevos son ejemplos con datos ficticios. Un rectángulo no demuestra órdenes institucionales pendientes ni rentabilidad. Distingue formación, visita y ejecución; las notas explican las discrepancias de los originales. No se generan señales ni se envían órdenes.</p></div>
    {moduleSixSections.map(section => {
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
        <p className="m2-source">Fuente principal: {section.source}</p>
      </section>;
    })}
    <section id="practica" className="m2-section"><span className="m2-eyebrow">PRÁCTICA DE COMPRENSIÓN</span><h2>9. Practica y contrasta</h2><p>Necesitas papel o notas y una calculadora. Los ocho ejercicios incluyen todos los datos necesarios y no requieren operar. Escribe tu respuesta antes de desplegar la solución. No se guardan respuestas ni se concede avance automático.</p>
      {moduleSixExercises.map((exercise,index) => <article key={exercise.title} className="m2-exercise"><h3>{index+1}. {exercise.title}</h3><p><strong>Datos: </strong>{exercise.data}</p><p><strong>Pasos: </strong>{exercise.steps}</p><p><strong>Entrega: </strong>{exercise.deliverable}</p><details><summary>Ver respuesta razonada del ejercicio {index+1}</summary><p>{exercise.answer}</p></details></article>)}
    </section>
    <footer id="fuentes" className="m2-section"><h2>Fuentes y estado del módulo</h2>
      <p>Fuentes principales: tres transcripciones distintas archivadas como 012 (teoría y práctica USD/JPY), 013 (aplicación con ejecución M3) y 014 (aplicación USD/JPY con entrada M15 y salida H1). Las referencias de cada sección permiten localizar su origen. No equivalen a videos reproducibles ni a operaciones verificadas.</p>
      <p>Las nueve imágenes aportadas se conservan sin modificar, con notas antes de abrirlas. Las seis láminas nuevas y los ocho ejercicios usan datos ficticios. Las reglas adicionales de los dibujos no se atribuyen automáticamente al profesor. Esta integración no incorpora videos ni modifica evaluaciones o progreso.</p>
      <p>Complemento sobre datos: <a href="https://www.cmegroup.com/education/articles-and-reports/how-traders-measure-liquidity" target="_blank" rel="noopener noreferrer">CME explica medidas de liquidez y profundidad del libro</a>. Distinguir ese libro de una zona dibujada es una aclaración metodológica, no una validación de esta estrategia.</p>
      <p>Complemento sobre ejecución: <a href="https://www.finra.org/investors/insights/stop-orders-factors-consider-during-volatile-markets" target="_blank" rel="noopener noreferrer">FINRA explica los riesgos de las órdenes stop</a> para acciones: el precio final puede diferir del de activación y una stop-limit puede no ejecutarse. No define todos los mercados del curso. Los ejemplos son educativos y no recomendaciones de inversión.</p>
      <p>Antes de seguir, explica con tus palabras la diferencia entre origen, zona conocida, visita, entrada y resultado. El siguiente tema es 7. Velas Profesionales, desarrollado a partir de las transcripciones de velas compradoras, vendedoras y sistema de lecturas. No se reincorpora el antiguo módulo excluido de rutinas.</p>
      <p><Link href="/curso/modulo-7" prefetch={false}>Continuar al módulo 7: Velas Profesionales →</Link></p>
      <p><Link href="/curso/modulo-5" prefetch={false}>← Repasar el módulo 5: Velas póker</Link></p><Link href="/" prefetch={false}>← Volver a la ruta actual de aprendizaje</Link>
    </footer>
  </main>;
}
