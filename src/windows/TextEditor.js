class TextEditor extends Window {
  /**
   * The text editor app.
   * @param {string} [preLoadedText=''] - The text to pre-load into the text editor.
   * @param {string} [altName=null] - An alternate name for the text editor.
   */
  constructor(preLoadedText = '', altName = null) {
    super('Text Editor', 'textEditor', true, 'assets/images/icons/txt.png', () => this.onClose(), altName);

    this.preLoadedText = preLoadedText;
    this.getInnerHTML();
    this.generateElement(this.textWindow);
  }

  /**
   * Generates the DOM element of the window.
   */
  getInnerHTML() {
    this.textWindow = document.createElement('textarea');
    this.textWindow.value = this.preLoadedText;
  }

  /**
   * Called when the window is closed.
   */
  onClose() {
    if (this.textWindow.value.replace(/\s+/g, '') === this.preLoadedText.replace(/\s+/g, '')) {
      this.close();
      return;
    }
    if (this.errorPresent) return;

    this.noSaveError = new Error(
      this.displayName,
      this.id,
      'You have unsaved changes!',
      () => this.userSaved(),
      'Save',
      () => this.closeErrorWindow(),
      () => this.userDeniedSave()
    );
    this.noSaveError.render();
    this.errorPresent = true;
  }

  /**
   * Saves the text to a file, called when the user presses the OK button on the error window.
   */
  userSaved() {
    const pom = document.createElement('a');
    pom.setAttribute(
      'href',
      `data:text/plain;charset=utf-8,${encodeURIComponent(
        this.textWindow.value
      )}`
    );
    pom.setAttribute(
      'download',
      this.textWindow.value.substring(0, 10).replaceAll('.', '')
    );

    pom.style.display = 'none';
    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
    this.close();
    this.noSaveError.close();
  }

  /**
   * Called when the user presses the X button on the error window.
   */
  userDeniedSave() {
    this.close();
    this.noSaveError.close();
  }

  /**
   * Called when the user presses the Cancel button on the error window.
   */
  closeErrorWindow() {
    this.noSaveError.close();
    this.errorPresent = false;
  }
}

/**
 * Opens the calculator app.
 */
function openTextEditor() {
  const textEditor = new TextEditor();
  textEditor.render();
}
