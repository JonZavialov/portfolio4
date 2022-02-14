class AudioRecorder extends Window {
  /**
   * The Audio Recorder window.
   */
  constructor() {
    super(
      'Audio Recorder',
      'audioRecorder',
      true,
      'assets/images/icons/mic.png'
    );

    this.generateElement(this.getHTML());
    this.getMicPermissions();
  }

  /**
   * Generates the DOM element for the window.
   * @returns {HTMLElement} - The DOM element for the window.
   */
  getHTML() {
    const container = document.createElement('div');

    const requestPerms = document.createElement('p');
    requestPerms.className = 'requestMicPermsPara';
    requestPerms.innerHTML = `
        Requesting microphone permissions...<br>
        If you don't see a popup, check that your browser hasn't blocked it.`;
    container.append(requestPerms);

    return container;
  }

  /**
   * Called when the user allows the website to use the microphone.
   */
  gotMicPerms() {
    clearInterval(this.permsInterval);
    console.log('Got mic permissions');
  }

  /**
   * Sets a loop that checks for microphone permissions every second.
   */
  getMicPermissions() {
    this.permsInterval = setInterval(async () => {
      // Promise is returned when the user grants permissions.
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.gotMicPerms();
    }, 1000);
  }
}

/**
 * Opens the Audio Recorder app provided that the browser supports it.
 */
function openAudioRecorder() {
  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    const audioRecorder = new AudioRecorder();
    audioRecorder.render();
  } else {
    const noMicError = new Error(
      'Audio Recorder',
      'audioRecorder',
      'Your browser is denying access to your microphone.<br>Please enable it in your browser settings.',
      () => noMicError.close()
    );
    noMicError.render();
  }
}
