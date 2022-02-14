class Snake extends Window {
  /**
   * The Snake Game app.
   */
  constructor() {
    super('Snake', 'snake', true, 'assets/images/icons/joystick.png', () =>
      this.closeSnake()
    );
    this.gameId = Math.random();
    this.highScore = 0;
    this.generateElement(this.getHTML());
  }

  /**
   * Generates the DOM element for the window.
   * @returns {HTMLElement} - The DOM element for the window.
   */
  getHTML() {
    const container = document.createElement('div');
    container.style.display = 'flex';

    const frame = document.createElement('iframe');
    frame.src = `/snake/index.html?id=${this.gameId}`;
    frame.className = 'snakeGame';
    container.append(frame);
    // TODO: Add speed selector and other configs.
    const resetButton = document.createElement('button');
    resetButton.className = 'snakeButton';
    resetButton.innerText = 'Reset';
    resetButton.onclick = () => this.reset();
    container.append(resetButton);

    const highScoreLabel = document.createElement('p');
    highScoreLabel.className = 'snakeHighScoreLabel';
    highScoreLabel.innerText = 'High Score:';
    container.append(highScoreLabel);

    const highScore = document.createElement('p');
    highScore.className = 'snakeHighScore';
    highScore.innerText = this.highScore;
    container.append(highScore);

    return container;
  }

  /**
   * Resets the game.
   */
  reset() {
    $(this.elem).find('.snakeButton')[0].style.boxShadow =
      'rgb(255 255 255) -1px -1px inset, rgb(10 10 10) 1px 1px inset, rgb(223 223 223) -2px -2px inset, rgb(128 128 128) 2px 2px inset';

    $(this.elem).find('iframe')[0].contentWindow.location.reload();
    this.focusGame();
  }

  /**
   * Focuses the game.
   * @async
   */
  async focusGame() {
    await sleep(10);
    $(this.elem).find('iframe')[0].contentWindow.focus();
  }

  /**
   * Closes the Snake game.
   */
  closeSnake() {
    this.close();

    snakeList.forEach((snakeWindow) => {
      if (snakeWindow.id === this.gameId)
        snakeList.splice(snakeList.indexOf(snakeWindow), 1);
    });
  }

  /**
   * Activated when the user loses the game.
   * @param  {number} length - The length of the snake.
   */
  lostGame(length) {
    $(this.elem).find('.snakeButton')[0].style.boxShadow = null;

    if (length <= this.highScore) return;
    this.highScore = length - 3;
    $(this.elem).find('.snakeHighScore').text(this.highScore);
  }
}

/**
 * Opens the Snake Game app.
 */
async function openSnake() {
  const snake = new Snake();
  snake.render();
  snake.focusGame();

  $('.snakeIcon').draggable('disable');
  await sleep(10);
  $('.snakeIcon').draggable('enable');

  try {
    snakeList;
  } catch (e) {
    snakeList = [];
  }

  snakeList.push({
    id: snake.gameId,
    obj: snake,
  });
}

/**
 * Activated when the user loses a snake game.
 * @param  {Event} e - The event.
 */
function lostSnakeGame(e) {
  if (
    typeof e.data !== 'string' ||
    e.origin.indexOf(window.location.hostname) === -1 ||
    e.data.indexOf('LOST_GAME') === -1
  )
    return;

  snakeList.forEach((snakeWindow) => {
    if (snakeWindow.id.toString() === e.data.split(' ')[1])
      snakeWindow.obj.lostGame(e.data.split(' ')[2]);
  });
}
