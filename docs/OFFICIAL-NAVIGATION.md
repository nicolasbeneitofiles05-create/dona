# Navegación oficial conectada al buscador

#12 aporta ocho prefijos y cinco destinos; esta integración incorpora el catálogo validado en el HTML durante el build, sin llamadas a JSON remoto ni dependencias. `dist/index.html` es el HTML compilado que contiene el worker. El archivo fuente puede abrirse directamente con navegación regional de respaldo; para comprobar la versión completa ejecutar el build.

Comprobación de destinos repetida el 29/10/2026 a las 12:03 Madrid en Edge móvil: cinco HTTP 200, URL HTTPS exacta y títulos institucionales acordes. Son enlaces de navegación, no evidencia de disponibilidad sanitaria ni permiso de republicar colectas.

- 03, 12 y 46: página provincial de puntos de donación.
- 08, 17, 25 y 43: calendario de Cataluña, sin filtro provincial implícito.
- 28: localizador de puntos móviles; el canal regional general sigue accesible para puntos fijos/requisitos.
- 51 y 52: directorio estatal y explicación de orientación parcial, sin sugerir un localizador local inexistente.
- Resto de provincias: conserva canales actuales y alternativa estatal.

El catálogo tiene aprobación exclusiva de navegación. Sus fechas se editan manualmente; el build y la recarga no las renuevan. El validador acepta fechas ISO reales no futuras y rechaza estados de investigación al compilar. Sin stock, eventos, horarios, coordenadas, geocodificación o datos médicos.

Pruebas: 10 casos offline del catálogo, build con validación previa, regresión de avisos/caducidad, destinos exactos para los seis CP y los nuevos prefijos, etiquetas acordes al alcance, fallback parcial, teclado y cinco anchuras. El HTML de pruebas se compara con `dist/index.html`, no con la plantilla sin compilar.
