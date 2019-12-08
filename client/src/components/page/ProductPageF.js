import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { getCurrentProduct } from '../../actions/product';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Rating from '../common/rating/Rating';

import './ProductPage.scss';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    top: 13 + '%',
    left: 33 + '%',
    width: 32 + '%',
    backgroundColor: theme.palette.background.paper,
    // border: '.6px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const ProductPageF = ({ getCurrentProduct, product: { product, loading }, match }) => {
  const {
    nameProduct,
    description,
    itemNo,
    model,
    filters,
    productUrlImg,
    _idChildCategory
  } = product;

  useEffect(() => {
    getCurrentProduct(match.params.id);
  }, [getCurrentProduct, match.params.id]);

  const [active, setActive] = useState(false);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const amount = [];

  for (let i = 1; i < 10; i++) {
    amount.push(<option value={i}>{i}</option>);
  }

  return (
    <Fragment>
      {loading === true ? (
        <h1>preloader</h1>
      ) : (
        <div className="product">
          <div className="product-header">
            <div className="header-info">
              <h2>{nameProduct}</h2>
              <h3 className="item-No">{itemNo}</h3>
            </div>
            <p className="item-price">${model[0].currentPrice.toFixed(2)}</p>
          </div>
          <div className="product-photo">
            <img src={productUrlImg[0]} alt="sneaker not found"></img>
          </div>
          <div className="product-select">
            <div className="sizes-info">
              <p>Select Size</p>
              <a href="/" className="size-guide">
                Size Guide
              </a>
            </div>
          </div>
          <div className="product-sizes container">
            {filters.map(v => {
              if (v.filter.type === 'Sizes') {
                return <button className="light-btn">US {v.subFilter.name}</button>;
              }
              return [];
            })}
          </div>
          <div className="product-buttons container">
            <button className="black-btn" onClick={handleOpen}>
              Add to bag
            </button>
            <button className="grey-btn">Favourite</button>
          </div>

          <div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={handleClose}
            >
              <div className={classes.paper}>
                <h3 className="checkout-title">Added to Bag</h3> {/* TODO */}
                <div className="checkout-content">
                  <img src={productUrlImg[0]} alt="sneaker not found"></img>
                  <div className="checkout-info">
                    <h5>{nameProduct}</h5>
                    <p>{_idChildCategory.name}</p>
                    <p className="checkout-field">
                      Price: <span>${89}</span>
                    </p>
                    <p className="checkout-field">
                      Color: <span>{'vimous'}</span>
                    </p>
                    <p className="checkout-field">
                      Size: <span>{37.5}</span>
                    </p>
                    <label htmlFor="quantity">Quantity</label>
                    <select name="quantity">{amount}</select>
                  </div>
                </div>
                <div className="product-buttons container">
                  <button className="grey-btn" onClick={handleOpen}>
                    View bag
                  </button>
                  <button className="black-btn">Checkout</button>
                </div>
              </div>
            </Modal>
          </div>

          {/* <div className="product-photos">
            <img></img>
          </div> */}
          <div className="product-discription container">
            <p className="short-description">{description}</p>
            <ul className="property-description">
              <li>
                Shown:{' '}
                {filters
                  .map(v => {
                    if (v.filter.type === 'Color') {
                      return v.subFilter.name;
                    }
                    return [];
                  })
                  .join()}
              </li>
              <li>Style: {itemNo}</li>
            </ul>
          </div>
          <div className="product-reviews container">
            <div className="review-header" onClick={() => setActive(!active)}>
              <div className="title" type="button">
                Reviews
              </div>
              <div className="arrow"></div>
            </div>
            <div
              className={active ? 'review-content container active' : 'review-content container'}
            >
              <p className="review-headline">Great buy</p>
              <Rating stars={4} className="review-rating" />
              <p className="review-date">Marklive - 22 Nov 2019</p>
              <div>
                <p className="review-text">Get a lot of compliments and very comfortable</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getCurrentProduct })(ProductPageF);
