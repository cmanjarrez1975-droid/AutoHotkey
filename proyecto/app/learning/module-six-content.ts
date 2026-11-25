/** Fuentes principales: transcripciones 012, 013 y 014.
 * Las imágenes aportadas se conservan sin modificar. Sus ampliaciones de método
 * se identifican en notas; los ejemplos numéricos son editoriales y ficticios.
 * Lectura y práctica sin órdenes, calificaciones ni escrituras de progreso.
 */
export const moduleSixSections = [
  {
    id: 'origen', title: '1. Entiende qué representa la zona', diagram: 'cuerpo-y-mechas', source: '012 · Formación y delimitación, líneas 1–163.',
    paragraphs: [
      'En Velas póker estudiaste la forma, la ubicación y la activación de una candidata. Ahora añadimos el mapa de referencias que quedan en su recorrido. El profesor llama Order Block a una zona de origen vinculada con una frenada, una respuesta que interpreta como absorción y un empuje posterior. En estas clases la utiliza especialmente para estudiar posibles destinos y salidas.',
      'Observación e interpretación son cosas distintas: el precio dejó de prolongar la caída y después avanzó es una descripción; aquí quedan órdenes de un banco añade información que las velas no muestran. Un Order Block dibujado tampoco es el libro de órdenes u order book. Este último contiene ofertas de compra y venta; un rectángulo de precios no proporciona esa profundidad.',
      'La fuente pone el énfasis en el cuerpo de la última vela antes del empuje, pero algunos límites dependen de dibujos ausentes. Para trabajar sin adivinar, los ejercicios declaran su convención: zona = intervalo entre apertura y cierre de la vela de origen elegida. No es una definición universal. O significa apertura, H máximo, L mínimo y C cierre.',
      'Con O = 104, H = 105, L = 99 y C = 101, el cuerpo ocupa [101;104]; el mínimo de la vela sigue siendo 99. En el caso vendedor O = 108 y C = 110 delimitan [108;110], aunque la mecha alcance 112. Fijar los límites antes de estudiar el retorno evita ampliarlos después para convertir un fallo en acierto.',
    ],
    question: '¿Una vela roja puede ser el origen de un bloque comprador? En esta convención sí: el nombre comprador describe el empuje posterior, no el color de la vela anterior. La vela aislada todavía no acredita toda la formación.',
    originals: ['ob-1-anatomia-comparativa'],
  },
  {
    id: 'formacion', title: '2. Registra cuándo se conoce y cuándo se visita', diagram: 'visita-persistente', source: '012 · Contexto y visita, líneas 165–317 y 695–789. Estados y horas: complemento editorial.',
    paragraphs: [
      'La hora del origen y la hora de identificación no son iguales. Una vela M15 puede terminar a las 10:15 y la respuesta utilizada para reconocer el bloque terminar a las 10:30. En un ejercicio basado en cierres, no se puede justificar una decisión de las 10:12 usando esa respuesta futura. El dibujo retrospectivo no demuestra que la zona ya se conociera.',
      'Usaremos cuatro estados de estudio: candidata mientras falta la respuesta; identificada cuando se observa la secuencia elegida y se fijan sus límites; sin visita posterior registrada cuando, después de salir, no hay contacto en los datos revisados; y visitada cuando un acontecimiento posterior toca o entra en la zona. Son etiquetas editoriales para ordenar la lectura, no un detector automático.',
      'La lámina compara barras posteriores a la salida de [101;104]. A tiene mínimo 104,50: no toca. B baja hasta 103,50: visita, aunque cierre en 105,50. C queda por encima: el bloque sigue visitado. La fuente deja de considerarlo destino pendiente después del toque; no lo reactives porque el precio se aleje. Una formación nueva tendrá otra identidad y otra hora.',
      'Las imágenes añaden BOS, CHoCH y FVG. En sus rótulos significan ruptura de estructura, cambio de carácter e intervalo denominado Fair Value Gap. No constituyen tres requisitos obligatorios acreditados por las transcripciones recibidas. Antes de adoptar otra metodología habría que declarar sus reglas y comprobar cada figura; no se mezclan silenciosamente con el hilo de estas clases.',
    ],
    question: '¿Se cuenta la vela de origen como una visita posterior a sí misma? No. Primero se identifica la formación y su salida; después se registra un retorno. Tampoco una zona visitada demuestra una orden propia ejecutada.',
    originals: ['ob-2-criterios-validacion'],
  },
  {
    id: 'contacto', title: '3. Comprueba el contacto antes de llamarlo mitigación', diagram: 'retorno-y-contacto', source: '012 · Retorno, utilidad y destinos, líneas 165–381. Contraste geométrico de las imágenes aportadas.',
    paragraphs: [
      'Retorno significa que el precio vuelve hacia una referencia; contacto significa que llega a ella. La palabra mitigación aparece en los nuevos dibujos como una explicación del retorno. Aquí solo damos por comprobable la visita geométrica: no podemos certificar cuántas órdenes pendientes se ejecutaron ni si se agotaron las órdenes de terceros.',
      'En la imagen del flujo estructural, el bloque originario está dibujado aproximadamente entre 2,50 y 4. El primer retroceso termina en 5: no lo visita. La nueva comparación conserva los límites y enfrenta ese caso con otro que sí baja hasta 3,50. No basta una flecha que diga compra ideal para corregir la separación entre la curva y el rectángulo.',
      'En datos continuos y completos, la intersección del rango de una barra posterior con la zona puede usarse como criterio declarado de visita. Si solo tienes cierres a ambos lados o pudo haber un salto sin negociación dentro, no puedes inventar el contacto. Para demostrar ejecución también hacen falta registros de órdenes; una visita por sí sola no basta.',
      'La lámina de operativa propone órdenes en la apertura o en el 50 % del bloque. Es una variante aportada, no una instrucción automática extraída de las transcripciones: el profesor pide contexto y advierte contra comprar simplemente porque el precio llega a un rectángulo. El punto medio tampoco garantiza una mejor operación; cambia el precio propuesto y puede no alcanzarse.',
    ],
    question: 'Un bloque ocupa [2,50;4] y el mínimo del retroceso es 5. ¿Se visitó? No: falta un punto para llegar al borde superior. Si después aparece otra zona, no debes mover la anterior para hacer coincidir el dibujo.',
    originals: ['ob-4-flujo-estructura', 'ob-3-operativa-mitigacion'],
  },
  {
    id: 'contexto', title: '4. Une estructura, bloque y vela póker en ese orden', diagram: 'reaccion-y-ruptura', source: '012 · Contexto y ventas tardías, líneas 383–475; 013 · Tests y M3, líneas 361–689; 014 · Dientes de sierra, líneas 251–347.',
    paragraphs: [
      'Empieza por tendencia o rango, soportes, resistencias y marco mayor. Después identifica la estructura local y su referencia. La vela póker puede aportar una reacción o un empuje en ese contexto, pero su cuerpo amplio no sustituye los pasos anteriores. La existencia de un bloque pendiente tampoco equivale a una señal de entrada.',
      'Una W local tiene dos valles separados por un máximo. En la nueva lámina, los valles están en 1 y 2 y la referencia intermedia en 2,50. Una reacción hasta 2,40 deja un mínimo más alto pero no rompe 2,50. Una reacción observada hasta 2,80 sí supera esa referencia, aunque todavía no el máximo anterior 3,20. Indica siempre qué estructura estás describiendo.',
      'En ventas se invierte la pregunta: un máximo más bajo no demuestra por sí solo la pérdida del mínimo intermedio. Los mapas comprador y vendedor aportados ayudan a ubicar zona, reacción y posible salida, pero su recorrido completo ya muestra un desenlace elegido. Estudia por etapas y detente antes del tramo futuro; no uses ese desenlace para justificar la decisión anterior.',
      'Dientes de sierra describe en el relato una sucesión de tests y mínimos. No convierte tres mínimos decrecientes en una condición obligatoria ni demuestra un engaño institucional. En el gráfico aportado la W verde empieza en el último mínimo y tiene su propia referencia 2,50: romperla no es lo mismo que romper todos los máximos de la caída previa.',
    ],
    question: 'Si aparece una vela póker en soporte y hay un bloque por encima, ¿ya está justificada la compra? No. Falta comprobar la estructura, la referencia de activación del caso, los obstáculos y el riesgo. También es válido abstenerse.',
    originals: ['m4-poker-ob-dientes-sierra', 'm4-confluencia-poker-ob-alcista', 'm4-confluencia-poker-ob-bajista'],
  },
  {
    id: 'destinos', title: '5. Ordena los destinos sin prometer el recorrido', diagram: null, source: '012 · Destinos sucesivos, líneas 319–381, 477–533 y 695–789; 014 · Salida H1, líneas 295–435.',
    paragraphs: [
      'Tras un cambio comprador observado, el profesor consulta bloques vendedores que quedaron en la secuencia anterior por encima del precio. Son referencias para estudiar una posible salida, no una obligación del mercado. En sentido vendedor se puede invertir la lectura. El nombre del bloque describe su formación; no ordena comprar o vender en cada visita.',
      'Desde 103, imagina A [108;110] y B [114;115], ambas identificadas y sin visita. A es la primera en dirección ascendente. Una resistencia en 107,50 está antes de A y también cuenta. Si C [105;106] ya fue visitada, no recupera el estado pendiente por estar cerca del precio actual. El mapa conserva los acontecimientos anteriores.',
      'Desde abajo, el primer borde de A es 108; desde arriba es 110. Borde próximo, punto medio y extremo lejano dan recorridos distintos. Debes declarar cuál estudias. Tocar 108 no equivale a llegar a 110; visitar A no activa automáticamente otra operación hacia B. Vuelve a revisar contexto y riesgo.',
      'Imán es una metáfora de expectativa utilizada por el autor, no una fuerza medida ni una probabilidad. El precio puede no volver o no llegar al objetivo. Un análisis serio conserva ese desenlace y una ventana de observación definida; no prolonga el caso hasta encontrar un acierto retrospectivo.',
    ],
    question: 'Si una zona objetivo ocupa [108;110], ¿puedes marcar objetivo cumplido en 108 cuando el plan decía salida en 110? No. Se visitó la zona, pero son dos acontecimientos distintos. La elección del borde debe hacerse antes.',
    originals: [],
  },
  {
    id: 'tiempo', title: '6. Separa contexto, ejecución y datos disponibles', diagram: 'tiempo-disponible', source: '013 · D1/H1/M15/M3; 014 · D1/H1/M15 y entrada, líneas 1–347.',
    paragraphs: [
      'La aplicación 013 recorre diario → H1 → M15 → M3 y relata ejecución en M3. La 014 consulta diario, H1 y M15, relata entrada en M15 y salida con referencias H1. No son una receta idéntica: el marco amplio sitúa el escenario y el menor ayuda a describir el acontecimiento local.',
      'Una decisión M3 a las 11:36 no dispone del cierre definitivo de la H1 que termina a las 12:00. Puedes describir su estado provisional o usar velas anteriores cerradas, pero no presentar el resultado de las 12:00 como confirmado a las 11:36. El gráfico completo de una sesión oculta fácilmente esta diferencia.',
      'En la transcripción 014 el profesor pide esperar al cierre y después relata que entró un poquito antes. Conservamos esa discrepancia: sin video ni registros no puede certificarse una ejecución exacta después de la confirmación. La imagen con nombre usdjpy-real es un esquema de niveles 1–5, sin fecha ni precios de mercado verificables; ilustra el relato, pero no rellena esa falta.',
      'En su panel H1, la zona superior abarca aproximadamente 4–5. En M15 el objetivo se dibuja en 5: es el borde lejano, no el primer contacto en 4. La flecha de ruptura de contratendencia apunta a un mínimo anterior al cruce visible. Una etiqueta no adelanta el acontecimiento; el cruce debe situarse donde la trayectoria atraviesa la referencia.',
    ],
    question: '¿Dos paneles H1 y M15 de aspecto parecido prueban la sincronización del caso? No. Se necesitan instrumento, fechas, zona horaria y datos de ambas escalas. El esquema no permite verificar esa correspondencia.',
    originals: ['m4-poker-ob-usdjpy-real'],
  },
  {
    id: 'riesgo', title: '7. Mide el riesgo; no busques un stop infalible', diagram: 'stop-y-cantidad', source: '013 · Comparación de stops, líneas 691–747; 014 · Fibonacci y salida, líneas 349–435. Cálculos: complemento editorial.',
    paragraphs: [
      'Un stop cercano a la vela póker y otro más allá del extremo de la estructura responden a distancias de invalidación distintas. Alejarlo manteniendo la misma cantidad aumenta la pérdida teórica. Llamarlo conservador o seguro no corrige ese aumento. El apalancamiento tampoco sustituye el cálculo del riesgo monetario.',
      'Ejemplo ficticio lineal: entrada 103, destino 108 y valor por punto y unidad igual a 1. Stop 101: distancia 2 y recorrido 5, es decir 2,5R. Stop 99: distancia 4 y el mismo recorrido 5, es decir 1,25R. Para presupuestar 20 sin costes, las cantidades enteras máximas serían 10 y 5. Conservar 10 unidades en el segundo caso daría riesgo teórico 40.',
      'La fuente 013 y la imagen de stops seguros mencionan 10–15 % más de probabilidad al ampliar el stop. No se aporta una muestra que lo demuestre. Ninguna ubicación es inmune a activación, saltos o ejecución desfavorable. Estas cuentas no son una fórmula lista para forex o derivados sin valor por punto, conversión, tamaño contractual y costes.',
      'Fibonacci también exige declarar los anclajes. Con 0 % = 100 y 100 % = 110, el 38,2 % es 103,82. Con la escala invertida es 106,18. Sin anclajes no se verifica una confluencia exacta. Una coincidencia geométrica no demuestra independencia estadística ni permite sumar probabilidades.',
    ],
    question: '¿Qué demuestra pasar de 10 a 5 unidades al duplicar la distancia al stop? En el ejemplo sin costes conserva el riesgo teórico 20. No demuestra un mayor porcentaje de aciertos ni garantiza una pérdida real máxima.',
    originals: ['m4-poker-ob-stops-seguros'],
  },
  {
    id: 'casos', title: '8. Lee los tres relatos sin completar datos ausentes', diagram: null, source: '012 · Práctica, líneas 535–963; 013 · Aplicación M3; 014 · Aplicación USD/JPY.',
    paragraphs: [
      'Caso A — teoría aplicada a USD/JPY, fuente 012. El profesor trabaja en M15, identifica zonas anteriores, explica una W con un pequeño engaño y estudia bloques vendedores como destinos. La enseñanza es el orden: formación conocida, contexto, cambio local observado, mapa de destinos y visita registrada. No es comprar todos los toques.',
      'Caso B — aplicación con ejecución M3, fuente 013. El relato combina un contexto diario mixto con H1, M15 y detalle M3. Distingue aceptar una compra local de mantenerla hasta una referencia lejana. No asignamos un instrumento o fecha que no estén identificados de forma inequívoca. Sus comentarios macroeconómicos históricos no se convierten en reglas actuales.',
      'Caso C — USD/JPY, fuente 014. Parte de un rango diario, describe tests, un mínimo inferior seguido de otro más alto, una vela póker en M15 y salida en bloques H1. Conservar el relato no equivale a certificar sus órdenes. La preferencia por una salida cercana y los límites personales se explican sin recomendar operar con cansancio o estrés.',
      'Para evaluar cualquiera de los casos faltan las capturas originales del mercado, fechas, precios, registros y reglas reproducibles. Las nueve imágenes recibidas son material esquemático adicional; no prueban esas ejecuciones. Una pérdida puede aportar aprendizaje y seguir siendo una pérdida monetaria. Separa decisión, aprendizaje y resultado, incluyendo costes y casos fallidos.',
    ],
    question: '¿Qué escribirías en tu revisión si solo tienes el relato? “El autor describe esta entrada y salida; no puedo verificar precios ni ejecución”. Después enumera los datos pendientes, en lugar de inventar una operación completa.',
    originals: [],
  },
] as const;

