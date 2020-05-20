import Event from "./Event"
import HangmanGame from "../../gameController/HangmanGame";

class WordWrongGuess implements Event {
  visitGame(game: HangmanGame): void {

  }
}

export default WordWrongGuess;
