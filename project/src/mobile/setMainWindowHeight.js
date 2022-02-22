function setMainWindowHeight() {
  const height = window.innerHeight;
  const windowHeight = `${height - 16}px`; // 2 x body margin + 2 x window padding

  $('#mainWindow').css('height', windowHeight);
}
