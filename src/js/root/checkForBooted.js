/**
 * Checks if the page is booted. If not, the page will boot and redirect home with the booted parameter.
 */
function checkForBooted() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('booted') === 'true') return;
  window.location.replace('/boot');
}
