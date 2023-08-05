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
        this.bank = 1500;
        this.ownedProperties = [];
        this.currentSpace = 0;
    }
}
// create test player
// const playerTest = new Player('Sam', 'tophat')
// console.log(playerTest)

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
// const salinas = new Property('salinas', 1, 'blue', 35, 15)
// console.log(salinas)

// extension for GameSpace -- Railroad
class Railroad extends GameSpace {
    constructor(name, spaceNum, groupColor, cost, rent1, rent2, rent3, rent4, spaceType, numInGroup, ownable) {
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
        this.ownable = true;
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
}
// create die
// const Dice1 = new Dice()
// console.log(Dice1)

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

// define empty array to house all spaces
let spaces = []
let j = 0
let k = 0
let l = 0
console.log(spaces)
// For loop to create all space names
const spaceGen = (numSpaces) => {
    for (let i = 0; i < numSpaces; i++) {
        // check if i equals the corner space # by splitting the numSpaces into 4
        if (i === 0 || i === numSpaces * 0.25 || i === numSpaces * 0.5 || i === numSpaces * 0.75) {
            // loop through corners array with j but specifying spaceNum with i
            // console.log('i = ' + i)
            // for (let j = 0; j < corners.length; j++) {
            //     console.log('i = ' + i + 'j = ' + j)
            //     spaces[i] = new Corner(corners[j].name, i)
            // }
            // let j = 0
            spaces[i] = new Corner(corners[j].name, i)
            j++
        // check if i equals the middle spaces by checking 8ths (1/8, 3/8, 5/8, 7/8)
        } else if (i === numSpaces * 0.125 || i === numSpaces * 0.375 || i === numSpaces * 0.625 || i === numSpaces * 0.875) {
            // loop through railroads array with k but specifying spaceNum with i
            // for (let k = 0; k < railroads.length; k++) {
            //     spaces[i] = new Railroad(railroads[k].name, i)
            // }
            // let k = 0
            spaces[i] = new Railroad(railroads[k].name, i)
            k++
        } else {
            // all other spaces use the properties array.
            // for (let l = 0; l < properties.length; l++) {
            //     // loop through properties array with l but specifying spaceNum with i
            //     spaces[i] = new Property(properties[l].name, i, properties[l].groupColor, properties[l].cost, properties[l].rent)   
            // }
            // let l = 0 
            spaces[i] = new Property(properties[l].name, i, properties[l].groupColor, properties[l].cost, properties[l].rent)
                l++
        }
    }
}

spaceGen(24)
console.log(spaces)