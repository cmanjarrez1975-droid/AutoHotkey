# Trazabilidad del módulo 5. Velas póker

Fecha: 2026-08-28. Base inicial: `8ed289e`, rama `codex/academy-v02`, árbol limpio. Aplicación 0.2.3 conservada. Esta recepción archiva las fuentes y prepara el [desarrollo editorial](005-modulo-05-velas-poker-borrador.md); no modifica código, catálogo, progreso, evaluaciones, multimedia ni datos del usuario.

## Inventario exacto

| ID | Adjunto | Copia conservada | Bytes | Líneas físicas | Líneas no vacías |
| --- | --- | --- | --- | --- | --- |
| 008 | `c9e1d43d-9bef-4367-881e-7348a5624eee` | [Teoría compradora](fuentes/008-modulo-05-poker-parte-01-original.txt) | 57016 | 1773 | 887 |
| 009 | `f5d90fce-f5f7-4def-b314-0e31d9a94ed2` | [Aplicación compradora](fuentes/009-modulo-05-poker-parte-02-original.txt) | 44056 | 1473 | 737 |
| 010 | `cf7e5942-3282-4246-84e5-71af988992b9` | [Duplicado conservado](fuentes/010-modulo-05-poker-parte-02-duplicado-original.txt) | 44056 | 1473 | 737 |
| 011 | `5caff8a5-eb14-4cab-b2e5-811fefc0050c` | [Prácticas vendedoras](fuentes/011-modulo-05-poker-practicas-original.txt) | 27039 | 923 | 462 |

SHA-256 de 008: `67a20d1e03196d80889252c036354dc995df5967555c2a92b1d8a4693820e819`.

SHA-256 de 009 y 010: `b725aeb9289e09b8f66fd2b98bc47fc3d3be1260558e436c458e2f71608cbf9f`.

SHA-256 de 011: `ee7e620443336a965e528c6736f00db1ba19cb66408d2d3f00f43ba72ab3d5f7`.

009 y 010 son idénticos byte por byte. Se archivan ambos, pero se cuenta un solo contenido. Las tres partes únicas tienen despedida. Eso no acredita una colección completa: 009 se identifica como aplicación compradora; no contiene la explicación teórica vendedora anunciada al final de 008. La entrega 011 comienza con prácticas y al final remite a un video adicional. No se inventan duración, marcas de video ni número total de clases.

Los originales se guardan sin corregir errores, puntuación o saltos de línea. La regla existente de `.gitattributes` conserva los archivos fuente sin normalización de texto.

## Manual complementario

Se renderizaron localmente las páginas 75–111 del [manual original](../../public/course-originals/01-APRENDE_NUEVAS_ESTRATEGIAS_TRADING-1-.pdf). Se inspeccionaron visualmente las páginas completas 76–89, 91–97, 99–107 y 110–111. Las portadas 79, 88, 93, 99 y 104 no se cuentan como casos. Los renders de revisión quedan en la carpeta ignorada `.sites-runtime/module-five-review`; no se distribuyen como nuevas imágenes del curso ni se altera el PDF.

| Páginas | Uso |
| --- | --- |
| 76–78 | Temario, metáfora y rasgos generales; la promesa de continuidad se trata como hipótesis. |
| 80–82 | Anatomía compradora y cautela ante mecha superior. |
| 83–87 | Secuencia, relación entre marcos temporales, W, recompra y empuje. |
| 89 | Mapa de ubicaciones, incluyendo zonas donde el autor evita nuevas entradas. |
| 91–92 | Tick, vigencia de la candidata, dos stops y dos construcciones de Fibonacci. |
| 94–97 | Cuatro casos compradores; capturas anotadas, no registros de ejecución. |
| 100–102 | Anatomía vendedora y mecha inferior. Complemento, no transcripción recibida. |
| 103, 105–107 | Distribución, mapa, reventa y empuje; contraste de rótulos inconsistentes. |
| 110–111 | Dos casos vendedores. |

