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

    this.hasMicPerms = false
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
    if (this.hasMicPerms) return
    clearInterval(this.permsInterval);
    this.hasMicPerms = true
    this.setRecorder()
  }

  /**
   * Sets the window to record mode.
   */
  setRecorder() {
    $(this.elem).find('.requestMicPermsPara').remove();

    const mediaRecorder = new MediaRecorder(this.stream);
    mediaRecorder.ondataavailable = (e) => {
      console.log(e.data);
    }

    const recordButton = document.createElement('button');
    recordButton.className = 'recordButton';
    recordButton.innerHTML = 'Record';
    recordButton.onclick = () => {
      if (mediaRecorder.state === 'inactive') {
        mediaRecorder.start();
        this.initVolMeter()
        recordButton.innerHTML = 'Stop';
      } else {
        mediaRecorder.stop();
        clearInterval(this.volumeInterval)
        recordButton.innerHTML = 'Record';
      }
    }
    $(this.elem).append(recordButton);
  }

  /**
   * Initializes the volume meter.
   */
  initVolMeter() {
    const audioContext = new AudioContext();
    const audioSource = audioContext.createMediaStreamSource(this.stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    analyser.minDecibels = -127;
    analyser.maxDecibels = 0;
    analyser.smoothingTimeConstant = 0.4;
    audioSource.connect(analyser);

    this.volumeInterval = setInterval(() => this.volumeCallback(analyser), 100);
  }

  /**
   * The function that is called to analyze the volume.
   * @param  {AnalyserNode} analyser - The analyser node.
   */
  volumeCallback(analyser) {
    const volumes = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(volumes);
    let volumeSum = 0;
    for (const volume of volumes)
      volumeSum += volume;
    const averageVolume = volumeSum / volumes.length;
    // Percentage
    console.log(averageVolume * 100 / 127)
  };

  /**
   * Sets a loop that checks for microphone permissions every second.
   */
  getMicPermissions() {
    this.permsInterval = setInterval(async () => {
      // Promise is returned when the user grants permissions.
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
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