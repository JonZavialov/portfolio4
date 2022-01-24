class RecycleBin extends Window {
  constructor() {
    super("Recycle Bin", "recycleBin", true, "assets/images/icons/recycle.png");
    this.#generate();
  }

  closeCallback() {
    recycleBinWindows.splice(recycleBinWindows.indexOf(this), 1);
  }

  addRecycledIcon(icon, parent, listIndex) {
    if (listIndex == 1 || (listIndex - 1) % 7 == 0) {
      this.currentRow = document.createElement("div");
      this.currentRow.className = "recycleBinRow";
      parent.appendChild(this.currentRow);
    }

    let recycledIcon = this.#generateRecycledIcon(icon);
    recycledIcon.generateElement();
    recycledIcon.renderIntoColumn(this.currentRow);
  }

  #generateRecycledIcon(icon) {
    //todo: static
    let recycledIcon = new Icon(
      icon.displayName,
      icon.iconImagePath,
      icon.className,
      "recycleBin",
      null,
      false
    );
    return recycledIcon;
  }

  #generate() {
    let contents = document.createElement("div");
    contents.className = "recycleBinContents";
    let i = 0;
    recycledIcons.forEach((icon) => {
      i++;
      this.addRecycledIcon(icon, contents, i);
    });
    this.generateElement(contents);
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
