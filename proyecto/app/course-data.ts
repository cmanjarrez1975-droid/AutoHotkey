export type Lesson = {
  id: string;
  module: number;
  title: string;
  duration: string;
  kind: "Teoría" | "Práctica" | "Laboratorio";
  summary: string;
  completed?: boolean;
};

export type Question = {
  id: string;
  mode: "trivia" | "assessment";
  module: number;
  difficulty: "Inicial" | "Intermedio" | "Avanzado";
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  optionFeedback: string[];
  source: string;
};

export const modules = [
  {
    id: 1,
    title: "Principales movimientos alcistas",
    subtitle: "Estructura, impulsos y patrones de continuación",
    progress: 78,
    lessons: 12,
    accent: "#20d9e7",
  },
  {
    id: 2,
    title: "Retrocesos en tendencias alcistas",
    subtitle: "Fibonacci, ubicación y velas compradoras",
    progress: 54,
    lessons: 11,
    accent: "#47e7a6",
  },
  {
    id: 3,
    title: "Movimientos tendenciales bajistas",
    subtitle: "Oferta, agotamiento y patrones de continuación",
    progress: 36,
    lessons: 10,
    accent: "#ff7a9e",
  },
  {
    id: 4,
    title: "Velas Póker",
    subtitle: "Psicología, absorción, empuje y ejecución",
    progress: 42,
    lessons: 14,
    accent: "#ffcc5c",
  },
  {
    id: 5,
    title: "Order Blocks",
    subtitle: "Origen, proyección, mitigación y confluencia",
    progress: 18,
    lessons: 8,
    accent: "#8ca9ff",
  },
  {
    id: 6,
    title: "Rutinas de trabajo",
    subtitle: "Preparación, checklist y disciplina operativa",
    progress: 10,
    lessons: 6,
    accent: "#bc8cff",
  },
  {
    id: 7,
    title: "Sistema de lectura de velas",
    subtitle: "Patrones W/M, velas profesionales y engaños",
    progress: 8,
    lessons: 15,
    accent: "#20d9e7",
  },
  {
    id: 8,
    title: "Medias 30/75",
    subtitle: "Sesgo tendencial y estrategias de alta rentabilidad",
    progress: 0,
    lessons: 9,
    accent: "#47e7a6",
  },
  {
    id: 9,
    title: "Canal Donchian",
    subtitle: "Termómetro diario, contexto y tipo de sesión",
    progress: 0,
    lessons: 7,
    accent: "#ffcc5c",
  },
  {
    id: 10,
    title: "Conociendo criptomonedas",
    subtitle: "Blockchain, custodia, mercados y riesgos operativos",
    progress: 0,
    lessons: 8,
    accent: "#8ca9ff",
  },
];

export const featuredLessons: Lesson[] = [
  {
    id: "m1-l1",
    module: 1,
    title: "Cómo leer una tendencia alcista",
    duration: "18 min",
    kind: "Teoría",
    summary:
      "Distingue máximos y mínimos crecientes, ubica el impulso dominante y evita confundir una pausa con un cambio de tendencia.",
    completed: true,
  },
  {
    id: "m1-l2",
    module: 1,
    title: "Patrones de continuación",
    duration: "24 min",
    kind: "Práctica",
    summary:
      "Reconoce la reanudación del movimiento después de un retroceso y relaciona la estructura con la ubicación.",
    completed: true,
  },
  {
    id: "m1-l3",
    module: 1,
    title: "Laboratorio: último máximo y mínimo",
    duration: "15 min",
    kind: "Laboratorio",
    summary:
      "Marca la estructura, define la invalidación antes de revelar la solución y recibe puntuación inmediata.",
  },
  {
    id: "m4-l1",
    module: 4,
    title: "Anatomía de la Vela Póker",
    duration: "21 min",
    kind: "Teoría",
    summary:
      "Separa intención, absorción y ubicación. Una vela amplia no tiene el mismo valor en mitad del rango que en un extremo.",
  },
  {
    id: "m7-l4",
    module: 7,
    title: "Variantes W1, W2 y W3",
    duration: "27 min",
    kind: "Práctica",
    summary:
      "Diferencia suelo técnico, barrido de liquidez y fortaleza de demanda antes de buscar el gatillo.",
  },
];

export type CourseClass = {
  id: string;
  module: number;
  title: string;
  source: string;
  status: "Revisada y vinculada";
};

const classGroups = [
  {
    module: 1,
    source: "Transcripciones_Curso_Estrategias_Trading(2).docx",
    titles: [
      "Introducción al método",
      "Introducción y lectura inicial",
      "Tipos de tendencia alcista — primera parte",
      "Tipos de tendencia alcista — segunda parte",
      "Práctica de estructura — clase 1",
      "Práctica de estructura — clase 2",
      "Tendencia alcista — clase teórica",
      "Tendencia alcista — práctica parte 1",
      "Tendencia alcista — práctica parte 2",
    ],
  },
  {
    module: 3,
    source: "Transcripciones_Curso_Estrategias_Trading(2).docx",
    titles: [
      "Tendencia bajista — teoría parte 1",
      "Tendencia bajista — teoría parte 2",
      "Tendencia bajista — práctica parte 1",
      "Tendencia bajista — práctica parte 2",
      "Tendencia bajista — práctica parte 3",
    ],
  },
  {
    module: 5,
    source: "Transcripciones_Modulos_5_6_7_Curso_Trading(2).docx",
    titles: [
      "Qué son los Order Blocks",
      "Operativa práctica con Order Block",
      "Velas Póker + Order Block",
      "Order Block — ejercicio práctico 1",
      "Order Block — ejercicio práctico 2",
      "Order Block — visión del mercado",
    ],
  },
  {
    module: 5,
    source: "Transcripciones_Curso_Estrategias_Trading(2).docx",
    titles: ["Operativa con Order Block Nuevo"],
  },
  {
    module: 6,
    source: "Transcripciones_Modulos_5_6_7_Curso_Trading(2).docx",
    titles: ["Creando rutinas de trabajo"],
  },
  {
    module: 7,
    source: "Transcripciones_Modulos_5_6_7_Curso_Trading(2).docx",
    titles: [
      "Sistema de lectura de velas — parte 2",
      "Sistema de lectura de velas — parte 3",
      "Sistema de lectura de velas — práctica parte 1",
      "Velas compradoras — teoría parte 1",
      "Velas compradoras — teoría parte 3",
      "Velas vendedoras — clase práctica",
      "Análisis en tiempo real",
    ],
  },
  {
    module: 7,
    source: "Transcripciones_Nuevas_Modulos_7_y_8_Trading(2).docx",
    titles: [
      "Velas compradoras — parte 2",
      "Velas vendedoras — parte 1",
      "Velas vendedoras — parte 2",
      "Velas vendedoras — parte 3",
    ],
  },
  {
    module: 8,
    source: "Transcripciones_Nuevas_Modulos_7_y_8_Trading(2).docx",
    titles: [
      "Medias 30/75 — trading de alta rentabilidad",
      "Medias 30/75 — práctica parte 1",
      "Estrategias con medias — parte 2",
      "Estrategias con medias — segunda práctica",
      "Poniendo a prueba las estrategias",
    ],
  },
];

