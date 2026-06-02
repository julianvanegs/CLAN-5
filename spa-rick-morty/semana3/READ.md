Este script crea una lista de notas interactiva que se guarda automáticamente en el navegador, permitiendo agregar y eliminar elementos en tiempo real sin perder la información al recargar la página.

Características del Código
Manipulación del DOM: Selección de elementos HTML, creación dinámica de componentes (<li> y <button>) e inserción en la interfaz.

Persistencia de Datos: Uso de localStorage (JSON.stringify y JSON.parse) para mantener las notas guardadas en el navegador de forma permanente.

Manejo de Eventos: Registro de clics para añadir notas mediante el botón de agregar y para eliminarlas mediante botones individuales en cada elemento.

Validación: Controla que el usuario no ingrese notas vacías y limpia el campo de texto de manera automática tras cada acción.