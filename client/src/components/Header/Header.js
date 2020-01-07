import React, { Component, createRef } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/Settings';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import _ from 'lodash';

import cloudinary from 'cloudinary-core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as headerAction from '../../actions/headerAction';
import * as cartAction from '../../actions/cart';
import * as headerSearchAction from '../../actions/headerSearchAction';
import * as AuthorizationActions from '../../actions/authorizationAction';
import Authorization from '../Authorization/Authorization';
import './Header.scss';
import NavBar from './NavBar/NavBar';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      anchorEl: false,
      customerId: '5df3e7aeace3e149fcc94957'
    };
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.onSearchIconClick = this.onSearchIconClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSearchResultsClick = this.onSearchResultsClick.bind(this);
  }

  onSearchResultsClick(event) {
    this.props.history.push(`/product/${event.target.id}`);
  }

  handleClose() {
    this.setState(state => ({ anchorEl: false }));
  }

  timerHandler = createRef();

  async onSearchInputChange() {
    await this.props.findProductsBySearchInput(this.state.searchInput);
    this.setState(state => ({ anchorEl: true }));
  }

  async onSearchIconClick() {
    if (this.state.searchInput) {
      await this.props.findProductsBySearchIconClick(this.state.searchInput);
      this.props.history.push('/products/search');
    }
  }

  componentDidMount() {
    this.props.getRootCategories();
    this.props.getChildCategories();
  }

  render() {
    const {
      rootCategories,
      childCategories,
      foundProducts,
      openWindowAuth,
      closeWindowAuth,
      signOut,
      cart,
      resetCart
    } = this.props;
    const { cloudinary_cloud_name } = this.props.configuration;
    const { openWindowLogIn, isAuthorization } = this.props.authorization;
    const { avatarUrl } = this.props.authorization.personalInfo;
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
        <div className="search" id="header-search-input">
          <SearchIcon onClick={this.onSearchIconClick} className="search-icon" />
          <InputBase
            aria-describedby={popupId}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            className="search-input"
            onChange={event => {
              clearTimeout(this.timerHandler.current);
              const inputValue = event.target.value;
              this.timerHandler.current = setTimeout(() => {
                this.setState(
                  state => ({ searchInput: inputValue }),
                  () => this.onSearchInputChange()
                );
              }, 700);
            }}
          />
          <Popover
            id={popupId}
            open={this.state.anchorEl}
            onClose={this.handleClose}
            anchorEl={document.getElementById('header-search-input')}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            {this.props.foundProducts.length === 0 ? (
              <Typography>
                {this.props.foundProductsError === ''
                  ? 'Такого товара в магазине нет'
                  : this.props.foundProductsError}
              </Typography>
            ) : (
              foundProducts.map(elem => (
                <Typography
                  className="search-popup-item"
                  key={elem._id}
                  id={elem._id}
                  onClick={this.onSearchResultsClick}
                >
                  {elem.nameProduct}
                </Typography>
              ))
            )}
          </Popover>
        </div>
        <Box display="flex" className="header-navbar-buttons">
          {isAuthorization ? (
            <Box>
              <img
                className="avatar-user"
                alt="Remy Sharp"
                src={new cloudinary.Cloudinary({
                  cloud_name: cloudinary_cloud_name
                }).url(avatarUrl)}
              />
              <Button
                onClick={() => {
                  signOut();
                  resetCart();
                }}
              >
                Sign out
              </Button>
            </Box>
          ) : (
            <Button onClick={openWindowAuth}>Login</Button>
          )}
          <FavoriteBorderIcon />
          <Link to={`/cart/${this.state.customerId}`}>
            <Badge badgeContent={_.isArray(cart.items) ? cart.items.length : 0}>
              <ShoppingBasketIcon />
            </Badge>
          </Link>
          <Link to="/admin-panel">
            <SettingsIcon />
          </Link>
        </Box>
        <Dialog
          open={openWindowLogIn}
          onClose={closeWindowAuth}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <Authorization />
          </DialogContent>
        </Dialog>
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
    foundProductsError: state.headerSearch.error,
    cart: state.cart,
    authorization: state.authorization,
    configuration: state.configuration
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRootCategories: bindActionCreators(headerAction.getRootCategories, dispatch),
    getChildCategories: bindActionCreators(headerAction.getChildCategories, dispatch),
    resetCart: bindActionCreators(cartAction.resetCart, dispatch),
    openWindowAuth: bindActionCreators(AuthorizationActions.openWindowAuth, dispatch),
    closeWindowAuth: bindActionCreators(AuthorizationActions.closeWindowAuth, dispatch),
    signOut: bindActionCreators(AuthorizationActions.signOut, dispatch),
    findProductsBySearchIconClick: bindActionCreators(
      headerSearchAction.findProductsBySearchIconClick,
      dispatch
    ),
    findProductsBySearchInput: bindActionCreators(
      headerSearchAction.findProductsBySearchInput,
      dispatch
    )
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
