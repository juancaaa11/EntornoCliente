// Número aleatorio entre 1 y 100
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;

function adivinar() {
    const numeroJugador = document.getElementById('numero').value;
    const resultado = document.getElementById('resultado');

    if (!numeroJugador) {
        resultado.textContent = 'Por favor, introduce un número.';
        return;
    }

    if (numeroJugador < numeroAleatorio) {
        resultado.textContent = 'El número es mayor. ¡Intenta otra vez!';
    } else if (numeroJugador > numeroAleatorio) {
        resultado.textContent = 'El número es menor. ¡Intenta otra vez!';
    } else {
        resultado.textContent = `¡Felicidades! Adivinaste el número ${numeroAleatorio}.`;
    }
}
