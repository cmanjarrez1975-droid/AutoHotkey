/** Supplied module 3 material, kept independent of existing graded lesson IDs. */
export const moduleThreeSections = [
  {
    id: 'tipos', title: '1. Reconoce qué se está corrigiendo', diagram: 'tres-retrocesos', pages: [37, 38, 39, 40],
    paragraphs: [
      'En el módulo 2 separaste impulsos y pausas. Ahora acerca la mirada a la pausa: un retroceso es el movimiento contrario al impulso que estás estudiando. Primero señala el inicio y el final de ese impulso y conserva la misma temporalidad. Sin esas referencias, una caída puede parecer pequeña en una escala y profunda en otra.',
      'El profesor organiza tres prototipos. Tipo 1: pausa breve, representada por una vela antes de retomar la subida. Tipo 2: pausa algo más desarrollada, ilustrada con dos velas de retroceso y dos de recuperación. Tipo 3: corrección más profunda y prolongada, con varias velas. Son modelos de lectura; contar velas no sustituye medir la profundidad y observar la ubicación.',
      'Por ejemplo, dos velas rojas pequeñas pueden corregir menos precio que una sola vela muy amplia. Describe primero lo observable: cuánto ha devuelto el precio, cuántas velas han transcurrido y qué referencia tiene cerca. Mientras la corrección siga abierta, su clasificación puede cambiar.',
      'El manual relaciona pausas breves con el primer impulso, soportes y salidas de rango; también estudia correcciones más desarrolladas después del segundo impulso. Las combinaciones 1→2, 2→2, 2→3 y otras variantes impiden memorizar una secuencia obligatoria. Los porcentajes de Fibonacci son referencias del tramo elegido, no destinos que el precio deba alcanzar.',
    ],
    question: 'Señala el impulso corregido. ¿Tu clasificación describe duración, profundidad o ambas? ¿Qué podría cambiar con la siguiente vela?',
    originals: ['tipos-de-retrocesos', 'criterios-ubicacion', 'ubicaciones-tendencia-1'],
  },
  {
    id: 'pausa', title: '2. Una pausa no anuncia su desenlace', diagram: null, pages: [41],
    paragraphs: [
      'Después de una subida vertical, una primera vela de pausa puede parecer el tipo 1. Pero al cerrar esa vela todavía no conoces el movimiento siguiente. El profesor advierte que la pausa puede ampliarse y convertirse en una corrección de tipo 2 o 3.',
      'La imagen del “engaño alcista” enseña un caso completo: subida, pausa y caída posterior. Para estudiarlo sin usar el futuro, tapa mentalmente todo lo que queda después de la primera pausa. En ese instante solo puedes afirmar que el avance se ha interrumpido; todavía no que exista una trampa confirmada ni que necesariamente vendrá una corrección profunda.',
      'Anota qué referencia estás observando y qué nuevo movimiento cambiaría tu lectura. Si después aparecen mínimos inferiores, registra esa información cuando ocurra. No reescribas la primera observación como si hubieras conocido el desenlace.',
    ],
    question: 'Al cerrar la primera vela de pausa, ¿qué sabes y qué parte del dibujo pertenece todavía al futuro?',
    originals: ['engano-alcista'],
  },
  {
    id: 'rangos', title: '3. Ubica el retroceso después de un rango', diagram: 'retrocesos-tras-rango', pages: [42],
    paragraphs: [
      'Un rango es una zona donde el precio oscila entre referencias sin desarrollar un avance sostenido. Marca su resistencia antes de estudiar la salida. Después de superarla, la pausa puede regresar a esa referencia o terminar por encima; el manual contempla ambas ubicaciones.',
      'En el primer esquema, el mínimo vuelve al nivel azul. En el segundo, queda por encima. La diferencia sirve para describir dónde se detuvo la corrección, no para exigir un “toque perfecto”. La línea discontinua muestra una continuación hipotética que aún tendría que observarse.',
      'Como contraejemplo, si el precio vuelve al interior del rango y continúa descendiendo, no describas el movimiento automáticamente como un apoyo exitoso. Distingue salida, retorno y reacción posterior. La antigua resistencia es una referencia a estudiar, no una garantía de soporte.',
    ],
    question: '¿El mínimo toca la referencia, queda por encima o vuelve al interior? ¿Ya ocurrió la recuperación o solo la estás suponiendo?',
    originals: ['retrocesos-despues-de-rangos'],
  },
  {
    id: 'velas', title: '4. Lee la vela dentro de su contexto', diagram: 'lectura-de-confluencias', pages: [43, 44],
    paragraphs: [
      'Una vela resume apertura, máximo, mínimo y cierre de un intervalo. El cuerpo une apertura y cierre; las mechas muestran los extremos. Una mecha inferior larga indica que se negociaron precios inferiores al cuerpo y que el cierre terminó más arriba del mínimo. Esa observación no identifica quién compró ni asegura el próximo movimiento.',
      'La lámina aportada ilustra cuatro familias: martillo, envolvente alcista, estrella del amanecer y pinbar. Úsalas para comparar proporciones y secuencias: una envolvente compara cuerpos consecutivos; una estrella del amanecer se estudia como grupo de tres velas. No sustituyen una definición completa ni los seis grupos sin nombre que aparecen en la página 43 del manual.',
      'El lugar cambia la pregunta. Una figura junto a un soporte previamente marcado permite estudiar la reacción a esa referencia. La misma figura en mitad de un recorrido, sin nivel identificado, no ofrece esa misma relación. Primero contexto, después ubicación, luego secuencia y condición pendiente.',
      'El curso señala varias ubicaciones posibles: segunda parte de una W, terminación de un retroceso, retorno a soporte y niveles calculados de Fibonacci. Son contextos alternativos que pueden coincidir; no necesitas forzar todos a la vez. Confluencia significa coincidencia de referencias, no confirmación automática de compra.',
    ],
    question: 'Describe cuerpo, mecha y ubicación sin atribuir una intención al comprador. ¿Qué referencia falta recuperar?',
    originals: ['patrones-velas-compradores', 'mapa-confluencia-compradora'],
  },
  {
    id: 'profundos', title: '5. Separa microtendencia, W y giro en V', diagram: 'microtendencia-w-v', pages: [45, 46],
    paragraphs: [
      'Una corrección profunda puede construir máximos y mínimos descendentes en una escala menor. Eso es una microtendencia bajista dentro del movimiento que estás analizando. Señala los extremos de cada oscilación: los cierres aislados no bastan para reconstruir todos los máximos y mínimos de las velas.',
      'También puede aparecer una caída directa sin oscilaciones internas visibles en la escala elegida. Es otra forma de retroceder, no una caída sin riesgo. Para distinguirlas, pregunta si existen rebotes intermedios que permitan comparar máximos locales y mínimos sucesivos.',
      'La forma de la caída y la forma de la recuperación son preguntas distintas. Una W necesita dos intentos de caída separados por un rebote. Una V tiene un único fondo visible seguido de recuperación directa. En los dibujos nuevos, el tramo discontinuo es una posibilidad posterior; no debe darse por hecho al llegar al mínimo.',
      'Si una corrección alcanza un soporte o una referencia de Fibonacci, estudia qué sucede allí. La tendencia del marco mayor no impide que se pierdan sus referencias. No conviertas “retroceso” en una explicación permanente de cualquier caída.',
    ],
    question: '¿Puedes marcar dos mínimos separados por un rebote? Si solo hay un fondo y una recuperación, ¿por qué no sería una W?',
    originals: ['retroceso-profundo-micro-tendencia', 'retroceso-profundo-sin-tendencia'],
  },
  {
    id: 'mapa', title: '6. Convierte las etiquetas en observaciones', diagram: null, pages: [],
    paragraphs: [
      'La imagen de 15 minutos sirve como mapa esquemático: soporte cerca de 105, resistencia en 118 y referencia intermedia en 112. Empieza por describir el recorrido frente a esas líneas. Por ejemplo, el retorno señalado cerca de 115 está por debajo de 118 y por encima de 112; no toca exactamente ninguna de las dos.',
      'No se suministran activo, fecha, serie completa de velas ni perfil de volumen. Por eso el rótulo POC se conserva como parte del original, pero no se presenta como un cálculo verificado. Una línea intermedia no demuestra por sí misma el precio con mayor volumen negociado.',
      'Usa este ejercicio para practicar lenguaje preciso: “regresa por debajo de la resistencia anterior” describe el dibujo; “compra confirmada en el POC” añade condiciones que el material no permite comprobar. Las flechas son anotaciones retrospectivas, no un registro reproducible de operaciones.',
    ],
    question: '¿Dónde queda el punto señalado respecto a 118 y 112? ¿Qué datos faltan para validar el rótulo POC?',
    originals: ['analisis-15m-anterior'],
  },
  {
    id: 'fibonacci', title: '7. Comprueba los porcentajes antes de interpretar', diagram: 'fibonacci-verificado', pages: [],
    paragraphs: [
      'Para la escala de retroceso usada aquí, coloca 0 % en el extremo superior B y 100 % en el extremo inferior A. La amplitud es B − A. El precio de un nivel r se obtiene con B − r × (B − A), usando r como decimal. Declara los anclajes cada vez: cambiar el tramo cambia todos sus niveles.',
      'En la práctica 2 se rotulan A = 108 y B = 125. La amplitud es 17; el 38,2 % corresponde a 125 − 0,382 × 17 = 118,506. La línea próxima a 118,5 es coherente, pero la flecha señala una zona bastante inferior. Para un punto didáctico fijado en 115, el retroceso sería (125 − 115) / 17 = 58,82 %. Un mínimo de mecha todavía inferior daría otro porcentaje.',
      'En la práctica 3 tomamos las referencias dibujadas cerca de 71 y 100 como anclajes exactos de un ejemplo nuevo. El punto medio es 85,5. Un punto en 68 queda por debajo de 71: equivale al 110,34 % de ese tramo, no al 50 %. Estos cálculos aclaran la geometría; no recuperan una serie de mercado que no se ha aportado.',
      'El curso también utiliza proyecciones con otros anclajes. No traslades sus porcentajes a esta escala sin definirla. Conservamos el 76,4 % que figura en el material recibido y en el manual, sin reemplazarlo silenciosamente por otro nivel. Medir ubicación y decidir una operación siguen siendo tareas distintas.',
    ],
    question: '¿Puedes reproducir el porcentaje con dos anclajes y un precio? ¿Estás midiendo el cuerpo, el cierre o la mecha?',
    originals: ['practica-2-analisis', 'practica-3-analisis'],
  },
] as const;

