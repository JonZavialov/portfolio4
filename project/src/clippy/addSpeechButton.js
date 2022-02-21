/**
 * Adds a continue button to the Clippy speech bubble once it's done speaking.
 * @param  {function} callback - The function to call when the button is clicked.
 * @param  {string} [content="Continue"] - The text to display on the button.
 */
function addSpeechButton(callback, content = 'Continue') {
  setTimeout(() => {
    const interval = setInterval(() => {
      if ($('.clippy-balloon')[0].style.display !== 'none') return;
      clearInterval(interval);
      $('.clippy-balloon')[0].style.display = 'block';
      const button = document.createElement('button');
      button.innerHTML = content;
      button.style.margin = '15px 10px 0 0';
      button.style.float = 'right';
      button.onclick = () => {
        callback();
        button.remove();
        $('.clippy-balloon').css('transform', 'translateY(0)');
      };

      $('.clippy-balloon').append(button);
      $('.clippy-balloon').css('transform', 'translateY(-38px)');
    }, 10);
  }, 100);
}
