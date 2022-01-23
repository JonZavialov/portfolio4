class RecycleBin extends Window {
  constructor() {
    super("Recycle Bin", "recycleBin", true, "assets/images/icons/recycle.png");
    this.#generate();
  }

  #generate() {
    let contents = document.createElement("div");
    contents.innerHTML = "test";
    this.generateElement(contents);
  }
}

function openRecycleBin() {
  let recycleBin = new RecycleBin();
  recycleBin.render();
}