## Mapa de las transcripciones

Los intervalos siguientes son **líneas físicas del archivo**, contadas desde 1 e incluyendo las líneas vacías. No son tiempos ni la numeración de líneas no vacías utilizada en algunas trazabilidades anteriores.

| Fuente y líneas | Contenido | Desarrollo |
| --- | --- | --- |
| 008: 1–191 | Nombre del concepto y metáfora del póker. | Bloque 1; no enseñar riesgo total ni atribución de participantes. |
| 008: 193–395 | Cuerpo, mechas y ubicación al final de impulsos. | Bloques 2 y 4; contexto y anatomía separados. |
| 008: 397–695 | Interpretación de órdenes, recompra y variantes de mechas. | Bloques 1–2; excluir inferencias de microestructura no demostradas. |
| 008: 697–893 | Frenada, test, absorción y lectura entre temporalidades. | Bloques 3 y 9. |
| 008: 899–1159 | Desarrollo de W, volumen y test. | Bloque 3; no imponer una única variante ni volumen obligatorio. |
| 008: 1161–1465 | Ubicaciones y precauciones tras impulsos. | Bloque 4. |
| 008: 1467–1563 | Reacción insuficiente y espera de otra vela. | Bloque 2; no confirmar fuerza antes del acontecimiento. |
| 008: 1565–1773 | Mapa general y anuncio de velas vendedoras. | Bloque 4 y estado de fuentes. |
| 009: 1–73 | Entrada, stop, recorrido y cancelación si la siguiente vela no activa. | Bloques 6–7. |
| 009: 75–409 | Proyección desde W, alternativas de stop y pausas. | Bloques 7–8; separar mediciones y riesgos. |
| 009: 411–795 | Primer caso comprador, obstáculos y fallos. | Caso 1; no deducir estadísticas de los comentarios. |
| 009: 795–1041 | Segundo caso, cancelaciones, microtendencia y stops. | Caso 2; ejercicios 2–3. |
| 009: 1043–1225 | Tercer caso y tolerancia contextual a mechas pequeñas. | Caso 3; no inventar un umbral cuantitativo. |
| 009: 1229–1473 | Sesión europea, operación relatada y cierre de aplicación compradora. | Caso 4 y alcance. |
| 011: 1–291 | Práctica vendedora; vela tardía que no completa el recorrido. | Bloque 5 y caso vendedor 1; conservar contraejemplo. |
| 011: 293–447 | Referencias, giros, rangos y alternativa de esperar. | Bloques 4–5. |
| 011: 449–719 | Segundo caso, M15/M3 y cambios de contexto. | Bloque 9 y caso vendedor 2. |
| 011: 721–857 | Oscilación atribuida tentativamente a causas no identificadas y nuevas estructuras. | Caso vendedor 2; no afirmar noticias, HFT o trayectoria futura. |
| 011: 877–923 | Cierre y referencia a video de prácticas. | Pendiente audiovisual explícito. |

## Correcciones editoriales y límites

