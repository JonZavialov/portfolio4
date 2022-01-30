class Error extends Window {
  /**
   * The error window.
   * @param  {string} displayName - The name that will be displayed for the window.
   * @param  {string} id - The id of the window which will be used to identify it.
   * @param  {string} errorText - The text that will be displayed in the error window.
   * @param  {function} okFunction - The function that will be called when the OK button is clicked.
   * @param  {} [cancelFunction=null] - The function that will be called when the Cancel button is clicked.
   * @param  {} [closeFunction=null] - The function that will be called when the error is closed. If null, the default close function will be used.
   */
  constructor(
    displayName,
    id,
    errorText,
    okFunction,
    cancelFunction = null,
    closeFunction = null
  ) {
    super(displayName, `${id}Error`, false, null, closeFunction);
    this.errorText = errorText;
    this.okFunction = okFunction;
    this.cancelFunction = cancelFunction;

    this.generateElement(this.generate());
  }

  /**
   * Generates the DOM element for the error window.
   */
  generate() {
    const parent = document.createElement('div');

    const errorText = document.createElement('p');
    errorText.innerHTML = this.errorText;
    parent.append(errorText);

    const footer = document.createElement('section');
    footer.className = 'field-row';
    footer.style = 'justify-content: flex-end';
    parent.append(footer);

    const okButton = document.createElement('button');
    okButton.innerHTML = 'OK';
    okButton.onclick = () => this.okFunction();
    footer.append(okButton);

    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Cancel';
    if (this.cancelFunction) {
      cancelButton.onclick = () => this.cancelFunction();
    } else {
      cancelButton.onclick = () => this.close();
    }
    footer.append(cancelButton);

    return parent;
  }
}
