import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
});

const Preloader = ({ classes, open }) => (
  <Backdrop className={classes.backdrop} open={open}>
    <CircularProgress color="primary" />
  </Backdrop>
);

Preloader.propTypes = {
  classes: PropTypes.object.isRequired
};

Preloader.defaultProps = {
  classes: {}
};

export default withStyles(styles)(Preloader);
