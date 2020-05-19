import HangmanGame from "../../gameController/HangmanGame";

interface Event {
  visitGame(game: HangmanGame): void;
}

export default Event;
