const move = require('./move');

class pokemon {
    constructor(nombre, tipo, HPactual, HPmaximo, ataque, defensa, move) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.HPactual = HPactual;
        this.HPmaximo = HPmaximo;
        this.ataque = ataque;
        this.defensa = defensa;
        this.move = move;
        this.puedeCurarse = true; // Puede curarse una vez por combate
    }

    atacar(moveIndex, oponente) {
        const move = this.move[moveIndex];
        const randomFactor = 0.85 + Math.random() * 0.15;
        const damage = Math.max(1, (this.ataque / oponente.defensa) * move.baseDamage * randomFactor);
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

module.exports = pokemon;
