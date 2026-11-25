export type ModuleSection = {
  title: string;
  paragraphs: string[];
  key: string;
  source?: string;
  bridge?: string;
  checks?: Array<{ question: string; answer: string }>;
};

export type ModuleCurriculum = {
  module: number;
  question: string;
  introduction: string;
  objectives: string[];
  sections: ModuleSection[];
  workflow: Array<{ title: string; detail: string }>;
  example: {
    title: string;
    context: string;
    development: string[];
    conclusion: string;
  };
  errors: Array<{ title: string; correction: string }>;
  checklist: string[];
  lab: {
    title: string;
    mission: string;
    steps: string[];
    pass: string;
    checkpoint: string;
  };
  sources: string[];
};

export const moduleCurriculum: ModuleCurriculum[] = [
  {
    module: 1,
    question: "¿Cómo sé que el avance es una tendencia y no una subida aislada?",
    introduction:
      "El módulo construye una lectura jerárquica desde cero: primero se determina la secuencia de máximos y mínimos, después se separan impulsos y retrocesos y, por último, se clasifica si la tendencia es simple, desarrolla una pausa compleja tras el segundo impulso o presenta dificultad desde el primer impulso. Una vela verde o una ruptura intradía no bastan por sí solas. En el nivel avanzado se estudian cinco patrones de continuación, barridos de liquidez y señales de agotamiento para evitar comprar tarde.",
    objectives: [
      "Diferenciar máximo o mínimo visual de máximo o mínimo estructural.",
      "Reconocer los principales impulsos y las pausas que no invalidan la tendencia.",
      "Ubicar patrones de continuación según el momento del movimiento.",
      "Declarar una invalidación objetiva antes de proyectar el beneficio.",
    ],
    sections: [
      {
        title: "1. La secuencia estructural",
        key: "Máximos y mínimos crecientes",
        paragraphs: [
          "Una tendencia alcista se mantiene mientras cada retroceso relevante deje un mínimo defendido y el siguiente impulso consiga superar el máximo precedente. No todos los giros pequeños tienen la misma importancia: el extremo estructural es el que originó un desplazamiento capaz de romper una referencia visible.",
          "Para identificarlo, aleja el gráfico y pregunta qué mínimo no debería perderse si la hipótesis alcista es correcta. Después marca el máximo que el precio debe superar para demostrar continuidad. Esta pareja de referencias evita decidir por el color de las últimas velas.",
        ],
      },
      {
        title: "2. Impulso, retroceso y pausa",
        key: "Función de cada tramo",
        paragraphs: [
          "El impulso desplaza el precio, crea desequilibrio y suele romper estructura. El retroceso corrige parte de ese recorrido, permite toma de beneficios y prueba si todavía existe demanda. Una pausa lateral consume tiempo sin necesariamente corregir mucho precio; su lectura depende de la ubicación.",
          "El primer retroceso después de un cambio puede ser más profundo porque el mercado todavía está construyendo aceptación. En un segundo impulso maduro conviene vigilar agotamiento y resistencias: el mismo patrón de continuación tiene menos valor si aparece tarde y sin espacio libre.",
        ],
      },
      {
        title: "3. Continuación frente a agotamiento",
        key: "Ubicación antes que forma",
        paragraphs: [
          "Los patrones de continuación son útiles cuando nacen después de una corrección controlada, lejos de una resistencia inmediata y con una invalidación clara. La forma por sí sola no crea ventaja. Un patrón situado en el extremo de un tercer impulso puede ser una trampa o una señal de agotamiento.",
          "La plataforma separa dos preguntas: ¿la estructura todavía es alcista? y ¿la entrada tiene espacio suficiente? La primera puede ser afirmativa y la segunda negativa. Aprender a no operar una lectura correcta pero mal ubicada es parte central del módulo.",
        ],
      },
      {
        title: "4. Invalidación y riesgo",
        key: "La hipótesis debe poder fallar",
        paragraphs: [
          "La invalidación no es el punto donde la pérdida resulta incómoda; es el nivel donde la estructura deja de sostener la idea. Para una continuación alcista suele situarse bajo el mínimo relevante o bajo la zona que debía actuar como demanda, considerando el ruido normal del marco temporal.",
          "Después se calcula el riesgo monetario y el R/R. Si el stop técnico obliga a arriesgar demasiado, se reduce el tamaño de posición o se descarta la operación; nunca se acerca el stop únicamente para aumentar el tamaño.",
        ],
      },
    ],
    workflow: [
      { title: "Aleja", detail: "Observa suficiente historia para reconocer los extremos que movieron el mercado." },
      { title: "Estructura", detail: "Marca último mínimo defendido y máximo que confirma continuidad." },
      { title: "Fase", detail: "Distingue impulso, retroceso, pausa y posible agotamiento." },
      { title: "Espacio", detail: "Comprueba resistencias y recorrido disponible antes del objetivo." },
      { title: "Invalida", detail: "Define stop técnico, calcula R/R y ajusta el tamaño." },
    ],
    example: {
      title: "Continuación después de un mínimo creciente",
      context:
        "BTCUSDT en 15 minutos viene de una caída fuerte, forma una base, rompe el máximo de la base y corrige sin perder el mínimo que originó el desplazamiento.",
      development: [
        "El rompimiento inicial crea la primera evidencia, pero todavía no obliga a comprar.",
        "El retroceso vuelve a la zona de demanda y deja un mínimo creciente.",
        "La entrada se considera tras recuperar el máximo interno; el stop queda bajo el mínimo creciente.",
        "El objetivo se ubica antes de la siguiente resistencia, no en un número arbitrario.",
      ],
      conclusion:
        "La ventaja no proviene de adivinar la siguiente vela, sino de exigir estructura, ubicación, invalidación y espacio.",
    },
    errors: [
      { title: "Marcar cada giro", correction: "Conserva solo los extremos que originaron desplazamiento o ruptura." },
      { title: "Comprar el tercer impulso tarde", correction: "Evalúa agotamiento y resistencia antes de buscar continuación." },
      { title: "Confundir pausa con giro", correction: "Exige pérdida del mínimo estructural y confirmación, no solo velas rojas." },
      { title: "Mover la invalidación", correction: "Registra el nivel antes de entrar y respeta la hipótesis original." },
    ],
    checklist: [
      "Veo máximos y mínimos relevantes crecientes.",
      "Sé qué tramo es impulso y cuál es retroceso.",
      "El patrón está bien ubicado y tiene recorrido.",
      "La invalidación está fuera del ruido normal.",
      "El tamaño se calcula desde el riesgo permitido.",
    ],
    lab: {
      title: "Cartografía de una tendencia alcista",
      mission:
        "Marca el mínimo estructural, el máximo confirmado, el impulso dominante, la entrada, invalidación y objetivo sin revelar la solución.",
      steps: [
        "Aleja el escenario y localiza el tramo que rompió el máximo previo.",
        "Marca el origen y final de ese impulso.",
        "Identifica el mínimo que la corrección debe respetar.",
        "Selecciona una entrada solo después de la recuperación.",
        "Coloca la invalidación bajo la estructura, no bajo la última vela.",
        "Define un objetivo con espacio y comprueba el R/R.",
      ],
      pass: "75% global y al menos 70% en estructura e invalidación.",
      checkpoint: "10 escenarios alcistas; dominio avanzado al completar 20.",
    },
    sources: [
      "Manual principal, módulo 1, pp. 9–34.",
      "Transcripciones del módulo 1: teoría y clases prácticas.",
      "Material complementario: Pirámide de Precisión.",
    ],
  },
  {
    module: 2,
    question: "¿Cuándo un retroceso es una oportunidad y cuándo es un cambio de tendencia?",
    introduction:
      "El retroceso se estudia como una prueba de la tendencia previa. La metodología diferencia un retroceso tipo 1 de una vela, un tipo 2 intermedio y un tipo 3 profundo de varias velas. Fibonacci ayuda a describir cuánto precio se corrigió, pero no decide la entrada: cada profundidad se contrasta con fase de la tendencia, soporte, respuesta de la demanda y posible microtendencia bajista. El nivel avanzado incorpora confluencia con POC y transición de una zona desde imán hasta barrera.",
    objectives: [
      "Clasificar retrocesos por profundidad, forma y ubicación.",
      "Trazar Fibonacci desde el impulso correcto.",
      "Distinguir corrección ordenada de deterioro estructural.",
      "Combinar zona, patrón comprador e invalidación.",
    ],
    sections: [
      {
        title: "1. Medir el impulso correcto",
        key: "Fibonacci describe; no decide",
        paragraphs: [
          "La medición comienza en el origen del impulso que produjo ruptura y termina en su extremo confirmado. Si se mide una oscilación menor, los niveles dejan de representar el tramo que realmente controla la lectura.",
          "Las zonas 38,2%, 50% y 61,8% sirven como referencias de profundidad. No son órdenes automáticas. La reacción importa más que el número exacto: se busca desaceleración de la oferta, defensa de soporte y recuperación de una referencia interna.",
        ],
      },
      {
        title: "2. Retroceso superficial y normal",
        key: "Fuerza con riesgo de persecución",
        paragraphs: [
          "Una corrección superficial muestra urgencia compradora, pero puede ofrecer una invalidación poco eficiente si la entrada se persigue demasiado arriba. En una corrección normal el precio devuelve parte del impulso y permite evaluar la calidad de la demanda.",
          "Después de un rango, el primer retroceso puede volver a la zona de ruptura. La pregunta no es si toca un porcentaje exacto, sino si la antigua resistencia se comporta como soporte y si aparece un patrón comprador coherente.",
        ],
      },
      {
        title: "3. Retroceso profundo",
        key: "Corrección o microtendencia",
        paragraphs: [
          "Un retroceso profundo puede desarrollar máximos y mínimos decrecientes en el marco menor. Antes de comprar se exige una señal de que esa microestructura bajista terminó: ruptura de su último máximo, patrón W o desplazamiento comprador.",
          "Si el precio pierde el origen del impulso o acepta por debajo del soporte que debía sostenerlo, la hipótesis cambia. El estudiante debe aprender a cancelar una idea aunque el nivel de Fibonacci parezca atractivo.",
        ],
      },
      {
        title: "4. Entrada e invalidación",
        key: "Confirmación proporcional",
        paragraphs: [
          "La entrada agresiva anticipa en zona y necesita menor tamaño o una condición muy clara. La conservadora espera recuperación estructural; entra más tarde, pero reduce el riesgo de confundir continuación bajista con retroceso.",
          "El stop se vincula con el mínimo cuya pérdida invalida el patrón. La calculadora compara la distancia con el ATR del timeframe para detectar stops colocados dentro del ruido.",
        ],
      },
    ],
    workflow: [
      { title: "Impulso", detail: "Selecciona el tramo que rompió estructura." },
      { title: "Mide", detail: "Traza Fibonacci desde origen hasta extremo confirmado." },
      { title: "Contexto", detail: "Relaciona la zona con soporte, ruptura previa o demanda." },
      { title: "Responde", detail: "Exige evidencia de frenada y recuperación." },
      { title: "Calcula", detail: "Invalida bajo la tesis y comprueba R/R y ATR." },
    ],
    example: {
      title: "Retroceso profundo con microtendencia",
      context:
        "Tras un impulso alcista, el precio corrige hasta 61,8% mediante pequeños máximos y mínimos decrecientes.",
      development: [
        "Tocar 61,8% no activa la compra.",
        "Se marca el último máximo de la microtendencia bajista.",
        "Una W recupera la zona y el precio supera ese máximo.",
        "La invalidación queda bajo el barrido y el objetivo antes del máximo del impulso.",
      ],
      conclusion:
        "La confirmación transforma una zona potencial en una hipótesis verificable.",
    },
    errors: [
      { title: "Medir cualquier tramo", correction: "Usa el impulso que produjo ruptura estructural." },
      { title: "Comprar por tocar 61,8%", correction: "Espera respuesta de la demanda y fin de la microtendencia." },
      { title: "Ignorar el origen", correction: "Si el origen se pierde, reevalúa la lectura completa." },
      { title: "Stop dentro del retroceso", correction: "Ubícalo donde el patrón deja de existir y normalízalo por ATR." },
    ],
    checklist: [
      "La medición corresponde al impulso dominante.",
      "Sé si el retroceso es superficial, normal o profundo.",
      "Existe confluencia con una zona real.",
      "La microestructura confirma la recuperación.",
      "La entrada no persigue al precio.",
    ],
    lab: {
      title: "Retroceso medido y confirmado",
      mission:
        "Traza el impulso, identifica la profundidad, marca el final de la microtendencia y construye una operación con invalidación técnica.",
      steps: [
        "Selecciona el impulso que rompió estructura.",
        "Marca su origen y extremo.",
        "Clasifica la profundidad del retroceso.",
        "Localiza la resistencia interna que debe recuperar.",
        "Define entrada e invalidación.",
        "Descarta la operación si el objetivo no ofrece espacio.",
      ],
      pass: "75% global y medición correcta del impulso.",
      checkpoint: "10 retrocesos clasificados en tres profundidades.",
    },
    sources: [
      "Manual principal, módulo 2, pp. 35–55.",
      "Transcripciones: retrocesos, Fibonacci y prácticas.",
      "Guía de Estudio de Análisis Técnico Avanzado.",
    ],
  },
  {
    module: 3,
    question: "¿Cómo leer una caída sin vender tarde ni confundir agotamiento con continuidad?",
    introduction:
      "La estructura bajista invierte la lógica del módulo 1: máximos y mínimos decrecientes, impulsos de oferta y retrocesos vendedores. Se estudian cuatro configuraciones, desde la caída vertical con pausas simples hasta estructuras con dos patrones de continuación. El reto no es reconocer que el precio cae, sino encontrar una venta con espacio, entender cuándo una W es solo una trampa dentro de la caída y detectar agotamiento en un tercer impulso o en la zona 23-0 antes de vender demasiado tarde.",
    objectives: [
      "Reconocer estructura bajista y sus retrocesos.",
      "Diferenciar continuación, agotamiento y rebote técnico.",
      "Ubicar patrones vendedores en resistencia o pullback.",
      "Definir invalidación sobre la referencia que controla la oferta.",
    ],
    sections: [
      {
        title: "1. Estructura bajista",
        key: "Oferta que conserva el control",
        paragraphs: [
          "La secuencia se valida cuando los rebotes dejan máximos decrecientes y los impulsos crean nuevos mínimos. El máximo estructural es el punto que no debería recuperarse si la lectura bajista sigue vigente.",
          "Vender solo porque el precio ha caído mucho produce entradas tardías. Se espera un retroceso hacia resistencia, antigua zona de soporte rota o área donde la oferta tenga una invalidación clara.",
        ],
      },
      {
        title: "2. Retrocesos vendedores",
        key: "Vender caro dentro de una caída",
        paragraphs: [
          "Un retroceso bajista devuelve precio contra el impulso de oferta. Puede ser breve, normal o profundo. Cuanto más profundo, mayor necesidad de confirmar que la demanda no consiguió cambiar la estructura.",
          "Las velas vendedoras ganan valor cuando aparecen en resistencia y pierden valor al llegar directamente a un soporte. Una señal correcta en una mala ubicación puede no tener recorrido suficiente.",
        ],
      },
      {
        title: "3. Continuación y agotamiento",
        key: "No perseguir el tercer impulso",
        paragraphs: [
          "Los patrones de continuación se buscan después de una pausa o retroceso, no al final de una aceleración. Un tercer impulso extendido, una mecha de absorción o incapacidad para producir nuevos mínimos advierten agotamiento.",
          "Agotamiento no significa compra automática. Significa dejar de perseguir ventas y exigir una estructura alcista antes de considerar el giro.",
        ],
      },
      {
        title: "4. Ejecución de cortos",
        key: "Soportes, pullback y riesgo",
        paragraphs: [
          "La entrada conservadora espera ruptura y pullback; la agresiva actúa en resistencia con una señal definida. En ambos casos se verifica la distancia al soporte siguiente.",
          "La invalidación suele quedar sobre el máximo del retroceso o sobre la zona de oferta. En futuros se convierte la distancia a ticks y valor por contrato antes de seleccionar el número de contratos.",
        ],
      },
    ],
    workflow: [
      { title: "Sesgo", detail: "Confirma máximos y mínimos decrecientes." },
      { title: "Retroceso", detail: "Espera que el precio vuelva a una zona de oferta." },
      { title: "Espacio", detail: "Mide la distancia al soporte siguiente." },
      { title: "Gatillo", detail: "Exige rechazo, patrón M o pérdida de base." },
      { title: "Riesgo", detail: "Stop sobre la tesis y tamaño por ticks o porcentaje." },
    ],
    example: {
      title: "Pullback después de romper soporte",
      context:
        "NQ rompe un soporte intradía con desplazamiento, rebota hacia la zona perdida y forma un máximo menor.",
      development: [
        "La ruptura crea evidencia de oferta.",
        "El rebote vuelve a la antigua zona de soporte, ahora resistencia.",
        "La entrada se activa al perder la base del retroceso.",
        "El stop queda sobre el máximo menor y el objetivo antes del siguiente soporte.",
      ],
      conclusion:
        "Se vende el retroceso con invalidación clara, no la vela bajista extendida.",
    },
    errors: [
      { title: "Vender en soporte", correction: "Espera ruptura o rebote hacia resistencia." },
      { title: "Confundir agotamiento con giro", correction: "Detén la persecución y exige cambio estructural." },
      { title: "Ignorar el máximo del retroceso", correction: "Úsalo como referencia de invalidación." },
      { title: "Calcular riesgo sin tick value", correction: "En futuros convierte puntos a valor monetario por contrato." },
    ],
    checklist: [
      "Los máximos y mínimos relevantes son decrecientes.",
      "La venta ocurre en retroceso o pullback.",
      "No existe soporte inmediato que destruya el R/R.",
      "La señal vendedora aparece en ubicación válida.",
      "El riesgo monetario está calculado antes de entrar.",
    ],
    lab: {
      title: "Mapa de oferta y pullback",
      mission:
        "Marca máximo decreciente, mínimo roto, tramo de oferta, entrada en pullback, stop y objetivo.",
      steps: [
        "Identifica el impulso que perdió soporte.",
        "Marca el máximo que controla la lectura.",
        "Espera el retroceso a resistencia.",
        "Ubica la base cuya pérdida activa el corto.",
        "Coloca el stop sobre el máximo del retroceso.",
        "Comprueba espacio hasta el soporte.",
      ],
      pass: "75% global y no colocar la entrada directamente sobre soporte.",
      checkpoint: "10 escenarios bajistas, incluyendo tres casos de agotamiento.",
    },
    sources: [
      "Manual principal, módulo 3, pp. 56–74.",
      "Transcripciones del módulo 3: teoría y tres prácticas.",
      "CME Group: valor de ticks y gestión de posición, como complemento.",
    ],
  },
  {
    module: 4,
    question: "¿Qué informa una Vela Póker y por qué su ubicación cambia completamente la lectura?",
    introduction:
      "La Vela Póker se estudia como evidencia de control temporal, absorción y desplazamiento. Su cuerpo amplio no es una orden: puede expresar decisión o funcionar como anzuelo si aparece tarde y fuera de zona. La explicación comienza con cuerpo y mecha, avanza hacia los cuatro tipos de vela profesional y culmina con la regla temporal de 15 minutos: los minutos finales permiten observar atascamiento, absorción y cierre antes de buscar el gatillo en 3 o 1 minuto.",
    objectives: [
      "Reconocer anatomía, psicología y tipos de Vela Póker.",
      "Distinguir absorción, frenada, empuje y debilidad.",
      "Integrar contexto multitemporal y proyección de amplitud.",
      "Construir una entrada con confirmación e invalidación.",
    ],
    sections: [
      {
        title: "1. Anatomía y psicología",
        key: "Cuerpo, cierre y trayectoria interna",
        paragraphs: [
          "Una vela de cuerpo amplio y cierre cercano a un extremo muestra que un bando conservó el control durante gran parte del periodo. Sin embargo, dos velas con la misma forma externa pueden haberse construido de manera distinta; observar el marco menor revela empuje, retrocesos y absorción.",
          "Las mechas indican rechazo o negociación, pero no prueban por sí solas actividad institucional. El significado depende de soporte, resistencia, etapa de tendencia y respuesta posterior.",
        ],
      },
      {
        title: "2. Frenada, absorción y recompensa",
        key: "Secuencia ideal",
        paragraphs: [
          "La secuencia didáctica separa tres funciones: frenada del movimiento previo, absorción de la presión contraria y recompensa mediante desplazamiento. La Vela Póker adquiere mayor valor cuando resume esa transición en una zona relevante.",
          "Si aparece en mitad del rango, sin nivel y sin espacio, su cuerpo amplio puede ser solo volatilidad. La precaución principal es no confundir intensidad visual con ventaja estadística.",
        ],
      },
      {
        title: "3. Lectura multitemporal",
        key: "La vela mayor contiene una historia",
        paragraphs: [
          "Una vela terminada en diario o 15 minutos puede proyectarse y luego estudiarse en un marco menor. Allí se busca el proceso interno: base, barrido, recuperación y continuación.",
          "La vela del marco mayor aporta el mapa; el marco menor aporta el gatillo. Cambiar de temporalidad no debe cambiar arbitrariamente la tesis ni mover la invalidación.",
        ],
      },
      {
        title: "4. Operativa y proyección",
        key: "Confirmar antes de perseguir",
        paragraphs: [
          "La entrada puede realizarse en retroceso a la zona de origen o tras superar una referencia interna. La amplitud de la vela sirve como proyección educativa, pero se ajusta a resistencias, soportes y liquidez cercanos.",
          "Una Vela Póker ya mitigada o totalmente recorrida pierde frescura. Se documenta cuántas veces fue probada la zona y qué parte del rango fue consumida.",
        ],
      },
    ],
    workflow: [
      { title: "Ubica", detail: "Determina soporte, resistencia y fase de tendencia." },
      { title: "Anatomía", detail: "Evalúa cuerpo, cierre, mechas y desplazamiento." },
      { title: "Descompone", detail: "Mira el marco menor para entender la formación." },
      { title: "Confirma", detail: "Busca recuperación o continuación verificable." },
      { title: "Proyecta", detail: "Ajusta amplitud, invalidación y objetivo al contexto." },
    ],
    example: {
      title: "Vela Póker compradora en demanda",
      context:
        "Después de una caída de tres impulsos, el precio alcanza soporte, absorbe ventas y cierra con cuerpo amplio cerca del máximo.",
      development: [
        "La caída previa y el soporte aportan ubicación.",
        "El marco menor muestra barrido, recuperación y desplazamiento.",
        "Se espera retroceso controlado, no se persigue el cierre.",
        "La invalidación queda bajo la absorción y la proyección se limita por resistencia.",
      ],
      conclusion:
        "La vela resume información; la entrada necesita estructura, no entusiasmo.",
    },
    errors: [
      { title: "Operarla en cualquier lugar", correction: "Exige soporte, resistencia o transición estructural." },
      { title: "Perseguir el cierre", correction: "Espera retroceso o confirmación proporcional." },
      { title: "Confundir mecha con absorción", correction: "Revisa el proceso interno y la respuesta posterior." },
      { title: "Proyectar sin obstáculos", correction: "Limita el objetivo por estructura y liquidez." },
    ],
    checklist: [
      "La vela aparece en una zona relevante.",
      "El cuerpo y cierre muestran control real.",
      "El marco menor confirma la historia.",
      "La zona no está completamente mitigada.",
      "La invalidación protege la tesis y no la emoción.",
    ],
    lab: {
      title: "Autopsia de una Vela Póker",
      mission:
        "Identifica la vela, marca su rango, zona de origen, confirmación, invalidación y proyección ajustada.",
      steps: [
        "Clasifica el contexto previo.",
        "Marca máximo y mínimo de la vela.",
        "Localiza la absorción en el marco menor.",
        "Decide si esperar retroceso o confirmación.",
        "Coloca invalidación bajo la zona defendida.",
        "Compara amplitud proyectada con la resistencia real.",
      ],
      pass: "75% y justificación correcta de ubicación.",
      checkpoint: "10 Velas Póker: cinco válidas y cinco descartadas.",
    },
    sources: [
      "Manual principal, módulo 4, pp. 75–111.",
      "Guía de Estudio de Estrategia de Velas Póker.",
      "Protocolo Avanzado: Velas Póker y Order Blocks.",
    ],
  },
  {
    module: 5,
    question: "¿Cómo distinguir un Order Block útil de un rectángulo dibujado después del movimiento?",
    introduction:
      "El Order Block se trata como zona de origen de un desplazamiento, no como una vela mágica. La lectura básica delimita el cuerpo de la última vela contraria antes del empuje; la intermedia exige ruptura, ineficiencia y una razón para esperar órdenes remanentes. En el nivel avanzado el bloque recorre un ciclo verificable de generación, retracción, mitigación y finalización: cuando queda completado, el mapa debe avanzar al siguiente bloque válido. El módulo integra además frescura, confluencia, objetivos magnéticos y ejecución multitemporal.",
    objectives: [
      "Identificar origen, límites y desplazamiento del bloque.",
      "Evaluar frescura, mitigación y consumo.",
      "Relacionar el bloque con estructura y Vela Póker.",
      "Diseñar entrada agresiva o confirmada con invalidación.",
    ],
    sections: [
      {
        title: "1. Origen y desplazamiento",
        key: "La salida valida la zona",
        paragraphs: [
          "Se busca la última zona contraria o base de negociación antes de un desplazamiento que rompió una referencia. Sin desplazamiento ni consecuencia estructural, el rectángulo tiene poco valor didáctico.",
          "Los límites deben ser consistentes: cuerpo completo o rango según la regla del curso, pero nunca se redibujan después para hacer coincidir la reacción.",
        ],
      },
      {
        title: "2. Mitigación y frescura",
        key: "Cada visita consume información",
        paragraphs: [
          "La mitigación es el regreso del precio a la zona para negociar órdenes pendientes. La primera visita suele estudiarse por separado de una tercera o cuarta prueba, porque el bloque puede estar parcialmente consumido.",
          "Se registra profundidad de la visita, reacción y si el precio atravesó el bloque con aceptación. Una mecha no equivale a invalidación; un cierre y permanencia más allá del límite sí debilitan la tesis.",
        ],
      },
      {
        title: "3. Confluencia con Vela Póker",
        key: "Mapa mayor, gatillo menor",
        paragraphs: [
          "Una Vela Póker en marco mayor puede señalar el desplazamiento y ayudar a proyectar la zona. En el marco menor se identifica el Order Block que originó la salida y se espera la mitigación.",
          "La confluencia no significa sumar indicadores indiscriminadamente. Cada elemento cumple una función: contexto, zona, confirmación o riesgo.",
        ],
      },
      {
        title: "4. Entrada e invalidación",
        key: "Agresiva o confirmada",
        paragraphs: [
          "La entrada agresiva se plantea en el bloque fresco con tamaño reducido y stop fuera de la zona. La confirmada espera barrido, patrón W/M o ruptura interna; sacrifica precio a cambio de evidencia.",
          "Si el stop necesario destruye el R/R o la zona ya fue consumida, el ejercicio correcto es descartar la operación.",
        ],
      },
    ],
    workflow: [
      { title: "Consecuencia", detail: "Exige desplazamiento y ruptura después de la zona." },
      { title: "Delimita", detail: "Marca límites sin reajustarlos retrospectivamente." },
      { title: "Frescura", detail: "Cuenta visitas y profundidad de mitigación." },
      { title: "Gatillo", detail: "Elige entrada agresiva o confirmada." },
      { title: "Descarta", detail: "Anula si hay aceptación fuera de zona o mal R/R." },
    ],
    example: {
      title: "Mitigación de bloque comprador",
      context:
        "Una base estrecha precede un desplazamiento que rompe el máximo de sesión. Horas después, el precio vuelve por primera vez.",
      development: [
        "La consecuencia valida la zona de origen.",
        "La primera visita penetra parcialmente y recupera el bloque.",
        "En el marco menor aparece una W2 y ruptura interna.",
        "El stop queda bajo el bloque; el objetivo vuelve al máximo de sesión.",
      ],
      conclusion:
        "La zona aporta ubicación y el patrón aporta confirmación; ninguno sustituye al otro.",
    },
    errors: [
      { title: "Dibujar cualquier vela contraria", correction: "Exige desplazamiento y consecuencia estructural." },
      { title: "Ignorar visitas previas", correction: "Clasifica frescura y consumo." },
      { title: "Mover los límites", correction: "Define una regla de delimitación antes de ver la reacción." },
      { title: "Entrar sin espacio", correction: "Mide objetivo y obstáculos antes de validar." },
    ],
    checklist: [
      "El bloque originó desplazamiento verificable.",
      "Los límites se definieron con una regla fija.",
      "Sé cuántas mitigaciones ha recibido.",
      "La entrada corresponde al nivel de confirmación.",
      "La invalidación está fuera de la zona.",
    ],
    lab: {
      title: "Delimitación y mitigación de Order Block",
      mission:
        "Marca los límites del bloque, el desplazamiento, la primera mitigación, el gatillo, stop y objetivo.",
      steps: [
        "Localiza la ruptura que da consecuencia.",
        "Retrocede hasta la base de origen.",
        "Delimita la zona sin mirar la reacción futura.",
        "Clasifica la visita y el grado de consumo.",
        "Busca confirmación interna.",
        "Valida R/R o descarta.",
      ],
      pass: "75% y límites dentro de la tolerancia de la zona.",
      checkpoint: "10 bloques: registrar frescura, mitigación y resultado en R.",
    },
    sources: [
      "Transcripciones del módulo 5: seis clases y ejercicios.",
      "Protocolo Avanzado: Integración de Velas Póker y Order Blocks.",
      "Market Architect Blueprint e Institutional Trading Playbook.",
    ],
  },
  {
    module: 6,
    question: "¿Cómo convertir el análisis en una rutina repetible y auditable?",
    introduction:
      "Una rutina profesional reduce decisiones improvisadas. El módulo organiza preparación, mapa de trabajo, selección de escenarios, riesgo, ejecución y revisión. El objetivo no es operar todos los días, sino aplicar el mismo proceso incluso cuando la decisión correcta sea no participar.",
    objectives: [
      "Construir una preparación top-down antes de la sesión.",
      "Usar checklists sin convertirlos en trámites automáticos.",
      "Separar plan, ejecución y resultado.",
      "Registrar errores de proceso y disciplina.",
    ],
    sections: [
      {
        title: "1. Preparación antes del mercado",
        key: "Contexto primero",
        paragraphs: [
          "La sesión comienza con marcos altos, niveles relevantes, tendencia, rango y eventos que puedan alterar volatilidad. Se define qué condiciones habilitan largos, cortos o ninguna operación.",
          "El mapa previo evita redibujar la narrativa cada vez que aparece una vela rápida. Las zonas se registran antes y luego se observa cómo responde el precio.",
        ],
      },
      {
        title: "2. Checklist de oportunidad",
        key: "Filtrar antes de ejecutar",
        paragraphs: [
          "Una oportunidad debe cumplir contexto, ubicación, gatillo, invalidación y espacio. Si falta una pieza, se clasifica como observación, no como operación.",
          "El checklist debe contener decisiones verificables. Preguntas vagas como '¿se ve bien?' se sustituyen por criterios como '¿el stop está fuera del mínimo estructural?'",
        ],
      },
      {
        title: "3. Ejecución y gestión",
        key: "Plan escrito",
        paragraphs: [
          "Antes de enviar una orden se registran entrada, stop, objetivo, riesgo y motivo. Durante la operación solo se realizan ajustes previstos: parcial, break-even o trailing bajo reglas definidas.",
          "La pantalla no debe transformar una idea de swing en scalping por ansiedad. El timeframe de gestión se decide en el plan.",
        ],
      },
      {
        title: "4. Revisión deliberada",
        key: "Calidad de proceso",
        paragraphs: [
          "Una operación ganadora puede violar reglas y una pérdida puede estar bien ejecutada. La revisión puntúa lectura, disciplina, invalidación y gestión por separado.",
          "Los errores se agrupan para diseñar práctica: anticipación, mala ubicación, exceso de riesgo, mover stop o cerrar antes. El diario convierte experiencias aisladas en evidencia.",
        ],
      },
    ],
    workflow: [
      { title: "Prepara", detail: "Marca contexto, zonas y escenarios antes de la sesión." },
      { title: "Filtra", detail: "Exige cinco condiciones verificables." },
      { title: "Planifica", detail: "Registra entrada, stop, objetivo y riesgo." },
      { title: "Ejecuta", detail: "Solo aplica ajustes previamente autorizados." },
      { title: "Revisa", detail: "Puntúa proceso y crea el próximo ejercicio." },
    ],
    example: {
      title: "Sesión sin operación",
      context:
        "El plan favorece compras en soporte, pero el precio abre en mitad del rango y permanece sin estructura durante dos horas.",
      development: [
        "El contexto no ofrece ubicación.",
        "Las velas rápidas no cumplen el checklist.",
        "Se registra 'sin operación' con captura y motivo.",
        "La revisión confirma disciplina aunque no exista P&L.",
      ],
      conclusion:
        "No operar también es una ejecución correcta cuando el escenario no aparece.",
    },
    errors: [
      { title: "Plan después de entrar", correction: "Registra tesis y riesgo antes de enviar la orden." },
      { title: "Checklist subjetivo", correction: "Convierte cada regla en una condición observable." },
      { title: "Cambiar timeframe", correction: "Gestiona desde el marco definido en el plan." },
      { title: "Evaluar solo P&L", correction: "Separa resultado de calidad de ejecución." },
    ],
    checklist: [
      "El mapa se creó antes de la sesión.",
      "La operación cumple contexto, zona y gatillo.",
      "Entrada, stop y objetivo están escritos.",
      "El riesgo monetario es fijo y asumible.",
      "La revisión incluye captura y error principal.",
    ],
    lab: {
      title: "Simulador de rutina completa",
      mission:
        "Completa preparación, selección, plan, ejecución y revisión sobre un escenario donde también puedes decidir no operar.",
      steps: [
        "Marca contexto del marco mayor.",
        "Define dos zonas y tres escenarios.",
        "Aplica el checklist al movimiento presentado.",
        "Registra entrada o decisión de no operar.",
        "Calcula el riesgo antes de revelar el resultado.",
        "Puntúa la ejecución sin usar el P&L como criterio único.",
      ],
      pass: "Completar todas las etapas y mantener disciplina de riesgo.",
      checkpoint: "10 sesiones documentadas, incluidas al menos dos sin operación.",
    },
    sources: [
      "Transcripción del módulo 6: Creando rutinas de trabajo.",
      "Institutional Trading Playbook y Market Architect Blueprint.",
      "CME Group: Trade and Risk Management, como complemento.",
    ],
  },
  {
    module: 7,
    question: "¿Cómo leer la historia interna de una vela y distinguir W, M, absorción y engaño?",
    introduction:
      "Este módulo integra el sistema de lectura de velas, patrones W/M, velas compradoras y vendedoras, giros en V, POC y rangos en extremos. La progresión empieza por reconocer cuerpo y mecha, continúa con velas tipo 1, 2, 3 y 4 y termina con variantes W/M, barridos y sincronización 15m/3m. La forma final nunca se interpreta aislada: se contrasta con su recorrido interno, ubicación, tiempo consumido y recuperación de la base.",
    objectives: [
      "Descomponer una vela mayor en su movimiento interno.",
      "Diferenciar variantes W1, W2, W3 y sus equivalentes M.",
      "Clasificar velas profesionales tipo 1, 2, 3 y 4.",
      "Detectar engaños, rangos y zonas donde no ejecutar.",
    ],
    sections: [
      {
        title: "1. Mirar dentro de la vela",
        key: "La forma es el resumen",
        paragraphs: [
          "Una vela de 15 minutos contiene quince velas de un minuto. El cuerpo y las mechas resumen ese trayecto, pero la secuencia interna permite distinguir caída continua, absorción, rango o recuperación tardía.",
          "La lectura se realiza al cierre para evitar atribuir significado definitivo a una vela que todavía está cambiando.",
        ],
      },
      {
        title: "2. Patrones W y M",
        key: "Base, barrido o urgencia",
        paragraphs: [
          "W1 prueba un nivel similar; W2 barre el primer mínimo y recupera; W3 deja un segundo mínimo más alto. Las variantes M reflejan la lógica opuesta en resistencias.",
          "La base o máximo central funciona como confirmación. Anticipar antes de recuperarlo aumenta el riesgo de entrar en una continuación del movimiento previo.",
        ],
      },
      {
        title: "3. Velas tipo 1, 2, 3 y 4",
        key: "Ubicación transforma el significado",
        paragraphs: [
          "Una vela tipo 1 de cuerpo amplio puede ser continuidad en mitad de tendencia o frenada si termina sobre soporte después de una caída extendida. La tipo 2 muestra rechazo intermedio; la tipo 3, absorción violenta; la tipo 4 puede advertir giro en extremos.",
          "No se memorizan siluetas aisladas. Cada clasificación responde a qué hizo la oferta, cómo reaccionó la demanda y dónde ocurrió.",
        ],
      },
      {
        title: "4. Rangos, POC y engaños",
        key: "No operar la base del rango",
        paragraphs: [
          "Cuando la vela consume tiempo en una franja estrecha, se forma equilibrio y concentración de negociación. Romper momentáneamente un extremo puede buscar liquidez sin iniciar tendencia.",
          "En rangos superiores se evita comprar el rompimiento tardío; en rangos inferiores se evita vender la base. Se espera recuperación, pullback o ruptura con aceptación.",
        ],
      },
    ],
    workflow: [
      { title: "Espera cierre", detail: "No clasifiques una vela aún incompleta." },
      { title: "Descompone", detail: "Observa la secuencia del marco menor." },
      { title: "Clasifica", detail: "Distingue W/M, tipo de vela y función." },
      { title: "Ubica", detail: "Relaciona con soporte, resistencia, POC o rango." },
      { title: "Confirma", detail: "Activa solo tras base, recuperación o pullback." },
    ],
    example: {
      title: "W2 con barrido de liquidez",
      context:
        "El precio cae a soporte, forma un primer mínimo, barre ligeramente ese nivel y recupera con cierre fuerte.",
      development: [
        "El segundo mínimo ejecuta stops, pero no basta por sí solo.",
        "La recuperación devuelve precio sobre el primer suelo.",
        "La ruptura del máximo central confirma el patrón.",
        "El stop queda bajo el barrido y el objetivo antes de resistencia.",
      ],
      conclusion:
        "El barrido es una hipótesis; la recuperación y ruptura convierten la lectura en proceso.",
    },
    errors: [
      { title: "Nombrar W antes de confirmar", correction: "Espera recuperación y ruptura de la base." },
      { title: "Leer una vela incompleta", correction: "Evalúa al cierre y revisa su formación." },
      { title: "Ignorar el rango", correction: "No operes el extremo equivocado de una zona de equilibrio." },
      { title: "Memorizar siluetas", correction: "Explica función, ubicación y respuesta." },
    ],
    checklist: [
      "La vela está cerrada.",
      "Conozco su recorrido interno.",
      "El patrón está en soporte o resistencia relevante.",
      "La base o máximo central confirma.",
      "La invalidación queda tras el extremo real.",
    ],
    lab: {
      title: "Reconstrucción de una W2",
      mission:
        "Marca primer suelo, barrido, máximo central, confirmación, invalidación y objetivo.",
      steps: [
        "Localiza soporte y primera reacción.",
        "Distingue barrido de ruptura aceptada.",
        "Marca el máximo central.",
        "Espera recuperación y confirmación.",
        "Ubica stop bajo el barrido.",
        "Clasifica el patrón y explica por qué no es W1 ni W3.",
      ],
      pass: "75% y clasificación correcta de la variante.",
      checkpoint: "20 patrones: W1/W2/W3 y M1/M2/M3 equilibrados.",
    },
    sources: [
      "Manual principal, sistema de lectura, pp. 112–212.",
      "Transcripciones del módulo 7: once clases teóricas y prácticas.",
      "Guías Maestras de Formación W y Velas Tipo 1, 2 y 3.",
    ],
  },
  {
    module: 8,
    question: "¿Cómo usar las medias 30/75 como mapa dinámico sin convertir cada cruce en una señal?",
    introduction:
      "Las medias exponenciales 30 y 75 ayudan a visualizar sesgo y zonas de rebote. El curso recalca que el cruce llega tarde y no es el punto de entrada. Se estudia la relación precio-medias, la pendiente, el marco temporal y la calidad del retroceso.",
    objectives: [
      "Interpretar posición y pendiente de las medias.",
      "Distinguir tendencia limpia de dientes de sierra.",
      "Buscar rebotes con estructura y confirmación.",
      "Adaptar gestión a swing, intradía y timeframe.",
    ],
    sections: [
      {
        title: "1. Función de las medias",
        key: "Mapa, no disparador",
        paragraphs: [
          "La media rápida responde antes y la 75 representa una referencia más lenta. Precio y medias alineados ayudan a ver sesgo, pero un cruce refleja información que ya ocurrió.",
          "El módulo no compra o vende el punto exacto del cruce. Espera que el precio se ordene, retroceda a una media y muestre una respuesta coherente con la estructura.",
        ],
      },
      {
        title: "2. Pendiente y separación",
        key: "Calidad de tendencia",
        paragraphs: [
          "Medias inclinadas y separadas acompañan un movimiento direccional. Medias planas, entrelazadas y atravesadas repetidamente describen dientes de sierra; allí aumentan señales falsas.",
          "La distancia excesiva entre precio y media advierte extensión. Perseguir el precio reduce el espacio y amplía la invalidación.",
        ],
      },
      {
        title: "3. Rebote en 30 o 75",
        key: "Contacto más reacción",
        paragraphs: [
          "La media 30 puede sostener retrocesos superficiales; la 75 suele participar en correcciones más profundas. El contacto no activa la operación: se exige soporte, patrón comprador o vendedor y recuperación.",
          "En marcos mayores, la estrategia requiere paciencia y stops acordes con volatilidad. Se revisa cada pocos días, no cada minuto.",
        ],
      },
      {
        title: "4. Gestión de tendencia",
        key: "Dejar correr sin abandonar el riesgo",
        paragraphs: [
          "El stop inicial se fija por estructura. Después puede seguir mínimos o máximos relevantes, no necesariamente la media. Salir solo por un cruce contrario puede devolver demasiado beneficio.",
          "La estrategia se evalúa con backtesting que incluya todos los escenarios definidos, no solo los ejemplos más limpios.",
        ],
      },
    ],
    workflow: [
      { title: "Alinea", detail: "Comprueba precio, pendiente y orden de medias." },
      { title: "Filtra", detail: "Descarta medias planas y dientes de sierra." },
      { title: "Espera", detail: "Deja que el precio vuelva a 30 o 75." },
      { title: "Confirma", detail: "Exige estructura y vela coherente." },
      { title: "Gestiona", detail: "Sigue estructura y riesgo, no emoción." },
    ],
    example: {
      title: "Rebote en EMA 75 con tendencia limpia",
      context:
        "En gráfico diario, precio y EMA 30 permanecen sobre EMA 75; el retroceso alcanza la 75 por primera vez.",
      development: [
        "La pendiente positiva y separación previa indican sesgo.",
        "El precio forma soporte y recupera la EMA 30.",
        "La entrada conservadora espera superar el máximo del patrón.",
        "La gestión sigue mínimos crecientes y no un cruce tardío.",
      ],
      conclusion:
        "La media localiza; la estructura confirma y gestiona.",
    },
    errors: [
      { title: "Entrar en el cruce", correction: "Espera orden, retroceso y confirmación." },
      { title: "Operar medias planas", correction: "Clasifica dientes de sierra como entorno no tendencial." },
      { title: "Perseguir distancia extrema", correction: "Espera retorno hacia valor." },
      { title: "Stop idéntico en todos los marcos", correction: "Normaliza por estructura, ATR y valor monetario." },
    ],
    checklist: [
      "Las medias tienen pendiente y orden coherentes.",
      "No existe dientes de sierra.",
      "El retroceso llega a una zona con soporte o resistencia.",
      "La reacción confirma el sesgo.",
      "La gestión corresponde al timeframe.",
    ],
    lab: {
      title: "Rebote 30/75 con filtro de régimen",
      mission:
        "Clasifica el régimen, marca contacto, confirmación, entrada, stop y objetivo; descarta si las medias están planas.",
      steps: [
        "Evalúa pendiente y separación.",
        "Decide si existe tendencia o dientes de sierra.",
        "Identifica la media relevante.",
        "Marca la reacción estructural.",
        "Calcula stop normalizado por ATR.",
        "Selecciona gestión de swing o intradía.",
      ],
      pass: "75% y decisión correcta de operar o descartar.",
      checkpoint: "20 contactos: separar rebotes válidos de cruces sin tendencia.",
    },
    sources: [
      "Transcripciones del módulo 8: cinco clases de medias 30/75.",
      "Material principal: estrategias de alta rentabilidad.",
      "CMT Association: tendencia y análisis multitemporal, como complemento.",
    ],
  },
  {
    module: 9,
    question: "¿Cómo usar el Canal Donchian como termómetro de volatilidad, contexto y ruptura?",
    introduction:
      "El Canal Donchian representa el máximo y mínimo de un periodo y su línea media. En el curso se combina con estructura, soportes, resistencias y medias; tocar una banda no es por sí mismo compra ni venta. El módulo compara entradas agresivas, conservadoras y rebotes.",
    objectives: [
      "Comprender cálculo y lectura del canal.",
      "Distinguir expansión, contracción y ruptura falsa.",
      "Aplicar señales alcistas y bajistas con contexto.",
      "Combinar canal con medias 30/75 y gestión.",
    ],
    sections: [
      {
        title: "1. Construcción del canal",
        key: "Máximo, mínimo y punto medio",
        paragraphs: [
          "La banda superior refleja el máximo del periodo seleccionado y la inferior el mínimo; la media resume el centro del rango. Cuando el canal se expande, la volatilidad y el rango reciente aumentan; cuando se comprime, el mercado acumula tiempo en menos precio.",
          "La configuración debe mantenerse constante durante la evaluación. Cambiar el periodo para hacer coincidir el pasado introduce sesgo.",
        ],
      },
      {
        title: "2. Señales alcistas",
        key: "Ruptura o rebote confirmado",
        paragraphs: [
          "Una entrada agresiva puede aparecer al recuperar una banda o romper el máximo con contexto favorable. La conservadora espera retroceso y confirmación después de la ruptura.",
          "Los rebotes desde soporte o medias 30/75 se estudian cuando el canal acompaña la dirección y existe recorrido hasta la banda opuesta o resistencia.",
        ],
      },
      {
        title: "3. Señales bajistas",
        key: "Simetría con obstáculos",
        paragraphs: [
          "Para ventas se analiza pérdida de banda inferior, retroceso a resistencia y relación con medias. Vender directamente sobre soporte o tras expansión extrema reduce la calidad.",
          "Una ruptura que regresa rápido al canal puede ser engaño. Se exige aceptación fuera o pullback, según el tipo de entrada.",
        ],
      },
      {
        title: "4. Régimen y gestión",
        key: "El canal como termómetro",
        paragraphs: [
          "En tendencia, el precio puede caminar por una banda durante varios periodos; interpretar cada toque como sobrecompra genera salidas prematuras. En lateralidad, las bandas funcionan como extremos del rango y los rompimientos fallan con mayor frecuencia.",
          "La línea media puede servir para seguimiento, pero el stop técnico continúa vinculado a estructura. El canal organiza observación; no elimina la necesidad de invalidación.",
        ],
      },
    ],
    workflow: [
      { title: "Configura", detail: "Fija periodo y timeframe antes del análisis." },
      { title: "Régimen", detail: "Clasifica tendencia, rango, expansión o contracción." },
      { title: "Señal", detail: "Elige ruptura, conservadora o rebote." },
      { title: "Confirma", detail: "Exige aceptación, pullback o patrón." },
      { title: "Gestiona", detail: "Stop por estructura y objetivo por banda o nivel." },
    ],
    example: {
      title: "Ruptura alcista con pullback",
      context:
        "El canal se comprime, el precio rompe la banda superior con desplazamiento y vuelve al antiguo máximo.",
      development: [
        "La compresión prepara, pero no predice la dirección.",
        "La ruptura expande el canal y supera resistencia.",
        "El pullback mantiene el precio fuera del rango y forma mínimo creciente.",
        "El stop queda bajo el pullback y la gestión sigue estructura.",
      ],
      conclusion:
        "La ruptura aporta evidencia; el pullback aporta ubicación e invalidación.",
    },
    errors: [
      { title: "Vender cada banda superior", correction: "En tendencia el precio puede caminar por la banda." },
      { title: "Cambiar periodo retrospectivamente", correction: "Fija configuración y pruébala con muestra completa." },
      { title: "Confundir toque con señal", correction: "Añade régimen, zona y confirmación." },
      { title: "Ignorar ruptura falsa", correction: "Evalúa aceptación fuera del canal o pullback." },
    ],
    checklist: [
      "El periodo y timeframe están definidos.",
      "Sé si el canal se expande o contrae.",
      "La señal corresponde al régimen.",
      "Existe confirmación y espacio.",
      "La invalidación depende de estructura.",
    ],
    lab: {
      title: "Ruptura Donchian y prueba de aceptación",
      mission:
        "Marca bandas, compresión, ruptura, pullback, entrada, stop y objetivo; decide si existe aceptación.",
      steps: [
        "Clasifica el canal antes de la ruptura.",
        "Marca banda superior e inferior.",
        "Identifica el cierre que expande el canal.",
        "Evalúa regreso, aceptación y mínimo creciente.",
        "Coloca entrada e invalidación.",
        "Compara estrategia agresiva y conservadora.",
      ],
      pass: "75% y clasificación correcta de ruptura válida o engaño.",
      checkpoint: "20 señales: compras, ventas, rebotes y falsas rupturas.",
    },
    sources: [
      "Manual principal, módulo 9, pp. 213–268.",
      "Clases: presentación, señales alcistas, bajistas y estrategias.",
      "TradingView: Donchian Channels, como referencia complementaria del cálculo.",
    ],
  },
  {
    module: 10,
    question:
      "¿Qué cambia al operar criptomonedas si la estructura del gráfico parece igual?",
    introduction:
      "La lectura técnica conserva principios como estructura, ubicación e invalidación, pero el vehículo añade riesgos propios: custodia, operación continua, fragmentación entre exchanges, liquidez desigual y apalancamiento. Este módulo no enseña a comprar una moneda por su narrativa; enseña a verificar qué activo se está negociando, dónde se custodia y si la ejecución permite respetar el riesgo previsto.",
    objectives: [
      "Explicar blockchain, clave pública, clave privada y custodia sin confundir sus funciones.",
      "Diferenciar spot, futuros perpetuos y exposición apalancada.",
      "Evaluar spread, profundidad y deslizamiento antes de usar una señal técnica.",
      "Calcular el tamaño desde la invalidación y no desde el margen disponible.",
    ],
    sections: [
      {
        title: "1. Activo digital y registro distribuido",
        key: "Blockchain no equivale a rentabilidad",
        paragraphs: [
          "Una blockchain es un registro compartido en el que las transacciones se agrupan y enlazan mediante criptografía. Que un activo use blockchain describe su infraestructura; no demuestra demanda futura, liquidez suficiente ni calidad como inversión. Por ejemplo, dos tokens pueden liquidarse en cadena y tener riesgos económicos totalmente distintos.",
          "Esto parece una validación fundamental cuando se repite que una red es 'descentralizada', pero no lo es si no se revisan validadores, concentración, uso y reglas del protocolo. La conexión con la siguiente lección es directa: comprender la red no protege los fondos si la custodia se gestiona mal.",
        ],
      },
      {
        title: "2. Monederos, claves y custodia",
        key: "Controlar la clave implica asumir la responsabilidad",
        paragraphs: [
          "La dirección pública sirve para recibir; la clave privada o frase semilla autoriza movimientos. En custodia propia, perder la semilla puede hacer irrecuperables los fondos. En custodia de un exchange, el usuario delega parte de ese control y asume riesgo de contraparte y disponibilidad.",
          "Un monedero instalado no es automáticamente seguro: parece protección, pero no lo es si la frase semilla se guarda en una captura sincronizada o se entrega a un tercero. Una vez definido dónde se mantiene el activo, la siguiente pregunta es cómo cambia la ejecución entre spot y derivados.",
        ],
      },
      {
        title: "3. Spot, perpetuos y apalancamiento",
        key: "El margen no es el riesgo",
        paragraphs: [
          "En spot se intercambia el activo; en un futuro perpetuo se mantiene una exposición derivada que puede incorporar funding, margen y liquidación. Ejemplo editorial: con una cuenta de 10 000 USDT y riesgo máximo de 1%, la pérdida permitida son 100 USDT. Si la entrada está en 60 000 y el stop en 59 400, la distancia es 600; el tamaño teórico es 100/600 = 0,1667 BTC antes de comisiones y deslizamiento.",
          "Esto parece conservador cuando el exchange exige poco margen, pero no lo es si el nominal convierte el stop en una pérdida superior al límite. La conexión con la última lección es que ese cálculo solo se cumple si el mercado posee liquidez suficiente para ejecutar cerca del precio planificado.",
        ],
      },
      {
        title: "4. Liquidez, operación continua y selección",
        key: "La misma figura no tiene la misma calidad de ejecución",
        paragraphs: [
          "El mercado cripto opera sin cierre semanal uniforme y la liquidez cambia por activo, exchange y hora. Un spread reducido y profundidad cercana al precio permiten aproximarse al riesgo calculado; una altcoin delgada puede añadir deslizamiento, mechas y rupturas falsas.",
          "Una ruptura en BTCUSDT y otra idéntica en un token sin volumen parecen el mismo setup, pero no lo son porque la segunda puede no admitir el tamaño ni el stop previstos. El módulo cierra uniendo vehículo y método: primero se valida el mercado, después la estructura y finalmente la operación.",
        ],
      },
    ],
    workflow: [
      {
        title: "Identifica",
        detail:
          "Verifica activo, red, par y contrato; descarta símbolos parecidos o derivados cuya especificación no comprendas.",
      },
      {
        title: "Custodia",
        detail:
          "Define quién controla las claves y cómo se recupera el acceso; evita registrar secretos en notas o capturas.",
      },
      {
        title: "Liquidez",
        detail:
          "Compara spread, profundidad y volumen del instrumento; descarta el escenario si el deslizamiento rompe el riesgo.",
      },
      {
        title: "Estructura",
        detail:
          "Aplica tendencia, zona e invalidación igual que en otros mercados, sin convertir la narrativa del token en confirmación.",
      },
      {
        title: "Dimensiona",
        detail:
          "Calcula pérdida máxima desde entrada y stop, añade costos y comprueba que el tamaño mínimo sea compatible.",
      },
    ],
    example: {
      title: "Mismo patrón, dos calidades de mercado",
      context:
        "BTCUSDT y una altcoin forman una W2 en 15 minutos. BTC presenta spread estrecho; la altcoin tiene poca profundidad y velas con saltos.",
      development: [
        "En ambos gráficos se marca el barrido, la base y la invalidación.",
        "Se estima el costo de entrada y salida para el tamaño previsto.",
        "BTC conserva un R/R superior a 2 después de costos; la altcoin cae a 1,2 por deslizamiento.",
        "La señal técnica puede ser válida en ambos, pero solo BTC conserva una ejecución compatible con el plan.",
      ],
      conclusion:
        "Seleccionar el vehículo forma parte del análisis; una figura correcta no compensa una ejecución incontrolable.",
    },
    errors: [
      {
        title: "Elegir por narrativa",
        correction:
          "Ocurre por sesgo de disponibilidad: una historia memorable sustituye datos de liquidez, estructura y riesgo.",
      },
      {
        title: "Compartir la frase semilla",
        correction:
          "Surge al confundir soporte técnico con custodia; ningún análisis justifica entregar la clave que autoriza los fondos.",
      },
      {
        title: "Dimensionar por margen",
        correction:
          "El bajo margen visible crea ilusión de riesgo pequeño; calcula la pérdida al stop sobre el valor nominal.",
      },
      {
        title: "Ignorar el deslizamiento",
        correction:
          "Se asume que el precio marcado será ejecutable; valida profundidad y reduce tamaño o descarta.",
      },
    ],
    checklist: [
      "Identifiqué activo, red, par y tipo de contrato.",
      "No registré ni compartí claves privadas o frase semilla.",
      "Medí spread y profundidad para el tamaño previsto.",
      "Entrada, invalidación y objetivo siguen una estructura observable.",
      "El riesgo total incluye comisiones, funding estimado y deslizamiento.",
    ],
    lab: {
      title: "Selección de mercado y riesgo cripto",
      mission:
        "Marca estructura, barrido, entrada, stop y objetivo; después decide si la liquidez permite ejecutar el tamaño calculado.",
      steps: [
        "Confirma el par y si el escenario representa spot o derivado.",
        "Marca máximo y mínimo estructural.",
        "Identifica el impulso y la zona de liquidez.",
        "Define entrada e invalidación antes del objetivo.",
        "Calcula tamaño, R/R y distancia porcentual.",
        "Descarta si spread o deslizamiento alteran el riesgo permitido.",
      ],
      pass:
        "75% global, riesgo menor o igual al límite y decisión correcta de ejecutar o descartar.",
      checkpoint:
        "10 comparaciones entre mercados líquidos y delgados; dominio avanzado con 20.",
    },
    sources: [
      "Manual principal, módulo 10, pp. 269–277.",
      "Matriz de estrategias: inversión en valor y selección de criptoactivos.",
      "Elaboración editorial: ejemplos numéricos de riesgo y comparación de liquidez.",
    ],
  },
];

export const complementaryReferences = [
  {
    title: "CMT Association · Technical Analysis: Modern Perspectives",
    url: "https://cmtassociation.org/wp-content/uploads/2019/01/Technical-Analysis-Modern-Perspectives-CMT-Association.pdf",
    note: "Soporte, resistencia y análisis técnico reproducible.",
  },
  {
    title: "CME Group · Trade and Risk Management",
    url: "https://www.cmegroup.com/education/courses/trade-and-risk-management",
    note: "Riesgo por operación, stop y tamaño de posición.",
  },
  {
    title: "CME Group · Cálculo de P&L en futuros",
    url: "https://www.cmegroup.com/education/courses/introduction-to-futures/calculating-futures-contract-profit-or-loss",
    note: "Ticks, valor por contrato y efecto del tamaño.",
  },
  {
    title: "TradingView · Donchian Channels",
    url: "https://www.tradingview.com/support/solutions/43000502253-donchian-channels-dc/",
    note: "Definición y cálculo de bandas superior, inferior y media.",
  },
];
