class MyApps extends Folder {
  /**
   * The My Apps folder.
   * @param  {function} callback - The function that will be called when the folder is opened.
   * @constructor
   */
  constructor(callback) {
    super(
      'My Apps',
      'myApps',
      true,
      'assets/images/icons/appsdir.png',
      null,
      callback
    );
    this.setAppsList();
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
   * Sets the list of apps to be displayed in the folder. Necessary for getAppsList to run asynchronously.
   */
  setAppsList() {
    this.appsList = this.getAppsList((list) => {
      this.generate(list);
      list.forEach((icon) => {
        iconClasses.push(icon);
        this.icons.push(icon);
      });
    });
  }

  /**
   * Retrieves the list of apps from the server.
   * @param  {function} callback
   */
  getAppsList(callback) {
    const appsList = [];
    $.getJSON('/assets/json/desktop.json', (data) => {
      const ids = Object.keys(data);
      for (let i = 0; i < ids.length; i += 1) {
        const id = ids[i];
        const iconData = data[id];
        if (iconData.type === 'app') {
          const iconClass = new Icon(
            iconData.displayName,
            iconData.iconImage,
            `${id}App`,
            'myApps',
            window[iconData.clickFunction]
          );
          iconClass.generateElement();
          appsList.push(iconClass);
        }
        if (i === ids.length - 1) {
          callback(appsList);
        }
      }
    });
  }
}

/**
 * Opens the My Apps folder.
 */
function openMyApps() {
  const myApps = new MyApps(() => {
    myApps.render();
  });
}
