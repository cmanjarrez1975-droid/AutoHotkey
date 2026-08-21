import type { CourseClass } from "./course-data";
import type { ModuleCurriculum } from "./module-content";
import type { CourseMedia, CourseVisual } from "./course-visuals";

export type LessonProvenance =
  | "Fuente original"
  | "Clase original reconstruida"
  | "Síntesis editorial"
  | "Práctica aplicada";

export type AcademyLesson = {
  id: string;
  group: "Fundamentos" | "Seminarios" | "Aplicación" | "Práctica";
  title: string;
  duration: string;
  summary: string;
  paragraphs: string[];
  evidence: string;
  failure: string;
  decision: string;
  rules: string[];
  questions: Array<{ question: string; answer: string }>;
  exercise: string;
  source: string;
  provenance: LessonProvenance;
  visual?: CourseVisual;
  media?: CourseMedia;
  opensLab?: boolean;
};

type Deepening = {
  evidence: string[];
  failure: string[];
  decisions: string[];
  drills: string[];
};

const deepening: Record<number, Deepening> = {
  1: {
    evidence: [
      "El último mínimo relevante se conserva y el desplazamiento supera una referencia previa.",
      "El impulso tiene consecuencia estructural; una vela grande aislada no basta.",
      "El retroceso pierde velocidad antes de amenazar el origen del movimiento.",
      "Existe espacio real hasta la siguiente resistencia antes de calcular la entrada.",
    ],
    failure: [
      "Confundir una subida rápida con una tendencia ya confirmada.",
      "Perseguir el segundo o tercer impulso cuando la entrada eficiente ya pasó.",
      "Redibujar los mínimos para sostener una hipótesis que el precio invalidó.",
      "Ignorar la resistencia diaria porque el marco menor todavía parece alcista.",
    ],
    decisions: [
      "Marca máximos y mínimos antes de buscar un patrón de entrada.",
      "Distingue impulso, pausa y retroceso por su función, no por su color.",
      "Espera que el retroceso confirme que la demanda conserva el control.",
      "Descarta la operación si el recorrido no compensa la invalidación.",
    ],
    drills: [
      "Compara dos gráficos alcistas y explica cuál conserva mejor el último mínimo estructural.",
      "Señala el impulso que realmente rompió estructura y elimina los movimientos menores.",
      "Escribe qué tendría que ocurrir para que el retroceso deje de ser saludable.",
      "Calcula si una entrada tardía todavía conserva al menos 2R antes del obstáculo.",
    ],
  },
  2: {
    evidence: [
      "El Fibonacci está anclado al impulso que produjo la ruptura estructural.",
      "La profundidad del retroceso se interpreta junto con velocidad y estructura interna.",
      "La zona coincide con soporte, demanda o un extremo previamente definido.",
      "La confirmación aparece después del contacto y permite una invalidación objetiva.",
    ],
    failure: [
      "Trazar Fibonacci sobre una oscilación menor elegida después de ver el rebote.",
      "Comprar el 38,2%, 50% o 61,8% como si el nivel fuera una orden automática.",
      "Llamar corrección a una secuencia que ya produce máximos y mínimos decrecientes.",
      "Forzar una entrada cuando el stop técnico destruye la relación riesgo/beneficio.",
    ],
    decisions: [
      "Selecciona primero el impulso dominante y luego mide la corrección.",
      "Clasifica el retroceso como superficial, normal o profundo.",
      "Exige reacción y recuperación; el nivel por sí solo no confirma demanda.",
      "Ajusta tamaño, nunca la lógica de invalidación, para acomodar el riesgo.",
    ],
    drills: [
      "Dibuja dos posibles anclajes de Fibonacci y defiende cuál representa el impulso dominante.",
      "Compara un retroceso lento con otro impulsivo y explica por qué no admiten la misma entrada.",
      "Describe la confirmación mínima que exigirías en 3m dentro de una zona de 15m.",
      "Rediseña una entrada cuyo objetivo queda bloqueado antes de alcanzar 1R.",
    ],
  },
  3: {
    evidence: [
      "Los retrocesos fallan por debajo del máximo anterior y la oferta crea nuevos mínimos.",
      "La ruptura de soporte muestra aceptación, no solo una mecha momentánea.",
      "El pullback regresa al nivel perdido sin recuperar la estructura alcista.",
      "El recorrido bajista conserva espacio antes del siguiente soporte relevante.",
    ],
    failure: [
      "Vender después de varias velas extendidas directamente sobre soporte.",
      "Interpretar cualquier martillo como giro aunque aparezca en mitad del rango.",
      "Colocar el stop dentro del ruido del pullback para aumentar artificialmente el R/R.",
      "Mantener sesgo vendedor después de que el precio recupera y acepta sobre el máximo clave.",
    ],
    decisions: [
      "Define qué máximo mantiene el control vendedor antes de buscar cortos.",
      "Espera ruptura, aceptación y pullback cuando la entrada inicial ya pasó.",
      "Distingue continuación de agotamiento por ubicación y madurez del movimiento.",
      "No vendas contra soporte sin una nueva oportunidad técnicamente delimitada.",
    ],
    drills: [
      "Ordena cinco velas en impulso, retroceso y continuación bajista.",
      "Explica por qué una ruptura con mecha no equivale a aceptación bajo soporte.",
      "Marca una venta tardía y propone una entrada alternativa durante el pullback.",
      "Identifica qué recuperación obligaría a abandonar el sesgo bajista.",
    ],
  },
  4: {
    evidence: [
      "La vela se evalúa al cierre y su cuerpo domina el rango en una ubicación relevante.",
      "La mecha documenta el extremo rechazado, pero necesita seguimiento.",
      "La secuencia muestra frenada, absorción y un empuje que recupera terreno.",
      "El marco menor confirma qué ocurrió dentro de la vela mayor.",
    ],
    failure: [
      "Atribuir intención institucional únicamente por el tamaño del cuerpo.",
      "Operar una Vela Póker en tierra de nadie sin soporte, resistencia o estructura.",
      "Anticipar que una vela activa terminará dejando la mecha deseada.",
      "Usar un stop corto que queda dentro del extremo de absorción.",
    ],
    decisions: [
      "Separa primero los datos observables de la interpretación del método.",
      "Clasifica Tipo 1, 2 o 3 solo después de revisar ubicación y cierre.",
      "Busca confirmación mediante desplazamiento, base o microestructura.",
      "Descarta la señal si zona, invalidación y recorrido no forman un plan completo.",
    ],
    drills: [
      "Describe una vela sin utilizar palabras como fuerza, intención o institución.",
      "Compara la misma anatomía en soporte y en mitad de un rango.",
      "Reconstruye en 3m la secuencia que podría formar una mecha de 15m.",
      "Define entrada agresiva, conservadora e invalidación para una misma señal.",
    ],
  },
  5: {
    evidence: [
      "La zona es el origen de un desplazamiento que produjo una consecuencia estructural.",
      "Los límites se fijan antes de observar el regreso del precio.",
      "El primer retorno permite evaluar frescura, penetración y respuesta.",
      "La reacción se confirma con absorción, desplazamiento o ruptura de microestructura.",
    ],
    failure: [
      "Dibujar un rectángulo retrospectivo alrededor de cualquier vela previa al movimiento.",
      "Tratar como fresco un bloque visitado y atravesado repetidamente.",
      "Entrar solo porque el precio tocó la zona sin evidencia de reacción.",
      "Usar el bloque opuesto como objetivo garantizado ignorando obstáculos intermedios.",
    ],
    decisions: [
      "Registra origen, desplazamiento, referencia rota y regla de delimitación.",
      "Clasifica el bloque como fresco, mitigado, consumido o anulado.",
      "Exige permiso observable antes de ejecutar en el regreso.",
      "Actualiza el mapa cuando el precio acepta fuera de la zona.",
    ],
    drills: [
      "Compara dos velas de origen y demuestra cuál produjo una ruptura verificable.",
      "Dibuja cuerpo, rango completo y nivel de anulación antes del retorno.",
      "Clasifica tres visitas sucesivas al mismo bloque y ajusta la confianza.",
      "Construye una entrada en LTF que no dependa del simple contacto con la zona.",
    ],
  },
  6: {
    evidence: [
      "La oportunidad estaba definida antes de que el precio llegara a la zona.",
      "Entrada, stop, objetivo y tamaño están escritos antes de ejecutar.",
      "La decisión cumple el checklist aunque el resultado individual sea negativo.",
      "La revisión distingue error de proceso, variación normal y fallo de la estrategia.",
    ],
    failure: [
      "Cambiar de plan porque el precio comienza a moverse sin haber dado entrada.",
      "Perseguir una operación por miedo a perder el movimiento.",
      "Calificar como buena una operación ganadora que violó el checklist.",
      "Modificar muchas reglas después de una sola pérdida.",
    ],
    decisions: [
      "Prepara contexto, escenarios y alertas antes de la sesión.",
      "Retira las manos del teclado cuando aparezca impulso emocional.",
      "Evalúa primero la calidad del proceso y después el resultado en R.",
      "Cambia una regla únicamente con evidencia acumulada y documentada.",
    ],
    drills: [
      "Escribe un plan para una sesión en la que la mejor decisión puede ser no operar.",
      "Diseña un protocolo físico para interrumpir una entrada impulsiva.",
      "Compara una pérdida disciplinada con una ganancia obtenida violando el plan.",
      "Clasifica diez operaciones por calidad de proceso antes de sumar resultados.",
    ],
  },
  7: {
    evidence: [
      "La W o M aparece en una zona extrema y recupera su base o máximo central.",
      "La relación entre los dos extremos permite distinguir W1, W2 y W3.",
      "El cierre revela si la aparente absorción se sostuvo hasta terminar el periodo.",
      "La señal de 15m y el gatillo de 3m cuentan la misma historia estructural.",
    ],
    failure: [
      "Nombrar una W apenas aparecen dos mínimos sin ruptura de la base.",
      "Confundir un barrido W2 con confirmación antes de la recuperación.",
      "Buscar patrones en 1m sin haber definido contexto y zona en 15m.",
      "Operar la posible forma durante los minutos en que todavía puede desaparecer.",
    ],
    decisions: [
      "Localiza primero soporte, resistencia o extremo de recorrido.",
      "Marca extremos y base; después identifica la variante.",
      "Espera recuperación, cierre o ruptura de microestructura según el perfil de entrada.",
      "Usa el marco menor para precisión, nunca para reparar una mala ubicación.",
    ],
    drills: [
      "Dibuja W1, W2 y W3 indicando base, engaño e invalidación.",
      "Explica qué evidencia falta en una W2 que barre pero no recupera.",
      "Compara la vela de 15m con su posible secuencia interna en 3m.",
      "Decide entre entrada agresiva y conservadora en tres contextos diferentes.",
    ],
  },
  8: {
    evidence: [
      "Precio, EMA 30 y EMA 75 conservan orden, pendiente y separación coherentes.",
      "El retroceso llega a la media dentro de una estructura todavía válida.",
      "El contacto produce reacción y recuperación, no solo proximidad visual.",
      "La regla fue probada también en lateralidad, costos y contactos tardíos.",
    ],
    failure: [
      "Comprar o vender cada cruce de medias sin clasificar el régimen.",
      "Perseguir el precio cuando la distancia respecto de las medias es extrema.",
      "Llamar rebote a una caída que atraviesa ambas medias y rompe estructura.",
      "Validar la estrategia seleccionando únicamente capturas perfectas.",
    ],
    decisions: [
      "Clasifica tendencia, extensión o pauta plana antes de buscar una entrada.",
      "Distingue retroceso superficial en 30 de corrección profunda hacia 75.",
      "Coloca el stop detrás de la estructura, no detrás de una línea móvil.",
      "Evalúa expectativa y rachas con reglas estables y muestra completa.",
    ],
    drills: [
      "Clasifica seis gráficos únicamente por orden, pendiente y separación.",
      "Compara un primer contacto con la EMA 30 y un cuarto contacto tardío.",
      "Define la confirmación necesaria después de tocar la EMA 75.",
      "Diseña una muestra que incluya tendencias, rangos, activos y costos.",
    ],
  },
  9: {
    evidence: [
      "El canal representa máximo, mínimo y zona media de una ventana definida.",
      "La ubicación concuerda con el sesgo del marco de contexto.",
      "La ruptura muestra cierre y aceptación o un pullback defendido.",
      "La anchura del canal permite distinguir contracción de expansión.",
    ],
    failure: [
      "Usar el toque de una banda como señal automática de giro.",
      "Comprar bajo la zona media cuando el termómetro diario sigue bajista.",
      "Anticipar la dirección durante una compresión sin ruptura.",
      "Aplicar los mismos parámetros sin considerar activo y temporalidad.",
    ],
    decisions: [
      "Define primero periodo, zona media y dirección permitida.",
      "Separa ubicación de confirmación; una banda solo localiza.",
      "Exige expansión, aceptación o reacción estructural antes de actuar.",
      "Reevalúa el sesgo cuando el precio cruza y sostiene la zona media.",
    ],
    drills: [
      "Clasifica sesiones alcistas, bajistas y neutrales usando la zona media.",
      "Compara una ruptura aceptada con una mecha que regresa al canal.",
      "Diseña reglas distintas para contracción y expansión.",
      "Explica cuándo una banda funciona como objetivo y cuándo como advertencia.",
    ],
  },
  10: {
    evidence: [
      "El activo posee liquidez suficiente para el tamaño y tipo de orden previstos.",
      "Custodia, contraparte y mecanismo del producto están comprendidos antes de operar.",
      "La pérdida máxima se calcula desde el stop, no desde el margen requerido.",
      "Spread, deslizamiento y funding están incluidos en el R/R neto.",
    ],
    failure: [
      "Confundir blockchain con garantía de seguridad o rentabilidad del activo.",
      "Compartir una frase semilla o almacenarla como si fuera una contraseña recuperable.",
      "Usar el mismo tamaño en BTC y en una altcoin con libro poco profundo.",
      "Aumentar apalancamiento porque el margen visible parece pequeño.",
    ],
    decisions: [
      "Clasifica activo, red, custodia y vehículo antes de analizar el gráfico.",
      "Comprueba spread y profundidad para el tamaño real de la orden.",
      "Calcula exposición desde la invalidación y el riesgo permitido.",
      "Descarta el trade si los costos destruyen la ventaja técnica.",
    ],
    drills: [
      "Compara autocustodia, exchange centralizado y vehículo regulado.",
      "Explica qué información puede compartirse y cuál debe permanecer secreta.",
      "Recalcula una misma figura técnica en dos activos con liquidez distinta.",
      "Convierte margen, apalancamiento y distancia al stop en pérdida máxima de cuenta.",
    ],
  },
};

