import React, {useState} from 'react';
import HangmanGame from "./gameController/HangmanGame";
import Utils from "./Utils";
import RandomWords from "./RandomWords";

function App() {
  const game = new HangmanGame(Utils.randomElementFromArray(RandomWords.words));
  const [gameState, setGameState] = useState<string[]>(game.currentWordState);
  const [character, setCharacter] = useState<string>("");

  const handleCharacterInput = (event: any) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <input type={"text"} placeholder={"Ingresa una letra"}
             value={character}
             onChange={handleCharacterInput}
      />
    </div>
  );
}

export default App;
