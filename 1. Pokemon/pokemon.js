const move=require('./move');

class pokemon {

    constructor(nombre,tipo,HPactual,HPmaximo,ataque,defensa,move){

        this.nombre = nombre;
        this.tipo = tipo;
        this.HPactual = HPactual;
        this.HPmaximo = HPmaximo;
        this.ataque = ataque;
        this.defensa = defensa;
        this.move = move;
        this.curacion = false;
    }


    /**
     * 
     */
    atacar(moveIndex, oponente) {
        const move = this.move[moveIndex];
        // Cálculo del daño usando la fórmula proporcionada
        const randomFactor = 0.85 + Math.random() * 0.15; // Random entre 0.85 y 1.0
        const damage = Math.max(0, (this.ataque / oponente.defensa) * move.danoB * randomFactor);
        oponente.HPactual = Math.max(oponente.HPactual - damage, 0);
        console.log(`${this.nombre} usa ${move.nombre} y causa ${Math.round(damage)} puntos de daño a ${oponente.nombre}`);
        
        if (oponente.HPactual <= 0) {
            console.log(`${oponente.nombre} ha sido derrotado.`);
        } else {
            console.log(`${oponente.nombre} tiene ${oponente.HPactual}/${oponente.HPmaximo} HP restante.`);
        }
    }

    /**
     * 
     */
    curar() {
        if (this.puedeCurarse) {
            const cantidadCuracion = Math.min(30, this.HPmaximo - this.HPactual); // Curar hasta un máximo de 30 HP
            this.HPactual += cantidadCuracion;
            this.puedeCurarse = false; // Restringir curación a una vez por combate
            console.log(`${this.nombre} se ha curado ${cantidadCuracion} HP. Ahora tiene ${this.HPactual}/${this.HPmaximo} HP.`);
        } else {
            console.log(`${this.nombre} Ya no puede curarse.`);
        }
    }
}

module.exports=pokemon;

