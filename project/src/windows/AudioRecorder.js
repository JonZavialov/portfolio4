class AudioRecorder extends Window {
  /**
   * The Audio Recorder window.
   * @constructor
   */
  constructor() {
    super(
      'Audio Recorder',
      'audioRecorder',
      true,
      'assets/images/icons/mic.png',
      () => this.closeAudioRecorder()
    );

    this.hasMicPerms = false;
    this.timer = 0;
    this.recordedAudios = 0;
    this.generateElement(this.getHTML());
    this.getMicPermissions();
  }

  /**
   * Generates the DOM element for the window.
   * @returns {HTMLElement} - The DOM element for the window.
   */
  getHTML() {
    const container = document.createElement('div');
    addNodesToDom(container, 'audioRecorder.html .requestMicPermsPara');
    return container;
  }

  /**
   * Called when the user allows the website to use the microphone.
   */
  gotMicPerms() {
    if (this.hasMicPerms) return;
    clearInterval(this.permsInterval);
    this.hasMicPerms = true;
    this.setRecorder();
  }

  /**
   * Sets the window to record mode.
   */
  setRecorder() {
    $(this.elem).find('.requestMicPermsPara').parent().remove();

    const mediaRecorder = new MediaRecorder(this.stream);
    const chunks = [];
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
      this.convertData(chunks);
    };

    addNodesToDom(
      $(this.elem).find('.window-body')[0], 
      'audioRecorder.html .recorderBody', 
      (vars) => {
        vars.recordButton.onclick = () => {
          if (mediaRecorder.state === 'inactive') {
            this.initRecording(mediaRecorder);
            vars.recordButton.innerHTML = 'Stop';
          } else {
            this.stopRecording(mediaRecorder);
            vars.recordButton.innerHTML = 'Record';
          }
        };
      }
    );
  }

  /**
   * Called when the record button is pressed.
   * @param  {MediaRecorder} mediaRecorder - The MediaRecorder object.
   */
  initRecording(mediaRecorder) {
    mediaRecorder.start();
    this.initVolMeter();
    this.initTimer();
    $(this.elem).find('#recordLabel').html('🔴REC');
  }

  /**
   *  Called when the stop button is pressed.
   * @param  {MediaRecorder} mediaRecorder - The MediaRecorder object.
   */
  stopRecording(mediaRecorder) {
    mediaRecorder.stop();
    this.stopTimer();
    clearInterval(this.volumeInterval);
    $(this.elem).find('#recordLabel').html('');

    $(this.elem)
      .find('meter')
      .each((_i, elem) => $(elem).val(0));
  }

  /**
   * Takes the data from the MediaRecorder and converts it to a saveable format.
   * @param  {Blob[]} chunks - The audio data.
   */
  convertData(chunks) {
    const blob = new Blob(chunks, {
      'type': 'audio/ogg; codecs=opus',
    });
    const audioURL = window.URL.createObjectURL(blob);
    this.addAudioToList(audioURL);
  }

  /**
   * Takes the converted audio and adds it to the audio list.
   * @param  {string} url - The url of the audio file.
   */
  addAudioToList(url) {
    this.recordedAudios += 1;

    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    const name = `Audio ${this.recordedAudios}`;

    const listItem = document.createElement('div');
    listItem.className = 'audioListItem';
    listItem.innerHTML = name;
    listItem.onclick = () => this.saveAudio(url, name);

    const time = document.createElement('p');
    time.className = 'audioListTime';
    time.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    listItem.append(time);

    $(this.elem).find('#audioList').append(listItem);

    $(this.elem).find('#audioList').append(listItem);
    this.timer = 0;
  }

  /**
   * Initializes the recording timer.
   */
  initTimer() {
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);
  }

  /**
   * Called every second to update the timer.
   */
  updateTimer() {
    this.timer += 1;
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    $(this.elem)
      .find('#micTimer')
      .html(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
  }

  /**
   * Stops the recording timer.
   */
  stopTimer() {
    $(this.elem).find('#micTimer').html('0:00');
    clearInterval(this.timerInterval);
  }

  /**
   * Downloads the audio from the provided url.
   * @param  {string} url - The url of the audio file.
   */
  saveAudio(url, name) {
    const pom = document.createElement('a');
    pom.setAttribute('href', url);
    pom.setAttribute('download', `${name}.ogg`);

    pom.style.display = 'none';
    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
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

    this.volumeInterval = setInterval(() => this.volumeCallback(analyser), 10);
  }

  /**
   * The function that is called to analyze the volume.
   * @param  {AnalyserNode} analyser - The analyser node.
   */
  volumeCallback(analyser) {
    const volumes = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(volumes);
    let volumeSum = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const volume of volumes) volumeSum += volume;
    const averageVolume = volumeSum / volumes.length;
    $(this.elem)
      .find('meter')
      .each((_i, elem) => $(elem).val((averageVolume * 100) / 127));
  }

  /**
   * Sets a loop that checks for microphone permissions every second.
   */
  getMicPermissions() {
    this.permsInterval = setInterval(async () => {
      // Promise is returned when the user grants permissions.
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      this.gotMicPerms();
    }, 1000);
  }

  /**
   * Closes the window and stops all media tracks.
   */
  closeAudioRecorder() {
    this.stream.getTracks().forEach((track) => track.stop());
    this.close();
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