export const classCatalog: CourseClass[] = classGroups.flatMap((group) =>
  group.titles.map((title, index) => ({
    id: `C-${group.module}-${group.source.slice(0, 3)}-${index + 1}-${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`,
    module: group.module,
    title,
    source: group.source,
    status: "Revisada y vinculada" as const,
  })),
);

export const mediaItems = [
  {
    title: "Pirámide de Precisión",
    type: "Video",
    duration: "12:12",
    image: "/course-references/m01-arquitectura-top-down.webp",
    module: "Método completo",
    note: "Contexto → zona → gatillo → invalidación.",
  },
  {
    title: "Cómo los algoritmos cazan tu pánico",
    type: "Audio",
    duration: "28:29",
    image: "/course-references/m06-disciplina-sistemica.webp",
    module: "Psicología",
    note: "Liquidez, engaño y disciplina emocional.",
  },
  {
    title: "Análisis visual",
    type: "Video",
    duration: "08:28",
    image: "/course-references/m03-patrones-vendedores.webp",
    module: "Lectura de mercado",
    note: "Ubicación, contexto y lectura de intención.",
  },
  {
    title: "Estrategia Vela Póker",
    type: "Video",
    duration: "05:40",
    image: "/course-references/m04-anatomia-vela-poker.webp",
    module: "Módulo 4",
    note: "Absorción, empuje y confirmación.",
  },
  {
    title: "Market Architect Blueprint",
    type: "Presentación",
    duration: "14 láminas",
    image: "/course-references/m08-termometro-medias.webp",
    module: "Material complementario",
    note: "Arquitectura top-down y ejecución fractal.",
  },
  {
    title: "Institutional Trading Playbook",
    type: "Guía visual",
    duration: "15 láminas",
    image: "/course-references/m06-checklist-prevuelo.webp",
    module: "Material complementario",
    note: "Checklist y setup institucional.",
  },
];

export type SourceRecord = {
  id: string;
  group: "Fuente principal" | "Guía" | "Material estructurado" | "Multimedia";
  title: string;
  format: "PDF" | "DOCX" | "XLSX" | "PPTX" | "MP4" | "M4A";
  scope: string;
  modules: number[];
  role: string;
};

