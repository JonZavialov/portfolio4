class Icon {
  /**
   * The Icon class.
   * @param  {string} displayName - The name that will be displayed for the icon.
   * @param  {string} iconImagePath - The path to the image that will be displayed for the icon.
   * @param  {string} className - The class name of the icon which will be used to identify it.
   * @param  {string} parent - The element which contains the icon.
   * @param  {function} [clickFunction=null] - The function that will be called when the icon is double clicked.
   * @param  {boolean} [selectable=true] - Whether or not the icon can be selected.
   * @constructor
   */
  constructor(
    displayName,
    iconImagePath,
    className,
    parent,
    clickFunction = null,
    selectable = true
  ) {
    this.displayName = displayName;
    this.iconImagePath = iconImagePath;
    this.className = `${className}Icon`;
    this.parent = parent;
    this.selected = false;
    this.clickFunction = clickFunction;
    this.selectable = selectable;
  }

  /**
   * Generates the DOM element for the icon.
   */
  generateElement() {
    this.iconElem = document.createElement('div');
    this.iconElem.className = `${this.className} ${this.parent}Icon`;
    this.iconElem.id = 'icon';
    if (this.parent === 'desktop') this.iconElem.style.borderColor = '#008080';
    else this.iconElem.style.borderColor = '#e7e7e7';

    const iconImage = document.createElement('img');
    iconImage.src = this.iconImagePath;
    this.iconElem.append(iconImage);

    const iconLabel = document.createElement('p');
    iconLabel.innerHTML = this.displayName;
    if (this.parent === 'desktop') iconLabel.style.color = 'white';
    else iconLabel.style.color = 'black';
    this.iconElem.append(iconLabel);

    this.iconElem.onmousedown = (e) => {
      this.onClick(e);
    };
  }

  /**
   * Renders the icon to the provided element.
   * @param  {HTMLElement} element - The element to generate the icon into.
   */
  renderIntoColumn(element) {
    element.append(this.iconElem);
  }

  /**
   * Called when the icon is clicked.
   * @param  {MouseEvent} e - The click event.
   * @listens MouseEvent
   */
  onClick(e) {
    if (!this.selectable) return;
    removeAllBorders(e.target.className);
    if (this.selected) {
      // object was double clicked
      this.removeBorder();
      this.doubleClick();
    } else {
      // object was single clicked
      let borderColor;
      if (this.parent === 'desktop') borderColor = '#e7e7e7';
      else borderColor = 'blue';
      this.iconElem.style.borderColor = borderColor;
      this.selected = true;
    }
  }

  /**
   * Called when the icon is double clicked.
   */
  doubleClick() {
    if (!this.clickFunction) return;
    if (typeof this.clickFunction === 'function') this.clickFunction();
  }

  /**
   * Called when the draggable box selects the icon.
   */
  selectWithBox() {
    if (this.selected) return;
    this.iconElem.style.borderColor = '#e7e7e7';
    this.selected = true;
  }

  /**
   * Removes the border from the icon.
   * @param  {boolean} [unselect=true]
   */
  removeBorder(unselect = true) {
    let borderColor;
    if (this.parent === 'desktop') borderColor = '#008080';
    else borderColor = '#e7e7e7';
    this.iconElem.style.borderColor = borderColor;
    if (unselect) this.selected = false;
  }

  /**
   * Makes the icon draggable.
   */
  makeDraggable() {
    $(this.iconElem).draggable({ containment: '#desktop' });
  }

  /**
   * Checks if the icon is hovering over the recycle bin.
   */
  checkForRecycle() {
    if (this.className === 'recycleBinIcon' || this.parent !== 'desktop')
      return;
    if (doElsCollide($(this.iconElem), $('.recycleBinIcon'))) {
      this.hoveringOverRecycleBin = true;
      this.iconElem.style.opacity = 0.5;
      this.removeBorder();
    } else {
      this.hoveringOverRecycleBin = false;
      this.iconElem.style.opacity = 1;
    }
  }

  /**
   * Checks if the icon was released over the recycle bin.
   */
  checkForReleasedOverRecycle() {
    if (!this.hoveringOverRecycleBin) return;

    this.iconElem.style.transform = 'scale(0)';
    iconClasses.splice(iconClasses.indexOf(this), 1);
    recycledIcons.push(this);

    try {
      recycleBinWindows.forEach((recycleClass) => {
        const newIcon = recycleClass.generateRecycledIcon(this);
        newIcon.generateElement();
        recycleClass.addIcon(
          newIcon,
          recycleClass.elem.getElementsByClassName('recycleBinContents')[0],
          recycledIcons.length
        );
      });
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}
