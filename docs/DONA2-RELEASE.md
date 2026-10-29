# DONA 2.0 · publicación verificada

- SHA publicado: `243d030129526b19252afb622e6f687e8515f0c5`.
- URL: https://dona-2fp.pages.dev
- Despliegue: `bef4a785-2b3c-4813-812d-8cf72438c718`, entorno `production`, estado `deploy/success`, `commit_dirty: false`.
- URL inmutable: https://bef4a785.dona-2fp.pages.dev
- HTML: 41.283 bytes; SHA-256 `9fe8fe84c52e3d3b943564122f924c227ad85db4d15f982b3bb30347de54e72d`.
- Worker SHA-256: `000842ef30bd889245e70deee79ffdd90d378aa9a65231c58ad4ad29ad97ffce`.

## Dependencias e integración

#9 (`afa4898...`) pasó build, avisos y navegador antes de integrarse en `c75c5aba84447d9c2df54534e0f509bfce9ec321`. #13 descendía de ese mismo head de #9: tras integrar #9, su diff independiente quedó limitado a DONA 2.0, pruebas y su informe. #13 se fusionó después; árbol del merge idéntico al head validado `101eab7...`. Sin sobrescribir #12 o #8, que permanecen abiertos. Los PR no tenían checks de CI configurados; se ejecutaron comprobaciones locales y públicas.

Se corrigieron los dos puntos del comentario final de #13:

- Mensaje exacto: «DONA no tiene avisos activos verificados para mostrar. Puede haber campañas en los canales oficiales: consúltalos antes de desplazarte». Fecha fija y alcance de la revisión manual visibles también con historial cerrado. No se renueva vigencia.
- Estado vacío compacto y alineado al inicio, sin estirarse al abrir historial. Solo ese estado recibe el ajuste; el aviso activo puede crecer sin recorte.

`reviewedNotices` y `noticeState` idénticos a main previo. Los fixtures solo se insertan en memoria del navegador de prueba. No se añaden datos sanitarios, recursos externos, pasarelas de donación, cuentas ni pagos.

## Pruebas ejecutadas

Build, pruebas sanitarias y navegador con Edge 149.0.7827.85: 03801, 28007, 13001, 45001, 51001, 52001; destinos exactos HTTPS; inválidos; alert/status; teclado; directorio plegable; cinco anchuras; caducidad en pestaña y recarga; historial; aviso falso y movimiento reducido. Pruebas nuevas de texto no exhaustivo y fecha, altura vacía de escritorio ≤180 px, apertura del historial sin estiramiento y rerender estable; fixture activo largo visible sin recorte y eliminado al finalizar.

Capturas locales y públicas a 390/1440 inspeccionadas visualmente. Las medidas locales de altura siguen dentro de objetivos: 320 inicial 2.228 px/resultados 2.661; 390 inicial 2.087/resultados 2.444. Capturas y JSON en `dist/`, ignorado por Git.

Comprobación pública del 29/10/2026 01:38:18 Madrid (00:38:18 UTC): HTTP 200, HTML idéntico byte a byte al artefacto exportado directamente del SHA en Git. Seis destinos, clic real de Ceuta/Melilla al Ministerio y respuesta 200; avisos retirados ausentes, vacío no exhaustivo, caducado en historial después de recargar; 320/390/1440 sin desbordamiento ni errores JS.

## Publicación única y recuperación

Una sola solicitud de creación de despliegue en esta ejecución. Antes de subir se comprobó que el despliegue canónico seguía siendo el anterior esperado; si hubiera cambiado, la subida se habría abortado. Lectura posterior de Cloudflare confirmó el nuevo ID y SHA. No se publican los cambios documentales ni #12.

Rollback anterior conservado y comprobado por API: `83096e66-c7b0-484e-b6a4-c26dd5e7d6af`, SHA `c861d70593f23a0d092bfcf051013c6db81327d9`, etiqueta remota `recovery/before-dona2`. Artefacto actual y hashes en `dist/releases/243d030129526b19252afb622e6f687e8515f0c5/`. Endpoint de recuperación: `POST /accounts/82e6995e0c498d9903219dc8eed26609/pages/projects/dona/deployments/83096e66-c7b0-484e-b6a4-c26dd5e7d6af/rollback`. No se ejecutó un rollback de prueba en producción.

Coste adicional contratado: 0 €. Sin ejecuciones recurrentes ni servicios nuevos. Próximo paso: integrar navegación de #12 según `PR12-INTEGRATION-REVIEW.md`; #8 no se fusiona hasta validar datos y coordenadas.
