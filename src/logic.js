// const { avoidFoods } = require('./moves/avoidFoods');
// const { avoidHazards } = require('./moves/avoidHazards');

const { avoid } = require('./moves/avoid');
const { avoidSnakes } = require('./moves/avoidSnakes');
const { avoidWalls } = require('./moves/avoidWalls');
const { avoidYourself } = require('./moves/avoidYourself');
const { avoidYourNeck } = require('./moves/avoidYourNeck');
const { combinedSafeMoves } = require('./moves/combinedSafeMoves');
const { foodFinder } = require('./moves/foodFinder');
const { visualize } = require('./visualizer');
const {
  DEBUG_FOOD, HEALTH_THRESHOLD, MOVES, getRandomInt, GRID_TYPES,
} = require('./util');

function start(gameState) {
  console.log(`${gameState.game.id} START`);
}

function end(gameState) {
  console.log(`${gameState.game.id} END\n`);
}

const findNextMove = (health, safeMoves, avoidFoodsMoves, food, myHead) => {
  // there is only one move, we have to use it
  if (safeMoves.length <= 1) {
    return safeMoves;
  }

  const findNextMoveMoves = JSON.parse(JSON.stringify(safeMoves));

  const flatAvoidFoodMoves = Object.keys(avoidFoodsMoves).filter(
    (key) => avoidFoodsMoves[key].value === true,
  );
  const flatHasFoodMoves = Object.keys(avoidFoodsMoves).filter(
    (key) => avoidFoodsMoves[key].value === false,
  );

  // Do you NEED food?
  if (health > HEALTH_THRESHOLD) {
    // remove the food from the findNextMoveMoves
    MOVES.forEach((_move) => {
      // make sure there is still a safe move after we keep slicing
      if (findNextMoveMoves.length > 1 && findNextMoveMoves.includes(_move)) {
        // You found some food at that spot
        if (!flatAvoidFoodMoves.includes(_move)) {
          // Remove it - there is food there its unsafe
          // eslint-disable-next-line no-unused-expressions
          DEBUG_FOOD ? console.log(`Removing ${_move} due to 🍕`) : '';
          findNextMoveMoves.splice(findNextMoveMoves.indexOf(_move), 1);
        }
      }
    });
  } else {
    // You need to head towards food
    // eslint-disable-next-line no-unused-expressions
    DEBUG_FOOD ? console.log('I NEED 🥟🥟🥟') : '';

    // is one of your nearby moves food?
    if (flatHasFoodMoves.length > 0) {
      // eslint-disable-next-line no-unused-expressions
      DEBUG_FOOD ? console.log('I NEED 🌭') : '';
      return flatHasFoodMoves;
    }
    // head in the direction of food
    return foodFinder(food, myHead, findNextMoveMoves);
  }

  // eslint-disable-next-line no-unused-expressions
  DEBUG_FOOD ? console.log({ findNextMoveMoves }) : '';
  return findNextMoveMoves;
};

function move(gameState) {
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  const myHead = gameState.you.head;
  const myBody = gameState.you.body;
  const myNeck = gameState.you.body[1];

  const { snakes } = gameState.board;
  const { hazards } = gameState.board;
  const { health } = gameState.you;
  const { food } = gameState.board;

  visualize(gameState);

  // Don't let your Battlesnake move back on its own neck
  const avoidYourNeckMoves = avoidYourNeck(myNeck, myHead);

  // Avoid walls
  const avoidWallsMoves = avoidWalls(myHead, boardHeight, boardWidth);

  // Avoid hitting yourself
  const avoidYourselfMoves = avoidYourself(myBody, myHead);

  // Avoid other snakes
  // const avoidSnakesMoves = avoidSnakes(snakes, myHead);
  const avoidSnakesMoves = avoid(snakes, GRID_TYPES.SNAKE, myHead);

  // Avoid hazards
  // const avoidHazardsMoves = avoidHazards(hazards, myHead);
  const avoidHazardsMoves = avoid(hazards, GRID_TYPES.HAZARD, myHead);

  // Avoid food
  // const avoidFoodsMoves = avoidFoods(food, myHead);
  const avoidFoodsMoves = avoid(food, GRID_TYPES.FOOD, myHead);

  // Choose a move from the available safe moves
  const safeMoves = combinedSafeMoves([
    avoidWallsMoves,
    avoidYourNeckMoves,
    avoidYourselfMoves,
    avoidSnakesMoves,
    avoidHazardsMoves,
  ]);

  // Now with those moves... introduce FOOD
  const safeFoodMoves = findNextMove(
    health,
    safeMoves,
    avoidFoodsMoves,
    food,
    myHead,
  );

  const rand = getRandomInt(0, safeFoodMoves.length);
  const response = {
    move: safeFoodMoves[rand],
  };

  console.log(`TURN: ${gameState.turn}\nMOVE: ${response.move}\nHEALTH: ${health}`);
  // if (gameState.turn > 1) {
  //   process.exit();
  // }
  return response;
}

module.exports = {
  start,
  move,
  end,
};
