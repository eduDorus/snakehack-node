const express = require('express')
const router = express.Router()
const pathfinding = require("node-pathfinding");
const UINT32 = require('cuint').UINT32


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

  console.log(JSON.stringify(req.body, null, 2));
  const width = req.body.width;
  const height = req.body.height;
  const food = req.body.food;

  // Create Gameboard
  let gameboard = createEmptyGameBoard(width, height, 0);
  gameboard = setSnakesOnGameboard(gameboard, req.body.snakes);
  //gameboard = setFoodOnGameboard(gameboard, req.body.food);

  // Get snake hack
  const head = getSnakeHead(req.body.you, req.body.snakes);
  const headX = head[0]
  const headY = head[1]


  // Path finding
  buf = pathfinding.bytesFrom2DArray(width, height, gameboard);
  grid = pathfinding.buildGrid(width, height, buf);

  // Food search
  const pathArray = food.map(foodCords => {
    return pathfinding.findPath(headX, headY, foodCords[0], foodCords[1], grid);
  })

  let bestLength = 100;
  const path = pathArray.reduce((bestPath, pathElement) => {
    if (pathElement.length < bestLength) {
      bestPath = pathElement;
      bestLength = pathElement.length;
    }
    return bestPath
  });

  // Convert to int
  const predictX = UINT32(path[1])._high
  const predictY = UINT32(path[1])._low

  //console.log(headX, headY, predictX, predictY);
  console.log("path on grid :" + (grid.toString(1 << 16 | 0, 1 << 16 | 4, path)));
  //console.log(gameboard);

  // Response data
  var data = {
    move: nextMove(headX, headY, predictX, predictY), // one of: ['up','down','left','right']
    taunt: 'Outta my way, schnääääägaaaa!', // optional, but encouraged!
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

const getSnakeHead = (id, snakes) => {
  const mySnake = snakes.filter(snake => snake.id == id)[0]
  return mySnake.coords[0]
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

const nextMove = (headX, headY, predictX, predictY) => {
  console.log(headX, headY, predictX, predictY);
  let move = "";
  if (predictY < headY) {
    move = "up"
  }
  if (predictY > headY) {
    move = "down"
  }
  if (predictX < headX) {
    move = "left"
  }
  if (predictX > headX) {
    move = "right"
  }
  return move
}

module.exports = router