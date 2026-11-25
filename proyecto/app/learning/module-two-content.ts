/** Editorial integration of newly received module 2. Independent of graded lesson IDs. */
export const moduleTwoSections = [
  {
    id: 'tendencias', title: '1. Reconoce dónde aparece la pausa', diagram: 'tres-tendencias', pages: [11, 12, 21, 22],
    paragraphs: [
      'Una tendencia alcista no avanza sin interrupciones. El profesor distingue tres secuencias según el lugar de las pausas: en la tendencia 1 hay retrocesos sencillos; en la 2 aparece una consolidación después del segundo impulso; en la 3 aparece después del primero. Son ejemplos del método, no una obligación de completar tres impulsos.',
      'En la lámina, I1 e I2 indican los finales de los dos primeros impulsos. Las pequeñas oscilaciones de una consolidación pertenecen a la pausa: no las cuentes automáticamente como nuevos impulsos principales. Mantén la misma escala de análisis.',
      'Una vela roja no demuestra un giro bajista. Tampoco haber llegado después de la primera subida significa que hayas perdido dinero. Anticipar consiste en preparar escenarios y esperar sus condiciones, no en entrar antes de tiempo.',
    ],
    question: '¿La consolidación está después de I1 o de I2? ¿Qué referencia conserva la pausa?',
    originals: ['tendencias-alcistas-estructura', 'tendencia-alcista-1-detalle', 'tendencia-alcista-3-detalle'],
  },
  {
    id: 'continuacion', title: '2. Compara los cinco patrones', diagram: 'cinco-patrones', pages: [13, 14, 15, 16, 17, 18],
    paragraphs: [
      'Patrón 1: la pausa deja un mínimo final más alto, con máximos internos descendentes. Patrón 2: se perfora el mínimo local anterior y se estudia su recuperación. La perforación sola no confirma el patrón; una mecha tampoco demuestra quién está comprando.',
      'Patrón 3: bandera con máximos y mínimos descendentes. Patrón 4: variante de bandera cuyo último mínimo queda por encima del anterior y no alcanza el borde inferior del canal. No confundas un máximo más bajo con un mínimo más alto: debes señalar el extremo correcto.',
      'Patrón 5: en el esquema original aparecen mínimos ascendentes y un nuevo máximo, seguidos de otro retroceso marcado. No se reduce a una regla de triángulo ascendente con máximos iguales. Su contexto se estudia en el siguiente bloque.',
      'Una figura parecida a una M puede ser parte de una pausa alcista. No basta con su silueta para justificar una venta. Marca por separado el máximo interno, el máximo exterior y la directriz: romper uno no equivale necesariamente a recuperar los demás.',
    ],
    question: '¿El último mínimo es más alto, más bajo o atraviesa el anterior? ¿Qué máximo falta recuperar?',
    originals: ['patrones-continuacion-resumen', 'patron-continuacion-1-detalle', 'patron-continuacion-2-detalle', 'patron-continuacion-3-detalle', 'patron-continuacion-4-detalle'],
  },
  {
    id: 'patron-cinco', title: '3. Patrón 5: clasificar no significa operar', diagram: 'patron-cinco-contexto', pages: [18, 19],
    paragraphs: [
      'El profesor incluye esta forma en su clasificación, pero expresa cautela cuando aparece al final del segundo impulso o en una subida extendida. Los nuevos máximos con retrocesos profundos pueden parecerse al agotamiento por dientes de sierra.',
      'Después del primer impulso estudia variaciones que podrían dar lugar a una nueva hipótesis si se conservan o recuperan las referencias necesarias. Eso no significa fracaso obligatorio al principio ni éxito garantizado después del segundo impulso.',
      'Si se pierde una referencia y cambia el conteo, registra cuándo apareció esa información. Una nueva hipótesis no borra la invalidación de la anterior ni permite presentar una revisión posterior como algo conocido de antemano.',
    ],
    question: '¿La forma aparece temprano o después de una subida extendida? ¿Qué cambió desde tu primera lectura?',
    originals: ['patron-continuacion-5-detalle', 'variacion-patron-5-impulso'],
  },
  {
    id: 'fibonacci', title: '4. Conserva el tramo y la escala de Fibonacci', diagram: 'fibonacci-dos-escalas', pages: [20],
    paragraphs: [
      'La página 20 del manual sitúa 100 % en el origen y 61,8 % en el final del primer impulso. Los niveles 50 %, 38,2 %, 23,6 % y 0 % quedan por encima: es la escala de proyección que muestra el profesor.',
      'Un retroceso convencional sitúa 0 % en el extremo superior y 100 % en el origen inferior del tramo elegido. Aunque comparta porcentajes, responde a otra pregunta. La comparación visual evita trasladar una regla de una escala a la otra.',
      'No asignes un tipo de patrón a un porcentaje como una ley universal. La lámina aportada usa esa escala de retroceso, pero no reproduce el anclaje de la página 20. Las configuraciones operativas de los ejemplos concretos todavía requieren verificación.',
    ],
    question: 'Antes de leer un porcentaje, ¿puedes señalar dónde están el origen A y el extremo B?',
    originals: ['ubicacion-fibonacci-2do-impulso'],
  },
  {
    id: 'agotamiento', title: '5. Distingue advertencia, ruptura y recuperación', diagram: 'agotamiento-por-etapas', pages: [25],
    paragraphs: [
      'Una subida puede seguir superando máximos y conservar cada vez menos de sus avances. Los retrocesos profundos, el solapamiento y una resistencia cercana son rasgos que el profesor usa como advertencias de agotamiento. No confirman por sí solos un giro.',
      'Distingue tres observaciones: advertencia mientras el soporte sigue relevante; pérdida de ese soporte; y posible retesteo desde abajo. Si el rebote recupera claramente la referencia, no lo describas sin más como rechazo bajo resistencia.',
      'Un agotamiento aparente también puede dar lugar a una consolidación mayor. Un máximo más bajo o una rotura de directriz no obligan a una venta. Los tres dibujos son esquemas de lectura, no una predicción ni un registro de operaciones reales.',
    ],
    question: '¿Solo hay deterioro del avance o ya se perdió una referencia? ¿El rebote queda debajo o la recupera?',
    originals: ['patrones-finalizacion'],
  },
  {
    id: 'contexto', title: '6. Une la figura con el contexto', diagram: null, pages: [24, 26, 27],
    paragraphs: [
      'Después de una caída fuerte, una W o una primera recuperación no aseguran una nueva tendencia alcista. Revisa los mínimos, los máximos locales y el soporte. Esperar es válido cuando falta información.',
      'Marca primero las referencias externas y después las congestiones interiores. Una dirección favorable no implica espacio suficiente hasta el siguiente obstáculo. La transcripción no define un POC de volumen reproducible: el centro visual de un rango no basta para calcularlo.',
      'Tras superar una resistencia, el profesor contempla tres alternativas: retestearla, dejar una pausa que termine por encima o desarrollar una consolidación sobre ella. Son posibilidades diferentes, no tres condiciones que deban suceder juntas.',
    ],
    question: '¿Dónde está el siguiente obstáculo? ¿Qué desarrollo estás esperando y qué dato haría revisar tu escenario?',
    originals: [],
  },
] as const;

