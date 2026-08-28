# Validación y puesta en marcha de 0.2.0

## Qué comprueban las pruebas

`npm test` construye primero el artefacto que se sirve y después ejecuta las pruebas. `npm run test:unit` reutiliza el último artefacto; no sustituye la validación completa después de modificar código.

- Integridad del catálogo y orden de prerrequisitos; campos educativos explícitos y ausencia de párrafos repetidos.
- Documentos descargables: comparación SHA-256 contra el manifiesto de biblioteca.
- 20 escenarios únicos; el prefijo público excluye futuro y correcciones.
- Cálculos de riesgo, geometría, costos, pasos de contrato y ATR a partir de OHLC.
- Rutas de servidor ejecutadas sobre SQLite en memoria mediante un adaptador de la interfaz D1: persistencia, revisión, aislamiento, evaluación, intentos y diario.
- Aplicación de las migraciones a una base con un registro v1: el registro se conserva después de agregar v2.
- Acceso a capturas usando un doble de almacenamiento R2: propietario autorizado, otro usuario rechazado y SVG rechazado.
- HTML del Worker compilado y ausencia de correcciones privadas en los archivos JavaScript del navegador. Un GET no autenticado al Worker compilado devuelve 401, aunque su URL sea localhost.

Estos tests no acreditan fidelidad editorial completa, usabilidad, rentabilidad ni la configuración de acceso del alojamiento. Los usuarios de las pruebas son identidades sintéticas; falta comprobar dos cuentas reales en el entorno publicado.

## Comprobación manual recomendada

En PowerShell, desde `proyecto`, ejecutar `npm run dev` después de inicializar la base con `npm run db:local`.

1. Abrir la URL local indicada por Vite. Deben aparecer 24 unidades, tres recorridos y 20 casos, no un contador de 127 lecciones completadas.
2. Entrar en la primera lección, escribir una respuesta y pulsar **Guardar respuesta**. Esperar el mensaje de confirmación. Recargar y usar **Continuar estudiando**: debe recuperarse el texto.
3. Abrir la misma lección en dos pestañas. Guardar un cambio en A y luego otro en B. B debe indicar conflicto, conservar su texto y no sobrescribir A. Copiar el texto de B antes de recargar.
4. Escribir sin guardar e intentar navegar: debe solicitar confirmación de descarte. Si el servidor falla, debe conservar el texto y no afirmar que se guardó.
5. En un caso de replay, la continuación no aparece antes de registrar la decisión. Después, **Revelar siguiente cierre** avanza de uno en uno. La nota no cambia al descubrir un desenlace favorable o adverso.
6. Registrar una abstención en el diario con resultado 0R. Debe conservarse y quedar fuera de la media de operaciones. Una abstención con resultado distinto de cero debe rechazarse.
7. En la biblioteca, buscar una clase, abrir la transcripción y descargar un documento. Comprobar título y correspondencia con la fuente aportada.
8. En escritorio y móvil, revisar navegación, lectura, formularios, teclado y foco. Esta comprobación visual queda pendiente; no se ha simulado su aprobación.

## Producción y seguridad

La identidad se recibe de `oai-authenticated-user-email`, bajo el contrato del alojamiento Sites. No exponer directamente este Worker detrás de un proxy que permita falsificar esa cabecera. Si se cambia de proveedor, debe diseñarse autenticación equivalente, no reutilizar la cabecera como prueba de identidad.

El modo `owner` local solo funciona con desarrollo y la bandera compilada de Vite. Los datos locales están en `.wrangler/state`, separados de producción. No contiene una asignación automática de los antiguos registros `owner` a una persona. Si producción tuviera historial compartido bajo esa clave, resolver su propiedad antes de cualquier migración de identidad.

Antes de publicar:

1. Recuperar acceso al proyecto configurado en `.openai/hosting.json`; no generar otra identidad para eludir el error.
2. Confirmar acceso privado/compartido y autorización de distribución de los documentos originales. Los materiales de `public/` están disponibles a quienes tengan acceso al sitio; no son una biblioteca privada por alumno.
3. Obtener respaldo actualizado de producción y revisar la migración aditiva `0002`. No importar el JSON del paquete sobre la base activa.
4. Publicar código y migraciones usando el flujo del mismo proyecto. Confirmar autenticación y aislamiento con dos cuentas reales.
5. Revisar el piloto con un alumno: términos desconocidos, ayuda necesaria y capacidad de resolver un caso distinto. Registrar resultados y ajustar antes de certificar contenido.

## Recuperación y compatibilidad

- `npm run backup:local` copia el estado completo a una carpeta nueva dentro de `.sites-runtime`. Nunca borra el origen.
- Para revertir el código, usar la revisión estable `5a0d6c9` en una rama o checkout separado. No borrar las tablas v2: el código anterior simplemente no las utiliza. Esa revisión vuelve a tener los riesgos de seguridad señalados en la auditoría; no es una reversión segura para admitir alumnos externos.
- Los registros de v1 se consultan como historial. Sus IDs y sus notas no se convierten en competencias de v2. La correspondencia de módulos es informativa, no equivalencia académica.
- Un error de guardado o revisión no debe resolverse borrando la base. Copiar primero el texto pendiente y diagnosticar el error del servidor.
- Las imágenes se validan por formato/firma y tamaño; esto no sustituye un antivirus ni valida semánticamente el contenido de una captura.
- El tiempo acumulado cuenta intervalos con ventana enfocada y se limita por envío. No se presenta como duración real exacta, tiempo acreditado ni prueba de atención.
