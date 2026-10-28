# DONA

Guía independiente de canales oficiales de donación de sangre en España.

Web: https://dona-2fp.pages.dev

## Estado comprobado — 28/10/2026

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
