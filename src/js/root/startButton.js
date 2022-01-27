/**
 * Renders the start menu into the DOM.
 */
function startButton() {
  if ($('#startMenu')[0]) return;
  const element = document.createElement('div');
  element.id = 'startMenu';
  element.className = 'window';
  element.innerHTML = `
    <div class="title-bar">
        <div class="title-bar-text">
            Windows98
        </div>
    </div>
    <div id="startMenuBody">
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('email')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/mail.png?raw=true">
            <p id="startMenuPairText">Email Me</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('linkedin')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/linkedin.png?raw=true">
            <p id="startMenuPairText">Linkedin</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('insta')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/instagram.png?raw=true">
            <p id="startMenuPairText">Instagram</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('youtube')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/youtube.png?raw=true">
            <p id="startMenuPairText">Youtube</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('github')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/documents.png?raw=true">
            <p id="startMenuPairText">GitHub</p>
        </div>
        <hr>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('credits')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/credits.png?raw=true">
            <p id="startMenuPairText">Credits</p>
        </div>
        <hr>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('console')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/console.png?raw=true">
            <p id="startMenuPairText">MS-DOS Prompt</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('restart')">
            <img src="https://github.com/JonZavialov/portfolio2/blob/main/assets/images/shutdown.png?raw=true">
            <p id="startMenuPairText">Restart...</p>
        </div>
    </div>
    `;
  $('#middleSection').append(element);
  $('#startButton').unbind();
  $('#startButton').click(() => {
    closeButton();
  });
}

/**
 * Closes the start menu.
 */
async function closeButton() {
  if (!$('#startMenu')[0]) return;
  $('#startMenu').remove();
  $('#startButton').unbind();
  $('#startButton').click(() => {
    startButton();
  });
}

/**
 * Called when a button in the start menu is clicked.
 * @param  {string} button - The button that was clicked.
 */
function startMenuButton(button) {
  console.log(button);
  const methods = {
    'email': function () {
      window.location.assign('mailto: jonzavialov@gmail.com');
    },
    'linkedin': function () {
      window
        .open(
          'https://www.linkedin.com/in/jonathan-zavialov-6404b61bb/',
          '_blank'
        )
        .focus();
    },
    'insta': function () {
      window
        .open('https://www.instagram.com/thesuperiorphotographer', '_blank')
        .focus();
    },
    'youtube': function () {
      window
        .open(
          'https://www.youtube.com/channel/UCfQ1TVBmS1uE6GX6S4h0q-g',
          '_blank'
        )
        .focus();
    },
    'github': function () {
      window.open('https://github.com/JonZavialov', '_blank').focus();
    },
    'credits': function () {
      credits();
    },
    'console': function () {
      initMsdos();
    },
    'restart': function () {
      window.location.replace('/');
    },
  };
  const methodNames = Object.keys(methods);
  if (methodNames.indexOf(button) !== -1) methods[button]();
}
