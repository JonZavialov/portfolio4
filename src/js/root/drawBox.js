function initDraw() {
  let canvas = $("#desktop")[0];
  let body = $("body")[0];

  var mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
  };

  function setMousePosition(e) {
    var ev = e || window.event; //Moz || IE
    if (ev.pageX) {
      //Moz
      mouse.x = ev.pageX + window.pageXOffset;
      mouse.y = ev.pageY + window.pageYOffset;
    }
  }

  var element = null;
  canvas.onmousemove = function (e) {
    checkCollide();
    setMousePosition(e);
    if (e.button != 0) return;
    if (element !== null) {
      element.style.width = Math.abs(mouse.x - mouse.startX) + "px";
      element.style.height = Math.abs(mouse.y - mouse.startY) + "px";
      element.style.left =
        mouse.x - mouse.startX < 0 ? mouse.x + "px" : mouse.startX + "px";
      element.style.top =
        mouse.y - mouse.startY < 0 ? mouse.y + "px" : mouse.startY + "px";
    }
  };

  canvas.onmousedown = function (e) {
    let noSelect = [".window", "#icon"];
    for (let i = 0; i < noSelect.length; i++) {
      if (e.target.closest(noSelect[i])) return;
    }
    if (clickedOnVolumeSlider(e)) return;
    if (e.button !== 0) return;
    mouse.startX = mouse.x;
    mouse.startY = mouse.y;
    element = document.createElement("div");
    element.className = "rectangle";
    element.style.left = mouse.x + "px";
    element.style.top = mouse.y + "px";
    canvas.appendChild(element);
    removeAllBorders();
    closeButton();
    if (!clickedOnVolumeSlider(e)) removeSpeaker();
  };

  body.onmouseup = function () {
    if (element) element.remove();

    //check for drawn rectangles and remove them
    var rectangles = document.getElementsByClassName("rectangle");
    for (i = 0; i < rectangles.length; i++) {
      rectangles[i].remove();
    }
  };
}

var doElsCollide = function ($div1, $div2) {
  if ($div1.length == 0 || $div2.length == 0) return false;

  // Div 1 data
  var d1_offset = $div1.offset();
  var d1_height = $div1.outerHeight(true);
  var d1_width = $div1.outerWidth(true);
  var d1_distance_from_top = d1_offset.top + d1_height;
  var d1_distance_from_left = d1_offset.left + d1_width;

  // Div 2 data
  var d2_offset = $div2.offset();
  var d2_height = $div2.outerHeight(true);
  var d2_width = $div2.outerWidth(true);
  var d2_distance_from_top = d2_offset.top + d2_height;
  var d2_distance_from_left = d2_offset.left + d2_width;

  var not_colliding =
    d1_distance_from_top < d2_offset.top ||
    d1_offset.top > d2_distance_from_top ||
    d1_distance_from_left < d2_offset.left ||
    d1_offset.left > d2_distance_from_left;

  // Return whether it IS colliding
  return !not_colliding;
};

async function checkCollide() {
  var icons = $("[id=icon]");
  for (i = 0; i < icons.length; i++) {
    let collide = doElsCollide(
      $(".rectangle"),
      $(`.${icons[i].className.split(" ")[0]}`)
    );
    if (collide) {
      for (let j = 0; j < iconClasses.length; j++) {
        if (iconClasses[j].className == icons[i].className.split(" ")[0]) {
          iconClasses[j].selectWithBox();
        }
      }
    }
  }

  if (doElsCollide($(".rectangle"), $("#taskbar"))) {
    $(".rectangle").remove();
  }
}
