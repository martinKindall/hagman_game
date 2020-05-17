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
    }
  }));

interface Props {
  handleOnCharInput: (character: string) => void;
  disabled: boolean;
}

const InputCharacter: React.FC<Props> = ({handleOnCharInput, disabled}) => {
  const classes = useStyles();
  const [character, setCharacter] = useState<string>("");

  const handleCharacterInputOnChange = (event: any) => {
    const character = event.target.value;
    if (notValidCharacter(character)) {
      return;
    }
    if (character.length > 1) {
      setCharacter(character[character.length-1]);
    } else {
      setCharacter(character);
    }
  };

  const handleGuess = () => {
    setCharacter("");
    handleOnCharInput(character);
  };

  return <>
    <Grid item xs={2}/>
    <Grid item xs={8}>
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
      <Grid item xs={12} className={classes.buttonChar}>
        <Button onClick={handleGuess} variant="contained"
                disabled={disabled}
        >
          Adivinar
        </Button>
      </Grid>
    </Grid>
    <Grid item xs={2}/></>;
};

export default InputCharacter;

function notValidCharacter(character: string) {
  return "abcdefghijklmnñopqrstuvwxyz".indexOf(character) < 0;
}
