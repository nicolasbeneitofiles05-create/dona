# Publicación comprobada · 29/10/2026

## Versión vigente tras PR #7

- SHA publicado: `c861d70593f23a0d092bfcf051013c6db81327d9`, merge de #7.
- URL: https://dona-2fp.pages.dev; despliegue `83096e66-c7b0-484e-b6a4-c26dd5e7d6af`, `production`, `deploy/success`, sin cambios sin guardar en el artefacto.
- HTML: 34.866 bytes; SHA-256 `2bbf529e19994773f664acd6030282b445f8c4fa6b669577aa7586ea5d9422f1`.
- Worker: SHA-256 `05d354464e0317bb28b97ef8a97ead9b09e921e6552cb42547b4e9a1a88812e2`.
- Rollback anterior conservado: `0d423adf-7e19-4506-aaf7-2c2d48c63d58`, SHA `aba4b83f254d001e890b2c3b6bad175a2cf32c90`, etiqueta `recovery/compact-before-pr7`.

Se revisó el SHA solicitado `24b261f3c239431da79e459b87b549f498e3ee64`: Ceuta/Melilla corregidos con URL estatal exacta; hilo de revisión anterior resuelto. Antes de integrar se reparó además el enlace genérico 404 de Castilla-La Mancha con su calendario institucional recuperado HTTP 200, sin trasladar horarios ni necesidades al producto. Head final validado `2eeda0de50fd0b0b054d4c0d44624eeef53dec90`; árbol del merge idéntico. Detalle en `PR7-VALIDATION.md`.

Ejecutados build, avisos y navegador: seis CP con destino exacto HTTPS, inválidos, directorio plegable, alturas, caducidad en pestaña/recarga, aviso falso y cinco anchuras. Red inicial: 20 de 23 URL 2xx; el 404 de CLM se corrigió y su nueva ruta responde 200. La Rioja (conexión) y Castilla y León (403) quedan pendientes con alternativa estatal, sin atribuir a esos resultados una verificación sanitaria.

Prueba pública en Edge 149.0.7827.85: HTTP 200, bytes exactos del artefacto, seis destinos oficiales, clic real de 51001 y 52001 al Ministerio y respuesta 200 de su directorio. Campaña caducada tras recargar y avisos retirados ausentes; 320, 390 y 1440 px sin desbordamiento ni errores JS. Captura 390 inspeccionada. Informe `dist/production-results.json`; artefacto generado directamente desde Git en `dist/releases/<SHA>/`.

### Incidencia de coordinación observada

La API registró publicaciones ad hoc ajenas a esta ejecución del SHA antiguo `01ec033...`: `4f9160dc-92df-4565-8795-fbb8fd746a98` y `d6dcca2b-7337-4113-9341-25a336713643`, esta última posterior al despliegue de #7. No se atribuyen a Manus ni a una integración automática sin evidencia. Se volvió a seleccionar el despliegue validado mediante el endpoint de rollback, que confirmó éxito. Comprobación pública posterior: 29/10/2026 00:41:17 Madrid (28/10 23:41:17 UTC), HTML idéntico al SHA de #7. Nueva lectura de API a las 00:42 Madrid mantenía el SHA correcto.

Antes de una nueva publicación, coordinar un único publicador y comparar el despliegue canónico: otra ejecución puede sobrescribir una versión ya validada. No se han eliminado despliegues, revocado permisos ni modificado integraciones. El rollback sanitario anterior permanece disponible. Coste adicional contratado: 0 €; sin plan de pago ni tareas recurrentes.

## Registro histórico tras PR #5

- SHA publicado: `aba4b83f254d001e890b2c3b6bad175a2cf32c90`, rama `main` al fusionar #5.
- URL pública: https://dona-2fp.pages.dev
- Cloudflare: `0d423adf-7e19-4506-aaf7-2c2d48c63d58`, `production`, `deploy/success`, `commit_dirty: false`.
- URL inmutable: https://0d423adf.dona-2fp.pages.dev
- HTML Git: 29.758 bytes; SHA-256 `b7370199dd29d244de913bb3ac53c8d69d55fd0b55d922b022cb8515e98e53e5`.
- Worker SHA-256: `61f6265754637a782f3dfb73ace296604f89296eed6935d72cbab683e436bfd1`.
- Rollback sanitario anterior conservado y comprobado por API: `4f09e706-800c-4434-96ea-c6fe3ab2d1f6`; Git `75fc9e25907b0eb3da89c8dd57c76cc4d2c15da6`, etiqueta remota `recovery/sanitary-75fc9e2`.

Revisión independiente del diff de #5 contra `main` y del comentario de producto: mejora técnica/móvil pequeña, no rediseño integral. El único cambio de JS es la clase visual del error; bloque sanitario, fuentes, fechas y caducidad idénticos. Regresión ejecutada: build, test-notices y test-browser, incluidos seis CP, inválidos, aviso falso, caducidad en pestaña/recarga, teclado, reducción de movimiento y cinco anchuras. Sin checks de CI configurados ni conflictos. No se repitió auditoría sanitaria ni revisión de red de fuentes sin cambios.

