
const inventario = {
    "P001": { id: "P001", nombre: "Laptop Asus", precio: 1200 },
    "P002": { id: "P002", nombre: "Mouse Ergonómico", precio: 45 },
    "P003": { id: "P003", nombre: "Teclado Mecánico", precio: 90 },
    "P004": { id: "P004", nombre: "Monitor 4K", precio: 350 }
};

console.log("--- TASK 1: Inventario de Productos Inicializado ---");
console.log(inventario);
console.log("\n" + "=".repeat(50) + "\n");



console.log("--- TASK 2: Trabajando con Sets (Unicidad) ---");

const numerosSet = new Set([10, 20, 30, 20, 40, 10, 50]);

console.log("Set inicial (notarás que no hay duplicados):", numerosSet);


numerosSet.add(60);
console.log("Set después de agregar el 60:", numerosSet);


const existeTreinta = numerosSet.has(30);
console.log(`¿El número 30 existe en el Set?: ${existeTreinta}`);

numerosSet.delete(20);
console.log("Set después de eliminar el 20:", numerosSet);

console.log("Recorriendo el Set con for...of:");
for (const numero of numerosSet) {
    console.log(`-> Valor: ${numero}`);
}
console.log("\n" + "=".repeat(50) + "\n");

console.log("--- TASK 3: Creación de un Map (Información Asociativa) ---");


const categoriasProductos = new Map();

categoriasProductos.set("Computadores", inventario["P001"].nombre);
categoriasProductos.set("Accesorios", inventario["P002"].nombre); 
categoriasProductos.set("Periféricos", inventario["P003"].nombre);
categoriasProductos.set("Pantallas", inventario["P004"].nombre);

console.log("Contenido del Map de categorías:", categoriasProductos);
console.log("\n" + "=".repeat(50) + "\n");



console.log("--- TASK 4: Iteración Avanzada ---");


console.log("A) Iterando el objeto 'inventario' con for...in:");
for (const idProducto in inventario) {

    if (inventario.hasOwnProperty(idProducto)) {
        console.log(`Clave de acceso: ${idProducto} -> Producto: ${inventario[idProducto].nombre}, Precio: $${inventario[idProducto].precio}`);
    }
}


console.log("\nB) Uso de métodos nativos de Object:");
console.log("Object.keys():", Object.keys(inventario));
console.log("Object.values() para ver precios:", Object.values(inventario).map(p => p.precio));
console.log("Object.entries() para desestructurar:");
for (const [clave, producto] of Object.entries(inventario)) {
    console.log(`  ID en Clave: ${clave} | Nombre Real: ${producto.nombre}`);
}


console.log("\nC) Recorriendo el Set de números con for...of:");
for (const num of numerosSet) {
    console.log(`  Número en Set: ${num}`);
}


console.log("\nD) Recorriendo el Map con forEach():");
categoriasProductos.forEach((nombreProducto, categoria) => {
    console.log(`La categoría '${categoria}' contiene el producto: ${nombreProducto}.`);
});
console.log("\n" + "=".repeat(50) + "\n");



console.log("--- TASK 5: Validaciones y Pruebas de Datos ---");

/**

 * @param {Object} producto 
 * @returns {boolean}
 */
function validarProducto(producto) {

    if (!producto.id || typeof producto.id !== "string" || producto.id.trim() === "") {
        console.error("Error de Validación: El 'id' debe ser un texto no vacío.");
        return false;
    }
    if (!producto.nombre || typeof producto.nombre !== "string" || producto.nombre.trim() === "") {
        console.error(`Error de Validación (ID: ${producto.id}): El 'nombre' debe ser un texto no vacío.`);
        return false;
    }
    if (producto.precio === undefined || typeof producto.precio !== "number" || producto.precio <= 0) {
        console.error(`Error de Validación (ID: ${producto.id}): El 'precio' debe ser un número mayor a 0.`);
        return false;
    }
    return true;
}


const productoValido = { id: "P005", nombre: "Audífonos Gamer", precio: 60 };
const productoInvalido = { id: "P006", nombre: "", precio: -10 }; // Falla nombre y precio

console.log("Probando producto válido:");
if (validarProducto(productoValido)) {
    inventario[productoValido.id] = productoValido;
    console.log("¡Producto P005 agregado con éxito!");
}

console.log("\nProbando producto inválido (debe mostrar errores en consola):");
if (validarProducto(productoInvalido)) {
    inventario[productoInvalido.id] = productoInvalido;
} else {
    console.log("Prueba superada: El sistema rechazó correctamente el producto inválido.");
}


console.log("\n--- REPORTES FINALES ---");


console.log("1. Inventario Final (Objeto Completo):", inventario);


const nombresUnicosSet = new Set(Object.values(inventario).map(p => p.nombre));
console.log("2. Set de Nombres Únicos en Inventario:", nombresUnicosSet);

console.log("3. Relación Categorías-Productos (Map Final):");
categoriasProductos.forEach((valor, clave) => {
    console.log(` * Categoría: ${clave} ===> Producto: ${valor}`);
});