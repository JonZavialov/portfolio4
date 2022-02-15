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
      if (snake.checkCollision()) this.lose(snake);
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
      this.lose(snake);
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
   * @param  {Snake} snake - The snake object.
   */
  lose(snake) {
    // TODO: Change lose screen to trigger something in the parent.

    clearInterval(this.interval);
    this.clear();
    const youWord = [
      [2, 2],
      [2, 3],
      [3, 4],
      [3, 5],
      [4, 3],
      [4, 2],
      [6, 2],
      [6, 3],
      [6, 4],
      [7, 2],
      [7, 5],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
      [6, 5],
      [10, 2],
      [10, 3],
      [10, 4],
      [10, 5],
      [11, 5],
      [12, 5],
      [12, 4],
      [12, 3],
      [12, 2],
    ];
    const loseWord = [
      [2, 8],
      [2, 9],
      [2, 10],
      [2, 11],
      [2, 12],
      [3, 12],
      [4, 12],
      [6, 8],
      [6, 9],
      [6, 10],
      [6, 11],
      [6, 12],
      [7, 12],
      [7, 8],
      [8, 8],
      [8, 12],
      [8, 9],
      [8, 10],
      [8, 11],
      [12, 8],
      [11, 8],
      [10, 8],
      [10, 9],
      [10, 10],
      [11, 10],
      [12, 10],
      [12, 11],
      [12, 12],
      [11, 12],
      [10, 12],
      [15, 8],
      [14, 8],
      [16, 8],
      [14, 9],
      [14, 10],
      [14, 11],
      [14, 12],
      [15, 10],
      [16, 10],
      [15, 12],
      [16, 12],
    ];
    for (let i = 0; i < youWord.length; i += 1)
      this.gameBoard[youWord[i][1]][youWord[i][0] + 1].contents = 'endscreen';

    for (let i = 0; i < loseWord.length; i += 1)
      this.gameBoard[loseWord[i][1] + 1][loseWord[i][0] - 1].contents =
        'endscreen';

    this.render();

    const url = new URLSearchParams(window.location.search);
    window.parent.postMessage(`LOST_GAME ${url.get('id')} ${snake.length}`);
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
        else if (this.gameBoard[i][j].contents === 'endscreen')
          cell.style.backgroundColor = 'yellow';
      }
  }
}
