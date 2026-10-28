# Revisión independiente del PR #7

SHA solicitado `24b261f3c239431da79e459b87b549f498e3ee64`, rama `manus/compact-mobile`: revisado frente a `main`. Corrige el fallback 51/52 con `national`, en lugar del texto «Directorio estatal». La observación automática se emitió sobre `51585ed` y quedó obsoleta; el test del SHA corregido comprueba la URL exacta de 51001 y 52001.

Build, pruebas de avisos y navegador ejecutados: seis CP, inválidos, resultado oficial único, directorio nativo plegable, alturas, teclado, cinco anchuras, caducidad en pestaña/recarga y aviso falso. Bloque `reviewedNotices`, fuentes de campaña, fechas, `noticeState` y render de avisos idénticos a main. No se renovó vigencia ni se añadieron necesidades.

La comprobación de red inicial obtuvo 20 respuestas 2xx de 23 URL, más La Rioja sin conexión, Castilla y León 403 y portada de donación de Castilla-La Mancha 404. Estos resultados de red no verifican contenido sanitario. El directorio estatal fue consultado y responde; no se inventa un centro local para Ceuta/Melilla.

Antes de integrar se sustituyó exclusivamente el enlace genérico roto de Castilla-La Mancha por su calendario institucional `https://sanidad.castillalamancha.es/ciudadanos/hazte-donante-sangre/colectas-donantes-de-sangre`, recuperado con HTTP 200 y título «Colectas de donantes de sangre | Servicio de Salud de Castilla-La Mancha». No se trasladó a DONA ningún horario o necesidad de ese calendario. Los tests exigen la nueva URL para 13001/45001 y HTTPS para cada uno de los seis CP. La alternativa estatal permanece disponible en el resultado regional.

Se repitieron build y test-browser por ese cambio mínimo; no una auditoría sanitaria completa. La Rioja y Castilla y León siguen pendientes de comprobación externa concluyente, con acceso alternativo al Ministerio, sin afirmar que sus canales estén verificados por la respuesta HTTP.
