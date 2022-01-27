/**
 * Toggles the volume slider.
 */
function toggleSpeaker() {
  if ($('#desktopSpeakerIcon').length == 0) return;
  if ($('#desktopSpeakerIcon')[0].className.indexOf('toggled') == -1) {
    //speaker is not toggled
    $('#desktopSpeakerIcon').addClass('toggled');
    $('#volumeContainer').append(generateVolumeSlider());
  } else {
    //speaker is toggled
    removeSpeaker();
  }
}

/**
 * Removes the volume slider.
 */
function removeSpeaker() {
  if (
    $('#volumeSliderContainer').length == 0 ||
    $('#desktopSpeakerIcon').length == 0
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
  } catch {
    volumeLevel = 50;
  }

  let containerContainer = document.createElement('div');
  containerContainer.className = 'window';
  containerContainer.id = 'volumeSliderContainer';

  let volumeSliderContainer = document.createElement('div');
  volumeSliderContainer.id = 'volumeSlider';
  volumeSliderContainer.className = 'field-row';

  let triangle = document.createElement('img');
  triangle.src = '/assets/images/volume_triangle.png';
  triangle.alt = 'triangle';
  triangle.id = 'volumeTriangle';

  let label = document.createElement('label');
  label.for = 'range25';
  label.innerText = 'Volume';

  let slider = document.createElement('div');
  slider.className = 'is-vertical';

  let input = document.createElement('input');
  input.id = 'range25';
  input.className = 'has-box-indicator volumeSliderElement';
  input.type = 'range';
  input.min = '0';
  input.max = '100';
  input.step = '1';
  input.value = volumeLevel;
  input.onchange = () => {
    volumeChanged(input.value);
  };

  slider.append(input);
  volumeSliderContainer.append(triangle, slider);
  containerContainer.append(label, volumeSliderContainer);

  let body = document.body;
  let html = document.documentElement;

  let height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  containerContainer.style.top = height - 161 + 'px';
  containerContainer.style.left =
    $('#desktopSpeakerIcon')[0].getBoundingClientRect().x - 21 + 'px';

  return containerContainer;
}

/**
 * Checks if the user clicked on the volume slider.
 * @returns {boolean} - Whether the user clicked on the volume slider.
 */
function clickedOnVolumeSlider() {
  if ($('#volumeSliderContainer').length == 0) return;
  let topCoords = $('#volumeSliderContainer')[0].getBoundingClientRect().top;
  let leftCoords = $('#volumeSliderContainer')[0].getBoundingClientRect().left;
  let bottomCoords = $('#volumeSliderContainer')[0].getBoundingClientRect()
    .bottom;
  let rightCoords = $('#volumeSliderContainer')[0].getBoundingClientRect()
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
