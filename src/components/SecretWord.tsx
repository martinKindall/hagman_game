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
  secretWordState: string[];
}

const SecretWord: React.FC<Props> = ({secretWordState}) => {
  const classes = useStyles();
  let secretWordAsString = " ";

  let idx;
  for (idx=0; idx < secretWordState.length; idx++) {
    secretWordAsString += !secretWordState[idx] ? "_ " : (secretWordState[idx] + " ");
  }

  return <>
    <Grid item xs={12}>
      <Typography variant="h6" className={classes.root}>
        Palabra secreta
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h6" className={classes.root}>
        {secretWordAsString}
      </Typography>
    </Grid>
  </>;
};

export default SecretWord;