export const sourceRecords: SourceRecord[] = [
  {
    id: "S01",
    group: "Fuente principal",
    title: "APRENDE NUEVAS ESTRATEGIAS TRADING",
    format: "PDF",
    scope: "277 páginas · módulos 1–4, 7, 9 y 10",
    modules: [1, 2, 3, 4, 7, 9, 10],
    role: "Manual canónico, láminas, ejercicios y numeración de páginas.",
  },
  {
    id: "S02",
    group: "Fuente principal",
    title: "Transcripciones Nuevas — Módulos 7 y 8",
    format: "DOCX",
    scope: "9 clases · velas profesionales y medias 30/75",
    modules: [7, 8],
    role: "Explicaciones del profesor, ejemplos hablados y criterios de ejecución.",
  },
  {
    id: "S03",
    group: "Fuente principal",
    title: "Transcripciones — Módulos 5, 6 y 7",
    format: "DOCX",
    scope: "14 clases · Order Blocks, rutinas y velas",
    modules: [5, 6, 7],
    role: "Proceso operativo, ejercicios y correcciones frecuentes.",
  },
  {
    id: "S04",
    group: "Fuente principal",
    title: "Transcripciones del Curso Estrategias de Trading",
    format: "DOCX",
    scope: "Clases introductorias, tendencias, prácticas y Order Blocks",
    modules: [1, 2, 3, 4, 5, 7],
    role: "Base narrativa y ejemplos de clase con trazabilidad por bloque.",
  },
  {
    id: "S05",
    group: "Guía",
    title: "Protocolo Avanzado: Velas Póker y Order Blocks",
    format: "PDF",
    scope: "Integración multitemporal y protocolo institucional",
    modules: [4, 5, 7],
    role: "Confluencias, anulación, mitigación, gatillos e invalidación.",
  },
  {
    id: "S06",
    group: "Guía",
    title: "Guía Maestra: Formación W de Giro",
    format: "PDF",
    scope: "W1, W2, W3, base, engaño y ejecución 15m/3m",
    modules: [2, 7],
    role: "Diferenciación de variantes y confirmación de giros.",
  },
  {
    id: "S07",
    group: "Guía",
    title: "Guía de Estudio: Análisis Técnico y Velas Póker",
    format: "PDF",
    scope: "Cuestionario, respuestas, ensayos y glosario",
    modules: [2, 4, 5, 7, 9],
    role: "Contraste conceptual y base revisable del banco de preguntas.",
  },
  {
    id: "S08",
    group: "Guía",
    title: "Guía Maestra: Fortaleza de Demanda — Velas 1, 2 y 3",
    format: "PDF",
    scope: "Ubicación, absorción, Vela Póker y patrones W",
    modules: [4, 7],
    role: "Anatomía de velas, contraejemplos y lectura de absorción.",
  },
  {
    id: "S09",
    group: "Material estructurado",
    title: "Matriz de Velas Póker y Order Blocks",
    format: "XLSX",
    scope: "20 configuraciones comparables y 45 referencias",
    modules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    role: "Reglas de entrada, stop, objetivo, timeframe y comportamiento.",
  },
  {
    id: "S10",
    group: "Material estructurado",
    title: "Market Architect Blueprint",
    format: "PPTX",
    scope: "14 láminas visuales",
    modules: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    role: "Arquitectura top-down, liquidez, setup y ejecución fractal.",
  },
  {
    id: "S11",
    group: "Material estructurado",
    title: "Market Architect Blueprint",
    format: "PDF",
    scope: "Copia visual de 14 láminas",
    modules: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    role: "Fuente visual central para la progresión desde contexto hasta ejecución.",
  },
  {
    id: "S12",
    group: "Material estructurado",
    title: "Institutional Trading Playbook",
    format: "PDF",
    scope: "15 láminas de protocolo",
    modules: [1, 2, 3, 4, 5, 6, 7],
    role: "Fuente visual central para estructura, liquidez, confirmación y disciplina.",
  },
  {
    id: "S13",
    group: "Multimedia",
    title: "Pirámide de Precisión",
    format: "MP4",
    scope: "12:12 · contexto → zona → gatillo → invalidación",
    modules: [1, 2, 6, 8, 9],
    role: "Refuerzo audiovisual del orden de análisis.",
  },
  {
    id: "S14",
    group: "Multimedia",
    title: "Cómo los algoritmos cazan tu pánico",
    format: "M4A",
    scope: "28:29 · liquidez y disciplina emocional",
    modules: [6, 7],
    role: "Sesgos de ejecución, FOMO y respuesta ante engaños.",
  },
  {
    id: "S15",
    group: "Multimedia",
    title: "Análisis Visual",
    format: "MP4",
    scope: "08:28 · lectura de contexto",
    modules: [1, 2, 3, 7, 9],
    role: "Demostración de ubicación, estructura y confirmación.",
  },
  {
    id: "S16",
    group: "Multimedia",
    title: "Estrategia Vela Póker",
    format: "MP4",
    scope: "05:40 · absorción, empuje y entrada",
    modules: [4, 5, 7],
    role: "Demostración audiovisual de la estrategia central.",
  },
  {
    id: "S17",
    group: "Guía",
    title: "Domino de Tendencias Alcistas y Estructura del Mercado Profesional",
    format: "PDF",
    scope: "Resumen avanzado · tipos de tendencia, continuación y agotamiento",
    modules: [1],
    role: "Profundización editorial desde estructura básica hasta patrones de engaño.",
  },
  {
    id: "S18",
    group: "Guía",
    title: "Estrategias de Retroceso en Tendencias Alcistas",
    format: "PDF",
    scope: "Resumen avanzado · retrocesos 1, 2 y 3",
    modules: [2],
    role: "Clasificación por profundidad, fase y microtendencia.",
  },
  {
    id: "S19",
    group: "Guía",
    title: "Estrategias y Estructuras de la Tendencia Bajista Profesional",
    format: "PDF",
    scope: "Resumen avanzado · cuatro estructuras y trampas de continuación",
    modules: [3],
    role: "Lectura progresiva de oferta, retroceso, agotamiento e invalidación.",
  },
  {
    id: "S20",
    group: "Guía",
    title: "Velas Póker: El Empuje de la Decisión Institucional",
    format: "PDF",
    scope: "Resumen avanzado · anatomía, ubicación y confirmación",
    modules: [4, 7],
    role: "Fundamenta cuerpo, mecha, absorción y vela de decisión.",
  },
  {
    id: "S21",
    group: "Guía",
    title: "Huella Institucional: Manual de los Order Blocks",
    format: "PDF",
    scope: "Resumen avanzado · origen, ineficiencia, mitigación y cierre",
    modules: [5],
    role: "Amplía el ciclo operativo y la delimitación geométrica del bloque.",
  },
  {
    id: "S22",
    group: "Guía",
    title: "Guía Estratégica de Velas Profesionales y Operativa Institucional",
    format: "PDF",
    scope: "Resumen avanzado · velas 1-4 y sincronización 15m/3m",
    modules: [4, 7],
    role: "Integra clasificación, factor tiempo, contexto y ejecución.",
  },
  {
    id: "S23",
    group: "Material estructurado",
    title: "El Plano Institucional",
    format: "PPTX",
    scope: "15 láminas originales · Order Blocks y protocolo",
    modules: [2, 4, 5, 6],
    role: "Referencia visual principal para geometría, ciclo, Fibonacci y disciplina.",
  },
  {
    id: "S24",
    group: "Material estructurado",
    title: "Institutional Precision Blueprint",
    format: "PPTX",
    scope: "11 láminas originales · regla del tiempo y sincronización",
    modules: [4, 6, 7],
    role: "Referencia visual para lectura de los últimos minutos y ejecución temporal.",
  },
  {
    id: "S25",
    group: "Material estructurado",
    title: "Market Geometry Blueprint",
    format: "PPTX",
    scope: "9 láminas originales · rangos, POC y transición",
    modules: [2, 5],
    role: "Referencia visual para zonas de control y cambio de función.",
  },
  {
    id: "S26",
    group: "Material estructurado",
    title: "Anatomía del Engaño Institucional",
    format: "PPTX",
    scope: "12 láminas originales · velas, liquidez y variantes",
    modules: [1, 3, 7],
    role: "Referencia visual para trampas de continuación, barridos y rechazos.",
  },
];

export const sourceCatalog = [
  {
    group: "Fuente principal",
    count: sourceRecords.filter((source) => source.group === "Fuente principal").length,
    items: "Manual de 277 páginas y tres compilaciones de transcripciones.",
  },
  {
    group: "Guías de profundización",
    count: sourceRecords.filter((source) => source.group === "Guía").length,
    items: "Diez guías y resúmenes: tendencias, retrocesos, Velas Póker, Order Blocks y formación W.",
  },
  {
    group: "Material estructurado",
    count: sourceRecords.filter((source) => source.group === "Material estructurado").length,
    items: "Matriz de estrategias, cinco presentaciones, Blueprint y Playbook institucional.",
  },
  {
    group: "Audio y video",
    count: sourceRecords.filter((source) => source.group === "Multimedia").length,
    items: "Tres videos y un audio complementario, vinculados por módulo.",
  },
];

type Concept = {
  name: string;
  module: number;
  definition: string;
  clue: string;
  mistake: string;
  source: string;
};

