function initDraw() {
    let canvas = $("#desktop")[0]
    let body = $("body")[0]

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    }

    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX + window.pageXOffset
            mouse.y = ev.pageY + window.pageYOffset
        }
    }

    var element = null
    canvas.onmousemove = function (e) {
        checkCollide()
        setMousePosition(e)
        if(e.button != 0) return
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px'
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px'
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px'
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px'
        }
    }

    canvas.onmousedown = function (e) {
        let noSelect = [
            ".window",
            "#icon"
        ]
        for(let i = 0; i < noSelect.length; i++){
            if(e.target.closest(noSelect[i])) return
        }
        if(e.button !== 0) return
        mouse.startX = mouse.x
        mouse.startY = mouse.y
        element = document.createElement('div')
        element.className = 'rectangle'
        element.style.left = mouse.x + 'px'
        element.style.top = mouse.y + 'px'
        canvas.appendChild(element)
        removeAllBorders()
    }

    body.onmouseup = function (e){
        if(element) element.remove()
                
        //check for drawn rectangles and remove them
        var rectangles = document.getElementsByClassName( 'rectangle' )
        for( i=0; i<rectangles.length; i++ ) {
            rectangles[i].remove()
        }
    }
}

doElsCollide = function(el1, el2) {
    if(!el1 || !el2) return
    el1.offsetBottom = el1.offsetTop + el1.offsetHeight
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth

    return !((el1.offsetBottom < el2.offsetTop) ||
             (el1.offsetTop > el2.offsetBottom) ||
             (el1.offsetRight < el2.offsetLeft) ||
             (el1.offsetLeft > el2.offsetRight))
}

async function checkCollide(){
    var icons = $("[id=icon]")
    for( i=0; i<icons.length; i++ ) {
        let collide = doElsCollide($(".rectangle")[0],icons[i])
        if(collide){
            for(let j = 0; j < iconClasses.length; j++){
                if(iconClasses[j].className == icons[i].className.split(" ")[0]){
                    iconClasses[j].selectWithBox()
                }
            }
        }
    }

    if(doElsCollide($(".rectangle")[0],$("#taskbar")[0])){
        $(".rectangle").remove()
    }
}