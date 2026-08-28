/** Adaptación de las dos transcripciones recibidas y del manual, pp. 58–69 y 72–74.
 * Los originales se conservan aparte. No contiene reglas de ejecución ni calificaciones.
 */
export const moduleFourSections = [
  {
    id: 'estructura', title: '1. Reconoce las cuatro tendencias', diagram: 'cuatro-tendencias', pages: [58, 59],
    paragraphs: [
      'En el módulo 3, el retroceso bajaba porque corregía una subida. Ahora la dirección principal es descendente: el impulso baja y su retroceso sube. Una vela verde puede pertenecer a esa recuperación sin haber cambiado todavía la tendencia mayor. Conserva la misma escala y compara los extremos relevantes, no solo el color de la última vela.',
      'El manual distingue cuatro secuencias según la pausa después de los dos primeros impulsos, I1 e I2. Tendencia 1: pausa sencilla después de ambos. Tendencia 2: sencilla después de I1 y compleja después de I2. Tendencia 3: compleja después de I1 y sencilla después de I2. Tendencia 4: compleja después de ambos. Las pequeñas oscilaciones internas no son automáticamente nuevos impulsos principales.',
      'Por ejemplo, una M después del segundo impulso y una pausa sencilla después del primero describen la tendencia 2. No la llames tendencia 4 porque esa M se parezca al patrón de continuación 4: una numeración describe la secuencia completa y la otra describe la forma interna de una pausa. Mientras esa pausa se forma, su clasificación sigue abierta.',
    ],
    question: 'Después de I1 aparece una continuación compleja y después de I2 un retroceso sencillo. ¿Qué tendencia describe el conjunto? Es la 3; justifica tu respuesta por la ubicación de las pausas.',
    originals: ['tipos-de-tendencias-bajistas'],
  },
  {
    id: 'retrocesos', title: '2. Separa duración y profundidad', diagram: 'tres-retrocesos', pages: [60, 61, 62, 63, 64],
    paragraphs: [
      'El retroceso 1 es una pausa breve, representada por una vela. El 2 desarrolla una recuperación de varias velas; el ejemplo del curso usa aproximadamente dos de recuperación y dos de reanudación. El 3 devuelve una parte mayor de la caída y suele necesitar una estructura más desarrollada. Son prototipos de lectura: contar velas no basta para saber cuánto se ha corregido.',
      'Si una caída va de 120 a 100, recuperar hasta 104 devuelve el 20 % del tramo, aunque tarde tres velas. Recuperar hasta 112 devuelve el 60 %, aunque ocurra en una sola. El segundo movimiento es más profundo; el primero dura más. Ninguna de esas cifras demuestra que la recuperación haya terminado.',
      'El material relaciona pausas breves con el primer impulso, salidas de rango y la referencia 23,6 %; las intermedias con resistencias y 38,2 %–50 %; las profundas con resistencias más alejadas y 61,8 %. Son ubicaciones estudiadas, no probabilidades verificadas. La página 64 también muestra un retroceso 3 después del primer impulso: no lo excluyas por una regla memorizada.',
      'Después de una caída rápida, la primera pausa puede ampliarse. El dibujo completo permite clasificarla retrospectivamente, pero al cerrar esa primera vela todavía no conoces el desenlace. Las combinaciones 1→1, 1→2, 2→2, 2→3 y 3→2 del manual evitan aprender una cadena obligatoria.',
    ],
    question: '¿Qué dato falta para afirmar que un rebote de una vela fue todo el retroceso? Falta observar su desarrollo posterior; “una vela por ahora” no equivale a “una sola vela en total”.',
    originals: ['tipos-de-retrocesos-bajistas'],
  },
  {
    id: 'rangos', title: '3. Ruptura, retorno y reacción son momentos distintos', diagram: 'retrocesos-tras-rango', pages: [58, 65],
    paragraphs: [
      'Marca primero el suelo y el techo del rango. Una caída bajo el suelo es un acontecimiento; el rebote posterior es otro; la reacción ante el nivel antiguo es un tercero. Un máximo más bajo dentro del rango aporta contexto, pero todavía no es una ruptura de su base.',
      'Tras perder un soporte en 100 y llegar a 94, el rebote puede terminar en 97 o volver hasta 100. El manual contempla tanto la pausa por debajo como el retorno al nivel. No es obligatorio un contacto perfecto. Describe la zona y lo que ocurre después, en vez de convertir una línea en una orden de venta.',
      'Contraejemplo: si el precio recupera 100, vuelve al interior y supera el techo del rango, ya no puedes describir ese tramo como un rechazo mantenido bajo 100. Revisar la hipótesis forma parte del análisis. La pérdida del suelo inicial, del mínimo de una pausa y del extremo del impulso son referencias diferentes.',
    ],
    question: 'El precio perdió 100 y rebotó hasta 97. ¿Falta tocar 100 para que el ejemplo sea válido? No: puede pausar por debajo; aún debes observar si continúa bajando o recupera el rango.',
    originals: ['retrocesos-despues-de-rangos'],
  },
  {
    id: 'velas', title: '4. Lee las velas dentro de su ubicación', diagram: null, pages: [66, 67],
    paragraphs: [
      'La ubicación responde dónde mirar; la vela describe qué ocurrió dentro de un intervalo. Su cuerpo compara apertura y cierre; las mechas muestran extremos fuera del cuerpo. Compara también la vela anterior y la siguiente. Una vela roja grande no recibe automáticamente el nombre de envolvente: hay que comprobar qué cuerpo abarca.',
      'La página 66 presenta siete grupos visuales sin asignar un nombre formal a cada uno. La imagen aportada reúne cuatro familias conocidas y sirve para practicar formas, pero no reemplaza ese catálogo. No inventamos una equivalencia uno a uno ni umbrales OHLC que las transcripciones no especifican.',
      'El manual sitúa estas observaciones en la segunda parte de una M, en retrocesos, en retornos a resistencias y junto a referencias 38,2 %, 50 %, 61,8 % y 76,4 %. La M inicial de distribución y una M posterior de continuación no ocupan el mismo lugar. Tampoco es necesario que todas las referencias coincidan a la vez.',
      'Ejemplo: una mecha superior cerca de una resistencia muestra que se negociaron precios por encima del cuerpo. Pregunta qué nivel se recuperó o perdió después. Contraejemplo: la misma forma en medio de un rango, sin otra referencia, no prueba una continuación. Ni la forma ni la confluencia identifican por sí solas a vendedores institucionales o garantizan el siguiente tramo.',
    ],
    question: '¿Qué puedes afirmar ante una mecha superior? Que hubo un máximo por encima del cuerpo. Quién vendió y si la caída continuará requieren información que ese dibujo no aporta.',
    originals: ['patrones-velas-vendedores', 'mapa-confluencia-vendedora'],
  },
  {
    id: 'continuaciones', title: '5. Compara las cinco continuaciones del manual', diagram: 'cinco-continuaciones', pages: [68],
    paragraphs: [
      'Cada patrón compara los extremos de una pausa posterior a un descenso. En el 1, los dos máximos están aproximadamente a la misma altura. En el 2, el segundo supera al primero. En el 3, el mínimo intermedio queda por debajo del mínimo inicial y después el segundo máximo supera al primero: hay expansión por ambos lados.',
      'En el 4, el segundo máximo es más bajo y el mínimo intermedio es más alto: las referencias se comprimen. En el 5, el segundo máximo también es más bajo, pero el mínimo intermedio es inferior al inicial. Esa diferencia impide confundir el patrón 5 del manual con un triángulo de suelo horizontal.',
      'Los nombres bandera, caja o triángulo de las imágenes aportadas describen geometrías genéricas. No conservan siempre la numeración de la página 68. Para aprender el método, usa primero el nuevo esquema fiel a sus extremos y después compara las ilustraciones originales con sus notas.',
      'Superar un máximo, volver por debajo y perder un mínimo son acontecimientos separados. Solo el primero no demuestra un engaño. Del mismo modo, una W interna puede acabar integrada en una M más amplia, pero eso no significa que toda W deba fallar. Los tramos discontinuos de la lámina nueva son escenarios posteriores, no información disponible al comienzo de la pausa.',
    ],
    question: 'Dos pausas tienen máximos descendentes. En una, el mínimo intermedio sube; en la otra, baja respecto al inicial. ¿Cuáles son? Patrones 4 y 5, respectivamente.',
    originals: ['patrones-continuacion-bajistas', 'patron-continuacion-3-detalle', 'patron-continuacion-5-detalle'],
  },
  {
    id: 'agotamiento', title: '6. Distingue agotamiento y recuperación', diagram: 'agotamiento-y-referencia', pages: [69],
    paragraphs: [
      'Una caída puede seguir marcando mínimos inferiores y, aun así, avanzar poco porque cada rebote devuelve gran parte del tramo. El manual ilustra este deterioro como un diente de sierra. Es una advertencia sobre la calidad del descenso, no una garantía de giro.',
      'La primera opción muestra recuperación desde la zona baja, superación de un máximo local y otra pausa. La segunda incorpora un mínimo más alto antes de recuperar las referencias superiores. Separa deterioro, recuperación de una referencia y retroceso posterior: no des por hechos los tres desde la primera señal de agotamiento.',
      'Si el mínimo cambia de 87 a 89, ya puedes describir un mínimo más alto. Si el máximo relevante era 94 y el precio solo llega a 93, todavía no lo ha superado. Tampoco recuperar un máximo local asegura una tendencia alcista duradera: puede haber otra resistencia cercana. Este bloque enlaza con lo aprendido sobre impulsos y retrocesos alcistas.',
    ],
    question: 'Con un mínimo más alto y el precio todavía bajo el máximo de referencia, ¿qué conclusión es prudente? La recuperación está en desarrollo; la condición de superar ese máximo sigue pendiente.',
    originals: ['agotamiento-bajista-giro'],
  },
  {
    id: 'fibonacci', title: '7. Declara los anclajes antes de usar Fibonacci', diagram: 'fibonacci-verificado', pages: [67, 72],
    paragraphs: [
      'Para medir cuánto rebota una caída entre máximo H y mínimo L, fijamos aquí 0 % en L y 100 % en H. El nivel es L + r × (H − L). Si H = 9 y L = 4, el 38,2 % ascendente queda en 5,91. Si inviertes los rótulos y pones 0 % en 9 y 100 % en 4, el 38,2 % de esa otra escala queda en 7,09. No mezcles el precio de una orientación con los rótulos de la otra.',
      'Para el tramo de 10 a 4, los niveles ascendentes son 5,416 (23,6 %), 6,292 (38,2 %), 7 (50 %), 7,708 (61,8 %) y 8,584 (76,4 %). Una resistencia en 7,5 devuelve el 58,33 % del tramo: puede estudiarse su cercanía a otra referencia, pero no llamarse coincidencia exacta con 61,8 %. Una zona aproximada exige declarar su criterio; no se inventa aquí una tolerancia operativa.',
      'La parte práctica del manual usa también una escala de proyección: 100 % en un máximo y 61,8 % en un mínimo de referencia, con niveles inferiores que prolongan el dibujo hacia abajo. Es otra pregunta. Con H = 120 y L = 112,36, su amplitud es (120 − 112,36) / 0,382 = 20; el 0 % queda en 100, el 23,6 % en 104,72 y el 38,2 % en 107,64.',
      'El 50 % de retroceso ascendente de esa caída es 116,18, mientras que el 50 % de la proyección anterior es 110. Compartir un porcentaje no significa compartir el precio. Los cálculos comprueban escalas declaradas; no prueban que un nivel detendrá el mercado ni reproducen una operación real.',
    ],
    question: 'En la práctica aportada con extremos 9 y 4, ¿por qué el nivel cercano a 5,9 no encaja con los rótulos impresos? Porque mide la recuperación desde 4; requiere 0 % abajo y 100 % arriba.',
    originals: ['ubicaciones-retrocesos-tendencia-1', 'practica-1-analisis'],
  },
  {
    id: 'casos', title: '8. Revisa el escenario cuando cambian los hechos', diagram: null, pages: [72, 73, 74],
    paragraphs: [
      'En el día complicado, el profesor comienza con un rango, revisa sus salidas y vuelve a comparar las recuperaciones con referencias previas. Estudia cada momento por separado. El gráfico completo permite ver el desenlace; no demuestra que pudiera conocerse antes de que se formaran las velas siguientes.',
      'El profesor denomina POC a una zona de congestión que marca visualmente. Esta entrega no incluye un perfil de volumen ni un cálculo que lo verifique. Usa esa zona como referencia señalada por el autor, sin afirmar que sea un máximo de volumen medido o una prueba de contratos de participantes concretos.',
      'Una recuperación puede empezar antes del soporte proyectado. El propio relato admite esa posibilidad y la decisión de no participar. Por eso no se adopta la frase absoluta de la imagen que considera falsas todas las señales alcistas fuera de una zona: una preferencia del método no obliga al precio a cumplir una trayectoria.',
      'En el segundo caso del manual aparecen una continuación 5, retrocesos 2 y, más abajo, un rango con recuperación. No es idéntico al esquema sintético rotulado “Ejercicio práctico 2” que has aportado. Se conservan ambos como recursos diferentes: el manual para leer la fuente y la ilustración para separar ruptura, retorno y reacción. No se reconstruyen entradas, costes ni beneficios sin esos datos.',
    ],
    question: '¿Qué invalida la descripción “rechazo mantenido bajo el techo”? Que el precio recupere y supere ese techo. Eso obliga a revisar esa descripción, aunque no garantice una subida duradera.',
    originals: ['practica-un-dia-complicado', 'practica-2-analisis'],
  },
] as const;

