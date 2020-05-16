import HangmanRules from "./HangmanRules";

class HangmanGame {
  public livesRemaining: number = HangmanRules.maxLives;
  public currentWordState: string[] | undefined[];

  private secretWord: string;

  constructor(secretWord: string) {
    this.secretWord = secretWord;
    this.currentWordState = Array(secretWord.length);
  }

  guessNextChar(guessChar: string) {
    if (this.secretWord.indexOf(guessChar) < 0) {
      this.livesRemaining -= 1;
    }
  }
}

export default HangmanGame;
