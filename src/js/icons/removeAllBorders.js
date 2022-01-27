/**
 * Removes all borders from the icons present in the DOM.
 * @param  {string} [dontRemove=null] - The class name of an icon that should not be removed.
 */
function removeAllBorders(dontRemove = null) {
  var icons = $('[id=icon]');
  for (i = 0; i < icons.length; i++) {
    for (let j = 0; j < iconClasses.length; j++) {
      if (iconClasses[j].className == icons[i].className.split(' ')[0]) {
        if (dontRemove == icons[i].className)
          iconClasses[j].removeBorder(false);
        else iconClasses[j].removeBorder();
      }
    }
  }
}
