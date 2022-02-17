class Calculator extends Window {
  /**
   * The calculator app.
   * @constructor
   */
  constructor() {
    super(
      'Calculator',
      'calculator',
      true,
      'assets/images/icons/calculator.png'
    );

    this.MAINBUTTONS = [{
        '7': 'number'
      },
      {
        '8': 'number'
      },
      {
        '9': 'number'
      },
      {
        '/': 'operator'
      },
      {
        '4': 'number'
      },
      {
        '5': 'number'
      },
      {
        '6': 'number'
      },
      {
        '*': 'operator'
      },
      {
        '1': 'number'
      },
      {
        '2': 'number'
      },
      {
        '3': 'number'
      },
      {
        '–': 'operator'
      },
    ];

    this.createCalculator();
    this.generateElement(this.container);
    this.state = 'cleared';
  }

  /**
   * Called when a button is clicked.
   * @param  {string} content - The content of the button.
   * @param  {string} type - The type of the button.
   */
  processInput(content, type) {
    if (content === 'C') {
      this.state = 'cleared';
      this.display.innerHTML = '0';
      return;
    }
    if (this.display.innerHTML.length >= 24 && content !== '=') return;

    if (this.state === 'cleared') {
      if (type === 'number') {
        this.display.innerHTML = content;
        this.state = 'firstInput';
      }
      if (type === 'operator') {
        this.display.innerHTML += ` ${content} `;
        this.state = 'secondInput';
      }
    } else if (this.state === 'firstInput') {
      if (type === 'number') this.display.innerHTML += content;
      else if (type === 'operator') {
        this.display.innerHTML += ` ${content} `;
        this.state = 'secondInput';
      }
    } else if (this.state === 'secondInput' && type === 'number')
      this.display.innerHTML += content;
    else if (
      content === '=' &&
      this.state === 'secondInput' &&
      this.display.innerHTML.charAt(this.display.innerHTML.length - 1) !== ' '
    ) {
      this.display.innerHTML = this.evaluateCalc(this.display.innerHTML);
      this.state = 'cleared';
    }
  }

  /**
   * Evaluates the calculator's expression.
   * @param  {string} statement - The statement to evaluate.
   * @returns {number} - The result of the calculation.
   */
  evaluateCalc(statement) {
    const args = statement.split(' ');
    let result;
    switch (args[1]) {
      case '+':
        result = parseFloat(args[0]) + parseFloat(args[2]);
        break;
      case '–':
        result = parseFloat(args[0]) - parseFloat(args[2]);
        break;
      case '*':
        result = parseFloat(args[0]) * parseFloat(args[2]);
        break;
      case '/':
        result = parseFloat(args[0]) / parseFloat(args[2]);
        break;
      default:
        result = 'error';
    }

    return result;
  }

  /**
   * Creates the calculator DOM element.
   */
  createCalculator() {
    const calculatorContainer = document.createElement('div');
    this.container = calculatorContainer;

    const display = document.createElement('div');
    display.className = 'calculatorDisplay';
    display.innerHTML = '0';
    this.display = display;

    const mainButtonsContainer = document.createElement('div');
    mainButtonsContainer.className = 'calculatorMainButtons';

    this.generateButtons(mainButtonsContainer);
    this.container.append(display, mainButtonsContainer);
  }

  /**
   * Generates the button DOM elements and classes for the calculator.
   * @param  {HTMLElement} mainButtonsContainer - The container to generate the buttons into.
   */
  generateButtons(mainButtonsContainer) {
    let button;
    this.currentRow = document.createElement('div');
    this.currentRow.className = 'calculatorRow';
    mainButtonsContainer.append(this.currentRow);
    button = new CalculatorButton('C', 'special', this);
    button.generate();
    button.element.style = 'min-width: 70px; position: absolute; right: 11px;';
    button.renderIntoParent(this.currentRow);

    let i = 0;
    this.MAINBUTTONS.forEach((pair) => {
      if (i === 0 || i % 4 === 0) {
        this.currentRow = document.createElement('div');
        this.currentRow.className = 'calculatorRow';
        if (i === 0) this.currentRow.style = 'margin-top: 35px;';
        mainButtonsContainer.append(this.currentRow);
      }
      i += 1;
      const content = Object.keys(pair)[0];
      const type = pair[content];
      const newButton = new CalculatorButton(content, type, this);
      newButton.generate();
      newButton.element.style = 'margin-left: 5px;';
      newButton.renderIntoParent(this.currentRow);
    });

    this.currentRow = document.createElement('div');
    this.currentRow.className = 'calculatorRow';
    mainButtonsContainer.append(this.currentRow);
    button = new CalculatorButton('0', 'number', this);
    button.generate();
    button.element.style = 'margin-left: 5px; width: 45.75px;';
    button.renderIntoParent(this.currentRow);
    button = new CalculatorButton('+', 'operator', this);
    button.generate();
    button.element.style = 'position: absolute; right: 11px; width: 45.75px;';
    this.currentRow.style = 'margin-bottom: 39px';
    button.renderIntoParent(this.currentRow);

    button = new CalculatorButton('=', 'special', this);
    button.generate();
    button.element.style =
      'position: absolute; transform: translate(157px, -34px); width: 45.75px;';
    button.renderIntoParent(mainButtonsContainer);

    const blankButton = document.createElement('div');
    blankButton.className = 'calculatorBlankButton';
    mainButtonsContainer.append(blankButton);
  }
}

/**
 * Opens the calculator app.
 */
function openCalculator() {
  const calculator = new Calculator();
  calculator.render();
}