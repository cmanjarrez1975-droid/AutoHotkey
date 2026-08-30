# Módulo 5 · Integración visual de Velas póker

Fecha: 2026-08-28. Ruta local: `/curso/modulo-5`. Base inicial `8ed289e`, versión 0.2.3, con documentos y fuentes de la recepción previa sin commit. No se sobrescriben esos archivos originales ni se migra progreso. La versión del paquete se conserva.

## Fuentes y alcance

La solicitud incorpora once imágenes para el nuevo módulo 5; los prefijos `m4` y los títulos antiguos corresponden a la numeración anterior. Las [transcripciones y su trazabilidad](005-modulo-05-trazabilidad.md) y el [desarrollo editorial](005-modulo-05-velas-poker-borrador.md) siguen siendo fuentes principales junto con el manual. La teoría vendedora hablada y el video adicional anunciado continúan pendientes; las páginas 100–107 del manual son un complemento identificado, no una nueva transcripción recibida.

Los once PNG se copiaron sin modificar desde la carpeta de fotografías aportada, conservando nombres y bytes: **1.209.786 bytes**. El [manifiesto de originales](../../public/course-reconstruction/module-05/originals/manifest.json) registra dimensiones, tamaños y SHA-256; las pruebas fijan sus hashes independientemente del generador editorial.

## Distribución y notas visibles

Todas las imágenes pueden ampliarse y descargarse. Su nota aparece antes del desplegable; el original mantiene sus rótulos para no alterar la fuente.

| ID del original | Bloque | Aclaración principal |
| --- | --- | --- |
| anatomia-velas-poker | Anatomía | Cuerpo y rango son distintos; una vela amplia no demuestra volumen ni identidad institucional. |
| frenada-absorcion-recompensa-ideal | Secuencia | Recompra, no recompensa; segundo test y segundo impulso no son equivalentes. |
| proceso-acumulacion-poker | Secuencia | Menor volumen no equivale a ausencia de ventas; las barras son ilustrativas. |
| proceso-distribucion-poker | Secuencia | Un techo no demuestra POC; reventa y empuje se distinguen por el acontecimiento. |
| mapa-velas-poker-alcistas | Ubicación | Evitar el primer intento de giro no significa prohibir todo primer impulso. |
| mapa-velas-poker-bajistas | Ubicación | La línea no contiene OHLC para verificar velas ni prueba freno institucional. |
| debilidad-demanda | Debilidad | No se adopta un giro inminente; la fuente también contempla recuperación compradora. |
| operando-velas-poker-alcistas | Activación | Caduca lo pendiente; no se cierra por ello una posición activada. Sin estadística comprobada. |
| regla-recorrido-1-1 | Medición | Rango de vela y distancia entrada–stop difieren cuando hay márgenes. |
| practica-1-alcista | Casos | Líneas aproximadas 3,4 / 1,9 / 4,7: 1,3 / 1,5 ≈ 0,87R. 1R daría 4,9. |
| practica-1-bajista | Casos | Líneas aproximadas 3,1 / 4,7 / 1,7: 1,4 / 1,6 = 0,875R. 1R daría 1,5; mecha inferior visible. |

Las lecturas numéricas de los originales son aproximaciones de sus ejes, no datos de ejecución ni un tick inferido. No se adoptan afirmaciones de éxito obligatorio o probabilidades sin evidencia.

## Seis láminas nuevas

[Generador](../../scripts/render-module-five-diagrams.py) con Pillow y los ayudantes existentes del módulo 2. Solo escribe en `module-05/editorial`; no edita originales. El [manifiesto editorial](../../public/course-reconstruction/module-05/editorial/manifest.json) incluye los datos sintéticos, referencias, tamaños y hashes.

