export type ModuleSevenOriginalStatus = 'review' | 'reference' | 'buyer';

export type ModuleSevenOriginalNote = {
  title: string;
  alt: string;
  note: string;
  status: ModuleSevenOriginalStatus;
};

export const moduleSevenOriginalAssignments: Record<string, string[]> = {
  contexto: [
    'm7-mapa-trabajo-completo',
    'm7-giros-v-estructuras',
    'm7-procesos-absorcion',
  ],
  'cuatro-formas': [
    'm7-patrones-vendedores-anatomia',
    'm7-patrones-compradores-anatomia',
  ],
  'base-m': [
    'm7-patrones-m-variantes',
    'm7-patrones-w-variantes',
    'm7-vv-1-ondas-base-m',
  ],
  'vela-activa': [
    'm7-anatomia-interna-velas-15m',
    'm7-vc-1-ondas-patron-1',
  ],
  continuacion: [
    'm7-vv-4-continuacion-m2',
    'm7-vv-5-martillo-continuacion',
    'm7-vc-5-continuacion-fibonacci',
  ],
  'martillo-contexto': [
    'm7-vv-2-patron-tipo-2-giro',
    'm7-vc-2-patron-tipo-2-giro',
    'm7-vc-4-giro-v-excepcion',
    'm7-vc-3-despejando-dudas-w2',
  ],
  rangos: [
    'm7-vv-3-retroceso-poc',
    'm7-vv-6-rango-arriba',
  ],
  integracion: ['m7-vc-6-apertura-mercado'],
};

