class OutlookExpress extends Window {
  constructor() {
    super(
      'Outlook Express',
      'outlookExpress',
      true,
      'assets/images/icons/outlook.png'
    );

    this.generateElement(this.generateHTML());
  }

  generateHTML() {
    const emailBody = document.createElement('div');
    emailBody.id = 'emailBody';
    emailBody.append(this.generateButtonsHeader());
    emailBody.append(this.generateInbox());
    return emailBody;
  }

  generateButtonsHeader() {
    const buttonsHeader = document.createElement('div');
    buttonsHeader.id = 'buttonsHeader';

    const composeButton = document.createElement('div');
    composeButton.id = 'outlookHeaderButton';
    const composeImg = document.createElement('img');
    composeImg.src = 'assets/images/icons/compose.png';
    composeImg.alt = 'Compose Message';
    const composeP = document.createElement('p');
    composeP.innerHTML = 'Compose Message';
    composeButton.append(composeImg, composeP);
    buttonsHeader.append(composeButton);

    const hr1 = document.createElement('hr');
    hr1.style.transform = 'translate(64px, -72px)';
    buttonsHeader.append(hr1);

    const sendReceiveButton = document.createElement('div');
    sendReceiveButton.id = 'outlookHeaderButton';
    sendReceiveButton.style.marginLeft = '10px';
    const sendReceiveImg = document.createElement('img');
    sendReceiveImg.src = 'assets/images/icons/mailbox.png';
    sendReceiveImg.alt = 'Send and Receive';
    const sendReceiveP = document.createElement('p');
    sendReceiveP.innerHTML = 'Send and Receive';
    sendReceiveButton.append(sendReceiveImg, sendReceiveP);
    buttonsHeader.append(sendReceiveButton);

    const hr2 = document.createElement('hr');
    hr2.style.transform = 'translate(128px, -72px)';
    buttonsHeader.append(hr2);

    const addyBookButton = document.createElement('div');
    addyBookButton.id = 'outlookHeaderButton';
    addyBookButton.style.marginLeft = '10px';
    const addyBookImg = document.createElement('img');
    addyBookImg.src = 'assets/images/icons/address.png';
    addyBookImg.alt = 'Address Book';
    const addyBookP = document.createElement('p');
    addyBookP.innerHTML = 'Address Book';
    addyBookButton.append(addyBookImg, addyBookP);
    buttonsHeader.append(addyBookButton);

    const hr3 = document.createElement('hr');
    hr3.style.transform = 'translate(192px, -72px)';
    buttonsHeader.append(hr3);

    const connectButton = document.createElement('div');
    connectButton.id = 'outlookHeaderButton';
    connectButton.style.marginLeft = '10px';
    connectButton.style.transform = 'translateY(-8px)';
    const connectImg = document.createElement('img');
    connectImg.src = 'assets/images/icons/connect.png';
    connectImg.alt = 'Connect';
    const connectP = document.createElement('p');
    connectP.innerHTML = 'Connect';
    connectButton.append(connectImg, connectP);
    buttonsHeader.append(connectButton);

    const hangUpButton = document.createElement('div');
    hangUpButton.id = 'outlookHeaderButton';
    hangUpButton.style.marginRight = '110px';
    hangUpButton.style.transform = 'translateY(-8px)';
    const hangUpImg = document.createElement('img');
    hangUpImg.src = 'assets/images/icons/hangup.png';
    hangUpImg.alt = 'Hang Up';
    const hangUpP = document.createElement('p');
    hangUpP.innerHTML = 'Hang Up';
    hangUpButton.append(hangUpImg, hangUpP);
    buttonsHeader.append(hangUpButton);

    const hr4 = document.createElement('hr');
    hr4.style.transform = 'translate(420px, -72px)';
    buttonsHeader.append(hr4);

    const explorerLogo = document.createElement('div');
    explorerLogo.id = 'outlookHeaderLogo';
    const explorerImg = document.createElement('img');
    explorerImg.src = 'assets/images/iesvg.svg';
    explorerImg.alt = 'Explorer Logo';
    explorerLogo.append(explorerImg);
    buttonsHeader.append(explorerLogo);

    return buttonsHeader;
  }

