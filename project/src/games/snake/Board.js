class Board {
  /**
   * The Board constructor.
   * @param  {number} tickSpeed - The speed of the game.
   */
  constructor(tickSpeed) {
    const gameBoard = new Array(17);
    for (let i = 0; i < 17; i += 1) {
      gameBoard[i] = [];
      for (let j = 0; j < 17; j += 1) gameBoard[i][j] = new Tile(i, j, 'empty');
    }

    this.gameBoard = gameBoard;
    this.tickSpeed = tickSpeed;
    this.tick = 0;
  }

  /**
   * Generates the board.
   * @param  {Snake} snake - The snake object.
   * @param  {Food} food - The food object.
   */
  generate(snake, food) {
    this.renderSnake(snake);
    this.renderFood(food);
    const { gameBoard } = this;
    const table = $('#gameBoard')[0];
    for (let i = 0; i < 17; i += 1) {
      const row = document.createElement('tr');
      for (let j = 0; j < 17; j += 1) {
        let color;
        if (gameBoard[i][j].contents === 'empty') color = 'black';
        else if (gameBoard[i][j].contents === 'snake') color = 'green';
        else if (gameBoard[i][j].contents === 'food') color = 'red';

        const cell = document.createElement('td');
        cell.className = `${i},${j}`;
        cell.style.backgroundColor = color;
        cell.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        row.appendChild(cell);
      }
      table.appendChild(row);
    }

    this.gameBoard = gameBoard;
    this.interval = setInterval(() => {
      this.tick += 1;

      snake.move();
      this.refresh(snake, food);
      snake.refreshDirection();
      if (snake.checkCollision()) this.lose();
    }, this.tickSpeed);
  }

  /**
   * Renders the snake into the board.
   * @param  {Snake} snake - The snake object.
   */
  renderSnake(snake) {
    const snakeBody = snake.body;
    for (let i = 0; i < snakeBody.length; i += 1)
      this.gameBoard[snakeBody[i][1]][snakeBody[i][0]].contents = 'snake';
  }

  /**
   * Renders the food into the board.
   * @param  {Food} food - The food object.
   */
  renderFood(food) {
    this.gameBoard[food.y][food.x].contents = 'food';
  }

  /**
   * Refreshes the board.
   * @param  {Snake} snake - The snake object.
   * @param  {Food} food - The food object.
   */
  refresh(snake, food) {
    this.clear();
    this.renderFood(food);

    try {
      this.renderSnake(snake);
    } catch (e) {
      this.lose();
    }

    if (snake.body[0][0] === food.x && snake.body[0][1] === food.y) {
      snake.increaseLength();
      food.eat(snake);
    }

    this.render();
  }

  /**
   * Clears the board.
   */
  clear() {
    for (let i = 0; i < 17; i += 1)
      for (let j = 0; j < 17; j += 1) this.gameBoard[i][j].contents = 'empty';
  }

  /**
   * Called when the user loses the game.
   */
  lose() {
    clearInterval(this.interval);
    this.clear();

    const url = new URLSearchParams(window.location.search);
    window.parent.postMessage(`LOST_GAME ${url.get('id')}`);
  }

  /**
   * Renders the board into the window.
   */
  render() {
    for (let i = 0; i < 17; i += 1)
      for (let j = 0; j < 17; j += 1) {
        const cell = document.getElementsByClassName(`${i},${j}`)[0];
        if (this.gameBoard[i][j].contents === 'empty')
          cell.style.backgroundColor = 'black';
        else if (this.gameBoard[i][j].contents === 'snake')
          cell.style.backgroundColor = 'green';
        else if (this.gameBoard[i][j].contents === 'food')
          cell.style.backgroundColor = 'red';
      }
  }
}
