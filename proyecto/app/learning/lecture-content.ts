import type { LessonLecture, LectureSource } from './lecture-types.ts';

const charts: LectureSource = {
  id: 'cme-charts', organization: 'CME Group · educación', title: 'Chart Types: Candlestick, Line and Bar',
  url: 'https://www.cmegroup.com/education/courses/technical-analysis/chart-types-candlestick-line-bar',
  contribution: 'Referencia complementaria para la representación OHLC y la diferencia entre gráficos de líneas, barras y velas.',
  scope: 'Material introductorio, no evidencia de rentabilidad. Los recorridos numéricos y las demostraciones de esta clase son elaboración editorial propia.',
};
const instruction: LectureSource = {
  id: 'ies-instruction', organization: 'IES · What Works Clearinghouse · 2007', title: 'Organizing Instruction and Study to Improve Student Learning',
  url: 'https://ies.ed.gov/ncee/wwc/practiceguide/1',
  contribution: 'Orienta la alternancia de ejemplos resueltos, práctica, representaciones visuales y recuperación de lo aprendido.',
  scope: 'Guía educativa general. Aplicar sus recomendaciones aquí es una decisión de diseño, no una validación del aprendizaje de trading en esta plataforma.',
};
const patterns: LectureSource = {
  id: 'cme-patterns', organization: 'CME Group · educación', title: 'Trend and Continuation Patterns',
  url: 'https://www.cmegroup.com/education/courses/technical-analysis/trend-and-continuation-patterns',
  contribution: 'Presenta patrones de continuación y advierte que no siempre anticipan una continuación.',
  scope: 'No establece la regla de confirmación de mínimos usada en esta clase. Esa regla es una convención didáctica explícita, no una norma universal.',
};
const analysis: LectureSource = {
  id: 'nber-analysis', organization: 'Lo, Mamaysky y Wang · NBER · 2000', title: 'Foundations of Technical Analysis: Computational Algorithms, Statistical Inference, and Empirical Implementation',
  url: 'https://www.nber.org/papers/w7613',
  contribution: 'El resumen describe un estudio de patrones formalizados en acciones estadounidenses de 1962–1996, con información incremental en determinados indicadores.',
  scope: 'Se consultó el resumen, no una revisión íntegra del artículo. Sus resultados no validan las reglas W, bloques o «230» del curso ni garantizan ganancias después de costos.',
};

