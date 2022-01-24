class MyComputer extends Window {
  constructor() {
    super(
      "My Computer",
      "myComputer",
      true,
      "assets/images/icons/computer.png"
    );
    this.#generate();
  }

  #generate() {
    let contents = document.createElement("div");
    contents.innerHTML = "test";
    this.generateElement(contents);
  }
}

function openMyComputer() {
  let myComputer = new MyComputer();
  myComputer.render();
}
