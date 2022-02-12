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
            <img src="/assets/images/icons/mail.png">
            <p id="startMenuPairText">Email Me</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('linkedin')">
            <img src="/assets/images/icons/linkedin.png">
            <p id="startMenuPairText">Linkedin</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('insta')">
            <img src="/assets/images/icons/instagram.png">
            <p id="startMenuPairText">Instagram</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('youtube')">
            <img src="/assets/images/icons/youtube.png">
            <p id="startMenuPairText">Youtube</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('github')">
            <img src="/assets/images/icons/documents.png">
            <p id="startMenuPairText">GitHub</p>
        </div>
        <hr>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('credits')">
            <img src="/assets/images/icons/txt.png">
            <p id="startMenuPairText">Credits</p>
        </div>
        <hr>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('fileExplorer')">
            <img src="/assets/images/icons/fileexplorer.png">
            <p id="startMenuPairText">File Explorer</p>
        </div>
        <div class="hoverHighlight" id="startMenuPair" onclick="startMenuButton('restart')">
            <img src="/assets/images/icons/shutdown.png">
            <p id="startMenuPairText">Restart...</p>
        </div>
    </div>
    `;
  $('#middleSection').append(element);
  $('#startButton').unbind();
  $('#startButton').click(() => closeButton());
}

/**
 * Closes the start menu.
 */
async function closeButton() {
  if (!$('#startMenu')[0]) return;
  $('#startMenu').remove();
  $('#startButton').unbind();
  $('#startButton').click(() => startButton());
}

/**
 * Called when a button in the start menu is clicked.
 * @param  {string} button - The button that was clicked.
 */
function startMenuButton(button) {
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
      openCredits();
    },
    'fileExplorer': function () {
      openFileExplorer();
    },
    'restart': function () {
      window.location.replace('/');
    },
  };
  const methodNames = Object.keys(methods);
  if (methodNames.indexOf(button) !== -1) methods[button]();
}
