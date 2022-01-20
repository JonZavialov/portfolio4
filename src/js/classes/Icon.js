class Icon{
    constructor(displayName, iconImagePath, className, parent, clickFunction){
        this.displayName = displayName
        this.iconImagePath = iconImagePath
        this.className = className
        this.parent = parent
        this.selected = false
        this.clickFunction = clickFunction
    }

    generateElement(){
        this.iconElem = document.createElement("div")
        this.iconElem.className = this.className + " " + this.parent + "Icon"
        this.iconElem.id = "icon"
        if(this.parent == "desktop") this.iconElem.style.borderColor = "#008080"
        else this.iconElem.style.borderColor = "white"
        
        let iconImage = document.createElement("img")
        iconImage.src = this.iconImagePath
        this.iconElem.appendChild(iconImage)

        let iconLabel = document.createElement("p")
        iconLabel.innerHTML = this.displayName
        this.iconElem.appendChild(iconLabel)

        this.iconElem.onmousedown = () => {
            this.onClick()
        }
    }

    render(){
        $("#iconsContainer").append(this.iconElem)
    }

    onClick(){
        let borderColor
        if(this.selected){
            //object was double clicked
            if(this.parent == "desktop") borderColor = "#008080"
            else borderColor = "white"
            $(`.${this.className}`).css("border-color", borderColor)
            this.selected = false
            this.doubleClick()
        }else{
            //object was single clicked
            if(this.parent == "desktop") borderColor = "white"
            else borderColor = "blue"
            $(`.${this.className}`).css("border-color", borderColor)
            this.selected = true
        }
    }

    doubleClick(){
        if(typeof this.clickFunction === "function") this.clickFunction()
    }
}