class Icon{
    constructor(displayName, iconImagePath, className){
        this.displayName = displayName
        this.iconImagePath = iconImagePath
        this.className = className
    }

    generateElement(){
        this.iconElem = document.createElement("div")
        this.iconElem.className = this.className
        
        let iconImage = document.createElement("img")
        iconImage.src = this.iconImagePath
        this.iconElem.appendChild(iconImage)

        let iconLabel = document.createElement("p")
        iconLabel.innerHTML = this.displayName
        this.iconElem.appendChild(iconLabel)
    }

    render(){
        $("#iconsContainer").append(this.iconElem)
    }
}