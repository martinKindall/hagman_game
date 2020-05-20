import Event from "./Event"
import HangmanGame from "../../gameController/HangmanGame";

class WordIsGuessed implements Event {
  visitGame(game: HangmanGame): void {
    game.hasWon();
  }
}

export default WordIsGuessed;
