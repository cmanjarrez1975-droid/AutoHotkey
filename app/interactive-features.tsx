"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  assessmentQuestions,
  modules,
  Question,
  triviaQuestions,
} from "./course-data";
import {
  calculateRiskPlan,
  selectQuestionSession,
  TradeDirection,
} from "./learning-utils";
import { moduleCurriculum } from "./course-narrative";

type Tool =
  | "high"
  | "low"
  | "impulseStart"
  | "impulseEnd"
  | "entry"
  | "stop"
  | "target";

type Point = { x: number; y: number };
type Marks = Record<Tool, Point | null>;

export type LabSnapshot = {
  marks: Marks;
  scores: {
    structure: number;
    impulse: number;
    location: number;
    invalidation: number;
  };
  rr: number;
  stopPercent: number;
  targetPercent: number;
  atrMultiple: number;
  riskAmount: number;
  positionSize: number;
  validGeometry: boolean;
  direction: TradeDirection;
  score: number;
};

const baseCandles = [
  [101, 104, 105, 99],
  [104, 107, 109, 102],
  [107, 105, 108, 103],
  [105, 110, 111, 104],
  [110, 114, 116, 109],
  [114, 112, 115, 110],
  [112, 118, 120, 111],
  [118, 121, 123, 116],
  [121, 118, 122, 115],
  [118, 114, 119, 111],
  [114, 116, 118, 109],
  [116, 120, 121, 114],
  [120, 124, 126, 119],
  [124, 122, 125, 120],
  [122, 127, 129, 121],
  [127, 131, 133, 125],
  [131, 128, 132, 126],
  [128, 125, 129, 123],
  [125, 127, 129, 122],
  [127, 130, 132, 126],
  [130, 134, 136, 129],
  [134, 132, 135, 130],
  [132, 137, 139, 131],
  [137, 140, 142, 135],
] as const;

const candlesByModule: Record<number, ReadonlyArray<readonly [number, number, number, number]>> = {
  1: baseCandles,
  2: [
    [101, 105, 107, 99], [105, 110, 112, 104], [110, 116, 118, 109],
    [116, 121, 123, 114], [121, 127, 129, 120], [127, 132, 134, 125],
    [132, 128, 133, 126], [128, 123, 129, 121], [123, 118, 124, 116],
    [118, 114, 120, 112], [114, 117, 119, 111], [117, 121, 123, 115],
    [121, 126, 128, 120], [126, 130, 132, 124], [130, 135, 137, 129],
    [135, 133, 136, 131], [133, 138, 140, 132],
  ],
  3: baseCandles.map(([open, close, high, low]) => {
    const mirror = (value: number) => 240 - value;
    const nextOpen = mirror(open);
    const nextClose = mirror(close);
    return [
      nextOpen,
      nextClose,
      Math.max(mirror(high), mirror(low), nextOpen, nextClose),
      Math.min(mirror(high), mirror(low), nextOpen, nextClose),
    ] as const;
  }),
  4: [
    [132, 128, 134, 126], [128, 123, 130, 121], [123, 118, 124, 115],
    [118, 112, 119, 109], [112, 108, 113, 104], [108, 106, 110, 101],
    [106, 124, 126, 103], [124, 128, 130, 121], [128, 126, 129, 123],
    [126, 132, 134, 125], [132, 136, 138, 130],
  ],
  5: [
    [104, 106, 108, 102], [106, 105, 108, 103], [105, 107, 109, 104],
    [107, 119, 121, 106], [119, 126, 128, 118], [126, 132, 134, 124],
    [132, 128, 133, 126], [128, 122, 130, 120], [122, 113, 124, 111],
    [113, 108, 115, 105], [108, 116, 118, 106], [116, 124, 126, 114],
    [124, 130, 132, 122],
  ],
  6: baseCandles,
  7: [
    [132, 126, 134, 124], [126, 119, 128, 116], [119, 112, 121, 109],
    [112, 118, 120, 110], [118, 113, 119, 108], [113, 121, 123, 111],
    [121, 126, 128, 119], [126, 123, 127, 121], [123, 130, 132, 122],
    [130, 135, 137, 128],
  ],
  8: [
    [104, 108, 110, 102], [108, 113, 115, 107], [113, 118, 120, 112],
    [118, 123, 125, 116], [123, 127, 129, 121], [127, 124, 128, 122],
    [124, 121, 126, 119], [121, 118, 122, 116], [118, 123, 125, 117],
    [123, 129, 131, 121], [129, 134, 136, 128],
  ],
  9: [
    [112, 115, 117, 110], [115, 113, 116, 111], [113, 116, 118, 112],
    [116, 114, 117, 112], [114, 117, 119, 113], [117, 115, 118, 113],
    [115, 118, 120, 114], [118, 128, 130, 117], [128, 132, 134, 126],
    [132, 129, 133, 127], [129, 136, 138, 128],
  ],
  10: [
    [102, 106, 108, 100], [106, 111, 113, 104], [111, 108, 112, 106],
    [108, 114, 116, 107], [114, 119, 121, 112], [119, 116, 120, 113],
    [116, 110, 117, 106], [110, 104, 111, 101], [104, 111, 113, 102],
    [111, 118, 120, 109], [118, 124, 126, 116], [124, 121, 125, 118],
    [121, 128, 130, 120], [128, 134, 136, 126],
  ],
};

const priceMin = 96;
const priceMax = 144;
const expectedBase: Record<Tool, Point> = {
  high: { x: 15 / 23, y: (priceMax - 133) / (priceMax - priceMin) },
  low: { x: 10 / 23, y: (priceMax - 109) / (priceMax - priceMin) },
  impulseStart: {
    x: 10 / 23,
    y: (priceMax - 109) / (priceMax - priceMin),
  },
  impulseEnd: { x: 15 / 23, y: (priceMax - 133) / (priceMax - priceMin) },
  entry: { x: 19 / 23, y: (priceMax - 129) / (priceMax - priceMin) },
  stop: { x: 19 / 23, y: (priceMax - 121.8) / (priceMax - priceMin) },
  target: { x: 22 / 23, y: (priceMax - 141) / (priceMax - priceMin) },
};

const pointAt = (x: number, price: number): Point => ({
  x,
  y: (priceMax - price) / (priceMax - priceMin),
});

