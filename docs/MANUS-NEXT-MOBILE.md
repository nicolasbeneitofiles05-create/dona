# Siguiente encargo manual · portada móvil breve

## Base y devolución

- Repositorio: https://github.com/nicolasbeneitofiles05-create/dona
- Rama de origen: `main`, SHA exacto de coordinación **`01ec033a6fd3d8334285c45edc405d444ffcbc23`** (incluye #4 documental y #5).
- SHA actualmente publicado: `aba4b83f254d001e890b2c3b6bad175a2cf32c90`. Su HTML y build son idénticos a los del SHA de coordinación; las diferencias posteriores son documentación y prueba pública.
- Crear rama `manus/compact-mobile` desde el SHA de coordinación. Abrir PR contra `main`, con base y SHA final explícitos. No publicar ni fusionar. Este documento no envía el encargo ni prueba que Manus lo haya recibido.

Leer README, `HANDOFF.md`, `PRODUCTION.md`, `SOURCE-AUDIT.md` y el comentario de producto de [PR #5](https://github.com/nicolasbeneitofiles05-create/dona/pull/5#issuecomment-6483249203). #5 ya se publicó como mejora técnica/accesibilidad pequeña; esta iteración aborda la longitud y utilidad real del recorrido.

## Estética

Conservar DONA, fondo cálido, tipografía de sistema y rojo oscuro. Priorizar una jerarquía clara: finalidad breve, CP, acción principal, resultado oficial. Reducir párrafos y espacios repetidos mediante composición y divulgación progresiva del contenido de apoyo. Sin ilustraciones artificiales ni tarjetas decorativas añadidas. No reducir tamaño de letra, escala ni interlineado para cumplir las métricas.

## Operativa y objetivos medibles

Medidas reales de producción en Edge el 29/10/2026, viewport de 844 px de alto, fuente de sistema, zoom 100 %. Página sin búsqueda y directorio visible:

| Anchura | Altura total inicial | Altura con 28007 | Bloque regional | Botón CP: borde inferior desde inicio |
| --- | ---: | ---: | ---: | ---: |
| 320 px | 5.892 px | 6.523 px | 1.666 px | 635 px |
| 390 px | 5.384 px | 5.925 px | 1.589 px | 577 px |

El directorio tiene 17 enlaces desplegados y el resultado de Madrid presenta cuatro enlaces con peso parecido. Datos brutos locales en `dist/mobile-baseline.json`; no son métricas de usuarios ni analítica.

Aceptación:

1. **Acortar al menos un 55 % la portada inicial**: altura máxima 2.600 px a 320 y 2.400 px a 390, con bloques secundarios plegados por defecto y avisos en su estado real. Con 28007 abierto, máximos 3.100 y 2.900 px. Medir `document.documentElement.scrollHeight` y aportar valores antes/después bajo las mismas condiciones. El contenido adicional debe seguir accesible; `overflow:hidden` o recortar textos no cumplen el objetivo.
2. A 320×568 y 390×844, campo y botón de CP visibles sin desplazamiento inicial. Un título breve y apoyo suficiente para entender que orienta por provincia. Etiqueta y error legibles, sin depender solo de color. Objetivos táctiles de al menos 44×44 px y foco visible.
3. Tras introducir CP: una acción para consultar y un enlace principal inequívoco para abrir el canal oficial correspondiente. Ninguna selección adicional de comunidad, confirmación o intermediario interno. Sin navegación externa automática. Accesos secundarios y alternativa estatal de menor peso, disponibles cuando el canal falla.
4. Directorio regional compacto: preferir `details/summary` o un patrón nativo equivalente accesible; conservar acceso a las 17 comunidades, Ceuta y Melilla mediante la orientación estatal. La navegación «Comunidades» debe abrir o llevar al control pertinente, sin aterrizar en contenido oculto sin contexto. Teclado, estado expandido y orden de foco comprobados.
5. Agrupar contenido de apoyo repetido de cómo funciona, confianza e información para centros. Avisos activos y sus fuentes/fechas no pueden quedar escondidos por defecto. Los históricos pueden ir a un archivo accesible claramente caducado; nunca reaparecer como urgencias. Mantener accesible el contexto de revisión manual y la ausencia de ingesta automática.

## Técnica y archivos

Modificar `index.html` para composición, estilos y semántica; mantener una página y el build actual. Se permite JS mínimo de interacción si lo exige el patrón elegido, con diff separado y justificación. Conservar `reviewedNotices`, `noticeState`, fechas, fuentes y mecanismo de caducidad. No cambiar infraestructura, datos sanitarios ni inventario en este PR.

Ampliar `scripts/test-browser.cjs` para estados plegado/abierto, altura y tareas reales. Si cambian selectores, justificar su sustitución conservando las comprobaciones. Crear `docs/MANUS-COMPACT-REVIEW.md` con archivos tocados, medidas, capturas disponibles, pruebas ejecutadas y pendientes. Los PNG de `dist/` ignorado no deben presentarse como enlaces GitHub disponibles: adjuntar evidencia al PR o explicar dónde se entrega.

## Pruebas y riesgo

- Tareas a 320 y 390: error y corrección, 03801→canal valenciano y 28007→canal madrileño; comprobar que el enlace principal abre la URL prevista. Distinguir navegación al destino de la comprobación del contenido externo. Medir acciones y desplazamiento necesario, no solo ausencia de desbordamiento.
- Regresiones existentes: seis CP, inválidos, aviso falso, caducidad en pestaña y recarga, teclado, reducción de movimiento y cinco anchuras. Directorio accesible con ratón y teclado; error comprensible; sin JS ni scroll horizontal. Aportar zoom real 200 % si se prueba; viewport de 160 px es prueba adicional, no equivalente completo a zoom real.
- La prueba de altura usa campaña histórica; probar además un estado activo de fixture en el test para asegurar que no queda oculto ni cambia su vigencia. El fixture no entra en el contenido publicado.
- Fuente, publicación, última comprobación y caducidad explícitas e intactas. No actualizar fechas al recargar, inventar horarios o cercanía, anunciar tiempo real, recoger datos médicos, contratar servicios ni añadir ejecuciones recurrentes.
- Contraste y lector de pantalla: identificar qué se comprobó y con qué herramienta. No afirmar certificación WCAG ni validación en dispositivos físicos sin ejecutarlas.

La fase geográfica se entrega por separado según `GEOGRAPHY-NEXT.md`. No activar distancias con el inventario actual.
