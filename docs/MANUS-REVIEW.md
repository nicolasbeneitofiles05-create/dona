# Revisión DONA · mobile-accessibility

## Alcance

Esta revisión parte exactamente del SHA `75fc9e25907b0eb3da89c8dd57c76cc4d2c15da6` y se realiza en la rama `manus/mobile-accessibility`. La versión publicada no se ha modificado. No se han cambiado fuentes, fechas, campañas, horarios, inventario, infraestructura ni alojamiento.

La auditoría se centró en el recorrido móvil código postal → provincia → canal oficial, la navegación de cabecera, los estados inválido/resultado, el foco visible, los objetivos táctiles y el comportamiento sin desbordamiento.

## Hallazgos y cambios

- En móvil la cabecera mostraba demasiados enlaces y podía crecer innecesariamente en varias líneas. Se conserva el acceso esencial a **Avisos** y la acción **Buscar dónde donar**; los accesos secundarios permanecen disponibles en el contenido de la página.
- La etiqueta de marca se convirtió en una clase reutilizable y se oculta en anchuras muy estrechas para evitar ruido y colisiones.
- El foco visible usa un borde burdeos de mayor contraste y el salto al contenido tiene una superficie claramente identificable.
- El resultado de búsqueda ahora declara `aria-atomic="true"`; el estado inválido se identifica visualmente sin alterar la validación sanitaria ni la lógica provincial.
- Se reforzaron los objetivos táctiles de la acción principal y de los enlaces del resultado, y se ajustaron el espaciado, el ancho mínimo de elementos flex/grid y los saltos de línea.
- Se añadió un caso extremo para el equivalente CSS de 200 % de zoom: navegación apilada, ocultación del elemento decorativo y saltos de línea de etiquetas/textos largos.

## Archivos modificados

- `index.html`: composición, CSS responsive, foco y estado accesible del buscador.
- `docs/MANUS-REVIEW.md`: este informe.

No se modificaron `data/`, `scripts/build.py`, `scripts/test-notices.cjs`, `scripts/test-browser.cjs`, la auditoría sanitaria ni el inventario.

## Evidencia visual

Capturas comparativas producidas con Chromium headless desde el SHA base y desde la rama de trabajo:

| Anchura | Antes | Después |
| --- | --- | --- |
| 320 px | [`before-mobile-320.png`](../dist/before-mobile-320.png) | [`mobile-320.png`](../dist/mobile-320.png) |
| 390 px | [`before-mobile-390.png`](../dist/before-mobile-390.png) | [`mobile-390.png`](../dist/mobile-390.png) |
| 1440 px | [`before-mobile-1440.png`](../dist/before-mobile-1440.png) | [`mobile-1440.png`](../dist/mobile-1440.png) |

También se generaron capturas de 375 px, 768 px y los resultados JSON de navegador en `dist/`.

## Pruebas ejecutadas

- `python3 scripts/build.py` — correcto; HTML completo servido por `dist/_worker.js`.
- `node scripts/test-notices.cjs` — correcto; fechas imposibles, caducidad, fuentes y aviso pendiente rechazado.
- `BROWSER_PATH=/usr/bin/chromium node scripts/test-browser.cjs` — correcto; CP `03801`, `28007`, `13001`, `45001`, `51001`, `52001`, entradas inválidas, caducidad en pestaña y recarga, aviso falso, enlaces, teclado, movimiento reducido y anchuras 320/375/390/768/1440 px.
- Comprobación adicional con viewport CSS de 160 px como prueba conservadora de zoom 200 % sobre un viewport de 320 px — correcta; sin desbordamiento, estado inválido visible y `aria-invalid="true"`, sin errores JavaScript.
- `python3 scripts/check-links.py` — 24 URL revisadas: 19 respuestas 2xx y 5 resultados no concluyentes/no 2xx. No se ha tratado una respuesta de red como prueba de que una fuente sanitaria esté rota.
- `git diff --check` — correcto.

## Limitaciones conocidas

No se ha ejecutado una auditoría con lector de pantalla, contraste completo con herramientas especializadas, iOS/Android físicos ni una certificación WCAG. Las pruebas de navegador no certifican accesibilidad completa.

La comprobación de enlaces es una instantánea de red: en esta ejecución hubo errores de conexión y respuestas 404/403 en algunas fuentes, documentados en `dist/link-results-final.json`; no se han corregido contenidos sanitarios a partir de esos códigos.

El buscador sigue identificando únicamente la provincia por prefijo postal. No valida la existencia del código, no geolocaliza, no calcula distancias, no promete cercanía ni disponibilidad instantánea y no recoge ni guarda datos médicos o el código postal.

No se ha hecho comparación binaria ni prueba de humo contra producción. No se ha publicado, fusionado ni desplegado nada.

## Entrega prevista

- Rama: `manus/mobile-accessibility`.
- SHA base: `75fc9e25907b0eb3da89c8dd57c76cc4d2c15da6`.
- Base prevista del PR: `fix/province-accessibility`.
- No fusionar ni desplegar; la revisión final y la publicación quedan pendientes de aprobación independiente.
