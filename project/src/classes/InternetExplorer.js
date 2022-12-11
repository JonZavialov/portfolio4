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
    // TODO: Add bookmarks tab
    // TODO: change page title when page is changed
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
    
    addNodesToDom(widgetsBar, 'InternetExplorer.html', (vars) => {
      const { backButton, forwardButton, stopButton, refreshButton, searchButton, mailButton, printButton } = vars

      backButton.onmousedown = () => {
        $(backButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
      }
      backButton.onmouseup = () => {
        $(backButton).css('box-shadow', '')
      }

      forwardButton.onmousedown = () => {
        $(forwardButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
      }
      forwardButton.onmouseup = () => {
        $(forwardButton).css('box-shadow', '')
      }

      stopButton.onmousedown = () => {
        $(stopButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
      }
      stopButton.onmouseup = () => {
        $(stopButton).css('box-shadow', '')
        this.close()
      }

      refreshButton.onmousedown = () => {
        $(refreshButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
      }
      refreshButton.onmouseup = () => {
        $(refreshButton).css('box-shadow', '')
        this.frame.src += '' // Refreshes the page
      }

      searchButton.onmousedown = () => {
        $(searchButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
      }
      searchButton.onmouseup = () => {
        $(searchButton).css('box-shadow', '')
        this.frame.src = '/google'
      }

      mailButton.onmousedown = () => {
        $(mailButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
      }
      mailButton.onmouseup = () => {
        $(mailButton).css('box-shadow', '')
        openOutlookExpress()
      }

      printButton.onmousedown = () => {
        $(printButton).css('box-shadow', 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey')
      }
      printButton.onmouseup = () => {
        $(printButton).css('box-shadow', '')
      }
    })

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
