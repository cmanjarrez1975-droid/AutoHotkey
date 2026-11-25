# Trazabilidad de Order Block · módulo 6 de la secuencia nueva

Fecha de recepción: 2026-08-28. Etiqueta original de los textos: **«Modulo 5 Order Block»**. La entrega posterior de nueve imágenes pide expresamente integrarlas en el **módulo 6** y confirma la numeración nueva. Velas póker permanece como módulo 5. Se conserva la etiqueta anterior como antecedente, no como una instrucción de reemplazar ese módulo. [Desarrollo escrito](006-modulo-06-order-block-borrador.md) · [Inventario visual](006-modulo-06-integracion-visual.md).

Base Git: `8ed289e`, rama `codex/academy-v02`, aplicación 0.2.3. El árbol ya contenía la integración y documentación del módulo 5 sin commit. Esta recepción conserva ese trabajo y añade únicamente fuentes y documentos. No altera frontend, catálogo, evaluaciones, IDs, progreso ni base de datos.

## Inventario exacto

| ID | Adjunto | Copia | Bytes | Líneas físicas | No vacías |
| --- | --- | --- | --- | --- | --- |
| 012 | `a18ec996-34cf-4e71-b00b-641ebb767a09` | [Teoría y práctica](fuentes/012-modulo-06-order-block-teoria-practica-original.txt) | 25808 | 963 | 482 |
| 013 | `b69a77b1-15f2-4767-b44f-5ea702502f2d` | [Aplicación con ejecución M3](fuentes/013-modulo-06-order-block-aplicacion-m3-original.txt) | 24962 | 857 | 429 |
| 014 | `dd1d9628-3058-4d14-ab2c-6b8d9d49f055` | [Aplicación USD/JPY](fuentes/014-modulo-06-order-block-aplicacion-usdjpy-original.txt) | 20429 | 717 | 359 |

SHA-256:

- 012: `2e207e1654b10870ab2d0384c5d903a074b7bca0865196cfecef892494214527`.
- 013: `90448b0972bcf7d8ae7b584a33782e486b3d59731d269daa3b8400767a3ffa9e`.
- 014: `cd7c7e3b24c62089612afee107817400f963c5ae44f08876a4d87ecc3927e17a`.

Total: **71.199 bytes**. Los tres archivos son distintos, se leyeron completos y tienen despedida. Se copiaron byte por byte sin corregir texto o saltos de línea; `.gitattributes` ya los conserva como binarios. Los nombres de archivo son etiquetas editoriales, no títulos oficiales ni fechas de las sesiones.

012 identifica dólar/yen y M15 en su práctica. 013 relata una operación compradora ejecutada en M3; no se le atribuye un instrumento inequívoco que el texto no identifica. 014 identifica USD/JPY, entrada M15 y referencias H1, con una operación de varias horas. No se deduce que los casos sean de una misma fecha ni que tres transcripciones equivalgan al total de videos del módulo.

## Mapa de lectura

Los intervalos son líneas físicas, contando vacías desde 1; no son tiempos del video. Son bloques de localización, no citas literales.

