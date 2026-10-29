# Mantenimiento y continuidad

## Fuente de verdad

Actualización: #9 y #13 fusionados y DONA 2.0 publicada en `243d030129526b19252afb622e6f687e8515f0c5`. Ver `DONA2-RELEASE.md` y `PR12-INTEGRATION-REVIEW.md`. #12 sigue sin consumir sus enlaces en UI y #8 continúa aislado. Los párrafos siguientes conservan antecedentes de la publicación inicial.

`index.html` conserva la aplicación importada con las correcciones y la mejora técnica de Manus #5, revisada independientemente. PR #1, #2, #3 y #5 fusionados; SHA `aba4b83f254d001e890b2c3b6bad175a2cf32c90` publicado y comprobado. Ver `PRODUCTION.md`. La versión sanitaria anterior y la importación original se conservan en Git y Cloudflare. El repositorio no conecta por sí solo Venice, Manus y Cloudflare. Consultar `SOURCE-AUDIT.md`, `VALIDATION.md`, `GEOGRAPHY.md` y el encargo `MANUS-HANDOFF.md`.

## Prioridades

1. Verificar identidad, fuente y vigencia de cada aviso sanitario. No dar por cierto el contenido por tener URL.
2. Comprobar móvil, accesibilidad y enlaces. No prometer distancia ni centro más cercano con el buscador actual.
3. Geocodificación real de CP e inventario con id, coordenadas, precisión, jurisdicción, horarios, fechas y URL de evidencia. Si faltan coordenadas, no ordenar por distancia.
4. Mantener revisión editorial y estados con caducidad fija. No añadir backend, autenticación ni base de datos sin petición expresa. No renovar vigencia al recargar.
5. Solo integrar redes institucionales por medios autorizados. MFA, roles, auditoría, anti-spam y rollback antes de administración pública.

## Verificación

Las pruebas locales iniciales están en `VALIDATION.md`. Tras la publicación se ha comprobado la URL pública en Edge: HTML idéntico al artefacto, 28007, móvil, retirada de avisos y caducidad tras recargar. El 403 de la fase anterior ya no impidió esta comprobación. Distancias y permisos siguen pendientes porque no están implementados. No hay una lista de 45 centros acreditada.

## Build y despliegue

`python scripts/build.py` genera `dist/_worker.js` para reproducir el mecanismo inicial. No publica. La página puede abrirse directamente como HTML, con boletín externo no disponible. El worker devuelve 404 para rutas distintas de `/` y `/index.html`.

Antes de publicar: revisar diff y fuentes, fijar SHA, verificar build y JS, guardar id del despliegue anterior y confirmar ausencia de secretos. Tras publicar: comprobar HTTPS, portada, búsqueda, mensajes de caducidad y móvil. Ante fallo: restaurar el despliegue anterior desde Cloudflare y repetir comprobaciones. El despliegue anterior conocido es `56ba485b-466f-4913-8682-474e8507028d`.

## Encargo para Venice y Manus

Trabajad sobre este repositorio y la rama del PR, sin recrear la aplicación. Identificad qué habéis inspeccionado y qué no. Revisad primero fuentes y vigencia. Entregad cambios pequeños en ramas propias, pruebas realmente ejecutadas y limitaciones explícitas. No publicar ni fusionar cambios sin revisión. No añadir costes, credenciales, datos médicos ni captura dudosa de redes. No anunciar tiempo real. Mantener Cloudflare. No atribuir a Venice o Manus trabajo que no hayan realizado.

## Legal

Textos legales y privacidad pendientes de validación humana. No añadir una licencia de código sin decisión del titular.
