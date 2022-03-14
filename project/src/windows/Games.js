class Games extends Folder {
  /**
   * The Games app.
   * @param  {function} callback - The callback to run when the window is opened.
   * @constructor
   */
  constructor(callback) {
    super(
      'Games',
      'games',
      true,
      'assets/images/icons/joystick.png',
      null,
      callback
    );
    this.setgamesList();
    this.icons = [];
  }

  /**
   * Called in addition to the close function when the folder is closed.
   */
  closeCallback() {
    this.icons.forEach((icon) => {
      iconClasses.splice(iconClasses.indexOf(icon), 1);
    });
  }

  /**
   * Sets the list of games to be displayed in the folder. Necessary for getGamesList to run asynchronously.
   */
  setgamesList() {
    this.gamesList = this.getGamesList((list) => {
      this.generate(list);
      list.forEach((icon) => {
        iconClasses.push(icon);
        this.icons.push(icon);
      });
    });
  }

  /**
   * Retrieves the list of games from the server.
   * @param  {function} callback
   */
  getGamesList(callback) {
    const gamesList = [];
    $.getJSON('/assets/json/desktop.json', (data) => {
      const ids = Object.keys(data);
      for (let i = 0; i < ids.length; i += 1) {
        const id = ids[i];
        const iconData = data[id];
        if (iconData.game === true) {
          // eslint-disable-next-line no-continue
          const iconClass = new Icon(
            iconData.displayName,
            iconData.iconImage,
            `${id}Games`,
            'games',
            window[iconData.clickFunction]
          );
          iconClass.generateElement();
          gamesList.push(iconClass);
        }
        if (i === ids.length - 1) callback(gamesList);
      }
    });
  }
}

function openGames() {
  const games = new Games(() => games.render());
}
