import {Subject} from "rxjs";
import Event from "./events/Event"
import ReduceOneLife from "./events/ReduceOneLife";
import WordIsGuessed from "./events/WordIsGuessed";
import WordWrongGuess from "./events/WordWrongGuess";
import CharacterIsGuessed from "./events/CharacterIsGuessed";

class HiddenWord {
  public state: string[];
  public hiddenWordObservable: Subject<Event>;
  public guessedWrongCharacters: Set<string>;

  private hiddenWord: string;
  private guessedCorrectCharacters: Set<string>;

  constructor(word: string) {
    this.state = Array(word.length);
    this.hiddenWordObservable = new Subject();
    this.hiddenWord = word;
    this.guessedWrongCharacters = new Set();
    this.guessedCorrectCharacters = new Set();
  }

  guessNextChar(guessChar: string) {
    if (!wordContainsCharacter(this.hiddenWord, guessChar)) {
      if (!this.guessedWrongCharacters.has(guessChar)) {
        this.guessedWrongCharacters.add(guessChar);
        this.hiddenWordObservable.next(new ReduceOneLife());
      }
    } else {
      if (!this.guessedCorrectCharacters.has(guessChar)) {
        this.guessedCorrectCharacters.add(guessChar);
        this.revealGuessedCharacter(guessChar);
      }
    }
  }

  guessWord(word: string) {
    this.state = this.hiddenWord.split("");
    if (this.hiddenWord === word) {
      this.onGuessedWord();
    } else {
      this.hiddenWordObservable.next(new WordWrongGuess());
    }
  }

  private onGuessedWord() {
    this.hiddenWordObservable.next(new WordIsGuessed());
  }

  private revealGuessedCharacter(guessChar: string) {
    let idx;
    for (idx = 0; idx < this.hiddenWord.length; idx++) {
      if (this.hiddenWord.charAt(idx) === guessChar) {
        this.state[idx] = guessChar;
      }
    }

    this.handleGuessEvent();
  }

  private isWordGuessed(): boolean {
    let idx;
    for (idx = 0; idx < this.hiddenWord.length; idx++) {
      if (this.state[idx] === undefined) {
        return false;
      }
    }
    return true;
  }

  private onGuessedCharacter() {
    this.hiddenWordObservable.next(new CharacterIsGuessed());
  }

  private handleGuessEvent() {
    if (this.isWordGuessed()) {
      this.onGuessedWord();
    } else {
      this.onGuessedCharacter();
    }
  }
}

export default HiddenWord;

function wordContainsCharacter(word: string, character: string): boolean {
  return word.indexOf(character) > -1;
}
