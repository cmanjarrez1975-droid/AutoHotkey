export type CourseVisual = {
  src: string;
  title: string;
  caption: string;
  source: string;
  origin: "Presentación aportada" | "Manual aportado";
};

export type CourseMedia = {
  type: "video" | "audio";
  title: string;
  src: string;
  duration: string;
  poster: string;
  note: string;
  topics: string[];
  source: string;
};

export const moduleVisuals: Record<number, CourseVisual[]> = {
  1: [
    {
      src: "/course-references/m01-arquitectura-top-down.webp",
      title: "Arquitectura top-down del análisis",
      caption:
        "Ordena la lectura desde el contexto general hasta el gatillo de ejecución. Sirve como mapa antes de estudiar impulsos y retrocesos.",
      source: "Market Architect Blueprint, diapositiva 2.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m01-patron-continuacion.webp",
      title: "Patrón 2 de continuación",
      caption:
        "Muestra por qué una figura que parece un giro puede ser una pausa estructural dentro de una tendencia todavía válida.",
      source: "Anatomía del Engaño Institucional, diapositiva 6.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m01-variante-barrido.webp",
      title: "Barrido de liquidez y recuperación",
      caption:
        "Desarrolla el caso avanzado: el segundo vértice rompe el primero, toma liquidez y recupera la base antes de continuar.",
      source: "Anatomía del Engaño Institucional, diapositiva 7.",
      origin: "Presentación aportada",
    },
  ],
  2: [
    {
      src: "/course-references/m02-zonas-fibonacci.webp",
      title: "Zona 38 frente a zona 230",
      caption:
        "Compara una corrección de continuidad con una zona de agotamiento. El porcentaje se interpreta junto con estructura y ubicación.",
      source: "El Plano Institucional, diapositiva 11.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m02-fibonacci-poc.webp",
      title: "Confluencia Fibonacci y POC",
      caption:
        "Explica cómo un nivel de retroceso gana relevancia cuando coincide con una zona de control y liquidez.",
      source: "Market Architect Blueprint, diapositiva 5.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m02-transicion-poc.webp",
      title: "Del imán a la barrera",
      caption:
        "Presenta la transición avanzada del punto de control: soporte después de ruptura alcista y resistencia tras ruptura bajista.",
      source: "Market Geometry Blueprint, diapositiva 7.",
      origin: "Presentación aportada",
    },
  ],
  3: [
    {
      src: "/course-references/m03-patrones-vendedores.webp",
      title: "Patrones vendedores y agotamiento",
      caption:
        "Distingue una señal de agotamiento de una continuación bajista y vincula cada lectura con una acción concreta.",
      source: "Market Architect Blueprint, diapositiva 8.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m03-trampa-continuacion.webp",
      title: "La W que no confirma un giro",
      caption:
        "Una W situada en mitad de una caída puede ser una trampa. La ubicación en soporte y la recuperación estructural son obligatorias.",
      source: "Anatomía del Engaño Institucional, diapositiva 6.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m03-simetria-bajista.webp",
      title: "Simetría de la variante 2",
      caption:
        "Compara el barrido alcista y bajista para reconocer el mismo mecanismo de liquidez en direcciones opuestas.",
      source: "Anatomía del Engaño Institucional, diapositiva 8.",
      origin: "Presentación aportada",
    },
  ],
  4: [
    {
      src: "/course-references/m04-anatomia-vela-poker.webp",
      title: "Anatomía de la Vela Póker",
      caption:
        "Separa cuerpo, mecha y ubicación: el cuerpo expresa intención y la mecha documenta engaño o absorción.",
      source: "Market Architect Blueprint, diapositiva 6.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m04-confirmacion-direccional.webp",
      title: "Confirmación direccional",
      caption:
        "La zona aporta contexto; la Vela Póker aporta desplazamiento y confirma cuál fuerza domina después de la absorción.",
      source: "El Plano Institucional, diapositiva 12.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m04-ultimos-cinco-minutos.webp",
      title: "El periodo crítico de una vela de 15 minutos",
      caption:
        "Profundiza en la lectura temporal: los minutos finales revelan si la presión fue absorbida antes del cierre.",
      source: "Institutional Precision Blueprint, diapositiva 5.",
      origin: "Presentación aportada",
    },
  ],
  5: [
    {
      src: "/course-references/m05-geometria-order-block.webp",
      title: "El cuerpo como origen del Order Block",
      caption:
        "Delimita el bloque desde el cuerpo de la última vela contraria y evita ampliar la zona por mechas o ruido.",
      source: "El Plano Institucional, diapositiva 4.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m05-ciclo-order-block.webp",
      title: "Ciclo de validación y anulación",
      caption:
        "Presenta el bloque como un estado operativo: generación, retracción, mitigación y finalización.",
      source: "El Plano Institucional, diapositiva 6.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m05-secuenciacion-order-block.webp",
      title: "Secuenciación del mapa operativo",
      caption:
        "Cuando un bloque queda completado, el análisis debe avanzar al siguiente bloque válido sin conservar referencias obsoletas.",
      source: "El Plano Institucional, diapositiva 7.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m05-imanes-order-block.webp",
      title: "Order Blocks como imanes",
      caption:
        "Expone el uso de bloques opuestos no mitigados como destinos probables y zonas de gestión de beneficios.",
      source: "El Plano Institucional, diapositiva 8.",
      origin: "Presentación aportada",
    },
  ],
  6: [
    {
      src: "/course-references/m06-checklist-prevuelo.webp",
      title: "Checklist preoperativo",
      caption:
        "Convierte el análisis en controles verificables: contexto, zona, absorción, engaño y sincronización temporal.",
      source: "Market Architect Blueprint, diapositiva 14.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m06-protocolo-operativo.webp",
      title: "Protocolo operativo institucional",
      caption:
        "Integra las decisiones en una secuencia completa para impedir que una entrada aislada sustituya el plan.",
      source: "El Plano Institucional, diapositiva 14.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m06-disciplina-sistemica.webp",
      title: "Disciplina sistémica",
      caption:
        "Resume el propósito de la rutina: transformar una lectura discrecional en una ejecución repetible y auditable.",
      source: "El Plano Institucional, diapositiva 15.",
      origin: "Presentación aportada",
    },
  ],
  7: [
    {
      src: "/course-references/m07-psicologia-tamano.webp",
      title: "La psicología del tamaño",
      caption:
        "Una vela grande puede inducir entradas tardías. El tamaño solo adquiere significado al relacionarlo con zona y cierre.",
      source: "Anatomía del Engaño Institucional, diapositiva 3.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m07-vela-desnuda.webp",
      title: "Metamorfosis de la vela que se desnuda",
      caption:
        "Sigue el cambio desde un cuerpo dominante hasta una mecha de rechazo que evidencia absorción antes del cierre.",
      source: "Anatomía del Engaño Institucional, diapositiva 4.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m07-tipologia-rechazo.webp",
      title: "Tipología institucional de rechazo",
      caption:
        "Compara tres tipos de vela y aclara que los tipos 2 y 3 requieren zona de liquidez o extremo estructural.",
      source: "Anatomía del Engaño Institucional, diapositiva 5.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m07-giros-alcistas.webp",
      title: "Matriz de giros alcistas",
      caption:
        "Conecta fuerza, rechazo y giro en V con la acción esperada en la siguiente vela.",
      source: "Market Architect Blueprint, diapositiva 7.",
      origin: "Presentación aportada",
    },
  ],
  8: [
    {
      src: "/course-references/m08-termometro-medias.webp",
      title: "El termómetro diario",
      caption:
        "Usa la relación entre precio, medias 30/75 y zona media de Donchian para filtrar operaciones contra el contexto.",
      source: "Market Architect Blueprint, diapositiva 3.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m08-setup-medias.webp",
      title: "Setup con medias 30/75",
      caption:
        "Ejemplo de entrada donde las medias organizan el contexto, pero la invalidación continúa ligada a la estructura.",
      source: "Market Architect Blueprint, diapositiva 13.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m08-rebote-media-30.webp",
      title: "Rebote sobre la media 30",
      caption:
        "Caso real del manual para estudiar retrocesos superficiales y continuidad en GBP/USD.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 250.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m08-rebote-media-75.webp",
      title: "Rebote sobre la media 75",
      caption:
        "Caso real del manual para comparar una corrección más profunda en GBP/JPY.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 251.",
      origin: "Manual aportado",
    },
  ],
  9: [
    {
      src: "/course-references/m09-termometro-donchian.webp",
      title: "Donchian como filtro diario",
      caption:
        "La zona media ayuda a definir el sesgo; no funciona como señal independiente ni reemplaza el análisis estructural.",
      source: "Market Architect Blueprint, diapositiva 3.",
      origin: "Presentación aportada",
    },
    {
      src: "/course-references/m09-entrada-agresiva-alcista.webp",
      title: "Entrada agresiva alcista",
      caption:
        "Ejemplo del manual para estudiar la relación entre banda, medias y ruptura sin perseguir el precio.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 258.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m09-entrada-agresiva-bajista.webp",
      title: "Entrada agresiva bajista",
      caption:
        "Ejemplo bajista que permite comparar la ubicación de la invalidación y el recorrido disponible.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 259.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m09-entrada-conservadora-alcista.webp",
      title: "Entrada conservadora alcista",
      caption:
        "La confirmación posterior reduce anticipación, a cambio de una entrada más tardía.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 260.",
      origin: "Manual aportado",
    },
  ],
  10: [
    {
      src: "/course-references/m10-funcionamiento-cripto.webp",
      title: "Qué son y cómo funcionan las criptomonedas",
      caption:
        "Introduce la transferencia de valor digital antes de estudiar custodia, mercado y riesgo.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 271.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m10-monederos-digitales.webp",
      title: "Tipos de monederos digitales",
      caption:
        "Diferencia las formas de custodia y sirve de base para evaluar seguridad operativa.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 272.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m10-blockchain.webp",
      title: "Criptomonedas y blockchain",
      caption:
        "Explica la infraestructura de registro sin confundir tecnología con calidad automática de inversión.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 274.",
      origin: "Manual aportado",
    },
    {
      src: "/course-references/m10-exchanges.webp",
      title: "Principales mercados exchange",
      caption:
        "Ubica el papel del intermediario y abre la discusión sobre liquidez, custodia y riesgo de contraparte.",
      source: "APRENDE NUEVAS ESTRATEGIAS TRADING, p. 276.",
      origin: "Manual aportado",
    },
  ],
};

