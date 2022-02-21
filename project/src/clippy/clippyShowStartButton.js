/**
 * Moves Clippy to the start button.
 */
function clippyShowStartButton() {
  $('.clippy-balloon').hide();
  const coords = $('#startButton')[0].getBoundingClientRect();
  clippyAgent.moveTo(coords.x - 30, coords.y - 120);
  clippyAgent.play('GestureDown');
  clippyAgent.speak(
    "The start button also has many features. It has all of Jon's contacts, as well as some useful options to close all apps and clean the desktop."
  );
  setTimeout(() => addSpeechButton(clippyShowResume), 5000);
}
