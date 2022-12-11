/**
 * Opens the documentation app.
 */
async function openDocumentation() {
    $('.docsIcon').draggable('disable');
    await sleep(10);
    $('.docsIcon').draggable('enable');
    
    const documentation = new InternetExplorer('JonZav API', 'documentation', 'https://api.jonzav.me');
    documentation.render();
}