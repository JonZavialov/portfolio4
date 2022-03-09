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

    this.MINIMIZE_DURATION = 250;

    // TODO: add URL shortener
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

    // TODO: Make windows open in new diagonal if they overlap.
    const { length } = $('.window')
      .map((element) => element)
      .get();

    this.elem.style.top = `${
      $('#desktop')[0].getBoundingClientRect().top + 60 + 30 * length
    }px`;
    this.elem.style.left = `${
      $('#desktop')[0].getBoundingClientRect().left + 50 * length
    }px`;
    this.elem.style.zIndex = 50;
  }

  /**
   * Renders the window into the DOM.
   */
  render() {
    $('#desktop').append(this.elem);

    if (this.taskbar) {
      if (windowsTaskbarMap.get(this.id)) {
        windowsTaskbarMap.set(this.id, {
          'taskbarClass': windowsTaskbarMap.get(this.id).taskbarClass,
          'windows': windowsTaskbarMap.get(this.id).windows.concat(this),
        });
        this.taskbarElement = windowsTaskbarMap.get(this.id).taskbarClass;
      } else {
        this.taskbarElement = new TaskbarElement(
          this.displayName,
          this.id,
          this.iconPath
        );

        windowsTaskbarMap.set(this.id, {
          'taskbarClass': this.taskbarElement,
          'windows': [this],
        });
      }

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
      const titleText = this.windowName ? this.windowName : this.displayName;
      titleBarText.innerHTML = `<img src="${this.iconPath}" alt="${this.id}"> ${titleText}`;
    } else titleBarText.innerHTML = this.displayName;

    const titleBarControls = document.createElement('div');
    titleBarControls.className = 'title-bar-controls';

    let minimizeButton;
    if (this.taskbar) {
      minimizeButton = document.createElement('button');
      minimizeButton.ariaLabel = 'Minimize';
      minimizeButton.onclick = () => this.minimize();
    }

    const closeButton = document.createElement('button');
    closeButton.ariaLabel = 'Close';
    closeButton.onclick = !this.closeFunction
      ? () => this.close() // TODO: wtf is this
      : this.closeFunction;

    minimizeButton ? titleBarControls.append(minimizeButton) : null;
    titleBarControls.append(closeButton);
    titleBar.append(titleBarText, titleBarControls);

    return titleBar;
  }

  /**
   * Closes the window and removes taskbar elements.
   */
  close() {
    this.elem.remove();

    if (this.taskbarElement) {
      const windowArray = windowsTaskbarMap.get(this.id).windows;
      windowArray.splice(windowArray.indexOf(this), 1);
      windowsTaskbarMap.set(this.id, {
        'taskbarClass': windowsTaskbarMap.get(this.id).taskbarClass,
        'windows': windowArray,
      });

      this.taskbarElement.checkForClose();
    }

    if (this.closeCallback) this.closeCallback();
  }

  /**
   * Minimizes the window.
   */
  minimize() {
    const titleBar = $(this.elem).find('.title-bar');
    const titleBarClone = titleBar.clone();
    titleBarClone.css({
      'position': 'fixed',
      'top': `${titleBar[0].getBoundingClientRect().top}px`,
      'left': `${titleBar[0].getBoundingClientRect().left}px`,
      'width': `${titleBar.width()}px`,
    });
    const cloneImage = titleBarClone.find('img');
    cloneImage.css({ 'width': '12px' });

    $(this.elem).hide();
    $('body').append(titleBarClone);

    titleBarClone.animate(
      {
        top: `${this.taskbarElement.topRect - 25}px`,
        left: `${this.taskbarElement.leftRect - titleBarClone.width() / 2}px`,
      },
      this.MINIMIZE_DURATION,
      'linear',
      () => titleBarClone.remove()
    );

    const iterations = Math.floor(this.MINIMIZE_DURATION / 10);
    let i = 0;
    const widthTaskbarElem = this.taskbarElement.width;
    const finalSizeProportion = 1 - widthTaskbarElem / titleBarClone.width();
    const shrinkagePerIteration = finalSizeProportion / iterations;
    let shrinkage = 1;
    const sizingInterval = setInterval(() => {
      i += 1;
      shrinkage -= shrinkagePerIteration;
      titleBarClone.css('transform', `scale(${shrinkage})`);
      if (i === iterations) clearInterval(sizingInterval);
    }, 10);
  }

  /**
   * Unminimizes the window.
   */
  unminimize() {
    // TODO: add animation
    $(this.elem).show();
  }
}
