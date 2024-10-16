// Seleccionamos los botones y el contenedor donde mostraremos el resultado
const opciones = document.querySelectorAll('.opciones');
const resultado = document.getElementById('resultado');

// Opciones de la máquina
const opcionesMaquina = ['🧱', '🧻', '✂'];

// Función para generar la opción de la máquina de manera aleatoria
function opcionAleatoria() {
    const indice = Math.floor(Math.random() * opcionesMaquina.length);
    return opcionesMaquina[indice];
}

// Función que determina el resultado del juego
function determinarGanador(jugador, maquina) {
    if (jugador === maquina) {
        return 'Es un empate';
    } else if (
        (jugador === '🧱' && maquina === '✂') ||
        (jugador === '🧻' && maquina === '🧱') ||
        (jugador === '✂' && maquina === '🧻')
    ) {
        return '¡Has ganado!';
    } else {
        return 'Has perdido';
    }
}

// Asignamos un evento de clic a cada botón
opciones.forEach((boton) => {
    boton.addEventListener('click', () => {
        const eleccionJugador = boton.textContent; // Opción seleccionada por el jugador
        const eleccionMaquina = opcionAleatoria(); // Opción aleatoria de la máquina
        const resultadoFinal = determinarGanador(eleccionJugador, eleccionMaquina);

        // Mostramos el resultado
        resultado.textContent = `Tú elegiste: ${eleccionJugador}. La máquina eligió: ${eleccionMaquina}. ${resultadoFinal}`;
    });
});
