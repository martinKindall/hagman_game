import React, {useState} from 'react';
import HangmanGame from "./gameController/HangmanGame";
import Utils from "./Utils";
import RandomWords from "./RandomWords";
import {createStyles, Grid, Theme} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";


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
  const [character, setCharacter] = useState<string>("");

  const handleCharacterInput = (event: any) => {
    const character = event.target.value;
    if (character.length > 1) {
      setCharacter(character[character.length-1]);
    } else {
      setCharacter(character);
    }
  };

  const handleGuess = () => {
    game.guessNextChar(character);
    setCharacter("");
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
          <Grid item xs={2}/>
          <Grid item xs={8}>
            <Grid item xs={12} className={classes.inputElem}>
              <FormControl fullWidth>
                <TextField id="outlined-basic" label="Siguiente letra"
                           variant="outlined"
                           value={character}
                           onChange={handleCharacterInput}/>
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.buttonChar}>
              <Button onClick={handleGuess} variant="contained">
                Adivinar
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={2}/>
        </Grid>
      </div>
  );
}

export default App;
