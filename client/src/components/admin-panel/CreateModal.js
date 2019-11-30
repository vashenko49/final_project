import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  create: {
    position: 'fixed',
    bottom: 50,
    right: 50
  },
  dialogContent: {
    padding: theme.spacing(3)
  }
});

class CreateModal extends Component {
  state = {
    isOpen: false
  };

  handleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { classes, title, children } = this.props;
    const { isOpen } = this.state;

    return (
      <Box>
        <Fab color="primary" size="medium" className={classes.create} onClick={this.handleOpen}>
          <AddIcon />
        </Fab>

        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={isOpen}
          onClose={this.handleOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle align="center" id="form-dialog-title">
            Create new {title}
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>{children}</DialogContent>
        </Dialog>
      </Box>
    );
  }
}

CreateModal.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

CreateModal.defaultProps = {};

export default withStyles(styles)(CreateModal);
