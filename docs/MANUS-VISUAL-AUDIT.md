# DONA · auditoría visual y pulido UX

## Alcance y seguridad del trabajo

- Base: `main` en `c861d70593f23a0d092bfcf051013c6db81327d9`.
- Rama: `manus/visual-ux-polish`.
- URL pública auditada: `https://dona-2fp.pages.dev/`.
- No se modificaron datos sanitarios, provincias, comunidades, fuentes, fechas, caducidad, infraestructura ni despliegues.
- El PR #8 de inventario geográfico quedó fuera de esta rama.

## Auditoría visual antes de editar

La inspección se hizo con la página publicada y con capturas reproducibles de `main` en Chromium a 320, 390 y 1440 px.

### Problemas observados y por qué importaban

1. **Jerarquía del buscador mejorable.** El campo y el botón tenían el mismo peso visual y el panel no diferenciaba con suficiente claridad la entrada de datos de la acción que abre el canal sanitario. En móvil esto podía aumentar la duda sobre qué tocar primero.
2. **Estado de resultado demasiado plano.** El resultado correcto ya era funcional, pero la acción oficial necesitaba una señal más fuerte que la tarjeta de contexto y los enlaces secundarios. La tarea sanitaria principal debía ser reconocible de un vistazo.
3. **Foco visible poco refinado.** Los controles principales tenían foco, pero no había un tratamiento consistente para `summary` y el foco del campo podía confundirse con el borde normal del formulario.
4. **Error no anunciado con suficiente prioridad semántica.** El contenedor era `role=status` incluso cuando mostraba un error. Para lectores de pantalla, un código postal inválido debe anunciarse como alerta asertiva, mientras que un resultado correcto puede mantenerse como estado cortés.
5. **CSS duplicado.** La iteración compacta había dejado dos bloques completos de reglas idénticas. No cambiaba el aspecto, pero aumentaba el CSS descargado y dificultaba el mantenimiento.
6. **Decoración y movimiento.** No se añadieron adornos nuevos. Se mantuvo la composición editorial y se limitó la única transición nueva al resultado, desactivándola con `prefers-reduced-motion: reduce`.

## Implementación

- Limpieza del bloque CSS compacto duplicado: se conserva una sola definición.
- Campo de CP con borde y foco más distinguibles, sin aumentar el tamaño ni cambiar la interacción.
- CTA principal con jerarquía reforzada mediante color de marca oscuro, sombra discreta y estados hover/focus.
- Resultado exitoso con borde, sombra y acción oficial más reconocible; los enlaces secundarios siguen contenidos en “Más información oficial”.
- `summary` del directorio y de los bloques de apoyo recibe un foco visible consistente.
- Error de CP cambia dinámicamente el resultado a `role="alert"` y `aria-live="assertive"`; éxito mantiene `role="status"` y `aria-live="polite"`.
- Transición de entrada mínima de 180 ms solo cuando el usuario no ha solicitado reducir movimiento.
- No se añadió framework, dependencia, fuente externa, imagen, servicio ni animación continua.

## Capturas comparativas

Las capturas “antes” y “después” se generaron con la misma suite de navegador y el mismo estado de búsqueda para facilitar comparación:

| Viewport | Antes | Después |
|---|---|---|
| 320 px | [`audit-before-320.png`](../dist/audit-before-320.png) | [`audit-after-320.png`](../dist/audit-after-320.png) |
| 390 px | [`audit-before-390.png`](../dist/audit-before-390.png) | [`audit-after-390.png`](../dist/audit-after-390.png) |
| 1440 px | [`audit-before-1440.png`](../dist/audit-before-1440.png) | [`audit-after-1440.png`](../dist/audit-after-1440.png) |

Las imágenes son artefactos locales de revisión; `dist/` permanece ignorado por Git.

## Rendimiento y Core Web Vitals

Se ejecutó Lighthouse 13.6.0 en laboratorio headless con Chromium. El baseline público y la rama local no son el mismo origen: el primero mide el deployment actual y el segundo mide la rama sin publicar. Por eso no se presenta como una comparación de red estrictamente controlada.

### Baseline público observado

URL: `https://dona-2fp.pages.dev/`, viewport móvil 390×844 y escritorio 1440×900.

| Entorno | Rendimiento | Accesibilidad | FCP | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|
| Público, móvil | 100 | 100 | 0,9 s | 0,9 s | 0 | 0 ms |
| Público, escritorio | 96–98* | 95 | 0,7 s | 0,9 s | 0 | 100 ms |

\*Dos ejecuciones públicas consecutivas dieron 96 y 98 en rendimiento; la variación es del entorno remoto.

### Rama local después

Servidor estático local, mismos tamaños de viewport.

| Entorno | Rendimiento | Accesibilidad | FCP | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|
| Local, móvil | 100 | 100 | 1,0 s | 1,0 s | 0 | 0 ms |
| Local, escritorio | 97 | 95 | 1,0 s | 1,0 s | 0 | 0 ms |

INP no se reportó como medición válida en esta ejecución de laboratorio; TBT se conserva como proxy de bloqueo y fue 0 ms después en ambos perfiles. No se ha afirmado una mejora de INP sin una medición de campo.

La reducción del CSS duplicado baja el HTML servido de 34.715 a 30.981 bytes antes de los nuevos refinamientos, y la versión final sigue sin recursos de terceros.

## Pruebas de regresión

- `python3 scripts/build.py` — correcto.
- `node scripts/test-notices.cjs` — correcto: fuentes, fechas imposibles, caducidad y aviso pendiente.
- `BROWSER_PATH=/usr/bin/chromium node scripts/test-browser.cjs` — correcto: CP, resultados oficiales, Ceuta/Melilla, errores, directorio plegable, teclado, 5 anchuras, recarga, caducidad, aviso falso, movimiento reducido y ausencia de errores JavaScript.
- `python3 scripts/check-links.py` — ejecutado; los resultados de red no se usaron para alterar ninguna afirmación sanitaria.
- `git diff --check` — correcto.

## Resultado

La mejora es visual y de interacción, no un simple cambio cromático: el formulario tiene jerarquía más clara, el CTA sanitario es más evidente, el error se anuncia con semántica correcta, el foco cubre también disclosures y se elimina CSS duplicado sin perder funcionalidades ni alterar la información sanitaria.
