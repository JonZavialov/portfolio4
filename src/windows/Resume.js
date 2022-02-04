/**
 * Opens the resume with the PDF Viewer app.
 */
function openResume() {
  const resume = new PdfViewer('/assets/text/resume.pdf', 'resume.pdf');
  resume.render();
}