export const moduleMedia: Record<number, CourseMedia[]> = {
  1: [
    {
      type: "video",
      title: "Análisis Visual",
      src: "/course-media/analisis-visual.mp4",
      duration: "08:28",
      poster: "/course-references/official/market-architect-02.webp",
      note:
        "Material narrado original. Refuerza ubicación, estructura y lectura antes de formular una hipótesis.",
      topics: ["Contexto", "Estructura", "Ubicación", "Confirmación"],
      source: "Análisis_Visual(1).mp4.",
    },
  ],
  2: [
    {
      type: "video",
      title: "Pirámide de Precisión",
      src: "/course-media/piramide-precision.mp4",
      duration: "12:12",
      poster: "/course-references/official/market-architect-05.webp",
      note:
        "Material narrado original para ordenar contexto, zona, gatillo e invalidación antes de medir el retroceso.",
      topics: ["Contexto", "Zona", "Gatillo", "Invalidación"],
      source: "Pirámide_de_Precisión(1).mp4.",
    },
  ],
  3: [
    {
      type: "video",
      title: "Análisis Visual",
      src: "/course-media/analisis-visual.mp4",
      duration: "08:28",
      poster: "/course-references/official/market-architect-08.webp",
      note:
        "Material narrado original aplicado a la lectura de dirección, zonas y señales que deben descartarse.",
      topics: ["Sesgo", "Retroceso", "Continuidad", "Agotamiento"],
      source: "Análisis_Visual(1).mp4.",
    },
  ],
  4: [
    {
      type: "video",
      title: "Estrategia Vela Póker",
      src: "/course-media/estrategia-vela-poker.mp4",
      duration: "05:40",
      poster: "/course-references/official/market-architect-06.webp",
      note:
        "Video narrado original sobre absorción, empuje y confirmación. Se usa como complemento, no como sustituto del protocolo escrito.",
      topics: ["Anatomía", "Absorción", "Empuje", "Confirmación"],
      source: "Estrategia_Vela_Póker.mp4.",
    },
  ],
  5: [
    {
      type: "video",
      title: "Estrategia Vela Póker",
      src: "/course-media/estrategia-vela-poker.mp4",
      duration: "05:40",
      poster: "/course-references/official/market-architect-04.webp",
      note:
        "Ayuda a reconocer la vela de decisión que valida el origen del bloque y la intención institucional.",
      topics: ["Origen", "Vela de decisión", "Mitigación", "Invalidación"],
      source: "Estrategia_Vela_Póker.mp4.",
    },
  ],
  6: [
    {
      type: "audio",
      title: "Cómo los algoritmos cazan tu pánico",
      src: "/course-media/algoritmos-panico.m4a",
      duration: "28:29",
      poster: "/course-references/official/playbook-15.webp",
      note:
        "Audio original para trabajar disciplina, respuesta emocional y ejecución según un plan previamente escrito.",
      topics: ["Pánico", "Liquidez", "FOMO", "Disciplina"],
      source: "Cómo_los_algoritmos_cazan_tu_pánico(1).m4a.",
    },
  ],
  7: [
    {
      type: "video",
      title: "Estrategia Vela Póker",
      src: "/course-media/estrategia-vela-poker.mp4",
      duration: "05:40",
      poster: "/course-references/official/market-architect-10.webp",
      note:
        "Video narrado original para relacionar cuerpo, mecha, absorción y desplazamiento.",
      topics: ["Cuerpo", "Mecha", "Absorción", "Gatillo"],
      source: "Estrategia_Vela_Póker.mp4.",
    },
  ],
  8: [
    {
      type: "video",
      title: "Pirámide de Precisión",
      src: "/course-media/piramide-precision.mp4",
      duration: "12:12",
      poster: "/course-references/official/market-architect-03.webp",
      note:
        "Se utiliza para mantener las medias en su función correcta: filtro de contexto antes de zona, gatillo y riesgo.",
      topics: ["Sesgo", "Zona", "Confirmación", "Riesgo"],
      source: "Pirámide_de_Precisión(1).mp4.",
    },
  ],
  9: [
    {
      type: "video",
      title: "Análisis Visual",
      src: "/course-media/analisis-visual.mp4",
      duration: "08:28",
      poster: "/course-references/official/market-architect-03.webp",
      note:
        "Refuerza la obligación de leer el canal como contexto y no como orden automática de compra o venta.",
      topics: ["Contexto", "Sesgo", "Ubicación", "Confirmación"],
      source: "Análisis_Visual(1).mp4.",
    },
  ],
  10: [],
};

