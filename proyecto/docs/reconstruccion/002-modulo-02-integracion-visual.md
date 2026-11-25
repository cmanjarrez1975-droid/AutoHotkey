# Módulo 2: integración de imágenes aportadas y diagramas complementarios

Fecha: 2026-08-28. Base: `66d5451`, aplicación 0.2.3. Alcance autorizado: integrar las 12 imágenes nuevas en el módulo 2 junto con recursos desarrollados para explicar su contenido. No se migra el resto del curso.

## Dónde se integra

- Vista de estudio: `/curso/modulo-2`, accesible desde una tarjeta en la ruta principal.
- Seis bloques conectados, cinco diagramas nuevos y cuatro ejercicios editoriales con respuestas desplegables.
- Cada imagen aportada aparece exactamente una vez, en su tema, con nota visible antes de abrirla, texto alternativo, dimensiones explícitas y opciones para ampliar/descargar.
- Los originales no se modifican. Los rótulos «Módulo 1» se explican como numeración del archivo recibido, sin confundirlos con el nuevo módulo 2.
- Sin escrituras de progreso, calificaciones ni cambios de IDs. Las respuestas desplegables son material de autoestudio, no la evaluación protegida de la plataforma.
- Material local en reconstrucción: no afirma que todo el módulo o sus videos estén terminados. La publicación existente continúa pendiente por el error previamente documentado `project_not_found`; no se recrea el proyecto ni se reintenta ese error terminal.

## Revisión de los archivos recibidos

Las imágenes se inspeccionaron completas a partir de los adjuntos visibles. Todas son esquemas: no se aportan activo, fecha ni serie OHLC. Los nombres de archivo se conservan y los hashes figuran en el [manifiesto de originales](../../public/course-reconstruction/module-02/originals/manifest.json). Tamaño conjunto: 1.604.163 bytes.

| Imagen aportada | Ubicación | Aclaración de lectura |
| --- | --- | --- |
| [Estructura de tendencias](../../public/course-reconstruction/module-02/originals/20260828_tendencias-alcistas-estructura.png) | Reconocer la pausa | La tendencia 3 se distingue por consolidación después del primer impulso; el POC no está calculado. |
| [Tendencia 1](../../public/course-reconstruction/module-02/originals/20260828_tendencia-alcista-1-detalle.png) | Reconocer la pausa | «Gráfica real» no acredita datos reales; cierre y máximo de vela son referencias distintas. |
| [Tendencia 3](../../public/course-reconstruction/module-02/originals/20260828_tendencia-alcista-3-detalle.png) | Reconocer la pausa | No hay volumen ni perfil que sustenten POC, ruptura con volumen o identidad de participantes. |
| [Resumen de patrones](../../public/course-reconstruction/module-02/originals/20260828_patrones-continuacion-resumen.png) | Cinco patrones | El patrón 1 deja un mínimo más bajo, distinto del original; conservar la numeración y geometría del manual. |
| [Patrón 1](../../public/course-reconstruction/module-02/originals/20260828_patron-continuacion-1-detalle.png) | Cinco patrones | Geometría útil; el impulso rotulado no debe sustituir el contexto más amplio de la página 14. |
| [Patrón 2](../../public/course-reconstruction/module-02/originals/20260828_patron-continuacion-2-detalle.png) | Cinco patrones | La perforación/recuperación es observable; compras institucionales y stops barridos no quedan acreditados. |
| [Patrón 3](../../public/course-reconstruction/module-02/originals/20260828_patron-continuacion-3-detalle.png) | Cinco patrones | La flecha de entrada del panel lineal señala una bajada; no usarla como regla de recuperación. |
| [Patrón 4](../../public/course-reconstruction/module-02/originals/20260828_patron-continuacion-4-detalle.png) | Cinco patrones | La flecha de mínimo más alto señala un máximo; el mínimo final es inferior, a diferencia del patrón 4 original. |
| [Patrón 5](../../public/course-reconstruction/module-02/originals/20260828_patron-continuacion-5-detalle.png) | Contexto del patrón 5 | Máximos iguales del triángulo no equivalen al nuevo máximo de la lámina original. |
| [Variación del patrón 5](../../public/course-reconstruction/module-02/originals/20260828_variacion-patron-5-impulso.png) | Contexto del patrón 5 | Éxito en segundo impulso/fallo en primero no representa la cautela de la transcripción. |
| [Ubicación Fibonacci](../../public/course-reconstruction/module-02/originals/20260828_ubicacion-fibonacci-2do-impulso.png) | Escalas Fibonacci | Usa 0 % en el final del impulso; el manual p. 20 usa 61,8 %. No se importan «ideal» o «rebote de oro» como reglas. |
| [Finalización](../../public/course-reconstruction/module-02/originals/20260828_patrones-finalizacion.png) | Agotamiento | El rebote supera la línea roja: distinguir recuperación del nivel de rechazo desde abajo. |

