'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { PublicCase } from './cases';
import { learningRequest } from './request';
import { LabChart } from './lab-chart';
import { composeReasoning, decisionOptions, riskPreview, submissionIssues, type LabDraft } from './lab-model';
import './lab.css';

type Result = { score:number; decisionCorrect:boolean; reasonCorrect:boolean; planValid:boolean; rr:number; size:number; future:number[]; explanation:string; riskFeedback?:string; outcome:string };
type CaseSummary = {id:string; title:string; lessonId:string};
type LabProps = {caseList:CaseSummary[]; lessonId?:string; onAttempt:()=>void; onDirty:(dirty:boolean)=>void; onStudy:(lessonId:string)=>void};

export function ReplayLab({caseList,lessonId,onAttempt,onDirty,onStudy}:LabProps) {
  const list=lessonId?caseList.filter(item=>item.lessonId===lessonId):caseList;
  const [id,setId]=useState(list[0]?.id??'');
  const [round,setRound]=useState(0);
  const [dirty,setDirty]=useState(false);
  const [busy,setBusy]=useState(false);
  const index=list.findIndex(item=>item.id===id);
  function reportDirty(value:boolean) {setDirty(value);onDirty(value);}
  function choose(next:string, repeat=false) {
    if(busy)return;
    if(dirty&&!window.confirm('Tu respuesta aún no está registrada. ¿Salir de este ejercicio y descartarla?'))return;
    reportDirty(false);setId(next);if(repeat)setRound(value=>value+1);
  }
  if(!list.length)return <section className="a2-panel"><h1>No hay casos para este tema</h1><p>Regresa a la ruta para elegir una lección con laboratorio.</p></section>;
  return <>
    <header className="a2-heading"><span className="a2-overline">LABORATORIO DE DECISIONES · PRÁCTICA GUIADA</span><h1>Observa los datos.<br/>Explica tu decisión.</h1><p>No tienes que adivinar qué hará el precio. Debes comprobar si la regla del ejercicio se cumple en el último punto visible.</p></header>
    <section className="a2-lab-start" aria-label="Cómo desarrollar los ejercicios">
      <h2>Antes de empezar</h2><p><strong>Son {caseList.length} casos sintéticos de lectura y decisión.</strong> Cada punto P1, P2… representa un cierre, en orden. No hay un activo real ni una temporalidad que debas buscar. Los datos adicionales del enunciado también forman parte del ejercicio.</p>
      <ol className="a2-lab-process"><li><strong>Lee el objetivo</strong><span>Identifica qué debes comprobar.</span></li><li><strong>Ubica las referencias</strong><span>Compara niveles y puntos numerados.</span></li><li><strong>Elige una acción</strong><span>Entrada, espera o descarte de este plan.</span></li><li><strong>Justifica y registra</strong><span>Después podrás revelar el resultado.</span></li></ol>
      <details><summary>Ver un ejemplo resuelto antes de intentarlo</summary><p><strong>Ejemplo independiente:</strong> el máximo previo es 50 y la regla exige un cierre superior a 50 después del retroceso. Los cierres posteriores son 47 y 49; no hay una condición de cancelación cumplida.</p><ol><li>Observación: ambos cierres siguen por debajo de 50.</li><li>Comparación: la confirmación todavía no ocurrió; la idea sigue abierta.</li><li>Decisión: esperar. No significa afirmar que el precio subirá.</li><li>Qué cambiaría la lectura: un cierre superior a 50 obligaría a revisar la oportunidad y su riesgo.</li></ol><p>Descartar sería diferente: por ejemplo, si la regla cancelara el plan al cerrar bajo 45 y ese cierre ya hubiera ocurrido. Una condición cancelada no se trata como una confirmación simplemente pendiente.</p></details>
    </section>
    <div className="a2-case-navigation"><label className="a2-case-select">Ejercicio {index+1} de {list.length}<select disabled={busy} value={id} onChange={event=>choose(event.target.value)}>{list.map((item,i)=><option key={item.id} value={item.id}>{i+1}. {item.title}</option>)}</select></label><div className="a2-actions"><button disabled={busy||index<=0} onClick={()=>choose(list[index-1].id)}>← Anterior</button><button disabled={busy||index>=list.length-1} onClick={()=>choose(list[index+1].id)}>Siguiente →</button></div></div>
    <CaseLoader key={`${id}:${round}`} id={id} onDirty={reportDirty} onBusy={setBusy} onAttempt={onAttempt} onStudy={onStudy} onRepeat={()=>choose(id,true)}/>
  </>;
}

