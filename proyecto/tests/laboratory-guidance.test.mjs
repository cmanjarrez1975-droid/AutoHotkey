import assert from 'node:assert/strict';
import test from 'node:test';
import { cases, publicCase, evaluateCase } from '../app/learning/cases.ts';
import { caseGuides } from '../app/learning/case-guides.ts';
import { chartDomain, composeReasoning, decisionOptions, riskPreview, submissionIssues } from '../app/learning/lab-model.ts';

const validDraft={decision:'esperar',reason:0,observation:'El último cierre se mantiene bajo la referencia.',comparison:'La regla requiere un cierre superior a ese nivel.',alternative:'Revisaría la oportunidad después de superar el nivel.',stop:'',target:'',budget:'100'};

test('los 20 casos tienen instrucciones propias, tres preguntas y referencias válidas al corte',()=>{
  assert.deepEqual(Object.keys(caseGuides).sort(),cases.map(item=>item.id).sort());
  assert.equal(new Set(Object.values(caseGuides).map(guide=>guide.objective)).size,20);
  for(const item of cases){
    const guide=publicCase(item).guide;
    assert.equal(guide.steps.length,3);assert.equal(guide.prompts.length,3);
    assert.ok(guide.objective.length>40);assert.ok(guide.given.length>60);
    assert.ok(guide.steps.every(step=>step.trim().length>0));assert.ok(guide.prompts.every(prompt=>prompt.trim().length>0));
    assert.equal(new Set(guide.steps).size,3);assert.equal(new Set(guide.prompts).size,3);
    for(const ref of guide.references){assert.ok(Number.isFinite(ref.low));if(ref.high!==undefined)assert.ok(ref.high>=ref.low);}
    for(const anchor of guide.anchors){assert.ok(Number.isInteger(anchor.point));assert.ok(anchor.point>=1&&anchor.point<=item.closes.length,`${item.id}: no anclar al futuro`);}
    assert.ok(guide.anchors.length>0);
  }
});

test('W, M y bloques remiten a eventos posteriores al segundo intento o a la visita',()=>{
  const expected={
    'estructura-candidata':[[4,112],[6,106]],
    'w2-incompleta':[[3,100],[5,105],[7,99]],
    'w2-confirmada':[[3,100],[4,104],[6,99],[8,105]],
    'm3-pendiente':[[3,120],[5,114],[7,118]],
    'm2-confirmada':[[3,120],[5,115],[7,121],[9,114]],
    'ob-primera-visita':[[2,102],[4,114],[7,102]],
  };
  for(const [id,points] of Object.entries(expected)){
    const item=cases.find(item=>item.id===id);
    for(const [point,value] of points){assert.equal(item.closes[point-1],value);assert.ok(caseGuides[id].anchors.some(anchor=>anchor.point===point));}
  }
  assert.match(caseGuides['w2-incompleta'].steps.join(' '),/P8 y P9/);
  assert.match(caseGuides['ob-primera-visita'].given,/no cuentan como recuperación posterior/);
});

test('los ejercicios que dependen de OHLC o indicadores declaran los datos que no muestra la línea',()=>{
  assert.match(caseGuides['poker-centro'].given,/NO contiene apertura, máximos ni mínimos/);
  assert.match(caseGuides['ema-rango'].given,/No puedes recalcular/);
  assert.match(caseGuides['ema-contacto'].given,/no simulan la trayectoria histórica/);
  assert.match(caseGuides['donchian-compresion'].given,/No se pide calcular Donchian/);
  assert.match(caseGuides['zona-sin-toque'].given,/no debes inventar una mecha/);
});

test('el gráfico conserva posiciones horizontales y nunca obtiene escala del futuro oculto',()=>{
  for(const item of cases){
    const before=publicCase(item);
    const alternate=publicCase({...item,future:[1e9,-1e9]});
    assert.deepEqual(before,alternate);
    const initial=chartDomain(before.closes,before.guide.references,before.closes.length);
    const revealed=chartDomain([...before.closes,item.future[0]],before.guide.references,before.closes.length);
    assert.equal(initial.slots,revealed.slots);
    assert.ok(initial.min<=Math.min(...before.closes));assert.ok(initial.max>=Math.max(...before.closes));
    assert.ok(revealed.min<=item.future[0]&&revealed.max>=item.future[0]);
    assert.ok(initial.max<1e9);
  }
});

