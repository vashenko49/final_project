import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';

import cloudinary from 'cloudinary-core';

import Box from '@material-ui/core/Box';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';

import * as AuthorizationActions from '../../../actions/authorizationAction';
import Avatar from '@material-ui/core/Avatar';

import './UserMenu.scss';

class UserMenu extends Component {
  render() {
    const { signOut, openWindowAuth } = this.props;
    const { cloudinary_cloud_name } = this.props.configuration;
    const { isAuthorization, isAdmin, cart } = this.props.authorization;
    const { avatarUrl, firstName } = this.props.authorization.personalInfo;

    return (
      <div>
        <Box className="header-navbar-buttons">
          {isAuthorization ? (
            <Box display="flex" alignItems="center">
              <Link to={'/personaldata'}>
                <Avatar
                  className="avatar-user"
                  alt={firstName}
                  src={new cloudinary.Cloudinary({
                    cloud_name: cloudinary_cloud_name
                  }).url(avatarUrl)}
                />
              </Link>
              <Link
                to={'/'}
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </Link>
            </Box>
          ) : (
            <div>
              <Link className="sidebar-login-link" to={'/authorization'}>
                Login
              </Link>
              <Button className="header-login-button" onClick={openWindowAuth}>
                Login
              </Button>
            </div>
          )}
          <Link to={`/cart`}>
            <Badge badgeContent={_.isArray(cart.items) ? cart.items.length : 0}>
              <ShoppingBasketIcon />
            </Badge>
          </Link>
          {isAdmin && (
            <Link to="/admin-panel">
              <SettingsIcon />
            </Link>
          )}
        </Box>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authorization: state.authorization,
    configuration: state.configuration
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openWindowAuth: bindActionCreators(AuthorizationActions.openWindowAuth, dispatch),
    closeWindowAuth: bindActionCreators(AuthorizationActions.closeWindowAuth, dispatch),
    signOut: bindActionCreators(AuthorizationActions.signOut, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserMenu));
