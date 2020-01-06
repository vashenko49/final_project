import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

class DialogTextWindow extends Component {
  render() {
    const { open, onClose, error } = this.props;
    return (
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <Typography className="title-table" variant={'h6'}>
              {error}
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default DialogTextWindow;
