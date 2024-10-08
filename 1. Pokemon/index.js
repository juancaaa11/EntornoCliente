const readline = require('readline-sync');

// Clases importadas
const pokemon = require('./pokemon');
const move = require('./move');

// Definiendo algunos movimientos con su daño base
const impactrueno = new move("Impactrueno", 40);
const placaje = new move("Placaje", 40);
const llamarada = new move("Llamarada", 90);
const ascuas = new move("Ascuas", 40);
const latigazo = new move("Latigazo", 45);
const polvoVeneno = new move("Polvo Veneno", 0);
const pistolaAgua = new move("Pistola Agua", 40);
const burbuja = new move("Burbuja", 40);
const canto = new move("Canto", 0);
const dobleBofetón = new move("Doble Bofetón", 15);
const bolaSombra = new move("Bola Sombra", 80);
const hipnosis = new move("Hipnosis", 0);

// Lista de Pokemones
const pokemonList = [
    new pokemon("Pikachu", "Eléctrico", 110, 110, 55, 40, [impactrueno, placaje]),
    new pokemon("Charmander", "Fuego", 120, 120, 52, 43, [llamarada, ascuas]),
    new pokemon("Bulbasaur", "Planta/Veneno", 128, 128, 49, 49, [latigazo, polvoVeneno]),
    new pokemon("Squirtle", "Agua", 118, 118, 48, 65, [pistolaAgua, burbuja]),
    new pokemon("Jigglypuff", "Normal/Hada", 160, 160, 45, 20, [canto, dobleBofetón]),
    new pokemon("Gengar", "Fantasma/Veneno", 120, 120, 65, 60, [bolaSombra, hipnosis]),
    new pokemon("Eevee", "Normal", 135, 135, 55, 50, [placaje, dobleBofetón])
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

        console.log("\n1. Atacar - 2. Curarse - 3. Huir");
        const accion = readline.question("Ingresa una acción: ");

        switch (parseInt(accion)) {
            case 1:
                // Elegir ataque
                console.log("\nElige un movimiento:");
                jugadorPokemon.move.forEach((move, index) => {
                    console.log(`${index + 1}: ${move.nombre}`);
                });
                const moveIndex = readline.question("Selecciona el movimiento: ") - 1;
                jugadorPokemon.atacar(moveIndex, oponentePokemon);
                break;
            case 2:
                jugadorPokemon.curarse();
                break;
            case 3:
                console.log("Has huido del combate.");
                return;
            default:
                console.log("Opción no válida.");
        }

        // Turno de la IA
        if (oponentePokemon.HPactual > 0) {
            const randomMoveIndex = Math.floor(Math.random() * oponentePokemon.move.length);
            oponentePokemon.atacar(randomMoveIndex, jugadorPokemon);
        }
    }

    if (jugadorPokemon.HPactual <= 0) {
        console.log(`Has sido derrotado por ${oponentePokemon.nombre}.`);
    } else if (oponentePokemon.HPactual <= 0) {
        console.log(`¡Has derrotado a ${oponentePokemon.nombre}!`);
    }
}

// Iniciar el programa
mostrarMenu();
