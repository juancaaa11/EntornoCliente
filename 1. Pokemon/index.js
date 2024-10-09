const readline = require('readline-sync');

// Clases importadas
const Pokemon = require('./pokemon');
const Move = require('./move');

// Definiendo algunos movimientos con su daño base
const impactrueno = new Move("Impactrueno", 40);
const placaje = new Move("Placaje", 40);
const llamarada = new Move("Llamarada", 90);
const ascuas = new Move("Ascuas", 40);
const latigazo = new Move("Latigazo", 45);
const polvoVeneno = new Move("Polvo Veneno", 10); // Cambié el daño base a 10 para que tenga un efecto.
const pistolaAgua = new Move("Pistola Agua", 40);
const burbuja = new Move("Burbuja", 40);
const canto = new Move("Canto", 0); // Puedes cambiar esto para que tenga un daño base mayor.
const dobleBofetón = new Move("Doble Bofetón", 15);
const bolaSombra = new Move("Bola Sombra", 80);
const hipnosis = new Move("Hipnosis", 0); // Similar a "Canto", puedes aumentar el daño.


// Lista de Pokemones
const pokemonList = [
    new Pokemon("Pikachu", "Eléctrico", 110, 110, 55, 40, [impactrueno, placaje]),
    new Pokemon("Charmander", "Fuego", 120, 120, 52, 43, [llamarada, ascuas]),
    new Pokemon("Bulbasaur", "Planta/Veneno", 128, 128, 49, 49, [latigazo, polvoVeneno]),
    new Pokemon("Squirtle", "Agua", 118, 118, 48, 65, [pistolaAgua, burbuja]),
    new Pokemon("Jigglypuff", "Normal/Hada", 160, 160, 45, 20, [canto, dobleBofetón]),
    new Pokemon("Gengar", "Fantasma/Veneno", 120, 120, 65, 60, [bolaSombra, hipnosis]),
    new Pokemon("Eevee", "Normal", 135, 135, 55, 50, [placaje, dobleBofetón])
];

// Función para despedir programa
function salir() {
    console.log("Gracias por jugar. ¡Hasta luego!");
}

// Función menú principal
function mostrarMenu() {
    console.log("--------------------------------------");
    console.log("Bienvenido al Pokémon Game en consola");
    console.log("--------------------------------------");
    console.log("1. Iniciar Juego");
    console.log("2. Salir");
    console.log("--------------------------------------");
    
    const opcion = readline.question("Ingresa una opción: ");
    switch (opcion) {
        case '1':
            iniciarJuego();
            break;
        case '2':
            salir();
            break;
        default:
            console.log("Opción no válida.");
            mostrarMenu();
    }
}

// Función para elegir Pokémon aleatorio
function elegirPokemonAleatorio() {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    return pokemonList[randomIndex];
}

// Función para iniciar el juego
function iniciarJuego() {
    const jugadorPokemon = elegirPokemonAleatorio();
    const oponentePokemon = elegirPokemonAleatorio();

    console.log(`Tu Pokémon: ${jugadorPokemon.nombre}`);
    console.log(`Pokémon Oponente: ${oponentePokemon.nombre}`);

    while (jugadorPokemon.HPactual > 0 && oponentePokemon.HPactual > 0) {
        console.log("\n--- Estado Actual ---");
        console.log(`${jugadorPokemon.nombre} tiene ${jugadorPokemon.HPactual}/${jugadorPokemon.HPmaximo} HP.`);
        console.log(`${oponentePokemon.nombre} tiene ${oponentePokemon.HPactual}/${oponentePokemon.HPmaximo} HP.`);

        console.log("\n1. Atacar - 2. Curarse");
        const accion = readline.question("Ingresa una acción: ");

        switch (parseInt(accion)) {
            case 1:
                // Elegir ataque
                console.log("\nElige un movimiento:");
                jugadorPokemon.moves.forEach((move, index) => {
                    console.log(`${index + 1}: ${move.nombre}`);
                });
                const moveIndex = readline.question("Selecciona el movimiento: ") - 1;
                
                if (moveIndex >= 0 && moveIndex < jugadorPokemon.moves.length) {
                    jugadorPokemon.atacar(moveIndex, oponentePokemon);
                } else {
                    console.log("Movimiento no válido.");
                }
                break;
            case 2:
                jugadorPokemon.curarse();
                break;
            default:
                console.log("Opción no válida.");
        }

        // Verificar si el oponente ha sido derrotado antes de que actúe
        if (oponentePokemon.HPactual > 0) {
            const randomMoveIndex = Math.floor(Math.random() * oponentePokemon.moves.length);
            oponentePokemon.atacar(randomMoveIndex, jugadorPokemon);
        }

        // Verificar si el jugador ha sido derrotado
        if (jugadorPokemon.HPactual <= 0) {
            console.log(`Has sido derrotado por ${oponentePokemon.nombre}.`);
            break;
        }

        // Verificar si el oponente ha sido derrotado
        if (oponentePokemon.HPactual <= 0) {
            console.log(`¡Has derrotado a ${oponentePokemon.nombre}!`);
            break;
        }
    }
}

// Iniciar el programa
mostrarMenu();
