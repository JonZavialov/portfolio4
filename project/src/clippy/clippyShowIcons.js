/**
 * Moves Clippy to the My Apps icon.
 */
function clippyShowIcons() {
  $('.clippy-balloon').hide();
  const coords = $('.myAppsIcon')[0].getBoundingClientRect();
  clippyAgent.moveTo(coords.x - 135, coords.y - 15);
  clippyAgent.play('GestureLeft');
  clippyAgent.speak(
    'JonZav OS features many icons that can be used to open apps, such as this one. Click on the icons to see what they do.'
  );
  setTimeout(() => addSpeechButton(clippyShowStartButton), 7000);
}