export const moduleSectionSources: Record<number, string[]> = {
  1: [
    "Síntesis editorial basada en Domino de Tendencias Alcistas y Estructura del Mercado Profesional, sección 1, y manual principal, pp. 9-34.",
    "Síntesis editorial basada en Domino de Tendencias Alcistas, secciones 1-2, y transcripciones del módulo 1.",
    "Síntesis editorial basada en Domino de Tendencias Alcistas, secciones 2-3, y Anatomía del Engaño Institucional, diapositivas 6-8.",
    "Síntesis editorial basada en el manual principal, prácticas del módulo 1, y Market Architect Blueprint, diapositiva 14.",
  ],
  2: [
    "Síntesis editorial basada en Estrategias de Retroceso en Tendencias Alcistas, secciones 1 y 3.",
    "Síntesis editorial basada en Estrategias de Retroceso en Tendencias Alcistas, sección 1, y manual principal, pp. 35-55.",
    "Síntesis editorial basada en Estrategias de Retroceso en Tendencias Alcistas, sección 2, y Guía Maestra de la Formación W.",
    "Síntesis editorial basada en Protocolo Avanzado de Velas Póker y Order Blocks y prácticas del módulo 2.",
  ],
  3: [
    "Síntesis editorial basada en Estrategias y Estructuras de la Tendencia Bajista Profesional, secciones 1-2.",
    "Síntesis editorial basada en Estrategias y Estructuras de la Tendencia Bajista Profesional, secciones 2-3.",
    "Síntesis editorial basada en Estrategias y Estructuras de la Tendencia Bajista Profesional, secciones 3-4.",
    "Síntesis editorial basada en la sección 5 de la guía bajista y las prácticas transcritas del módulo 3.",
  ],
  4: [
    "Síntesis editorial basada en Velas Póker: El Empuje de la Decisión Institucional y Market Architect Blueprint, diapositiva 6.",
    "Síntesis editorial basada en la Guía Estratégica de Velas Profesionales, sección 1.",
    "Síntesis editorial basada en la Guía Estratégica de Velas Profesionales, secciones 2-3, e Institutional Precision Blueprint.",
    "Síntesis editorial basada en la Guía Estratégica de Velas Profesionales, sección 4, y el video Estrategia Vela Póker.",
  ],
  5: [
    "Síntesis editorial basada en Huella Institucional: Manual de los Order Blocks, sección 1, y El Plano Institucional, diapositiva 4.",
    "Síntesis editorial basada en Huella Institucional, sección 2, y El Plano Institucional, diapositivas 5 y 8.",
    "Síntesis editorial basada en Huella Institucional, sección 3, y El Plano Institucional, diapositivas 6-7.",
    "Síntesis editorial basada en Huella Institucional, sección 4, y Protocolo Avanzado de Velas Póker y Order Blocks.",
  ],
  6: [
    "Síntesis editorial basada en la clase Creando rutinas de trabajo.",
    "Síntesis editorial basada en Market Architect Blueprint, diapositiva 14.",
    "Síntesis editorial basada en El Plano Institucional, diapositivas 14-15.",
    "Elaboración editorial verificable basada en la matriz de estrategias y el audio Cómo los algoritmos cazan tu pánico.",
  ],
  7: [
    "Síntesis editorial basada en la Guía Estratégica de Velas Profesionales, sección 1.",
    "Síntesis editorial basada en Anatomía del Engaño Institucional, diapositivas 3-5.",
    "Síntesis editorial basada en Guía Maestra: Fortaleza de la Demanda, secciones 2-4.",
    "Síntesis editorial basada en la Guía Maestra de la Formación W y las clases prácticas del módulo 7.",
  ],
  8: [
    "Síntesis editorial basada en las transcripciones del módulo 8 y Market Architect Blueprint, diapositiva 3.",
    "Síntesis editorial basada en las prácticas Medias 30/75 y el manual principal, pp. 250-251.",
    "Síntesis editorial basada en las clases Estrategias con medias y Poniendo a prueba las estrategias.",
    "Elaboración editorial basada en la matriz de estrategias; la invalidación continúa vinculada a estructura.",
  ],
  9: [
    "Síntesis editorial basada en el manual principal, pp. 240-243, y Market Architect Blueprint, diapositiva 3.",
    "Síntesis editorial basada en el manual principal, pp. 244-251.",
    "Síntesis editorial basada en el manual principal, pp. 255-263.",
    "Elaboración editorial basada en los ejercicios del manual, pp. 264-268.",
  ],
  10: [
    "Síntesis editorial basada en el manual principal, pp. 269-271.",
    "Síntesis editorial basada en el manual principal, pp. 272 y 274.",
    "Síntesis editorial basada en el manual principal, pp. 273 y 275.",
    "Síntesis editorial basada en el manual principal, pp. 276-277; la ampliación de riesgos es elaboración editorial.",
  ],
};
