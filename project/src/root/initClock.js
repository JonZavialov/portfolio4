/**
 * Initializes the clock in the taskbar.
 */
function initClock() {
  setInterval(() => {
    if ($('#desktopClockTimeDisplay').length === 0) return;
    const date = new Date().toLocaleTimeString();
    $('#desktopClockTimeDisplay').html(date);
  }, 1000);
}
