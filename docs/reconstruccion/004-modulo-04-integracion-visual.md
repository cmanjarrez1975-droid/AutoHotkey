# Módulo 4 · Integración visual

Fecha: 2026-08-28. Base: `40d883b`, árbol limpio, aplicación 0.2.3 y 67 pruebas existentes aprobadas. Solicitud: integrar las trece imágenes aportadas y desarrollar complementos. Se añade `/curso/modulo-4` con enlaces desde la ruta principal y el módulo 3. No se cambian IDs, catálogo existente, prerrequisitos, evaluaciones, base de datos ni progreso.

## Fuentes y numeración

Fuente principal: [parte 1](fuentes/006-modulo-04-bajistas-parte-01-original.txt) y [parte 2](fuentes/007-modulo-04-bajistas-parte-02-original.txt), conservadas sin cambios. Complemento: [manual](../../public/course-originals/01-APRENDE_NUEVAS_ESTRATEGIAS_TRADING-1-.pdf), pp. 58–69 y 72–74. El [borrador extenso](004-modulo-04-bajistas-borrador.md) y su [trazabilidad](004-modulo-04-trazabilidad.md) mantienen el desarrollo previo y sus límites.

Los nombres `m3` y rótulos `M3` de los PNG corresponden a la numeración antigua. Se integran en el **nuevo módulo 4**. Tendencias 1–4, retrocesos 1–3 y continuaciones 1–5 son clasificaciones independientes.

Las dos transcripciones son distintas y tienen despedida. Sigue pendiente el video de prácticas anunciado por la segunda parte. La integración no declara recibidas todas las clases ni añade videos ficticios.

## Originales preservados

[Manifiesto de originales](../../public/course-reconstruction/module-04/originals/manifest.json): nombres, dimensiones, bytes y SHA-256. Copias exactas de los trece archivos de la entrega, sin recortes, cambios de rótulos ni recomposición. Los hashes quedan fijados también en las pruebas. Cada original aparece una sola vez en su bloque, con nota visible antes del desplegable, texto alternativo y enlaces para ampliar o descargar.

Todos llevan el prefijo `20260828_m3-` y extensión `.png`:

| Identificador | Bloque | Aclaración junto al original |
| --- | --- | --- |
| tipos-de-tendencias-bajistas | 1 · Estructura | La fuente tiene cuatro tendencias, no tres. El POC no acredita contratos ni volumen. |
| tipos-de-retrocesos-bajistas | 2 · Retrocesos | Prototipos, no conteos obligatorios; los paneles originales usan distintas escalas. |
| retrocesos-despues-de-rangos | 3 · Rangos | El contacto perfecto no es obligatorio; también existe pausa por debajo del suelo. |
| patrones-velas-vendedores | 4 · Velas | Cuatro familias aportadas no equivalen a los siete grupos sin nombre de p. 66. |
| mapa-confluencia-vendedora | 4 · Velas | 7,5 representa 58,33 % del tramo 10→4, no exactamente 61,8 %. |
| patrones-continuacion-bajistas | 5 · Continuaciones | Los nombres genéricos no conservan las geometrías ni la numeración de p. 68. |
| patron-continuacion-3-detalle | 5 · Continuaciones | La bandera no sustituye al patrón 3 de expansión por ambos extremos. |
| patron-continuacion-5-detalle | 5 · Continuaciones | El suelo fijo no sustituye al mínimo intermedio inferior del patrón 5. |
| agotamiento-bajista-giro | 6 · Agotamiento | Mínimo más alto, recuperación de referencia y resultado son acontecimientos diferentes. |
| ubicaciones-retrocesos-tendencia-1 | 7 · Fibonacci | Los paneles no representan un mismo OHLC; los precios indicados son aproximados. |
| practica-1-analisis | 7 · Fibonacci | Rótulos de anclaje invertidos; la vela señalada no tiene claramente forma de estrella fugaz. |
| practica-un-dia-complicado | 8 · Casos | No se adopta una regla de fracaso obligatorio de recuperaciones; falta anclaje 0 %. |
| practica-2-analisis | 8 · Casos | Esquema sintético distinto de la captura de p. 74; no prueba ejecución ni intención. |

## Complementos nuevos

