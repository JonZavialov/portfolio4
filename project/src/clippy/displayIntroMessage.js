/**
 * Displays the Clippy intro message.
 */
function displayIntroMessage() {
  clippyAgent.speak(
    "Thanks for willing me into existence! My name's Clippy, your virtual assistant beamed straight from 1998. Allow me to show you around JonZav OS."
  );
  addSpeechButton(clippyShowIcons);
}
