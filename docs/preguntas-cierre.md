# Preguntas de cierre - EC1 F1 A1

## 1. ¿Qué función cumple Node.js en el entorno de desarrollo?

Node.js ejecuta JavaScript fuera del navegador. En este proyecto, permite usar PNPM para instalar dependencias, ejecutar Vite como servidor de desarrollo y compilar TypeScript con `tsc`. Sin él, no podríamos gestionar paquetes ni transpilar el código.

## 2. ¿Qué es PNPM y qué responsabilidad tiene?

PNPM es un gestor de paquetes rápido que usa un almacenamiento global para evitar duplicar dependencias. Su responsabilidad es leer `package.json`, instalar paquetes en `node_modules`, generar `pnpm-lock.yaml` y ejecutar los scripts definidos (`dev`, `build`, `preview`).

## 3. ¿Qué problema resuelve Vite durante el desarrollo?

Vite resuelve la lentitud en el arranque y recarga de proyectos. Usa módulos ES nativos para servir código sin empaquetar, haciendo el inicio instantáneo, y aplica recarga en caliente (HMR) para actualizar solo los módulos modificados.

## 4. ¿Por qué se seleccionó la plantilla Vanilla con TypeScript?

Vanilla es ligera y sin dependencias de frameworks, ideal para aprender fundamentos. TypeScript añade tipado estático, que ayuda a detectar errores en compilación y mejora el mantenimiento al trabajar con datos externos como los de la API de Giphy.

## 5. ¿Cuál es la diferencia entre pnpm install, pnpm dev y pnpm build?

- **`pnpm install`**: instala dependencias y genera el lockfile.
- **`pnpm dev`**: inicia el servidor de desarrollo con HMR.
- **`pnpm build`**: compila TypeScript y genera la versión optimizada para producción en la carpeta `dist`.

## 6. ¿Qué información contiene package.json?

Contiene metadatos (nombre, versión, autor), scripts ejecutables, dependencias de producción y desarrollo, y configuraciones como el punto de entrada o el tipo de módulo.

## 7. ¿Por qué debe conservarse pnpm-lock.yaml en el repositorio?

Porque fija las versiones exactas de todas las dependencias, garantizando que todos los entornos instalen las mismas versiones y asegurando la reproducibilidad del proyecto.

## 8. ¿Por qué node_modules no debe subirse a GitHub?

Ocupa mucho espacio, es regenerable con `pnpm install`, contiene binarios específicos del sistema y no es necesario para el control de versiones. Se ignora mediante el archivo `.gitignore`.

## 9. ¿Cuál es la función de main.ts?

Es el punto de entrada de la aplicación. Importa los estilos, monta el contenido inicial en el elemento `#app` del DOM y carga los módulos necesarios para iniciar la lógica.

## 10. ¿Qué ventaja ofrece separar el código en components, models, services, styles y utils?

Mejora la organización y el mantenimiento. Cada carpeta tiene una responsabilidad clara: componentes visuales, modelos de datos, comunicación con APIs, estilos y funciones auxiliares, facilitando la reutilización y las pruebas.

## 11. ¿Qué diferencia existe entre el código fuente almacenado en src y los archivos generados en dist?

- **`src`**: contiene el código fuente editable (TypeScript, CSS) legible y modular.
- **`dist`**: contiene la versión compilada y optimizada para producción (JavaScript transpilado, minificado y empaquetado).

## 12. ¿Qué error o dificultad encontraste durante la configuración y cómo lo resolviste?

El principal error fue que PNPM no se reconocía con `corepack enable`. Lo resolví desinstalando Node.js, instalando la versión LTS recomendada y reiniciando Visual Studio Code. También se utilizó un puerto alternativo cuando el `5173` estaba ocupado.

## 13. ¿Cómo comprobaste que el repositorio puede ejecutarse en otro equipo?

Cloné el repositorio en otra carpeta, ejecuté `pnpm install`, luego `pnpm dev` y abrí la URL en el navegador. La aplicación cargó correctamente, confirmando que es reproducible.

## 14. ¿Qué aprendizaje de esta actividad será necesario para continuar desarrollando GIFinder?

El dominio de la configuración del entorno (Node, PNPM, Vite, Git), la organización modular del código y el uso de TypeScript son esenciales para añadir funcionalidades como la consulta a la API de Giphy y la interacción con componentes.
