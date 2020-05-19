import HangmanRules from "./HangmanConfig";
import {Subject} from "rxjs";

class HangmanGame {
  public livesRemaining: number = HangmanRules.maxLives;
  public currentWordState: string[];
  public guessedWrongCharacters: Set<string>;
  public winOrLoseObservable: Subject<boolean>;

  private readonly secretWord: string;
  private guessedCorrectCharacters: Set<string>;
  private winState: boolean = false;
  private gameOverState: boolean = false;

  constructor(secretWord: string) {
    this.secretWord = secretWord;
    this.currentWordState = Array(secretWord.length);
    this.guessedWrongCharacters = new Set();
    this.guessedCorrectCharacters = new Set();
    this.winOrLoseObservable = new Subject();
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

  hasWon(): boolean {
    return this.winState;
  }

  gameOver(): boolean {
    return this.gameOverState;
  }

  guessWord(word: string) {
    if (word === this.secretWord) {
      this.setWin();
    } else {
      this.setGameOver();
      this.livesRemaining = 0;
    }
    this.revealSecretWord();
  }

  private checkGameOverLogic() {
    if (this.livesRemaining === 0) {
      this.setGameOver();
      this.revealSecretWord();
    }
  }

  private setGameOver() {
    this.gameOverState = true;
    this.winOrLoseObservable.next(false);
    this.winOrLoseObservable.complete();
  }

  private setWin() {
    this.winState = true;
    this.winOrLoseObservable.next(true);
    this.winOrLoseObservable.complete();
  }

  private revealSecretWord() {
    this.currentWordState = this.secretWord.split("");
  }

  private checkWinLogic() {
    let idx;
    for (idx = 0; idx < this.secretWord.length; idx++) {
      if (this.currentWordState[idx] === undefined) {
        return;
      }
    }

    this.setWin();
  }

  private ifCharacterWasNotPreviouslyGuessed(guessChar: string) {
    if (!this.guessedCorrectCharacters.has(guessChar)){
      this.guessedCorrectCharacters.add(guessChar);
      this.revealGuessedCharacter(guessChar);
    }
  }

  private revealGuessedCharacter(guessChar: string) {
    let idx;
    for (idx = 0; idx < this.secretWord.length; idx++) {
      if (this.secretWord.charAt(idx) === guessChar) {
        this.currentWordState[idx] = guessChar;
      }
    }
  }

  private ifCharacterWasNotPreviouslyGuessedWrong(guessChar: string) {
    if (!this.guessedWrongCharacters.has(guessChar)) {
      this.livesRemaining -= 1;
      this.guessedWrongCharacters.add(guessChar);
    }
  }
}

function wordContainsCharacter(word: string, character: string): boolean {
  return word.indexOf(character) > -1;
}

export default HangmanGame;
