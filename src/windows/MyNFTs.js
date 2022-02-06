class MyNFTs extends Window {
  /**
   * The My NFTs app.
   */
  constructor() {
    super('My NFTs', 'myNFTs', true, 'assets/images/icons/nftview.png');
    this.generateElement(this.generateHTML());
    this.getNFTData();
  }

  /**
   * Generates the DOM element of the window.
   */
  generateHTML() {
    const wallet = document.createElement('div');
    wallet.id = 'wallet';
    const walletHeader = document.createElement('p');
    walletHeader.innerHTML = 'Wallet:';
    const walletDomain = document.createElement('p');
    walletDomain.innerHTML = 'sonytv.eth';
    walletDomain.id = 'ethDomain';
    walletDomain.onclick = () => {
      copyToClipboard(walletDomain.innerHTML);
      alert('Address copied!');
    };
    const walletAddress = document.createElement('p');
    walletAddress.innerHTML = '0x5df5...a5c9';
    walletAddress.id = 'ethAddress';
    walletAddress.onclick = () => {
      copyToClipboard('0x5df54525f8f34b49622a15a9d65e4e0c9ed6a5c9');
      alert('Address copied!');
    };
    const refreshButtonImg = document.createElement('img');
    refreshButtonImg.src = 'assets/images/icons/refresh.png';
    refreshButtonImg.alt = 'Refresh';
    const refreshButtonP = document.createElement('p');
    refreshButtonP.innerHTML = 'Refresh';
    const refreshButton = document.createElement('button');
    refreshButton.id = 'refreshButton';
    refreshButton.onclick = () => this.refresh();
    refreshButton.append(refreshButtonImg, refreshButtonP);
    wallet.append(walletHeader, walletDomain, walletAddress, refreshButton);
    return wallet;
  }

  refresh() {
    console.log('refreshing');
  }

  getNFTData() {
    $.ajax({
      url: 'https://deep-index.moralis.io/api/v2/0x5df54525F8F34b49622A15a9D65e4e0C9ED6A5C9/nft?chain=eth&format=decimal',
      type: 'GET',
      dataType: 'json',
      success: (data) => this.setNFTData(data),
      error: () => {
        alert('Error retrieving data');
        this.close();
      },
      beforeSend: (xhr) => {
        xhr.setRequestHeader('accept', 'application/json');
        xhr.setRequestHeader(
          'X-API-Key',
          'Rf87yJ5J4uFsXBYdMZv5zFnnRMpk8Jmyzpd1XTjvQO80YVjReAe2IZCD1xdMxeKk'
        );
      },
    });
  }

  setNFTData(data) {
    console.log(data);
  }
}

/**
 * Opens the My NFTs app.
 */
function openMyNFTs() {
  const myNFTs = new MyNFTs();
  myNFTs.render();
}
