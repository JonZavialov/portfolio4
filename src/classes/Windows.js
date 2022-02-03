class Window {
  /**
   * The window class.
   * @param  {string} displayName - The name that will be displayed for the window.
   * @param  {string} id - The id of the window which will be used to identify it.
   * @param  {boolean} [taskbar=false] - Whether or not the window instance will be displayed in the taskbar.
   * @param  {string} [iconPath=null] - The path to the icon that will be displayed for the window.
   * @param  {function} [closeFunction=null] - The function that will be called when the window is closed. If null, the default close function will be used.
   * @param  {string} [windowName=null] - An alternate name for the window, provided if the title of the window is not the same as the taskbar title.
   * @constructor
   */
  constructor(
    displayName,
    id,
    taskbar = false,
    iconPath = null,
    closeFunction = null,
    windowName = null
  ) {
    this.displayName = displayName;
    this.id = id;
    this.taskbar = taskbar;
    this.iconPath = iconPath;
    this.closeFunction = closeFunction;
    this.windowName = windowName;
  }

  /**
   * Generates the DOM element for the window.
   * @param  {HTMLElement} contentElements - The elements that will be displayed in the window.
   */
  generateElement(contentElements) {
    this.elem = document.createElement('div');
    this.elem.className = 'window windowClass';
    this.elem.id = this.id;

    const titleBar = this.createTitleBar();
    const windowBody = document.createElement('div');
    windowBody.className = 'window-body';
    windowBody.append(contentElements);

    this.elem.append(titleBar, windowBody);
    this.elem.style.position = 'absolute';

    $(this.elem).draggable({
      handle: `#${this.id}Header`,
      containment: '#desktop',
      stack: '.windowClass',
    });

    const { length } = $('.window')
      .map((element) => element)
      .get();

    this.elem.style.top = `${
      $('#desktop')[0].getBoundingClientRect().top + 60 + 30 * length
    }px`;
    this.elem.style.left = `${
      $('#desktop')[0].getBoundingClientRect().left + 50 * length
    }px`;
  }

  /**
   * Renders the window into the DOM.
   */
  render() {
    $('#desktop').append(this.elem);

    if (this.taskbar) {
      this.taskbarElement = new TaskbarElement(
        this.displayName,
        this.id,
        this.iconPath
      );
      this.taskbarElement.generateElement();
      this.taskbarElement.render();
    }
  }

  /**
   * Creates the title bar for the window.
   * @returns {HTMLElement} - The title bar element.
   */
  createTitleBar() {
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.id = `${this.id}Header`;

    const titleBarText = document.createElement('div');
    titleBarText.className = 'title-bar-text';
    if (this.iconPath) {
      console.log(this.windowName);
      const titleText = this.windowName ? this.windowName : this.displayName;
      titleBarText.innerHTML = `<img src="${this.iconPath}" alt="${this.id}"> ${titleText}`;
    } else titleBarText.innerHTML = this.displayName;

    const titleBarControls = document.createElement('div');
    titleBarControls.className = 'title-bar-controls';

    const minimizeButton = document.createElement('button');
    minimizeButton.ariaLabel = 'Minimize';
    // TODO: Add functionality to minimize the window.

    const closeButton = document.createElement('button');
    closeButton.ariaLabel = 'Close';
    if (!this.closeFunction) closeButton.onclick = () => this.close();
    else closeButton.onclick = this.closeFunction;

    titleBarControls.append(minimizeButton, closeButton);
    titleBar.append(titleBarText, titleBarControls);

    return titleBar;
  }

  /**
   * Closes the window and removes taskbar elements.
   */
  close() {
    this.elem.remove();
    if (this.taskbarElement) this.taskbarElement.checkForClose();
    if (this.closeCallback) this.closeCallback();
  }
}
