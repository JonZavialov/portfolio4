class CalculatorButton {
  /**
   * The calculator button class.
   * @param  {string} content - The content of the button.
   * @param  {string} type - The type of the button.
   * @param  {Calculator} parentClass - The class of the calculator that the button belongs to.
   */
  constructor(content, type, parentClass) {
    this.content = content;
    this.type = type;
    this.onclickFunction = () => {
      parentClass.processInput(content, type);
    };
  }

  /**
   * Generates the button DOM element.
   */
  generate() {
    const button = document.createElement('button');
    button.innerHTML = this.content;
    button.onclick = this.onclickFunction;
    if (this.type === 'operator' || this.type === 'special')
      button.className = 'redText';
    this.element = button;
  }

  /**
   * Renders the button into the parent element.
   * @param  {HTMLElement} parent - The parent element to generate the button into.
   */
  renderIntoParent(parent) {
    parent.append(this.element);
  }
}
