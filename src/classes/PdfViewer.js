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
    const defaultState = {
      pdf: null,
      currentPage: 1,
      zoom: 1,
    };

    // get the pdf
    pdfjsLib.getDocument(this.path).then((pdf) => {
      defaultState.pdf = pdf;

      // render the pdf into to the document
      defaultState.pdf.getPage(defaultState.currentPage).then((page) => {
        const canvas = $(this.elem).find('#pdf_renderer')[0];
        const ctx = canvas.getContext('2d');

        const viewport = page.getViewport(defaultState.zoom);

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
    });
  }
}
