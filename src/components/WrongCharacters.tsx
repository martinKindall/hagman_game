import React from 'react';
import {createStyles, Grid, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      marginTop: "1rem"
    }
  }));

interface Props {
  usedCharacters: Set<string>;
}

const WrongCharacters: React.FC<Props> = ({usedCharacters}) => {
  const classes = useStyles();

  return <>
    <Grid item xs={12}>
      <Typography variant="subtitle1" className={classes.root}>
        Letras no usadas
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="subtitle1" className={classes.root}>
        {convertSetOfCharactersToString(usedCharacters)}
      </Typography>
    </Grid>
  </>;
};

export default WrongCharacters;

function convertSetOfCharactersToString(characterSet: Set<string>): string {
  return Array.from(characterSet.values()).join(" ");
}
