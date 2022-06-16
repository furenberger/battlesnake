const debug = require('debug')('bs:moves:avoidYourself');
const { initMoves } = require('../../util');

const avoidYourself = (myBody, myHead) => {
  const avoidYourselfMoves = JSON.parse(JSON.stringify(initMoves));

  myBody.forEach((b) => {
    if (myHead.x === b.x - 1 && myHead.y === b.y) {
      avoidYourselfMoves.right.value = false;
    }
    if (myHead.x === b.x + 1 && myHead.y === b.y) {
      avoidYourselfMoves.left.value = false;
    }
    if (myHead.y === b.y - 1 && myHead.x === b.x) {
      avoidYourselfMoves.up.value = false;
    }
    if (myHead.y === b.y + 1 && myHead.x === b.x) {
      avoidYourselfMoves.down.value = false;
    }
  });

  debug({ avoidYourselfMoves });
  return avoidYourselfMoves;
};

module.exports = { avoidYourself };