export const moduleTwoImageNotes: Record<string, { title: string; alt: string; status: 'nota' | 'revision'; note: string }> = {
  'tendencias-alcistas-estructura': { title: 'Comparación de tendencias', alt: 'Tres esquemas de tendencias; el tercero se titula consolidación en mínimos y alude a POC.', status: 'revision', note: 'La clasificación original distingue la pausa después del primer o segundo impulso. La mención de POC no queda demostrada por este dibujo ni por datos de volumen; no se enseña como requisito de la tendencia 3.' },
  'tendencia-alcista-1-detalle': { title: 'Tendencia 1: impulsos y retrocesos', alt: 'Esquema lineal de máximos y mínimos ascendentes, junto a una representación de velas.', status: 'nota', note: 'Útil para comparar impulsos y pausas. Aunque el título interno diga «gráfica real», no hay activo, fecha ni datos OHLC que acrediten un caso de mercado. El cierre de una vela no equivale necesariamente a su máximo.' },
  'tendencia-alcista-3-detalle': { title: 'Tendencia 3 y zona de congestión', alt: 'Rango, perforación inferior y recuperación con etiquetas POC y ruptura con volumen, sin histograma de volumen.', status: 'revision', note: 'No se aportan datos para medir POC o volumen, ni para demostrar una sacudida de stops. La tendencia 3 del curso se identifica por la consolidación después del primer impulso. Las etiquetas de oferta y demanda se tratan como interpretación del dibujo.' },
  'patrones-continuacion-resumen': { title: 'Resumen aportado de cinco patrones', alt: 'Cinco esquemas de continuación con etiquetas de bandera, sacudida, canal y cuñas.', status: 'revision', note: 'El patrón 1 de este resumen deja un mínimo más bajo, distinto del mínimo más alto del original. Los nombres de los patrones 4 y 5 tampoco deben reemplazar las geometrías de las páginas 13–18. Usa la comparación editorial para estudiar la numeración del curso.' },
  'patron-continuacion-1-detalle': { title: 'Patrón 1: mínimo más alto', alt: 'Pausa con máximos internos descendentes y mínimo final más alto, comparada con velas.', status: 'nota', note: 'Conserva el rasgo principal del patrón 1. El título «final primer impulso» es el de esta ilustración; la lámina 14 del manual lo sitúa también después del segundo. La secuencia completa de velas es esquemática, no el futuro conocido durante una entrada.' },
  'patron-continuacion-2-detalle': { title: 'Patrón 2: perforación del mínimo', alt: 'Perforación del soporte seguida de recuperación, con comparación entre línea y velas.', status: 'nota', note: 'La perforación y recuperación son observables en el esquema. «Institucionales compran barato» y «sacudida de stops» son atribuciones no demostradas por las velas. La caída por debajo del mínimo, sin recuperación, no basta para confirmar el escenario.' },
  'patron-continuacion-3-detalle': { title: 'Patrón 3: bandera descendente', alt: 'Máximos y mínimos descendentes en un canal con una flecha de rompimiento.', status: 'revision', note: 'La geometría de bandera es útil, pero la flecha «Rompimiento (Entrada)» del panel lineal apunta a un tramo bajista, no a la recuperación final. No utilizar esa flecha como regla de entrada; marca el máximo interno y observa cuándo se recupera.' },
  'patron-continuacion-4-detalle': { title: 'Patrón 4: detalle por revisar', alt: 'Cuña descendente cuyo rótulo mínimo más alto apunta a un máximo; el último mínimo dibujado es inferior.', status: 'revision', note: 'La flecha «Mínimo más alto» señala un máximo local y el mínimo final dibujado es más bajo. No corresponde al rasgo diferenciador del patrón 4 del manual, que exige identificar un mínimo final más alto. Consulta la lámina editorial y la página 17.' },
  'patron-continuacion-5-detalle': { title: 'Patrón 5: comparación con triángulo', alt: 'Triángulo ascendente de máximos iguales y mínimos ascendentes con velas de ruptura.', status: 'revision', note: 'Este dibujo presenta máximos iguales. La figura original del patrón 5 incluye un nuevo máximo y retrocesos marcados; no deben tratarse como geometrías idénticas. «Toma de control» no acredita identidad de participantes ni garantiza continuidad.' },
  'variacion-patron-5-impulso': { title: 'Patrón 5: comparación de ubicaciones', alt: 'Dos paneles etiquetados éxito en segundo impulso y fallo o trampa en primero.', status: 'revision', note: 'Las etiquetas éxito/fallo simplifican y contradicen la cautela del profesor con el patrón 5 al final del segundo impulso. El caso temprano puede requerir revisar referencias y conteo. No se atribuye una probabilidad de trampa sin una muestra.' },
  'ubicacion-fibonacci-2do-impulso': { title: 'Fibonacci: escala aportada', alt: 'Escala con 0 % en el final del primer impulso y 100 % en su origen; niveles intermedios de retroceso.', status: 'revision', note: 'Usa 0 % en el final del impulso. La página 20 del módulo 2 usa 61,8 % en ese extremo para su proyección. «Ubicación ideal», asignaciones de patrones a niveles y «rebote de oro» no se incorporan como reglas del curso.' },
  'patrones-finalizacion': { title: 'Finalización: soporte y rebote', alt: 'Doble intento de máximo, pérdida de soporte y rebote que vuelve por encima de la línea marcada.', status: 'revision', note: 'El rebote dibujado supera la línea roja, aunque se rotula como pullback en resistencia. Hay que distinguir recuperación del nivel y retesteo desde abajo. El esquema no demuestra agotamiento de demanda como causa ni convierte una advertencia en giro confirmado.' },
};

