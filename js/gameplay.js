console.log('welcome to gameplay')

// *************************** GLOBAL FUNCITONS AND VARIABLES ****************************

// random number for die roll with min/max values set
const randomDie = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// console.log(randomDie(1,6))

// Gameboard size
const gameboardSize = 24

// define empty array to house all spaces for spaceGen()
let spaces = []
let j = 0
let k = 0
let l = 0
// console.log(spaces)
// For loop to create all space names
const spaceGen = (numSpaces) => {
    for (let i = 0; i < numSpaces; i++) {
        // check if i equals the corner space # by splitting the numSpaces into 4
        if (i === 0 || i === numSpaces * 0.25 || i === numSpaces * 0.5 || i === numSpaces * 0.75) {
            // create instance of corner using j index and i for space number
            spaces[i] = new Corner(corners[j].name, i)
            j++ // add 1 to j to itterate to next element in array
        // check if i equals the middle spaces by checking 8ths (1/8, 3/8, 5/8, 7/8)
        } else if (i === numSpaces * 0.125 || i === numSpaces * 0.375 || i === numSpaces * 0.625 || i === numSpaces * 0.875) {
            // create instance of railroad using k index and i for space number
            spaces[i] = new Railroad(railroads[k].name, i)
            k++ // add 1 to k to itterate to next element in array
        } else {
            // all other spaces use the properties array.
            // create instance of property using l index and i for space number
            spaces[i] = new Property(properties[l].name, i, properties[l].groupColor, properties[l].cost, properties[l].rent)
            l++ // add 1 to l to itterate to next element in array
        }
    }
}

// check if space can be invested in -- to be used with buying and renting spaces
let investTypes = ['Property', 'Railroad']

const investSpace = (spaceNum) => {
    // check if space type is property or railroad and that space is not currently owned -- user can invest if both are true
    if ((investTypes.includes(spaces[spaceNum].spaceType) && (spaces[spaceNum].owned === false))) {
        // console.log(spaces[spaceNum].spaceType)
        return true
    } else {
        return false
    }
}

// transaction function to use if property is bought or rent is exhanged
let houseAccount = {
    bank: ''
}

const transaction = (to, from, spaceNum, type) => {
    from.bank -= spaces[spaceNum][type]
    console.log(spaces[spaceNum][type])
    to.bank += spaces[spaceNum][type]
}

// ask user if they want to buy space funtion
const buySpace = (spaceNum, player) => {
    // check if user can invest in space
    if (investSpace(spaceNum) === true) {
        console.log('user can invest')
        let buyResponse = prompt(`Would you like to buy ${spaces[spaceNum].name} for $${spaces[spaceNum].cost}?`)
        console.log(buyResponse.toLowerCase())
        if (buyResponse.toLowerCase() === 'yes') {
            // change space owned to true
            spaces[spaceNum].owned = true
            // change space ownedBy to player who bought
            spaces[spaceNum].ownedBy = player.name
            // push space name to players ownedSpaces array
            player.ownedSpaces.push(spaces[spaceNum].name)
        }
    } else {
        console.log('user cannot invest')
        // need to end turn
    }

}

// charge rent when landing on owned property


// ************************************* CLASSES ****************************************

// Player class
class Player {
    constructor(name, gamePiece, bank, ownedSpaces, currentSpace) {
        this.name = name;
        this.gamePiece = gamePiece;
        this.bank = 1500;
        this.ownedSpaces = [];
        this.currentSpace = 0;
    }
}
// create test players
const playerTest1 = new Player('Sam', 'tophat')
// console.log(playerTest)
const playerTest2 = new Player('Sused', 'shoe')

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
    constructor(name, spaceNum, groupColor, cost, rent, rentAll, spaceType, numInGroup, owned, ownedBy) {
        super(name, spaceNum)
        this.groupColor = groupColor;
        this.cost = cost;
        this.rent = rent;
        this.rentAll = Math.ceil(this.rent * 1.25);
        this.spaceType = 'Property';
        this.numInGroup = 2;
        this.owned = false;
        this.ownedBy = '';
    }
}
// create test property
// const salinas = new Property('salinas', 1, 'blue', 35, 15)
// console.log(salinas)

// extension for GameSpace -- Railroad
class Railroad extends GameSpace {
    constructor(name, spaceNum, groupColor, cost, rent1, rent2, rent3, rent4, spaceType, numInGroup, owned, ownedBy) {
        super(name, spaceNum)
        this.name = name;
        this.groupColor = 'white';
        this.cost = 100;
        this.rent1 = 20;
        this.rent2 = 40;
        this.rent3 = 80;
        this.rent4 = 160;
        this.spaceType = 'Railroad';
        this.numInGroup = 4;
        this.owned = false;
        this.ownedBy = '';
    }
}
// create test railroad
// const marina = new Railroad('Marina', 3)
// console.log(marina)

