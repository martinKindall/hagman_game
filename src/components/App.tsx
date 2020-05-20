import React, {useEffect, useState} from 'react';
import HangmanGame from "../gameController/HangmanGame";
import Utils from "../Utils";
import RandomWords from "../RandomWords";
import {createStyles, Grid, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import InputCharacter from "./InputCharacter";
import SecretWord from "./SecretWord";
import WrongCharacters from "./WrongCharacters";
import GameWinOrLose from "./GameWinOrLose";
import Canvas from "./Canvas";
import HangmanRules from "../gameController/HangmanConfig";


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
  const [gameState, setGameState] = useState<string[]>(game.getCurrentWordState());
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleOnCharInput = (character: string) => {
    game.guessNextChar(character);
  };

  const handleOnWordInput = (word: string) => {
    game.guessWord(word);
  };

  useEffect(() => {
    const winLoseDisposable = game.winOrLoseObservable.subscribe((result) => {
      if (result ) {
        setHasWon(true);
      } else {
        setGameOver(true);
      }
    });

    const updateDisposable = game.stateUpdated.subscribe(() => {
      setGameState(game.getCurrentWordState().slice())
    });

    return () => {
      winLoseDisposable.unsubscribe();
      updateDisposable.unsubscribe();
    };
  }, []);

  return (
      <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Juego del Ahorcado
                </Typography>
            </Toolbar>
        </AppBar>
        <GameWinOrLose winState={hasWon} gameOver={gameOver}/>
        <Grid container alignContent={"center"} alignItems={"center"} item spacing={1}>
          {
            !(hasWon || gameOver) &&
            <InputCharacter handleOnCharInput={handleOnCharInput}
                            disabled={gameOver || hasWon}
                            handleOnWordInput={handleOnWordInput}
            />
          }
          <SecretWord secretWordState={gameState}/>
          <Canvas frame={getCurrentFrame(game)}/>
          <WrongCharacters usedCharacters={game.getGuessedWrongCharacters()}/>
        </Grid>
      </div>
  );
}

export default App;

function getCurrentFrame(game: HangmanGame): number {
  return HangmanRules.maxLives - game.livesRemaining;
}
