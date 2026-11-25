export type ReadingReference = { prefix: 'V' | 'S' | 'C'; from: number; to: number };
export type SellerSection = {
  id: string; title: string; objective: string; paragraphs: string[];
  diagram?: string; question: string; answer: string; refs: ReadingReference[];
};

// V: fuente principal. S: fundamentos del mismo sistema. C: comparación explícita.
// Los números identifican líneas NO vacías del original, no páginas ni minutos.
export const moduleSevenSections: SellerSection[] = [
  {
    id: 'contexto', title: '1. Primero la zona; después la vela',
    objective: 'Distinguir una observación, una hipótesis y una confirmación local.',
    paragraphs: [
      'En el módulo 4 aprendiste a reconocer una estructura bajista; en el 5, a diferenciar una vela póker de su ubicación; en el 6, a separar una zona Order Block de su visita y de una entrada. Ahora estudiarás qué sucede dentro de las velas cuando el precio llega a una zona relevante. No hace falta dibujar un Order Block en todos los casos: una resistencia o un soporte previo también forman parte del mapa.',
      'En estas transcripciones, «velas vendedoras» designa una lectura orientada a detectar una posible respuesta bajista. No significa que todas las velas estudiadas sean rojas. Una vela verde grande que termina en una resistencia es uno de los ejemplos del profesor. Su color describe la relación entre apertura y cierre; no indica por sí solo qué hará la siguiente vela.',
      'Trabaja en tres niveles. Observación: el precio llegó a una resistencia y dejó un máximo. Hipótesis: podría aparecer una respuesta vendedora. Confirmación local: una secuencia posterior rompe una referencia que habías identificado. Esa confirmación solo demuestra un cambio local de precio; no garantiza una tendencia bajista mayor ni una operación rentable.',
      'Antes de ampliar M1, sitúa el movimiento en M15 y revisa soportes y resistencias del contexto mayor. ¿Es un avance hacia resistencia, un rebote dentro de una caída, o un rango? ¿Hay un soporte inmediatamente debajo? Una M pequeña tras la ruptura alcista de una zona mayor puede ser solo un retroceso dentro de una subida. El profesor también muestra situaciones que conviene dejar pasar.',
      '«Absorción», «toma de beneficios» y «engaño» son interpretaciones del sistema. Un gráfico de precios no identifica quién compró, quién cerró cortos ni qué intención tenía. En este módulo las traducimos a hechos comprobables: perforación de un nivel, recuperación, rechazo o ruptura. No se asignan porcentajes de acierto a esas figuras.',
    ],
    question: 'Una vela verde termina cerca de una resistencia, pero todavía no hay una ruptura posterior. ¿Qué sabes y qué sigue siendo una hipótesis?',
    answer: 'Sabes que hubo un cierre por encima de la apertura y una llegada a la zona. La respuesta bajista sigue siendo una hipótesis. Ni el color ni la ubicación prueban una venta institucional o una caída futura.',
    refs: [{ prefix: 'V', from: 27, to: 53 }, { prefix: 'V', from: 331, to: 477 }],
  },
  {
    id: 'cuatro-formas', title: '2. Cuatro formas que debes reconocer',
    objective: 'Describir cuerpo y mechas sin convertir la forma en una orden.',
    paragraphs: [
      'Usaremos O = apertura, H = máximo, L = mínimo y C = cierre. El cuerpo mide |C − O|; la mecha superior, H − máx(O, C); la inferior, mín(O, C) − L. Estas medidas describen la vela terminada. No revelan todos los movimientos que ocurrieron dentro de ella.',
      'Tipo 1 del sistema: cuerpo amplio y cierre próximo al máximo, con poca mecha superior. En el ejemplo vendedor aparece después de una subida hacia una zona superior. La aparente fortaleza sirve para abrir una pregunta sobre la siguiente vela, no para vender automáticamente. La misma forma en una ruptura alcista con continuación puede expresar un escenario distinto.',
      'Tipo 2: cuerpo con una mecha superior visible. El precio alcanzó un máximo y cerró por debajo de él. Tipo 3: cuerpo pequeño en la parte inferior y mecha superior larga, descrito como martillo invertido en la transcripción. La diferencia entre ambos es de proporciones; el material no aporta un umbral numérico reproducible para clasificar todas las velas.',
      'Tipo 4: cuerpo próximo a la parte superior y mecha inferior larga, un martillo situado en una zona alta después de un avance. El profesor lo estudia como advertencia de posible giro. Pero la misma silueta después de una caída en soporte admite una hipótesis compradora. Por eso necesitas saber dónde está y qué hace el movimiento siguiente.',
      'Esta numeración pertenece al sistema de lecturas. No es la numeración de los retrocesos de módulos anteriores ni una equivalencia con las velas póker. En la introducción del texto vendedor se repite «tipo dos»; contrastamos con Sistema de lecturas, que sí enumera las cuatro formas. Las dimensiones de la lámina son ejemplos editoriales, no límites obligatorios del método.',
    ], diagram: 'cuatro-formas',
    question: 'La vela O=100, H=105, L=99, C=104,8 tiene apenas mecha superior. ¿Se parece al tipo 1? ¿Eso basta para vender?',
    answer: 'Sí: cuerpo 4,8, mecha superior 0,2 y mecha inferior 1. Se parece al tipo 1 del ejemplo, pero falta ubicarla y observar la respuesta siguiente. La forma no basta para vender.',
    refs: [{ prefix: 'V', from: 27, to: 35 }, { prefix: 'S', from: 186, to: 265 }],
  },
  {
    id: 'base-m', title: '3. Encuentra la base de la M',
    objective: 'Identificar el mínimo intermedio y diferenciar las tres variantes del sistema.',
    paragraphs: [
      'Dibuja una subida hasta el primer máximo A, una bajada hasta el valle B y un nuevo avance hasta el segundo máximo C. El nivel de B es la base o cuello de esta M. Si posteriormente el precio atraviesa B hacia abajo, tienes una ruptura local. Antes de ese acontecimiento solo hay una formación candidata.',
      'La base no es necesariamente la apertura, el cierre o el mínimo total de la vela M15. Es un extremo de la estructura menor. Puede haberse formado dentro de la vela M15 ya terminada o dentro de la siguiente que continúa activa. Lo que decide su función es su lugar entre los dos máximos, no el rectángulo temporal que lo contiene.',
      'Sistema de lecturas aclara los nombres: primera variante, máximos aproximadamente iguales; segunda variante, segundo máximo más alto; tercera variante, segundo máximo más bajo. En los ejercicios, «iguales» significa igualdad exacta para evitar tolerancias ocultas. En datos reales tendrías que definir una tolerancia antes de clasificar.',
      'Ejemplo: A=110, B=106 y C=109. El segundo máximo es menor: tercera variante. Una caída posterior a 106,2 todavía no rompe 106. Llegar a 105,8 sí lo atraviesa. En la segunda variante, alcanzar un nuevo máximo por encima de A tampoco prueba una trampa: hace falta observar qué ocurre después y si se rompe la base.',
      'Comparación limitada con Velas compradoras: una W usa como referencia de ruptura el máximo entre sus dos valles, mientras esta M usa el mínimo entre sus dos picos. Conservamos la lógica de localizar la estructura; no trasladamos automáticamente los números de variantes W ni sus reglas a la M.',
    ], diagram: 'variantes-m',
    question: 'Si A=110, B=106 y C=111, ¿qué variante estudias? El precio vuelve a 106,4: ¿ya existe ruptura bajista de la base?',
    answer: 'Es la segunda variante del sistema porque 111 supera 110. Todavía no hay ruptura de 106: 106,4 está por encima. El máximo nuevo no permite afirmar por sí solo que hubo un engaño.',
    refs: [{ prefix: 'V', from: 63, to: 132 }, { prefix: 'S', from: 325, to: 342 }, { prefix: 'C', from: 164, to: 196 }],
  },
  {
    id: 'vela-activa', title: '4. M15 da el contexto; M1 muestra el proceso',
    objective: 'Leer una vela en formación sin utilizar su cierre futuro.',
    paragraphs: [
      'La secuencia del profesor empieza con una vela M15 terminada en una zona. Después observa la siguiente mientras se forma, apoyándose en M1 o M2 para localizar la estructura menor. Distingue, por tanto, la vela de referencia cerrada y la vela siguiente activa. En esta última pueden cambiar color, cuerpo y mechas.',
      'Esta es una diferencia respecto al protocolo de vela póker cerrada del módulo 5. No cambiamos aquella regla ni la aplicamos a todos los ejemplos del módulo 7. Aquí el autor contempla una ruptura intrabar de una base local. Es una variante de lectura con requisitos propios: zona previa, referencia identificada, información disponible en ese instante y criterio de invalidación.',
      'Caso ficticio: la vela de 10:00 a 10:15 terminó. La siguiente abre a las 10:15. A las 10:18 observas 110; a las 10:20, 106; a las 10:22, 109; a las 10:23, 106,2; a las 10:24, 105,8. B=106 queda entre los dos máximos. A las 10:23 no está rota; a las 10:24 sí. El cierre M15 de las 10:30 aún no existe en ninguno de esos dos momentos.',
      'Una vela OHLC final no permite reconstruir esa secuencia exacta. Puede tener el mismo máximo, mínimo y cierre con recorridos internos diferentes. Si solo conservas M15, no atribuyas una entrada precisa en M1 ni un orden de activación de stop y objetivo dentro de esa vela. Harían falta los datos de menor escala y, según el caso, más detalle.',
      'El profesor divide M15 en tramos de cinco minutos y advierte sobre entradas tardías después de gran recorrido; también menciona esperar otra vela o un retroceso. Son filtros de su método, no evidencia de que un minuto concreto garantice mejores resultados. Anota el momento, la distancia ya recorrida y los obstáculos; si la estructura no es clara, puedes abstenerte.',
    ], diagram: 'tiempo-y-base',
    question: 'A las 10:24 tienes una ruptura local, pero M15 cerrará a las 10:30. ¿Puedes justificarla diciendo que la vela M15 terminó roja?',
    answer: 'No. Solo puedes usar su estado provisional hasta las 10:24 y la secuencia menor ya observada. El color definitivo de las 10:30 sería información futura.',
    refs: [{ prefix: 'V', from: 185, to: 247 }, { prefix: 'V', from: 593, to: 628 }, { prefix: 'V', from: 1589, to: 1608 }, { prefix: 'V', from: 1833, to: 1836 }],
  },
  {
    id: 'continuacion', title: '5. Una mecha inferior puede terminar fallando',
    objective: 'Separar un rebote, una ruptura menor y la pérdida del mínimo anterior.',
    paragraphs: [
      'Hasta aquí estudiaste una posible respuesta vendedora después de una subida. En una tendencia bajista también puede aparecer un rebote dentro de la vela: el precio cae, recupera parte del terreno y deja mecha inferior. Esa mecha registra recuperación desde un mínimo; no certifica que haya terminado toda la tendencia.',
      'El profesor estudia martillos fuera de soportes relevantes como candidatos a continuación bajista si la recuperación posterior fracasa. Su explicación mediante cierres parciales de cortos es una hipótesis sobre participantes, no un hecho que pueda deducirse de OHLC. Si el precio recupera estructura al alza, debes revisar el escenario y no conservar un sesgo bajista por obligación.',
      'En el ejemplo nuevo, una vela terminada tiene O=110, H=111, L=100 y C=104. La mecha inferior ocupa 100–104. En la secuencia posterior se forma una M con máximo 107, base 103 y segundo máximo 106. Llegar a 102,8 rompe la base local de 103, pero aún no pierde el mínimo anterior de 100.',
      'Más adelante, atravesar 100 y llegar a 99,8 sería otro acontecimiento: pérdida del mínimo anterior y recorrido de toda la zona de aquella mecha. El profesor contempla una lectura temprana de la base y otra posterior del mínimo. No son confirmaciones equivalentes: la primera todavía tiene 100 como obstáculo en su camino.',
      'Contraejemplo: si el mínimo 100 coincide con un soporte mayor, una M menor no elimina ese soporte. Un martillo en esa ubicación también admite una respuesta compradora. Tampoco llames «envolvente completa» a recuperar o perder solamente la mitad del cuerpo: especifica el nivel atravesado sin ampliar lo que demuestra.',
    ], diagram: 'mecha-y-minimo',
    question: 'La base menor está en 103 y el mínimo anterior en 100. El precio alcanza 102,8. ¿Qué referencia se rompió y cuál sigue pendiente?',
    answer: 'Se rompió 103. No se rompió 100. La lectura local puede haber cambiado, pero no se puede afirmar que ya haya continuación por debajo del mínimo anterior.',
    refs: [{ prefix: 'V', from: 1353, to: 1507 }, { prefix: 'V', from: 1691, to: 1836 }],
  },
  {
    id: 'martillo-contexto', title: '6. El mismo martillo, tres contextos',
    objective: 'Usar los contraejemplos para evitar asociaciones automáticas.',
    paragraphs: [
      'Contexto A: el precio viene subiendo y aparece un martillo de mecha inferior en una resistencia. Es el tipo 4 vendedor del sistema: alerta para estudiar una respuesta posterior. La mecha indica que hubo recuperación desde el mínimo durante esa vela; eso no impide que, después, pueda fracasar el avance. Ni la mecha ni su color confirman ese fracaso de antemano.',
      'Contexto B: el precio viene cayendo y el martillo aparece sobre un soporte mayor. La ubicación admite una hipótesis de giro comprador. El texto de Velas compradoras sirve aquí como contraste: también exige una zona y una respuesta siguiente, no comprar cualquier martillo.',
      'Contexto C: el precio cae, aparece un martillo lejos de los soportes identificados y la recuperación siguiente no prospera. Se estudia una posible continuación bajista. «Lejos de soporte» no garantiza que no pueda girar; solo describe el mapa que has elaborado. Si no puedes localizar una estructura menor clara, abstenerte es una respuesta válida.',
      'El caso más delicado combina el martillo superior con un soporte cercano bajo su mínimo: vender contra ese nivel puede dejar poco recorrido. El profesor vuelve a revisar rangos antiguos, salida de zona y retesteo. Por eso amplía el contexto antes de concluir: que un nivel ya no aparezca al hacer zoom no significa que haya desaparecido del mercado.',
      'Si un rebote recupera una resistencia que sostenía tu hipótesis bajista, actualiza la lectura. Un giro local puede convertirse en un cambio mayor, seguir lateral o fracasar. La descripción «giro rápido» no implica que siempre exista una M completa; no dibujes un segundo máximo que los datos no muestran.',
    ],
    question: '¿Por qué el martillo superior junto a resistencia y el martillo inferior sobre soporte no se interpretan igual, aunque sus proporciones coincidan?',
    answer: 'La silueta es la misma, pero el recorrido anterior y los niveles son distintos. Uno se estudia como alerta tras un avance y el otro como posible reacción tras una caída. Ambos necesitan respuesta posterior; ninguno determina el resultado.',
    refs: [{ prefix: 'V', from: 1912, to: 2188 }, { prefix: 'V', from: 1748, to: 1776 }, { prefix: 'C', from: 55, to: 129 }],
  },
  {
    id: 'rangos', title: '7. Cuando no hay M: lee el rango',
    objective: 'Diferenciar oscilaciones laterales, salida de zona y un POC medido.',
    paragraphs: [
      'Varias oscilaciones pequeñas alrededor de un nivel no forman necesariamente una M limpia. En los ejemplos laterales, el profesor delimita el conjunto de velas y espera una salida, un retorno y una nueva oscilación. El marco cambia: ahora el borde del rango puede importar más que la base de una M diminuta dentro de él.',
      'Fija los límites con un criterio explícito. El material usa en algunos dibujos cierres para delimitar zonas; las mechas siguen existiendo aunque no entren en ese rectángulo. No alternes cierres y extremos para que una salida parezca correcta después de verla. Registra qué escala y qué intervalo temporal estás utilizando.',
      'Ejemplo: rango [100;106]. Una caída a 99,5 sale por debajo; un retorno a 100 pone a prueba el borde inferior. Solo una respuesta posterior permite describir rechazo o recuperación. Si el precio vuelve a 103, ha reingresado al rango: no lo sigas llamando retesteo externo. Si hay soporte en 99, una ruptura interna puede dejar muy poco espacio.',
      'Aclaración editorial: el texto aproxima el POC al centro de algunas zonas. El centro geométrico de [100;106] es 103. Un POC de volumen es el nivel con mayor volumen negociado del perfil seleccionado; no se obtiene promediando techo y suelo. Sin volumen por precio no puedes calcularlo. Los perfiles basados en tiempo son otra convención y tampoco se deducen de ese promedio.',
      'La lámina compara el rango con un perfil ficticio: volúmenes 10, 80, 30 y 20 en niveles 100, 102, 104 y 106. El POC es 102; el punto medio sigue siendo 103. Esta diferencia corrige el vocabulario sin inventar datos para los gráficos originales del profesor. Un POC tampoco garantiza soporte, resistencia o continuidad.',
    ], diagram: 'rango-y-poc',
    question: '¿Puedes llamar POC al punto 103 de un rango 100–106 si solo tienes el gráfico de precios? ¿Qué dato adicional hace falta?',
    answer: 'No puedes afirmar que sea el POC de volumen. Es el punto medio. Necesitas un perfil de volumen por precio para el período seleccionado y localizar su máximo.',
    refs: [{ prefix: 'V', from: 780, to: 961 }, { prefix: 'V', from: 962, to: 1092 }, { prefix: 'V', from: 2190, to: 2304 }],
  },
  {
    id: 'integracion', title: '8. De la lectura al registro de una hipótesis',
    objective: 'Redactar un escenario comprobable, incluida la opción de no participar.',
    paragraphs: [
      'Escribe la lectura en este orden: contexto mayor → zona → vela M15 terminada → estructura menor observada → referencia de ruptura → obstáculos → invalidación. Añade la hora de cada acontecimiento. Así evitas justificar una decisión con una vela que todavía no había terminado o con un máximo que solo descubriste después.',
      'Ejemplo de registro: «A las 10:23 tengo M15 de referencia cerrada y una tercera variante local con A=110, B=106 y C=109. El último precio es 106,2: todavía no hay ruptura. Vigilo 106; si el avance recupera y supera C, esta lectura concreta de máximo menor deja de describir la secuencia. El soporte cercano también debe revisarse antes de estudiar una entrada».',
      'No importes automáticamente un stop de un tick, un recorrido 1:1 o una entrada de otro módulo. La transcripción señala muchos niveles con «aquí», pero esta entrega no incluye las diapositivas para reconstruirlos exactamente. Un ejemplo matemático puede enseñar a medir riesgo; no sustituye esas reglas ausentes ni certifica una ejecución.',
      'Para un corto hipotético con entrada 105, stop 108 y destino 101, la distancia al stop es 3 y el recorrido previsto es 4: 4/3 ≈ 1,33R antes de costes. Si un soporte obliga a reconsiderar el destino en 104,5, el recorrido queda en 0,5, aproximadamente 0,17R. La forma de la vela no compensa esa reducción. Estos precios son editoriales, no una recomendación.',
      'Una lectura útil termina con una decisión justificable: seguir observando, descartar o preparar una simulación con reglas completas. Para evaluar una estrategia hacen falta registros de casos favorables y fallidos, costes y criterios definidos antes de observar el resultado. Las expresiones «muy probable» de las transcripciones no aportan esa muestra.',
    ],
    question: '¿Qué dato escribirías para demostrar que la base se rompió antes de tu decisión, y qué harías si el único gráfico disponible fuera el OHLC final M15?',
    answer: 'Registraría la hora y el precio del acontecimiento observado en la escala menor, junto con la base ya identificada. Con solo OHLC final M15 no afirmaría una activación intrabar concreta: marcaría esa secuencia como no verificable.',
    refs: [{ prefix: 'V', from: 1178, to: 1279 }, { prefix: 'V', from: 1589, to: 1608 }, { prefix: 'V', from: 2011, to: 2188 }],
  },
];

