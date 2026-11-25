export type CandlePrices = { open: number; high: number; low: number; close: number };

export function summarizePrices(prices: readonly number[]): CandlePrices {
  if (!prices.length || prices.some(value => !Number.isFinite(value))) {
    throw new Error('La demostración requiere una secuencia de precios finitos.');
  }
  return { open: prices[0], high: Math.max(...prices), low: Math.min(...prices), close: prices[prices.length - 1] };
}

export function candleAnatomy(candle: CandlePrices) {
  const { open, high, low, close } = candle;
  if (![open, high, low, close].every(Number.isFinite) || low > Math.min(open, close) || high < Math.max(open, close)) {
    throw new Error('OHLC incoherente: apertura y cierre deben estar dentro del rango.');
  }
  const bodyLow = Math.min(open, close), bodyHigh = Math.max(open, close);
  return { bodyLow, bodyHigh, body: bodyHigh - bodyLow, lowerWick: bodyLow - low,
    upperWick: high - bodyHigh, range: high - low,
    direction: close > open ? 'alcista' : close < open ? 'bajista' : 'sin cambio' };
}

export const candlePaths = [
  { label: 'Primero el máximo', prices: [100, 108, 97, 104] },
  { label: 'Primero el mínimo', prices: [100, 97, 108, 104] },
] as const;

const clockTicks = [
  { minute: 0, price: 100, explanation: 'El intervalo acaba de empezar. Solo conocemos la apertura; aún no hay recorrido.' },
  { minute: 5, price: 96, explanation: 'Hasta ahora el último precio está por debajo de la apertura. La vela es provisionalmente bajista.' },
  { minute: 12, price: 102, explanation: 'El último precio supera la apertura. El mínimo observado, 96, permanece como mecha inferior. El cierre aún no existe.' },
  { minute: 15, price: 101, explanation: 'El intervalo termina. Ahora sí hay cierre: 101. Haber tocado 102 antes no equivale a cerrar por encima de 102.' },
] as const;

function requireStep(step: number, length: number) {
  if (!Number.isInteger(step) || step < 0 || step >= length) throw new Error('Paso de demostración fuera de rango.');
}

export const clockStepCount = clockTicks.length;
export function candleAtStep(step: number) {
  requireStep(step, clockTicks.length);
  const current = clockTicks[step];
  const prices = clockTicks.slice(0, step + 1).map(tick => tick.price);
  return { ...current, prices, candle: summarizePrices(prices), closed: step === clockTicks.length - 1 };
}

const structureTicks = [
  { price: 100, explanation: 'P1: punto inicial. Con una sola observación todavía no puedes comparar máximos ni mínimos.' },
  { price: 112, explanation: 'P2: el precio ha subido. 112 es el mayor precio disponible; el retroceso todavía no ha ocurrido.' },
  { price: 106, explanation: 'P3: el precio ha retrocedido. 106 es un mínimo provisional del retroceso; no sabes aún si seguirá bajando.' },
  { price: 110, explanation: 'P4: el rebote permite reconocer 106 como giro candidato. 110 sigue debajo de 112: falta la ruptura exigida.' },
  { price: 113, explanation: 'P5: se observa por primera vez un precio mayor que 112 después del retroceso. Según la regla de este ejemplo, 106 queda confirmado como mínimo relevante.' },
  { price: 121, explanation: 'P6: el avance se extiende. 106 ya estaba confirmado en P5; no necesitabas conocer este 121 para reconocer la ruptura.' },
  { price: 109, explanation: 'P7: hay otro retroceso. 109 permanece sobre 106, pero no sabemos si el descenso terminó. Tampoco hay una ruptura posterior de 121 que confirme 109.' },
] as const;

export const structureStepCount = structureTicks.length;
export function structureAtStep(step: number) {
  requireStep(step, structureTicks.length);
  const prices = structureTicks.slice(0, step + 1).map(tick => tick.price);
  const confirmed = prices.slice(3).some(price => price > 112);
  return { prices, explanation: structureTicks[step].explanation,
    reference: step >= 1 ? 112 : null,
    candidate: step >= 2 ? 106 : null,
    status: confirmed ? 'Confirmado por ruptura' : step >= 3 ? 'Candidato tras rebote' : step === 2 ? 'Extremo provisional' : 'Sin candidato',
    confirmed };
}
