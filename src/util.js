const MY_SNAKE = 'ryanfurness-js-ngrok';
const DEBUG = false;
const DEBUG_FOOD = false;
const MOVES = ['up', 'down', 'left', 'right'];
const GRID_TYPES = Object.freeze({
  FOOD: Symbol('FOOD'),
  HAZARD: Symbol('HAZARD'),
  SNAKE: Symbol('SNAKE'),
});

const HEALTH_THRESHOLD = 75;

const initMoves = {
  up: {
    value: true,
    priority: 0,
  },
  down: {
    value: true,
    priority: 0,
  },
  left: {
    value: true,
    priority: 0,
  },
  right: {
    value: true,
    priority: 0,
  },
};

function info() {
  console.log('INFO');
  const response = {
    apiversion: '1',
    author: '',
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

module.exports = {
  initMoves,
  MOVES,
  MY_SNAKE,
  DEBUG,
  DEBUG_FOOD,
  HEALTH_THRESHOLD,
  GRID_TYPES,
  info,
  getRandomInt,
};
