const { MOVES, MOVE_TYPES } = require('../util');

const combinedSafeMoves = (movesArray) => {
  const safeMoves = [MOVE_TYPES.UP, MOVE_TYPES.DOWN, MOVE_TYPES.LEFT, MOVE_TYPES.RIGHT];

  movesArray.forEach((_moveArray) => {
    const currentSafeMoves = Object.keys(_moveArray).filter(
      (key) => _moveArray[key].value,
    );

    // loop over the possible moves and see if it is left in the safeMoves array
    MOVES.forEach((_move) => {
      // This move is left BUT it is not a safe move
      if (safeMoves.includes(_move) && !currentSafeMoves.includes(_move)) {
        // Remove it!
        safeMoves.splice(safeMoves.indexOf(_move), 1);
      }
    });
  });

  console.log({
    safeMoves,
  });
  return safeMoves;
};

module.exports = { combinedSafeMoves };
