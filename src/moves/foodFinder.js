const debug = require('debug')('bs:moves:foodFinder');
const { calcuateMove, MOVE_TYPES, getRandomInt } = require('../util');
const { floodFill } = require('./floodFill');

// eslint-disable-next-line no-param-reassign
const foodFinder = (food, myHead, safeMoves, gridVisualized) => {
  // there is no food
  if (food.length < 1) {
    return safeMoves;
  }

  // Look at the foods, if they are safe and find the closest ones
  const foodDistance = food.map((f) => {
    let fastestDirection;
    let distance = 100000000000000000;

    // get the best direction for this food
    Object.keys(MOVE_TYPES).forEach((moveType) => {
      const direction = MOVE_TYPES[moveType];

      if (safeMoves[direction]) {
        const moveInDirection = calcuateMove(myHead.x, myHead.y, direction);
        const moveDistance = Math.abs(moveInDirection.x - f.x) + Math.abs(moveInDirection.y - f.y);

        if (!fastestDirection || moveDistance < distance) {
          distance = moveDistance;
          fastestDirection = direction;
        }
      }
    });

    const foodFinderMove = {
      move: fastestDirection,
      totalDistance: Math.abs(myHead.x - f.x) + Math.abs(myHead.y - f.y),
      x: JSON.parse(JSON.stringify(f.x)),
      y: JSON.parse(JSON.stringify(f.y)),

    };
    return foodFinderMove;
  });

  // now you may have more than one direction (because there are multiple pieces of food)
  // filter to the shortest one
  const filteredFoodDistance = Object.values(foodDistance).reduce((closestFoods, fd) => {
    // Look up current distance for this food
    const closestFood = closestFoods[fd.move];
    if (!closestFood || (fd.totalDistance < closestFood.totalDistance)) {
      let what = 'nothing';
      if (closestFood) {
        what = closestFood.totalDistance;
      }
      debug('this one is closer', fd.totalDistance, ' is closer than ', what);
      // this should already be a safe move, our original list in this function filtered for that

      // eslint-disable-next-line no-param-reassign
      closestFoods[fd.move] = JSON.parse(JSON.stringify(fd));

      // eslint-disable-next-line no-param-reassign
      closestFoods[fd.move].flood = floodFill({ x: fd.x, y: fd.y }, gridVisualized, null);
    }
    return closestFoods;
  }, {});

  // And your closest move is
  debug({ filteredFoodDistance });
  const closestFood = Object.values(filteredFoodDistance).reduce((a, b) => {
    const rand = getRandomInt(0, 1);
    if (a.flood === b.flood) {
      return rand === 0 ? a : b;
    }
    if (a.flood > 2) {
      if (b.totalDistance > a.totalDistance) {
        return a;
      }
      return b;
    }
    return b;
  });

  const foodFinderMove = {
    [closestFood.move]: {
      move: closestFood.move,
      value: true,
      flood: closestFood.flood,
      coordinates: {
        x: closestFood.x,
        y: closestFood.y,
      },
    },
  };

  debug({ foodFinderMove });
  return foodFinderMove;
};

module.exports = { foodFinder };
