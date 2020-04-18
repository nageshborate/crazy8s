import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class SelectSuitDialog extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = { open: false };
        this.setOpen = this.setOpen.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.generateHandleClose = this.generateHandleClose.bind(this);
    }

    setOpen(open)
    {
        this.setState({ open });
    }

    handleClickOpen()
    {
        this.setOpen(true);
    }

    generateHandleClose(suit)
    {
        return function()
        {
            this.setOpen(false);
            this.props.handleSuitChange(suit);
        }.bind(this);
    }

    render()
    {
        const { open } = this.state;
        const { generateHandleClose } = this;

        return (
            <div>
              <Dialog
                fullScreen={true}
                open={open}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">Select suit</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Select next suit to switch the game to.
                  </DialogContentText>
                  <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button onClick={generateHandleClose('S')}>
                    <span dangerouslySetInnerHTML = { { __html : '&spades;' } }></span>
                    </Button>
                    <Button onClick={generateHandleClose('C')}>
                        <span dangerouslySetInnerHTML = { { __html : '&clubs;' } }></span>
                    </Button>
                    <Button onClick={generateHandleClose('H')}>
                        <span dangerouslySetInnerHTML = { { __html : '&hearts;' } }></span>
                    </Button>
                    <Button onClick={generateHandleClose('D')}>
                        <span dangerouslySetInnerHTML = { { __html : '&diams;' } }></span>
                    </Button>
                </ButtonGroup>
                </DialogContent>
              </Dialog>
            </div>
          );
    }
};

export default SelectSuitDialog;

/*export default function SelectSuitDialog({ handleSuitChange }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  this.handleClickOpen = () => {
    setOpen(true);
  };

  const generateHandleClose = (suit) =>
  {
      return () => 
      {
        setOpen(false);
        handleSuitChange(suit);
      };
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Select suit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select next suit to switch the game to.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={generateHandleClose('S')} color="primary">
            <span dangerouslySetInnerHTML='&spades;' ></span>
          </Button>
          <Button autoFocus onClick={generateHandleClose('C')} color="primary">
            <span dangerouslySetInnerHTML='&clubs;' ></span>
          </Button>
          <Button autoFocus onClick={generateHandleClose('H')} color="primary">
            <span dangerouslySetInnerHTML='&hearts;' ></span>
          </Button>
          <Button autoFocus onClick={generateHandleClose('D')} color="primary">
            <span dangerouslySetInnerHTML='&diams;' ></span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}*/
