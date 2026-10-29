# Revisión de #12 y preparación de integración

## Base y resultado

- PR: https://github.com/nicolasbeneitofiles05-create/dona/pull/12
- SHA revisado: `8612fb75023a3ced69c8013c6af1fcc2f4db0dbf`, rama `data/official-entrypoints-v1`.
- Revisión ejecutada en worktree separado de DONA 2.0. Solo añade catálogo JSON, validador y ocho pruebas. No modifica UI, build, avisos ni inventario #8.
- `python scripts/validate-entrypoints.py`: correcto, sin red. `python scripts/test-entrypoints.py`: ocho pruebas correctas, incluidos dominios engañosos, duplicados, eventos inventados, dígitos no ASCII y fallback 51/52.
- Cinco destinos únicos para ocho prefijos: comprobados el 29/10/2026 a las 01:39 Madrid en Edge móvil 390×844. Los cinco devolvieron HTTP 200, mantuvieron URL exacta HTTPS y el dominio institucional esperado. Se contrastaron títulos/contenido identificativo con las páginas oficiales, no solo el estado HTTP. No se guardaron colectas, horarios, stock ni datos de donantes.

| Prefijos | Destino contrastado | Alcance observado |
| --- | --- | --- |
| 03 | [Puntos de donación Alicante](https://centro-transfusion.san.gva.es/es/puntos-de-donacion-alicante) | Página provincial GVA con contenido embebido. No se validó un proceso de cita ni la atención de un centro |
| 12 | [Puntos de donación Castellón](https://centro-transfusion.san.gva.es/es/puntos-de-donacion-castellon) | Página provincial GVA; mismo límite |
| 46 | [Puntos de donación Valencia](https://centro-transfusion.san.gva.es/es/puntos-de-donacion-valencia) | Página provincial GVA; mismo límite |
| 08, 17, 25, 43 | [Calendario del Banc de Sang i Teixits](https://www.bancsang.net/es/donaciones/sangre/calendario/) | Calendario compartido de Cataluña, sin filtro provincial en la URL |
| 28 | [Puntos móviles de Madrid](https://donarsangre.sanidadmadrid.org/moviles.aspx) | Localizador de puntos móviles, no catálogo completo de puntos fijos |

Evidencia de navegador local en `dist/entrypoints-network.json`: URL solicitada/final, estado, título y fecha. Las páginas se abrieron en navegador; no se recorrieron ni copiaron las convocatorias. Dominio permitido o HTTP 200 por sí solos no bastan para validar un aviso sanitario.

## Secuencia preparada, sin publicar enlaces todavía

1. Integrar #12 como catálogo de navegación y pruebas, manteniendo `research_only_not_connected_to_production`: todavía no aparece en el buscador público. No mezclar #8 ni copiar sus datos.
2. Abrir después un PR de consumo sobre `main` que ya contiene #9 y #13, sin reintroducir versiones anteriores del HTML ni cherry-picks completos de diseño. Revisar el diff únicamente de esa integración.
3. Empaquetar el catálogo validado dentro del HTML durante el build o mediante un bloque local generado y comprobado. El worker actual solo sirve `/` e `/index.html`; un `fetch` a un JSON no servido rompería el resultado. No añadir backend, cuentas, dependencias ni peticiones recurrentes.
4. Resolver por prefijo como hasta ahora y conservar ceros iniciales. No afirmar geocodificación, existencia del CP, cercanía, disponibilidad ni cobertura total. Actualizar conjuntamente estado editorial del catálogo y su validador cuando se apruebe el consumo; la fecha fija actual del validador no debe impedir futuras revisiones ni renovarlas al ejecutar pruebas.
5. Un CTA principal con texto acorde al destino: puntos provinciales en GVA; calendario de Cataluña sin fingir filtro provincial; puntos móviles de Madrid con enlace general regional como alternativa para puntos fijos. Conservar los demás canales actuales y alternativa estatal.
6. Para 51001/52001 usar «Consultar directorio estatal» y explicar que es orientación parcial: el índice ministerial no contiene entradas específicas para esas ciudades. No presentarlo como localizador local resuelto.
7. Pruebas del consumo: seis CP de regresión y 03440, 12001, 46001, 08001, 17001, 25001 y 43001; URL exacta, etiqueta y alcance de cada salida; errores, fallback y teclado. Mantener las pruebas nuevas del vacío no exhaustivo, historial, caducidad y fixture activo. Verificar artefacto compilado y datos sanitarios intactos antes de otro deploy único.

## Límites y decisión

El catálogo es apto para el siguiente paso de navegación según la comprobación ejecutada, sin autorizar reutilización de datos ni una ingesta. #12 queda abierto para integración independiente; esta revisión no lo fusiona ni publica. No hay bloqueo de acceso o pago observado para esas cinco páginas en esta ejecución. La disponibilidad futura y los procesos de cita externos no se garantizan. La geografía de #8 continúa aislada y pendiente de fuentes, coordenadas y horarios contrastados.
