import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { moduleSevenSections, moduleSevenExercises } from '../../learning/module-seven-content';
import {
  moduleSevenOriginalAssignments,
  moduleSevenOriginalNotes,
  type ModuleSevenOriginalStatus,
} from '../../learning/module-seven-images';
import editorial from '../../../public/course-reconstruction/module-07/editorial/manifest.json';
import originals from '../../../public/course-reconstruction/module-07/originals/manifest.json';
import '../modulo-2/module-two.css';

export const metadata: Metadata = {
  title: 'Módulo 7 · Velas Profesionales | WeAreTrades',
  description: 'Ocho lecciones, veinte imágenes aportadas, cinco láminas editoriales y nueve ejercicios de lectura profesional de velas.',
  openGraph: { title: 'Módulo 7 · Velas Profesionales', description: 'Del contexto a la confirmación local. Desarrollo basado en las nuevas transcripciones.', images: [] },
  twitter: { title: 'Módulo 7 · Velas Profesionales', description: 'Del contexto a la confirmación local. Desarrollo basado en las nuevas transcripciones.', images: [] },
};

function diagramById(id: string) {
  const item = editorial.assets.find(asset => asset.id === id);
  if (!item) throw new Error(`Falta lámina del módulo 7: ${id}`);
  return item;
}

function originalById(id: string) {
  const item = originals.assets.find(asset => asset.id === id);
  if (!item) throw new Error(`Falta imagen original del módulo 7: ${id}`);
  return item;
}

const statusLabel: Record<ModuleSevenOriginalStatus, string> = {
  review: 'Leer con aclaración',
  reference: 'Referencia comentada',
  buyer: 'Comparación compradora',
};

