import React from 'react';

import UserMenu from '../UserMenu/UserMenu';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function SideBar(props) {
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {props.rootCategories.map(elem => (
          <ListItem button key={elem.name}>
            <ListItemText primary={elem.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List className="sidebar-user-menu">
        <UserMenu
          cloudinary_cloud_name={props.cloudinary_cloud_name}
          isAuthorization={props.isAuthorization}
          avatarUrl={props.avatarUrl}
          signOut={props.signOut}
          openWindowAuth={props.openWindowAuth}
          cart={props.cart}
          customerId={props.customerId}
        />
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)}>Menu</Button>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}
