class PdfViewer extends Window{
    /**
     * The PDF Viewer app.
     * @param  {string} path - The URL of the pdf to display.
     * @param  {string} name - The name of the document.
     * @constructor
     */
    constructor(path, name){
        super('PDF Viewer', 'pdfViewer', true, 'assets/images/icons/page.png', null, name);
        this.path = path;
        this.generateElement(this.getInnerHTML());
    }

    /**
     * Generates the DOM element of the window.
     * @returns {HTMLElement} - The DOM element of the window.
     */
    getInnerHTML(){
        const viewer = document.createElement('div');
        viewer.innerHTML = "test";
        return viewer;
    }
}