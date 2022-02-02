function openResume(){
    const resume = new PdfViewer('assets/resume.pdf', 'resume.pdf');
    resume.render();
}