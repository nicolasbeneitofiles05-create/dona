# Publicación comprobada · 29/10/2026

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

Prueba reproducible: `node scripts/production-smoke.cjs dist/releases/<SHA>/index.html`. Requiere Playwright local y Edge, según README. Capturas y JSON de ejecución en `dist/`, no versionados. No se repitió la batería completa previa porque el árbol de código no había cambiado. El control de caducidad se evaluó también con la fecha real y devuelve `expired`.

## Recuperación

El despliegue anterior `56ba485b-466f-4913-8682-474e8507028d` permanece en Cloudflare y fue comprobado por API después de publicar. URL: https://56ba485b.dona-2fp.pages.dev. Etiqueta remota `recovery/published-20261028` fija la importación original `8005a8afd907b934fdfdf66642df9ce8a23ef962`; copia HTML local en `dist/recovery-56ba485b/`.

Endpoint de recuperación documentado y disponible: `POST /accounts/82e6995e0c498d9903219dc8eed26609/pages/projects/dona/deployments/56ba485b-466f-4913-8682-474e8507028d/rollback`. No se ha ejecutado un rollback de prueba sobre producción. Esa versión conserva avisos retirados: ante fallo, priorizar volver a publicar el artefacto corregido de este SHA; recuperar la versión antigua requiere tratar ese contenido antes de volver a difundirlo.

No hay bloqueos de acceso pendientes para este despliegue. Coste adicional contratado: 0 €. No se modificó plan ni se auditó la facturación externa.
