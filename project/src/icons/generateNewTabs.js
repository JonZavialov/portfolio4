/**
 * Generates new tabindexes for desktop icons after one is recycled.
 */
function generateNewTabs(){
    iconClasses.forEach((icon, i) => {
        if (icon.parent === "desktop") $(icon.iconElem).attr('tabindex', i+1)
    })
}