Comprobación pública a las 00:22:41 Madrid (23:22:41 UTC del 28/10): HTTP 200, HTML idéntico byte a byte al artefacto del SHA, 28007 correcto, avisos retirados ausentes y campaña caducada tras recargar. Móvil 320/390 sin desbordamiento y sin errores JS, Edge 149.0.7827.85. Verificación repetida únicamente para validar la parametrización del script público; informe en `dist/production-results.json`.

Ejecutar `node scripts/production-smoke.cjs dist/releases/<SHA>/index.html <SHA>`. El SHA debe aportarse explícitamente; no se atribuye una versión fija al informe. El build de publicación exportó bytes directamente de Git. Artefacto y metadatos en `dist/releases/aba4b83f254d001e890b2c3b6bad175a2cf32c90/`.

Para rollback usar el endpoint descrito más abajo sustituyendo el identificador por `4f09e706-800c-4434-96ea-c6fe3ab2d1f6`. No se ha ejecutado rollback sobre producción. Coste contratado adicional: 0 €. Sin servicios nuevos ni automatismos recurrentes.

## Registro histórico anterior · SHA 75fc9e2

- URL: https://dona-2fp.pages.dev
- SHA publicado: `75fc9e25907b0eb3da89c8dd57c76cc4d2c15da6`, rama `main`.
- Despliegue Cloudflare: `4f09e706-800c-4434-96ea-c6fe3ab2d1f6`, entorno `production`, estado `deploy/success`, `commit_dirty: false`.
- URL inmutable: https://4f09e706.dona-2fp.pages.dev
- HTML: 28.784 bytes; SHA-256 `356ed240c9b55d97b22a960310329d159a644a6af58f1ff5f619cab19e84044c`.
- Worker: SHA-256 `edfac1d1f0f9e4f28a592fcefc26e86fb5b7678caa1dfab5cf2208aba84e7858`.

## Integración y artefacto

PR #1 fusionado en `56d04327da267c0b033520e4497c532638aade0d`; #2, retargetado a `main`, en `b783c4c72ffa9ab32cab96247a36cc5b6bcec3d4`; #3, retargetado a `main`, en el SHA publicado. Sin conflictos; sin checks configurados en los PR. Árbol del SHA final comparado sin diferencias con `27604666c957e4aa7d5a8bed20bccc81b7cacd0a`, ya validado. La revisión sobre caducidad con página abierta está resuelta por temporizador y evento de visibilidad.

Se exportaron los bytes exactos de `index.html` y `scripts/build.py` desde Git y se ejecutó el build en `dist/releases/<SHA>/`, evitando diferencias CRLF del checkout. No se sustituyó la aplicación. Se utilizó el conector Cloudflare y el mecanismo Pages Functions `_worker.js` ya existente, con manifest vacío y metadatos del SHA. El proyecto no tiene conexión de publicación automática. No se añadieron servicios, pagos ni tareas recurrentes.

## Comprobación pública

29/10/2026 00:04:59 Madrid (28/10/2026 23:04:59 UTC), Edge 149.0.7827.85:

- HTTPS y HTTP 200 en URL pública; HTML idéntico byte a byte al artefacto del SHA.
- 28007 devuelve Madrid y explica orientación provincial, sin distancias.
- Mancha Centro, Valdepeñas y «Llamamiento Urda» ausentes de la interfaz.
- Campaña conservada: «Caducado · no es un aviso activo»; sigue caducada tras recargar.
- Resultado abierto en 320 y 390 px sin desbordamiento; navegación visible. Captura de 390 inspeccionada visualmente.
- Sin errores JavaScript.

Prueba reproducible (script actualizado): `node scripts/production-smoke.cjs dist/releases/<SHA>/index.html <SHA>`. Requiere Playwright local y Edge, según README. Capturas y JSON de ejecución en `dist/`, no versionados. No se repitió la batería completa previa porque el árbol de código no había cambiado. El control de caducidad se evaluó también con la fecha real y devuelve `expired`.

## Recuperación

El despliegue anterior `56ba485b-466f-4913-8682-474e8507028d` permanece en Cloudflare y fue comprobado por API después de publicar. URL: https://56ba485b.dona-2fp.pages.dev. Etiqueta remota `recovery/published-20261028` fija la importación original `8005a8afd907b934fdfdf66642df9ce8a23ef962`; copia HTML local en `dist/recovery-56ba485b/`.

Endpoint de recuperación documentado y disponible: `POST /accounts/82e6995e0c498d9903219dc8eed26609/pages/projects/dona/deployments/56ba485b-466f-4913-8682-474e8507028d/rollback`. No se ha ejecutado un rollback de prueba sobre producción. Esa versión conserva avisos retirados: ante fallo, priorizar volver a publicar el artefacto corregido de este SHA; recuperar la versión antigua requiere tratar ese contenido antes de volver a difundirlo.

No hay bloqueos de acceso pendientes para este despliegue. Coste adicional contratado: 0 €. No se modificó plan ni se auditó la facturación externa.
