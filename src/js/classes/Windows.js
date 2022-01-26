class Window {
  constructor(
    displayName,
    id,
    taskbar = false,
    iconPath = null,
    closeFunction = null
  ) {
    this.displayName = displayName;
    this.id = id;
    this.taskbar = taskbar;
    this.iconPath = iconPath;
    this.closeFunction = closeFunction;
  }

  generateElement(contentElements) {
    this.elem = document.createElement("div");
    this.elem.className = "window windowClass";
    this.elem.id = this.id;

    let titleBar = this.#createTitleBar();
    let windowBody = document.createElement("div");
    windowBody.className = "window-body";
    windowBody.appendChild(contentElements);

    this.elem.appendChild(titleBar);
    this.elem.appendChild(windowBody);
    this.elem.style.position = "absolute";

    $(this.elem).draggable({
      handle: `#${this.id}Header`,
      containment: "#desktop",
      stack: ".windowClass",
    });

    let length = $(".window")
      .map((elmnt) => {
        return elmnt;
      })
      .get().length;

    this.elem.style.top =
      $("#desktop")[0].getBoundingClientRect().top + 60 + 30 * length + "px";
    this.elem.style.left =
      $("#desktop")[0].getBoundingClientRect().left + 50 * length + "px";
  }

  render() {
    $("#desktop").append(this.elem);

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

  #createTitleBar() {
    let titleBar = document.createElement("div");
    titleBar.className = "title-bar";
    titleBar.id = this.id + "Header";

    let titleBarText = document.createElement("div");
    titleBarText.className = "title-bar-text";
    if (this.iconPath)
      titleBarText.innerHTML = `<img src="${this.iconPath}" alt="${this.id}"> ${this.displayName}`;
    else titleBarText.innerHTML = this.displayName;

    let titleBarControls = document.createElement("div");
    titleBarControls.className = "title-bar-controls";

    let minimizeButton = document.createElement("button");
    minimizeButton.ariaLabel = "Minimize";

    let closeButton = document.createElement("button");
    closeButton.ariaLabel = "Close";
    if (!this.closeFunction) {
      closeButton.onclick = () => {
        this.close();
      };
    } else closeButton.onclick = this.closeFunction;

    titleBarControls.appendChild(minimizeButton);
    titleBarControls.appendChild(closeButton);
    titleBar.appendChild(titleBarText);
    titleBar.appendChild(titleBarControls);

    return titleBar;
  }

  close() {
    this.elem.remove();
    if (this.taskbarElement) this.taskbarElement.checkForClose();
    if (this.closeCallback) this.closeCallback();
  }
}
