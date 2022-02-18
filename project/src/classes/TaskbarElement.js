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
    this.elem.onclick = () => this.unminimizeAll();
  }

  /**
   * Checks if the taskbar is about to overflow so it can shrink the icons.
   */
  checkForOverflow() {
    const desktopClockX = $('#desktopClock')[0].getBoundingClientRect().x;
    const lastIconX = $(this.elem)[0].getBoundingClientRect().right;

    console.log(taskbarShrinkNum, windowsTaskbarMap.size);

    if (
      desktopClockX - 100 < lastIconX ||
      taskbarShrinkNum <= windowsTaskbarMap.size
    )
      shrinkTaskbarElems();
    else if (taskbarShrinkNum > windowsTaskbarMap.size) expandTaskbarElems();
  }

  /**
   * Renders the taskbar element into the DOM.
   */
  render() {
    if (windowsTaskbarMap.get(this.id).windows.length > 1) return;
    $('#taskbarIcons').append(this.elem);
    this.topRect = this.elem.getBoundingClientRect().top;
    this.leftRect = this.elem.getBoundingClientRect().left;
    this.width = $(this.elem).width();
    this.checkForOverflow();
  }

  /**
   * Checks if the window that the taskbar element is associated with is closed.
   */
  checkForClose() {
    if (windowsTaskbarMap.get(this.id).windows.length !== 0) return;
    $(`#${this.id}TaskbarElement`).remove();
    windowsTaskbarMap.delete(this.id);
    this.checkForOverflow();
  }

  unminimizeAll() {
    windowsTaskbarMap
      .get(this.id)
      .windows.forEach((window) => window.unminimize());
  }
}
