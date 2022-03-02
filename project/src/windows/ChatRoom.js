class ChatRoom extends Window {
  /**
   * The Chat Room window.
   */
  constructor() {
    super('Chat Room', 'chatRoom', true, 'assets/images/icons/people.png', () =>
      this.closeChatRoom()
    );

    this.URL = {
      AUTH: 'https://github.com/login/oauth/authorize',
      TOKEN: 'https://api.jonzav.me/v1/oauth',
      GET_USER_DATA: 'https://api.jonzav.me/v1/github/getUserData',
      COMMENTS: 'https://api.jonzav.me/v1/comments',
      GITHUB_PROFILE_BASE: 'https://github.com',
    };

    this.comments = '';
    this.commentCounter = 0;
    this.OAUTH_CLIENT_ID = '6da3220d3b137f82e57b';
    this.generateElement(this.getHTML());
    this.initLiveChat();

    const params = new URLSearchParams(window.location.search);
    if (params.get('code')) this.getClientToken(params.get('code'));
  }

  /**
   * Initializes the live chat.
   */
  initLiveChat() {
    this.getCommentData();
    this.chatInterval = setInterval(() => {
      this.getCommentData();
    }, 1000);
  }

  /**
   * Gets the comments from the backend.
   */
  getCommentData() {
    $.ajax({
      type: 'GET',
      url: this.URL.COMMENTS,
      success: (data) => {
        if (JSON.stringify(data) !== JSON.stringify(this.comments))
          this.updateChat(data);
      },
    });
  }

  /**
   * Updates the chat when there's a change.
   * @param  {Object} data - The new data.
   */
  updateChat(data) {
    this.comments = data;
    $(this.elem).find('.chatWindow').html('');
    for (let i = 0; i < this.comments.length; i += 1) {
      const comment = this.createComment(this.comments[i]);
      $(this.elem).find('.chatWindow').append(comment);
    }
    const chatWindow = $(this.elem).find('.chatWindow')[0];
    chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
  }

  /**
   * Generates the URL for the OAuth login.
   * @returns {string} - The URL for the OAuth login.
   */
  getOAuthURL() {
    const url = new URL(this.URL.AUTH);
    const params = new URLSearchParams();

    params.set('client_id', this.OAUTH_CLIENT_ID);

    url.search = params.toString();
    return url.toString();
  }

  userLoggedIn(username) {
    $(this.elem).find('.sendChatButton').removeAttr('disabled');
    $(this.elem).find('.loggedInLabel').text(`Logged in as ${username}`);
  }

  /**
   * Gets the client token from the backend.
   * @param  {string} code - The code from the OAuth login.
   */
  getClientToken(code) {
    $(this.elem).find('.loginButton').remove();
    $(this.elem).find('.loggedInLabel').text(`Loading...`);
    $(this.elem).find('.loggedInLabel').show();
    $.ajax({
      type: 'POST',
      url: this.URL.TOKEN,
      data: {
        code,
      },
      success: (data) => this.getUserData(data.access_token),
    });
  }

  /**
   * Gets the user data from the backend with the token.
   * @param  {string} token - The token from the OAuth login.
   */
  getUserData(token) {
    if (!token) {
      this.throwError(
        'Error getting user data:<br>Invalid code from OAuth<br>Please log in again'
      );
      return;
    }
    this.token = token;
    $.ajax({
      type: 'GET',
      url: `${this.URL.GET_USER_DATA}?token=${token}`,
      success: (data) => this.userLoggedIn(data.login, data.avatar_url),
    });
  }

  /**
   * Called when a ajax request fails.
   * @param  {string} error - The error message.
   * @param  {boolean} [showLogInText=true] - If the error should show the log in button.
   */
  throwError(error, showLogInText = true) {
    let altOkText = 'Log In';
    let okFunction = () => window.location.replace(this.getOAuthURL());
    if (!showLogInText) {
      altOkText = 'Ok';
      okFunction = this.close;
    }

    this.noSaveError = new Error(
      this.displayName,
      this.id,
      error,
      okFunction,
      altOkText
    );
    this.noSaveError.render();
  }

  /**
   * Closes the window and clears the interval.
   */
  closeChatRoom() {
    this.close();
    clearInterval(this.chatInterval);
  }

  /**
   * Sends a comment to the backend.
   */
  sendComment() {
    let content = $(this.elem).find('.inputChat')[0].innerHTML;
    if (content === 'Type here...') return;
    content = content.replace(/<br>/g, '');
    content = content.replace(/<div>/g, '');
    content = content.replace(/&nbsp;/g, '');
    content = content.replace(/<\/div>/g, '');

    if (content.length > 300) {
      this.throwError('Comment too long', false);
      return;
    }

    $.ajax({
      type: 'POST',
      url: this.URL.COMMENTS,
      data: {
        token: this.token,
        content,
      },
      error: (err) => {
        if (err.responseJSON.message === 'user is on cooldown') {
          this.throwError(
            'Cannot send message: <br>You are on cooldown!<br>Please wait 10 seconds to send another message.',
            false
          );
          return;
        }
        this.throwError(
          'Cannot send message: <br>Invalid token<br>Please log in again'
        );
      },
    });
  }

  /**
   * Generates the DOM element for the window.
   * @returns {HTMLElement} - The DOM element for the window.
   */
  getHTML() {
    const container = document.createElement('div');

    const chatWindow = document.createElement('div');
    chatWindow.className = 'chatWindow';
    container.append(chatWindow);

    const buttonsArea = document.createElement('div');
    buttonsArea.className = 'buttonsArea';

    const chatArea = document.createElement('div');
    chatArea.className = 'chatArea';

    const loggedInLabel = document.createElement('p');
    loggedInLabel.className = 'loggedInLabel';
    $(loggedInLabel).hide();
    buttonsArea.append(loggedInLabel);

    const githubLogo = document.createElement('img');
    githubLogo.src = 'assets/images/github.png';

    const buttonText = document.createElement('p');
    buttonText.innerText = 'Login with GitHub';

    const loginButton = document.createElement('button');
    loginButton.className = 'loginButton';
    loginButton.onclick = () => window.location.replace(this.getOAuthURL());
    loginButton.append(githubLogo, buttonText);
    buttonsArea.append(loginButton);

    const sendChatButton = document.createElement('button');
    sendChatButton.className = 'sendChatButton';
    sendChatButton.innerText = 'Send';
    sendChatButton.disabled = true;
    sendChatButton.onclick = () => this.sendComment();
    buttonsArea.append(sendChatButton);
    chatArea.append(buttonsArea);

    const inputChat = document.createElement('div');
    inputChat.contentEditable = true;
    inputChat.innerText = 'Type here...';
    inputChat.className = 'inputChat';
    $(inputChat).on('focus', () => {
      if (inputChat.innerHTML === 'Type here...') inputChat.innerHTML = '';
    });
    $(inputChat).on('focusout', () => {
      if (inputChat.innerHTML === '') inputChat.innerHTML = 'Type here...';
    });
    chatArea.append(inputChat);

    container.append(chatArea);
    return container;
  }

  /**
   * Creates the DOM element for a comment from the object.
   * @param  {Object} data - The comment data.
   * @returns  {HTMLElement} - The DOM element for the comment.
   */
  createComment(data) {
    this.commentCounter += 1;

    const comment = document.createElement('div');
    comment.className = 'comment';

    comment.style.backgroundColor =
      this.commentCounter % 2 === 0 ? '#f2f2f2' : '#fff';

    const commentImage = document.createElement('img');
    commentImage.src = data.avatar;
    commentImage.alt = data.author;
    comment.append(commentImage);

    const commentContentArea = document.createElement('div');
    commentContentArea.className = 'commentContentArea';

    const author = document.createElement('p');
    author.className = 'commentAuthor';
    author.textContent = data.author;
    author.onclick = () =>
      window.open(`${this.URL.GITHUB_PROFILE_BASE}/${data.author}`);
    commentContentArea.append(author);

    const commentText = document.createElement('p');
    commentText.className = 'commentText';
    commentText.textContent = data.content;
    commentContentArea.append(commentText);

    const timestamp = document.createElement('p');
    timestamp.className = 'commentTimestamp';
    timestamp.textContent = new Date(data.createdAt).toLocaleString();
    commentContentArea.append(timestamp);

    comment.append(commentContentArea);
    return comment;
  }
}

/**
 * Opens the chat room window.
 */
function openChatRoom() {
  const chatRoom = new ChatRoom();
  chatRoom.render();
}