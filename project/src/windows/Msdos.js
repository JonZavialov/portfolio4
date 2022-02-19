class Msdos extends Window {
  constructor() {
    super('MS-DOS Prompt', 'msdos', true, 'assets/images/icons/msdos.png');
    this.generateElement(this.generateHTML());
    this.addNewInput();
  }

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

  addNewInput() {
    const workArea = document.createElement('div');
    workArea.className = 'workArea';

    const dir = document.createElement('p');
    dir.className = 'msdosDir';
    dir.innerHTML = `C:\\>`;
    workArea.append(dir);

    const newInput = document.createElement('div');
    newInput.contentEditable = true;
    newInput.className = 'msdosInput';
    workArea.append(newInput);

    $(this.elem).find('.msdosDisplay').append(workArea);
    setTimeout(() => {
      // not sure why this works, but it does :)
      newInput.focus();
      this.setInputTicker(newInput);
    }, 0);
  }

  setInputTicker(input) {
    this.tickOff = true;
    this.tickerInterval = setInterval(() => {
      if (this.tickOff) {
        input.innerHTML += '_';
        this.setCursorPosition(input, -1);
        this.tickOff = false;
      } else {
        this.tickOff = true;

        // TODO: error happens here
        if (input.innerHTML.indexOf(' ') !== -1) console.log('yes');

        input.innerHTML = input.innerHTML.slice(0, -1);
        this.setCursorPosition(input);
      }
    }, 300);
  }

  setCursorPosition(input, pos = 0) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(
      input.childNodes[0],
      input.innerHTML.replace('&nbsp;', ' ').length + pos
    );
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

function openMSDOS() {
  const msdos = new Msdos();
  msdos.render();
}
