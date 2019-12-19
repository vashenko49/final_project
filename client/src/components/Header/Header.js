import React, { Component, createRef } from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/Settings';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as headerAction from '../../actions/headerAction';
import * as headerSearchAction from '../../actions/headerSearchAction';

import './Header.scss';
import NavBar from './NavBar/NavBar';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      anchorEl: false
    };
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.onSearchIconClick = this.onSearchIconClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSearchResultsClick = this.onSearchResultsClick.bind(this)
  }

  onSearchResultsClick(event) {
    this.props.history.push(`/product/${event.target.id}`);
  }

  handleClose() {
    this.setState(state => ({anchorEl: false}))
  }

  timerHandler = createRef();

  async onSearchInputChange() {
    await this.props.findProductsBySearchInput(this.state.searchInput);
    this.setState(state => ({anchorEl: true}))
  }

  async onSearchIconClick() {
    if (this.state.searchInput) {
      await this.props.findProductsBySearchIconClick(this.state.searchInput);
      this.props.history.push("/products/search");
    }
  }

  componentDidMount() {
    this.props.getRootCategories();
    this.props.getChildCategories();
  }

  render() {
    const { rootCategories, childCategories, foundProducts } = this.props;

    const popupId = this.state.anchorEl ? 'simple-popover' : undefined;

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
          <SearchIcon onClick={this.onSearchIconClick} className="search-icon" />
          <InputBase
            aria-describedby={popupId}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            className="search-input"
            onChange={
              event => {
                clearTimeout(this.timerHandler.current);
                const inputValue = event.target.value;
                this.timerHandler.current = setTimeout(() => {
                  this.setState(state => ({searchInput: inputValue}), () => this.onSearchInputChange());
                }, 700);
              }
            }
          />
          <Popover
            id={popupId}
            open={this.state.anchorEl}
            onClose={this.handleClose}
            anchorEl={this.anchorEl}
            anchorOrigin={{
              vertical: 70,
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            {this.props.foundProducts.length === 0 ? <Typography>{this.props.foundProductsError === "" ? "Такого товара в магазине нет" : this.props.foundProductsError}</Typography> :
              foundProducts.map(elem =>
                <Typography className="search-popup-item" id={elem._id} onClick={this.onSearchResultsClick}>{elem.nameProduct}</Typography>)
            }
          </Popover>
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
    foundProducts: state.headerSearch.data,
    foundProductsError: state.headerSearch.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRootCategories: bindActionCreators(headerAction.getRootCategories, dispatch),
    getChildCategories: bindActionCreators(headerAction.getChildCategories, dispatch),
    findProductsBySearchIconClick: bindActionCreators(headerSearchAction.findProductsBySearchIconClick, dispatch),
    findProductsBySearchInput: bindActionCreators(headerSearchAction.findProductsBySearchInput, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
