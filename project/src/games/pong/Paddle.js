class Paddle {
  /**
   * The Paddle constructor.
   * @param  {number} x - The x coordinate of the paddle.
   * @param  {Board} board - The board object.
   * @param  {number} moveCoeff - The coefficient of movement.
   * @constructor
   */
  constructor(x, board, moveCoeff) {
    this.width = 15;
    this.height = 60;
    this.x = x;
    this.y = board.height / 2 - this.height / 2;
    this.moveCoeff = moveCoeff;
  }

  /**
   * Renders the paddle on the canvas.
   * @param  {Board} board - The board object.
   */
  renderIntoBoard(board) {
    board.fillRect(this.x, this.y, this.width, this.height);
  }

  /**
   * Moves the paddle.
   * @param  {string} direction - The direction of the movement.
   * @param  {Board} board - The board object.
   */
  move(direction, board) {
    if (this.y === 0 && direction === 'up') return;
    if (this.y === board.height - this.height && direction === 'down') return;

    if (direction === 'up') this.y -= this.moveCoeff;
    else if (direction === 'down') this.y += this.moveCoeff;
  }
}
