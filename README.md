# DONA

Guía independiente de canales oficiales de donación de sangre en España.

Web: https://dona-2fp.pages.dev

## Estado del trabajo — 29/10/2026

PR #1, #2 y #3 fusionados en orden. **Producción comprobada**: SHA `75fc9e25907b0eb3da89c8dd57c76cc4d2c15da6`, despliegue `4f09e706-800c-4434-96ea-c6fe3ab2d1f6`. El HTML público coincide byte a byte con el artefacto validado. Avisos retirados ausentes y campaña conservada caducada. Evidencia y recuperación en [PRODUCTION.md](docs/PRODUCTION.md).

- Se retiran llamamientos no corroborados; la única campaña contrastada caduca con fecha fija. Ver [auditoría](docs/SOURCE-AUDIT.md).
- Pruebas ejecutadas en Edge: seis CP, inválidos, aviso falso, caducidad y recarga, teclado, enlaces internos y cinco anchuras. Ver [validación](docs/VALIDATION.md).
- Inventario documental parcial, sin coordenadas inventadas, geocodificación ni distancias. Ver [geografía](docs/GEOGRAPHY.md).
- Manus y Venice no están integrados ni hay evidencia de trabajo en curso. El [encargo para Manus](docs/MANUS-HANDOFF.md) es un documento para entrega manual.

## Despliegue inicial documentado

- Cloudflare Pages, proyecto `dona`, rama de producción `main`.
- Despliegue inicial: `56ba485b-466f-4913-8682-474e8507028d`.
- HTML original: 32.686 bytes. Portada y CP 28007 comprobados en navegador.
- Orientación por provincia; sin geocodificación ni distancias.
- Sin ingesta automática de hospitales o redes sociales. El boletín externo no está conectado.
- Los avisos incluidos requieren revisión de fuentes y vigencia antes de difusión amplia.

## Desarrollo y publicación

El código se incorpora en un PR de importación. No existe conexión automática entre este repositorio y Cloudflare. Un commit o merge NO publica la web.

El despliegue inicial sirve el HTML mediante Pages Functions (`_worker.js`), debido a un fallo de autorización del endpoint de subida de assets. Tiene límites de ejecución de Functions; no equivale a alojamiento puramente estático. Coste incurrido registrado: 0 €, sin contratación de plan de pago.

No publicar otra versión hasta comparar cambios, comprobar fuentes sanitarias y ejecutar las verificaciones indicadas en la documentación.

## Reglas

No inventar necesidades, horarios, centros, fuentes ni distancias. No anunciar tiempo real. No recoger datos médicos ni credenciales en frontend. Los borradores legales requieren validación humana.

## Comprobaciones locales (sin publicar)

```sh
python scripts/build.py
node scripts/test-notices.cjs
npm install --no-save --package-lock=false --prefix .tools playwright
node scripts/test-browser.cjs
python scripts/check-links.py
```

La prueba de navegador usa Edge de Windows. En otro entorno, indicar su ejecutable mediante `BROWSER_PATH`. Playwright solo se utiliza para desarrollo; no se añade a la web. `dist/` y `.tools/` no se versionan. El inventario JSON es documental y no se sirve desde el worker actual. No hay GitHub Actions recurrentes.
