const { MY_SNAKE } = require('./util');

const EMPTY = '⬜️';

const HEAD = '🐍';
const BODY = '❌';
const TAIL = '⭕️';

const YOU_HEAD = '🐉';
const YOU_BODY = '🦴';
const YOU_TAIL = '💩';

const FOOD_CELL = '🌭';
const WALL_CELL = '🧱';
const HAZARD_CELL = '☢️';

const buildInitialGrid = (width, height) => {
  const grid = [];
  for (let x = 0; x < width; x += 1) {
    const row = [];
    for (let y = 0; y < height; y += 1) {
      // row.push(`(x:${x}, y:${y})`);
      row.push({ x, y, cell: EMPTY });
    }
    grid.push(row);
  }
  return grid;
};

const addSnake = (grid, snake) => {
  // console.log(JSON.parse(JSON.stringify(snake)));
  let head = HEAD;
  let body = BODY;
  let tail = TAIL;

  const snakeBody = snake.body;
  const snakeHead = snake.head;
  const snakeName = snake.name;
  const snakeLength = snake.length;
  if (snakeName === MY_SNAKE) {
    head = YOU_HEAD;
    body = YOU_BODY;
    tail = YOU_TAIL;
  }

  // draw the whole snake
  snakeBody.forEach((bodyPart, index) => {
    // if its the head draw it
    if (bodyPart.x === snakeHead.x && bodyPart.y === snakeHead.y) {
      // eslint-disable-next-line no-param-reassign
      grid[bodyPart.x][bodyPart.y].cell = head;
    } else if (index === snakeLength - 1) {
      // eslint-disable-next-line no-param-reassign
      grid[bodyPart.x][bodyPart.y].cell = tail;
    } else {
      // eslint-disable-next-line no-param-reassign
      grid[bodyPart.x][bodyPart.y].cell = body;
    }
  });

  // console.log(JSON.parse(JSON.stringify(grid)));
  return grid;
};

const gridViewer = (grid, height, width) => {
  let viewer = '';
  for (let y = height - 1; y >= 0; y -= 1) {
    for (let x = 0; x < width; x += 1) {
      viewer += grid[x][y].cell;
    }
    viewer += '\n';
  }
  console.log(JSON.parse(JSON.stringify(viewer)));
};

const visualize = (gameState) => {
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  const initialGrid = buildInitialGrid(boardWidth, boardHeight);
  // const gridWithMySnake = addSnake(initialGrid, gameState.you);
  // gridViewer(gridWithMySnake);
  gameState.board.snakes.forEach((snake) => {
    addSnake(initialGrid, snake);
  });

  gridViewer(initialGrid, boardHeight, boardWidth);
};

module.exports = { visualize };
