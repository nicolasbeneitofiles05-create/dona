# DONA RADAR V1 · Registro editorial fechado (29/10/2026)

**Estado:** investigación y prototipo implementado en rama. No simula un flujo en directo, no permite que terceros publiquen y no modifica DONA Ayuda (PR #15).

## Alcance
La primera versión agrupa cinco comunicaciones **publicadas el 28/10/2026** por fuentes institucionales relacionadas con el accidente ferroviario de Urda. El contenido fue comprobado editorialmente **el 29/10/2026**. Ningún texto demuestra que una oficina, número de teléfono, servicio ferroviario o dispositivo siga operativo en el instante en que alguien consulta DONA.

Interacción: un bloque compacto y accesible («DONA RADAR») debajo de «Ayuda Urda», **plegado por defecto** para preservar el buscador de código postal en el primer viewport móvil. Al abrir, muestra dos comunicados y tres fuentes adicionales dentro de otro disclosure. `/#radar` permite enlazar directamente a la cronología completa. No se solicita información personal.

## Fuentes originales
| Categoría | Organismo | Comunicación revisada | Enlace |
|---|---|---|---|
| Familias | 112 Castilla-La Mancha | 28/10/2026, informó del número de atención a familiares y amigos 900 122 112 | https://112.castillalamancha.es/112/emergencias-e-incidencias/platecam-activado-en-la-provincia-de-toledo |
| Familias | Guardia Civil | 28/10/2026, comunicó oficinas para familiares de primer grado en cuatro localidades | https://web.guardiacivil.es/eu/destacados/eventos/La-Guardia-Civil-ha-habilitado-diferentes-oficinas-para-que-acudan-los-familiares-de-primer-grado-de-las-victimas-del-accidente-ferroviario/ |
| Viajes | Renfe | 28/10/2026, anunció teléfono, plan de asistencia, cambios y anulaciones para viajeros afectados | https://grupo.renfe.com/es/es/sala-de-prensa/noticias/2026/10/comunicado-renfe-accidente-urda |
| Viajes | Iryo | 28/10/2026, anunció teléfono de asistencia y alternativas de cambios/anulación | https://iryo.eu/en/new/comunicado-de-prensa-accidente-ferroviario-en-urda |
| Viajes | Adif | 28/10/2026, informó sobre puntos de atención y estado de la red ferroviaria | https://www.adif.es/viajeros/estado-de-la-red |

## Contrato y caducidad
- `data/incidents.json` contiene solo resúmenes **muy breves** y URLs exactas a fuentes institucionales. No se replica una noticia completa ni se extraen contenidos de manera automática.
- La validación `scripts/validate-radar.py` rechaza fuentes no autorizadas, datos fuera de esquema, IDs repetidos, fechas imposibles, fechas incoherentes, caducidad excesiva y afirmaciones sanitarias no respaldadas. La validación **no demuestra disponibilidad ni veracidad de hechos posteriores**.
- La fecha `published_at` es la publicación del organismo. `last_checked_at` es el día de comprobación editorial. `expires_at` = 31/10/2026 00:00 (Madrid) es un **límite conservador de confianza editorial**, no fecha de cierre de una oficina ni llamada.
- `editorial_status=confirmed` significa que se verificó la publicación original, **no** que el incidente o necesidad continúe «activa». Desde la expiración el cliente rotula el registro `Histórico · verificar vigencia` y conserva acceso a la fuente. Al recibir un registro `withdrawn`, `unknown` o un origen de comprobación futuro no lo presenta como comunicación verificada.
- No hay actualización recurrente. El sitio se construye con datos versionados, sin consultas externas de cliente o de servidor. Los cambios de fuente requieren un nuevo PR y revisión editorial.

## Seguridad, gobernanza y uso
- No publicar identidades de afectados, listados de viajeros, imágenes de personas, documentos médicos, geolocalización personal, cifras provisionales ni presuntos responsables.
- No permitir solicitudes de localización de familiares ni archivos particulares; orientar siempre a canales oficiales.
- No mostrar saturación de hospitales, reservas sanguíneas, urgencias ni una «necesidad cubierta» sin un documento vigente y atribuible al organismo sanitario.
- No mezclar el bloque asistencial con recaudaciones o campañas partidistas. Las investigaciones, declaraciones y posibles peticiones cívicas requieren un espacio separado con información neutral y verificable.
- No llamar a los contenidos "última hora", "en directo" ni "actualizaciones automáticas". `no hay nuevos comunicados en DONA` no implica que los organismos no tengan actualizaciones.
- No ejecutar scrapers ni nuevas tareas recurrentes, y no añadir servicios de pago.

## Criterios de publicación
1. Construir y validar catálogo provincial + radar: `python3 scripts/build.py`.
2. `python3 scripts/validate-radar.py`, `python3 scripts/test-radar.py`, `node scripts/test-notices.cjs` y Playwright sobre 320, 390 y 1440 con teclado, enlaces y estados caducados.
3. Comparar `dist/index.html` con el HTML público después de un despliegue controlado, comprobando SHA exacto, rollback y un único despliegue.
4. Volver a leer y comprobar las fuentes antes de difundir el contenido en medios; si no es posible, seguir mostrando que la vigencia de servicios es desconocida.
5. No fusionar con PR #8 de geografía ni con PR #14 de documentación hasta conciliar sus versiones.

## Siguiente iteración
Antes de automatizar una sola fuente, documentar permiso/licencia, estructura estable, tasa de cambios y plan de caducidad. Un error al obtener información debe producir estado «desconocido», nunca reciclar una alarma como actual.