type ImageNote = { title: string; alt: string; status: 'nota' | 'revision'; note: string };
export const moduleFourImageNotes: Record<string, ImageNote> = {
  'tipos-de-tendencias-bajistas': {
    title: 'Tres estructuras ilustradas frente a cuatro tendencias del curso', status: 'revision',
    alt: 'Lámina original de tres estructuras bajistas: extremos descendentes, consolidación en bandera y zona rotulada POC.',
    note: 'El manual, pp. 58–59, distingue cuatro tendencias por la ubicación de pausas simples o complejas después de I1 e I2. Esta lámina solo muestra tres estructuras genéricas y no conserva esa correspondencia. Su referencia POC no incluye perfil de volumen: no demuestra acumulación de contratos vendedores. Usa la lámina nueva para aprender los cuatro tipos y esta como comparación.',
  },
  'tipos-de-retrocesos-bajistas': {
    title: 'Tres prototipos de recuperación dentro de una caída', status: 'nota',
    alt: 'Comparación de una pausa de una vela, una recuperación de dos velas y una recuperación más profunda en contexto bajista.',
    note: 'El retroceso es ascendente aunque la tendencia principal sea bajista. Las cantidades de velas ilustran prototipos; no son requisitos universales. Los paneles usan escalas de precio diferentes, por lo que no compares su altura visual como si midieran la misma profundidad. Algunos rótulos se superponen en el original; la lámina nueva separa los tres casos.',
  },
  'retrocesos-despues-de-rangos': {
    title: 'Retorno al suelo roto de un rango', status: 'nota',
    alt: 'Rango entre un techo naranja y un suelo azul; el precio pierde la base, vuelve a ella y dibuja otra caída.',
    note: 'El ejemplo ilustra ruptura, retorno y caída posterior. “Pullback perfecto” describe el contacto de este dibujo, no una condición obligatoria ni una garantía. La página 65 también contempla pausas por debajo del antiguo suelo. La flecha de ruptura aparece después del cruce: distingue el nivel perdido del punto al que apunta la anotación.',
  },
  'patrones-velas-vendedores': {
    title: 'Cuatro familias de velas como apoyo de lectura', status: 'revision',
    alt: 'Cuatro grupos originales de velas: estrella del atardecer, envolvente bajista, estrella fugaz y pinbar con mecha superior.',
    note: 'Estas cuatro familias no equivalen a los siete grupos sin nombre formal de la página 66. Compara cuerpos y mechas antes de asignar una etiqueta. Los rótulos “venta institucional” y “rechazo institucional” no pueden verificarse con la forma de las velas: los dibujos no identifican a quienes negociaron ni prueban que la caída continuará.',
  },
  'mapa-confluencia-vendedora': {
    title: 'Confluencia aproximada, no coincidencia exacta', status: 'revision',
    alt: 'Secuencia descendente con dos máximos cerca de una resistencia en 7,5 y niveles Fibonacci entre 4 y 10.',
    note: 'Con extremos 10 y 4, el 61,8 % ascendente es 7,708; la resistencia en 7,5 corresponde al 58,33 %, no exactamente al 61,8 %. El mínimo intermedio en torno a 5,5 todavía no prueba su propia ruptura: la pérdida debe ocurrir después. El segundo máximo no activa automáticamente un corto. “Alta probabilidad” no viene acompañada de una muestra verificable.',
  },
  'patrones-continuacion-bajistas': {
    title: 'Resumen genérico: no memorizar esta numeración como la del manual', status: 'revision',
    alt: 'Resumen original de cinco figuras genéricas rotuladas bandera, banderín, caja, cuña ascendente y triángulo descendente.',
    note: 'La numeración y los nombres no coinciden con las cinco geometrías de la página 68. Por ejemplo, el patrón 3 del manual expande ambos extremos, no es una caja; el 5 tiene un mínimo intermedio inferior, no un suelo fijo. Algunos trazos incluso retroceden sobre el eje horizontal: no representan una serie temporal ordenada. Contrasta cada extremo con el esquema nuevo.',
  },
  'patron-continuacion-3-detalle': {
    title: 'Bandera genérica frente al patrón 3 de la fuente', status: 'revision',
    alt: 'Canal ascendente tras una caída y salida inferior, mostrado como línea y como velas, rotulado patrón bajista 3.',
    note: 'La bandera genérica dibujada no es el patrón 3 del manual: allí primero se perfora el mínimo inicial y después se supera el primer máximo de la pausa. La flecha “ruptura alcista falsa” toca el borde superior, pero no demuestra claramente un cruce y recuperación posterior. El rótulo M15 no convierte los datos sintéticos en una captura de mercado.',
  },
  'patron-continuacion-5-detalle': {
    title: 'Triángulo de suelo fijo frente al patrón 5 de la fuente', status: 'revision',
    alt: 'Triángulo con soporte horizontal en 4 y máximos descendentes, acompañado por una representación de velas.',
    note: 'El suelo constante de esta ilustración difiere del mínimo intermedio inferior del patrón 5 de la página 68. En las velas, la flecha de “piso roto” señala un contacto previo; el cruce claro aparece después, en la vela roja amplia. Separa contacto y ruptura. El rótulo “venta confirmada” no es una instrucción automática de ejecución.',
  },
  'agotamiento-bajista-giro': {
    title: 'Cambio de mínimos y recuperación de referencias', status: 'nota',
    alt: 'Caída bajo un soporte, recuperación, mínimo más alto y superación posterior de una referencia horizontal superior.',
    note: 'La secuencia permite separar una pérdida temporal del soporte, un mínimo más alto y una recuperación posterior. “Para barrer stops” atribuye una intención que el gráfico no prueba. La flecha superior señala un punto al que se llegó después de cruzar la resistencia, no el instante exacto del cruce. Este ejemplo no sustituye las dos opciones de agotamiento de la página 69.',
  },
  'ubicaciones-retrocesos-tendencia-1': {
    title: 'Revisa los valores y no equipares los dos paneles', status: 'revision',
    alt: 'Estructura bajista lineal con anclajes 10 y 4 y niveles de Fibonacci, junto a velas con otra trayectoria de precios.',
    note: 'Con 0 % en 4 y 100 % en 10, el 38,2 % es 6,292 y el 61,8 % es 7,708. El vértice lineal parece quedar alrededor de 6,2, no exactamente en 6,292; el panel de velas usa otros extremos y una referencia cerca de 6,4. No son dos representaciones del mismo OHLC. La coincidencia con una zona no basta para afirmar una entrada.',
  },
  'practica-1-analisis': {
    title: 'Práctica 1: orientación de Fibonacci y forma de la vela', status: 'revision',
    alt: 'Caída de aproximadamente 9 a 4 y rebote hasta 5,9, con anclajes impresos invertidos y una vela roja señalada.',
    note: 'El gráfico coloca 0 % en 9 y 100 % en 4: con esos rótulos, 38,2 % sería 7,09. El punto 5,91 sí es el 38,2 % recuperado desde 4, pero requiere la orientación contraria. La resistencia cercana a 5,2 es otra referencia. La vela roja rodeada tiene cuerpo amplio y mecha superior corta; no ilustra claramente una estrella fugaz. “Gatillo perfecto” no acredita un resultado.',
  },
  'practica-un-dia-complicado': {
    title: 'Día complicado: una preferencia del método no obliga al precio', status: 'revision',
    alt: 'Trayectoria irregular descendente con rebotes, una referencia POC, niveles de Fibonacci y advertencias sobre compras.',
    note: 'No se adopta la regla absoluta que afirma que todas las señales alcistas fuera de la zona prevista serán falsas. El relato admite recuperaciones antes del soporte. El POC no está respaldado por un perfil de volumen; varios puntos señalados tampoco tocan esa línea. No se muestra el anclaje 0 %: no se puede verificar la zona 0–23,6 % ni afirmar que el mínimo final quede fuera de ella.',
  },
  'practica-2-analisis': {
    title: 'Práctica 2 aportada: salida de rango y retorno', status: 'nota',
    alt: 'Velas dentro de un rango entre 6 y 8, salida temporal por arriba, pérdida de 6 y rebote posterior antes de caer.',
    note: 'Es un esquema sintético diferente de la captura del segundo caso del manual, p. 74. El retorno se aproxima a 6, con cuerpos y mechas alrededor del nivel: no exige un contacto perfecto. “Para captar liquidez” atribuye una finalidad no demostrada. Como el gráfico muestra todo el desenlace, úsalo para describir acontecimientos retrospectivos, no como prueba de una señal conocida de antemano.',
  },
};

