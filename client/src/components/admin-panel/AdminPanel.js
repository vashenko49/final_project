import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Products from './Products';
import CreateProduct from './CreateProduct';
import CreateModal from './CreateModal';

import { withStyles } from '@material-ui/core/styles';

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
import Box from '@material-ui/core/Box';

const styles = {
  main: {
    padding: 20
  }
};

class AdminPanel extends Component {
  state = {
    isOpenMenu: false,
    activeMenu: 'products'
  };

  handleOpenMenu = () => {
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  onClickItemMenu = item => {
    this.setState({ activeMenu: item });
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  render() {
    const { isOpenMenu, activeMenu } = this.state;
    const { classes } = this.props;

    return (
      <Box>
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

        <CreateModal title={activeMenu}>
          <CreateProduct></CreateProduct>
        </CreateModal>

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
      </Box>
    );
  }
}

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminPanel);
