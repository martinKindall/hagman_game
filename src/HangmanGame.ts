import HangmanRules from "./HangmanRules";

class HangmanGame {
  public livesRemaining: number = HangmanRules.maxLives;
  public currentWordState: string[] | undefined[];

  private secretWord: string;
  private guessedCharacters: Set<string>;

  constructor(secretWord: string) {
    this.secretWord = secretWord;
    this.currentWordState = Array(secretWord.length);
    this.guessedCharacters = new Set();
  }

  guessNextChar(guessChar: string) {
    if (this.secretWord.indexOf(guessChar) < 0) {
      if (!this.guessedCharacters.has(guessChar)) {
        this.livesRemaining -= 1;
        this.guessedCharacters.add(guessChar);
      }
    }
  }
}

export default HangmanGame;
