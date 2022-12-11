class Dictionary extends Window {
  /**
   * The Dictionary app.
   * @constructor
   */
  constructor() {
    super(
      'Dictionary',
      'dictionary',
      true,
      'assets/images/icons/dictionary.png'
    );
    this.generateElement(this.getHTML());
    this.getRandomWord((data) => this.setWord(data));
  }

  /**
   * Sets the data for the word to the window.
   * @param  {string} word - The word to set.
   * @param  {function} [errorCallback=null] - The callback to run if the word is not found.
   */
  setWord(word, errorCallback = null) {
    this.getWordData(
      word,
      (data) => {
        const wordData = {
          word: this.capitalizeFirstLetter(data[0].word),
          partOfSpeech: data[0].meanings[0].partOfSpeech,
          phonetics: data[0].phonetic,
          definition: this.capitalizeFirstLetter(
            data[0].meanings[0].definitions[0].definition
          ),
          example: this.capitalizeFirstLetter(
            data[0].meanings[0].definitions[0].example
          ),
        };

        $(this.elem).find('#word').html(wordData.word);
        $(this.elem).find('#partOfSpeech').html(wordData.partOfSpeech);
        $(this.elem).find('#pronounce').html(wordData.phonetics);
        $(this.elem).find('#definition').html(wordData.definition);
        $(this.elem).find('#example').html(wordData.example);
      },
      errorCallback
    );
  }

  /**
   * Called when the search button is clicked.
   */
  searchTerm() {
    const term = $(this.elem).find('#wordInput').val();
    if (term === '') return;
    $(this.elem).find('#randomWord').remove();
    this.setWord(term, () => {
      $(this.elem).find('#word').html(term);
      $(this.elem).find('#partOfSpeech').html('');
      $(this.elem).find('#pronounce').html('');
      $(this.elem).find('#definition').html('No definition found.');
      $(this.elem).find('#example').html('');
    });
  }

  /**
   * Gets the data for the word.
   * @param  {string} word - The word to get data for.
   * @param  {function} callback - The callback to run when the data is retrieved.
   * @param  {function} [errorCallback=null] - The callback to run if the word is not found.
   */
  getWordData(word, callback, errorCallback = null) {
    $.ajax({
      url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      dataType: 'json',
      success: (data) => {
        if (!data.title) callback(data);
        else errorCallback();
      },
      error: () => {
        if (errorCallback) errorCallback();
      },
    });
  }

  /**
   * Gets a random word, continues to run recursively until a valid word is found.
   * @param  {function} callback - The callback to run when the word is found.
   */
  getRandomWord(callback) {
    // TODO: load time can be reduced by querying multiple words in one request.
    // TODO: This can be done in the backend.
    $.getJSON('https://random-word-api.herokuapp.com/word', (data) => {
      this.getWordData(
        data[0],
        () => callback(data[0]),
        () => this.getRandomWord(callback)
      );
    });
  }

  /**
   * Generates the DOM element for the window.
   * @returns {HTMLElement} - The DOM element for the window.
   */
  getHTML() {
    const container = document.createElement('div');

    addNodesToDom(container, 'Dictionary.html', (vars) => {
      vars.searchButton.onclick = () => this.searchTerm();
    })

    return container;
  }

  /**
   * Capitalizes the first letter of a string.
   * @param  {string} string - The string to capitalize.
   * @returns {string} - The capitalized string.
   */
  capitalizeFirstLetter(string) {
    if (!string) return '';
    return string[0].toUpperCase() + string.substring(1);
  }
}

/**
 * Opens the Dictionary app.
 */
function openDictionary() {
  const dictionary = new Dictionary();
  dictionary.render();
}
