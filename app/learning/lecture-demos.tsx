'use client';

import { useEffect, useRef, useState } from 'react';
import { candleAnatomy, candleAtStep, candlePaths, clockStepCount, structureAtStep, structureStepCount, summarizePrices } from './lecture-model';
import type { CandlePrices } from './lecture-model';
import type { LectureFigure } from './lecture-types';

// Only the currently revealed prefix is passed to this chart, including its scale.
function PricePath({ prices, reference }: { prices: readonly number[]; reference?: number | null }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    function draw() {
      if (!canvas) return;
      const width = canvas.clientWidth;
      if (width < 100) return;
      const height = 220, dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr; canvas.height = height * dpr;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      const values = reference == null ? [...prices] : [...prices, reference];
      const low = Math.min(...values), high = Math.max(...values), pad = Math.max((high - low) * 0.18, 1);
      const min = low - pad, max = high + pad;
      const left = 42, right = width - 22, top = 27, bottom = 179;
      const x = (index: number) => prices.length === 1 ? (left + right) / 2 : left + index * (right - left) / (prices.length - 1);
      const y = (price: number) => bottom - (price - min) / (max - min) * (bottom - top);
      ctx.font = '11px system-ui'; ctx.fillStyle = '#a4b4c8'; ctx.fillText('Precio', 3, 13);
      for (let i = 0; i < 3; i++) {
        const value = min + (max - min) * i / 2;
        ctx.strokeStyle = '#26364a'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(left, y(value)); ctx.lineTo(right, y(value)); ctx.stroke();
        ctx.fillStyle = '#a4b4c8'; ctx.textAlign = 'left'; ctx.fillText(value.toFixed(0), 3, y(value) + 4);
      }
      if (reference != null) {
        ctx.strokeStyle = '#f5c47a'; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(left, y(reference)); ctx.lineTo(right, y(reference)); ctx.stroke(); ctx.setLineDash([]);
      }
      ctx.strokeStyle = '#63dec1'; ctx.lineWidth = 2.5; ctx.beginPath();
      prices.forEach((price, index) => { if (!index) ctx.moveTo(x(index), y(price)); else ctx.lineTo(x(index), y(price)); });
      ctx.stroke();
      prices.forEach((price, index) => {
        ctx.fillStyle = '#63dec1'; ctx.beginPath(); ctx.arc(x(index), y(price), 4, 0, Math.PI * 2); ctx.fill();
        ctx.textAlign = 'center'; ctx.fillStyle = '#eaf0f8'; ctx.fillText(String(price), x(index), y(price) - 10);
        ctx.fillStyle = '#a4b4c8'; ctx.fillText(`P${index + 1}`, x(index), 199);
      });
    }
    draw(); const observer = new ResizeObserver(draw); observer.observe(canvas);
    return () => observer.disconnect();
  }, [prices, reference]);
  return <>
    <canvas ref={ref} className="a2-lecture-chart" role="img" aria-label={`Secuencia de precios, no velas: ${prices.join(' → ')}.${reference == null ? '' : ` Referencia horizontal: ${reference}.`}`} />
    <p className="a2-demo-data">Orden de los datos → <strong>{prices.join(' → ')}</strong></p>
  </>;
}

function CandleDrawing({ candle, closed = true }: { candle: CandlePrices; closed?: boolean }) {
  const anatomy = candleAnatomy(candle);
  const pad = Math.max(anatomy.range * 0.18, 1), extent = anatomy.range + pad * 2;
  const top = (price: number) => (candle.high + pad - price) / extent * 100;
  const color = anatomy.direction === 'bajista' ? '#f19cae' : anatomy.direction === 'alcista' ? '#63dec1' : '#c6d5e5';
  return <div className="a2-candle-layout">
    <div className="a2-candle-drawing" role="img" aria-label={`Vela ${closed ? 'cerrada' : 'provisional'} ${anatomy.direction}. Cuerpo de ${anatomy.bodyLow} a ${anatomy.bodyHigh}; mecha inferior ${anatomy.lowerWick}; superior ${anatomy.upperWick}.`}>
      <span className="a2-candle-wick" style={{ top: `${top(candle.high)}%`, height: `${anatomy.range / extent * 100}%`, background: color }} />
      <span className="a2-candle-body" style={{ top: `${top(anatomy.bodyHigh)}%`, height: `${anatomy.body / extent * 100}%`, background: color }} />
      <span className="a2-candle-high">H {candle.high}</span><span className="a2-candle-low">L {candle.low}</span>
    </div>
    <dl className="a2-candle-values">
      <div><dt>O · Apertura</dt><dd>{candle.open}</dd></div>
      <div><dt>H · Máximo{closed ? '' : ' hasta ahora'}</dt><dd>{candle.high}</dd></div>
      <div><dt>L · Mínimo{closed ? '' : ' hasta ahora'}</dt><dd>{candle.low}</dd></div>
      <div><dt>{closed ? 'C · Cierre definitivo' : 'Último precio · no es cierre'}</dt><dd>{candle.close}</dd></div>
      <div><dt>Cuerpo · altura</dt><dd>{anatomy.body}</dd></div>
      <div><dt>Mechas · inferior / superior</dt><dd>{anatomy.lowerWick} / {anatomy.upperWick}</dd></div>
    </dl>
  </div>;
}

