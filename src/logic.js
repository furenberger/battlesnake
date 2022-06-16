const debug = require('debug')('bs:logic');

const { avoidFoods } = require('./moves/avoidFoods');
const { avoidSnakeHeads } = require('./moves/avoidSnakeHeads');
const { getSafeMoves } = require('./moves/getSafeMoves');
const { foodFinder } = require('./moves/foodFinder');
const { visualize } = require('./visualizer');
const { floodFill } = require('./moves/floodFill');

const {
  HEALTH_THRESHOLD, MOVES, MOVE_TYPES, getRandomInt, calcuateMove,
} = require('./util');

function start(gameState) {
  console.log(`${gameState.game.id} START`);
}

function end(gameState) {
  console.log(`${gameState.game.id} END\n`);
}

const findNextMove = (health, safeMoves, avoidFoodsMoves, food, myHead, gridVisualized) => {
  // there is only one move, we have to use it
  if (Object.keys(safeMoves).length <= 1) {
    // debug('THERE IS ONLY ONE MOVE, dont bother doing anything else');
    return safeMoves;
  }

  const nextMove = JSON.parse(JSON.stringify(safeMoves));
  // debug({ findNextMoveMoves: nextMove });

  // const flatAvoidFoodMoves = Object.keys(avoidFoodsMoves).filter(
  //   (key) => avoidFoodsMoves[key].value === true,
  // );

  // debug('flatAvoidFoodMoves:', flatAvoidFoodMoves);
  const flatHasFoodMoves = Object.keys(avoidFoodsMoves).filter(
    (key) => avoidFoodsMoves[key].value === false,
  );
  // debug('flatHasFoodMoves:', flatHasFoodMoves);

  // Do you NEED food?
  if (health > parseInt(HEALTH_THRESHOLD, 10)) {
    // you dont need it
    // remove the food from the findNextMoveMoves
    Object.keys(MOVE_TYPES).forEach((moveType) => {
      const direction = MOVE_TYPES[moveType];
      if (safeMoves[direction]) {
        // make sure there is still a safe move after we keep deleting
        if (Object.keys(nextMove).length > 1 && nextMove[direction]) {
        // You found some food at that spot
          if (flatHasFoodMoves.includes(direction)) {
            // Remove it - there is food there its unsafe
            debug(`Removing ${direction} due to 🍕`);
            delete nextMove[direction];
          }
        }
      }
    });
  } else {
    // You need to head towards food
    // eslint-disable-next-line no-unused-expressions
    debug('I NEED 🥟🥟🥟');

    // head in the direction of food
    return foodFinder(food, myHead, nextMove, gridVisualized);
  }

  debug({ findNextMoveMoves: nextMove });
  return nextMove;
};

function move(gameState) {
  // const boardWidth = gameState.board.width;
  // const boardHeight = gameState.board.height;

  const myHead = gameState.you.head;
  // const myBody = gameState.you.body;
  // const myNeck = gameState.you.body[1];

  // const { snakes } = gameState.board;
  // const { hazards } = gameState.board;
  const { health } = gameState.you;
  const { food } = gameState.board;

  const gridVisualized = visualize(gameState);

  debug(`START TURN: ${gameState.turn} myHead: {${myHead.x},${myHead.y}}`);

  const safeMoves = getSafeMoves(gameState, myHead);

  // calculate the flood
  Object.keys(MOVE_TYPES).forEach((moveType) => {
    const direction = MOVE_TYPES[moveType];
    if (safeMoves[direction]) {
      const { x, y } = calcuateMove(myHead.x, myHead.y, direction);
      const flood = floodFill({ x, y }, gridVisualized, gameState);
      safeMoves[direction].coordinates.x = x;
      safeMoves[direction].coordinates.y = y;
      safeMoves[direction].flood = flood;
    }
  });

  // debug('safeMoves: ', safeMoves);
  // debug('its safe: ', safeMoves[Object.keys(safeMoves)[0]]);

  // Avoid food
  const avoidFoodsMoves = avoidFoods(food, myHead, gridVisualized);

  // Avoid other snake heads
  // TODO LATER
  // const { snakes } = gameState.board;
  // const avoidSnakeHeadsMoves = avoidSnakeHeads(snakes, myHead);

  // find the next 'best' move
  const nextMove = findNextMove(
    health,
    safeMoves,
    avoidFoodsMoves,
    food,
    myHead,
    gridVisualized,
  );

  // const rand = getRandomInt(0, safeFoodMoves.length);

  let moveSnake = '';
  if (Object.keys(safeMoves).length === 1) {
    // there is only one move you have to take it
    debug('safemove:', safeMoves[Object.keys(safeMoves)[0]].move);
    moveSnake = safeMoves[Object.keys(safeMoves)[0]].move;
  }

  if ((!moveSnake || moveSnake === '') && Object.values(nextMove).length > 0) {
    // Take a good fill
    const bestFlood = Object.values(nextMove).reduce((a, b) => {
      const rand = getRandomInt(0, 1);
      if (a.flood === b.flood) {
        return rand === 0 ? a : b;
      }
      if (a.flood > 2) {
        if (b.flood < a.flood) {
          return a;
        }
        return b;
      }
      return b;
    });
    debug({ bestFlood });
    moveSnake = bestFlood.move;
  }

  if (!moveSnake || moveSnake === '') {
    debug('default');
    moveSnake = 'right';
  }

  const response = {
    move: moveSnake,
  };

  debug(`END MOVE: ${gameState.turn}\nMOVE: ${response.move}\nHEALTH: ${health}\n`);

  return response;
}

module.exports = {
  start,
  move,
  end,
};
