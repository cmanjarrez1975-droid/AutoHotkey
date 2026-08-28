'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { CaseGuide } from './case-guides';
import { chartDomain } from './lab-model';

const referenceColors = ['#8daaff','#f5c47a','#c49cfa','#f19cae'];

export function LabChart({prefix, future, guide}: {prefix:number[]; future:number[]; guide:CaseGuide}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prices = useMemo(()=>[...prefix,...future],[prefix,future]);
  useEffect(()=>{
    const canvas=canvasRef.current;
    if (!canvas) return;
    const draw=()=>{
      const width=canvas.clientWidth;
      if (width<100) return;
      const height=360, left=46, right=15, top=32, bottom=304;
      const dpr=window.devicePixelRatio||1;
      canvas.width=width*dpr; canvas.height=height*dpr;
      const ctx=canvas.getContext('2d'); if (!ctx) return;
      ctx.scale(dpr,dpr); ctx.clearRect(0,0,width,height);
      const domain=chartDomain(prices,guide.references,prefix.length);
      const x=(index:number)=>left+index*(width-left-right)/(domain.slots-1);
      const y=(value:number)=>bottom-(value-domain.min)*(bottom-top)/(domain.max-domain.min);
      const cutX=x(prefix.length-1);
      ctx.fillStyle='#182333';ctx.fillRect(cutX,top,width-right-cutX,bottom-top);
      ctx.font='11px sans-serif';ctx.fillStyle='#a4b4c8';ctx.fillText('Precio',5,16);
      for(let i=0;i<=4;i++) {
        const value=domain.min+i*(domain.max-domain.min)/4;
        ctx.strokeStyle='#28384a';ctx.lineWidth=1;ctx.setLineDash([]);ctx.beginPath();ctx.moveTo(left,y(value));ctx.lineTo(width-right,y(value));ctx.stroke();
        ctx.fillStyle='#a4b4c8';ctx.fillText(value.toFixed(1),2,y(value)+4);
      }
      guide.references.forEach((reference,index)=>{
        const color=referenceColors[index%referenceColors.length];
        if(reference.high!==undefined) {
          ctx.fillStyle=`${color}22`;ctx.fillRect(left,y(reference.high),width-left-right,y(reference.low)-y(reference.high));
        }
        ctx.strokeStyle=color;ctx.lineWidth=1;ctx.setLineDash([5,4]);
        for(const value of new Set([reference.low,reference.high??reference.low])) {
          ctx.beginPath();ctx.moveTo(left,y(value));ctx.lineTo(width-right,y(value));ctx.stroke();
        }
      });
      ctx.setLineDash([3,3]);ctx.strokeStyle='#d6e5ed';ctx.beginPath();ctx.moveTo(cutX,top);ctx.lineTo(cutX,bottom);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='#c4d3e0';ctx.textAlign='right';ctx.fillText(`Decisión: P${prefix.length}`,cutX,20);
      ctx.textAlign='left';ctx.fillStyle='#8195ab';ctx.fillText('Después',cutX+10,20);
      for(let i=1;i<prices.length;i++) {
        ctx.strokeStyle=i>=prefix.length?'#f5c47a':'#63dec1';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(x(i-1),y(prices[i-1]));ctx.lineTo(x(i),y(prices[i]));ctx.stroke();
      }
      prices.forEach((price,index)=>{
        ctx.fillStyle=index>=prefix.length?'#f5c47a':'#63dec1';ctx.beginPath();ctx.arc(x(index),y(price),index===prefix.length-1?5:3,0,Math.PI*2);ctx.fill();
        ctx.textAlign='center';ctx.fillStyle='#bbcbdb';ctx.fillText(`P${index+1}`,x(index),bottom+19);
      });
      ctx.textAlign='left';ctx.fillStyle='#a4b4c8';ctx.fillText('Orden de los cierres →',left,350);
    };
    draw(); const observer=new ResizeObserver(draw);observer.observe(canvas);
    return()=>observer.disconnect();
  },[prices,prefix.length,guide.references]);

  return <figure className="a2-lab-figure">
    <canvas ref={canvasRef} className="a2-replay-chart" role="img" aria-label={`Gráfico de cierres. Decisión en P${prefix.length}. Datos disponibles: ${prices.map((price,index)=>`P${index+1}: ${price}`).join(', ')}. Niveles y valores en las listas siguientes.`}/>
    <figcaption>Verde: información al decidir. Dorado: cierres revelados después. <strong>Una línea de cierres no muestra cuerpos, mechas ni movimientos dentro de una vela.</strong></figcaption>
    {guide.references.length>0&&<ul className="a2-reference-list" aria-label="Referencias del gráfico">{guide.references.map((reference,index)=><li key={reference.label}><span className="a2-reference-swatch" style={{background:referenceColors[index%referenceColors.length]}}/><span>{reference.label}: <strong>{reference.low}{reference.high!==undefined?`–${reference.high}`:''}</strong></span></li>)}</ul>}
    <div className="a2-price-grid" aria-label="Valores exactos de los cierres">{prices.map((price,index)=><div key={index} className={index>=prefix.length?'revealed':index===prefix.length-1?'at-cut':''}><span>P{index+1}{index===prefix.length-1?' · ahora':''}</span><strong>{price}</strong></div>)}</div>
    <details className="a2-anchor-list"><summary>Localizar los puntos del enunciado</summary><ul>{guide.anchors.map(anchor=><li key={`${anchor.point}-${anchor.label}`}><strong>P{anchor.point}</strong>: {anchor.label}</li>)}</ul></details>
  </figure>;
}
