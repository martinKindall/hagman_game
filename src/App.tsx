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
    }
  }));

function App() {
  const classes = useStyles();
  const game = new HangmanGame(Utils.randomElementFromArray(RandomWords.words));
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

  return (
      <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Juego del Ahorcado
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container alignContent={"center"} alignItems={"center"} item spacing={1}
              className={classes.inputElem}>
          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Siguiente letra"
                       variant="outlined"
                       value={character}
                       onChange={handleCharacterInput}/>
          </Grid>
        </Grid>
      </div>
  );
}

export default App;
