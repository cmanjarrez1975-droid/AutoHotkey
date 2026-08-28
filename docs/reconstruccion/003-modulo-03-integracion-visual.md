# Integración visual del módulo 3

Integración local del 2026-08-28 sobre la base git `ad7091d`. Se usa la numeración del usuario: **módulo 3: Principales retrocesos en Tendencias Alcistas**. No se sustituye el catálogo existente.

La [vista del módulo 3](../../app/curso/modulo-3/page.tsx) se abre en `/curso/modulo-3`, desde la portada o el final del módulo 2. Incluye siete bloques de estudio y cinco ejercicios con respuesta desplegable. No escribe calificaciones, intentos ni progreso.

## Fuentes e integridad

Fuente principal: [transcripción 004](fuentes/004-modulo-03-retrocesos-original.txt), recibida por duplicado y todavía truncada. Complemento: [manual original](../../public/course-originals/01-APRENDE_NUEVAS_ESTRATEGIAS_TRADING-1-.pdf), páginas 37–46, revisadas en la preparación editorial anterior. Las imágenes nuevas no acreditan que se haya recibido la continuación de la transcripción ni los videos anunciados.

Se conservan doce PNG originales, 1.668.877 bytes en total, sin alterar sus rótulos ni su numeración antigua “m2”. El [manifiesto de originales](../../public/course-reconstruction/module-03/originals/manifest.json) registra ruta, dimensiones, tamaño y SHA-256. Los hashes esperados también están fijados en las pruebas, separados del manifiesto.

## Ubicación y notas de los doce originales

Todos los archivos llevan el prefijo `20260828_m2-` y extensión `.png`. La nota se ve antes de desplegar la imagen; el archivo puede ampliarse y descargarse intacto.

| Nombre sin prefijo | Bloque | Aclaración visible |
| --- | --- | --- |
| tipos-de-retrocesos | 1. Tipos | Prototipos, no clasificador rígido por número de velas. |
| criterios-ubicacion | 1. Tipos | Las ubicaciones no acreditan tasas de éxito ni una “zona de oro”. |
| ubicaciones-tendencia-1 | 1. Tipos | El círculo inicial precede al primer impulso marcado; faltan anclajes numéricos. |
| engano-alcista | 2. Pausa | El desenlace posterior no se conoce al cerrar la primera pausa. |
| retrocesos-despues-de-rangos | 3. Rangos | El mínimo queda algo por encima de la línea, no en un apoyo exacto. |
| patrones-velas-compradores | 4. Velas | Cuatro familias complementarias, distintas de los seis grupos sin nombre del manual. |
| mapa-confluencia-compradora | 4. Velas | Contextos alternativos; confluencia no demuestra participación institucional. |
| retroceso-profundo-micro-tendencia | 5. Profundos | Hay estructura descendente, pero el último giro es una V; falta el segundo fondo de una W. |
| retroceso-profundo-sin-tendencia | 5. Profundos | Los cuerpos no muestran el martillo rotulado; el soporte no garantiza recuperación. |
| analisis-15m-anterior | 6. Mapa | Sin perfil de volumen no se verifica POC; el retorno en torno a 115 no toca 118 ni 112. |
| practica-2-analisis | 7. Fibonacci | 38,2 % = 118,506 para 108–125; la flecha está bastante por debajo. |
| practica-3-analisis | 7. Fibonacci | El mínimo señalado está por debajo del soporte, no en el 50 %. |

## Cinco láminas nuevas

| Lámina | Referencia y objetivo |
| --- | --- |
| [Tres retrocesos](../../public/course-reconstruction/module-03/editorial/tres-retrocesos.png) | P. 37: comparar duración y profundidad mediante OHLC ficticio explícito. |
| [Después del rango](../../public/course-reconstruction/module-03/editorial/retrocesos-tras-rango.png) | P. 42: retorno a la referencia y pausa por encima. |
| [Microtendencia, W y V](../../public/course-reconstruction/module-03/editorial/microtendencia-w-v.png) | Pp. 45–46: distinguir estructura de caída y forma de recuperación. |
| [Fibonacci comprobado](../../public/course-reconstruction/module-03/editorial/fibonacci-verificado.png) | Complemento matemático de las dos prácticas recibidas; no datos de mercado recuperados. |
| [Lectura de confluencias](../../public/course-reconstruction/module-03/editorial/lectura-de-confluencias.png) | Pp. 43–46: contexto, ubicación, secuencia, condición pendiente y revisión. |

Generador: [render-module-three-diagrams.py](../../scripts/render-module-three-diagrams.py), con Pillow y primitivas del generador del módulo 2. No abre ni modifica los originales. El [manifiesto editorial](../../public/course-reconstruction/module-03/editorial/manifest.json) contiene medidas, hashes, OHLC ficticio y cálculos reproducibles. Las cinco láminas se inspeccionaron directamente como archivos; no se generaron videos.

Se usa la escala explícita `nivel = máximo − proporción × (máximo − mínimo)`. Con 108 y 125, 38,2 % = 118,506; 115 equivale al 58,82 %. Con 71 y 100 fijados como anclajes didácticos, 50 % = 85,5; 68 equivale al 110,34 %. Estos valores aclaran la discrepancia de las flechas y no afirman conocer el OHLC original. El 76,4 % se conserva.

## Arquitectura y verificación

[Contenido y notas](../../app/learning/module-three-content.ts) separados de la vista. Se reutiliza el CSS del módulo 2 sin cambiar sus láminas. Imágenes con dimensiones declaradas, carga diferida y texto alternativo; controles HTML nativos. No se añaden dependencias, APIs, migraciones ni claves de evaluación.

[Pruebas del módulo](../../tests/module-three-visuals.test.mjs): integridad de 17 PNG, doce notas y asignación única, OHLC, matemáticas, estado parcial, enlaces y renderizado de servidor con metadatos propios. La página produce 17 imágenes y 17 desplegables (12 originales y 5 respuestas).

Resultados:

- Base antes de cambiar: 61 pruebas aprobadas.
- Compilación y validación del artefacto: aprobadas con la ruta nueva.
- TypeScript y ESLint de la página, datos y pruebas nuevas: aprobados.
- ESLint de archivos afectados: sin errores; persiste una advertencia previa por un `img` en la vista principal, fuera del cambio.
- HTTP local: portada y módulos 2 y 3 respondieron 200; los 17 PNG se sirvieron con bytes idénticos a sus manifiestos.
- Doce originales comparados byte por byte con la entrega, 17 PNG decodificados y 77 enlaces locales de documentación comprobados.
- Suite final: 67 pruebas aprobadas. Una aserción elimina los comentarios de separación de texto de React antes de verificar el número del ejercicio.

No se hicieron pruebas de interfaz en navegador. Se inspeccionaron directamente las cinco láminas y se validó el renderizado de servidor. La publicación alojada sigue pendiente por el error de acceso documentado; no se cambia el identificador del proyecto.

## Comprobación manual

1. Entrar al módulo 3 desde la portada o desde el enlace al final del módulo 2.
2. Recorrer los siete bloques. Leer la nota de cada original antes de desplegarlo y compararlo con la explicación.
3. Abrir una imagen y usar “Descargar original” o “Ampliar” para verla a tamaño completo.
4. Responder los cinco ejercicios antes de abrir la respuesta. No deben cambiar los contadores de avance.
5. Regresar a la academia y comprobar que el catálogo existente continúa disponible.

La fuente sigue parcial. La nueva vista no completa por suposición la segunda parte ni convierte las figuras en reglas de ejecución.
