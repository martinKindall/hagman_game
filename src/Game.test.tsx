import HangmanRules from "./HangmanRules";
import HangmanGame from "./HangmanGame";

test('Game initialization rules', () => {
  const secretWord = "paralelepipedo";
  const game = new HangmanGame(secretWord);

  expect(game.livesRemaining).toBe(HangmanRules.maxLives);
  expect(game.currentWordState.length).toBe(secretWord.length);

  let idx;
  for (idx = 0; idx < secretWord.length; idx++) {
    expect(game.currentWordState[idx]).toBeUndefined();
  }
});
