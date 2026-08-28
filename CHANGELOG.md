# Cambios

## 0.2.2 — Dos clases piloto desarrolladas con bibliografía complementaria

- Velas y estructura pasan del resumen a una explicación progresiva, con ejemplos propios, pistas, pausas de razonamiento y repaso diferido.
- Tres demostraciones: dos caminos con el mismo OHLC, una vela en formación y confirmación estructural paso a paso.
- Referencias de CME, IES y un resumen académico comentadas según su alcance, manteniendo los materiales originales como base.
- Se separan observación, convención del curso e interpretación; no se presenta la confirmación como garantía de rentabilidad.
- Estimación de lectura ajustada al desarrollo. IDs, controles, historial, laboratorio y versión curricular permanecen intactos.
- TypeScript y compilación correctos; 48 pruebas aprobadas. No hay prueba visual ni validación de comprensión con alumnos. Las otras 22 clases conservan su desarrollo anterior.

Investigación, límites y recorrido de comprobación en `docs/AMPLIACION_DIDACTICA.md`. Disponible localmente; no se actualizó la versión alojada.

## 0.2.1 — Revisión de los ejercicios de laboratorio

Se revisan los 20 escenarios después de observar que sus instrucciones no permitían desarrollarlos con claridad.

- Se explica la diferencia entre simular entrada, esperar una condición y descartar un plan, con un ejemplo resuelto independiente.
- Cada caso tiene objetivo, datos aportados, tres pasos y tres preguntas específicas. Se separa lo visible en los cierres de las propiedades de velas o indicadores declaradas por el escenario.
- El gráfico incorpora referencias, franjas, puntos P1…Pn, corte de decisión y valores exactos. Reserva el mismo espacio de continuación para todos los ejercicios, sin usar el futuro oculto para calcular su escala.
- Los casos de W, M y bloques aclaran el orden de los eventos: la confirmación debe ocurrir después del segundo intento o de la visita correspondiente.
- La respuesta se divide en observación, comparación con la regla y cambio de lectura. Los campos pendientes se explican; las respuestas abiertas no se califican automáticamente.
- Los planes dimensionables muestran dirección, entrada fija, precios de stop/objetivo, presupuesto, costos y fórmula neta. La corrección explica qué límite debe revisarse.
- Navegación anterior/siguiente, repetir ejercicio y regresar a la lección relacionada. El trabajo sin registrar mantiene la confirmación de descarte.
- Se conservan IDs, versión curricular, pesos y criterios de evaluación. Los argumentos se guardan en el campo existente con tres encabezados; no se migra ni borra el historial.

Validación y pruebas manuales descritas en `docs/REVISION_LABORATORIO.md`. Esta revisión mejora instrucciones y representación; no convierte los cierres sintéticos en velas OHLC ni equivale a validar la comprensión con alumnos.

## 0.2.0 — 27 de agosto de 2026

Base de trabajo: revisión `5a0d6c9`, rama `codex/academy-v02`.

### Aprendizaje

- La portada usa un currículo explícito de 24 unidades: Fundamentos (6), Método y estrategias (12) y Práctica e integración (6).
- Cada unidad incluye prerrequisitos, objetivo observable, explicación propia, ejemplo, contraejemplo, ejercicio, rúbrica de autoevaluación, solución, fuente y enlace conceptual al tema siguiente.
- Se deja de mostrar como curso activo el generador de 127 fichas. El código anterior permanece archivado para compatibilidad y trazabilidad; sus pruebas se identifican como archivo v1.
- Diagnóstico inicial de seis conceptos, búsqueda, glosario y matriz de seis discrepancias. Las configuraciones no resueltas no se convierten en respuestas obligatorias.
- Biblioteca: 38 secciones extraídas de las transcripciones aportadas, 12 documentos con SHA-256 y los cuatro medios ya presentes. Las transcripciones no se presentan como clases reconstruidas ni como texto corregido.
- 20 escenarios sintéticos con información futura separada. Decisión y fundamento se guardan antes de revelar la continuación; el riesgo forma parte de la corrección cuando corresponde.

### Plataforma

- Respuestas por alumno, recorrido, versión y lección. Guardado explícito con confirmación; recuperación desde servidor y control de revisión para conflictos entre pestañas.
- Progreso separado en estudiada, práctica autoevaluada y control conceptual aprobado. No se atribuye competencia profesional a esos estados.
- Evaluaciones cerradas calculadas en servidor; el paquete del navegador no contiene el banco de correcciones ni las claves de evaluación de casos.
- Diario sin operaciones ficticias iniciales; admite abstenciones y capturas propias. Calculadora neta con costos, valor por punto e incremento de contrato.
- Identidad obligatoria para persistencia publicada; modo local limitado al entorno de desarrollo. Capturas con prefijo de propietario, autorización de lectura, límite de tamaño y rechazo de SVG.
- Scripts nativos de Node para Windows, tipos Cloudflare, inicialización local y respaldo conservador. Dependencias existentes conservadas.
- Migración `0002` aditiva: tres tablas nuevas. No borra ni transforma el historial anterior.

### Límites de esta entrega

- No se ha realizado la prueba del piloto con un alumno representativo, revisión docente ni certificación. El currículo nuevo es una adaptación editorial que debe validarse pedagógicamente.
- «230», la configuración Donchian 5/2 y algunas distinciones de EMA/velas siguen señaladas como discrepancias de las fuentes.
- No hay evaluación automática de argumentos abiertos, simulador de ejecución histórica OHLC, conectividad con bróker ni operaciones reales. Los replay usan cierres sintéticos explícitamente etiquetados.
- El análisis con IA continúa desactivado. Los videos aún no cuentan con subtítulos revisados.
- Pruebas técnicas automatizadas y comprobaciones HTTP locales; sin prueba visual interactiva, prueba móvil en dispositivo ni dos sesiones reales de ChatGPT.
- Publicación no realizada: el servicio devolvió `project_not_found` para la identidad existente. No se sustituyó el proyecto ni se aplicaron migraciones a producción.
