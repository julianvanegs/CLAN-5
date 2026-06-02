
const inputNota = document.getElementById("inputNota");
const btnAgregar = document.getElementById("btnAgregar");

const listaNotas = document.querySelector("#listaNotas");


console.log("--- Elementos seleccionados con éxito ---");
console.log("Input:", inputNota);
console.log("Botón Agregar:", btnAgregar);
console.log("Lista UL:", listaNotas);

let notas = [];


const guardarEnLocalStorage = () => {
    localStorage.setItem("notas", JSON.stringify(notas));
    console.log("Cambio detectado: Local Storage actualizado.", notas);
};


const renderizarNotaEnDOM = (textoNota) => {

    const nuevoLi = document.createElement("li");
    const btnEliminar = document.createElement("button");


    nuevoLi.textContent = textoNota;
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn-eliminar");


    btnEliminar.addEventListener("click", () => {

        listaNotas.removeChild(nuevoLi);
        
     
        notas = notas.filter(nota => nota !== textoNota);
        guardarEnLocalStorage();
        
        console.log(`Nota eliminada: "${textoNota}"`);
    });


    nuevoLi.appendChild(btnEliminar);
    listaNotas.appendChild(nuevoLi);
};


const cargarNotasIniciales = () => {
    const notasGuardadas = localStorage.getItem("notas");
    
    if (notasGuardadas) {

        notas = JSON.parse(notasGuardadas);
        console.log(`Se cargaron ${notas.length} notas desde Local Storage.`);
        

        notas.forEach(nota => renderizarNotaEnDOM(nota));
    } else {
        console.log("No se encontraron notas previas en Local Storage.");
    }
};

btnAgregar.addEventListener("click", () => {
    const textoNota = inputNota.value.trim();

  
    if (textoNota === "") {
        alert("Por favor, escribe algo. La nota no puede estar vacía.");
        inputNota.focus();
        return; 
    }


    notas.push(textoNota);


    renderizarNotaEnDOM(textoNota);


    guardarEnLocalStorage();

    console.log(`Nota agregada con éxito: "${textoNota}"`);

   
    inputNota.value = "";
    inputNota.focus();
});

cargarNotasIniciales();