let req = {}
req.body = {
    you: '3155b802-5706-448f-b166-e2b6d08a1353',
    width: 10,
    turn: 0,
    snakes: [{
            taunt: '447c2e58-293a-4b6e-bbe6-816703743c21 (10x10)',
            name: 'battlesnake-python',
            id: 'fb9eb22a-85da-486f-885f-5b5584325aaa',
            health_points: 100,
            coords: [
                [9, 6],
                [9, 6],
                [9, 6]
            ]
        },
        {
            taunt: '447c2e58-293a-4b6e-bbe6-816703743c21 (10x10)',
            name: 'battlesnake-python',
            id: '61bd3749-9c7d-427f-a0d0-71fea86068db',
            health_points: 100,
            coords: [
                [8, 3],
                [8, 3],
                [8, 3]
            ]
        },
        {
            taunt: 'Try me bitch!',
            name: 'Awesome Snake',
            id: '3155b802-5706-448f-b166-e2b6d08a1353',
            health_points: 100,
            coords: [
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4],
                [0, 5]
            ]
        }
    ],
    height: 10,
    game_id: '447c2e58-293a-4b6e-bbe6-816703743c21',
    food: [
        [2, 2],
        [1, 0],
        [8, 0],
        [9, 0],
        [1, 4]
    ],
    dead_snakes: []
};

const width = req.body.width;
const height = req.body.height;
const defaultBoardValue = 0;

// Create gameboard
let gameboard = [];

for (let widthIndex = 0; widthIndex < width; widthIndex++) {
    let row = [];
    for (let heightIndex = 0; heightIndex < height; heightIndex++) {
        row[heightIndex] = 0;
    }
    gameboard[widthIndex] = row;
}

// Set snakes
gameboard = req.body.snakes.reduce((currGameboard, currentSnake) => {
    currentSnake.coords.forEach((point) => {
        currGameboard[point[1]][point[0]] = 1;
    })
    return currGameboard;
}, gameboard);

// Set food
gameboard = req.body.food.reduce((currGameboard, point) => {
    currGameboard[point[1]][point[0]] = 100;
    return currGameboard;
}, gameboard);

console.log(gameboard);