type ImageNote = { title: string; alt: string; status: 'nota' | 'revision'; note: string };
export const moduleThreeImageNotes: Record<string, ImageNote> = {
  'tipos-de-retrocesos': {
    title: 'Comparación de los tres retrocesos', status: 'nota',
    alt: 'Tres secuencias de velas con una pausa breve, una corrección intermedia y otra más profunda.',
    note: 'El rótulo Módulo 2 corresponde a la numeración anterior. Estos son prototipos para el módulo 3: contar una, dos o varias velas no basta para clasificar cualquier caso. La mención del 61,8 % no significa que toda corrección profunda deba llegar allí.',
  },
  'criterios-ubicacion': {
    title: 'Criterios de ubicación por tipo', status: 'revision',
    alt: 'Tres columnas relacionan tipos de retroceso con impulsos, soportes, rangos y niveles de Fibonacci.',
    note: 'Lee las ubicaciones como referencias del método, no como frecuencias demostradas. Expresiones como “zona de oro” o “alta probabilidad” no aportan por sí mismas estadísticas. El conteo de impulsos y los anclajes deben definirse antes de aplicar cualquier porcentaje.',
  },
  'ubicaciones-tendencia-1': {
    title: 'Ubicaciones en una estructura alcista', status: 'revision',
    alt: 'Trayectoria ascendente con tres zonas rodeadas para situar pausas en distintos momentos de la estructura.',
    note: 'El círculo morado aparece antes del impulso señalado como primero: no lo confundas con su retroceso posterior. El dibujo no incluye anclajes suficientes para verificar los porcentajes anotados. Identifica primero el tramo y después compara profundidad y ubicación.',
  },
  'engano-alcista': {
    title: 'Primera pausa y corrección posterior', status: 'revision',
    alt: 'Subida de varias velas seguida de una pausa y una caída, anotada retrospectivamente como engaño alcista.',
    note: 'La caída posterior ya está visible en esta lámina. Al cerrar la primera pausa aún no se conoce ese desenlace. La imagen no demuestra intención de atrapar minoristas, búsqueda institucional de liquidez ni que toda pausa tras una subida vertical termine en un tipo 3.',
  },
  'retrocesos-despues-de-rangos': {
    title: 'Pausa después de superar un rango', status: 'revision',
    alt: 'Rango lateral gris, ruptura ascendente y retroceso cuyo mínimo queda ligeramente sobre la resistencia previa.',
    note: 'Aunque dice “apoyo perfecto”, el mínimo dibujado queda ligeramente por encima de la línea. El manual contempla tanto el retorno a la referencia como la pausa por encima. La salida del rango, por sí sola, tampoco garantiza un cambio de tendencia sostenido.',
  },
  'patrones-velas-compradores': {
    title: 'Cuatro familias de figuras de velas', status: 'revision',
    alt: 'Ejemplos esquemáticos de martillo, envolvente alcista, estrella del amanecer y pinbar con mecha inferior.',
    note: 'Es un catálogo complementario de cuatro familias, no una transcripción exacta de los seis grupos sin nombre de la página 43. Una mecha no demuestra “absorción total” ni “entrada institucional”. La forma necesita contexto y una definición completa antes de usarse como regla.',
  },
  'mapa-confluencia-compradora': {
    title: 'Mapa de contextos y confluencias', status: 'revision',
    alt: 'Mapa que conecta W, tipos de retroceso, retorno a soporte y niveles de Fibonacci con posibles figuras de velas.',
    note: 'Las ramas representan contextos posibles, no cuatro requisitos obligatorios. Se conserva el 76,4 % del material. La coincidencia de niveles y una vela no confirman por sí solas una compra ni permiten afirmar que “los profesionales están defendiendo la zona”.',
  },
  'retroceso-profundo-micro-tendencia': {
    title: 'Corrección con estructura menor descendente', status: 'revision',
    alt: 'Retroceso con máximos y mínimos descendentes y un último fondo seguido de una recuperación directa.',
    note: 'La corrección sí muestra oscilaciones descendentes, pero el último giro dibujado tiene forma de V, no una W completa: falta un segundo intento de caída separado por un rebote. La línea 61,8 % carece de anclajes numéricos para reproducir el cálculo; no demuestra un giro obligatorio.',
  },
  'retroceso-profundo-sin-tendencia': {
    title: 'Caída directa hacia una zona previa', status: 'revision',
    alt: 'Impulso ascendente y caída directa de grandes cuerpos rojos hasta una franja horizontal de soporte.',
    note: 'No se ven rebotes internos en esta escala. Los cuerpos rojos dibujados no muestran una mecha suficiente para verificar el martillo mencionado en el rótulo. La recuperación posterior es parte del ejemplo completo; llegar al soporte no garantiza que la caída se detenga.',
  },
  'analisis-15m-anterior': {
    title: 'Mapa esquemático de 15 minutos', status: 'revision',
    alt: 'Línea azul con soporte en 105, resistencia en 118, referencia POC en 112 y retorno posterior cerca de 115.',
    note: 'No se aportan perfil de volumen ni datos para calcular el POC. El retorno señalado cerca de 115 queda por debajo de 118 y por encima de 112: no es un toque exacto de esos niveles. “Pullback / Compra” es una anotación del original, no una operación validada.',
  },
  'practica-2-analisis': {
    title: 'Práctica 2: contraste entre flecha y porcentaje', status: 'revision',
    alt: 'Tramo entre 108 y 125 con línea del 38,2 por ciento en 118,5 y una flecha que señala una vela inferior.',
    note: 'Con anclajes 108 y 125, el 38,2 % vale 118,506. La flecha apunta cerca de la línea 61,8 % y el cuerpo alrededor de 115–117, con mecha inferior; no al 38,2 %. Sin OHLC originales no asignamos un mínimo exacto a esa vela. La lámina nueva usa 115 como punto didáctico explícito.',
  },
  'practica-3-analisis': {
    title: 'Práctica 3: soporte, barrido y escala', status: 'revision',
    alt: 'Caída desde 100 hacia un soporte cercano a 71, mínimo alrededor de 68 y recuperación posterior en V.',
    note: 'El círculo está por debajo del soporte, no en el 50 %. Con referencias fijadas en 71 y 100 para el ejemplo nuevo, el 50 % es 85,5 y un punto en 68 queda fuera del tramo. Las menciones 23–0 % necesitan otros anclajes; tampoco se demuestra absorción institucional con este dibujo.',
  },
};

