# Datos

Los datos que alimentan el sitio provienen de un [Google spreadseet](https://docs.google.com/spreadsheets/d/1mfGF_4JB8i9X0YMpGxyKpGmYSCyLiWFaYCXebPmnyhU/pubhtml).

Este spreadhseet se vuelca en archivos JSON estáticos dentro de [`public/static-files`](public/static-files)
que están a disposición para consumo.

Además de datos, estos archivos estáticos cuentan algunos parámetros de configuración de la aplicación.

### Consumo

Se recomienda consumir los archivos a través de [RawGit](https://rawgit.com), un
servicio que devuelve correctamente el `Content-Type` del contenido.

Por ejemplo, en lugar de consumir directamente el archivo [`perfil.json`](static-files/perfil.json),
este se puede consumir por medio de RawGit con [esta URL para desarrollo](https://rawgit.com/RedCiudadana/JusticiaAbiertaBeta/master/public/static-files/perfil.json)
y [esta URL para producción](https://cdn.rawgit.com/RedCiudadana/JusticiaAbiertaBeta/e4077346/public/static-files/perfil.json).

### Archivos de datos

Los principales archivos de datos disponibles son:

##### [`perfil.json`](static-files/perfil.json)

Este archivo contiene los datos para el principal concepto a manejar dentro del sitio:
los perfiles de los candidatos. Acerca de estos se cuenta, por ejemplo, con la siguiente
información: `id`, `nombre`, `profesion`, `educacion`, `fechaNacimiento`, `partidoPostulante`,
`partidoActual`, `biografía` (con estructura HTML), `planTrabajo` (con estructura HTML).

Algunos de estos datos pueden ser usados dinámicamente mediante la incorporación
de su definición en [`perfil-frente-a-frente-configuracion.json`](static-files/perfil-frente-a-frente-configuracion.json).
Es decir, los campos definidos en este segundo archivo pueden servir como definición de
campos dinámicos que se esperan recibir en [`perfil.json`](static-files/perfil.json).

Por ejemplo, actualmente los campos `tagUno` y `tagDos` de cada item en [`perfil.json`](static-files/perfil.json)
deben ser interpretados como `Experiencia en Derechos Humanos` y `Experiencia Profesional`,
de acuerdo con el contenido de [`perfil-frente-a-frente-configuracion.json`](static-files/perfil-frente-a-frente-configuracion.json).

##### [`partido.json`](static-files/partido.json)

Se cuenta también con la información de los partidos que han propuesto a los distintos
candidatos, información tal como `id`, `nombreCompleto`, `email`, `telefono`, `noDeAfilados`.

##### [`documentos-disponibles.json`](static-files/tabla-gradacion.json)

Aquí se incluye la información de documentos que deben ser asociados a cada perfil,
utilizando como llave el campo `perfil`.

##### [`tabla-gradacion.json`](static-files/tabla-gradacion.json)

Se utiliza para almacenar la ponderación de cada candidato (perfil) en base a cuatro criterios
previamente establecidos:

* Aspectos Profesionales
* Aspectos Académicos
* Cualidades Éticas y de Probidad
* Proyección Humana E Idoneidad

La asociación entre los registros de este archivo y los de [`perfil.json`](static-files/perfil.json)
se hace por medio del campo `perfil`.

Adicional a estos cuatro registros, se cuenta con un registro `Total` que suma las
ponderaciones de cada candidato.

##### [`diputados-comision.json`](static-files/diputados-comision.json)

El contenido de este archivo es similar al de `perfil.json`, con la variante de
que aquí se almacena la información de los diputados que pertencen a la comisión
de Derechos Humanos del Congreso.

##### [`fact-checking-data.json`](static-files/partido.json)

Se utiliza para almacenar la información de múltiples posibles items de fatc checking
asociados a un posible candidato, identificado mediante la llave `perfil`.

##### [`institucion-data.json`](static-files/partido.json)

Cuenta con la información sobre la institución a la cual corresponden los perfiles
que se están evaluando. En el caso de Justicia Abierta (Beta), a la posición
de Procurador de los Derechos Humanos.
