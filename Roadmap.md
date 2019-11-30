# Apollo Federation - LABXIII
## Descripcion
En labX III hemos pensado en realizar una pequeña prueba de concepto de Apollo Federations. Esto lo estamos llevando a cabo entre un equipo de 5 Personas.

## Modelo de Datos
Vamos a tener tres microservicios, cada uno se encargará de gestionar cada una de las entidades.
Tendremos HOTEL, GASTRO, DESTINATIONS. La relacion sera DESTINATION tendra HOTEL y GASTRO


## RoadMap
* Crear el esquema, para ello se realizara a traves de GraphCMS donde usando la potencia que nos da esta herramienta podremos poner crear visualmente los tipos de objetos y nos generará el schema GraphQL
* Realizar cada uno de los microservicios
* Extender los esquemas con las directivas que provee apollo federations
* Realizar el GW
* Montar el modelo de datos en REDIS


### TODO (Si da tiempo)
* Añadir una capa para coger el modelo de datos desde el propio GraphCMS
* Añadir GitHub Actions