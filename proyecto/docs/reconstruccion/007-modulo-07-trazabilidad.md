# Módulo 7: recepción, trazabilidad e integración

Fecha: 2026-08-28. La entrega se recibió inicialmente como «modulo 7 Velas vendedoras». Por instrucción posterior del usuario, el título de presentación pasa a ser **Módulo 7 · Velas Profesionales**. «Velas vendedoras» se conserva únicamente como nombre de la fuente principal y como concepto interno; no se renumera Order Block ni se reincorpora el módulo antiguo de rutinas.

## Base conservada

Aplicación 0.2.3, Git `8ed289e`. Al iniciar existían cambios sin commit de los módulos 5 y 6. Se conservan, incluyendo fuentes, imágenes, páginas y navegación. La suite inicial tenía 88 pruebas aprobadas. No se cambian dependencias, lockfile, configuración Sites, catálogo anterior, IDs de lecciones, API de aprendizaje, base de datos ni progreso.

Cambio incremental: nueva página `/curso/modulo-7`, contenido separado, veinte imágenes aportadas, cinco diagramas editoriales, prácticas y accesos desde portada y módulo 6. Este módulo es una vista de estudio adicional; no se presenta como una migración del catálogo ni como una evaluación persistente.

## Tres originales íntegros

| ID | Archivo recibido | Función | Bytes | Líneas no vacías |
| --- | --- | --- | ---: | ---: |
| 015 | Sistema de lecturas.txt | Fundamentos y nomenclatura M | 197376 | 3418 |
| 016 | velas compradoras.txt | Comparación puntual de zona y base W | 154648 | 2529 |
| 017 | velas vendedoras.txt | Fuente principal del módulo | 126186 | 2304 |

Copias: [015](fuentes/015-modulo-07-sistema-lecturas-original.txt), [016](fuentes/016-modulo-07-compradoras-complemento-original.txt) y [017](fuentes/017-modulo-07-vendedoras-original.txt). El [manifiesto](007-fuentes-manifest.json) conserva nombres, tamaños y SHA-256. Total: 478210 bytes. Se compararon byte por byte contra los archivos entregados. No se corrigió su ortografía ni se normalizaron sus saltos.

Localizadores: decodificar UTF-8, dividir en líneas, descartar las vacías y numerar desde 1. S corresponde a 015, C a 016 y V a 017. No son páginas, párrafos completos, minutos ni números de video.

## Progresión y procedencia

El texto vendedor contiene tres partes reconocibles, no tres archivos: V0001–V0321, V0322–V1349 y V1350–V2304. Su despedida anuncia una siguiente parte. No se inventan esos ejercicios originales ni se declara completo el curso audiovisual.

| Lección desarrollada | Fuente principal y complementos | Tratamiento |
| --- | --- | --- |
| Contexto antes de vela | V0027–V0053; V0331–V0477 | Giro frente a retroceso de una tendencia mayor; no todas las formas justifican actuar |
| Cuatro formas | V0027–V0035; S0186–S0265 | Se resuelve la repetición «tipo dos» mediante la enumeración explícita de S; medidas ficticias |
| Base M y variantes | V0063–V0132; S0325–S0342; C0164–C0196 | Base entre máximos, no apertura/cierre obligatorio; W solo como comparación |
| M15 terminada y siguiente activa | V0185–V0247; V0593–V0628; V1589–V1608; V1833–V1836 | Entrada intrabar del autor diferenciada del protocolo póker anterior; no usar cierre futuro |
| Mecha y continuación | V1353–V1507; V1691–V1836 | Ruptura menor y pérdida del mínimo previo como eventos distintos |
| Martillos y contexto | V1912–V2188; V1748–V1776; C0055–C0129 | Comparar resistencia superior, soporte tras caída y rebote fallido; no trasladar la clase compradora completa |
| Rangos y POC | V0780–V1092; V2190–V2304 | Rango no equivale a M; punto medio no equivale a POC de volumen |
| Integración y riesgo | V1178–V1279; V1589–V1608; V2011–V2188 | Registro fechado, obstáculos y abstención; aritmética de riesgo editorial |

El [desarrollo de lectura](007-modulo-07-velas-vendedoras.md) conserva explicaciones, comprobaciones y nueve ejercicios. La fuente de contenido de la página es `app/learning/module-seven-content.ts`. El documento reproduce esa adaptación; no sustituye los originales.

## Decisiones editoriales y límites

