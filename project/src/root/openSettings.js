/**
 * Opens the settings menu.
 */
function openSettings() {
  // TODO: Add Clippy speech for the settings button.

  if ($('#settingsWindow')[0]) {
    closeSettings();
    return;
  }
  removeSpeaker();
  const buttonCoords = $('#settingsButton')[0].getBoundingClientRect();

  const settings = document.createElement('div');
  settings.id = 'settingsWindow';
  settings.className = 'window';
  settings.style.top = `${buttonCoords.y - 74}px`;
  settings.style.left = `${buttonCoords.x - 66}px`;

  const desktopColorLabel = document.createElement('p');
  desktopColorLabel.innerText = 'Desktop Color:';
  desktopColorLabel.id = 'desktopColorLabel';
  settings.append(desktopColorLabel);

  const colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.id = 'colorPicker';
  colorPicker.value = setColor;
  colorPicker.oninput = () => changeDesktopColor(colorPicker.value);
  settings.append(colorPicker);

  const pickedColor = document.createElement('p');
  pickedColor.innerText = setColor;
  pickedColor.id = 'pickedColor';
  settings.append(pickedColor);

  $('#volumeContainer').append(settings);
}

function closeSettings() {
  if (!$('#settingsWindow')[0]) return;
  $('#settingsWindow').remove();
}

function changeDesktopColor(value) {
  setColor = value;
  $('#pickedColor').html(value);
  $('#desktop').css('background-color', value);
}