const concepts: Concept[] = [
  {
    name: "Estructura alcista",
    module: 1,
    definition: "Secuencia de máximos y mínimos estructurales crecientes.",
    clue: "el último mínimo relevante se mantiene y el precio supera el máximo previo",
    mistake: "decidir por el color de una sola vela",
    source: "Manual principal, módulo 1, pp. 9–34",
  },
  {
    name: "Estructura bajista",
    module: 3,
    definition: "Secuencia de máximos y mínimos estructurales decrecientes.",
    clue: "los retrocesos fallan por debajo del máximo anterior y se crean nuevos mínimos",
    mistake: "comprar solo porque el precio ya cayó mucho",
    source: "Manual principal, módulo 3, pp. 56–74",
  },
  {
    name: "Impulso",
    module: 1,
    definition: "Tramo direccional que desplaza el precio y rompe una referencia estructural.",
    clue: "el movimiento avanza con decisión y supera el último extremo",
    mistake: "llamar impulso a cualquier vela grande aislada",
    source: "Manual principal, módulos 1–3",
  },
  {
    name: "Retroceso",
    module: 2,
    definition: "Corrección temporal contra el impulso que no invalida todavía la estructura.",
    clue: "el precio corrige hacia 38%, 50% o 61,8% sin perder el mínimo estructural",
    mistake: "asumir que toda corrección es un giro completo",
    source: "Manual principal, módulo 2, pp. 35–55",
  },
  {
    name: "Invalidación",
    module: 1,
    definition: "Nivel cuya ruptura demuestra que la hipótesis de lectura dejó de ser válida.",
    clue: "el precio atraviesa el extremo que debía sostener la estructura",
    mistake: "mover el stop para evitar aceptar que la lectura falló",
    source: "Transcripciones y prácticas de estructura",
  },
  {
    name: "Vela Póker",
    module: 4,
    definition: "Vela de cuerpo amplio y cierre decidido que revela control de un bando.",
    clue: "el cuerpo domina el rango y casi no hay mecha en la dirección del cierre",
    mistake: "operarla en tierra de nadie sin contexto",
    source: "Manual principal, módulo 4, pp. 75–111",
  },
  {
    name: "Absorción",
    module: 4,
    definition: "Proceso por el que la presión contraria es recibida y rechazada en una zona.",
    clue: "una vela que parecía direccional se retrae y deja una mecha larga",
    mistake: "confundir toda mecha con absorción institucional",
    source: "Guía de Velas Póker y Blueprint, lámina 6",
  },
  {
    name: "Vela tipo 1",
    module: 7,
    definition: "Cuerpo grande y poco pabilo que, en soporte, puede actuar como frenada inicial.",
    clue: "una vela aparentemente muy bajista termina justo en soporte relevante",
    mistake: "venderla automáticamente sin considerar ubicación",
    source: "Guía Maestra Velas Tipo 1, 2 y 3",
  },
  {
    name: "Vela tipo 2",
    module: 7,
    definition: "Vela con rechazo intermedio que evidencia el contraataque de la demanda.",
    clue: "aparece una mecha inferior clara y el cierre se aleja de mínimos",
    mistake: "entrar antes de que termine de mostrar rechazo",
    source: "Guía Maestra Velas Tipo 1, 2 y 3",
  },
  {
    name: "Vela tipo 3",
    module: 7,
    definition: "Martillo de mecha amplia que refleja una absorción rápida y violenta.",
    clue: "la oferta es rechazada y queda un pabilo inferior muy largo",
    mistake: "tratar un martillo en mitad del rango como señal suficiente",
    source: "Guía Maestra Velas Tipo 1, 2 y 3",
  },
  {
    name: "W1",
    module: 7,
    definition: "Doble suelo con dos mínimos aproximadamente al mismo nivel.",
    clue: "el segundo mínimo testea el primero sin barrerlo de forma relevante",
    mistake: "entrar antes de superar la base o máximo central",
    source: "Guía Maestra Formación W",
  },
  {
    name: "W2",
    module: 7,
    definition: "Patrón W cuyo segundo mínimo barre al primero y recupera el nivel.",
    clue: "se ejecutan stops bajo el primer suelo antes de un giro rápido",
    mistake: "interpretar el barrido como continuación bajista sin esperar recuperación",
    source: "Guía Maestra Formación W",
  },
  {
    name: "W3",
    module: 7,
    definition: "Patrón W con segundo mínimo más alto, señal de urgencia compradora.",
    clue: "la demanda no permite que el precio vuelva al mínimo anterior",
    mistake: "confundir cualquier mínimo más alto con confirmación completa",
    source: "Guía Maestra Formación W",
  },
  {
    name: "Order Block",
    module: 5,
    definition: "Zona de origen de un desplazamiento fuerte asociada a órdenes pendientes.",
    clue: "el precio regresa a la última zona contraria antes del empuje",
    mistake: "seguir usándolo igual después de una mitigación completa",
    source: "Protocolo Velas Póker y Order Blocks",
  },
  {
    name: "Mitigación",
    module: 5,
    definition: "Visita del precio al Order Block para completar o absorber órdenes remanentes.",
    clue: "el precio toca la zona proyectada y reacciona desde ella",
    mistake: "considerar el bloque intacto después de ser consumido",
    source: "Blueprint, lámina 4",
  },
  {
    name: "Zona 230",
    module: 2,
    definition: "Extensión de Fibonacci asociada a un movimiento muy dilatado y posible agotamiento.",
    clue: "el precio llega a un extremo proyectado tras varios impulsos",
    mistake: "operar el nivel sin señal de absorción o estructura",
    source: "Manual y Guía de Estudio, glosario",
  },
  {
    name: "Canal Donchian",
    module: 9,
    definition: "Termómetro de contexto que ayuda a filtrar el sesgo y el tipo de sesión.",
    clue: "la ubicación respecto de la zona media condiciona qué dirección priorizar",
    mistake: "usarlo como gatillo de entrada aislado",
    source: "Guía de Estudio y matriz de estrategias",
  },
  {
    name: "Medias 30/75",
    module: 8,
    definition: "Referencias dinámicas para evaluar sesgo, alineación y retrocesos táctiles.",
    clue: "precio y medias mantienen inclinación y separación coherentes",
    mistake: "operar cada cruce sin contexto estructural",
    source: "Transcripciones, módulo 8",
  },
  {
    name: "POC",
    module: 5,
    definition: "Nivel de mayor negociación dentro de un rango y referencia de equilibrio.",
    clue: "el precio acepta volumen alrededor de una zona media antes de expandirse",
    mistake: "confundir equilibrio con dirección confirmada",
    source: "Matriz de estrategias y Blueprint, lámina 5",
  },
  {
    name: "Sincronía 15m/3m",
    module: 7,
    definition: "Uso de 15 minutos para contexto y de 3 o 1 minuto para ejecutar el gatillo.",
    clue: "la macroseñal aparece en 15m y la microestructura define una entrada precisa",
    mistake: "dejar que el marco menor contradiga el contexto sin reevaluarlo",
    source: "Blueprint, lámina 9 y transcripciones, módulo 7",
  },
  {
    name: "Blockchain",
    module: 10,
    definition:
      "Registro distribuido donde las transacciones se agrupan y enlazan criptográficamente.",
    clue:
      "la red valida transferencias sin depender de un único registro central",
    mistake:
      "asumir que todas las cadenas tienen el mismo nivel de descentralización y seguridad",
    source: "Manual principal, módulo 10, pp. 269–277",
  },
  {
    name: "Custodia de criptoactivos",
    module: 10,
    definition:
      "Responsabilidad de proteger las claves que permiten autorizar movimientos de los activos.",
    clue:
      "la pérdida o exposición de la clave privada puede impedir recuperar los fondos",
    mistake:
      "confundir una dirección pública con una contraseña o compartir la frase semilla",
    source: "Manual principal, módulo 10, pp. 271–272",
  },
  {
    name: "Liquidez en exchange",
    module: 10,
    definition:
      "Capacidad de ejecutar una orden sin provocar una variación desproporcionada del precio.",
    clue:
      "el libro muestra profundidad suficiente y un spread reducido para el tamaño previsto",
    mistake:
      "usar el mismo tamaño en un activo líquido y en una altcoin con poco volumen",
    source: "Manual principal, módulo 10, pp. 273–276; elaboración editorial",
  },
  {
    name: "Riesgo de apalancamiento cripto",
    module: 10,
    definition:
      "Amplificación de ganancias y pérdidas mediante una exposición superior al margen aportado.",
    clue:
      "un movimiento porcentual pequeño puede consumir gran parte del margen disponible",
    mistake:
      "calcular la posición por el margen requerido y no por la pérdida máxima aceptable",
    source: "Manual principal, módulo 10, pp. 275–276; elaboración editorial de riesgo",
  },
];