function StepControls({ step, count, onStep }: { step: number; count: number; onStep: (step: number) => void }) {
  return <div className="a2-actions a2-demo-controls">
    <button type="button" disabled={step === 0} onClick={() => onStep(step - 1)}>← Dato anterior</button>
    <button type="button" className="a2-primary" disabled={step === count - 1} onClick={() => onStep(step + 1)}>Siguiente dato →</button>
    <button type="button" disabled={step === 0} onClick={() => onStep(0)}>Reiniciar demostración</button>
    <small>Paso {step + 1} de {count} · no modifica tu progreso</small>
  </div>;
}

function CandlePaths() {
  const [selected, setSelected] = useState(0);
  const path = candlePaths[selected];
  return <div className="a2-lecture-demo">
    <h3>Dos recorridos, una vela</h3>
    <p>Selecciona un recorrido y compara el orden de los extremos. Los puntos no representan intervalos de tiempo iguales.</p>
    <div className="a2-actions" role="group" aria-label="Recorrido intravela">{candlePaths.map((item, index) => <button type="button" key={item.label} aria-pressed={index === selected} onClick={() => setSelected(index)}>{item.label}</button>)}</div>
    <PricePath prices={path.prices} />
    <CandleDrawing candle={summarizePrices(path.prices)} />
    <p role="status">{path.label}: cambia el camino, pero se conservan O = 100, H = 108, L = 97 y C = 104.</p>
  </div>;
}

function CandleClock() {
  const [step, setStep] = useState(0);
  const current = candleAtStep(step);
  return <div className="a2-lecture-demo">
    <h3>Construye una vela de 15 minutos</h3>
    <p>Ejemplo distinto al anterior · datos sintéticos · sin reproducción automática</p>
    <div className="a2-demo-state" aria-live="polite" aria-atomic="true"><strong>Minuto {current.minute} de 15 · {current.closed ? 'Vela cerrada' : 'Vela en formación'}</strong><p>{current.explanation}</p></div>
    <CandleDrawing candle={current.candle} closed={current.closed} />
    <p className="a2-demo-data">Precios conocidos: <strong>{current.prices.join(' → ')}</strong></p>
    <StepControls step={step} count={clockStepCount} onStep={setStep} />
  </div>;
}

function StructureSequence() {
  const [step, setStep] = useState(0);
  const current = structureAtStep(step);
  return <div className="a2-lecture-demo">
    <h3>¿Qué puedes afirmar en este momento?</h3>
    <p>Demostración guiada, no evaluación. Cada punto es un precio observado; no representa una vela OHLC. La escala se adapta solo a los datos revelados.</p>
    <PricePath prices={current.prices} reference={current.reference} />
    <div className="a2-demo-state" aria-live="polite" aria-atomic="true"><strong>{current.status}</strong><p>{current.explanation}</p></div>
    <dl className="a2-candle-values">
      <div><dt>Referencia horizontal · dorado</dt><dd>{current.reference ?? 'Aún no disponible'}</dd></div>
      <div><dt>Mínimo en estudio</dt><dd>{current.candidate ?? 'Aún no disponible'}</dd></div>
    </dl>
    <StepControls step={step} count={structureStepCount} onStep={setStep} />
  </div>;
}

export function LectureDemo({ kind }: { kind: LectureFigure }) {
  if (kind === 'candle-paths') return <CandlePaths />;
  if (kind === 'candle-clock') return <CandleClock />;
  return <StructureSequence />;
}