const expectedByModule: Record<number, Record<Tool, Point>> = {
  1: expectedBase,
  2: {
    high: pointAt(0.31, 134), low: pointAt(0.58, 111),
    impulseStart: pointAt(0.02, 99), impulseEnd: pointAt(0.31, 134),
    entry: pointAt(0.7, 121), stop: pointAt(0.6, 110), target: pointAt(0.96, 139),
  },
  3: {
    high: pointAt(0.43, 131), low: pointAt(0.69, 107),
    impulseStart: pointAt(0.43, 131), impulseEnd: pointAt(0.69, 107),
    entry: pointAt(0.82, 112), stop: pointAt(0.8, 120), target: pointAt(0.97, 99),
  },
  4: {
    high: pointAt(0.61, 126), low: pointAt(0.54, 101),
    impulseStart: pointAt(0.54, 104), impulseEnd: pointAt(0.61, 126),
    entry: pointAt(0.8, 128), stop: pointAt(0.58, 102), target: pointAt(0.98, 138),
  },
  5: {
    high: pointAt(0.23, 109), low: pointAt(0.76, 105),
    impulseStart: pointAt(0.23, 106), impulseEnd: pointAt(0.48, 134),
    entry: pointAt(0.78, 111), stop: pointAt(0.76, 104), target: pointAt(0.97, 131),
  },
  6: expectedBase,
  7: {
    high: pointAt(0.34, 120), low: pointAt(0.46, 108),
    impulseStart: pointAt(0.2, 109), impulseEnd: pointAt(0.46, 108),
    entry: pointAt(0.7, 126), stop: pointAt(0.44, 107), target: pointAt(0.98, 136),
  },
  8: {
    high: pointAt(0.38, 129), low: pointAt(0.72, 116),
    impulseStart: pointAt(0.05, 102), impulseEnd: pointAt(0.38, 129),
    entry: pointAt(0.82, 124), stop: pointAt(0.7, 115), target: pointAt(0.98, 136),
  },
  9: {
    high: pointAt(0.62, 120), low: pointAt(0.12, 110),
    impulseStart: pointAt(0.62, 118), impulseEnd: pointAt(0.73, 130),
    entry: pointAt(0.82, 130), stop: pointAt(0.7, 116), target: pointAt(0.98, 138),
  },
  10: {
    high: pointAt(0.36, 121), low: pointAt(0.58, 101),
    impulseStart: pointAt(0.58, 101), impulseEnd: pointAt(0.78, 126),
    entry: pointAt(0.81, 120), stop: pointAt(0.57, 100), target: pointAt(0.98, 138),
  },
};

const initialMarks: Marks = {
  high: null,
  low: null,
  impulseStart: null,
  impulseEnd: null,
  entry: null,
  stop: null,
  target: null,
};

const toolLabels: Array<{ id: Tool; label: string; short: string }> = [
  { id: "high", label: "Máximo estructural", short: "MAX" },
  { id: "low", label: "Mínimo estructural", short: "MIN" },
  { id: "impulseStart", label: "Inicio del impulso", short: "A" },
  { id: "impulseEnd", label: "Final del impulso", short: "B" },
  { id: "entry", label: "Entrada", short: "E" },
  { id: "stop", label: "Invalidación", short: "SL" },
  { id: "target", label: "Objetivo", short: "TP" },
];

const labelOverrides: Record<number, Partial<Record<Tool, string>>> = {
  2: { high: "Extremo del impulso", low: "Profundidad del retroceso", impulseStart: "Origen Fibonacci", impulseEnd: "Final Fibonacci" },
  3: { high: "Máximo decreciente", low: "Mínimo roto", impulseStart: "Inicio de oferta", impulseEnd: "Final de impulso" },
  4: { high: "Máximo Vela Póker", low: "Mínimo / absorción", impulseStart: "Frenada", impulseEnd: "Recompensa" },
  5: { high: "Límite superior OB", low: "Límite inferior OB", impulseStart: "Origen del bloque", impulseEnd: "Desplazamiento" },
  6: { high: "Resistencia del mapa", low: "Soporte del mapa", impulseStart: "Inicio de escenario", impulseEnd: "Confirmación" },
  7: { high: "Máximo central W", low: "Barrido del suelo", impulseStart: "Primer suelo", impulseEnd: "Segundo suelo" },
  8: { high: "Extremo tendencial", low: "Contacto EMA", impulseStart: "Inicio de tendencia", impulseEnd: "Máximo previo" },
  9: { high: "Banda superior", low: "Banda inferior", impulseStart: "Compresión", impulseEnd: "Ruptura" },
  10: { high: "Máximo de liquidez", low: "Barrido", impulseStart: "Origen del giro", impulseEnd: "Recuperación" },
};

const directionByModule: Record<number, TradeDirection> = {
  3: "Corto",
};

function labelsForModule(module: number) {
  return toolLabels.map((tool) => ({
    ...tool,
    label: labelOverrides[module]?.[tool.id] ?? tool.label,
  }));
}

function priceToY(price: number) {
  return 24 + ((priceMax - price) / (priceMax - priceMin)) * 382;
}

function pointPrice(point: Point | null) {
  if (!point) return 0;
  return priceMax - point.y * (priceMax - priceMin);
}

function distanceScore(point: Point | null, solution: Point, tolerance = 0.12) {
  if (!point) return 0;
  const distance = Math.sqrt(
    Math.pow(point.x - solution.x, 2) + Math.pow(point.y - solution.y, 2),
  );
  return Math.max(0, Math.round((1 - distance / tolerance) * 100));
}

function calculateSnapshot(
  marks: Marks,
  account: number,
  riskPercent: number,
  module: number,
) {
  const expected = expectedByModule[module] ?? expectedBase;
  const structure = Math.round(
    (distanceScore(marks.high, expected.high, 0.15) +
      distanceScore(marks.low, expected.low, 0.15)) /
      2,
  );
  const impulse = Math.round(
    (distanceScore(marks.impulseStart, expected.impulseStart, 0.16) +
      distanceScore(marks.impulseEnd, expected.impulseEnd, 0.16)) /
      2,
  );
  const location = distanceScore(marks.entry, expected.entry, 0.17);
  const invalidation = distanceScore(marks.stop, expected.stop, 0.14);
  const targetScore = distanceScore(marks.target, expected.target, 0.18);
  const entry = pointPrice(marks.entry);
  const stop = pointPrice(marks.stop);
  const target = pointPrice(marks.target);
  const direction = directionByModule[module] ?? "Largo";
  const plan = calculateRiskPlan({
    entry,
    stop,
    target,
    account,
    riskPercent,
    direction,
  });
  const atr = 3.15;
  const score = Math.round(
    structure * 0.25 +
      impulse * 0.15 +
      location * 0.15 +
      invalidation * 0.25 +
      targetScore * 0.2,
  );

  return {
    marks,
    scores: { structure, impulse, location, invalidation },
    rr: plan.rr,
    stopPercent: plan.stopPercent,
    targetPercent: plan.targetPercent,
    atrMultiple: plan.riskPerUnit / atr,
    riskAmount: plan.riskAmount,
    positionSize: plan.positionSize,
    validGeometry: plan.valid,
    direction,
    score,
  } satisfies LabSnapshot;
}

