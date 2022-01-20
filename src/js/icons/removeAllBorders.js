function removeAllBorders(){
    var icons = $("#icon")
    for( i=0; i<icons.length; i++ ) {
        for(let i = 0; i < iconClasses.length; i++){
            if(iconClasses[i].className == icons[i].className.split(" ")[0]){
                iconClasses[i].removeBorder()
                break
            }
        }
    }
}