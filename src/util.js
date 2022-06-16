const MY_SNAKE = 'snakenberger';
const {
  HEALTH_THRESHOLD, SNAKE_VIEWER, GRID_VIEWER,
} = process.env;

const MOVE_TYPES = Object.freeze({
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
});

const SAFETY_TYPES = Object.freeze({
  SAFE: 'S',
  UNSAFE: 'U',
});

const MOVES = [MOVE_TYPES.UP, MOVE_TYPES.DOWN, MOVE_TYPES.LEFT, MOVE_TYPES.RIGHT];

const GRID_TYPES = Object.freeze({
  FOOD: 'FOOD',
  HAZARD: 'HAZARD',
  SNAKE: 'SNAKE',
});

const initMoves = {
  up: {
    move: 'up',
    value: true,
    flood: 0,
    coordinates: {
      x: 0,
      y: 0,
    },
  },
  down: {
    move: 'down',
    value: true,
    flood: 0,
    coordinates: {
      x: 0,
      y: 0,
    },
  },
  left: {
    move: 'left',
    value: true,
    flood: 0,
    coordinates: {
      x: 0,
      y: 0,
    },
  },
  right: {
    move: 'right',
    value: true,
    flood: 0,
    coordinates: {
      x: 0,
      y: 0,
    },
  },
};

const VISUALIZE_TYPES = Object.freeze({

  EMPTY: '⬜️',

  HEAD: '🐍',
  BODY: '❌',
  TAIL: '⭕️',

  YOU_HEAD: '🐉',
  YOU_BODY: '🦴',
  YOU_TAIL: '💩',

  FOOD_CELL: '🌭',
  WALL_CELL: '🧱',
  HAZARD_CELL: '☢️',
});

function info() {
  console.log('INFO');
  const response = {
    apiversion: '1',
    author: 'Ryan Furness',
    color: '#bada55',
    head: 'silly',
    tail: 'round-bum',
  };
  return response;
}

function getRandomInt(min, max) {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (floorMax - ceilMin) + ceilMin);
}

// Returns true if specified row and col coordinates are in the matrix
function validCoordinates(grid, x, y) {
  return (x >= 0 && x < grid.length && y >= 0 && y < grid[x].length);
}

function calcuateMove(x, y, direction) {
  if (direction === MOVE_TYPES.UP) {
    return { x, y: y + 1 };
  } if (direction === MOVE_TYPES.DOWN) {
    return { x, y: y - 1 };
  } if (direction === MOVE_TYPES.LEFT) {
    return { x: x - 1, y };
  } if (direction === MOVE_TYPES.RIGHT) {
    return { x: x + 1, y };
  }

  return { x, y };
}

module.exports = {
  initMoves,
  MOVES,
  MOVE_TYPES,
  MY_SNAKE,
  HEALTH_THRESHOLD,
  GRID_TYPES,
  VISUALIZE_TYPES,
  SAFETY_TYPES,
  SNAKE_VIEWER,
  GRID_VIEWER,
  info,
  getRandomInt,
  validCoordinates,
  calcuateMove,
};