  generateInbox() {
    const inboxDiv = document.createElement('div');
    inboxDiv.style.display = 'flex';

    const inboxTree = document.createElement('ul');
    inboxTree.id = 'inboxTree';
    inboxTree.className = 'tree-view';

    const outlookImg = document.createElement('img');
    outlookImg.src = 'assets/images/icons/inboxicon.png';
    outlookImg.alt = 'Outlook Logo';
    const outlookSpan = document.createElement('span');
    outlookSpan.innerHTML = 'Outlook Express';
    inboxTree.append(outlookImg, outlookSpan);

    const mainTree = document.createElement('ul');

    const inboxTreeItem = document.createElement('li');
    inboxTreeItem.id = 'inboxTreeElem';
    inboxTreeItem.style.width = 'fit-content';
    const inboxTreeItemImg = document.createElement('img');
    inboxTreeItemImg.src = 'assets/images/icons/inbox.png';
    inboxTreeItemImg.alt = 'Inbox';
    const inboxTreeItemSpan = document.createElement('span');
    inboxTreeItemSpan.innerHTML = 'Inbox';
    inboxTreeItem.append(inboxTreeItemImg, inboxTreeItemSpan);
    mainTree.append(inboxTreeItem);

    const outboxTreeItem = document.createElement('li');
    outboxTreeItem.id = 'inboxTreeElem';
    const outboxTreeImg = document.createElement('img');
    outboxTreeImg.src = 'assets/images/icons/outbox.png';
    outboxTreeImg.alt = 'Outbox';
    const outboxTreeSpan = document.createElement('span');
    outboxTreeSpan.innerHTML = 'Outbox';
    outboxTreeItem.append(outboxTreeImg, outboxTreeSpan);
    mainTree.append(outboxTreeItem);

    const sentItemsTreeItem = document.createElement('li');
    sentItemsTreeItem.id = 'inboxTreeElem';
    const sentItemsTreeImg = document.createElement('img');
    sentItemsTreeImg.src = 'assets/images/icons/sentitems.png';
    sentItemsTreeImg.alt = 'Sent Items';
    const sentItemsTreeSpan = document.createElement('span');
    sentItemsTreeSpan.innerHTML = 'Sent Items';
    sentItemsTreeItem.append(sentItemsTreeImg, sentItemsTreeSpan);
    mainTree.append(sentItemsTreeItem);

    const deletedItemsTreeItem = document.createElement('li');
    deletedItemsTreeItem.id = 'inboxTreeElem';
    const deletedItemsTreeImg = document.createElement('img');
    deletedItemsTreeImg.src = 'assets/images/icons/deletedmail.png';
    deletedItemsTreeImg.alt = 'Deleted Items';
    const deletedItemsTreeSpan = document.createElement('span');
    deletedItemsTreeSpan.innerHTML = 'Deleted Items';
    deletedItemsTreeItem.append(deletedItemsTreeImg, deletedItemsTreeSpan);
    mainTree.append(deletedItemsTreeItem);

    const draftsTreeItem = document.createElement('li');
    draftsTreeItem.id = 'inboxTreeElem';
    const draftsTreeImg = document.createElement('img');
    draftsTreeImg.src = 'assets/images/icons/drafts.png';
    draftsTreeImg.alt = 'Drafts';
    const draftsTreeSpan = document.createElement('span');
    draftsTreeSpan.innerHTML = 'Drafts';
    draftsTreeItem.append(draftsTreeImg, draftsTreeSpan);
    mainTree.append(draftsTreeItem);

    inboxTree.append(mainTree);

    const emailDisplay = document.createElement('div');
    emailDisplay.id = 'emailDisplay';

    inboxDiv.append(inboxTree, emailDisplay);

    return inboxDiv;
  }
}

function openOutlookExpress() {
  const outlookExpress = new OutlookExpress();
  outlookExpress.render();
}