export const candleLecture: LessonLecture = {
  introduction: 'Antes de interpretar rechazo, demanda o una señal, necesitas saber qué estás mirando. Construiremos una vela a partir de precios, veremos qué información pierde y después añadiremos el reloj. No necesitas reconocer ningún patrón para seguir esta clase. Los números son sintéticos y se usan solo para aprender a leer.',
  sections: [
    {
      id: 'resumen', title: '¿Para qué existe una vela?',
      paragraphs: [
        'Imagina una lista de operaciones realizadas durante quince minutos. Cada operación tiene un momento y un precio. Leer la lista completa permite seguir el recorrido, pero dificulta comparar muchos intervalos de un vistazo. Una vela comprime ese intervalo en cuatro precios. Ganamos una representación breve; perdemos detalles del camino.',
        'Usaremos precios de operaciones de un instrumento ficticio, sin huecos ni ajustes. O, de open, es el primer precio; H, de high, el mayor; L, de low, el menor; C, de close, el último al terminar el intervalo. No son cuatro tipos de participantes ni cuatro señales: son cuatro maneras de resumir la misma lista.',
        'Por ejemplo, si la lista simplificada es 100 → 108 → 97 → 104, apertura y cierre se toman por su posición: primero 100, último 104. Máximo y mínimo se toman por su valor: el mayor es 108 y el menor es 97. Distinguir «primero» de «mayor» evita confundir apertura con máximo.',
      ],
      reference: { sourceId: 'cme-charts', note: 'La referencia de CME describe esta representación de apertura, máximo, mínimo y cierre. Aquí la construimos con un ejemplo propio antes de interpretarla.' },
      pause: { prompt: 'Si solo conoces el primer precio, 100, ¿puedes decir cuál será el máximo del intervalo?', hint: 'El intervalo aún no terminó. Separa el dato disponible del dato que llegará después.', answer: 'No. Solo sabes la apertura. 100 es el máximo observado hasta ese momento, pero un precio posterior podría superarlo.' },
    },
    {
      id: 'anatomia', title: 'Dibuja el cuerpo; después añade las mechas',
      paragraphs: [
        'El cuerpo conecta apertura y cierre. En nuestro ejemplo va de 100 a 104. Su altura es 104 − 100 = 4 unidades de precio. Como terminó por encima de donde empezó, lo llamamos alcista dentro de ese intervalo; aquí lo pintamos verde. El color es una convención de visualización, no una orden de compra.',
        'La mecha superior une el borde superior del cuerpo, 104, con el máximo, 108: mide 4. La inferior une el mínimo, 97, con el borde inferior del cuerpo, 100: mide 3. El recorrido total es 108 − 97 = 11. Puedes comprobar el dibujo: mecha inferior 3 + cuerpo 4 + mecha superior 4 = rango 11.',
        'Para una vela bajista no cambies las definiciones. Coloca abajo el menor entre apertura y cierre; arriba, el mayor. Las mechas conectan esos bordes con los extremos. Si apertura y cierre coinciden, el cuerpo tiene altura cero, aunque el precio haya recorrido un rango grande. «Cuerpo pequeño» no significa necesariamente «poco movimiento».',
      ],
      worked: { question: 'Otro intervalo: abre en 80, llega a 86, baja a 78 y cierra en 83. ¿Cómo lo dibujarías?', steps: [
        'Fija los cuatro datos: O = 80, H = 86, L = 78, C = 83.',
        'Traza el cuerpo entre 80 y 83: altura 3, cierre sobre apertura.',
        'Completa la mecha inferior de 78 a 80: altura 2. Completa la superior de 83 a 86: altura 3.',
        'Comprueba: 2 + 3 + 3 = 8, igual a 86 − 78. El dibujo conserva el rango completo.',
      ] },
    },
    {
      id: 'camino', title: 'Una misma vela puede esconder dos historias',
      paragraphs: [
        'Cambia el recorrido en la demostración. En uno, el precio alcanza el máximo antes del mínimo; en el otro ocurre al revés. Observa que la vela y sus cuatro valores no cambian. La lista conserva el orden de los movimientos; OHLC conserva los extremos, pero no el orden entre ellos.',
        'Esta pérdida de información tiene una consecuencia práctica. Si una simulación supone que una salida superior y otra inferior pudieron activarse dentro de la misma vela, OHLC por sí solo no siempre permite decidir cuál sucedió primero. Harían falta datos más detallados o una convención de simulación explícita. Elegir siempre el desenlace favorable inventaría información.',
      ],
      figure: 'candle-paths',
      pause: { prompt: 'Sin mirar el recorrido, alguien te muestra O = 100, H = 108, L = 97, C = 104. ¿Qué responderías si pregunta si tocó 108 antes que 97?', hint: 'Los dos botones de la demostración producen los mismos cuatro datos.', answer: 'No se puede determinar con esos datos. Puedo describir cuerpo, mechas y rango, pero necesito la secuencia intravela para ordenar los extremos.' },
    },
    {
      id: 'reloj', title: 'El cierre solo existe cuando termina el intervalo',
      paragraphs: [
        'Ahora observa otra secuencia. La apertura queda fijada en 100. Durante los quince minutos siguientes cambian el último precio y los extremos observados. La plataforma puede dibujar ese último precio como borde del cuerpo, pero todavía es provisional: no debes llamarlo cierre definitivo.',
        'Avanza un paso cada vez. En el minuto 5 el cuerpo parece bajista. En el minuto 12 parece alcista. No hubo dos velas de quince minutos distintas: cambió la misma vela mientras se formaba. La demostración supone que los puntos mostrados contienen todos los extremos de este intervalo sintético.',
        'Una condición debe decir exactamente qué evento necesita. «Tocar 102», «superar 102» y «cerrar por encima de 102» son condiciones diferentes. La última exige esperar al final. Conocer después el cierre no autoriza a usarlo para justificar una decisión que habrías tomado antes.',
      ],
      figure: 'candle-clock',
    },
    {
      id: 'interpretacion', title: 'Describe primero; interpreta después',
      paragraphs: [
        'Decir «hay una mecha inferior entre 97 y 100» describe el dibujo. Decir «hubo rechazo de precios inferiores» ya propone una lectura. Decir «compraron instituciones y ahora subirá» añade identidad y futuro: ninguna de esas dos cosas se demuestra solo con la mecha.',
        'También conviene separar vela y tendencia. Si un intervalo abre en 100 y cierra en 104, es alcista respecto de su propia apertura. Sin embargo, podría ser un rebote dentro de una caída desde 140. El dato local sigue siendo cierto, pero no alcanza para describir el movimiento mayor. Necesitaremos comparar varios giros en la siguiente clase.',
      ],
      pause: { prompt: 'Una vela abre en 30 y cierra en 32, pero no tienes los intervalos anteriores. ¿Qué sabes y qué te falta?', hint: 'Usa dos frases: «Dentro del intervalo…» y «Sobre la tendencia…».', answer: 'Dentro del intervalo terminó 2 unidades por encima de la apertura. Sobre la tendencia no puedo concluir: faltan precios anteriores, extremos y una escala definida.' },
    },
  ],
  recap: [
    'OHLC resume una lista: primero, mayor, menor y último precio.',
    'Cuerpo y mechas describen distancias; no identifican participantes ni garantizan resultados.',
    'Dos recorridos distintos pueden compartir la misma vela.',
    'Un cierre definitivo no está disponible mientras la vela sigue abierta.',
  ],
  recall: { prompt: 'Después de resolver la práctica de abajo, vuelve mañana sin leer esta clase: explica a otra persona qué información conserva una vela y qué información pierde.', answer: 'Conserva apertura, máximo, mínimo y cierre del intervalo. Pierde la secuencia completa entre esos datos. Antes de terminar, el último precio y los extremos son provisionales. Si puedes explicarlo con un ejemplo nuevo, pasa a comparar giros; si no, repite las dos demostraciones.' },
  sources: [charts, instruction],
};

