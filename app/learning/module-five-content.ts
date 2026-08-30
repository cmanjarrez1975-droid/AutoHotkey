/** Adaptación de las entregas 008, 009 y 011; 010 duplica 009.
 * Teoría vendedora complementada con manual pp. 100–107, no recibida como transcripción.
 * Ejemplos educativos, sin órdenes, calificaciones ni escrituras de progreso.
 */
export const moduleFiveSections = [
  {
    id: 'anatomia', title: '1. Describe la vela antes de interpretarla', diagram: 'anatomia-medida', pages: [78, 80, 81, 100, 101],
    paragraphs: [
      'En los módulos anteriores estudiaste impulsos y retrocesos. Ahora acercamos la mirada a la vela que aparece dentro de ellos. Póker es el nombre que utiliza el profesor para determinadas velas de cuerpo amplio y cierre cerca del extremo favorable al movimiento. La metáfora de ir con todo no significa arriesgar todo el capital ni identifica a quienes negociaron.',
      'Para una vela cerrada, O es apertura, H máximo, L mínimo y C cierre. El cuerpo mide |C − O| y el rango H − L. La compradora cierra cerca del máximo; la vendedora, cerca del mínimo. El ejemplo nuevo tiene cuerpo 3,25, rango 4 y una pequeña mecha de 0,25 al lado del cierre. Cuerpo y rango no son la misma medida.',
      'Compara con las velas anteriores y después ubica la señal. La fuente admite mechas pequeñas y no fija un porcentaje universal para llamar amplio al cuerpo. Una vela verde grande en una resistencia no equivale a otra después del segundo test de un soporte. Una vela en formación todavía puede cambiar su cuerpo y sus mechas antes de cerrar.',
    ],
    question: '¿Un cuerpo amplio demuestra fuerte volumen o participación institucional? No. Puedes describir apertura, cierre y extremos; el volumen necesita sus datos y la identidad de participantes no se deduce de esa forma.',
    originals: ['anatomia-velas-poker'],
  },
  {
    id: 'secuencia', title: '2. Separa frenada, test, reacción y ruptura', diagram: 'secuencia-w-m', pages: [83, 85, 86, 103, 106],
    paragraphs: [
      'En el esquema comprador primero se frena una caída, aparece un rebote y luego un segundo test de la zona inferior. El profesor interpreta ciertas respuestas como absorción. Después puede aparecer una vela de recompra y, más adelante, otra de empuje que rompe la referencia. No son acontecimientos simultáneos ni tienen que ser velas consecutivas.',
      'En una W, la referencia superior es el máximo entre sus dos valles. Si está en 6 y la reacción llega a 5, todavía no se rompió 6. El tramo hacia 7 de la lámina nueva está discontinuo porque es un escenario posterior. No dibujes el futuro como si ya estuviera disponible al observar la reacción.',
      'Para ventas, el manual complementa la teoría que falta en transcripción: subida, frenada, nuevo test, reventa y posible ruptura inferior. En una M, el nivel de confirmación es el mínimo entre las dos cimas. Una reventa que termina en 6 no ha roto una referencia en 5. La función de empuje se identifica por el acontecimiento de ruptura, no solo por el color rojo.',
      'Las barras de volumen de los originales son ilustrativas. Menor volumen no significa ausencia de ventas o compras, y mayor volumen no identifica instituciones. La fuente puede describir un proceso de acumulación o distribución, pero el esquema por sí solo no verifica esa atribución.',
    ],
    question: 'Una W tiene su máximo intermedio en 106; tras el segundo test, una vela compradora cierra en 104. ¿Qué existe y qué falta? Existe una reacción local; aún falta superar 106 para hablar de esa ruptura.',
    originals: ['frenada-absorcion-recompensa-ideal', 'proceso-acumulacion-poker', 'proceso-distribucion-poker'],
  },
  {
    id: 'ubicacion', title: '3. La misma forma puede tener otro contexto', diagram: 'contexto-y-obstaculo', pages: [86, 89, 105, 107],
    paragraphs: [
      'Antes de considerar una candidata, identifica qué movimiento está corrigiendo el precio, la estructura que se formó y el obstáculo próximo. La segunda parte de una W o M no significa segundo impulso principal. Son dos formas distintas de contar: una describe el test interno y la otra la secuencia completa del movimiento.',
      'El profesor evita anticipar el giro desde el primer tramo de la estructura y estudia reacciones posteriores, retrocesos y rupturas. Eso no equivale a prohibir todo el primer impulso: una recompra puede aparecer antes de romper la W y un empuje durante su salida. Los rótulos del mapa aportado requieren esta aclaración.',
      'En el ejemplo nuevo las dos velas son idénticas, pero una tiene resistencia en 108 y otra en 104,25. En la segunda, el obstáculo está mucho más cerca del cierre 103,75. Puede excluirse por ubicación sin afirmar que va a caer. Si después rompe esa resistencia, el resultado no cambia la información que había al decidir.',
    ],
    question: '¿Precio caro o barato significa que conocemos el valor económico del activo? No. En estos mapas describe una ubicación relativa a niveles del gráfico, no una valoración ni una garantía de giro.',
    originals: ['mapa-velas-poker-alcistas', 'mapa-velas-poker-bajistas'],
  },
  {
    id: 'debilidad', title: '4. Una advertencia todavía no es un giro', diagram: null, pages: [82, 87, 102],
    paragraphs: [
      'Una mecha superior extensa en una vela compradora indica que el cierre quedó por debajo del máximo. Puede justificar esperar una respuesta más clara dentro del método. No demuestra pérdida total de demanda ni un giro inminente. El siguiente acontecimiento sigue abierto.',
      'La imagen aportada elige como continuación una vela bajista. El manual también contempla otra posibilidad: una nueva vela compradora que cubre la mecha anterior y termina cerca del máximo. Son desarrollos diferentes. No enseñamos solo el que favorece una explicación retrospectiva.',
      'Para el lado vendedor, una mecha inferior grande también exige cautela: el cierre quedó lejos del mínimo. Una vela posterior podría retomar la caída, pero antes debe observarse. En ambos sentidos, una advertencia, una reacción y la recuperación o pérdida de un nivel son momentos separados.',
    ],
    question: '¿Qué dirías ante una mecha superior larga sin más datos? El cierre quedó lejos del máximo; falta observar qué sucede después. “Giro confirmado” añade un acontecimiento que aún no se conoce.',
    originals: ['debilidad-demanda'],
  },
  {
    id: 'activacion', title: '5. Una candidata puede activarse o caducar', diagram: 'vigencia-candidata', pages: [91],
    paragraphs: [
      'La regla de estudio del profesor sitúa la entrada un tick por encima del máximo comprador o por debajo del mínimo vendedor, y la referencia de stop uno o dos ticks más allá del extremo contrario. El tick es el incremento mínimo de precio del instrumento; no es un día. El manual permite corregir ese error de la transcripción.',
      'Primero cierra la vela y se evalúan forma y ubicación. Después se observa únicamente la vela siguiente para el cruce planteado. Con máximo 104 y tick 0,25, el nivel comprador es 104,25. Si la siguiente vela solo alcanza 104 y termina, la candidata caduca. Llegar a 106 varias velas después no la reactiva.',
      'Si el nivel se cruza dentro de la vigencia, el modelo registra activación. Eso no acredita una ejecución real al precio dibujado. La cancelación se aplica a lo que sigue pendiente, no cierra automáticamente una posición ya activada. Esta página no envía órdenes ni transforma esos ejemplos en un sistema de trading.',
    ],
    question: '¿Una candidata caducada que más tarde habría ganado cuenta como acierto? No. Conserva su estado de caducada; una nueva candidata necesita una evaluación nueva con los datos disponibles entonces.',
    originals: ['operando-velas-poker-alcistas'],
  },
  {
    id: 'medicion', title: '6. Distingue rango, riesgo y recorrido', diagram: 'rango-y-riesgo', pages: [91, 92],
    paragraphs: [
      'La fuente utiliza amplitud de vela y objetivo 1:1. No son expresiones intercambiables cuando hay márgenes o diferentes stops. En el ejemplo declarado, H = 104, L = 100 y tick = 0,25: comprar teóricamente en 104,25 con stop en 99,75 da una distancia de riesgo de 4,50, aunque el rango sea 4.',
      'Medir un rango completo desde la entrada lleva a 108,25. Medir una distancia de 1R lleva a 108,75. Para la venta equivalente, entrada 99,75 y stop 104,25, los niveles son 95,75 y 95,25. Son cálculos ficticios sin costes ni deslizamiento, no precios de ejecución garantizados.',
      'La p. 92 también muestra un stop de estructura, más lejano que el de la vela. Cambiarlo cambia la distancia de riesgo; no lo amplíes retrospectivamente para salvar un ejemplo. Si se agregan posiciones, su exposición se suma a la existente. Los esquemas no aportan una regla completa de gestión para automatizar estas decisiones.',
      'Fibonacci tampoco tiene significado sin anclajes: la p. 92 distingue proyección desde W y retroceso de un impulso ya formado. Con 100 % en 100 y 61,8 % en 103,82, la proyección del 50 % está en 105. El retroceso del 50 % de un impulso real 100→108 está en 104. Un mismo porcentaje no implica un mismo precio.',
    ],
    question: '¿Por qué 108,25 no es 1R en el ejemplo comprador? El recorrido es 4, pero la distancia al stop es 4,50. Los márgenes de entrada y stop explican la diferencia.',
    originals: ['regla-recorrido-1-1'],
  },
  {
    id: 'tiempo', title: '7. No uses un cierre futuro ni inventes el orden intrabar', diagram: 'orden-intrabar', pages: [84, 111],
    paragraphs: [
      'La fuente relaciona un marco mayor con otro menor, por ejemplo M15 y M3. Una vela M15 de 10:00 a 10:15 no tiene disponible su cierre final a las 10:09. Usarlo para justificar una observación M3 anterior sería utilizar información futura. Aquí se estudian candidatas con velas cerradas.',
      'Los cuatro datos OHLC tampoco explican toda la trayectoria. Con apertura 102, máximo 105, mínimo 99 y cierre 103 son posibles tanto un recorrido que visita primero 105 como otro que visita primero 99. La nueva lámina compara ambos sin afirmar que alguno fue el real.',
      'Con entrada teórica en 104,25 y stop en 99,75, esa diferencia cambia si el mínimo ocurrió antes o después de activar. No asignes un resultado comprobado cuando no conoces la secuencia. Necesitarías datos intrabar o una convención de simulación expresamente declarada, además de registros de ejecución para afirmar una operación real.',
    ],
    question: 'Si una barra contiene tanto la entrada como el stop, ¿demuestra una pérdida? No necesariamente. Falta conocer el orden de visita y las condiciones de ejecución; el rango por sí solo no lo resuelve.',
    originals: [],
  },
  {
    id: 'casos', title: '8. Contrasta las dos prácticas con sus números', diagram: null, pages: [94, 95, 96, 97, 110, 111],
    paragraphs: [
      'Las dos prácticas aportadas son ilustraciones completas de un desenlace, no datos para una simulación ciega. Primero localiza soporte o resistencia, luego la reacción, la candidata y la vela posterior. Por último compara los niveles dibujados. No llames 1:1 a cualquier objetivo alcanzado.',
      'En la práctica alcista, las líneas se leen aproximadamente como entrada 3,4, stop 1,9 y objetivo 4,7. El recorrido de 1,3 dividido entre el riesgo de 1,5 da 0,87R. En la bajista, entrada 3,1, stop 4,7 y objetivo 1,7 dan 1,4 / 1,6 = 0,875R. Se explican como lecturas aproximadas de los ejes, no como una reconstrucción exacta de órdenes.',
      'En el relato original también hay candidatas que no activan y una vela vendedora tardía que no completa el recorrido esperado. Conservar esos contraejemplos evita confundir una selección de dibujos favorables con estadísticas. Los casos del manual son material de lectura; no prueban rentabilidad, frecuencias de oportunidad ni probabilidades universales.',
    ],
    question: '¿Alcanzar la línea de objetivo convierte su etiqueta 1:1 en correcta? No. Primero calcula distancia de entrada a stop y de entrada a objetivo. El resultado del dibujo no corrige su proporción.',
    originals: ['practica-1-alcista', 'practica-1-bajista'],
  },
] as const;

