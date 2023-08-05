console.log('welcome to gameplay')
// Global funcitons
const randomDie = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// console.log(randomDie(1,6))

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
    constructor(spaceType, spaceNum, ownable) {
        this.spaceType = spaceType;
        this.ownable = ownable;
        this.spaceNum = spaceNum;
        

    }
}
// create test GameSpace
// const gameSpaceTest = new GameSpace('property', true, 1)
// console.log(gameSpaceTest)

// extention for GameSpace -- Property
class Property extends GameSpace {
    constructor(spaceNum, groupColor, cost, rent, rentAll, spaceType, numInGroup, ownable) {
        super(spaceType, spaceNum, ownable)
        this.groupColor = groupColor;
        this.cost = cost;
        this.rent = rent;
        this.rentAll = Math.ceil(this.rent * 1.25);
        this.spaceType = 'Property'
        this.numInGroup = 2;
        this.ownable = true;
    }
}
// create test property
const salinas = new Property(1, 'blue', 35, 15)
console.log(salinas)

// Dice class
class Dice {
    constructor(number) {
        this.number = randomDie(1, 6) // standard 6 sided die
    }
}
// create die
const Dice1 = new Dice()
console.log(Dice1)