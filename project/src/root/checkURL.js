/**
 * Checks if the page is booted. If not, the page will boot and redirect home with the booted parameter.
 * Also checks for an app param in the URL.
 * Also checks for mobile devices.
 * TODO: Figure out how to make a redirect for non secure requests.
 */
function checkURL() {
  const params = new URLSearchParams(window.location.search);

  if (detectMob()) {
    transformToMobile();
    return;
  }

  if (params.get('booted') === 'true') {
    if (params.get('app')) openURLApp(params.get('app'));
    else openOutlookExpress('INTRO');
    return;
  }

  let app = '';
  if (params.get('app')) app = `?app=${params.get('app')}`;
  window.location.replace(`/boot/${app}`);
}
