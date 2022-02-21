function clippyShowConclusion() {
  $('.clippy-balloon').hide();
  clippyAgent.moveTo(window.innerWidth - 200, window.innerHeight - 200);
  clippyAgent.speak(
    "That's all folks! Feel free to look around the website, and contact Jon if you have any suggestions or bug reports."
  );
  setTimeout(() => addSpeechButton(clippyLeave, 'Bye!'), 2000);
}
