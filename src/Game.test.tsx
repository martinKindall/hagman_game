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

  test('Repeated character has no effect', () => {
    const guessChar = 'z';
    game.guessNextChar(guessChar);
    game.guessNextChar(guessChar);
    expect(game.livesRemaining).toBe(HangmanRules.maxLives - 1);
    wordStateIsUndefined();
  });

  test('Guessed character in word', () => {
    const guessChar = 'p';
    game.guessNextChar(guessChar);
    checkGuessedCharacterLogic(guessChar);
  });

  test('Guessed repeated character in word has no effect', () => {
    const guessChar = 'p';
    game.guessNextChar(guessChar);
    game.guessNextChar(guessChar);
    checkGuessedCharacterLogic(guessChar);
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

  function checkGuessedCharacterLogic(guessChar: string) {
    expect(game.livesRemaining).toBe(HangmanRules.maxLives);
    const currentWord = game.currentWordState;
    const charPInWordIndex = [0, 8, 10];

    let idx;
    for (idx = 0; idx < secretWord.length; idx++) {
      if (charPInWordIndex.indexOf(idx) < 0) {
        expect(currentWord[idx]).toBeUndefined();
      } else {
        expect(currentWord[idx]).toBe(guessChar);
      }
    }
  }
});
