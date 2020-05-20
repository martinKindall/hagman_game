import {Subject} from "rxjs";
import Event from "./events/Event"
import ReduceOneLife from "./events/ReduceOneLife";

class HiddenWord {
  public state: string[];
  public guessObservable: Subject<Event>;
  public guessedWrongCharacters: Set<string>;

  private hiddenWord: string;
  private guessedCorrectCharacters: Set<string>;

  constructor(word: string) {
    this.state = Array(word.length);
    this.guessObservable = new Subject();
    this.hiddenWord = word;
    this.guessedWrongCharacters = new Set();
    this.guessedCorrectCharacters = new Set();
  }

  guessNextChar(guessChar: string) {
    if (!wordContainsCharacter(this.hiddenWord, guessChar)) {
      if (!this.guessedWrongCharacters.has(guessChar)) {
        this.guessedWrongCharacters.add(guessChar);
        this.guessObservable.next(new ReduceOneLife());
      }
    } else {
      if (!this.guessedCorrectCharacters.has(guessChar)) {
        this.guessedCorrectCharacters.add(guessChar);
        this.revealGuessedCharacter(guessChar);
      }
    }
  }

  guessWord(word: string) {
    if (this.hiddenWord === word) {
      this.state = word.split("");
    }
  }

  private revealGuessedCharacter(guessChar: string) {
    let idx;
    for (idx = 0; idx < this.hiddenWord.length; idx++) {
      if (this.hiddenWord.charAt(idx) === guessChar) {
        this.state[idx] = guessChar;
      }
    }
  }
}

export default HiddenWord;

function wordContainsCharacter(word: string, character: string): boolean {
  return word.indexOf(character) > -1;
}
