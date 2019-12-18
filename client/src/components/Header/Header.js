import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/Settings';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as headerAction from '../../actions/headerAction';
import * as headerSearchAction from '../../actions/headerSearchAction';

import './Header.scss';
import NavBar from './NavBar/NavBar';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchId: 0
    };
  }

  async onSearchInputChange(event) {
    console.log(event.target)
    if (this.state.searchId) {
      clearTimeout(this.state.searchId);
    }
    this.setState(state => ({searchInput: event.persist().target.value}));
    let searchId = setTimeout(await this.props.findProductsBySearchInput(this.state.searchInput), 700);
    this.setState(state => ({searchId: searchId}));
    console.log(this.props.foundProducts)
  }

  async onSearchIconClick() {
    if (this.state.searchInput) {
      await this.props.findFiveProductsBySearchIconClick(this.state.searchInput);
    }
  }

  componentDidMount() {
    this.props.getRootCategories();
    this.props.getChildCategories();
  }

  render() {
    const { rootCategories, childCategories } = this.props;

    return (
      <header className="header">
        <Link to="/" className="header-logo">
          CROSSY
        </Link>
        <NavBar
          className="header-navbar"
          rootCategories={rootCategories}
          childCategories={childCategories}
        />
        <div className="search">
          <SearchIcon onClick={this.onSearchIconClick.bind(this)} className="search-icon" />
          <InputBase
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            className="search-input"
            onChange={this.onSearchInputChange.bind(this)}
          />
        </div>
        <div className="header-navbar-buttons">
          <Link to="/authorization">
            <Button>Login</Button>
          </Link>
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
    childCategories: state.header.childCategories,
    foundProducts: state.headerSearch.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRootCategories: bindActionCreators(headerAction.getRootCategories, dispatch),
    getChildCategories: bindActionCreators(headerAction.getChildCategories, dispatch),
    findFiveProductsBySearchIconClick: bindActionCreators(headerSearchAction.findFiveProductsBySearchIconClick, dispatch),
    findProductsBySearchInput: bindActionCreators(headerSearchAction.findProductsBySearchInput, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