Estas diferencias no se corrigen silenciosamente sobre las imágenes. La explicación principal sigue las nuevas transcripciones y las páginas del manual contrastadas en la recepción anterior.

## Láminas nuevas

| Recurso | Fuentes de referencia | Explicación |
| --- | --- | --- |
| [Tres tendencias](../../public/course-reconstruction/module-02/editorial/tres-tendencias.png) | Manual p. 11 y parte 1 | Pausas sencillas frente a consolidación después de I1 o I2. |
| [Cinco patrones](../../public/course-reconstruction/module-02/editorial/cinco-patrones.png) | Manual pp. 13–18 y parte 1 | Comparar mínimos y máximos, sin trasladar nombres externos a los números del curso. |
| [Contexto del patrón 5](../../public/course-reconstruction/module-02/editorial/patron-cinco-contexto.png) | Manual pp. 18–19 y advertencias de la parte 1 | Diferenciar ubicación temprana y subida extendida, sin éxito/fracaso obligatorio. |
| [Dos escalas Fibonacci](../../public/course-reconstruction/module-02/editorial/fibonacci-dos-escalas.png) | Manual p. 20; comparación editorial | Declarar ambos anclajes: proyección 100/61,8 frente a retroceso 100/0. |
| [Agotamiento por etapas](../../public/course-reconstruction/module-02/editorial/agotamiento-por-etapas.png) | Manual p. 25 y parte 2 | Separar advertencia, pérdida y retesteo; las líneas discontinuas son desenlaces hipotéticos. |

Generador: [render-module-two-diagrams.py](../../scripts/render-module-two-diagrams.py). Usa Pillow y coordenadas esquemáticas explícitas en el entorno gráfico existente. Crea archivos nuevos; no realiza edición de las imágenes recibidas ni emplea generación de imagen con IA. Dimensiones y hashes: [manifiesto editorial](../../public/course-reconstruction/module-02/editorial/manifest.json). Las cinco láminas fueron inspeccionadas visualmente; se ajustó la etiqueta de soporte para evitar cruzarla con la curva de precio.

## Conservación y arquitectura

Datos y notas: [module-two-content.ts](../../app/learning/module-two-content.ts). Vista de servidor: [page.tsx](../../app/curso/modulo-2/page.tsx). Las imágenes se cargan de forma diferida con proporción explícita; cada original tiene una nota visible y se despliega mediante controles HTML nativos. No se introduce una dependencia nueva ni una API de almacenamiento.

Las páginas originales del manual permanecen enlazadas por tema. Las discrepancias de los ejemplos hablados 3/4 y las prácticas ausentes no quedan resueltas simplemente por incorporar estos nuevos esquemas.

## Cómo comprobarlo

1. En la academia local, abrir «Estudiar el módulo 2 con imágenes» desde la ruta principal.
2. Usar el índice para recorrer los seis bloques. Deben aparecer cinco láminas editoriales y doce originales distribuidos junto a su tema.
3. Leer una nota y desplegar su imagen; ampliarla o descargarla debe conservar el archivo original.
4. Desplegar respuestas en los cuatro ejercicios. No deben modificar el contador de lecciones ni crear intentos de evaluación.
5. Volver a la ruta actual y comprobar que sigue disponible el contenido anterior.

Las pruebas de contenido, integridad de PNG, metadatos y renderizado de servidor se encuentran en [module-two-visuals.test.mjs](../../tests/module-two-visuals.test.mjs). No se hizo inspección DOM, clics ni capturas de navegador: no se habían solicitado pruebas de navegador. La inspección de las imágenes generadas se hizo directamente sobre sus archivos.

### Resultado de las verificaciones

- `npm run build`: aprobado sobre la implementación final; incluye la nueva ruta.
- `npm run typecheck`: aprobado.
- ESLint sobre la página nueva, sus datos y pruebas: aprobado. Se ajustaron los enlaces internos a `next/link` con precarga desactivada.
- `npm run test:unit`: 61 pruebas aprobadas, incluidas las 56 existentes y cinco nuevas. La prueba de servidor comprueba 17 imágenes, 16 controles desplegables y metadatos propios sin heredar la imagen social global.
- Solicitudes HTTP locales: raíz y nueva página responden 200; los 17 PNG se sirven como imágenes y sus bytes coinciden con los hashes de sus manifiestos.
- Los 12 originales coinciden byte por byte con los archivos aportados; los 17 PNG se decodifican correctamente. Los 60 enlaces locales de la documentación de reconstrucción tienen destino existente.
- `git diff --check`: sin errores de espacios. La comprobación de texto de una prueba nueva se ajustó de «no modifica» a la redacción real «ni modifica»; no fue una alteración del comportamiento para superar la prueba.

No se ejecuta un nuevo despliegue: el fallo terminal de acceso al proyecto alojado ya estaba documentado. Se conserva el servidor local existente para poder estudiar el módulo.
