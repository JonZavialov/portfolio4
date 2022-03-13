class AiPaddle extends Paddle {
  /**
   * The paddle controlled by the AI.
   * @param  {Board} board - The board object.
   * @constructor
   */
  constructor(board) {
    super(board.width - 15, board, 1);
  }

  /**
   * Moves the paddle in the direction of the ball.
   * @param  {Ball} ball - The ball object.
   * @param  {Board} board - The board object.
   */
  moveToBall(ball, board) {
    if (ball.y < this.y + this.height / 2) this.move('up', board);
    else if (ball.y > this.y + this.height / 2) this.move('down', board);
  }

  /**
   * Checks if the ball is hitting the paddle.
   * @param  {Ball} ball - The ball object.
   */
  checkForHit(ball) {
    if (ball.x + ball.radius >= this.x && ball.x <= this.x + this.width)
      if (ball.isSameHeight(this)) ball.xVelocity *= -1;
  }
}
