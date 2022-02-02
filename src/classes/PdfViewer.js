class PdfViewer extends Window{
    constructor(path, name){
        super('PDF Viewer', 'pdfViewer', true, 'assets/images/icons/page.png', null, name);
        this.path = path;
        this.generateElement(this.getInnerHTML());
    }

    getInnerHTML(){
        return "pdf"
    }
}