class Msdos extends Window {
  /**
   * The MSDOS window.
   * @constructor
   */
  constructor() {
    super('MS-DOS Prompt', 'msdos', true, 'assets/images/icons/msdos.png', () =>
      this.closeShell()
    );
    this.inputtedCommands = []
    this.prevCommandIndex = 0
    this.generateElement(this.generateHTML());
    this.addNewInput();
  }

  /**
   * Generates the DOM element for the window.
   */
  generateHTML() {
    const container = document.createElement('div');
    container.className = 'msdosDisplay';
    container.innerHTML = `
    <p style="padding-top: 30px">
        Microsoft(R) Windows 98 <br>
        &nbsp&nbsp&nbsp(C)Copyright Microsoft Corp 1981-1999.
    </p>`;

    return container;
  }

  /**
   * Adds a new input to the window.
   */
  addNewInput() {
    if (this.currentInput) this.currentInput.contentEditable = false;

    const workArea = document.createElement('div');
    workArea.className = 'workArea';

    const dir = document.createElement('p');
    dir.className = 'msdosDir';
    dir.innerHTML = `C:\\>`;
    workArea.append(dir);

    const newInput = document.createElement('div');
    this.currentInput = newInput;
    newInput.contentEditable = true;
    newInput.className = 'msdosInput';
    workArea.append(newInput);
    workArea.oninput = () => {
      if (workArea.innerHTML.indexOf('<div>') !== -1) {
        let command = newInput.innerHTML;
        command = command.substring(command.indexOf('<div>'), -1);
        newInput.innerHTML = command;
        if (command === '') return;

        this.handleCommand(command);
        clearInterval(this.tickerInterval);
      }
    };
    $(newInput).on('keydown', (e) => {
      if (e.key === "ArrowUp") this.lastCommand()
    })

    $(this.elem).find('.msdosDisplay').append(workArea);
    setTimeout(() => {
      // not sure why this works, but it does :)
      newInput.focus();
      this.setInputTicker(newInput);
    }, 0);
  }

  /**
   * Inputs the previous command into the shell.
   */
  lastCommand() {
    if (this.prevCommandIndex === 0) return

    this.prevCommandIndex -= 1
    this.currentInput.innerHTML = (this.inputtedCommands[this.prevCommandIndex])
    if (!this.tickOff) this.currentInput.innerHTML += '_'
  }

  /**
   * Called when the user enters a command.
   * @param  {string} command - The command entered by the user.
   */
  handleCommand(command) {
    this.inputtedCommands.push(command)
    this.prevCommandIndex = this.inputtedCommands.length

    const commandArray = command.split(' ');
    const commandName = commandArray[0];
    const commandArgs = commandArray.slice(1);

    $.getJSON('/assets/json/msdos.json', (data) => {
      if (data[commandName]) {
        if (data[commandName].args) {
          const args = Object.keys(data[commandName].args);
          let requiredArgs = 0;
          for (let i = 0; i < args.length; i += 1)
            if (data[commandName].args[args[i]].optional === false)
              requiredArgs += 1;

          if (requiredArgs > commandArgs.length) {
            this.throwArgsError(requiredArgs, commandArgs.length);
            return;
          }
        }

        window[data[commandName].function](this, commandArgs);
      } else this.throwCmdError(commandName);
    });
  }

  /**
   * Called when the user enters not enough arguments.
   * @param  {number} required - The number of required arguments.
   * @param  {number} given - The number of given arguments.
   */
  throwArgsError(required, given) {
    this.output(
      `Illegal number of arguments: ${required} required, ${given} given.`
    );
  }

  /**
   * Called when the command is invalid.
   * @param  {string} name - The command name.
   */
  throwCmdError(name) {
    this.output(`Illegal command: ${name}.`);
  }

  /**
   * Outputs text to the window.
   * @param  {string} text - The text to output.
   */
  output(text) {
    const outputText = document.createElement('p');
    outputText.innerHTML = text;
    outputText.className = 'msdosOutput';
    $(this.elem).find('.msdosDisplay').append(outputText);
    this.addNewInput();
  }

  /**
   * Sets the input ticker.
   * @param  {HTMLElement} input - The input element.
   */
  setInputTicker(input) {
    this.tickOff = true;
    this.tickerInterval = setInterval(() => {
      if (this.tickOff) {
        input.innerHTML += '_';
        this.setCursorPosition(input, -1);
        this.tickOff = false;
      } else {
        this.tickOff = true;
        input.innerHTML = input.innerHTML.slice(0, -1);
        this.setCursorPosition(input);

        if (input.innerHTML.charAt(input.innerHTML.length - 1) === ' ') {
          input.innerHTML = input.innerHTML.slice(0, -1);
          input.innerHTML += '&nbsp;';
          this.setCursorPosition(input);
        }
      }
    }, 150);
  }

  /**
   * Sets the caret in the input element.
   * @param  {HTMLElement} input - The input element.
   * @param  {number} [pos=0] - The position to set the caret to.
   */
  setCursorPosition(input, pos = 0) {
    if (document.activeElement !== input || input.innerHTML.length === 0)
      return;

    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(
      input.childNodes[0],
      input.innerHTML.replaceAll('&nbsp;', ' ').length + pos
    );
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  /**
   * Called to close the window and clear the ticker interval.
   */
  closeShell() {
    this.close();
    clearInterval(this.tickerInterval);
  }
}

/**
 * Opens the MSDOS app.
 */
function openMSDOS() {
  const msdos = new Msdos();
  msdos.render();
}