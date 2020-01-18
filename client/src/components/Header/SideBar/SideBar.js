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

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div role="presentation">
      {props.rootCategories
        .filter(item => item.enabled === true)
        .map(elem => (
          <SideBarCategoriesMenu
            key={elem.name}
            toggleDrawer={toggleDrawer}
            rootCategories={elem}
            childCategories={props.childCategories}
          />
        ))}
      <List onClick={toggleDrawer('left', false)} className="sidebar-user-menu">
        <UserMenu />
      </List>
    </div>
  );

  return (
    <div>
      <Button id="header-categories-menu" onClick={toggleDrawer('left', true)}>
        Menu
      </Button>
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
