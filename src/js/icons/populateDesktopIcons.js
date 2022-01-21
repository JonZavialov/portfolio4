function populateDesktopIcons(){
    iconClasses = []
    $.getJSON("/assets/json/desktop.json", (data) => {
        let keys = Object.keys(data)
        let iconsColumn = makeIconsColumn()
        for(let i = 0; i < keys.length; i++){
            let key = keys[i]
            let icon = data[key]
            let iconClass = new Icon(icon.displayName, icon.iconImage, key, "desktop", window[icon.clickFunction])
            iconClass.generateElement()
            iconClass.renderIntoColumn(iconsColumn)
            iconClasses.push(iconClass)
            if((i+1)%4 == 0) iconsColumn = makeIconsColumn()
        }
    })
}

function makeIconsColumn(){
    let iconsColumn = document.createElement("div")
    iconsColumn.id = "iconsColumn"
    $("#iconsContainer").append(iconsColumn)
    return iconsColumn
}