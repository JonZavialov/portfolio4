class MyComputer extends Folder {
  constructor(callback) {
    super(
      "My Computer",
      "myComputer",
      true,
      "assets/images/icons/computer.png",
      null,
      callback
    );
    this.#setDrivesList();
    this.icons = [];
  }

  closeCallback() {
    this.icons.forEach((icon) => {
      iconClasses.splice(iconClasses.indexOf(icon), 1);
    });
  }

  #setDrivesList() {
    //necessary for getDrivesList to run asynchronously
    this.drivesList = this.#getDrivesList((list) => {
      this.generate(list);
      list.forEach((icon) => {
        iconClasses.push(icon);
        this.icons.push(icon);
      });
    });
  }

  #getDrivesList(callback) {
    let drivesList = [];
    $.getJSON("/assets/json/computerIcons.json", (data) => {
      let ids = Object.keys(data);
      for (let i = 0; i < ids.length; i++) {
        let id = ids[i];
        let iconData = data[id];
        let iconClass = new Icon(
          iconData.displayName,
          iconData.iconImage,
          id,
          "myComputer"
        );
        iconClass.generateElement();
        drivesList.push(iconClass);

        if (i == ids.length - 1) {
          callback(drivesList);
        }
      }
    });
  }
}

function openMyComputer() {
  let myComputer = new MyComputer(() => {
    myComputer.render();
  });
}