| Fuente y líneas | Contenido | Tratamiento |
| --- | --- | --- |
| 012: 1–131 | Definición atribuida a órdenes profesionales, absorción y empuje. | Bloque 1: observar precios no identifica participantes. |
| 012: 133–163 | Referencia al cuerpo y distinción con soporte/resistencia. | Bloque 2; delimitar con convención explícita por falta de dibujo. |
| 012: 165–317 | Contexto, retorno no obligatorio, utilidad y pérdida de utilidad al toque. | Bloques 3–5; estado de visita y ausencia de garantía. |
| 012: 319–381 | Destinos sucesivos y coincidencias con Fibonacci. | Bloques 5 y 7; no inventar anclajes. |
| 012: 383–475 | Formaciones bajistas y advertencia sobre ventas tardías. | Bloques 2 y 4; contexto antes de tocar una zona. |
| 012: 477–533 | Bloques de secuencia anterior, recorrido y cambios de marco. | Bloques 5–6; no automatizar la ejecución. |
| 012: 535–693 | Inicio de práctica USD/JPY, M15 y referencias visitadas. | Caso A. |
| 012: 695–789 | Bloque para salidas, soporte/resistencia para otra función; retirada de referencias. | Bloques 3–5. |
| 012: 791–963 | Nuevas formaciones, actualización del mapa y cierre. | Caso A; una zona nueva no mueve ni reactiva la antigua. |
| 013: 1–197 | Operación M3, contexto diario, comentarios políticos y macroeconómicos. | Caso B; separar análisis relatado de afirmaciones generales no verificadas. |
| 013: 199–359 | H1, escalas Fibonacci, zonas y remisiones a otros módulos. | Bloques 6–7; referencias faltantes identificadas. |
| 013: 361–565 | Tests, engaños, cambios locales y cautela por contexto superior. | Caso B; una compra local no equivale a mantener sin límite. |
| 013: 567–689 | Detalle M3, mínimos y vela póker; comparación con criptomonedas. | Caso B; no generalizar una ejecución a todos los activos. |
| 013: 691–747 | Dos stops, presunto aumento de probabilidad y apalancamiento. | Bloque 7; recalcular riesgo sin adoptar el 10–15 %. |
| 013: 749–857 | Referencias pendientes y cierre de explicación. | Caso B; no certificar ejecuciones ni objetivos con precios ausentes. |
| 014: 1–249 | USD/JPY, diario, H1, M15, tests y necesidad de cierre. | Caso C y bloque 6. |
| 014: 251–347 | Dientes de sierra, entrada M15 descrita y salida en bloque H1. | Caso C; marcar la ejecución «un poquito antes». |
| 014: 349–435 | Coincidencias Fibonacci, resistencia y salida más conservadora. | Bloques 5–7; no inferir anclajes o probabilidades. |
| 014: 437–569 | Circunstancias personales, emociones y reinterpretación de pérdidas. | Caso C; omitir detalles innecesarios y mantener resultado monetario separado. |
| 014: 571–717 | Ejemplos adicionales, bloques pendientes y cierre. | Integración de cambio de estructura y primer destino; no constituye backtest. |

## Decisiones editoriales

| Ambigüedad o afirmación | Resolución |
| --- | --- |
| «Blogs», «orden blogs», «orderbook» en un pasaje sobre zonas. | Normalizar a Order Block cuando el contexto es inequívoco; conservar texto original. Distinguirlo del libro de órdenes real. |
| «Fecha» al discutir la mecha y «stock» en contexto de stops. | No reproducir esos términos como conceptos técnicos distintos. |
| «Giro nube» y porcentajes «74 o 76». | No convertirlos silenciosamente en un patrón o porcentaje exacto; mantener pendientes donde importa. |
| Cuerpo de vela, cierre y apertura siguiente, rectángulo señalado. | No existe geometría universal verificable en el texto. Los ejercicios declaran cuerpo completo como convención editorial. |
| «Invalidado», «liquidado», «validado» después del toque. | En el registro didáctico: visitado y retirado del conjunto de destinos pendientes; distinto de ruptura estructural o ejecución. |
| Trasladar un rectángulo a otra vela. | Registrar otra formación; conservar identidad, límites y visita histórica de la anterior. |
| «Casi tocado». | No equivale a visitado sin criterio y datos; no deducir contacto de posición actual. |
| Alta probabilidad o imán. | Expectativa del profesor, sin frecuencia cuantificada ni plazo garantizado. |
| Una mecha identifica órdenes institucionales o stops de terceros. | Interpretación no verificable con la información recibida. |
| El contexto diario predice la sesión. | Preferencia de análisis del autor; no una predicción garantizada. |
| Elecciones, inflación y tipos en 013. | Contexto histórico sin fecha; no se valida ni se incorpora a una regla macroeconómica actual. |
| Esperar cierre frente a ejecución «un poquito antes» en 014: 301. | Diferencia explícita; sin video y registros no se certifica la cronología. |
| Stop más amplio aporta 10–15 % de aciertos en 013: 709. | No adoptar cifra sin muestra; comparar riesgo y tamaño de posición. |
| Aprender implica no perder dinero. | Separar aprendizaje y pérdida monetaria; no recomendar asumir pérdidas reales para aprender. |
| Referencias a engaños y stops de otro curso. | No importar módulos nuevos ni reintroducir el de rutinas excluido. |

