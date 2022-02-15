/**
 * Initializes the game.
 * @param  {number} tickSpeed - The speed of the game.
 */
function initSnakeGame(tickSpeed) {
  // make a 17x17 array
  const board = new Board(tickSpeed);
  const snake = new Snake(3, 8);
  const food = new Food(13, 8);

  board.generate(snake, food);
  addKeyListeners(snake, board);
}

/**
 * Adds key listeners to the game.
 * @param  {Snake} snake - The snake object.
 * @param  {Board} board - The board object.
 */
function addKeyListeners(snake, board) {
  let previousBoardTick;
  document.addEventListener('keydown', (e) => {
    if (board.tick === previousBoardTick) return;
    switch (e.keyCode) {
      case 37:
        snake.changeDirection('left');
        previousBoardTick = board.tick;
        break;
      case 38:
        snake.changeDirection('up');
        previousBoardTick = board.tick;
        break;
      case 39:
        snake.changeDirection('right');
        previousBoardTick = board.tick;
        break;
      case 40:
        snake.changeDirection('down');
        previousBoardTick = board.tick;
        break;
      default:
        break;
    }
  });
}