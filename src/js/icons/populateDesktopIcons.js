/**
 * Populates the desktop icons, and adds them to the global iconClasses array.
 */
function populateDesktopIcons() {
  iconClasses = [];
  recycledIcons = [];
  $.getJSON('/assets/json/desktop.json', (data) => {
    let keys = Object.keys(data);
    let iconsColumn = makeIconsColumn();
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let icon = data[key];
      let iconClass = new Icon(
        icon.displayName,
        icon.iconImage,
        key,
        'desktop',
        window[icon.clickFunction]
      );
      iconClass.generateElement();
      iconClass.renderIntoColumn(iconsColumn);
      iconClass.makeDraggable();
      iconClasses.push(iconClass);
      if ((i + 1) % 4 == 0) iconsColumn = makeIconsColumn();
    }
  });

  $('#desktop').mouseup(() => {
    iconClasses.forEach((icon) => {
      icon.checkForReleasedOverRecycle();
    });
  });
}

/**
 * Creates a new column for the desktop icons.
 * @returns {HTMLElement} - The new column.
 */
function makeIconsColumn() {
  let iconsColumn = document.createElement('div');
  iconsColumn.id = 'iconsColumn';
  $('#iconsContainer').append(iconsColumn);
  return iconsColumn;
}