type ImageNote = { title: string; alt: string; status: 'nota' | 'revision'; note: string };
export const moduleSixImageNotes: Record<string, ImageNote> = {
  'ob-1-anatomia-comparativa': {
    title: 'Anatomía compradora y vendedora', status: 'revision',
    alt: 'Dos grupos de tres velas con zonas sobre el cuerpo de la vela contraria anterior al desplazamiento y líneas rotuladas BOS.',
    note: 'Los rectángulos ocupan los cuerpos: aproximadamente [4,50;6] y [8;9,50], no las mechas. Eso ayuda a comparar geometrías. Las líneas BOS coinciden con extremos de las velas de origen, pero no se muestra suficiente estructura anterior para verificar el máximo o mínimo estructural elegido. El desplazamiento y el color no prueban órdenes institucionales ni alta probabilidad.',
  },
  'ob-2-criterios-validacion': {
    title: 'Criterios adicionales: no confundir metodologías', status: 'revision',
    alt: 'Cuatro velas con un barrido inferior, rectángulo de origen, un área FVG superpuesta a una vela y línea horizontal de ruptura.',
    note: 'Barrido, FVG y BOS aparecen como pilares de esta imagen, pero las tres transcripciones no los establecen conjuntamente como requisitos universales del módulo. El área FVG requiere un criterio geométrico y las velas concretas que la delimitan; el rótulo parcialmente tapado no lo verifica. Conservamos la referencia sin enseñar esa área como validada. Una perforación visible no prueba stops ajenos ejecutados ni identidad institucional.',
  },
  'ob-3-operativa-mitigacion': {
    title: 'Retorno y propuestas de entrada en el bloque', status: 'revision',
    alt: 'Zona de cuerpo entre 4,50 y 6, entrada sugerida en 6 o punto medio 5,25, stop aproximado 3,70 y objetivo 11, con retorno y rebote.',
    note: 'El retorno sí entra en el rectángulo, pero no acredita mitigación de órdenes pendientes. Las entradas en apertura o 50 % son una variante de la imagen, no una orden automática enseñada por el profesor. “Mayor probabilidad” no está cuantificada. El objetivo está en 11 y el máximo de la última vela visible ronda 10: no se muestra el objetivo alcanzado. Diferencia contacto, orden propuesta, ejecución y resultado.',
  },
  'ob-4-flujo-estructura': {
    title: 'Flujo de estructura: revisa dónde hay contacto', status: 'revision',
    alt: 'Curva que pasa de mínimos decrecientes a crecientes con bloque originario de 2,50 a 4, primer retroceso a 5 y bloque posterior entre 5 y 7.',
    note: 'La primera flecha de mitigación señala un mínimo 5 por encima del bloque originario [2,50;4]: no hay visita a ese bloque. El siguiente retorno a 7 sí llega al borde del segundo rectángulo [5;7], si esos límites se declaran. Una curva sin OHLC no permite reconstruir los cuerpos de origen. Los nombres CHoCH y BOS describen referencias del dibujo, no acreditan flujo de órdenes institucional ni una compra ideal.',
  },
  'm4-poker-ob-dientes-sierra': {
    title: 'Dientes de sierra y W local', status: 'revision',
    alt: 'Tres mínimos decrecientes en 2, 1,50 y 1; después una W verde con máximo intermedio 2,50, mínimo más alto 2 y vela compradora.',
    note: 'La W verde se entiende desde el mínimo 1, rebote 2,50 y segundo valle 2. La referencia 2,50 es local, distinta de máximos anteriores como 3,20. El relato no exige siempre tres dientes ni confirma un patrón armónico por llevar 3-drive en el título. “Engaño absoluto” y “último mínimo institucional” no son datos verificables. La vela póker aislada tampoco garantiza el final del retroceso.',
  },
  'm4-confluencia-poker-ob-alcista': {
    title: 'Bloque y póker: lectura compradora', status: 'revision',
    alt: 'Zona inferior azul, perforación de mínimos y mínimo más alto, vela verde de póker, dos stops alternativos y zona objetivo superior naranja.',
    note: 'El mínimo más alto es una observación local, no una ruptura completa por sí sola. La zona inferior requiere identificar su vela de origen: la curva no demuestra sus límites. La entrada y varios textos se superponen; la línea no permite medir un tick real. Los dos stops deben compararse con cantidad ajustada, no como seguro frente a inseguro. El bloque opuesto es un destino posible y no un imán garantizado; la secuencia no demuestra barrido institucional ni alta probabilidad.',
  },
  'm4-confluencia-poker-ob-bajista': {
    title: 'Bloque y póker: lectura vendedora', status: 'revision',
    alt: 'Zona superior naranja, perforación de máximos y máximo más bajo, vela roja de póker, dos stops y zona objetivo inferior azul.',
    note: 'Un máximo más bajo no sustituye la observación de la ruptura del mínimo intermedio. La vela roja y la zona superior no identifican a quienes vendieron. Hay rótulos superpuestos en el título y la entrada; no los leas como precios ejecutables. Ampliar el stop por encima del extremo de la estructura requiere recalcular exposición. El objetivo inferior es hipotético; los nombres de archivo m4 pertenecen al material recibido y aquí se integran en el módulo 6.',
  },
  'm4-poker-ob-stops-seguros': {
    title: 'Dos ubicaciones de stop, sin garantía de seguridad', status: 'revision',
    alt: 'Vela compradora tras una perforación de soporte, entrada por encima, stop próximo rojo y otro verde por debajo del mínimo de la sacudida.',
    note: 'No existe un stop seguro ni puede saberse que nadie lo colocaría en ese nivel. El incremento del 10–15 % de acierto repite una afirmación de la fuente 013 sin muestra que la respalde. Mantener cantidad y ampliar el stop aumenta el riesgo teórico; bajar apalancamiento por sí solo no define ese riesgo. El gráfico no prueba stops minoristas ejecutados. La lámina nueva compara cantidades y distancias sin prometer resultados.',
  },
  'm4-poker-ob-usdjpy-real': {
    title: 'USD/JPY: esquema H1 y M15, no registro de ejecución', status: 'revision',
    alt: 'Dos paneles esquemáticos: H1 con zona inferior azul y superior roja, y M15 con línea de contratendencia, vela póker, entrada, stop y objetivo.',
    note: 'Aunque el archivo diga real, sus ejes 1–5 no aportan precios, fechas ni OHLC verificables de USD/JPY. La flecha de ruptura apunta al mínimo previo, no al cruce posterior. El TP de M15 en 5 es el borde lejano de la zona H1 [4;5], no el primer toque. No se puede verificar el 38,2 % sin anclajes. El stop bajo el apoyo local no es infalible ni equivale al mínimo de toda la caída. La sincronización de ambos marcos necesita datos originales.',
  },
};

