import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import cloudinary from 'cloudinary-core';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/Settings';

export default class UserMenu extends Component {
  render() {
    return (
      <div>
        <Box className="header-navbar-buttons">
          {this.props.isAuthorization ? (
            <Box>
              <Link to={'/personaldata'}>
                <img
                  className="avatar-user"
                  alt="Remy Sharp"
                  src={new cloudinary.Cloudinary({
                    cloud_name: this.props.cloudinary_cloud_name
                  }).url(this.props.avatarUrl)}
                />
              </Link>
              <Button
                onClick={() => {
                  this.props.signOut();
                  this.props.resetCart();
                }}
              >
                Sign out
              </Button>
            </Box>
          ) : (
            <Button onClick={this.props.openWindowAuth}>Login</Button>
          )}
          <Link to={`/cart`}>
            <Badge
              badgeContent={_.isArray(this.props.cart.items) ? this.props.cart.items.length : 0}
            >
              <ShoppingBasketIcon />
            </Badge>
          </Link>
          {this.props.isAdmin && (
            <Link to="/admin-panel">
              <SettingsIcon />
            </Link>
          )}
        </Box>
      </div>
    );
  }
}
