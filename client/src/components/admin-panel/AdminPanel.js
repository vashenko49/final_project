import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Products from './Products';
import CreateProduct from './CreateProduct';

import { withStyles } from '@material-ui/styles';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  create: {
    position: 'fixed',
    bottom: 50,
    right: 50
  },
  main: {
    padding: 20
  }
};

class AdminPanel extends Component {
  state = {
    isOpenMenu: false,
    isOpenCreate: false,
    activeMenu: 'products'
  };

  handleOpenMenu = () => {
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  onClickItemMenu = item => {
    this.setState({ activeMenu: item });
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  onClickCreateProduct = () => {
    this.setState({ isOpenCreate: !this.state.isOpenCreate });
  };

  render() {
    const { isOpenMenu, isOpenCreate, activeMenu } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleOpenMenu}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Administrative Panel
            </Typography>
          </Toolbar>
        </AppBar>

        <CreateProduct open={isOpenCreate} handleOpen={this.onClickCreateProduct} />

        <Fab
          color="primary"
          size="medium"
          className={classes.create}
          onClick={this.onClickCreateProduct}
        >
          <AddIcon />
        </Fab>

        <Drawer variant="temporary" anchor="left" open={isOpenMenu} onClose={this.handleOpenMenu}>
          <div>
            <IconButton onClick={this.handleOpenMenu}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText primary="Products" onClick={() => this.onClickItemMenu('products')} />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="Categories"
                onClick={() => this.onClickItemMenu('categories')}
              />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Brands" onClick={() => this.onClickItemMenu('brands')} />
            </ListItem>
          </List>
          <Divider />
        </Drawer>

        <main className={classes.main}>{activeMenu === 'products' ? <Products /> : null}</main>
      </div>
    );
  }
}

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminPanel);
