/**
 * Opens the Jonpng app.
 */
function openCredits() {
  $.ajax({
    url: '/assets/text/credits.txt',
    success(data) {
      const credits = new TextEditor(data, 'credits.txt');
      credits.render();
    },
  });
}
