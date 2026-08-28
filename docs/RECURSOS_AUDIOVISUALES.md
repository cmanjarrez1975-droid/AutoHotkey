# Recursos audiovisuales — 0.2.3

## Alcance

Base: `eecf3e4`, aplicación 0.2.2, árbol limpio. Diagnóstico inicial: TypeScript y las 48 pruebas anteriores correctos. En el catálogo actual, 18 de 24 clases no tenían imagen propia y ninguna integraba un video en su lector. La biblioteca ya conservaba tres videos y un audio originales; no se sustituyen ni eliminan.

Se añaden **24 láminas WebP y 24 microvideos MP4**, uno por clase. Cada video desarrolla el ejemplo resuelto existente con una introducción, sus pasos y una conclusión. Son diapositivas explicativas con gráficos y narración sintética en español; no grabaciones del profesor ni clases magistrales completas.

- Duración por video: 61,29–76,46 segundos. Total: aproximadamente 27,8 minutos.
- Video H.264, 1280 × 720, 12 cuadros por segundo, `yuv420p`; audio AAC mono.
- Voz local `Microsoft Sabina Desktop`, cultura `es-MX`, velocidad −1. No se imita la voz del profesor, no se llama a servicios externos y no se usan datos de alumnos.
- 126 escenas en total. Cada una tiene su narración, capítulo y subtítulo con tiempos del archivo codificado. Los subtítulos son por escena, no alineación palabra por palabra.
- 24 transcripciones descargables y lectura equivalente dentro de la página.
- Los nuevos videos suman 18,13 MiB; la aplicación usa `preload="none"`, sin reproducción automática.

## Diseño y precisión

Se elaboraron diagramas específicos a partir de los ejemplos de las clases: secuencias de precios, instantáneas OHLC, niveles de entrada/stop/objetivo, operaciones aritméticas, comparación de escenarios y resultados en R.

Las láminas no son cotizaciones históricas. Los puntos adicionales que ilustran un recorrido se identifican como sintéticos. Si el enunciado no contiene apertura o extremos, no se inventa una vela completa: se dibujan solo los niveles conocidos. Las líneas de medias y Donchian son referencias aportadas, no indicadores calculados con historia inexistente. En estructura y replay, los diagramas del video revelan los datos por pasos; la lámina de repaso muestra el ejemplo completo.

El video de medias representa el escenario alternativo de pérdida de referencias en su propio paso, en lugar de narrar una ruptura mientras sigue mostrando un rebote. El aplanamiento de las curvas no se representa sin datos suficientes y se advierte en la lámina.

Se conservan las seis imágenes originales integradas, los videos/audio anteriores, los PDFs y las fuentes. Las nuevas láminas son originales y no reutilizan gráficos de terceros. Las reglas ambiguas «230» y Donchian 5/2 permanecen sin reinterpretar.

## Integración

Cada clase muestra «Aprende con el ejemplo · Video y lámina» antes del desarrollo escrito, con reproductor nativo, selección de capítulos, subtítulos opcionales, lámina ampliable, transcripción y descargas. Los textos siguen disponibles si el video falla.

Los medios se asocian por ID estable mediante `media-manifest.ts`; el catálogo público no importa claves de evaluación al cliente. Mirar el video o avanzar capítulos no registra una clase como estudiada. No cambian el esquema, los controles, los laboratorios ni la versión curricular `2026.08.v2`.

## Verificación realizada

- TypeScript y compilación correctos; **56 pruebas aprobadas**: 48 anteriores y 8 nuevas de cobertura, archivos, tiempos, cálculos y compatibilidad.
- Lint: cero errores y las mismas ocho advertencias preexistentes sobre imágenes.
- Decodificación completa de los 24 MP4 con FFmpeg, tanto video como audio. Códecs, resolución y duración inspeccionados con FFprobe.
- Las 126 narraciones WAV contienen señal no silenciosa. No se realizó una revisión auditiva humana de toda la pronunciación.
- Revisión visual de las 24 láminas en hojas de contacto, ampliación de ejemplos representativos y dos fotogramas extraídos de videos finales (velas y medias).
- Hashes SHA-256 de los 96 recursos nuevos en `public/course-media/audit.json`, junto a códecs y datos de la voz. Las pruebas verifican que coincidan con los archivos presentes.
- `.gitattributes` conserva finales de línea LF en subtítulos y transcripciones para que los hashes no cambien al hacer checkout en Windows.
- Las 96 rutas de recursos responden HTTP 200 con MIME correcto. Tres MP4 representativos responden HTTP 206 a solicitudes de rangos de bytes, necesario para avanzar sin descargar todo el archivo.
- La aplicación local responde HTTP 200. No se realizó interacción ni prueba de reproducción dentro del navegador; sigue pendiente probar sus controles y la comprensión con el alumno.

Disponibilidad: local. No se publicó esta revisión; persiste el bloqueo de acceso al proyecto Sites previamente identificado. No se creó otro proyecto ni se modificó su configuración.

## Cómo comprobarlo en la aplicación

1. Guarda cualquier respuesta pendiente antes de recargar `http://127.0.0.1:5173/`.
2. Abre una clase de Fundamentos, Método o Práctica. Debe aparecer el bloque de video y lámina.
3. Pulsa reproducir: debe oírse narración en español. Activa los subtítulos desde los controles del reproductor si los necesitas.
4. Pulsa un capítulo: debe saltar al paso indicado. Comprueba también pausa, pantalla completa y regreso a un capítulo anterior.
5. Despliega la lámina y la transcripción; deben corresponder al mismo ejemplo. Prueba las tres descargas.
6. Cambia de clase: el video anterior debe detenerse y el nuevo recurso debe corresponder al nuevo tema. No debe cambiar tu progreso por ver el video.
7. Verifica una clase con imagen original, como W: la nueva lámina y video complementan la imagen existente, no la sustituyen.

## Regeneración conservadora

No es necesaria para usar la aplicación: los recursos finales están incluidos. Para editar el contenido audiovisual, modifica `scripts/course-media-storyboards.mjs` o el ejemplo de la clase y regenera. El exportador utiliza únicamente campos públicos del currículo.

Ejecutar en **PowerShell, en la carpeta `proyecto`**. Requiere Node del proyecto, Python con Pillow, FFmpeg/FFprobe en PATH y una voz española instalada. El script de voz falla si no encuentra la voz solicitada; no instala componentes ni usa otra voz automáticamente.

```powershell
node scripts/export-course-media.mjs
./scripts/narrate-course-media.ps1
& 'C:\Users\cmanj_omppgbr\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' scripts/render-course-media.py
npm run typecheck
npm test
```

Los intermedios quedan en `work/course-media`, ignorado por Git. Los scripts no borran directorios. Solo sobrescriben sus propios nombres generados: `lamina.webp`, `explicacion.mp4`, `subtitulos.vtt`, `transcripcion.txt`, manifiesto y auditoría. Los cuatro archivos originales en la raíz de `public/course-media` no se tocan.

Para revisar una sola clase, los scripts de voz y render aceptan `-Only f-velas` y `--only f-velas`. Después hay que ejecutar `render-course-media.py --manifest-only` para actualizar duraciones y hashes antes de validar; no mezclar un archivo nuevo con un manifiesto anterior.
