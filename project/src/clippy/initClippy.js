/**
 * Initializes Clippy.
 * TODO: Make cliipy periodically appear and dissapear to ask people if they need help
 */
function initClippy() {
  if ($('.clippy')[0]) return;
  clippy.load('Clippy', (agent) => {
    clippyAgent = agent;
    agent.show();
    displayIntroMessage();
  });
}