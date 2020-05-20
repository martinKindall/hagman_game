import {Subject} from "rxjs";
import Event from "./events/Event"
import ReduceOneLife from "./events/ReduceOneLife";

class HiddenWord {
  public state: string[];
  public guessObservable: Subject<Event>;

  private hiddenWord: string;

  constructor(word: string) {
    this.state = Array(word.length);
    this.guessObservable = new Subject();
    this.hiddenWord = word;
  }

  guessNextChar(guessChar: string) {
    if (!wordContainsCharacter(this.hiddenWord, guessChar)) {
      this.guessObservable.next(new ReduceOneLife());
    } else {
      this.revealGuessedCharacter(guessChar);
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
