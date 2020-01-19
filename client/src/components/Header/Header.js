import React, { Component, createRef } from 'react';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import * as headerAction from '../../actions/headerAction';
import * as headerSearchAction from '../../actions/headerSearchAction';
import * as AuthorizationActions from '../../actions/authorizationAction';
import Authorization from '../Authorization/Authorization';
import SnackBars from '../common/admin-panel/SnackBars';
import NavBar from './NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import UserMenu from './UserMenu/UserMenu';

import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      anchorEl: null,
      isLocalCart: false,
      sendDataStatus: 'success',
      sendDataMessage: ''
    };
  }

  handleCloseSnackBars = (event, reason) => {
    if (reason === 'clickaway') return;

    this.setState({ sendDataMessage: '' });
  };

  handleClose = () => {
    this.setState(state => ({ anchorEl: null }));
  }

  onSearchResultsClick = (event) => {
    this.props.history.push(`/product/${event.target.id}`);
    this.handleClose();
  }

  timerHandler = createRef();

  onSearchInputChange = async (searchInput) => {
    if (this.state.searchInput) {
      await this.props.findProductsBySearchInput(this.state.searchInput);

      if (this.props.foundProducts.length !== 0) {
        this.setState(state => ({ anchorEl: searchInput }));
      } else {
        this.setState({
          sendDataStatus: 'error',
          sendDataMessage:
            this.props.foundProductsError === ''
              ? 'Такого товара в магазине нет'
              : this.props.foundProductsError
        });
      }
    }
  }

  onSearchIconClick = async () => {
    if (this.state.searchInput) {
      await this.props.findProductsBySearchIconClick(this.state.searchInput);
      this.props.history.push('/products/search');
    }
  }

  agreeReplaceWithOnline = () => {
    const {
      cart: { items }
    } = this.props.authorization;
    this.props.replaceWithOnlineCart(items);
    this.setState({ isLocalCart: false });
  };

  degreeReplaceWithOnline = () => {
    this.setState({ isLocalCart: false });
  };

  componentDidMount() {
    const localCart = JSON.parse(localStorage.getItem('localCart'));
    if (_.isArray(localCart) && localCart.length > 0) {
      this.setState({ isLocalCart: true });
    }
    this.props.getRootCategories();
    this.props.getChildCategories();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isAuthorization: isAuthorizationOld } = prevProps.authorization;
    const { isAuthorization: isAuthorizationNew } = this.props.authorization;
    if (isAuthorizationOld === false && isAuthorizationNew !== isAuthorizationOld) {
      const localCart = JSON.parse(localStorage.getItem('localCart'));
      if (_.isArray(localCart) && localCart.length > 0) {
        this.setState({ isLocalCart: true });
      }
    }
  }

  render() {
    const { agreeReplaceWithOnline, degreeReplaceWithOnline } = this;
    const { isLocalCart } = this.state;
    const { rootCategories, childCategories, foundProducts, closeWindowAuth } = this.props;
    const { openWindowLogIn, isAuthorization } = this.props.authorization;
    const openSearchPopover = Boolean(this.state.anchorEl);
    const popupId = openSearchPopover ? 'simple-popover' : undefined;
    const { sendDataStatus, sendDataMessage } = this.state;

    return (
      <header className="header">
        <Link to="/" className="header-logo">
          CROSSY
        </Link>
        <div className="header-sidebar">
          <SideBar rootCategories={rootCategories} childCategories={childCategories} />
        </div>
        <div className="header-navbar">
          <NavBar rootCategories={rootCategories} childCategories={childCategories} />
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
              const searchInput = event.currentTarget.parentNode.parentNode;
              this.timerHandler.current = setTimeout(() => {
                this.setState(
                  state => ({ searchInput: inputValue }),
                  () => this.onSearchInputChange(searchInput)
                );
              }, 700);
            }}
          />
          <Popover
            id={popupId}
            open={openSearchPopover}
            onClose={this.handleClose}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            {foundProducts.map(elem => (
              <Typography
                className="search-popup-item"
                key={elem._id}
                id={elem._id}
                onClick={this.onSearchResultsClick}
              >
                {elem.nameProduct}
              </Typography>
            ))}
          </Popover>
          <SnackBars
            handleClose={this.handleCloseSnackBars}
            variant={sendDataStatus}
            open={!!sendDataMessage}
            message={sendDataMessage}
          />
        </div>
        <div className="header-user-menu">
          <UserMenu />
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
        <Dialog
          open={isLocalCart && isAuthorization}
          onClose={degreeReplaceWithOnline}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <Typography variant={'h3'}>
              You have the local cart. Do you want merge with the online cart?
            </Typography>
            <Typography variant={'body2'}>You can see the local cart in personal data</Typography>
            <Button onClick={degreeReplaceWithOnline}>Degree</Button>
            <Button onClick={agreeReplaceWithOnline}>Agree</Button>
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
    replaceWithOnlineCart: bindActionCreators(AuthorizationActions.replaceWithOnlineCart, dispatch),
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
