'use client';
import { useState } from 'react';
import { netRisk,type RiskInput } from './risk';
export function RiskCalculator(){
  const [form,setForm]=useState<RiskInput>({entry:100,stop:98,target:106,account:10000,riskPercent:1,pointValue:1,cost:0.2,lotStep:1,direction:'Largo'});
  const plan=netRisk(form);
  return <details className="a2-panel"><summary>Calculadora de riesgo neto y tamaño</summary><p>Ejemplo didáctico de instrumento lineal. Configura valor por punto, incremento y costo de ida y vuelta por unidad. No es una recomendación de riesgo.</p><div className="a2-form-grid">{([['entry','Entrada'],['stop','Stop'],['target','Objetivo'],['account','Capital de simulación'],['riskPercent','Riesgo presupuestado (%)'],['pointValue','Valor por punto'],['cost','Costo por unidad'],['lotStep','Incremento de tamaño']] as const).map(([key,label])=><label key={key}>{label}<input type="number" step="any" value={Number.isNaN(form[key])?'':form[key]} onChange={event=>setForm(current=>({...current,[key]:event.target.value===''?NaN:Number(event.target.value)}))}/></label>)}<label>Dirección<select value={form.direction} onChange={event=>setForm(current=>({...current,direction:event.target.value as RiskInput['direction']}))}><option>Largo</option><option>Corto</option></select></label></div><div className={plan.valid?'a2-success':'a2-warning'} role="status">{plan.reason}{plan.valid&&<p>Tamaño: {plan.size.toFixed(4)} · pérdida planificada: {plan.risk.toFixed(2)} / presupuesto {plan.budget.toFixed(2)} · R/R neto: {plan.rr.toFixed(2)}</p>}</div></details>;
}