const moduleDistractors: Record<number, string[]> = {
  1: [
    "La tendencia queda confirmada por una sola vela amplia aunque no rompa estructura",
    "El último mínimo puede ignorarse si la pendiente visual continúa siendo positiva",
    "El tercer impulso es siempre la entrada más segura porque confirma dirección",
    "Toda pausa lateral debe clasificarse como continuación alcista",
  ],
  2: [
    "El nivel 61,8% activa una compra aunque el impulso medido sea secundario",
    "Un retroceso profundo conserva la tendencia incluso después de perder su origen",
    "Fibonacci determina el giro sin necesidad de reacción o confirmación",
    "El stop debe acercarse al nivel para conservar artificialmente un R/R alto",
  ],
  3: [
    "Una caída extendida sobre soporte ofrece mejor venta porque aumenta la velocidad",
    "Cualquier mecha inferior invalida inmediatamente toda estructura bajista",
    "La ruptura por mecha equivale a aceptación definitiva bajo soporte",
    "El sesgo vendedor se mantiene aunque el precio recupere el máximo estructural",
  ],
  4: [
    "Una vela activa puede clasificarse definitivamente antes de su cierre",
    "El cuerpo grande prueba intención institucional sin importar la ubicación",
    "Toda mecha extensa representa absorción suficiente para ejecutar",
    "La Vela Póker sustituye la necesidad de estructura e invalidación",
  ],
  5: [
    "Cualquier vela anterior a un impulso puede marcarse como Order Block",
    "Cada nueva visita aumenta la frescura y fortaleza del bloque",
    "El simple contacto con la zona confirma que existen órdenes pendientes",
    "El bloque opuesto debe alcanzarse aunque existan obstáculos intermedios",
  ],
  6: [
    "Una operación ganadora valida el proceso aunque haya violado el checklist",
    "Perseguir el precio es correcto si la oportunidad parece excepcional",
    "Mover el stop evita que una buena lectura sea invalidada por el ruido",
    "Una sola pérdida justifica sustituir inmediatamente todas las reglas",
  ],
  7: [
    "Dos mínimos visibles completan una W aunque la base no se recupere",
    "El barrido de una W2 confirma el giro antes de cualquier recuperación",
    "El gráfico de 1m puede crear contexto aunque el marco de 15m no tenga zona",
    "La forma prevista puede operarse aunque la vela siga activa",
  ],
  8: [
    "Todo cruce de EMA 30 y 75 inicia un régimen tendencial negociable",
    "Cuanto mayor sea la distancia del precio a las medias, mejor es la entrada",
    "El contacto con una media reemplaza la confirmación estructural",
    "Un backtest solo necesita capturas donde la estrategia funcionó",
  ],
  9: [
    "Tocar una banda de Donchian activa automáticamente una operación contraria",
    "La compresión revela por adelantado la dirección de la ruptura",
    "La zona media puede ignorarse si una vela tiene suficiente tamaño",
    "Los mismos parámetros funcionan igual en cualquier activo y temporalidad",
  ],
  10: [
    "El margen requerido define por sí solo la pérdida máxima de una posición",
    "La misma figura admite igual tamaño en BTC y en una altcoin ilíquida",
    "La frase semilla puede compartirse si la plataforma parece confiable",
    "Spread, deslizamiento y funding no afectan una lectura técnica correcta",
  ],
};

function rotateOptions(correctText: string, seed: number, module: number) {
  const distractors = moduleDistractors[module] ?? moduleDistractors[1];
  const wrong = [
    distractors[seed % distractors.length],
    distractors[(seed + 1) % distractors.length],
    distractors[(seed + 2) % distractors.length],
  ];
  const correct = seed % 4;
  const options = [...wrong];
  options.splice(correct, 0, correctText);
  return { options, correct };
}

const conceptTriviaQuestions: Question[] = concepts.flatMap((concept, index) => {
  const variants = [
    {
      prompt: `¿Qué describe mejor el concepto “${concept.name}”?`,
      answer: concept.definition,
      explanation: `${concept.name}: ${concept.definition} La ubicación y la confirmación siguen siendo necesarias.`,
    },
    {
      prompt: `Al observar que ${concept.clue}, ¿qué lectura es la más coherente?`,
      answer: `Evaluar ${concept.name} y confirmar sus condiciones antes de ejecutar.`,
      explanation: `La pista corresponde a ${concept.name}. El ejercicio exige reconocerla sin convertirla en una entrada automática.`,
    },
    {
      prompt: `¿Qué error debe evitarse al trabajar con ${concept.name}?`,
      answer: `Evitar ${concept.mistake}.`,
      explanation: `El error frecuente es ${concept.mistake}. La regla del curso prioriza contexto, ubicación e invalidación.`,
    },
  ];

  return variants.map((variant, variantIndex) => {
    const seed = index * 3 + variantIndex;
    const arranged = rotateOptions(variant.answer, seed, concept.module);
    return {
      id: `T-${String(seed + 1).padStart(3, "0")}`,
      mode: "trivia" as const,
      module: concept.module,
      difficulty:
        variantIndex === 0
          ? ("Inicial" as const)
          : variantIndex === 1
            ? ("Intermedio" as const)
            : ("Avanzado" as const),
      prompt: variant.prompt,
      options: arranged.options,
      correct: arranged.correct,
      explanation: variant.explanation,
      optionFeedback: arranged.options.map((option, optionIndex) =>
        optionIndex === arranged.correct
          ? `Correcto. ${variant.explanation}`
          : `No es correcto: “${option}” elimina el contexto técnico. ${variant.explanation}`,
      ),
      source: concept.source,
    };
  });
});