export const structureLecture: LessonLecture = {
  introduction: 'Ya sabes leer una vela. Ahora cambia la pregunta: ¿cómo se relaciona un movimiento con el anterior? No buscaremos entradas. Aprenderemos a describir una secuencia, elegir una referencia y precisar cuándo una conclusión estuvo disponible. Los puntos son precios sintéticos simplificados; no representan velas OHLC ni un activo real.',
  sections: [
    {
      id: 'oscilacion', title: 'Empieza por el movimiento, no por el nombre del patrón',
      paragraphs: [
        'Imagina el precio como una caminata que cambia de dirección. Un tramo sube; otro retrocede; después puede volver a subir. En esta clase llamamos oscilación a un tramo entre giros. Un máximo local separa un avance de un retroceso; un mínimo local separa una caída de un rebote. «Local» significa que lo comparas con puntos cercanos, no con toda la historia.',
        'En 100 → 112 → 106, ya observas subida y retroceso. Sabes que 112 está por encima de los puntos que lo rodean en esta secuencia. Sin embargo, 106 es el último dato: todavía no sabes si allí comenzará un rebote o si el siguiente precio será menor. Marcarlo como extremo provisional es más preciso que declararlo un suelo definitivo.',
        'Los giros se reconocen con alguna información posterior. Lo que debes evitar no es usar información nueva cuando llega, sino atribuirla al pasado. Es correcto decir «al observar el rebote reconocí el giro». Es incorrecto decir «en el mínimo ya sabía que el rebote ocurriría». Esta diferencia será central en el laboratorio.',
      ],
      pause: { prompt: 'Solo has visto 50 → 57 → 53. ¿Ya puedes afirmar que el descenso terminó en 53?', hint: 'La secuencia termina justo en 53; no se ha observado ningún rebote desde allí.', answer: 'No. 53 es el menor precio observado desde 57, pero el descenso podría continuar. Reconocer un giro requiere una regla y datos posteriores que la cumplan.' },
    },
    {
      id: 'comparacion', title: 'Una tendencia exige comparar extremos del mismo tipo',
      paragraphs: [
        'No compares un máximo con cualquier mínimo para decidir si hay tendencia: en un zigzag el máximo normalmente estará encima del mínimo cercano. Lo informativo es comparar máximo con máximo y mínimo con mínimo, manteniendo la misma escala de observación.',
        'Ejemplo completo de repaso: 100 → 112 → 106 → 121 → 109 → 124 → 116. Los giros altos 112, 121 y 124 son crecientes. Los giros bajos 106 y 109 también lo son; 116 permanece provisional porque es el último dato. Así describes una secuencia de ascensos y retrocesos crecientes, sin convertir cada vela roja en un cambio de tendencia.',
        'En sentido contrario, máximos y mínimos descendentes describen una secuencia bajista. Si los extremos no se extienden de forma consistente, puede haber rango o transición; no es obligatorio forzar una etiqueta. Tampoco puedes trasladar una descripción de tres minutos a cuatro horas sin examinar esa otra escala.',
      ],
      worked: { question: 'Repaso con la secuencia completa 90 → 104 → 96 → 110 → 99 → 114 → 105: ¿qué comparas?', steps: [
        'Separa giros altos: 104, 110 y 114. Cada uno supera al anterior.',
        'Separa giros bajos ya seguidos de rebote: 96 y 99. El segundo queda por encima del primero.',
        '105 es el último punto y todavía no demuestra un giro. No lo presentes como confirmado.',
        'Describe el tramo como una secuencia ascendente en esta escala. La descripción no dice que el próximo precio deba subir.',
      ] },
    },
    {
      id: 'regla', title: '¿Qué hace relevante a un giro en este curso?',
      paragraphs: [
        'Todos los giros aportan información, pero no todos cumplen la misma función. Para estos ejemplos elegimos una convención: un mínimo candidato gana relevancia estructural cuando el avance que nace de él supera el máximo previo seleccionado. No es una ley del mercado ni el único modo de definir estructura. Es una regla de trabajo para que dos alumnos puedan revisar el mismo razonamiento.',
        'Escríbela antes de avanzar: referencia 112; candidato 106; evento exigido, observar un precio estrictamente mayor que 112 después del retroceso. En esta demostración evaluamos los puntos dados, sin exigir cierre de vela. Si un caso exige cierre, no basta una mecha: tendrás que usar los datos y el criterio que ese caso declare.',
        'Con esta regla, llegar a 110 no confirma 106. Llegar exactamente a 112 tampoco supera la referencia. Observar 113 sí satisface la condición. Confirmar significa que ocurrió el evento definido; no significa que el mínimo no pueda perderse más adelante ni que comprar allí sea rentable.',
      ],
    },
    {
      id: 'secuencia', title: 'Avanza sin concederte información del futuro',
      paragraphs: [
        'Empieza en P1 y avanza de uno en uno. La línea y la lista muestran solo los datos revelados. Antes de pulsar «Siguiente dato», intenta decir qué sabes, qué permanece provisional y qué evento falta. Luego compara tu respuesta con la explicación del paso.',
        'Fíjate especialmente en P3, P4 y P5. Primero hay un extremo provisional en 106; después, un rebote que lo convierte en giro candidato; finalmente, una ruptura de 112 que satisface nuestra regla de confirmación. Son tres estados distintos, no tres nombres intercambiables.',
        'P6 y P7 sirven para comprobar un límite: el avance a 121 no era necesario para confirmar 106, y el retroceso posterior a 109 no lo invalida bajo esta referencia. Eso tampoco convierte 109 en otro mínimo confirmado. Haría falta observar qué sucede después; aquí no tenemos esos datos.',
      ],
      figure: 'structure-sequence',
      pause: { prompt: 'Si en P4 solo conoces 100 → 112 → 106 → 110, ¿por qué no debes escribir «106 confirmado»?', hint: 'Compara el último precio disponible con el evento que escribiste: superar 112.', answer: 'El rebote existe, pero sigue debajo de la referencia. Puedo llamar a 106 giro candidato; no puedo concederle una ruptura que aún no ocurrió. Un resultado posterior favorable no cambia qué sabía en P4.' },
    },
    {
      id: 'limites', title: 'Una referencia ayuda a revisar la hipótesis; no predice el desenlace',
      paragraphs: [
        'Después de la ruptura, 106 permite formular una pregunta verificable: ¿se conserva el mínimo del que salió el avance? Perder esa referencia exige revisar esta lectura. No demuestra por sí solo que ya exista una tendencia bajista completa; para eso tendrías que establecer y observar sus propios criterios.',
        'Mantén separadas estructura, invalidación y orden de stop. La estructura describe relaciones de precio. La invalidación dice qué observación contradice tu hipótesis. El stop es una orden de gestión con condiciones y riesgo de ejecución. Esta clase enseña la primera; no calcula una posición ni recomienda arriesgar dinero.',
        'Un error frecuente es elegir el mínimo más cercano porque permite dibujar menos riesgo, y llamarlo estructural después. Eso invierte el razonamiento. Primero declara la escala y la regla; luego identifica qué extremos la cumplen. Si una operación no cabe en tu plan, la solución no consiste en renombrar los puntos.',
      ],
      reference: { sourceId: 'cme-patterns', note: 'CME también advierte que los patrones de continuación pueden fallar. Reconocer una forma y demostrar una ventaja operativa son tareas distintas.' },
    },
    {
      id: 'transferencia', title: 'Transfiere la lógica a una caída',
      paragraphs: [
        'Invierte la dirección, no el método de razonar. En una secuencia bajista interesa el máximo desde el que un descenso supera el mínimo previo hacia abajo. Selecciona primero ese mínimo de referencia y comprueba cuándo aparece un precio estrictamente menor. Hasta entonces, el máximo del rebote es candidato.',
        'Practica mentalmente con 150 → 138 → 144 → 136. La referencia inferior es 138. El rebote llega a 144. Cuando observas 136, se ha perdido 138: según la convención del ejemplo, 144 pasa a ser el máximo relevante. Si la secuencia hubiera terminado en 140, todavía faltaría la ruptura.',
        'Ahora puedes resolver el ejercicio de abajo sin memorizar un dibujo: identifica la referencia, el candidato y el primer evento que lo confirma. Si falta uno de esos tres elementos en tu explicación, vuelve al paso correspondiente. El siguiente tema añadirá dónde están las zonas y cuánto espacio queda; todavía no necesitamos buscar una entrada.',
      ],
    },
  ],
  recap: [
    'Un extremo al final de la secuencia puede seguir siendo provisional.',
    'Compara máximos con máximos y mínimos con mínimos dentro de una escala definida.',
    'Candidato y confirmado son estados separados por un evento observable y previamente escrito.',
    'Confirmar una regla de lectura no prueba que una operación tenga ventaja.',
  ],
  recall: { prompt: 'Mañana, sin abrir la solución, inventa una secuencia alcista y otra bajista. Señala referencia, candidato y momento exacto de confirmación. Termina una de ellas antes de confirmar.', answer: 'No hay una única secuencia correcta. Verifica que la alcista supere el máximo previo después del candidato y que la bajista pierda el mínimo previo después del candidato. La secuencia interrumpida debe conservar el estado pendiente. Explica qué dato falta, sin completar el futuro por intuición.' },
  sources: [patterns, analysis, instruction],
};
