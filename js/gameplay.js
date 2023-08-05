console.log('welcome to gameplay')
// Global funcitons
const randomDie = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

console.log(randomDie(1,6))

// Set up objects and classes for players, gamepieces, dice, and board game spaces.
// Player class
class Player {
    constructor(name, gamePiece, bank, ownedProperties, currentSpace) {
        this.name = name;
        this.gamePiece = gamePiece;
        this.bank = 1000;
        this.ownedProperties = [];
        this.currentSpace = 0;
    }

}

// create test player
const playerTest = new Player('Sam', 'tophat')
console.log(playerTest)

// GameSpace class
class GameSpace {
    constructor(spaceType, ownable, spaceNum) {
        this.spaceType = spaceType;
        this.type = ownable;
        this.spaceNum = spaceNum;
    }
}

// create test GameSpace
const gameSpaceTest = new GameSpace('property', true, 1)
console.log(gameSpaceTest)

// Dice class
class Dice {
    constructor(number) {
        this.number = randomDie(1, 6)
    }
}

// create die
const Dice1 = new Dice()
console.log(Dice1)