/**
 * Renders the navigation bar into the DOM.
 */
function loadNav() {
  const navBar = `
        <li><a href="/?booted=true">Home</a></li>
        <ul>
            <li style="cursor: pointer;" onmouseup="openRecycleBin()">Recycle Bin</li>
            <li style="cursor: pointer;" onmouseup="openMyComputer()">My Computer</li>
            <li style="cursor: pointer;" onmouseup="openMyDocuments()">My Documents</li>
            <ul>
                <li style="cursor: pointer;" onmouseup="openJonpng()">jon.png</li>
                <li style="cursor: pointer;" onmouseup="openCredits()">credits.txt</li>
                <li style="cursor: pointer;" onmouseup="openResume()">resume.pdf</li>
            </ul>
            <li style="cursor: pointer;" onmouseup="openMyApps()">My Apps</li>
            <ul>
                <li style="cursor: pointer;" onmouseup="openCalculator()">Calculator</li>
                <li style="cursor: pointer;" onmouseup="openTextEditor()">Text Editor</li>
                <li style="cursor: pointer;" onmouseup="openCalendar()">Calendar</li>
                <li style="cursor: pointer;" onmouseup="openOutlookExpress()">Outlook Express</li>
                <li style="cursor: pointer;" onmouseup="openDictionary()">Dictionary</li>
                <li style="cursor: pointer;" onmouseup="openMyProjects()">My Projects</li>
            </ul>
        </ul>
        <li><a href="https://github.com/JonZavialov/portfolio4" target="_blank">Repository</a></li>
    `;
  $('#treeDisplay').html(navBar);
}
