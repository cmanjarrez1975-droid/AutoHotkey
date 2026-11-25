import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { moduleFiveSections, moduleFiveImageNotes, moduleFiveExercises } from '../../learning/module-five-content';
import originals from '../../../public/course-reconstruction/module-05/originals/manifest.json';
import editorial from '../../../public/course-reconstruction/module-05/editorial/manifest.json';
import '../modulo-2/module-two.css';

export const metadata: Metadata = {
  title: 'Módulo 5 · Velas póker | WeAreTrades',
  description: 'Anatomía, contexto, recompra, reventa, activación y riesgo con imágenes comentadas y ocho ejercicios guiados.',
  openGraph: { title: 'Módulo 5 · Velas póker', description: 'Estudia las velas dentro de su contexto. Material en reconstrucción.', images: [] },
  twitter: { title: 'Módulo 5 · Velas póker', description: 'Estudia las velas dentro de su contexto. Material en reconstrucción.', images: [] },
};

type Asset = { id: string; src: string; width: number; height: number };
const manual = '/course-originals/01-APRENDE_NUEVAS_ESTRATEGIAS_TRADING-1-.pdf';

function assetById(assets: Asset[], id: string): Asset {
  const asset = assets.find(item => item.id === id);
  if (!asset) throw new Error(`Falta recurso visual del módulo 5: ${id}`);
  return asset;
}

function OriginalFigure({ id }: { id: string }) {
  const asset = assetById(originals.assets, id);
  const info = moduleFiveImageNotes[id];
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

export default function ModuleFivePage() {
  return <main className="m2-page" id="contenido">
    <Link href="/" prefetch={false}>← Volver a la academia</Link>
    <header className="m2-hero"><span className="m2-eyebrow">NUEVO CURSO · MÓDULO 05</span>
      <h1>Velas póker</h1>
      <p>De la forma al contexto: distingue una reacción, una ruptura y una candidata que todavía puede caducar.</p>
      <div className="m2-stats"><span><strong>{originals.assets.length}</strong> imágenes aportadas</span><span><strong>{editorial.assets.length}</strong> láminas nuevas</span><span><strong>{moduleFiveExercises.length}</strong> ejercicios guiados</span></div>
      <p className="m2-notice">Integración visual del módulo en reconstrucción. Este espacio no registra calificaciones ni modifica el progreso de la ruta actual. La teoría vendedora se complementa con el manual: su transcripción y el video adicional anunciado siguen pendientes.</p>
    </header>
    <nav className="m2-index" aria-label="Contenido del módulo 5">
      {moduleFiveSections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
      <a href="#practica">9. Practica y contrasta</a><a href="#fuentes">Fuentes y estado del módulo</a>
    </nav>
    <div className="m2-reading-note"><strong>Cómo estudiar este módulo</strong><p>Lee la explicación, compara el esquema y responde la pregunta. Después abre las imágenes aportadas y contrástalas con su nota. Los nombres «m4» y los rótulos «Módulo 4» corresponden a la numeración anterior; aquí estudias el <strong>módulo 5</strong>.</p><p>Los diagramas nuevos son ejemplos con datos ficticios. Una vela amplia no demuestra participación institucional, un giro obligatorio ni rentabilidad. Los tramos discontinuos representan escenarios posteriores. No se generan señales ni se envían órdenes.</p></div>
    {moduleFiveSections.map(section => {
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
        <p className="m2-source">Referencia del manual: {section.pages.map((page,index) => <span key={page}>{index > 0 ? ' · ' : ''}<a href={`${manual}#page=${page}`} target="_blank" rel="noopener noreferrer">p. {page}</a></span>)}</p>
      </section>;
    })}
    <section id="practica" className="m2-section"><span className="m2-eyebrow">PRÁCTICA DE COMPRENSIÓN</span><h2>9. Practica y contrasta</h2><p>Necesitas papel o notas y una calculadora. Los ocho ejercicios incluyen todos los datos necesarios y no requieren operar. Escribe tu respuesta antes de desplegar la solución. No se guardan respuestas ni se concede avance automático.</p>
      {moduleFiveExercises.map((exercise,index) => <article key={exercise.title} className="m2-exercise"><h3>{index+1}. {exercise.title}</h3><p><strong>Datos: </strong>{exercise.data}</p><p><strong>Pasos: </strong>{exercise.steps}</p><p><strong>Entrega: </strong>{exercise.deliverable}</p><details><summary>Ver respuesta razonada del ejercicio {index+1}</summary><p>{exercise.answer}</p></details></article>)}
    </section>
    <footer id="fuentes" className="m2-section"><h2>Fuentes y estado del módulo</h2>
      <p>Fuentes principales: tres textos únicos de la entrega del módulo 5 —teoría compradora, aplicación compradora y prácticas vendedoras— y el <a href={manual} target="_blank" rel="noopener noreferrer">manual original del curso</a>, especialmente páginas 76–111. El cuarto adjunto repite la aplicación compradora y no constituye otra clase. La teoría vendedora de las pp. 100–107 es un complemento identificado: su transcripción sigue pendiente.</p>
      <p>Las 11 imágenes se conservan sin modificar y se acompañan de notas. Las seis láminas nuevas y los ocho ejercicios utilizan datos ficticios. Esta integración no acredita haber recibido el video adicional anunciado ni incorpora videos nuevos. Tampoco modifica evaluaciones o progreso.</p>
      <p>Complemento sobre ejecución: una orden stop no garantiza el precio final y una stop-limit puede no ejecutarse. La referencia de <a href="https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15" target="_blank" rel="noopener noreferrer">Investor.gov sobre órdenes stop y stop-limit</a> se refiere a acciones; no valida la estrategia ni define todos los mercados. Los niveles dibujados son ejemplos educativos, no recomendaciones de inversión.</p>
      <p>Antes de continuar, comprueba que separas forma, ubicación, activación y resultado. Continúa con el <Link href="/curso/modulo-6" prefetch={false}>módulo 6: Order Block</Link> para estudiar zonas y destinos; no se presupone que cualquier vela amplia sea un bloque.</p>
      <p><Link href="/curso/modulo-4" prefetch={false}>← Repasar el módulo 4: Movimientos tendenciales bajistas</Link></p><Link href="/" prefetch={false}>← Volver a la ruta actual de aprendizaje</Link>
    </footer>
  </main>;
}
