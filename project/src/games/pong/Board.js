class Board {
  /**
   * The Board class.
   * @constructor
   */
  constructor() {
    this.canvas = $('#gameBoard')[0].getContext('2d');
    this.canvas.fillStyle = 'white';
    this.canvas.lineWidth = 15;
    this.width = $('#gameBoard').width();
    this.height = $('#gameBoard').height();

    this.paddles = [];
    const params = new URLSearchParams(window.location.search);
    this.score = [
      params.get('playerScore') || '0',
      params.get('aiScore') || '0',
    ];
    this.renderScore();
  }

  /**
   * Renders the score counter on the canvas.
   */
  renderScore() {
    $('#playerScore').text(this.score[0]);
    $('#playerScore').css(
      'transform',
      `translate(${174 - (this.score[0].length - 1) * 18}px, -284px)`
    );
    $('#aiScore').text(this.score[1]);
  }

  /**
   * Renders the paddle on the canvas.
   * @param  {Paddle} paddle - The paddle object.
   */
  renderPaddle(paddle) {
    if (!this.paddles.includes(paddle)) this.paddles.push(paddle);
    paddle.renderIntoBoard(this.canvas);
  }

  /**
   * Renders the ball on the canvas.
   * @param  {Ball} ball - The ball object.
   */
  renderBall(ball) {
    if (!this.ball) this.ball = ball;
    ball.renderIntoBoard(this.canvas);
  }

  /**
   * Clears the canvas.
   */
  clear() {
    this.canvas.fillStyle = 'black';
    this.canvas.fillRect(0, 0, this.width, this.height);
    this.canvas.fillStyle = 'white';

    this.canvas.fillRect(this.width / 2, 0, 1, this.height);
  }

  /**
   * Updates the canvas by clearing it and rendering the paddles and ball.
   */
  update() {
    this.clear();
    this.paddles.forEach((paddle) => this.renderPaddle(paddle));
    this.renderBall(this.ball);
  }

  /**
   * Starts the game loop.
   */
  init() {
    this.loop = setInterval(() => {
      this.ball.move(this.paddles);
      this.paddles.forEach((paddle) => {
        if (paddle.constructor.name === 'AiPaddle')
          paddle.moveToBall(this.ball, this);
      });
      this.update();
    }, 10);
  }
}
