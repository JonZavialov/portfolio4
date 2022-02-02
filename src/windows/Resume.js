/**
 * Opens the resume with the PDF Viewer app.
 */
function openResume(){
    const resume = new PdfViewer('assets/resume.pdf', 'resume.pdf');
    resume.render();
}