[Generador reproducible](../../scripts/render-module-four-diagrams.py), con Pillow y los ayudantes gráficos existentes de los módulos 2–3. Solo escribe en `module-04/editorial`; no abre ni edita los originales. [Manifiesto editorial](../../public/course-reconstruction/module-04/editorial/manifest.json) con coordenadas relevantes, OHLC, cálculos, dimensiones, bytes y hashes.

| Lámina nueva | Qué enseña | Base |
| --- | --- | --- |
| cuatro-tendencias | Ubicación de pausas sencillas o complejas después de I1 e I2 | pp. 58–59 |
| tres-retrocesos | Tres secuencias OHLC sintéticas en una escala común | pp. 60–61 |
| retrocesos-tras-rango | Pausa bajo el suelo roto frente a retorno a la referencia | pp. 58 y 65 |
| cinco-continuaciones | Comparación explícita de máximos y mínimos según el manual | p. 68 |
| agotamiento-y-referencia | Dos estados separados: mínimo más alto con máximo pendiente o superado | Concepto de p. 69; ejemplo editorial |
| fibonacci-verificado | Anclajes 9 y 4, comparados en dos orientaciones | Revisión matemática de la imagen aportada |

Los esquemas no son datos reales. Los desenlaces discontinuos son escenarios; las secuencias de velas completas sirven para comparación retrospectiva. La lámina de agotamiento compara dos estados y no pretende reemplazar las dos opciones completas de la fuente.

## Secuencia y ejercicios

[Contenido modular](../../app/learning/module-four-content.ts), separado de la [vista de estudio](../../app/curso/modulo-4/page.tsx). Ocho bloques: estructura → retrocesos → rango → velas y ubicación → continuaciones → agotamiento → anclajes → revisión de casos. Incluyen ejemplos, contraejemplos y preguntas de comprobación.

Seis ejercicios con consigna y respuesta razonada: numeraciones, duración/profundidad, etapas sin utilizar el futuro, orientación Fibonacci, condición de recuperación pendiente y lectura de p. 74. El ejercicio numérico de la página se centra en las inconsistencias de las imágenes; el borrador conserva además el ejercicio sobre proyección. No se guardan respuestas ni se concede avance automático.

Se reutiliza el CSS existente sin modificarlo. Imágenes con dimensiones declaradas, carga diferida y texto alternativo; desplegables HTML nativos. No hay dependencias nuevas ni solicitudes a APIs de aprendizaje. Metadatos propios de la página, sin heredar una imagen social genérica.

## Validación y alcance

[Pruebas específicas](../../tests/module-four-visuals.test.mjs): integridad de los 19 PNG, asignación única, notas accesibles, OHLC, anclajes, cuatro tendencias, cinco continuaciones, dos estados de agotamiento, ejercicios, navegación y renderizado de servidor.

Resultados comprobados:

- 67 pruebas de base y 74 pruebas finales aprobadas.
- Compilación, validación del artefacto y TypeScript aprobados.
- ESLint de los archivos afectados: cero errores; una advertencia previa por un `img` de la vista principal, fuera del cambio.
- Portada y módulos 2, 3 y 4: HTTP 200. Los 19 PNG se decodifican y se sirven con el hash esperado.
- Trece originales: 1.984.461 bytes, comparados byte por byte con la entrega.
- 107 enlaces locales de documentación con destinos existentes.
- Los seis PNG nuevos se inspeccionaron directamente para comprobar disposición, rótulos y cálculos. No se hicieron capturas del navegador.
- El renderizado del módulo produce 19 imágenes y 19 desplegables: 13 originales y 6 respuestas.

La publicación alojada sigue pendiente por el fallo de acceso `project_not_found` documentado en el proyecto. No se ha sustituido el identificador del sitio ni se ha creado otro. Esta entrega se comprueba localmente.

No se realizaron pruebas visuales ni interacciones en navegador. Se inspeccionaron directamente los seis PNG nuevos y se verificó la respuesta del servidor. La comprobación manual de los controles queda disponible para el usuario:

1. Entrar desde la portada o desde el enlace final del módulo 3.
2. Recorrer los ocho bloques y leer la nota antes de desplegar cada original.
3. Ampliar y descargar una imagen; el original debe conservar su rótulo antiguo.
4. Responder los seis ejercicios antes de desplegar las soluciones.
5. Regresar a la academia: no se debe conceder avance ni alterar las calificaciones por leer esta página.
