class Folder extends Window{
    constructor(
        displayName,
        id,
        taskbar = false,
        iconPath = null,
        closeFunction = null
    ) {
        super(displayName, id, taskbar, iconPath, closeFunction);
    }

    generate(iconsList) {
        let contents = document.createElement("div");
        contents.className = this.id + "Contents folderContent";
        let i = 0;
        iconsList.forEach((icon) => {
            i++;
            this.addIcon(icon, contents, i);
        });
        this.generateElement(contents);
    }

    addIcon(icon, parent, listIndex) {
        if (listIndex == 1 || (listIndex - 1) % 7 == 0) {
            this.currentRow = document.createElement("div");
            this.currentRow.className = "recycleBinRow";
            parent.appendChild(this.currentRow);
        }
        icon.renderIntoColumn(this.currentRow);
    }
}