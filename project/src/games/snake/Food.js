class Food {
  /**
   * The Food constructor.
   * @param  {number} x - The x coordinate of the food.
   * @param  {number} y - The y coordinate of the food.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Called when the snake eats the food.
   * @param  {Snake} snake - The snake object.
   */
  eat(snake) {
    this.x = Math.floor(Math.random() * 16);
    this.y = Math.floor(Math.random() * 16);
    for (let i = 0; i < snake.body.length; i += 1)
      while (snake.body[i][0] === this.x && snake.body[i][1] === this.y)
        this.eat(snake);
  }
}