test('el formulario publica los límites ya escritos y su cálculo coincide con el servidor',()=>{
  let plans=0;
  for(const item of cases){
    const visible=publicCase(item);
    if(!item.stopRange){assert.equal(visible.risk,null);continue;}
    plans++;
    assert.deepEqual(visible.risk,{side:item.direction,stopMin:item.stopRange[0],stopMax:item.stopRange[1],targetBoundary:item.targetLimit});
    const stop=item.direction==='Largo'?item.stopRange[1]:item.stopRange[0];
    const draft={...validDraft,decision:'ejecutar',reason:item.correctReason,stop:String(stop),target:String(item.targetLimit)};
    const preview=riskPreview(visible,draft);
    const graded=evaluateCase(item,{decision:'ejecutar',reason:item.correctReason,stop,target:item.targetLimit,budget:100});
    assert.equal(preview.rr,graded.rr);assert.equal(preview.size,graded.size);assert.equal(graded.score,100);
    assert.deepEqual(submissionIssues(visible,draft),[]);
  }
  assert.equal(plans,3);
});

test('la guía de respuesta explica lo que falta y no bloquea una decisión completa por ser incorrecta',()=>{
  const item=publicCase(cases[0]);
  const missing=submissionIssues(item,{...validDraft,decision:'',reason:-1,observation:'',comparison:'',alternative:''});
  assert.equal(missing.length,5);assert.ok(missing.some(issue=>issue.includes('Observación')));assert.ok(missing.some(issue=>issue.includes('Comparación')));
  assert.deepEqual(submissionIssues(item,{...validDraft,decision:'descartar',reason:2}),[]);
  assert.deepEqual(submissionIssues(item,{...validDraft,decision:'ejecutar'}),[]);
  const text=composeReasoning(validDraft);assert.match(text,/Observación:/);assert.match(text,/Comparación con la regla:/);assert.match(text,/Qué haría cambiar mi lectura:/);assert.ok(text.length<10000);
  assert.equal(decisionOptions.length,3);assert.ok(decisionOptions.every(option=>option.description.length>50));
});

test('la entrada exige datos numéricos coherentes; esperar no exige un stop',()=>{
  const item=publicCase(cases.find(item=>item.id==='estructura-ruptura'));
  for(const change of [{stop:''},{target:''},{budget:'0'},{budget:'10001'},{stop:'NaN'},{stop:'114'},{target:'112'}]){
    const draft={...validDraft,decision:'ejecutar',stop:'106',target:'130',...change};
    assert.ok(submissionIssues(item,draft).some(issue=>issue.includes('Completa stop')));
  }
  assert.deepEqual(submissionIssues(item,{...validDraft,decision:'esperar',stop:'',target:'',budget:''}),[]);
});

test('las ayudas públicas no incluyen solución, nota ni continuación',()=>{
  function inspect(value){if(!value||typeof value!=='object')return;for(const [key,child] of Object.entries(value)){assert.ok(!['future','correctReason','decision','expectedDecision','explanation','score','outcome'].includes(key),`campo privado: ${key}`);inspect(child);}}
  for(const item of cases)inspect(publicCase(item));
});

test('la corrección distingue ausencia de plan, geometría inválida y cálculo válido',()=>{
  const wait=evaluateCase(cases[0],{decision:'esperar',reason:0});assert.match(wait.riskFeedback,/Sin entrada/);
  const invalid=evaluateCase(cases[0],{decision:'ejecutar',reason:0});assert.match(invalid.riskFeedback,/no ofrece un plan/);
  const item=cases.find(item=>item.id==='estructura-ruptura');
  assert.match(evaluateCase(item,{decision:'ejecutar',reason:0,stop:112,target:130,budget:100}).riskFeedback,/stop entre 105 y 106/);
  assert.match(evaluateCase(item,{decision:'ejecutar',reason:0,stop:106,target:130,budget:100}).riskFeedback,/cumplen los límites/);
});
