
const nombreUsuario = prompt("Por favor, ingresa tu nombre:");

const edadIngresada = prompt("Por favor, ingresa tu edad:");


const edadUsuario = Number(edadIngresada);


if (isNaN(edadUsuario) || edadIngresada.trim() === "") {

    console.error("Error: Por favor, ingresa una edad válida en números.");
    alert("Error: Por favor, ingresa una edad válida en números.");
} else {

    if (edadUsuario < 18) {

        const mensajeMenor = `Hola ${nombreUsuario}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`;
        console.log(mensajeMenor);
        alert(mensajeMenor);
        
    } 
    else {

        const mensajeMayor = `Hola ${nombreUsuario}, eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!`;
        console.log(mensajeMayor);
        alert(mensajeMayor);
    }
}