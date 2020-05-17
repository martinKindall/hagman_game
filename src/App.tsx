import React, {useState} from 'react';
import HangmanGame from "./gameController/HangmanGame";
import Utils from "./Utils";
import RandomWords from "./RandomWords";
import {createStyles, Grid, Theme} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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
    <Grid container alignContent={"center"} alignItems={"center"} item spacing={1}
          className={classes.root}>
      <Grid item xs={12}>
        <TextField id="outlined-basic" label="Siguiente letra"
                   variant="outlined"
                   value={character}
                   onChange={handleCharacterInput}/>
      </Grid>
    </Grid>
  );
}

export default App;
