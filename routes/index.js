var express = require('express')
var router = express.Router()


// Handle POST request to '/start'
router.post('/start', function (req, res) {
    // NOTE: Do something here to start the game

    // Response data
    var data = {
        color: "#DFFF00",
        name: "Awesome Snake",
        head_type: "sand-worm",
        tail_type: "freckled",
        head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
        taunt: "Try me bitch!", // optional, but encouraged!
    }

    return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {

    const actionSet = ['up', 'down', 'left', 'right'];

    // Create Gameboard
    let gameboard = createEmptyGameBoard(req.body.width, req.body.height, 0);
    gameboard = setSnakesOnGameboard(gameboard, req.body.snakes);
    gameboard = setFoodOnGameboard(gameboard, req.body.food);

    console.log(gameboard);

    // Response data
    var data = {
        move: 'up', // one of: ['up','down','left','right']
        taunt: 'Outta my way, snake!', // optional, but encouraged!
    }

    return res.json(data)
})

const createEmptyGameBoard = (width, height, initValue) => {
    let gameboard = [];
    for (let widthIndex = 0; widthIndex < width; widthIndex++) {
        let row = [];
        for (let heightIndex = 0; heightIndex < height; heightIndex++) {
            row[heightIndex] = initValue;
        }
        gameboard[widthIndex] = row;
    }
    return gameboard;
}

const setSnakesOnGameboard = (gameboard, snakes) => {
    return snakes.reduce((currGameboard, currentSnake) => {
        currentSnake.coords.forEach((point) => {
            currGameboard[point[1]][point[0]] = 1;
        })
        return currGameboard;
    }, gameboard);
}

const setFoodOnGameboard = (gameboard, food) => {
    return food.reduce((currGameboard, point) => {
        currGameboard[point[1]][point[0]] = 100;
        return currGameboard;
    }, gameboard);
}

module.exports = router