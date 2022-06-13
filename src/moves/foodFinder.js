const { DEBUG_FOOD, MOVE_TYPES } = require('../util');

const findCloser = (safeMoves, foodFinderMoves, currentClosestFood, myHead, moveA, moveB) => {
  if (safeMoves.includes(moveA) && safeMoves.includes(moveB)) {
    const upRemainingDistance = Math.abs(myHead.y + 1 - currentClosestFood.y);
    const downRemainingDistance = Math.abs(myHead.y - 1 - currentClosestFood.y);
    if (downRemainingDistance > upRemainingDistance) {
      foodFinderMoves.add(moveA);
    } else {
      foodFinderMoves.add(moveB);
    }
  }
};

const foodFinder = (food, myHead, safeMoves) => {
  // there is no food
  if (food.length < 1) {
    return safeMoves;
  }

  // pick a food that is close to you, it doesnt matter it will get closer as you move
  const foodDistance = JSON.parse(JSON.stringify(food));
  let currentClosestFood = food.slice(0, 1)[0];
  currentClosestFood.totalDistance = Math.abs(myHead.y - currentClosestFood.y)
                                      + Math.abs(myHead.x - currentClosestFood.x);

  foodDistance.forEach((f, index) => {
    const totalDistance = Math.abs(myHead.x - f.x) + Math.abs(myHead.y - f.y);
    if (totalDistance < currentClosestFood.totalDistance) {
      currentClosestFood = foodDistance.splice(index, 1);
      currentClosestFood.totalDistance = totalDistance;
    }
  });

  // Now with ther closest food find the best move
  const foodFinderMoves = new Set();
  findCloser(safeMoves, foodFinderMoves, currentClosestFood, myHead, MOVE_TYPES.UP, MOVE_TYPES.DOWN);
  findCloser(safeMoves, foodFinderMoves, currentClosestFood, myHead, MOVE_TYPES.UP, MOVE_TYPES.LEFT);
  findCloser(safeMoves, foodFinderMoves, currentClosestFood, myHead, MOVE_TYPES.UP, MOVE_TYPES.RIGHT);
  findCloser(safeMoves, foodFinderMoves, currentClosestFood, myHead, MOVE_TYPES.DOWN, MOVE_TYPES.LEFT);
  findCloser(safeMoves, foodFinderMoves, currentClosestFood, myHead, MOVE_TYPES.DOWN, MOVE_TYPES.RIGHT);
  findCloser(safeMoves, foodFinderMoves, currentClosestFood, myHead, MOVE_TYPES.LEFT, MOVE_TYPES.RIGHT);

  // eslint-disable-next-line no-unused-expressions
  DEBUG_FOOD ? console.log({ foodFinderMoves }) : '';
  return [...foodFinderMoves];
};
module.exports = { foodFinder };
