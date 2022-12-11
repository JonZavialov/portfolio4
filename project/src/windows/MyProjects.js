class MyProjects extends Window {
  /**
   * The My Projects app.
   * @constructor
   */
  constructor() {
    super(
      'My Projects',
      'myProjects',
      true,
      'assets/images/icons/myprojects.png'
    );
    this.generateElement(this.generateHTML());
  }

  /**
   * Generates the DOM element of the window.
   */
  generateHTML() {
    const container = document.createElement('div');

    addNodesToDom(container, 'MyProjects.html', () => {
      this.getTopProjects();
    })
    
    return container;
  }

  /**
   * Sets the top projects to their containers.
   * @async
   * @param  {Array} topProjects - The top projects to display.
   */
  async setProjectWindows(topProjects) {
    const projectWindows = [
      $(this.elem).find('#projectWindow1'),
      $(this.elem).find('#projectWindow2'),
      $(this.elem).find('#projectWindow3'),
      $(this.elem).find('#projectWindow4'),
    ];
    for (let i = 0; i < projectWindows.length; i += 1) {
      const header = document.createElement('div');
      header.style.display = 'flex';
      const headerImg = document.createElement('img');
      headerImg.src = '/assets/images/icons/projectsIcon.png';
      const headerTitle = document.createElement('div');
      headerTitle.className = 'projectTitle';
      headerTitle.onclick = () =>
        window.open(topProjects[i].html_url, '_blank').focus();
      const headerTitleParagraph = document.createElement('p');
      headerTitleParagraph.innerText = topProjects[i].full_name;
      headerTitleParagraph.style.fontWeight = 'bold';

      headerTitle.append(headerTitleParagraph);
      header.append(headerImg, headerTitle);

      const description = document.createElement('p');
      description.innerText = topProjects[i].description;

      const lang = document.createElement('p');
      lang.innerText = topProjects[i].language;
      lang.style.color = '#818181';

      projectWindows[i].append(header, '<br>', description, '<br>', lang);
    }
  }

  /**
   * Gets the top projects from GitHub.
   */
  getTopProjects() {
    $.getJSON(
      'https://api.github.com/users/JonZavialov/starred',
      (starredJSON) => {
        const topProjects = [];
        for (let i = 0; i < 4; i += 1) topProjects.push(starredJSON[i]);

        this.setProjectWindows(topProjects);
      }
    );
  }
}

/**
 * Opens the My Projects app.
 */
function openMyProjects() {
  const myProjects = new MyProjects();
  myProjects.render();
}
