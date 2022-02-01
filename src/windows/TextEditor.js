class TextEditor extends Window {
  /**
   * The text editor app.
   */
  constructor() {
    super(
      'Text Editor',
      'textEditor',
      true,
      'assets/images/icons/txt.png',
      () => this.onClose()
    );

    // TODO: add ability to open the text editor with preloaded text
    this.getInnerHTML();
    this.generateElement(this.textWindow);
  }

  /**
   * Generates the DOM element of the window.
   */
  getInnerHTML() {
    this.textWindow = document.createElement('textarea');
  }

  /**
   * Called when the window is closed.
   */
  onClose() {
    if (this.textWindow.value === '') {
      this.close();
      return;
    }
    if (this.errorPresent) return;

    this.noSaveError = new Error(
      this.displayName,
      this.id,
      'You have unsaved changes!',
      this.userSaved,
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
    // save the contents of the textarea to a file
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
    console.log('closing error window only');
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
