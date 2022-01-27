/**
 * Initializes the clock in the taskbar.
 */
function initClock() {
  // TODO: make clicking on clock icon open calendar app
  setInterval(() => {
    if ($('#desktopClockTimeDisplay').length === 0) return;
    const date = new Date().toLocaleTimeString();
    $('#desktopClockTimeDisplay').html(date);
  }, 1000);
}
