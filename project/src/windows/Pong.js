class Pong extends Window {
  /**
   * The Pong app.
   * @constructor
   */
  constructor() {
    super('Pong', 'pong', true, 'assets/images/icons/pong.png');
    this.generateElement(this.generateHTML());
  }

  /**
   * Generates the DOM element for the window.
   * @returns {HTMLElement} - The DOM element for the window.
   */
  generateHTML() {
    const frame = document.createElement('iframe');
    frame.src = `/pong/`;
    frame.className = 'pongGame';

    return frame;
  }

  /**
   * Changes the tick speed of the game.
   * @param  {string} speed - The amount of ms a tick takes.
   */
  changeSpeed(speed) {
    this.tickSpeed = 250 - parseInt(speed);
    $(this.elem).find('iframe').attr('src', `/pong`);
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
}

/**
 * Opens the Pong app.
 */
async function openPong() {
  const pong = new Pong();
  pong.render();
  pong.focusGame();

  $('.pongIcon').draggable('disable');
  await sleep(10);
  $('.pongIcon').draggable('enable');
}
