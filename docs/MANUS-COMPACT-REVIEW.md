# Revisión DONA · compact-mobile

## Base y alcance

- Rama creada: `manus/compact-mobile`.
- SHA base exacto: `01ec033a6fd3d8334285c45edc405d444ffcbc23`.
- PR previsto: contra `main`; no publicar ni fusionar.
- Se mantuvo la aplicación de una sola página, el build existente y la lógica sanitaria de `reviewedNotices`/`noticeState`.
- No se modificaron infraestructura, inventario geográfico, fuentes, fechas, horarios, necesidades, backend, autenticación ni servicios de pago.

La fase geográfica descrita en `docs/GEOGRAPHY-NEXT.md` queda fuera de esta rama: no se activan distancias, geolocalización ni listados de centros.

## Implementación

### Portada y tarea principal

La portada ahora prioriza una sola tarea: código postal → provincia → canal oficial. El campo y el botón aparecen en el primer bloque, con una explicación breve de que el CP solo orienta por prefijo provincial.

Después de una búsqueda correcta se muestra una única acción principal, **Abrir localizador oficial**, con la URL regional correspondiente. Los accesos secundarios —por ejemplo unidades móviles, calendarios específicos o el directorio estatal— quedan dentro de `Más información oficial`, sin competir visualmente con la acción principal y sin navegación automática.

### Directorio regional

Las 17 comunidades se generan desde el mismo array oficial existente, pero se presentan dentro de `<details>/<summary>` cerrado por defecto. El estado abierto/cerrado es nativo, visible para teclado y accesible mediante `aria-expanded` implícito. Ceuta y Melilla conservan la orientación al directorio estatal.

### Contenido de apoyo

Se conservaron los avisos y su información de fuente, publicación, comprobación y caducidad. El contexto operativo se reorganizó en dos divulgaciones nativas: “Cómo usar esta guía” y “Fiabilidad, límites y centros”. No se ocultó el aviso histórico: sigue visible en su estado real.

Se eliminó el elemento decorativo heredado del hero porque no aportaba utilidad al recorrido móvil.

## Medidas de altura

Las cifras de referencia son las medidas de producción documentadas en `docs/MANUS-NEXT-MOBILE.md` (viewport de 844 px y zoom 100 %). Las cifras nuevas se midieron con `document.documentElement.scrollHeight` en Chromium headless, con la misma página y los estados indicados.

| Anchura | Estado | Antes | Después | Reducción | Objetivo |
| --- | --- | ---: | ---: | ---: | ---: |
| 320 px | Inicial, sin búsqueda | 5.892 px | 1.958 px | 66,8 % | ≤ 2.600 px |
| 390 px | Inicial, sin búsqueda | 5.384 px | 1.786 px | 66,8 % | ≤ 2.400 px |
| 320 px | Resultado 28007 abierto | 6.523 px | 2.360 px | 63,8 % | ≤ 3.100 px |
| 390 px | Resultado 28007 abierto | 5.925 px | 2.137 px | 63,9 % | ≤ 2.900 px |

El contenido no se recorta mediante `overflow:hidden`: las comunidades y el apoyo siguen disponibles mediante controles nativos, y el aviso histórico permanece visible.

## Capturas comparativas

Las capturas se generaron con Chromium headless desde la base exacta y desde esta rama:

| Anchura | Antes | Después |
| --- | --- | --- |
| 320 px | [`before-mobile-320.png`](../dist/before-mobile-320.png) | [`mobile-320.png`](../dist/mobile-320.png) |
| 390 px | [`before-mobile-390.png`](../dist/before-mobile-390.png) | [`mobile-390.png`](../dist/mobile-390.png) |
| 1440 px | [`before-mobile-1440.png`](../dist/before-mobile-1440.png) | [`mobile-1440.png`](../dist/mobile-1440.png) |

Las imágenes están en `dist/`, que permanece ignorado por Git según las reglas del repositorio. Se entregan como artefactos locales de esta ejecución; no se presentan como archivos versionados de GitHub.

## Pruebas ejecutadas

- `python3 scripts/build.py` — correcto; el worker contiene el HTML completo.
- `node scripts/test-notices.cjs` — correcto; fechas imposibles, fuentes no permitidas, caducidad y aviso pendiente rechazado.
- `BROWSER_PATH=/usr/bin/chromium node scripts/test-browser.cjs` — correcto. Incluye:
  - CP `03801 → Alicante`, `28007 → Madrid`, `13001 → Ciudad Real`, `45001 → Toledo`, `51001 → Ceuta`, `52001 → Melilla`.
  - URL principal exacta para Comunitat Valenciana y Comunidad de Madrid.
  - Una sola `.result-main` por resultado.
  - Estados inválidos y error visible con `aria-invalid`.
  - Directorio cerrado inicialmente, 17 enlaces al abrirlo y cierre mediante teclado.
  - Campaña histórica visible, fixture activo comprobado, caducidad en pestaña y recarga, aviso falso rechazado.
  - Campo y botón visibles sin desplazamiento inicial a 320×568 y 390×844.
  - Sin scroll horizontal a 320, 375, 390, 768 y 1440 px.
  - Teclado, foco, enlaces internos, movimiento reducido y ausencia de errores JavaScript.
- `python3 scripts/check-links.py` — 23 URL revisadas; 17 respuestas 2xx y 6 resultados no concluyentes/no-2xx. Un código HTTP o error de conexión no se ha usado para alterar afirmaciones sanitarias.
- `git diff --check` — correcto.

## Pendientes y límites

No se ha ejecutado una auditoría completa con lector de pantalla, contraste mediante herramienta especializada, iOS/Android físico ni una certificación WCAG. La prueba de viewport de 160 px/zoom conservador de la iteración anterior no sustituye una prueba de zoom real; esta rama sí comprueba las anchuras y alturas solicitadas y el comportamiento responsive.

La comprobación de enlaces es una instantánea de red. La fuente de la campaña histórica conserva su URL y metadatos originales aunque la respuesta remota pueda ser 404 en esta ejecución; no se ha reinterpretado ese resultado como validación o retirada sanitaria.

El buscador sigue siendo provincial: no valida la existencia postal, no geocodifica, no calcula distancias, no promete cercanía o disponibilidad y no almacena el código postal.
