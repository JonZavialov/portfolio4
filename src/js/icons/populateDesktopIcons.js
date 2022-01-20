function populateDesktopIcons(){
    $.getJSON("/assets/json/desktop.json", (data) => {
        let keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            let key = keys[i]
            let icon = data[key]
            let iconClass = new Icon(icon.displayName, icon.iconImage, key)
            iconClass.generateElement()
            iconClass.render()
        }
    })
}