//Librerias importadas
const readline = require('readline-sync');




// Clases importadas
const pokemon=require('./pokemon');
const move=require('./move');




// Definiendo algunos movimientos con su daño base
const impactrueno = new move("Impactrueno", 40);
const placaje = new move("Placaje", 40);
const llamarada = new move("Llamarada", 90);
const ascuas = new move("Ascuas", 40);
const latigazo = new move("Latigazo", 45);
const polvoVeneno = new move("Polvo Veneno", 0);  // No hace daño directo
const pistolaAgua = new move("Pistola Agua", 40);
const burbuja = new move("Burbuja", 40);
const canto = new move("Canto", 0);  // No hace daño, pero puede dormir
const dobleBofetón = new move("Doble Bofetón", 15);
const bolaSombra = new move("Bola Sombra", 80);
const hipnosis = new move("Hipnosis", 0);  

//Lista de Pokemones
const pokemonList = [
    new pokemon("Pikachu", "Eléctrico", 110, 110, 55, 40, [impactrueno, placaje]),
    new pokemon("Charmander", "Fuego", 120, 120, 52, 43, [llamarada, ascuas]),
    new pokemon("Bulbasaur", "Planta/Veneno", 128, 128, 49, 49, [latigazo, polvoVeneno]),
    new pokemon("Squirtle", "Agua", 118, 118, 48, 65, [pistolaAgua, burbuja]),
    new pokemon("Jigglypuff", "Normal/Hada", 160, 160, 45, 20, [canto, dobleBofetón]),
    new pokemon("Gengar", "Fantasma/Veneno", 120, 120, 65, 60, [bolaSombra, hipnosis]),
    new pokemon("Eevee", "Normal", 135, 135, 55, 50, [placaje, dobleBofetón])
];

//Funcion para despedir programa
function salir() {
    console.log("Gracias por jugar. ¡Hasta luego!, @juancaaa11");
}

//Funcion Menu principal
function mostrarMenu() {
    console.log("--------------------------------------")
    console.log("Bienvenido al Pokémon Game en consola");
    console.log("--------------------------------------")
    console.log("1. Iniciar Juego");
    console.log("2. Salir");
    console.log("--------------------------------------")
    
    const opcion = readline.question("Ingresa una opcion: ");
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

function elegirPokemonAleatorio() {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    return pokemonList[randomIndex];
}

function iniciarJuego() {
    const jugadorPokemon = elegirPokemonAleatorio();
    const oponentePokemon = elegirPokemonAleatorio();
    
    console.log(`Tu Pokémon: ${jugadorPokemon.nombre}`);
    console.log(`Pokémon Oponente: ${oponentePokemon.nombre}`);
    
    let turno = 1;

    const batalla = () => {
        console.log(`\n--- Turno ${turno} ---`);
        console.log(`${jugadorPokemon.nombre} tiene ${jugadorPokemon.HPactual}/${jugadorPokemon.HPmaximo} HP`);
        console.log(`${oponentePokemon.nombre} tiene ${oponentePokemon.HPactual}/${oponentePokemon.HPmaximo} HP`);

        rl.question("Elige una acción: 1 - Atacar, 2 - Curar: ", (accion) => {
            if (accion === '1') {
                rl.question("Elige un movimiento: 0 - " + jugadorPokemon.moves[0].nombre + ", 1 - " + jugadorPokemon.moves[1].nombre + ": ", (moveIndex) => {
                    jugadorPokemon.atacar(moveIndex, oponentePokemon);
                    if (oponentePokemon.HPactual > 0) {
                        // Acción del oponente aleatoria
                        const accionOponente = Math.random() < 0.5 ? 'atacar' : 'curar'; // 50% de probabilidad para cada acción
                        if (accionOponente === 'atacar') {
                            const moveIndexOponente = Math.floor(Math.random() * oponentePokemon.moves.length);
                            oponentePokemon.atacar(moveIndexOponente, jugadorPokemon);
                        } else {
                            oponentePokemon.curar();
                        }
                    }
                    if (jugadorPokemon.HPactual <= 0 || oponentePokemon.HPactual <= 0) {
                        if (jugadorPokemon.HPactual <= 0) {
                            console.log("¡Has sido derrotado!");
                        } else {
                            console.log("¡Has derrotado a tu oponente!");
                        }
                        rl.close(); // Cerrar la interfaz de readline al finalizar la batalla
                    } else {
                        turno++;
                        batalla(); // Continuar con el siguiente turno
                    }
                });
            } else if (accion === '2') {
                jugadorPokemon.curar();
                turno++;
                batalla(); // Continuar con el siguiente turno
            } else {
                console.log("Acción no válida. Turno perdido.");
                turno++;
                batalla(); // Continuar con el siguiente turno
            }
        });
    };
}





mostrarMenu();

