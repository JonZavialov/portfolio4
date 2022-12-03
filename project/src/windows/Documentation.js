class Documentation extends Window {
  /**
   * The documentation app.
   * @constructor
   */
  constructor() {
    super('JonZav API - Microsoft Internet Explorer', 'documentation', true, 'assets/images/icons/internet.png');
    this.generateElement(this.generateHTML());
  }

  /**
   * Generates the DOM element of the window.
   * @returns {HTMLElement} - The DOM element of the window.
   */
  generateHTML() {
    return 'sus'
  }
}

/**
 * Opens the documentation app.
 */
function openDocumentation() {
    const documentation = new Documentation();
    documentation.render()
}