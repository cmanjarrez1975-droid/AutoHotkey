'use client';

import { useEffect, useRef, useState } from 'react';
import { CONTENT_VERSION, discrepancies, glossary, tracks } from './metadata';
import type { PublicLesson } from './catalog';
import { ReplayLab } from './replay-lab';
import { SourceLibrary } from './source-library';
import { PracticeJournal } from './practice-journal';
import { learningRequest } from './request';
import './workspace.css';

export type StudyRecord = { lesson_id: string; course_id: string; draft: string; revision: number; studied: number; practiced: number; check_passed: number; study_seconds: number };
type Attempt = { case_id: string; result: string; response: string; created_at: string };
type LearningState = { records: StudyRecord[]; attempts: Array<{ lesson_id: string; score: number }>; caseAttempts: Attempt[]; local?: boolean };


export default function LearningWorkspace({ lessons, caseList }: { lessons: PublicLesson[]; caseList: Array<{ id: string; title: string; lessonId: string }> }) {
  const [view, setView] = useState('ruta');
  const [activeId, setActiveId] = useState(lessons[0].id);
  const [state, setState] = useState<LearningState>({ records: [], attempts: [], caseAttempts: [] });
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [dirty, setDirty] = useState(false);
  const [query, setQuery] = useState('');
  const [caseLesson, setCaseLesson] = useState<string | undefined>();
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const active = lessons.find(lesson => lesson.id === activeId) ?? lessons[0];
  const studied = state.records.filter(record => record.studied).length;
  const refresh = async () => {
    if (view === 'leccion' && dirty) { setError('Conserva una copia de tu texto antes de recargar los datos. Hay cambios sin guardar.'); return; }
    setReady(false);
    try {
      const response = await fetch('/api/learning', { cache: 'no-store' });
      const payload = await response.json() as LearningState & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? 'No se pudo cargar tu progreso.');
      setState(payload); setError('');
    } catch (failure) { setError((failure as Error).message); }
    finally { setReady(true); }
  };
  useEffect(() => {
    let cancelled = false;
    fetch('/api/learning', { cache: 'no-store' }).then(async response => {
      const payload = await response.json() as LearningState & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? 'No se pudo cargar el aprendizaje.');
      if (!cancelled) setState(payload);
    }).catch(failure => { if (!cancelled) setError(failure.message); }).finally(() => { if (!cancelled) setReady(true); });
    const saved = window.localStorage.getItem('academy-v2-location');
    const frame = window.requestAnimationFrame(() => { if (saved && lessons.some(lesson => lesson.id === saved)) setActiveId(saved); });
    return () => { cancelled = true; window.cancelAnimationFrame(frame); };
  }, [lessons]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  function navigate(next: string, id?: string) {
    if (dirty && !window.confirm('Tienes texto sin guardar. ¿Quieres salir y descartarlo?')) return;
    setDirty(false); setView(next);
    if (id) { setActiveId(id); window.localStorage.setItem('academy-v2-location', id); }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function updateRecord(record: StudyRecord) {
    setState(current => ({ ...current, records: [...current.records.filter(item => item.lesson_id !== record.lesson_id), record] }));
  }
  const goLab = (id?: string) => { if (dirty && !window.confirm('Guarda tu respuesta antes de salir. ¿Descartar el texto sin guardar?')) return; setDirty(false); setCaseLesson(id); setView('laboratorio'); };
  const filtered = lessons.filter(lesson => `${lesson.title} ${lesson.objective}`.toLocaleLowerCase('es').includes(query.toLocaleLowerCase('es')));

  return <div className="academy-v2">
    <a href="#study-main" className="a2-skip">Saltar al contenido</a>
    <header className="a2-top">
      <button className="a2-brand" onClick={() => navigate('ruta')}><span>W</span><div>U WeAreTrades<small>ACADEMY · ESTUDIO Y PRÁCTICA</small></div></button>
      <div className="a2-top-actions"><span className="a2-version">RUTA 2026 · V2</span><button onClick={() => setGlossaryOpen(!glossaryOpen)} aria-expanded={glossaryOpen}>Glosario</button><a href="/signin-with-chatgpt?return_to=/">Mi cuenta</a></div>
    </header>
    <div className="a2-shell">
      <aside className="a2-sidebar">
        <span className="a2-overline">TU ESPACIO DE ESTUDIO</span>
        <nav aria-label="Secciones principales">
          {[['ruta','Ruta de aprendizaje','01'],['leccion','Continuar estudiando','02'],['laboratorio','Laboratorio de decisiones','03'],['diario','Diario de práctica','04'],['progreso','Analítica y progreso','05'],['biblioteca','Biblioteca original','06']].map(([id,label,num]) => <button key={id} aria-current={view === id ? 'page' : undefined} className={view === id ? 'selected' : ''} onClick={() => navigate(id)}><i>{num}</i>{label}</button>)}
        </nav>
        <div className="a2-side-progress"><strong>{studied} <small>/ {lessons.length}</small></strong><span>lecciones estudiadas</span><progress value={studied} max={lessons.length}/><p>Leer, practicar y comprobar son avances diferentes.</p></div>
        <div className="a2-note">Entorno educativo<br/><small>Sin órdenes reales. Análisis con IA: pendiente.</small></div>
      </aside>
      <main id="study-main" className="a2-main">
        {error && <div className="a2-alert" role="alert">{error} <button onClick={refresh}>Reintentar carga</button> <a href="/signin-with-chatgpt?return_to=/">Iniciar sesión</a><p>Puedes leer el contenido. No se atribuirá progreso guardado hasta recuperar la conexión.</p></div>}
        {state.local && <div className="a2-local">Práctica local · datos separados del sitio publicado</div>}
        {view === 'ruta' && <>
          <section className="a2-hero"><div><span className="a2-overline">OBSERVAR → COMPRENDER → DECIDIR</span><h1>Aprende a leer el mercado.<br/><em>Construye tu criterio.</em></h1><p>Un recorrido con prerrequisitos claros, ejemplos explicados y práctica antes de avanzar. Empieza por los fundamentos o comprueba tu base.</p><div className="a2-actions"><button className="a2-primary" onClick={() => navigate('leccion', activeId)}>Continuar: {active.title} →</button><button onClick={() => navigate('diagnostico')}>Diagnóstico inicial</button></div></div><div className="a2-hero-map"><span>EL PROCESO DE ESTUDIO</span><ol><li>Observa los datos<small>Precio, tiempo y referencias</small></li><li>Contrasta tu hipótesis<small>Ejemplo y contraejemplo</small></li><li>Decide con evidencia<small>Ejercicio y revisión</small></li></ol><p>La comprensión se demuestra en un caso nuevo.</p></div></section>
          <div className="a2-section-title"><div><span className="a2-overline">TRES RECORRIDOS CONECTADOS</span><h2>Tu programa de aprendizaje</h2></div><span>{lessons.length} unidades · {caseList.length} casos de replay</span></div>
          <div className="a2-track-grid">{tracks.map((track,index) => { const list=lessons.filter(lesson=>lesson.track===track.id); const count=state.records.filter(record=>record.course_id===track.id&&record.studied).length; return <article className="a2-track" key={track.id} style={{'--track-color':track.color} as React.CSSProperties}><span className="a2-track-number">0{index+1}</span><span className="a2-overline">{track.subtitle}</span><h3>{track.title}</h3><p>{track.description}</p><progress value={count} max={list.length}/><div className="a2-track-bottom"><span>{count}/{list.length} estudiadas</span><button onClick={()=>navigate('leccion',list.find(item=>!state.records.some(record=>record.lesson_id===item.id&&record.studied))?.id??list[0].id)}>Abrir recorrido →</button></div></article>; })}</div>
          <section className="a2-panel"><div className="a2-section-title"><h2>Temario completo</h2><label>Buscar lección<input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Estructura, W, riesgo…"/></label></div>{filtered.map(lesson=><button className="a2-syllabus-row" key={lesson.id} onClick={()=>navigate('leccion',lesson.id)}><span>{tracks.find(track=>track.id===lesson.track)?.title}</span><strong>{lesson.title}</strong><small>{state.records.some(record=>record.lesson_id===lesson.id&&record.studied)?'Estudiada ✓':'Abrir →'}</small></button>)}{!filtered.length&&<p>No hay coincidencias. Prueba otro concepto.</p>}</section>
        </>}
        {view === 'leccion' && <div className="a2-class-layout"><aside className="a2-course-index"><span className="a2-overline">PROGRAMA DEL RECORRIDO</span><h2>{tracks.find(track=>track.id===active.track)?.title}</h2>{lessons.filter(lesson=>lesson.track===active.track).map((lesson,index)=><button key={lesson.id} className={lesson.id===active.id?'current':''} onClick={()=>navigate('leccion',lesson.id)}><span>{String(index+1).padStart(2,'0')}</span>{lesson.title}</button>)}</aside>{ready ? <LessonReader key={active.id} lesson={active} lessons={lessons} record={state.records.find(record=>record.lesson_id===active.id)} records={state.records} onRecord={updateRecord} onDirty={setDirty} navigate={id=>navigate('leccion',id)} openLab={()=>goLab(active.id)} hasCases={caseList.some(item=>item.lessonId===active.id)} /> : <p role="status">Cargando tu trabajo guardado…</p>}</div>}
        {view==='laboratorio'&&<ReplayLab key={caseLesson??'all'} caseList={caseList} lessonId={caseLesson} onAttempt={refresh} onDirty={setDirty} onStudy={id=>navigate('leccion',id)}/>}
        {view==='biblioteca'&&<SourceLibrary discrepancies={discrepancies}/>}
        {view==='diario'&&<PracticeJournal onDirty={setDirty}/>}
        {view==='diagnostico'&&<Diagnostic lessons={lessons.filter(lesson=>lesson.track==='fundamentos')} onContinue={id=>navigate('leccion',id)}/>}
        {view==='progreso'&&<ProgressPanel lessons={lessons} state={state} onContinue={id=>navigate('leccion',id)}/>}
      </main>
    </div>
    {glossaryOpen&&<aside className="a2-glossary" aria-label="Glosario contextual"><button className="a2-close" onClick={()=>setGlossaryOpen(false)}>Cerrar ×</button><h2>Hablar con precisión</h2>{glossary.map(([term,definition])=><details key={term}><summary>{term}</summary><p>{definition}</p></details>)}</aside>}
    <footer className="a2-footer">Formación y simulación. Las reglas del método son hipótesis de estudio, no garantías de rentabilidad. · {CONTENT_VERSION}</footer>
  </div>;
}