const moduleFacts = [
  {
    module: 1,
    source: "Manual principal, módulo 1, pp. 9–34",
    facts: [
      "Un mínimo estructural es el origen defendido del desplazamiento que rompió una referencia.",
      "Impulso y retroceso se distinguen por su función, no por contar velas verdes o rojas.",
      "Una continuación necesita ubicación y espacio antes del siguiente obstáculo.",
      "La pérdida del mínimo defendido invalida la hipótesis alcista.",
    ],
  },
  {
    module: 2,
    source: "Manual principal, módulo 2, pp. 35–55",
    facts: [
      "Fibonacci debe anclarse al impulso que produjo la ruptura estructural.",
      "Tocar 61,8% no confirma compra sin respuesta de la demanda.",
      "Un retroceso profundo puede crear una microtendencia que debe terminar antes de entrar.",
      "La entrada se descarta si el origen del impulso deja de sostenerse.",
    ],
  },
  {
    module: 3,
    source: "Manual principal, módulo 3, pp. 56–74",
    facts: [
      "La estructura bajista conserva máximos y mínimos relevantes decrecientes.",
      "La venta se busca en retroceso o pullback, no sobre un soporte inmediato.",
      "Agotamiento significa dejar de perseguir ventas, no comprar automáticamente.",
      "En futuros, distancia al stop y valor del tick determinan el riesgo monetario.",
    ],
  },
  {
    module: 4,
    source: "Manual principal, módulo 4, pp. 75–111",
    facts: [
      "La Vela Póker necesita contexto; un cuerpo amplio aislado no basta.",
      "El cuerpo expresa determinación y la mecha puede revelar absorción.",
      "El marco menor permite reconstruir el proceso interno de la vela mayor.",
      "La invalidación se vincula con el extremo de absorción o la zona defendida.",
    ],
  },
  {
    module: 5,
    source: "Protocolo Avanzado de Order Blocks",
    facts: [
      "Un Order Block exige desplazamiento y consecuencia estructural posterior.",
      "La primera mitigación suele conservar más información que visitas repetidas.",
      "Los límites se fijan antes de observar la reacción para evitar sesgo retrospectivo.",
      "Un cierre aceptado fuera del bloque puede indicar consumo o anulación.",
    ],
  },
  {
    module: 6,
    source: "Transcripciones del módulo 6 y Playbook institucional",
    facts: [
      "La rutina define escenarios y riesgo antes de que aparezca la oportunidad.",
      "Cada punto del checklist debe poder verificarse sobre el gráfico.",
      "Una no-operación correcta cuenta como cumplimiento del plan.",
      "La revisión separa resultado financiero de calidad de ejecución.",
    ],
  },
  {
    module: 7,
    source: "Manual pp. 112–212 y Guías W / Velas 1–3",
    facts: [
      "W1 iguala mínimos, W2 barre el primero y W3 deja un mínimo más alto.",
      "Una vela activa puede cambiar de anatomía antes del cierre.",
      "El patrón gana valor en soporte, resistencia o un extremo relevante.",
      "El contexto de 15m y el gatillo de 3m deben ser coherentes.",
    ],
  },
  {
    module: 8,
    source: "Transcripciones del módulo 8",
    facts: [
      "Pendiente, orden y separación de medias ayudan a clasificar el régimen.",
      "Cruces repetidos dentro de una pauta plana indican falta de tendencia.",
      "El rebote en EMA 30 o 75 necesita estructura y confirmación.",
      "El stop se adapta a estructura y volatilidad, no a una distancia fija.",
    ],
  },
  {
    module: 9,
    source: "Manual principal, módulo 9, pp. 213–268",
    facts: [
      "Donchian representa máximo, mínimo y centro del periodo seleccionado.",
      "La compresión prepara una expansión, pero no anticipa su dirección.",
      "En tendencia el precio puede caminar por una banda durante varios periodos.",
      "Una ruptura válida requiere aceptación o un pullback coherente.",
    ],
  },
  {
    module: 10,
    source: "Manual principal, módulo 10, pp. 269–277",
    facts: [
      "Blockchain describe una infraestructura de registro, no una garantía de valor.",
      "La frase semilla permite controlar fondos y nunca debe compartirse.",
      "En derivados, el margen requerido no equivale a la pérdida máxima.",
      "Spread, profundidad y deslizamiento modifican el riesgo ejecutable.",
    ],
  },
];

const moduleTriviaQuestions: Question[] = moduleFacts.flatMap((module) =>
  module.facts.flatMap((fact, factIndex) => {
    const baseSeed = module.module * 100 + factIndex * 2;
    const recognition = rotateOptions(fact, baseSeed, module.module);
    const applicationAnswer =
      "Comprobar la evidencia descrita y relacionarla con contexto, invalidación y riesgo.";
    const application = rotateOptions(
      applicationAnswer,
      baseSeed + 1,
      module.module,
    );
    return [
      {
        id: `TM-${module.module}-${factIndex + 1}-A`,
        mode: "trivia" as const,
        module: module.module,
        difficulty: "Inicial" as const,
        prompt: `Módulo ${module.module}: ¿cuál de estas reglas forma parte del método?`,
        options: recognition.options,
        correct: recognition.correct,
        explanation: fact,
        optionFeedback: recognition.options.map((option, optionIndex) =>
          optionIndex === recognition.correct
            ? `Correcto. ${fact}`
            : `Incorrecto. “${option}” no sustituye la regla verificable: ${fact}`,
        ),
        source: module.source,
      },
      {
        id: `TM-${module.module}-${factIndex + 1}-B`,
        mode: "trivia" as const,
        module: module.module,
        difficulty: "Intermedio" as const,
        prompt: `Si observas esta condición —${fact}—, ¿qué acción de estudio es coherente?`,
        options: application.options,
        correct: application.correct,
        explanation:
          "La regla debe comprobarse dentro de una secuencia completa; reconocerla no autoriza una entrada automática.",
        optionFeedback: application.options.map((option, optionIndex) =>
          optionIndex === application.correct
            ? "Correcto. La evidencia se integra con contexto, invalidación y riesgo."
            : `Incorrecto. “${option}” omite una parte verificable del proceso.`,
        ),
        source: module.source,
      },
    ];
  }),
);

export const triviaQuestions: Question[] = [
  ...conceptTriviaQuestions,
  ...moduleTriviaQuestions,
];

type Scenario = {
  module: number;
  setup: string;
  diagnosis: string;
  action: string;
  invalidation: string;
  source: string;
};

