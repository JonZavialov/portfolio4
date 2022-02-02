/**
 * Opens the Jonpng app.
 */
function openCredits() {
  $.ajax({
    url: '/assets/text/credits.txt',
    success(data) {
      // parse your data here
      // you can split into lines using data.split('\n')
      // an use regex functions to effectively parse it\
      const credits = new TextEditor(data, 'credits.txt');
      credits.render();
    },
  });
}
