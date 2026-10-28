# Revisión sanitaria · 28/10/2026

Revisión manual de contenido, no ingesta ni verificación automática. La comprobación HTTP no demuestra una necesidad sanitaria. No se ha publicado esta revisión en Cloudflare.

| Afirmación importada | Evidencia consultada | Decisión |
| --- | --- | --- |
| Mancha Centro solicita todos los grupos tras un accidente | La URL del Ayuntamiento de Alcázar no pudo recuperarse; búsqueda institucional sin corroboración suficiente | Retirada de la interfaz. No se confirma ni desmiente el accidente |
| Madrid pide acudir a partir del 29 | URL de Europa Press no recuperable; sin comunicación primaria suficiente sobre esa instrucción concreta | Retirada, incluido el enlace «Llamamiento Urda» del buscador |
| Campaña del Gregorio Marañón, 28 y 29 | [Comunicación institucional](https://www.comunidad.madrid/noticias/2026/10/27/hospital-publico-gregorio-maranon-celebra-28-29-octubre-maraton-fomentar-compromiso-donacion-sangre): contenido leído; confirma días, centro y campaña | Conservada con publicación 27/10 según ruta editorial, comprobación fija 28/10 22:50 UTC y caducidad conservadora 29/10 00:00 Madrid. La caducidad no es hora de cierre. No se publica horario |
| Sangre en Valdepeñas el 29, 17–20 | Lanza no recuperable. El [calendario SESCAM](https://sanidad.castillalamancha.es/ciudadanos/hazte-donante-sangre/colectas-donantes-de-sangre/ciudad-real?order=field_tipo_de_donacion&sort=asc) consultado enumera SOLO PLASMA el 29 de 17–21 | Retirada: tipo de donación y horario no corroboran el aviso importado. No sustituir por otra convocatoria sin revisión |
| Localizador móvil de Madrid | [Localizador institucional](https://donarsangre.sanidadmadrid.org/moviles.aspx), contenido leído: semana en curso y selección por municipio/fecha | Canal de consulta, no aviso ni garantía de disponibilidad |
| Requisitos generales | [Centro de Transfusión GVA](https://centro-transfusion.san.gva.es/es/requisitos), contenido leído | Simplificado a remisión al organismo y valoración sanitaria, sin ofrecer consejo individual |

El [directorio del Ministerio](https://www.sanidad.gob.es/profesionales/saludPublica/medicinaTransfusional/dondedonar.htm) se leyó para contrastar los organismos autonómicos. No incluye un directorio municipal de centros con coordenadas y no acredita cada campaña ni cada horario. Ceuta y Melilla siguen con orientación estatal, sin centro inventado.

## Política aplicada

- Solo un registro editorial local contrastado. Se elimina el feed inexistente y la confianza en booleanos `verified` remotos.
- Cada campaña contiene fuente, publicación, comprobación y caducidad fija. Faltas, fechas inválidas, fuentes no permitidas o comprobaciones futuras impiden presentarla como activa.
- En el instante de caducidad pasa a histórico; comprobación cada minuto y al volver a la pestaña. Recargar no modifica fechas. Depende del reloj del dispositivo; no hay reloj de servidor ni garantía frente a un reloj manipulado.
- Un aviso nuevo exige lectura del contenido, identidad del emisor, revisión humana de necesidad y fecha, y diff de código revisable. Una URL permitida tampoco demuestra el contenido.
- Para conservar prueba de publicaciones retiradas se mantiene este registro y el historial Git; no se siguen difundiendo sus afirmaciones como avisos activos.

## Importación

PR #1 abierto, SHA `8005a8afd907b934fdfdf66642df9ce8a23ef962`, rama `import/published-baseline`. `main` solo contenía README. HTML Git: 32.686 bytes; checkout Windows: 32.808 por CRLF. Build y sintaxis JS ejecutados correctamente, sin truncamiento de cierre ni script. La comparación binaria con producción no se pudo ejecutar: HTTP 403. No se fusiona #1 en esta fase; los PR de correcciones se apilan sobre la importación, para no dar por aprobados sus avisos pendientes. No hay workflows en el árbol; no se ha desplegado.
