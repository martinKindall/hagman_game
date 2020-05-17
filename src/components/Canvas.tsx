import React, {useEffect, useRef} from 'react';
import {createStyles, Grid, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const spriteWidth = 73;
const spriteHeight = 73;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      marginTop: "1rem"
    },
  }));

interface Props {
  frame: number;
}

const Canvas: React.FC<Props> = ({frame}) => {
  const classes = useStyles();
  const refCanvas: any = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src="/hangman_sprites.png";
    if (refCanvas != null) {
      const ctx = refCanvas.current.getContext('2d');
      img.onload = () => renderFrame(ctx, img, frame);
    }
  }, [frame]);

  return <Grid item xs={12} className={classes.root}>
    <canvas ref={refCanvas} width={spriteWidth} height={spriteHeight}>
    </canvas>
  </Grid>;
};

export default Canvas;

function renderFrame(context: any, img: any, frame: number){
  context.drawImage(img,
    spriteWidth*frame,0,spriteWidth,spriteHeight,
    0,0,spriteWidth,spriteHeight
  );
}
