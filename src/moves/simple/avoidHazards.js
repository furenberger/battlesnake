const debug = require('debug')('bs:moves:avoidHazards');

const { initMoves } = require('../../util');

const avoidHazards = (hazards, myHead) => {
  const avoidHazardsMoves = JSON.parse(JSON.stringify(initMoves));

  hazards.forEach((hazard) => {
    // console.log("hazard: ", hazard);

    if (myHead.x === hazard.x - 1 && myHead.y === hazard.y) {
      avoidHazardsMoves.right.value = false;
    }
    if (myHead.x === hazard.x + 1 && myHead.y === hazard.y) {
      avoidHazardsMoves.left.value = false;
    }
    if (myHead.y === hazard.y - 1 && myHead.x === hazard.x) {
      avoidHazardsMoves.up.value = false;
    }
    if (myHead.y === hazard.y + 1 && myHead.x === hazard.x) {
      avoidHazardsMoves.down.value = false;
    }
  });

  debug({ avoidHazardsMoves });
  return avoidHazardsMoves;
};

module.exports = { avoidHazards };
