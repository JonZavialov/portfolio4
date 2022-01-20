function populateDesktopIcons(){
    iconClasses = []
    $.getJSON("/assets/json/desktop.json", (data) => {
        let keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            let key = keys[i]
            let icon = data[key]
            let iconClass = new Icon(icon.displayName, icon.iconImage, key, "desktop", window[icon.clickFunction])
            iconClass.generateElement()
            iconClass.render()
            iconClasses.push(iconClass)
        }
    })
}