class TaskbarElement {
  /**
   * The button that shows up in the taskbar for each window.
   * @param  {string} displayName - The name to be displayed in the taskbar.
   * @param  {string} id - The id of the element the taskbar element will be associated with.
   * @param  {string} iconPath - The path to the icon that will be displayed in the taskbar.
   * @constructor
   */
  constructor(displayName, id, iconPath) {
    this.displayName = displayName;
    this.iconPath = iconPath;
    this.id = id;
  }

  /**
   * Generates the DOM element for the taskbar element.
   */
  generateElement() {
    this.elem = document.createElement('button');
    this.elem.className = 'taskbar-element';
    this.elem.id = `${this.id}TaskbarElement`;
    this.elem.innerHTML = `<img src="${this.iconPath}" alt="${this.id}"> <p>${this.displayName}</p>`;
  }

  /**
   * Renders the taskbar element into the DOM.
   */
  render() {
    if ($(`[id='${this.id}']`).length > 1) return;
    $('#taskbarIcons').append(this.elem);
  }

  /**
   * Checks if the window that the taskbar element is associated with is closed.
   */
  checkForClose() {
    if ($(`[id='${this.id}']`).length === 0)
      $(`#${this.id}TaskbarElement`).remove();
  }
}