export const moduleSevenExercises = [
  {
    title: 'Mide antes de interpretar',
    data: 'Vela terminada: O=100, H=105, L=99, C=104,8. Está junto a una resistencia. No se aporta todavía ningún movimiento posterior.',
    steps: 'Calcula cuerpo y ambas mechas. Identifica la forma que más se parece al ejemplo. Escribe qué confirmación sigue faltando.',
    deliverable: 'Tres medidas, una clasificación provisional y una frase sobre lo que todavía no sabes.',
    answer: 'Cuerpo=4,8; mecha superior=0,2; mecha inferior=1. Se parece al tipo 1 del sistema. Estar en resistencia no prueba una venta ni una M; falta observar la estructura posterior. No hay un umbral universal de proporciones en los textos.',
  },
  {
    title: 'Tres M, una misma base',
    data: 'En tres secuencias, el primer máximo A es 110 y el valle intermedio B es 106. Los segundos máximos C son, respectivamente, 110, 111 y 109. Después de cada C el precio solo ha bajado hasta 106,2.',
    steps: 'Clasifica cada variante según Sistema de lecturas. Marca B. Comprueba si el precio ya ha pasado por debajo de B.',
    deliverable: 'Una tabla con tres variantes, su base y el estado de la ruptura.',
    answer: 'C=110: primera variante; C=111: segunda; C=109: tercera. La base es 106 en las tres. Ninguna ha roto 106 con la información aportada: 106,2 sigue por encima. No etiquetes la variante 2 como trampa confirmada por el solo hecho de superar 110.',
  },
  {
    title: 'Lee solo hasta la hora de decisión',
    data: 'M15 anterior cerró a las 10:15. Observaciones posteriores: 10:18→110; 10:20→106; 10:22→109; 10:23→106,2; 10:24→105,8. La vela M15 activa cerrará a las 10:30.',
    steps: 'Haz primero el análisis con datos hasta 10:23. Luego añade la observación 10:24. Indica qué cambió y qué dato sigue siendo futuro.',
    deliverable: 'Dos estados fechados de la misma estructura y un dato que no debes usar.',
    answer: '10:23: tercera variante candidata, base 106 aún no rota. 10:24: 105,8 atraviesa 106 y registra la ruptura local. El cierre y el color definitivo M15 de las 10:30 siguen siendo futuros; no justifican una decisión de las 10:24.',
  },
  {
    title: '¿De qué vela es la base?',
    data: 'Caso A: máximo 110 a las 10:11, valle 106 a las 10:14, segundo máximo 109 a las 10:18. Caso B: máximo 110 a las 10:14, valle 106 a las 10:17, segundo máximo 109 a las 10:20. Los intervalos M15 son [10:00,10:15) y [10:15,10:30).',
    steps: 'Ubica el valle de cada caso dentro de su intervalo M15. Comprueba si cambia el precio de la base o su función entre los máximos.',
    deliverable: 'Intervalo de la base para cada caso y explicación de por qué no debes reemplazarla por el cierre M15.',
    answer: 'Caso A: la base 106 está en la vela anterior; caso B: está en la vela siguiente. En ambos es el valle entre los máximos y conserva la función de referencia local. El cierre M15 no tiene por qué coincidir con ese valle. Los datos aún no incluyen su ruptura.',
  },
  {
    title: 'Dos rupturas que no debes confundir',
    data: 'Vela anterior: O=110, H=111, L=100, C=104. Después: máximo 107, base 103 y segundo máximo 106. Primero observas 102,8 y más tarde 99,8.',
    steps: 'Delimita la mecha inferior. Analiza por separado el acontecimiento en 102,8 y el de 99,8.',
    deliverable: 'Zona de la mecha y dos frases que indiquen exactamente qué nivel se rompió en cada momento.',
    answer: 'La mecha inferior es 100–104. En 102,8 se rompe 103, pero no 100. En 99,8 ya se ha atravesado 100, el mínimo anterior. La segunda observación no podía darse por conocida cuando solo habías visto 102,8.',
  },
  {
    title: 'Un martillo no decide por ti',
    data: 'Misma vela O=104, H=105, L=99, C=104,5. Caso A: aparece tras una subida, junto a resistencia. Caso B: tras una caída, sobre soporte. Caso C: tras una caída, lejos de los soportes identificados. En ningún caso se conoce la vela siguiente.',
    steps: 'Describe la forma común. Propón una hipótesis para cada contexto sin afirmar un resultado. Indica qué falta observar.',
    deliverable: 'Tres hipótesis condicionales y una razón para no emitir una orden automática.',
    answer: 'Cuerpo pequeño arriba y mecha inferior larga. A: alerta tipo 4 de posible giro tras el avance; B: posible reacción compradora; C: posible rebote fallido y continuación bajista. También pueden ocurrir otros desenlaces. Falta respuesta posterior y estructura; no hay certeza de quién operó ni de la dirección futura.',
  },
  {
    title: 'Calcula el centro y el POC por separado',
    data: 'Rango de precio: [100;106]. Perfil ficticio del mismo intervalo: 100→10 contratos; 102→80; 104→30; 106→20. Se dispone de estos cuatro niveles agregados.',
    steps: 'Calcula el punto medio del rango. Localiza el nivel de máximo volumen. Explica qué podrías decir si borráramos la tabla de volúmenes.',
    deliverable: 'Dos precios y una limitación de datos.',
    answer: 'Punto medio=(100+106)/2=103. POC de este perfil=102, donde hay 80 contratos. Sin la tabla solo puedes calcular el centro; no el POC de volumen. Ni el centro ni el POC demuestran que el precio vaya a girar.',
  },
  {
    title: 'Salida, retesteo o regreso al rango',
    data: 'Rango [100;106]. Secuencia A: sale a 99,5, retorna a 100, forma máximo local en 99,9 después de bajar a 99,6 y luego llega a 99,4. Secuencia B: sale a 99,5 y retorna a 103. Hay un soporte previo en 99.',
    steps: 'Describe el retorno de cada caso. En A, identifica la referencia local atravesada. Señala el obstáculo que ambas lecturas deben conservar.',
    deliverable: 'Comparación de dos casos sin llamarlos automáticamente ventas rentables.',
    answer: 'A vuelve al borde, deja un máximo menor y atraviesa el mínimo local 99,6 al alcanzar 99,4: respuesta bajista local tras el retorno. B reingresa al rango hasta 103; no es un retesteo externo confirmado. El soporte 99 continúa debajo en ambos mapas y limita el espacio disponible.',
  },
  {
    title: 'Comprueba el espacio antes de simular',
    data: 'Corto hipotético: entrada 105, stop 108, destino 101. Presupuesto de riesgo 30 unidades monetarias; cada punto por unidad de posición vale 1. Sin comisiones, spread, saltos ni deslizamiento. Alternativa: aparece un soporte que lleva a revisar el destino a 104,5.',
    steps: 'Calcula riesgo por unidad, recorrido, relación en R y cantidad entera para riesgo 30. Recalcula el recorrido y R para el destino alternativo.',
    deliverable: 'Cinco cálculos y una limitación de la simulación.',
    answer: 'Riesgo por unidad=108−105=3. Recorrido=105−101=4. Relación=4/3≈1,33R. Cantidad=30/3=10 unidades. Con destino 104,5: recorrido=0,5 y relación=0,5/3≈0,17R. No es un umbral de aceptación del profesor ni riesgo garantizado; faltan costes y condiciones reales de ejecución.',
  },
];
