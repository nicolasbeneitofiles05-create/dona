# Preparación técnica · puntos reales y geocodificación contrastada

## Punto de partida

Base de coordinación `main` en `01ec033a6fd3d8334285c45edc405d444ffcbc23`; crear `manus/geographic-inventory` para datos y evidencia. Preparar implementación geográfica después en otro PR contra la base de datos aprobada. No mezclar con `manus/compact-mobile`. No publicar, fusionar, añadir backend, auth, base de datos, claves ni servicios de pago.

Estado comprobado: `data/geographic-inventory.json` tiene un registro de Madrid con coordenadas pendientes y dos fuentes oficiales con horarios discrepantes. No hay un índice postal local ni cálculo de distancias. Ese registro sigue no elegible para distancia y listado. La búsqueda actual solo reconoce prefijos provinciales.

## Entrega A · inventario real revisable

Empezar por puntos que puedan contrastarse para las provincias de 03801, 28007, 13001 y 45001; documentar por separado cobertura de Ceuta y Melilla. No completar un cupo con puntos supuestos. Si no hay fuente suficiente para un territorio, registrar el hueco y mantener su canal oficial.

Cada registro debe contener:

| Campo | Condición |
| --- | --- |
| `id`, nombre, tipo y donaciones admitidas | Identificador estable; identidad y tipo sanitario apoyados por fuente primaria |
| Jurisdicción y dirección | País, comunidad, provincia y municipio; CP como cadena conservando ceros |
| Coordenadas y CRS | Latitud/longitud WGS84; orden inequívoco y transformación documentada si procede |
| Precisión y punto representado | Acceso de donantes, edificio o dirección aproximada; exactitud solo si la fuente la declara |
| Horarios y excepciones | Fecha, ámbito y fuente; desconocido o discrepante explícito, sin inferir apertura de la mera existencia del centro |
| Evidencias por campo | URL primaria, dato respaldado, fecha de publicación o desconocida, comprobación y próxima revisión |
| Elegibilidad | Listado y distancia independientes, con motivos; ausencia de coordenadas excluye del orden |

Guardar evidencia recuperable o referencia precisa a la sección consultada y hash si se conserva un extracto permitido. Una respuesta 200 o una dirección en un mapa no verifica atención sanitaria ni horario. Respetar minimización de contenido y no importar datos de pacientes, donantes ni personal.

Entregar un validador bajo demanda de IDs duplicados, rangos, CRS, coordenadas parciales, referencias vacías y fechas incoherentes. No introducir placeholders numéricos como 0,0 para datos ausentes. Datos sintéticos de pruebas deben quedar separados del inventario publicable.

## Entrega B · selección de geocodificación, con evidencia

Consulta puntual de documentación oficial realizada el 29/10/2026, sin llamadas de geocodificación ni descarga masiva:

- [CartoCiudad: descargas](https://www.cartociudad.es/web/portal/directorio-de-servicios/descarga) documenta direcciones con CP y descargas provinciales; la disponibilidad de esos atributos no demuestra una capa descargable de polígonos postales.
- [CartoCiudad: FAQ](https://www.cartociudad.es/web/portal/faq) describe búsqueda de CP mediante REST Geocoder y atribución de sus servicios. Es candidato a evaluar; no se ha integrado ni probado su cobertura, CORS, límites o respuestas para los seis CP.
- [CNIG: FAQ](https://centrodedescargas.cnig.es/CentroDescargas/faqs) distingue CP como atributo de direcciones de la geometría postal, que no ofrece como descarga en ese producto. No asumir que una licencia de callejero cubre otra geometría.

Antes de elegir: documentar URL y versión del producto concreto, licencia y atribución, condiciones y límites de consulta/reutilización, cobertura, fecha y precisión. Preferir un índice local con licencia suficiente si existe; si se evalúa un servicio gratuito bajo demanda, comprobar su uso permitido, CORS, errores y ausencia de claves en frontend. No activar un proveedor de pago ni consultas recurrentes. No extraer datos completos mediante un endpoint diseñado para consultas selectivas.

Para cada CP probado guardar: cadena solicitada, coincidencia exacta, tipo devuelto realmente postal, identificador de fuente, coordenadas, precisión/método de representación, jurisdicción, versión/fecha y URL de evidencia. No aceptar el primer resultado si representa un municipio o calle en vez del CP. Una media de direcciones no es un centroide postal oficial. Ambigüedad o falta de evidencia deben conservar la orientación provincial y el acceso oficial.

## Entrega C · implementación después de aprobar datos

- Mantener el cálculo en cliente si resulta viable; índice postal con licencia y atribución. Sin almacenar CP ni posición.
- Distancia en línea recta mediante fórmula geodésica documentada y tolerancia probada. Etiquetar origen aproximado del CP; no es tiempo de viaje ni ubicación de la persona.
- Ordenar solo puntos elegibles con coordenadas corroboradas; mantener sin distancia los demás. No limitar el radio por frontera provincial. Explicar cobertura parcial y evitar «el más cercano» si el inventario no lo acredita.
- Envío del artefacto por el build existente: si se separan archivos, demostrar que Cloudflare los sirve. No dejar referencias a JSON que el worker devuelva como 404.
- Ubicación del navegador no es requisito para búsqueda por CP. Si se propone, hacerlo en otro cambio voluntario, sin guardar posición, con pruebas de permiso concedido/denegado/error.

## Aceptación y bloqueos verificables

Probar 03801, 28007, 13001, 45001, 51001 y 52001 con evidencia primaria de cada correspondencia. Un CP inexistente debe fallar de forma segura, no dar una cercanía por prefijo. Añadir casos de ambigüedad, ceros iniciales, coordenadas ausentes, fuente desactualizada, empate, frontera provincial y fallo de servicio. Distancias con fixture de coordenadas conocido y separado de datos reales; tolerancia explícita y comprobación independiente de la fórmula.

Bloqueos actuales para activar proximidad: coordenadas reales pendientes, horario discrepante de Madrid sin resolver, cobertura de puntos incompleta y origen postal/licencia/precisión aún no seleccionados y probados. No son bloqueos del despliegue actual. No se requiere pago para continuar la preparación y revisión documental; cualquier futura limitación de acceso o licencia debe identificarse con respuesta o condición concreta, sin inventar cobertura.
