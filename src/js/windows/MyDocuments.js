class MyDocuments extends Folder {
  constructor(callback) {
    super(
      "My Documents",
      "myDocuments",
      true,
      "assets/images/icons/documents.png",
      null,
      callback
    );
    this.#setDocumentsList();
    this.icons = [];
  }

  closeCallback() {
    this.icons.forEach((icon) => {
      iconClasses.splice(iconClasses.indexOf(icon), 1);
    });
  }

  #setDocumentsList() {
    //necessary for getDocumentsList to run asynchronously
    this.documentsList = this.#getDocumentsList((list) => {
      this.generate(list);
      list.forEach((icon) => {
        iconClasses.push(icon);
        this.icons.push(icon);
      });
    });
  }

  #getDocumentsList(callback) {
    let documentsList = [];
    $.getJSON("/assets/json/desktop.json", (data) => {
      let ids = Object.keys(data);
      for (let i = 0; i < ids.length; i++) {
        let id = ids[i];
        let iconData = data[id];
        if (iconData["type"] === "document") {
          let iconClass = new Icon(
            iconData.displayName,
            iconData.iconImage,
            id + "Documents",
            "myDocuments",
            window[iconData.clickFunction]
          );
          iconClass.generateElement();
          documentsList.push(iconClass);
        }
        if (i == ids.length - 1) {
          callback(documentsList);
        }
      }
    });
  }
}

function openMyDocuments() {
  let myDocuments = new MyDocuments(() => {
    myDocuments.render();
  });
}
