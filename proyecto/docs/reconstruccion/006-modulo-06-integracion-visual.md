# Módulo 6 · Integración visual de Order Block

Fecha: 2026-08-28. Numeración confirmada por la petición de integrar estas imágenes en el módulo 6. Base Git `8ed289e`, versión 0.2.3; árbol con trabajo anterior de módulos 5 y 6 sin commit, conservado. La versión del paquete no se incrementa.

## Alcance

Nueva página local `/curso/modulo-6`, contenido en `app/learning/module-six-content.ts`, enlaces desde la portada y el módulo 5. Reutiliza la presentación de las páginas de reconstrucción, sin refactorizaciones de la plataforma, cambios de progreso, evaluaciones, bases de datos o configuración de alojamiento. Cada imagen se amplía y descarga, con texto alternativo y nota visible antes de desplegar el original. Se conserva la clasificación de material en reconstrucción.

Fuentes principales: [012–014 y decisiones editoriales](006-modulo-06-trazabilidad.md). La integración mantiene los ocho ejercicios del [desarrollo escrito](006-modulo-06-order-block-borrador.md), con datos, pasos, entrega y solución desplegable. Las respuestas no se guardan ni se califican automáticamente. No se crean videos en esta entrega.

## Recepción e integridad

Se copiaron **nueve PNG originales, 1,370,991 bytes**, desde `C:/Users/cmanj_omppgbr/Downloads/fotos/`, sin edición, recorte o renombrado. Ubicación de copias: `public/course-reconstruction/module-06/originals/`. El manifiesto conserva dimensiones, bytes y SHA-256; la prueba fija los hashes de recepción independientemente del generador. Las tres transcripciones previas conservan sus hashes.

| Archivo | Dimensiones | Bytes | SHA-256 |
| --- | --- | --- | --- |
| 20260828_m4-confluencia-poker-ob-alcista.png | 1742 × 1185 | 200515 | `786f6347b7964f32b4d1ff94bfd5bbc541febddebdaa5f356325fdd668e98a0e` |
| 20260828_m4-confluencia-poker-ob-bajista.png | 1742 × 1189 | 198912 | `80118491bb2184bd64e8e4479526f8ae7d80075df60d80e1ecef8eb5059694e2` |
| 20260828_ob-1-anatomia-comparativa.png | 2020 × 1014 | 152429 | `50eeacdf425ce071e39e684c4fc895d9be86aea0a589514f856be8e9e026a21a` |
| 20260828_ob-2-criterios-validacion.png | 1446 × 882 | 92685 | `cb80aa3c6198cc2981d4ff76e90f347fec37840e8cc033317b169a8e18540ca1` |
| 20260828_ob-3-operativa-mitigacion.png | 1437 × 882 | 104242 | `01181514c7b08b99e3b833965087e1cc32b10abbcfd189d5b3265c73fb6a2c1b` |
| 20260828_ob-4-flujo-estructura.png | 1785 × 1033 | 142073 | `f555ee66136fa7081247c804b20d40185709f334c9f9bf30e2ec7a4c29488604` |
| 20260828_m4-poker-ob-stops-seguros.png | 1634 × 1030 | 143739 | `9365bf7e30394d6650f293dd016dda391b5a3dfea877b689fea215b7d87a948d` |
| 20260828_m4-poker-ob-dientes-sierra.png | 1615 × 1032 | 142827 | `13f3b10f71b2e35b1067583c51ad3403652f6e56770b210f37afea753cb86522` |
| 20260828_m4-poker-ob-usdjpy-real.png | 2348 × 1029 | 193569 | `314af5d45b862d6daa3c4fda9535bd3778f7e80b6140aaf08b29b73c723d3713` |

## Orden de aprendizaje

1. Formación y cuerpo frente a mechas.
2. Hora de conocimiento y persistencia de la visita.
3. Retorno, contacto y límites de la palabra mitigación.
4. Contexto, referencia local y reacción póker.
5. Destinos, primer borde y obstáculos intermedios.
6. Temporalidades e información disponible.
7. Stop, cantidad, recorrido y anclajes Fibonacci.
8. Lectura crítica de los tres relatos; después, ocho ejercicios.

## Aclaraciones de los originales

