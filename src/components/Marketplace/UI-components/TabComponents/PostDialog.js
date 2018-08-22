import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocationOnIcon from '@material-ui/icons/Add';
import Aux  from '../../../../hoc/Auxil';
import MarketForm from './MarketForm';

class PostDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Aux>
        <BottomNavigationAction
          label={this.props.label}
          showLabel={true}
          icon={<LocationOnIcon /> }
          onClick={this.handleClickOpen}
        />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <MarketForm
              handleClose={this.handleClose}
            />
          </DialogContent>
        </Dialog>
      </Aux>
    );
  }
}

export default PostDialog;