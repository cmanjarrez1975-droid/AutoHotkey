# Ampliación didáctica con investigación externa — 0.2.2

Fecha: 27 de agosto de 2026. Base estable: `e32227a`, rama `codex/academy-v02`, árbol limpio antes de editar. Diagnóstico inicial: TypeScript sin errores y 37 pruebas aprobadas.

## Causa del problema

Las unidades ya tenían objetivos, ejemplos y ejercicios, pero el desarrollo principal seguía concentrado en tres párrafos. Eso funciona como repaso, no necesariamente como primera explicación. Faltaban pasos entre definición, reconocimiento visual, regla y decisión. La transcripción original 04 declara conocimientos previos; resumirla no resuelve esa brecha para un principiante.

El cambio se limita a dos unidades fundamentales para probar un formato más pausado. **No se afirma que las 24 clases estén reconstruidas ni que la comprensión haya sido validada con alumnos.** La aplicación conserva los otros 22 desarrollos actuales.

## Implementado

- `f-velas`: cinco secciones, anatomía con comprobación aritmética, dos recorridos que producen el mismo OHLC, formación de una vela de quince minutos y distinción entre dato e interpretación.
- `f-estructura`: seis secciones, comparación de extremos, regla explícita de relevancia, demostración progresiva de candidato/confirmado y transferencia al sentido bajista.
- Itinerario interno, ejemplos resueltos originales, pausas con pista y explicación desplegables, síntesis y propuesta de repaso diferido. No se crea ninguna automatización.
- Tres demostraciones locales sin dependencias nuevas. Texto y valores exactos acompañan los gráficos; controles nativos de botón, foco visible y anuncios de estado. Los gráficos no representan operaciones reales.
- Bibliografía comentada que distingue definición, convención editorial, interpretación y evidencia empírica. Se declara cuando solo se consultó un resumen.

Los materiales aportados siguen siendo la fuente principal: manual, módulos 1 y 3; transcripción 04; Guía de Demanda, pp. 2–3. Las series numéricas y las nuevas explicaciones paso a paso son elaboración editorial, no citas ni datos históricos de las fuentes externas.

## Investigación y alcance

Enlaces consultados en esta revisión. No se copiaron ilustraciones de terceros ni párrafos extensos.

