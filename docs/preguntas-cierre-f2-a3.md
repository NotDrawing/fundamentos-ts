# Preguntas de cierre - EC1 F2 A3

## 1. ¿Qué significa refactorizar una aplicación?

Reestructurar el código interno sin cambiar su comportamiento externo, para
mejorar su organización, legibilidad y mantenibilidad. Aquí se tomó una sola
aplicación y se dividió en archivos con responsabilidades claras (datos,
servicios, modelos, componentes, utilidades), manteniendo la misma
funcionalidad de búsqueda y detalle.

## 2. ¿Por qué el proyecto se dividió en módulos?

Para separar responsabilidades: `models/` (tipos y el enum `RequestStatus`),
`data/` (la colección local de GIFs), `services/` (búsqueda y filtrado),
`components/` (renderizado de la interfaz) y `utils/` (funciones auxiliares
como `normalizeText`). Esto hace el código más reutilizable, fácil de mantener
y de probar de forma aislada.

## 3. ¿Cuál es la responsabilidad de main.ts?

Es el punto de entrada: orquesta la aplicación. Construye el HTML base
(`app.innerHTML`), obtiene las referencias a los elementos del DOM, registra
los manejadores de eventos (submit del formulario, `input` y clics en
galería/detalle) y delega en los componentes para renderizar
(`src/main.ts:26`).

## 4. ¿Qué diferencias existen entre una interfaz, un tipo unión y una enumeración?

- **Interfaz** (`Gif`): describe la _forma_ de un objeto (sus propiedades y
  tipos). Es extendible y sirve como contrato de estructura.
- **Tipo unión** (`GifRating = 'g' | 'pg' | 'pg-13'`): es un tipo que puede
  ser uno de varios valores permitidos, limita las opciones.
- **Enumeración** (`RequestStatus`): agrupa constantes nombradas con valor fijo
  (`Initial`, `Loading`, `Success`, etc.) para representar estados discretos.

## 5. ¿Para qué se utiliza import type?

Para importar solo los _tipos_ (interfaces, tipos unión) sin incluir código en
tiempo de ejecución. Se usa con `Gif` (p. ej. `src/services/gif.service.ts:1`);
al compilar, esas importaciones se eliminan porque solo aportan información de
tipos.

## 6. ¿Dónde se aplicaron la desestructuración, spread y rest?

- **Desestructuración:** extraer propiedades del objeto `gif` en
  `createGifCard` (`src/components/gallery.ts:4`) y `renderGifDetail`
  (`src/components/gif-detail.ts:4`).
- **Rest:** separar la primera etiqueta del resto:
  `const [mainTag, ...secondaryTags] = tags`
  (`src/components/gif-detail.ts:6`).
- **Spread:** copiar la colección al devolverla sin filtro
  `return [...collection]` (`src/services/gif.service.ts:17`) y unir campos
  con `...gif.tags` (`src/services/gif.service.ts:9`).

## 7. ¿Por qué searchGifs recibe la colección como parámetro?

Para que el servicio sea reutilizable y no dependa de una fuente de datos
concreta: puede recibir la colección local de `data/gifs.ts` u otra en el
futuro (por ejemplo, datos de la API), promoviendo una función pura y fácil de
probar.

## 8. ¿Por qué findGifById puede devolver undefined?

Porque usa `collection.find(...)`, que devuelve `undefined` si no hay ningún
GIF con el `id` buscado. El tipo de retorno lo refleja (`Gif | undefined`) y
en `main.ts` se valida ese caso (`src/main.ts:182`).

## 9. ¿Qué función cumple data-gif-id?

Es un atributo de datos que identifica cada tarjeta GIF en el HTML. Se usa con
`target.closest('[data-gif-id]')` para saber, al hacer clic, qué GIF se
seleccionó y luego obtener su id con `dataset.gifId` (`src/main.ts:159-168`).

## 10. ¿Qué es la delegación de eventos?

Colocar un solo listener en un elemento contenedor en lugar de uno por cada
hijo; el evento se propaga ("burbujea") desde el hijo hasta el contenedor, que
lo captura y decide qué hacer. Aquí el listener de `click` está en la galería y
el detalle, y mediante `target.closest(...)` se detecta el botón pulsado
(`src/main.ts:152`).

## 11. ¿Por qué el estado Loading podría no observarse?

Porque la búsqueda es síncrona y sobre datos locales: se ejecuta en
milisegundos, por lo que el cambio a `Loading` ocurre y se sustituye por
`Success`/`Empty` en el mismo ciclo de ejecución, sin que el navegador llegue a
pintar el texto "Buscando contenido...". Se notaría con una petición asíncrona
real a una API.

## 12. ¿Qué dificultad se presentó durante la refactorización y cómo se resolvió?

La principal fue repartir la lógica que estaba en un solo archivo en módulos
con responsabilidades claras manteniendo el mismo comportamiento. Se resolvió
definiendo tipos centralizados (`Gif`, `GifRating`, `RequestStatus`), pasando
la colección como parámetro a los servicios y componentes (evitando
dependencias circulares), y delegando el renderizado en funciones por
componente desde `main.ts`, que quedó como orquestador.
