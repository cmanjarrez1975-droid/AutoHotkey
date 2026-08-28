# Cambios

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
