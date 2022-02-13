/**
 * Sets the HTML of the document to an error message.
 */
function transformToMobile() {
  const doc = $('body')[0];
  doc.id = 'bsodBody';
  doc.innerHTML = `
    <p id="bsodHeader">
    System Error
    </p>
    <p id="bsodCentered">
    A fatal exception 0E76534801 has occured at 0027:C87123 
    in VXD VMM. Operating system has been stopped to prevent
    damage to your computer.
    </p>
    <p id="bsodBottom">
    * This website is only available on desktop computers.<br><br>
    * Sorry!
    </p>
    <p id="bsodFooter">
    Press any key to continue
    </p>
    `;
  const footer = $('#bsodFooter')[0];
  let i = 0;
  function myLoop() {
    setTimeout(() => {
      i += 1;
      footer.innerHTML =
        i % 2 === 0
          ? `${footer.innerHTML.slice(0, -6)}_`
          : `${footer.innerHTML.slice(0, -1)}&nbsp`;
      myLoop();
    }, 300);
  }

  myLoop();
}
