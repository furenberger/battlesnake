const debug = require('debug')('bs:getSafeMoves');

const { avoidWalls } = require('./simple/avoidWalls');
const { avoidYourself } = require('./simple/avoidYourself');
const { avoidYourNeck } = require('./simple/avoidYourNeck');
const { avoidSnakes } = require('./simple/avoidSnakes');
const { avoidHazards } = require('./simple/avoidHazards');
const { initMoves, MOVE_TYPES } = require('../util');

function getSafeMoves(gameState, myHead) {
  const safeMoves = JSON.parse(JSON.stringify(initMoves));

  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  const myBody = gameState.you.body;
  const myNeck = gameState.you.body[1];

  const { snakes } = gameState.board;
  const { hazards } = gameState.board;

  // Don't let your Battlesnake move back on its own neck
  const avoidYourNeckMoves = avoidYourNeck(myNeck, myHead);

  // Avoid walls
  const avoidWallsMoves = avoidWalls(myHead, boardHeight, boardWidth);

  // Avoid hitting yourself
  const avoidYourselfMoves = avoidYourself(myBody, myHead);

  // Avoid other snakes
  const avoidSnakesMoves = avoidSnakes(snakes, myHead);

  // Avoid hazards
  const avoidHazardsMoves = avoidHazards(hazards, myHead);

  // Choose a move from the available safe moves
  const movesArray = [
    avoidWallsMoves,
    avoidYourNeckMoves,
    avoidYourselfMoves,
    avoidSnakesMoves,
    avoidHazardsMoves,
  ];

  movesArray.forEach((move) => {
    Object.keys(MOVE_TYPES).forEach((moveType) => {
      const direction = MOVE_TYPES[moveType];
      if (!move[direction].value) {
        // this move is not safe
        delete safeMoves[direction];
      }
    });
  });

  // This return will look something like this (but look at initMoves)
  // safeMoves: {
  //   left: { move: 'left', value: true, flood: 0, coordinates: { x: 0, y: 0 } },
  //   right: {
  //     move: 'right',
  //     value: true,
  //     flood: 0,
  //     coordinates: { x: 0, y: 0 }
  //   }
  // }
  debug({ safeMoves });
  return safeMoves;
}

module.exports = { getSafeMoves };

// const safeMoves = [MOVE_TYPES.UP, MOVE_TYPES.DOWN, MOVE_TYPES.LEFT, MOVE_TYPES.RIGHT];

// movesArray.forEach((_moveArray) => {
//   const currentSafeMoves = Object.keys(_moveArray).filter(
//     (key) => _moveArray[key].value,
//   );

//   // loop over the possible moves and see if it remains in the safeMoves array
//   MOVES.forEach((_move) => {
//     // This move remains BUT it is not a safe move
//     if (safeMoves.includes(_move) && !currentSafeMoves.includes(_move)) {
//       // Remove it!
//       safeMoves.splice(safeMoves.indexOf(_move), 1);
//     }
//   });
// });

// console.log({
//   safeMoves,
// });
// return safeMoves;
