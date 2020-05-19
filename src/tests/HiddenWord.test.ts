import HiddenWord from "../logic/HiddenWord";

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

  function wordStateIsUndefined() {
    let idx;
    for (idx = 0; idx < word.length; idx++) {
      expect(hiddenWord.state[idx]).toBeUndefined();
    }
  }
});
