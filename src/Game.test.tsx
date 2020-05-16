import HangmanRules from "./HangmanRules";
import HangmanGame from "./HangmanGame";

describe('HangmanGame tests', () => {
  let game: HangmanGame;
  const secretWord = "paralelepipedo";

  beforeEach(() => {
    setupGame();
  });

  function setupGame() {
    game = new HangmanGame(secretWord);
  }

  test('Game initialization rules', () => {
    expect(game.livesRemaining).toBe(HangmanRules.maxLives);
    expect(game.currentWordState.length).toBe(secretWord.length);

    let idx;
    for (idx = 0; idx < secretWord.length; idx++) {
      expect(game.currentWordState[idx]).toBeUndefined();
    }
  });

  test('Character is not in secret word', () => {

  });
});