// extension for GameSpace -- Corner
class Corner extends GameSpace {
    constructor(name, spaceNum, spaceType, ownable) {
        super(name, spaceNum)
        this.spaceType = 'Corner';
        this.ownable = false;
    }
}
// create test corner
// const go = new Corner('Go', 0)
// console.log(go)

// Dice class
class Dice {
    constructor(number) {
        this.number = randomDie(1, 6) // standard 6 sided die
    }
    // method to roll die when clicked. This will be used by each player to dictate how many spaces to move.
    rollDie(player) {
        console.log(`${player.name} has rolled the die.`)
        this.number = randomDie(1, 6)
        // if statement to check if die result + current space is greater than gameboardSize
        if ((player.currentSpace + this.number) > (gameboardSize - 1)) { // (-1) is to convert to index number starting at 0
            player.currentSpace = (player.currentSpace += this.number) - gameboardSize
        } else {
        // Add result of die roll to the space # for player
        player.currentSpace += this.number
        }
        console.log(`${player.name} has moved ${this.number} spaces, landing on space # ${player.currentSpace}.`)
    }
}
// create die
const dice1 = new Dice()
// console.log(`Initial die value: ${dice1.number}`)
// dice1.rollDie(playerTest)
// console.log(`Die value after roll: ${dice1.number}`)
// console.log(playerTest)

// Arrays with objects for various GameSpace types -- to be used during for loop to create spaces
// Properties
const properties = [
    {
        name: 'Evans Ave.',
        groupColor: 'indigo', 
        cost: 50,
        rent: 10,
    },
    {
        name: 'Downing St.',
        groupColor: 'indigo', 
        cost: 60,
        rent: 15,
    },
    {
        name: 'Hill Way',
        groupColor: 'lightblue', 
        cost: 80,
        rent: 30,
    },
    {
        name: 'Jackson Ave.',
        groupColor: 'lightblue', 
        cost: 100,
        rent: 35,
    },
    {
        name: 'Pajaro St.',
        groupColor: 'maroon', 
        cost: 120,
        rent: 50,
    },
    {
        name: 'Blanco Rd.',
        groupColor: 'maroon', 
        cost: 140,
        rent: 60,
    },
    {
        name: 'Kentucky Ave.',
        groupColor: 'orange', 
        cost: 180,
        rent: 80,
    },
    {
        name: 'Broadway',
        groupColor: 'orange', 
        cost: 200,
        rent: 90,
    },
    {
        name: 'Main St.',
        groupColor: 'red', 
        cost: 220,
        rent: 120,
    },
    {
        name: 'Gigling Way',
        groupColor: 'red', 
        cost: 240,
        rent: 135,
    },
    {
        name: 'Flatlands Ave.',
        groupColor: 'yellow', 
        cost: 260,
        rent: 160,
    },
    {
        name: 'Atlantic Ave.',
        groupColor: 'yellow', 
        cost: 280,
        rent: 175,
    },
    {
        name: 'Reynolds Ave.',
        groupColor: 'green', 
        cost: 320,
        rent: 200,
    },
    {
        name: 'Columbia Rd.',
        groupColor: 'green', 
        cost: 350,
        rent: 230,
    },
    {
        name: '17 Mile Drive',
        groupColor: 'navy', 
        cost: 390,
        rent: 250,
    },
    {
        name: 'Lombard Street',
        groupColor: 'navy', 
        cost: 400,
        rent: 250,
    }
]

// Railroads
const railroads = [
    {
        name: 'Union Station'
    },
    {
        name: 'Grand Central Station'
    },
    {
        name: 'South Station'
    },
    {
        name: 'King Street Station'
    }
]

// Corners
const corners = [
    {
        name: 'Go'
    },
    {
        name: 'Jail'
    },
    {
        name: 'Free Parking'
    },
    {
        name: 'Go To Jail!'
    }
]

// Generate gameboard with 24 spaces
spaceGen(gameboardSize)
console.log(spaces)
// console.log(spaces[1].spaceType)

// investSpace(2)
let testNum = 5

// spaces[testNum].owned = 'true'
buySpace(testNum, playerTest1)

console.log(spaces[testNum])
console.log(playerTest1)

// transaction(houseAccount, playerTest1, testNum, 'cost')
// console.log(houseAccount)
// console.log(playerTest1)

transaction(playerTest2, playerTest1, testNum, 'rent')
console.log(playerTest1)
console.log(playerTest2)

// *********************************** GAME OBJECT **************************************
