# DONA Ayuda · Urda (28/10/2026)

## Naturaleza y alcance
Piloto **estático, editorial y no publicado** preparado para el accidente ferroviario de Urda (Toledo) del 28/10/2026. Es una ampliación de orientación hacia canales oficiales, no un servicio de emergencias, registro de víctimas, búsqueda de desaparecidos, alerta hospitalaria ni gestor de donaciones.

**Consulta editorial de fuentes:** 29/10/2026. La fecha del documento **no garantiza** que teléfonos, puntos de ayuda u horarios estén vigentes ahora: el usuario debe confirmar en el origen. **No se presenta como feed en tiempo real.**

## Fuentes primarias y afirmaciones autorizadas

| Afirmación editorial | Origen oficial | Fecha del comunicado |
| --- | --- | --- |
| Accidente ferroviario en Urda; línea familiar gratuita 900 122 112 | [112 Castilla-La Mancha / PLATECAM](https://112.castillalamancha.es/112/emergencias-e-incidencias/platecam-activado-en-la-provincia-de-toledo) | 28/10/2026 |
| Renfe: plan de asistencia a viajeros/víctimas/familiares y teléfono 900 10 10 20 | [Renfe](https://grupo.renfe.com/es/es/sala-de-prensa/noticias/2026/10/comunicado-renfe-accidente-urda) | 28/10/2026 |
| Iryo: asistencia a pasajeros y familiares, 900 001 403 | [Comunicado de Iryo](https://iryo.eu/en/new/comunicado-de-prensa-accidente-ferroviario-en-urda) | 28/10/2026 |
| Adif publicó puntos de atención en Atocha, Santa Justa, Córdoba-Julio Anguita y Málaga-María Zambrano; disponibilidad en directo no comprobada | [Estado de la red / Adif](https://www.adif.es/viajeros/estado-de-la-red) | 28/10/2026 |

| Guardia Civil: oficinas para familiares de primer grado, sin registro público de víctimas en DONA | [Aviso oficial de la Guardia Civil](https://web.guardiacivil.es/eu/destacados/eventos/La-Guardia-Civil-ha-habilitado-diferentes-oficinas-para-que-acudan-los-familiares-de-primer-grado-de-las-victimas-del-accidente-ferroviario/) | 28/10/2026 |
| Renfe: servicio alternativo, cambios y anulaciones sin coste para viajeros afectados | [Renfe: comunicado y servicios alternativos](https://grupo.renfe.com/es/es/sala-de-prensa/noticias/2026/10/comunicado-renfe-accidente-urda) | 28/10/2026 |
| Iryo: cambios y anulaciones gratuitos para los servicios afectados | [Iryo: comunicado](https://iryo.eu/en/new/comunicado-de-prensa-accidente-ferroviario-en-urda) | 28/10/2026 |

**Oficinas comunicadas por Guardia Civil (solo familiares de primer grado):** Madrid, Calle Batalla del Salado 32; Sevilla, Avenida de la Borbolla 8; Córdoba, acceso por Avenida de los Mozaharabes; Toledo, Avenida Barber 42. Procedimiento, elegibilidad y vigencia deben comprobarse en el aviso oficial. La información procede de una comunicación del 28/10 y **no implica atención abierta en directo**.

**Enlace directo a la sección:** `/#ayuda-urda` abre el desplegable al entrar con URL anclada, sin recopilar información del visitante. La búsqueda por CP y los avisos mantienen su funcionamiento previo.

**Discrepancia**: notas de 112 citan también 655 28 69 75 para Iryo, mientras que la propia compañía y Adif publican el 900 001 403. DONA selecciona la referencia **de la propia compañía** y enlaza el comunicado para que el usuario confirme. No se deduce que el otro número sea fraudulento.

## Seguridad editorial

- Nunca afirmar de forma no verificada que hospitales están saturados, necesitan o ya no necesitan sangre, o que una necesidad concreta quedó cubierta. No derivar estado de la sangre a partir de redes sociales.
- Nunca recopilar, publicar, intercambiar ni cotejar nombres, fotografías, listas de viajeros, historias clínicas, datos de hospitalización, teléfonos particulares, ubicaciones en directo ni archivos personales. La consulta de familiares corresponde al 112/operadores/autoridades.
- No permitir la subida pública de vídeos o testimonios de pacientes. Si un organismo publica un mensaje oficial, la opción de producto es **enlazar al original y registrar fecha, autor y revisión humana**; no usar detección automática de supuestos mensajes urgentes como hechos.
- No crear un buzón de denuncias, portal de pagos, campañas de recaudación ni suplantar logos oficiales.
- No enlazar a donaciones monetarias de terceros sin evaluación previa de entidad receptora, dominio, obligaciones y trazabilidad.
- No permitir que un test de HTTP 200 convierta la fuente en información sanitaria válida.
- El servicio sigue siendo DONA **guía independiente** y la búsqueda provincial no promete centro cercano, hora, turno ni elegibilidad.
- Para ayuda urgente directa, priorizar los teléfonos oficiales; el 112 general es solo para peligro/emergencia inmediata, no para seguimiento rutinario de víctimas.

## Revisión y caducidad

La sección muestra **fecha de consulta fija** en el HTML (no se actualiza al abrir la web). Antes de fusionar/publicar, verificar otra vez los comunicados y las líneas mediante navegador, contrastar si continúan operativas y la existencia de recursos de asistencia. Ante incertidumbre, mantener únicamente vínculos oficiales y una nota de disponibilidad desconocida.

Para una futura plataforma de seguimiento, definir un esquema `source_url`, `published_at`, `checked_at`, `expires_at`, `status` (active/expired/unknown), y separar **fecha de publicación** de **última comprobación**. Usar feeds autorizados o revisión manual. No utilizar vídeos ni mensajes de terceros como fuente única.

## Desarrollo técnico y pruebas

- Solo cambia `index.html` y `scripts/test-browser.cjs` en ejecución; este archivo documenta alcance y verificación. La sección es un `<details>` plegado inicialmente (salvo acceso con `/#ayuda-urda`), para conservar la tarea rápida de código postal en primera pantalla.
- Telefonía con `tel:` y fuentes `https:`; no hay formularios de recopilación de datos de afectados.
- Las pruebas añaden verificación de los tres enlaces telefónicos exactos, desplegable/teclado, fuente Adif y ausencia de formularios. Mantienen las pruebas existentes de códigos postales, enlaces, caducidad, fiabilidad y anchuras.
- **Sin despliegue** hasta ejecutar los tests de navegador, revisar visualmente 320×568/390×844/1440 y confirmar fuentes por segunda vez.
- No afecta ni consume PR #8 (geografía), #12 (enlaces provinciales) o #14 (documentación). Rebase después si `main` cambia.

## Funciones posteriores (fuera del alcance de este PR)

1. Fuentes oficiales fechadas y una cronología **editorial**, con `unknown` si la actualización no puede corroborarse.
2. Orientación para familias (qué canal contactar según operador), sin almacenar identidades.
3. Donación de sangre como enlace a las fuentes oficiales, solo con solicitudes contrastadas por el organismo.
4. Colaboración económica únicamente mediante canales oficiales de entidades verificadas, separada del circuito sanitario.
5. Evitar un crawler de vídeos/redes sociales para alertas automáticas; cualquier nueva fuente pasa por revisión y consentimiento cuando corresponda.