## Complementos y fuentes externas

Las tablas de estado, el criterio de visita declarado, las secuencias temporales, los precios y los ocho ejercicios con soluciones son aportes editoriales. No constituyen automatización de señales, instrucciones para ejecutar operaciones reales ni validación de rendimiento. No se cambian umbrales del método ni se inventan reglas de gestión de posiciones.

Se consultaron el 2026-08-28 dos fuentes primarias para límites técnicos concretos:

- [CME: How Traders Measure Liquidity](https://www.cmegroup.com/education/articles-and-reports/how-traders-measure-liquidity): métricas de liquidez y profundidad en futuros. Permite distinguir datos del libro de una zona anotada; no valida Order Blocks ni define el mercado específico del caso.
- [FINRA: Stop Orders — Factors to Consider During Volatile Markets](https://www.finra.org/investors/insights/stop-orders-factors-consider-during-volatile-markets): diferencia entre precio stop y ejecución, y posibilidad de no ejecución de stop-limit en acciones. No extrapolar reglas particulares de un mercado a todos los instrumentos.

No se usa material antiguo como sustituto de las imágenes ausentes. No se han revisado nuevos PDF ni se les atribuyen páginas complementarias en esta entrega.

## Pendientes

1. Resuelto: la entrega visual confirma Order Block como módulo 6. Velas póker sigue siendo 5.
2. Capturas o videos correspondientes a estos casos, fechas, instrumento de 013, precios y cronología de operaciones; los textos no los sustituyen.
3. Delimitación exacta del rectángulo en pasajes que dependen del cursor y criterio uniforme para formaciones múltiples, empuje, visita y ruptura.
4. Anclajes y orientación de Fibonacci; resolución de porcentajes y términos transcritos de forma dudosa.
5. Reglas completas de entrada, vigencia, invalidación, stops, gestión y costes para convertir las explicaciones en un protocolo comprobable. No se hereda automáticamente toda regla de Velas póker a cualquier bloque.
6. Muestra completa y protocolo de evaluación para estimar probabilidades, con datos disponibles al momento de cada decisión y sin anticipación.
7. Integración visual resuelta en `/curso/modulo-6`: nueve originales comentados, seis diagramas nuevos y ocho ejercicios. Videos y capturas originales verificables del mercado siguen pendientes; el archivo con sufijo real es un esquema.

## Comprobación de la primera entrega documental (histórico)

Los tres originales se preservan y cotejan por bytes, hashes y recuentos; no hay duplicados. Se verificaron 152 enlaces locales de la documentación, ausencia de caracteres de sustitución, ocho ejercicios completos y ocho soluciones. Los cálculos de riesgo, cantidades, relaciones y escalas Fibonacci se comprobaron con aritmética decimal; los tres casos de visita se contrastaron con los intervalos declarados.

`npm run test:unit`: 81 pruebas aprobadas antes y después de la edición, sobre el artefacto existente. `git diff --check`: sin errores, con el aviso habitual LF/CRLF del registro Markdown. No se añaden pruebas de aplicación para cambios exclusivamente documentales ni se afirma una compilación nueva, publicación o prueba de navegador. La aplicación y los cambios previos del módulo 5 se conservan.

## Ampliación visual posterior — 2026-08-28

La página y sus pruebas se incorporan en esta ampliación. Se preservan los tres textos originales y los nueve PNG recibidos; se distinguen las variantes FVG/BOS/CHoCH de los requisitos acreditados por las transcripciones. El [inventario visual](006-modulo-06-integracion-visual.md) detalla las aclaraciones, las seis láminas nuevas y las verificaciones de esta integración. No se interpreta contacto como ejecución ni se adopta el 10–15 % como resultado validado.
