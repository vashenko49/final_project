import React from 'react';

import UserMenu from '../UserMenu/UserMenu';
import SideBarCategoriesMenu from './SideBarCategoriesMenu/SideBarCategoriesMenu';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

export default function SideBar(props) {
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (event.target === document.querySelector('#header-categories-menu .MuiButton-label')) {
      setState({ ...state, [side]: open });
    }

    if (event.target === document.getElementsByClassName('MuiBackdrop-root')[0]) {
      setState({ ...state, [side]: open });
    }
  };

  const sideList = side => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      {props.rootCategories
        .filter(item => item.enabled === true)
        .map(elem => (
          <SideBarCategoriesMenu
            key={elem.name}
            rootCategories={elem}
            childCategories={props.childCategories}
          />
        ))}
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
      <Button id="header-categories-menu" onClick={toggleDrawer('left', true)}>Menu</Button>
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
