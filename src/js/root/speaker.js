function toggleSpeaker() {
  if ($("#desktopSpeakerIcon").length == 0) return;
  if ($("#desktopSpeakerIcon")[0].className.indexOf("toggled") == -1) {
    //speaker is not toggled
    $("#desktopSpeakerIcon").addClass("toggled");
    $("#middleSection").append(generateVolumeSlider());
  } else {
    //speaker is toggled
    removeSpeaker();
  }
}

function removeSpeaker(e) {
  if (
    $("#volumeSliderContainer").length == 0 ||
    $("#desktopSpeakerIcon").length == 0
  )
    return;
  $("#desktopSpeakerIcon").removeClass("toggled");
  $("#volumeSliderContainer").remove();
}

function generateVolumeSlider() {
  try {
    volumeLevel;
  } catch {
    volumeLevel = 50;
  }
  let containerContainer = document.createElement("div");
  containerContainer.className = "window";
  containerContainer.id = "volumeSliderContainer";

  let volumeSliderContainer = document.createElement("div");
  volumeSliderContainer.id = "volumeSlider";
  volumeSliderContainer.className = "field-row";

  let triangle = document.createElement("img");
  triangle.src = "/assets/images/volume_triangle.png";
  triangle.alt = "triangle";
  triangle.id = "volumeTriangle";

  let label = document.createElement("label");
  label.for = "range25";
  label.innerText = "Volume";

  let slider = document.createElement("div");
  slider.className = "is-vertical";

  let input = document.createElement("input");
  input.id = "range25";
  input.className = "has-box-indicator volumeSliderElement";
  input.type = "range";
  input.min = "0";
  input.max = "100";
  input.step = "1";
  input.value = volumeLevel;
  input.onchange = () => {
    volumeChanged(input.value);
  };

  slider.appendChild(input);
  volumeSliderContainer.appendChild(triangle);
  volumeSliderContainer.appendChild(slider);
  containerContainer.appendChild(label);
  containerContainer.appendChild(volumeSliderContainer);
  return containerContainer;
}

function clickedOnVolumeSlider(e) {
  let target = e.target;
  if (
    target.id == "volumeSlider" ||
    target.className == "is-vertical" ||
    target.id == "range25"
  )
    return true;
  return false;
}

function volumeChanged(level) {
  volumeLevel = level;
}