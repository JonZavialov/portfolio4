class Snake {
  /**
   * The Snake object.
   * @param  {number} x - The x coordinate of the snake head.
   * @param  {number} y - The y coordinate of the snake head.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 'right';
    this.length = 3;

    this.body = [
      [this.x, this.y, this.direction],
      [this.x - 1, this.y, this.direction],
      [this.x - 2, this.y, this.direction],
    ];
  }

  /**
   * Moves one node of the snake.
   */
  move() {
    for (let i = 0; i < this.body.length; i += 1) {
      const snakeNode = this.body[i];
      switch (snakeNode[2]) {
        case 'right':
          snakeNode[0] += 1;
          break;
        case 'left':
          snakeNode[0] -= 1;
          break;
        case 'up':
          snakeNode[1] -= 1;
          break;
        case 'down':
          snakeNode[1] += 1;
          break;
        default:
          break;
      }
    }
  }

  /**
   * Increases the length of the snake by one.
   */
  increaseLength() {
    this.length += 1;
    switch (this.body[this.body.length - 1][2]) {
      case 'right':
        this.body.push([
          this.body[this.body.length - 1][0] - 1,
          this.body[this.body.length - 1][1],
          this.body[this.body.length - 1][2],
        ]);
        break;
      case 'left':
        this.body.push([
          this.body[this.body.length - 1][0] + 1,
          this.body[this.body.length - 1][1],
          this.body[this.body.length - 1][2],
        ]);
        break;
      case 'up':
        this.body.push([
          this.body[this.body.length - 1][0],
          this.body[this.body.length - 1][1] + 1,
          this.body[this.body.length - 1][2],
        ]);
        break;
      case 'down':
        this.body.push([
          this.body[this.body.length - 1][0],
          this.body[this.body.length - 1][1] - 1,
          this.body[this.body.length - 1][2],
        ]);
        break;
      default:
        break;
    }
  }

  /**
   * Changes the direction of the snake.
   * @param  {string} direction - The new direction of the snake.
   */
  changeDirection(direction) {
    if (
      (direction === 'right' || direction === 'left') &&
      (this.body[0][2] === 'left' || this.body[0][2] === 'right')
    )
      return;
    if (
      (direction === 'down' || direction === 'up') &&
      (this.body[0][2] === 'up' || this.body[0][2] === 'down')
    )
      return;
    this.body[0][2] = direction;
  }

  /**
   * Refreshes the direction of every node of the snake.
   */
  refreshDirection() {
    for (let i = this.body.length - 1; i > 0; i -= 1)
      // eslint-disable-next-line prefer-destructuring
      this.body[i][2] = this.body[i - 1][2];
  }

  /**
   * Checks if any node of the snake collides with the head.
   * @returns {boolean} - Whether the snake collides with the head.
   */
  checkCollision() {
    for (let i = 1; i < this.body.length; i += 1)
      if (
        this.body[i][0] === this.body[0][0] &&
        this.body[i][1] === this.body[0][1]
      )
        return true;

    return false;
  }
}
