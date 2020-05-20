import HangmanRules from "../gameController/HangmanConfig";
import HangmanGame from "../gameController/HangmanGame";

describe('HangmanGame tests', () => {
  let game: HangmanGame;
  const secretWord = "paralelepipedo";

  beforeEach(() => {
    setupGame();
  });

  test('Game initialization rules', () => {
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

  test('Win', () => {
    expect(game.hasWon()).toBeFalsy();
    let guessChar = 'p';
    game.guessNextChar(guessChar);
    guessChar = 'a';
    game.guessNextChar(guessChar);
    guessChar = 'r';
    game.guessNextChar(guessChar);
    guessChar = 'l';
    game.guessNextChar(guessChar);
    guessChar = 'e';
    game.guessNextChar(guessChar);
    guessChar = 'i';
    game.guessNextChar(guessChar);
    guessChar = 'd';
    game.guessNextChar(guessChar);
    guessChar = 'o';
    expect(game.hasWon()).toBeFalsy();
    game.guessNextChar(guessChar);

    expect(game.currentWordState.join('')).toBe(secretWord);
    expect(game.hasWon()).toBeTruthy();
    expect(game.gameOver()).toBeFalsy();
  });

  test('Game Over', () => {
    expect(game.hasWon()).toBeFalsy();
    expect(game.gameOver()).toBeFalsy();
    let guessChar = 'z';
    game.guessNextChar(guessChar);
    guessChar = 'x';
    game.guessNextChar(guessChar);
    guessChar = 'b';
    game.guessNextChar(guessChar);
    guessChar = 'c';
    game.guessNextChar(guessChar);
    guessChar = 'f';
    game.guessNextChar(guessChar);
    guessChar = 'g';
    expect(game.gameOver()).toBeFalsy();
    game.guessNextChar(guessChar);
    expect(game.hasWon()).toBeFalsy();
    expect(game.gameOver()).toBeTruthy();
    expect(game.currentWordState.join("")).toBe(secretWord);
  });

  test('Win on complete guess', () => {
    game.guessWord(secretWord);
    expect(game.hasWon()).toBeTruthy();
    expect(game.gameOver()).toBeFalsy();
    expect(game.currentWordState.join("")).toBe(secretWord);
  });

  test('Lose on complete guess', () => {
    game.guessWord("no era");
    expect(game.hasWon()).toBeFalsy();
    expect(game.gameOver()).toBeTruthy();
    expect(game.currentWordState.join("")).toBe(secretWord);
    expect(game.livesRemaining).toBe(0);
  });

  test('Lose on complete guess, trigger observable', (done) => {
    game.winOrLoseObservable.subscribe((result: boolean) => {
      expect(result).toBeFalsy();
      done();
    });
    game.guessWord("no era");
  });

  test('Win on complete guess, trigger observable', (done) => {
    game.winOrLoseObservable.subscribe((result: boolean) => {
      expect(result).toBeTruthy();
      done();
    });
    game.guessWord(secretWord);
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
