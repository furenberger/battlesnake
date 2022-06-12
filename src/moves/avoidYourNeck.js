const { initMoves, DEBUG } = require('../util');

const avoidYourNeck = (myNeck, myHead) => {
  const avoidYourNeckMoves = JSON.parse(JSON.stringify(initMoves));

  if (myNeck.x < myHead.x) {
    avoidYourNeckMoves.left.value = false;
  } else if (myNeck.x > myHead.x) {
    avoidYourNeckMoves.right.value = false;
  } else if (myNeck.y < myHead.y) {
    avoidYourNeckMoves.down.value = false;
  } else if (myNeck.y > myHead.y) {
    avoidYourNeckMoves.up.value = false;
  }
  // eslint-disable-next-line no-unused-expressions
  DEBUG ? console.log({ avoidYourNeckMoves }) : '';
  return avoidYourNeckMoves;
};

module.exports = { avoidYourNeck };
