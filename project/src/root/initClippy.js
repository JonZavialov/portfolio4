function initClippy() {
  if ($('.clippy')[0]) return;
  clippy.load('Clippy', (agent) => {
    clippyAgent = agent;
    agent.show();
    agent.moveTo(100, 100);
  });
}
