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
    this.generateElement(this.getInnerHTML());
    this.generatePDF();
  }

  /**
   * Generates the DOM element of the window.
   * @returns {HTMLElement} - The DOM element of the window.
   */
  getInnerHTML() {
    const controlButtons = [{
      image: '/assets/images/icons/backArrow.png',
      alt: 'Previous Page',
      margin: "0px",
      action: () => this.previousPage()
    }, {
      image: '/assets/images/icons/forwardArrow.png',
      alt: 'Next Page',
      margin: "0px",
      action: () => this.nextPage()
    }, {
      image: '/assets/images/icons/zoomIn.png',
      alt: 'Zoom In',
      margin: '10px',
      action: () => this.zoomIn()
    }, {
      image: '/assets/images/icons/zoomOut.png',
      alt: 'Zoom Out',
      margin: "10px",
      action: () => this.zoomOut(),
    }]
    const container = document.createElement('div');
    container.className = 'pdfContainer';

    this.viewerWidth =
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ) * 0.3;
    const viewer = document.createElement('canvas');
    viewer.id = 'pdf_renderer';
    viewer.style.width = `${this.viewerWidth}px`;

    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'controlsContainer';
    controlsContainer.style.width = `${this.viewerWidth / 4}px`;
    this.controls = controlsContainer;

    const buttonControls = document.createElement('div');
    buttonControls.className = 'buttonControls';
    controlButtons.forEach((button) => {
      const buttonDOM = document.createElement('button');
      buttonDOM.className = "PDFButton";
      buttonDOM.onclick = button.action;
      buttonDOM.style.width = `${this.viewerWidth / 8}px`;
      buttonDOM.style.marginTop = button.margin

      const image = document.createElement('img');
      image.src = button.image;
      image.alt = button.alt;

      buttonDOM.append(image)
      buttonControls.append(buttonDOM)
    })

    const pageControls = document.createElement('div');
    pageControls.className = 'pageControls';

    controlsContainer.append(buttonControls, pageControls);

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
      this.renderPDF()
    });
  }

  /**
   * Renders the PDF into the viewer.
   */
  renderPDF() {
    this.defaultState.pdf.getPage(this.defaultState.currentPage).then((page) => {
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
  }

  previousPage() {
    if (this.defaultState.pdf == null || this.defaultState.currentPage === 1)
      return;
    this.defaultState.currentPage -= 1;
    this.renderPDF();
  }

  nextPage() {
    // eslint-disable-next-line no-underscore-dangle
    if (this.defaultState.pdf == null || this.defaultState.currentPage === this.defaultState.pdf._pdfInfo.numPages)
      return;
    this.defaultState.currentPage += 1;
    this.renderPDF();
  }

  zoomIn() {
    console.log('zoom in');
  }

  zoomOut() {
    console.log('zoom out');
  }
}