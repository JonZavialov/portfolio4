class ChatRoom extends Window {
  /**
   * The Chat Room window.
   */
  constructor() {
    super('Chat Room', 'chatRoom', true, 'assets/images/icons/people.png');

    this.BASE_AUTH_URL = 'https://github.com/login/oauth/authorize';
    this.OAUTH_CLIENT_ID = '6da3220d3b137f82e57b';
    this.generateElement(this.getHTML());

    this.BASE_TOKEN_URL = 'http://jonzav.me/api/v1/oauth';
    const params = new URLSearchParams(window.location.search);
    if (params.get('code')) this.getClientToken(params.get('code'));
  }

  /**
   * Generates the DOM element for the window.
   * @returns {HTMLElement} - The DOM element for the window.
   */
  getHTML() {
    const button = document.createElement('button');
    button.innerText = 'Send';
    button.onclick = () => {
      window.location.replace(this.getOAuthURL());
    };

    return button;
  }

  /**
   * Generates the URL for the OAuth login.
   * @returns {string} - The URL for the OAuth login.
   */
  getOAuthURL() {
    const url = new URL(this.BASE_AUTH_URL);
    const params = new URLSearchParams();

    params.set('client_id', this.OAUTH_CLIENT_ID);

    url.search = params.toString();
    return url.toString();
  }

  /**
   * Gets the client token from the backend.
   * @param  {string} code - The code from the OAuth login.
   */
  getClientToken(code) {
    $.ajax({
      type: 'POST',
      url: this.BASE_TOKEN_URL,
      data: { code },
      success: (data) => console.log(data),
    });
  }
}

/**
 * Opens the chat room window.
 */
function openChatRoom() {
  const chatRoom = new ChatRoom();
  chatRoom.render();
}
