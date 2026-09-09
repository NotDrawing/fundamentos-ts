# Preguntas de cierre - EC1 F1 A2

**Nombre:** Urbina Gutiérrez Angel
**Grupo:** 001

## 1. Modelo Gif

La interfaz `Gif` resuelve el problema de garantizar que cada objeto de la colección tenga siempre la estructura mínima necesaria para que el resto de funciones funcionen sin sorpresas. Por ejemplo, al tipar el arreglo como `const gifs: Gif[]`, TypeScript me avisa si olvido el `id`, si escribo mal `rating` o si pongo un tipo de dato incorrecto. Esto evita que en `createGifCard` intente leer `gif.title` y resulte ser `undefined`, porque la interfaz exige que `title` sea siempre un `string`.

## 2. Interfaz y objeto literal

La interfaz es una definición de tipos que actúa como un contrato, mientras que el objeto literal es el dato concreto que ocupo en el código. En mi solución, `Gif` es la interfaz y cada elemento dentro del arreglo `gifs` es un objeto literal que la implementa. La diferencia clave es que la interfaz solo existe en tiempo de compilación para ayudar a TypeScript, pero el objeto literal sí existe en el JavaScript final y contiene los valores reales como `"Gato programando"` o `"g"`.

## 3. Gif[] y error que evita

`Gif[]` significa "un arreglo compuesto únicamente por objetos que respeten la forma de la interfaz `Gif`". Esto evita que pueda colar por error un objeto con propiedades faltantes o mal escritas, como por ejemplo `{ name: 'Perro' }` en lugar de `{ id: 'dog-01', title: 'Perro', ... }`. Si lo intentara, el compilador lanza un error antes de que la aplicación intente mostrar `undefined` en el navegador.

## 4. Propiedades opcionales username y description

Se declaran opcionales (`username?: string`, `description?: string`) porque no todos los GIFs de la colección tienen autor o descripción. Por ejemplo, el GIF `coding-01` tiene `username` pero no `description`, y `idea-01` no tiene `username`. Al marcarlas como opcionales, el objeto sigue siendo válido sin ellas, y luego en `createGifCard` les asigno valores predeterminados como `username = 'Autor no disponible'` para que la tarjeta nunca muestre un espacio vacío.

## 5. Uso de let en lugar de const

Dentro de esta actividad, todas las variables que hacen referencia al DOM (`app`, `gallery`, `status`) y a la colección `gifs` son fijas y no se reasignan, por lo que `const` es suficiente. Usaría `let` si, por ejemplo, el arreglo `gifs` se reemplazara por completo al recibir datos de una API externa y necesitara sobrescribir la variable original con `gifs = nuevaLista;`.

## 6. Qué reciben y devuelven las funciones

- **`normalizeText(value: string): string`**: recibe un texto y devuelve el mismo texto en minúsculas y sin espacios laterales.
- **`searchGifs(collection: Gif[], value: string): Gif[]`**: recibe el arreglo completo de GIFs y la palabra del input, y devuelve un nuevo arreglo con los GIFs que coinciden con la búsqueda.
- **`createGifCard(gif: Gif): string`**: recibe un objeto `Gif` y devuelve una cadena de texto con el HTML completo de la tarjeta.

## 7. Diferencias entre forEach, filter, map y find

- **`forEach`**: solo itera y ejecuta una acción, pero no devuelve un nuevo arreglo (no lo uso en esta solución).
- **`filter`**: devuelve un nuevo arreglo con los elementos que cumplen la condición; lo uso dentro de `searchGifs` para quedarme solo con los GIFs que contienen la palabra buscada.
- **`map`**: transforma cada elemento y devuelve un arreglo de la misma longitud; lo uso en `renderGifs` para convertir la lista de GIFs en un arreglo de cadenas HTML.
- **`find`**: devuelve el primer elemento que cumple la condición, o `undefined`; lo uso para localizar el primer GIF con clasificación `'g'`.

## 8. find y control de undefined

