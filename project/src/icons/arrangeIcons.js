/**
 * Arranges all the desktop icons.
 */
function arrangeIcons() {
  iconClasses.forEach((icon) => {
    $(icon.iconElem).css({
      left: 0,
      top: 0,
    });
  });
}
