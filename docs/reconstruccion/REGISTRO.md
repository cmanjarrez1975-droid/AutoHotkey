# Reconstrucción del curso desde las nuevas entregas

Estado: recepción y preparación editorial. **Todavía no sustituye la ruta publicada en la aplicación.**

## Acuerdo de trabajo

- La estructura de referencia es la imagen aportada por el usuario.
- Se excluye del nuevo recorrido el módulo original 6, «Creando rutinas de trabajo». Excluir del recorrido no significa borrar sus archivos o el historial.
- El usuario enviará nuevamente el contenido, por partes y por módulo. Cada entrega nueva es la fuente principal de su clase; el material anterior sirve como complemento identificado.
- No se rellenan módulos pendientes con el catálogo anterior ni se adelantan sus reglas técnicas a la introducción.
- Original recibido, adaptación editorial y material complementario permanecen separados.

## Estructura visible en la imagen

| Orden en la referencia | Nombre original | Tratamiento |
| --- | --- | --- |
| Sección 1 | Introducción | Recepción de contenido iniciada; confirmar ubicación de la entrega 001 |
| Sección 2 | Módulo 1. Tipos de tendencias alcistas | Pendiente de contenido específico |
| Sección 3 | Módulo 2. Principales retrocesos alcistas | Pendiente |
| Sección 4 | Módulo 3. Principales movimientos tendenciales bajistas | Pendiente |
| Sección 5 | Módulo 4. Velas póker | Pendiente |
| Sección 6 | Módulo 5. Order Block. Nuevo | Pendiente |
| Sección 7 | Módulo 6. Creando rutinas de trabajo | Excluido por solicitud del usuario |
| Sección 8 | Módulo 7. Velas profesionales | Conservar contenido; numeración final pendiente de confirmar |

No se interpretan los contadores y duraciones de la captura como el detalle completo de cada clase. No se inventan secciones posteriores a las visibles.

## Entregas recibidas

| ID de recepción | Etiqueta del usuario | Archivo principal | Estado |
| --- | --- | --- | --- |
| 001 | «1) Introducción» | [Transcripción original](fuentes/001-introduccion-original.txt) | Original archivado; [borrador desarrollado](001-introduccion-borrador.md); cierre incompleto y ubicación por confirmar |

El ID 001 identifica una **entrega**, no un módulo, una lección de la aplicación ni una nueva versión del historial.

## Pendientes que no se deben resolver por suposición

1. La imagen separa «Introducción» de «Módulo 1. Tipos de tendencias alcistas», pero el mensaje presenta la entrega como información del módulo 1. Confirmar si esta pieza pertenece a la sección introductoria independiente o es la primera clase dentro del módulo de tendencias.
2. El usuario escribió «el 7 pasa ha ser el 7» al excluir el módulo 6. No renumerar el módulo original 7 sin aclaración.
3. El texto recibido termina en «para que puedas lograr aquello que». Conservar el corte y recibir su continuación si está disponible.
4. No hay duración, marcas de tiempo ni archivo audiovisual de esta entrega. No asignar los 58 minutos de la sección completa a esta transcripción.

## Uso del contenido anterior

Solo como apoyo opcional y claramente rotulado, una vez aprobada la ubicación:

- Lectura de velas y estructura: repaso de conocimientos previos, no reemplazo del orden del profesor.
- Distinción entre observación, hipótesis y decisión: aclaración editorial compatible con la intención de la introducción.
- Registros de decisiones y comparación entre proceso y resultado: complemento para revisar el aprendizaje, sin reintroducir el módulo de rutinas excluido.
- Los videos y láminas ya creados se conservan; no se reasignan a la nueva introducción sin comprobar correspondencia con su texto definitivo.

## Trazabilidad y validación de esta recepción

Base de aplicación conservada: `c716db5`, versión 0.2.3. Árbol limpio al iniciar esta recepción. No se modifica frontend, catálogo, IDs de lecciones, evaluaciones ni base de datos.

- Fuente adjunta: `pasted-text.txt`, entrega `0c3c24ac-a2d5-4d7b-b523-44767b1001c4`.
- Copia original: 14.832 bytes.
- SHA-256: `AF3B38D7078704DE31A7C4728195C10E96575BCAEF18F41203F5991C87EE6599`.
- Copia exacta verificada contra el adjunto. Git conserva sus bytes sin normalizar saltos de línea.
- Imagen de referencia conservada en `fuentes/estructura-solicitada.png`.
- `npm run test:unit`: 56 pruebas aprobadas sobre el artefacto existente. No se reconstruye ni publica la aplicación porque esta entrega solo prepara documentación y fuentes.

Para cada nueva entrega: archivar original, registrar ubicación y orden, identificar lagunas, preparar adaptación fiel, proponer complementos y comprobar la transición con la clase anterior. La integración en la nueva ruta se hará sobre la estructura confirmada.