- El término vendedor describe una hipótesis contextual; el tipo 1 puede ser una vela verde grande que cierra alto. No se sustituye por una vela roja póker ni por el patrón clásico envolvente.
- Primera M: máximos iguales; segunda: segundo máximo mayor; tercera: segundo máximo menor, según S0325–S0328. No se trasladan los números de variantes W. Los ejemplos usan igualdad exacta, sin inventar tolerancias del autor.
- Un cierre M15 terminado y la siguiente M15 activa son objetos distintos. La ruptura local puede observarse antes del cierre del marco mayor; no se reconstruye M1 desde OHLC M15 final.
- Las ventanas de cinco minutos, duración de avances y expresiones «muy probable» se atribuyen al método. No prueban ventaja estadística, no son horarios obligatorios ni garantías.
- La referencia «base» puede pertenecer a la vela anterior o a la activa. No se deduce de un borde del cuerpo M15.
- «Giro en B», «vuelta nube», «aquí» y movimientos dibujados verbalmente no permiten recuperar todos los niveles. Se usa descripción observable sin inventar equivalencias o capturas históricas.
- No se afirma absorción, cierre de cortos ni intención institucional a partir de una mecha. No se perpetúa un sesgo bajista cuando la estructura lo contradice.
- El centro de un rango se distingue del máximo de un perfil de volumen. [TradingView: conceptos del perfil de volumen](https://www.tradingview.com/support/solutions/43000502040-volume-profile-indicators-basic-concepts/) fue consultado como referencia primaria para esta aclaración, no para validar el método.
- Los stops, cantidades y relaciones R de los ejercicios son cálculos ficticios. [FINRA: stop orders](https://www.finra.org/investors/insights/stop-orders-factors-consider-during-volatile-markets) se usa para aclarar la falta de garantía de ejecución en acciones, no como regla de todos los mercados.

## Imágenes aportadas, diagramas y ejercicios

Se conservaron veinte PNG recibidos en `public/course-reconstruction/module-07/originals/`. El [manifiesto de originales](../../public/course-reconstruction/module-07/originals/manifest.json) registra nombre recibido, nombre estable, dimensiones, bytes y SHA-256. Total: 1.967.063 bytes. `scripts/import-module-seven-originals.py` valida que existan los veinte archivos, los copia sin transformación y compara cada copia byte por byte.

Cada original se asigna una sola vez a una de las ocho lecciones mediante `app/learning/module-seven-images.ts`. La misma fuente contiene título accesible, texto alternativo, estado y una nota crítica que se muestra **antes** del desplegable. Se distinguen: referencias comentadas, lecturas que necesitan aclaración y siete comparaciones compradoras. Las notas separan geometría observable de términos como absorción institucional, sweep, engaño, probabilidad, POC, volumen, entrada óptima o stop de un tick.

Se mantienen además cinco PNG editoriales: cuatro formas, variantes M, tiempo y base, mecha y mínimo, rango y POC. El generador reproducible es `scripts/render-module-seven-diagrams.py`. Coordenadas, OHLC, tiempos, perfiles y hashes están en `public/course-reconstruction/module-07/editorial/manifest.json`.

Se inspeccionaron directamente los veinticinco recursos: los veinte adjuntos visibles de la entrega y las cinco láminas editoriales. Los originales no se retocaron. No se hicieron capturas o pruebas visuales del navegador.

Nueve ejercicios editoriales con datos, pasos, entregable y solución: anatomía, variantes, disponibilidad temporal, pertenencia temporal de la base, dos rupturas, martillo/contexto, POC, retorno a rango y riesgo. Ocho comprobaciones acompañan las lecciones y veinte desplegables protegen la lectura crítica de los originales. Hay treinta y siete desplegables; no se guardan respuestas ni se concede aprobación automática.

## Verificación realizada

- `npm run build`: correcto; ruta 7 incluida y artefacto Sites verificado.
- `npm run typecheck`: correcto.
- `npm run test:unit`: **96/96 aprobadas**, ocho del módulo 7 para fuentes, originales, notas, asignación, PNG editoriales, geometría, secuencia temporal, POC, navegación, ejercicios y renderizado del servidor compilado.
- `npm run lint`: cero errores; ocho advertencias existentes de imágenes en otros componentes.
- HTTP local tras la ampliación: módulo 7 y un original de control responden 200. Las pruebas verifican los bytes, dimensiones y SHA-256 de los veinte originales y cinco PNG editoriales.
- Los tres textos archivados son idénticos a los originales. Las referencias S/C/V se encuentran dentro de sus recuentos reales.
- Aritmética del ejercicio final revisada con Decimal: riesgo 3, recorrido 4, 10 unidades para presupuesto 30, 1,33R; destino alternativo con recorrido 0,5 y 0,17R.
- Revisión de imágenes local y pruebas de HTML servidor; no se afirma haber probado clicks, responsive o DOM en navegador.

## Pendientes

Faltan la continuación anunciada al final del texto vendedor, los videos y los datos necesarios para verificar operaciones o estadísticas. El texto comprador completo se conserva para una entrega separada; sus siete imágenes se identifican aquí únicamente como comparación declarada.

Publicación remota pendiente por el `project_not_found` HTTP 404 ya documentado en módulos previos. No se reintentó un error terminal ni se modificaron el proyecto alojado o sus bindings. La versión comprobada es local en `http://127.0.0.1:5173/curso/modulo-7`.
