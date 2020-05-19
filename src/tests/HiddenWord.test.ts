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
    hiddenWord.guessObservable.subscribe((result: Event) => {
      wordStateIsUndefined();
      done();
    });
    const guessChar = 'z';
    hiddenWord.guessNextChar(guessChar);
  });

  function wordStateIsUndefined() {
    let idx;
    for (idx = 0; idx < word.length; idx++) {
      expect(hiddenWord.state[idx]).toBeUndefined();
    }
  }
});
