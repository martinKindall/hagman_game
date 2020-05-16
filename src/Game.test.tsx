import HangmanRules from "./HangmanRules";
import HangmanGame from "./HangmanGame";

describe('HangmanGame tests', () => {
  let game: HangmanGame;
  const secretWord = "paralelepipedo";

  beforeEach(() => {
    setupGame();
  });

  test('Game initialization rules', () => {
    expect(game.livesRemaining).toBe(HangmanRules.maxLives);
    expect(game.currentWordState.length).toBe(secretWord.length);

    wordStateIsUndefined();
  });

  test('Character is not in secret word', () => {
    const guessChar = 'z';
    game.guessNextChar(guessChar);
    expect(game.livesRemaining).toBe(HangmanRules.maxLives - 1);
    wordStateIsUndefined();

    const guessChar2 = 't';
    game.guessNextChar(guessChar2);
    expect(game.livesRemaining).toBe(HangmanRules.maxLives - 2);
    wordStateIsUndefined();
  });

  function setupGame() {
    game = new HangmanGame(secretWord);
  }

  function wordStateIsUndefined() {
    let idx;
    for (idx = 0; idx < secretWord.length; idx++) {
      expect(game.currentWordState[idx]).toBeUndefined();
    }
  }
});
