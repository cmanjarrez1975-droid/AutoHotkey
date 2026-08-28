import type { PublicCase, Decision } from './cases.ts';
import type { ChartReference } from './case-guides.ts';

export type LabDraft = {
  decision: Decision | ''; reason: number;
  observation: string; comparison: string; alternative: string;
  stop: string; target: string; budget: string;
};
export const decisionOptions = [
  {value:'ejecutar' as const, label:'Simular entrada ahora', description:'La condición de entrada ya ocurrió y el plan cumple las reglas. No envía órdenes reales.'},
  {value:'esperar' as const, label:'Esperar una condición', description:'La idea sigue abierta, pero falta un evento. Escribe qué necesitas ver.'},
  {value:'descartar' as const, label:'Descartar este plan', description:'Una regla ya se incumplió, el contexto no sirve o el riesgo no compensa. Otra oportunidad requerirá un plan nuevo.'},
];

export function riskPreview(item: PublicCase, draft: Pick<LabDraft,'stop'|'target'|'budget'>) {
  const entry = item.closes.at(-1)!;
  const stop = Number(draft.stop); const target = Number(draft.target); const budget = Number(draft.budget);
  if (!item.risk || !draft.stop.trim() || !draft.target.trim() || !draft.budget.trim() || ![stop,target,budget].every(Number.isFinite) || stop<=0 || target<=0 || budget<=0 || budget>10000) return null;
  const distance = item.risk.side === 'Largo' ? entry-stop : stop-entry;
  const reward = item.risk.side === 'Largo' ? target-entry : entry-target;
  if (distance<=0 || reward<=0) return null;
  const loss = distance+item.cost; const profit = reward-item.cost;
  return {entry, loss, profit, rr:profit/loss, size:budget/loss};
}

// Input completeness is not a grade. Poor but complete arguments may be submitted.
export function submissionIssues(item: PublicCase, draft: LabDraft): string[] {
  const issues: string[] = [];
  if (!decisionOptions.some(option=>option.value===draft.decision)) issues.push('Selecciona qué harías ahora.');
  if (!Number.isInteger(draft.reason) || draft.reason<0 || draft.reason>=item.reasons.length) issues.push('Selecciona el fundamento de tu decisión.');
  for (const [key,label] of [['observation','Observación'],['comparison','Comparación con la regla'],['alternative','Qué haría cambiar tu lectura']] as const) {
    if (draft[key].trim().length<12) issues.push(`${label}: escribe al menos 12 caracteres; puedes responder en una frase.`);
    if (draft[key].length>2500) issues.push(`${label}: máximo 2500 caracteres.`);
  }
  if (draft.decision==='ejecutar' && item.risk && !riskPreview(item,draft)) issues.push('Completa stop, objetivo y presupuesto: en largo, stop < entrada < objetivo; en corto, objetivo < entrada < stop. Presupuesto: mayor que 0 y hasta 10000.');
  return issues;
}

export function composeReasoning(draft: LabDraft) {
  return `Observación: ${draft.observation.trim()}\nComparación con la regla: ${draft.comparison.trim()}\nQué haría cambiar mi lectura: ${draft.alternative.trim()}`;
}

// The scale depends exclusively on reference values and currently revealed data.
// Reserve a fixed six slots in every case; no future length or value is required.
export function chartDomain(prices: number[], references: ChartReference[], prefixLength: number) {
  const values=[...prices,...references.flatMap(ref=>[ref.low,ref.high??ref.low])];
  const low=Math.min(...values); const high=Math.max(...values); const padding=Math.max(2,(high-low)*0.12);
  return { min:low-padding, max:high+padding, slots:Math.max(prefixLength+6,prices.length) };
}
