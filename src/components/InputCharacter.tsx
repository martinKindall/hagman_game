import React, {useState} from 'react';
import {createStyles, Grid, Theme} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputElem: {
      textAlign: "center",
      marginTop: "1rem"
    },
    buttonChar: {
      textAlign: "right",
      marginTop: "1rem"
    },
    buttonWord: {
      textAlign: "left",
      marginTop: "1rem"
    }
  }));

interface Props {
  handleOnCharInput: (character: string) => void;
  handleOnWordInput: (character: string) => void;
  disabled: boolean;
}

const InputCharacter: React.FC<Props> = ({
                                           handleOnCharInput,
                                           disabled,
                                           handleOnWordInput}) => {
  const classes = useStyles();
  const [character, setCharacter] = useState<string>("");

  const handleCharacterInputOnChange = (event: any) => {
    const character = event.target.value;
    if (notValidCharacter(character)) {
      return;
    }
    setCharacter(character);
  };

  const handleGuessCharacter = () => {
    handleOnCharInput(character);
    setCharacter("");
  };
  
  const handleGuessWord = () => {
    handleOnWordInput(character);
    setCharacter("");
  };

  return <>
    <Grid item xs={2}/>
    <Grid item xs={8} container>
      <Grid item xs={12} className={classes.inputElem}>
        <FormControl fullWidth>
          <TextField id="outlined-basic" label="Siguiente letra"
                     variant="outlined"
                     value={character}
                     onChange={handleCharacterInputOnChange}
                     disabled={disabled}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6} className={classes.buttonWord}>
        <Button onClick={handleGuessWord} variant="contained"
                color={"secondary"}
                disabled={disabled || character.length < 2}
        >
          Adivinar palabra
        </Button>
      </Grid>
      <Grid item xs={6} className={classes.buttonChar}>
        <Button onClick={handleGuessCharacter} variant="contained"
                disabled={disabled || character.length > 1 || character.length === 0}
        >
          Adivinar
        </Button>
      </Grid>
    </Grid>
    <Grid item xs={2}/></>;
};

export default InputCharacter;

function notValidCharacter(word: string): boolean {
  const fileterdNotValidChars = word.split("").filter((character: string) => {
    return "abcdefghijklmnñopqrstuvwxyz".indexOf(character) < 0;
  });

  return fileterdNotValidChars.length > 0;
}
