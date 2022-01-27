function loadNav() {
  let navBar = `
        <li><a href=\"/home\">Home</a></li>
        <ul>
            <li style="cursor: pointer;" onmouseup="recycleBin()">Recycle Bin</li>
            <li style="cursor: pointer;" onmouseup="myComputer()">My Computer</li>
            <li style="cursor: pointer;" onmouseup="myDocuments()">My Documents</li>
            <ul>
                <li style="cursor: pointer;" onmouseup="jonpng()">jon.png</li>
                <li style="cursor: pointer;" onmouseup="credits()">credits.txt</li>
                <li style="cursor: pointer;" onmouseup="resume()">resume.pdf</li>
            </ul>
            <li style="cursor: pointer;" onmouseup="apps()">My Apps</li>
            <ul>
                <li style="cursor: pointer;" onmouseup="openCalculator()">Calculator</li>
                <li style="cursor: pointer;" onmouseup="txtEditor()">Text Editor</li>
                <li style="cursor: pointer;" onmouseup="initCalendar()">Calendar</li>
                <li style="cursor: pointer;" onmouseup="initEmail()">Outlook Express</li>
                <li style="cursor: pointer;" onmouseup="initMsdos()">MS-DOS Prompt</li>
                <li style="cursor: pointer;" onmouseup="initProjects()">My Projects</li>
            </ul>
            <li style="cursor: pointer;" onmouseup="nft()">My NFTs</li>
        </ul>
        <li><a href=\"https://github.com/JonZavialov/portfolio4\" target=\"_blank\">Repository</a></li>
    `;
  //TODO: populate navbar with links to all apps
  $('#treeDisplay').html(navBar);
}
