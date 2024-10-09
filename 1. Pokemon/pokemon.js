const move = require('./move');

class Pokemon {
    constructor(nombre, tipo, HPactual, HPmaximo, ataque, defensa, moves) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.HPactual = HPactual;
        this.HPmaximo = HPmaximo;
        this.ataque = ataque;
        this.defensa = defensa;
        this.moves = moves; // Asegúrate de que esta propiedad sea plural (moves)
        this.puedeCurarse = true; // Puede curarse una vez por combate
    }

    atacar(moveIndex, oponente) {
        const move = this.moves[moveIndex]; // Usar this.moves en lugar de this.move

        // Comprobar que el movimiento existe
        if (!move) {
            console.log("Movimiento no válido.");
            return;
        }

        // Cálculo del daño usando la fórmula proporcionada
        const randomFactor = 0.85 + Math.random() * 0.15; // Factor aleatorio entre 0.85 y 1.0
        const damage = Math.max(1, (this.ataque / oponente.defensa) * move.baseDamage * randomFactor);

    

        // Aplicar daño
        oponente.HPactual = Math.max(oponente.HPactual - damage, 0);
        console.log(`${this.nombre} usó ${move.nombre} y causó ${Math.round(damage)} puntos de daño a ${oponente.nombre}.`);

        if (oponente.HPactual <= 0) {
            console.log(`${oponente.nombre} ha sido derrotado.`);
        } else {
            console.log(`${oponente.nombre} tiene ${oponente.HPactual}/${oponente.HPmaximo} HP restante.`);
        }
    }

    curarse() {
        if (this.puedeCurarse) {
            const cantidadCuracion = Math.min(Math.floor(this.HPmaximo * 0.5), this.HPmaximo - this.HPactual);
            this.HPactual += cantidadCuracion;
            this.puedeCurarse = false;
            console.log(`${this.nombre} se ha curado ${cantidadCuracion} puntos de HP. Ahora tiene ${this.HPactual}/${this.HPmaximo} HP.`);
        } else {
            console.log(`${this.nombre} ya no puede curarse en este combate.`);
        }
    }
}

module.exports = Pokemon;
