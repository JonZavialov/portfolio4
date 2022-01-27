class Folder extends Window {
  /**
   * A separate class for folder windows.
   * @param  {string} displayName - The name that will be displayed for the folder.
   * @param  {string} id - The id of the folder which will be used to identify it.
   * @param  {boolean} [taskbar=false] - Whether or not the window instance will be displayed in the taskbar.
   * @param  {?string} [iconPath=null] - The path to the icon that will be displayed for the folder.
   * @param  {function} [closeFunction=null] - The function that will be called when the folder is closed. If null, the default close function will be used.
   * @param  {function} [callback=null] - The function that will be called when the folder is opened.
   * @constructor
   */
  constructor(
    displayName,
    id,
    taskbar = false,
    iconPath = null,
    closeFunction = null,
    callback = null
  ) {
    super(displayName, id, taskbar, iconPath, closeFunction);
    this.callback = callback;
  }

  /**
   * Generates the DOM element for the folder.
   * @param  {Icon[]} iconsList - The list of icons that will be displayed in the folder upon generation.
   */
  generate(iconsList) {
    let contents = document.createElement('div');
    contents.className = this.id + 'Contents folderContent';
    if (iconsList) {
      let i = 0;
      iconsList.forEach((icon) => {
        i++;
        this.addIcon(icon, contents, i);
      });
    }
    this.generateElement(contents);
    if (this.callback) this.callback();
  }

  /**
   * Adds an icon to the folder.
   * @param  {Icon} icon - The icon that will be added to the folder.
   * @param  {HTMLElement} parent - The parent element that the new icon column will be appended to, should it be necessary.
   * @param  {number} listIndex - The index of the icon in the list of icons.
   */
  addIcon(icon, parent, listIndex) {
    if (listIndex == 1 || (listIndex - 1) % 5 == 0) {
      this.currentRow = document.createElement('div');
      this.currentRow.className = 'recycleBinRow';
      parent.append(this.currentRow);
    }
    icon.renderIntoColumn(this.currentRow);
    icon.iconElem.style.marginLeft = '18px';
  }
}
