class MyComputer extends Folder {
  /**
   * The My Computer folder.
   * @param  {function} callback - The function that will be called when the folder is opened.
   * @constructor
   */
  constructor(callback) {
    super(
      'My Computer',
      'myComputer',
      true,
      'assets/images/icons/computer.png',
      null,
      callback
    );
    this.setDrivesList();
    this.icons = [];
  }

  /**
   * Called in addition to the close function when the folder is closed.
   */
  closeCallback() {
    this.icons.forEach((icon) => {
      iconClasses.splice(iconClasses.indexOf(icon), 1);
    });
  }

  /**
   * Sets the list of drives to be displayed in the folder. Necessary for getDrivesList to run asynchronously.
   */
  setDrivesList() {
    this.drivesList = this.getDrivesList((list) => {
      this.generate(list);
      list.forEach((icon) => {
        iconClasses.push(icon);
        this.icons.push(icon);
      });
    });
  }

  /**
   * Retrieves the list of drives from the server.
   * @param  {function} callback
   */
  getDrivesList(callback) {
    const drivesList = [];
    $.getJSON('/assets/json/computerIcons.json', (data) => {
      const ids = Object.keys(data);
      for (let i = 0; i < ids.length; i += 1) {
        const id = ids[i];
        const iconData = data[id];
        const iconClass = new Icon(
          iconData.displayName,
          iconData.iconImage,
          id,
          'myComputer'
        );
        iconClass.generateElement();
        drivesList.push(iconClass);

        if (i === ids.length - 1) callback(drivesList);
      }
    });
  }
}

/**
 * Opens the My Computer folder.
 */
function openMyComputer() {
  const myComputer = new MyComputer(() => {
    myComputer.render();
  });
}