function OriginalFigure({ id }: { id: string }) {
  const image = originalById(id);
  const review = moduleSevenOriginalNotes[id];
  if (!review) throw new Error(`Falta nota crítica de la imagen original: ${id}`);
  return <article className="m2-exercise">
    <h3>{review.title} · <span className="m2-eyebrow">{statusLabel[review.status]}</span></h3>
    <p><strong>Antes de abrir la imagen: </strong>{review.note}</p>
    <details>
      <summary>Ver imagen aportada sin modificaciones</summary>
      <figure className="m2-diagram">
        <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar imagen original: ${review.title} (nueva pestaña)`}>
          <Image src={image.src} alt={review.alt} width={image.width} height={image.height} unoptimized loading="lazy" />
        </a>
        <figcaption><strong>Original recibido.</strong> Archivo conservado byte por byte. <a href={image.src} download>Descargar original</a> · <a href={image.src} target="_blank" rel="noopener noreferrer">Ampliar</a></figcaption>
      </figure>
    </details>
  </article>;
}

export default function ModuleSevenPage() {
  return <main className="m2-page" id="contenido">
    <Link href="/" prefetch={false}>← Volver a la academia</Link>
    <header className="m2-hero">
      <span className="m2-eyebrow">NUEVO CURSO · MÓDULO 07</span>
      <h1>Velas Profesionales</h1>
      <p>Aprende a leer la respuesta del precio: primero ubica la zona, después reconoce la vela y, por último, comprueba la estructura menor.</p>
      <div className="m2-stats"><span><strong>{originals.assets.length}</strong> imágenes aportadas</span><span><strong>{editorial.assets.length}</strong> láminas nuevas</span><span><strong>{moduleSevenExercises.length}</strong> ejercicios resueltos</span></div>
      <p className="m2-notice">Las veinte imágenes aportadas se conservan intactas y aparecen con una lectura crítica antes de abrirlas. No modifican tu progreso ni las evaluaciones. Los videos y la continuación anunciada al final de la transcripción vendedora siguen pendientes.</p>
    </header>
    <nav className="m2-index" aria-label="Contenido del módulo 7">
      {moduleSevenSections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
      <a href="#practica">9. Laboratorio de lectura</a><a href="#fuentes">Fuentes y límites del material</a>
    </nav>
    <div className="m2-reading-note">
      <strong>Cómo estudiar sin perder el hilo</strong>
      <p>Repasa estructura bajista, velas póker y Order Block si lo necesitas. Avanza por el índice, explica cada lámina con tus palabras y responde antes de abrir la comprobación. En el laboratorio usa papel o tus notas: cada ejercicio contiene datos, pasos y una respuesta razonada.</p>
      <p><strong>Fuente principal:</strong> Velas vendedoras. <strong>Fundamentos:</strong> Sistema de lecturas. <strong>Comparación puntual:</strong> Velas compradoras. No se mezclan ambas clases ni se convierte este módulo en uno de entradas compradoras.</p>
      <p>Las imágenes originales se mantienen separadas de las cinco láminas editoriales. Las marcadas como <strong>Comparación compradora</strong> sirven para contrastar contexto; no convierten este módulo en uno de entradas largas.</p>
      <p>Las láminas editoriales y los casos numéricos usan datos ficticios. Las imágenes aportadas pueden contener reglas o interpretaciones del autor; la nota previa indica qué puede observarse y qué no queda demostrado. Este espacio no genera señales ni envía órdenes. «Confirmación» significa un acontecimiento local observado, no certeza de beneficio.</p>
    </div>
    {moduleSevenSections.map(section => {
      const diagram = section.diagram ? diagramById(section.diagram) : null;
      return <section key={section.id} id={section.id} className="m2-section">
        <span className="m2-eyebrow">LEER · OBSERVAR · COMPROBAR</span>
        <h2>{section.title}</h2><p><strong>Al terminar podrás: </strong>{section.objective}</p>
        {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        {(moduleSevenOriginalAssignments[section.id] ?? []).map(id => <OriginalFigure id={id} key={id} />)}
        {diagram && <figure className="m2-diagram">
          <a href={diagram.src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar lámina: ${section.title} (nueva pestaña)`}>
            <Image src={diagram.src} alt={diagram.description} width={diagram.width} height={diagram.height} unoptimized loading="lazy" />
          </a>
          <figcaption><strong>Complemento editorial.</strong> {diagram.description} <a href={diagram.src} download>Descargar lámina</a> · <a href={diagram.src} target="_blank" rel="noopener noreferrer">Ampliar</a></figcaption>
        </figure>}
        {section.id === 'rangos' && <p className="m2-source">Referencia para la aclaración sobre POC de volumen: <a href="https://www.tradingview.com/support/solutions/43000502040-volume-profile-indicators-basic-concepts/" target="_blank" rel="noopener noreferrer">TradingView: conceptos del perfil de volumen</a>. Esta definición no valida la estrategia del curso.</p>}
        <aside className="m2-question"><strong>Comprueba tu lectura</strong><p>{section.question}</p><details><summary>Comparar mi explicación</summary><p>{section.answer}</p></details></aside>
        <p className="m2-source">Origen de la explicación: {section.refs.map((ref, index) => <span key={`${ref.prefix}-${ref.from}`}>
          {index > 0 && ' · '}<a href={`#fuente-${ref.prefix}`}>{ref.prefix}{String(ref.from).padStart(4,'0')}–{ref.prefix}{String(ref.to).padStart(4,'0')}</a>
        </span>)}. Los ejemplos numéricos son editoriales.</p>
      </section>;
    })}
    <section className="m2-section" id="practica">
      <span className="m2-eyebrow">LABORATORIO DE LECTURA</span><h2>9. Practica antes de mirar la solución</h2>
      <p>Necesitas notas y una calculadora; no necesitas una cuenta de trading ni datos externos. No se guardan respuestas ni se conceden aprobaciones automáticas. Divide la práctica en tres sesiones: formas y base (1–3), estructura y contexto (4–6), rangos y riesgo (7–9).</p>
      {moduleSevenExercises.map((exercise,index) => <article className="m2-exercise" key={exercise.title}>
        <h3>{index+1}. {exercise.title}</h3><p><strong>Datos: </strong>{exercise.data}</p><p><strong>Pasos: </strong>{exercise.steps}</p><p><strong>Entrega: </strong>{exercise.deliverable}</p>
        <details><summary>Ver respuesta razonada del ejercicio {index+1}</summary><p>{exercise.answer}</p></details>
      </article>)}
      <aside className="m2-question"><strong>Criterio de revisión</strong><p>Una respuesta completa identifica el nivel correcto, explica el contexto, respeta el orden temporal y reconoce lo que no puede saberse. Si anticipaste el cierre M15, confundiste base con mínimo anterior o dedujiste POC sin volumen por precio, vuelve a las lecciones 4, 5 y 7 antes de continuar.</p></aside>
    </section>
    <footer id="fuentes" className="m2-section">
      <h2>Fuentes y límites del material</h2>
      <p>Se conservan copias íntegras de los tres TXT en el archivo de reconstrucción del proyecto, con comprobación SHA-256. Los identificadores S, C y V numeran sus líneas no vacías desde 1; no son páginas, minutos ni número de video.</p>
      <p id="fuente-V"><strong>V · Fuente 017: Velas vendedoras.</strong> Es la fuente principal. El texto contiene tres partes reconocibles: introducción y base (V0001–V0321), ubicación y rangos (V0322–V1349), continuación y casos difíciles (V1350–V2304). El final anuncia una parte siguiente que no se da por recibida.</p>
      <p id="fuente-S"><strong>S · Fuente 015: Sistema de lecturas.</strong> Se utiliza para aclarar las cuatro formas y la nomenclatura de las variantes M, especialmente S0186–S0342. No se incorpora todo su contenido como si fuera exclusivamente vendedor.</p>
      <p id="fuente-C"><strong>C · Fuente 016: Velas compradoras.</strong> Se usa solo para comparar ubicación en soporte y base W frente a base M, C0055–C0196. Su desarrollo completo queda separado de este módulo.</p>
      <p>Esta versión integra las veinte imágenes PNG aportadas y las conserva byte por byte en el archivo de reconstrucción. Son esquemas didácticos, no los videos ni datos históricos completos. Expresiones como «aquí», «giro en B» o «vuelta nube» todavía no permiten reconstruir de forma inequívoca todos los recorridos, entradas o estadísticas mencionados oralmente.</p>
      <p>Se distingue la terminología del profesor de las aclaraciones editoriales: color no equivale a dirección futura; POC no equivale a punto medio; la observación de precios no identifica intenciones institucionales; una ruptura intrabar no permite usar el cierre futuro. Las reglas de timing del profesor se presentan como criterios de su método, no como resultados estadísticos comprobados.</p>
      <p>Los ejemplos de riesgo son ejercicios aritméticos sin costes, no instrucciones de inversión. Para estudiar ejecución, <a href="https://www.finra.org/investors/insights/stop-orders-factors-consider-during-volatile-markets" target="_blank" rel="noopener noreferrer">FINRA describe las limitaciones de las órdenes stop en acciones</a>: su precio de activación no garantiza el precio de ejecución. No extrapolamos todas sus reglas a todos los instrumentos del curso.</p>
      <p>Se conserva la numeración solicitada: <strong>7. Velas Profesionales</strong>, después del módulo 6: Order Block. «Velas vendedoras» permanece como nombre de la fuente principal, no como título del módulo. No se reincorpora el antiguo módulo de rutinas excluido.</p>
      <p><Link href="/curso/modulo-6" prefetch={false}>← Repasar el módulo 6: Order Block</Link></p><Link href="/" prefetch={false}>← Volver a la ruta de aprendizaje</Link>
    </footer>
  </main>;
}
