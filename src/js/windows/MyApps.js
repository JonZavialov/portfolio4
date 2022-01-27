class MyApps extends Folder {
  constructor(callback) {
    super(
      'My Apps',
      'myApps',
      true,
      'assets/images/icons/appsdir.png',
      null,
      callback
    );
    this.#setAppsList();
    this.icons = [];
  }

  closeCallback() {
    this.icons.forEach((icon) => {
      iconClasses.splice(iconClasses.indexOf(icon), 1);
    });
  }

  #setAppsList() {
    //necessary for getAppsList to run asynchronously
    this.appsList = this.#getAppsList((list) => {
      this.generate(list);
      list.forEach((icon) => {
        iconClasses.push(icon);
        this.icons.push(icon);
      });
    });
  }

  #getAppsList(callback) {
    let appsList = [];
    $.getJSON('/assets/json/desktop.json', (data) => {
      let ids = Object.keys(data);
      for (let i = 0; i < ids.length; i++) {
        let id = ids[i];
        let iconData = data[id];
        if (iconData['type'] === 'app') {
          let iconClass = new Icon(
            iconData.displayName,
            iconData.iconImage,
            id + 'App',
            'myApps',
            window[iconData.clickFunction]
          );
          iconClass.generateElement();
          appsList.push(iconClass);
        }
        if (i == ids.length - 1) {
          callback(appsList);
        }
      }
    });
  }
}

function openMyApps() {
  let myApps = new MyApps(() => {
    myApps.render();
  });
}
