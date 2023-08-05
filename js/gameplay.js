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
    constructor(name, spaceNum) {
        this.name = name;
        this.spaceNum = spaceNum;
        

    }
}
// create test GameSpace
// const gameSpaceTest = new GameSpace('property', true, 1)
// console.log(gameSpaceTest)

// extension for GameSpace -- Property
class Property extends GameSpace {
    constructor(name, spaceNum, groupColor, cost, rent, rentAll, spaceType, numInGroup, ownable) {
        super(name, spaceNum)
        this.groupColor = groupColor;
        this.cost = cost;
        this.rent = rent;
        this.rentAll = Math.ceil(this.rent * 1.25);
        this.spaceType = 'Property';
        this.numInGroup = 2;
        this.ownable = true;
    }
}
// create test property
const salinas = new Property('salinas', 1, 'blue', 35, 15)
console.log(salinas)

// extension for GameSpace -- Railroad
class Railroad extends GameSpace {
    constructor(name, spaceNum, groupColor, cost, rent1, rent2, rent3, rent4, spaceType, numInGroup, ownable) {
        super(name, spaceNum)
        this.name = name + ' Railroad';
        this.groupColor = 'white';
        this.cost = 100;
        this.rent1 = 20;
        this.rent2 = 40;
        this.rent3 = 80;
        this.rent4 = 160;
        this.spaceType = 'Railroad';
        this.numInGroup = 4;
        this.ownable = true;
    }
}
// create test railroad
const marina = new Railroad('Marina', 3)
console.log(marina)

// extension for GameSpace -- Corner
class Corner extends GameSpace {
    constructor(name, spaceNum, spaceType, ownable) {
        super(name, spaceNum)
        this.spaceType = 'Corner';
        this.ownable = false;
    }
}
// create test corner
const go = new Corner('Go', 0)
console.log(go)

// Dice class
class Dice {
    constructor(number) {
        this.number = randomDie(1, 6) // standard 6 sided die
    }
}
// create die
const Dice1 = new Dice()
console.log(Dice1)