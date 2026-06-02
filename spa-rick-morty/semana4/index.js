
const API_URL = "https://66567da39f921692723da56b.mockapi.io/api/v1/productos";


const formularioProducto = document.getElementById("formularioProducto");
const inputId = document.getElementById("productoId");
const inputNombre = document.getElementById("nombreProducto");
const inputPrecio = document.getElementById("precioProducto");
const btnGuardar = document.getElementById("btnGuardar");
const btnSincronizar = document.getElementById("btnSincronizar");
const listaProductos = document.querySelector("#listaProductos");
const panelMensaje = document.getElementById("panelMensaje");


let listaProductosMemoria = [];


const mostrarMensaje = (texto, tipo) => {
    panelMensaje.textContent = texto;
    panelMensaje.className = tipo === "success" ? "msg-success" : "msg-error";
    panelMensaje.style.display = "block";
    

    setTimeout(() => {
        panelMensaje.style.display = "none";
    }, 4000);
};

const validarDatosProducto = (nombre, precio) => {
    if (nombre.trim() === "") {
        mostrarMensaje("El nombre del producto no puede estar vacío.", "error");
        return false;
    }
    if (isNaN(precio) || precio <= 0) {
        mostrarMensaje("El precio debe ser un número mayor a cero.", "error");
        return false;
    }
    return true;
};


const guardarEnLocalStorage = () => {
    localStorage.setItem("productos_locales", JSON.stringify(listaProductosMemoria));
    console.log("-> Local Storage Actualizado:", listaProductosMemoria);
};

const cargarDesdeLocalStorage = () => {
    const datosGuardados = localStorage.getItem("productos_locales");
    if (datosGuardados) {
        listaProductosMemoria = JSON.parse(datosGuardados);
        console.log(`-> Local Storage Cargado: ${listaProductosMemoria.length} elementos encontrados.`);
        renderizarListaDOM();
    } else {
        console.log("-> Local Storage vacío. Esperando datos...");
    }
};

const renderizarListaDOM = () => {
   
    listaProductos.innerHTML = "";

    listaProductosMemoria.forEach(producto => {

        const nuevoLi = document.createElement("li");
        nuevoLi.className = "producto-item";
        

        const infoTexto = document.createElement("span");
        infoTexto.textContent = `${producto.nombre} - $${Number(producto.precio).toFixed(2)}`;
        nuevoLi.appendChild(infoTexto);


        const contenedorAcciones = document.createElement("div");
        contenedorAcciones.className = "acciones";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn-edit";
        btnEditar.addEventListener("click", () => cargarProductoEnFormulario(producto));

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-delete";
        btnEliminar.addEventListener("click", () => eliminarProductoControlador(producto.id, nuevoLi));

        contenedorAcciones.appendChild(btnEditar);
        contenedorAcciones.appendChild(btnEliminar);
        nuevoLi.appendChild(contenedorAcciones);
        listaProductos.appendChild(nuevoLi);
    });
};

const cargarProductoEnFormulario = (producto) => {
    inputId.value = producto.id;
    inputNombre.value = producto.nombre;
    inputPrecio.value = producto.precio;
    btnGuardar.textContent = "Actualizar Producto";
    inputNombre.focus();
};

const limpiarFormulario = () => {
    inputId.value = "";
    inputNombre.value = "";
    inputPrecio.value = "";
    btnGuardar.textContent = "Guardar Producto";
};


const obtenerProductosAPI = async () => {
    try {
        console.log("Petición GET enviada a la API...");
        const respuesta = await fetch(API_URL);
        
        if (!respuesta.ok) throw new Error("Error al recuperar los datos del servidor remoto.");
        
        const datosServidor = await respuesta.json();
        console.log("Respuesta GET Exitosa del Servidor:", datosServidor);
        
  
        listaProductosMemoria = datosServidor;
        guardarEnLocalStorage();
        renderizarListaDOM();
        mostrarMensaje("Datos sincronizados desde la API correctamente.", "success");
    } catch (error) {
        console.error("Error Crítico en GET:", error);
        mostrarMensaje(`No se pudo sincronizar: ${error.message}`, "error");
    }
};


formularioProducto.addEventListener("submit", async (evento) => {
    evento.preventDefault(); 
    
    const id = inputId.value;
    const nombre = inputNombre.value.trim();
    const precio = parseFloat(inputPrecio.value);

    if (!validarDatosProducto(nombre, precio)) return;

    const productoData = { nombre, precio };

    try {
        if (id) {
      
            console.log(`Petición PUT enviada para el ID: ${id}...`);
            const respuesta = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoData)
            });

            if (!respuesta.ok) throw new Error("Error al actualizar el producto en el servidor.");
            const productoActualizado = await respuesta.json();
            console.log("Respuesta PUT Exitosa:", productoActualizado);

      
            listaProductosMemoria = listaProductosMemoria.map(p => p.id === id ? productoActualizado : p);
            mostrarMensaje("Producto actualizado correctamente.", "success");
        } else {
        
            console.log("Petición POST enviada al servidor...");
            const respuesta = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoData)
            });

            if (!respuesta.ok) throw new Error("Error al guardar el producto en el servidor.");
            const nuevoProducto = await respuesta.json();
            console.log("Respuesta POST Exitosa:", nuevoProducto);

           
            listaProductosMemoria.push(nuevoProducto);
            mostrarMensaje("Producto creado y guardado con éxito.", "success");
        }

  
        guardarEnLocalStorage();
        renderizarListaDOM();
        limpiarFormulario();

    } catch (error) {
        console.error("Error Crítico en el Envío:", error);
        mostrarMensaje(error.message, "error");
    }
});


const eliminarProductoControlador = async (id, elementoDOM) => {
    if (!confirm("¿Está seguro de que desea eliminar este producto?")) return;

    try {
        console.log(`Petición DELETE enviada para el ID: ${id}...`);
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) throw new Error("No se pudo eliminar el recurso del servidor.");
        const productoEliminado = await respuesta.json();
        console.log("Respuesta DELETE Exitosa:", productoEliminado);


        listaProductos.removeChild(elementoDOM);

    
        listaProductosMemoria = listaProductosMemoria.filter(p => p.id !== id);
        guardarEnLocalStorage();
        
        mostrarMensaje("Producto eliminado permanentemente.", "success");
    } catch (error) {
        console.error("Error Crítico en DELETE:", error);
        mostrarMensaje(`Error al eliminar: ${error.message}`, "error");
    }
};


btnSincronizar.addEventListener("click", obtenerProductosAPI);


cargarDesdeLocalStorage();
obtenerProductosAPI();