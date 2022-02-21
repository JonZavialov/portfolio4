/**
 * Toggles the volume slider.
 */
function toggleSpeaker() {
  if ($('#desktopSpeakerIcon').length === 0) return;
  if ($('#desktopSpeakerIcon')[0].className.indexOf('toggled') === -1) {
    // speaker is not toggled
    closeSettings();
    $('#desktopSpeakerIcon').addClass('toggled');
    $('#volumeContainer').append(generateVolumeSlider());
  } else removeSpeaker();
}

/**
 * Removes the volume slider.
 */
function removeSpeaker() {
  if (
    $('#volumeSliderContainer').length === 0 ||
    $('#desktopSpeakerIcon').length === 0
  )
    return;
  $('#desktopSpeakerIcon').removeClass('toggled');
  $('#volumeSliderContainer').remove();
}

/**
 * Generates the DOM element for the volume slider.
 * @returns {HTMLElement} - The DOM element for the volume slider.
 */
function generateVolumeSlider() {
  try {
    volumeLevel;
  } catch (e) {
    volumeLevel = 50;
  }

  const containerContainer = document.createElement('div');
  containerContainer.className = 'window';
  containerContainer.id = 'volumeSliderContainer';

  const volumeSliderContainer = document.createElement('div');
  volumeSliderContainer.id = 'volumeSlider';
  volumeSliderContainer.className = 'field-row';

  const triangle = document.createElement('img');
  triangle.src = '/assets/images/volume_triangle.png';
  triangle.alt = 'triangle';
  triangle.id = 'volumeTriangle';

  const label = document.createElement('label');
  label.for = 'range25';
  label.innerText = 'Volume';

  const slider = document.createElement('div');
  slider.className = 'is-vertical';

  const input = document.createElement('input');
  input.id = 'range25';
  input.className = 'has-box-indicator volumeSliderElement';
  input.type = 'range';
  input.min = '0';
  input.max = '100';
  input.step = '1';
  input.value = volumeLevel;
  input.onchange = () => volumeChanged(input.value);

  slider.append(input);
  volumeSliderContainer.append(triangle, slider);
  containerContainer.append(label, volumeSliderContainer);

  const { body } = document;
  const html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  containerContainer.style.top = `${height - 161}px`;
  containerContainer.style.left = `${
    $('#desktopSpeakerIcon')[0].getBoundingClientRect().x - 21
  }px`;

  return containerContainer;
}

/**
 * Checks if the user clicked on the volume slider.
 * @returns {boolean} - Whether the user clicked on the volume slider.
 */
function clickedOnVolumeSlider() {
  if ($('#volumeSliderContainer').length === 0) return;
  const topCoords = $('#volumeSliderContainer')[0].getBoundingClientRect().top;
  const leftCoords = $('#volumeSliderContainer')[0].getBoundingClientRect()
    .left;
  const bottomCoords = $('#volumeSliderContainer')[0].getBoundingClientRect()
    .bottom;
  const rightCoords = $('#volumeSliderContainer')[0].getBoundingClientRect()
    .right;
  if (
    mouse.y > topCoords &&
    mouse.y < bottomCoords &&
    mouse.x > leftCoords &&
    mouse.x < rightCoords
  )
    return true;
  return false;
}

/**
 * Sets the global volume level variable.
 * @param  {number} level
 */
function volumeChanged(level) {
  volumeLevel = level;
}
