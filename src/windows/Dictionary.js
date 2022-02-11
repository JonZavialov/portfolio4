class Dictionary extends Window {
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

  getRandomWord(callback) {
    $.getJSON(
      'https://random-word-api.herokuapp.com/word?number=1&swear=0',
      (data) => {
        this.getWordData(
          data[0],
          () => callback(data[0]),
          () => this.getRandomWord(callback)
        );
      }
    );
  }

  getHTML() {
    const container = document.createElement('div');

    const input = document.createElement('input');
    input.id = 'wordInput';
    input.type = 'text';
    input.placeholder = 'Enter a word';
    container.append(input);

    const searchButton = document.createElement('button');
    searchButton.id = 'searchButton';
    searchButton.onclick = () => this.searchTerm();
    const searchImg = document.createElement('img');
    searchImg.src = 'assets/images/icons/search.png';
    searchImg.alt = 'Search';
    searchButton.append(searchImg);
    container.append(searchButton);

    const randomWord = document.createElement('p');
    randomWord.id = 'randomWord';
    randomWord.innerHTML = 'Random Word!';
    container.append(randomWord);

    const word = document.createElement('p');
    word.id = 'word';
    word.innerHTML = 'Loading...';
    container.append(word);

    const pronounce = document.createElement('p');
    pronounce.id = 'pronounce';
    container.append(pronounce);

    const partOfSpeech = document.createElement('p');
    partOfSpeech.id = 'partOfSpeech';
    container.append(partOfSpeech);

    const definition = document.createElement('p');
    definition.id = 'definition';
    container.append(definition);

    const example = document.createElement('p');
    example.id = 'example';
    container.append(example);

    return container;
  }

  capitalizeFirstLetter(string) {
    if (!string) return '';
    return string[0].toUpperCase() + string.substring(1);
  }
}

function openDictionary() {
  const dictionary = new Dictionary();
  dictionary.render();
}
