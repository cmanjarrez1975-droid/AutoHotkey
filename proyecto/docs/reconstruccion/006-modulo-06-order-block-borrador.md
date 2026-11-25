# Módulo 6. Order Block

**Desarrollo editorial integrado en `/curso/modulo-6`.** La entrega posterior de nueve imágenes confirma expresamente el **módulo 6**, después del módulo 5, Velas póker. La etiqueta anterior «Modulo 5 Order Block» se conserva como antecedente de la numeración antigua, sin sobrescribir Velas póker. [Trazabilidad](006-modulo-06-trazabilidad.md) · [Integración visual y verificaciones](006-modulo-06-integracion-visual.md).

Fuentes principales, en el orden recibido: [012 · Teoría y práctica](fuentes/012-modulo-06-order-block-teoria-practica-original.txt), [013 · Aplicación con ejecución M3](fuentes/013-modulo-06-order-block-aplicacion-m3-original.txt) y [014 · Aplicación USD/JPY](fuentes/014-modulo-06-order-block-aplicacion-usdjpy-original.txt). Son tres textos distintos, con despedida. No se conocen las fechas de las sesiones, sus precios exactos ni las imágenes señaladas con «aquí». No se presentan los casos relatados como operaciones verificadas.

## Hilo conductor y objetivo

En Velas póker aprendiste a separar forma, ubicación y activación. Ahora añadimos una pregunta: **si el movimiento se desarrolla, ¿qué referencias anteriores hay en su recorrido?** El profesor utiliza los Order Blocks especialmente para estudiar posibles destinos y salidas. No los presenta como sustitutos del contexto ni de los soportes y resistencias.

Al terminar deberías poder explicar cómo nace una zona, por qué todavía no podía conocerse antes del empuje, qué significa que se haya visitado y cómo cambia la selección de referencias. También deberías poder rechazar una operación aunque exista un bloque pendiente.

Los bloques didácticos siguientes organizan la lectura; no equivalen a un número de videos originales. Los ejemplos numéricos y ejercicios son complementos ficticios, no reconstrucciones de los precios del profesor. No requieren cuenta ni dinero real.

## 1. Qué significa Order Block en estas clases

La fuente llama Order Block a una zona asociada al final de un movimiento, una respuesta que interpreta como absorción y un empuje posterior en sentido contrario. En un retroceso de tendencia alcista, por ejemplo, el precio cae, deja de prolongar la caída y después aparece una reacción compradora. La zona de origen queda como referencia para estudiar visitas posteriores.

El profesor atribuye esa secuencia a órdenes profesionales. En la adaptación separamos dos niveles: **se observa una secuencia de precios; la identidad y las órdenes de quienes participan son una interpretación**. Una mecha o una envolvente no permiten medir por sí solas cuántas órdenes institucionales quedan pendientes.

