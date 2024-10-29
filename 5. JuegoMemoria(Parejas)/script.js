const emojis = ['🐶', '🐱', '🦄', '🐸', '🐼', '🐧'];
const tablero = document.getElementById('tablero');

// Duplicar y mezclar emojis
const parejas = [...emojis, ...emojis].sort(() => 0.5 - Math.random());

let carta1 = null;
let carta2 = null;
let bloqueado = false;

function crearTablero() {
    parejas.forEach((emoji, index) => {
        const carta = document.createElement('div');
        carta.classList.add('carta', 'oculta');
        carta.dataset.emoji = emoji;
        carta.dataset.index = index;
        carta.addEventListener('click', revelarCarta);
        tablero.appendChild(carta);
    });
}

function revelarCarta(e) {
    if (bloqueado) return;

    const cartaActual = e.target;

    // Evitar que se seleccione la misma carta dos veces
    if (cartaActual === carta1) return;

    cartaActual.textContent = cartaActual.dataset.emoji;
    cartaActual.classList.remove('oculta');

    if (!carta1) {
        // Primera carta seleccionada
        carta1 = cartaActual;
    } else {
        // Segunda carta seleccionada
        carta2 = cartaActual;
        verificarPareja();
    }
}

function verificarPareja() {
    bloqueado = true;

    if (carta1.dataset.emoji === carta2.dataset.emoji) {
        // Emparejadas
        carta1.classList.add('encontrada');
        carta2.classList.add('encontrada');
        reiniciarSeleccion();
    } else {
        // No emparejadas, ocultar nuevamente después de un breve retraso
        setTimeout(() => {
            carta1.classList.add('oculta');
            carta1.textContent = '';
            carta2.classList.add('oculta');
            carta2.textContent = '';
            reiniciarSeleccion();
        }, 1000);
    }
}

function reiniciarSeleccion() {
    carta1 = null;
    carta2 = null;
    bloqueado = false;
}

crearTablero();