| Fuente | Uso y límite |
| --- | --- |
| [CME: tipos de gráfico](https://www.cmegroup.com/education/courses/technical-analysis/chart-types-candlestick-line-bar) | Referencia terminológica de OHLC para el piloto. No valida interpretaciones sobre identidad de compradores o vendedores. |
| [IES: organización del aprendizaje](https://ies.ed.gov/ncee/wwc/practiceguide/1) | Diseño con ejemplos, gráficos y práctica. Guía general de 2007; trasladarla a esta plataforma requiere comprobar comprensión con alumnos. |
| [CME: patrones de continuación](https://www.cmegroup.com/education/courses/technical-analysis/trend-and-continuation-patterns) | Complemento conceptual, sin convertir patrones en predicciones seguras ni atribuirle nuestra convención de confirmación. |
| [Lo, Mamaysky y Wang, NBER, 2000](https://www.nber.org/papers/w7613) | Se consultó el resumen del estudio, no el artículo completo. Es una referencia histórica con alcance limitado, no una validación del método particular. |
| [Investor.gov: tipos de órdenes](https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders) | Candidato para ampliar riesgo/ejecución. Describe órdenes en acciones estadounidenses; condiciones de derivados y plataformas deben verificarse por separado. No integrado aún. |
| [CME: soporte y resistencia](https://www.cmegroup.com/education/courses/technical-analysis/support-and-resistance) | Candidato para explicar referencias y zonas. No integrado aún. |
| [Carol Osler, New York Fed, 2000](https://www.newyorkfed.org/research/epr/00v06n2/0007osle.html) | Solo se consultó el resumen. Estudia niveles de seis firmas en divisas y encuentra resultados heterogéneos; no demuestra rentabilidad general. No integrado aún. |
| [Bailey, Borwein, López de Prado y Zhu: The Probability of Backtest Overfitting](https://www.davidhbailey.com/dhbpapers/backtest-prob.pdf) | Se revisaron resumen e introducción de la versión de 2015: seleccionar entre muchas pruebas puede capturar ruido. Referencia para ampliar backtesting, no integrada aún ni implementado su método estadístico. |

La autoridad institucional de una fuente no acredita este curso. Las discrepancias «230», Donchian 5/2, medias y reglas de bloques continúan pendientes de contrastar con la configuración original; no se rellenan con definiciones ajenas.

## Compatibilidad

El campo opcional `lecture` amplía el modelo existente. El catálogo público lo entrega sin las claves privadas de los controles. Las pausas son ayudas abiertas expresamente sin calificación. Las demostraciones no escriben progreso.

Se mantienen los 24 IDs, versión curricular `2026.08.v2`, prerrequisitos, ejercicios guardados, banco de controles, criterios del laboratorio, autenticación y esquema de datos. No hay migraciones ni cambios en los originales. La versión de aplicación cambia de 0.2.1 a 0.2.2; el historial no se reinicia. Las estimaciones de lectura incluyen ahora el contenido desarrollado y las actividades, no solo los tres párrafos de resumen.

## Validación realizada

- `npm run typecheck`: sin errores.
- `npm run lint`: sin errores; permanecen 8 advertencias preexistentes sobre imágenes.
- `npm test`: compilación y 48 pruebas aprobadas (37 anteriores + 11 del piloto).
- Pruebas nuevas: igualdad OHLC entre caminos, cuerpo/mechas/rango, precios negativos, rango cero, entradas incoherentes, reloj parcial, confirmación en el primer paso permitido, navegación fuera de rango, enlaces internos, estimación de lectura y protección de claves del control.
- Prueba del artefacto: respuesta HTML válida con los datos del piloto y sin claves privadas; API de producción mantiene autenticación.
- Petición HTTP local a `http://127.0.0.1:5173/`: 200 con los cambios. Servidor conservado en ejecución.
- No se realizó interacción ni inspección visual en navegador. La legibilidad y la comprensión real siguen pendientes de revisión humana.

Publicación: esta entrega está disponible localmente. La conexión al proyecto Sites ya había fallado con `project_not_found`; no se reintentó ese error terminal ni se creó otro proyecto. La versión alojada no está actualizada por esta revisión.

## Recorrido manual recomendado

1. En la aplicación local, guarda cualquier respuesta pendiente antes de recargar. Entra en Fundamentos y abre «Una vela, cuatro precios y un reloj».
2. Debe aparecer «Clase desarrollada · Piloto didáctico» y un itinerario de cinco pasos. Comprueba las anclas con ratón y teclado, y las pistas con Enter o Espacio.
3. En «Dos recorridos, una vela», cambia ambos botones: la línea cambia; O100/H108/L97/C104 y las mechas 3/4 se mantienen.
4. Avanza el reloj desde minuto 0 hasta 15. Solo el último paso debe decir «Cierre definitivo». Comprueba que volver y reiniciar restauran valores, sin afectar la respuesta guardada.
5. Abre «De los giros visibles a la estructura». En P3 debe mostrar extremo provisional; P4, candidato; P5, confirmado al observar 113. 121 y 109 no deben aparecer en el gráfico ni en su lista antes de revelarlos.
6. Resuelve y guarda el ejercicio habitual, cambia de clase y vuelve: tu texto y progreso deben recuperarse. Los controles siguen comprobándose en servidor.
7. Abre la bibliografía y verifica que las fuentes externas se abren aparte. Revisa también una lección sin piloto: debe mantener su explicación y actividades anteriores.

## Siguiente ampliación propuesta — no implementada

Primero comprobar con el alumno si puede explicar una vela nueva y justificar el momento de confirmación sin leer la solución. Después extender el mismo formato, conectando cada tramo:

1. Zonas y temporalidades: referencia, llegada, respuesta y condiciones de cancelación.
2. Órdenes y riesgo: ejecución frente a precio, cálculo guiado y límites del modelo por instrumento.
3. Método: reconstrucción desde las fuentes originales, con ejemplos y contraejemplos comparables. Mantener discrepancias explícitas.
4. Integración: costos, replay, sesgos de backtesting, tamaño de muestra y separación entre calidad de proceso y resultado económico.

La aprobación de pruebas técnicas no sustituye esta comprobación pedagógica ni certifica competencia operativa.
