# U WeAreTrades Academy

Plataforma de estudio de trading. Versión 0.2.1: 24 unidades explícitas, 20 casos de decisión y biblioteca de las fuentes aportadas.

## Iniciar en Windows

Requiere Node y npm. Validado con Node 24.16.0. El stack conserva React 19, Vinext/Vite, TypeScript, Drizzle, D1 y R2; versiones exactas en `package-lock.json`.

Desde **PowerShell**, dentro de la carpeta `proyecto`:

```powershell
# Solo si faltan dependencias:
npm run install:ci

# Si ya existe trabajo local, respaldarlo antes de migrar:
npm run backup:local

# Crea/aplica únicamente el esquema de desarrollo local:
npm run db:local
npm run dev
```

En una instalación nueva, sin `.wrangler/state`, omitir el respaldo inicial. Abrir la URL que imprime Vite; en este entorno es `http://127.0.0.1:5173/`. El servidor queda ligado a la interfaz local. No necesita credenciales ni importa datos publicados.

## Validaciones

```powershell
npm run typecheck
npm run lint
npm test
```

`npm test` incluye build y validación del Worker. Las advertencias de optimización de imágenes no equivalen a errores. El catálogo v1 conservado tiene pruebas identificadas como archivo histórico; las pruebas v2 verifican el recorrido activo.

## Organización

| Ruta | Responsabilidad |
| --- | --- |
| `app/learning/metadata.ts` | Tipos, versión, recorridos, glosario y discrepancias públicos |
| `app/learning/foundations.ts`, `method.ts`, `practice.ts` | Unidades explícitas y controles privados del servidor |
| `app/learning/catalog.ts` | Catálogo canónico y selección del contenido público |
| `app/learning/cases.ts` | Casos sintéticos, prefijos públicos y evaluación en servidor |
| `app/learning/workspace.tsx` | Ruta de estudio, lector, diagnóstico y progreso |
| `app/api/learning/route.ts` | Respuestas, revisiones, controles y decisiones persistentes |
| `app/api/state/route.ts` | Consulta del historial y diario compatible |
| `app/api/upload/route.ts` | Capturas limitadas y acceso por propietario |
| `lib/access.ts` | Identidad, origen, límites y errores de API |
| `db/schema.ts`, `drizzle/` | Modelo de datos y migraciones aditivas |
| `public/course-library.json` | Transcripciones y manifiesto de documentos |
| `scripts/project.mjs` | Comandos portables de desarrollo y respaldo |
| `tests/` | Cálculos, persistencia, seguridad y artefacto compilado |

Las fuentes originales están fuera de la raíz técnica, en `../fuentes_originales`. El importador `scripts/import-source-library.py` necesita Python con `python-docx`; verifica las copias existentes antes de regenerar la biblioteca. No es necesario ejecutarlo para iniciar la aplicación.

## Estado y límites

El trabajo se guarda explícitamente en el servidor; no se considera guardado por existir en un campo o en el navegador. El modo local usa una identidad separada de la autenticación publicada. Producción exige la identidad proporcionada por Sites. Las respuestas abiertas se autoevalúan: no se califican con IA ni certifican competencia.

El currículo v1 y su historial no se han eliminado. La nueva ruta es una adaptación editorial, no una transcripción corregida ni una certificación docente. Los escenarios son sintéticos; no representan backtesting histórico.

La publicación de esta versión está pendiente: el alojamiento devuelve `project_not_found` para el proyecto existente. Se conservó `.openai/hosting.json`; no se creó otro sitio. No se modificaron `app/chatgpt-auth.ts`, los originales ni el respaldo de producción.

- [Revisión y guía de prueba del laboratorio](docs/REVISION_LABORATORIO.md)
- [Cambios de versión](CHANGELOG.md)
- [Pruebas manuales, límites y despliegue seguro](docs/VALIDACION_V02.md)
- [Documentación original del starter conservada](docs/README_STARTER_V01.md)

La auditoría inicial está en `../AUDITORIA_PROYECTO_2026-08-27.md`. Sus resultados describen v1; las correcciones posteriores se registran en este README y el changelog. El manifiesto SHA-256 original del paquete no se ha regenerado: identifica la entrega original, no la versión modificada.
