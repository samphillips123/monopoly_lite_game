console.log('welcome to gameplay')

// Set up objects and classes for players, gamepieces, and board game spaces.
// Player class
class Player {
    constructor(name, gamePiece, bank, ownedProperties) {
        this.name = name;
        this.gamePiece = gamePiece;
        this.bank = 1000;
        this.ownedProperties = [];
    }

}

// create test player
const playerTest = new Player('Sam', 'tophat')
console.log(playerTest)