export const moduleTwoExercises = [
  { title: 'Un mínimo más alto todavía no completa la recuperación', prompt: 'Tras una subida a 120, la pausa deja extremos 112 → 118 → 114. La última observación es 117. Solo para este ejercicio se exige un cierre superior a 118. ¿Qué se cumple y qué falta?', answer: '114 es más alto que 112, compatible con la pausa del patrón 1. No se aporta un cierre superior a 118: falta esa condición local. No puedes afirmar que después se alcanzará 120. La convención de cierre pertenece a este ejercicio, no a una regla universal del profesor.' },
  { title: 'Cambio de escenario sin reescribir el pasado', prompt: 'Después de tu respuesta anterior se añade un cierre en 119; ya habías marcado una resistencia en 122. ¿Qué cambia?', answer: 'Ahora se cumple el cierre local sobre 118. No se ha demostrado que el precio supere 122 ni que exista una operación rentable. Tu primera respuesta seguía siendo correcta con los datos disponibles en aquel corte.' },
  { title: 'Advertencia no equivale a giro confirmado', prompt: 'El precio supera ligeramente máximos, retrocede con profundidad y se acerca a una resistencia. Todavía conserva el soporte. ¿Ya puedes declarar una tendencia bajista?', answer: 'No. Hay rasgos compatibles con advertencia de agotamiento, pero el soporte todavía debe revisarse. Puede producirse una consolidación. Identificar deterioro no confirma por sí solo el siguiente movimiento.' },
  { title: 'Tres alternativas, no tres requisitos acumulativos', prompt: 'Tras superar una resistencia, la pausa termina por encima del antiguo nivel sin tocarlo y después recupera el máximo local marcado. ¿El escenario queda descartado por no haber contacto exacto?', answer: 'No por ese motivo: corresponde a la alternativa de pausa por encima. Aun así, esta descripción no aporta todas las condiciones necesarias para una operación. No hay que exigir a la vez retesteo, pausa por encima y consolidación.' },
];
