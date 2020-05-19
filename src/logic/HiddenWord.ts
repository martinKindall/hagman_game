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
    }
  }
}

export default HiddenWord;

function wordContainsCharacter(word: string, character: string): boolean {
  return word.indexOf(character) > -1;
}