export const moduleSevenOriginalNotes: Record<string, ModuleSevenOriginalNote> = {
  'm7-mapa-trabajo-completo': {
    title: 'Mapa de trabajo: extremos y zona media',
    alt: 'Esquema aportado con resistencia, soporte, estructuras M y W y una zona media rotulada POC.',
    note: 'Úsala para ordenar extremos y evitar la zona media. La línea central solo puede llamarse POC si procede de un perfil medido; en este dibujo es una referencia geométrica, no evidencia de volumen negociado.',
    status: 'review',
  },
  'm7-giros-v-estructuras': {
    title: 'Giros directos en V',
    alt: 'Comparación aportada de un giro bajista en resistencia y un giro alcista en soporte mediante velas y líneas.',
    note: 'La V describe una reacción rápida del precio. El dibujo no identifica compras o ventas profesionales ni convierte el giro en una entrada: todavía hacen falta nivel, momento, invalidación y espacio disponible.',
    status: 'review',
  },
  'm7-procesos-absorcion': {
    title: 'Hipótesis de absorción',
    alt: 'Lámina aportada que compara dos velas junto a resistencia y soporte y las interpreta como procesos de absorción.',
    note: 'Con OHLC solo observas rango, cuerpo y mechas. “Absorción institucional” es la interpretación del método; sin libro de órdenes, volumen u order flow no puede atribuirse el movimiento a participantes concretos.',
    status: 'review',
  },
  'm7-patrones-vendedores-anatomia': {
    title: 'Anatomía de cuatro formas vendedoras',
    alt: 'Cuatro velas aportadas con distintas combinaciones de cuerpo, mecha superior, mecha inferior y ubicación del cierre.',
    note: 'Sirve como catálogo visual de la nomenclatura del profesor. El material no fija proporciones numéricas universales: clasifica provisionalmente y confirma con zona y secuencia posterior.',
    status: 'reference',
  },
  'm7-patrones-compradores-anatomia': {
    title: 'Contraste: formas compradoras',
    alt: 'Tres configuraciones de velas compradoras aportadas para comparar cierres en mínimos y mechas inferiores largas.',
    note: 'Complemento comprador para comparar simetrías, no una segunda lección de entradas. Una silueta parecida cambia de lectura según recorrido, soporte, resistencia y respuesta posterior.',
    status: 'buyer',
  },
  'm7-patrones-m-variantes': {
    title: 'Tres geometrías de la M',
    alt: 'Comparación aportada de doble techo, segundo máximo más alto y segundo máximo más bajo.',
    note: 'La lámina resume correctamente tres geometrías. En la segunda, superar el máximo solo observa una perforación; llamarla “sweep” o engaño requiere una definición previa y una respuesta posterior.',
    status: 'review',
  },
  'm7-patrones-w-variantes': {
    title: 'Contraste: tres geometrías de la W',
    alt: 'Comparación aportada de doble suelo, segundo mínimo más bajo y segundo mínimo creciente.',
    note: 'Se incluye como espejo comprador para localizar base y extremos. “Trampa”, “fortaleza” o sacudida son hipótesis hasta que se especifica el nivel, la secuencia y la invalidación.',
    status: 'buyer',
  },
  'm7-vv-1-ondas-base-m': {
    title: 'Base M: cierre, vela activa y retroceso',
    alt: 'Tres variantes aportadas para ejecutar una base M mediante vela cerrada, vela activa o pullback al cincuenta por ciento.',
    note: 'Las tres rutas no son equivalentes: cierre aporta más información, intravela evita esperar pero puede cambiar, y 50% exige anclas definidas. “Óptima” no significa resultado garantizado.',
    status: 'review',
  },
  'm7-anatomia-interna-velas-15m': {
    title: 'Fraccionamiento interno de M15',
    alt: 'Vela M15 aportada junto a una trayectoria interna y bloques de cinco minutos con reglas temporales del autor.',
    note: 'La división 0–5, 5–10 y 10–15 minutos es un filtro del autor, no una propiedad estadística universal. La trayectoria interna tampoco puede reconstruirse desde un OHLC M15 terminado.',
    status: 'review',
  },
  'm7-vc-1-ondas-patron-1': {
    title: 'Contraste comprador: tres tiempos de lectura',
    alt: 'Tres paneles aportados con base compradora en vela terminada, vela activa y retesteo posterior del cincuenta por ciento.',
    note: 'Comparación compradora para practicar el orden temporal. “Confirmación” aquí es local y cada alternativa usa información distinta; el 50% debe calcularse con anclas conocidas.',
    status: 'buyer',
  },
  'm7-vv-4-continuacion-m2': {
    title: 'Continuación bajista tras una perforación',
    alt: 'Escenario aportado con soporte roto, recuperación por encima, vela vendedora y proyección bajista.',
    note: 'El máximo que perfora la resistencia es un hecho observable; “engaño” y la proyección son interpretaciones. Exige la pérdida posterior del mínimo local antes de describir continuación.',
    status: 'review',
  },
  'm7-vv-5-martillo-continuacion': {
    title: 'Martillo de continuación y Fibonacci',
    alt: 'Esquema aportado de un retroceso ascendente hasta niveles 38,2 y 50 por ciento seguido de una vela bajista.',
    note: 'Comprueba siempre las anclas 0% y 100%. La etiqueta “tipo 4” pertenece al sistema del autor y el tramo descendente es una proyección didáctica, no una consecuencia garantizada del martillo.',
    status: 'review',
  },
  'm7-vc-5-continuacion-fibonacci': {
    title: 'Contraste comprador en retroceso Fibonacci',
    alt: 'Velas aportadas que retroceden desde 90 hacia niveles 38,2, 50 y 61,8 por ciento antes de una reacción alcista.',
    note: 'Complemento comprador. Los niveles mostrados son coherentes con el tramo ficticio 10–90, pero “alta probabilidad” no viene acompañada por una muestra; úsalo como ejercicio de confluencia.',
    status: 'buyer',
  },
  'm7-vv-2-patron-tipo-2-giro': {
    title: 'Tipo 2 vendedor en resistencia',
    alt: 'Velas aportadas con mecha superior extensa en resistencia, gatillo sell stop y una caída dibujada.',
    note: 'La mecha registra rechazo, no quién absorbió compras. Las reglas de un tick y el “desplome esperado” son parámetros ilustrativos: deben validarse por instrumento, costes y ejecución.',
    status: 'review',
  },
  'm7-vc-2-patron-tipo-2-giro': {
    title: 'Contraste: tipo 2 comprador en soporte',
    alt: 'Velas aportadas con mecha inferior extensa, nivel de soporte, gatillo buy stop y stop de un tick.',
    note: 'Contraste comprador para observar la simetría. La mecha no prueba una intervención institucional; buy stop y stop de un tick son ejemplos y pueden sufrir deslizamiento o quedar mal dimensionados.',
    status: 'buyer',
  },
  'm7-vc-4-giro-v-excepcion': {
    title: 'Giro V y excepción por recorrido',
    alt: 'Dos paneles aportados que comparan una reacción compradora cerca de soporte con una expansión de mayor recorrido.',
    note: 'La idea útil es comparar distancia al soporte e invalidación antes de participar. “Seguro”, “óptimo” y “precio caro” son juicios del método; cuantifica riesgo y objetivo en vez de asumirlos.',
    status: 'buyer',
  },
  'm7-vc-3-despejando-dudas-w2': {
    title: 'W con y sin perforación del soporte',
    alt: 'Comparación aportada de una W con segundo mínimo inferior y un doble suelo clásico sin perforación.',
    note: 'La izquierda barre un nivel y la derecha no, pero no existe una probabilidad calculada en la lámina. La atribución institucional y la superioridad del primer escenario necesitan una muestra externa.',
    status: 'buyer',
  },
  'm7-vv-3-retroceso-poc': {
    title: 'Retorno a una zona rotulada POC',
    alt: 'Esquema aportado de una secuencia bajista que retorna a una franja horizontal y deja una vela roja.',
    note: 'La franja funciona como nivel del escenario. Solo es POC si procede de un perfil de volumen medido; el precio por sí solo no demuestra intercambio institucional ni order flow.',
    status: 'review',
  },
  'm7-vv-6-rango-arriba': {
    title: 'Rango superior y ruptura bajista',
    alt: 'Esquema aportado de distribución con techo, piso, línea media, falsa ruptura y vela de reventa.',
    note: 'El rango, la salida y el retorno son observables. El tiempo de 6–8 minutos, la etiqueta POC y la entrada corta son criterios del ejemplo; no constituyen una regularidad demostrada.',
    status: 'review',
  },
  'm7-vc-6-apertura-mercado': {
    title: 'Contraste: vela de apertura y microestructura',
    alt: 'Dos paneles aportados con una gran vela de apertura M15 y una trayectoria interna que retrocede al cincuenta por ciento.',
    note: 'Complemento comprador de integración. El gráfico no incluye volumen aunque lo mencione; la mitad de la vela es una referencia geométrica y la trayectoria M1/M3 exige datos reales de menor escala.',
    status: 'buyer',
  },
};
