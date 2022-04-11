/**
 * Populates the desktop icons, and adds them to the global iconClasses array.
 */
function populateDesktopIcons() {
  iconClasses = [];
  recycledIcons = [];
  taskbarShrinkNum = 100;
  setColor = '#008080';
  windowsTaskbarMap = new Map();
  $.getJSON('/assets/json/desktop.json', (data) => {
    const keys = Object.keys(data);
    let iconsColumn = makeIconsColumn();

    let counter = 1;
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const icon = data[key];

      // eslint-disable-next-line no-continue
      if (icon.game) continue

      const iconClass = new Icon(
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
      if (counter % 4 === 0) iconsColumn = makeIconsColumn();
      counter += 1;
    }
  });
  // TODO: add about me folder
  $('#desktop').mouseup(() =>
    iconClasses.forEach((icon) => icon.checkForReleasedOverRecycle())
  );
}

/**
 * Creates a new column for the desktop icons.
 * @returns {HTMLElement} - The new column.
 */
function makeIconsColumn() {
  const iconsColumn = document.createElement('div');
  iconsColumn.id = 'iconsColumn';
  $('#iconsContainer').append(iconsColumn);
  return iconsColumn;
}