export const moduleSixExercises = [
  {
    "title": "Delimitar y esperar",
    "data": "vela de origen O = 104, H = 105, L = 99, C = 101. Convención: cuerpo completo. El empuje elegido para reconocer la formación solo termina en la vela siguiente.",
    "steps": "delimita la zona, distingue su mínimo del mínimo de la vela e indica si ya estaba confirmada al terminar la vela de origen.",
    "deliverable": "intervalo, dos mínimos y una justificación temporal.",
    "answer": "Zona [101; 104]. Su borde inferior es 101; el mínimo de la vela es 99. Al cierre de la vela de origen todavía falta observar el empuje requerido: no se puede retrotraer la confirmación de la siguiente vela."
  },
  {
    "title": "La visita no se borra",
    "data": "zona ya identificada [101; 104], precio alejado por encima. Sin huecos en la observación, tres barras posteriores tienen rangos A [104,50; 107], B [103,50; 106], C [105; 108]. B cierra en 105,50. Convención: tocar cualquier parte de la zona cuenta como visita.",
    "steps": "indica la primera visita, explica por qué el cierre de B no la elimina y asigna el estado después de C.",
    "deliverable": "primer acontecimiento y estado final. No evalúes ganancias.",
    "answer": "A no toca; B sí, porque su mínimo 103,50 entra en [101; 104]. Cerrar por encima no borra la visita. Después de C sigue visitada: el estado se basa en el acontecimiento registrado, no en la distancia actual del precio."
  },
  {
    "title": "Falta información",
    "data": "zona [108; 110]. Solo se conservan dos cierres: 107 y 111. No hay máximos, mínimos ni secuencia negociada; pudo existir un salto.",
    "steps": "decide si puede demostrarse un toque, una entrada o una orden ejecutada.",
    "deliverable": "tres conclusiones y el dato necesario para resolver la visita.",
    "answer": "No se puede demostrar visita, entrada ni ejecución propia. Cierres a ambos lados no prueban precios negociados dentro del intervalo. Se necesitan datos de la trayectoria y su continuidad para la visita; una ejecución requiere además los registros de la orden correspondiente."
  },
  {
    "title": "Ordenar no es adivinar",
    "data": "escenario comprador hipotético desde 103. A [108; 110] no visitada, B [114; 115] no visitada y C [105; 106] ya visitada. Hay resistencia en 107,50. No se informa una nueva señal de entrada.",
    "steps": "identifica el primer bloque pendiente en dirección ascendente y el obstáculo previo; explica si basta para comprar.",
    "deliverable": "bloque, obstáculo y decisión justificada con la información disponible.",
    "answer": "A es el primer bloque pendiente ascendente. La resistencia 107,50 está antes de su borde 108; C no vuelve a ser pendiente. El mapa no basta para comprar: no se ha aportado una señal nueva ni un plan de riesgo. El obstáculo tampoco garantiza que el precio vaya a girar allí."
  },
  {
    "title": "Dos stops, mismo destino",
    "data": "instrumento ficticio lineal, valor monetario de una unidad de precio por unidad de posición = 1. Compra 103, objetivo 108, stop A = 101 o B = 99. Presupuesto de pérdida teórica 20; unidades enteras; sin comisiones ni deslizamiento.",
    "steps": "calcula distancia de riesgo, relación recorrido/riesgo y cantidad máxima para cada stop. Explica qué no demuestra esa comparación.",
    "deliverable": "tabla de dos filas. No mantengas la misma cantidad después de ampliar el stop.",
    "answer": "Stop 101: riesgo por unidad 2, recorrido 5, relación 2,5R y 10 unidades para riesgo total 20. Stop 99: riesgo por unidad 4, recorrido 5, relación 1,25R y 5 unidades para riesgo total 20. Conservar 10 unidades elevaría el riesgo teórico a 40. La cantidad es 20 dividido entre distancia al stop, redondeada hacia abajo. No demuestra mayor acierto ni limita pérdidas reales con saltos, costes o deslizamiento; no aplicar directamente a forex o derivados sin valor por punto y conversión."
  },
  {
    "title": "Una hora que no ha terminado",
    "data": "una H1 abre a las 11:00 y termina a las 12:00. Una decisión M3 ocurre a las 11:36. El alumno justifica la decisión con el cierre H1 de las 12:00, que fue comprador.",
    "steps": "identifica el dato futuro y corrige la justificación sin inventar otra señal.",
    "deliverable": "dos frases sobre qué podía saberse a las 11:36.",
    "answer": "A las 11:36 todavía no existe el cierre H1 de las 12:00. Puede analizarse la información conocida hasta las 11:36 y el estado provisional de la H1, pero no justificar la decisión usando su resultado final como si ya estuviera cerrado."
  },
  {
    "title": "Declarar anclajes",
    "data": "escala 0 % = 100 y 100 % = 110. Zona [103,70; 104]. Después inviertes la escala: 0 % = 110 y 100 % = 100.",
    "steps": "calcula 38,2 % en ambas orientaciones e indica en cuál cae dentro de la zona. Explica si eso demuestra rentabilidad.",
    "deliverable": "dos precios, una comparación y un límite de la conclusión.",
    "answer": "Primera escala: 100 + 0,382 × 10 = 103,82, dentro de [103,70; 104]. Escala invertida: 110 − 0,382 × 10 = 106,18, fuera. La coincidencia depende de anclajes declarados; no valida una señal ni demuestra rentabilidad."
  },
  {
    "title": "No completar la captura con imaginación",
    "data": "un relato dice «entré un poquito antes» y «salí en el bloque H1», sin precios, fecha ni registros. Otro comentario dice que ampliar el stop añade 10–15 % de probabilidad de acierto.",
    "steps": "distingue lo que el autor relata de lo que puedes verificar; enumera qué haría falta para repetir y evaluar el caso.",
    "deliverable": "dos afirmaciones que no puedes certificar y al menos tres datos faltantes.",
    "answer": "No se certifica una entrada exacta después de la confirmación, ni el incremento de probabilidad alegado. Faltan, entre otros: instrumento y fecha/huso horario, capturas o datos originales, hora de disponibilidad de cada referencia, precios y registros de órdenes, reglas de selección, muestra completa y resultados con costes. Un caso relatado no sustituye esas comprobaciones."
  }
] as const;
