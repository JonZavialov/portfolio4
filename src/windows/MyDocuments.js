class MyDocuments extends Folder {
  /**
   * The My Documents folder.
   * @param  {function} callback - The function that will be called when the folder is opened.
   * @constructor
   */
  constructor(callback) {
    super(
      'My Documents',
      'myDocuments',
      true,
      'assets/images/icons/documents.png',
      null,
      callback
    );
    this.setDocumentsList();
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
   * Sets the list of Documents to be displayed in the folder. Necessary for getDocumentsList to run asynchronously.
   * @private
   */
  setDocumentsList() {
    this.documentsList = this.getDocumentsList((list) => {
      this.generate(list);
      list.forEach((icon) => {
        iconClasses.push(icon);
        this.icons.push(icon);
      });
    });
  }

  /**
   * Retrieves the list of documents from the server.
   * @param  {function} callback
   * @private
   */
  getDocumentsList(callback) {
    const documentsList = [];
    $.getJSON('/assets/json/desktop.json', (data) => {
      const ids = Object.keys(data);
      for (let i = 0; i < ids.length; i += 1) {
        const id = ids[i];
        const iconData = data[id];
        if (iconData.type === 'document') {
          const iconClass = new Icon(
            iconData.displayName,
            iconData.iconImage,
            `${id}Documents`,
            'myDocuments',
            window[iconData.clickFunction]
          );
          iconClass.generateElement();
          documentsList.push(iconClass);
        }
        if (i === ids.length - 1) callback(documentsList);
      }
    });
  }
}

/**
 * Opens the My Documents folder.
 */
function openMyDocuments() {
  const myDocuments = new MyDocuments(() => {
    myDocuments.render();
  });
}
