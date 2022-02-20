class PdfViewer extends Window {
  /**
   * The PDF Viewer app.
   * @param  {string} path - The URL of the pdf to display.
   * @param  {string} name - The name of the document.
   * @constructor
   */
  constructor(path, name) {
    super(
      'PDF Viewer',
      'pdfViewer',
      true,
      'assets/images/icons/page.png',
      null,
      name
    );
    this.path = path;
    this.viewerWidth = 300;
    this.generateElement(this.getInnerHTML());
    this.generatePDF();
  }

  /**
   * Generates the DOM element of the window.
   * @returns {HTMLElement} - The DOM element of the window.
   */
  getInnerHTML() {
    const controlButtons = [
      {
        image: '/assets/images/backArrow.png',
        alt: 'Previous Page',
        transform: 'translate(8px, -16px)',
        action: () => this.previousPage(),
      },
      {
        image: '/assets/images/forwardArrow.png',
        alt: 'Next Page',
        transform: 'translate(19px, -16px)',
        action: () => this.nextPage(),
      },
    ];
    const container = document.createElement('div');
    container.className = 'pdfContainer';

    const viewer = document.createElement('canvas');
    viewer.id = 'pdf_renderer';
    viewer.style.width = `${this.viewerWidth}px`;

    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'controlsContainer';
    controlsContainer.style.width = `${this.viewerWidth / 4}px`;
    this.controls = controlsContainer;

    const buttonControls = document.createElement('div');
    buttonControls.className = 'buttonControls';
    const label = document.createElement('p');
    label.innerHTML = 'Controls:';
    buttonControls.append(label);
    controlButtons.forEach((button) => {
      const buttonDOM = document.createElement('button');
      buttonDOM.className = 'PDFButton';
      buttonDOM.onclick = button.action;
      buttonDOM.style.transform = button.transform;

      const image = document.createElement('img');
      image.src = button.image;
      image.alt = button.alt;

      buttonDOM.append(image);
      buttonControls.append(buttonDOM);
    });

    this.pageDisplay = document.createElement('div');
    this.pageDisplay.className = 'pageControls';

    controlsContainer.append(buttonControls, this.pageDisplay);

    container.append(controlsContainer, viewer);
    return container;
  }

  /**
   * Generates the PDF.
   */
  generatePDF() {
    this.defaultState = {
      pdf: null,
      currentPage: 1,
      zoom: 1,
    };

    pdfjsLib.getDocument(this.path).then((pdf) => {
      this.defaultState.pdf = pdf;
      this.renderPDF();
    });
  }

  /**
   * Renders the PDF into the viewer.
   */
  renderPDF() {
    this.defaultState.pdf
      .getPage(this.defaultState.currentPage)
      .then((page) => {
        const canvas = $(this.elem).find('#pdf_renderer')[0];
        const ctx = canvas.getContext('2d');

        const viewport = page.getViewport(this.defaultState.zoom);

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        $(this.controls).css(
          'height',
          `${(this.viewerWidth / viewport.width) * viewport.height}px`
        );

        page.render({
          canvasContext: ctx,
          viewport,
        });
      });

    this.updatePageDisplay();

    const buttons = $(this.controls).find('.PDFButton');
    if (this.defaultState.currentPage === 1) {
      buttons[0].setAttribute('disabled', true);
      buttons[0].style.boxShadow =
        'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080';
    }
    if (
      // eslint-disable-next-line no-underscore-dangle
      this.defaultState.currentPage === this.defaultState.pdf._pdfInfo.numPages
    ) {
      buttons[1].setAttribute('disabled', true);
      buttons[1].style.boxShadow =
        'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080';
    }
    if (
      this.defaultState.currentPage !== 1 &&
      // eslint-disable-next-line no-underscore-dangle
      this.defaultState.currentPage !== this.defaultState.pdf._pdfInfo.numPages
    )
      buttons.each((_i, button) => {
        button.removeAttribute('disabled');
        button.style.boxShadow = null;
      });
  }

  /**
   * Renders the previous page.
   */
  previousPage() {
    if (this.defaultState.pdf == null || this.defaultState.currentPage === 1)
      return;
    this.defaultState.currentPage -= 1;
    this.renderPDF();
  }

  /**
   * Renders the next page.
   */
  nextPage() {
    if (
      this.defaultState.pdf == null ||
      // eslint-disable-next-line no-underscore-dangle
      this.defaultState.currentPage === this.defaultState.pdf._pdfInfo.numPages
    )
      return;
    this.defaultState.currentPage += 1;
    this.renderPDF();
  }

  /**
   * Updates the page display.
   */
  updatePageDisplay() {
    this.pageDisplay.innerHTML = '';
    // eslint-disable-next-line no-underscore-dangle
    for (let i = 0; i < this.defaultState.pdf._pdfInfo.numPages; i += 1) {
      const page = document.createElement('p');
      page.innerHTML = `Page ${i + 1}`;
      page.className = 'pageNumber';
      page.onclick = () => {
        this.defaultState.currentPage = i + 1;
        this.renderPDF();
      };
      if (i + 1 === this.defaultState.currentPage)
        page.style.backgroundColor = 'lightgray';
      this.pageDisplay.append(page);
    }
  }
}
