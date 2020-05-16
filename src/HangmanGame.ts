import HangmanRules from "./HangmanRules";

class HangmanGame {
  public livesRemaining: number = HangmanRules.maxLives;
  public currentWordState: string[] | undefined[];

  private secretWord: string;

  constructor(secretWord: string) {
    this.secretWord = secretWord;
    this.currentWordState = Array(secretWord.length);
  }
}

export default HangmanGame;
