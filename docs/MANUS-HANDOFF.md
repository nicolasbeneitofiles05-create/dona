# Encargo manual para Manus

Este documento registra el encargo manual inicial. Manus ha entregado el PR #5 y sus cambios técnicos de móvil/accesibilidad se han revisado y publicado. No existe integración automática ni evidencia de otro encargo en ejecución. La siguiente iteración se preparará por separado, sobre el SHA vigente.

## Punto de partida exacto

- Repositorio: https://github.com/nicolasbeneitofiles05-create/dona
- Rama de origen: `main`.
- SHA exacto publicado y comprobado vigente: **`aba4b83f254d001e890b2c3b6bad175a2cf32c90`**. Base inicial del encargo ya entregado: `75fc9e25907b0eb3da89c8dd57c76cc4d2c15da6`. No recrear el proyecto desde una captura o copia web.
- PR #1, #2, #3 y #5 fusionados. Cloudflare publica el SHA vigente; evidencia y recuperación en `docs/PRODUCTION.md`.

```sh
git fetch origin
git switch -c manus/mobile-next aba4b83f254d001e890b2c3b6bad175a2cf32c90
python scripts/build.py
node scripts/test-notices.cjs
```

Leer README.md, docs/HANDOFF.md, docs/SOURCE-AUDIT.md, docs/VALIDATION.md y docs/GEOGRAPHY.md antes de editar.

## Estado real y límites

Guía independiente de canales oficiales por provincia. El CP solo identifica un prefijo provincial: no valida existencia postal, no geocodifica, no calcula distancias ni encuentra el centro más cercano. No hay ingesta automática, cuentas sanitarias conectadas, backend, autenticación ni base de datos. No recoge datos médicos ni guarda el CP.

Los llamamientos sin corroboración se han retirado también de producción. La campaña conservada figura caducada en la comprobación pública; su caducidad editorial no representa un horario del centro. El HTML público coincide byte a byte con el artefacto del SHA fijado. El repositorio es la base editable.

Un único centro en el inventario documental: coordenadas pendientes y horarios oficiales discrepantes. No está habilitado para listarlo ni ordenar por distancia. Los textos legales no están validados jurídicamente. Las pruebas de navegador no certifican accesibilidad completa.

## Trabajo autorizado

- **Estética:** preparar una mejora visual profesional conservando fondo cálido, rojo oscuro e identidad DONA. Resolver densidad de cabecera, jerarquía del buscador y peso de las notas editoriales. Aportar propuesta antes/después y comprobar contenido real con avisos caducados, no una demo independiente. Mantener presentes fechas y fuentes.
- **Operativa:** mejorar el recorrido buscar provincia → abrir canal oficial → confirmar información, manteniendo visibles sus límites y la alternativa estatal. Diseñar estados vacío, inválido y resultado sin sugerir urgencia o proximidad.
- **Técnica:** revisar 320, 375, 390, 768 y 1440 px, zoom 200 %, teclado, orden de foco, contraste, lector de pantalla y reducción de movimiento. Corregir problemas concretos con capturas antes/después y pruebas reproducibles.
- **Riesgo:** no alterar afirmaciones sanitarias, necesidades, fechas, fuentes, horarios, centros, nombres de campañas o caducidad sin evidencia primaria y revisión separada. Un enlace o `verified:true` no acreditan una afirmación. No añadir «tiempo real», datos médicos, formularios de salud, secretos, analítica, permisos de ubicación ni servicios de pago.

## Archivos y límites de edición