const scenarios: Scenario[] = [
  {
    module: 1,
    setup: "El precio conserva un mínimo creciente y rompe el último máximo con desplazamiento.",
    diagnosis: "Continuación de estructura alcista",
    action: "Esperar retroceso y confirmación compradora",
    invalidation: "Pérdida del último mínimo estructural",
    source: "Manual, módulo 1",
  },
  {
    module: 1,
    setup: "El gráfico está muy ampliado y una vela roja parece cambiar toda la tendencia.",
    diagnosis: "Posible sesgo por falta de perspectiva",
    action: "Alejar el gráfico y volver a marcar extremos",
    invalidation: "Solo existe si se pierde la referencia estructural",
    source: "Transcripciones, módulo 7, velas compradoras parte 2",
  },
  {
    module: 2,
    setup: "Tras un primer impulso alcista, el precio corrige al 50% y aparece rechazo comprador.",
    diagnosis: "Retroceso táctico dentro de tendencia",
    action: "Buscar gatillo en marco menor",
    invalidation: "Ruptura del mínimo del retroceso",
    source: "Manual, módulo 2",
  },
  {
    module: 2,
    setup: "El precio alcanza la extensión 230 después de un tercer impulso muy dilatado.",
    diagnosis: "Zona potencial de agotamiento",
    action: "Esperar absorción y patrón de giro",
    invalidation: "Continuación aceptada por encima del extremo",
    source: "Manual y Guía de Estudio",
  },
  {
    module: 3,
    setup: "Máximos decrecientes, ruptura de soporte y pullback fallido al nivel perdido.",
    diagnosis: "Continuación bajista",
    action: "Buscar confirmación vendedora en el pullback",
    invalidation: "Recuperación del máximo del retroceso",
    source: "Manual, módulo 3",
  },
  {
    module: 3,
    setup: "Después de una caída extensa aparece un martillo aislado en mitad del rango.",
    diagnosis: "Señal insuficiente sin ubicación extrema",
    action: "No operar; esperar zona y estructura",
    invalidation: "No aplica hasta que exista hipótesis válida",
    source: "Guía Maestra Velas Tipo 1, 2 y 3",
  },
  {
    module: 4,
    setup: "En soporte aparece rechazo y luego una vela alcista amplia que cierra en máximos.",
    diagnosis: "Absorción seguida de Vela Póker",
    action: "Buscar ruptura de base o pullback controlado",
    invalidation: "Pérdida del mínimo de absorción",
    source: "Manual, módulo 4",
  },
  {
    module: 4,
    setup: "Una vela de cuerpo amplio aparece en el centro de una pauta plana.",
    diagnosis: "Vela de decisión sin ventaja de ubicación",
    action: "Esperar ruptura y aceptación fuera del rango",
    invalidation: "Retorno y aceptación dentro del rango",
    source: "Guía de Estudio",
  },
  {
    module: 5,
    setup: "El precio regresa por primera vez al origen de un fuerte empuje alcista.",
    diagnosis: "Mitigación potencial de Order Block",
    action: "Esperar reacción y confirmación",
    invalidation: "Consumo completo y cierre debajo del bloque",
    source: "Protocolo de Order Blocks",
  },
  {
    module: 5,
    setup: "Un Order Block ya fue atravesado y mitigado por completo.",
    diagnosis: "Bloque consumido",
    action: "Dejar de tratarlo como zona intacta",
    invalidation: "No corresponde reutilizarlo como señal primaria",
    source: "Blueprint, lámina 4",
  },
  {
    module: 6,
    setup: "El estudiante identifica la oportunidad después de que el precio ya avanzó una hora.",
    diagnosis: "Riesgo de FOMO y persecución",
    action: "Quitar las manos del teclado y esperar un nuevo escenario",
    invalidation: "La operación se descarta si no hay entrada planificada",
    source: "Transcripciones, módulo 7",
  },
  {
    module: 6,
    setup: "La entrada tiene R/R 0,8 y exige colocar el stop dentro del ruido normal.",
    diagnosis: "Plan asimétrico y stop técnicamente débil",
    action: "Descartar o rediseñar la entrada",
    invalidation: "Debe estar donde la tesis deja de ser válida",
    source: "Prácticas y calculadora R/R",
  },
  {
    module: 7,
    setup: "El segundo mínimo barre al primero, recupera rápido y rompe el máximo central.",
    diagnosis: "W2 con engaño de liquidez",
    action: "Evaluar entrada en ruptura o pullback de la base",
    invalidation: "Pérdida del mínimo del barrido",
    source: "Guía Maestra Formación W",
  },
  {
    module: 7,
    setup: "El segundo mínimo queda por encima del primero y la ruptura muestra urgencia.",
    diagnosis: "W3 con fortaleza de demanda",
    action: "Confirmar ruptura del máximo central",
    invalidation: "Pérdida del segundo mínimo",
    source: "Guía Maestra Formación W",
  },
  {
    module: 7,
    setup: "La vela de 15m muestra absorción en soporte y en 3m se forma una W.",
    diagnosis: "Sincronía macroseñal y microgatillo",
    action: "Ejecutar solo tras confirmación de base",
    invalidation: "Mínimo de la absorción en 3m",
    source: "Blueprint, lámina 9",
  },
  {
    module: 7,
    setup: "Quedan 10 minutos para el cierre y una vela roja sigue bajando contra soporte.",
    diagnosis: "Vela activa todavía sin confirmación",
    action: "Esperar; puede producirse absorción en los últimos minutos",
    invalidation: "Se confirma presión si cierra y continúa sin rechazo",
    source: "Blueprint, lámina 12",
  },
  {
    module: 8,
    setup: "Precio, EMA 30 y EMA 75 suben alineados; el retroceso respeta la EMA 30.",
    diagnosis: "Sesgo tendencial alcista",
    action: "Priorizar configuraciones compradoras",
    invalidation: "Pérdida de estructura y desalineación de medias",
    source: "Transcripciones, módulo 8",
  },
  {
    module: 8,
    setup: "Las medias se cruzan repetidamente dentro de un rango estrecho.",
    diagnosis: "Pauta plana sin sesgo confiable",
    action: "Evitar operar cruces aislados",
    invalidation: "Esperar expansión y aceptación fuera del rango",
    source: "Matriz de estrategias",
  },
  {
    module: 9,
    setup: "El precio está bajo la zona media de Donchian y el marco diario mantiene sesgo bajista.",
    diagnosis: "Termómetro diario bajista",
    action: "Priorizar ventas con gatillo válido",
    invalidation: "Recuperación estructural sobre la zona media",
    source: "Guía de Estudio y Blueprint, lámina 3",
  },
  {
    module: 9,
    setup: "El precio toca la banda inferior de Donchian pero no muestra absorción ni patrón.",
    diagnosis: "Ubicación sin confirmación",
    action: "Esperar evidencia de demanda",
    invalidation: "No existe tesis de compra todavía",
    source: "Matriz de estrategias",
  },
  {
    module: 10,
    setup:
      "BTCUSDT tiene libro profundo y spread reducido, pero una altcoin replica el patrón con poco volumen y gran deslizamiento.",
    diagnosis: "Misma forma técnica con riesgo de ejecución diferente",
    action: "Reducir tamaño o descartar el activo con liquidez insuficiente",
    invalidation:
      "La operación deja de ser aceptable cuando el deslizamiento altera el riesgo previsto",
    source: "Manual, módulo 10, pp. 273–276; matriz de estrategias",
  },
  {
    module: 10,
    setup:
      "Una posición apalancada usa poco margen, pero el stop técnico implica perder 4% de la cuenta.",
    diagnosis: "Tamaño incompatible con el riesgo máximo",
    action: "Calcular la posición desde la distancia al stop y el riesgo permitido",
    invalidation:
      "Se descarta si el contrato mínimo todavía supera la pérdida aceptable",
    source: "Manual, módulo 10; elaboración editorial de gestión de riesgo",
  },
  {
    module: 1,
    setup:
      "El precio rompe un máximo, pero el objetivo queda directamente contra una resistencia diaria.",
    diagnosis: "Estructura válida con ubicación operativa deficiente",
    action: "Esperar mejor entrada o descartar por falta de espacio",
    invalidation: "Pérdida del mínimo estructural que originó la ruptura",
    source: "Manual, módulo 1, pp. 9–34",
  },
  {
    module: 2,
    setup:
      "El Fibonacci está trazado sobre una oscilación menor que no produjo ruptura.",
    diagnosis: "Anclaje no representativo del impulso dominante",
    action: "Volver a medir desde el origen del desplazamiento estructural",
    invalidation: "Pérdida del origen del impulso correcto",
    source: "Manual, módulo 2, pp. 35–55",
  },
  {
    module: 3,
    setup:
      "La tercera vela bajista extendida llega a soporte después de dos impulsos.",
    diagnosis: "Venta tardía con posible agotamiento",
    action: "No perseguir; observar absorción o esperar un retroceso",
    invalidation: "No existe nueva venta válida sin un pullback definido",
    source: "Manual, módulo 3, pp. 56–74",
  },
  {
    module: 4,
    setup:
      "Una Vela Póker alcista aparece después de absorción, pero su stop queda dentro de la mecha.",
    diagnosis: "Gatillo correcto con invalidación técnicamente frágil",
    action: "Reubicar el stop bajo el extremo o reducir tamaño",
    invalidation: "Pérdida del mínimo de la absorción",
    source: "Manual, módulo 4; Protocolo Avanzado",
  },
  {
    module: 5,
    setup:
      "El precio visita por tercera vez un Order Block y cada reacción es menor.",
    diagnosis: "Bloque progresivamente consumido",
    action: "Reducir confianza y exigir confirmación adicional o descartar",
    invalidation: "Aceptación fuera del límite del bloque",
    source: "Protocolo Avanzado de Order Blocks",
  },
  {
    module: 6,
    setup:
      "La operación gana 2R, pero fue ejecutada sin checklist y moviendo el stop.",
    diagnosis: "Resultado favorable con proceso indisciplinado",
    action: "Registrar el incumplimiento y repetir el escenario con reglas",
    invalidation: "El resultado monetario no corrige la desviación del plan",
    source: "Transcripciones del módulo 6 y Playbook",
  },
  {
    module: 7,
    setup:
      "Una posible W2 barre el mínimo, pero no recupera la base ni produce empuje.",
    diagnosis: "Barrido sin confirmación de giro",
    action: "Esperar recuperación y ruptura del máximo central",
    invalidation: "Continuación aceptada bajo el mínimo barrido",
    source: "Guía Maestra Formación W",
  },
  {
    module: 8,
    setup:
      "EMA 30 y 75 están planas y el precio las cruza seis veces dentro de un rango.",
    diagnosis: "Régimen lateral con señales de cruce no confiables",
    action: "Esperar expansión, pendiente y estructura",
    invalidation: "No existe tesis tendencial mientras continúe la pauta plana",
    source: "Transcripciones del módulo 8",
  },
  {
    module: 9,
    setup:
      "El canal se comprime y el estudiante compra antes de que exista ruptura.",
    diagnosis: "Anticipación de dirección sin evidencia",
    action: "Esperar expansión, cierre y aceptación o pullback",
    invalidation: "La compresión por sí sola no crea una hipótesis direccional",
    source: "Manual, módulo 9, pp. 213–268",
  },
  {
    module: 10,
    setup:
      "El patrón es correcto, pero el spread consume 0,7R y el funding previsto añade costo.",
    diagnosis: "Ventaja técnica erosionada por costos de ejecución",
    action: "Recalcular R/R neto y reducir tamaño o descartar",
    invalidation: "La operación no cumple si el R/R neto cae bajo el mínimo del plan",
    source: "Manual, módulo 10; elaboración editorial de costos",
  },
];