`find` puede devolver `undefined` si ningún elemento coincide con la condición. Para controlarlo, usé el encadenamiento opcional y el operador de coalescencia nula en el `console.log`:  
`firstSafeGif?.title ?? 'Ninguno'`  
Así, si `find` no encuentra un GIF con rating `'g'`, el mensaje muestra `"Ninguno"` en lugar de lanzar un error al intentar leer `title` de `undefined`.

## 9. Callbacks en la solución

Un callback es una función que se pasa como argumento para ser ejecutada más tarde. Identifico dos claros en mi código:

1. La función que paso a `collection.filter((gif) => matchesQuery(gif, query))` es un callback que se ejecuta por cada elemento del arreglo.
2. La función que paso a `form.addEventListener('submit', (event) => { ... })` es otro callback que se ejecuta cuando el usuario envía el formulario.

## 10. Ventaja de las template strings

Permiten escribir el HTML de las tarjetas de forma mucho más clara al insertar variables directamente con `${ }` sin necesidad de concatenar con `+`. Por ejemplo, al escribir `<img src="${url}" alt="${title}" />`, el código mantiene el formato natural del HTML y es más fácil detectar errores de sintaxis, sobre todo cuando el bloque de la tarjeta ocupa varias líneas con etiquetas anidadas.

## 11. Destructuración y valor predeterminado de username

Uso la destructuración en `createGifCard` para extraer las propiedades del objeto `gif` en variables sueltas. Además, asigno un valor predeterminado directamente en la destructuración: `username = 'Autor no disponible'`. Esto me permite manejar el caso de que el GIF no tenga autor sin tener que escribir un `if` aparte, y asegura que la tarjeta siempre muestre un texto descriptivo en esa línea.

## 12. querySelector y validación de elementos

`querySelector` devuelve `null` si no encuentra el selector en el DOM. Para evitarlo, agrupé todos los elementos en una validación inmediata:  
`if (!form || !input || !gallery || !status) { throw new Error(...); }`  
Esta validación detiene la ejecución del script con un mensaje claro si falta algún elemento, y a partir de ese punto TypeScript sabe que las variables no son `null`, lo que me permite usarlas después en `renderGifs` y en los eventos.

## 13. Función de preventDefault

`preventDefault()` evita que el navegador recargue la página cuando se envía el formulario. Sin esta línea, al hacer clic en "Buscar", la página se recargaría y perderíamos los resultados mostrados. Al llamarla, el flujo queda controlado por mi código: calculo los resultados con `searchGifs` y los pinto con `renderGifs` sin que la interfaz se reinicie.

## 14. Respuesta cuando no hay coincidencias

Cuando la búsqueda no obtiene resultados, `renderGifs` detecta que `total === 0` y, en lugar de generar tarjetas, inyecta un párrafo especial en el `gallery.innerHTML`:  
`<p class="empty-state">No se encontraron GIFs. Prueba con otra palabra.</p>`  
Además, el contador `status.textContent` se actualiza a `"0 resultados"`, informando al usuario de que la búsqueda no arrojó nada.

## 15. Cambios al sustituir por datos de Giphy API

Lo más relevante es que la obtención de datos pasaría a ser asíncrona con `fetch` y `async/await`. Sin embargo, funciones como `searchGifs` (que filtra localmente) y `createGifCard` (que genera el HTML) podrían reutilizarse sin cambios, siempre que la API devuelva objetos que se ajusten a la interfaz `Gif` que ya definí. También podría necesitar un estado de carga mientras espero la respuesta del servidor.

## 16. Error o dificultad encontrada y comprobación

El error que encontré fue la advertencia de TypeScript en `renderGifs` al usar `gallery.innerHTML` y `status.textContent`, porque el compilador consideraba que esas variables podrían ser `null` a pesar de la validación externa. Lo resolví añadiendo una guardia local al inicio de la función:  
`if (!gallery || !status) { console.warn(...); return; }`  
Para comprobar que quedó resuelto, ejecuté `pnpm build` en la terminal y el compilador ya no mostró errores relacionados con objetos potencialmente nulos, y al probar la aplicación en el navegador todo siguió funcionando con normalidad.
