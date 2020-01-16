import React, { Component, createRef } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as headerAction from '../../actions/headerAction';
import * as headerSearchAction from '../../actions/headerSearchAction';
import * as AuthorizationActions from '../../actions/authorizationAction';
import Authorization from '../Authorization/Authorization';
import './Header.scss';
import NavBar from './NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import UserMenu from './UserMenu/UserMenu';
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
      closeWindowAuth
    } = this.props;
    const { openWindowLogIn } = this.props.authorization;
    const popupId = this.state.anchorEl ? 'simple-popover' : undefined;

    return (
      <header className="header">
        <Link to="/" className="header-logo">
          CROSSY
        </Link>
        <div className="header-sidebar">
          <SideBar
            rootCategories={rootCategories}
            childCategories={childCategories}
            customerId={this.state.customerId}
          />
        </div>
        <div className="header-navbar">
          <NavBar
            rootCategories={rootCategories}
            childCategories={childCategories}
          />
        </div>
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
        <div className="header-user-menu">
          <UserMenu
            customerId={this.state.customerId}
          />
        </div>
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
    authorization: state.authorization,
    configuration: state.configuration
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRootCategories: bindActionCreators(headerAction.getRootCategories, dispatch),
    getChildCategories: bindActionCreators(headerAction.getChildCategories, dispatch),
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
