import React, {useState} from 'react';
import HangmanGame from "./gameController/HangmanGame";
import Utils from "./Utils";
import RandomWords from "./RandomWords";

function App() {
  const game = new HangmanGame(Utils.randomElementFromArray(RandomWords.words));
  const [gameState, setGameState] = useState<string[]>(game.currentWordState);

  return (
    <div>
    </div>
  );
}

export default App;
