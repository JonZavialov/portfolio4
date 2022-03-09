/**
 * Initializes Clippy.
 */
function initClippy() {
  if ($('.clippy')[0]) return;
  clippy.load('Clippy', (agent) => {
    clippyAgent = agent;
    agent.show();
    displayIntroMessage();
  });

  // TODO: add clippy scene for chat room.
}
