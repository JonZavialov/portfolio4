function removeAllBorders(dontRemove = null) {
  var icons = $("[id=icon]");
  for (i = 0; i < icons.length; i++) {
    for (let i = 0; i < iconClasses.length; i++) {
      if (iconClasses[i].className == icons[i].className.split(" ")[0]) {
        if (dontRemove == icons[i].className)
          iconClasses[i].removeBorder(false);
        else iconClasses[i].removeBorder();
      }
    }
  }
}
