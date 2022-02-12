class FileExplorer extends Folder {
  constructor(callback) {
    super(
      'File Explorer',
      'fileExplorer',
      true,
      'assets/images/icons/fileexplorer.png',
      null,
      callback
    );
    this.setFoldersList();
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
   * Sets the list of Folders to be displayed in the folder. Necessary for getFoldersList to run asynchronously.
   */
  setFoldersList() {
    this.foldersList = this.getFoldersList((list) => {
      this.generate(list);
      list.forEach((icon) => {
        iconClasses.push(icon);
        this.icons.push(icon);
      });
    });
  }

  /**
   * Retrieves the list of folders from the server.
   * @param  {function} callback
   */
  getFoldersList(callback) {
    const foldersList = [];
    $.getJSON('/assets/json/desktop.json', (data) => {
      const ids = Object.keys(data);
      for (let i = 0; i < ids.length; i += 1) {
        const id = ids[i];
        const iconData = data[id];
        if (iconData.type === 'folder') {
          // eslint-disable-next-line no-continue
          if (iconData.displayName === 'File Explorer') continue;
          const iconClass = new Icon(
            iconData.displayName,
            iconData.iconImage,
            `${id}FileExplorer`,
            'fileExplorer',
            window[iconData.clickFunction]
          );
          iconClass.generateElement();
          foldersList.push(iconClass);
        }
        if (i === ids.length - 1) callback(foldersList);
      }
    });
  }
}

function openFileExplorer() {
  const fileExplorer = new FileExplorer(() => fileExplorer.render());
}
