const categoriasCorrectas = {
    "Manzana": "Frutas",
    "Perro": "Animales",
    "Rojo": "Colores",
    "Banana": "Frutas",
    "Gato": "Animales",
    "Verde": "Colores"
};

function permitirSoltar(evento) {
    evento.preventDefault();
}

function arrastrar(evento) {
    evento.dataTransfer.setData("text", evento.target.id);
}

function soltar(evento) {
    evento.preventDefault();
    const palabraId = evento.dataTransfer.getData("text");
    const elementoPalabra = document.getElementById(palabraId);
    evento.target.appendChild(elementoPalabra);
}

function validar() {
    let contadorCorrecto = 0;
    for (const palabraId in categoriasCorrectas) {
        const elementoPalabra = document.getElementById(palabraId);
        const categoriaPadre = elementoPalabra.parentElement.id;
        if (categoriaPadre === categoriasCorrectas[palabraId]) {
            elementoPalabra.classList.add("correcta");
            elementoPalabra.classList.remove("incorrecta");
            contadorCorrecto++;
        } else {
            elementoPalabra.classList.add("incorrecta");
            elementoPalabra.classList.remove("correcta");
        }
    }
    const mensajeResultado = document.getElementById("resultado");
    if (contadorCorrecto === Object.keys(categoriasCorrectas).length) {
        mensajeResultado.innerText = "¡Felicidades! Todas las palabras están correctamente clasificadas.";
    } else {
        mensajeResultado.innerText = `Clasificación incorrecta. Has acertado ${contadorCorrecto} de ${Object.keys(categoriasCorrectas).length}. Intenta de nuevo.`;
    }
}

function resetear() {
    const contenedorPalabras = document.getElementById("contenedor-palabras");
    for (const palabraId in categoriasCorrectas) {
        const elementoPalabra = document.getElementById(palabraId);
        contenedorPalabras.appendChild(elementoPalabra);
        elementoPalabra.classList.remove("correcta", "incorrecta");
    }
    document.getElementById("resultado").innerText = "";
}
