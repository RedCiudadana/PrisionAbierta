main-page-links: _Front page image links_. Si la fila no incluye una propiedad `link`
o la propiedad `route` no existe dentro del router, la linea se excluye. De lo contrario
se imprime utilizando el `title` o el `imageLink` en la página principal.

configuración: incluye pares de valores `key`, `value` de configuración, tales como:
logoUrl
logoTitle
twitterShareLink
facebookShareLink
siteMainTitle
banner1Link
banner1Title: Define si se utilizará el _main page slider_ en la página principal
banner1Footer
banner1Slider
metodologia
resultados
useFrontPortfolioVisualization: Define si se utilizará la visualización de portafolio
sobre los perfiles en la página principal
useFrontTableVisualization: Define si se utilizará la visualización de tabla sobre
los perfiles en la página principal
htmlTitle: Define el texto que se utilizará como HTML title
helloBarUrl: 

El resultado de esta configuración se mapea a `model.config` de la ruta `application`.

navbar-links: incluye los pares de valores `route`, `title` que definen los links
que aparecen en el header a la derecha. Si `route` no se encuentra definida en el
router se excluye del listado.

main-page-slider-data: define los `link`s, `caption`, `route`, `id` e `imageLink`
de los perfiles que se utilizarán para el _main page slider_

institucion-funcionalidades:

institucion-informacion-general-configuracion:

institucion-data:

perfil-funcionalidades: define las funcionalidades asociadas a un perfil como rutas
hijas de la ruta `perfil`

perfil-informacion-general-configuracion: define los campos a utilizar como información
general de un `perfil`

diputados-comision:

partido:

perfil:

documentos-disponibles:

fact-checking-data:

tabla-gradacion:

perfil-frente-a-frente-configuracion:
