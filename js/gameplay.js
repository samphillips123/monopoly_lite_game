console.log('welcome to gameplay')

window.onload = (e) => {

// *************************** GLOBAL FUNCITONS AND VARIABLES ****************************

// random number for die roll with min/max values set
const randomDie = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// console.log(randomDie(1,6))

// Gameboard size
const gameboardSize = 24

// next space variable for DOM
let nextSpace = ''

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
const investSpace = (spaceNum) => {
    // check if space type is property or railroad and that space is not currently owned -- user can invest if both are true
    if ((investTypes.includes(spaces[spaceNum].spaceType) && (spaces[spaceNum].owned === false))) {
        // console.log(spaces[spaceNum].spaceType)
        return true
    } else {
        return false
    }
}

// houseAccount for when buying spaces.
let houseAccount = {
    bank: ''
}

// check if user has enough money
const enoughMoney = (player, amount) => {
    if ((player.bank - amount) >= 0) {
        return true
    } else {
        return false
    }
}

// transaction function to use if property is bought or rent is exhanged
const transaction = (to, from, spaceNum, type) => {
    from.bank -= spaces[spaceNum][type]
    // console.log(spaces[spaceNum][type])
    to.bank += spaces[spaceNum][type]
}

// ask user if they want to buy space funtion
const buySpace = (spaceNum, player) => {
    // check if user can invest in space and they have enough money
    if ((investSpace(spaceNum) === true) && (enoughMoney(player, spaces[spaceNum].cost) === true)) {
        // console.log('user can invest')
        let buyResponse = prompt(`${player.name}, would you like to buy ${spaces[spaceNum].name} for $${spaces[spaceNum].cost}?`)
        // console.log(buyResponse.toLowerCase())
        if (buyResponse.toLowerCase() === 'yes') {
            // initiate transaction
            transaction(houseAccount, player, spaceNum, 'cost')
            // change space owned to true
            spaces[spaceNum].owned = true
            // change space ownedBy to player who bought
            spaces[spaceNum].ownedBy = player
            // push space name to players ownedSpaces array
            player.ownedSpaces.push(spaces[spaceNum].name)
        }
    } else {
        console.log(`${player.name} cannot invest`)
        // need to end turn
    }
}

// charge rent when landing on owned property
const chargeRent = (spaceNum, player) => {
    // check if user cannot invest in space and space is owned by other player
    if ((investSpace(spaceNum) === false) && (spaces[spaceNum].owned === true) && (spaces[spaceNum].ownedBy.name != player.name)) {
        console.log(`${player.name} owes rent`)
        // check if player has enough money to pay rent
        if (enoughMoney(player, spaces[spaceNum].rent) === true) {
            // initialize owner as the user who owns the space
            let owner = spaces[spaceNum].ownedBy
            // call transaction() with owner of space and rent amount
            transaction(owner, player, spaceNum, 'rent')
        } else {
        console.log(`${player.name} cannot afford rent`)
        // initiate GAME OVER
        }
    }
}

// go to jail function
const goToJail = (player) => {
    // jail is the 1st corner that's why it's the size / 4
    player.currentSpace = spaces[gameboardSize / 4].spaceNum
    // change player.inJail to true
    player.inJail = true
    console.log(`${player.name} was sent to ${spaces[gameboardSize / 4].name}`)
}

// pass go get allowance
let allowance = 100

const passGo = (player) => {
    player.bank += allowance
    console.log(`${player.name} passed go and collected ${allowance}.`)
}

// space action -- buy, rent, stay, jail, go....
let spaceStatus = ''
let investTypes = ['Property', 'Railroad']

const spaceAction = (spaceNum, player) => {
    if ((spaces[spaceNum].spaceType === 'Corner') && (spaces[spaceNum].name === 'Go To Jail!')) {
        spaceStatus = 'to jail'
        console.log(spaceStatus)
        // call goToJail()
        goToJail(player)
        // console.log(player)
    }  else if ((spaces[spaceNum].spaceType === 'Corner') && (spaces[spaceNum].name === 'Jail') && (player.inJail === true)) {
        spaceStatus = 'in jail'
        console.log(spaceStatus)
    }  else if ((spaces[spaceNum].spaceType === 'Corner') && (spaces[spaceNum].name === 'Jail') && (player.inJail === false)) {
        spaceStatus = 'visit jail'
        console.log(spaceStatus)
    } else if ((spaces[spaceNum].spaceType === 'Corner') && (spaces[spaceNum].name === 'Go')) {
            spaceStatus = 'go'
            console.log(spaceStatus)
            // // call passGo()
            // passGo(player)
            // console.log(player)
    } else if (investTypes.includes(spaces[spaceNum].spaceType) && (spaces[spaceNum].owned === false)) {
        spaceStatus = 'buy'
        console.log(spaceStatus)
        // call buySpace()
        buySpace(spaceNum, player)
        // console.log(player)
    } else if (investTypes.includes(spaces[spaceNum].spaceType) && (spaces[spaceNum].owned === true)) {
        spaceStatus = 'rent'
        console.log(spaceStatus)
        // call chargeRent()
        chargeRent(spaceNum, player)
        // console.log(player)
    } else {
        spaceStatus = 'rest'
        console.log(spaceStatus)
    }
}



// ************************************* CLASSES ****************************************

// Player class
class Player {
    constructor(name, gamePiece, bank, ownedSpaces, currentSpace, inJail) {
        this.name = name;
        this.gamePiece = gamePiece;
        this.bank = 1500;
        this.ownedSpaces = [];
        this.currentSpace = 0;
        this.inJail = false;
    }
}
// create players
const player1 = new Player('Player-1', 'shoe')
// console.log(playerTest)
const player2 = new Player('Player-2', 'tophat')

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
        this.rent = 20;
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
            // player.currentSpace = (player.currentSpace += this.number) - gameboardSize
            nextSpace = (player.currentSpace += this.number) - gameboardSize
            // DOM to move gamepiece on html
            let currentPlayerPiece = document.querySelector(`#${player.name}`)
            let movePieceTo = document.querySelector(`#space${nextSpace}`)
            movePieceTo.appendChild(currentPlayerPiece)

            player.currentSpace = nextSpace
            // player has passed go and collects allowance
            passGo(player)
        } else {
        // Add result of die roll to the space # for player
        // player.currentSpace += this.number
            nextSpace = player.currentSpace + this.number
            player.currentSpace = nextSpace
            // DOM to move gamepiece on html
            let currentPlayerPiece = document.querySelector(`#${player.name}`)
            let movePieceTo = document.querySelector(`#space${nextSpace}`)
            movePieceTo.appendChild(currentPlayerPiece)
        }
        console.log(`${player.name} has moved ${this.number} spaces, landing on space # ${player.currentSpace}.`)
        // call spaceAction()
        spaceAction(player.currentSpace, player)
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
        groupColor: 'lightskyblue', 
        cost: 80,
        rent: 30,
    },
    {
        name: 'Jackson Ave.',
        groupColor: 'lightskyblue', 
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
        groupColor: 'gold', 
        cost: 260,
        rent: 160,
    },
    {
        name: 'Atlantic Ave.',
        groupColor: 'gold', 
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
        name: 'Lombard St.',
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
// let testNum = 5

// spaces[testNum].owned = 'true'
// buySpace(testNum, player2)

// console.log(spaces[testNum])
// console.log(player1)

// transaction(houseAccount, player1, testNum, 'cost')
// console.log(houseAccount)
// console.log(player1)

// transaction(player2, player1, testNum, 'rent')
// console.log(player1)
// console.log(player2)

// console.log(enoughMoney(player1, 13))

// chargeRent(testNum, player2)
// console.log(player1.bank)
// console.log(player2)

// spaceAction(testNum, player1)

// goToJail(player1)
// passGo(player2)
// console.log(player2)

// dice1.rollDie(player1)

// console.log(spaces[testNum])
// console.log(player1)
// console.log(player2)

// dice1.rollDie(player2)

// console.log(player1)
// console.log(player2)

// console.log(currentPlayer)
// otherPlayer(currentPlayer)


// *********************************** GAME OBJECT **************************************


// store currentPlayer -- Start with player1
let currentPlayer = player1

// switch between players
const otherPlayer = (player) => {
    if (player === player1) {
        currentPlayer = player2
    } else if (player === player2) {
        currentPlayer = player1
    }
}

// Utilize while loop for gameplay -- Check that user has money, and that they aren't in jail -- this will allow them to play
const gamePlay = () => {
    console.log('game has started')
    while (currentPlayer.bank >= 0) {
        if (currentPlayer.inJail === true) {
            console.log(`${currentPlayer.name} is in jail. Turn skipped.`)
            // swith .inJail back to false so they can play next turn
            currentPlayer.inJail = false
            // if player is in jail, they are skipped for 1 turn
            otherPlayer(currentPlayer)
        } else {
                dice1.rollDie(currentPlayer)
                // after turn is over, swith currentPlayer
                otherPlayer(currentPlayer)
        }
}
    console.log(`GAME OVER`)

}

// function to run a game round
const gameRound = () => {
    // check if player has enough money to continue
    if (currentPlayer.bank < 0) {
        alert(`${currentPlayer.name} does not have enough money to keep playing.`)
        // need to set up GAME OVER page
    } else if (currentPlayer.inJail === true) { // check if player is currently in jail
        alert(`${currentPlayer.name} is in jail. Turn skipped.`)
        // swith .inJail back to false so they can play next turn
        currentPlayer.inJail = false
        // if player is in jail, they are skipped for 1 turn
        otherPlayer(currentPlayer)
    } else { // roll the die
        alert(`${currentPlayer.name} is about to the roll die`)
        dice1.rollDie(currentPlayer)
        // after turn is over, swith currentPlayer
        otherPlayer(currentPlayer)
    }
}


// event listener for click on die to initiate a game round.
document.querySelector('#die-img').addEventListener('click', (e) => {
    e.preventDefault()
    gameRound()
})

    // document.querySelector('#start-button').addEventListener('onClick', (e) => {
    //     e.preventDefault()
    //     location.replace('html/gameplay.html')
    //     console.log('sent to gameplay')
    //     gamePlay() 
    // })


    // document.querySelector('#die-img').addEventListener('click', (e) => {
    //     e.preventDefault()
    //     // console.log('sent to gameplay')
    //     gamePlay() 
    // })

// gamePlay()



}