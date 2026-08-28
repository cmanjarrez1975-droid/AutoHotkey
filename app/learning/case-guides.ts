// Instrucciones editoriales basadas en los datos disponibles al corte.
// No contiene decisiones correctas, datos posteriores ni notas de evaluación.
export type ChartReference = { label: string; low: number; high?: number };
export type CaseGuide = {
  objective: string;
  idea: 'Largo' | 'Corto' | 'Sin dirección elegida';
  references: ChartReference[];
  anchors: Array<{ point: number; label: string }>;
  given: string;
  steps: [string, string, string];
  prompts: [string, string, string];
};

export const caseGuides: Record<string, CaseGuide> = {
  'estructura-candidata': {
    objective: 'Distinguir un mínimo candidato de uno confirmado por la ruptura del máximo previo.', idea: 'Largo',
    references: [{label:'Máximo que debe superarse al cierre',low:112},{label:'Mínimo candidato',low:106}],
    anchors: [{point:4,label:'Máximo previo: 112'},{point:6,label:'Mínimo candidato: 106'}],
    given: 'La referencia 112 se fijó antes del retroceso a 106. Evalúa solo los cierres posteriores a P6 para saber si ese mínimo quedó confirmado.',
    steps: ['Ubica P4 y P6: son el máximo previo y el mínimo que estás evaluando.', 'Compara P7 y P8 con 112. La regla exige superar, no solamente tocar, ese nivel.', 'Decide si ya ocurrió el evento o si todavía podría ocurrir. No necesitas calcular un tamaño de entrada.'],
    prompts: ['¿Cuánto valen P7 y P8 respecto de 112?', '¿Qué exige la regla para confirmar el mínimo 106?', '¿Qué cierre te haría revisar tu decisión?'],
  },
  'estructura-ruptura': {
    objective:'Comprobar una ruptura y construir un plan de riesgo desde el precio realmente disponible.', idea:'Largo',
    references:[{label:'Referencia de ruptura',low:112},{label:'Banda permitida para el stop',low:105,high:106},{label:'Resistencia',low:132}],
    anchors:[{point:3,label:'Máximo previo: 112'},{point:5,label:'Base: 106'},{point:7,label:'Precio disponible: 113'}],
    given:'La resistencia 132 procede del contexto anterior y por eso no tiene que haber sido visitada en este recorte. El objetivo debe quedar en 131 o por debajo.',
    steps:['Compara P7 con el máximo de P3 después del retroceso a P5.', 'Si eliges simular entrada, usa P7 como entrada: elige un stop de 105 a 106 y un objetivo anterior a la resistencia.', 'Consulta el cálculo neto con costo 0,1 por unidad. Contrasta el resultado con el mínimo 2R antes de registrar.'],
    prompts:['¿Qué hizo P7 respecto de 112?', '¿Qué condiciones del plan se cumplen o faltan, incluido el riesgo?', '¿Qué observación posterior invalidaría la idea?'],
  },
  'zona-sin-recorrido': {
    objective:'Comparar el recorrido hasta una resistencia con el riesgo de la operación.', idea:'Largo',
    references:[{label:'Stop del plan de comparación',low:102},{label:'Resistencia y límite del recorrido',low:105}],
    anchors:[{point:6,label:'Entrada disponible: 104'}],
    given:'Para este cálculo usa entrada 104, stop 102 y objetivo 105. La referencia 105 proviene del contexto previo. El costo de ida y vuelta es 0,2 por unidad.',
    steps:['Calcula la distancia de 104 a 102 y de 104 a 105.', 'Suma 0,2 a la pérdida por unidad y réstalo al beneficio por unidad. Divide beneficio neto entre pérdida neta.', 'Si una oportunidad ya disponible no cumple el mínimo 2R, decide si este plan debe descartarse; no muevas la resistencia.'],
    prompts:['¿Cuáles son las dos distancias desde 104?', '¿Qué ratio neto obtienes y cómo se compara con 2?', '¿Qué tendría que cambiar para formular otro plan, sin alterar este retrospectivamente?'],
  },
  'zona-sin-toque': {
    objective:'Separar una condición pendiente de una oportunidad ya invalidada.', idea:'Largo',
    references:[{label:'Zona de trabajo',low:100,high:102}],
    anchors:[{point:5,label:'Último cierre: 108'}],
    given:'El escenario declara que todavía no hubo visita a 100–102. El recorte solo muestra cierres; no debes inventar una mecha que haya tocado la zona.',
    steps:['Localiza la franja 100–102 y la posición de P5.', 'La secuencia exigida es primero visita y después recuperación. Identifica si ya ocurrió el primer paso.', 'Distingue «aún falta llegar» de «el plan dejó de ser válido». No se pide perseguir el precio ni dimensionar una entrada.'],
    prompts:['¿Dónde está P5 respecto de la zona?', '¿Qué primer evento exige la secuencia del plan?', '¿Qué deberías observar después para volver a evaluar la oportunidad?'],
  },
  'w2-incompleta': {
    objective:'Separar el segundo mínimo de una W2 de la recuperación de su base.', idea:'Largo',
    references:[{label:'Primer suelo',low:100},{label:'Base que debe recuperarse',low:105},{label:'Segundo suelo',low:99}],
    anchors:[{point:3,label:'Primer suelo: 100'},{point:5,label:'Base: 105'},{point:7,label:'Segundo suelo: 99'}],
    given:'En esta secuencia didáctica los suelos se señalan mediante cierres. No se exige reconocer mechas. La entrada conservadora necesita un cierre mayor que 105 después de P7.',
    steps:['Relaciona P3, P5 y P7 con suelo, base y segundo suelo.', 'Revisa únicamente P8 y P9 frente a 105; P5 ocurrió antes del segundo intento.', 'Elige la acción según la confirmación exigida, no solo por la forma de W.'],
    prompts:['¿Cómo se compara el segundo suelo con el primero?', '¿Los cierres después de P7 satisfacen la condición sobre 105?', '¿Qué cierre adicional cambiaría tu evaluación?'],
  },
  'w2-confirmada': {
    objective:'Evaluar la recuperación de una base y el espacio disponible para un plan largo.', idea:'Largo',
    references:[{label:'Base de la W',low:104},{label:'Banda permitida para el stop',low:98,high:99},{label:'Resistencia',low:122}],
    anchors:[{point:3,label:'Primer suelo: 100'},{point:4,label:'Base: 104'},{point:6,label:'Segundo suelo: 99'},{point:8,label:'Entrada disponible: 105'}],
    given:'La resistencia 122 es una referencia del contexto anterior. El objetivo máximo del ejercicio es 121; el precio de entrada disponible es 105, no el mínimo 99.',
    steps:['Comprueba si P8 recupera la base después del segundo suelo de P6.', 'Si decides simular entrada, elige stop entre 98 y 99, objetivo hasta 121 y un presupuesto de pérdida simulado.', 'Comprueba el ratio neto mínimo 2 incluyendo costo 0,2 por unidad. No confundas un plan admisible con una ganancia asegurada.'],
    prompts:['¿Qué relación hay entre P8 y la base 104?', '¿Cómo justificas la decisión y, si corresponde, tu riesgo neto?', '¿Qué nivel contradice la idea si el precio lo pierde?'],
  },
  'm3-pendiente': {
    objective:'Distinguir el segundo techo de una M3 de la ruptura bajista necesaria.', idea:'Corto',
    references:[{label:'Primer techo',low:120},{label:'Segundo techo',low:118},{label:'Base que debe perderse',low:114}],
    anchors:[{point:3,label:'Primer techo: 120'},{point:5,label:'Base: 114'},{point:7,label:'Segundo techo: 118'}],
    given:'La señal conservadora de este ejercicio exige un cierre menor que 114 después del segundo techo. Un cierre exactamente en 114 no basta.',
    steps:['Compara los techos de P3 y P7 para reconocer la variante.', 'Compara P8 con la base 114; no uses P5 como una ruptura que ocurriera después de P7.', 'Decide según la condición pendiente o cumplida. No necesitas elegir un stop para esta pregunta de confirmación.'],
    prompts:['¿Dónde termina P8 respecto de la base?', '¿Basta el segundo techo para cumplir la regla?', '¿Qué cierre posterior te haría reconsiderar la decisión?'],
  },
  'm2-confirmada': {
    objective:'Planificar un corto tras el segundo techo sin confundir las direcciones de stop y objetivo.', idea:'Corto',
    references:[{label:'Base',low:115},{label:'Banda permitida para el stop',low:121,high:122},{label:'Soporte',low:91}],
    anchors:[{point:3,label:'Primer techo: 120'},{point:5,label:'Base: 115'},{point:7,label:'Segundo techo: 121'},{point:9,label:'Entrada disponible: 114'}],
    given:'El soporte 91 se conoce por el contexto previo. En un corto, el stop está por encima de la entrada y el objetivo por debajo. El objetivo permitido no puede ser menor que 92.',
    steps:['Comprueba P9 frente a la base 115 después del techo de P7.', 'Si simulas entrada en 114, elige stop de 121 a 122 y objetivo de 92 o mayor, pero inferior a 114.', 'Usa pérdida = stop − entrada + costo y beneficio = entrada − objetivo − costo. Compara el ratio neto con 2.'],
    prompts:['¿Qué ocurrió entre el segundo techo y P9?', '¿Qué justifica tu decisión y la geometría del plan si operas?', '¿Qué recuperación de precio contradiría la lectura bajista?'],
  },
  'fibo-sin-respuesta': {
    objective:'Separar la profundidad de un retroceso de su confirmación de salida.', idea:'Largo',
    references:[{label:'Origen del impulso',low:100},{label:'Extremo del impulso',low:120},{label:'Retroceso del 50%',low:110},{label:'Máximo menor a recuperar',low:114}],
    anchors:[{point:1,label:'Origen: 100'},{point:4,label:'Extremo: 120'},{point:7,label:'Contacto al 50%: 110'}],
    given:'El 50% se mide desde el extremo: 120 − 0,5 × (120 − 100) = 110. La condición de entrada es distinta: cierre sobre 114 después del contacto.',
    steps:['Comprueba el anclaje 100–120 y el nivel 110.', 'Compara P8 con el máximo menor 114, después de P7.', 'Evalúa si llegar al porcentaje y recuperar la estructura son el mismo evento. No cambies los anclajes.'],
    prompts:['¿Qué nivel visitó P7 y dónde terminó P8?', '¿Cuál de las condiciones corresponde a medir y cuál a confirmar?', '¿Qué cierre te permitiría volver a evaluar la salida del retroceso?'],
  },
  'fibo-origen-perdido': {
    objective:'Aplicar una cancelación escrita sin mover el origen de Fibonacci.', idea:'Largo',
    references:[{label:'Origen y nivel de cancelación',low:100},{label:'Extremo del impulso',low:120}],
    anchors:[{point:1,label:'Origen: 100'},{point:3,label:'Extremo: 120'},{point:6,label:'Primer cierre a comprobar'},{point:7,label:'Segundo cierre a comprobar'}],
    given:'La cancelación exige dos cierres consecutivos bajo 100. Se evalúa este impulso 100–120; un impulso nuevo necesitaría un plan nuevo.',
    steps:['Mantén fijos los anclajes P1 y P3.', 'Compara P6 y P7 con 100 y cuenta solo cierres consecutivos.', 'Distingue una confirmación todavía pendiente de una cancelación que ya pudo haberse cumplido.'],
    prompts:['¿Dónde están P6 y P7 respecto del origen?', '¿Qué exige exactamente la cancelación escrita?', '¿Por qué un rebote posterior no permite cambiar los datos del plan original?'],
  },
  'poker-centro': {
    objective:'Comprobar la ubicación de una vela antes de atribuirle valor como señal.', idea:'Largo',
    references:[{label:'Soporte del rango',low:90},{label:'Resistencia del rango',low:120}],
    anchors:[{point:6,label:'Cierre de la vela de empuje: 108'}],
    given:'El escenario aporta dos hechos: la última vela tiene cuerpo amplio y no visitó los extremos 90/120. La línea NO contiene apertura, máximos ni mínimos: no permite verificar su anatomía.',
    steps:['Toma la anatomía como dato aportado, no como algo que debas dibujar o adivinar.', 'Localiza el cierre 108 dentro del rango 90–120 y lee la condición de ubicación.', 'Decide si el tamaño del cuerpo puede sustituir la reacción desde un extremo que exige esta estrategia.'],
    prompts:['¿Qué sabes sobre la vela por el enunciado y qué muestra la línea?', '¿Qué condición de ubicación exige la estrategia?', '¿Qué datos necesitarías para estudiar otra señal desde un extremo?'],
  },
  'poker-stop-fragil': {
    objective:'Comprobar si el espacio compensa el riesgo sin acercar artificialmente el stop.', idea:'Largo',
    references:[{label:'Nivel bajo el que debe quedar el stop',low:100},{label:'Resistencia',low:110}],
    anchors:[{point:4,label:'Referencia de rechazo: 100'},{point:6,label:'Entrada disponible: 106'}],
    given:'El rechazo se aporta como contexto. El stop debe quedar por debajo de 100; para descartar basta calcular el mejor caso límite en 100: cualquier stop inferior aumenta la pérdida.',
    steps:['Mide el recorrido de 106 a 110 y compara con la distancia de 106 a 100.', 'Incluye costo 0,2: beneficio máximo 110 − 106 − 0,2; pérdida mayor que 106 − 100 + 0,2.', 'Compara esa cota con 2R. No cambies el stop a 105 para hacer que otra hipótesis parezca cumplir.'],
    prompts:['¿Cuánto recorrido hay y cuál es la pérdida mínima de comparación?', '¿Puede el stop exigido producir 2R netos hasta la resistencia?', '¿Por qué acercar el stop cambiaría la hipótesis del ejercicio?'],
  },
  'ob-primera-visita': {
    objective:'Separar primera visita a una zona de la confirmación posterior para entrar.', idea:'Largo',
    references:[{label:'Zona del bloque',low:100,high:102},{label:'Nivel de confirmación',low:105}],
    anchors:[{point:2,label:'Zona inicial: 102'},{point:4,label:'Alejamiento: 114'},{point:7,label:'Regreso a evaluar: 102'}],
    given:'Se declara que P7 es el primer regreso después del alejamiento. Los cierres sobre 105 anteriores a esa visita no cuentan como recuperación posterior.',
    steps:['Sigue la salida desde la zona hasta P4 y el regreso hasta P7.', 'Ordena los eventos exigidos: visita a 100–102 y luego cierre sobre 105.', 'Evalúa el último evento conocido; no uses la subida inicial como confirmación de un regreso que ocurrió después.'],
    prompts:['¿Cuál es el último evento disponible en P7?', '¿En qué orden exige la regla visita y confirmación?', '¿Qué tendría que suceder después de P7 para revisar la decisión?'],
  },
  'ob-anulado': {
    objective:'Aplicar el estado de anulación de una zona sin borrar sus interacciones previas.', idea:'Largo',
    references:[{label:'Bloque original',low:100,high:102}],
    anchors:[{point:6,label:'Regreso a zona: 101'},{point:7,label:'Primer cierre a evaluar: 99'},{point:8,label:'Segundo cierre a evaluar: 98'}],
    given:'Para este caso, anular significa dos cierres seguidos bajo 100. Es una regla del escenario, no una definición universal de mitigación.',
    steps:['Conserva la zona original 100–102.', 'Cuenta los cierres P7 y P8 por debajo de su límite inferior.', 'Decide si corresponde esperar una confirmación dentro de la misma hipótesis o cancelar ese bloque según su regla.'],
    prompts:['¿Qué relación tienen P7 y P8 con 100?', '¿Qué regla cambia el estado del bloque?', '¿Por qué no se debe mover la zona para salvar este caso?'],
  },
  'ema-rango': {
    objective:'Identificar si el contexto cumple el filtro que requiere una estrategia de medias.', idea:'Sin dirección elegida',
    references:[], anchors:[{point:1,label:'Inicio del recorte: 100'},{point:8,label:'Final del recorte: 101'}],
    given:'La historia completa, no incluida aquí, declara EMA 30/75 planas y seis cruces. No puedes recalcular esas medias con ocho cierres. No se dibujan curvas inventadas.',
    steps:['Lee los datos declarados sobre pendiente y cruces.', 'Observa si el recorte extiende sus extremos o alterna subidas y bajadas.', 'Contrasta el contexto con el filtro exigido: orden, pendiente y estructura tendencial. No elijas una dirección por el último punto.'],
    prompts:['¿Qué información sobre las EMA aporta el escenario?', '¿Qué filtro requiere el setup y cómo se compara con esos datos?', '¿Qué cambio de contexto necesitarías observar para estudiar ese setup otra vez?'],
  },
  'ema-contacto': {
    objective:'Diferenciar un contacto con la media de la recuperación de una estructura menor.', idea:'Largo',
    references:[{label:'EMA 30 declarada al corte',low:116},{label:'EMA 75 declarada al corte',low:111},{label:'Confirmación por cierre',low:119}],
    anchors:[{point:5,label:'Contacto declarado: 116'},{point:7,label:'Último cierre: 118'}],
    given:'EMA 30=116 y EMA 75=111 ascendentes son datos de una historia previa completa. Las líneas horizontales solo marcan esos valores de referencia; no simulan la trayectoria histórica de las EMA.',
    steps:['Toma como dato el orden de las medias y localiza el contacto de P5.', 'Compara los cierres posteriores P6 y P7 con 119.', 'La condición dice «sobre 119»: tocarlo o quedar por debajo no se equipara a superarlo al cierre.'],
    prompts:['¿Dónde está P7 frente a 119 después del contacto?', '¿Qué diferencia hay entre el filtro de medias y la confirmación de entrada?', '¿Qué evento posterior permitiría revisar la oportunidad?'],
  },
  'donchian-compresion': {
    objective:'Separar un canal estrecho de una ruptura con dirección confirmada.', idea:'Sin dirección elegida',
    references:[{label:'Canal previo fijo para esta comparación',low:98,high:102}],
    anchors:[{point:6,label:'Último cierre: 100'}],
    given:'Las bandas 98 y 102 proceden de la historia previa y se mantienen fijas en este ejercicio. No se pide calcular Donchian ni inferir sus bandas desde seis cierres.',
    steps:['Ubica P6 respecto de 98 y 102.', 'Para salir del canal, un cierre debe ser menor que 98 o mayor que 102; tocar el borde no basta.', 'Decide si el recorte permite elegir dirección o si todavía falta el primer evento del plan.'],
    prompts:['¿El cierre disponible está dentro o fuera del canal?', '¿Qué evento debe ocurrir antes de evaluar aceptación?', '¿Qué datos revisarías si después apareciera una ruptura?'],
  },
  'donchian-fallo': {
    objective:'Distinguir una ruptura inicial de dos cierres consecutivos de aceptación.', idea:'Largo',
    references:[{label:'Banda previa que debe superarse',low:102}],
    anchors:[{point:6,label:'Primer cierre de la secuencia: 103'},{point:7,label:'Segundo cierre de la secuencia: 101'}],
    given:'La banda previa 102 permanece fija. El plan exige dos cierres consecutivos mayores que 102; volver dentro antes del segundo cancela esta señal concreta.',
    steps:['Compara P6 con 102 para identificar la ruptura inicial.', 'Comprueba si P7 conserva la condición o vuelve dentro.', 'Distingue «falta un dato futuro» de «ya ocurrió el regreso que cancela la señal».'],
    prompts:['¿Dónde están P6 y P7 respecto de la banda?', '¿Cómo se aplica la condición de dos cierres consecutivos?', '¿Por qué otro cierre futuro no borra el regreso ya registrado?'],
  },
  'cripto-costos': {
    objective:'Evaluar un ratio neto sin confundirlo con el ratio bruto ni con el margen.', idea:'Largo',
    references:[{label:'Stop del plan',low:98},{label:'Objetivo del plan',low:106}],
    anchors:[{point:4,label:'Entrada disponible: 100'}],
    given:'Modelo lineal con valor 1 por punto y unidad. El costo total de ida y vuelta es 1,5 por unidad. No necesitas datos de una cuenta ni de un bróker.',
    steps:['Calcula pérdida bruta 100 − 98 y beneficio bruto 106 − 100.', 'Para el ratio neto suma 1,5 a la pérdida y réstalo al beneficio. No uses margen en esta división.', 'Compara el resultado neto con el mínimo 2R escrito en el plan.'],
    prompts:['¿Cuáles son pérdida y beneficio después de costos?', '¿Cumple el ratio neto el mínimo del ejercicio?', '¿Qué dato tendría que cambiar en otro plan para repetir la comparación?'],
  },
  'rutina-persecucion': {
    objective:'Recalcular el riesgo con la entrada disponible y no con una oportunidad pasada.', idea:'Largo',
    references:[{label:'Entrada del plan original, ya pasada',low:105},{label:'Stop del plan',low:99},{label:'Objetivo del plan',low:118}],
    anchors:[{point:4,label:'Precio original: 105'},{point:6,label:'Precio disponible ahora: 112'}],
    given:'No hay una orden ejecutada en 105. Estás decidiendo ahora en P6=112 y el costo por unidad es 0,1. Stop 99 y objetivo 118 permanecen fijos para esta comparación.',
    steps:['Distingue el precio de P4 del de P6.', 'Calcula el ratio neto desde 112: beneficio 118 − 112 − 0,1; pérdida 112 − 99 + 0,1.', 'Compara con 2R. No registres una entrada en 105 para mejorar un resultado que hoy no puedes ejecutar.'],
    prompts:['¿Cuál es la entrada disponible al momento de decidir?', '¿Cómo cambia el ratio al usar esa entrada?', '¿Cómo registrarías esta oportunidad sin inventar una ejecución pasada?'],
  },
};
