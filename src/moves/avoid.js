const { initMoves, DEBUG } = require('../util');

const avoid = (gridToAvoid, type, myHead) => {
  const avoidMoves = JSON.parse(JSON.stringify(initMoves));

  gridToAvoid.forEach((f) => {
    if (myHead.x === f.x - 1 && myHead.y === f.y) {
      avoidMoves.right = false;
    }
    if (myHead.x === f.x + 1 && myHead.y === f.y) {
      avoidMoves.left = false;
    }
    if (myHead.y === f.y - 1 && myHead.x === f.x) {
      avoidMoves.up = false;
    }
    if (myHead.y === f.y + 1 && myHead.x === f.x) {
      avoidMoves.down = false;
    }
  });

  // eslint-disable-next-line no-unused-expressions
  DEBUG ? console.log(`Avoid: ${type}`, { avoidMoves }) : '';
  return avoidMoves;
};

module.exports = { avoid };
