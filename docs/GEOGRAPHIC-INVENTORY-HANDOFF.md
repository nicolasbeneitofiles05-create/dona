# Fase siguiente · inventario de puntos reales

Base publicada: `c861d70593f23a0d092bfcf051013c6db81327d9`, PR #7 fusionado. Preparación en `data/geographic-inventory-foundation`. El frontend sigue orientando por provincia. No se activa geocodificación ni distancia desde esta rama; el inventario no se consume ni se sirve todavía en producción.

## Datos de partida y huecos comprobados

Existe un único registro real en `data/geographic-inventory.json`: Centro de Transfusión de Madrid. Identidad/dirección documentadas; coordenadas pendientes y discrepancia de horarios entre dos páginas oficiales. Ambas elegibilidades siguen desactivadas. Una consulta puntual a la página oficial del centro el 29/10 no encontró campos explícitos de latitud/longitud: no se ha deducido su posición de la dirección ni de conocimientos previos. Esto no demuestra que el organismo no publique coordenadas por otra vía.

## Encargo de datos, separado de la interfaz

Crear `manus/geographic-inventory` desde el SHA base del PR de esta preparación y devolver otro PR contra `main`, sin publicar ni fusionar. Consultar el contrato en este documento y los campos del JSON. No hay encargo enviado automáticamente ni integración con Manus.

1. Documentar puntos reales para Alicante, Madrid, Ciudad Real y Toledo, y cobertura disponible en Ceuta/Melilla; registrar huecos en vez de crear centros supuestos. Fuentes iniciales: canales regionales del array `regions`, [calendario SESCAM](https://sanidad.castillalamancha.es/ciudadanos/hazte-donante-sangre/colectas-donantes-de-sangre) y [directorio del Ministerio](https://www.sanidad.gob.es/profesionales/saludPublica/medicinaTransfusional/dondedonar.htm). Son puntos de partida de investigación, no centros ni horarios ya verificados.
2. Por registro: id estable, nombre/tipo de punto y donación, jurisdicción, dirección, coordenadas WGS84 y precisión/objeto representado (entrada de donantes o edificio), horarios y excepciones, fuente primaria por campo, publicación conocida o desconocida, fecha de comprobación y próxima revisión. Coordenadas desconocidas permanecen `null`; no usar centro de provincia o CP como posición de un centro.
3. Coordenadas: obtenerlas de una publicación oficial o geocodificar una dirección institucional y contrastar manualmente el resultado con cartografía fiable y el acceso al centro. Conservar URL, método, sistema original/transformación, precisión declarada o desconocida y razonamiento de comprobación. Una URL o un booleano no prueban la localización.
4. Horarios: leer información vigente del punto concreto y excepciones, distinguir sangre/plasma y punto fijo/móvil. Mantener datos discrepantes como pendientes; no asignar el horario de un hospital a su sala de donantes. No convertir la próxima revisión en garantía de apertura.
5. Mantener evidencias por campo recuperables y una nota de revisión. No renovar fechas de datos existentes por ejecutar el validador. No incorporar datos personales o médicos.

## Controles de estructura y aprobación

Ejecutar `python scripts/validate-geography.py` y `python scripts/test-geography.py`. El validador no hace red ni verifica contenido: impide IDs duplicados, coordenadas parciales/fuera de rango, fuentes sin HTTPS, fechas incoherentes y banderas de elegibilidad prematuras. Un resultado verde significa estructura válida, no inventario sanitario validado.

Para `distance_eligible=true`, `coordinates` exige `review_status='corroborated'`, `review_basis`, `checked_at`, evidencia HTTPS y precisión explícita, además de coordenadas válidas. Para `public_listing_eligible=true`, exige identidad revisada (`identity_review_status`, `identity_review_basis`) y horarios contrastados. En ambos casos la revisión debe estar vigente. La revisión humana del contenido y las coordenadas continúa siendo obligatoria; no publicar esos campos porque simplemente pasan un script.

Entregar tabla de cobertura, registros elegibles/no elegibles, evidencia, archivos modificados y pruebas ejecutadas/pendientes. No alterar `reviewedNotices`, fechas, fuentes ni `noticeState` del HTML. No backend, auth, base de datos, claves, servicios de pago ni tareas recurrentes.

## Geocodificación posterior

Seleccionar después un origen postal con licencia, versión, atribución y precisión claras. CartoCiudad/CNIG son candidatos documentales a evaluar, no una integración aprobada: CP como atributo de direcciones no implica permiso para descargar polígonos postales. Comprobar respuestas exactas y tipo postal para 03801, 28007, 13001, 45001, 51001 y 52001; no aceptar un municipio devuelto como si fuera el CP.

Solo con origen postal y puntos corroborados: calcular distancia en línea recta y declarar el origen aproximado; excluir centros sin coordenadas del orden, explicar cobertura parcial y mantener acceso oficial. Sin datos, continuar con provincia sin inventar cercanía. Probar CP inexistentes/ambiguos, datos caducados, fronteras provinciales, empates, coordenadas ausentes y distancias conocidas con fixtures separados. Ubicación del navegador y permisos son otra decisión, no requisito para CP.