function seminarOrientation(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes("práctica") || normalized.includes("ejercicio")) {
    return "Trabaja esta clase como una práctica deliberada: pausa antes de cada decisión, escribe tu hipótesis y compárala con la resolución solo al final.";
  }
  if (normalized.includes("análisis en tiempo real")) {
    return "La prioridad es reconstruir el orden de decisiones del profesor, incluidos los escenarios descartados mientras el gráfico permanece abierto.";
  }
  if (normalized.includes("parte 1") || normalized.includes("primera")) {
    return "Esta primera parte fija vocabulario y referencias. No avances hasta poder describir el fenómeno sin depender de nombres visuales.";
  }
  if (normalized.includes("parte 2") || normalized.includes("segunda")) {
    return "Esta segunda parte introduce variaciones y condiciones. Compara cada ejemplo con la regla base y registra qué cambió.";
  }
  if (normalized.includes("parte 3") || normalized.includes("tercera")) {
    return "Esta tercera parte se centra en excepciones y dominio. La meta es reconocer cuándo una configuración parecida debe descartarse.";
  }
  return "Estudia la explicación como un proceso de decisión: contexto, evidencia, alternativa, invalidación y ejecución.";
}

export function buildAcademyLessons({
  module,
  curriculum,
  visuals,
  media,
  classes,
}: {
  module: number;
  curriculum: ModuleCurriculum;
  visuals: CourseVisual[];
  media: CourseMedia[];
  classes: CourseClass[];
}) {
  const depth = deepening[module] ?? deepening[1];
  const lessons: AcademyLesson[] = [
    {
      id: `m${module}-mapa`,
      group: "Fundamentos",
      title: "Mapa de dominio del módulo",
      duration: "12 min",
      summary: curriculum.introduction,
      paragraphs: [
        curriculum.introduction,
        `La pregunta que organiza todo el módulo es: ${curriculum.question}`,
        "No memorices nombres aislados. Al finalizar debes poder pasar de observación a decisión y explicar también qué evidencia invalidaría tu lectura.",
      ],
      evidence: depth.evidence[0],
      failure: depth.failure[0],
      decision: depth.decisions[0],
      rules: curriculum.objectives,
      questions: [
        {
          question: "¿Qué habilidad debe poder demostrarse al terminar el módulo?",
          answer: curriculum.objectives[0] ?? curriculum.question,
        },
      ],
      exercise: depth.drills[0],
      source: curriculum.sources.join(" · "),
      provenance: "Síntesis editorial",
      visual: visuals[0],
    },
  ];

  curriculum.sections.forEach((section, index) => {
    lessons.push({
      id: `m${module}-nucleo-${index + 1}`,
      group: "Fundamentos",
      title: section.title,
      duration: `${18 + index * 3} min`,
      summary: section.key,
      paragraphs: section.paragraphs,
      evidence: depth.evidence[index % depth.evidence.length],
      failure: depth.failure[index % depth.failure.length],
      decision: depth.decisions[index % depth.decisions.length],
      rules: [
        section.key,
        section.bridge,
        ...(section.checks ?? []).map((check) => check.answer),
      ].filter(Boolean),
      questions: section.checks ?? [],
      exercise: depth.drills[index % depth.drills.length],
      source: section.source ?? curriculum.sources[0],
      provenance: "Síntesis editorial",
      visual: visuals[index],
    });
  });

  classes.forEach((courseClass, index) => {
    const section = curriculum.sections[index % curriculum.sections.length];
    lessons.push({
      id: courseClass.id,
      group: "Seminarios",
      title: courseClass.title,
      duration: courseClass.title.toLowerCase().includes("práctica")
        ? "35-60 min"
        : "30-55 min",
      summary: `${seminarOrientation(courseClass.title)} Eje de estudio: ${section.key}.`,
      paragraphs: [
        seminarOrientation(courseClass.title),
        section.paragraphs[index % section.paragraphs.length],
        `Esta clase no se reduce a reconocer una figura. Debes poder justificar la ubicación, nombrar la alternativa contraria y fijar la condición que obliga a abandonar la hipótesis. ${section.bridge}`,
      ],
      evidence: depth.evidence[index % depth.evidence.length],
      failure: depth.failure[index % depth.failure.length],
      decision: depth.decisions[index % depth.decisions.length],
      rules: [
        `Regla central: ${section.key}.`,
        `Condición de descarte: ${depth.failure[index % depth.failure.length]}`,
        `Acción disciplinada: ${depth.decisions[index % depth.decisions.length]}`,
      ],
      questions: section.checks ?? [],
      exercise: depth.drills[index % depth.drills.length],
      source: courseClass.source,
      provenance: "Clase original reconstruida",
      visual: visuals[index % Math.max(visuals.length, 1)],
    });
  });

  lessons.push({
    id: `m${module}-caso`,
    group: "Aplicación",
    title: `Caso guiado: ${curriculum.example.title}`,
    duration: "28 min",
    summary: curriculum.example.context,
    paragraphs: [
      curriculum.example.context,
      ...curriculum.example.development,
      curriculum.example.conclusion,
    ],
    evidence: depth.evidence[2],
    failure: depth.failure[2],
    decision: depth.decisions[2],
    rules: curriculum.checklist,
    questions: [
      {
        question: "¿Qué dato del caso define la invalidación?",
        answer: curriculum.example.conclusion,
      },
    ],
    exercise: depth.drills[2],
    source: curriculum.sources.join(" · "),
    provenance: "Síntesis editorial",
    visual: visuals.at(-1),
  });

  lessons.push({
    id: `m${module}-errores`,
    group: "Aplicación",
    title: "Errores, límites y contraejemplos",
    duration: "22 min",
    summary:
      "Aprende a rechazar configuraciones parecidas antes de buscar la respuesta correcta.",
    paragraphs: curriculum.errors.flatMap((error) => [
      `${error.title}: ${error.correction}`,
    ]),
    evidence: depth.evidence[3],
    failure: depth.failure[3],
    decision: depth.decisions[3],
    rules: curriculum.checklist,
    questions: [
      {
        question: "¿Por qué un resultado ganador no demuestra que el proceso fue correcto?",
        answer:
          "Porque la calidad se evalúa por evidencia, invalidación y cumplimiento del plan, no por un resultado aislado.",
      },
    ],
    exercise: depth.drills[3],
    source: "Síntesis editorial de errores y correcciones del módulo.",
    provenance: "Síntesis editorial",
  });

  media.forEach((item, index) => {
    lessons.push({
      id: `m${module}-media-${index + 1}`,
      group: "Aplicación",
      title: `Clase audiovisual: ${item.title}`,
      duration: item.duration,
      summary: item.note,
      paragraphs: [
        "Antes de reproducir: escribe qué esperas encontrar y qué dato podría contradecir tu lectura.",
        `Durante la reproducción: detén el recurso cada vez que aparezca uno de estos ejes — ${item.topics.join(", ")} — y registra la evidencia visible o narrada.`,
        "Después de reproducir: reconstruye el proceso sin mirar el recurso y compara tu secuencia con las reglas del módulo.",
      ],
      evidence: depth.evidence[index % depth.evidence.length],
      failure: depth.failure[index % depth.failure.length],
      decision: depth.decisions[index % depth.decisions.length],
      rules: item.topics.map((topic) => `Explica ${topic.toLowerCase()} con un ejemplo y un contraejemplo.`),
      questions: [
        {
          question: "¿Qué cambió entre tu hipótesis inicial y la lectura posterior al recurso?",
          answer:
            "La respuesta debe identificar evidencia concreta, no limitarse a decir que el mercado subió o bajó.",
        },
      ],
      exercise: depth.drills[index % depth.drills.length],
      source: item.source,
      provenance: "Fuente original",
      media: item,
      visual: visuals[index % Math.max(visuals.length, 1)],
    });
  });

  lessons.push({
    id: `m${module}-laboratorio`,
    group: "Práctica",
    title: curriculum.lab.title,
    duration: "30-45 min",
    summary: curriculum.lab.mission,
    paragraphs: [curriculum.lab.mission, ...curriculum.lab.steps],
    evidence: curriculum.lab.pass,
    failure: depth.failure[1],
    decision: curriculum.lab.checkpoint,
    rules: curriculum.lab.steps,
    questions: [
      {
        question: "¿Cuándo se considera aprobado el laboratorio?",
        answer: curriculum.lab.pass,
      },
    ],
    exercise: curriculum.lab.checkpoint,
    source: "Laboratorio construido desde las reglas del módulo.",
    provenance: "Práctica aplicada",
    visual: visuals.at(-1),
    opensLab: true,
  });

  return lessons;
}
