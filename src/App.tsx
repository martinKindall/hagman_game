import React, {useState} from 'react';
import HangmanGame from "./gameController/HangmanGame";
import Utils from "./Utils";
import RandomWords from "./RandomWords";
import {createStyles, Grid, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import InputCharacter from "./components/InputCharacter";
import SecretWord from "./components/SecretWord";
import WrongCharacters from "./components/WrongCharacters";
import GameWinOrLose from "./components/GameWinOrLose";
import Canvas from "./components/Canvas";
import HangmanRules from "./gameController/HangmanConfig";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      overflow: "scroll",
      "overflow-x": 'hidden'
    },
    title: {
      flexGrow: 1,
    },
    inputElem: {
      textAlign: "center",
      marginTop: "1rem"
    },
    buttonChar: {
      textAlign: "right",
      marginTop: "1rem"
    }
  }));

const game = new HangmanGame(Utils.randomElementFromArray(RandomWords.words));

function App() {
  const classes = useStyles();
  const [gameState, setGameState] = useState<string[]>(game.currentWordState);

  const handleOnCharInput = (character: string) => {
    game.guessNextChar(character);
    setGameState(game.currentWordState.slice());
  };

  const handleOnWordInput = (word: string) => {
    game.guessWord(word);
    setGameState(game.currentWordState.slice());
  };

  return (
      <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Juego del Ahorcado
                </Typography>
            </Toolbar>
        </AppBar>
        <GameWinOrLose winState={game.hasWon()} gameOver={game.gameOver()}/>
        <Grid container alignContent={"center"} alignItems={"center"} item spacing={1}>
          {
            !(game.hasWon() || game.gameOver()) &&
            <InputCharacter handleOnCharInput={handleOnCharInput}
                            disabled={game.gameOver() || game.hasWon()}
                            handleOnWordInput={handleOnWordInput}
            />
          }
          <SecretWord secretWordState={gameState}/>
          <Canvas frame={getCurrentFrame(game)}/>
          <WrongCharacters usedCharacters={game.guessedWrongCharacters}/>
        </Grid>
      </div>
  );
}

export default App;

function getCurrentFrame(game: HangmanGame): number {
  return HangmanRules.maxLives - game.livesRemaining;
}
