import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/Settings';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as headerAction from '../../actions/headerAction'

import './Header.scss';
import NavBar from "./NavBar/NavBar";
import {Link} from "react-router-dom";

class Header extends Component {
  componentDidMount() {
    this.props.getRootCategories();
    this.props.getChildCategories();
  }

  render() {
    const { rootCategories, childCategories } = this.props;

    return (
      <header className="header">
        <Link to="/" className="header-logo">CROSSY</Link>
        <NavBar
          className="header-navbar"
          rootCategories={rootCategories}
          childCategories={childCategories}
        />
        <div className="search">
          <SearchIcon className="search-icon" />
          <InputBase
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            className="search-input"
          />
        </div>
        <div className="header-navbar-buttons">
          <Button href="/authorization">Login</Button>
          <FavoriteBorderIcon />
          <Badge badgeContent={2}>
            <ShoppingBasketIcon />
          </Badge>
          <Link to="/admin-panel">
            <SettingsIcon />
          </Link>
        </div>
      </header>
    );
  }
}

Header.defaultProps = [];

function mapStateToProps(state) {
  return {
    rootCategories: state.header.rootCategories,
    childCategories: state.header.childCategories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRootCategories: bindActionCreators(headerAction.getRootCategories, dispatch),
    getChildCategories: bindActionCreators(headerAction.getChildCategory, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
