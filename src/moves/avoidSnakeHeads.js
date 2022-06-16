const debug = require('debug')('bs:moves:avoidSnakeHeads');

const { initMoves, MY_SNAKE } = require('../util');

const avoidSnakeHeads = (snakes, myHead) => {
  const avoidSnakeHeadsMoves = JSON.parse(JSON.stringify(initMoves));

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
        avoidSnakeHeadsMoves.right.value = false;
      }
      if (myHead.x === b.x + 1 && myHead.y === b.y) {
        avoidSnakeHeadsMoves.left.value = false;
      }
      if (myHead.y === b.y - 1 && myHead.x === b.x) {
        avoidSnakeHeadsMoves.up.value = false;
      }
      if (myHead.y === b.y + 1 && myHead.x === b.x) {
        avoidSnakeHeadsMoves.down.value = false;
      }
    });
  });

  debug({ avoidSnakesMoves: avoidSnakeHeadsMoves });
  return avoidSnakeHeadsMoves;
};

module.exports = { avoidSnakeHeads };
