/**
 * Clippy leaves the screen.
 */
function clippyLeave() {
  $('.clippy-balloon').hide();
  clippyAgent.play('SendMail');
  const interval = setInterval(() => {
    if ($('.clippy')[0].style.display !== 'none') return;
    clearInterval(interval);
    setTimeout(() => {
      $('.clippy')[0].remove();
      $('.clippy-balloon').remove();
    }, 10);
  }, 10);
}