| Problema | Tratamiento |
| --- | --- |
| 010 repite 009. | No se inventa una tercera clase teórica ni se duplica el desarrollo. |
| La numeración antigua llama módulo 4 a Velas póker. | El nuevo número es 5, expresamente indicado por el usuario. |
| «Un día o dos» al describir el stop. | Uno o dos ticks, confirmado por la p. 91. Original intacto. |
| «Base» de una W. | Se identifica como máximo intermedio/línea superior de confirmación cuando así se utiliza; no como mínimo absoluto. |
| P. 87 dice que la demanda está lista dentro de una explicación de debilidad. | Se interpreta como respuesta todavía insuficiente, contrastando el título y 008: 1497–1523. |
| P. 86 y p. 106 usan «recompensa/recompra» en títulos inconsistentes. | Compras: recompra; ventas: reventa, según diagramas y contexto. |
| P. 103 intercambia rótulos de empuje y recompra en distribución. | Priorizar acontecimiento: reacción después del test y ruptura posterior; contraste pp. 105–107. |
| P. 101 llama empuje a una variante que también describe como no necesariamente de ruptura. | No crear una regla automática por mecha; clasificar su función por ubicación y evento. |
| 009: 1047 mezcla comprador con «envolvente bajista». | No asignar una señal compradora por esa frase aislada; conservar la ambigüedad en la fuente. |
| El cuerpo, el rango y 1R se usan con poca separación. | Definirlos y calcularlos por separado. Los ejemplos numéricos declaran su propia convención. |
| La p. 91 redacta el nivel comprador/vendedor con dirección ambigua. | Compra sobre máximo y venta bajo mínimo, en coherencia con 009 y los esquemas direccionales. |
| Afirmaciones de «control definitivo», absorción total o continuación muy probable. | Describirlas como interpretación del método, sin garantía ni probabilidad inventada. |
| POC, iceberg, órdenes e identidad institucional inferidos del gráfico. | No verificables con OHLC solo; no presentar las simplificaciones verbales como definiciones técnicas. |
| Flechas intravela y aciertos vistos después del hecho. | Explicar límites de OHLC, momento de cierre y sesgo de anticipación. |
| Diferentes anclajes de Fibonacci. | Separar proyección 100/61,8 de retroceso de un impulso ya conocido. |

## Complementos editoriales explícitos

Las fórmulas OHLC, los estados de candidata/pendiente/activada/caducada, los ejemplos de precios, los ocho ejercicios y sus soluciones son desarrollos didácticos. No se presentan como resultados reales del profesor ni como reglas adicionales recibidas.

La distinción de órdenes se contrastó el 2026-08-28 con [Investor.gov: Stop, Stop-Limit, and Trailing Stop Orders](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15). Se limita a explicar la diferencia entre activación, restricción de precio y ejecución; es una fuente sobre acciones, no una validación de Velas póker ni de todos los mercados mencionados en el curso.

## Pendientes que permanecen abiertos

1. Transcripción de la teoría específica de velas vendedoras. Las páginas 100–107 aportan un complemento identificado, no la reemplazan como archivo recibido.
2. Video de prácticas adicional anunciado, y cualquier duración o división original de clases no acreditada por los adjuntos.
3. Umbrales de cuerpo amplio, tolerancia de mechas y comparación de volumen: no definidos numéricamente.
4. Convención uniforme de proyección de amplitud, elección entre stops y reglas completas para adiciones o gestión de una posición activada.
5. Datos de mercado y ejecuciones para probar rendimiento, costes, deslizamientos y orden intrabar. Una captura anotada no basta.
La entrega posterior de imágenes resuelve el pendiente visual: 11 originales y 6 láminas nuevas están integrados en `/curso/modulo-5`. Véase el [registro visual](005-modulo-05-integracion-visual.md). Los cinco pendientes anteriores permanecen abiertos.

## Comprobación de la recepción documental inicial

Verificación terminada: las cuatro copias coinciden byte por byte con sus adjuntos; hashes, tamaños y recuentos de líneas comprobados; duplicado 009/010 confirmado. Los 127 enlaces locales de la documentación de reconstrucción tienen destino existente. Se comprobaron ocho ejercicios y ocho soluciones, ausencia de caracteres de sustitución y cálculos de rango, riesgo y Fibonacci con aritmética decimal.

En aquella recepción documental: `npm run test:unit`, 74 pruebas aprobadas antes y después de editar, sin fallos. `git diff --check`, sin errores; Git advierte únicamente la normalización habitual LF/CRLF del registro Markdown, no de las transcripciones, cuyo atributo `text` está desactivado. Entonces no se agregaron tests de aplicación ni se recompiló o publicó. La integración posterior y sus comprobaciones se registran por separado en el registro visual.