function LessonReader({ lesson, lessons, record, records, onRecord, onDirty, navigate, openLab, hasCases }: { lesson: PublicLesson; lessons: PublicLesson[]; record?: StudyRecord; records: StudyRecord[]; onRecord: (record: StudyRecord)=>void; onDirty:(dirty:boolean)=>void; navigate:(id:string)=>void; openLab:()=>void; hasCases:boolean }) {
  const [draft,setDraft]=useState(record?.draft??''); const [reviewed,setReviewed]=useState(Boolean(record?.practiced));
  const [status,setStatus]=useState(record?.draft?'Respuesta recuperada del servidor.':'Escribe y guarda tu razonamiento.');
  const [saving,setSaving]=useState(false); const [answers,setAnswers]=useState<number[]>([]);
  const [feedback,setFeedback]=useState<Array<{correct:boolean;explanation:string}>>([]);
  const mounted=useRef(true);useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;};},[]);
  const revision=useRef(record?.revision??0); const seconds=useRef(0);
  useEffect(()=>{const timer=setInterval(()=>{if(document.visibilityState==='visible'&&document.hasFocus()) seconds.current=Math.min(120,seconds.current+1);},1000);return()=>clearInterval(timer);},[]);
  const missing=lesson.prerequisites.filter(id=>!records.some(item=>item.lesson_id===id&&item.studied));
  const currentIndex=lessons.findIndex(item=>item.id===lesson.id);
  async function save(studied=false) {
    setSaving(true);setStatus('Guardando…'); const delta=seconds.current;
    try { const result=await learningRequest({action:'draft',lessonId:lesson.id,draft,revision:revision.current,reviewed,studied,seconds:delta}); const next=result.record as StudyRecord;revision.current=next.revision;seconds.current=Math.max(0,seconds.current-delta);onRecord(next);if(mounted.current)onDirty(false);setStatus('Guardado en el servidor. Puedes continuar.'); }
    catch(error){setStatus((error as Error).message+' Tu texto no se ha descartado.');}
    finally{setSaving(false);}
  }
  async function check(){setSaving(true);try{const result=await learningRequest({action:'check',lessonId:lesson.id,answers});setFeedback(result.feedback as typeof feedback);if(result.record)onRecord(result.record as StudyRecord);}catch(error){setStatus((error as Error).message);}finally{setSaving(false);}}
  return <article className="a2-reader">
    <header><span className="a2-overline">{lesson.unit} · ADAPTACIÓN EDITORIAL CON FUENTES</span><h1>{lesson.title}</h1><p className="a2-objective"><strong>Al terminar podrás</strong>{lesson.objective}</p><span className="a2-reading-time">Lectura estimada: {Math.max(2,Math.ceil(lesson.paragraphs.join(' ').split(/\s+/).length/180))} min · práctica a tu ritmo</span></header>
    {missing.length>0&&<div className="a2-prerequisites"><strong>Antes de esta lección</strong><p>Recomendamos estudiar estos temas. La navegación permanece libre.</p>{missing.map(id=><button key={id} onClick={()=>navigate(id)}>{lessons.find(item=>item.id===id)?.title} →</button>)}</div>}
    <section className="a2-prose"><h2>Comprende la idea</h2>{lesson.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</section>
    {lesson.image&&<figure className="a2-source-image"><img src={lesson.image.src} alt={lesson.image.caption} loading="lazy"/><figcaption>{lesson.image.caption}</figcaption></figure>}
    <section className="a2-example"><span className="a2-overline">EJEMPLO RESUELTO</span><h2>{lesson.example.title}</h2><ol>{lesson.example.steps.map(step=><li key={step}>{step}</li>)}</ol></section>
    <section className="a2-counter"><h3>Cuándo esta lectura falla</h3><p>{lesson.counterexample}</p></section>
    <section className="a2-exercise"><span className="a2-overline">AHORA TE TOCA A TI</span><h2>Aplica lo que aprendiste</h2><p>{lesson.exercise}</p><label htmlFor="lesson-response">Tu razonamiento<textarea id="lesson-response" disabled={saving} rows={6} maxLength={15000} value={draft} onChange={event=>{setDraft(event.target.value);onDirty(true);setStatus('Hay cambios sin guardar.');}} placeholder="Explica los datos, tu interpretación y sus límites…"/></label><details><summary>Comparar con la resolución razonada</summary><p>{lesson.solution}</p><ul>{lesson.rubric.map(rule=><li key={rule}>{rule}</li>)}</ul></details><label className="a2-checkbox"><input type="checkbox" disabled={saving} checked={reviewed} onChange={event=>{setReviewed(event.target.checked);onDirty(true);}}/>Comparé mi respuesta con los criterios. La revisión abierta es autoevaluación, no certificación.</label><div className="a2-actions"><button className="a2-primary" disabled={saving} onClick={()=>save()}>Guardar respuesta</button><button disabled={saving} onClick={()=>save(true)}>Marcar estudiada y guardar</button>{hasCases&&<button disabled={saving} onClick={openLab}>Abrir casos relacionados →</button>}</div><p role="status" className="a2-save-status">{status}</p></section>
    <section className="a2-check"><span className="a2-overline">COMPROBACIÓN CONCEPTUAL</span><h2>Resuelve sin mirar la explicación</h2>{lesson.checks.map((question,index)=><fieldset key={question.prompt}><legend>{question.prompt}</legend>{question.options.map((option,optionIndex)=><label key={option}><input type="radio" name={`check-${index}`} value={optionIndex} checked={answers[index]===optionIndex} onChange={()=>{setAnswers(current=>{const next=[...current];next[index]=optionIndex;return next;});setFeedback([]);}}/>{option}</label>)}{feedback[index]&&<p className={feedback[index].correct?'a2-success':'a2-warning'}>{feedback[index].correct?'Correcto. ':'Revisar. '}{feedback[index].explanation}</p>}</fieldset>)}<button disabled={saving||answers.filter(Number.isInteger).length!==lesson.checks.length} onClick={check}>Comprobar en servidor</button><small>Este control no evalúa por sí solo tu capacidad de operar ni tu argumento abierto.</small></section>
    <section className="a2-source"><strong>Fuente y alcance</strong><p>{lesson.source}</p></section><p className="a2-bridge">{lesson.bridge}</p>
    <div className="a2-actions a2-next"><button disabled={saving||currentIndex===0} onClick={()=>navigate(lessons[currentIndex-1].id)}>← Anterior</button><button className="a2-primary" disabled={saving||currentIndex===lessons.length-1} onClick={()=>navigate(lessons[currentIndex+1].id)}>Siguiente lección →</button></div>
  </article>;
}