export const moduleFourExercises = [
  {
    title: 'No mezcles las numeraciones',
    prompt: 'En A hay una pausa sencilla después de I1 y un patrón de continuación 4 después de I2. En B hay una continuación compleja después de cada impulso. Escribe el tipo de tendencia de A y B; explica por qué “patrón 4” no significa “tendencia 4” y qué quedaría sin clasificar al ver solo el inicio de la primera pausa.',
    answer: 'A es tendencia 2 y B es tendencia 4. El tipo de tendencia describe dónde aparecen las pausas complejas; el número de continuación describe su forma interna. Al ver solo el inicio de la primera pausa no conoces aún cómo terminará ni qué ocurrirá después de I2. No puedes asignar de antemano una secuencia completa.',
  },
  {
    title: 'Una vela puede corregir más que tres',
    prompt: 'Dos casos parten de una caída de 120 a 100. A recupera hasta 104 en tres velas; B, hasta 112 en una. Calcula qué porcentaje de la caída devuelve cada caso. Entrega los dos porcentajes, cuál dura más y cuál es más profundo. No hay movimientos posteriores: indica qué conclusión no puedes sacar.',
    answer: 'La caída mide 20. A recupera 4/20 = 20 % y B recupera 12/20 = 60 %. A dura más velas y B es más profundo. Duración y profundidad no son intercambiables. No se sabe si alguno ha terminado: una pausa observada hasta ahora puede ampliarse. Los datos no autorizan a asumir una reanudación bajista.',
  },
  {
    title: 'Actualiza la lectura por etapas',
    prompt: 'Rango inicial 100–108. Lee una etapa a la vez: A, cae a 97; B, rebota a 105; C, vuelve a 102; D, recupera 108 y llega a 110. Para cada etapa anota un hecho y algo pendiente. No uses D para explicar lo conocido en A. Entrega cuatro observaciones y explica por qué C no es una pérdida de 97.',
    answer: 'A: perdió 100; falta la reacción posterior. B: volvió al interior hasta 105; no se mantuvo bajo el antiguo suelo. C: retrocedió a 102, aún por encima de 97; falta perder ese mínimo si esa era la condición. D: superó 108; debe revisarse la descripción de rechazo mantenido bajo ese techo. Esto no garantiza por sí solo una tendencia alcista duradera.',
  },
  {
    title: 'Comprueba el gráfico antes de aceptar su etiqueta',
    prompt: 'Usa H = 9 y L = 4. Calcula el 38,2 % de rebote con 0 % en L y 100 % en H. Invierte después los rótulos y calcula el precio del 38,2 % de esa escala. Finalmente, con H = 10 y L = 4, calcula qué porcentaje recupera un precio de 7,5. Entrega precios y orientación; explica dos errores de las láminas.',
    answer: 'Rebote ascendente: 4 + 0,382 × 5 = 5,91. Escala invertida: 9 − 0,382 × 5 = 7,09. No se puede imprimir la segunda orientación y usar el precio de la primera. Para 10→4, el punto 7,5 devuelve (7,5 − 4)/6 = 58,33 %; no coincide exactamente con 61,8 %, cuyo precio es 7,708. Aproximación y coincidencia exacta son afirmaciones diferentes.',
  },
  {
    title: 'Agotamiento con una condición todavía pendiente',
    prompt: 'Una caída deja mínimos 90, 88 y 87 y retrocesos cada vez más profundos. Después rebota a 94, cae a 89 y se recupera a 93; ahí se detiene la información. Compara los dos últimos mínimos y responde si se ha superado 94. Entrega una explicación que separe advertencia, cambio de mínimos y condición pendiente.',
    answer: '89 es mayor que 87: ya existe un mínimo más alto. Sin embargo, 93 sigue por debajo de 94. Puedes describir menor avance bajista y una recuperación en desarrollo, pero no una superación del máximo que aún no ocurrió. El agotamiento no identifica a compradores concretos ni garantiza que el próximo movimiento cruce la referencia.',
  },
  {
    title: 'Contrasta con la fuente del segundo caso',
    prompt: 'Abre el manual en la página 74 desde el enlace de fuentes del bloque 8. Localiza la resistencia inicial, el rótulo “Patrón continuación 5”, un retroceso rodeado en azul y el rango inferior. Entrega cuatro observaciones y dos datos que faltarían para reconstruir una operación. Es una captura retrospectiva, no una prueba ciega.',
    answer: 'La resistencia está en la zona alta inicial y la continuación 5 aparece tras la primera caída, bajo referencias superiores. Los círculos azules señalan pausas dentro del descenso. Abajo se forma un rango: estar dentro, salir y observar la reacción son momentos distintos. Faltan, por ejemplo, OHLC completo y reglas de ejecución/costes. Una flecha no es un registro de operaciones; no inventes precios que no sean legibles.',
  },
] as const;
