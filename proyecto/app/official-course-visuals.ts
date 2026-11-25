import type { CourseVisual } from "./course-visuals.ts";

const architect = (page: number) =>
  `/course-references/official/market-architect-${String(page).padStart(2, "0")}.webp`;
const playbook = (page: number) =>
  `/course-references/official/playbook-${String(page).padStart(2, "0")}.webp`;

export const moduleVisuals: Record<number, CourseVisual[]> = {
  1: [
    {
      src: architect(2),
      title: "Arquitectura top-down del sistema",
      caption:
        "Presenta la secuencia que organiza todo el curso: contexto, zona y gatillo. Se utiliza antes de estudiar las formas de continuación.",
      source: "Market Architect Blueprint, p. 2.",
      origin: "Manual aportado",
    },
    {
      src: playbook(1),
      title: "Anatomía del mercado en una vela",
      caption:
        "Relaciona apertura, extremos y cierre con la lectura de desplazamiento. Sirve para pasar de velas aisladas a estructura.",
      source: "Institutional Trading Playbook, p. 1.",
      origin: "Manual aportado",
    },
    {
      src: playbook(15),
      title: "Del ruido a un proceso estructurado",
      caption:
        "Contrasta la reacción impulsiva con un método basado en zonas, confirmación, contexto y riesgo.",
      source: "Institutional Trading Playbook, p. 15.",
      origin: "Manual aportado",
    },
  ],
  2: [
    {
      src: architect(5),
      title: "Fibonacci y zona de control",
      caption:
        "Ubica niveles de retroceso dentro de un mapa más amplio y recuerda que el porcentaje necesita contexto y reacción.",
      source: "Market Architect Blueprint, p. 5.",
      origin: "Manual aportado",
    },
    {
      src: playbook(7),
      title: "Estructura del engaño de liquidez",
      caption:
        "Diferencia una pauta visual ordinaria de una recuperación rápida después de un barrido en un extremo.",
      source: "Institutional Trading Playbook, p. 7.",
      origin: "Manual aportado",
    },
    {
      src: playbook(10),
      title: "Confluencia para un rebote",
      caption:
        "Muestra cómo zona, medias, Fibonacci y confirmación se combinan sin convertir un indicador en orden automática.",
      source: "Institutional Trading Playbook, p. 10.",
      origin: "Manual aportado",
    },
  ],
  3: [
    {
      src: architect(8),
      title: "Patrones vendedores y agotamiento",
      caption:
        "Separa una continuación bajista de una señal que solo obliga a dejar de perseguir el movimiento.",
      source: "Market Architect Blueprint, p. 8.",
      origin: "Manual aportado",
    },
    {
      src: playbook(4),
      title: "Anatomía de la oferta",
      caption:
        "Descompone una vela vendedora y la relaciona con la zona y la presión de oferta.",
      source: "Institutional Trading Playbook, p. 4.",
      origin: "Manual aportado",
    },
    {
      src: playbook(13),
      title: "Ejecución táctica de una M",
      caption:
        "Ilustra base, segunda pierna, confirmación y stop dentro de una secuencia bajista completa.",
      source: "Institutional Trading Playbook, p. 13.",
      origin: "Manual aportado",
    },
  ],
  4: [
    {
      src: architect(6),
      title: "Anatomía de la Vela Póker",
      caption:
        "Diferencia cuerpo, mecha y ubicación para evitar interpretar una vela solo por su tamaño.",
      source: "Market Architect Blueprint, p. 6.",
      origin: "Manual aportado",
    },
    {
      src: architect(7),
      title: "Señales alcistas Tipo 1, 2 y 3",
      caption:
        "Compara decisión, rechazo y giro en V dentro de la clasificación utilizada por el curso.",
      source: "Market Architect Blueprint, p. 7.",
      origin: "Manual aportado",
    },
    {
      src: playbook(6),
      title: "Tipología comparada de Velas Póker",
      caption:
        "Resume rasgos visuales, interpretación propuesta y necesidad de contexto para cada tipo.",
      source: "Institutional Trading Playbook, p. 6.",
      origin: "Manual aportado",
    },
  ],
  5: [
    {
      src: architect(4),
      title: "Ciclo de vida del Order Block",
      caption:
        "Explica creación, reposo y mitigación para que la zona cambie de estado después de cada visita.",
      source: "Market Architect Blueprint, p. 4.",
      origin: "Manual aportado",
    },
    {
      src: playbook(8),
      title: "Order Blocks como zonas pendientes",
      caption:
        "Presenta el concepto de bloque no mitigado y su posible uso como destino, sin asumir que el precio deba visitarlo.",
      source: "Institutional Trading Playbook, p. 8.",
      origin: "Manual aportado",
    },
    {
      src: architect(5),
      title: "Zona, Fibonacci y punto de control",
      caption:
        "Integra varias referencias para evaluar la ubicación antes de exigir un gatillo.",
      source: "Market Architect Blueprint, p. 5.",
      origin: "Manual aportado",
    },
  ],
  6: [
    {
      src: architect(14),
      title: "Checklist preoperativo",
      caption:
        "Convierte la lectura en permisos binarios: contexto, zona, reacción, gatillo e invalidación.",
      source: "Market Architect Blueprint, p. 14.",
      origin: "Manual aportado",
    },
    {
      src: playbook(11),
      title: "Algoritmo multitemporal",
      caption:
        "Ordena la preparación desde el marco diario hasta el gatillo de ejecución.",
      source: "Institutional Trading Playbook, p. 11.",
      origin: "Manual aportado",
    },
    {
      src: playbook(15),
      title: "Disciplina del contexto",
      caption:
        "Refuerza la decisión de no operar en zonas medias o sin una condición prevista.",
      source: "Institutional Trading Playbook, p. 15.",
      origin: "Manual aportado",
    },
  ],
  7: [
    {
      src: architect(9),
      title: "Mapa 15m y ejecución 3m",
      caption:
        "Muestra cómo una vela de contexto se descompone en una estructura de entrada en marco menor.",
      source: "Market Architect Blueprint, p. 9.",
      origin: "Manual aportado",
    },
    {
      src: architect(10),
      title: "Anatomía de un barrido y recuperación",
      caption:
        "Organiza caída, caza de stops, absorción, giro y punto de entrada dentro de una secuencia.",
      source: "Market Architect Blueprint, p. 10.",
      origin: "Manual aportado",
    },
    {
      src: architect(12),
      title: "La regla de los últimos minutos",
      caption:
        "Recuerda que la anatomía de una vela activa puede cambiar antes del cierre.",
      source: "Market Architect Blueprint, p. 12.",
      origin: "Manual aportado",
    },
  ],
  8: [
    {
      src: architect(3),
      title: "Termómetro de medias y canal",
      caption:
        "Relaciona precio, EMA 30/75 y zona media para clasificar el régimen antes de buscar una entrada.",
      source: "Market Architect Blueprint, p. 3.",
      origin: "Manual aportado",
    },
    {
      src: architect(13),
      title: "Setup integrado con EMA 30/75",
      caption:
        "Presenta una operación completa donde las medias filtran el contexto y la estructura define el stop.",
      source: "Market Architect Blueprint, p. 13.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m08-rebote-media-30.webp",
      title: "Rebote sobre la media 30",
      caption:
        "Caso del manual principal para practicar un retroceso superficial dentro de una tendencia.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 250.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m08-rebote-media-75.webp",
      title: "Rebote sobre la media 75",
      caption:
        "Caso del manual principal para comparar una corrección más profunda.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 251.",
      origin: "Manual aportado",
    },
  ],
  9: [
    {
      src: architect(3),
      title: "Donchian como termómetro diario",
      caption:
        "Utiliza la zona media para filtrar el sesgo sin interpretar cada banda como una orden.",
      source: "Market Architect Blueprint, p. 3.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m09-entrada-agresiva-alcista.webp",
      title: "Entrada agresiva alcista",
      caption:
        "Ejemplo original para revisar ruptura, recorrido e invalidación.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 258.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m09-entrada-agresiva-bajista.webp",
      title: "Entrada agresiva bajista",
      caption:
        "Ejemplo original para comparar la lógica vendedora y el soporte siguiente.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 259.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m09-entrada-conservadora-alcista.webp",
      title: "Entrada conservadora alcista",
      caption:
        "La confirmación posterior reduce anticipación a cambio de un precio de entrada más tardío.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 260.",
      origin: "Manual aportado",
    },
  ],
  10: [
    {
      src: "/course-references/m10-funcionamiento-cripto.webp",
      title: "Qué son y cómo funcionan las criptomonedas",
      caption:
        "Introduce el activo digital y la transferencia de valor antes de estudiar custodia y mercado.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 271.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m10-monederos-digitales.webp",
      title: "Tipos de monederos digitales",
      caption:
        "Diferencia formas de custodia y prepara la evaluación de seguridad operativa.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 272.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m10-blockchain.webp",
      title: "Criptomonedas y blockchain",
      caption:
        "Separa la infraestructura de registro de la calidad económica del activo.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 274.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m10-exchanges.webp",
      title: "Principales mercados exchange",
      caption:
        "Ubica el papel del intermediario y abre la discusión de liquidez, custodia y contraparte.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 276.",
      origin: "Manual aportado",
    },
  ],
};
