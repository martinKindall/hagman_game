import Event from "./Event"
import HangmanGame from "../../gameController/HangmanGame";

class ReduceOneLife implements Event {
  visitGame(game: HangmanGame): void {
    game.livesRemaining -= 1;
  }
}

export default ReduceOneLife;
