/**
 * Opens an app.
 * @param  {string} app - The app to open.
 */
function openURLApp(app) {
  $.getJSON('/assets/json/desktop.json', (data) => {
    if (app === 'none') return;
    if (!data[app]) {
      openOutlookExpress('INTRO');
      return;
    }

    window[data[app].clickFunction]();
  });
}
