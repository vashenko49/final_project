import React from 'react';
import NavBarItem from './NavBarItem';
import './NavBar.scss';

export default class NavBar extends React.Component {
  render() {
    const { rootCategories, childCategories } = this.props;

    return (
      <div>
        {rootCategories
          .filter(item => item.enabled === true)
          .map((item, index) => (
            <NavBarItem item={item} key={index} children={childCategories} />
          ))}
      </div>
    );
  }
}
