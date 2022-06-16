const debug = require('debug')('bs:moves:avoidFoods');

const { initMoves, MOVE_TYPES, calcuateMove } = require('../util');
const { floodFill } = require('./floodFill');

const avoidFoods = (food, myHead, gridVisualized) => {
  const avoidFoodsMoves = JSON.parse(JSON.stringify(initMoves));

  food.forEach((f) => {
    if (myHead.x === f.x - 1 && myHead.y === f.y) {
      const flood = floodFill({ x: f.x - 1, f: f.y }, gridVisualized, null);
      if (flood > 3) {
        avoidFoodsMoves[MOVE_TYPES.RIGHT].value = false;
      }
    }
    if (myHead.x === f.x + 1 && myHead.y === f.y) {
      const flood = floodFill({ x: f.x - +1, f: f.y }, gridVisualized, null);
      if (flood > 3) {
        avoidFoodsMoves[MOVE_TYPES.LEFT].value = false;
      }
    }
    if (myHead.y === f.y - 1 && myHead.x === f.x) {
      const flood = floodFill({ x: f.x, f: f.y - 1 }, gridVisualized, null);
      if (flood > 3) {
        avoidFoodsMoves[MOVE_TYPES.UP].value = false;
      }
    }
    if (myHead.y === f.y + 1 && myHead.x === f.x) {
      const flood = floodFill({ x: f.x, f: f.y + 1 }, gridVisualized, null);
      if (flood > 3) {
        avoidFoodsMoves[MOVE_TYPES.DOWN].value = false;
      }
    }
  });

  debug({ avoidFoodsMoves });
  return avoidFoodsMoves;
};

module.exports = { avoidFoods };
