import {
  complementaryReferences,
  moduleCurriculum as previousCurriculum,
  type ModuleCurriculum,
  type ModuleSection,
} from "./module-content.ts";

type NarrativeModule = Pick<
  ModuleCurriculum,
  "question" | "introduction" | "objectives" | "sections" | "sources"
>;

const section = (
  title: string,
  key: string,
  paragraphs: string[],
  source: string,
  bridge: string,
  checks: Array<[string, string]>,
): ModuleSection => ({
  title,
  key,
  paragraphs,
  source,
  bridge,
  checks: checks.map(([question, answer]) => ({ question, answer })),
});

const narratives: Record<number, NarrativeModule> = {
  1: {
    question:
      "¿Cómo se construye una tendencia alcista desde la primera lectura del gráfico?",
    introduction:
      "Este módulo empieza antes de buscar entradas. Primero aprenderás qué representa una vela, cómo se forma un giro relevante y por qué una sucesión de velas aisladas no equivale todavía a una tendencia. Después organizarás el movimiento en impulsos, retrocesos y pausas; solo entonces estudiarás los patrones de continuación y las señales de agotamiento. El objetivo es que puedas explicar la historia del precio de izquierda a derecha y señalar exactamente qué nivel invalida esa historia.",
    objectives: [
      "Distinguir vela, oscilación, extremo visual y extremo estructural.",
      "Reconstruir una secuencia alcista mediante máximos y mínimos relevantes.",
      "Separar impulso, retroceso, pausa y patrón de continuación por su función.",
      "Reconocer cuándo una tendencia conserva dirección pero ya no ofrece una entrada eficiente.",
      "Definir invalidación, objetivo y riesgo antes de ejecutar.",
    ],
    sections: [
      section(
        "1. Antes de hablar de tendencia: aprender a leer los giros",
        "Vela → oscilación → estructura",
        [
          "Una vela resume apertura, máximo, mínimo y cierre durante un intervalo. Varias velas forman oscilaciones; algunas terminan en un máximo o mínimo visible, pero solo ciertos extremos tienen función estructural. En este curso se considera estructural el giro desde el cual nació un desplazamiento capaz de superar una referencia anterior. Esta regla evita marcar como importante cada pequeña irregularidad.",
          "Empieza alejando el gráfico. En un activo hipotético que avanza de 100 a 112, corrige a 106 y después supera 112 hasta 121, el mínimo de 106 es relevante porque antecede al impulso que confirmó un nuevo máximo. Un retroceso de 121 a 118 dentro de tres velas pequeñas todavía puede ser ruido interno si no cambia la secuencia principal.",
          "Contraejemplo: tres velas verdes consecutivas parecen una tendencia alcista, pero no lo son si ocurren dentro de un rango entre 100 y 105 y nunca superan el máximo del rango. La forma correcta de comenzar es localizar referencias, no contar colores. Con esta base ya se puede estudiar qué función cumple cada tramo.",
        ],
        "Síntesis editorial basada en APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 1, pp. 10-12, y Market Architect Blueprint, p. 2.",
        "Ahora que sabes qué extremos importan, el siguiente paso es ordenar el movimiento entre ellos.",
        [
          [
            "¿Qué convierte un giro visual en una referencia estructural?",
            "Que desde ese giro nazca un desplazamiento con una consecuencia observable, como romper un máximo o mínimo previo.",
          ],
          [
            "¿Por qué tres velas del mismo color no prueban por sí solas una tendencia?",
            "Porque pueden ser una oscilación interna dentro de un rango sin alterar ninguna referencia estructural.",
          ],
        ],
      ),
      section(
        "2. La gramática del movimiento alcista",
        "Impulso, retroceso y pausa",
        [
          "El impulso es el tramo que desplaza el precio y demuestra iniciativa compradora; el retroceso devuelve parte del recorrido y prueba si la demanda todavía defiende la estructura; la pausa consume tiempo con desplazamiento limitado. No se clasifican por una cantidad fija de velas, sino por la función que cumplen respecto de los extremos relevantes.",
          "En una secuencia 100 → 120 → 111 → 128, el avance 100-120 es un impulso, 120-111 es un retroceso y 111-128 confirma continuidad al crear un nuevo máximo. La tendencia permanece alcista mientras el mínimo defendido de 111 no sea sustituido por una pérdida estructural. El estudiante debe poder narrar esta secuencia sin mencionar todavía una entrada.",
          "Una corrección profunda no es automáticamente un giro. Puede seguir siendo retroceso mientras respete el origen relevante y la demanda recupere control. A la inversa, una corrección pequeña puede ser peligrosa si ocurre después de una extensión excesiva y frente a resistencia. Por eso la ubicación y la madurez se estudiarán antes que el patrón.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 1, pp. 11-20. Elaboración editorial para el ejemplo numérico.",
        "Una vez identificada la fase, puedes decidir si una figura es una pausa útil o aparece demasiado tarde.",
        [
          [
            "¿Qué diferencia funcional existe entre impulso y retroceso?",
            "El impulso demuestra iniciativa y rompe o extiende estructura; el retroceso prueba cuánto control conserva la fuerza dominante.",
          ],
          [
            "¿Cuándo deja de bastar la etiqueta de retroceso?",
            "Cuando el precio pierde la referencia que sostenía la secuencia y no logra recuperar control.",
          ],
        ],
      ),
      section(
        "3. Patrones de continuación: primero la ubicación",
        "La figura necesita contexto",
        [
          "El manual presenta varias pausas de continuación. Su denominador común es que aparecen dentro de una estructura vigente, después de un impulso identificable y antes de un obstáculo que todavía deja recorrido. La figura organiza la entrada; no crea la tendencia. Primero se valida el mapa y después se examina el gatillo.",
          "Ejemplo: EUR/USD en 15 minutos rompe 1,0850, alcanza 1,0890 y corrige de forma ordenada hasta 1,0870. Si mantiene el mínimo estructural, forma una base y recupera 1,0882, existe una hipótesis de continuación hacia la resistencia siguiente. La invalidación se vincula con la pérdida de la base o del mínimo que sostiene el patrón.",
          "Contraejemplo: la misma figura aparece en el tercer impulso, justo debajo de una resistencia diaria. Visualmente coincide con el patrón, pero el recorrido potencial es pequeño y el riesgo de agotamiento aumenta. La lectura puede seguir siendo alcista y, al mismo tiempo, la operación ser descartable.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 1, pp. 13-30, e Institutional Trading Playbook, p. 14.",
        "El último nivel del módulo consiste en saber cuándo dejar de buscar continuidad y cómo declarar que la hipótesis falló.",
        [
          [
            "¿Qué tres condiciones deben existir antes de utilizar una figura de continuación?",
            "Estructura vigente, ubicación posterior a un impulso reconocible y espacio suficiente antes del siguiente obstáculo.",
          ],
          [
            "¿Puede una tendencia alcista no ser operable?",
            "Sí. Puede conservar estructura, pero estar demasiado extendida o no ofrecer recorrido suficiente frente al riesgo.",
          ],
        ],
      ),
      section(
        "4. Agotamiento, invalidación y decisión profesional",
        "Saber continuar, esperar o descartar",
        [
          "Agotamiento significa que el desplazamiento pierde eficiencia: necesita más tiempo o más velas para avanzar, deja rechazos en resistencia o falla al producir un máximo nuevo. No equivale a una venta automática. Primero obliga a dejar de perseguir compras; un giro bajista requiere su propia confirmación.",
          "La invalidación debe responder a una pregunta concreta: ¿qué nivel no puede perderse si esta continuación es correcta? Si la entrada es 1,0882, el mínimo técnico está en 1,0868 y el objetivo razonable en 1,0910, el riesgo es 14 pips y el beneficio 28 pips, equivalente a 2R antes de costos. Acercar el stop a 1,0878 solo para obtener un R/R mayor lo colocaría dentro del ruido del patrón.",
          "La secuencia final es: estructura, fase, ubicación, gatillo, invalidación y tamaño. Si cualquiera falta, la operación no está completa. Este cierre prepara el módulo 2, donde aprenderás a medir la corrección sin confundir un porcentaje de Fibonacci con una orden.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 1, pp. 24-34, y Market Architect Blueprint, pp. 13-14.",
        "El módulo 2 profundiza en el retroceso que aquí aprendiste a reconocer.",
        [
          [
            "¿Qué acción inmediata produce una señal de agotamiento?",
            "Dejar de perseguir la dirección previa y exigir nueva evidencia; no girar la posición de forma automática.",
          ],
          [
            "¿Dónde debe situarse el stop?",
            "En el nivel cuya pérdida demuestra que la hipótesis dejó de ser válida, fuera del ruido normal del patrón.",
          ],
        ],
      ),
    ],
    sources: [
      "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 1, pp. 9-34.",
      "Market Architect Blueprint, pp. 2 y 13-14.",
      "Institutional Trading Playbook, pp. 11 y 14-15.",
      "Transcripciones del módulo 1, como explicación complementaria del profesor.",
    ],
  },
  2: {
    question:
      "¿Cómo medir un retroceso sin convertir Fibonacci en una señal automática?",
    introduction:
      "El módulo 1 mostró que una tendencia avanza y respira. Ahora estudiarás esa respiración. Comenzarás seleccionando el impulso correcto, después clasificarás la profundidad y la forma de la corrección, y finalmente exigirás una respuesta observable antes de entrar. Fibonacci se utiliza como regla de medición; soporte, microestructura e invalidación determinan si existe una operación.",
    objectives: [
      "Seleccionar el impulso que realmente produjo una consecuencia estructural.",
      "Clasificar retrocesos superficiales, normales y profundos.",
      "Usar Fibonacci como zona de observación, no como orden pendiente automática.",
      "Detectar cuándo un retroceso desarrolla una microtendencia contraria.",
      "Elegir confirmación e invalidación proporcionales a la profundidad.",
    ],
    sections: [
      section(
        "1. Qué es un retroceso y qué se debe medir",
        "Medir una corrección real",
        [
          "Un retroceso es un movimiento temporal contra la dirección dominante. Para medirlo debes elegir el impulso que rompió una referencia o creó un desplazamiento claro. El origen se coloca en el inicio de ese impulso y el extremo en su máximo confirmado. Medir una oscilación menor genera niveles precisos en apariencia, pero irrelevantes para la estructura.",
          "Ejemplo: NASDAQ sube de 20 000 a 20 400 y rompe un máximo previo; después corrige. El 50% del impulso se ubica en 20 200. Si se midiera solo la última subida de 20 300 a 20 400, el 50% sería 20 350 y describiría ruido interno, no la corrección del tramo dominante.",
          "Los porcentajes 38,2%, 50% y 61,8% organizan la observación. El curso también utiliza zonas 23/230 en contextos de extensión y agotamiento. Ningún nivel demuestra por sí solo que la demanda regresó. La reacción del precio será el tema del siguiente bloque.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 2, pp. 35-42, y Market Architect Blueprint, p. 5.",
        "Después de medir, debes interpretar la profundidad dentro de la fase de la tendencia.",
        [
          [
            "¿Cuál es el impulso correcto para trazar Fibonacci?",
            "El tramo que produjo una ruptura o desplazamiento estructural verificable.",
          ],
          [
            "¿Qué información aporta el nivel 50%?",
            "Describe la profundidad de la corrección; no confirma por sí mismo una entrada.",
          ],
        ],
      ),
      section(
        "2. Profundidad, forma y ubicación",
        "No todos los retrocesos expresan lo mismo",
        [
          "Un retroceso superficial puede indicar urgencia, pero también dejar una entrada perseguida y un stop poco eficiente. Un retroceso intermedio permite comprobar si la antigua resistencia actúa como soporte. Uno profundo exige más evidencia porque puede contener una secuencia bajista propia. La profundidad siempre se interpreta junto con el momento de la tendencia.",
          "Tras romper un rango entre 50 y 55, el precio alcanza 60 y vuelve a 55. Si 55 era la resistencia rota y ahora aparece rechazo, la corrección tiene una razón estructural. En cambio, tocar el 50% en 57,50 sin soporte previo ni respuesta solo crea una coordenada matemática.",
          "Contraejemplo: una corrección alcanza exactamente 61,8% y el estudiante la llama 'entrada perfecta', pero continúa cerrando por debajo de soportes internos y forma máximos decrecientes. La precisión del porcentaje no compensa el deterioro. El siguiente nivel enseña cómo detectar el final de esa microtendencia.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 2, pp. 37-46. Elaboración editorial para los ejemplos.",
        "Cuando la corrección desarrolla estructura propia, la entrada necesita una señal de recuperación.",
        [
          [
            "¿Por qué un retroceso superficial no siempre es la mejor entrada?",
            "Porque puede obligar a perseguir el precio y ofrecer una invalidación ineficiente.",
          ],
          [
            "¿Qué pesa más que la coincidencia exacta con Fibonacci?",
            "La ubicación estructural y la respuesta observable de la demanda u oferta.",
          ],
        ],
      ),
      section(
        "3. Microtendencia contraria y confirmación",
        "La zona se convierte en hipótesis",
        [
          "Un retroceso profundo puede formar máximos y mínimos decrecientes en un marco menor. Comprar mientras esa secuencia sigue activa significa anticipar. La confirmación mínima consiste en identificar el último máximo de la microtendencia, observar una base o patrón de giro y exigir que el precio recupere esa referencia.",
          "Ejemplo: BTCUSDT sube de 64 000 a 66 000 y corrige hasta 64 760 mediante máximos decrecientes. Una W2 barre 64 700, recupera rápidamente y rompe 65 050, el último máximo menor. La zona de Fibonacci aportó contexto; la recuperación de 65 050 aportó evidencia operativa.",
          "Una vela alcista aislada dentro de la caída parece confirmación, pero no lo es si cierra por debajo del último máximo menor. La Guía Maestra de la Formación W insiste en que la ubicación precede a la forma y que la ruptura de la base completa la lectura.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 43-46; Guía Maestra: Formación W de Giro, pp. 1-3.",
        "La confirmación permite definir una invalidación lógica y comparar entradas agresivas y conservadoras.",
        [
          [
            "¿Qué referencia confirma que terminó una microtendencia bajista?",
            "La recuperación del último máximo relevante de esa microestructura, acompañada por una base o desplazamiento.",
          ],
          [
            "¿Qué función cumple una W dentro del retroceso?",
            "Organiza la evidencia de absorción y recuperación; no tiene valor suficiente si aparece fuera de una zona relevante.",
          ],
        ],
      ),
      section(
        "4. Entrada, invalidación y descarte",
        "De la medición al plan",
        [
          "La entrada agresiva actúa cerca de la zona cuando aparece absorción clara; obtiene mejor precio, pero acepta mayor incertidumbre. La conservadora espera la ruptura de la microestructura y, a veces, un pullback. En ambos casos el stop se coloca donde la recuperación deja de existir, no en el porcentaje de Fibonacci.",
          "Si la entrada conservadora está en 65 080, el stop técnico en 64 680 y el objetivo antes del máximo previo en 65 880, el riesgo es 400 y el beneficio 800: 2R. Si el objetivo queda a solo 65 400, la operación ofrece 0,8R y debe descartarse aunque la lectura sea correcta.",
          "El módulo termina con una regla: medir, contextualizar, observar respuesta, confirmar y calcular. El módulo 3 aplicará la misma lógica en dirección bajista para que comprendas la simetría sin asumir que alcistas y bajistas se ejecutan exactamente igual.",
        ],
        "Protocolo Avanzado: Integración de Velas Póker y Order Blocks, pp. 2-3, y Guía de Estudio de Análisis Técnico Avanzado, pp. 2-3.",
        "En el módulo 3 invertirás la dirección, pero conservarás el método de estructura, ubicación y riesgo.",
        [
          [
            "¿Qué se sacrifica al elegir una entrada conservadora?",
            "Parte del precio inicial a cambio de mayor confirmación estructural.",
          ],
          [
            "¿Cuándo se descarta una corrección bien identificada?",
            "Cuando no deja recorrido suficiente, la invalidación no es lógica o la estructura no confirma recuperación.",
          ],
        ],
      ),
    ],
    sources: [
      "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 2, pp. 35-55.",
      "Guía Maestra: Formación W de Giro, pp. 1-3.",
      "Guía de Estudio: Análisis Técnico Avanzado y Estrategia de Velas Póker, pp. 1-3.",
      "Market Architect Blueprint, p. 5.",
      "Transcripciones del módulo 2, como apoyo de las prácticas.",
    ],
  },
  3: {
    question:
      "¿Cómo leer una tendencia bajista sin vender después de que el movimiento ya terminó?",
    introduction:
      "Este módulo conserva la lógica estructural de los dos anteriores y cambia la dirección. Aprenderás a identificar qué máximo protege la oferta, cómo se forman los retrocesos dentro de una caída y por qué vender sobre soporte suele ser una mala ubicación. El nivel avanzado separa continuación, agotamiento y giro confirmado para evitar perseguir el tercer impulso.",
    objectives: [
      "Reconocer máximos y mínimos estructurales decrecientes.",
      "Distinguir impulso vendedor de retroceso comprador.",
      "Ubicar patrones vendedores lejos de soportes inmediatos.",
      "Separar agotamiento bajista de giro alcista confirmado.",
      "Dimensionar una venta con invalidación sobre la oferta relevante.",
    ],
    sections: [
      section(
        "1. La estructura bajista desde cero",
        "El máximo defendido controla la lectura",
        [
          "Una tendencia bajista existe cuando los rebotes dejan máximos relevantes más bajos y los impulsos de oferta producen mínimos nuevos. El máximo estructural es la referencia que no debería recuperarse si la oferta conserva el control. Esta definición es más útil que afirmar simplemente que 'el precio está cayendo'.",
          "Ejemplo: un futuro desciende de 5 200 a 5 100, rebota a 5 155 y cae hasta 5 020. El máximo 5 155 protege la nueva pierna bajista. Un rebote interno a 5 080 no cambia la tendencia; una recuperación sostenida por encima de 5 155 obliga a reconstruir el mapa.",
          "Contraejemplo: una vela roja grande rompe un mínimo intradía, pero se encuentra directamente sobre soporte semanal y recupera al cierre. Parece confirmación bajista, pero su ubicación advierte posible agotamiento. Por eso el siguiente paso es distinguir el impulso del retroceso y medir el espacio.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 3, pp. 56-60, e Institutional Trading Playbook, pp. 4 y 8.",
        "Con la estructura definida, el trader debe esperar que el precio vuelva a una zona donde vender tenga sentido.",
        [
          [
            "¿Qué nivel invalida inicialmente una secuencia bajista?",
            "El máximo estructural que protege el último desplazamiento vendedor.",
          ],
          [
            "¿Por qué una vela roja sobre soporte no basta?",
            "Porque la ubicación puede convertir el desplazamiento en agotamiento o barrido, no en continuación eficiente.",
          ],
        ],
      ),
      section(
        "2. Retrocesos vendedores y ubicación",
        "Vender el retroceso, no perseguir la caída",
        [
          "Después de un impulso bajista, el precio puede rebotar hacia una resistencia, un soporte roto o una zona de oferta. Ese rebote es el equivalente bajista del retroceso estudiado en el módulo 2. La ventaja aparece cuando la invalidación puede colocarse por encima de una referencia clara y todavía existe espacio hasta el soporte siguiente.",
          "Si el precio cae de 100 a 92, rebota a 96 y 96 coincide con un soporte roto, una señal vendedora puede tener contexto. Vender en 92,50 justo encima de un soporte en 92 arriesga entrar cuando el recorrido disponible ya se consumió.",
          "Una vela de rechazo superior o una M ayudan a organizar el gatillo, pero deben aparecer donde la oferta tiene una razón para actuar. La misma figura en el centro de un rango es equilibrio, no ventaja.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 3, pp. 60-67, e Institutional Trading Playbook, p. 13.",
        "La ubicación correcta todavía necesita distinguir una pausa de continuación de una señal de agotamiento.",
        [
          [
            "¿Dónde se prefiere buscar una venta dentro de una tendencia bajista?",
            "En un retroceso hacia resistencia u otra zona de oferta, con espacio hasta el siguiente soporte.",
          ],
          [
            "¿Qué problema tiene vender directamente en un mínimo?",
            "El recorrido puede estar agotado y la invalidación quedar demasiado lejos frente al objetivo.",
          ],
        ],
      ),
      section(
        "3. Continuación, trampa y agotamiento",
        "No toda W es un giro",
        [
          "Una pausa pequeña seguida por una vela de empuje bajista puede señalar continuación. Sin embargo, la Guía de Estudio advierte que una W de compra en mitad de una caída no confirma giro si no existe soporte o extremo. La figura debe demostrar primero que la oferta perdió capacidad de crear mínimos.",
          "El agotamiento aparece cuando el tercer impulso se extiende, produce mechas inferiores o avanza cada vez menos. La acción profesional es dejar de vender tarde. Para considerar un largo se requiere otra secuencia: absorción, recuperación de base y ruptura de un máximo relevante.",
          "Contraejemplo: aparece un martillo después de una caída, el trader compra de inmediato y el precio continúa descendiendo. El martillo solo documentó rechazo temporal; nunca recuperó estructura. El módulo 7 profundizará en las variantes W/M y el módulo 4 en la anatomía de estas velas.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 66-74, y Guía de Estudio de Análisis Técnico Avanzado, pp. 1-3.",
        "El último bloque traduce esta lectura a una venta con riesgo calculado.",
        [
          [
            "¿Qué significa agotamiento bajista en términos operativos?",
            "Dejar de perseguir ventas y esperar evidencia adicional; no comprar automáticamente.",
          ],
          [
            "¿Por qué una W puede fallar dentro de una caída?",
            "Porque la forma sin soporte ni recuperación estructural puede ser solo una pausa antes de continuar.",
          ],
        ],
      ),
      section(
        "4. Ejecución de cortos y control de riesgo",
        "Invalidar sobre la oferta",
        [
          "Una entrada agresiva vende el rechazo en la zona; una conservadora espera ruptura de una base menor y pullback. El stop se sitúa sobre el máximo que invalida la oferta o sobre la zona definida, incluyendo el ruido normal del instrumento.",
          "Ejemplo: entrada corta en 95,80, stop en 96,60 y objetivo en 93,40. El riesgo por unidad es 0,80 y el beneficio 2,40, equivalente a 3R. Si se arriesgan 100 unidades monetarias, el tamaño teórico es 125 unidades antes de costos. En futuros se convierte la distancia a ticks y se multiplica por el valor del contrato.",
          "El plan completo debe responder: qué estructura domina, dónde terminó el retroceso, qué confirma la oferta, qué nivel invalida y cuánto se pierde. Esta disciplina prepara el módulo 4, donde una vela amplia dejará de interpretarse por color y pasará a leerse por cuerpo, mecha, cierre y ubicación.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 67-74. Elaboración editorial para el ejemplo de riesgo.",
        "El módulo 4 estudiará el gatillo de vela que puede confirmar oferta o demanda dentro de este mapa.",
        [
          [
            "¿Dónde se coloca la invalidación de una venta?",
            "Sobre el máximo o zona cuya recuperación demuestra que la oferta dejó de controlar el escenario.",
          ],
          [
            "¿Qué variable define el tamaño de la posición?",
            "La pérdida máxima permitida dividida entre la distancia monetaria desde entrada hasta stop.",
          ],
        ],
      ),
    ],
    sources: [
      "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 3, pp. 56-74.",
      "Guía de Estudio: Análisis Técnico Avanzado y Estrategia de Velas Póker, pp. 1-3.",
      "Institutional Trading Playbook, pp. 4, 8 y 13.",
      "Transcripciones del módulo 3, como apoyo práctico.",
    ],
  },
  4: {
    question:
      "¿Qué información aportan realmente el cuerpo, la mecha y el cierre de una Vela Póker?",
    introduction:
      "Hasta ahora el curso utilizó velas como parte de la estructura. Este módulo se detiene en su anatomía. Empezarás diferenciando una vela cerrada de una vela activa, después estudiarás cuerpos y mechas, y finalmente aplicarás la clasificación Tipo 1, 2 y 3 propuesta por el material. La denominación 'Vela Póker' pertenece a la metodología del curso: su valor depende de la ubicación y de una confirmación posterior, no de una promesa de comportamiento institucional.",
    objectives: [
      "Leer apertura, cierre, cuerpo y mechas sin depender del color.",
      "Distinguir una vela activa de una señal confirmada al cierre.",
      "Clasificar las velas Tipo 1, 2 y 3 dentro del método.",
      "Relacionar absorción, desplazamiento y zona relevante.",
      "Construir una entrada sin convertir una sola vela en sistema completo.",
    ],
    sections: [
      section(
        "1. Anatomía de una vela y momento de observación",
        "El cierre transforma la lectura",
        [
          "El cuerpo representa la distancia entre apertura y cierre; las mechas muestran los extremos visitados y rechazados durante el periodo. Una vela de 15 minutos puede cambiar por completo antes de cerrar. Analizarla en el minuto 8 como si estuviera terminada confunde un estado provisional con evidencia final.",
          "Ejemplo: una vela abre en 100, cae a 96 y en los últimos cinco minutos cierra en 101. Mientras estaba activa parecía presión vendedora; al cierre deja una mecha inferior extensa. La secuencia intraperiodo revela absorción o rechazo, pero todavía debe interpretarse en relación con soporte y estructura.",
          "Contraejemplo: la misma mecha aparece en el centro de un rango. Visualmente es idéntica, pero no documenta una defensa de nivel importante. El Playbook llama 'tierra de nadie' a esa zona media; de forma más precisa, es un área donde el método no identifica una asimetría clara.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 4, pp. 75-84; Market Architect Blueprint, pp. 6 y 12.",
        "Con la anatomía clara, se puede estudiar la clasificación propia del curso.",
        [
          [
            "¿Por qué no debe evaluarse igual una vela activa y una cerrada?",
            "Porque el cuerpo y las mechas pueden cambiar hasta el cierre, alterando por completo la evidencia.",
          ],
          [
            "¿Qué demuestra una mecha por sí sola?",
            "Solo que el precio visitó y rechazó un extremo durante el periodo; necesita ubicación y contexto.",
          ],
        ],
      ),
      section(
        "2. Tipos 1, 2 y 3 dentro de la metodología",
        "Decisión, rechazo y giro rápido",
        [
          "El material clasifica como Tipo 1 una vela de cuerpo dominante y cierre cerca del extremo; como Tipo 2 una vela con rechazo intermedio; y como Tipo 3 una vela tipo martillo con mecha extensa. Estas etiquetas describen anatomía y respuesta, no probabilidades universales. Deben validarse en soportes, resistencias o zonas extremas.",
          "La Guía Maestra de Fortaleza de la Demanda propone una progresión: llegada a zona, frenada o absorción y, después, vela de empuje. En soporte, una Tipo 3 puede documentar rechazo rápido; una vela alcista amplia posterior que cierre cerca de máximos aporta desplazamiento y confirma que la demanda recuperó terreno.",
          "Contraejemplo: una vela Tipo 1 bajista aparece después de una caída extensa sobre soporte. Parece fuerza vendedora, pero puede ser el último empuje antes de la absorción. El error consiste en atribuir intención solo por el tamaño. La ubicación manda y el seguimiento decide.",
        ],
        "Guía Maestra: Fortaleza de la Demanda con Velas Tipo 1, 2 y 3, pp. 1-3, e Institutional Trading Playbook, pp. 3-6.",
        "La clasificación se vuelve útil cuando se observa como proceso y no como fotografía.",
        [
          [
            "¿Qué diferencia principal existe entre una Tipo 1 y una Tipo 3?",
            "La Tipo 1 muestra cuerpo dominante; la Tipo 3 muestra rechazo mediante una mecha extensa y cuerpo reducido.",
          ],
          [
            "¿Qué impide operar cualquier vela Tipo 3?",
            "La obligación de exigir zona relevante, estructura y confirmación posterior.",
          ],
        ],
      ),
      section(
        "3. Absorción, 'vela desnudada' y marcos menores",
        "Reconstruir el proceso interno",
        [
          "El material llama 'vela desnudada' a una vela que pierde gran parte de su cuerpo inicial y termina dejando una mecha. La expresión describe una absorción rápida dentro del periodo. Al bajar de 15 minutos a 1 o 3 minutos, esa mecha puede verse como una secuencia de mínimos, recuperación y ruptura de microestructura.",
          "Ejemplo: en 15m el precio toca un soporte en 1,2500 y deja una mecha hasta 1,2485. En 3m se observa una W2: primer mínimo 1,2492, barrido a 1,2485 y recuperación de la base en 1,2504. El marco mayor localiza; el menor explica y ofrece una invalidación más precisa.",
          "Bajar de marco no siempre mejora la entrada. Si se hace antes de definir la zona, el estudiante se pierde entre movimientos menores y encuentra patrones en todas partes. La secuencia correcta es contexto de marco mayor, zona, evidencia y solo después refinamiento.",
        ],
        "Protocolo Avanzado: Integración de Velas Póker y Order Blocks, pp. 1-3; Guía Maestra: Formación W, pp. 2-3.",
        "El último nivel integra la vela con una zona, un gatillo y una invalidación.",
        [
          [
            "¿Qué permite ver el marco menor dentro de una mecha de 15m?",
            "La secuencia de absorción, recuperación y ruptura que quedó comprimida en la vela mayor.",
          ],
          [
            "¿Cuándo se debe bajar de temporalidad?",
            "Después de definir contexto y zona; nunca para buscar patrones sin un mapa previo.",
          ],
        ],
      ),
      section(
        "4. De la Vela Póker a una operación completa",
        "Zona + proceso + confirmación",
        [
          "Una operación válida combina: zona relevante, reacción, vela cerrada o microestructura confirmada, invalidación técnica y recorrido. La entrada agresiva rompe el extremo de la vela de decisión; la conservadora espera una W/M o un pullback en marco menor.",
          "Si una vela alcista de 15m recupera una zona y cierra en 100,50, su mínimo de absorción está en 99,40 y el objetivo razonable en 102,70, el riesgo desde 100,60 es 1,20 y el beneficio 2,10: 1,75R. La señal puede ser clara y aun así quedar por debajo del mínimo exigido por el plan.",
          "La lección concluye separando observación de interpretación: cuerpo, mecha y cierre son observables; 'absorción institucional' es la explicación propuesta por el método y debe tratarse como hipótesis. El módulo 5 añade la zona de Order Block para exigir una ubicación más específica.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 85-111; Protocolo Avanzado, pp. 1-3. Elaboración editorial para el ejemplo.",
        "El módulo 5 estudia cómo delimitar y validar la zona donde esta señal adquiere contexto.",
        [
          [
            "¿Qué elementos convierten una vela llamativa en una operación?",
            "Zona, confirmación, invalidación, recorrido y tamaño compatible con el riesgo.",
          ],
          [
            "¿Qué parte de la lectura es hipótesis y no dato directo?",
            "La atribución de intención institucional; los datos directos son precios, cuerpo, mechas y cierre.",
          ],
        ],
      ),
    ],
    sources: [
      "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 4, pp. 75-111.",
      "Guía Maestra: Fortaleza de la Demanda con Velas Tipo 1, 2 y 3, pp. 1-3.",
      "Protocolo Avanzado: Integración de Velas Póker y Order Blocks, pp. 1-3.",
      "Market Architect Blueprint, pp. 6 y 10-12.",
      "Institutional Trading Playbook, pp. 3-6.",
    ],
  },
  5: {
    question:
      "¿Cómo distinguir un Order Block útil de una zona dibujada retrospectivamente?",
    introduction:
      "El módulo comienza aclarando qué problema intenta resolver un Order Block: localizar el origen de un desplazamiento relevante y observar si el precio reacciona cuando regresa. Después se estudian delimitación, frescura, mitigación y anulación. El nivel avanzado integra la zona con una Vela Póker y un gatillo multitemporal. El concepto se presenta como una herramienta de la metodología, no como evidencia directa de órdenes invisibles.",
    objectives: [
      "Diferenciar una vela ordinaria del origen de un desplazamiento estructural.",
      "Delimitar la zona antes de observar la reacción.",
      "Clasificar un bloque como fresco, mitigado, consumido o anulado.",
      "Usar bloques opuestos como posibles objetivos sin convertirlos en certezas.",
      "Integrar zona, absorción, confirmación e invalidación.",
    ],
    sections: [
      section(
        "1. Qué es la zona y qué evidencia exige",
        "Origen con consecuencia",
        [
          "Dentro de este curso, un Order Block es la última vela o pequeña base contraria antes de un desplazamiento que rompe una referencia. No basta con que desde allí el precio haya subido o bajado; debe existir una consecuencia visible. La zona se delimita con una regla fija, preferiblemente antes del regreso del precio.",
          "Ejemplo: el precio consolida entre 50 y 51, deja una última vela bajista con cuerpo 50,40-50,70 y después impulsa hasta 54 rompiendo 52. La base puede estudiarse como bloque de demanda. Una vela bajista cualquiera dentro del avance, sin ruptura posterior, no cumple la definición.",
          "El sesgo retrospectivo aparece cuando el analista mueve los límites después de ver dónde rebotó el precio. Para evitarlo, registra cuerpo, mechas incluidas o excluidas y referencia rota. El mismo criterio debe aplicarse a todos los ejemplos.",
        ],
        "Protocolo Avanzado: Integración de Velas Póker y Order Blocks, p. 1, y Market Architect Blueprint, p. 4.",
        "Identificada la zona, el siguiente paso es conocer su estado antes de reutilizarla.",
        [
          [
            "¿Qué condición diferencia un Order Block de una vela cualquiera?",
            "Que sea el origen de un desplazamiento con consecuencia estructural verificable.",
          ],
          [
            "¿Cómo se reduce el sesgo retrospectivo?",
            "Definiendo los límites y la regla de delimitación antes de observar la reacción.",
          ],
        ],
      ),
      section(
        "2. Frescura, regreso y ciclo de vida",
        "Creación → reposo → mitigación",
        [
          "El material describe un ciclo: creación por desplazamiento, reposo mientras el precio se aleja y mitigación cuando regresa. Un bloque no visitado conserva más información dentro del método; cada visita adicional puede consumir órdenes o debilitar la reacción esperada.",
          "En el primer regreso se observa si el precio rechaza la zona, atraviesa parte de ella o cierra al otro lado. Una mecha que penetra y recupera no equivale a un cierre aceptado fuera. La reacción debe evaluarse con el timeframe y la volatilidad previstos.",
          "Contraejemplo: una zona fue tocada cuatro veces, el precio la cruzó y después rebotó cerca. Redibujarla como 'bloque fresco' oculta que ya fue consumida. La disciplina consiste en cambiar su estado y avanzar al siguiente nivel válido.",
        ],
        "Market Architect Blueprint, p. 4; Protocolo Avanzado, pp. 1-2; Institutional Trading Playbook, p. 8.",
        "El estado del bloque determina si puede actuar como zona de entrada, objetivo o referencia anulada.",
        [
          [
            "¿Qué significa mitigación en esta metodología?",
            "El regreso del precio a la zona de origen para probar o completar la liquidez pendiente que el método supone allí.",
          ],
          [
            "¿Por qué las visitas repetidas importan?",
            "Porque reducen la frescura de la zona y obligan a reevaluar si todavía conserva utilidad.",
          ],
        ],
      ),
      section(
        "3. Anulación, objetivos y zonas opuestas",
        "El mapa debe actualizarse",
        [
          "Un cierre contundente y aceptado fuera del bloque puede anularlo. La palabra clave es aceptación: una penetración breve puede ser barrido, mientras varios cierres y un pullback fallido demuestran que la zona dejó de sostener el precio. La regla exacta debe definirse antes de operar.",
          "Los bloques no mitigados del lado opuesto pueden funcionar como destinos porque representan zonas pendientes dentro del modelo. Son objetivos potenciales, no imanes garantizados. Entre la entrada y el bloque opuesto se revisan soportes, resistencias y recorrido real.",
          "Ejemplo: entrada larga en un bloque de demanda 100-101, confirmación en 101,40, stop en 99,70 y bloque de oferta en 104. Si una resistencia fuerte aparece en 102,50, el objetivo no debe ignorarla solo porque el bloque superior parezca atractivo.",
        ],
        "Protocolo Avanzado, pp. 1-3; Market Architect Blueprint, pp. 4-5; Institutional Trading Playbook, p. 8.",
        "La zona ya está definida; falta exigir el gatillo que confirma que la reacción comenzó.",
        [
          [
            "¿Qué diferencia un barrido de una anulación?",
            "El barrido recupera la zona; la anulación muestra cierre y aceptación sostenida fuera de ella.",
          ],
          [
            "¿Por qué un bloque opuesto no es un objetivo automático?",
            "Porque pueden existir obstáculos intermedios y el mercado no está obligado a visitar la zona.",
          ],
        ],
      ),
      section(
        "4. Integración con Vela Póker y ejecución multitemporal",
        "Zona en HTF, gatillo en LTF",
        [
          "El protocolo avanzado combina Order Block no visitado, reacción o absorción en 15m y confirmación en 1m/3m. El marco mayor responde dónde; el menor responde cuándo. Una Vela Póker sin bloque carece de ubicación, y un bloque sin reacción no demuestra que el precio vaya a girar.",
          "La entrada agresiva rompe el máximo o mínimo de la vela de decisión; la conservadora espera una W/M y su ruptura de base. El stop queda detrás del extremo que invalida la absorción. Si la distancia al stop hace inviable el tamaño, se descarta el escenario.",
          "Contraejemplo: el precio toca el bloque y el trader entra porque 'debe reaccionar'. No hay rechazo, la vela cierra fuera y el bloque se consume. La metodología correcta exige permiso observable. El módulo 6 convertirá esta secuencia en una rutina repetible.",
        ],
        "Protocolo Avanzado: Integración de Velas Póker y Order Blocks, pp. 1-3, e Institutional Trading Playbook, pp. 11-14.",
        "El módulo 6 transforma esta integración en checklist, preparación y revisión.",
        [
          [
            "¿Qué aporta cada marco temporal?",
            "El marco mayor aporta contexto y zona; el menor aporta el gatillo y una invalidación refinada.",
          ],
          [
            "¿Qué evidencia falta cuando el precio solo toca un bloque?",
            "Una reacción confirmada, como absorción, desplazamiento o ruptura de microestructura.",
          ],
        ],
      ),
    ],
    sources: [
      "Protocolo Avanzado: Integración de Velas Póker y Order Blocks, pp. 1-3.",
      "Market Architect Blueprint, pp. 4-6 y 13-14.",
      "Institutional Trading Playbook, pp. 8 y 11-14.",
      "Transcripciones sobre Order Blocks, como explicación complementaria.",
    ],
  },
  6: {
    question:
      "¿Cómo convertir el análisis en una rutina que produzca decisiones repetibles?",
    introduction:
      "Este módulo deja de añadir señales y organiza todo lo aprendido. El estudiante construirá un proceso top-down: contexto, zona, gatillo, invalidación, tamaño y revisión. La rutina no pretende eliminar pérdidas; pretende que una pérdida prevista sea distinguible de un error de disciplina. También enseña que una no-operación puede ser la mejor decisión del día.",
    objectives: [
      "Preparar escenarios antes de que el precio llegue a la zona.",
      "Separar contexto, localización y ejecución.",
      "Usar un checklist binario y verificable.",
      "Calcular riesgo y R/R sin alterar el stop técnico.",
      "Revisar proceso, resultado y sesgo psicológico por separado.",
    ],
    sections: [
      section(
        "1. Preparación: decidir antes de sentir urgencia",
        "Escenarios y condiciones de no operación",
        [
          "La rutina comienza antes de abrir una posición. Se revisan marco mayor, tendencia o rango, niveles relevantes, volatilidad y eventos capaces de alterar el comportamiento normal. Después se escriben escenarios: qué habilita largos, qué habilita cortos y qué obliga a no operar.",
          "Ejemplo: 'Solo buscaré largos si el precio mantiene el soporte diario, llega al bloque de demanda de 15m y recupera la base en 3m'. Esta frase es verificable. 'Comprar si se ve fuerte' no lo es porque cambia con la emoción del momento.",
          "El beneficio de preparar no es predecir. Es reducir decisiones improvisadas cuando aparece FOMO. El audio sobre pánico complementa este bloque: las manos se apartan del teclado cuando el escenario previsto no existe.",
        ],
        "Market Architect Blueprint, pp. 2 y 14; Institutional Trading Playbook, pp. 10 y 15; audio Cómo los algoritmos cazan tu pánico.",
        "Después de preparar escenarios, se recorren siempre en el mismo orden.",
        [
          [
            "¿Qué hace verificable un escenario?",
            "Que defina condiciones observables de contexto, zona, gatillo e invalidación.",
          ],
          [
            "¿Qué función cumple la regla de no operación?",
            "Evita que la urgencia convierta una ausencia de señal en una entrada improvisada.",
          ],
        ],
      ),
      section(
        "2. El recorrido top-down",
        "Macro → zona → gatillo",
        [
          "El Blueprint organiza la lectura en tres capas. Macro: define sesgo y régimen. Zona: localiza soporte, resistencia, Fibonacci, POC u Order Block. Gatillo: espera la evidencia de ejecución en un marco menor. Saltar directamente al gatillo produce señales correctas en lugares equivocados.",
          "En 4h el precio puede estar alcista, en 15m corrigiendo y en 3m bajista. No es una contradicción: cada marco describe una capa distinta. El objetivo es alinear la operación con la narrativa del marco que define la zona y usar el menor solo para entrar.",
          "Contraejemplo: una W2 perfecta en 1m aparece en mitad de un rango de 15m y contra una resistencia de 4h. La forma es correcta, pero el recorrido top-down la descarta. La calidad de la rutina se mide también por los escenarios que elimina.",
        ],
        "Market Architect Blueprint, pp. 2, 3 y 9; Institutional Trading Playbook, pp. 9-12.",
        "La ruta top-down se convierte ahora en un checklist que impide saltar pasos.",
        [
          [
            "¿Qué pregunta responde el marco mayor?",
            "Cuál es el régimen, el sesgo y la zona que organiza la operación.",
          ],
          [
            "¿Qué error produce buscar primero el gatillo?",
            "Encontrar patrones técnicamente reconocibles sin ubicación ni recorrido.",
          ],
        ],
      ),
      section(
        "3. Checklist, invalidación y tamaño",
        "Cada permiso debe ser observable",
        [
          "Un checklist útil se responde sí o no: sesgo alineado, zona identificada, reacción confirmada, invalidación definida, recorrido suficiente y tamaño calculado. Frases como 'se ve bien' deben reemplazarse por condiciones observables. Si falta un permiso obligatorio, el plan ordena esperar.",
          "Supón una cuenta de 10 000, riesgo de 0,5% y stop técnico de 25 puntos. La pérdida máxima es 50 y el tamaño teórico 2 unidades por punto antes de ajustar por valor del instrumento. Si para usar más tamaño el trader acerca el stop a 10 puntos, cambió la hipótesis y rompió la rutina.",
          "El R/R se calcula después de ubicar el stop técnico y un objetivo realista. Un ratio alto creado con un objetivo improbable no mejora la operación. La calculadora de la plataforma debe ser una comprobación del plan, no una herramienta para forzar resultados.",
        ],
        "Market Architect Blueprint, p. 14; Protocolo Avanzado, p. 3. Elaboración editorial para el ejemplo de riesgo.",
        "La última parte de la rutina ocurre después de cerrar: revisar sin confundir beneficio con calidad.",
        [
          [
            "¿Qué característica debe tener cada ítem del checklist?",
            "Debe poder verificarse objetivamente con un sí o un no.",
          ],
          [
            "¿Por qué el tamaño se calcula después del stop?",
            "Porque el stop pertenece a la estructura; el tamaño se adapta al riesgo permitido.",
          ],
        ],
      ),
      section(
        "4. Revisión y disciplina",
        "Resultado financiero ≠ calidad de ejecución",
        [
          "Una operación ganadora puede ser un error si violó el plan; una pérdida puede estar bien ejecutada si respetó la hipótesis y el riesgo. La revisión registra captura previa, motivo de entrada, invalidación original, resultado en R y cumplimiento de cada regla.",
          "Los sesgos más frecuentes son FOMO, mover el stop, cerrar por miedo y seleccionar retrospectivamente solo ejemplos limpios. Para cada uno se diseña una barrera: esperar cierre, orden de stop colocada al entrar, tamaño tolerable y muestra completa de prácticas.",
          "El dominio se demuestra mediante repetición. Diez escenarios verifican comprensión inicial; veinte permiten observar consistencia. El módulo 7 retomará esta disciplina para leer W/M y velas sin actuar antes de que cierre el proceso.",
        ],
        "Institutional Trading Playbook, pp. 14-15, y audio Cómo los algoritmos cazan tu pánico. Elaboración editorial para la rúbrica de revisión.",
        "El módulo 7 aplicará la rutina a secuencias de velas y patrones de giro.",
        [
          [
            "¿Puede una operación ganadora ser una mala operación?",
            "Sí, si obtuvo beneficio violando contexto, stop, tamaño o cualquier regla obligatoria.",
          ],
          [
            "¿Qué debe registrar la revisión?",
            "La hipótesis previa, invalidación, resultado en R y cumplimiento del proceso.",
          ],
        ],
      ),
    ],
    sources: [
      "Market Architect Blueprint, pp. 2-3, 9 y 13-14.",
      "Institutional Trading Playbook, pp. 9-15.",
      "Protocolo Avanzado, p. 3.",
      "Audio Cómo los algoritmos cazan tu pánico.",
      "Transcripciones del módulo de rutinas de trabajo.",
    ],
  },
  7: {
    question:
      "¿Cómo pasar de una vela aislada a una lectura completa de W, M y giros en V?",
    introduction:
      "El módulo integra estructura y velas. Primero aprenderás a leer una secuencia de absorción y recuperación; después diferenciarás W1, W2 y W3, junto con sus equivalentes M. Finalmente estudiarás el momento de cierre y la coordinación 15m/3m. La forma geométrica nunca sustituye la ubicación: una W en soporte y una W en mitad de una caída no representan el mismo escenario.",
    objectives: [
      "Identificar la base y los dos extremos de una W o M.",
      "Diferenciar variantes 1, 2 y 3 por relación entre extremos.",
      "Relacionar barrido, absorción y ruptura de base.",
      "Evitar anticipar una vela o patrón todavía activo.",
      "Sincronizar marco de contexto y marco de ejecución.",
    ],
    sections: [
      section(
        "1. De la vela a la secuencia",
        "Absorción → prueba → desplazamiento",
        [
          "Una vela muestra un periodo; un patrón muestra una secuencia. En una reversión alcista se busca llegada a soporte, incapacidad de la oferta para mantener mínimos, recuperación y ruptura de una referencia. La W organiza visualmente esa batalla en dos intentos.",
          "La base es el máximo situado entre los dos mínimos. Mientras el precio no recupere esa base, la W está incompleta. Dibujarla antes del rompimiento puede ser útil para observar, pero no para afirmar que el giro ya ocurrió.",
          "Contraejemplo: dos mínimos similares aparecen durante una tendencia bajista y el precio nunca supera el máximo central. Parece una W, pero sigue siendo consolidación o pausa. La estructura anterior conserva control.",
        ],
        "Guía Maestra: Formación W de Giro, pp. 1-3; APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 112-128.",
        "La relación entre el segundo extremo y el primero define la variante y el tipo de engaño o fortaleza.",
        [
          [
            "¿Qué nivel completa técnicamente una W?",
            "La ruptura o recuperación confirmada del máximo central entre los dos mínimos.",
          ],
          [
            "¿Por qué dos mínimos no bastan?",
            "Porque sin recuperación de base la oferta todavía puede conservar la estructura.",
          ],
        ],
      ),
      section(
        "2. W1, W2, W3 y sus equivalentes M",
        "Igualdad, barrido o fortaleza",
        [
          "W1 presenta dos mínimos en un nivel semejante. W2 crea un segundo mínimo inferior, barre liquidez y recupera. W3 deja el segundo mínimo por encima del primero, lo que dentro del método sugiere urgencia compradora. Las M aplican la lógica inversa en resistencias.",
          "Ejemplo W2: primer mínimo 100, base 104, segundo mínimo 99,40 y cierre posterior en 104,30. El barrido por debajo de 100 no confirma por sí mismo; la recuperación de 104 transforma el rechazo en una hipótesis operativa. El stop técnico se relaciona con 99,40.",
          "Una W2 no es automáticamente superior en cualquier lugar. En mitad de un rango, el barrido puede ser ruido. La Guía Maestra insiste en soporte, zona 230 o extremo de recorrido. La ubicación debe validarse antes de clasificar la variante.",
        ],
        "Guía Maestra: Formación W de Giro, pp. 1-3, y Guía Maestra: Fortaleza de la Demanda, pp. 2-3.",
        "La variante elegida todavía puede cambiar mientras la vela o la segunda pierna permanezcan activas.",
        [
          [
            "¿Qué distingue una W2?",
            "El segundo mínimo rompe el primero y luego recupera la estructura.",
          ],
          [
            "¿Qué distingue una W3?",
            "El segundo mínimo queda más alto, mostrando que la demanda no permite volver al extremo anterior.",
          ],
        ],
      ),
      section(
        "3. Tiempo de cierre y 'vela que se desnuda'",
        "No confirmar antes de tiempo",
        [
          "El material resalta los últimos minutos de una vela de 15m porque allí puede desaparecer un cuerpo bajista y quedar una mecha. Esta observación no autoriza a adivinar el cierre; enseña a esperar y a reconocer que la anatomía activa es provisional.",
          "La Situación A entra después del cierre y prioriza confirmación. La B anticipa durante la vela activa y asume más incertidumbre. La C exige que la recuperación envuelva una porción relevante de la vela previa. La plataforma debe mostrar estas alternativas como perfiles de ejecución, no como probabilidades garantizadas.",
          "El error típico es entrar cuando la vela todavía está roja esperando que 'se desnude'. Eso convierte una observación histórica en predicción. La versión disciplinada espera una condición escrita: recuperación de nivel, ruptura de base o cierre confirmado.",
        ],
        "Guía Maestra: Formación W de Giro, pp. 2-3; Market Architect Blueprint, pp. 10 y 12.",
        "El refinamiento final usa el marco menor únicamente después de confirmar contexto y zona.",
        [
          [
            "¿Qué riesgo existe al operar una vela activa?",
            "Su cuerpo y mechas pueden cambiar antes del cierre y dejar sin confirmar la hipótesis.",
          ],
          [
            "¿Cómo se vuelve objetiva una entrada anticipada?",
            "Definiendo de antemano el nivel que debe recuperar y el punto exacto que invalida la absorción.",
          ],
        ],
      ),
      section(
        "4. Mapa 15m y gatillo 3m",
        "Contexto arriba, precisión abajo",
        [
          "En 15m se localizan soporte, zona extrema y anatomía de absorción. En 3m o 1m se observa la microestructura y se busca una Vela Póker o ruptura de base. El marco menor no corrige una mala ubicación del mayor; solo refina entrada y stop.",
          "Ejemplo: 15m forma una mecha inferior en soporte. En 3m aparece W2, rompe base en 250,60 y retrocede a 250,40. Entrada 250,65, stop 249,80 y objetivo 252,35 ofrecen 2R. Si la resistencia de 15m está en 251,10, el objetivo real no sostiene el ratio y el trade se descarta.",
          "El dominio consiste en poder explicar la secuencia completa sin usar palabras vagas: zona, variante, base, cierre, gatillo, invalidación y espacio. El módulo 8 agregará las medias 30/75 como filtro de régimen, no como reemplazo de esta lectura.",
        ],
        "Guía Maestra: Formación W, p. 3; Market Architect Blueprint, p. 9; Institutional Trading Playbook, pp. 11-12.",
        "El módulo 8 añadirá un filtro dinámico para distinguir tendencia de pauta plana.",
        [
          [
            "¿Qué aporta el gráfico de 3m?",
            "Permite ver la microestructura del rechazo y precisar gatillo e invalidación.",
          ],
          [
            "¿Qué no puede solucionar el marco menor?",
            "Una mala zona o un recorrido insuficiente en el marco de contexto.",
          ],
        ],
      ),
    ],
    sources: [
      "APRENDE NUEVAS ESTRATEGIAS TRADING, sistema de lectura de velas, pp. 112-212.",
      "Guía Maestra: Formación W de Giro, pp. 1-3.",
      "Guía Maestra: Fortaleza de la Demanda con Velas Tipo 1, 2 y 3, pp. 1-3.",
      "Market Architect Blueprint, pp. 9-12.",
      "Institutional Trading Playbook, pp. 5-7 y 11-12.",
    ],
  },
  8: {
    question:
      "¿Cómo usar las medias 30/75 para reconocer el régimen sin operar cada cruce?",
    introduction:
      "Las medias móviles resumen precios pasados. Por eso sirven para ordenar el contexto, pero reaccionan con retraso y no predicen por sí solas. El módulo empieza explicando cómo se construyen y qué significa su pendiente; después diferencia tendencia de pauta plana y termina integrando rebotes con estructura, confirmación y riesgo.",
    objectives: [
      "Explicar qué representa una media móvil y por qué tiene retraso.",
      "Leer orden, pendiente y separación de EMA 30/75.",
      "Descartar pautas planas y cruces repetidos.",
      "Diferenciar rebote superficial en 30 y corrección más profunda en 75.",
      "Validar una estrategia mediante muestra completa y reglas estables.",
    ],
    sections: [
      section(
        "1. Qué representa una media móvil",
        "Promedio dinámico, no pronóstico",
        [
          "Una media móvil calcula un promedio de precios recientes. La EMA asigna mayor peso a los datos nuevos, por lo que la 30 responde antes que la 75. Ambas describen lo que ya ocurrió; un cruce confirma un cambio con retraso y no debe tratarse como señal instantánea.",
          "Cuando precio, EMA 30 y EMA 75 se ordenan y tienen pendiente positiva, el gráfico muestra un régimen alcista. Si el precio atraviesa ambas repetidamente y las líneas están planas, el mercado está en equilibrio. El mismo cruce tiene significados distintos en esos dos ambientes.",
          "Contraejemplo: el precio cruza la EMA 30 por encima de la 75 después de una subida extendida. Comprar en el cruce parece lógico, pero puede ser la parte final del impulso. Primero se mide distancia, estructura y obstáculo siguiente.",
        ],
        "Transcripciones de Medias 30/75 y Market Architect Blueprint, p. 3. Elaboración editorial para la definición.",
        "La pendiente y la separación permiten clasificar la calidad del régimen.",
        [
          [
            "¿Por qué un cruce de medias llega tarde?",
            "Porque ambas medias se calculan con precios anteriores y confirman después de que el movimiento comenzó.",
          ],
          [
            "¿Qué caracteriza una pauta plana?",
            "Medias sin pendiente, entrelazadas y atravesadas repetidamente por el precio.",
          ],
        ],
      ),
      section(
        "2. Orden, pendiente y distancia",
        "Calidad y madurez de la tendencia",
        [
          "En un régimen alcista limpio suele observarse precio sobre EMA 30, EMA 30 sobre EMA 75 y ambas ascendentes. En uno bajista ocurre lo contrario. La separación indica fuerza, pero una distancia extrema entre precio y medias también advierte sobreextensión.",
          "Ejemplo: USD/JPY diario mantiene las medias ascendentes y corrige por primera vez desde una extensión. Esperar el retorno hacia la EMA 30 evita comprar lejos del valor dinámico. Si la corrección rompe estructura y aplana las medias, deja de ser un simple rebote.",
          "La lectura de medias siempre se subordina a máximos, mínimos y zonas. Una media puede coincidir con soporte y aportar confluencia; no crea soporte por decreto. El siguiente bloque estudia cómo exigir reacción al contacto.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 250-251, y Market Architect Blueprint, p. 3.",
        "Después de clasificar el régimen, el contacto con una media se convierte en zona de observación.",
        [
          [
            "¿Qué advierte una distancia excesiva entre precio y medias?",
            "Que el movimiento puede estar extendido y perseguirlo reduce la eficiencia de la entrada.",
          ],
          [
            "¿Qué tiene prioridad si la media y la estructura discrepan?",
            "La estructura y la invalidación observable; la media es un filtro.",
          ],
        ],
      ),
      section(
        "3. Rebotes en 30 y 75",
        "Contacto + zona + confirmación",
        [
          "La EMA 30 suele participar en retrocesos superficiales; la 75 puede recibir correcciones más profundas. El contacto no activa una orden. Se busca coincidencia con soporte o resistencia, frenada de la fuerza contraria y un patrón que recupere estructura.",
          "Ejemplo: precio 120, EMA 30 en 116 y EMA 75 en 111. El retroceso alcanza 116, forma un mínimo creciente y rompe 118. La entrada se planifica sobre 118, no simplemente al tocar 116. El stop queda bajo el patrón, no bajo la línea dibujada.",
          "Contraejemplo: el precio cae atravesando la EMA 30, luego la 75, mientras ambas se aplanan. Comprar cada toque produce varias pérdidas en dientes de sierra. La condición de descarte es tan importante como el setup.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 232-234 y 250-251; transcripciones de Medias 30/75.",
        "El último nivel decide cómo gestionar y probar una regla de medias.",
        [
          [
            "¿Qué confirma un rebote válido?",
            "La reacción estructural en una zona, no el contacto aislado con la media.",
          ],
          [
            "¿Dónde se coloca el stop?",
            "Detrás de la estructura que invalida el patrón, no a una distancia fija de la media.",
          ],
        ],
      ),
      section(
        "4. Gestión y validación de la estrategia",
        "Reglas estables y muestra completa",
        [
          "La gestión puede seguir mínimos o máximos estructurales, usar parciales o una salida definida. Salir por el primer cruce contrario puede devolver demasiado beneficio; esperar siempre la EMA 75 puede ampliar la pérdida. La regla debe probarse y mantenerse estable.",
          "Un backtest útil incluye tendencias limpias, pautas planas, primeros y terceros contactos, distintos activos y costos. Seleccionar solo capturas perfectas produce una ilusión. Registra tasa de acierto, ganancia media en R, pérdida media y racha máxima.",
          "Las medias responden 'en qué régimen estoy'; el módulo 9 añadirá el Canal Donchian para observar máximos, mínimos, contracción y expansión. Ninguno reemplaza la secuencia estructural aprendida al inicio.",
        ],
        "Transcripciones de estrategias 30/75 y APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 250-263. Elaboración editorial para la validación.",
        "El módulo 9 combinará el filtro de medias con un canal de rango reciente.",
        [
          [
            "¿Qué escenarios debe incluir el backtest?",
            "Tendencia, lateralidad, distintos contactos, activos y costos; no solo los ejemplos favorables.",
          ],
          [
            "¿Qué función final cumplen las medias?",
            "Clasificar el régimen y localizar zonas dinámicas dentro de una estructura ya analizada.",
          ],
        ],
      ),
    ],
    sources: [
      "APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 232-234 y 250-263.",
      "Market Architect Blueprint, pp. 3 y 13.",
      "Transcripciones del módulo de Medias 30/75.",
      "Pirámide de Precisión, como apoyo audiovisual de contexto y filtro.",
    ],
  },
  9: {
    question:
      "¿Cómo leer el Canal Donchian como contexto sin comprar o vender cada banda?",
    introduction:
      "El Canal Donchian dibuja el máximo y mínimo de un periodo, además de una línea media. El módulo comienza por su construcción, continúa con contracción y expansión y termina comparando entradas agresivas, conservadoras y rebotes. El canal funciona como termómetro de rango y dirección; la estructura, la confirmación y el riesgo siguen tomando la decisión.",
    objectives: [
      "Explicar cómo se calculan las bandas y la zona media.",
      "Diferenciar compresión, expansión, tendencia y lateralidad.",
      "Evitar interpretar cada toque como sobrecompra o sobreventa.",
      "Comparar ruptura agresiva, pullback conservador y rebote.",
      "Integrar Donchian con EMA 30/75 e invalidación estructural.",
    ],
    sections: [
      section(
        "1. Construcción y configuración",
        "Máximo, mínimo y centro del periodo",
        [
          "La banda superior representa el máximo de los últimos N periodos; la inferior, el mínimo; la línea media, el centro entre ambas. Cambiar N modifica la sensibilidad. La configuración debe fijarse antes de evaluar resultados para evitar adaptar el indicador al pasado.",
          "Ejemplo: con periodo 20, la banda superior en 105 y la inferior en 95 producen una media en 100. Si el precio cierra en 104, está en la mitad alta del rango reciente, pero todavía no existe una señal automática.",
          "El manual presenta configuraciones y prácticas específicas. La primera tarea del estudiante es reproducir el canal correctamente y reconocer que resume precio histórico. El siguiente bloque interpreta cómo cambia su anchura.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 9, pp. 213-223.",
        "La anchura y la pendiente del canal ayudan a clasificar el régimen.",
        [
          [
            "¿Qué calcula la banda superior?",
            "El máximo de los últimos periodos definidos por la configuración.",
          ],
          [
            "¿Por qué no debe cambiarse el periodo después de ver el resultado?",
            "Porque introduce sesgo retrospectivo y hace que la prueba deje de ser comparable.",
          ],
        ],
      ),
      section(
        "2. Compresión, expansión y termómetro",
        "Régimen antes que señal",
        [
          "Un canal estrecho indica que el rango reciente se comprimió; uno que se abre muestra expansión. La compresión no predice la dirección. El precio puede caminar por la banda superior durante una tendencia alcista o por la inferior durante una bajista.",
          "El material usa la zona media como filtro diario: por encima se priorizan largos y por debajo cortos, siempre que la estructura acompañe. Esta es una regla del sistema, no una ley del mercado. Debe validarse en el activo y timeframe estudiados.",
          "Contraejemplo: vender cada toque de banda superior porque parece 'sobrecomprado'. En una tendencia fuerte, esos toques son nuevos máximos y la posición queda repetidamente contra el movimiento. Primero se clasifica tendencia o rango.",
        ],
        "Guía de Estudio de Análisis Técnico Avanzado, pp. 1-3; Market Architect Blueprint, p. 3; APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 215-217.",
        "Una vez clasificado el régimen, se elige un tipo de entrada compatible.",
        [
          [
            "¿Qué anticipa una compresión?",
            "Mayor probabilidad de expansión futura, pero no su dirección.",
          ],
          [
            "¿Puede el precio permanecer junto a una banda?",
            "Sí. En tendencia puede caminar por ella durante varios periodos.",
          ],
        ],
      ),
      section(
        "3. Entradas agresivas, conservadoras y rebotes",
        "Evidencia proporcional al riesgo",
        [
          "La entrada agresiva participa en la ruptura o recuperación de una banda con contexto favorable. La conservadora espera aceptación fuera del canal y un pullback. El rebote busca reacción desde soporte, resistencia o medias dentro del sesgo definido.",
          "Ejemplo: el canal se comprime entre 98 y 102. Una vela cierra en 103, expande la banda y el pullback sostiene 102 como mínimo creciente. La entrada conservadora sobre la recuperación de 103 tiene una invalidación bajo el pullback. Si el precio vuelve y acepta bajo 102, la ruptura falla.",
          "Una mecha que atraviesa la banda y vuelve al canal no equivale a aceptación. Puede ser barrido o rechazo. La distinción se hace con cierre, seguimiento y estructura, no con el simple contacto.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 224-254 y 258-263.",
        "El último nivel integra canal, medias, objetivo y gestión.",
        [
          [
            "¿Qué confirma una ruptura conservadora?",
            "Aceptación fuera del canal y un pullback que conserva la nueva estructura.",
          ],
          [
            "¿Qué invalida una ruptura alcista del ejemplo?",
            "El regreso y aceptación por debajo del nivel roto y del mínimo del pullback.",
          ],
        ],
      ),
      section(
        "4. Integración con medias y riesgo",
        "Canal como mapa, estructura como árbitro",
        [
          "Donchian y EMA 30/75 pueden coincidir para filtrar el contexto: precio en mitad alta, medias ascendentes y estructura alcista favorecen búsquedas largas. La confluencia no elimina pérdidas; reduce escenarios contradictorios.",
          "El objetivo puede ser la banda opuesta, una resistencia o un nivel estructural, según el régimen. El stop permanece ligado al patrón que invalida la operación. Si el canal exige un stop demasiado amplio frente al recorrido, el tamaño se reduce o la entrada se descarta.",
          "El módulo cierra la parte técnica del curso: estructura, retroceso, velas, zonas, medias y canal forman un proceso jerárquico. El módulo 10 trasladará ese proceso a criptomonedas, donde la ejecución añade riesgos de custodia, liquidez y derivados.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 255-268; Market Architect Blueprint, pp. 3 y 13.",
        "El módulo 10 conserva el método y añade los riesgos propios del vehículo cripto.",
        [
          [
            "¿Qué aporta la coincidencia entre canal y medias?",
            "Un filtro de contexto más coherente, no una garantía de resultado.",
          ],
          [
            "¿Qué sigue definiendo el stop?",
            "La estructura o patrón cuya pérdida invalida la hipótesis.",
          ],
        ],
      ),
    ],
    sources: [
      "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 9, pp. 213-268.",
      "Guía de Estudio: Análisis Técnico Avanzado y Estrategia de Velas Póker, pp. 1-3.",
      "Market Architect Blueprint, pp. 3 y 13.",
      "Transcripciones del Canal Donchian, como apoyo práctico.",
    ],
  },
  10: {
    question:
      "¿Qué debe comprenderse antes de aplicar el método a criptomonedas?",
    introduction:
      "El análisis técnico puede usar la misma estructura en distintos mercados, pero el vehículo cripto añade decisiones previas: qué activo y red se negocian, quién custodia las claves, qué diferencia existe entre spot y perpetuos y si la liquidez permite respetar el stop. El módulo comienza con conceptos tecnológicos básicos y termina integrando ejecución, apalancamiento y riesgo.",
    objectives: [
      "Distinguir blockchain, activo, red, dirección y clave privada.",
      "Comparar custodia propia y custodia en exchange.",
      "Diferenciar spot, futuros y exposición apalancada.",
      "Evaluar spread, profundidad, deslizamiento y operación continua.",
      "Aplicar el proceso completo sin confundir narrativa con confirmación.",
    ],
    sections: [
      section(
        "1. Activo digital, red y blockchain",
        "Tecnología no equivale a calidad",
        [
          "Una blockchain es un registro compartido que enlaza transacciones mediante criptografía y reglas de consenso. Una criptomoneda o token utiliza una red, pero la tecnología no garantiza demanda, descentralización real ni rentabilidad. Es necesario separar infraestructura de valoración.",
          "Bitcoin, Ether y un token de baja capitalización pueden mostrar velas similares, pero difieren en emisión, uso, validadores y liquidez. Antes del gráfico se verifica el símbolo, la red y el contrato correcto para evitar operar un activo distinto al esperado.",
          "Contraejemplo: un proyecto afirma usar blockchain y el estudiante lo interpreta como inversión segura. La afirmación describe una característica técnica, no la calidad económica. El siguiente bloque explica que incluso un activo válido puede perderse por mala custodia.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 10, pp. 269-275. Elaboración editorial para separar tecnología y valoración.",
        "Comprender la red no protege los fondos si las claves se administran mal.",
        [
          [
            "¿Qué demuestra que un activo use blockchain?",
            "Describe parte de su infraestructura; no demuestra valor futuro ni seguridad económica.",
          ],
          [
            "¿Qué se verifica antes de operar?",
            "Activo, símbolo, red, contrato y mercado exactos.",
          ],
        ],
      ),
      section(
        "2. Monederos, claves y custodia",
        "Control y responsabilidad",
        [
          "La dirección pública recibe fondos; la clave privada o frase semilla autoriza movimientos. En custodia propia, el usuario controla las claves y asume su protección y recuperación. En un exchange, delega parte del control y asume riesgo de contraparte, suspensión o indisponibilidad.",
          "Guardar la semilla en una captura sincronizada parece cómodo, pero expone el acceso. Compartirla con supuesto soporte equivale a entregar control. Ningún servicio legítimo necesita esa frase para resolver una consulta.",
          "El tipo de monedero se elige según uso, monto y necesidad de acceso. La decisión de custodia es independiente de la señal técnica. A continuación se distingue poseer el activo de operar un derivado.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 271-272 y 276.",
        "El siguiente paso es entender qué se compra o vende en spot y en futuros.",
        [
          [
            "¿Qué función tiene la frase semilla?",
            "Permite recuperar o controlar las claves; nunca debe compartirse ni almacenarse de forma insegura.",
          ],
          [
            "¿Qué riesgo añade custodiar en un exchange?",
            "Riesgo de contraparte y de disponibilidad, además del riesgo de mercado.",
          ],
        ],
      ),
      section(
        "3. Spot, perpetuos y apalancamiento",
        "Margen requerido no es pérdida máxima",
        [
          "En spot se intercambia el activo. En un futuro perpetuo se mantiene exposición a un precio mediante margen, funding y reglas de liquidación. El apalancamiento reduce el capital exigido como garantía, pero no reduce el movimiento del valor nominal.",
          "Ejemplo: cuenta de 10 000 USDT, riesgo 1%, entrada BTC en 60 000 y stop en 59 400. La pérdida permitida es 100 y la distancia 600; el tamaño teórico es 0,1667 BTC antes de comisiones y deslizamiento. El margen mostrado por la plataforma no sustituye este cálculo.",
          "Contraejemplo: usar 20x con una posición grande porque solo bloquea poco margen. Una variación pequeña puede exceder el riesgo previsto o acercar la liquidación. El tamaño se calcula desde el stop técnico y después se verifica el margen.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 273-277. Elaboración editorial para spot, perpetuos y ejemplo de riesgo.",
        "El cálculo teórico solo se cumple si la liquidez permite ejecutar cerca de los precios planificados.",
        [
          [
            "¿Por qué margen y riesgo no son lo mismo?",
            "El margen es garantía requerida; el riesgo depende del valor nominal y de la distancia hasta el stop.",
          ],
          [
            "¿En qué orden se calcula la operación?",
            "Entrada y stop técnico, pérdida permitida, tamaño y finalmente margen y costos.",
          ],
        ],
      ),
      section(
        "4. Liquidez, ejecución y aplicación del método",
        "El vehículo también forma parte del setup",
        [
          "El mercado cripto opera de forma continua y la liquidez cambia por activo, exchange y hora. Spread, profundidad y deslizamiento determinan si el riesgo calculado es ejecutable. Una altcoin delgada puede producir mechas y saltos que no aparecen en un mercado profundo.",
          "La secuencia final es: verificar activo y contrato, medir liquidez, leer estructura, localizar zona, esperar confirmación, definir invalidación y dimensionar. La narrativa del proyecto no sustituye ninguna de estas pruebas.",
          "Ejemplo final: BTCUSDT y una altcoin muestran la misma W2. BTC conserva 2R después de costos; la altcoin cae a 1,1R por spread y deslizamiento. El patrón puede ser reconocible en ambos, pero solo uno respeta el plan. Así concluye el hilo conductor del curso: observar, contextualizar, confirmar, invalidar y gestionar.",
        ],
        "APRENDE NUEVAS ESTRATEGIAS TRADING, pp. 269-277. Elaboración editorial para liquidez, costos e integración.",
        "Este módulo cierra la ruta y devuelve al estudiante al laboratorio para practicar el proceso completo.",
        [
          [
            "¿Por qué dos gráficos iguales pueden producir decisiones distintas?",
            "Porque spread, profundidad, costos y tipo de contrato modifican el riesgo ejecutable.",
          ],
          [
            "¿Cuál es la secuencia final del método?",
            "Verificar vehículo, estructura y zona; esperar confirmación; definir invalidación; calcular tamaño y costos.",
          ],
        ],
      ),
    ],
    sources: [
      "APRENDE NUEVAS ESTRATEGIAS TRADING, módulo 10, pp. 269-277.",
      "Elaboración editorial identificada para custodia, derivados, liquidez y ejemplos numéricos.",
      "Las reglas técnicas de módulos 1-9 se reutilizan como método, no como fuente cripto adicional.",
    ],
  },
};

export const moduleCurriculum: ModuleCurriculum[] = previousCurriculum.map(
  (module) => ({
    ...module,
    ...narratives[module.module],
  }),
);

export { complementaryReferences };
