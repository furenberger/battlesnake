const { initMoves, DEBUG } = require('../util');

const avoidWalls = (myHead, boardHeight, boardWidth) => {
  const avoidWallsMoves = JSON.parse(JSON.stringify(initMoves));

  if (myHead.y === 0) {
    avoidWallsMoves.down.value = false;
  }

  if (myHead.x === 0) {
    avoidWallsMoves.left.value = false;
  }

  if (myHead.y === boardHeight - 1) {
    avoidWallsMoves.up.value = false;
  }

  if (myHead.x === boardWidth - 1) {
    avoidWallsMoves.right.value = false;
  }

  // eslint-disable-next-line no-unused-expressions
  DEBUG ? console.log({ avoidWallsMoves }) : '';
  return avoidWallsMoves;
};

module.exports = { avoidWalls };
