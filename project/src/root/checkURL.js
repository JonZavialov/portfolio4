/**
 * Checks if the page is booted. If not, the page will boot and redirect home with the booted parameter.
 */
function checkURL() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('booted') === 'true') {
    if (params.get('app')) openURLApp(params.get('app'));
    else openOutlookExpress('INTRO');
    return;
  }

  let app = '';
  if (params.get('app')) app = `?app=${params.get('app')}`;
  window.location.replace(`/boot/${app}`);
}
