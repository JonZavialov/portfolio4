class Error extends Window {
  /**
   * The error window.
   * @param  {string} displayName - The name that will be displayed for the window.
   * @param  {string} id - The id of the window which will be used to identify it.
   * @param  {string} errorText - The text that will be displayed in the error window.
   * @param  {function} okFunction - The function that will be called when the OK button is clicked.
   * @param  {string} [altOKText='OK'] - Alternate text that will be displayed on the OK button.
   * @param  {function} [cancelFunction=null] - The function that will be called when the Cancel button is clicked.
   * @param  {function} [closeFunction=null] - The function that will be called when the error is closed. If null, the default close function will be used.
   * @constructor
   */
  constructor(
    displayName,
    id,
    errorText,
    okFunction,
    altOKText = 'OK',
    cancelFunction = null,
    closeFunction = null
  ) {
    super(displayName, `${id}Error`, false, null, closeFunction);
    this.errorText = errorText;
    this.okFunction = okFunction;
    this.cancelFunction = cancelFunction;
    this.altOKText = altOKText;

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
    okButton.innerHTML = this.altOKText;
    okButton.onclick = () => this.okFunction();
    footer.append(okButton);

    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.onclick = this.cancelFunction
      ? () => this.cancelFunction()
      : () => this.close();

    footer.append(cancelButton);

    return parent;
  }
}
