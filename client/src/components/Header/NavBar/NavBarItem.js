import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class NavBarItem extends Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { item, children } = this.props;

    return (
      <div className="header-navbar-item">
        <Button
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {item.name}
          <ExpandMoreIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClick={this.handleRequestClose}
          style={{
            top: '40px'
          }}
        >
          {
            children.filter((item => item.enabled === true))
              .map((child, index) => item._id === child.parentId
                ? <MenuItem key={index} onClick={this.handleRequestClose}>{child.name}</MenuItem>
                : null
            )
          }
        </Menu>
      </div>
    );
  }
}
