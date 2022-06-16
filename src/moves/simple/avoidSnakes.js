const debug = require('debug')('bs:moves:avoidSnakes');

const { initMoves, MY_SNAKE } = require('../../util');

const avoidSnakes = (snakes, myHead) => {
  const avoidSnakesMoves = JSON.parse(JSON.stringify(initMoves));

  snakes.forEach((snake) => {
    const snakeName = snake.name;
    if (snakeName === MY_SNAKE) {
      // its your snake...
      return;
    }
    // console.log(`snake ${snakeName}`);
    const snakeBody = snake.body;

    snakeBody.forEach((b) => {
      if (myHead.x === b.x - 1 && myHead.y === b.y) {
        avoidSnakesMoves.right.value = false;
      }
      if (myHead.x === b.x + 1 && myHead.y === b.y) {
        avoidSnakesMoves.left.value = false;
      }
      if (myHead.y === b.y - 1 && myHead.x === b.x) {
        avoidSnakesMoves.up.value = false;
      }
      if (myHead.y === b.y + 1 && myHead.x === b.x) {
        avoidSnakesMoves.down.value = false;
      }
    });
  });

  debug({ avoidSnakesMoves });
  return avoidSnakesMoves;
};

module.exports = { avoidSnakes };
