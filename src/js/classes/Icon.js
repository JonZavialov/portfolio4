class Icon {
  constructor(displayName, iconImagePath, className, parent, clickFunction) {
    this.displayName = displayName;
    this.iconImagePath = iconImagePath;
    this.className = className;
    this.parent = parent;
    this.selected = false;
    this.clickFunction = clickFunction;
  }

  generateElement() {
    this.iconElem = document.createElement("div");
    this.iconElem.className = this.className + " " + this.parent + "Icon";
    this.iconElem.id = "icon";
    if (this.parent == "desktop") this.iconElem.style.borderColor = "#008080";
    else this.iconElem.style.borderColor = "white";

    let iconImage = document.createElement("img");
    iconImage.src = this.iconImagePath;
    this.iconElem.appendChild(iconImage);

    let iconLabel = document.createElement("p");
    iconLabel.innerHTML = this.displayName;
    this.iconElem.appendChild(iconLabel);

    this.iconElem.onmousedown = (e) => {
      this.onClick(e);
    };
  }

  renderIntoColumn(element) {
    element.appendChild(this.iconElem);
  }

  onClick(e) {
    removeAllBorders(e.target.className);
    if (this.selected) {
      //object was double clicked
      this.removeBorder();
      this.doubleClick();
    } else {
      //object was single clicked
      let borderColor;
      if (this.parent == "desktop") borderColor = "white";
      else borderColor = "blue";
      this.iconElem.style.borderColor = borderColor;
      this.selected = true;
    }
  }

  doubleClick() {
    if (typeof this.clickFunction === "function") this.clickFunction();
  }

  selectWithBox() {
    if (this.selected) return;
    this.iconElem.style.borderColor = "white";
    this.selected = true;
  }

  removeBorder(unselect = true) {
    let borderColor;
    if (this.parent == "desktop") borderColor = "#008080";
    else borderColor = "white";
    this.iconElem.style.borderColor = borderColor;
    if (unselect) this.selected = false;
  }
}
