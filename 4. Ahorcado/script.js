// Palabra a adivinar
const palabra = 'JUEGO';
let palabraOculta = Array(palabra.length).fill('_');
let intentosRestantes = 6;
let letrasIncorrectas = [];

function actualizarPalabraOculta() {
    document.getElementById('palabraOculta').textContent = palabraOculta.join(' ');
}

function actualizarVidas() {
    document.getElementById('vidas').textContent = `Vidas restantes: ${intentosRestantes}`;
}

function adivinarLetra() {
    const letra = document.getElementById('letra').value.toUpperCase();
    const resultado = document.getElementById('resultado');

    if (letra === '' || letra.length !== 1) {
        resultado.textContent = 'Introduce una letra válida.';
        return;
    }

    if (palabra.includes(letra)) {
        // Actualizar palabra oculta con la letra acertada
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] === letra) {
                palabraOculta[i] = letra;
            }
        }
        resultado.textContent = `¡Bien hecho! La letra "${letra}" está en la palabra.`;
    } else {
        if (!letrasIncorrectas.includes(letra)) {
            letrasIncorrectas.push(letra);
            intentosRestantes--;
            resultado.textContent = `La letra "${letra}" no está en la palabra.`;
        } else {
            resultado.textContent = `Ya intentaste con la letra "${letra}". Intenta otra.`;
        }
    }

    actualizarPalabraOculta();
    actualizarVidas();

    if (intentosRestantes === 0) {
        resultado.textContent = '¡Has perdido! La palabra era ' + palabra;
        document.getElementById('letra').disabled = true;
    }

    if (!palabraOculta.includes('_')) {
        resultado.textContent = '¡Felicidades! Adivinaste la palabra.';
        document.getElementById('letra').disabled = true;
    }

    document.getElementById('letra').value = '';
}

actualizarPalabraOculta();
actualizarVidas();
