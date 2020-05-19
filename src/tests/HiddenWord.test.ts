import HiddenWord from "../logic/HiddenWord";

describe('HiddenWord tests', () => {
  const word = "paralelepipedo";

  test('Hidden word has same length', () => {
    const hiddenWord = new HiddenWord(word);

    expect(hiddenWord.state.length).toBe(word.length);
  });
});
