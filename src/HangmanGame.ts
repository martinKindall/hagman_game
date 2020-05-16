import HangmanRules from "./HangmanRules";

class HangmanGame {
  public livesRemaining: number = HangmanRules.maxLives;
  public currentWordState: string[] | undefined[];

  private secretWord: string;
  private guessedWrongCharacters: Set<string>;
  private guessedCorrectCharacters: Set<string>;

  constructor(secretWord: string) {
    this.secretWord = secretWord;
    this.currentWordState = Array(secretWord.length);
    this.guessedWrongCharacters = new Set();
    this.guessedCorrectCharacters = new Set();
  }

  guessNextChar(guessChar: string) {
    if (this.secretWord.indexOf(guessChar) < 0) {
      if (!this.guessedWrongCharacters.has(guessChar)) {
        this.livesRemaining -= 1;
        this.guessedWrongCharacters.add(guessChar);
      }
    } else if (!this.guessedCorrectCharacters.has(guessChar)){
      this.guessedCorrectCharacters.add(guessChar);
      let idx;
      for (idx = 0; idx < this.secretWord.length; idx++) {
        if (this.secretWord.charAt(idx) === guessChar) {
          this.currentWordState[idx] = guessChar;
        }
      }
    }
  }
}

export default HangmanGame;
