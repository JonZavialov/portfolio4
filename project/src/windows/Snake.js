class Snake extends Window {
  /**
   * The Snake Game app.
   * @constructor
   */
  constructor() {
    super('Snake', 'snake', true, 'assets/images/icons/snake.png', () =>
      this.closeSnake()
    );
    this.gameId = Math.random();
    this.length = 3;
    this.highScore = 0;
    this.tickSpeed = 125;
    this.generateElement(this.getHTML());
  }

  /**
   * Generates the DOM element for the window.
   * @returns {HTMLElement} - The DOM element for the window.
   */
  getHTML() {
    const container = document.createElement('div');

    addNodesToDom(container, 'Snake.html', (vars) => {
      const { frame, speedSelector, resetButton, snakeScore, highScore } = vars;

      speedSelector.onchange = () =>
        this.changeSpeed(speedSelector.children[1].value);

      resetButton.onclick = () => this.reset();

      snakeScore.innerText = this.length - 3;
      highScore.innerText = this.highScore;

      frame.src = `/snake/index.html?id=${this.gameId}&tickSpeed=${this.tickSpeed}`;
    });

    return container;
  }

  /**
   * Changes the tick speed of the game.
   * @param  {string} speed - The amount of ms a tick takes.
   */
  changeSpeed(speed) {
    this.tickSpeed = 250 - parseInt(speed);
    $(this.elem)
      .find('iframe')
      .attr(
        'src',
        `/snake/index.html?id=${this.gameId}&tickSpeed=${this.tickSpeed}`
      );
    this.focusGame();
  }

  /**
   * Activated when the user eats an apple.
   */
  ateApple() {
    this.length += 1;
    $(this.elem).find('#snakeScore')[0].innerText = this.length - 3;
    if (this.length - 3 > this.highScore) {
      this.highScore = this.length - 3;
      $(this.elem).find('#snakeHighScore').text(this.highScore);
    }
  }

  /**
   * Resets the game.
   */
  reset() {
    $(this.elem).find('.snakeButton')[0].style.boxShadow =
      'rgb(255 255 255) -1px -1px inset, rgb(10 10 10) 1px 1px inset, rgb(223 223 223) -2px -2px inset, rgb(128 128 128) 2px 2px inset';
    $(this.elem).find('.snakeLostText')[0].innerText = '';

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
   */
  lostGame() {
    this.length = 3;
    $(this.elem).find('.snakeButton')[0].style.boxShadow = null;
    $(this.elem).find('#snakeScore')[0].innerText = this.length - 3;
    $(this.elem).find('.snakeLostText')[0].innerText = 'You lost!';
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

  snakeList.push({
    id: snake.gameId,
    obj: snake,
  });
}

/**
 * Activated when the user loses a snake game.
 * @param  {Event} e - The event.
 */
function snakeEvent(e) {
  if (
    typeof e.data !== 'string' ||
    e.origin.indexOf(window.location.hostname) === -1
  )
    return;

  try {
    snakeList.forEach((snakeWindow) => {
      if (snakeWindow.id.toString() === e.data.split(' ')[1])
        if (e.data.indexOf('LOST_GAME') !== -1) snakeWindow.obj.lostGame();
        else if (e.data.indexOf('ATE_APPLE') !== -1) snakeWindow.obj.ateApple();
    });
  } catch (err) {
    snakeList = [];
  }
}
