export type RiskInput={entry:number;stop:number;target:number;account:number;riskPercent:number;pointValue:number;cost:number;lotStep:number;direction:'Largo'|'Corto'};
export function netRisk(input:RiskInput){
  const {entry,stop,target,account,riskPercent,pointValue,cost,lotStep,direction}=input;
  if(![entry,stop,target,account,riskPercent,pointValue,lotStep].every(n=>Number.isFinite(n)&&n>0)||!Number.isFinite(cost)||cost<0||riskPercent>100||!['Largo','Corto'].includes(direction))return{valid:false,reason:'Revisa valores positivos, costo no negativo y riesgo entre 0 y 100%.',size:0,rr:0,risk:0,budget:0};
  const distance=direction==='Largo'?entry-stop:stop-entry;
  const reward=direction==='Largo'?target-entry:entry-target;
  if(distance<=0||reward<=0)return{valid:false,reason:'Entrada, stop y objetivo no corresponden a la dirección.',size:0,rr:0,risk:0,budget:0};
  const unitLoss=distance*pointValue+cost;const unitReward=reward*pointValue-cost;
  const budget=account*riskPercent/100;const size=Math.floor(budget/unitLoss/lotStep)*lotStep;
  if(![unitLoss,unitReward,budget,size].every(Number.isFinite))return{valid:false,reason:'Los valores exceden el rango de cálculo.',size:0,rr:0,risk:0,budget:0};
  return{valid:size>0&&unitReward>0,reason:size===0?'El tamaño mínimo excede el presupuesto.':unitReward<=0?'Los costos consumen el beneficio potencial.':'Modelo lineal, con redondeo hacia abajo. No incluye saltos de precio ni liquidación.',size,rr:unitReward/unitLoss,risk:size*unitLoss,budget};
}

export function averageTrueRange(candles:Array<{high:number;low:number;close:number}>,period:number){
  if(!Number.isInteger(period)||period<1||candles.length<period+1)return null;
  if(candles.some(c=>![c.high,c.low,c.close].every(Number.isFinite)||c.high<c.low||c.close<c.low||c.close>c.high))return null;
  const ranges=candles.slice(1).map((c,i)=>Math.max(c.high-c.low,Math.abs(c.high-candles[i].close),Math.abs(c.low-candles[i].close)));
  return ranges.slice(-period).reduce((sum,n)=>sum+n,0)/period;
}
