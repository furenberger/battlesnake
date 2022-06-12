const { initMoves, DEBUG } = require('../util');

const avoidFoods = (food, myHead) => {
  const avoidFoodsMoves = JSON.parse(JSON.stringify(initMoves));

  food.forEach((f) => {
    if (myHead.x === f.x - 1 && myHead.y === f.y) {
      avoidFoodsMoves.right = false;
    }
    if (myHead.x === f.x + 1 && myHead.y === f.y) {
      avoidFoodsMoves.left = false;
    }
    if (myHead.y === f.y - 1 && myHead.x === f.x) {
      avoidFoodsMoves.up = false;
    }
    if (myHead.y === f.y + 1 && myHead.x === f.x) {
      avoidFoodsMoves.down = false;
    }
  });

  // eslint-disable-next-line no-unused-expressions
  DEBUG ? console.log({ avoidFoodsMoves }) : '';
  return avoidFoodsMoves;
};

module.exports = { avoidFoods };
