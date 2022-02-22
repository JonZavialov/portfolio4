/**
 * Clippy shows the settings button.
 */
function clippyShowSettings() {
  $('.clippy-balloon').hide();
  const coords = $('#settingsButton')[0].getBoundingClientRect();
  clippyAgent.moveTo(coords.x - 40, coords.y - 107);
  clippyAgent.play('GestureDown');
  clippyAgent.speak(
    'The desktop background is also fully customizable! Click the settings button to change the color.'
  );
  setTimeout(() => addSpeechButton(clippyShowConclusion), 5000);
}
