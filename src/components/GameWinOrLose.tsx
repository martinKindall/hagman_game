import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    win: {
      textAlign: "center",
      marginTop: "1rem",
      color: theme.palette.success.main
    },
    lose: {
      textAlign: "center",
      marginTop: "1rem",
      color: theme.palette.secondary.main
    }
  }));

interface Props {
  winState: boolean;
  gameOver: boolean
}

const GameWinOrLose: React.FC<Props> = ({winState, gameOver}) => {
  const classes = useStyles();

  return <>
    {
      winState &&
      <Typography variant="h6" className={classes.win}>
        Ganaste!
      </Typography>
    }
    {
      gameOver &&
      <Typography variant="h6" className={classes.lose}>
          Game Over
      </Typography>
    }
  </>;
};

export default GameWinOrLose;