function Chart({
  marks,
  activeTool,
  onMark,
  reveal,
  module,
  labels,
}: {
  marks: Marks;
  activeTool: Tool;
  onMark: (point: Point) => void;
  reveal: boolean;
  module: number;
  labels: Array<{ id: Tool; label: string; short: string }>;
}) {
  const width = 920;
  const height = 450;
  const left = 50;
  const right = 55;
  const plotWidth = width - left - right;
  const candles = candlesByModule[module] ?? baseCandles;
  const expected = expectedByModule[module] ?? expectedBase;

  const click = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * width;
    const py = ((event.clientY - rect.top) / rect.height) * height;
    onMark({
      x: Math.max(0, Math.min(1, (px - left) / plotWidth)),
      y: Math.max(0, Math.min(1, (py - 24) / 382)),
    });
  };

  const xForPoint = (point: Point) => left + point.x * plotWidth;
  const yForPoint = (point: Point) => 24 + point.y * 382;
  const markColors: Record<Tool, string> = {
    high: "#20d9e7",
    low: "#20d9e7",
    impulseStart: "#ffcc5c",
    impulseEnd: "#ffcc5c",
    entry: "#8ca9ff",
    stop: "#ff7a9e",
    target: "#47e7a6",
  };

  return (
    <svg
      className="interactive-chart"
      viewBox={`0 0 ${width} ${height}`}
      onClick={click}
      role="application"
      aria-label={`Gráfico interactivo. Herramienta activa: ${activeTool}`}
    >
      <defs>
        <linearGradient id="chartBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e2034" />
          <stop offset="1" stopColor="#081625" />
        </linearGradient>
        <linearGradient id="targetArea" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#47e7a6" stopOpacity=".08" />
          <stop offset="1" stopColor="#47e7a6" stopOpacity=".01" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} rx="12" fill="url(#chartBg)" />
      {Array.from({ length: 9 }).map((_, i) => {
        const y = 24 + i * 47.75;
        const price = priceMax - i * 6;
        return (
          <g key={`h-${i}`}>
            <line
              x1={left}
              x2={width - right}
              y1={y}
              y2={y}
              stroke="rgba(153,177,211,.09)"
            />
            <text
              x={width - 8}
              y={y + 3}
              fill="#61728a"
              fontSize="9"
              textAnchor="end"
            >
              {price.toFixed(0)}
            </text>
          </g>
        );
      })}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = left + (i * plotWidth) / 11;
        return (
          <line
            key={`v-${i}`}
            x1={x}
            x2={x}
            y1={24}
            y2={406}
            stroke="rgba(153,177,211,.055)"
          />
        );
      })}

      <rect
        x={left + (9.2 / 23) * plotWidth}
        y={priceToY(114)}
        width={(3.8 / 23) * plotWidth}
        height={priceToY(108) - priceToY(114)}
        fill="rgba(255,204,92,.055)"
        stroke="rgba(255,204,92,.12)"
        strokeDasharray="5 5"
      />
      <text
        x={left + (9.3 / 23) * plotWidth}
        y={priceToY(114) - 7}
        fill="#8f835c"
        fontSize="8"
      >
        zona de demanda
      </text>

      {candles.map(([open, close, high, low], index) => {
        const candleWidth = Math.max(7, plotWidth / candles.length - 9);
        const x = left + (index / (candles.length - 1)) * plotWidth;
        const up = close >= open;
        const color = up ? "#46dca4" : "#f66f93";
        return (
          <g key={index}>
            <line
              x1={x}
              x2={x}
              y1={priceToY(high)}
              y2={priceToY(low)}
              stroke={color}
              strokeWidth="1.4"
            />
            <rect
              x={x - candleWidth / 2}
              y={Math.min(priceToY(open), priceToY(close))}
              width={candleWidth}
              height={Math.max(3, Math.abs(priceToY(close) - priceToY(open)))}
              rx="1.5"
              fill={color}
            />
          </g>
        );
      })}

      {marks.impulseStart && marks.impulseEnd && (
        <line
          x1={xForPoint(marks.impulseStart)}
          y1={yForPoint(marks.impulseStart)}
          x2={xForPoint(marks.impulseEnd)}
          y2={yForPoint(marks.impulseEnd)}
          stroke={markColors.impulseStart}
          strokeWidth="2.2"
          strokeDasharray="7 5"
        />
      )}

      {(Object.keys(marks) as Tool[]).map((tool) => {
        const point = marks[tool];
        if (!point || tool === "impulseStart" || tool === "impulseEnd")
          return null;
        const horizontal = ["high", "low", "entry", "stop", "target"].includes(
          tool,
        );
        return (
          <g key={tool}>
            {horizontal && (
              <line
                x1={left}
                x2={width - right}
                y1={yForPoint(point)}
                y2={yForPoint(point)}
                stroke={markColors[tool]}
                strokeWidth="1.2"
                strokeDasharray={tool === "high" || tool === "low" ? "4 5" : "9 5"}
              />
            )}
            <circle
              cx={xForPoint(point)}
              cy={yForPoint(point)}
              r="6"
              fill="#071522"
              stroke={markColors[tool]}
              strokeWidth="2"
            />
            <rect
              x={width - 49}
              y={yForPoint(point) - 10}
              width="42"
              height="19"
              rx="5"
              fill={markColors[tool]}
            />
            <text
              x={width - 28}
              y={yForPoint(point) + 3}
              fill="#04131b"
              textAnchor="middle"
              fontSize="8"
              fontWeight="800"
            >
              {labels.find((item) => item.id === tool)?.short}
            </text>
          </g>
        );
      })}

      {(["impulseStart", "impulseEnd"] as Tool[]).map((tool) => {
        const point = marks[tool];
        if (!point) return null;
        return (
          <g key={tool}>
            <circle
              cx={xForPoint(point)}
              cy={yForPoint(point)}
              r="7"
              fill={markColors[tool]}
            />
            <text
              x={xForPoint(point)}
              y={yForPoint(point) + 3}
              fill="#071522"
              textAnchor="middle"
              fontSize="8"
              fontWeight="900"
            >
              {tool === "impulseStart" ? "A" : "B"}
            </text>
          </g>
        );
      })}

      {reveal &&
        (["high", "low", "entry", "stop", "target"] as Tool[]).map((tool) => (
          <line
            key={`solution-${tool}`}
            x1={left}
            x2={width - right}
            y1={yForPoint(expected[tool])}
            y2={yForPoint(expected[tool])}
            stroke="#eef4ff"
            strokeOpacity=".36"
            strokeDasharray="2 8"
          />
        ))}

      <text x={left} y="432" fill="#60718a" fontSize="9">
        BTCUSDT · 15m · Escenario educativo
      </text>
      <text x={width - right} y="432" fill="#60718a" fontSize="9" textAnchor="end">
        09:00 — 15:00 · UTC−6
      </text>
    </svg>
  );
}

