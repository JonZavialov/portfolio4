class Ball {
  /**
   * The Ball.
   * @param  {Board} board - The board object.
   * @constructor
   */
  constructor(board) {
    this.radius = 7;
    this.x = board.width / 2;
    this.y = board.height / 2;

    this.height = board.height;
    this.width = board.width;

    this.generateInitialVeloctiy();
    this.boardLoop = board.loop;
    this.boardScore = board.score;
  }

  /**
   * Draws the ball on the canvas.
   * @param  {Board} board - The board object.
   */
  renderIntoBoard(board) {
    board.beginPath();
    board.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    board.fill();
  }

  /**
   * Randomly generates the initial velocity and direction of the ball.
   */
  generateInitialVeloctiy() {
    this.xVelocity = 1.4;
    this.yVelocity = 1.4;

    if (Math.random() < 0.5) this.xVelocity *= -1;
    if (Math.random() < 0.5) this.yVelocity *= -1;
  }

  /**
   * Moves the ball on the canvas.
   * @param  {Paddle[]} paddles - The array of paddles on the board.
   */
  move(paddles) {
    // if it hits the top or bottom change direction
    if (this.y < this.radius || this.y > this.height - this.radius)
      this.yVelocity = -this.yVelocity;

    // if it goes to the end of the screen restart the game
    if (this.x < this.radius || this.x > this.width + this.radius) {
      clearInterval(this.boardLoop);

      const reloadURL = new URL(window.location.href);
      if (this.x < this.radius) {
        reloadURL.searchParams.set('aiScore', parseInt(this.boardScore[1]) + 1);
        reloadURL.searchParams.set('playerScore', this.boardScore[0]);
      }
      if (this.x > this.width + this.radius) {
        reloadURL.searchParams.set(
          'playerScore',
          parseInt(this.boardScore[0]) + 1
        );
        reloadURL.searchParams.set('aiScore', this.boardScore[1]);
      }
      window.location.href = reloadURL.href;
    }

    this.x += this.xVelocity;
    this.y += this.yVelocity;

    paddles.forEach((paddle) => paddle.checkForHit(this));
  }

  /**
   * Checks if the ball is the same height as the paddle.
   * @param  {Paddle} paddle - The paddle object.
   * @returns {boolean} - True if the ball is the same height as the paddle.
   */
  isSameHeight(paddle) {
    return this.y >= paddle.y && this.y <= paddle.y + paddle.height;
  }
}
