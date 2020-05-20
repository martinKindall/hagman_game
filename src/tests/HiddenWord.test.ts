import HiddenWord from "../logic/HiddenWord";
import Event from "../logic/events/Event"

describe('HiddenWord tests', () => {
  const word = "paralelepipedo";
  let hiddenWord: HiddenWord;

  beforeEach(() => {
    hiddenWord = new HiddenWord(word);
  });

  test('Hidden word has same length', () => {
    expect(hiddenWord.state.length).toBe(word.length);
    wordStateIsUndefined();
  });

  test('Character is not in secret word', (done) => {
    hiddenWord.hiddenWordObservable.subscribe((result: Event) => {
      wordStateIsUndefined();
      expect(result).not.toBeUndefined();
      done();
    });
    const guessChar = 'z';
    hiddenWord.guessNextChar(guessChar);
  });

  test('Character is correct', () => {
    const guessChar = 'p';
    hiddenWord.guessNextChar(guessChar);
    const pInWord = [0, 8, 10];

    let idx;
    for (idx = 0; idx < word.length; idx++) {
      if (pInWord.indexOf(idx) !== -1) {
        expect(hiddenWord.state[idx]).toBe('p');
      } else {
        expect(hiddenWord.state[idx]).toBeUndefined();
      }
    }
  });

  test('Guessed wrong characters are stored', () => {
    expect(hiddenWord.guessedWrongCharacters.size).toBe(0);
    const guessChar = 'z';
    hiddenWord.guessNextChar(guessChar);
    expect(hiddenWord.guessedWrongCharacters.size).toBe(1);
    expect(hiddenWord.guessedWrongCharacters.has(guessChar)).toBeTruthy();
  });

  test('Guess word', (done) => {
    hiddenWord.hiddenWordObservable.subscribe((result: Event) => {
      expect(typeof result).not.toBeUndefined();
      expect(hiddenWord.state.join("")).toBe(word);
      done();
    });
    hiddenWord.guessWord(word);
  });

  test('Guess word goes wrong', (done) => {
    hiddenWord.hiddenWordObservable.subscribe((result: Event) => {
      expect(typeof result).not.toBeUndefined();
      expect(hiddenWord.state.join("")).toBe(word);
      done();
    });
    hiddenWord.guessWord("hola");
  });

  function wordStateIsUndefined() {
    let idx;
    for (idx = 0; idx < word.length; idx++) {
      expect(hiddenWord.state[idx]).toBeUndefined();
    }
  }
});
