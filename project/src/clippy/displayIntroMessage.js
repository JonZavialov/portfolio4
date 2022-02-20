function displayIntroMessage() {
  clippyAgent.speak(
    "Thanks for willing me into existence! My name's Clippy, your virtual assistant beamed straight from 1998. Allow me to show you around JonZav OS."
  );
  setTimeout(() => {
    const interval = setInterval(() => {
      if ($('.clippy-balloon')[0].style.display !== 'none') return;
      clearInterval(interval);
      $('.clippy-balloon')[0].style.display = 'block';
      addIntroButtons();
    }, 10);
  }, 100);
}

function addIntroButtons() {
  const button = document.createElement('button');
  button.innerHTML = 'Continue';
  button.style.marginTop = '15px';
  button.style.float = 'right';

  $('.clippy-balloon').append(button);
  $('.clippy-balloon').css('transform', 'translateY(-38px)');
}
