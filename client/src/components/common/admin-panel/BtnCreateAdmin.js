import React from 'react';
import PropTypes from 'prop-types';

import StyledLink from '../styled/StyledLink';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  create: {
    position: 'fixed',
    bottom: 50,
    right: 50
  }
});

const BtnCreateAdmin = ({ classes, to = '/admin-panel' }) => (
  <StyledLink to={to}>
    <Fab color="primary" aria-label="add" size="small" className={classes.create}>
      <AddIcon />
    </Fab>
  </StyledLink>
);

BtnCreateAdmin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BtnCreateAdmin);
