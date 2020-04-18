import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
  export default function PointsTableDialog({ AppData:{ players, playerPoints } }) {

    if (players && players.length === 0)
        return null;

    const playersCount = players.length;
    const cellSize = Math.floor(12 / playersCount);
    const lastCellSize = cellSize + (12 - (cellSize * playersCount));

    const classes = useStyles();
  
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };
    return (
      <div className={classes.root} style={ { textAlign: "right" } } >
        <Button variant="outlined" onClick={ handleOpen } color="primary">
    Show Points Table
    </Button>
    <Dialog
        fullScreen={true}
        open={open}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">Points Table</DialogTitle>
        <DialogContent>
        <Grid container spacing={1}>
            {
                players.map(function(name, index, arr)
                {
                    const isLastItem = index === (arr.length - 1);
                    return <Grid item xs={ isLastItem ? lastCellSize : cellSize }>
                        <Paper className={classes.paper}>{ name }</Paper>
                    </Grid>
                })
            }

            {
                players.map(function(name, index, arr)
                {
                    const isLastItem = index === (arr.length - 1);
                    const points = playerPoints[index] ? playerPoints[index] : 0;

                    return <Grid item xs={ isLastItem ? lastCellSize : cellSize }>
                        <Paper className={classes.paper}>{ points }</Paper>
                    </Grid>
                })
            }
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } color="primary">
            Close
          </Button>
        </DialogActions>
        </Dialog>
      </div>
    );
  }
