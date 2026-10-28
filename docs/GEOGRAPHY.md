# Inventario geográfico

`data/geographic-inventory.json` es un inventario documental parcial, no un servicio ni un fichero consumido por el frontend. El worker existente solo sirve el HTML. No se añade backend ni se modifica el alojamiento.

Contiene un centro cuya identidad y dirección se han leído en su página institucional. Coordenadas, precisión y horario utilizable quedan pendientes: no se infieren de una dirección ni del CP. Dos páginas del mismo organismo discrepan en la hora de cierre entre semana; el registro conserva ambas evidencias. Publicación desconocida se representa con `null`, nunca con la fecha de consulta.

## Condiciones para la fase geográfica

1. Ampliar inventario con identificador estable, tipo de donación, jurisdicción, coordenadas WGS84, precisión, fuente de coordenadas, horario con excepciones, publicación conocida o desconocida, última comprobación y próxima revisión. Revisar cada centro con fuente primaria; no asumir cobertura nacional.
2. Incorporar datos postales con licencia y fecha de versión claras, incluidos 03801, 28007, 13001, 45001, Ceuta y Melilla. Un centroide de CP es aproximado: no es la posición del usuario.
3. Solo entonces calcular distancia geodésica entre coordenadas corroboradas. Mostrar precisión y que es distancia en línea recta; excluir registros sin coordenadas del orden y ofrecerlos por separado sin cercanía.
4. Probar resultados conocidos, CP inexistente, ceros iniciales, coordenadas ausentes, empate, fuentes caducadas, límites provinciales y territorios extrapeninsulares. La provincia no debe restringir artificialmente un futuro radio geográfico.
5. Ubicación del navegador es opcional y no está implementada. Si se incorpora: petición solo tras acción explícita, no almacenar posición, probar permiso concedido, denegado y error; conservar búsqueda manual.

No se ha elegido proveedor, contratado un servicio ni hecho geocodificación. No usar endpoints públicos masivamente ni crear tareas recurrentes. La función actual solo reconoce prefijos provinciales de cinco cifras; no valida la existencia del CP. Cobertura de centros documentados: un registro pendiente; ninguna lista de 45 centros acreditada.
