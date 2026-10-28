# Mantenimiento y continuidad

## Fuente de verdad

`index.html` es el archivo original publicado, sin correcciones sanitarias implícitas. Este PR importa una base existente, no una versión nueva de Venice. El repositorio coordina versiones; no conecta por sí solo Venice, Manus y Cloudflare.

## Prioridades

1. Verificar identidad, fuente y vigencia de cada aviso sanitario. No dar por cierto el contenido por tener URL.
2. Comprobar móvil, accesibilidad y enlaces. No prometer distancia ni centro más cercano con el buscador actual.
3. Geocodificación real de CP e inventario con id, coordenadas, precisión, jurisdicción, horarios, fechas y URL de evidencia. Si faltan coordenadas, no ordenar por distancia.
4. Backend con allowlist, historial, revisión humana y estados pendiente/verificado/caducado. No renovar vigencia al recargar.
5. Solo integrar redes institucionales por medios autorizados. MFA, roles, auditoría, anti-spam y rollback antes de administración pública.

## Verificación

Comprobado en producción: portada y 28007 devuelve Madrid. Pendiente: 03801, 13001, 45001, Ceuta, Melilla, inválidos, caducidad, falsa alerta, orden geográfico real, permisos, enlaces y auditoría móvil. No se han verificado todas las afirmaciones sanitarias ni una supuesta lista de 45 centros.

## Build y despliegue

`python scripts/build.py` genera `dist/_worker.js` para reproducir el mecanismo inicial. No publica. La página puede abrirse directamente como HTML, con boletín externo no disponible. El worker devuelve 404 para rutas distintas de `/` y `/index.html`.

Antes de publicar: revisar diff y fuentes, fijar SHA, verificar build y JS, guardar id del despliegue anterior y confirmar ausencia de secretos. Tras publicar: comprobar HTTPS, portada, búsqueda, mensajes de caducidad y móvil. Ante fallo: restaurar el despliegue anterior desde Cloudflare y repetir comprobaciones. El despliegue anterior conocido es `56ba485b-466f-4913-8682-474e8507028d`.

## Encargo para Venice y Manus

Trabajad sobre este repositorio y la rama del PR, sin recrear la aplicación. Identificad qué habéis inspeccionado y qué no. Revisad primero fuentes y vigencia. Entregad cambios pequeños en ramas propias, pruebas realmente ejecutadas y limitaciones explícitas. No publicar ni fusionar cambios sin revisión. No añadir costes, credenciales, datos médicos ni captura dudosa de redes. No anunciar tiempo real. Mantener Cloudflare. No atribuir a Venice o Manus trabajo que no hayan realizado.

## Legal

Textos legales y privacidad pendientes de validación humana. No añadir una licencia de código sin decisión del titular.
