import HangmanRules from "./HangmanRules";

class HangmanGame {
  public livesRemaining: number = HangmanRules.maxLives;
  public currentWordState: string[];

  private readonly secretWord: string;
  private guessedWrongCharacters: Set<string>;
  private guessedCorrectCharacters: Set<string>;
  private winState: boolean = false;
  private gameOverState: boolean = false;

  constructor(secretWord: string) {
    this.secretWord = secretWord;
    this.currentWordState = Array(secretWord.length);
    this.guessedWrongCharacters = new Set();
    this.guessedCorrectCharacters = new Set();
  }

  guessNextChar(guessChar: string) {
    if (!wordContainsCharacter(this.secretWord, guessChar)) {
      this.ifCharacterWasNotPreviouslyGuessedWrong(guessChar);
      this.checkGameOverLogic();
    } else {
      this.ifCharacterWasNotPreviouslyGuessed(guessChar);
      this.checkWinLogic();
    }
  }

  ifCharacterWasNotPreviouslyGuessed(guessChar: string) {
    if (!this.guessedCorrectCharacters.has(guessChar)){
      this.guessedCorrectCharacters.add(guessChar);
      this.revealGuessedCharacter(guessChar);
    }
  }

  revealGuessedCharacter(guessChar: string) {
    let idx;
    for (idx = 0; idx < this.secretWord.length; idx++) {
      if (this.secretWord.charAt(idx) === guessChar) {
        this.currentWordState[idx] = guessChar;
      }
    }
  }

  ifCharacterWasNotPreviouslyGuessedWrong(guessChar: string) {
    if (!this.guessedWrongCharacters.has(guessChar)) {
      this.livesRemaining -= 1;
      this.guessedWrongCharacters.add(guessChar);
    }
  }

  hasWon(): boolean {
    return this.winState;
  }

  private checkWinLogic() {
    let idx;
    for (idx = 0; idx < this.secretWord.length; idx++) {
      if (this.currentWordState[idx] === undefined) {
        return;
      }
    }

    this.winState = true;
  }

  gameOver(): boolean {
    return this.gameOverState;
  }

  private checkGameOverLogic() {
    if (this.livesRemaining === 0) {
      this.gameOverState = true;
    }
  }
}

function wordContainsCharacter(word: string, character: string): boolean {
  return word.indexOf(character) > -1;
}

export default HangmanGame;