type ImageNote = { title: string; alt: string; status: 'nota' | 'revision'; note: string };
export const moduleFiveImageNotes: Record<string, ImageNote> = {
  'anatomia-velas-poker': {
    title: 'Anatomía compradora y vendedora', status: 'revision',
    alt: 'Dos velas amplias, verde y roja, con etiquetas de cuerpo y mechas opuestas; el título conserva el antiguo módulo 4.',
    note: 'Aquí corresponde al módulo 5. La forma muestra cuerpo amplio y cierre próximo a un extremo, pero no demuestra control absoluto, volumen elevado ni venta profesional. Las mechas pequeñas dibujadas existen: poca mecha no siempre significa ninguna. La fuente no define umbrales numéricos de amplitud.',
  },
  'frenada-absorcion-recompensa-ideal': {
    title: 'Frenada, test y recompra: reconstruir la secuencia', status: 'revision',
    alt: 'Caída hacia un soporte azul, velas pequeñas de test, una vela verde de recompra y otra verde de empuje posterior.',
    note: 'El título dice recompensa; en esta secuencia el término es recompra. Segundo test de una W no significa segundo impulso principal. La vela de recompra no confirma por sí sola la ruptura de la línea superior: debe marcarse y observarse ese nivel. No se acredita la máxima probabilidad ni el volumen de parada porque aquí no se aportan estadísticas ni barras de volumen.',
  },
  'proceso-acumulacion-poker': {
    title: 'Acumulación ilustrada y límites del volumen', status: 'revision',
    alt: 'Secuencia de frenada y tests cerca de un soporte, seguida de velas compradoras; debajo aparecen barras esquemáticas de volumen.',
    note: 'Las barras permiten comparar el volumen ilustrado, no verificar actividad real ni entrada institucional. Un test con volumen reducido no significa sin ventas. La lámina llama confirmado al giro antes de distinguir reacción y ruptura; usa el esquema nuevo para separar esos eventos. La referencia que se rompe debe identificarse, no deducirse únicamente del tamaño de la vela.',
  },
  'proceso-distribucion-poker': {
    title: 'Distribución: distinguir reventa y empuje', status: 'revision',
    alt: 'Rango de velas entre un techo naranja y un soporte azul; una vela roja rompe el soporte y se ilustra un aumento de volumen.',
    note: 'Un techo horizontal no es automáticamente un POC: falta el perfil de volumen para calcularlo. La etiqueta reventa/empuje agrupa funciones diferentes; la vela que cruza el soporte puede describirse como empuje por ese acontecimiento. El volumen mostrado es esquemático y no identifica a los participantes ni demuestra una inyección profesional.',
  },
  'mapa-velas-poker-alcistas': {
    title: 'Mapa comprador: primer tramo frente a primer impulso', status: 'revision',
    alt: 'Línea alcista con marcas de recompra, ruptura y precaución en máximos; un primer tramo aparece tachado en rojo.',
    note: 'No se adopta la prohibición de operar todo el primer impulso. La transcripción diferencia el primer intento de giro, el segundo test de una W y el impulso que sale de ella. El mínimo marcado tras la primera subida tampoco demuestra que sea un retroceso del segundo impulso. Caro y sobrecomprado son rótulos del dibujo, no una valoración o indicador calculado. La precaución no obliga a un giro.',
  },
  'mapa-velas-poker-bajistas': {
    title: 'Mapa vendedor: ubicación y referencia inferior', status: 'revision',
    alt: 'Línea descendente con ruptura, rebote de reventa y advertencia de no iniciar otra venta cerca de un soporte inferior.',
    note: 'La línea ayuda a separar ruptura y retorno, pero no contiene cuerpos ni mechas para verificar una vela póker. Tampoco demuestra freno institucional. Las referencias de entrada y stop son reglas de estudio, no órdenes de esta página; la fuente contempla uno o dos ticks de margen para el stop. La cercanía al soporte justifica cautela, sin garantizar un rebote.',
  },
  'debilidad-demanda': {
    title: 'Debilidad: una posibilidad, no un giro inminente', status: 'revision',
    alt: 'Velas alcistas con mechas superiores, seguidas de una vela roja y barras de volumen; el título afirma un giro inminente.',
    note: 'No se adopta el giro inminente ni la pérdida total de fuerza. La fuente también muestra una vela compradora posterior que cubre una mecha y retoma el avance; esta imagen elige otro desenlace. Un volumen menor no significa sin compradores. Cautela ante la mecha y confirmación de una ruptura son momentos distintos.',
  },
  'operando-velas-poker-alcistas': {
    title: 'Entrada pendiente, stop y objetivo ilustrativo', status: 'revision',
    alt: 'Vela verde con líneas horizontales de entrada, stop y objetivo, y flechas para comparar riesgo y recorrido.',
    note: 'La caducidad se aplica si la vela siguiente no activa la orden pendiente; no equivale a cerrar una posición ya activada. El dibujo no aporta una estadística profesional que avale el recorrido ni un beneficio mínimo garantizado. Declara tick, extremos, márgenes y unidad de medición antes de llamar 1:1 al objetivo. Activación y ejecución real son cosas diferentes.',
  },
  'regla-recorrido-1-1': {
    title: 'Amplitud de una vela frente a distancia de riesgo', status: 'revision',
    alt: 'Vela compradora entre stop y entrada, con una proyección vertical de la amplitud rotulada H hacia el objetivo.',
    note: 'La H de esta imagen significa amplitud, mientras que en OHLC H significa máximo. Aquí escribimos rango = máximo − mínimo para evitar la confusión. Con entrada un tick sobre el máximo y stop un tick bajo el mínimo, el riesgo es rango + 2 ticks. Proyectar solo el rango desde la entrada no da exactamente 1R ni demuestra un objetivo mínimo probable.',
  },
  'practica-1-alcista': {
    title: 'Práctica compradora: revisar el supuesto 1:1', status: 'revision',
    alt: 'Retroceso hacia soporte, vela compradora y continuación; líneas aproximadas en entrada 3,4, stop 1,9 y objetivo 4,7.',
    note: 'Con las líneas aproximadas de los ejes, entrada 3,4, stop 1,9 y objetivo 4,7 dan riesgo 1,5 y recorrido 1,3: aproximadamente 0,87R, no 1R. Un objetivo de 1R con esos niveles estaría en 4,9. La imagen es un esquema completo, no un registro de ejecuciones ni una prueba de efectividad. No se infiere un tick exacto de sus distancias.',
  },
  'practica-1-bajista': {
    title: 'Práctica vendedora: proporción y mecha visible', status: 'revision',
    alt: 'Rebote a resistencia, vela roja y continuación descendente; entrada aproximada 3,1, stop 4,7 y objetivo 1,7.',
    note: 'Con entrada 3,1, stop 4,7 y objetivo 1,7 se obtiene 1,4 / 1,6 = 0,875R, no 1R; el objetivo de 1R estaría en 1,5. Son lecturas aproximadas del esquema. Se ve una pequeña mecha inferior aunque el rótulo diga sin mecha. La resistencia tampoco acredita un POC sin perfil de volumen. Alcanzar un nivel dibujado no demuestra una operación real.',
  },
};

