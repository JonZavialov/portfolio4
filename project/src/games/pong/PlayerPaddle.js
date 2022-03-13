class PlayerPaddle extends Paddle {
  /**
   * The player controlled paddle.
   * @param  {Board} board - The board object.
   * @constructor
   */
  constructor(board) {
    super(0, board, 20);
  }

  /**
   * Starts the listeners for the arrow keys.
   * @param  {Board} board - The board object.
   */
  startListeners(board) {
    $(document).keydown((e) => {
      if (e.keyCode === 38) this.move('up', board);
      else if (e.keyCode === 40) this.move('down', board);
    });
  }

  /**
   * Checks if the ball is hitting the paddle.
   * @param  {Ball} ball - The ball object.
   */
  checkForHit(ball) {
    if (ball.x - ball.radius <= this.x + this.width && ball.x > this.x)
      if (ball.isSameHeight(this)) ball.xVelocity *= -1;
  }
}
