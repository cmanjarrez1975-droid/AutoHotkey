# Revisión del laboratorio — 0.2.1

## Diagnóstico

Base: `2c7399c`, árbol limpio antes de modificar. TypeScript y las 28 pruebas anteriores pasaban; esas pruebas no comprobaban que el alumno supiera cómo empezar un ejercicio.

Problemas identificados en los 20 enunciados y en su interfaz:

1. Se mencionaban precios y zonas que no estaban señalados en el gráfico.
2. La línea se trataba como si mostrara velas, contacto intravela o curvas de medias. Solo representa cierres; esas propiedades no se pueden deducir de ella.
3. «Esperar» y «descartar» aparecían sin criterios diferenciados. Faltaba explicar que una condición pendiente no es lo mismo que una cancelación ya ocurrida.
4. En W, M y bloques, una referencia podía haberse superado antes del evento que debía confirmar. El alumno necesitaba saber desde qué punto comparar.
5. «Evidencia y alternativa» era una consigna demasiado abierta. El botón quedaba deshabilitado sin explicar todos los requisitos.
6. El cálculo de riesgo mezclaba precio, distancia, presupuesto y tamaño sin una guía suficiente; la corrección «coherente o no aplicable» resultaba poco útil.

## Qué cambia

Los datos, decisiones correctas y pesos no cambian. Se añade una capa editorial explícita en `case-guides.ts`, con una entrada distinta por ID. `lab-model.ts` concentra comprobaciones de formulario y cálculos transparentes, sin claves de respuestas. La evaluación sigue en el servidor.

| Familia | Ayuda añadida |
| --- | --- |
| Estructura | Máximo previo, mínimo candidato y cierres que deben compararse después del retroceso |
| Zonas | Franja de trabajo y distinción entre falta de visita y recorrido insuficiente |
| W / M | Primer extremo, base, segundo extremo y comparación posterior en orden temporal |
| Fibonacci | Anclajes fijos y diferencia entre profundidad, confirmación y cancelación |
| Póker | Anatomía como dato aportado; ubicación y cota del riesgo separadas del tamaño de la vela |
| Bloques | Orden de alejamiento, regreso, confirmación y regla de anulación |
| EMA | Valores/contexto declarados; no se dibujan medias falsas calculadas con historia insuficiente |
| Donchian | Bandas previas de referencia, ruptura y aceptación consecutiva |
| Cripto / rutina | Fórmula neta y uso de la entrada disponible, no de un precio pasado |

Los campos del argumento se unen en el texto existente con encabezados. Los intentos previos conservan su formato y su nota. La revisión del laboratorio no reinicia el progreso de las lecciones.

## Pruebas técnicas

Se añaden nueve pruebas a las 28 existentes: cobertura de guías para cada ID, referencias temporales W/M/bloques, límites de lo observable, escala sin futuro oculto, igualdad de cálculo entre formulario y servidor, requisitos claros, geometría de entrada, ausencia de claves privadas y corrección de riesgo específica.

Ejecutar en PowerShell dentro de `proyecto`:

```powershell
npm run typecheck
npm run lint
npm test
```

Las pruebas automatizadas comprueban estructura, cálculos y privacidad del payload; no prueban comprensión humana ni apariencia en dispositivos.

Resultado de esta revisión: 37 pruebas aprobadas, TypeScript sin errores y compilación correcta. ESLint no reportó errores; mantiene las ocho advertencias anteriores de optimización de imágenes. Se consultaron por HTTP los 20 ejercicios locales: todos respondieron con tres pasos, tres preguntas y sin el campo de futuro. La portada respondió HTTP 200. No se modificaron esquema, migraciones, autenticación ni datos almacenados.

## Cómo probar como alumno

1. Actualizar la página local y abrir **Laboratorio de decisiones**. Leer el ejemplo independiente antes de empezar.
2. Abrir **Barrido sin recuperar la base**. Deben aparecer las referencias 100, 105 y 99; ubicar P3, P5 y P7. Las instrucciones piden comparar P8 y P9 después del segundo suelo, sin usar el futuro.
3. Pulsar **Registrar respuesta y ver corrección** con el formulario vacío: debe explicar qué falta. No se debe guardar ni revelar información posterior.
4. Seleccionar una acción y un fundamento. Completar las tres frases y registrar: debe mostrarse la corrección y permitir revelar los siguientes cierres uno por uno.
5. En **Ruptura confirmada con espacio**, elegir simular entrada, stop 106, objetivo 130 y presupuesto 100. El cálculo debe mostrar pérdida por unidad 7,10 y ratio neto aproximadamente 2,38. El precio de entrada permanece en 113.
6. En **Ruptura bajista con recorrido**, usar entrada fija 114, stop 121, objetivo 95 y presupuesto 100. El ratio neto debe ser aproximadamente 2,61. Confirmar que las fórmulas del corto están invertidas respecto del largo.
7. Repetir un caso: debe volver a ocultar el futuro y permitir un nuevo intento sin borrar el anterior. Si hay texto sin registrar, cambiar de caso o de sección debe pedir confirmación.
8. En **Cruces repetidos sin pendiente**, debe explicarse que las EMA planas son datos aportados y que no se pueden recalcular desde ocho cierres.

No se ejecutó una prueba visual interactiva ni una sesión con alumno. Conviene completar esos pasos y observar si puede resolver un caso nuevo sin asistencia. Los escenarios siguen siendo didácticos y no son un simulador de ejecuciones reales.