export const moduleFiveExercises = [
  {
    "title": "Describir sin adivinar",
    "data": "O = 100,50; H = 104; L = 100; C = 103,75. Los cuerpos de las tres velas anteriores miden 1, 1,25 y 0,75.",
    "steps": "calcula cuerpo, rango y ambas mechas; compara los cuerpos; indica qué información falta para aceptar una candidata.",
    "deliverable": "cuatro medidas y dos frases: una observación verificable y una limitación.",
    "answer": "Cuerpo 3,25; rango 4; mecha superior 0,25; inferior 0,50. El cuerpo es mayor que los tres anteriores y cierra cerca del máximo. Falta ubicación y secuencia previa: no basta para aceptar la candidata ni demuestra participantes institucionales."
  },
  {
    "title": "La ubicación cambia la lectura",
    "data": "dos velas tienen la anatomía del ejercicio 1. A aparece después del segundo test de un soporte; la resistencia siguiente está a seis unidades de su cierre. B aparece tras cinco velas ascendentes; la resistencia siguiente está a media unidad. Se dispone únicamente de lo sucedido hasta ese cierre.",
    "steps": "compara la ubicación; explica cuál investigarías dentro del método y qué todavía no sabes.",
    "deliverable": "una decisión razonada para A y otra para B. No inventes la vela siguiente.",
    "answer": "A merece una evaluación por su relación con el segundo test y la distancia al obstáculo, pero aún necesita comprobar el resto de condiciones y la activación posterior. B se excluye o se deja en observación dentro del método por extensión y resistencia próxima. No puede afirmarse que A subirá ni que B caerá."
  },
  {
    "title": "Una candidata que caduca",
    "data": "máximo de la candidata = 104; tick = 0,25. La siguiente vela tiene máximo 104 y termina sin alcanzar 104,25. Dos velas después, el máximo llega a 106. No se ha evaluado ninguna candidata nueva.",
    "steps": "identifica nivel de entrada, estado al cierre siguiente y tratamiento del avance posterior.",
    "deliverable": "una secuencia de tres estados. Indica si hubo una operación activada en el modelo.",
    "answer": "Candidata → pendiente en 104,25 → caducada al cierre siguiente. No hubo activación de esa candidata. El máximo posterior de 106 no la reactiva ni la convierte retrospectivamente en ganadora."
  },
  {
    "title": "No confundir 1R con una vela",
    "data": "H = 104; L = 100; tick = 0,25. Usa un tick para entrada y stop, sin costes. Estudia compra y venta por separado.",
    "steps": "calcula entrada, stop, distancia de riesgo y objetivos desde la entrada para un rango completo y para 1R.",
    "deliverable": "tabla de dos filas. Explica por qué no coinciden los dos objetivos.",
    "answer": "Compra: entrada 104,25; stop 99,75; riesgo 4,50; un rango desde entrada 108,25; una distancia de 1R 108,75. Venta: entrada 99,75; stop 104,25; riesgo 4,50; un rango desde entrada 95,75; una distancia de 1R 95,25. Los dos márgenes suman 0,50 al rango de 4. Son precios teóricos por unidad, sin costes ni ejecución garantizada."
  },
  {
    "title": "Los anclajes importan",
    "data": "escala proyectada con 100 % en precio 100 y 61,8 % en 103,82. Después se observa un impulso real completo desde 100 hasta 108.",
    "steps": "calcula el 50 % de la primera escala y el retroceso del 50 % del impulso real; identifica qué información exige cada cálculo.",
    "deliverable": "dos precios, sus anclajes y una advertencia sobre el uso retrospectivo del máximo.",
    "answer": "La escala completa proyectada mide 3,82 / 0,382 = 10: el 50 % queda en 105. El retroceso de un impulso 100→108 queda en 108 − 0,50 × 8 = 104. El primer cálculo depende de la estructura elegida; el segundo necesita conocer el extremo 108. Ese extremo no puede anticiparse en una decisión anterior a su formación."
  },
  {
    "title": "El cierre que aún no existía",
    "data": "una vela M15 va de 10:00 a 10:15 y al final cierra como candidata compradora. Un alumno justifica una señal M3 de las 10:09 usando ese cierre final.",
    "steps": "detecta el dato futuro y señala cuándo estaría disponible en el modelo de velas cerradas.",
    "deliverable": "explicación temporal y corrección del registro. No debes decidir si aquella operación habría ganado.",
    "answer": "A las 10:09 el cierre M15 de las 10:15 todavía no existe. En el modelo descrito solo puede utilizarse una vez terminada la vela y disponibles sus datos. Corrige la justificación o registra que la observación anterior era provisional bajo otro modelo; no la valides usando el futuro."
  },
  {
    "title": "La misma barra toca entrada y stop",
    "data": "candidata compradora con entrada teórica 104,25 y stop 99,75. La siguiente barra tiene O = 102; H = 105; L = 99; C = 103. Solo dispones de OHLC, sin trayectoria intrabar.",
    "steps": "plantea dos órdenes temporales compatibles: primero máximo y luego mínimo; primero mínimo y luego máximo. Indica si puedes demostrar que el stop se tocó después de activar.",
    "deliverable": "dos secuencias y una conclusión sobre la incertidumbre. No asignes una ganancia o pérdida comprobada.",
    "answer": "Ruta A: 102→105→99→103; la entrada teórica se cruza antes de pasar por el stop. Ruta B: 102→99→105→103; el mínimo ocurre antes de activar y después del máximo la ruta puede terminar en 103 sin volver a 99,75. Ambos recorridos tienen el mismo OHLC. Sin datos adicionales o una convención de simulación declarada, no se conoce cuál ocurrió. Una ejecución real exigiría además sus propios registros."
  },
  {
    "title": "Integrar reventa y empuje",
    "data": "el precio sube a 110, cae a 105 y vuelve a 109. Aparece una vela bajista que cierra en 106. Una vela posterior cierra en 103. No se aportan volumen ni identidad de participantes.",
    "steps": "localiza la línea inferior de la M; distingue la reacción tras el segundo test de la ruptura posterior; escribe una afirmación que los datos no permiten.",
    "deliverable": "nivel, dos acontecimientos separados y un límite de interpretación. No propongas una orden real.",
    "answer": "La referencia inferior está en 105. El cierre de 106 puede describirse como reacción vendedora tras el segundo test; aún no rompe 105. El cierre posterior de 103 sí queda debajo. El manual permite estudiar reventa y empuje en ese orden, pero el primer movimiento no contiene por adelantado el segundo. No se puede demostrar absorción institucional ni volumen alto con esos datos."
  }
] as const;
