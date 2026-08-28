# Reconstrucción del curso desde las nuevas entregas

Estado: recepción y preparación editorial. **Todavía no sustituye la ruta publicada en la aplicación.**

## Acuerdo de trabajo

- La estructura de referencia es la imagen aportada por el usuario.
- Los nombres y números explícitos de las nuevas entregas tienen prioridad sobre la numeración antigua de la imagen: «1) Introducción» y «Módulo 2. Tipos de Tendencias Alcistas». No confundir este módulo 2 nuevo con el módulo 2 original de retrocesos.
- Se excluye del nuevo recorrido el módulo original 6, «Creando rutinas de trabajo». Excluir del recorrido no significa borrar sus archivos o el historial.
- El usuario enviará nuevamente el contenido, por partes y por módulo. Cada entrega nueva es la fuente principal de su clase; el material anterior sirve como complemento identificado.
- No se rellenan módulos pendientes con el catálogo anterior ni se adelantan sus reglas técnicas a la introducción.
- Original recibido, adaptación editorial y material complementario permanecen separados.

## Estructura visible en la imagen

| Orden en la referencia | Nombre original | Tratamiento |
| --- | --- | --- |
| Sección 1 | Introducción | Nueva entrega 001: módulo 1 introductorio |
| Sección 2 | Módulo 1. Tipos de tendencias alcistas | Nuevo módulo 2 indicado por el usuario; dos partes recibidas |
| Sección 3 | Módulo 2. Principales retrocesos alcistas | Pendiente |
| Sección 4 | Módulo 3. Principales movimientos tendenciales bajistas | Pendiente |
| Sección 5 | Módulo 4. Velas póker | Pendiente |
| Sección 6 | Módulo 5. Order Block. Nuevo | Pendiente |
| Sección 7 | Módulo 6. Creando rutinas de trabajo | Excluido por solicitud del usuario |
| Sección 8 | Módulo 7. Velas profesionales | Conservar como módulo 7 en la propuesta; contenido nuevo pendiente |

No se interpretan los contadores y duraciones de la captura como el detalle completo de cada clase. No se inventan secciones posteriores a las visibles.

La correspondencia provisional del recorrido restante es: 3. Retrocesos alcistas; 4. Movimientos tendenciales bajistas; 5. Velas póker; 6. Order Block; 7. Velas profesionales. Se confirmará con cada nueva entrega. La exclusión corresponde al **título original «Creando rutinas de trabajo»**, no a cualquier contenido que reciba ahora el número 6.

## Entregas recibidas

| ID de recepción | Etiqueta del usuario | Archivo principal | Estado |
| --- | --- | --- | --- |
| 001 | «1) Introducción» | [Transcripción original](fuentes/001-introduccion-original.txt) | Original archivado; [borrador desarrollado](001-introduccion-borrador.md); cierre incompleto |
| 002 | «modulo 2 Tipos de Tendencias Alcistas»; primera parte | [Original, parte 1](fuentes/002-modulo-02-alcistas-parte-01-original.txt) | Archivado; [borrador conjunto](002-modulo-02-tendencias-alcistas-borrador.md) |
| 003 | Misma entrega del módulo 2; segunda parte | [Original, parte 2](fuentes/003-modulo-02-alcistas-parte-02-original.txt) | Archivado después de la parte 1; [trazabilidad](002-modulo-02-trazabilidad.md) |

Los ID 001, 002 y 003 identifican **archivos recibidos**, no IDs de lecciones de la aplicación ni versiones del historial. Las entregas 002 y 003 pertenecen al mismo módulo 2.

## Pendientes que no se deben resolver por suposición

1. La introducción termina en «para que puedas lograr aquello que». Conservar el corte y recibir su continuación si está disponible.
2. No hay duración, marcas de tiempo ni archivo audiovisual de la introducción. No asignar los 58 minutos de la sección completa a esta transcripción.
3. El módulo 2 menciona un video de prácticas separado que no está entre los dos adjuntos. No declarar completa la colección audiovisual ni deducir las cuatro clases del contador de la imagen.
4. Conservar como pendientes los términos y reglas operativas que no resuelvan las transcripciones y los diagramas originales; consultar la trazabilidad del módulo 2.

## Uso del contenido anterior

Solo como apoyo identificado y comprobando correspondencia con cada entrega:

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

### Recepción del módulo 2 — 2026-08-28

Base al iniciar: `f626ef3`, árbol limpio. Se conserva la aplicación 0.2.3, sin modificar frontend, catálogo, progreso, laboratorio ni archivos multimedia. Las modificaciones de esta recepción son documentales.

| Entrega | Tamaño exacto | SHA-256 |
| --- | --- | --- |
| 002 | 47.906 bytes | `93065DE70D8DCCB327DF21AEC419879DCE36AA12628078978375C8472C095DA0` |
| 003 | 64.289 bytes | `6E261FEE51532D893E6AF80E601C8095DE504945808C6B4B89BC90E1B8D22A9A` |

Ambas copias verificadas byte por byte mediante hash contra los adjuntos. La regla existente de `.gitattributes` conserva estos originales sin normalizar saltos de línea. Se revisaron visualmente las páginas 11, 13–20 y 25 del manual original como complemento; la transcripción nueva sigue siendo la fuente principal del desarrollo verbal.

Validación de esta recepción: enlaces locales de los cuatro documentos comprobados, 677 y 988 líneas no vacías en los originales y `npm run test:unit` con 56 pruebas aprobadas sobre el artefacto existente. No se ejecuta una nueva compilación ni se afirma una validación de interfaz del borrador, porque todavía no está integrado.
