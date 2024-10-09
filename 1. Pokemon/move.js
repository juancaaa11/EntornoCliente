

class Move {
    constructor(nombre, baseDamage) {
        this.nombre = nombre;
        this.baseDamage = baseDamage; // Cambié 'danoB' a 'baseDamage' para que coincida con el uso en la clase pokemon
    }
}

module.exports = Move;
