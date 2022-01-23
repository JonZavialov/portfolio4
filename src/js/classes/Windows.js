class Window {
  constructor(
    displayName,
    id,
    contentElements,
    iconPath = null,
    closeFunction = null
  ) {
    this.displayName = displayName;
    this.iconPath = iconPath;
    this.id = id;
    this.contentElements = contentElements;
    this.closeFunction = closeFunction;
  }

  generateElement() {
    this.elem = document.createElement("div");
    this.elem.className = "window";
    this.elem.id = this.id;

    let titleBar = this.#createTitleBar();
    let windowBody = document.createElement("div");
    windowBody.className = "window-body";
    windowBody.appendChild(this.contentElements);

    this.elem.appendChild(titleBar);
    this.elem.appendChild(windowBody);
    this.elem.style.position = "absolute";

    $(this.elem).draggable({
      handle: `#${this.id}Header`,
      containment: "#desktop",
    });
  }

  render() {
    $("#desktop").append(this.elem);
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

    titleBarControls.appendChild(minimizeButton);
    titleBarControls.appendChild(closeButton);
    titleBar.appendChild(titleBarText);
    titleBar.appendChild(titleBarControls);

    return titleBar;
  }
}