type SessionCallbacks={onDirty:(value:boolean)=>void;onBusy:(value:boolean)=>void;onAttempt:()=>void;onStudy:(id:string)=>void;onRepeat:()=>void};
function CaseLoader({id,...callbacks}:{id:string}&SessionCallbacks) {
  const [item,setItem]=useState<PublicCase|null>(null);
  const [error,setError]=useState('');
  const [reload,setReload]=useState(0);
  useEffect(()=>{
    const controller=new AbortController();
    fetch(`/api/learning?case=${encodeURIComponent(id)}`,{signal:controller.signal,cache:'no-store'})
      .then(async response=>{if(!response.ok)throw new Error('No se pudo cargar el enunciado.');return response.json() as Promise<PublicCase>;})
      .then(data=>{if(!controller.signal.aborted){setItem(data);setError('');}})
      .catch(error=>{if(!controller.signal.aborted)setError(error.message);});
    return()=>controller.abort();
  },[id,reload]);
  if(error)return <div className="a2-alert" role="alert">{error} <button onClick={()=>{setError('');setReload(value=>value+1);}}>Volver a cargar</button></div>;
  if(!item)return <p role="status">Cargando instrucciones y referencias…</p>;
  return <CaseSession item={item} {...callbacks}/>;
}

function CaseSession({item,onDirty,onBusy,onAttempt,onStudy,onRepeat}:{item:PublicCase}&SessionCallbacks) {
  const [draft,setDraft]=useState<LabDraft>({decision:'',reason:-1,observation:'',comparison:'',alternative:'',stop:'',target:'',budget:'100'});
  const [result,setResult]=useState<Result|null>(null);
  const [revealed,setRevealed]=useState(0);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [tried,setTried]=useState(false);
  const attempt=useRef('');
  const mounted=useRef(true);
  const resultRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;};},[]);
  const future=useMemo(()=>result?.future.slice(0,revealed)??[],[result,revealed]);
  const preview=riskPreview(item,draft);
  const issues=submissionIssues(item,draft);
  function change<K extends keyof LabDraft>(key:K,value:LabDraft[K]) {setDraft(current=>({...current,[key]:value}));onDirty(true);setError('');}
  async function submit(event:React.FormEvent) {
    event.preventDefault();setTried(true);if(issues.length||busy||result)return;
    setBusy(true);onBusy(true);setError('');
    // A failed request retains its ID so retrying cannot create a second attempt.
    attempt.current ||= crypto.randomUUID();
    try {
      const payload=await learningRequest({action:'case',caseId:item.id,attemptId:attempt.current,decision:draft.decision,reason:draft.reason,reasoning:composeReasoning(draft),stop:draft.stop?Number(draft.stop):undefined,target:draft.target?Number(draft.target):undefined,budget:Number(draft.budget)});
      if(mounted.current){setResult(payload as unknown as Result);onDirty(false);}
      onAttempt();
    }catch(error){if(mounted.current)setError((error as Error).message);}
    finally{if(mounted.current)setBusy(false);onBusy(false);}
  }
  useEffect(()=>{if(result)resultRef.current?.focus();},[result]);
  return <div className="a2-guided-case">
    <section className="a2-panel a2-case-brief"><span className="a2-overline">1 · COMPRENDE EL ENCARGO</span><h2>{item.title}</h2><p className="a2-case-objective"><strong>Tu tarea:</strong> {item.guide.objective}</p><div className="a2-case-facts"><span>Idea que se analiza: <strong>{item.guide.idea}</strong></span><span>Momento de decisión: <strong>P{item.closes.length} = {item.closes.at(-1)}</strong></span></div><p>{item.context}</p><div className="a2-rule"><strong>Regla que debes comprobar</strong><p>{item.rule}</p></div><div className="a2-given"><strong>Datos aportados y límites del gráfico</strong><p>{item.guide.given}</p></div><button onClick={()=>onStudy(item.lessonId)}>Repasar la lección de este ejercicio →</button></section>
    <div className="a2-guided-grid">
      <section className="a2-panel a2-observation-panel"><span className="a2-overline">2 · OBSERVA Y COMPARA</span><h2>Lee de izquierda a derecha</h2><LabChart prefix={item.closes} future={future} guide={item.guide}/><h3>Desarrolla el ejercicio en este orden</h3><ol className="a2-case-steps">{item.guide.steps.map(step=><li key={step}>{step}</li>)}</ol>{!result&&<p className="a2-lab-disclaimer">El futuro permanece oculto. No necesitas acertar el movimiento siguiente para justificar una buena decisión.</p>}{result&&<div className="a2-reveal-controls"><p>Respuesta registrada. Descubre la continuación sin cambiar tu decisión inicial.</p><button disabled={revealed>=result.future.length} onClick={()=>setRevealed(value=>value+1)}>Revelar siguiente cierre →</button><p role="status">{revealed} de {result.future.length} cierres posteriores revelados</p>{revealed===result.future.length&&<div className="a2-example"><h3>Qué ocurrió después</h3><p>{result.outcome}</p><small>La línea no reproduce ejecuciones intravela ni garantiza un precio de llenado.</small></div>}</div>}</section>
      <form className="a2-panel a2-lab-answer" noValidate onSubmit={submit}>
        <span className="a2-overline">3 · DECIDE CON LA INFORMACIÓN DISPONIBLE</span><h2>¿Qué harías ahora?</h2>
        <fieldset disabled={busy||Boolean(result)}><legend>Elige una acción para este plan</legend>{decisionOptions.map(option=><label className="a2-decision-option" key={option.value}><input type="radio" name="case-decision" checked={draft.decision===option.value} onChange={()=>change('decision',option.value)}/><span><strong>{option.label}</strong><small>{option.description}</small></span></label>)}</fieldset>
        <fieldset disabled={busy||Boolean(result)}><legend>Elige el fundamento que mejor justifica tu decisión</legend>{item.reasons.map((reason,index)=><label key={reason}><input type="radio" name="case-reason" checked={draft.reason===index} onChange={()=>change('reason',index)}/>{reason}</label>)}</fieldset>
        {draft.decision==='ejecutar'&&(item.risk?<fieldset disabled={busy||Boolean(result)} className="a2-risk-work"><legend>Completa el plan de entrada simulado</legend><p>Entrada fija: <strong>{item.closes.at(-1)}</strong> · dirección: <strong>{item.risk.side}</strong>. Todos los precios están en unidades didácticas. Valor por punto y unidad: 1.</p><p>Stop permitido: {item.risk.stopMin}–{item.risk.stopMax}. Objetivo {item.risk.side==='Largo'?'no mayor':'no menor'} que {item.risk.targetBoundary}. Costo total de ida y vuelta: {item.cost} por unidad.</p><div className="a2-form-grid"><label>Precio de stop<input type="number" step="any" value={draft.stop} onChange={e=>change('stop',e.target.value)} placeholder="Escribe un precio, no una distancia"/></label><label>Precio objetivo<input type="number" step="any" value={draft.target} onChange={e=>change('target',e.target.value)}/></label><label>Presupuesto de pérdida simulado<input type="number" step="any" value={draft.budget} onChange={e=>change('budget',e.target.value)}/><small>Mayor que 0 y hasta 10000. No es tu saldo ni el tamaño de posición.</small></label></div><details><summary>Cómo se calcula el riesgo neto</summary><p>{item.risk.side==='Largo'?'Pérdida por unidad = entrada − stop + costo. Beneficio por unidad = objetivo − entrada − costo.':'Pérdida por unidad = stop − entrada + costo. Beneficio por unidad = entrada − objetivo − costo.'}</p><p>R/R neto = beneficio / pérdida. Tamaño teórico = presupuesto / pérdida. No se redondea a contratos reales porque no hay un instrumento real definido.</p></details>{preview?<div className="a2-risk-preview" role="status"><p>Pérdida por unidad: <strong>{preview.loss.toFixed(2)}</strong> · beneficio neto por unidad: <strong>{preview.profit.toFixed(2)}</strong></p><p>R/R neto: <strong>{preview.rr.toFixed(2)}</strong> (regla: mínimo {item.minimumRr}) · tamaño teórico: <strong>{preview.size.toFixed(2)}</strong></p><small>Este cálculo no comprueba por sí solo la señal. La corrección completa se obtiene al registrar.</small></div>:<p>Completa los tres campos con precios coherentes para ver el cálculo.</p>}</fieldset>:<p className="a2-lab-disclaimer">Este ejercicio comprueba una condición o un plan ya indicado en el enunciado. No pide introducir otro stop u objetivo. Puedes registrar esta elección y revisar si la regla la permite.</p>)}
        <fieldset disabled={busy||Boolean(result)} className="a2-reasoning-fields"><legend>4 · Explica tu razonamiento en tres frases</legend><p>No hay una redacción secreta que debas adivinar. Cita los datos y relaciónalos con la regla.</p>{([['observation','A. Qué observas'],['comparison','B. Cómo se compara con la regla'],['alternative','C. Qué haría cambiar tu lectura']] as const).map(([key,label],index)=><label key={key} htmlFor={`lab-${key}`}><strong>{label}</strong><span>{item.guide.prompts[index]}</span><textarea id={`lab-${key}`} rows={3} maxLength={2500} value={draft[key]} onChange={e=>change(key,e.target.value)} placeholder={['Cita un punto o un dato del escenario y su valor.','Explica qué condición se cumple, falta o se incumplió.','Indica otro evento observable o los datos que necesitarías.'][index]}/><small>Una frase breve; mínimo 12 caracteres. Este texto se conserva, pero no recibe una nota automática.</small></label>)}</fieldset>
        {!result&&<><button type="submit" className="a2-primary" disabled={busy}>{busy?'Registrando…':'Registrar respuesta y ver corrección'}</button><p className="a2-lab-disclaimer">El guardado ocurre al pulsar este botón, no mientras escribes. La corrección considera decisión (40), fundamento (30) y coherencia de riesgo (30).</p></>}
        {tried&&issues.length>0&&!result&&<div role="alert" className="a2-warning"><strong>Antes de registrar, completa lo siguiente:</strong><ul>{issues.map(issue=><li key={issue}>{issue}</li>)}</ul></div>}
        {error&&<p role="alert" className="a2-warning">{error} Tu respuesta sigue en los campos; puedes reintentar.</p>}
        {result&&<div className="a2-feedback" ref={resultRef} tabIndex={-1}><span className="a2-overline">RESPUESTA GUARDADA · CORRECCIÓN</span><h2>{result.score}/100</h2><p>{result.explanation}</p><ul><li>Decisión: {result.decisionCorrect?'40/40':'0/40'}.</li><li>Fundamento: {result.reasonCorrect?'30/30':'0/30'}.</li><li>Coherencia de riesgo: {result.decisionCorrect&&result.planValid?'30/30':'0/30'}.</li></ul><p>{result.riskFeedback??'Compara tu plan con los límites escritos en el enunciado.'}</p><p>Tu razonamiento abierto se conserva para autoevaluación o revisión docente. Esta puntuación no acredita capacidad de operar.</p><div className="a2-actions"><button type="button" onClick={onRepeat}>Repetir ejercicio</button><button type="button" onClick={()=>onStudy(item.lessonId)}>Repasar el concepto</button></div><p>Ahora puedes revelar los cierres posteriores en el gráfico.</p></div>}
      </form>
    </div>
  </div>;
}
