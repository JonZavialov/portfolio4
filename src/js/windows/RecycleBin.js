class RecycleBin extends Folder {
  constructor() {
    super('Recycle Bin', 'recycleBin', true, 'assets/images/icons/recycle.png');
    let recycledIconsList = [];
    recycledIcons.forEach((icon) => {
      let recycledIcon = this.generateRecycledIcon(icon);
      recycledIcon.generateElement();
      recycledIconsList.push(recycledIcon);
    });
    this.generate(recycledIconsList);
  }

  closeCallback() {
    recycleBinWindows.splice(recycleBinWindows.indexOf(this), 1);
  }

  generateRecycledIcon(icon) {
    let recycledIcon = new Icon(
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

function openRecycleBin() {
  let recycleBin = new RecycleBin();
  recycleBin.render();
  try {
    recycleBinWindows.push(recycleBin);
  } catch {
    recycleBinWindows = [];
    recycleBinWindows.push(recycleBin);
  }
}
