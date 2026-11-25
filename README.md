# U WeAreTrades Academy

Proyecto de estudio de trading, versión técnica `0.2.3`.

## Estructura

- `proyecto/`: aplicación, pruebas, migraciones y documentación técnica.
- `fuentes_originales/`: documentos y medios originales de referencia.
- `respaldo_datos/`: respaldo operativo local, excluido de Git.
- `tmp/`: archivos de trabajo locales, excluidos de Git.

## Ejecutar en Windows

Desde PowerShell:

```powershell
Set-Location -LiteralPath 'D:\AutoHotkey\08 WeAreTrades_Academy\proyecto'
# Solo si faltan las dependencias:
npm run install:ci
npm run dev
```

Abrir la dirección local que imprime Vite. Para una instalación nueva y para
las validaciones, consultar [la guía técnica](proyecto/README.md).

## Traslado y Git

El proyecto se trasladó desde OneDrive a `D:\AutoHotkey\08 WeAreTrades_Academy`
el 24 de noviembre de 2026. La raíz de Git abarca ahora esta carpeta, para incluir
la aplicación y las fuentes originales en un solo repositorio. El historial
previo de la aplicación se conserva; los commits anteriores al traslado tienen
los archivos de la aplicación directamente en la raíz.

Las dependencias, cachés, bases de datos y respaldos se conservan en el disco,
pero no se publican en GitHub. No se modificó el comportamiento de la aplicación.

Repositorio: https://github.com/cmanjarrez1975-droid/AutoHotkey