export const moduleThreeExercises = [
  {
    title: 'Duración no es profundidad',
    prompt: 'En la misma temporalidad, el caso A sube de 100 a 120 y retrocede dos velas hasta 118. El caso B sube de 100 a 120 y retrocede una vela hasta 108. 1) Calcula cuánto devuelve cada uno. 2) Indica cuál es más profundo. 3) Explica por qué el número de velas no basta para asignar un tipo definitivo. No se proporcionan velas posteriores.',
    answer: 'A devuelve 2 de los 20 puntos del impulso: 10 %. B devuelve 12 de 20: 60 %. B es más profundo aunque dure una sola vela. A recuerda una pausa de dos velas, pero aún no tiene recuperación observada; B no debe llamarse retroceso breve solo por su duración. Ambos casos siguen abiertos: falta ubicación frente a referencias previas y desarrollo posterior.',
  },
  {
    title: 'Detén la historia en la primera pausa',
    prompt: 'Solo conoces cinco velas de avance y una primera vela de pausa. 1) Escribe una observación cierta. 2) Propón dos desenlaces posibles sin elegir uno como seguro. 3) Explica por qué sería incorrecto escribir ya “engaño alcista confirmado”.',
    answer: 'Observación: el avance se ha interrumpido durante una vela. Posibilidades: recuperación posterior o ampliación de la corrección; también podría desarrollarse un rango. Ninguna está demostrada con el corte disponible. Calificar ya un engaño usa el resultado futuro como si se conociera en ese instante. Registra la pausa y las referencias pendientes; revisa la lectura solo al recibir nuevas velas.',
  },
  {
    title: 'Distingue una W de una V',
    prompt: 'Tres secuencias de extremos, no de cierres: A = 9→6→8→5→7→3; B = 8→3→5,5→3,5→7; C = 8→3→7. 1) Compara máximos y mínimos en A. 2) Cuenta los fondos de B y C. 3) Asigna microtendencia, W o V. No deduzcas una entrada.',
    answer: 'A tiene máximos 9, 8 y 7 y mínimos 6, 5 y 3: estructura descendente, sin giro final dibujado. B tiene dos fondos, 3 y 3,5, separados por un rebote a 5,5: forma de W con recuperación posterior en esta secuencia completa. C solo tiene un fondo en 3: forma de V. Describir esas formas no demuestra rentabilidad ni identifica a sus participantes.',
  },
  {
    title: 'Audita las dos prácticas de Fibonacci',
    prompt: 'Usa 0 % arriba y 100 % abajo. Caso A: extremos 108 y 125, punto 115. Caso B: extremos 71 y 100, punto 68. 1) Calcula el 38,2 % de A. 2) Calcula el porcentaje de su punto 115. 3) Calcula el 50 % de B. 4) Decide si 68 está dentro del tramo. Fórmulas: nivel = B − r×(B−A); proporción = (B−precio)/(B−A).',
    answer: 'Caso A: amplitud 17; 38,2 % = 118,506; punto 115 = 10/17 = 58,82 %. Caso B: amplitud 29; 50 % = 85,5; punto 68 = 32/29 = 110,34 %, por debajo del anclaje inferior 71. Por tanto, las flechas originales no deben interpretarse como pruebas de los porcentajes que las acompañan. Estos son cálculos sobre datos didácticos explícitos, no mediciones exactas de velas reales.',
  },
  {
    title: 'Confluencia sin conclusiones prematuras',
    prompt: 'Una vela con mecha inferior aparece cerca de un soporte previamente marcado y de un nivel calculado. No tienes datos de volumen ni velas posteriores. Escribe: 1) dos observaciones; 2) una condición pendiente; 3) una afirmación que no podrías justificar. Después compara con la misma vela aislada, sin soporte identificado.',
    answer: 'Puedes observar la mecha inferior y la proximidad a dos referencias declaradas. Queda pendiente comprobar la reacción posterior y qué máximo o nivel se recupera; no basta decir “vela verde”. No puedes afirmar entrada institucional, absorción total ni compra confirmada. Sin soporte identificado se conserva la descripción de la vela, pero desaparece esa relación de ubicación. Coincidencia, reacción y decisión son pasos diferentes.',
  },
] as const;
