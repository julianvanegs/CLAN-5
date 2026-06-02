Un script sencillo e interactivo en JavaScript que solicita el nombre y la edad del usuario a través del navegador, valida los datos ingresados y muestra un mensaje personalizado según si es mayor o menor de edad.

Características
Interacción en vivo: Utiliza prompt() para interactuar directamente con el usuario.

Validación de datos: Controla que el usuario ingrese un número real y no deje el campo vacío, utilizando isNaN() y .trim().

Mensajes dinámicos: Muestra respuestas personalizadas tanto en la consola (console.log / console.error) como en ventanas emergentes (alert).

Cómo Funciona el Código
El flujo del programa sigue una lógica condicional simple:

Captura de datos: Se solicita el nombre y la edad.

Conversión y limpieza: Se transforma la edad a tipo Number y se eliminan los espacios en blanco.

Validación:

Si la edad no es un número válido, muestra un mensaje de error.

Si es menor de 18 años, muestra un mensaje de motivación para estudiantes.

Si es mayor o igual a 18 años, muestra un mensaje enfocado en el mundo profesional.