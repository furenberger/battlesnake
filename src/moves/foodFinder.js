const { DEBUG_FOOD } = require('../util');

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
  // check all the safeMoves for which one would make you go closer the food
  // Compare Up to Down
  if (safeMoves.includes('up') && safeMoves.includes('down')) {
    const upRemainingDistance = Math.abs(myHead.y + 1 - currentClosestFood.y);
    const downRemainingDistance = Math.abs(myHead.y - 1 - currentClosestFood.y);
    if (downRemainingDistance > upRemainingDistance) {
      foodFinderMoves.add('up');
    } else {
      foodFinderMoves.add('down');
    }
  }
  // Compare Left to Right
  if (safeMoves.includes('left') && safeMoves.includes('right')) {
    const leftRemainingDistance = Math.abs(myHead.x - 1 - currentClosestFood.x);
    const rightRemainingDistance = Math.abs(myHead.x + 1 - currentClosestFood.x);
    if (rightRemainingDistance > leftRemainingDistance) {
      foodFinderMoves.add('left');
    } else {
      foodFinderMoves.add('right');
    }
  }

  if (safeMoves.includes('left') && safeMoves.includes('up')) {
    const leftRemainingDistance = Math.abs(myHead.x - 1 - currentClosestFood.x);
    const upRemainingDistance = Math.abs(myHead.y + 1 - currentClosestFood.y);
    if (upRemainingDistance > leftRemainingDistance) {
      foodFinderMoves.add('left');
    } else {
      foodFinderMoves.add('up');
    }
  }

  if (safeMoves.includes('right') && safeMoves.includes('up')) {
    const rightRemainingDistance = Math.abs(myHead.x + 1 - currentClosestFood.x);
    const upRemainingDistance = Math.abs(myHead.y + 1 - currentClosestFood.y);
    if (upRemainingDistance > rightRemainingDistance) {
      foodFinderMoves.add('right');
    } else {
      foodFinderMoves.add('up');
    }
  }

  if (safeMoves.includes('left') && safeMoves.includes('down')) {
    const leftRemainingDistance = Math.abs(myHead.x - 1 - currentClosestFood.x);
    const downRemainingDistance = Math.abs(myHead.y - 1 - currentClosestFood.y);
    if (downRemainingDistance > leftRemainingDistance) {
      foodFinderMoves.add('left');
    } else {
      foodFinderMoves.add('down');
    }
  }

  if (safeMoves.includes('right') && safeMoves.includes('down')) {
    const rightRemainingDistance = Math.abs(myHead.x + 1 - currentClosestFood.x);
    const downRemainingDistance = Math.abs(myHead.y - 1 - currentClosestFood.y);
    if (downRemainingDistance > rightRemainingDistance) {
      foodFinderMoves.add('right');
    } else {
      foodFinderMoves.add('down');
    }
  }
  // eslint-disable-next-line no-unused-expressions
  DEBUG_FOOD ? console.log({ foodFinderMoves }) : '';
  return [...foodFinderMoves];
};
module.exports = { foodFinder };