| Lámina | Función didáctica |
| --- | --- |
| anatomia-medida | OHLC explícito; cuerpo 3,25, rango 4, mechas 0,25 y 0,50. |
| secuencia-w-m | Reacción antes de la ruptura; tramo posterior discontinuo, sin anticipación. |
| contexto-y-obstaculo | Misma vela con resistencias distintas: 108 y 104,25. |
| vigencia-candidata | La siguiente vela no alcanza 104,25 o lo cruza; caducidad frente a activación teórica. |
| rango-y-riesgo | H 104, L 100, tick 0,25: rango 4 y riesgo 4,50; compra y venta. |
| orden-intrabar | Mismo OHLC con dos órdenes temporales incompatibles para inferir el resultado. |

Todos los diagramas son de 1800 × 1100 píxeles. No representan mercado real, ejecuciones ni probabilidades validadas.

## Página y ejercicios

[Contenido](../../app/learning/module-five-content.ts) separado de la [vista](../../app/curso/modulo-5/page.tsx). Secuencia: anatomía → proceso → contexto → debilidad → activación → medición → orden temporal → casos → práctica.

Ocho ejercicios con **datos, pasos, entrega y respuesta razonada**: medidas OHLC, contexto, caducidad, rango frente a 1R, anclajes de Fibonacci, disponibilidad del cierre M15, incertidumbre intrabar y reventa frente a empuje. Las soluciones permanecen en desplegables separados. No se guardan respuestas ni se conceden calificaciones o progreso.

Se reutiliza el CSS de los módulos anteriores, sin nuevas dependencias. Accesos desde portada y módulo 4; enlace de regreso a módulo 4. Imágenes con dimensiones, texto alternativo, carga diferida y enlaces para ampliar o descargar. No se agregan llamadas a APIs ni órdenes de trading. La página tiene metadatos propios.

## Comprobaciones

- Base: 74 pruebas aprobadas. Final: **81 pruebas aprobadas, cero fallos**, incluidas [siete nuevas](../../tests/module-five-visuals.test.mjs).
- `npm run build`: aprobado, incluido el validador de artefacto Sites. Vinext informa su limitación existente de clasificación estática de rutas; no es un fallo de compilación.
- `npm run typecheck`: aprobado.
- `npm run lint`: cero errores, ocho advertencias de `img` en componentes existentes, ajenas a las imágenes nuevas.
- Ruta `/curso/modulo-5` y sus 17 PNG: HTTP 200 en `http://127.0.0.1:5173`.
- Once hashes cotejados nuevamente contra los archivos de la carpeta de fotografías. Las pruebas verifican firmas PNG, dimensiones, bytes, hashes y asignación de cada recurso exactamente una vez.
- Renderizado de servidor: 17 imágenes, 19 desplegables (11 originales y 8 soluciones), ocho bloques y metadatos propios. Verificación de navegación desde portada y módulo 4.
- Datos: OHLC coherente, márgenes de entrada y stop, objetivos desde rango y desde 1R, ruptura pendiente y orden intrabar ambiguo.
- Documentación: 139 enlaces locales con destino existente y sin caracteres de sustitución; `git diff --check` sin errores (solo aviso habitual LF/CRLF del registro).
- Los seis PNG nuevos se inspeccionaron directamente; se corrigió una superposición de rótulos en la lámina de vigencia y se volvió a inspeccionar. No se realizaron pruebas visuales ni interacciones en navegador.

Publicación alojada pendiente: el flujo de Sites no encuentra el proyecto configurado (`project_not_found`, HTTP 404). No se cambia su identificador, no se crea un sitio sustituto y no se afirma despliegue remoto. La entrega está disponible localmente.

### Comprobación manual sugerida

1. Abrir el módulo 5 desde la portada o desde el final del módulo 4.
2. Recorrer el índice y leer cada nota antes de abrir la imagen original.
3. Ampliar o descargar una imagen: debe conservar su título antiguo.
4. Resolver un ejercicio y abrir su respuesta: debe poder contrastarse con los datos entregados.
5. Regresar a la academia: esta lectura no concede avance ni modifica notas.
