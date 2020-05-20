import HangmanRules from "./HangmanConfig";
import {Subject} from "rxjs";
import HiddenWord from "../logic/HiddenWord";
import Event from "../logic/events/Event";

class HangmanGame {
  public livesRemaining: number = HangmanRules.maxLives;
  public currentWordState: HiddenWord;
  public guessedWrongCharacters: Set<string>;
  public winOrLoseObservable: Subject<boolean>;
  public stateUpdated: Subject<void>;

  private readonly secretWord: string;
  private guessedCorrectCharacters: Set<string>;
  private winState: boolean = false;
  private gameOverState: boolean = false;

  constructor(secretWord: string) {
    this.secretWord = secretWord;
    this.currentWordState = new HiddenWord(secretWord);
    this.guessedWrongCharacters = new Set();
    this.guessedCorrectCharacters = new Set();
    this.winOrLoseObservable = new Subject();
    this.stateUpdated = new Subject();

    this.currentWordState.hiddenWordObservable.subscribe((event) => this.accept(event));
  }

  getCurrentWordState() {
    return this.currentWordState.state;
  }

  accept(event: Event) {
    event.visitGame(this);
    this.stateUpdated.next();
  }

  guessNextChar(guessChar: string) {
    this.currentWordState.guessNextChar(guessChar);
  }

  hasWon() {
    this.winOrLoseObservable.next(true);
    this.winOrLoseObservable.complete();
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
  }

  private checkGameOverLogic() {
    if (this.livesRemaining === 0) {
      this.setGameOver();
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
