class InternetExplorer extends Window {
  /**
   * The browser.
   * @param  {string} pageName - The name of the page to be displayed.
   * @param  {string} id - The id of the window.
   * @param  {string} url - The URL of the page to be displayed.
   * @constructor
   */
  constructor(pageName, id, url) {
    super(`${pageName} - Microsoft Internet Explorer`, id, true, 'assets/images/icons/internet.png');
    this.generateElement(this.generateHTML(url));
  }

  /**
   * Generates the DOM element of the window.
   * @param  {string} url - The URL of the page to be displayed.
   * @returns {HTMLElement} - The DOM element of the window.
   */
  generateHTML(url) {
    const docsBody = document.createElement('div')
    docsBody.append(this.generateWidgetsBar())
    docsBody.append(this.generateIFrame(url))
    return docsBody
  }

  /**
   * Generates the DOM element of the widgets bar at the top of the browser.
   * @returns {HTMLElement} - The DOM element of the bar.
   */
  generateWidgetsBar() {
    const widgetsBar = document.createElement('div')
    widgetsBar.id = "buttonsHeader"
    widgetsBar.className = "internet-explorer-widgets-bar"
    
    const backButton = document.createElement('div')
    backButton.id = "outlookHeaderButton"
    const backImage = document.createElement('img')
    backImage.src = "assets/images/backArrow.png"
    backButton.append(backImage)
    const backLabel = document.createElement('p')
    backLabel.innerText = "Back"
    backButton.append(backLabel)
    widgetsBar.append(backButton)
    backButton.onmousedown = () => {
      $(backButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
    }
    backButton.onmouseup = () => {
      $(backButton).css('box-shadow', '')
    }

    const forwardButton = document.createElement('div')
    forwardButton.id = "outlookHeaderButton"
    const forwardImage = document.createElement('img')
    forwardImage.src = "assets/images/forwardArrow.png"
    forwardButton.append(forwardImage)
    const forwardLabel = document.createElement('p')
    forwardLabel.innerText = "Forward"
    forwardButton.append(forwardLabel)
    widgetsBar.append(forwardButton)
    forwardButton.onmousedown = () => {
      $(forwardButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
    }
    forwardButton.onmouseup = () => {
      $(forwardButton).css('box-shadow', '')
    }

    const stopButton = document.createElement('div')
    stopButton.id = "outlookHeaderButton"
    const stopImage = document.createElement('img')
    stopImage.src = "assets/images/icons/close.png"
    stopButton.append(stopImage)
    const stopLabel = document.createElement('p')
    stopLabel.innerText = "Stop"
    stopButton.append(stopLabel)
    widgetsBar.append(stopButton)
    stopButton.onmousedown = () => {
      $(stopButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
    }
    stopButton.onmouseup = () => {
      $(stopButton).css('box-shadow', '')
      this.close()
    }

    const refreshButton = document.createElement('div')
    refreshButton.id = "outlookHeaderButton"
    const refreshImage = document.createElement('img')
    refreshImage.src = "assets/images/icons/refresh.png"
    refreshButton.append(refreshImage)
    const refreshLabel = document.createElement('p')
    refreshLabel.innerText = "Refresh"
    refreshButton.append(refreshLabel)
    widgetsBar.append(refreshButton)
    refreshButton.onmousedown = () => {
      $(refreshButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
    }
    refreshButton.onmouseup = () => {
      $(refreshButton).css('box-shadow', '')
      this.frame.src += '' // Refreshes the page
    }

    const hr1 = document.createElement('hr');
    hr1.style.transform = 'translateX(170px)';
    widgetsBar.append(hr1);

    const searchButton = document.createElement('div')
    $(searchButton).css('margin-left', '20px')
    searchButton.id = "outlookHeaderButton"
    const searchImage = document.createElement('img')
    searchImage.src = "assets/images/icons/search.png"
    searchButton.append(searchImage)
    const searchLabel = document.createElement('p')
    searchLabel.innerText = "Search"
    searchButton.append(searchLabel)
    widgetsBar.append(searchButton)
    searchButton.onmousedown = () => {
        $(searchButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
    }
    searchButton.onmouseup = () => {
        $(searchButton).css('box-shadow', '')
        this.frame.src = '/google'
    }

    const hr2 = document.createElement('hr');
    hr2.style.transform = 'translateX(230px)';
    widgetsBar.append(hr2);

    const mailButton = document.createElement('div')
    $(mailButton).css('margin-left', '20px')
    mailButton.id = "outlookHeaderButton"
    const mailImage = document.createElement('img')
    mailImage.src = "assets/images/icons/outlook.png"
    mailButton.append(mailImage)
    const mailLabel = document.createElement('p')
    mailLabel.innerText = "Mail"
    mailButton.append(mailLabel)
    widgetsBar.append(mailButton)
    mailButton.onmousedown = () => {
      $(mailButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
    }
    mailButton.onmouseup = () => {
      $(mailButton).css('box-shadow', '')
      openOutlookExpress()
    }

    const printButton = document.createElement('div')
    $(printButton).css('margin-left', '7px')
    printButton.id = "outlookHeaderButton"
    const printImage = document.createElement('img')
    printImage.src = "assets/images/icons/print.png"
    printButton.append(printImage)
    const printLabel = document.createElement('p')
    printLabel.innerText = "Print"
    printButton.append(printLabel)
    widgetsBar.append(printButton)
    printButton.onmousedown = () => {
      $(printButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
    }
    printButton.onmouseup = () => {
      $(printButton).css('box-shadow', '')
    }

    const msnLogo = document.createElement('img')
    msnLogo.src = "assets/images/icons/msn.png"
    msnLogo.className = 'msn-butterfly'
    widgetsBar.append(msnLogo)

    return widgetsBar
  }

  /**
   * Generates the DOM element of the webpage in the browser
   *@param {string} url - The url of the webpage to be loaded
   * @returns {HTMLElement} - The DOM element of the webpage.
   */
  generateIFrame(url) {
    const iframe = document.createElement('iframe')
    iframe.className = "internet-explorer-iframe"
    iframe.src=url
    this.frame = iframe
    return iframe
  }
}