/**
 * Renders the navigation bar into the DOM.
 */
function loadNav() {
  const POINTERS = {
    'myDocuments': 'document',
    'myApps': 'app',
  };

  const currentYear = new Date().getFullYear();

  const homeLabel = document.createElement('li');
  homeLabel.innerHTML = '<a href="/?booted=true">Home</a>';
  const appsList = document.createElement('ul');
  const repoLabel = document.createElement('li');
  repoLabel.innerHTML =
    '<a href="https://github.com/JonZavialov/portfolio4" target="_blank">Repository</a>';

  const copyright = document.createElement('p');
  copyright.id = 'copyrightStatement';
  copyright.innerText = `© ${currentYear} Jonathan Zavialov`;

  $.getJSON('/assets/json/desktop.json', (data) => {
    const appIDs = Object.keys(data);
    for (let i = 0; i < appIDs.length; i += 1) {
      const appObj = data[appIDs[i]];
      const children = Object.values(POINTERS);
      const containers = Object.keys(POINTERS);

      // eslint-disable-next-line no-continue
      if (children.includes(appObj.type)) continue;

      const listElem = document.createElement('li');
      listElem.style.cursor = 'pointer';
      listElem.onmouseup = window[appObj.clickFunction];
      listElem.innerHTML = appObj.displayName;
      appsList.append(listElem);

      if (containers.includes(appIDs[i])) {
        const fullList = document.createElement('ul');
        for (let j = 0; j < appIDs.length; j += 1) {
          const appObjNested = data[appIDs[j]];
          if (appObjNested.type === POINTERS[appIDs[i]]) {
            const listElemNested = document.createElement('li');
            listElemNested.style.cursor = 'pointer';
            listElemNested.onmouseup = window[appObjNested.clickFunction];
            listElemNested.innerHTML = appObjNested.displayName;
            fullList.append(listElemNested);
          }
        }
        appsList.append(fullList);
      }
    }

    $('#treeDisplay').append(homeLabel, appsList, repoLabel, copyright);
  });
}