function Diagnostic({lessons,onContinue}:{lessons:PublicLesson[];onContinue:(id:string)=>void}) {
  const [answers,setAnswers]=useState<Record<string,number>>({});const [result,setResult]=useState<Array<{id:string;passed:boolean}>>([]);const [error,setError]=useState('');const [busy,setBusy]=useState(false);
  async function submit(){setBusy(true);setError('');try{const rows=[];for(const lesson of lessons){const data=await learningRequest({action:'check',lessonId:lesson.id,answers:[answers[lesson.id]]});rows.push({id:lesson.id,passed:data.score===100});}setResult(rows);}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
  return <section className="a2-panel a2-diagnostic"><span className="a2-overline">NIVELACIÓN</span><h1>¿Desde dónde empezar?</h1><p>Seis controles breves orientan tu repaso. No marcan lecciones estudiadas ni equivalen a aprobar la práctica.</p>{lessons.map(lesson=><fieldset key={lesson.id}><legend>{lesson.checks[0].prompt}</legend>{lesson.checks[0].options.map((option,index)=><label key={option}><input type="radio" name={lesson.id} checked={answers[lesson.id]===index} onChange={()=>setAnswers(current=>({...current,[lesson.id]:index}))}/>{option}</label>)}</fieldset>)}<button className="a2-primary" onClick={submit} disabled={busy||Object.keys(answers).length!==lessons.length}>Obtener recomendación</button>{error&&<p role="alert">{error}</p>}{result.length>0&&<div className="a2-example"><h2>{result.filter(item=>item.passed).length}/{lessons.length} conceptos comprobados</h2><p>{result.every(item=>item.passed)?'Tu base conceptual está presente. Puedes seguir con Método, conservando las prácticas pendientes.':'Empieza por el primer tema que requiere repaso.'}</p><button onClick={()=>onContinue(result.find(item=>!item.passed)?.id??'m-rechazo')}>Ir al tema recomendado →</button></div>}</section>;
}

function ProgressPanel({lessons,state,onContinue}:{lessons:PublicLesson[];state:LearningState;onContinue:(id:string)=>void}){
  const [legacy,setLegacy]=useState<{lessons?:Array<{lessonId:string;completed:boolean;module:number}>}|null>(null);const [error,setError]=useState('');
  useEffect(()=>{fetch('/api/state').then(async response=>{if(!response.ok)throw new Error('No se pudo consultar el historial anterior.');return response.json();}).then(data=>setLegacy(data as typeof legacy)).catch(e=>setError(e.message));},[]);
  function exportWork(){const blob=new Blob([JSON.stringify({...state,version:CONTENT_VERSION,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='mi-aprendizaje.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  return <><header className="a2-heading"><span className="a2-overline">EVIDENCIA DE APRENDIZAJE</span><h1>Avance con significado</h1><p>Una lectura, una práctica y un control aprobado son registros distintos. Las respuestas abiertas requieren revisión humana para acreditar competencia.</p><button onClick={exportWork}>Exportar mi trabajo</button></header><div className="a2-stats">{[['Estudiadas',state.records.filter(r=>r.studied).length],['Prácticas registradas',state.records.filter(r=>r.practiced).length],['Controles aprobados',state.records.filter(r=>r.check_passed).length],['Casos intentados',new Set(state.caseAttempts.map(a=>a.case_id)).size]].map(([name,value])=><div key={name}><strong>{value}</strong><span>{name}</span></div>)}</div><section className="a2-panel"><h2>Revisión por lección</h2>{lessons.map(lesson=>{const record=state.records.find(r=>r.lesson_id===lesson.id);return <button className="a2-syllabus-row" key={lesson.id} onClick={()=>onContinue(lesson.id)}><strong>{lesson.title}</strong><small>{record?.studied?'Leída ✓':'Lectura pendiente'} · {record?.practiced?'Práctica ✓':'Práctica pendiente'} · {record?.check_passed?'Control ✓':'Control pendiente'}</small></button>;})}</section><section className="a2-panel"><h2>Historial anterior conservado</h2><p>No se ha convertido el progreso de la versión anterior en dominio del currículo nuevo. Los identificadores y registros originales permanecen intactos.</p>{error&&<p role="alert">{error}</p>}<p>{legacy?.lessons?.filter(item=>item.completed).length??0} lecturas marcadas en el historial anterior.</p><details><summary>Ver correspondencias con módulos originales</summary>{lessons.map(lesson=><p key={lesson.id}>{lesson.title} → módulos {lesson.legacyModules.join(', ')}</p>)}</details></section><section className="a2-panel"><h2>Últimos casos</h2>{state.caseAttempts.length===0?<p>Aún no has registrado decisiones.</p>:state.caseAttempts.slice(0,20).map((item,index)=>{const result=JSON.parse(item.result) as {score:number};return <p key={`${item.created_at}-${index}`}>{item.case_id}: {result.score}/100 · {item.created_at}</p>;})}</section></>;
}
