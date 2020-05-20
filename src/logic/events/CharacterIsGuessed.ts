import Event from "./Event"
import HangmanGame from "../../gameController/HangmanGame";

class CharacterIsGuessed implements Event {
  visitGame(game: HangmanGame): void {
    game.update();
  }
}

export default CharacterIsGuessed;
