# Validación · 28/10/2026

## Ejecutado

- Importación: lectura de README, HANDOFF, cuerpo y revisiones del PR #1; ramas y árbol Git inspeccionados. PR abierto, no fusionado. `main` solo tenía README. Build de la importación correcto. HTML Git 32.686 bytes; CRLF del checkout explica los 32.808 bytes locales. Cierre de documento y script completos, sintaxis JS correcta. Comparación con producción bloqueada por HTTP 403.
- Build de la corrección con `python scripts/build.py`, sin despliegue. JavaScript comprobado con Node.
- `node scripts/test-notices.cjs`: límite exacto de caducidad, fechas ausentes, inválidas e imposibles, fecha futura, fuente engañosa, protocolo inseguro y aviso pendiente con `verified:true`.
- `node scripts/test-browser.cjs`: Edge 149.0.7827.85 headless, contra el worker generado, no una maqueta ni un servidor que ignore el build. 03801→Alicante, 28007→Madrid, 13001→Ciudad Real, 45001→Toledo, 51001→Ceuta y 52001→Melilla. Resultado aclara provincia y ausencia de distancias. Calendario CLM limitado a la provincia correspondiente.
- Inválidos: vacío, 0380, abcde, 00000, 99001 y nombres Ceuta/Melilla en el campo numérico. Estado `aria-invalid` se restablece al corregir. No se valida existencia postal: otros valores de cinco cifras con prefijo reconocido pueden orientar aunque no estén asignados.
- Reloj simulado: campaña activa, cruce de caducidad en pestaña y recarga conserva caducidad. Inyección de aviso pendiente no se presenta. Sin errores JavaScript.
- Anclas y protocolos de enlaces, `noopener`, navegación por teclado, salto al contenido, reducción de movimiento y ausencia de desbordamiento a 320, 375, 390, 768 y 1440 px. Capturas en `dist/`; captura de 320 inspeccionada visualmente. No es una certificación WCAG ni una prueba con lector de pantalla.
- Enlaces HTTP: 24 URL únicas, 18 respuestas 2xx, cinco errores de conexión y un 403 (Castilla y León). Detalles en `dist/link-results.json`. Errores de conexión: La Rioja, puntos GVA y tres URL de SESCAM. No se declaran rotos ni verificados por ese resultado. El directorio estatal se ofrece como alternativa en todo resultado. El contenido de las fuentes sanitarias se revisó por separado en `SOURCE-AUDIT.md`.

## Pendiente

- Comparación binaria y prueba de humo de producción, sin desplegar en esta fase.
- Accesibilidad con lector de pantalla, contraste completo y dispositivos físicos iOS/Android; auditoría adicional encargable a Manus.
- Ampliar inventario y corroborar coordenadas y horarios; resolver discrepancia institucional documentada. Geocodificación, distancias y permisos no existen, por tanto no se han probado.
- Validación humana de textos legales antes de difusión amplia. No se incorporan cookies, datos médicos, secretos ni analítica.

## Coste y operación

Sin contratación, despliegue, llamadas a APIs de pago ni ejecuciones recurrentes de GitHub Actions. Herramientas locales y consultas públicas bajo demanda. No se ha auditado facturación de cuentas externas; no se atribuye coste cero a servicios ajenos a esta ejecución. La revisión editorial caduca y requiere nuevas comprobaciones manuales, nunca una recarga para renovarla.
