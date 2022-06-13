const { MY_SNAKE, VISUALIZE_TYPES, SAFETY_TYPES } = require('./util');

const buildInitialGrid = (width, height) => {
  const grid = [];
  for (let x = 0; x < width; x += 1) {
    const row = [];
    for (let y = 0; y < height; y += 1) {
      // row.push(`(x:${x}, y:${y})`);
      row.push({
        x, y, cell: VISUALIZE_TYPES.EMPTY, safe: SAFETY_TYPES.SAFE,
      });
    }
    grid.push(row);
  }
  return grid;
};

const addSnake = (grid, snake) => {
  // console.log(JSON.parse(JSON.stringify(snake)));
  let head = VISUALIZE_TYPES.HEAD;
  let body = VISUALIZE_TYPES.BODY;
  let tail = VISUALIZE_TYPES.TAIL;

  const snakeBody = snake.body;
  const snakeHead = snake.head;
  const snakeName = snake.name;
  const snakeLength = snake.length;
  if (snakeName === MY_SNAKE) {
    head = VISUALIZE_TYPES.YOU_HEAD;
    body = VISUALIZE_TYPES.YOU_BODY;
    tail = VISUALIZE_TYPES.YOU_TAIL;
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
    // eslint-disable-next-line no-param-reassign
    grid[bodyPart.x][bodyPart.y].safe = SAFETY_TYPES.UNSAFE;
  });

  // console.log(JSON.parse(JSON.stringify(grid)));
  return grid;
};

const addThing = (grid, thing, filler, isSafe) => {
  // eslint-disable-next-line no-param-reassign
  grid[thing.x][thing.y].cell = filler;

  // eslint-disable-next-line no-param-reassign
  grid[thing.x][thing.y].safe = isSafe;

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

const safeViewer = (grid, height, width) => {
  let viewer = '';
  for (let y = height - 1; y >= 0; y -= 1) {
    for (let x = 0; x < width; x += 1) {
      viewer += grid[x][y].safe;
    }
    viewer += '\n';
  }
  console.log(JSON.parse(JSON.stringify(viewer)));
};

const visualize = (gameState) => {
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  const grid = buildInitialGrid(boardWidth, boardHeight);
  gameState.board.snakes.forEach((snake) => {
    addSnake(grid, snake);
  });

  gameState.board.food.forEach((food) => {
    addThing(grid, food, VISUALIZE_TYPES.FOOD_CELL, SAFETY_TYPES.SAFE);
  });

  gameState.board.hazards.forEach((hazard) => {
    addThing(grid, hazard, VISUALIZE_TYPES.HAZARD_CELL, SAFETY_TYPES.UNSAFE);
  });

  gridViewer(grid, boardHeight, boardWidth);
  return grid;
};

module.exports = { visualize, safeViewer, gridViewer };
