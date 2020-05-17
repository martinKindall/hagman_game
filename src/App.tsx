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


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
    setGameState(game.currentWordState);
    console.log(gameState);
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
        <Grid container alignContent={"center"} alignItems={"center"} item spacing={1}>
          <InputCharacter handleOnCharInput={handleOnCharInput}/>
          <SecretWord secretWordState={gameState}/>
        </Grid>
      </div>
  );
}

export default App;
