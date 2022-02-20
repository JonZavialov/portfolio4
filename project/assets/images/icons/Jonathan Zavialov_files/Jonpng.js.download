class Jonpng extends Window {
  /**
   * The Jonpng app.
   * @constructor
   */
  constructor() {
    super('jon.png', 'Jonpng', true, 'assets/images/icons/image.png');
    this.generateElement(this.generateHTML());
  }

  /**
   * Generates the DOM element of the window.
   * @returns {HTMLElement} - The DOM element of the window.
   */
  generateHTML() {
    const image = document.createElement('img');
    image.src = 'assets/images/jon.png';
    image.alt = 'jon.png';
    image.className = 'jonpng';
    return image;
  }
}

/**
 * Opens the Jonpng app.
 */
function openJonpng() {
  const jonpng = new Jonpng();
  jonpng.render();
}
