import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import Button from '@material-ui/core/Button';
import './FilterModel.scss';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { bindActionCreators } from 'redux';
import * as ProductAction from '../../../actions/product';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import * as authorizationAction from '../../../actions/authorizationAction';
import CloseIcon from '@material-ui/icons/Close';
import cloudinary from 'cloudinary-core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DoneIcon from '@material-ui/icons/Done';
import StyledLink from '../../common/styled/StyledLink';
import FavoriteIcon from '@material-ui/icons/Favorite';

class FilterModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCheckOutWindow: false,
      quantityToBag: '1'
    };
  }

  changeQuantityToBag = event => {
    const { updateQuantity } = this.props;
    const {
      pretenderModel: { modelNo },
      productId
    } = this.props.product.product;
    if (_.isNumber(+event.target.value) && +event.target.value > 0)
      updateQuantity(productId, modelNo, +event.target.value);
    this.setState({ [`${event.target.name}`]: event.target.value });
  };

  triggerCheckOutWindow = () => {
    this.setState({ isOpenCheckOutWindow: !this.state.isOpenCheckOutWindow });
  };

  selectFilter = (e, statusDisable) => {
    if (!statusDisable) {
      const { selectFilter } = this.props;
      const {
        filtersByUser,
        selectedFilter,
        model,
        productUrlImg,
        filterImg
      } = this.props.product.product;
      const { idsubfilter } = e.currentTarget.dataset;
      selectFilter(idsubfilter, filtersByUser, selectedFilter, model, productUrlImg, filterImg);
    }
  };

  addProductToCart = e => {
    e.preventDefault();
  };

  triggerFavourite = () => {
    const { isFavourites, productId } = this.props.product.product;
    const { addToFavourites, removeFromFavourites } = this.props;
    if (isFavourites) {
      removeFromFavourites(productId);
    } else {
      addToFavourites(productId);
    }
  };

  render() {
    const {
      selectFilter,
      triggerCheckOutWindow,
      changeQuantityToBag,
      addProductToCart,
      triggerFavourite
    } = this;
    const { isOpenCheckOutWindow, quantityToBag } = this.state;
    const { className, updateQuantity } = this.props;
    const { cloudinary_cloud_name } = this.props.configuration;
    const {
      filtersByUser,
      fitModelCount,
      massImg,
      pretenderModel: { currentPrice, modelNo },
      nameProduct,
      nameChildCatalog,
      productId,
      isFavourites
    } = this.props.product.product;
    const { isAuthorization } = this.props.authorization;
    return (
      <div className={`${_.isString(className) && className.length > 0 ? className : ''}`}>
        {filtersByUser.map(item => {
          const { nameFilter, idFilter, subFilters } = item;
          return (
            <div key={idFilter}>
              <Typography variant={'h6'}>Select {nameFilter}</Typography>
              <div className="container-subfilter">
                {subFilters.map(itemSub => {
                  const { idSubFilter, nameSubFilter, statusSelect, statusDisable } = itemSub;
                  return nameFilter.toLowerCase() === 'color' ? (
                    <Brightness1Icon
                      data-idsubfilter={idSubFilter}
                      className={`icon-choose-color ${statusDisable ? 'select-color-disable' : ''}`}
                      key={idSubFilter}
                      style={{
                        color: nameSubFilter,
                        border: `1px solid ${statusSelect ? nameSubFilter : 'transparent'}`
                      }}
                      onClick={e => {
                        selectFilter(e, statusDisable);
                      }}
                    />
                  ) : (
                    <div
                      data-idsubfilter={idSubFilter}
                      className="subfilter-button"
                      key={idSubFilter}
                      onClick={e => {
                        selectFilter(e, statusDisable);
                      }}
                    >
                      <Button
                        className={`${statusSelect ? 'subfilter-button-selected' : ''} ${
                          statusDisable ? 'select-color-disable' : ''
                        }`}
                        variant="contained"
                        disabled={statusDisable}
                      >
                        {nameSubFilter}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="service-container">
          <Button
            disabled={fitModelCount !== 1}
            className={`${fitModelCount !== 1 ? '' : 'subfilter-button-selected'} service-button`}
            variant="contained"
            onClick={() => {
              updateQuantity(productId, modelNo, quantityToBag);
              triggerCheckOutWindow();
            }}
          >
            <LocalMallOutlinedIcon /> ADD TO BAG
          </Button>
          {isAuthorization && (
            <Button onClick={triggerFavourite} className="service-button" variant="contained">
              {isFavourites ? <FavoriteIcon color={'secondary'} /> : <FavoriteBorderOutlinedIcon />}{' '}
              favourite
            </Button>
          )}
        </div>
        <Dialog
          open={isOpenCheckOutWindow}
          onClose={triggerCheckOutWindow}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <ValidatorForm className="form-window-checkout" ref="form" onSubmit={addProductToCart}>
              <div className="addedToBag">
                <CloseIcon
                  onClick={triggerCheckOutWindow}
                  className="CloseIcon"
                  fontSize={'default'}
                />
                <Typography className="Typography-add-to-bag" variant={'h4'}>
                  Add to Bag
                </Typography>
                <img
                  className="img-checkout-window"
                  src={new cloudinary.Cloudinary({
                    cloud_name: cloudinary_cloud_name
                  }).url(massImg[0])}
                  alt="not found"
                />
                <div className="information-about-product-window">
                  <Typography variant={'h6'}>{nameProduct}</Typography>
                  <Typography variant={'subtitle2'}>{nameChildCatalog}</Typography>
                  <Typography variant={'subtitle2'}>
                    Price $ {currentPrice * quantityToBag}
                  </Typography>
                  <TextValidator
                    margin="normal"
                    label="Quantity"
                    onChange={changeQuantityToBag}
                    type={'number'}
                    name="quantityToBag"
                    fullWidth
                    value={quantityToBag}
                    variant="outlined"
                    validators={['required']}
                    errorMessages={['This field is required']}
                  />
                </div>
              </div>
              <div className="buttons-about-product-window">
                <StyledLink to={'/cart'}>
                  <Button className="button-about-product-window" variant="contained">
                    <ShoppingCartIcon /> View bag
                  </Button>
                </StyledLink>
                <StyledLink to={'/checkout'}>
                  <Button
                    className={'subfilter-button-selected button-about-product-window'}
                    variant="contained"
                  >
                    <DoneIcon /> Checkout
                  </Button>
                </StyledLink>
              </div>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
    authorization: state.authorization,
    configuration: state.configuration
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectFilter: bindActionCreators(ProductAction.selectFilter, dispatch),
    updateQuantity: bindActionCreators(authorizationAction.updateQuantity, dispatch),
    addToFavourites: bindActionCreators(ProductAction.addToFavourites, dispatch),
    removeFromFavourites: bindActionCreators(ProductAction.removeFromFavourites, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterModel);
