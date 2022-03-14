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
    container.style.display = 'flex';

    const frame = document.createElement('iframe');
    frame.src = `/snake/index.html?id=${this.gameId}&tickSpeed=${this.tickSpeed}`;
    frame.className = 'snakeGame';
    container.append(frame);

    const speedSelector = document.createElement('div');
    speedSelector.innerHTML = `
    <label for="range23">Slow</label> 
    <input id="range23" type="range" min="0" max="249" value="125" />
    <label for="range24">Fast</label>`;
    speedSelector.id = 'snakeSpeedSelector';
    speedSelector.className = 'field-row';
    speedSelector.onchange = () =>
      this.changeSpeed(speedSelector.children[1].value);
    container.append(speedSelector);

    const resetButton = document.createElement('button');
    resetButton.className = 'snakeButton';
    resetButton.innerText = 'Reset';
    resetButton.onclick = () => this.reset();
    container.append(resetButton);

    const scoreLabel = document.createElement('p');
    scoreLabel.className = 'snakeScoreLabel';
    scoreLabel.innerText = 'Score:';
    scoreLabel.style.transform = 'translate(393px, 69px)';
    container.append(scoreLabel);

    const score = document.createElement('p');
    score.className = 'snakeScore';
    score.id = 'snakeScore';
    score.innerText = this.length - 3;
    score.style.transform = 'translate(395px, 81px)';
    container.append(score);

    const highScoreLabel = document.createElement('p');
    highScoreLabel.className = 'snakeScoreLabel';
    highScoreLabel.innerText = 'High Score:';
    highScoreLabel.style.transform = 'translate(458px, 69px)';
    container.append(highScoreLabel);

    const highScore = document.createElement('p');
    highScore.className = 'snakeScore';
    highScore.id = 'snakeHighScore';
    highScore.innerText = this.highScore;
    highScore.style.transform = 'translate(475px, 81px)';
    container.append(highScore);

    const lostText = document.createElement('p');
    lostText.className = 'snakeLostText';
    container.append(lostText);

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
function snakeEvent(e) {
  if (
    typeof e.data !== 'string' ||
    e.origin.indexOf(window.location.hostname) === -1
  )
    return;

  snakeList.forEach((snakeWindow) => {
    if (snakeWindow.id.toString() === e.data.split(' ')[1])
      if (e.data.indexOf('LOST_GAME') !== -1) snakeWindow.obj.lostGame();
      else if (e.data.indexOf('ATE_APPLE') !== -1) snakeWindow.obj.ateApple();
  });
}
