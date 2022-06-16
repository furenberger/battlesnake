const { SAFETY_TYPES, validCoordinates } = require('../util');
const { safeViewer } = require('../visualizer');

function floodFill(move, gridVisualized, gameState) {
  const gridVisualizedCopy = JSON.parse(JSON.stringify(gridVisualized));

  const fillStack = [];
  fillStack.push([move.x, move.y]);

  while (fillStack.length > 0) {
    const [x, y] = fillStack.pop();
    // console.log(`x:${x}, y:${y}`);
    // eslint-disable-next-line no-continue
    if (!validCoordinates(gridVisualizedCopy, x, y)) { continue; }
    // console.log('its valid - is it safe?', gridVisualizedCopy[x][y].safe);
    // eslint-disable-next-line no-continue
    if (gridVisualizedCopy[x][y].safe === SAFETY_TYPES.UNSAFE || gridVisualizedCopy[x][y].safe === 'F') { continue; }
    // console.log('its safe mark it FLOODED');
    gridVisualizedCopy[x][y].safe = 'F';

    fillStack.push([x + 1, y]);
    fillStack.push([x - 1, y]);
    fillStack.push([x, y + 1]);
    fillStack.push([x, y - 1]);
  }
  // safeViewer(gridVisualizedCopy, gameState.board.height, gameState.board.width);

  let area = 0;
  gridVisualizedCopy.forEach((row) => {
    row.forEach((element) => {
      if (element.safe === 'F') {
        area += 1;
      }
    });
  });
  // console.log('floodFill: ', area);
  return area;
}

module.exports = { floodFill };
