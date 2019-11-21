import React from 'react';

import Products from './Products';
import CreateProduct from './CreateProduct';

import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles({
  create: {
    position: 'fixed',
    bottom: 50,
    right: 50
  },
  main: {
    padding: 20
  }
});

export default function AdminPanel() {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [isOpenCreate, setIsOpenCreate] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState('products');

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const onClickItemMenu = item => {
    setActiveMenu(item);
    setIsOpenMenu(!isOpenMenu);
  };

  const onClickCreateProduct = () => {
    setIsOpenCreate(!isOpenCreate);
  };

  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpenMenu}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Administrative Panel
          </Typography>
        </Toolbar>
      </AppBar>

      <CreateProduct open={isOpenCreate} handleOpen={onClickCreateProduct} />

      <Fab color="primary" size="medium" className={classes.create} onClick={onClickCreateProduct}>
        <AddIcon />
      </Fab>

      <Drawer variant="temporary" anchor="left" open={isOpenMenu} onClose={handleOpenMenu}>
        <div>
          <IconButton onClick={handleOpenMenu}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Products" onClick={() => onClickItemMenu('products')} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Categories" onClick={() => onClickItemMenu('categories')} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Brands" onClick={() => onClickItemMenu('brands')} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.main}>{activeMenu === 'products' ? <Products /> : null}</main>
    </div>
  );
}
