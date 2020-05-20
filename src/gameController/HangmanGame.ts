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
  private winState: boolean = false;
  private gameOverState: boolean = false;

  constructor(secretWord: string) {
    this.secretWord = secretWord;
    this.currentWordState = new HiddenWord(secretWord);
    this.guessedWrongCharacters = new Set();
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

  gameOver() {
    this.winOrLoseObservable.next(false);
    this.winOrLoseObservable.complete();
  }

  guessWord(word: string) {
    this.currentWordState.guessWord(word);
  }

  reduceLife() {
    this.livesRemaining -= 1;
    if (this.livesRemaining === 0) {
      this.triggerGameOver();
    }
  }

  private triggerGameOver() {
    this.currentWordState.guessWord("");
  }
}

export default HangmanGame;
