Este script implementa un sistema CRUD (Crear, Leer, Actualizar, Eliminar) completo que interactúa con una API REST mediante peticiones asíncronas y mantiene una copia de respaldo en el almacenamiento local del navegador.

Características del Código
Consumo de API Asíncrono (async/await): Gestiona peticiones HTTP empleando fetch para realizar las operaciones básicas con el servidor remoto:

GET para obtener el listado.

POST para registrar nuevos productos.

PUT para actualizar elementos existentes.

DELETE para remover registros.

Estrategia de Persistencia Híbrida: Guarda los datos en memoria dinámica (Array), los respalda localmente en localStorage y los sincroniza de manera automática con la API.

Manipulación Dinámica del DOM: Genera, estructura y limpia los elementos de la interfaz en tiempo real sin requerir recargar la página.

Validación de Formularios y Mensajes: Comprueba que los campos cumplan con formatos correctos (nombres con texto y precios numéricos superiores a cero) antes del envío, notificando al usuario mediante alertas temporales.