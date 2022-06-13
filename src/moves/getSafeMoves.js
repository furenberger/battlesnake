const { avoidWalls } = require('./avoidWalls');
const { avoidYourself } = require('./avoidYourself');
const { avoidYourNeck } = require('./avoidYourNeck');
const { avoidSnakes } = require('./avoidSnakes');
const { avoidHazards } = require('./avoidHazards');
const { combinedSafeMoves } = require('./combinedSafeMoves');

function getSafeMoves(gameState, myHead) {
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
  const safeMoves = combinedSafeMoves([
    avoidWallsMoves,
    avoidYourNeckMoves,
    avoidYourselfMoves,
    avoidSnakesMoves,
    avoidHazardsMoves,
  ]);
  return safeMoves;
}

module.exports = { getSafeMoves };
