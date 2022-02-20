class RecycleBin extends Folder {
  /**
   * The Recycle Bin folder.
   * @constructor
   */
  constructor() {
    super('Recycle Bin', 'recycleBin', true, 'assets/images/icons/recycle.png');
    const recycledIconsList = [];
    recycledIcons.forEach((icon) => {
      const recycledIcon = this.generateRecycledIcon(icon);
      recycledIcon.generateElement();
      recycledIconsList.push(recycledIcon);
    });
    this.generate(recycledIconsList);
  }

  /**
   * Called in addition to the close function when the folder is closed.
   */
  closeCallback() {
    recycleBinWindows.splice(recycleBinWindows.indexOf(this), 1);
  }

  /**
   * Generates a recycled icon from a regular icon.
   * @param  {Icon} icon - The icon.
   * @returns {Icon} - The recycled icon.
   */
  generateRecycledIcon(icon) {
    const recycledIcon = new Icon(
      icon.displayName,
      icon.iconImagePath,
      icon.className,
      'recycleBin',
      null,
      false
    );
    return recycledIcon;
  }
}

/**
 * Opens the Recycle Bin folder.
 */
function openRecycleBin() {
  const recycleBin = new RecycleBin();
  recycleBin.render();
  try {
    recycleBinWindows.push(recycleBin);
  } catch (e) {
    recycleBinWindows = [];
    recycleBinWindows.push(recycleBin);
  }
}
