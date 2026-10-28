# Encargo manual para Manus

Este documento no conecta Manus ni Venice. No hay evidencia de que estén trabajando. No se ha enviado el encargo a ningún servicio externo.

## Punto de partida exacto

- Repositorio: https://github.com/nicolasbeneitofiles05-create/dona
- Rama de origen: `fix/province-accessibility`.
- SHA de código probado: **`5b40a9e296efaa26edf0395ecc295371ae12d768`**. El commit posterior solo añade este encargo; usar el SHA fijado, no `main` ni una copia de la web publicada.
- PR #1: importación abierta. PR #2: correcciones sanitarias sobre la rama de importación. Esta rama apila móvil, accesibilidad y documentación sobre #2. Ninguno de estos cambios se ha publicado.

```sh
git fetch origin
git switch -c manus/mobile-accessibility 5b40a9e296efaa26edf0395ecc295371ae12d768
python scripts/build.py
node scripts/test-notices.cjs
```

Leer README.md, docs/HANDOFF.md, docs/SOURCE-AUDIT.md, docs/VALIDATION.md y docs/GEOGRAPHY.md antes de editar.

## Estado real y límites

Guía independiente de canales oficiales por provincia. El CP solo identifica un prefijo provincial: no valida existencia postal, no geocodifica, no calcula distancias ni encuentra el centro más cercano. No hay ingesta automática, cuentas sanitarias conectadas, backend, autenticación ni base de datos. No recoge datos médicos ni guarda el CP.

Los llamamientos sin corroboración se han retirado en el código. La campaña conservada tiene fechas fijas y pasa a caducada automáticamente; su caducidad editorial no representa un horario del centro. La web pública conserva la importación original y puede contener los avisos retirados. La producción no debe usarse como copia base.

Un único centro en el inventario documental: coordenadas pendientes y horarios oficiales discrepantes. No está habilitado para listarlo ni ordenar por distancia. Los textos legales no están validados jurídicamente. Las pruebas de navegador no certifican accesibilidad completa.

## Trabajo autorizado

- **Estética:** conservar el tono sobrio, fondo cálido, rojo oscuro y jerarquía de DONA. Afinar espaciado y legibilidad; no recrear la aplicación ni introducir una nueva identidad.
- **Operativa:** mejorar el recorrido buscar provincia → abrir canal oficial → confirmar información, manteniendo visibles sus límites y la alternativa estatal. Diseñar estados vacío, inválido y resultado sin sugerir urgencia o proximidad.
- **Técnica:** revisar 320, 375, 390, 768 y 1440 px, zoom 200 %, teclado, orden de foco, contraste, lector de pantalla y reducción de movimiento. Corregir problemas concretos con capturas antes/después y pruebas reproducibles.
- **Riesgo:** no alterar afirmaciones sanitarias, necesidades, fechas, fuentes, horarios, centros, nombres de campañas o caducidad sin evidencia primaria y revisión separada. Un enlace o `verified:true` no acreditan una afirmación. No añadir «tiempo real», datos médicos, formularios de salud, secretos, analítica, permisos de ubicación ni servicios de pago.

## Archivos y límites de edición

- `index.html`: CSS, composición, semántica y atributos de accesibilidad. Conservar el bloque `reviewedNotices`, `noticeState`, las fechas, mensajes sanitarios y URL oficiales. No cambiar lógica sanitaria ni añadir consultas remotas. Si una corrección requiere tocar JS, describir el fallo y justificar un diff mínimo de interacción; las pruebas sanitarias deben seguir pasando.
- `scripts/test-browser.cjs`: ampliar pruebas de interfaz si el cambio lo requiere; no eliminar comprobaciones para conseguir verde.
- Crear `docs/MANUS-REVIEW.md` con archivos tocados, hallazgos, capturas, pruebas ejecutadas y pendientes, navegador y anchuras.
- No modificar inventario, auditoría sanitaria, build, infraestructura, dependencias de producción ni secretos. No añadir backend, auth, base de datos ni mover Cloudflare.

## Criterios de aceptación y devolución

1. Build correcto y HTML completo servido; pasar `node scripts/test-notices.cjs` y `node scripts/test-browser.cjs`. Para este último instalar Playwright local según README y definir `BROWSER_PATH` si no se usa Edge de Windows.
2. Mantener 03801, 28007, 13001, 45001, 51001 y 52001, inválidos, caducidad y recarga, rechazo de aviso falso, enlaces y móvil. Sin errores JS ni desbordamiento horizontal, también con resultado abierto. Informar si una prueba no se puede ejecutar.
3. Menú accesible en móvil, foco visible y lógico, etiquetas y errores comprensibles, objetivos táctiles suficientes. Aportar evidencia de contraste y lector de pantalla si se prueban; no atribuir una certificación WCAG sin auditoría completa.
4. Guardar en `manus/mobile-accessibility`, subir esa rama y abrir PR contra `fix/province-accessibility`. Indicar el SHA base fijado y el SHA final, resumen del diff, pruebas y limitaciones.
5. **No publicar, no fusionar y no habilitar automatismos.** Si la rama base ha cambiado, revisar diferencias y explicarlo; no rebasar a ciegas sobre `main`. La aprobación de diseño no valida contenido sanitario.