export const assessmentQuestions: Question[] = scenarios.flatMap(
  (scenario, index) => {
    const variants = [
      {
        label: "diagnóstico",
        prompt: `Escenario ${index + 1}: ${scenario.setup} ¿Cuál es el diagnóstico técnico?`,
        answer: scenario.diagnosis,
        explanation: `Diagnóstico: ${scenario.diagnosis}.`,
      },
      {
        label: "acción",
        prompt: `Escenario ${index + 1}: ${scenario.setup} ¿Cuál es la siguiente acción disciplinada?`,
        answer: scenario.action,
        explanation: `Acción recomendada: ${scenario.action}.`,
      },
      {
        label: "invalidación",
        prompt: `Escenario ${index + 1}: ${scenario.setup} ¿Qué referencia invalida o limita la lectura?`,
        answer: scenario.invalidation,
        explanation: `Invalidación: ${scenario.invalidation}.`,
      },
    ];

    return variants.map((variant, variantIndex) => {
      const seed = index * 3 + variantIndex + 2;
      const arranged = rotateOptions(variant.answer, seed, scenario.module);
      return {
        id: `Q-${String(index * 3 + variantIndex + 1).padStart(3, "0")}`,
        mode: "assessment" as const,
        module: scenario.module,
        difficulty:
          variantIndex === 0
            ? ("Intermedio" as const)
            : variantIndex === 1
              ? ("Avanzado" as const)
              : ("Avanzado" as const),
        prompt: variant.prompt,
        options: arranged.options,
        correct: arranged.correct,
        explanation: `${variant.explanation} La respuesta se deriva del contexto completo, no de una sola vela.`,
        optionFeedback: arranged.options.map((option, optionIndex) =>
          optionIndex === arranged.correct
            ? `Correcto. ${variant.explanation}`
            : `Incorrecto. “${option}” no resuelve el ${variant.label} del escenario. ${variant.explanation}`,
        ),
        source: scenario.source,
      };
    });
  },
);