export function LabPage({
  onSnapshot,
  initialModule = 1,
  onModuleChange,
}: {
  onSnapshot: (snapshot: LabSnapshot) => void;
  initialModule?: number;
  onModuleChange?: (module: number) => void;
}) {
  const [selectedModule, setSelectedModule] = useState(initialModule);
  const [activeTool, setActiveTool] = useState<Tool>("high");
  const [marks, setMarks] = useState<Marks>(initialMarks);
  const [account, setAccount] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [reveal, setReveal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const curriculum =
    moduleCurriculum.find((item) => item.module === selectedModule) ??
    moduleCurriculum[0];
  const moduleLabels = useMemo(
    () => labelsForModule(selectedModule),
    [selectedModule],
  );
  const snapshot = useMemo(
    () => calculateSnapshot(marks, account, riskPercent, selectedModule),
    [marks, account, riskPercent, selectedModule],
  );

  const setMark = (point: Point) => {
    setMarks((current) => ({ ...current, [activeTool]: point }));
    setReveal(false);
    setValidated(false);
  };

  const validate = () => {
    setValidated(true);
    setReveal(true);
    onSnapshot(snapshot);
    setSaveStatus("Guardando intento…");
    fetch("/api/state", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        labAttempt: {
          module: selectedModule,
          score: snapshot.score,
          structureScore: snapshot.scores.structure,
          invalidationScore: snapshot.scores.invalidation,
          rr: snapshot.rr,
          stopPercent: snapshot.stopPercent,
          targetPercent: snapshot.targetPercent,
          positionSize: snapshot.positionSize,
          validGeometry: snapshot.validGeometry,
        },
      }),
    })
      .then((response) =>
        setSaveStatus(
          response.ok
            ? "Intento registrado en tu analítica."
            : "Intento disponible en esta sesión.",
        ),
      )
      .catch(() => setSaveStatus("Intento disponible en esta sesión."));
  };

  const marked = Object.values(marks).filter(Boolean).length;
  const nextMissing = moduleLabels.find((item) => !marks[item.id]);

  const changeModule = (module: number) => {
    setSelectedModule(module);
    onModuleChange?.(module);
    setMarks(initialMarks);
    setActiveTool("high");
    setReveal(false);
    setValidated(false);
    setSaveStatus("");
  };

  return (
    <div className="page lab-page">
      <section className="page-heading lab-heading">
        <div>
          <span className="eyebrow">
            LABORATORIO · MÓDULO {selectedModule}
          </span>
          <h1>{curriculum.lab.title}</h1>
          <p>{curriculum.lab.mission}</p>
        </div>
        <div className="lab-status">
          <span>{marked} / 7 marcas</span>
          <strong>{validated ? `${snapshot.score}%` : "Sin validar"}</strong>
        </div>
      </section>

      <section className="lab-module-selector" aria-label="Laboratorios por módulo">
        {moduleCurriculum.map((item) => (
          <button
            key={item.module}
            className={selectedModule === item.module ? "active" : ""}
            onClick={() => changeModule(item.module)}
          >
            <span>{String(item.module).padStart(2, "0")}</span>
            <strong>{item.lab.title}</strong>
          </button>
        ))}
      </section>

      <section className="lab-workspace">
        <div className="chart-column">
          <div className="lab-instruction">
            <div>
              <span className="step-pill">PASO {Math.min(marked + 1, 7)}</span>
              <h2>
                {nextMissing
                  ? `Marca: ${nextMissing.label}`
                  : "Todas las referencias están marcadas"}
              </h2>
              <p>
                {curriculum.lab.steps[Math.min(marked, curriculum.lab.steps.length - 1)]}
                {" "}Haz clic en el gráfico y corrige cualquier marca antes de validar.
              </p>
            </div>
            <div className="scenario-tags">
              <span>
                Contexto {snapshot.direction === "Corto" ? "bajista" : "alcista"}
              </span>
              <span>15 minutos</span>
              <span>ATR 3,15</span>
            </div>
          </div>

          <div className="chart-toolbar" aria-label="Herramientas del gráfico">
            {moduleLabels.map((tool) => (
              <button
                key={tool.id}
                className={activeTool === tool.id ? "active" : ""}
                onClick={() => setActiveTool(tool.id)}
              >
                <span>{tool.short}</span>
                {tool.label}
                {marks[tool.id] && <i>✓</i>}
              </button>
            ))}
            <button
              className="danger-tool"
              onClick={() => {
                setMarks(initialMarks);
                setReveal(false);
                setValidated(false);
                setSaveStatus("");
              }}
            >
              ↺ Reiniciar
            </button>
          </div>

          <Chart
            marks={marks}
            activeTool={activeTool}
            onMark={setMark}
            reveal={reveal}
            module={selectedModule}
            labels={moduleLabels}
          />

          <div className="chart-actions">
            <p>
              <strong>Regla:</strong> define la invalidación antes de colocar el
              objetivo. {curriculum.lab.pass}
              {saveStatus && <span className="save-status"> {saveStatus}</span>}
            </p>
            <button
              className="primary"
              onClick={validate}
              disabled={marked < 7}
            >
              Validar estructura →
            </button>
          </div>
        </div>

        <aside className="risk-panel">
          <div className="risk-heading">
            <span className="eyebrow">MEDICIÓN CUANTITATIVA</span>
            <h2>Riesgo e invalidación</h2>
            <p>Los valores se actualizan desde tus líneas del gráfico.</p>
          </div>

          <div className="price-readout">
            <div>
              <span>Entrada</span>
              <strong>
                {marks.entry ? pointPrice(marks.entry).toFixed(2) : "—"}
              </strong>
            </div>
            <div className="stop-value">
              <span>Stop técnico</span>
              <strong>
                {marks.stop ? pointPrice(marks.stop).toFixed(2) : "—"}
              </strong>
            </div>
            <div className="target-value">
              <span>Objetivo</span>
              <strong>
                {marks.target ? pointPrice(marks.target).toFixed(2) : "—"}
              </strong>
            </div>
          </div>

          <div className="rr-hero">
            <span>R/R TEÓRICO</span>
            <strong className={snapshot.rr >= 2 ? "good" : ""}>
              {snapshot.rr > 0 ? `1 : ${snapshot.rr.toFixed(2)}` : "—"}
            </strong>
            <small>
              {!snapshot.validGeometry && marks.entry && marks.stop && marks.target
                ? snapshot.direction === "Largo"
                  ? "En largo: stop bajo la entrada y objetivo por encima."
                  : "En corto: stop sobre la entrada y objetivo por debajo."
                : snapshot.rr >= 2
                  ? "Asimetría educativa favorable"
                  : "Objetivo recomendado: R/R ≥ 2"}
            </small>
          </div>

          <div className="risk-metrics">
            <div>
              <span>Distancia al stop</span>
              <strong>{snapshot.stopPercent.toFixed(2)}%</strong>
            </div>
            <div>
              <span>Distancia al target</span>
              <strong>{snapshot.targetPercent.toFixed(2)}%</strong>
            </div>
            <div>
              <span>Stop normalizado</span>
              <strong>{snapshot.atrMultiple.toFixed(2)} ATR</strong>
            </div>
          </div>

          <div className="position-calculator">
            <span className="eyebrow">TAMAÑO DE POSICIÓN</span>
            <label>
              Capital de práctica
              <input
                type="number"
                value={account}
                onChange={(event) => setAccount(Number(event.target.value))}
                min="100"
              />
            </label>
            <label>
              Riesgo fijo
              <div className="input-suffix">
                <input
                  type="number"
                  value={riskPercent}
                  onChange={(event) =>
                    setRiskPercent(Number(event.target.value))
                  }
                  min="0.1"
                  max="5"
                  step="0.1"
                />
                <span>%</span>
              </div>
            </label>
            <div className="position-result">
              <span>
                Riesgo {snapshot.riskAmount.toFixed(2)} · unidades teóricas
              </span>
              <strong>{snapshot.positionSize.toFixed(4)}</strong>
            </div>
          </div>

          {validated && (
            <div className="validation-card">
              <div className="validation-score">
                <strong>{snapshot.score}%</strong>
                <span>
                  {snapshot.score >= 75 ? "Lectura sólida" : "Requiere ajuste"}
                </span>
              </div>
              {Object.entries(snapshot.scores).map(([label, value]) => (
                <div className="rubric-row" key={label}>
                  <span>
                    {
                      {
                        structure: "Estructura",
                        impulse: "Impulso",
                        location: "Entrada",
                        invalidation: "Invalidación",
                      }[label]
                    }
                  </span>
                  <i>
                    <b style={{ width: `${value}%` }} />
                  </i>
                  <strong>{value}%</strong>
                </div>
              ))}
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}

type MentorFeedback = {
  engine: "rules" | "vision";
  verdict: string;
  score: number;
  strengths: string[];
  corrections: string[];
  nextExercise: string;
  source: string;
};

export function MentorPage({ snapshot }: { snapshot: LabSnapshot | null }) {
  const [imageDataUrl, setImageDataUrl] = useState<string>("");
  const [fileName, setFileName] = useState("");
  const [feedback, setFeedback] = useState<MentorFeedback | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fileSelected = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Selecciona una captura en formato PNG, JPG o WebP.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("La captura supera el límite de 8 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(String(reader.result ?? ""));
      setFileName(file.name);
      setError("");
      setFeedback(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="page mentor-page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">PASO 4 · PENDIENTE</span>
          <h1>Análisis de capturas con IA</h1>
          <p>
            La interfaz y la rúbrica se conservan para una fase posterior. En
            esta entrega no se envían capturas a ningún modelo ni se presentan
            resultados simulados como análisis visual.
          </p>
        </div>
        <span className="mentor-mode">
          <i />
          No activado
        </span>
      </section>

      <section className="mentor-layout">
        <div className="upload-stage">
          <div
            className={`drop-zone ${imageDataUrl ? "has-image" : ""}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              setError(
                "Paso 4 pendiente: la carga para análisis con IA no está activada.",
              );
            }}
          >
            {imageDataUrl ? (
              <img src={imageDataUrl} alt="Captura de gráfico seleccionada" />
            ) : (
              <div>
                <span className="upload-icon">↥</span>
                <h2>Carga de capturas reservada</h2>
                <p>
                  Este espacio se habilitará cuando se implemente y valide el
                  paso 4.
                </p>
                <button
                  className="secondary"
                  onClick={() => fileRef.current?.click()}
                  disabled
                >
                  Pendiente de activación
                </button>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => fileSelected(event.target.files?.[0])}
              disabled
              hidden
            />
          </div>
          {imageDataUrl && (
            <div className="upload-meta">
              <div>
                <span>Captura cargada</span>
                <strong>{fileName}</strong>
              </div>
              <button
                onClick={() => {
                  setImageDataUrl("");
                  setFileName("");
                  setFeedback(null);
                }}
              >
                Quitar
              </button>
            </div>
          )}

          <div className="lab-import">
            <div>
              <span className="eyebrow">EJERCICIO INTERACTIVO</span>
              <h3>
                {snapshot
                  ? `Último laboratorio: ${snapshot.score}%`
                  : "Aún no has validado el laboratorio"}
              </h3>
              <p>
                La puntuación objetiva del laboratorio permanece disponible en
                la sección Laboratorio.
              </p>
            </div>
            <button className="secondary" disabled>
              Análisis con IA pendiente
            </button>
          </div>
          {error && <p className="form-error">{error}</p>}
        </div>

        <aside className="feedback-panel">
          {!feedback ? (
            <div className="feedback-empty">
              <span>✦</span>
              <h2>Área preparada para una fase posterior</h2>
              <p>
                Antes de habilitarla se deberán validar precisión, consistencia,
                incertidumbre y cumplimiento de las reglas de este curso.
              </p>
              <ol>
                <li>Qué hiciste correctamente</li>
                <li>Dónde está el error</li>
                <li>Por qué importa</li>
                <li>Cómo corregirlo</li>
                <li>Qué practicar después</li>
              </ol>
            </div>
          ) : (
            <div className="feedback-result">
              <div className="feedback-score">
                <span>
                  {feedback.engine === "vision"
                    ? "VISIÓN + RÚBRICA"
                    : "RÚBRICA OBJETIVA"}
                </span>
                <strong>{feedback.score}%</strong>
              </div>
              <h2>{feedback.verdict}</h2>
              <section className="feedback-block strengths">
                <h3>✓ Bien ejecutado</h3>
                {feedback.strengths.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </section>
              <section className="feedback-block corrections">
                <h3>↗ Correcciones</h3>
                {feedback.corrections.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </section>
              <section className="next-exercise">
                <span>PRÓXIMO EJERCICIO</span>
                <strong>{feedback.nextExercise}</strong>
              </section>
              <small className="feedback-source">Fuente: {feedback.source}</small>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}

type Practice = {
  id: number;
  module: number;
  instrument: string;
  timeframe: string;
  direction: string;
  plannedRr: string;
  resultR: string;
  invalidationDefined: boolean;
  notes: string;
  createdAt: string;
};

const seedPractices: Practice[] = [
  {
    id: -1,
    module: 1,
    instrument: "BTCUSDT",
    timeframe: "15m",
    direction: "Largo",
    plannedRr: "2.4",
    resultR: "2.1",
    invalidationDefined: true,
    notes: "Mínimo creciente y ruptura del máximo estructural.",
    createdAt: "2026-07-25T14:10:00-06:00",
  },
  {
    id: -2,
    module: 1,
    instrument: "NQ",
    timeframe: "3m",
    direction: "Largo",
    plannedRr: "1.8",
    resultR: "-1",
    invalidationDefined: true,
    notes: "Entrada anticipada antes de confirmar la base.",
    createdAt: "2026-07-24T10:35:00-06:00",
  },
  {
    id: -3,
    module: 1,
    instrument: "EURUSD",
    timeframe: "15m",
    direction: "Largo",
    plannedRr: "2.2",
    resultR: "0",
    invalidationDefined: false,
    notes: "La invalidación inicial quedó dentro del ruido.",
    createdAt: "2026-07-23T09:18:00-06:00",
  },
];

export function JournalPage({ snapshot }: { snapshot: LabSnapshot | null }) {
  const [practices, setPractices] = useState<Practice[]>(seedPractices);
  const [selectedModule, setSelectedModule] = useState(1);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    instrument: "BTCUSDT",
    timeframe: "15m",
    direction: "Largo",
    plannedRr: snapshot?.rr ? snapshot.rr.toFixed(2) : "2.00",
    resultR: "0",
    invalidationDefined: true,
    notes: "",
  });

  useEffect(() => {
    fetch("/api/state")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.practices?.length) setPractices(data.practices);
      })
      .catch(() => undefined);
  }, []);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/state", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          practice: { module: selectedModule, ...form },
        }),
      });
      if (!response.ok) throw new Error("No se pudo guardar.");
      const data = (await response.json()) as { practice: Practice };
      setPractices((current) => [data.practice, ...current]);
      setForm((current) => ({ ...current, notes: "", resultR: "0" }));
      setMessage("Práctica guardada y métricas actualizadas.");
    } catch {
      const optimistic: Practice = {
        id: -Date.now(),
        module: selectedModule,
        ...form,
        createdAt: new Date().toISOString(),
      };
      setPractices((current) => [optimistic, ...current]);
      setMessage("Práctica guardada en esta sesión.");
    } finally {
      setSaving(false);
    }
  };

  const modulePractices = practices.filter(
    (practice) => practice.module === selectedModule,
  );
  const total = modulePractices.length;
  const wins = modulePractices.filter((item) => Number(item.resultR) > 0).length;
  const disciplined = modulePractices.filter(
    (item) => item.invalidationDefined,
  ).length;
  const averageRr =
    modulePractices.reduce((sum, item) => sum + Number(item.plannedRr || 0), 0) /
    Math.max(1, total);

  return (
    <div className="page journal-page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">
            BACKTESTING CHECKPOINT · MÓDULO {selectedModule}
          </span>
          <h1>Diario de práctica</h1>
          <p>
            Completa diez escenarios para aprobar el módulo y veinte para
            alcanzar dominio. Los intentos incorrectos también cuentan.
          </p>
        </div>
        <div className="checkpoint-progress">
          <strong>{Math.min(total, 10)} / 10</strong>
          <span>escenarios mínimos</span>
          <div className="progress-track">
            <i style={{ width: `${Math.min(total * 10, 100)}%` }} />
          </div>
        </div>
      </section>

      <section className="journal-module-selector" aria-label="Simulación por módulo">
        {moduleCurriculum.map((item) => {
          const count = practices.filter(
            (practice) => practice.module === item.module,
          ).length;
          return (
            <button
              key={item.module}
              className={selectedModule === item.module ? "active" : ""}
              onClick={() => setSelectedModule(item.module)}
            >
              <span>M{item.module}</span>
              <strong>{Math.min(count, 20)} / 20</strong>
              <small>{count >= 10 ? "mínimo completo" : `${10 - count} para aprobar`}</small>
            </button>
          );
        })}
      </section>

      <section className="journal-metrics">
        <article>
          <span>Tasa de resultado positivo</span>
          <strong>{Math.round((wins / Math.max(1, total)) * 100)}%</strong>
          <small>No equivale a calidad de proceso</small>
        </article>
        <article>
          <span>Disciplina de invalidación</span>
          <strong>
            {Math.round((disciplined / Math.max(1, total)) * 100)}%
          </strong>
          <small>Stop definido antes de evaluar</small>
        </article>
        <article>
          <span>R/R promedio planificado</span>
          <strong>1 : {averageRr.toFixed(2)}</strong>
          <small>Objetivo educativo ≥ 2</small>
        </article>
        <article>
          <span>Escenarios de dominio</span>
          <strong>{total} / 20</strong>
          <small>Práctica avanzada</small>
        </article>
      </section>

      <section className="journal-layout">
        <form className="practice-form" onSubmit={save}>
          <div className="form-heading">
            <span className="eyebrow">NUEVO REGISTRO</span>
            <h2>Documenta el proceso</h2>
            <p>
              El R/R puede importarse del último ejercicio o registrarse
              manualmente.
            </p>
          </div>
          <div className="form-grid">
            <label>
              Instrumento
              <input
                value={form.instrument}
                onChange={(event) =>
                  setForm({ ...form, instrument: event.target.value })
                }
                required
              />
            </label>
            <label>
              Timeframe
              <select
                value={form.timeframe}
                onChange={(event) =>
                  setForm({ ...form, timeframe: event.target.value })
                }
              >
                {["1m", "3m", "5m", "15m", "1h", "4h", "1D"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Dirección
              <select
                value={form.direction}
                onChange={(event) =>
                  setForm({ ...form, direction: event.target.value })
                }
              >
                <option>Largo</option>
                <option>Corto</option>
              </select>
            </label>
            <label>
              R/R planificado
              <input
                type="number"
                step="0.1"
                value={form.plannedRr}
                onChange={(event) =>
                  setForm({ ...form, plannedRr: event.target.value })
                }
              />
            </label>
            <label>
              Resultado en R
              <input
                type="number"
                step="0.1"
                value={form.resultR}
                onChange={(event) =>
                  setForm({ ...form, resultR: event.target.value })
                }
              />
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={form.invalidationDefined}
                onChange={(event) =>
                  setForm({
                    ...form,
                    invalidationDefined: event.target.checked,
                  })
                }
              />
              Invalidación definida antes de revelar el resultado
            </label>
            <label className="wide-label">
              Nota de aprendizaje
              <textarea
                value={form.notes}
                onChange={(event) =>
                  setForm({ ...form, notes: event.target.value })
                }
                placeholder="¿Qué observaste? ¿Qué corregirías?"
              />
            </label>
          </div>
          <button className="primary" disabled={saving}>
            {saving ? "Guardando…" : "Guardar práctica →"}
          </button>
          {message && <p className="form-message">{message}</p>}
        </form>

        <div className="practice-history">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">HISTORIAL</span>
              <h2>Escenarios registrados</h2>
            </div>
            <span className="history-count">{total} registros</span>
          </div>
          <div className="practice-table">
            <div className="practice-row header">
              <span>Escenario</span>
              <span>R/R</span>
              <span>Resultado</span>
              <span>Disciplina</span>
            </div>
            {modulePractices.slice(0, 12).map((item) => (
              <div className="practice-row" key={item.id}>
                <div>
                  <strong>{item.instrument}</strong>
                  <small>
                    {item.timeframe} · {item.direction}
                  </small>
                  <p>{item.notes}</p>
                </div>
                <span>1:{Number(item.plannedRr).toFixed(1)}</span>
                <span
                  className={
                    Number(item.resultR) > 0
                      ? "win"
                      : Number(item.resultR) < 0
                        ? "loss"
                        : ""
                  }
                >
                  {Number(item.resultR) > 0 ? "+" : ""}
                  {item.resultR}R
                </span>
                <span
                  className={
                    item.invalidationDefined ? "disciplined" : "needs-work"
                  }
                >
                  {item.invalidationDefined ? "✓ Definida" : "Revisar"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

type AnalyticsPayload = {
  practices?: Practice[];
  labs?: Array<{
    id: number;
    module: number;
    score: number;
    structureScore: number;
    invalidationScore: number;
    createdAt: string;
  }>;
  answers?: Array<{
    id: number;
    module: number;
    mode: string;
    questionId: string;
    difficulty: string;
    correct: boolean;
    createdAt: string;
  }>;
  lessons?: Array<{
    id: number;
    module: number;
    lessonId: string;
    completed: boolean;
    studySeconds: number;
  }>;
};

export function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsPayload>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/state")
      .then((response) => (response.ok ? response.json() : {}))
      .then((payload) => setData(payload as AnalyticsPayload))
      .catch(() => setData({}))
      .finally(() => setLoading(false));
  }, []);

  const rows = modules.map((module) => {
    const practices = (data.practices ?? []).filter(
      (item) => item.module === module.id,
    );
    const labs = (data.labs ?? []).filter((item) => item.module === module.id);
    const answers = (data.answers ?? []).filter(
      (item) => item.module === module.id,
    );
    const lessons = (data.lessons ?? []).filter(
      (item) => item.module === module.id,
    );
    const correct = answers.filter((answer) => answer.correct).length;
    const averageLab =
      labs.reduce((sum, attempt) => sum + attempt.score, 0) /
      Math.max(1, labs.length);
    const studyMinutes = Math.round(
      lessons.reduce((sum, lesson) => sum + lesson.studySeconds, 0) / 60,
    );
    return {
      ...module,
      practices: practices.length,
      labs: labs.length,
      averageLab: Math.round(averageLab),
      answers: answers.length,
      accuracy: Math.round((correct / Math.max(1, answers.length)) * 100),
      studyMinutes,
    };
  });
  const weakest = [...rows]
    .filter((row) => row.answers > 0 || row.labs > 0)
    .sort(
      (a, b) =>
        a.accuracy + a.averageLab - (b.accuracy + b.averageLab),
    )[0];

  return (
    <div className="page analytics-page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">ANALÍTICA DE APRENDIZAJE</span>
          <h1>Mide proceso, no solo resultados.</h1>
          <p>
            La vista combina intentos de laboratorio, respuestas y simulaciones
            por módulo. Una tasa financiera positiva nunca sustituye el
            cumplimiento de la invalidación.
          </p>
        </div>
        <div className="analytics-highlight">
          <span>Prioridad de repaso</span>
          <strong>{weakest ? `M${weakest.id} · ${weakest.title}` : "Aún sin datos"}</strong>
          <small>
            {weakest
              ? `Acierto ${weakest.accuracy}% · laboratorio ${weakest.averageLab}%`
              : "Completa un laboratorio o una trivia para crear la línea base."}
          </small>
        </div>
      </section>

      <section className="analytics-table" aria-busy={loading}>
        <div className="analytics-row header">
          <span>Módulo</span>
          <span>Laboratorios</span>
          <span>Acierto</span>
          <span>Simulaciones</span>
          <span>Estudio</span>
        </div>
        {rows.map((row) => (
          <div className="analytics-row" key={row.id}>
            <div>
              <span className="module-chip">M{row.id}</span>
              <strong>{row.title}</strong>
            </div>
            <span>
              <strong>{row.averageLab}%</strong>
              <small>{row.labs} intentos</small>
            </span>
            <span>
              <strong>{row.accuracy}%</strong>
              <small>{row.answers} respuestas</small>
            </span>
            <span>
              <strong>{row.practices} / 10</strong>
              <small>{row.practices >= 10 ? "mínimo completo" : "en progreso"}</small>
            </span>
            <span>
              <strong>{row.studyMinutes} min</strong>
              <small>tiempo registrado</small>
            </span>
          </div>
        ))}
      </section>

      <section className="analytics-notes">
        <article>
          <span>Cómo leerla</span>
          <p>
            Prioriza módulos con baja precisión y poca práctica. Repite primero
            los errores y luego valida un escenario nuevo sin revelar la
            solución.
          </p>
        </article>
        <article>
          <span>Regla de disciplina</span>
          <p>
            Los intentos se conservan aunque sean incorrectos. Borrar errores
            impediría medir la evolución real.
          </p>
        </article>
      </section>
    </div>
  );
}

export function QuizPage({
  mode,
}: {
  mode: "trivia" | "assessment";
}) {
  const bank = mode === "trivia" ? triviaQuestions : assessmentQuestions;
  const sessionSize = mode === "trivia" ? 10 : 20;
  const storageKey = `wearetrades-${mode}-answered`;
  const [selectedModule, setSelectedModule] = useState<number | "all">("all");
  const initialAnsweredIds = () => {
    if (typeof window === "undefined") return [];
    return JSON.parse(window.localStorage.getItem(storageKey) || "[]") as string[];
  };
  const [answeredIds, setAnsweredIds] =
    useState<string[]>(initialAnsweredIds);
  const [session, setSession] = useState<Question[]>(() => {
    const saved = initialAnsweredIds();
    return selectQuestionSession({
      bank,
      answeredIds: saved,
      size: sessionSize,
      module: "all",
    });
  });
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);

  const current = session[index];

  const answer = (optionIndex: number) => {
    if (selected !== null || !current) return;
    setSelected(optionIndex);
    if (optionIndex === current.correct) setScore((value) => value + 1);
    const nextIds = Array.from(new Set([...answeredIds, current.id]));
    setAnsweredIds(nextIds);
    window.localStorage.setItem(storageKey, JSON.stringify(nextIds));
    fetch("/api/state", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        state: {
          [`${mode}AnsweredIds`]: nextIds,
          [`${mode}LastScore`]:
            optionIndex === current.correct ? score + 1 : score,
        },
        quizAnswer: {
          attemptKey: `${mode}-${current.id}-${answeredIds.length}`,
          mode,
          module: current.module,
          questionId: current.id,
          difficulty: current.difficulty,
          selectedIndex: optionIndex,
          correct: optionIndex === current.correct,
        },
      }),
    }).catch(() => undefined);
  };

  const next = () => {
    if (index + 1 >= session.length) {
      setComplete(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  };

  const restart = () => {
    setSession(
      selectQuestionSession({
        bank,
        answeredIds,
        size: sessionSize,
        module: selectedModule,
      }),
    );
    setIndex(0);
    setSelected(null);
    setScore(0);
    setComplete(false);
  };

  const changeModule = (module: number | "all") => {
    setSelectedModule(module);
    setSession(
      selectQuestionSession({
        bank,
        answeredIds,
        size: sessionSize,
        module,
      }),
    );
    setIndex(0);
    setSelected(null);
    setScore(0);
    setComplete(false);
  };

  if (!current) {
    return (
      <div className="page quiz-page">
        <div className="quiz-loading">Preparando preguntas…</div>
      </div>
    );
  }

  if (complete) {
    const percentage = Math.round((score / session.length) * 100);
    return (
      <div className="page quiz-page">
        <section className="quiz-complete">
          <span className="eyebrow">
            {mode === "trivia" ? "TRIVIA COMPLETADA" : "CUESTIONARIO COMPLETADO"}
          </span>
          <div className="complete-score">{percentage}%</div>
          <h1>
            {percentage >= 80
              ? "Dominio sólido del bloque."
              : "Hay conceptos que conviene reforzar."}
          </h1>
          <p>
            Respondiste correctamente {score} de {session.length}. Las próximas
            sesiones priorizarán preguntas todavía no vistas.
          </p>
          <div className="complete-stats">
            <span>
              <strong>{bank.length}</strong> preguntas en el banco
            </span>
            <span>
              <strong>{answeredIds.length}</strong> preguntas vistas
            </span>
            <span>
              <strong>{bank.length - answeredIds.length}</strong> sin repetir
            </span>
          </div>
          <button className="primary" onClick={restart}>
            Iniciar otra sesión →
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="page quiz-page">
      <section className="quiz-top">
        <div>
          <span className="eyebrow">
            {mode === "trivia"
              ? "TRIVIA DE REFUERZO"
              : "EVALUACIÓN FORMAL"}
          </span>
          <h1>
            {mode === "trivia"
              ? "Practica con feedback inmediato"
              : "Cuestionario por escenarios"}
          </h1>
        </div>
        <div className="bank-status">
          <strong>{bank.length}</strong>
          <span>preguntas únicas</span>
          <small>{answeredIds.length} vistas en el ciclo actual</small>
        </div>
      </section>

      <section className="quiz-module-filter" aria-label="Filtrar preguntas por módulo">
        <button
          className={selectedModule === "all" ? "active" : ""}
          onClick={() => changeModule("all")}
        >
          Curso completo
        </button>
        {moduleCurriculum.map((item) => (
          <button
            key={item.module}
            className={selectedModule === item.module ? "active" : ""}
            onClick={() => changeModule(item.module)}
          >
            M{item.module} ·{" "}
            {bank.filter((question) => question.module === item.module).length}
          </button>
        ))}
      </section>

      <section className="quiz-layout">
        <aside className="quiz-sidebar">
          <span className="eyebrow">SESIÓN ACTUAL</span>
          <div className="quiz-progress-value">
            <strong>
              {index + 1} / {session.length}
            </strong>
            <span>{score} correctas</span>
          </div>
          <div className="question-dots">
            {session.map((question, questionIndex) => (
              <i
                key={question.id}
                className={
                  questionIndex < index
                    ? "done"
                    : questionIndex === index
                      ? "active"
                      : ""
                }
              />
            ))}
          </div>
          <div className="question-meta">
            <span>Módulo {current.module}</span>
            <span>{current.difficulty}</span>
            <span>{current.id}</span>
          </div>
          <p>
            No se repiten preguntas dentro de la sesión ni entre sesiones hasta
            agotar el banco.
          </p>
        </aside>

        <article className="question-card">
          <div className="question-number">
            Pregunta {index + 1}
            <span>{current.difficulty}</span>
          </div>
          <h2>{current.prompt}</h2>
          <div className="option-list">
            {current.options.map((option, optionIndex) => {
              const isCorrect = optionIndex === current.correct;
              const isSelected = selected === optionIndex;
              const className =
                selected === null
                  ? ""
                  : isCorrect
                    ? "correct"
                    : isSelected
                      ? "incorrect"
                      : "muted-option";
              return (
                <button
                  key={option}
                  className={className}
                  onClick={() => answer(optionIndex)}
                  disabled={selected !== null}
                >
                  <span>{String.fromCharCode(65 + optionIndex)}</span>
                  <strong>{option}</strong>
                  {selected !== null && isCorrect && <i>✓</i>}
                  {selected !== null && isSelected && !isCorrect && <i>×</i>}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <section
              className={`answer-explanation ${
                selected === current.correct ? "correct" : "incorrect"
              }`}
            >
              <div className="answer-title">
                <span>
                  {selected === current.correct ? "✓" : "×"}
                </span>
                <div>
                  <strong>
                    {selected === current.correct
                      ? "Respuesta correcta"
                      : "Respuesta incorrecta"}
                  </strong>
                  <small>
                    {current.optionFeedback[selected]}
                  </small>
                </div>
              </div>
              <p>{current.explanation}</p>
              <div className="answer-source">
                <span>Fuente</span>
                <strong>{current.source}</strong>
              </div>
              <button className="primary" onClick={next}>
                {index + 1 === session.length
                  ? "Ver resultado →"
                  : "Siguiente pregunta →"}
              </button>
            </section>
          )}
        </article>
      </section>
    </div>
  );
}