- `index.html`: CSS, composición, semántica y atributos de accesibilidad. Conservar el bloque `reviewedNotices`, `noticeState`, las fechas, mensajes sanitarios y URL oficiales. No cambiar lógica sanitaria ni añadir consultas remotas. Si una corrección requiere tocar JS, describir el fallo y justificar un diff mínimo de interacción; las pruebas sanitarias deben seguir pasando.
- `scripts/test-browser.cjs`: ampliar pruebas de interfaz si el cambio lo requiere; no eliminar comprobaciones para conseguir verde.
- Crear `docs/MANUS-REVIEW.md` con archivos tocados, hallazgos, capturas, pruebas ejecutadas y pendientes, navegador y anchuras.
- No modificar inventario, auditoría sanitaria, build, infraestructura, dependencias de producción ni secretos. No añadir backend, auth, base de datos ni mover Cloudflare.

## Segundo encargo: buscador geográfico real

Entregar en otro PR desde `main`, rama `manus/geographic-search`, después de revisar `docs/GEOGRAPHY.md`. No mezclar una mejora visual con cambios sanitarios o de geolocalización.

1. Preparar un inventario mayor en `data/geographic-inventory.json` con identidad, jurisdicción, coordenadas WGS84, precisión, horarios y excepciones, publicación conocida o desconocida, comprobación, próxima revisión y URL de evidencia por campo. No inventar datos faltantes ni resolver por intuición el horario discrepante.
2. Seleccionar una fuente postal descargable con licencia, fecha de versión y evidencia de cobertura de España, Ceuta y Melilla. Priorizar datos locales, gratuitos y sin claves. Documentar procedencia y límites; no elegir proveedor de pago ni añadir consultas recurrentes. Un centroide de CP no representa la ubicación exacta de la persona.
3. Solo habilitar CP real y orden por distancia cuando haya datos postales y coordenadas suficientes y corroborados. Mostrar distancia en línea recta y precisión. Excluir del orden los centros sin coordenadas; conservar alternativa oficial y explicar cobertura parcial. No afirmar «más cercano» si no se puede respaldar.
4. Archivos adicionales permitidos para este segundo PR: inventario, `docs/GEOGRAPHY.md`, datos postales con licencia y atribución, lógica geográfica local y pruebas de distancias. Si requiere separar JS del HTML, adaptar el build en el mismo PR y demostrar que Cloudflare sirve todos los recursos; mantener la arquitectura sin backend ni secretos.
5. Probar los seis CP del encargo, CP inexistente, ceros iniciales, límites provinciales, datos ausentes/caducados y distancias conocidas con tolerancia declarada. Ubicación por permisos no es necesaria para CP; si se propone, tratarla como cambio separado, voluntario, sin almacenar posición y probar denegación/error.
6. Las fuentes, fechas, `noticeState` y pruebas de avisos sanitarios quedan protegidas también en este PR. No publicar ni fusionar. Si falta evidencia suficiente para activar distancias, entregar el inventario y dejar la función desactivada con explicación.

## Criterios de aceptación y devolución

1. Build correcto y HTML completo servido; pasar `node scripts/test-notices.cjs` y `node scripts/test-browser.cjs`. Para este último instalar Playwright local según README y definir `BROWSER_PATH` si no se usa Edge de Windows.
2. Mantener 03801, 28007, 13001, 45001, 51001 y 52001, inválidos, caducidad y recarga, rechazo de aviso falso, enlaces y móvil. Sin errores JS ni desbordamiento horizontal, también con resultado abierto. Informar si una prueba no se puede ejecutar.
3. Menú accesible en móvil, foco visible y lógico, etiquetas y errores comprensibles, objetivos táctiles suficientes. Aportar evidencia de contraste y lector de pantalla si se prueban; no atribuir una certificación WCAG sin auditoría completa.
4. Guardar en la rama correspondiente y abrir PR contra `main`. Indicar SHA base fijado y SHA final, resumen del diff, pruebas y limitaciones. No afirmar que el encargo está en ejecución hasta que exista evidencia de recepción y trabajo.
5. **No publicar, no fusionar y no habilitar automatismos.** Si la rama base ha cambiado, revisar diferencias y explicarlo; no rebasar a ciegas sobre `main`. La aprobación de diseño no valida contenido sanitario.
