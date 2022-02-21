/**
 * Makes Clippy show the resume.
 */
function clippyShowResume() {
  $('.clippy-balloon').hide();
  const coords = $('.resumeIcon')[0].getBoundingClientRect();
  clippyAgent.moveTo(coords.x + 55, coords.y - 20);
  clippyAgent.play('GestureRight');
  clippyAgent.speak(
    'If you came here to learn more about Jon, his resume is a good place to start.'
  );
  setTimeout(() => addSpeechButton(clippyShowConclusion), 5000);
}
