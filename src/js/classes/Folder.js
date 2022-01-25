class Folder extends Window{
    constructor(
        displayName,
        id,
        taskbar = false,
        iconPath = null,
        closeFunction = null,
        callback = null
    ) {
        super(displayName, id, taskbar, iconPath, closeFunction);
        this.callback = callback;
    }

    generate(iconsList) {
        let contents = document.createElement("div");
        contents.className = this.id + "Contents folderContent";
        if(iconsList){
            let i = 0;
            iconsList.forEach((icon) => {
                i++;
                this.addIcon(icon, contents, i);
            });
        }
        this.generateElement(contents);
        if(this.callback) this.callback()
    }

    addIcon(icon, parent, listIndex) {
        if (listIndex == 1 || (listIndex - 1) % 7 == 0) {
            this.currentRow = document.createElement("div");
            this.currentRow.className = "recycleBinRow";
            parent.appendChild(this.currentRow);
        }
        //console.log('rendering', icon.iconElem, "into", this.currentRow);
        icon.renderIntoColumn(this.currentRow);
    }
}