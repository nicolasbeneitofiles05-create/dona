# DONA 2.0 · rediseño visual y UX

## Contexto de integración

- Rama de origen: `manus/visual-ux-polish`, PR #9.
- SHA de origen exacto: `afa489816d91d3e10a847e3792d2349018e2ba79`.
- Rama de esta entrega: `manus/dona-redesign-v2`.
- PR #8 y PR #12 de trabajo geográfico/enlaces oficiales quedan fuera y no se modifican.
- No se ha fusionado, publicado ni modificado Cloudflare.

Esta rama depende de PR #9: debe revisarse como continuación de ese cambio y no como una rama independiente contra un `main` posterior.

## Auditoría visual

Se revisó la web pública `https://dona-2fp.pages.dev/`, la composición de `main` y las capturas de PR #9 en 320, 390 y 1440 px.

### Problemas concretos encontrados

- En escritorio toda la tarea estaba en una columna izquierda, dejando demasiado vacío a la derecha. Esto hacía que la herramienta pareciera una landing editorial y no un servicio sanitario de consulta.
- La portada no separaba con suficiente claridad el mensaje, la acción de búsqueda y la ruta posterior al canal oficial.
- Los avisos caducados ocupaban el mismo espacio conceptual que los avisos útiles del día, aunque ya estaban marcados como caducados.
- Los textos de límites y fiabilidad aparecían repartidos entre bloques que competían con la tarea principal.
- La navegación regional era correcta y accesible, pero no tenía suficiente peso como segundo destino útil.
- El input referenciaba el resultado dinámico en `aria-describedby` antes de que existiera contenido; se dejó la descripción estática en `inputHelp` y se conservó el anuncio dinámico mediante `role=status/alert`.

## Alternativas consideradas

### A — Editorial sanitario

Una portada más tipográfica, con burdeos, crema, tinta oscura y mucho ritmo editorial. Ventaja: refuerza identidad y confianza. Riesgo: puede seguir pareciendo una página de campaña si no se mejora la distribución de la herramienta.

### B — Atlas cívico / utilidad

Una composición de escritorio en dos columnas: explicación breve a la izquierda y buscador/resultado a la derecha; móvil centrado en una única tarea. Ventaja: convierte la página en una herramienta inmediatamente utilizable. Riesgo: si se exagera, puede parecer un dashboard administrativo.

### Dirección elegida: A+B

Se conserva la identidad editorial sanitaria —paleta existente, gota SVG, tipografía y tono sobrio— y se adopta la estructura de utilidad de B. La portada ahora es una “ruta sanitaria”: mensaje y garantías a la izquierda; CP, resultado y tres pasos a la derecha. En móvil se apila y el campo con CTA queda visible dentro del primer viewport.

## Implementación

### Portada

- Dos columnas reales en escritorio, sin rellenar el vacío con decoración.
- Mensaje principal reducido a una promesa concreta: llegar al organismo sanitario de la provincia sin registro.
- Indicadores breves de confianza: fuentes oficiales, sin geolocalización y sin datos personales.
- Módulo de búsqueda con jerarquía propia, numeración de tarea y ruta explícita: CP → provincia → canal oficial.
- A 320×568, el final del botón principal queda en 562 px; tanto el CP como el CTA están dentro del primer viewport.

### Avisos

- `renderNotices()` conserva exactamente `reviewedNotices`, `noticeState`, fuente, publicación, comprobación y caducidad.
- Los avisos `active` se muestran en “Vigentes”.
- Los avisos `expired` pasan a “Historial editorial”, dentro de un `<details>` cerrado por defecto.
- Los avisos retirados o no corroborados siguen sin mostrarse.
- No se han inventado campañas, necesidades, horarios ni fuentes.

### Directorio y metodología

- El directorio de 17 comunidades permanece en un disclosure accesible y cerrado por defecto.
- Ceuta y Melilla siguen usando el directorio estatal exacto.
- La metodología y los límites quedan en dos disclosures finales, fuera de la primera tarea.

### Accesibilidad y rendimiento

- Controles táctiles conservan alturas mínimas de 44 px o superiores.
- `role="alert"` y `aria-live="assertive"` para errores de CP.
- `role="status"` y `aria-live="polite"` para resultados correctos.
- Foco visible para input, botones y summaries.
- Contraste ajustado tras una auditoría Lighthouse real; nombre accesible del logotipo alineado con su texto visible.
- Sin animaciones continuas; se respeta `prefers-reduced-motion`.
- Sin dependencias nuevas ni recursos externos.

## Capturas comparativas

“Antes” corresponde al estado de PR #9 (`afa4898…`); “después” corresponde a esta rama:

| Viewport | Antes | Después |
|---|---|---|
| 320×568 | [`v2-before-320.png`](../dist/v2-before-320.png) | [`v2-after-320.png`](../dist/v2-after-320.png) |
| 390×844 | [`v2-before-390.png`](../dist/v2-before-390.png) | [`v2-after-390.png`](../dist/v2-after-390.png) |
| 1440×900 | [`v2-before-1440.png`](../dist/v2-before-1440.png) | [`v2-after-1440.png`](../dist/v2-after-1440.png) |

Los artefactos se conservaron en `dist/`, que permanece ignorado por Git.

## Mediciones reales

### Alturas de página en la suite de navegador

| Viewport | Estado | Altura final | Objetivo |
|---|---|---:|---:|
| 320×568 | Inicial | 2.216 px | ≤ 2.600 px |
| 320×568 | Resultado 28007 | 2.648 px | ≤ 3.100 px |
| 390×844 | Inicial | 2.074 px | ≤ 2.400 px |
| 390×844 | Resultado 28007 | 2.451 px | ≤ 2.900 px |

### Lighthouse 13.6.0, Chromium headless, rama local

| Perfil | Rendimiento | Accesibilidad | FCP | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|
| Móvil 390×844 | 100 | 100 | 1,1 s | 1,1 s | 0 | 0 ms |
| Escritorio 1440×900 | 96 | 100 | 1,0 s | 1,0 s | 0 | 0 ms |

INP no fue una medición válida en este laboratorio; no se infiere ningún valor de INP a partir de TBT.

## Pruebas ejecutadas

- `python3 scripts/build.py` — correcto.
- `node scripts/test-notices.cjs` — correcto: fuentes, estados de revisión, fechas imposibles y caducidad.
- `BROWSER_PATH=/usr/bin/chromium node scripts/test-browser.cjs` — correcto:
  - CP 03801, 28007, 13001, 45001, 51001 y 52001.
  - Un único CTA oficial y destino HTTPS exacto.
  - Error con `role=alert`, éxito con `role=status`.
  - Aviso vigente visible, aviso caducado trasladado al historial plegable y persistente tras recarga.
  - Aviso falso rechazado.
  - Directorio cerrado por defecto, 17 comunidades y teclado.
  - Primer viewport móvil, 320/375/390/768/1440 px y ausencia de scroll horizontal.
  - Reduced motion, foco, enlaces internos y ausencia de errores JavaScript.
- `python3 scripts/check-links.py` — ejecutado sin modificar afirmaciones sanitarias según respuestas de red.
- `git diff --check` — correcto.

## Resultado

DONA conserva su web estática y su lógica sanitaria, pero deja de presentarse como una columna editorial estrecha: la primera pantalla ahora es una herramienta pública de consulta, el escritorio tiene una composición equilibrada y los avisos históricos no compiten con la información vigente.
