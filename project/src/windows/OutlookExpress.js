class OutlookExpress extends Window {
  /**
   * The Outlook Express App.
   * @param {string} [email='DEFAULT'] - The email to display.
   * @param {boolean} [center=false] - Whether or not the window should be centered.
   * @constructor
   */
  constructor(email = 'DEFAULT', center = false) {
    super(
      'Outlook Express',
      'outlookExpress',
      true,
      'assets/images/icons/outlook.png'
    );

    this.isCentered = center;
    this.generateElement(this.generateHTML(email));
  }

  /**
   * Generates the DOM element for the window.
   * @param {string} email - The email to display.
   * @returns {HTMLElement} - The DOM element of the window.
   */
  generateHTML(email) {
    const emailBody = document.createElement('div');
    emailBody.id = 'emailBody';
    emailBody.append(this.generateButtonsHeader());
    emailBody.append(this.generateInbox(email));
    return emailBody;
  }

  /**
   * Retrieves all email contents from the json.
   * @param  {function} [callback=null] - The callback function to execute after the emails have been retrieved.
   */
  getEmails(callback = null) {
    $.getJSON('/assets/json/emails.json', (data) => {
      this.emailsJSON = data;
      if (callback) callback();
    });
  }

  /**
   * Sets the selected email to the email display.
   * @param  {string} identifier - The identifier of the email to display.
   */
  setEmail(identifier) {
    const display = $(this.elem).find('#emailDisplay');
    display.html(this.emailsJSON[identifier]);
    if (this.isCentered) {
      this.center();
      this.isCentered = false;
    }
  }

  /**
   * Executes when the inbox is clicked.
   */
  clickedInbox() {
    const element = $(this.elem).find('#inboxTreeElem')[0];

    if (
      element.style.borderColor === '' ||
      element.style.borderColor === 'rgb(231, 231, 231)'
    ) {
      // inbox list is showing
      element.style.borderColor = 'rgb(0, 0, 0)';

      const inboxTree = document.createElement('ul');
      inboxTree.innerHTML = `<li>intro@jonzav.me</li>`;
      element.append(inboxTree);

      this.setEmail('INTRO');
    } else {
      // inbox list is not showing
      element.style.borderColor = 'rgb(231, 231, 231)';

      const inboxTree = $(element).find('ul')[0];
      inboxTree.remove();

      this.setEmail('DEFAULT');
    }
  }

  /**
   * Centers the window.
   */
  center() {
    $(this.elem).css({
      left:
        $('#desktop').width() / 2 -
        $(this.elem).width() / 2 +
        window.innerWidth * 0.15,
      top: $('#desktop').height() / 2 - $(this.elem).height() / 2,
    });
  }

  /**
   * Generates the DOM element for the header full of buttons.
   * @returns {HTMLElement} - The DOM element for the header.
   */
  generateButtonsHeader() {
    const buttonsHeader = document.createElement('div');
    buttonsHeader.id = 'buttonsHeader';

    addNodesToDom(
      buttonsHeader,
      'OutlookExpress.html #buttonsHeader-container',
      (vars) => {
        const { composeButton } = vars;

        composeButton.onclick = () => {
          window.location.assign('mailto: jonzavialov@gmail.com');
          composeButton.style.boxShadow = null;
        };
        composeButton.onmousedown = () => {
          composeButton.style.boxShadow =
            'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey';
        };
      }
    );

    return buttonsHeader;
  }

  /**
   * Generates the DOM element for the bottom portion of the window.
   * @param {string} email - The email to display.
   * @returns {HTMLElement} - The DOM element for the bottom portion of the window.
   */
  generateInbox(email) {
    const inboxDiv = document.createElement('div');

    addNodesToDom(
      inboxDiv,
      'OutlookExpress.html #inboxDiv-container',
      (vars) => {
        const { inboxTreeItem } = vars;
        inboxTreeItem.onclick = () => this.clickedInbox();
        this.getEmails(() => this.setEmail(email));
      }
    );

    return inboxDiv;
  }
}

/**
 * Opens the Outlook Express app.
 * @param {string} [email='DEFAULT'] - The email to display.
 */
function openOutlookExpress(email = 'DEFAULT') {
  center = email === 'INTRO';
  const outlookExpress = new OutlookExpress(email, center);
  outlookExpress.render();
}
