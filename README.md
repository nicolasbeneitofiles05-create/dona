# DONA

Guía independiente de canales oficiales de donación de sangre en España.

Web: https://dona-2fp.pages.dev

## Estado del trabajo — 29/10/2026

DONA 2.0 publicada y comprobada: SHA `243d030129526b19252afb622e6f687e8515f0c5`, despliegue `bef4a785-2b3c-4813-812d-8cf72438c718`. #9 y #13 fusionados en ese orden. HTML público idéntico al artefacto; mensaje de avisos no exhaustivo y estado vacío compacto. Pruebas, hashes y rollback en [DONA2-RELEASE.md](docs/DONA2-RELEASE.md).

- Se retiran llamamientos no corroborados; la única campaña contrastada caduca con fecha fija. Ver [auditoría](docs/SOURCE-AUDIT.md).
- Pruebas ejecutadas en Edge: seis CP, inválidos, aviso falso, caducidad y recarga, teclado, enlaces internos y cinco anchuras. Ver [validación](docs/VALIDATION.md).
- Inventario documental parcial, sin coordenadas inventadas, geocodificación ni distancias. Ver [geografía](docs/GEOGRAPHY.md).
- #12 revisado con ocho pruebas y cinco destinos oficiales contrastados, todavía sin consumo en UI: [preparación de integración](docs/PR12-INTEGRATION-REVIEW.md). #8 permanece separado hasta validar inventario y coordenadas. No hay integración automática ni evidencia de un nuevo encargo de Manus en curso.

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