- Anatomía: el color del origen no es el sentido posterior. Tres velas no acreditan toda la estructura marcada como BOS ni participantes institucionales.
- Criterios: FVG, BOS y barrido no se convierten en tres requisitos universales del profesor; la geometría del FVG aportado no se presenta como verificada.
- Mitigación: el retorno dibujado entra en el rectángulo, pero no demuestra órdenes pendientes ejecutadas. Proponer entrada en apertura o 50 % es una variante; el TP 11 no aparece alcanzado por la última vela, cuyo máximo ronda 10.
- Flujo: el retroceso a 5 no toca el bloque originario [2,50;4]. El retorno posterior a 7 toca el borde del segundo rectángulo [5;7], sin probar cuerpos de origen ni ejecuciones.
- Dientes de sierra: W local con referencia 2,50, distinta del máximo anterior 3,20; no se exige siempre un número fijo de dientes ni un patrón armónico.
- Confluencias compradora y vendedora: mínimo mayor o máximo menor no equivalen por sí solos a ruptura; textos superpuestos no ofrecen precios ejecutables y la curva no identifica órdenes institucionales.
- Stops: no hay un stop seguro. El supuesto incremento de acierto del 10–15 % no tiene muestra. Ampliar distancia exige recalcular cantidad; bajar apalancamiento no sustituye el riesgo monetario.
- USD/JPY: el nombre real no convierte ejes esquemáticos 1–5 en datos históricos. La flecha de ruptura es anterior al cruce; TP 5 es borde lejano de [4;5]. Sin anclajes no se verifica 38,2 %, ni sin fechas se sincronizan H1 y M15.

## Seis diagramas nuevos

Generador reproducible `scripts/render-module-six-diagrams.py`, basado en los helpers existentes de Pillow; coordenadas y cálculos ficticios en el manifiesto editorial. No edita las imágenes aportadas.

- **cuerpo-y-mechas**: Dos orígenes ficticios: cuerpo comprador [101;104] con mínimo 99 y cuerpo vendedor [108;110] con máximo 112.
- **visita-persistente**: A no toca; B visita por su mínimo; C se aleja sin borrar la visita registrada. Líneas negras: rango de cada barra, punto verde: cierre de B.
- **retorno-y-contacto**: Comparación numérica: el retorno a 5 no visita [2,50;4]; el retorno a 3,50 sí. La geometría no demuestra ejecuciones.
- **reaccion-y-ruptura**: Una W local reacciona a 2,40 sin romper 2,50; en el segundo estado alcanza 2,80 pero no rompe la referencia mayor 3,20.
- **stop-y-cantidad**: Mismo destino 108 y entrada 103. Stop 101: 2,5R y 10 unidades; stop 99: 1,25R y 5 unidades para mantener riesgo teórico 20.
- **tiempo-disponible**: H1 abre a las 11:00, la decisión M3 es a las 11:36 y el cierre H1 solo estará disponible a las 12:00.

Los seis PNG se inspeccionaron directamente. Se corrigió una etiqueta que cruzaba el trazo en la comparación de contacto y se volvió a inspeccionar la versión final. Esto es revisión del recurso gráfico, no prueba visual de navegador.

## Verificación realizada

- Base antes de cambios: 81/81 pruebas existentes.
- `npm run build`: correcto, ruta nueva incluida y artefacto Sites verificado.
- `npm run typecheck`: correcto.
- `npm run test:unit`: **88/88 pruebas**, incluidas siete del módulo 6. Verifican hashes, PNG, asignación única, notas, geometría, estados persistentes, riesgo, tiempo, ejercicios, metadatos y renderizado del servidor compilado.
- `npm run lint`: cero errores y ocho advertencias preexistentes de imágenes en otros componentes.
- HTTP local: portada, módulo 5 y módulo 6 responden 200. Los quince recursos gráficos responden 200 con MIME PNG y SHA-256 coincidente; los nueve originales también coinciden con los archivos de Descargas.
- La respuesta HTML compilada contiene quince imágenes y diecisiete desplegables (nueve originales y ocho soluciones), con título y metadatos propios. No añade escrituras de progreso.
- No se ejecutaron capturas, clicks ni inspección DOM de navegador; esas pruebas no se afirman.

## Pendientes

La publicación alojada sigue bloqueada por el `project_not_found` HTTP 404 ya registrado para el proyecto configurado. No se reintentó ese error terminal sin cambio de estado ni se sustituyeron IDs o bindings. La URL comprobada es local.

Las capturas originales de las operaciones, fechas, precios, registros de ejecución, anclajes exactos y muestra de rendimiento siguen pendientes. Los nuevos esquemas no sustituyen esos datos. En esta integración el módulo 7 todavía estaba pendiente. Su entrega posterior se registra en [Módulo 7: Velas Profesionales](007-modulo-07-trazabilidad.md); no se reincorpora el módulo excluido de rutinas.