Order Block tampoco es lo mismo que *order book*. En el contexto de futuros, CME describe la profundidad del libro mediante las cantidades ofrecidas a compra y venta, junto con otros indicadores de liquidez. Una zona dibujada a partir de velas no proporciona esos datos: esta última distinción es una inferencia metodológica, no una validación de la estrategia. [CME: cómo se mide la liquidez](https://www.cmegroup.com/education/articles-and-reports/how-traders-measure-liquidity).

**Ejemplo:** «El precio rechazó niveles inferiores y luego avanzó» describe lo visible. «Aquí quedan exactamente las compras de un banco» añade información que el gráfico no contiene.

**Contraejemplo:** una vela amplia aislada, sin secuencia ni referencia temporal, no basta para justificar el bloque que utiliza esta clase. Primero se estudia dónde aparece y qué sucede después.

## 2. Cómo delimitar la zona sin confundir cuerpo y mecha

La parte 012 insiste en tomar como referencia el cuerpo de la última vela que dejó de caer o subir antes del empuje contrario, no todo el extremo de su mecha. Sin embargo, algunas explicaciones señalan el cierre y la apertura siguiente, o un pequeño rectángulo cuya posición depende de un dibujo ausente. Por eso no convertimos el texto en una regla geométrica universal.

Para los ejercicios adoptaremos una **convención editorial explícita**: la zona será el intervalo completo entre apertura y cierre de la vela de origen elegida. No es un parámetro obligatorio del profesor ni una definición válida para cualquier metodología de Order Blocks.

| Caso ficticio | Apertura | Máximo | Mínimo | Cierre | Cuerpo utilizado como zona |
| --- | --- | --- | --- | --- | --- |
| Origen previo a empuje comprador | 104 | 105 | 99 | 101 | [101; 104] |
| Origen previo a empuje vendedor | 108 | 112 | 107 | 110 | [108; 110] |

En el primer caso, la mecha inferior llega a 99, pero la zona del ejemplo empieza en 101. Eso no elimina el mínimo 99 como referencia estructural. Un rectángulo y un soporte pueden tener límites distintos y seguir siendo útiles para preguntas diferentes.

**Por qué importa:** cambiar de cuerpo a mecha después de conocer el desenlace puede transformar artificialmente un «no visitado» en «visitado». Declara la geometría antes de evaluar el caso y conserva sus límites.

## 3. Primero la formación; después la visita

El origen pertenece a una vela anterior, pero reconocer la secuencia exige observar la respuesta posterior. Distingue la hora de la vela de origen de la hora en la que ya disponías de información suficiente para identificar la zona. Marcarla retrospectivamente no significa que fuera conocida desde su apertura.

Ejemplo didáctico: una vela M15 de 10:00 a 10:15 deja el cuerpo [101; 104]. La vela siguiente termina a las 10:30 y aporta el empuje usado para reconocer la formación. En un ejercicio basado en cierres, no puedes justificar una decisión de las 10:12 usando ese cierre de las 10:30.

Para estudiar el ciclo conservaremos este registro, que es una ayuda editorial y no un sistema automatizado:

| Estado | Qué permite afirmarlo | Qué no significa |
| --- | --- | --- |
| Candidata | Se observa un posible origen, sin completar la secuencia elegida. | Que ya existe una referencia validada. |
| Identificada | Se ha observado el empuje definido para el ejemplo y se han fijado los límites. | Que el precio tiene obligación de regresar. |
| Sin visita posterior registrada | Tras la salida de la zona, los datos revisados no muestran retorno. | Que no hubo visitas durante un hueco de información. |
| Visitada | Un acontecimiento posterior comprobable entra o toca la zona. | Que hubo una compra, venta o ejecución propia. |

La fuente retira la utilidad de un bloque como destino pendiente cuando ha sido tocado, incluso por una mecha. En la adaptación lo llamamos **visitado**, evitando confundirlo con una ruptura estructural. No se reactiva porque el precio vuelva a alejarse. Si aparece otra formación, es otra referencia con su propia hora y límites; no se mueve la antigua para acomodarla al resultado.

En una serie de precios observados y continua, la intersección de una barra posterior con la zona puede servir como criterio declarado de visita. Si solo se conoce el cierre, faltan máximos y mínimos; si hubo un salto sin precios negociados en la zona o datos incompletos, no se inventa el toque. Tampoco se cuenta la vela de origen como un retorno a sí misma.

## 4. Bloque pendiente no equivale a señal de entrada

La fuente advierte contra videos donde se coloca una orden automáticamente al llegar al rectángulo. Su planteamiento requiere contexto, estructura y una señal observada. El propio profesor admite que el precio puede no volver al bloque.

| Pregunta | Referencia que ayuda a responderla |
| --- | --- |
| ¿Qué dirección y obstáculos muestra el escenario? | Tendencia o rango, soportes y resistencias, marco superior. |
| ¿Qué acontecimiento permite estudiar un cambio local? | Test, mínimos o máximos relativos, ruptura de una referencia concreta. |
| ¿Qué zonas anteriores permanecen en el recorrido posible? | Bloques identificados, sin visita posterior, de la secuencia relevante. |
| ¿Existe margen suficiente con el riesgo planteado? | Entrada hipotética, invalidación y primera zona u obstáculo. |

Tras una secuencia bajista, un giro comprador observado permite estudiar como destinos los bloques vendedores que quedaron por encima. Tras un giro vendedor, la lectura puede invertirse. El adjetivo comprador o vendedor describe su formación; no obliga a entrar en ese sentido en cada visita.

**Ejemplo:** hay una zona vendedora pendiente entre 108 y 110. El precio está en 103, pero aún no ha superado su último máximo decreciente. Tenemos un posible destino si cambia la estructura, no una compra ya justificada.

**Contraejemplo:** después de varias caídas, el precio llega a soporte y deja un mínimo más alto. La existencia de un bloque vendedor cercano no basta para vender automáticamente ni para asegurar otro mínimo decreciente. Esto recoge la cautela de la parte 012 frente a entradas tardías en una secuencia madura.

## 5. Ordenar los destinos sin prometer que serán alcanzados

El método consulta los bloques de la secuencia anterior y actualiza el mapa cuando se visitan. Su utilidad principal en estos textos es valorar recorridos y posibles salidas antes de la resistencia o soporte estructural más lejano.

Ejemplo: desde un precio de referencia 103 se estudia un escenario comprador con zona A [108; 110] y zona B [114; 115], ambas conocidas y sin visita. A es la primera zona en ese recorrido. Si el precio llega a 108, se registra la visita a A; B sigue siendo una referencia posterior, pero no se convierte automáticamente en el destino de una nueva operación. Deben revisarse otra vez estructura, obstáculos y riesgo.

Para una aproximación desde abajo, el borde próximo de A es 108; desde arriba sería 110. Elegir borde, centro o extremo opuesto cambia el recorrido y debe declararse. La transcripción no entrega una regla uniforme para ese detalle.

La metáfora del «imán» expresa una expectativa del profesor. No demuestra una fuerza causal, un plazo ni una probabilidad medible. No alcanzar una zona dentro de la ventana observada es un resultado válido; no se alarga la observación hasta encontrar retrospectivamente un acierto.

## 6. Temporalidades: contexto, mapa y ejecución

La parte 013 recorre diario → H1 → M15 → M3 y relata ejecución en M3. La 014 parte del diario, consulta H1 y M15, relata entrada en M15 y usa referencias de H1 para la salida. No son una receta idéntica ni hay que forzar todos los casos a un solo marco.

La relación didáctica es: el marco amplio sitúa el escenario; el intermedio ayuda a ordenar referencias; el menor permite describir una entrada con más detalle. El marco menor no convierte en cerrada una vela superior que sigue formándose.

En la parte 014, el profesor pide esperar al cierre, pero después comenta que la ejecución ocurrió «un poquito antes» de lo señalado. Se conserva esa diferencia: sin video ni registros no podemos certificar una entrada exacta al cierre ni una regla reproducible de anticipación.

**Contraejemplo temporal:** a las 11:36 no puede utilizarse el cierre definitivo de una H1 que termina a las 12:00. Puedes describir su estado provisional, pero no presentarlo como confirmación final ya disponible.

## 7. Fibonacci y riesgo: medir antes de interpretar

Los ejemplos orales mencionan coincidencias con niveles 23, 38, 50 y «74 o 76», pero faltan sus anclajes visibles. No se calcula un precio exacto a partir de un porcentaje aislado ni se corrige silenciosamente «74» a otro valor supuesto.

**Ejemplo numérico independiente:** escala lineal ficticia con 0 % en 100 y 100 % en 110. El precio de la proporción r es `100 + r × (110 − 100)`. El 38,2 % queda en 103,82. Cambiar la orientación cambia el resultado: con 0 % en 110 y 100 % en 100, queda en 106,18. Ninguna de estas escalas se atribuye a las capturas ausentes.

Una coincidencia geométrica no demuestra que dos señales sean estadísticamente independientes ni que deban sumarse sus probabilidades. Sirve para describir la confluencia escogida; validar su rendimiento requiere datos y un protocolo previo.

Para comparar salidas, define `R = |entrada − stop|` por unidad, antes de costes. Una compra ficticia en 103 con stop en 101 y salida planificada en 108 tiene R = 2 y recorrido = 5: 2,5R. Si el stop se amplía a 99 manteniendo la entrada y la salida, R pasa a 4 y la relación a 1,25R. Para la misma cantidad, el riesgo teórico se duplica.

La parte 013 atribuye a un stop más amplio un aumento de probabilidades del 10–15 %. No hay muestra que lo demuestre. Cambiar el stop no equivale a mejorar automáticamente la estrategia; exige recalcular exposición y comprobar el método. El apalancamiento no sustituye ese cálculo.

Además, el precio de activación de una orden stop no garantiza su precio de ejecución, y una stop-limit puede quedar sin ejecutar. FINRA explica estos riesgos para acciones; la referencia no define las condiciones de todos los instrumentos del curso. [FINRA: riesgos de órdenes stop](https://www.finra.org/investors/insights/stop-orders-factors-consider-during-volatile-markets).

## 8. Lectura de los tres casos recibidos

### Caso A · Teoría aplicada a USD/JPY — fuente 012

El profesor identifica zonas de origen en la secuencia previa, consulta M15 y explica una W con un pequeño engaño. Estudia una ruptura como posible entrada y los bloques vendedores pendientes como destinos de un avance comprador. Al tocar uno, deja de tratarlo como objetivo pendiente y busca otras referencias.

La enseñanza es el orden de decisiones: formación conocida → contexto → cambio local observado → mapa de destinos → visita registrada. No es «dibujar todos los bloques y comprar cada toque». Las figuras, precios y ejecución exacta no están disponibles en el texto.

### Caso B · Entrada M3 y salida antes de prolongar el recorrido — fuente 013

El relato empieza con un contexto diario mixto: tendencia amplia alcista, zona intermedia y máximos recientes decrecientes. El autor explica por qué una compra local puede parecerle razonable y, a la vez, por qué no le convence mantenerla mucho tiempo. H1 y M15 aportan referencias; en M3 describe mínimos relativos y una vela póker.

Se distinguen dos decisiones: aceptar el escenario local y limitar el recorrido buscado. No se asigna un activo o fecha que el texto no identifica de forma inequívoca. Sus comentarios políticos, sobre inflación y tipos son contexto histórico no fechado; no se trasladan a reglas vigentes ni a una promesa de subidas tras elecciones. Las remisiones a otros módulos de engaños y stops no acreditan que esos contenidos hayan sido recibidos aquí.

### Caso C · USD/JPY, operación de varias horas — fuente 014

El profesor parte de un rango diario y un soporte; describe tests, un mínimo inferior y después uno más alto. Consulta H1 y M15, relaciona la reacción con una vela póker y sitúa la salida en bloques pendientes de H1, con una coincidencia Fibonacci relatada. Explica que prefiere no prolongar el recorrido hasta referencias más lejanas.

El texto incluye cansancio y estrés como motivos personales. Se conserva la enseñanza de reconocer límites, sin convertir «si parece clara, opera aunque estés cansado» en una instrucción del curso. Abstenerse también es una decisión posible.

Por último, aprender de una pérdida no elimina la pérdida monetaria. Una revisión profesional distingue aprendizaje, calidad de la decisión y resultado económico; contar aciertos sin considerar magnitud de pérdidas y costes es insuficiente. No se reproduce la afirmación de que siempre se está ganando.

## 9. Laboratorio de comprensión

Usa notas y calculadora. Cada ejercicio contiene sus datos; ninguno exige ver una captura pendiente. Resuelve antes de consultar las soluciones.

### Ejercicio 1 · Delimitar y esperar

**Datos:** vela de origen O = 104, H = 105, L = 99, C = 101. Convención: cuerpo completo. El empuje elegido para reconocer la formación solo termina en la vela siguiente.

**Pasos:** delimita la zona, distingue su mínimo del mínimo de la vela e indica si ya estaba confirmada al terminar la vela de origen.

**Entrega:** intervalo, dos mínimos y una justificación temporal.

### Ejercicio 2 · La visita no se borra

**Datos:** zona ya identificada [101; 104], precio alejado por encima. Sin huecos en la observación, tres barras posteriores tienen rangos A [104,50; 107], B [103,50; 106], C [105; 108]. B cierra en 105,50. Convención: tocar cualquier parte de la zona cuenta como visita.

**Pasos:** indica la primera visita, explica por qué el cierre de B no la elimina y asigna el estado después de C.

**Entrega:** primer acontecimiento y estado final. No evalúes ganancias.

### Ejercicio 3 · Falta información

**Datos:** zona [108; 110]. Solo se conservan dos cierres: 107 y 111. No hay máximos, mínimos ni secuencia negociada; pudo existir un salto.

**Pasos:** decide si puede demostrarse un toque, una entrada o una orden ejecutada.

**Entrega:** tres conclusiones y el dato necesario para resolver la visita.

### Ejercicio 4 · Ordenar no es adivinar

**Datos:** escenario comprador hipotético desde 103. A [108; 110] no visitada, B [114; 115] no visitada y C [105; 106] ya visitada. Hay resistencia en 107,50. No se informa una nueva señal de entrada.

**Pasos:** identifica el primer bloque pendiente en dirección ascendente y el obstáculo previo; explica si basta para comprar.

**Entrega:** bloque, obstáculo y decisión justificada con la información disponible.

### Ejercicio 5 · Dos stops, mismo destino

**Datos:** instrumento ficticio lineal, valor monetario de una unidad de precio por unidad de posición = 1. Compra 103, objetivo 108, stop A = 101 o B = 99. Presupuesto de pérdida teórica 20; unidades enteras; sin comisiones ni deslizamiento.

**Pasos:** calcula distancia de riesgo, relación recorrido/riesgo y cantidad máxima para cada stop. Explica qué no demuestra esa comparación.

**Entrega:** tabla de dos filas. No mantengas la misma cantidad después de ampliar el stop.

### Ejercicio 6 · Una hora que no ha terminado

**Datos:** una H1 abre a las 11:00 y termina a las 12:00. Una decisión M3 ocurre a las 11:36. El alumno justifica la decisión con el cierre H1 de las 12:00, que fue comprador.

**Pasos:** identifica el dato futuro y corrige la justificación sin inventar otra señal.

**Entrega:** dos frases sobre qué podía saberse a las 11:36.

### Ejercicio 7 · Declarar anclajes

**Datos:** escala 0 % = 100 y 100 % = 110. Zona [103,70; 104]. Después inviertes la escala: 0 % = 110 y 100 % = 100.

**Pasos:** calcula 38,2 % en ambas orientaciones e indica en cuál cae dentro de la zona. Explica si eso demuestra rentabilidad.

**Entrega:** dos precios, una comparación y un límite de la conclusión.

### Ejercicio 8 · No completar la captura con imaginación

**Datos:** un relato dice «entré un poquito antes» y «salí en el bloque H1», sin precios, fecha ni registros. Otro comentario dice que ampliar el stop añade 10–15 % de probabilidad de acierto.

**Pasos:** distingue lo que el autor relata de lo que puedes verificar; enumera qué haría falta para repetir y evaluar el caso.

**Entrega:** dos afirmaciones que no puedes certificar y al menos tres datos faltantes.

## Soluciones razonadas

### Solución 1

Zona [101; 104]. Su borde inferior es 101; el mínimo de la vela es 99. Al cierre de la vela de origen todavía falta observar el empuje requerido: no se puede retrotraer la confirmación de la siguiente vela.

### Solución 2

A no toca; B sí, porque su mínimo 103,50 entra en [101; 104]. Cerrar por encima no borra la visita. Después de C sigue visitada: el estado se basa en el acontecimiento registrado, no en la distancia actual del precio.

### Solución 3

No se puede demostrar visita, entrada ni ejecución propia. Cierres a ambos lados no prueban precios negociados dentro del intervalo. Se necesitan datos de la trayectoria y su continuidad para la visita; una ejecución requiere además los registros de la orden correspondiente.

### Solución 4

A es el primer bloque pendiente ascendente. La resistencia 107,50 está antes de su borde 108; C no vuelve a ser pendiente. El mapa no basta para comprar: no se ha aportado una señal nueva ni un plan de riesgo. El obstáculo tampoco garantiza que el precio vaya a girar allí.

### Solución 5

| Stop | Distancia de riesgo | Recorrido al objetivo | Relación | Cantidad máxima | Pérdida teórica presupuestada |
| --- | --- | --- | --- | --- | --- |
| 101 | 2 | 5 | 2,5R | 10 | 20 |
| 99 | 4 | 5 | 1,25R | 5 | 20 |

La cantidad resulta de dividir 20 entre la distancia de riesgo y redondear hacia abajo a unidades enteras. Conservar 10 unidades en el segundo caso elevaría la pérdida teórica a 40. Ninguna fila demuestra una probabilidad de acierto ni limita pérdidas reales con saltos, costes o ejecución desfavorable. No es una fórmula directamente aplicable a contratos o pares de divisas sin su valor por punto y conversión correspondientes.

### Solución 6

A las 11:36 todavía no existe el cierre H1 de las 12:00. Puede analizarse la información conocida hasta las 11:36 y el estado provisional de la H1, pero no justificar la decisión usando su resultado final como si ya estuviera cerrado.

### Solución 7

Primera escala: 100 + 0,382 × 10 = 103,82, dentro de [103,70; 104]. Escala invertida: 110 − 0,382 × 10 = 106,18, fuera. La coincidencia depende de anclajes declarados; no valida una señal ni demuestra rentabilidad.

### Solución 8

No se certifica una entrada exacta después de la confirmación, ni el incremento de probabilidad alegado. Faltan, entre otros: instrumento y fecha/huso horario, capturas o datos originales, hora de disponibilidad de cada referencia, precios y registros de órdenes, reglas de selección, muestra completa y resultados con costes. Un caso relatado no sustituye esas comprobaciones.

## Cierre y transición

La secuencia de estudio es **contexto → formación observada → zona delimitada → mapa de destinos → visita registrada → revisión del riesgo y del resultado**. Un bloque no es una orden, y una visita no es una ejecución.

En esta etapa, el siguiente tema previsto era **7. Velas Profesionales**. La entrega posterior confirmó ese título de presentación y está documentada por separado; «Velas vendedoras» es el nombre de su fuente principal. No se recupera el módulo excluido de rutinas. El desarrollo escrito y sus ocho ejercicios están integrados en `/curso/modulo-6`, con nueve imágenes aportadas comentadas y seis láminas editoriales nuevas. No se incorporan videos ni se modifica el progreso de la plataforma. Las imágenes esquemáticas no sustituyen las capturas originales de las operaciones relatadas.
